const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken'); // Ajuste o caminho conforme necessário
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser); // Endpoint para registrar um novo usuário
router.post('/login',authenticateToken, userController.loginUser); // Endpoint para login de usuário
router.get('/register',authenticateToken, userController.getAllUser);

module.exports = router;
