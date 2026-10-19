const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  favoriteGenres: [{
    type: String,
    enum: ['Ação', 'Terror', 'Comédia', 'Sci-Fi', 'Animação', 'Drama', 'Romance', 'Aventura', 'Fantasia', 'Crime']
  }],
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Title'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
