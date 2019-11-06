import { observable, action, computed} from "mobx"
import {RootStore} from './RootStore'

class TaskCreateStore {
	@observable title: String;
	@observable category: String;
	@observable createTime: Number;
	@observable endDate: Number;
	@observable briefDescription: String;
	@observable tags: Array<String>;
	@observable description: String;
	@observable price: Number;
	@observable currency: String = "Waves";
	@observable author: String = this.root.user.address;
	@observable updatedAt: Number = this.createTime;
	@observable members: Array<String> = [];
	@observable freelancers: Array<String> = [];
	@observable status: String = "featured";

	@observable uuid: String
	constructor(public root: RootStore) {
		this.root = root
	}
	
	@action("set task title")
	setTitle (title: String) {
		if (title) {
			this.title = title;
		}
	}

	@computed get getTitle() {
		return this.title
	}

	@action("set task category")
	setCategory (category: String) {
		if (category) {
			this.category = category;
		}
	}

	@computed get getCategory() {
		return this.category
	}

	@action("set task end date")
	setEndDate (date: Number) {
		if (date) {
			this.endDate = date;
		}
	}

	@computed get getEndDate() {
		return this.endDate
	}

	@action("set task brief description")
	setBriefDescription (briefDescription: String) {
		if (briefDescription) {
			this.briefDescription = briefDescription;
		}
	}

	@computed get getBriefDescription() {
		return this.briefDescription
	}

	@action("set task tags")
	setTags (tags: Array<String>) {
		if (tags) {
			this.tags = tags;
		}
	}

	@computed get getTags() {
		return this.briefDescription
	}

	@action("set task description")
	setDescription (description: String) {
		if (description) {
			this.description = description;
		}
	}

	@computed get getDescription() {
		return this.description
	}
		
	@action("set task price")
	setPrice (price: Number) {
		if (price) {
			this.price = price;
		}
	}

	@computed get getPrice() {
		return this.price
	}

	@action("set task currency")
	setCurrency (currency: String) {
		if (currency) {
			this.currency = currency;
		}
	}

	@computed get getCurrency() {
		return this.currency
	}

	@action("set task author")
	setAuthor (author: String) {
		if (author) {
			this.author = author;
		}
	}

	@computed get getAuthor() {
		return this.author
	}

	@computed get getUpdatedAt() {
		return this.updatedAt
	}

	@action("set task status")
	setStatus (status: String) {
		if (status) {
			this.status = status;
		}
	}

	@computed get getStatus() {
		return this.status
	}

	@action("set task members")
	setMembers (members: Array<String>) {
		if (members) {
			this.members = members;
		}
	}

	@computed get getMembers() {
		return this.members
	}

	@action("set task freelancers")
	setFreelancers (freelancers: Array<String>) {
		if (freelancers) {
			this.freelancers = freelancers;
		}
	}

	@computed get getFreelancers() {
		return this.freelancers
	}
}

export { TaskCreateStore }