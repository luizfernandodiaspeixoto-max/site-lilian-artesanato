const fs = require('fs');
const path = require('path');
const { createClient } = require('@libsql/client');

const client = createClient({
  url: 'libsql://noticias-calcado.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjU05BTWM5QkVmR25QQ0x4WGlLNERRIiwib3JnX2lkIjoxMDAwMjYxNDM3fQ.oMuC0BxnznncClaC4UCteQDUrxHFiWSV8QTwztEPGo7J_DuNl_qSff-xiyYCPDhc5k2ADqOpj04X-zlGCJbOBQ'
});

async function syncTurso() {
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
    console.log('Tabela noticias pronta no Turso.');

    const noticiasFile = path.join(__dirname, '..', 'data', 'noticias.json');
    if (!fs.existsSync(noticiasFile)) {
      console.log('Arquivo noticias.json não encontrado.');
      return;
    }

    const noticias = JSON.parse(fs.readFileSync(noticiasFile, 'utf8'));
    console.log('Sincronizando', noticias.length, 'notícias para o Turso...');

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

    console.log('Sincronização com o Turso concluída com sucesso!');
  } catch (e) {
    console.error('Erro ao sincronizar com o Turso:', e);
  }
}

syncTurso();
