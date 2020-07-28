import React from 'react'
import { dataTest, dataStruct } from "./data"

function createRenderObject(data, object) {
    Object.values(data).map(mapValue => {
        object.map(mapData => {
            for(var key in mapData.data) {
                if(mapValue.hasOwnProperty(key)) {
                    mapData[key] = mapValue[key]
                }
            }
        })
    })
    console.log(object)
}

function Builder() {
    return(
        <div>{createRenderObject(dataTest, dataStruct)}</div>
    )
}

export default Builder
