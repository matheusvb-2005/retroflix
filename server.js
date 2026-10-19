require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('🎮 MongoDB conectado! RetroFlix iniciando...'))
  .catch(err => console.error('❌ Erro ao conectar MongoDB:', err));

// Routes
const authRoutes = require('./routes/auth');
const titlesRoutes = require('./routes/titles');
const recommendationsRoutes = require('./routes/recommendations');

app.use('/api/auth', authRoutes);
app.use('/api/titles', titlesRoutes);
app.use('/api/recommendations', recommendationsRoutes);

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║   🎮 RETROFLIX SERVER RUNNING 🎮      ║
  ║                                        ║
  ║   Port: ${PORT}                           ║
  ║   URL: http://localhost:${PORT}           ║
  ║                                        ║
  ║   Ready Player One! 🕹️                 ║
  ╚════════════════════════════════════════╝
  `);
});
