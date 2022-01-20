import Block from './models/block';
import Chain from './models/chain';
import User from './models/user';
import TransactionBag from './models/transaction_bag';
import ChainRepository from './repositories/ChainRepository';
import PendingTransactionRepository from './repositories/PendingTransactionRepository';
import DatabaseService from './services/db';

const execute = async () => {
    const ipfs = await DatabaseService.createIPFS()
    const chainRepo = await ChainRepository.create(ipfs)
    const mineRepo = await PendingTransactionRepository.create(ipfs)
    var chain = await chainRepo.getChain() || new Chain
    var pending = await mineRepo.getPendingTransactions() || new TransactionBag
    const a = new User("Luigi")
    const b = new User("Marco")
    const c = new User("Daniel")

    const peers = [a, b, c]

    console.log(`Users ${peers.map(p => p.name).join(", ")}`)

    pending.add(a.move(20, b))
    pending.add(b.move(10, b))
    pending.add(c.move(10, b))
    pending.add(b.move(15, a))

    a.mine(chain, pending)

    console.log(chain)
    console.log(`Chain is valid? ${chain.valid}`)

    let balance = [] 
    peers.forEach(user => {
        balance[user.name] = {wallet: user.walletAddress, balance: user.balance(chain)}
    })
    console.log("Output:")
    console.log(balance)
}

execute().then(console.log).catch(console.error)