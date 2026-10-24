const fs = require('fs');
const cssPath = 'G:/noticias calcado/public/css/style.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Adicionar animação Neon piscante para o link do anúncio flutuante
const neonCss = `
@keyframes neonPulse {
  0% {
    box-shadow: 0 0 5px #ff007f, 0 0 10px #ff007f, 0 0 20px #ff007f, 0 0 40px #ff007f;
    border-color: #ff007f;
  }
  50% {
    box-shadow: 0 0 2px #ff007f, 0 0 5px #ff007f, 0 0 10px #ff007f;
    border-color: #ffffff;
  }
  100% {
    box-shadow: 0 0 5px #ff007f, 0 0 10px #ff007f, 0 0 20px #ff007f, 0 0 40px #ff007f;
    border-color: #ff007f;
  }
}

.floating-neon-ad {
  position: fixed;
  bottom: 25px;
  right: 25px;
  z-index: 99999;
  background: #111111;
  color: #ffffff;
  padding: 14px 22px;
  border-radius: 30px;
  font-weight: 900;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-decoration: none;
  border: 2px solid #ff007f;
  animation: neonPulse 1.5s infinite alternate;
  box-shadow: 0 0 15px rgba(255, 0, 127, 0.7);
}

.floating-neon-ad:hover {
  background: #ff007f;
  color: #ffffff;
}
`;

if (!css.includes('floating-neon-ad')) {
  css += '\n' + neonCss;
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('Neon pulse CSS added!');
}
