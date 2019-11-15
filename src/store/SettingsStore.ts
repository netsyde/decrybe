import { observable, action, computed} from "mobx"
import {RootStore} from './RootStore'

class SettingsStore {
	@observable name: String = ""
	@observable avatar: String = ""
	@observable socials: Array<String> = []
	@observable bio: String = ""
	@observable tags: Array<String> = []
	
    constructor(public root: RootStore) {
		this.root = root
	}

	@action("set name (settings")
	setName (name: string) {
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

	@action("set socials (settings")
	setSocials (socials: Array<String>) {
		this.socials = socials
	}

	@computed get getSocials() {
		return this.socials
	}

	@action("set bio (settings")
	setBio (bio: string) {
		this.bio = bio
	}

	@computed get getBio() {
		return this.bio
	}

	@action("set socials (settings")
	setTags (tags: Array<String>) {
		this.tags = tags
	}

	@computed get getTags() {
		return this.tags
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