import { UserStore } from './UserStore';
import { TasksStore } from './TasksStore';
import { TaskCreateStore } from './TaskCreateStore'
import { SettingsStore } from './SettingsStore'
import { UsersStore } from './UsersStore'
import { SnackbarStore } from './SnackbarStore'
import { autorun } from "mobx"

class RootStore {
  public user: UserStore;
  public tasks: TasksStore;
  public taskCreate: TaskCreateStore;
  public settings: SettingsStore;
  public users: UsersStore;
  public snackbar: SnackbarStore;
	
  constructor() {
    this.user = new UserStore(this);
    this.tasks = new TasksStore(this);
    this.taskCreate = new TaskCreateStore(this);
    this.settings = new SettingsStore(this)
    this.users = new UsersStore(this)
    this.snackbar = new SnackbarStore(this)
  }
}

let rootStore = new RootStore()

autorun(async () => {
  window.onload = () =>{
    if (rootStore.user.checkSession()) {
      if(window.WavesKeeper === undefined) {
        console.log('Waves Keeper not installed')
      } else {
        rootStore.user.restoreSession();
      }
    }
  }
});

export default rootStore;
export { RootStore }