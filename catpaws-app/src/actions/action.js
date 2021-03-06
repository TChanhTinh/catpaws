import { SET_DATA, SET_BLOCK, ADD_BLOCK, MAKE_CHAIN } from './constant'
import axios from 'axios'

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

export function makeChain(chain) {
    return {
        type: MAKE_CHAIN,
        chain
    }
}

export function fetchBlockchain() {
    return (dispatch) => {
        axios.get('http://localhost:9000/blockchain')
        .then((res) => {
            console.log({blocks: res.data})
            dispatch(makeChain({blocks: res.data}))
        })
    }
}

export function addBlockToChain(index, nonce, data, prevhash, hash) {
    return (dispatch) => {
        const block = {
            index: index,
            nonce: nonce,
            data: data,
            prevhash: prevhash,
            hash: hash
        }
        axios.post('http://localhost:9000/block', block)
        .then((res) => {
            console.log({blocks: res.data})
            dispatch(fetchBlockchain())
        })
    }
}