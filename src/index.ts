import Block from './models/block';
import Chain from './models/chain';
import Transaction from './models/transaction';

var chain = new Chain

const a = "Luigi"
const b = "Marco"
const c = "Daniel"

const peers = [a, b, c]

chain.add(new Transaction(a, b, 10))
chain.add(new Transaction(b, b, 10))
chain.add(new Transaction(c, b, 10))
chain.add(new Transaction(b, a, 15))


chain.minePending(a)


console.log(chain)

peers.forEach(peer => {
    console.log(`Balance for ${peer}: ${chain.balanceFor(peer)}`)
})