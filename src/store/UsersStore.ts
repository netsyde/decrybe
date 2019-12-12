import { observable, action, computed, autorun } from "mobx"
import * as nodeInt from '../modules/nodeInt'
import { RootStore } from './RootStore'

class UsersStore {
    @observable allUsers = []
    @observable count


    constructor(public root: RootStore) {
		this.root = root
	}	

    async loadUsers(isLogin, dapp, network) {
		if (isLogin) {
			let allUsersData = await nodeInt.getUsersAllData(this.root.user.getStorage, dapp, network)
			
			console.log('DEBUG: Users loaded')
			if (allUsersData) {
				this.allUsers = allUsersData
				this.count = allUsersData.length
			} else {
				console.log('BEBUG: Users not loaded')
			}
			
		} else {
			console.log('DEBUG: User not logged in')
        }
        
        
    }

    @computed get getUsers () {
        return this.allUsers;
    }

    @computed get getCount () {
        return this.count;
	}
	
	async getTasks (id) {
		let userTasks = await nodeInt.getAllUserTasks(this.root.user.getStorage, id, this.root.user.getDapp, this.root.user.getUserNetwork)
		return userTasks
	}

	async getUserData (address) {
		let userData = await nodeInt.getUserData(this.root.user.storage, address);
		return userData
	} 
}

export { UsersStore }