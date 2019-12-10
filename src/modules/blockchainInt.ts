import {broadcast, waitForTx, invokeScript} from '@waves/waves-transactions';
const dAppAddress = "3N3PDiDHb1AJU8tTXJLcvoDNP29fdGNNWqs";
let seed = "melody eye stock ostrich camera talk unlock royal insane pipe step squeeze";

const uuid = require('uuid/v4');
let test = uuid()
console.log(test)

let CryptoJS = require("crypto-js");

// Encrypt
//console.log(ciphertext); 
// Decrypt
//let originalText = CryptoJS.AES.decrypt(ciphertext, 'secret key 123').toString(CryptoJS.enc.Utf8)

//console.log(originalText); // 'my message'

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

/**
 * Creates the task
 * @param item - UUID
 * @param expiration - expiration in seconds
 * @param data - data object
 * @param nodeUrl - node url
 */
export let createTask = async (item, expiration, data, nodeUrl) => {
    let ts = await invokeScript({
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
        payment: [{assetId: null, amount: 1* 100000000}],
        chainId: "T"
    }, seed)
    let tx = await broadcast(ts, nodeUrl);
    console.log(tx.id)  
}

// createTask(test, 30000, data, "https://testnodes.wavesnodes.com")

/**
 * User registration
 * @param data - object
 * @param nodeUrl - node url
 * @param type - user type (mod, registered, admin, etc)
 */
export let signUp = async (data, nodeUrl) => {
    let ts = await invokeScript({
        dApp: dAppAddress,
        call: {
            function: "signUp",
            args: [
                {
                    type: "string", value: JSON.stringify(data)
                }
            ]
        },
        payment: [],
        chainId: "T"
    }, seed)
    let tx = await broadcast(ts, nodeUrl);
    console.log(tx.id)  
}

// signUp(dataU, "https://testnodes.wavesnodes.com", "")

/**
 * Updates the task
 * @param taskId - task UUID
 * @param data - object
 * @param nodeUrl - node url
 * @param type - allow types: featured (default), inprogress, closed
 */
export let taskUpdate = async (taskId, data, nodeUrl, type = "featured") => {
    let ts = await invokeScript({
        dApp: dAppAddress,
        call: {
            function: "taskUpdate",
            args: [
                {
                    type: "string", value: taskId
                },
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
    console.log(tx.id)    
}

// taskUpdate("fbe5dd88-68bf-41d5-a60e-114c89b4371b", dataUpd, "https://testnodes.wavesnodes.com")

/**
 * Updates the user
 * @param taskId - user address
 * @param data - object
 * @param nodeUrl - node url
 */
export let userUpdate = async (user, data, nodeUrl) => {
    let ts = await invokeScript({
        dApp: dAppAddress,
        call: {
            function: "userUpdate",
            args: [
                {
                    type: "string", value: user
                },
                {
                    type: "string", value: JSON.stringify(data)
                },
            ]
        },
        payment: [],
        chainId: "T"
    }, seed)
    let tx = await broadcast(ts, nodeUrl);
    console.log(tx.id)    
}

/**
 * Take the task
 * @param taskId - task UUID
 * @param comment - message from the freelancer to the customer
 * @param nodeUrl - node url
 */
export let takeTask = async (taskId, comment, key, nodeUrl) => {
    let ciphertext = CryptoJS.AES.encrypt(comment, key).toString();
    let ts = await invokeScript({
        dApp: dAppAddress,
        call: {
            function: "takeTask",
            args: [
                {
                    type: "string", value: taskId
                },
                {
                    type: "string", value: ciphertext
                },
            ]
        },
        payment: [],
        chainId: "T"
    }, seed)
    let tx = await broadcast(ts, nodeUrl);
    console.log(tx.id)    
}


let mess = "Veloce are offering great discounts to fast bookings made in advance and in fall and winter time."
//takeTask("fbe2dd88-68bf-41d5-a60e-114c89b4371b", mess, "bitcoin", "https://testnodes.wavesnodes.com")