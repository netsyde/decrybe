import { observable, action, computed, toJS } from "mobx"
import * as nodeInt from '../modules/nodeInt'
import {RootStore} from './RootStore'

class DisputesStore {
	@observable allDisputesIds
	@observable allDisputesData = []
	@observable length
    @observable filteredDisputes
    @observable currentDispute
		
	constructor(public root: RootStore) {
		this.root = root
	}

	async loadDisputes(isLogin) {
		if (isLogin) {
			let allDisputesData = await nodeInt.getAllDisputesData(this.root.user.getStorage)
			
			if (allDisputesData) {
				this.allDisputesData = allDisputesData;
				console.log('DEBUG: Disputes loaded')
				this.length = allDisputesData.length
			} else {
				console.log('DEBUG: allDisputesData is false')
			}
			
		} else {
			console.log('DEBUG: User not login')
		}
	}

	async updateDisputes(isLogin) {
		if (isLogin) {
			let allDisputesData = await nodeInt.getAllDisputesData(this.root.user.getStorage)
			if (allDisputesData) {
				console.log('DEBUG: Disputes loaded')
				this.allDisputesData = allDisputesData
			} else {
				console.log('allDisputesData is false')
			}
			
		} else {
			console.log('user not login')
		}
	}

	@action
	addTask(data: Object) {
		this.allDisputesData.push(data)
		console.log('pushing!')
	}
	@action
	async getDisputeData (id) {
		if (this.root.user.isLogin) {
			let dispute = await nodeInt.getDisputeData(this.root.user.getStorage, id)
			return dispute
		} else {
			return false
		}
    }
    
    @computed get getDisputes () {
		let matchesFilter = new RegExp("In dispute", "i")
		let filtered = this.allDisputesData.filter( dispute  => matchesFilter.test(dispute.task.status))
		return filtered;
	}

	@action
	setCurrentDisputeId = id => {
	  this.currentDispute = id;
	};

	@action
	setFilteredDisputes = disputes => {
		this.filteredDisputes = disputes;
	};

	@action
	setAllDisputesData = data => {
		this.allDisputesData = data;
	};


	@computed get getFilteredDisputes () {
		if (this.filteredDisputes) {
			let matchesFilter = new RegExp("In dispute", "i")
			let filtered = this.filteredDisputes.filter( dispute  => matchesFilter.test(dispute.task.status))
			return toJS(filtered);
		} else {
			let matchesFilter = new RegExp("In dispute", "i")
			let filtered = this.allDisputesData.filter( dispute  => matchesFilter.test(dispute.task.status))
			return toJS(filtered);
		}
	}		
}

export { DisputesStore }