require('dotenv').config();
const mongoose = require('mongoose');
const Title = require('./models/Title');

const titles = [
  // Filmes de Ação
  {
    name: 'Vingadores: Ultimato',
    type: 'Filme',
    genre: 'Ação',
    posterUrl: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    year: 2019,
    description: 'Após Thanos eliminar metade das criaturas vivas, os Vingadores têm de lidar com a perda de amigos e entes queridos.',
    rating: 8.4
  },
  {
    name: 'John Wick 4: Baba Yaga',
    type: 'Filme',
    genre: 'Ação',
    posterUrl: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
    year: 2023,
    description: 'John Wick descobre um caminho para derrotar a Mesa Alta.',
    rating: 7.8
  },
  {
    name: 'Missão Impossível: Acerto de Contas',
    type: 'Filme',
    genre: 'Ação',
    posterUrl: 'https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg',
    year: 2023,
    description: 'Ethan Hunt e sua equipe embarcam em sua missão mais perigosa.',
    rating: 7.7
  },

  // Filmes de Sci-Fi
  {
    name: 'Interestelar',
    type: 'Filme',
    genre: 'Sci-Fi',
    posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    year: 2014,
    description: 'As reservas naturais da Terra estão chegando ao fim e um grupo de astronautas recebe a missão de verificar possíveis planetas.',
    rating: 8.6
  },
  {
    name: 'Matrix',
    type: 'Filme',
    genre: 'Sci-Fi',
    posterUrl: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    year: 1999,
    description: 'Um hacker descobre a verdadeira natureza da realidade.',
    rating: 8.7
  },
  {
    name: 'Blade Runner 2049',
    type: 'Filme',
    genre: 'Sci-Fi',
    posterUrl: 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
    year: 2017,
    description: 'Um blade runner descobre um segredo enterrado há muito tempo.',
    rating: 8.0
  },

  // Filmes de Terror
  {
    name: 'Invocação do Mal',
    type: 'Filme',
    genre: 'Terror',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_SX300.jpg',
    year: 2013,
    description: 'Investigadores paranormais trabalham para ajudar uma família aterrorizada.',
    rating: 7.5
  },
  {
    name: 'Corra!',
    type: 'Filme',
    genre: 'Terror',
    posterUrl: 'https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg',
    year: 2017,
    description: 'Um jovem afro-americano visita a família da namorada branca.',
    rating: 7.7
  },

  // Filmes de Comédia
  {
    name: 'Todo Mundo em Pânico',
    type: 'Filme',
    genre: 'Comédia',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMGEzZjdjMGQtZmYzZC00N2I4LThiY2QtNWY5ZmQ3M2ExZmM4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    year: 2000,
    description: 'Paródia de filmes de terror com muito humor.',
    rating: 6.3
  },
  {
    name: 'Superbad: É Hoje',
    type: 'Filme',
    genre: 'Comédia',
    posterUrl: 'https://image.tmdb.org/t/p/w500/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg',
    year: 2007,
    description: 'Dois amigos tentam aproveitar ao máximo antes da faculdade.',
    rating: 7.6
  },

  // Filmes de Animação
  {
    name: 'Homem-Aranha: Através do Aranhaverso',
    type: 'Filme',
    genre: 'Animação',
    posterUrl: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    year: 2023,
    description: 'Miles Morales viaja através do multiverso.',
    rating: 8.7
  },
  {
    name: 'Encanto',
    type: 'Filme',
    genre: 'Animação',
    posterUrl: 'https://image.tmdb.org/t/p/w500/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg',
    year: 2021,
    description: 'Uma garota colombiana pode ser a última esperança de sua família.',
    rating: 7.2
  },

  // Filmes de Drama
  {
    name: 'Oppenheimer',
    type: 'Filme',
    genre: 'Drama',
    posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    year: 2023,
    description: 'A história do físico J. Robert Oppenheimer e a criação da bomba atômica.',
    rating: 8.3
  },
  {
    name: 'Parasita',
    type: 'Filme',
    genre: 'Drama',
    posterUrl: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    year: 2019,
    description: 'Uma família pobre se infiltra em uma casa rica.',
    rating: 8.5
  },

  // Séries de Drama
  {
    name: 'Breaking Bad',
    type: 'Série',
    genre: 'Drama',
    posterUrl: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
    year: 2008,
    description: 'Um professor de química vira produtor de metanfetamina.',
    rating: 9.5
  },
  {
    name: 'The Crown',
    type: 'Série',
    genre: 'Drama',
    posterUrl: 'https://image.tmdb.org/t/p/w500/1M876KPjulVwppEpldhdc8V4o68.jpg',
    year: 2016,
    description: 'A história da Rainha Elizabeth II.',
    rating: 8.6
  },

  // Séries de Sci-Fi
  {
    name: 'Stranger Things',
    type: 'Série',
    genre: 'Sci-Fi',
    posterUrl: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    year: 2016,
    description: 'Uma criança desaparece em uma pequena cidade, revelando experimentos secretos.',
    rating: 8.7
  },
  {
    name: 'Black Mirror',
    type: 'Série',
    genre: 'Sci-Fi',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BYTM3YWVhMDMtNjczMy00NGEyLWJhZDctYjNhMTRkNDE0ZTI1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
    year: 2011,
    description: 'Série antológica explorando os perigos da tecnologia.',
    rating: 8.7
  },

  // Séries de Comédia
  {
    name: 'The Office',
    type: 'Série',
    genre: 'Comédia',
    posterUrl: 'https://image.tmdb.org/t/p/w500/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg',
    year: 2005,
    description: 'O dia a dia de funcionários de uma empresa de papel.',
    rating: 9.0
  },
  {
    name: 'Brooklyn Nine-Nine',
    type: 'Série',
    genre: 'Comédia',
    posterUrl: 'https://image.tmdb.org/t/p/w500/hgRMSOt7a1b8qyQR68vUixJPang.jpg',
    year: 2013,
    description: 'As aventuras cômicas de uma delegacia de polícia do Brooklyn.',
    rating: 8.4
  },

  // Séries de Terror
  {
    name: 'The Walking Dead',
    type: 'Série',
    genre: 'Terror',
    posterUrl: 'https://image.tmdb.org/t/p/w500/xf9wuDcqlUPWABZNeDKPbZUjWx0.jpg',
    year: 2010,
    description: 'Sobreviventes lutam contra zumbis em um apocalipse.',
    rating: 8.2
  },

  // Séries de Ação
  {
    name: 'The Mandalorian',
    type: 'Série',
    genre: 'Ação',
    posterUrl: 'https://image.tmdb.org/t/p/w500/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg',
    year: 2019,
    description: 'Um caçador de recompensas mandaloriano viaja pela galáxia.',
    rating: 8.7
  },
  {
    name: 'The Witcher',
    type: 'Série',
    genre: 'Fantasia',
    posterUrl: 'https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg',
    year: 2019,
    description: 'Geralt de Rívia, um caçador de monstros solitário.',
    rating: 8.0
  },

  // Filmes de Romance
  {
    name: 'La La Land',
    type: 'Filme',
    genre: 'Romance',
    posterUrl: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
    year: 2016,
    description: 'Um pianista de jazz e uma atriz aspirante se apaixonam em Los Angeles.',
    rating: 8.0
  },
  {
    name: 'Me Chame Pelo Seu Nome',
    type: 'Filme',
    genre: 'Romance',
    posterUrl: 'https://image.tmdb.org/t/p/w500/mZ4gBdfkhP9tvLH1DO4m4HYtiyi.jpg',
    year: 2017,
    description: 'Um romance de verão na Itália dos anos 80.',
    rating: 7.9
  },

  // Filmes de Aventura
  {
    name: 'Avatar: O Caminho da Água',
    type: 'Filme',
    genre: 'Aventura',
    posterUrl: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
    year: 2022,
    description: 'Jake Sully e sua família enfrentam novos desafios em Pandora.',
    rating: 7.6
  },
  {
    name: 'Duna',
    type: 'Filme',
    genre: 'Aventura',
    posterUrl: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
    year: 2021,
    description: 'Paul Atreides viaja para o planeta mais perigoso do universo.',
    rating: 8.0
  },

  // Filmes de Crime
  {
    name: 'Coringa',
    type: 'Filme',
    genre: 'Crime',
    posterUrl: 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
    year: 2019,
    description: 'A origem do icônico vilão do Batman.',
    rating: 8.4
  },
  {
    name: 'O Poderoso Chefão',
    type: 'Filme',
    genre: 'Crime',
    posterUrl: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    year: 1972,
    description: 'A saga da família Corleone.',
    rating: 9.2
  }
];

async function seedDatabase() {
  try {
    // Conectar ao MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🎮 Conectado ao MongoDB!');

    // Limpar coleção de títulos
    await Title.deleteMany({});
    console.log('🗑️  Coleção de títulos limpa!');

    // Inserir títulos
    await Title.insertMany(titles);
    console.log(`✅ ${titles.length} títulos inseridos com sucesso!`);

    console.log(`
    ╔════════════════════════════════════════╗
    ║   🎬 DATABASE SEEDED SUCCESSFULLY 🎬   ║
    ║                                        ║
    ║   ${titles.length} títulos adicionados!              ║
    ║                                        ║
    ║   Ready to stream! 🍿                  ║
    ╚════════════════════════════════════════╝
    `);

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao popular banco de dados:', error);
    process.exit(1);
  }
}

seedDatabase();
