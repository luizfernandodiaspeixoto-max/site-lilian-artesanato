const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const NEWS_FILE = path.join(DATA_DIR, 'noticias.json');
const WHATSAPP_DIR = path.join(DATA_DIR, 'whatsapp');
const SEEN_FILE = path.join(DATA_DIR, 'seen.json');

function ensureDirs() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(WHATSAPP_DIR)) fs.mkdirSync(WHATSAPP_DIR, { recursive: true });
}

function loadJSON(file, fallback) {
  try {
    if (!fs.existsSync(file)) return fallback;
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
}

function saveJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = { DATA_DIR, NEWS_FILE, WHATSAPP_DIR, SEEN_FILE, ensureDirs, loadJSON, saveJSON };
