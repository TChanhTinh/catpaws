import { SET_DATA, SET_BLOCK, ADD_BLOCK } from './constant'

export function setData(key, data) {
    return {
        type: SET_DATA,
        key,
        data
    }
}

export function setBlock(index, nonce, data, prevHash, hash) {
    return {
        type: SET_BLOCK,
        index,
        nonce,
        data,
        prevHash,
        hash
    }
}

export function addBlock(index, nonce, data, prevHash, hash) {
    return {
        type: ADD_BLOCK,
        index,
        nonce,
        data,
        prevHash,
        hash
    }
}