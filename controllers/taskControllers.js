const taskService = require('../services/taskService');

const createTask = (req, res) => {
    const { title, description } = req.body;
    if(!title || !description){
        return res.status(400).json({
            message: 'All fields are required',
            code: 400
        })
    }
    const task = taskService.createTask(title, description);
    res.status(200).json(task);
};

const getTasks = (req, res) => {
    const tasks = taskService.getAllTasks();
    res.json(tasks);
};

const deleteTask = (req, res) => {
    const { id } = req.params;
    const taskDelete = taskService.deleteTask(id);
    if (taskDelete){
        res.status(200).json({
            message: `Sucessfull task delete id ${id}`,
            taskDelete
        });
    } else {
        res.status(400).json({
            message: `Task not found for id ${id}`,
            code: 400
        });
    }
};

module.exports = {
    createTask,
    getTasks,
    deleteTask
}