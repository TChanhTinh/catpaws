import sha256 from 'crypto-js/sha256';
import sha512 from 'crypto-js/sha512'
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

import {
    SET_DATA,
    ADD_BLOCK
} from "../actions/constant"

const { combineReducers } = require("redux")

const initBlock = {
    index: 0,
    nonce: 0,
    data: "",
    prevHash: "0",
    hash: Base64.stringify(sha512(0, 0))
}

const blockchain = (state = [initBlock], action) => {
    const prevState = state[state.length - 1]
    const hashDigest = sha512(action.nonce + action.data)

    switch (action.type) {
        case SET_DATA:
            return {
                ...prevState,
                
            }
        case ADD_BLOCK:
            return [
                ...state,
                {
                    index: action.index,
                    nonce: action.nonce,
                    data: action.data,
                    prevHash: prevState.hash,
                    hash: Base64.stringify(hashDigest)
                }
            ]
        default: return state
    }
}

const rootReducer = combineReducers({
    blockchain
})

export default rootReducer