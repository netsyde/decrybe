const {broadcast, data} =  require('@waves/waves-transactions');
const axios = require('axios');

export let getBalance = async (address, nodeUrl) => {
    try {
        return await axios.get(`${nodeUrl}/addresses/balance/${address}`).then(resp => {return resp.data});
    } catch (e) {
        console.log(`ERROR in nodeInt.getBalance! ${e.name}: ${e.message}\n${e.stack}`);
    }
}

export let dataTx = async (info, seed, nodeUrl) => {
    try {
        let dataParams = {
            data: [
              {
                key: info.id, value: JSON.stringify(info)
              }
            ]
          }
        broadcast( data( {data: dataParams.data, fee: 100000}, seed), nodeUrl ).then( (v) => {
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
