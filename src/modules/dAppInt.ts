const dAppAddress = "3N3PDiDHb1AJU8tTXJLcvoDNP29fdGNNWqs";
const {nodeInteraction} =  require('@waves/waves-transactions');

/**
 * User registration
 * @param data - object
 * @param wavesKeeper - class
 */
export let signUp = async (data, keeperOrSigner) => {
    try {
    if (keeperOrSigner.type == "keeper") {
            const state = await keeperOrSigner.class.publicState();
            let tx = await keeperOrSigner.class.signAndPublishTransaction({
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
    } else if (keeperOrSigner.type == "signer") {
        let tx = await keeperOrSigner.class.invoke({
            dApp: dAppAddress,
            call: {
                function: "signUp",
                args: [
                    {
                        type: "string", value: JSON.stringify(data)
                    }
                ]
            }
        }).broadcast()
        let confirmed;
        await keeperOrSigner.class.waitTxConfirm(tx, 1).then((tx2) => {
            if (tx2) {
                confirmed = true;
            } else {
                confirmed = false;
            }
          });
          if (confirmed) {
              return {
                status: true,
                //error: error
            }
          } else {
              return {
                status: false,
                //error: error
            }
          }
    } else {
        console.log("Error")
        return {
            status: false,
            //error: error
        }
    }
    } catch(err) {
        //console.error("Error ", error);
        return {
            status: false,
            error: err
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
export let createTask = async (item, expiration, data, keeperOrSigner) => {
    if (keeperOrSigner.type == "keeper") {
        try {
            const state = await keeperOrSigner.class.publicState();
            let tx = await keeperOrSigner.class.signAndPublishTransaction({
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
                    payment: [{assetId: "WAVES", tokens: data.price + data.price*0.02}]
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
            //console.error ("Error ", e);
            return false
        }
    } else if (keeperOrSigner.type == "signer") {
        let tx = await keeperOrSigner.class.invoke({
            //fee: 1000000,
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
                    }
                ]
            },
            payment: [{assetId: null, amount: (data.price + data.price*0.02) * 10e7}]
        }).broadcast().then()
        let confirmed;
        await keeperOrSigner.class.waitTxConfirm(tx, 1).then((tx2) => {
            if (tx2) {
                confirmed = true;
            } else {
                confirmed = false;
            }
          });
          if (confirmed) {
              return true
          } else {
              return false;
          }
    } else {
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
export let taskUpdate = async (taskId, data, keeperOrSigner, type = "featured") => {    
    if (keeperOrSigner.type == "keeper") {
        try {
            const state = await keeperOrSigner.class.publicState();
            let tx = await keeperOrSigner.class.signAndPublishTransaction({
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
    } else if (keeperOrSigner.type == "signer") {
        let tx = await keeperOrSigner.class.invoke({
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
            }
        }).broadcast().then()
        let confirmed;
        await keeperOrSigner.class.waitTxConfirm(tx, 1).then((tx2) => {
            if (tx2) {
                    confirmed = true;
            } else {
                    confirmed = false;
            }
        });
        if (confirmed) {
            return true
        } else {
            return false;
        }
    } else {
        return false
    }


}

/**
 * Updates the user
 * @param taskId - user address
 * @param data - object
 * @param wavesKeeper - class
 */
export let userUpdate = async (user, data, keeperOrSigner) => {
    if (keeperOrSigner.type == "keeper") {
        try {
            const state = await keeperOrSigner.class.publicState();
            let tx = await keeperOrSigner.class.signAndPublishTransaction({
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
    } else if (keeperOrSigner.type == "signer") {
        let tx = await keeperOrSigner.class.invoke({
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
            }
        }).broadcast().then()
        let confirmed;
        await keeperOrSigner.class.waitTxConfirm(tx, 1).then((tx2) => {
            if (tx2) {
                    confirmed = true;
            } else {
                    confirmed = false;
            }
        });
        if (confirmed) {
            return true
        } else {
            return false;
        }
    } else {
        return false
    }
}

/**
 * Take the task
 * @param taskId - task UUID
 * @param message - message
 * @param publicKey - public key of customer
 * @param keeperOrSigner - class (waves keeper or signer)
 */
export let hireFreelancer = async (taskId, freelancer, data, keeperOrSigner) => {
    if (keeperOrSigner.type == "keeper") {
        try {
            const state = await keeperOrSigner.class.publicState();
            let tx = await keeperOrSigner.class.signAndPublishTransaction({
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
    } else if (keeperOrSigner.type == "signer") {
        let tx = await keeperOrSigner.class.invoke({
            dApp: dAppAddress,
            call: {
                function: "hireFreelancer",
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
            }
        }).broadcast().then()
        let confirmed;
        await keeperOrSigner.class.waitTxConfirm(tx, 1).then((tx2) => {
            if (tx2) {
                    confirmed = true;
            } else {
                    confirmed = false;
            }
        });
        if (confirmed) {
            return true
        } else {
            return false;
        }
    } else {
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
export let sendMessage = async (taskId, to, message, publicKey, date, keeperOrSigner) => {
    if (keeperOrSigner.type == "keeper") {
        try {
            const state = await keeperOrSigner.class.publicState();
            let ciphertext = await encryptMessage(message, publicKey, keeperOrSigner.class) // recipient public key
            let data = {
                message: ciphertext,
                task: taskId,
                sender: state.account.address,
                recipient: to,
                date: date
            }
            console.log(ciphertext)
            let tx = await keeperOrSigner.class.signAndPublishTransaction({
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
    } else if (keeperOrSigner.type == "signer") {
        let data = {
            message: message,//ciphertext,
            task: taskId,
            sender: "",//keeperOrSigner.,
            recipient: to,
            date: date
        }
        let tx = await keeperOrSigner.class.invoke({
            dApp: dAppAddress,
            call: {
                function: "sendMessage",
                args: [
                    {
                        type: "string", value: taskId
                    },
                    {
                        type: "string", value: to
                    },
                    {
                        type: "string", value: JSON.stringify(data)
                    }
                ]
            }
        }).broadcast().then()
        let confirmed;
        await keeperOrSigner.class.waitTxConfirm(tx, 1).then((tx2) => {
            if (tx2) {
                    confirmed = true;
            } else {
                    confirmed = false;
            }
        });
        if (confirmed) {
            return true
        } else {
            return false;
        }
    } else {
        return false
    }
}

export let reportCompleteTask = async (taskId, keeperOrSigner) => {
    if (keeperOrSigner.type == "keeper") {
        try {
            const state = await keeperOrSigner.class.publicState();
            let tx = await keeperOrSigner.class.signAndPublishTransaction({
                type: 16,
                data: {
                     fee: {
                         "tokens": "0.05",
                         "assetId": "WAVES"
                     },
                     dApp: dAppAddress,
                     call: {
                     	function: 'reportCompleteTask',
                     	args: [
                            {
                                type: "string", value: taskId
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
                    return true
                }
            } else {
                return false
            }
        } catch (error) {
            console.error("Error ", error);
            return false
       }
    } else if (keeperOrSigner.type == "signer") {
        let tx = await keeperOrSigner.class.invoke({
            dApp: dAppAddress,
            call: {
                function: "reportCompleteTask",
                args: [
                    {
                        type: "string", value: taskId
                    }
                ]
            }
        }).broadcast().then()
        let confirmed;
        await keeperOrSigner.class.waitTxConfirm(tx, 1).then((tx2) => {
            if (tx2) {
                    confirmed = true;
            } else {
                    confirmed = false;
            }
        });
        if (confirmed) {
            return true
        } else {
            return false;
        }
    } else {
        return false
    }
}

export let acceptWork = async (taskId, complete, keeperOrSigner) => {
    if (keeperOrSigner.type == "keeper") {
        try {
            const state = await keeperOrSigner.class.publicState();
            let tx = await keeperOrSigner.class.signAndPublishTransaction({
                type: 16,
                data: {
                     fee: {
                         "tokens": "0.05",
                         "assetId": "WAVES"
                     },
                     dApp: dAppAddress,
                     call: {
                     	function: 'acceptWork',
                     	args: [
                            {
                                type: "string", value: taskId
                            },
                            {
                                type: "boolean", value: complete
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
                    return true
                }
            } else {
                return false
            }
        } catch (error) {
            console.error("Error ", error);
            return false
       }
    } else if (keeperOrSigner.type == "signer") {
        let tx = await keeperOrSigner.class.invoke({
            dApp: dAppAddress,
            call: {
                function: "acceptWork",
                args: [
                    {
                        type: "string", value: taskId
                    },
                    {
                        type: "boolean", value: complete
                    }
                ]
            }
        }).broadcast().then()
        let confirmed;
        await keeperOrSigner.class.waitTxConfirm(tx, 1).then((tx2) => {
            if (tx2) {
                    confirmed = true;
            } else {
                    confirmed = false;
            }
        });
        if (confirmed) {
            return true
        } else {
            return false;
        }
    } else {
        return false
    }
}