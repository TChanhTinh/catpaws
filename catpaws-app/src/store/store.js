import { createStore } from 'redux'
import rootReducer from '../reducers/reducer'
import {findNonce, hashThis} from '../crypto/crypto'
import { setData, addBlock } from '../actions/action'

const initState = [{
    blockchain: {
        blockIndex: 0,
        nonce: 0,
        data: "",
        prevHash: "0",
        hash: ""
    }
}]

const store = createStore(
    rootReducer,
    initState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store