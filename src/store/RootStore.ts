import { UserStore } from './UserStore';
import { TasksStore } from './TasksStore';
import { TaskCreateStore } from './TaskCreateStore'

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
export default rootStore;
export { RootStore }