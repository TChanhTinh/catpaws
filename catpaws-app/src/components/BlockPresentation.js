import React, {useState, useEffect} from 'react'
import { Typography, Input, Button, Row, Col } from 'antd'
import { hashThis, findNonce } from '../crypto/crypto'
import Base64 from 'crypto-js/enc-base64'

const { Title } = Typography
const { TextArea } = Input

export const BlockPresentation = ({index, prevHash}) => {
    const [data, setData] = useState("")
    const [nonce, setNonce] = useState(0)
    const [hash, setHash] = useState("")

    useEffect(() => {
        setHash(hashThis(nonce, index+data+prevHash))
    }, [nonce, data])

    function handleClick() {
        setNonce(findNonce(index+data+prevHash))
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
                    <Title>Block</Title>
                </Col>
                <Col span={18}>
                    <Input value={index} placeholder="Block" />
                </Col>
            </Row>

            <Row>
                <Col span={6}>
                    <Title>Nonce</Title>
                </Col>
                <Col span={18}>
                    <Input value={nonce} onChange={handleChangeNonce} placeholder="Nonce" />
                </Col>
            </Row>

            <Row>
                <Col span={6}>
                    <Title>Data</Title>
                </Col>
                <Col span={18}>
                    <TextArea onChange={handleChangeData} placeholder="Data" />
                </Col>
            </Row>

            <Row>
                <Col span={6}>
                    <Title>PrevHash</Title>
                </Col>
                <Col span={18}>
                    <Input value={prevHash} placeholder="PrevHash" />
                </Col>
            </Row>

            <Row>
                <Col span={6}>
                    <Title>Hash</Title>
                </Col>
                <Col span={18}>
                    <Input disabled value={hash} placeholder="Hash" />
                </Col>
            </Row>
            <Button onClick={() => handleClick()}>Mine</Button>
        </div>
    )
}