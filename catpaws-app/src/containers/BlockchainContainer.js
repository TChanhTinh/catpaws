import {connect} from 'react-redux'
import { BlockchainPresentation } from '../components/BlockchainPresentation'

const mapStateToProps = state => {
    const { blockchain } = state
    return {
        blockchain: blockchain[blockchain.length-1].blocks
    }
}

const Blockchain = connect(mapStateToProps, null)(BlockchainPresentation)
export default Blockchain