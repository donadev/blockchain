import Block from "./block";

export default class Chain {
    chain : Block[]

    constructor() {
        this.chain = [this.genesisBlock]
    }

    private get genesisBlock() : Block {
        return new Block(-1, new Date(), {amount: 10}, '')
    }

    private get lastBlock() : Block {
        return this.chain[this.chain.length - 1]
    }

    get valid() : Boolean {
        return this.chain.every((current, i, chain) => {
            if(i == 0) return current.valid
            const previous = chain[i - 1]
            return current.valid && previous.hash === current.previousHash
        })
    }
    add(data : any) {
        const last = this.lastBlock
        const id = last.id + 1
        const previousHash = last.hash
        const date = new Date()
        let block = new Block(id, date, data, previousHash)
        this.chain.push(block)
    }
}