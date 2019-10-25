import { observable, action, configure, computed, autorun, set } from "mobx"
import * as nodeInt from '../modules/nodeInt'

class UserStore {
	@observable isLogin = false;
	@observable address = "";
	@observable balance = "";
	@observable network = "";
	@observable userData = "";
	@observable isReg = "";
	@observable name = "";
	@observable socials = "";
	@observable bio = "";
	@observable status = "";
	@observable createTime = "";
	@observable tags = "";
	@observable avatar = "";
	dapp = "3NBngsNecsVX8HzVFTyEQSVGbL9Xia8hBb4";
	wavesKeeper = "";
	@observable allTasksIds = []
	@observable allTasksData = []
	

	@action('user login')
  async login () {
    if (WavesKeeper) {
				this.wavesKeeper = WavesKeeper;
        const state = await WavesKeeper.publicState();
				this.isLogin = true;
				this.address = state.account.address;
				this.balance = state.account.balance.available;
				this.network = state.network.server;
				this.userData = state;
				this.isReg = await nodeInt.checkReg(state.account.address, this.dapp, state.network.server);
				await this.loadTasks()
				if (this.isReg) {
					let userDataFromDapp = await nodeInt.getUserData(state.account.address, this.dapp, state.network.server);
					if (userDataFromDapp) {
						this.name = userDataFromDapp.name;
						this.socials = userDataFromDapp.socials;
						this.bio = userDataFromDapp.bio;
						this.status = userDataFromDapp.status;
						this.createTime = userDataFromDapp.createTime;
						this.tags = userDataFromDapp.tags;
						this.avatar = userDataFromDapp.avatar
						console.log("userData norm")
					} else {
						console.log('userData kick')
					}
				} else {
					console.log('User not signup')
				}
    } else {
      alert("To Auth WavesKeeper should be installed.");
		}
	}

	@action("sign out")
	signOut() {
		this.isLogin = false;
		this.address = "";
		this.balance = "";
		this.network = "";
		this.userData = "";
		this.isReg = "";
		this.name = ""
		this.socials = ""
		this.bio = ""
		this.status = ""
		this.createTime = ""
		this.tags = ""
		this.avatar = ""
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

	@computed get getUserName() {
		return this.name
	}

	@computed get getUserSocials() {
		return this.socials
	}

	@computed get getUserBio() {
		return this.bio
	}

	@computed get getUserStatus() {
		return this.status
	}

	@computed get getUserCreateTime() {
		return this.createTime
	}

	@computed get getUserTags() {
		return this.tags
	}

	@computed get getUserAvatar() {
		return this.avatar
	}

	async loadTasks() {
		if (this.isLogin) {
				this.allTasksIds = await nodeInt.getAllTasks(this.dapp, this.network)

				for (let i = 0; i < this.allTasksIds.length; i++) {
						let taskData = await nodeInt.getTaskData(this.allTasksIds[i], this.dapp, this.network)
						if (taskData) {
								this.allTasksData.push(taskData)
						}
				}
						
		}
}

	@computed get getTasks () {
		//console.log(this.allTasksData)
		let data = [
		]
		data = this.allTasksData
		if (data > 0)
		return data;
	}

	@computed get getAllTasksIds () {
		if (this.allTasksIds.length > 0) 
			return this.allTasksIds
	}

	@computed get getAllTasksLength () {
		if (this.allTasksData.length > 0) 
			return this.allTasksData.length
	}

	@action getTaskAuthor (i) {
		if (this.allTasksData.length > 0)
			return this.allTasksData[i].author;
	}

	@action getTaskTitle (i) {
		if (this.allTasksData.length > 0)
		return this.allTasksData[i].title;
	}

	@action getTaskContents (i) {
		if (this.allTasksData.length > 0)
		return this.allTasksData[i].contents;
	}

	@action getTaskCreateTime (i) {
		if (this.allTasksData.length > 0)
		return this.allTasksData[i].createTime;
	}

	@action getTaskPrice (i) {
		if (this.allTasksData.length > 0)
		return this.allTasksData[i].price;
	}

	@action getTaskDescription (i) {
		if (this.allTasksData.length > 0)
		return this.allTasksData[i].description;
	}

	
}

const userStore = new UserStore();

export default userStore;
export { UserStore };