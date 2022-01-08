import Block from './models/block';
import Chain from './models/chain';
import User from './models/user';

var chain = new Chain

const a = new User("Luigi")
const b = new User("Marco")
const c = new User("Daniel")

const peers = [a, b, c]

chain.add(a.move(20, b))
chain.add(b.move(10, b))
chain.add(c.move(10, b))
chain.add(b.move(15, a))

a.mine(chain)


console.log(chain)
console.log(`Chain is valid? ${chain.valid}`)

peers.forEach(peer => {
    console.log(`Balance for ${peer.name}: ${peer.balance(chain)}`)
})