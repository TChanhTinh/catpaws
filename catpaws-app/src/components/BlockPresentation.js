import React, {useState, useEffect} from 'react'
import { Typography, Input, Button, Row, Col } from 'antd'
import { hashThis, checkVaildHash } from '../crypto/crypto'
import '../styles/Block.css'
import axios from 'axios'
import { complexity } from '../common/config'

const { Title } = Typography
const { TextArea } = Input

export const BlockPresentation = ({index, prevHash, nonceProps, dataProps, fetchBlockchain, changed}) => {
    const [data, setData] = useState(dataProps)
    const [nonce, setNonce] = useState(nonceProps)
    const [hash, setHash] = useState("")
    const [vaild, setVaild] = useState(false)

    useEffect(() => {
        let hash = hashThis(nonce, index+data+prevHash)
        setHash(hash)
        setVaild(checkVaildHash(hash))
    }, [nonce, data, changed])

    function handleClick() {
        axios({
            method: 'POST',
            url: `http://localhost:8080/encrypt/mine`,
            data: JSON.stringify({hash: index+data+prevHash, nonce: 0, complexity: complexity.complex}),
            contentType: "text/plain"
        })
        .then( res => {
            setNonce(res.data.Nonce)
        })
        .catch( err => {
            console.log(err)
        })
    }

    function applyChange() {
        const block = {
            index: index,
            nonce: nonce,
            data: data,
            prevhash: prevHash,
            hash: hash
        }
        axios.post('http://localhost:9000/block', block)
        .then((res) => {
            console.log("called")
            fetchBlockchain()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    function handleChangeData(e) {
        setData(e.target.value)
    }

    function handleChangeNonce(e) {
        setNonce(e.target.value)
    }

    return (
        <div className={(vaild ? "block-vaild" : "block-unvaild") + " block"}>
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
                    <TextArea value={data} onChange={handleChangeData} placeholder="Data" />
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
            <Button onClick={() => applyChange()}>Set block</Button>

        </div>
    )
}