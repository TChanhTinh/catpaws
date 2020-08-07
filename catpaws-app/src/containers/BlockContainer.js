import { connect } from 'react-redux'
import {setBlock, addBlock} from '../actions/action'
import { BlockPresentation } from '../components/BlockPresentation'

/*const mapStateToProps = (state) => {
    const { blockchain } = state
    const curState = blockchain[blockchain.length-1]
    return {
        index: curState.index,
        prevHash: curState.prevHash
    }
}*/

const mapDispatchToProps = (dispatch) => {
    return {
        setBlock: (index, nonce, data, hash) => {
            dispatch(setBlock(index, nonce, data, hash))
        },
        addBlock: (index, nonce, data, prevHash, hash) => {
            dispatch(addBlock(index, nonce, data, prevHash, hash))
        }
    }
}

const Block = connect(null, mapDispatchToProps)(BlockPresentation)
export default Block