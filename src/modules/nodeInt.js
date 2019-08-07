const {nodeInteraction} =  require('@waves/waves-transactions');
const axios = require('axios');
export let getBalance = async (address, nodeUrl) => {
    try {
        return await axios.get(`${nodeUrl}/addresses/balance/${address}`).then(resp => {return resp.data});
    } catch (e) {
        console.log(e)
    }
}