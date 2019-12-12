const dAppAddress = "3N3PDiDHb1AJU8tTXJLcvoDNP29fdGNNWqs";
const {nodeInteraction} =  require('@waves/waves-transactions');

/**
 * User registration
 * @param data - object
 * @param wavesKeeper - class
 */
export let signUp = async (data, wavesKeeper) => {
    const state = await wavesKeeper.publicState();
    try {
        let tx = await wavesKeeper.signAndPublishTransaction({
            type: 16,
            data: {
                 fee: {
                     "tokens": "0.05",
                     "assetId": "WAVES"
                 },
                 dApp: dAppAddress,
                 call: {
                 	function: 'signUp',
                 	args: [
                        {
                            type: "string", value: JSON.stringify(data)
                        }
                    ]
                }, 
                payment: []
            }
       })

        tx = JSON.parse(tx)
        if (tx) {
            console.log(tx.id)
            let wait = await nodeInteraction.waitForTx(tx.id, {apiBase: state.network.server})
            if (wait) {
                return {
                    status: true,
                    //error: error
                }
            }
        } else {
            return {
                status: false,
                //error: error
            }
        }
    } catch(error) {
        console.error("Error ", error);
        return {
            status: false,
            error: error
        }
   }
}

/**
 * Creates the task
 * @param item - UUID
 * @param expiration - expiration in seconds
 * @param data - data object
 * @param wavesKeeper - class
 */
export let createTask = async (item, expiration, data, wavesKeeper) => {
    const state = await wavesKeeper.publicState();
    try {
        let tx = await wavesKeeper.signAndPublishTransaction({
            type: 16,
            data: {
                fee: {
                    "tokens": "0.05",
                    "assetId": "WAVES"
                },
                dApp: dAppAddress,
                call: {
                	function: 'createTask',
                 	args: [
                        {
                            type: "string", value: item
                        },
                        {
                            type: "integer", value: expiration
                        },
                        {
                            type: "string", value: JSON.stringify(data)
                        }
                    ]
                },
                payment: [{assetId: "WAVES", tokens: 1}]
            }
        })
        tx = JSON.parse(tx)
        if (tx) {
            console.log(tx.id)
            let wait = await nodeInteraction.waitForTx(tx.id, {apiBase: state.network.server})
            if (wait) {
                return true
            }
        } else {
            return false
        }
    } catch (e) {
        console.error("Error ", e);
        return false
    }
}

/**
 * Updates the task
 * @param taskId - task UUID
 * @param data - object
 * @param wavesKeeper - class
 * @param type - allow types: featured (default), inprogress, closed
 */
export let taskUpdate = async (taskId, data, wavesKeeper, type = "featured") => {
    const state = await wavesKeeper.publicState();
    
    try {
        let tx = await wavesKeeper.signAndPublishTransaction({
            type: 16,
            data: {
                 fee: {
                     "tokens": "0.05",
                     "assetId": "WAVES"
                 },
                 dApp: dAppAddress,
                 call: {
                 	function: 'taskUpdate',
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
                payment: []
            }
        })
        tx = JSON.parse(tx)
        if (tx) {
            console.log(tx.id)
            let wait = await nodeInteraction.waitForTx(tx.id, {apiBase: state.network.server})
            if (wait) {
                return true
            }
        } else {
            return false
        }
    } catch (e) {
        console.error("Error ", e);
        return false
    }

}

/**
 * Updates the user
 * @param taskId - user address
 * @param data - object
 * @param wavesKeeper - class
 */
export let userUpdate = async (user, data, wavesKeeper) => {
    const state = await wavesKeeper.publicState();
    try {
        let tx = await wavesKeeper.signAndPublishTransaction({
            type: 16,
            data: {
                 fee: {
                     "tokens": "0.05",
                     "assetId": "WAVES"
                 },
                 dApp: dAppAddress,
                 call: {
                 	function: 'userUpdate',
                 	args: [
                        {
                            type: "string", value: user
                        },
                        {
                            type: "string", value: JSON.stringify(data)
                        },
                    ]
                },
                payment: []
            }
        })
        tx = JSON.parse(tx)
        if (tx) {
            console.log(tx.id)
            let wait = await nodeInteraction.waitForTx(tx.id, {apiBase: state.network.server})
            if (wait) {
                return true
            }
        } else {
            return false
        }
    } catch (error) {
        console.error("Error ", error);
        return false
   }
}

/**
 * Take the task
 * @param taskId - task UUID
 * @param message - message
 * @param publicKey - public key of customer
 * @param wavesKeeper - class
 */
export let hireFreelancer = async (taskId, freelancer, data, wavesKeeper) => {
    const state = await wavesKeeper.publicState();

    try {
        let tx = await wavesKeeper.signAndPublishTransaction({
            type: 16,
            data: {
                 fee: {
                     "tokens": "0.05",
                     "assetId": "WAVES"
                 },
                 dApp: dAppAddress,
                 call: {
                 	function: 'hireFreelancer',
                 	args: [
                        {
                            type: "string", value: taskId
                        },
                        {
                            type: "string", value: freelancer
                        },
                        {
                            type: "string", value: JSON.stringify(data)
                        },
                    ]
                },
                payment: []
            }
        })
        tx = JSON.parse(tx)
        if (tx) {
            console.log(tx.id)
            let wait = await nodeInteraction.waitForTx(tx.id, {apiBase: state.network.server})
            if (wait) {
                return true
            }
        } else {
            return false
        }
    } catch (error) {
        console.error("Error ", error);
        return false
   }
}

export let encryptMessage = async (message, publicKey, wavesKeeper) => {
    try {
        return await wavesKeeper.encryptMessage(message, publicKey, 'decrybe')
        
    } catch (e) {
        console.error("Error ", e);
        return false
    }
}

export let decryptMessage = async (message, publicKey, wavesKeeper) => {
    try {
        return await wavesKeeper.decryptMessage(message, publicKey, 'decrybe')
       
    } catch (e) {
        console.error("Error ", e);
        return false
    }
}

/**
 * send message
 * @param taskId - task UUID
 * @param to - recipient address
 * @param message - message
 * @param publicKey - public key of recipient
 * @param wavesKeeper - class
 */
export let sendMessage = async (taskId, to, message, publicKey, date, wavesKeeper) => {
    const state = await wavesKeeper.publicState();

    let ciphertext = await encryptMessage(message, publicKey, wavesKeeper) // recipient public key
    let data = {
        message: ciphertext,
        task: taskId,
        sender: state.account.address,
        recipient: to,
        date: date
    }
    console.log(ciphertext)
    try {
        let tx = await wavesKeeper.signAndPublishTransaction({
            type: 16,
            data: {
                 fee: {
                     "tokens": "0.05",
                     "assetId": "WAVES"
                 },
                 dApp: dAppAddress,
                 call: {
                 	function: 'sendMessage',
                 	args: [
                        {
                            type: "string", value: taskId
                        },
                        {
                            type: "string", value: to
                        },
                        {
                            type: "string", value: JSON.stringify(data)
                        },
                    ]
                },
                payment: []
            }
        })
        tx = JSON.parse(tx)
        if (tx) {
            console.log(tx.id)
            let wait = await nodeInteraction.waitForTx(tx.id, {apiBase: state.network.server})
            if (wait) {
                return true
            }
        } else {
            return false
        }
    } catch (error) {
        console.error("Error ", error);
        return false
   }
}