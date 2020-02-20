export let sendInBlockchain = async (signer, dAppAddress, funcName, args, payment = []) => {
    let tx = await signer.invoke({
        dApp: dAppAddress,
        call: {
            function: funcName,
            args: args
        },
        payment: payment
    }).broadcast()

    let confirmed;
    await signer.waitTxConfirm(tx, 1).then((tx2) => {
        if (tx2) {
            confirmed = true;
        } else {
            confirmed = false;
        }
    });

    if (confirmed) {
        return {
            status: true,
        }
    } else {
        return {
            status: false,
        }
    }
}