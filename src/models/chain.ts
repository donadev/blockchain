import Block from "./block";
import Transaction from "./transaction";

export default class Chain {
    difficulty : number
    chain : Block[]

    constructor(blocks : Block[] = []) {
        this.difficulty = 5
        if(blocks.length == 0) {
            this.chain = [this.genesisBlock]
        } else {
            this.chain = blocks
        }
    }

    private get genesisBlock() : Block {
        let output = new Block(new Date(), [], '')
        output.mine(this.difficulty)
        return output
    }

    get lastBlock() : Block {
        return this.chain[this.chain.length - 1]
    }

    get valid() : Boolean {
        return this.chain.every((current, i, chain) => {
            const valid = current.valid(this.difficulty)
            if(i == 0) return valid
            const previous = chain[i - 1]
            return valid && previous.hash === current.previousHash
        })
    }
    balanceFor(address : String) : number {
        return this.chain.flatMap(b => b.transactions).reduce((acc, val) => {
            var increment = 0
            if(val.from === address) increment -= val.amount
            if(val.to === address) increment += val.amount
            return acc + increment
        }, 0)
    }
    push(block : Block) {
        this.chain.push(block)
    }
    
}