const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Title = require('../models/Title');

// Gerar recomendações baseadas nos gêneros favoritos do usuário + gêneros dos títulos favoritados
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (!user.favoriteGenres || user.favoriteGenres.length === 0) {
      return res.status(400).json({ error: 'Usuário não possui gêneros favoritos definidos' });
    }

    // Começar com gêneros do cadastro
    let generos = [...user.favoriteGenres];

    //Se o usuário tem títulos favoritados, buscar seus gêneros
    if (user.favorites && user.favorites.length > 0) {
      const titulosFavoritados = await Title.find({
        _id: { $in: user.favorites }
      });

      //Extrair gêneros dos títulos favoritados
      const generosDosFavoritos = titulosFavoritados.map(t => t.genre);

      //COMBINAR gêneros únicos (gêneros do cadastro + gêneros dos favoritos)
      generos = [...new Set([...generos, ...generosDosFavoritos])];
    }

    //Buscar recomendações baseadas na lista expandida de gêneros
    const recommendations = await Title.find({
      genre: { $in: generos },
      _id: { $nin: user.favorites || [] } // Excluir títulos já favoritados
    }).limit(20).sort({ rating: -1 });

    res.json({
      message: `Recomendações baseadas em: ${generos.join(', ')}`,
      genres: generos,
      originalGenres: user.favoriteGenres,
      expandedFromFavorites: generos.length > user.favoriteGenres.length,
      count: recommendations.length,
      recommendations: recommendations
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar recomendações: ' + error.message });
  }
});

module.exports = router;
