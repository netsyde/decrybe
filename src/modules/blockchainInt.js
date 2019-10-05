import {broadcast, waitForTx, invokeScript} from '@waves/waves-transactions';

const dAppAddress = "3N9HxpGzNtqg7cnyi3YKqNWn3Pg455qhC1v";
let seed = "";
let nodeUrl = ""

let data = {
    title: "",
    description: "",
    expireTask: "", // Date
    price: "",
    tags: [],
    contents: "", // Full description
    uid: "", // user id
    createTime: "" // Date

}
async function createTask (item, data) {
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
