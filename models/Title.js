const mongoose = require('mongoose');

const titleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Filme', 'Série'],
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  posterUrl: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  rating: {
    type: Number,
    min: 0,
    max: 10
  }
});

module.exports = mongoose.model('Title', titleSchema);
