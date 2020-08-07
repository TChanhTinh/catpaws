import sha512 from 'crypto-js/sha512'
import Base64 from 'crypto-js/enc-base64';

export const findNonce = (data) => {
    let nonce = 0
    let hash = ""

    while(hash.slice(0, 2) !== "00") {
        nonce++
        hash = Base64.stringify(sha512(nonce + data))
    }

    return nonce
}

export const hashThis = (nonce, data) => {
    return Base64.stringify(sha512(nonce + data))
}