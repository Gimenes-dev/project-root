const User = require('../models/user');

const registerUser = (req, res) => {
  const { username, password } = req.body;

  // Chama a função estática register da classe User
  User.register(username, password, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message }); // Retorna um erro HTTP 500 se houver um erro no registro
    }

    res.status(201).json(result); // Retorna um JSON com status 201 (Created) e o resultado do registro
  });
};


const loginUser = async (req, res) => {
  const { username, password, token } = req.body
  try {
    const result = await User.login(username, password, token);
    console.log('Válidado com sucesso')
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

const getAllUser = (req, res) => {
  User.findAllUser((err, tasks) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(tasks);
  });
};


module.exports = {
  registerUser,
  loginUser,
  getAllUser,
};