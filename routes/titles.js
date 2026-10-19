const express = require('express');
const router = express.Router();
const Title = require('../models/Title');
const User = require('../models/User');

// Listar todos os títulos
router.get('/', async (req, res) => {
  try {
    const titles = await Title.find().sort({ year: -1 });
    res.json(titles);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar títulos: ' + error.message });
  }
});

// Buscar título por ID
router.get('/:id', async (req, res) => {
  try {
    const title = await Title.findById(req.params.id);
    if (!title) {
      return res.status(404).json({ error: 'Título não encontrado' });
    }
    res.json(title);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar título: ' + error.message });
  }
});

// Adicionar título aos favoritos
router.post('/favorite', async (req, res) => {
  try {
    const { userId, titleId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verificar se já está nos favoritos
    if (user.favorites.includes(titleId)) {
      return res.status(400).json({ error: 'Título já está nos favoritos!' });
    }

    user.favorites.push(titleId);
    await user.save();

    res.json({ message: 'Título adicionado aos favoritos! ❤️', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao favoritar título: ' + error.message });
  }
});

// Remover título dos favoritos
router.post('/unfavorite', async (req, res) => {
  try {
    const { userId, titleId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    user.favorites = user.favorites.filter(fav => fav.toString() !== titleId);
    await user.save();

    res.json({ message: 'Título removido dos favoritos!', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao desfavoritar título: ' + error.message });
  }
});

// Listar favoritos do usuário
router.get('/favorites/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('favorites');
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar favoritos: ' + error.message });
  }
});

module.exports = router;
