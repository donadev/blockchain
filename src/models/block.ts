import * as sha256 from "crypto-js/sha256";
export default class Block {
    private id : number
    private date : Date
    private data : any
    private previousHash : string

    constructor(id : number, date : Date, data : any) {
        this.id = id
        this.date = date
        this.data = data
        this.previousHash = this.generateHash()
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