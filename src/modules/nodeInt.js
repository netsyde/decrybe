const {broadcast, data, nodeInteraction} =  require('@waves/waves-transactions');
const axios = require('axios');

/**
 * Get user balance
 * @param address - user address
 * @param nodeUrl - node url
 */
export let getBalance = async (address, nodeUrl) => {
    try {
        return await axios.get(`${nodeUrl}/addresses/balance/${address}`).then(resp => {return resp.data});
    } catch (e) {
        console.log(`ERROR in nodeInt.getBalance! ${e.name}: ${e.message}\n${e.stack}`);
    }
}

/**
 * Send data transaction in waves blockchain
 * @param info - data object
 * @param seed - dApp seed
 * @param nodeUrl - node Url
 */
export let dataTx = async (info, seed, nodeUrl) => {
    try {
        broadcast( data( {data: [ { key: `${info.customer}_${info.type}_${info.id}_${info.version}`, value: JSON.stringify(info) } ], fee: 100000}, seed), nodeUrl ).then( (v) => {
            if (v.id) {
                console.log(`Data transaction id: ${v.id}`);
                return true;
            } else {
                return false;
            }
        })
    } catch (e) {
        console.log(`ERROR in nodeInt.dataTx! ${e.name}: ${e.message}\n${e.stack}`);
    }
}

/**
 * Get all dApp data from storage
 * @param address - dApp address
 * @param nodeUrl - node url
 */
export let getAllData = async (address, nodeUrl) => {
    try {
        let data = nodeInteraction.accountData(address, nodeUrl);
        return data;
    } catch (e) {
        console.log(`ERROR in nodeInt.getAllTask! ${e.name}: ${e.message}\n${e.stack}`);
    }
}

/**
 * Get user balance
 * @param userAddress - user address
 * @param dAppAddress - dApp address
 * @param nodeUrl - node url
 */
export let getAllUserTasksId = async (userAddress, dAppAddress, nodeUrl) => {
    try {
        let allTask = await getAllData(dAppAddress, nodeUrl);
        let userTasks = [];
        setTimeout(() => {
            console.log(allTask)
            let z = 0;
            for (let i in allTask) {
                z++
                let keyTemplate = `${userAddress}_task_${z}_1`
                for (let k in allTask) {
                    if (allTask[k].key == keyTemplate) {
                        console.log(`Match found ${allTask[k].key} : ${keyTemplate}`)
                        userTasks.push(allTask[k].key);
                    }
                }
            }
            console.log(userTasks);
        }, 5000);
    } catch (e) {
        console.log(`ERROR in nodeInt.getAllUserTasksId! ${e.name}: ${e.message}\n${e.stack}`);
    }
}

getAllUserTasksId("3N8Ayob7haCp5N32V6gYcdPsLMKMaS3qH3E", "3N67wqt9Xvvn1Qtgz6KvyEcdmr8AL7EVaQM", "https://testnodes.wavesnodes.com")