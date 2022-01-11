import Block from "./block";
import Chain from "./chain";
import Transaction from "./transaction";

export default class TransactionBag {

    pending : Transaction[]
    miningReward : number

    constructor(pending : Transaction[] = []) {
        this.miningReward = 100
        this.pending = pending || []
    }

    minePending(rewardAddress : string, chain : Chain) {
        //adds the reward
        this.pending.push(new Transaction(null, rewardAddress, this.miningReward))
        //NOTE: cannot store every pending transaction on a single block, need to cherry-pick some
        let block = new Block(new Date(), this.pending, chain.lastBlock.hash)
        console.log(`\n\n${rewardAddress} has started a mining process for block:`)
        console.log(block)
        block.mine(chain.difficulty)
        chain.push(block)
        console.log(`\nBlock ${block.hash} succesfully mined! Reward: ${this.miningReward}`)
        //NOTE: need to handle lock properly on a P2P world
        this.pending = []
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
}