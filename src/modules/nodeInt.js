const {broadcast, data, nodeInteraction, seedUtils} =  require('@waves/waves-transactions');
const {address} = require('@waves/ts-lib-crypto');
const axios = require('axios');

const dApp = "3NBngsNecsVX8HzVFTyEQSVGbL9Xia8hBb4"

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
 * Receive data from task
 * @param key - task id
 * @param dAppAddress - dApp address
 * @param nodeUrl - node url
 */
export let getDataByKey = async (key, dAppAddress, nodeUrl) => {
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
        console.log(`ERROR in nodeInt.getDataByKey! ${e.name}: ${e.message}\n${e.stack}`);
    }
}

/**
 * Check user registration
 * @param address - user address
 * @param dAppAddress - dApp address
 * @param nodeUrl - node url
 */
export let checkReg = async (address, dAppAddress, nodeUrl) => {
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
        console.log(`ERROR in nodeInt.takeOrder! ${e.name}: ${e.message}\n${e.stack}`);
    }
}

//checkReg("3N9HPLR8Pyp8vREkHU1uvC6vrM7s1poKiUD", dApp, "https://testnodes.wavesnodes.com")