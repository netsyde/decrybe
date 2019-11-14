import { observable, action, computed} from "mobx"
import {RootStore} from './RootStore'

class SettingsStore {
	@observable name = this.root.user.getUserName;
	@observable avatar = this.root.user.getUserAvatar;
	
    constructor(public root: RootStore) {
		this.root = root
	}

	@action("set name (settings")
	setName (name: string) {
		console.log('set name')
		this.name = name
	}

	@computed get getName() {
		return this.name
	}

	@action("set avatar (settings")
	setAvatar (avatar: string) {
		this.avatar = avatar
	}

	@computed get getAvatar() {
		return this.avatar
	}

	getData () {
		console.log('get data')
		let data = {
			name: this.name,
			avatar: this.avatar
		}
		return data
	}
}

export { SettingsStore }