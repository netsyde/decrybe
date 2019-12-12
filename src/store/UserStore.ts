import { observable, action, computed } from "mobx"
import * as nodeInt from '../modules/nodeInt'
import {RootStore} from './RootStore'
import Cookies from 'universal-cookie';
import moment from 'moment'
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
	@observable storage;
	@observable online = false
	@observable tasks = [];
	@observable avatarColor = ""
	@observable showRegister = false
	@observable publicKey = ""
	@observable conversations = []
	@observable locked = true
	dapp: string = "3N3PDiDHb1AJU8tTXJLcvoDNP29fdGNNWqs";
	wavesKeeper;
	cookies = new Cookies()
	constructor(public root: RootStore) {
		this.root = root
	}	

	@action('restore session')
	async restoreSession() {
		try {
			if (WavesKeeper) {
				let address = this.cookies.get("address")
				let nodeUrl = this.cookies.get("network")
				this.setUserNetwork(nodeUrl)
				this.setUserAddress(address)
				console.log('DEBUG: Restore session')
		
				await this.getState()
			} else {
				alert("To Auth WavesKeeper should be installed.");
			}
		} catch (e) {
			if (e.message == "WavesKeeper is not defined") {
				alert("To Auth WavesKeeper should be installed.");
			} else {
				console.log(`ERROR in UserStore.restoreSession! ${e.name}: ${e.message}\n${e.stack}`);
			}
		}
	}

	checkSession() {
		let address = this.cookies.get("address")
		let nodeUrl = this.cookies.get("network")
		console.log('DEBUG: Check session')
		if (address && nodeUrl) {
			return true
		} else {
			return false
		}
	}
	@action("update storage")
	async updateStorage () {
		this.storage = await nodeInt.getAllData(this.dapp, this.network);
		await this.root.tasks.loadTasks(this.isUserLogin, this.getDapp, this.getUserNetwork)
		let conversations = await nodeInt.getConversationData(this.getStorage, this.getUserAddress, this.getDapp, this.getUserNetwork, this.getWavesKeeper)
		if (conversations) {
			this.conversations = conversations
		}
		console.log('DEBUG: Storage update')
	}

	@action("login")
	async login () {
		try {
			
			if (WavesKeeper) {
				const authData = { data: "Auth on decrybe.com" };
				WavesKeeper.auth(authData)
				.then(async () => {
					await this.getState()
				})
			} else {
				alert("To Auth WavesKeeper should be installed.");
			}
			
		} catch (e) {
			if (e.message == "WavesKeeper is not defined") {
				alert("To Auth WavesKeeper should be installed.");
			} else {
				console.log(`ERROR in UserStore.login! ${e.name}: ${e.message}\n${e.stack}`);
			}
		}
	}

	async getState () {
		try {
			console.log('DEBUG: Get state')
			this.online = true
			this.wavesKeeper = WavesKeeper;
			let api = await WavesKeeper.initialPromise
			if (api) {
				const state = await WavesKeeper.publicState();
				//console.log(state)
				
				this.address = state.account.address;
				this.balance = state.account.balance.available;
				this.network = state.network.server;
				this.publicKey = state.account.publicKey;
				this.locked = state.locked
				this.userData = state;
				
				this.storage = await nodeInt.getAllData(this.dapp, state.network.server);
				//console.log(this.storage)
				this.isLogin = true;
				this.isReg = await nodeInt.checkReg(this.storage, state.account.address);

				if (this.isReg) {
					this.cookies.set('address', this.getUserAddress, { path: '/' });
					this.cookies.set('network', this.getUserNetwork, { path: '/' });
					let userDataFromDapp = await nodeInt.getUserData(this.storage, state.account.address);
					let conversations = await nodeInt.getConversationData(this.getStorage, this.getUserAddress, this.getDapp, this.getUserNetwork, this.getWavesKeeper)
					if (conversations) {
						this.conversations = conversations
						console.log("DEBUG: Conversations loaded")
					}
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
						this.avatarColor = userDataFromDapp.avatarColor // ava color
						this.location = userDataFromDapp.location
						this.root.settings.setLocation(this.location)
						let userTasks = await nodeInt.getAllUserTasks(this.storage, this.address, this.dapp, state.network.server)
						if (userTasks) {
							this.tasks = userTasks;
						}
						console.log("DEBUG: User data loaded")
					} else {
						console.log('DEBUG: User data not loaded')
					}
				} else {
					this.showRegister = true;
					console.log('DEBUG: User is not registered')
				}
				await this.root.tasks.loadTasks(this.isUserLogin, this.getDapp, this.getUserNetwork)
				await this.root.users.loadUsers(this.isUserLogin, this.getDapp, this.getUserNetwork)
			} else {
				console.log('DEBUG: Waves Keeper is undefined')
			}
		} catch (e) {
			console.log(`ERROR in UserStore.getState! ${e.name}: ${e.message}\n${e.stack}`);
		}
	}

	async actionAfterSignup () {
		this.getState ()
	}
	@action("sign out")
	signOut() {
		console.log('sign out')
		this.isLogin = false;
		this.online = false;
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
		this.publicKey = ""
		// firefox fix
		this.cookies.set('address', '', { path: '/' });
		this.cookies.set('network', '', { path: '/' });
		// 
		this.cookies.remove('address')
		this.cookies.remove('network')
		
	}

	@computed get getStorage() {
		return this.storage
	}

	@computed get getConversations() {
		return this.conversations
	}

	@computed get isUserLogin() {
		return this.isLogin
	}

	@computed get isKeeperLocked() {
		return this.locked
	}

	setKeeperLocked(boolean) {
		this.locked = boolean
	}

	@computed get isUserOnline() {
		return this.online
	}
	
	@computed get getUserAddress() {
		return this.address
	}

	@computed get getUserPublicKey() {
		return this.publicKey
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

	@action("set network")
	setShowRegister (boolean) {
		this.showRegister = boolean;
	}

	@computed get getShowRegister() {
		return this.showRegister
	}
	
	@computed get getWavesKeeper() {
		return this.wavesKeeper
	}

	@action("set waves keeper")
	setWavesKeeper (keeper) {
		this.wavesKeeper = keeper;
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

	@action("set user name")
	setUserName (name) {
		this.name = name;
	}

	@computed get getUserSocials() {
		return this.socials
	}

	@action("set user socials")
	setUserSocials (socials) {
		this.socials = socials;
	}

	@computed get getUserBio() {
		return this.bio
	}

	@action("set user bio")
	setUserBio (bio) {
		this.bio = bio;
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

	@action("set user tags")
	setUserTags (tags) {
		this.tags = tags;
	}

	@computed get getUserAvatar() {
		return this.avatar
	}

	@action("set user avatar")
	setUserAvatar (avatar) {
		this.avatar = avatar;
	}

	@computed get getUserAvatarColor() {
		return this.avatarColor
	}

	@action("set user avatar")
	setUserAvatarColor (avatarColor) {
		this.avatarColor = avatarColor;
	}

	@computed get getUserLocation() {
		return this.location
	}

	@action("set location")
	setUserLocation (location) {
		this.location = location;
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

	@computed get getTasks () {
		return this.tasks
	}
	
}



export { UserStore };