const {broadcast, data, nodeInteraction, seedUtils} =  require('@waves/waves-transactions');
const {address} = require('@waves/ts-lib-crypto');
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
        let data = await nodeInteraction.accountData(address, nodeUrl);
        return data;
    } catch (e) {
        console.log(`ERROR in nodeInt.getAllData! ${e.name}: ${e.message}\n${e.stack}`);
    }
}

/**
 * Receive all user tasks.
 * @param userAddress - user address
 * @param dAppAddress - dApp address
 * @param nodeUrl - node url
 */
export let getAllUserTasksId = async (userAddress, dAppAddress, nodeUrl) => {
    try {
        let allTask = await getAllData(dAppAddress, nodeUrl);
        let userTasks = [];
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
            return userTasks;
    } catch (e) {
        console.log(`ERROR in nodeInt.getAllUserTasksId! ${e.name}: ${e.message}\n${e.stack}`);
    }
}


/**
 * Receive data from task
 * @param key - task id
 * @param dAppAddress - dApp address
 * @param nodeUrl - node url
 */
export let getDataFromTask = async (key, dAppAddress, nodeUrl) => {
    try {
        let response;
        let data = await getAllData(dAppAddress, nodeUrl);
		for (let i in data) {
			if (data[i].key == key) {
				console.log(data[i].value);
				response = data[i].value;
			} else {
				if (!response) {
					response = null;
				}
			}
		}
		return response;
    } catch (e) {
        console.log(`ERROR in nodeInt.getDataFromTask! ${e.name}: ${e.message}\n${e.stack}`);
    }
}

/**
 * Receive last task version by key
 * @param key - task id
 * @param dAppAddress - dApp address
 * @param nodeUrl - node url
 */
export let getLastTaskVersion = async (key, address, dAppAddress, nodeUrl) => {
    try {
        let keyWithoutVersion = key.substring(0, key.length - 1);
        console.log(`key without version ${keyWithoutVersion}`);
        let allTasks = await getAllData(dAppAddress, nodeUrl);        
        let ver = 0;

        for (let i in allTasks) {
            if (allTasks[i].key.slice(0, -9) == address) {
                if (ver < allTasks[i].key.slice(address.length + 8)) {
                    ver = allTasks[i].key.slice(address.length + 8);
                }
            }
        }
        console.log(ver);
        ver = Number(ver);
        return ver;
    } catch (e) {
        console.log(`ERROR in nodeInt.getLastTaskVersion! ${e.name}: ${e.message}\n${e.stack}`);
    }
}

/**
 * Change task data
 * @param key - task id
 * @param address - customer address
 * @param seed - dApp seed
 * @param dAppAddress - dApp Address
 * @param nodeUrl - node url
 * @param field - field name (ex. "status", "title", "description")
 * @param newData - update value (ex. "test task title")
 */
export let changeTaskData = async (key, seed, dAppAddress, nodeUrl, field, newData) => {
    try {
        let data = await getDataFromTask(key, dAppAddress, nodeUrl);
        data = JSON.parse(data);
        data[field] = newData;

        console.log(data[field])

        let version = await getLastTaskVersion(key, data.customer, dAppAddress, nodeUrl);
        data.version = version + 1;

        dataTx(data, seed, nodeUrl);
    } catch (e) {
        console.log(`ERROR in nodeInt.changeTaskData! ${e.name}: ${e.message}\n${e.stack}`);
    }
}

/**
 * Generator task id
 * @param address - customer address
 * @param dAppAddress - dApp address
 * @param nodeUrl - node url
 */
export let taskIdGenerator = async (address, dAppAddress, nodeUrl) => {
    try {
        let tasks = await getAllUserTasksId(address, dAppAddress, nodeUrl);
        console.log(tasks)
        let data = await getDataFromTask(tasks[tasks.length - 1], dAppAddress, nodeUrl);
        data = JSON.parse(data);
        let id = Number(data.id) + 1;
        console.log(id)
        return id;
    } catch (e) {
        console.log(`ERROR in nodeInt.taskIdGenerator! ${e.name}: ${e.message}\n${e.stack}`);
    }
}

/**
 * Take order
 * @param key - task id
 * @param freelancer = freelancer address
 * @param dAppAddress - dApp address
 * @param seed - dApp seed
 * @param nodeUrl - node url
 */
export let takeOrder = async (key, freelancer, dAppAddress, seed, nodeUrl) => {
    try {
        let data = await getDataFromTask(key, dAppAddress, nodeUrl);
        let version = await getLastTaskVersion(key, data.customer, dAppAddress, nodeUrl);
        data = JSON.parse(data);

        if (!data.freelancer) {
            data.freelancer = freelancer;
            data.version = version + 1;
            dataTx(data, seed, nodeUrl)
        } else {
            console.log("Task already taken");
        }

    } catch (e) {
        console.log(`ERROR in nodeInt.takeOrder! ${e.name}: ${e.message}\n${e.stack}`);
    }
}