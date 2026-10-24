const fs = require('fs');
const path = require('path');
const { createClient } = require('@libsql/client');

const client = createClient({
  url: 'libsql://noticiasdesaojosedocalcado-lfdppeixoto29.aws-sa-east-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTI4MDI0MzQsImlkIjoiMDFhMTZiNTktNmQwMS03YzU3LTlkZWMtMTliM2JlMTg5MzBiIiwia2lkIjoiOG1udlN6UGg4YzNGZ0t2Vzdfc3FoZmpnY1NfWVo3MzJFLVUyQU1sbGtsOCIsInJpZCI6ImEyZDM1ODY3LWNiY2MtNGM0NS04MjVkLWU4NGY5ZmEzY2FjOSJ9.7idWx4hDI4cD8AWtUKRtcVU8SNgGQgn4TMPcssYzxaEhfFmpunvtil3TW8hR0pnnXi7ddFZwvgxkZgZKvWcgAw'
});

async function testTurso() {
  try {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS noticias (
        id TEXT PRIMARY KEY,
        title TEXT,
        link TEXT,
        description TEXT,
        pubDate TEXT,
        source TEXT,
        image TEXT,
        foundAt TEXT
      );
    `);
    console.log('Conexão com Turso estabelecida e tabela criada com sucesso!');

    const noticiasFile = path.join(__dirname, '..', 'data', 'noticias.json');
    if (fs.existsSync(noticiasFile)) {
      const noticias = JSON.parse(fs.readFileSync(noticiasFile, 'utf8'));
      console.log('Enviando', noticias.length, 'notícias para o Turso...');
      for (const n of noticias) {
        await client.execute({
          sql: `INSERT INTO noticias (id, title, link, description, pubDate, source, image, foundAt)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                title=excluded.title, link=excluded.link, description=excluded.description,
                pubDate=excluded.pubDate, source=excluded.source, image=excluded.image, foundAt=excluded.foundAt;`,
          args: [
            n.id || Math.random().toString(),
            n.title || '',
            n.link || '',
            n.description || '',
            n.pubDate || '',
            n.source || '',
            n.image || '',
            n.foundAt || new Date().toISOString()
          ]
        });
      }
      console.log('Todas as notícias foram sincronizadas com o Turso com sucesso!');
    }
  } catch (e) {
    console.error('Erro no Turso:', e);
  }
}

testTurso();
