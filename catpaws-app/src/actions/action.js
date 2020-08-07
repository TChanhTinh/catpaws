import { SET_DATA, ADD_BLOCK } from './constant'

export function setData(key, data) {
    return {
        type: SET_DATA,
        key,
        data
    }
}

export function addBlock(index, nonce, data) {
    return {
        type: ADD_BLOCK,
        index,
        nonce,
        data
    }
}