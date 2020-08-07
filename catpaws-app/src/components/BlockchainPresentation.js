import React from 'react'
import { Row, Col } from 'antd'
import Block from '../containers/BlockContainer'

export const BlockchainPresentation = ({ blockchain }) => {
    return (
        <div>
            <Row>
                {blockchain.map((mapBlock, index) => (
                    <Col span={6}>
                        <Block index={index} prevHash={mapBlock.hash} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}