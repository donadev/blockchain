import sha256 from 'crypto-js/sha256'
import Transaction from "./transaction";
export default class Block {
    date : Date
    transactions : Transaction[]
    previousHash : string
    hash : string
    nonce : number = 0

    constructor(date : Date, transactions : Transaction[], previousHash : string) {
        this.date = date
        this.transactions = transactions
        this.previousHash = previousHash
        this.hash = this.generateHash()
    }

    private hashValid(hash : string, difficulty : number) : Boolean {
        const target = Array(difficulty + 1).join("0")
        return hash.substring(0, difficulty) === target
    }
    mine(difficulty) {
        while(!this.hashValid(this.hash, difficulty)) {
            this.nonce += 1
            this.hash = this.generateHash()
        }
    } 
    private get hasValidTransactions() : Boolean {
        return this.transactions.every(t => t.valid)
    }

    valid(difficulty : number) : Boolean {
        return this.hashValid(this.hash, difficulty) && this.hash === this.generateHash() && this.hasValidTransactions
    }
    get timestamp() : number {
        return this.date.getTime()
    }
    generateHash() : string {
        const payload = JSON.stringify(this.transactions)
        const input = `${this.nonce}|${this.timestamp}|${this.previousHash}|${payload}`
        return sha256(input).toString()
    }
}