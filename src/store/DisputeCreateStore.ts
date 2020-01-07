import { observable, action, computed} from "mobx"
import {RootStore} from './RootStore'

class DisputeCreateStore {
	@observable title: String = "";
	@observable task: String = ""
	@observable briefDescription: String = ""
	@observable description: String = ""

	constructor(public root: RootStore) {
		this.root = root
	}
	
	@action("set dispute title")
	setTitle (title: String) {
		this.title = title.replace(/(\s\s)/g, ' ')
	}

	@computed get getTitle() {
		return this.title
	}

	@action("set task")
	setTask (task: String) {
		this.task = task
	}

	@computed get getTask() {
		return this.task
	}

	@action("set task brief description")
	setBriefDescription (briefDescription: String) {
		this.briefDescription = briefDescription.replace(/(\s\s)/g, ' ');
	}

	@computed get getBriefDescription() {
		return this.briefDescription
	}

	@action("set task description")
	setDescription (description: String) {
		this.description = description;
	}

	@computed get getDescription() {
		return this.description
	}

	@action("Clean task creator")
	clean () {
		this.setTitle("")
		this.setBriefDescription("");
		this.setDescription('')
		this.setTask("")

	}
}

export { DisputeCreateStore }