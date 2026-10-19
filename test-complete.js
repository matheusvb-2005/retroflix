const http = require('http');

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function test() {
  console.log('\n=== TESTE COMPLETO RETROFLIX ===\n');

  // 1. Testar listagem de títulos
  console.log('1. Testando GET /api/titles...');
  const titles = await makeRequest('GET', '/api/titles');
  console.log(`   Status: ${titles.status}`);
  console.log(`   Títulos encontrados: ${titles.data.length}`);

  const problematic = titles.data.filter(t =>
    t.name === 'Hereditário' || t.name === 'American Horror Story'
  );
  console.log('\n   Títulos problemáticos:');
  problematic.forEach(t => {
    console.log(`   - ${t.name}: ${t.posterUrl.substring(0, 60)}...`);
  });

  // 2. Criar usuário de teste
  console.log('\n2. Criando usuário de teste...');
  const register = await makeRequest('POST', '/api/auth/register', {
    username: 'testuser_' + Date.now(),
    password: 'test123',
    favoriteGenres: ['Terror', 'Ação', 'Sci-Fi']
  });
  console.log(`   Status: ${register.status}`);
  console.log(`   UserId: ${register.data.userId}`);

  if (register.status !== 201) {
    console.log('   ERRO no registro:', register.data);
    return;
  }

  const userId = register.data.userId;

  // 3. Testar favoritar
  console.log('\n3. Testando favoritar título...');
  const titleId = titles.data[0]._id;
  const favorite = await makeRequest('POST', '/api/titles/favorite', {
    userId: userId,
    titleId: titleId
  });
  console.log(`   Status: ${favorite.status}`);
  console.log(`   Resposta:`, favorite.data);

  // 4. Testar recomendações
  console.log('\n4. Testando recomendações...');
  const recs = await makeRequest('GET', `/api/recommendations/${userId}`);
  console.log(`   Status: ${recs.status}`);
  console.log(`   Recomendações: ${recs.data.recommendations?.length || 0}`);

  // 5. Verificar favoritos
  console.log('\n5. Verificando favoritos...');
  const favs = await makeRequest('GET', `/api/titles/favorites/${userId}`);
  console.log(`   Status: ${favs.status}`);
  console.log(`   Favoritos: ${favs.data.length}`);

  console.log('\n=== TESTE CONCLUÍDO ===\n');
  process.exit(0);
}

test().catch(err => {
  console.error('ERRO:', err);
  process.exit(1);
});
