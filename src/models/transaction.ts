import * as sha256 from "crypto-js/sha256";
import { KeyPair, keyFromPublic } from "../services/keys";

export default class Transaction {
    from : string
    to : string
    amount : number
    signature : string

    constructor(from : string, to : string, amount : number) {
        this.from = from
        this.to = to
        this.amount = amount
    }

    sign(keypair : KeyPair) {
        const publicKey = keypair.getPublic("hex")
        if(publicKey !== this.from) {
            throw new Error("Cannot sign transactions for other wallet")
        }
        const hash = this.generateHash()
        this.signature = keypair.sign(hash, "base64").toDER("hex")
    }

    private generateHash() : string {
        const input = `${this.from}|${this.to}|${this.amount}`
        return sha256(input).toString()
    }

    get valid() : Boolean {
        if(this.from == null) return true
        if(!this.signature || this.signature.length == 0) return false
        const keyPair = keyFromPublic(this.from)
        return keyPair.verify(this.generateHash(), this.signature)
    }
}