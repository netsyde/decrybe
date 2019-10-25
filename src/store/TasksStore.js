import { observable, action, configure, computed, autorun, set } from "mobx"
import * as nodeInt from '../modules/nodeInt'

class TasksStore {
    @observable allTasksIds = ""
    @observable allTasksData = []
    
    /*
    @action
    async loadTasks(dapp, nodeUrl, isLog) {
        //try {
        if (isLog) {
            this.allTasksIds = await nodeInt.getAllTasks(dapp, nodeUrl)

            for (let i = 0; i < this.allTasksIds.length; i++) {
                let taskData = await nodeInt.getTaskData(this.allTasksIds[i], dapp, nodeUrl)
                if (taskData) {
                    this.allTasksData.push(taskData)
                }
            }
                
        }
    }
    */

    @computed get getTasks () {
        
        console.log(this.allTasksData)
        return this.allTasksData;
    }
    
}

const tasksStore = new TasksStore();

export default tasksStore;
export { TasksStore };