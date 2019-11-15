import { observable, action, computed} from "mobx"
import {RootStore} from './RootStore'

class SettingsStore {
	@observable name: String = ""
	@observable avatar: String = ""
	@observable socials: Array<String> = []
	@observable bio: String = ""
	@observable tags: Array<String> = []
	@observable location: string = ""
	@observable telegram: string = ""
	@observable twitter: string = ""
	@observable github: string = ""
	
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

	@action("set location (settings")
	setLocation (location: string) {
		this.location = location
	}

	@computed get getLocation() {
		return this.location
	}

	@action("set telegram (settings")
	setTelegram (telegram: string) {
		this.telegram = telegram
	}

	@computed get getTelegram() {
		return this.telegram
	}

	@action("set twitter (settings")
	setTwitter (twitter: string) {
		this.twitter = twitter
	}

	@computed get getTwitter() {
		return this.twitter
	}

	@action("set github (settings")
	setGithub (github: string) {
		this.github = github
	}

	@computed get getGithub() {
		return this.github
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