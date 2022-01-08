import { generateKeyPair, KeyPair } from "../services/keys"
import Chain from "./chain"
import Transaction from "./transaction"

export default class User {
    name : String
    keypair : KeyPair

    constructor(name : String) {
        this.name = name
        this.keypair = generateKeyPair()
    }

    balance(chain : Chain) : number {
        return chain.balanceFor(this.walletAddress)
    }

    move(amount : number, to : User) : Transaction {
        const output = new Transaction(this.walletAddress, to.walletAddress, amount)
        output.sign(this.keypair)
        return output
    }
    mine(chain : Chain) {
        chain.minePending(this.walletAddress)
    }

    get walletAddress() : string {
        return this.keypair.getPublic("hex")
    }
}