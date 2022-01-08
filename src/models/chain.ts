import Block from "./block";
import Transaction from "./transaction";

export default class Chain {
    difficulty : number
    miningReward : number
    pending : Transaction[]
    chain : Block[]

    constructor() {
        this.difficulty = 5
        this.miningReward = 100
        this.pending = []
        this.chain = [this.genesisBlock]
    }

    private get genesisBlock() : Block {
        let output = new Block(new Date(), [], '')
        output.mine(this.difficulty)
        return output
    }

    private get lastBlock() : Block {
        return this.chain[this.chain.length - 1]
    }

    get valid() : Boolean {
        return this.chain.every((current, i, chain) => {
            if(i == 0) return current.valid
            const previous = chain[i - 1]
            return current.valid(this.difficulty) && previous.hash === current.previousHash
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
    add(transaction : Transaction) {
        if(!transaction.from || !transaction.to)  {
            throw new Error("Transaction must include from and to")
        }
        if(!transaction.valid) {
            throw new Error("Transaction is not valid")
        }
        this.pending.push(transaction)
        console.log(`Transaction added to chain, waiting for miners to approve it`)
    }
    minePending(rewardAddress : string) {
        //adds the reward
        this.pending.push(new Transaction(null, rewardAddress, this.miningReward))
        //NOTE: cannot store every pending transaction on a single block, need to cherry-pick some
        let block = new Block(new Date(), this.pending, this.lastBlock.hash)
        console.log(`\n\n${rewardAddress} has started a mining process for block:`)
        console.log(block)
        block.mine(this.difficulty)
        this.chain.push(block)
        console.log(`\nBlock ${block.hash} succesfully mined! Reward: ${this.miningReward}`)
        //NOTE: need to handle lock properly on a P2P world
        this.pending = []
    }
}