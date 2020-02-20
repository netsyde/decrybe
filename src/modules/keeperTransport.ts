const {nodeInteraction} =  require('@waves/waves-transactions');

export let sendInBlockchain = async (keeper, dAppAddress, funcName, args, payment = []) => {
    try {
        const state = await keeper.publicState();
        let tx = await keeper.signAndPublishTransaction({
            type: 16,
            data: {
                 fee: {
                     "tokens": "0.05",
                     "assetId": "WAVES"
                 },
                 dApp: dAppAddress,
                 call: {
                     function: funcName,
                     args: args
                }, 
                payment: payment
            }
       })

        tx = JSON.parse(tx)
        if (tx) {
            console.log(tx.id)
            let wait = await nodeInteraction.waitForTx(tx.id, {apiBase: state.network.server})
            if (wait) {
                // return {
                //     status: true,
                //     //error: error
                // }
                return true
            }
        } else {
            // return {
            //     status: false,
            //     //error: error
            // }
            return false
        }
    } catch (e) {
        console.log(e)
    }
}