const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Registro de usuário
router.post('/register', async (req, res) => {
  try {
    const { username, password, favoriteGenres } = req.body;

    // Verificar se usuário já existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já existe! Escolha outro nome.' });
    }

    // Criar novo usuário (senha em texto plano - apenas para fins didáticos!)
    const user = new User({
      username,
      password, // Em produção, usar bcrypt para hash!
      favoriteGenres: favoriteGenres || []
    });

    await user.save();
    res.status(201).json({
      message: 'Player registrado com sucesso! 🎮',
      userId: user._id,
      username: user.username
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar usuário: ' + error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Credenciais inválidas!' });
    }

    res.json({
      message: 'Login bem-sucedido! Welcome back, Player! 🕹️',
      userId: user._id,
      username: user.username,
      favoriteGenres: user.favoriteGenres
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login: ' + error.message });
  }
});

// Obter dados do usuário
router.get('/user/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('favorites');
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário: ' + error.message });
  }
});

module.exports = router;
