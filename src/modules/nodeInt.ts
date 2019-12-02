const {broadcast, data, nodeInteraction, seedUtils} =  require('@waves/waves-transactions');
const {address} = require('@waves/ts-lib-crypto');
const axios = require('axios');

const dApp = "3N9kox62MPg67TokQMTTZJKTYQBPwtJL2Tk"
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
                //console.log(`Data transaction id: ${v.id}`);
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
export let getDataByKey = async (data, key: String, dAppAddress: String, nodeUrl: String) => {
    try {
        let response;
        
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
    }
}

/**
 * Check user registration
 * @param address - user address
 * @param dAppAddress - dApp address
 * @param nodeUrl - node url
 * @returns {boolean}
 */
export let checkReg = async (alldata, address: String, dAppAddress: String, nodeUrl: String) => {
    try {
        let fAddress = `user_sts_${address}`
        let data = await getDataByKey(alldata, fAddress, dAppAddress, nodeUrl)
        if (data) {
            //console.log(true)
            return true;
        } else {
            //console.log(false)
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
export let getAllTasks = async (data, dAppAddress: String, nodeUrl: String) => {
    try {
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
export let getAllUsers = async (alldata, dAppAddress: String, nodeUrl: String) => {
    try {
        let users = await Promise.all(
            Object.keys(alldata)
                .filter(key => /^user_sts_/.test(key))
                .map(key => key.replace(/^user_sts_/, ''))
        );
        //console.log(users)
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
export let getUserData = async (alldata, address: String, dAppAddress: String, nodeUrl: String) => {
    try {
        let userData = await getDataByKey(alldata, "user_bio_" + address, dAppAddress, nodeUrl)
        if (userData) {
            userData = JSON.parse(userData)
            let userDataObj = {
                name: "name" in userData ? userData.name : "",
                socials: "socials" in userData ? userData.socials : "",
                bio: "bio" in userData ? userData.bio : "",
                status: "status" in userData ? userData.status: "",
                createTime: "createTime" in userData ? userData.createTime : "",
                tags: "tags" in userData ? userData.tags : "",
                avatar: "avatar" in userData ? userData.avatar : "",
                address: address,
                location: "location" in userData ? userData.location : "",
                cover: "cover" in userData ? userData.cover : "/img/cover.png"
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
export let getTaskData = async (alldata, id: String, dAppAddress: String, nodeUrl: String) => {
    try {
        let taskData = await getDataByKey(alldata, "datajson_" + id, dAppAddress, nodeUrl)
        taskData = JSON.parse(taskData)
        let userData = await getUserData(alldata, taskData.author, dAppAddress, nodeUrl)
        taskData.author = {
            address: taskData.author,
            name: userData ? userData.name : "",
            avatar: userData ? userData.avatar : ""
        }

        let color = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085",
                    "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#e67e22", "#e74c3c",
                    "#ff7979", "#badc58", "#f9ca24", "#f0932b",
                    "#eb4d4b", "#6ab04c", "#e056fd", "#686de0", "#30336b", "#130f40"]
        for (let i = 0; i < taskData.tags.length; i++) {
            taskData.tags[i] = {
                name: taskData.tags[i],
                color: color[getRandomArbitary(0, color.length - 1)]
            }
        }
        if (taskData.category == 1) {
            taskData.category = {
                id: taskData.category,
                name: "Websites, IT & Software"
            }
        } else if (taskData.category == 2) {
            taskData.category = {
                id: taskData.category,
                name: "Design & Media"
            }
        } else if (taskData.category == 3) {
            taskData.category = {
                id: taskData.category,
                name: "Product Sourcing"
            }
        } else if (taskData.category == 4) {
            taskData.category = {
                id: taskData.category,
                name: "Sales & Marketing"
            }
        } else if (taskData.category == 5) {
            taskData.category = {
                id: taskData.category,
                name: "Translation & Languages"
            }
        } else if (taskData.category == 6) {
            taskData.category = {
                id: taskData.category,
                name: "Local Jobs & Services"
            }
        } else {
            taskData.category = {
                id: taskData.category,
                name: "Other"
            }
        }
        taskData.status = ucFirst(taskData.status)
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

export let getTasksAllData = async (alldata, dAppAddress: String, nodeUrl: String) => {
    try {
        let allTasks = await getAllTasks(alldata, dAppAddress, nodeUrl)
        let tasks = [];
        if (allTasks) {
            for(let i = 0; i < allTasks.length; i++) {
                let taskData = await getTaskData(alldata, allTasks[i], dAppAddress, nodeUrl)
                tasks.push(taskData)
            }
            //console.log(tasks)
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

/**
 * Return task data
 * @param id - task id
 * @param dAppAddress - dApp address
 * @param nodeUrl - node url
 * @returns {Object}
 */

export let getUsersAllData = async (alldata, dAppAddress: String, nodeUrl: String) => {
    try {
        let allUsers = await getAllUsers(alldata, dAppAddress, nodeUrl)
        let users = [];
        if (allUsers) {
            for(let i = 0; i < allUsers.length; i++) {
                let userData = await getUserData(alldata, allUsers[i], dAppAddress, nodeUrl)
                users.push(userData)
            }
            //console.log(tasks)
            return users;
        } else {
            return false;
        }
    } catch (e) {
        console.log(`ERROR in nodeInt.getUsersAllData! ${e.name}: ${e.message}\n${e.stack}`);
        return false;
    }
}

export let getAllUserTasks = async (alldata, address, dAppAddress, nodeUrl) => {
    try {
        let data = await getTasksAllData(alldata, dAppAddress, nodeUrl)
        //console.log(data)
        const matchesFilter = new RegExp(address)
        if (data) {
            let filteredData = data.filter(task => matchesFilter.test(task.author.address))
            return filteredData;
        } else {
            return false
        }
    } catch (e) {
        console.log(`ERROR in nodeInt.getAllUserTasks! ${e.name}: ${e.message}\n${e.stack}`);
        return false;
    }
}

function getRandomArbitary(min, max) {
    let rand = Math.random() * (max - min) + min;
    return rand.toFixed(0)
}

function ucFirst(str) {
    if (!str) return str;
  
    return str[0].toUpperCase() + str.slice(1);
  }