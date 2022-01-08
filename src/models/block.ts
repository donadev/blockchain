import * as sha256 from "crypto-js/sha256";
export default class Block {
    id : number
    date : Date
    data : any
    previousHash : string
    hash : string
    nonce : number = 0

    constructor(id : number, date : Date, data : any, previousHash : string) {
        this.id = id
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

    get valid() : Boolean {
        return this.hash === this.generateHash()
    }
    get timestamp() : number {
        return this.date.getTime()
    }
    generateHash() : string {
        const payload = JSON.stringify(this.data)
        const input = `${this.id}|${this.nonce}|${this.timestamp}|${this.previousHash}|${payload}`
        return sha256(input).toString()
    }
}