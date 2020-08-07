import {
    SET_BLOCK,
    ADD_BLOCK
} from "../actions/constant"
import { hashThis } from "../crypto/crypto"

const { combineReducers } = require("redux")

const initBlock = {
    index: 0,
    nonce: 9531,
    data: "",
    prevHash: "0",
    hash: "006hfWwHIm8wtqBTo82NmX2Lw1cD97vdKDct5ebsM/f8tw5sg8WNZTzsBXybFh3pgkQvfHJw6GpLaIMjE0Aomw=="
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

const blockchain = (state = [{blocks: [initBlock]}], action) => {
    const prevState = state[state.length - 1]

    switch (action.type) {
        case ADD_BLOCK:
            return [
                ...state,
                {
                    blocks: [
                        ...prevState.blocks,
                        {
                            index: action.index,
                            nonce: action.nonce,
                            data: action.data,
                            prevHash: action.prevHash,
                            hash: action.hash
                        }
                    ]
                }
            ]
        default: return state
    }
}

/*
            ...state,
        blocks: state.blocks.map((mapState) => (
            mapState.index === action.index
                ? {
                    ...mapState,
                    data: action.data,
                    nonce: action.nonce,
                    hash: action.hash
                }
                : mapState
        ))
        */

const rootReducer = combineReducers({
    blocks,
    blockchain
})

export default rootReducer