import {broadcast, waitForTx, invokeScript} from '@waves/waves-transactions';
const dAppAddress = "3N9HxpGzNtqg7cnyi3YKqNWn3Pg455qhC1v";
let seed = "melody eye stock ostrich camera talk unlock royal insane pipe step squeeze";

const uuid = require('uuid/v4');
let test = uuid()
console.log(test)

let data = {
    title: "Site for the game",
    author: "3N67wqt9Xvvn1Qtgz6KvyEcdmr8AL7EVaQM",
    description: "Site for the game desc",
    expireTask: Date.now() + 50000, // Date
    price: "200",
    tags: ["site", "react"],
    contents: "Need site", // Full description
    uuid: test, // uuid
    createTime: Date.now() // Date

}

/**
 * Send data transaction in waves blockchain
 * @param item - UUID
 * @param data - data object
 * @param invokeScript - invokeScript
 * @param nodeUrl - node url
 */
export let createTask = async (item, expiration, data, nodeUrl) => {
    let ts = invokeScript({
        dApp: dAppAddress,
        call: {
            function: "createTask",
            args: [
                {
                    type: "string", value: item
                },
                {
                    type: "integer", value: expiration
                },
                {
                    type: "string", value: JSON.stringify(data)
                },
            ]
        },
        payment: [{amount: 1 * 100000000, asset: null}],
        chainId: "T"
    }, seed)
    let tx = await broadcast(ts, nodeUrl);
    await waitForTx(tx.id);
    console.log(tx.id)
}

//createTask(test, 30000, data, "https://testnodes.wavesnodes.com")

/**
 * Send data transaction in waves blockchain
 * @param data - object
 * @param nodeUrl - node url
 * @param type - user type (whale, registered, admin, etc)
 */
export let signUp = async (data, nodeUrl, type) => {
    let ts = await invokeScript({
        dApp: dAppAddress,
        call: {
            function: "signUp",
            args: [
                {
                    type: "string", value: JSON.stringify(data)
                },
                {
                    type: "string", value: type
                },
            ]
        },
        payment: [],
        chainId: "T"
    }, seed)
    let tx = await broadcast(ts, nodeUrl);
    await waitForTx(tx.id);
    console.log(tx.id)
}

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
//signUp(dataU, "https://testnodes.wavesnodes.com", "")


