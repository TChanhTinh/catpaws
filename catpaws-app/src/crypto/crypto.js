import sha512 from 'crypto-js/sha512'
import Base64 from 'crypto-js/enc-base64';
import { complexity } from '../common/config'

export const findNonce = (data) => {
    let nonce = 0
    let hash = ""

    while(hash.slice(0, 2) !== complexity.string.slice(0, complexity.complex)) {
        nonce++
        hash = Base64.stringify(sha512(nonce + data))
    }

    return nonce
}

export const hashThis = (nonce, data) => {
    return Base64.stringify(sha512(nonce + data))
}

export const checkVaildHash = (hash) => {
    return hash.slice(0, complexity.complex) === complexity.string.slice(0, complexity.complex)
}