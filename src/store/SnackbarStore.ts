import { observable, action, computed } from "mobx"
import { RootStore } from './RootStore'

class SnackbarStore {
    @observable state = false

    constructor(public root: RootStore) {
		this.root = root
	}	

    @computed get getState () {
        return this.state;
    }

    setStateSnackbar (state: boolean) {
        this.state = state
    }

    setOpen () {
        this.setStateSnackbar(true)
    }

    setClose () {
        this.setStateSnackbar(false)
    }
}

export { SnackbarStore }