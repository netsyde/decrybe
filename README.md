# deLance
**deLance** is a decentralized freelancing exchange. **deLance** at the initial stage will be only a website, and later will get mobile applications with a convenient API. All data of the exchange will be stored in a decentralized database – the Waves blockchain. Anyone can find them in our dApp.
## Stage of development
### Stage I
- ~~Authorization via Waves Keeper~~
- ~~Ability to create a job (record information in the blockchain)~~
- Ability to change the status of the order (active, completed)
- Implementation of the possibility to take the order
- Development of a smart contract
- Development of the customer's balance check function
- Development of the reservation function of the amount allocated to the order
- Development of the function of payment of the claimed amount to the contractor during the execution of the order
- Development of the first version of the site with a simple interface for private testing
### Stage II
- Search for freelancers, orders
- Ability to add to the job a few freelancers
- Development of feedback system
- Ability to evaluate users
- Improve the functions of the smart contract
- Adding a function responsible for the referendum and counting of votes
- Other enhancements
- Site design improvements
### Stage III
- Development of user-friendly API
- Implementation of a small functional
- Open beta testing
### Stage IV
- Release
- Development of mobile applications

## API
### Module nodeInt
#### getBalance
**getBalance** - function to get user balance.
Params:
- address (wallet address)
- nodeUrl (node Url)

Usage:
```javascript
import * as nodeInt from './modules/nodeInt';

console.log(nodeInt.getBalance('3N67wqt9Xvvn1Qtgz6KvyEcdmr8AL7EVaQM', 'https://testnodes.wavesnodes.com') // 3.98
```

#### dataTx
**dataTx** - function to send data transaction in waves blockchain
Params:
- info (data object)
- seed (dApp seed)
- nodeUrl (node Url)

Usage:
```javascript
import * as nodeInt from './modules/nodeInt';
let seed = "melody eye stock ostrich camera talk unlock royal insane pipe step squeeze";
let nodeUrl = "https://testnodes.wavesnodes.com";
let data = {
    title: "ex task",
    price: "33",
    description: "desc",
    id: "1",
    customer: "address",
    type: "task"
}
  
nodeInt.dataTx(data, seed, nodeUrl);
```
Returns **true** if tx is sent, or **false** if not.