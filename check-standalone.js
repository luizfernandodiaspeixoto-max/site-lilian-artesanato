const fs = require('fs');

// Ler o CSS atual
const css = fs.readFileSync('public/css/style.css', 'utf8');

// Ler o standalone.js para garantir que ele injeta perfeitamente o CSS e o HTML do modal
let standaloneCode = fs.readFileSync('standalone.js', 'utf8');

// Forçar standalone.js a colocar as regras de 4cm e ocultar google search link no onclick
console.log('Verificando standalone.js...');
