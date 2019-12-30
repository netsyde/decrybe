import { observable, action, computed} from "mobx"
import {RootStore} from './RootStore'
import * as nodeInt from '../modules/nodeInt'

class TaskCreateStore {
	@observable title: String = "";
	@observable category: String = "";
	@observable createTime: Number;
	@observable endDate: Number = Date.now() + 84000 * 1000;
	@observable briefDescription: String = "";
	@observable tags: Array<String> = ['Decrybe', 'ReactJS'];
	@observable tag: String = ""
	@observable description: String = "";
	@observable price = 1;
	@observable currency: String = "Waves";
	@observable author: String = this.root.user.getUserAddress;
	@observable updatedAt: Number;
	@observable members: Array<String> = [];
	@observable freelancer: String = "";
	@observable status: String = "featured";
	@observable uuid: String

	constructor(public root: RootStore) {
		this.root = root
	}
	
	@action("set task title")
	setTitle (title: String) {
		this.title = title.replace(/(\s\s)/g, ' ')
		//console.log(this.title)
	}

	@computed get getTitle() {
		return this.title
	}

	@action("set task price")
	setPrice (price) {
		this.price = Number(price);
		//console.log(price)
	}

	@computed get getPrice() {
		//console.log(this.price)
		return Number(this.price)
	}

	@computed get getPriceCommision() {
		//console.log(this.price * 0.02)
		let price = (Number(this.price) * 0.02) + Number(this.price)
		return price
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
	setEndDate (date: Date) {
		if (date) {
			this.endDate = date.getTime();
		}
	}

	@computed get getEndDate() {
		return this.endDate
	}

	@action("set task brief description")
	setBriefDescription (briefDescription: String) {
		this.briefDescription = briefDescription.replace(/(\s\s)/g, ' ');
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
		return this.tags
	}

	@action("set task tag")
	setTag (tag: String) {
		this.tag = tag;
	}

	@computed get getTag() {
		return this.tag
	}

	@action("set task description")
	setDescription (description: String) {
		this.description = description;
	}

	@computed get getDescription() {
		return this.description
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

	@action("set task freelancer")
	setFreelancer (freelancer: String) {
		if (freelancer) {
			this.freelancer = freelancer;
		}
	}

	@computed get getFreelancer() {
		return this.freelancer
	}

	@action("Clean task creator")
	clean () {
		this.setTitle("")
		this.setPrice(1);
		this.setCategory("");
		this.endDate = Date.now() + 84000 * 1000;
		this.setBriefDescription("");
		this.setDescription('')

	}
}

export { TaskCreateStore }