import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools, devToolsEnhancer } from 'redux-devtools-extension'
import rootReducer from '../reducers/reducer'

const initState = [{
    block: {
        index: 0,
        nonce: 0,
        data: "",
        prevHash: "0",
        hash: ""
    },
    blockchain: {
        blocks: [
            {
                index: 0,
                nonce: 0,
                data: "",
                prevHash: "0",
                hash: ""
            }
        ]
    }
}]

const store = createStore(
    rootReducer,
    initState,
    composeWithDevTools(applyMiddleware(thunk))
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store