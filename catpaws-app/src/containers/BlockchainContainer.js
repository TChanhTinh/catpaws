import {connect} from 'react-redux'
import { BlockchainPresentation } from '../components/BlockchainPresentation'
import { addBlock } from '../actions/action'

const mapStateToProps = state => {
    const { blockchain } = state
    return {
        blockchain: blockchain[blockchain.length-1].blocks,
        stateCount: blockchain.length
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addBlock: () => dispatch(addBlock())
    }
}

const Blockchain = connect(mapStateToProps, mapDispatchToProps)(BlockchainPresentation)
export default Blockchain