import { observable, action, computed } from "mobx"
import * as nodeInt from '../modules/nodeInt'
import {RootStore} from './RootStore'
import Cookies from 'universal-cookie';
import Waves from "@waves/signer";
import Provider from "@waves.exchange/provider-web";
import { libs } from '@waves/waves-transactions';

class UserStore {
	@observable isLogin: boolean = false;
	@observable address: string = "";
	@observable balance;
	@observable network: string = "https://pool.testnet.wavesnodes.com"; // ""
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
	@observable attachedTasks = []
	@observable avatarColor = ""
	@observable showRegister = false
	@observable publicKey = ""
	@observable conversations = []
	@observable locked = true
	@observable theme = false
	@observable loginVariant;
	@observable waves;
	dapp: string = "3MzSNsJLeYj6Eh6u2QzJrbByPCySgFoCbWC";
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
				let theme = this.cookies.get("theme")
				if (theme == "dark") {
					this.setTheme(true)
				} else {
					this.setTheme(false)
				}
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
		await this.root.tasks.loadTasks(this.isUserLogin)
		let conversations = await nodeInt.getConversationsData(this.getStorage, this.getUserAddress, this.getWavesKeeper)
		if (conversations) {
			this.conversations = conversations
		}
		await this.root.disputes.loadDisputes(this.isUserLogin)
		console.log('DEBUG: Storage update')
	}
	@action("Register without waves keeper")

	async withoutWavesKeeper () {
		const waves = new Waves({NODE_URL: this.network});
		const provider = new Provider('https://testnet.waves.exchange/signer/'); // https://signer.decrybe.com/
		
		waves.setProvider(provider);
		this.waves = waves;
		this.loginVariant = "signer"
		console.log("withoutWavesKeeper")
		await this.login()
	}

	async restoreWithoutWavesKeeper () {
		const waves = new Waves({NODE_URL: this.network});
		const provider = new Provider('https://testnet.waves.exchange/signer/'); // https://signer.decrybe.com/
		
		waves.setProvider(provider);
		this.waves = waves;

		let address = this.cookies.get("address")
		let nodeUrl = this.cookies.get("network")
		let theme = this.cookies.get("theme")
		if (theme == "dark") {
			this.setTheme(true)
		} else {
			this.setTheme(false)
		}
		let balance = await nodeInt.getBalance(address, nodeUrl)
		this.balance = balance
		this.setUserNetwork(nodeUrl)
		this.setUserAddress(address)
		console.log('DEBUG: Restore session')
		
		await this.getState()
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

				let login = await this.waves.login()
				console.log(login)
				if (login) {
					console.log('Success login')
					this.address = login.address
					this.publicKey = login.publicKey
					let balance = await this.waves.getBalance();
					this.balance = balance[0].tokens / 10e7
					await this.getState()
				} else {
					console.log("reject")
				}
			}
			
		} catch (e) {
			if (e.message == "WavesKeeper is not defined") {
				let login = await this.waves.login()
				console.log(login)
				if (login) {
					console.log('Success login')
					this.address = login.address
					this.publicKey = login.publicKey
					let balance = await this.waves.getBalance();
					this.balance = balance / 10e7
					await this.getState()
				} else {
					console.log("reject")
				}
			} else {
				console.log(`ERROR in UserStore.login! ${e.name}: ${e.message}\n${e.stack}`);
			}
		}
	}

	async getState () {
		try {
			console.log('DEBUG: Get state')
			this.online = true
			if (WavesKeeper) {
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
					this.isLogin = true;
					this.isReg = await nodeInt.checkReg(this.storage, state.account.address);
					if (this.isReg) {
						this.cookies.set('address', this.getUserAddress, { path: '/' });
						this.cookies.set('network', this.getUserNetwork, { path: '/' });
						let userDataFromDapp = await nodeInt.getUserData(this.storage, state.account.address);
						let conversations = await nodeInt.getConversationsData(this.getStorage, this.getUserAddress, this.getWavesKeeper)
						console.log(conversations)
						if (conversations) {
							this.conversations = conversations
							console.log("DEBUG: Conversations loaded")
						}
						if (userDataFromDapp) {
							this.name = userDataFromDapp.name;
							this.socials = userDataFromDapp.socials;
							this.bio = userDataFromDapp.bio;
							this.status = userDataFromDapp.status;
							this.createTime = userDataFromDapp.createTime;
							this.tags = userDataFromDapp.tags;
							this.avatar = userDataFromDapp.avatar
							this.avatarColor = userDataFromDapp.avatarColor // ava color
							this.location = userDataFromDapp.location
							if (!this.root.settings.getAddress || this.root.settings.getAddress != this.address) { // true || true
								this.root.settings.setAddress(this.address)
								this.root.settings.setName(this.name)
								this.root.settings.setSocials(this.socials)
								this.root.settings.setBio(this.bio)
								this.root.settings.setTags(this.tags)
								this.root.settings.setAvatar(this.avatar)
								this.root.settings.setLocation(this.location)
							}
							let userTasks = await nodeInt.getAllUserTasks(this.storage, this.address)
							let userTasksAttached = await nodeInt.getAllUserTasksAttached(this.storage, this.address)
							if (userTasks) {
								this.tasks = userTasks;
							}
							if (userTasksAttached) {
								this.attachedTasks = userTasksAttached
							}
							console.log("DEBUG: User data loaded")
						} else {
							console.log('DEBUG: User data not loaded')
						}
						await this.root.tasks.loadTasks(this.isUserLogin)
						await this.root.disputes.loadDisputes(this.isUserLogin)
						await this.root.users.loadUsers(this.isUserLogin, this.getDapp, this.getUserNetwork)
						
					} else {
						this.showRegister = true;
						console.log('DEBUG: User is not registered')
					}
				} else {
					console.log('DEBUG: Waves Keeper is undefined - waves')
				}
			} else {
				console.log('waves analog way')
			}
		} catch (e) {
			if (e.message == "WavesKeeper is not defined") {
				console.log(this.waves)
				this.storage = await nodeInt.getAllData(this.dapp, this.network);
				this.isLogin = true;
				this.isReg = await nodeInt.checkReg(this.storage, this.address);
				if (this.isReg) {
					this.cookies.set('address', this.getUserAddress, { path: '/' });
					this.cookies.set('network', this.getUserNetwork, { path: '/' });
					let userDataFromDapp = await nodeInt.getUserData(this.storage, this.getUserAddress);
					/*
					let conversations = await nodeInt.getConversationsData(this.getStorage, this.getUserAddress, this.getWavesKeeper)
					console.log(conversations)
					if (conversations) {
						this.conversations = conversations
						console.log("DEBUG: Conversations loaded")
					}
					*/
					if (userDataFromDapp) {
						this.name = userDataFromDapp.name;
						this.socials = userDataFromDapp.socials;
						this.bio = userDataFromDapp.bio;
						this.status = userDataFromDapp.status;
						this.createTime = userDataFromDapp.createTime;
						this.tags = userDataFromDapp.tags;
						this.avatar = userDataFromDapp.avatar
						this.avatarColor = userDataFromDapp.avatarColor // ava color
						this.location = userDataFromDapp.location
						if (!this.root.settings.getAddress || this.root.settings.getAddress != this.address) { // true || true
							this.root.settings.setAddress(this.address)
							this.root.settings.setName(this.name)
							this.root.settings.setSocials(this.socials)
							this.root.settings.setBio(this.bio)
							this.root.settings.setTags(this.tags)
							this.root.settings.setAvatar(this.avatar)
							this.root.settings.setLocation(this.location)
						}
						let userTasks = await nodeInt.getAllUserTasks(this.storage, this.address)
						let userTasksAttached = await nodeInt.getAllUserTasksAttached(this.storage, this.address)
						if (userTasks) {
							this.tasks = userTasks;
						}
						if (userTasksAttached) {
							this.attachedTasks = userTasksAttached
						}
						console.log("DEBUG: User data loaded")
					} else {
						console.log('DEBUG: User data not loaded')
					}
					await this.root.tasks.loadTasks(this.isUserLogin)
					await this.root.disputes.loadDisputes(this.isUserLogin)
					await this.root.users.loadUsers(this.isUserLogin, this.getDapp, this.getUserNetwork)
				} else {
					this.showRegister = true;
					console.log('DEBUG: User is not registered')
				}
			} else {
				console.log(`ERROR in UserStore.getState! ${e.name}: ${e.message}\n${e.stack}`);
			}
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

		if (this.waves) {
			this.waves.logout()
		}
		
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
		let keeperOrSigner = {
			type: this.wavesKeeper ? "keeper" : "signer",
			class: this.wavesKeeper ? this.wavesKeeper : this.waves
		}
		return keeperOrSigner
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

	@computed get getUserTasks() {
		return this.tasks
	}

	@computed get getUserAttachedTasks() {
		return this.attachedTasks
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

	@action("set user bio")
	setTheme (theme) {
		//console.log(theme)
		if (theme) {
			this.theme = true;
			this.cookies.set('theme', "dark", { path: '/' });
		} else {
			this.theme = false;
			this.cookies.set('theme', "light", { path: '/' });
		}
	}

	@computed get getTheme() {
		return this.theme
	}
	
}



export { UserStore };