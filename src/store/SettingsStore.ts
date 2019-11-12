import { observable, action, computed} from "mobx"
import {RootStore} from './RootStore'

class SettingsStore {
    constructor(public root: RootStore) {
		this.root = root
	}
}

export { SettingsStore }