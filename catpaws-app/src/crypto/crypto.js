import sha256 from 'crypto-js/sha256'
import { complexity } from '../common/config'

export const findNonce = (data) => {
    let nonce = 0
    let hash = ""

    while(hash.slice(0, 2) !== complexity.string.slice(0, complexity.complex)) {
        nonce++
        hash = sha256(data + nonce).toString()
    }

    return nonce
}

export const hashThis = (nonce, data) => {
    return sha256(data + nonce).toString()
}

export const checkVaildHash = (hash) => {
    return hash.slice(0, complexity.complex) === complexity.string.slice(0, complexity.complex)
}