![](https://decrybe.com/img/decrybe-logo-without-bg.png)

**Decrybe** - is a decentralized freelancing exchange. The exchange is based on Web3 technologies, each user decides what information to disclose. The platform is completely Autonomous, it does not need centralized persons, because its work can be supported by any user with a certain rating. In addition, the work of the exchange is based on a smart contract, which means that all actions related to the platform are strictly described by a certain script, which can be read by any user. All data is stored in a blockchain-a decentralized database. Payment is carried out using cryptocurrencies.
## Stage of development
### Stage I
- ~~Authorization via Waves Keeper~~
- ~~Ability to register user~~
- ~~Ability to create tasks~~
- ~~Ability to change user data~~
- ~~Possibility to change the information about the task~~
- ~~Ability to take tasks~~
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

## API (blockchainInt.js)
### createTask
**createTask** - creates the task.

Params:
- UUID
- expiration in seconds
-  data object
- node url

Usage:
```javascript
const uuid = require('uuid/v4');
let test = uuid()

let data = {
    title: "Site for the game",
    author: "3N67wqt9Xvvn1Qtgz6KvyEcdmr8AL7EVaQM",
    description: "Site for the game desc",
    expireTask: Date.now() + 50000, // Date
    price: 200,
    tags: ["site", "react"],
    contents: "Need site", // Full description
    uuid: test, // uuid
    createTime: Date.now() // Date

}

createTask(test, 30000, data, "https://testnodes.wavesnodes.com")

```

### signUp
**signUp** - user registration.

Params:
- data object
- node url
- user type (mod, registered, admin, etc)

Usage:
```javascript
let dataU = {
    name: "Tester",
    avatar: "https://wallpapercave.com/wp/wp4180080.jpg",
    description: "Coder. Crypto evangelist",
    tags: ["tester", "code", "js"],
    location: "USA",
    socials: {
        telegram: "https://t.me/durov",
        twitter: "https://twitter.com/durov",
        medium: "",
        github: ""
    },
    address: "3N67wqt9Xvvn1Qtgz6KvyEcdmr8AL7EVaQM",
    createTime: Date.now()

}

signUp(dataU, "https://testnodes.wavesnodes.com", "")
```
### taskUpdate
**taskUpdate** - updates the task.

Params:
- task UUID
- data object
- node url
- type (allow types: featured (default), inprogress, closed)

Usage:
```javascript
let dataUpd = {
    title: "Site for The Witcher 3: Wild Hunt",
    author: "3N67wqt9Xvvn1Qtgz6KvyEcdmr8AL7EVaQM",
    description: "Site for the game desc",
    expireTask: "1570457371253" + 50000, // Date
    price: 200,
    tags: ["site", "react"],
    contents: "The Witcher 3 is riddled with consequential choices, all of which add up to a whopping 36 possible endgame states. Luckily, most of these are small variations of each other; there are, in fact, just three major endings.", // Full description
    uuid: "fbe5dd88-68bf-41d5-a60e-114c89b4371b", // uuid
    createTime: "1570457371253" // Date

}

taskUpdate("fbe5dd88-68bf-41d5-a60e-114c89b4371b", dataUpd, "https://testnodes.wavesnodes.com")
```

### userUpdate
**userUpdate** - updates the user.

Params:
- user address
- data object
- node url

### takeTask
**takeTask** - take the task.

Params:
- task UUID
- message from the freelancer to the customer
- node url

## Install and run
- git clone https://github.com/Sgoldik/decrybe
- yarn or npm i
- yarn build or npm build
- node server