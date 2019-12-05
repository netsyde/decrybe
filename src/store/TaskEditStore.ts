import { observable, action, computed} from "mobx"
import {RootStore} from './RootStore'

class TaskEditStore {
	@observable title: String = "";
	@observable category: String = "";
	@observable createTime;
	@observable endDate = Date.now() + 84000 * 1000;
	@observable briefDescription: String = "";
	@observable tags: Array<String> = [];
	@observable tag: String = ""
	@observable description: String = "";
	@observable price: Number = 1;
	@observable currency: String = "Waves";
	@observable author: String = "";
	@observable updatedAt: Number;
	@observable members: Array<String> = [];
	@observable freelancers: Array<String> = [];
	@observable status: String = "featured";

	constructor(public root: RootStore) {
		this.root = root
	}
	
	@action("set task title")
	setTitle (title: String) {
		this.title = title.replace(/(\s\s)/g, ' ')
		console.log(this.title)
	}

	@computed get getTitle() {
		return this.title
	}

	@action("set task price")
	setPrice (price: Number) {
		this.price = price;
	}

	@computed get getPrice() {
		return this.price
	}

	@action("set task category")
	setCategory (category: String) {
		this.category = category;
	}

	@computed get getCategory() {
		return this.category
	}

	@action("set task end date")
	setEndDate (date: Date) {
		console.log(date)
		if (date) {
			this.endDate = date.getTime();
		}
	}

	@action("set task end date from blockchain")
	setEndDateFromBlockchain (date) {
		console.log(date)
		this.endDate = date
	}

	@computed get getEndDate() {
		return this.endDate
	}

	@action("set task create")
	setCreateDate (date: Date) {
		this.createTime = date
	}

	@computed get getCreateDate() {
		return this.createTime
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
		this.tags = tags;
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

	@action("set task freelancers")
	setFreelancers (freelancers: Array<String>) {
		if (freelancers) {
			this.freelancers = freelancers;
		}
	}

	@computed get getFreelancers() {
		return this.freelancers
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

export { TaskEditStore }