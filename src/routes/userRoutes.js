const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken'); // Ajuste o caminho conforme necessário
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser); // Endpoint para registrar um novo usuário
router.post('/login', userController.loginUser); // Endpoint para login de usuário
router.get('/register', userController.getAllUser);

module.exports = router;
