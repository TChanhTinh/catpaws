import React, { useEffect, useState } from 'react'
import { Row, Col, Button } from 'antd'
import Block from '../containers/BlockContainer'

export const BlockchainPresentation = ({ blockchain, stateCount, addBlock }) => {
    const [isChanged, setIsChanged] = useState(false)

    useEffect(() => {
        setIsChanged(!isChanged)
    }, [stateCount])

    return (
        <div>
            <Row>
                {blockchain.map((mapBlock, index) => (
                    <Col span={6}>
                        <Block index={mapBlock.index} prevHash={mapBlock.prevHash} changed={isChanged} />
                    </Col>
                ))}
                <Button onClick={addBlock}>Add block</Button>
            </Row>
        </div>
    )
}