const  fs = require('fs');
const filePath = 'task.json'

class TaskServices {

    constructor(){
        this.tasks = this.loadTasks();
    }

    loadTasks() {
        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            return data ? JSON.parse(data) : [];
        } catch(error){
            console.error(`Error in load data ${error}`);
            return [];
        }
    }

    saveTasks(){
        try {
            fs.writeFileSync(filePath, JSON.stringify(this.tasks));
        } catch (error) {
            console.error(`Error in save tasks ${error}`);
        }
    }

    createTask(title, description){
        const lastId = this.tasks.length > 0 ? this.tasks[this.tasks.length -1].id : 0;
        const newTask = {
            id: lastId + 1,
            title,
            description
        };

        this.tasks.push(newTask);
        this.saveTasks();
        return newTask;
    }

    deleteTask(id){
        const idFind = parseInt(id);
        const taskToDelete = this.tasks.find(task => task.id === idFind);
        if(!taskToDelete){
            return null;
        }

        this.tasks = this.tasks.filter(task => task.id !== idFind);
        this.saveTasks();
        return taskToDelete;
    }

    getAllTasks(){
        return this.tasks;
    }
  
}

module.exports = new TaskServices();