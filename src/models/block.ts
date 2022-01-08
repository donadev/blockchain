import * as sha256 from "crypto-js/sha256";
import Transaction from "./transaction";
export default class Block {
    date : Date
    data : Transaction[]
    previousHash : string
    hash : string
    nonce : number = 0

    constructor(date : Date, data : Transaction[], previousHash : string) {
        this.date = date
        this.data = data
        this.previousHash = previousHash
        this.hash = this.generateHash()
    }

    mine(difficulty) {
        const target = Array(difficulty + 1).join("0")
        while(this.hash.substring(0, difficulty) !== target) {
            this.nonce += 1
            this.hash = this.generateHash()
        }
    } 
    private get hasValidTransactions() : Boolean {
        return this.data.every(t => t.valid)
    }

    get valid() : Boolean {
        return this.hash === this.generateHash() && this.hasValidTransactions
    }
    get timestamp() : number {
        return this.date.getTime()
    }
    generateHash() : string {
        const payload = JSON.stringify(this.data)
        const input = `${this.nonce}|${this.timestamp}|${this.previousHash}|${payload}`
        return sha256(input).toString()
    }
}