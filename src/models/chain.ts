import Block from "./block";
import Transaction from "./transaction";

export default class Chain {
    difficulty : number
    miningReward : number
    pending : Transaction[]
    chain : Block[]

    constructor() {
        this.chain = [this.genesisBlock]
        this.difficulty = 2
        this.miningReward = 100
        this.pending = []
    }

    private get genesisBlock() : Block {
        return new Block(new Date(), [], '')
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
    balanceFor(address : String) : number {
        return this.chain.flatMap(b => b.data).reduce((acc, val) => {
            var increment = 0
            if(val.from === address) increment -= val.amount
            if(val.to === address) increment += val.amount
            return acc + increment
        }, 0)
    }
    add(transaction : Transaction) {
        this.pending.push(transaction)
    }
    minePending(rewardAddress : string) {
        //NOTE: cannot store every pending transaction on a single block, need to cherry-pick some
        let block = new Block(new Date(), this.pending, this.lastBlock.hash)
        block.mine(this.difficulty)
        this.chain.push(block)
        //NOTE: need to handle lock properly on a P2P world
        //adds the reward
        this.pending = [
            new Transaction(null, rewardAddress, this.miningReward)
        ]
    }
}