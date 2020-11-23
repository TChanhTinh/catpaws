#!/bin/bash
file=/docker-entrypoint-initdb.d/mineNonce.pgdata
dbname=minenonce
echo "Init database <<"
createdb -U postgres -W $dbname
pg_restore -U postgres --dbname=$dbname --verbose --single-transaction < $file
