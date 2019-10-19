const dAppAddress = "3NBngsNecsVX8HzVFTyEQSVGbL9Xia8hBb4";
let CryptoJS = require("crypto-js");

/**
 * User registration
 * @param data - object
 * @param wavesKeeper - class
 */
export let signUp = async (data, wavesKeeper) => {
    wavesKeeper.signAndPublishTransaction({
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
   }).then((tx) => {
        console.log("Success!");
        return (tx)
   }).catch((error) => {
        console.error("Error ", error);
   });
}

/**
 * Creates the task
 * @param item - UUID
 * @param expiration - expiration in seconds
 * @param data - data object
 * @param wavesKeeper - class
 */
export let createTask = async (item, expiration, data, wavesKeeper) => {
    wavesKeeper.signAndPublishTransaction({
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
   }).then((tx) => {
        console.log("Success!");
   }).catch((error) => {
        console.error("Error ", error);
   });
}

/**
 * Updates the task
 * @param taskId - task UUID
 * @param data - object
 * @param wavesKeeper - class
 * @param type - allow types: featured (default), inprogress, closed
 */
export let taskUpdate = async (taskId, data, wavesKeeper, type = "featured") => {
    wavesKeeper.signAndPublishTransaction({
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
   }).then((tx) => {
        console.log("Success!");
   }).catch((error) => {
        console.error("Error ", error);
   });  
}

/**
 * Updates the user
 * @param taskId - user address
 * @param data - object
 * @param wavesKeeper - class
 */
export let userUpdate = async (user, data, wavesKeeper) => {
    wavesKeeper.signAndPublishTransaction({
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
   }).then((tx) => {
        console.log("Success!");
   }).catch((error) => {
        console.error("Error ", error);
   });  
}

/**
 * Take the task
 * @param taskId - task UUID
 * @param comment - message from the freelancer to the customer
 * @param key - key
 * @param wavesKeeper - class
 */
export let takeTask = async (taskId, comment, key, wavesKeeper) => {
    let ciphertext = CryptoJS.AES.encrypt(comment, key).toString();
    wavesKeeper.signAndPublishTransaction({
        type: 16,
        data: {
             fee: {
                 "tokens": "0.05",
                 "assetId": "WAVES"
             },
             dApp: dAppAddress,
             call: {
             	function: 'takeTask',
             	args: [
                    {
                        type: "string", value: taskId
                    },
                    {
                        type: "string", value: ciphertext
                    },
                ]
            },
            payment: []
        }
   }).then((tx) => {
        console.log("Success!");
   }).catch((error) => {
        console.error("Error ", error);
   });  
}