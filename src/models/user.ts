import { generateKeyPair, KeyPair } from "../services/keys"
import Chain from "./chain"
import Transaction from "./transaction"
import TransactionBag from "./transaction_bag"

export default class User {
    name : string
    keypair : KeyPair

    constructor(name : string) {
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
    mine(chain : Chain, bag : TransactionBag) {
        bag.minePending(this.walletAddress, chain)
    }

    get walletAddress() : string {
        return this.keypair.getPublic("hex")
    }
}