import Block from './models/block';
import Chain from './models/chain';

var chain = new Chain

chain.add({amount: 3})
chain.add({amount: 5})
chain.add({amount: 6})
chain.add({amount: 18})

console.log(chain)

console.log(`Blockchain validation: ${chain.valid}`)

chain.chain[2].data = {amount: 12}

console.log(`Blockchain validation after corruption: ${chain.valid}`)

chain.chain[2].hash = chain.chain[2].generateHash()

console.log(`Blockchain validation after corruption with hash recalculation: ${chain.valid}`)