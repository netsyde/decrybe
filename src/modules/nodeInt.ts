const {broadcast, data, nodeInteraction, seedUtils} =  require('@waves/waves-transactions');
const {address} = require('@waves/ts-lib-crypto');
const axios = require('axios');

const dApp = "3NBngsNecsVX8HzVFTyEQSVGbL9Xia8hBb4"
const nodeUrl = "https://testnodes.wavesnodes.com"

/**
 * Get user balance
 * @param address - user address
 * @param nodeUrl - node url
 * @returns {JSON}
 */
export let getBalance = async (address: String, nodeUrl: String) => {
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
export let dataTx = async (info, seed: String, nodeUrl: String) => {
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
 * @returns {JSON}
 */
export let getAllData = async (address: String, nodeUrl: String) => {
    try {
        let data = await nodeInteraction.accountData(address, nodeUrl);
        //console.log(data)
        return data;
    } catch (e) {
        return false
        console.log(`ERROR in nodeInt.getAllData! ${e.name}: ${e.message}\n${e.stack}`);
    }
}

/**
 * Receive data from task
 * @param key - task id
 * @param dAppAddress - dApp address
 * @param nodeUrl - node url
 * @returns {String}
 */
export let getDataByKey = async (key: String, dAppAddress: String, nodeUrl: String) => {
    try {
        let response;
        let data = await getAllData(dAppAddress, nodeUrl);
		for (let i in data) {
			if (data[i].key == key) {
				//console.log(data[i].value);
				response = data[i].value;
			} else {
				if (!response) {
					response = null;
				}
			}
		}
		return response;
    } catch (e) {
        return false
        console.log(`ERROR in nodeInt.getDataByKey! ${e.name}: ${e.message}\n${e.stack}`);
    }
}

/**
 * Check user registration
 * @param address - user address
 * @param dAppAddress - dApp address
 * @param nodeUrl - node url
 * @returns {boolean}
 */
export let checkReg = async (address: String, dAppAddress: String, nodeUrl: String) => {
    try {
        let fAddress = `user_sts_${address}`
        let data = await getDataByKey(fAddress, dAppAddress, nodeUrl)
        if (data) {
            console.log(true)
            return true;
        } else {
            console.log(false)
            return false;
        }
    } catch (e) {
        console.log(`ERROR in nodeInt.checkReg! ${e.name}: ${e.message}\n${e.stack}`);
    }
}

//checkReg("3N9HPLR8Pyp8vREkHU1uvC6vrM7s1poKiUD", dApp, "https://testnodes.wavesnodes.com")

/**
 * Return all projects
 * @param dAppAddress - dApp address
 * @param nodeUrl - node url
 * @returns {Object}
 */
export let getAllTasks = async (dAppAddress: String, nodeUrl: String) => {
    try {
        let data = await getAllData(dAppAddress, nodeUrl);
        let tasks = await Promise.all(
            Object.keys(data)
                .filter(key => /^author_/.test(key))
                .map(key => key.replace(/^author_/, ''))
        );

        return tasks;
    } catch (e) {

        console.log(`ERROR in nodeInt.getAllTasks! ${e.name}: ${e.message}\n${e.stack}`);
        return false;
    }
}

/**
 * Return all users
 * @param dAppAddress - dApp address
 * @param nodeUrl - node url
 * @returns {Object}
 */
export let getAllUsers = async (dAppAddress: String, nodeUrl: String) => {
    try {
        let data = await getAllData(dAppAddress, nodeUrl);
        let users = await Promise.all(
            Object.keys(data)
                .filter(key => /^user_sts_/.test(key))
                .map(key => key.replace(/^user_sts_/, ''))
        );
        console.log(users)
        return users;
    } catch (e) {
        console.log(`ERROR in nodeInt.getAllUsers! ${e.name}: ${e.message}\n${e.stack}`);
    }
}

/**
 * Return user data
 * @param address - user address
 * @param dAppAddress - dApp address
 * @param nodeUrl - node url
 * @returns {Object}
 */
export let getUserData = async (address: String, dAppAddress: String, nodeUrl: String) => {
    try {
        let userData = await getDataByKey("user_bio_" + address, dAppAddress, nodeUrl)
        console.log(userData)
        if (userData) {
            userData = JSON.parse(userData)
            console.log(userData)
            let userDataObj = {
                name: userData.name ? userData.name : "",
                socials: userData.socials ? userData.socials : "",
                bio: userData.description ? userData.description : "",
                status: userData.status ? userData.status: "",
                createTime: userData.createTime ? userData.createTime : "",
                tags: userData.tags ? userData.tags : "",
                avatar: userData.avatar ? userData.avatar : ""
            }
            return userDataObj;
        } else {
            return false
        }
    } catch (e) {
        return false
        //console.log(`ERROR in nodeInt.getUserData! ${e.name}: ${e.message}\n${e.stack}`);
    }
}

//getUserData("3N67wqt9Xvvn1Qtgz6KvyEcdmr8AL7EVaQM", dApp, nodeUrl)

/**
 * Return task data
 * @param id - task id
 * @param dAppAddress - dApp address
 * @param nodeUrl - node url
 * @returns {Object}
 */
export let getTaskData = async (id: String, dAppAddress: String, nodeUrl: String) => {
    try {
        let taskData = await getDataByKey("datajson_" + id, dAppAddress, nodeUrl)
        taskData = JSON.parse(taskData)
        return taskData;
    } catch (e) {
        return false;
    }
}

//getTaskData("fbe2dd88-68bf-41d5-a60e-114c89b4371b", dApp, nodeUrl)

/**
 * Return task data
 * @param id - task id
 * @param dAppAddress - dApp address
 * @param nodeUrl - node url
 * @returns {Object}
 */

export let getTasksAllData = async (dAppAddress: String, nodeUrl: String) => {
    try {
        let allTasks = await getAllTasks(dAppAddress, nodeUrl)
        let tasks = [];
        if (allTasks) {
            for(let i = 0; i < allTasks.length; i++) {
                let taskData = await getTaskData(allTasks[i], dAppAddress, nodeUrl)
                tasks.push(taskData)
            }
            console.log(tasks)
            return tasks;
        } else {
            return false;
        }
    } catch (e) {
        console.log(`ERROR in nodeInt.getTasksAllData! ${e.name}: ${e.message}\n${e.stack}`);
        return false;
    }
}

//getTasksAllData(dApp, nodeUrl)