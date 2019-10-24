import { observable, action, configure, computed, autorun, set } from "mobx"
import * as nodeInt from '../modules/nodeInt'

class UserStore {
	@observable isLogin = false
	@observable address = ""
	@observable balance = ""
	@observable network = ""
	@observable userData = ""
	wavesKeeper = ""
	@observable isReg = false
	dapp = "3NBngsNecsVX8HzVFTyEQSVGbL9Xia8hBb4"
	

	@action('user login')
  async login () {
    if (WavesKeeper) {
				this.wavesKeeper = WavesKeeper
        const state = await WavesKeeper.publicState();
				this.isLogin = true
				this.address = state.account.address
				this.balance = state.account.balance.available
				this.network = state.network.server
				this.userData = state
				this.isReg = await nodeInt.checkReg(state.account.address, this.dapp, state.network.server)
				this.isLogin = true
    } else {
      alert("To Auth WavesKeeper should be installed.");
		}
	}

	@computed get isUserLogin() {
    return this.isLogin
	}
	
	@computed get getUserAddress() {
    return this.address
	}
	
	@computed get getUserBalance() {
    return this.balance
	}

	@computed get getUserNetwork() {
    return this.network
	}
	
	@computed get getUserData() {
    return this.userData
	}
	
	@computed get getWavesKeeper() {
		return this.wavesKeeper
	}

	@computed get isUserReg() {
		return this.isReg
	}

	@computed get getDapp() {
		return this.dapp
	}
}

const userStore = new UserStore();

export default userStore;
export { UserStore };