import { observable, action, configure, computed, autorun, set } from "mobx"
import * as nodeInt from '../modules/nodeInt'
import {RootStore} from './RootStore'

class TasksStore {
	@observable allTasksIds
	@observable allTasksData = []
		
	constructor(public root: RootStore) {
		
	}

	async loadTasks(isLogin, dapp, network) {
		if (isLogin) {
			this.allTasksIds = await nodeInt.getAllTasks(dapp, network)
			for (let i = 0; i < this.allTasksIds.length; i++) {
				let taskData = await nodeInt.getTaskData(this.allTasksIds[i], dapp, network)
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
		if (data.length > 0)
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

	@action getTaskImage (i) {
		if (this.allTasksData.length > 0)
		return this.allTasksData[i].image;
	}
		
}

export { TasksStore }