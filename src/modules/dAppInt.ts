const dAppAddress = "3MzSNsJLeYj6Eh6u2QzJrbByPCySgFoCbWC";
const {nodeInteraction} =  require('@waves/waves-transactions');
import * as keeperTransport from './keeperTransport'
import * as signerTransport from './signerTransport'

export let methodPredictor = async (keeperOrSigner, dAppAddress, funcName, args, price) => {
    try {
        let _type = keeperOrSigner.type;
        let _class = keeperOrSigner.class;

        if (_type == "keeper") {
            let payment;

            if (price) {
                payment = [{assetId: "WAVES", tokens: Number(price) + Number(price)*0.02}]
            } else {
                payment = []
            }
            console.log(payment)

            return await keeperTransport.sendInBlockchain(_class, dAppAddress, funcName, args, payment)

        } else if (_type == "signer") {
            let payment;

            if (price) {
                payment = [{assetId: null, amount: (Number(price) + Number(price)*0.02) * 10e7}]
            } else {
                payment = []
            }

            return await signerTransport.sendInBlockchain(_class, dAppAddress, funcName, args, payment)

        } else {
            return false
        }

    } catch (e) {
        console.log(e)
    }
}

/**
 * User registration
 * @param data - object
 * @param wavesKeeper - class
 */
export let signUp = async (data, keeperOrSigner) => {
    try {
        let args = [
            {
                type: "string", value: JSON.stringify(data)
            }
        ]

        return await methodPredictor(keeperOrSigner, dAppAddress, "signUp", args, false)

    } catch(err) {

        return false
        
    }
}

/**
 * Creates the task
 * @param item - UUID
 * @param expiration - expiration in seconds
 * @param data - data object
 * @param wavesKeeper - class
 */
export let createTask = async (item, expiration, data, price, keeperOrSigner) => {
    try {
        let args = [
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

        return await methodPredictor(keeperOrSigner, dAppAddress, "createTask", args, price)

    } catch (e) {
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
export let taskUpdate = async (taskId, data, keeperOrSigner) => {    
    try {
        let args = [
            {
                type: "string", value: taskId
            },
            {
                type: "string", value: JSON.stringify(data)
            },
        ]
        return await methodPredictor(keeperOrSigner, dAppAddress, "taskUpdate", args, false)

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
export let userUpdate = async (data, keeperOrSigner) => {
    try {
        let args = [
            {
                type: "string", value: JSON.stringify(data)
            },
        ]
        return await methodPredictor(keeperOrSigner, dAppAddress, "userUpdate", args, false)

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
 * @param keeperOrSigner - class (waves keeper or signer)
 */
export let hireFreelancer = async (taskId, freelancer, keeperOrSigner) => {
    try {
        let args = [
            {
                type: "string", value: taskId
            },
            {
                type: "string", value: freelancer
            },
        ]
        return await methodPredictor(keeperOrSigner, dAppAddress, "hireFreelancer", args, false)

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
 * send message == need rework
 * @param taskId - task UUID
 * @param to - recipient address
 * @param message - message
 * @param publicKey - public key of recipient
 * @param wavesKeeper - class
 */
export let sendMessage = async (taskId, to, message, publicKey, date, keeperOrSigner) => {
    try {
        let ciphertext = await encryptMessage(message, publicKey, keeperOrSigner.class) // recipient public key
        const state = await keeperOrSigner.class.publicState();
        let data = {
            message: ciphertext,
            task: taskId,
            sender: state.account.address,
            recipient: to,
            date: date
        }
        console.log(ciphertext)
        let args = [
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
        return await methodPredictor(keeperOrSigner, dAppAddress, "sendMessage", args, false)
    } catch (error) {
        console.error("Error ", error);
        return false
    }
}

export let reportCompleteTask = async (taskId, keeperOrSigner) => {
    try {
        let args = [
            {
                type: "string", value: taskId
            }
        ]
        return await methodPredictor(keeperOrSigner, dAppAddress, "reportCompleteTask", args, false)
    } catch (error) {
        console.error("Error ", error);
        return false
    }

}

export let acceptWork = async (taskId, complete, keeperOrSigner) => {
    try {
        let args = [
            {
                type: "string", value: taskId
            },
            {
                type: "boolean", value: complete
            }
        ]
        return await methodPredictor(keeperOrSigner, dAppAddress, "acceptWork", args, false)
    } catch (error) {
        console.error("Error ", error);
        return false
    }
}

export let moveDeadline = async (taskId: string, deadline: number, keeperOrSigner) => {
    try {
        let args = [
            {
                type: "string", value: taskId
            },
            {
                type: "integer", value: deadline
            }
        ]
        return await methodPredictor(keeperOrSigner, dAppAddress, "moveDeadline", args, false)
    } catch (error) {
        console.error("Error ", error);
        return false
    }

}

export let voteTask = async (taskId: string, vote: string, keeperOrSigner) => {
    try {
        let args = [
            {
                type: "string", value: taskId
            },
            {
                type: "string", value: vote
            }
        ]
        return await methodPredictor(keeperOrSigner, dAppAddress, "voteTask", args, false)
    } catch (error) {
        console.error("Error ", error);
        return false
    }
}

export let reportUser = async (user: string, keeperOrSigner) => {
    try {
        let args = [
            {
                type: "string", value: user
            },
        ]
        return await methodPredictor(keeperOrSigner, dAppAddress, "reportUser", args, false)
    } catch (error) {
        console.error("Error ", error);
        return false
    }
}

export let openTaskDispute = async (task: string, message: string, keeperOrSigner) => {
    try {
        let args = [
            {
                type: "string", value: task
            },
            {
                type: "string", value: JSON.stringify(message)
            },
        ]
        return await methodPredictor(keeperOrSigner, dAppAddress, "openTaskDispute", args, false)
    } catch (error) {
        console.error("Error ", error);
        return false
    }
}

export let voteTaskDispute = async (task: string, variant: string, message: string, keeperOrSigner) => {
    try {
        let args = [
            {
                type: "string", value: task
            },
            {
                type: "string", value: variant
            },
            {
                type: "string", value: JSON.stringify(message)
            },
        ]
        return await methodPredictor(keeperOrSigner, dAppAddress, "voteTaskDispute", args, false)
    } catch (error) {
        console.error("Error ", error);
        return false
    }
}

export let taskDisputeMessage = async (task: string, message, keeperOrSigner) => {
    try {
        let args = [
            {
                type: "string", value: task
            },
            {
                type: "string", value: JSON.stringify(message)
            },
        ]
        return await methodPredictor(keeperOrSigner, dAppAddress, "taskDisputeMessage", args, false)
    } catch (error) {
        console.error("Error ", error);
        return false
    }
}

export let cancelTask = async (task: string, keeperOrSigner) => {
    try {
        let args = [
            {
                type: "string", value: task
            },
        ]
        return await methodPredictor(keeperOrSigner, dAppAddress, "cancelTask", args, false)
    } catch (error) {
        console.error("Error ", error);
        return false
    }
}

export let defineDisputeWinner = async (task: string, keeperOrSigner) => {
    try {
        let args = [
            {
                type: "string", value: task
            },
        ]
        return await methodPredictor(keeperOrSigner, dAppAddress, "defineDisputeWinner", args, false)
    } catch (error) {
        console.error("Error ", error);
        return false
    }
}

export let leaveUserReview = async (user: string, task: string, review, keeperOrSigner) => {
    try {
        let args = [
            {
                type: "string", value: user
            },
            {
                type: "string", value: task
            },
            {
                type: "string", value: JSON.stringify(review)
            },
        ]
        return await methodPredictor(keeperOrSigner, dAppAddress, "leaveUserReview", args, false)
    } catch (error) {
        console.error("Error ", error);
        return false
    }
}