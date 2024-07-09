const Task = require('../models/task');

const createTask = (req, res) => {
  const { title, description, completed } = req.body;
  Task.create({ title, description, completed }, (err, task) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(task);
  });
};

const getAllTasks = (req, res) => {
  Task.findAll((err, tasks) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(tasks);
  });
};

const getTaskById = (req, res) => {
  const { id } = req.params;
  Task.findById(id, (err, task) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
    res.status(200).json(task);
  });
};

const updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
  
    // Primeiro, buscar a tarefa existente pelo id
    Task.findById(id, (err, task) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
  
      // Atualizar apenas os campos fornecidos no corpo da requisição
      const updatedTask = {
        title: title !== undefined ? title : task.title,
        description: description !== undefined ? description : task.description,
        completed: completed !== undefined ? completed : task.completed
      };
  
      // Atualizar a tarefa no banco de dados
      Task.update(id, updatedTask, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ id, ...updatedTask });
      });
    });
  };

const deleteTask = (req, res) => {
  const { id } = req.params;
  Task.delete(id, (err, task) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
    res.status(200).json({ message: 'Tarefa deletada com sucesso' });
  });
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};