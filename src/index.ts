import Block from './models/block';
import Chain from './models/chain';

var chain = new Chain

chain.add({amount: 3})
chain.add({amount: 5})
chain.add({amount: 6})
chain.add({amount: 18})

console.log(chain)