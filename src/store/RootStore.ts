import { UserStore } from './UserStore';
import { TasksStore } from './TasksStore';
import { TaskCreateStore } from './TaskCreateStore'
import { autorun } from "mobx"

class RootStore {
  public user: UserStore;
  public tasks: TasksStore;
  public taskCreate: TaskCreateStore;
	
  constructor() {
    this.user = new UserStore(this);
    this.tasks = new TasksStore(this);
    this.taskCreate = new TaskCreateStore(this)
  }
}

let rootStore = new RootStore()

autorun(() => {
	if (rootStore.user.checkSession()) {
    rootStore.user.restoreSession()
  }
});

export default rootStore;
export { RootStore }