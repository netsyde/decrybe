import {broadcast, waitForTx, invokeScript} from '@waves/waves-transactions';
const dAppAddress = "3N9HxpGzNtqg7cnyi3YKqNWn3Pg455qhC1v";
let seed = "";

const uuid = require('uuid/v4');
let test = uuid("3N9HxpGzNtqg7cnyi3YKqNWn3Pg455qhC1v")
console.log(test)

let data = {
    title: "",
    author: "",
    description: "",
    expireTask: "", // Date
    price: "",
    tags: [],
    contents: "", // Full description
    uid: "", // user id
    createTime: "" // Date

}

/**
 * Send data transaction in waves blockchain
 * @param item - UUID
 * @param data - data object
 * @param invokeScript - invokeScript
 * @param nodeUrl - node url
 */
export let createTask = async (item: string, data: object, invokeScript, nodeUrl: string) => {
    let ts = invokeScript({
        dApp: dAppAddress,
        call: {
            function: "createTask",
            args: [
                {
                    type: "string", value: item
                },
                {
                    type: "string", value: JSON.stringify(data)
                },
            ]
        },
        payment: []
    }, seed)
    let tx = await broadcast(ts, nodeUrl);
    await waitForTx(tx.id);
    console.log(tx.id)
}

/**
 * Send data transaction in waves blockchain
 * @param data - object
 * @param nodeUrl - node url
 * @param type - user type (whale, registered, admin, etc)
 */
export let signUp = async (data: object, nodeUrl: string, type: string) => {
    let ts = invokeScript({
        dApp: dAppAddress,
        call: {
            function: "createTask",
            args: [
                {
                    type: "string", value: JSON.stringify(data)
                },
                {
                    type: "string", value: type
                },
            ]
        },
        payment: []
    }, seed)
    let tx = await broadcast(ts, nodeUrl);
    await waitForTx(tx.id);
    console.log(tx.id)
}
