import React, {useState, useEffect} from 'react'
import { Typography, Input, Button, Row, Col } from 'antd'
import { hashThis, findNonce } from '../crypto/crypto'

const { Title } = Typography
const { TextArea } = Input

export const BlockPresentation = ({index, prevHash, setBlock, addBlock}) => {
    const [data, setData] = useState("")
    const [nonce, setNonce] = useState(0)
    const [hash, setHash] = useState("")

    useEffect(() => {
        setHash(hashThis(nonce, index+data+prevHash))
        
    }, [nonce, data])

    function handleClick() {
        setNonce(findNonce(index+data+prevHash))
    }

    function applyChange() {
        addBlock(index, nonce, data, prevHash, hash)
    }

    function handleChangeData(e) {
        setData(e.target.value)
    }

    function handleChangeNonce(e) {
        setNonce(e.target.value)
    }

    return (
        <div>
            <Row>
                <Col span={6}>
                    <Title level={4}>Block</Title>
                </Col>
                <Col span={18}>
                    <Input value={index} placeholder="Block" />
                </Col>
            </Row>

            <Row>
                <Col span={6}>
                    <Title level={4}>Nonce</Title>
                </Col>
                <Col span={18}>
                    <Input value={nonce} onChange={handleChangeNonce} placeholder="Nonce" />
                </Col>
            </Row>

            <Row>
                <Col span={6}>
                    <Title level={4}>Data</Title>
                </Col>
                <Col span={18}>
                    <TextArea onChange={handleChangeData} placeholder="Data" />
                </Col>
            </Row>

            <Row>
                <Col span={6}>
                    <Title level={4}>PrevHash</Title>
                </Col>
                <Col span={18}>
                    <Input value={prevHash} placeholder="PrevHash" />
                </Col>
            </Row>

            <Row>
                <Col span={6}>
                    <Title level={4}>Hash</Title>
                </Col>
                <Col span={18}>
                    <Input value={hash} placeholder="Hash" />
                </Col>
            </Row>
            <Button onClick={() => handleClick()}>Mine</Button>
            <Button onClick={() => applyChange()}>Apply</Button>
        </div>
    )
}