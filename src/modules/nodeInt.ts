const { broadcast, data, nodeInteraction } =  require('@waves/waves-transactions');
const axios = require('axios');

const dApp = "3N9kox62MPg67TokQMTTZJKTYQBPwtJL2Tk"
const nodeUrl = "https://testnodes.wavesnodes.com"

let color = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085",
                    "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#e67e22", "#e74c3c",
                    "#ff7979", "#badc58", "#f9ca24", "#f0932b",
                    "#eb4d4b", "#6ab04c", "#e056fd", "#686de0", "#30336b", "#130f40"]
import moment from 'moment'
import { Brief } from '../views/TaskDetails/components/Overview/components';
/**
 * Get user balance
 * @param address - user address
 * @param nodeUrl - node url
 * @returns {JSON}
 */
export let getBalance = async (address: String, nodeUrl: String) => {
    try {
        return nodeInteraction.balance(address, nodeUrl)
        //return await axios.get(`${nodeUrl}/addresses/balance/${address}`).then(resp => {return resp.data});
    } catch (e) {
        console.log(`ERROR in nodeInt.getBalance! ${e.name}: ${e.message}\n${e.stack}`);
    }
}

export let dateToHeight = (date) => {
    let days = -1 * Math.floor(moment().diff(date, 'days', true));
        // In test mode one block = 1 day
        // return days;
        return Math.round(days * 1440);
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
        console.log(`ERROR in nodeInt.getAllData! ${e.name}: ${e.message}\n${e.stack}`);
        return false
    }
}

/**
 * Receive data from task
 * @param data - all dApp storage data
 * @param key - task id
 * @returns {String}
 */
export let getDataByKey = async (data, key: String) => {
    try {
        let response;
        
		for (let i in data) {
			if (data[i].key == key) {
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
 * @param alldata - all dApp storage data
 * @param address - user address
 * @returns {boolean}
 */
export let checkReg = async (alldata, address: String) => {
    try {
        let fAddress = `user_sts_${address}`
        let data = await getDataByKey(alldata, fAddress)
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
 * @param data - all dApp storage data
 * @returns {Object}
 */
export let getAllTasks = async (data) => {
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
 * @param alldata - all dApp storage data
 * @returns {Object}
 */
export let getAllUsers = async (alldata) => {
    try {
        let users = await Promise.all(
            Object.keys(alldata)
                .filter(key => /^user_sts_/.test(key))
                .map(key => key.replace(/^user_sts_/, ''))
        );
        return users;
    } catch (e) {
        console.log(`ERROR in nodeInt.getAllUsers! ${e.name}: ${e.message}\n${e.stack}`);
    }
}

/**
 * Return user data
 * @param alldata - all dApp storage data
 * @param address - user address
 * @returns {Object}
 */
export let getUserData = async (alldata, address: String) => {
    try {
        let userData = await getDataByKey(alldata, "user_bio_" + address)
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
                avatarColor: color[getRandomArbitary(0, color.length - 1)],
                location: "location" in userData ? userData.location : "",
                cover: "cover" in userData ? userData.cover : "/img/cover.png",
                publicKey: "publicKey" in userData ? userData.publicKey : ""
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

/**
 * Return clear task data (without useless information)
 * @param alldata - all dApp storage data
 * @param id - task id
 * @returns {Object}
 */
export let getClearTaskData = async (alldata, id: String) => {
    try {
        let taskData = await getDataByKey(alldata, "datajson_" + id)
        taskData = JSON.parse(taskData)
        return taskData;
    } catch (e) {
        return false;
    }
}

/**
 * Return task status
 * @param alldata - all dApp storage data
 * @param id - task id
 * @returns {Object}
 */
export let getTaskStatus = async (alldata, id: String) => {
    try {
        let fullKey = "status_" + id
        let status = await getDataByKey(alldata, fullKey)
        return status
    } catch (e) {
        return false;
    }
}

/**
 * Return task freelancer
 * @param alldata - all dApp storage data
 * @param id - task id
 * @returns {Object}
 */
export let getTaskFreelancer = async (alldata, id: String) => {
    try {
        let fullKey = "freelancer_" + id
        let freelancer = await getDataByKey(alldata, fullKey)
        return freelancer
    } catch (e) {
        return false;
    }
}

/**
 * Return task price
 * @param alldata - all dApp storage data
 * @param id - task id
 * @returns {Object}
 */
export let getTaskBank = async (alldata, id: String) => {
    try {
        let fullKey = "bank_" + id
        let bank = await getDataByKey(alldata, fullKey)
        return bank
    } catch (e) {
        return false;
    }
}

/**
 * Return task author
 * @param alldata - all dApp storage data
 * @param id - task id
 * @returns {Object}
 */
export let getTaskAuthor = async (alldata, id: String) => {
    try {
        let fullKey = "author_" + id
        let author = await getDataByKey(alldata, fullKey)
        return author
    } catch (e) {
        return false;
    }
}

export let getTaskData = async (alldata, id: String) => {
    try {
        let taskData = await getDataByKey(alldata, "datajson_" + id)
        taskData = JSON.parse(taskData)
        let taskAuthor = await getTaskAuthor(alldata, id)
        let userData = await getUserData(alldata, taskAuthor)
        taskData.author = {
            address: taskAuthor ? taskAuthor : "",
            publicKey: userData ? userData.publicKey : "",
            name: userData ? userData.name : "",
            avatar: userData ? userData.avatar : "",
            avatarColor: color[getRandomArbitary(0, color.length - 1)],
            bio: userData ? userData.bio : ""
        }
        let freelancer = await getTaskFreelancer(alldata, id)
        taskData.freelancer = freelancer ? freelancer : ""
        let freelancerData = await getUserData(alldata, freelancer)
        taskData.freelancerData = {
            address: freelancerData ? freelancerData : "",
            publicKey: freelancerData ? freelancerData.publicKey : "",
            name: freelancerData ? freelancerData.name : "",
            avatar: freelancerData ? freelancerData.avatar : "",
            avatarColor: color[getRandomArbitary(0, color.length - 1)],
            bio: freelancerData ? freelancerData.bio : ""
        }
        let bank = await getTaskBank(alldata, id)
        taskData.price = bank ? bank / 10e7 : "NaN"

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
        let status = await getTaskStatus(alldata, id)
        taskData.status = ucFirst(status)
        return taskData;
    } catch (e) {
        return false;
    }
}

//getTaskData("fbe2dd88-68bf-41d5-a60e-114c89b4371b", dApp, nodeUrl)

/**
 * Return task data
 * @param alldata - all dApp storage data
 * @returns {Object}
 */

export let getTasksAllData = async (alldata) => {
    try {
        let allTasks = await getAllTasks(alldata)
        let tasks = [];
        if (allTasks) {
            for(let i = 0; i < allTasks.length; i++) {
                let taskData = await getTaskData(alldata, allTasks[i])
                tasks.push(taskData)
            }
            tasks = tasks.filter(Boolean)
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
 * Return all data about each user
 * @param alldata - all dApp storage data
 * @returns {Object}
 */
export let getUsersAllData = async (alldata) => {
    try {
        let allUsers = await getAllUsers(alldata)
        let users = [];
        if (allUsers) {
            for(let i = 0; i < allUsers.length; i++) {
                let userData = await getUserData(alldata, allUsers[i])
                users.push(userData)
            }
            //console.log(tasks)
            users = users.filter(Boolean)
            return users;
        } else {
            return false;
        }
    } catch (e) {
        console.log(`ERROR in nodeInt.getUsersAllData! ${e.name}: ${e.message}\n${e.stack}`);
        return false;
    }
}

/**
 * Return all user data
 * @param alldata - all dApp storage data
 * @param address - user address
 * @returns {Object}
 */
export let getAllUserTasks = async (alldata, address) => {
    try {
        let data = await getTasksAllData(alldata)
        //console.log(data)
        const matchesFilter = new RegExp(address)
        if (data) {
            let filteredData = data.filter(task => matchesFilter.test(task.author.address ? task.author.address : ""))
            // "avatar" in userData ? userData.avatar : "",
            console.log(filteredData)
            return filteredData;
        } else {
            return false
        }
    } catch (e) {
        console.log(`ERROR in nodeInt.getAllUserTasks! ${e.name}: ${e.message}\n${e.stack}`);
        return false;
    }
}

/**
 * Return pseudo random number between min and max
 * @param min - minimal number
 * @param max - maximum number
 * @returns {Number}
 */
let getRandomArbitary = (min, max) => {
    let rand = Math.random() * (max - min) + min;
    return rand.toFixed(0)
}

/**
 * Return string with first upper case character
 * @param str - string
 * @returns {string}
 */
let ucFirst = (str) => {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
}

/**
 * Return message data
 * @param alldata - all dApp storage data
 * @param id - message unique id
 * @returns {object|boolean}
 */
export let getTaskUserMessage = async (alldata, id) => {
    try {
        let message = await getDataByKey(alldata, id)
        message = JSON.parse(message)
        return message
    } catch (e) {
        console.log(`ERROR in nodeInt.getTaskUserMessage! ${e.name}: ${e.message}\n${e.stack}`);
        return false;
    }
}

/**
 * Return message block (height)
 * @param alldata - all dApp storage data
 * @param id - message unique id
 * @returns {object|boolean}
 */
export let getTaskUserMessageBlock = async (alldata, id) => {
    try {
        let block = await getDataByKey(alldata, id)
        block = JSON.parse(block)
        return block
    } catch (e) {
        console.log(`ERROR in nodeInt.getTaskUserMessageBlock! ${e.name}: ${e.message}\n${e.stack}`);
        return false;
    }
}

/**
 * Return conversations data (all messages each conversation)
 * @param alldata - all dApp storage data
 * @param user - user (current)
 * @param wavesKeeper - waves keeper class
 * @returns {object}
 */
export let getConversationsData = async (data, user, keeperOrSigner) => {
    try {
        let allConversation = await getUserConversationList(data, user)
        console.log(allConversation)
        let conversationsData = []
        if (allConversation) {
            for (let i = 0; i < allConversation.length; i++) {
                let userConversationMessages = await getUserConversationMessages(data, allConversation[i])
                //console.log(2)
                if (userConversationMessages) {
                    let conversationData = []
                    for (let x = 0; x < userConversationMessages.length; x++) {
                        let message = await getTaskUserMessage(data, userConversationMessages[x].message)
                        //console.log(3)
                        let check = message.sender == user ? message.recipient : message.sender;
                        let userData = await getUserData(data, check)
                        //console.log(4)
                        let userDataSender = await getUserData(data, message.sender)
                        //console.log(5)
                        if (userData) {
                            let decrypted = message.message ? await keeperOrSigner.class.decryptMessage(message.message, userData.publicKey, 'decrybe') : ""
                            let block = await getTaskUserMessageBlock(data, userConversationMessages[x].block)
                            //console.log(6)
                            conversationData.push(
                                {
                                    content: decrypted,
                                    block: block,
                                    sender: userDataSender,
                                    task: message.task,
                                    id: userConversationMessages[x].message,
                                    created_at: message.date
                                }
                            )
                        }
                    }
                    let variant = allConversation[i].sender == user ? allConversation[i].recipient : allConversation[i].sender
                    let uData = await getUserData(data, variant)
                    // console.log(7)
                    let regex = new RegExp(allConversation[i].task)
                    conversationData = conversationData.sort(compareBlock);
                    conversationData = conversationData.filter( message  => regex.test(message.task))
                    //conversationData = conversationData.sort(compareBlock);
                    
                    //console.log(8)
                    let task = await getTaskData(data, allConversation[i].task)
                    //console.log(9)
                    if (task) {

                        conversationsData.push({
                            messages: conversationData, //conversationData.filter( message  => regex.test(message.task)),
                            id: allConversation[i].task,
                            uid: allConversation[i].id,
                            task: task,
                            user: uData,
                        })
                    }
                    //console.log(10)
                }
            }
        }
        console.log(conversationsData)
        return conversationsData
    } catch (e) {
        console.log(`ERROR in nodeInt.getConversationData! ${e.name}: ${e.message}\n${e.stack}`);
        return false;
    }
}
/**
 * Compare time created message
 * @param a - message a
 * @param b - message b
 * @returns {number}
 */
let compareNumeric = (a, b) => {
    try {
        if (Number(a.created_at) > Number(b.created_at)) return 1;
        if (Number(a.created_at) == Number(b.created_at)) return 0;
        if (Number(a.created_at) < Number(b.created_at)) return -1;
    } catch (e) {
        console.log(`ERROR in nodeInt.compareNumeric! ${e.name}: ${e.message}\n${e.stack}`);
        //return false;
    }
}

/**
 * Compare block created message
 * @param a - message a
 * @param b - message b
 * @returns {number}
 */
let compareBlock = (a, b) => {
    try {
        if (Number(a.block) > Number(b.block)) return 1;
        if (Number(a.block) == Number(b.block)) {
            return compareNumeric(a,b)
        };
        if (Number(a.block) < Number(b.block)) return -1;
    } catch (e) {
        console.log(`ERROR in nodeInt.compareBlock! ${e.name}: ${e.message}\n${e.stack}`);
        //return false;
    }
}

let compareBlockDispute = (a, b) => {
    try {
        if (Number(a.block) > Number(b.block)) return 1;
        if (Number(a.block) == Number(b.block)) return 0
        if (Number(a.block) < Number(b.block)) return -1;
    } catch (e) {
        console.log(`ERROR in nodeInt.compareBlockDispute! ${e.name}: ${e.message}\n${e.stack}`);
        //return false;
    }
}

/**
 * Returns true, if element consists in array, else false
 * @param arr - array
 * @param elem - element
 * @returns {number}
 */
let contains = (arr, elem) => {
    try {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === elem) {
                return true;
            }
        }
        return false;
    } catch (e) {
        console.log(`ERROR in nodeInt.contains! ${e.name}: ${e.message}\n${e.stack}`);
        //return false;
    }
}

/**
 * Return conversation list (id conversations)
 * @param data - all dApp storage data
 * @param user - user (current)
 * @returns {object|boolean}
 */
export let getUserConversationList = async (data, user) => {
    try {
        let taskIds = []
        let result = await Promise.all(
            Object.keys(data)
                .map(async key => {
                    const match = /^msg_([0-9a-z-]+)_([0-9a-z-]+)_id:([0-9]+)/i.exec(key);

                    if (match && (match[1] === user || match[2] === user)) {
                        let realUser = user === match[1] ? match[2] : match[1]
                        let task = await getDataByKey(data, `msg_${match[1]}_${match[2]}_id:${match[3]}`)
                        task = JSON.parse(task)
                        if (!contains(taskIds, `${task.task}_${realUser}`)) {
                            taskIds.push(`${task.task}_${realUser}`)
                            let id = `${task.task}_${realUser}`
                            return {
                                message: `msg_${match[1]}_${match[2]}_id:${match[3]}`,
                                block: `block_msg_${match[1]}_${match[2]}_id:${match[3]}`,
                                sender: match[1],
                                recipient: match[2],
                                task: task.task,
                                id: id
    
                            }
                        }
                        
                    }
                }
            )
        );
        
        result = result.filter(Boolean)

        return result
    } catch (e) {
        console.log(`ERROR in nodeInt.getUserConversationList! ${e.name}: ${e.message}\n${e.stack}`);
        return false;
    }
}

/**
 * Return conversation messages
 * @param alldata - all dApp storage data
 * @param conversation - conversation id
 * @returns {object|boolean}
 */
export let getUserConversationMessages = async (allData, conversation) => {
    try {
        if (conversation) {
            let result = await Promise.all(
                Object.keys(allData)
                    .map(async key => {
                        const match = /^msg_([0-9a-z-]+)_([0-9a-z-]+)_id:([0-9]+)/i.exec(key);
                        //console.log(match)
                        if (match && ((match[1] === conversation.sender && match[2] == conversation.recipient) || (match[2] === conversation.sender && match[1] == conversation.recipient))) {
                            let task = await getDataByKey(allData, `msg_${match[1]}_${match[2]}_id:${match[3]}`)
                            return {
                                message: `msg_${match[1]}_${match[2]}_id:${match[3]}`,
                                block: `block_msg_${match[1]}_${match[2]}_id:${match[3]}`,
                                task: JSON.parse(task),
                                sender: match[1],
                                recipient: match[2],
                            }
                        }
                    })
                    
            );
            result = result.filter(Boolean)
            return result
        }
        
    } catch (e) {
        console.log(`ERROR in nodeInt.getUserConversationMessages! ${e.name}: ${e.message}\n${e.stack}`);
        return false;
    }
}

export let getDisputeCreator = async (storage, taskId) => {
    try {
        let fullKey = "task_dispute_" + taskId
        let creator = await getDataByKey(storage, fullKey)
        return creator
    } catch (e) {
        console.log(`ERROR in nodeInt.getDisputeCreater! ${e.name}: ${e.message}\n${e.stack}`);
        return false;
    }
}

export let getDisputeMessage = async (storage, key) => {
    try {
        //let fullKey = "task_dispmsg_" + taskId + "_" + user + "_id:" + id
        let message = await getDataByKey(storage, key)
        return message
    } catch (e) {
        console.log(`ERROR in nodeInt.getDisputeMessage! ${e.name}: ${e.message}\n${e.stack}`);
        return false;
    }
}

export let getDisputeMessageBlock = async (storage, taskId, user, id) => {
    try {
        let fullKey = "task_dispmsg_blk_" + taskId + "_" + user + "_id:" + id
        let block = await getDataByKey(storage, fullKey)
        return block
    } catch (e) {
        console.log(`ERROR in nodeInt.getDisputeMessageBlock! ${e.name}: ${e.message}\n${e.stack}`);
        return false;
    }
}

export let getDisputeCommentBlock = async (storage, taskId, user) => {
    try {
        let fullKey = "task_dispcom_blk_" + taskId + "_" + user
        let block = await getDataByKey(storage, fullKey)
        return block
    } catch (e) {
        console.log(`ERROR in nodeInt.getDisputeMessageBlock! ${e.name}: ${e.message}\n${e.stack}`);
        return false;
    }
}

export let getDisputeMessagesCnt = async (storage, taskId, user) => {
    try {
        let fullKey = "task_dispmsg_cnt_" + taskId + "_" + user
        let count = await getDataByKey(storage, fullKey)
        return count
    } catch (e) {
        console.log(`ERROR in nodeInt.getDisputeMessagesCnt! ${e.name}: ${e.message}\n${e.stack}`);
        return false;
    }
}
// let freelancer = await getTaskFreelancer(storage, taskId)
        // let customer = await getTaskAuthor(storage, taskId);
        // let freelancerMsgCnt = await getDisputeMessagesCnt(storage, taskId, freelancer)
        // let customerMsgCnt = await getDisputeMessagesCnt(storage, taskId, customer)
export let getAllDisputeMessages = async (storage, taskId) => {
    try {
        let result = await Promise.all(
            Object.keys(storage)
                .map(async key => {
                    const match = /^task_dispmsg_([0-9a-z-]+)_([0-9a-z-]+)_id:([0-9]+)/i.exec(key);
                    //console.log(match)
                    if (match && ( match[1] == taskId) ) {
                        return {
                            key: match[0],
                            task: match[1],
                            user: match [2],
                            id: match[3]
                        }
                    }
                })
        )
        result = result.filter(Boolean)
        return result

    } catch (e) {
        console.log(`ERROR in nodeInt.getAllDisputeMessages! ${e.name}: ${e.message}\n${e.stack}`);
        return false;
    }
}

export let getAllDisputeMessagesData = async (storage, taskId) => {
    try {
        let disputeMessages = await getAllDisputeMessages(storage, taskId)
        if (disputeMessages) {
            let freelancer = await getTaskFreelancer(storage, taskId)
            let customer = await getTaskAuthor(storage, taskId)
            let freelancerData = await getUserData(storage, freelancer)
            let customerData = await getUserData(storage, customer)
            let data = await Promise.all(
                disputeMessages.map(async msg => {
                    let message = await getDisputeMessage(storage, msg.key)
                    let block = await getDisputeMessageBlock(storage, msg.task, msg.user, msg.id)
                    return {
                        message: "message" in message ? message.message : "",
                        block: Number(block),
                        user: msg.user == freelancer ? freelancerData : customerData,
                        key: msg.key
                    }
                })
            )
            return data.sort(compareBlockDispute)
        } else {
            return false
        }
    } catch (e) {
        console.log(`ERROR in nodeInt.getAllDisputeMessagesData! ${e.name}: ${e.message}\n${e.stack}`);
        return false;
    }
}

export let getAllDisputeComments = async (storage, taskId) => {
    try {
        let result = await Promise.all(
            Object.keys(storage)
                .map(async key => {
                    const match = /^task_dispcom_([0-9a-z-]+)_([0-9a-z-]+)/i.exec(key);
                    if (match && ( match[1] == taskId) ) {
                        return {
                            key: match[0],
                            task: match[1],
                            user: match[2]
                        }
                    }
                })
        )
        result = result.filter(Boolean)
        return result

    } catch (e) {
        console.log(`ERROR in nodeInt.getAllDisputeComments! ${e.name}: ${e.message}\n${e.stack}`);
        return false;
    }
}


export let getAllDisputeCommentsData = async (storage, taskId) => {
    try {
        let disputeComments = await getAllDisputeComments(storage, taskId)
        if (disputeComments) {
            let data = await Promise.all(
                disputeComments.map(async msg => {
                    let message = await getDataByKey(storage, msg.key)
                    let block = await getDisputeCommentBlock(storage, msg.task, msg.user)
                    let user = await getUserData(storage, msg.user)

                    return {
                        message: message,
                        block: Number(block),
                        user: user,
                        key: msg.key
                    }
                })
            )
            return data.sort(compareBlockDispute)
        } else {
            return false
        }
    } catch (e) {
        console.log(`ERROR in nodeInt.getAllDisputeMessagesData! ${e.name}: ${e.message}\n${e.stack}`);
        return false;
    }
}

export let getDisputeData = async (storage, taskId) => {
    try {
        let creator = await getDisputeCreator(storage, taskId);
        let freelancer = await getTaskFreelancer(storage, taskId)
        let customer = await getTaskAuthor(storage, taskId)
        let disputeMessages = await getAllDisputeMessagesData(storage, taskId)
        let disputeComments = await getAllDisputeCommentsData(storage, taskId)
        let taskData = await getTaskData(storage, taskId)
        let dispute = {
            creator: creator,
            customer: customer,
            freelancer: freelancer,
            task: taskId,
            messages: disputeMessages,
            comments: disputeComments
        }

        return dispute

    } catch (e) {
        console.log(`ERROR in nodeInt.getDisputeData! ${e.name}: ${e.message}\n${e.stack}`);
        return false;
    } 
}

export let getAllDisputes = async (storage) => {
    try {
        let result = await Promise.all(
            Object.keys(storage)
                .map(async key => {
                    const match = /^task_dispute_([0-9a-z-]+)/i.exec(key);

                    if (match) {
                        return {
                            key: match[0],
                            task: match[1]
                        }
                    }
                })
        )
        result = result.filter(Boolean)
        return result
    } catch (e) {
        console.log(`ERROR in nodeInt.getAllDisputes! ${e.name}: ${e.message}\n${e.stack}`);
        return false;
    } 
}

export let getAllDisputesData = async (storage) => {
    try {
        let allDisputes = await getAllDisputes(storage)

        if (allDisputes) {
            let data = await Promise.all(
                allDisputes.map(async dispute => {
                    let creator = await getDisputeCreator(storage, dispute.task);
                    let message = await getDataByKey(storage, "task_dispmsg_" + dispute.task + "_" + creator + "_id:0")
                    return {
                        creator: creator,
                        brief: "brief" in message ? message.brief : "",
                        title: "title" in message ? message.title : ""
                    }
                })
            )
            return data
        } else {
            return false
        }
    } catch (e) {
        console.log(`ERROR in nodeInt.getAllDisputesData! ${e.name}: ${e.message}\n${e.stack}`);
        return false;
    } 
}