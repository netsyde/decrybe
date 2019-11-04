import {UserStore} from './UserStore';
import {TasksStore} from './TasksStore'

class RootStore {
  public user: UserStore;
	public tasks: TasksStore;
	
  constructor() {
    this.user = new UserStore(this);
    this.tasks = new TasksStore(this);
  }
}

let rootStore = new RootStore()
export default rootStore;
export { RootStore }