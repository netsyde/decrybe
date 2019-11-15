import { observable, action, computed, autorun } from "mobx"
import * as nodeInt from '../modules/nodeInt'
import {RootStore} from './RootStore'
import Cookies from 'universal-cookie';
class UserStore {
	@observable isLogin: boolean = false;
	@observable address: string = "";
	@observable balance;
	@observable network: string = "";
	@observable userData;
	@observable isReg;
	@observable name: string = "";
	@observable socials: Array<String> = [];
	@observable bio: string = "";
	@observable status: string = "";
	@observable createTime = "";
	@observable tags: Array<String> = [];
	@observable avatar = "";
	@observable location = "";
	dapp: string = "3N9kox62MPg67TokQMTTZJKTYQBPwtJL2Tk";
	wavesKeeper;
	cookies = new Cookies()
	constructor(public root: RootStore) {
		this.root = root
	}	

	@action('restore session')
	async restoreSession() {
		let address = this.cookies.get("address")
		let nodeUrl = this.cookies.get("network")
		this.setUserNetwork(nodeUrl)
		this.setUserAddress(address)
		console.log('restore session')
		this.wavesKeeper = WavesKeeper;
		this.isLogin = true;
		this.isReg = await nodeInt.checkReg(address, this.dapp, nodeUrl);
		if (this.isReg) {
			let userDataFromDapp = await nodeInt.getUserData(address, this.dapp, nodeUrl);
			if (userDataFromDapp) {
				this.name = userDataFromDapp.name;
				this.root.settings.setName(this.name)
				this.socials = userDataFromDapp.socials;
				this.root.settings.setSocials(this.socials)
				this.bio = userDataFromDapp.bio;
				this.root.settings.setBio(this.bio)
				this.status = userDataFromDapp.status;
				this.createTime = userDataFromDapp.createTime;
				this.tags = userDataFromDapp.tags;
				this.root.settings.setTags(this.tags)
				this.avatar = userDataFromDapp.avatar
				this.root.settings.setAvatar(this.avatar)
				this.location = userDataFromDapp.location
				this.root.settings.setAvatar(this.location)
				console.log("userData success")
			} else {
				console.log('userData kick')
			}
		}
		await this.root.tasks.loadTasks(this.isUserLogin, this.getDapp, nodeUrl)
	}

	checkSession() {
		let address = this.cookies.get("address")
		let nodeUrl = this.cookies.get("network")
		console.log('checkSession')
		if (address && nodeUrl) {
			return true
		} else {
			return false
		}
	}

	@action("login")
	async login () {
		if (WavesKeeper) {
			this.wavesKeeper = WavesKeeper;
			const state = await WavesKeeper.publicState();
			
			this.address = state.account.address;
			this.balance = state.account.balance.available;
			this.network = state.network.server;
			this.userData = state;
			this.isLogin = true;
			this.isReg = await nodeInt.checkReg(state.account.address, this.dapp, state.network.server);
			console.log(this.isReg)
			if (this.isReg) {
				this.cookies.set('address', this.getUserAddress, { path: '/' });
				this.cookies.set('network', this.getUserNetwork, { path: '/' });
				let userDataFromDapp = await nodeInt.getUserData(state.account.address, this.dapp, state.network.server);
				if (userDataFromDapp) {
					this.name = userDataFromDapp.name;
					this.root.settings.setName(this.name)
					this.socials = userDataFromDapp.socials;
					this.root.settings.setSocials(this.socials)
					this.bio = userDataFromDapp.bio;
					this.root.settings.setBio(this.bio)
					this.status = userDataFromDapp.status;
					this.createTime = userDataFromDapp.createTime;
					this.tags = userDataFromDapp.tags;
					this.root.settings.setTags(this.tags)
					this.avatar = userDataFromDapp.avatar
					this.root.settings.setAvatar(this.avatar)
					this.location = userDataFromDapp.location
					this.root.settings.setAvatar(this.location)
					console.log("userData success")
				} else {
					console.log('userData kick')
				}
			} else {
				console.log('User not signup')
			}
			await this.root.tasks.loadTasks(this.isUserLogin, this.getDapp, this.getUserNetwork)
		} else {
			alert("To Auth WavesKeeper should be installed.");
		}
	}

	@action("sign out")
	signOut() {
		console.log('sign out')
		this.isLogin = false;
		this.address = "";
		this.balance;
		this.network = "";
		this.userData = "";
		this.isReg = undefined;
		this.name = ""
		this.socials = []
		this.bio = ""
		this.status = ""
		this.createTime = ""
		this.tags = []
		this.avatar = ""
		this.location = ""
		// firefox fix
		this.cookies.set('address', '', { path: '/' });
		this.cookies.set('network', '', { path: '/' });
		// 
		this.cookies.remove('address')
		this.cookies.remove('network')
		
	}

	@computed get isUserLogin() {
		return this.isLogin
	}
	
	@computed get getUserAddress() {
		return this.address
	}

	@action("set network")
	setUserAddress (address) {
		this.address = address;
	}
	
	@computed get getUserBalance() {
		return this.balance
	}

	@computed get getUserNetwork() {
		return this.network
	}

	@action("set network")
	setUserNetwork (network) {
		this.network = network;
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

	@action("set user register")
	setUserReg () {
		this.isReg = true;
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

	@computed get getUserFullData() {
		let data = {
			name: this.name,
			avatar: this.avatar,
			bio: this.bio,
			balance: this.getUserBalance,
			tags: this.getUserTags,
			status: this.getUserStatus,
			createTime: this.getUserCreateTime,
			network: this.getUserNetwork,
			socials: this.getUserSocials,
			//location: this.getUser
		}
		return data
	}
	
}



export { UserStore };