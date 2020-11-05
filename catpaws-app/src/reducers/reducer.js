import {
    SET_BLOCK,
    ADD_BLOCK,
    MAKE_CHAIN
} from "../actions/constant"
import { hashThis } from "../crypto/crypto"

const { combineReducers } = require("redux")

const initBlock = {
    index: 0,
    nonce: 387902,
    data: "",
    prevHash: "0",
    hash: "000004651204ea3016bbba4eb7c7c920d1a4544563d8aca184dcdceb0f8b0f4e"
}

const blocks = (state = [initBlock], action) => {
    const prevState = state[state.length - 1]

    switch (action.type) {
        case SET_BLOCK:
            return [
                ...state,
                {
                    ...prevState,
                    data: action.data,
                    nonce: action.nonce,
                    hash: action.hash
                }
            ]
        default: return state
    }
}

const editBlock = (block, action) => {
    let cloneBlock = JSON.parse(JSON.stringify(block))
    cloneBlock.nonce = action.nonce
    cloneBlock.data = action.data
    cloneBlock.hash = action.hash
    return cloneBlock
}

const refreshChain = (index, blocks) => {
    if(index===0)
        return
    else
    for (let i = index; i < blocks.length; i++) {
        blocks[i].prevHash = blocks[i - 1].hash
        blocks[i].hash = hashThis(
            blocks[i].nonce, 
            blocks[i].index + 
            blocks[i].data + 
            blocks[i].prevHash)
    }
}

const blockchain = (state = [{ blocks: [] }], action) => {
    const prevState = state[state.length - 1]

    switch (action.type) {
        case ADD_BLOCK:
            return [
                ...state,
                {
                    blocks: [
                        ...prevState.blocks,
                        {
                            index: prevState.blocks.length,
                            nonce: 0,
                            data: "",
                            prevhash: prevState.blocks[prevState.blocks.length-1].hash,
                            hash: ""
                        }
                    ]
                }
            ]
        case SET_BLOCK:
            prevState.blocks[action.index] = {
                index: action.index,
                nonce: action.nonce,
                data: action.data,
                prevHash: action.prevHash,
                hash: action.hash
            }
            refreshChain(action.index, prevState.blocks)
            return [
                ...state,
                prevState
            ]
        case MAKE_CHAIN:
            //console.log(action.chain)
            return [
                ...state,
                action.chain
            ]
        default: return state
    }
}

const rootReducer = combineReducers({
    blocks,
    blockchain
})

export default rootReducer