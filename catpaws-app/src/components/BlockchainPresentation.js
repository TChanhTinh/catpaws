import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Row, Col, Button } from 'antd'
import Block from '../containers/BlockContainer'

export const BlockchainPresentation = ({ fetchBlockchain, blockchain, stateCount, addBlock }) => {
    const [isChanged, setIsChanged] = useState(false)
    const [stateChain, setStateChain] = useState(blockchain)

    useEffect(() => {
        setIsChanged(!isChanged)
        setStateChain(blockchain)
    }, [stateCount])

    useLayoutEffect(() => {
        fetchBlockchain()
    }, [])

    return (
        <div>
            <Row>
                {stateChain.map((mapBlock, index) => (
                    <Col span={6}>
                        <Block index={mapBlock.index} nonceProps={mapBlock.nonce} dataProps={mapBlock.data} prevHash={mapBlock.prevhash} changed={isChanged} />
                    </Col>
                ))}
                <Button onClick={addBlock}>Add block</Button>
            </Row>
        </div>
    )
}