import * as sha256 from "crypto-js/sha256";
export default class Block {
    id : number
    date : Date
    data : any
    previousHash : string
    hash : string

    constructor(id : number, date : Date, data : any, previousHash : string) {
        this.id = id
        this.date = date
        this.data = data
        this.previousHash = previousHash
        this.hash = this.generateHash()
    }

    get timestamp() : number {
        return this.date.getTime()
    }
    private generateHash() : string {
        const payload = JSON.stringify(this.data)
        const input = `${this.id}|${this.timestamp}|${this.previousHash}|${payload}`
        return sha256(input).toString()
    }
}