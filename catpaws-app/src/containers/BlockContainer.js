import { connect } from 'react-redux'
import {setBlock, addBlock} from '../actions/action'
import { BlockPresentation } from '../components/BlockPresentation'

const mapDispatchToProps = (dispatch) => {
    return {
        setBlock: (index, nonce, data, prevHash, hash) => {
            dispatch(setBlock(index, nonce, data, prevHash, hash))
        },
        addBlock: (index, nonce, data, prevHash, hash) => {
            dispatch(addBlock(index, nonce, data, prevHash, hash))
        }
    }
}

const Block = connect(null, mapDispatchToProps)(BlockPresentation)
export default Block