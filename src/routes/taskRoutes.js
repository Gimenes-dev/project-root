const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken'); // Ajuste o caminho conforme necessário
const taskController = require('../controllers/taskController');

router.get('/tasks',authenticateToken, taskController.getAllTasks); // Endpoint para buscar todas tarefas
router.post('/tasks',authenticateToken, taskController.createTask); // Endpoint para registrar uma nova Tarefa
router.get('/tasks/:id',authenticateToken, taskController.getTaskById); // Endpoint para buscar tarefa por id
router.put('/tasks/:id',authenticateToken, taskController.updateTask); // Endpoint para alterar uma tarefa por id
router.delete('/tasks/:id',authenticateToken, taskController.deleteTask); // Endpoint para deletar uma tarefa por id

module.exports = router;