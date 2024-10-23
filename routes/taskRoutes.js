const express = require('express');
const router = express.Router();
const {createTask,
    getTasks,
    deleteTask
} = require('../controllers/taskControllers');

router.post('/tasks', createTask);
router.get('/tasks', getTasks);
router.delete('/tasks/:id', deleteTask);

module.exports = router;