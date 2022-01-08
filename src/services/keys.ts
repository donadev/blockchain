import { ec } from 'elliptic'
const cypher = new ec("secp256k1")

export const generateKeyPair = () : KeyPair => {
    return cypher.genKeyPair()
}
export type KeyPair = ec.KeyPair

export const keyFromPublic = (publicKey : string) : KeyPair => {
    return cypher.keyFromPublic(publicKey, "hex")
}