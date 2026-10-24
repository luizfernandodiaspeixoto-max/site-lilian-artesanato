const fs = require('fs');
let css = fs.readFileSync('public/css/style.css', 'utf8');

const mediaGrid = `
@media (min-width: 1024px) { 
  body { 
    display: grid !important; 
    grid-template-columns: 260px 1fr !important; 
    grid-template-areas: 
      "masthead masthead"
      "sidebar container"
      "sidebar footer";
  } 
  .masthead {
    grid-area: masthead;
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  .sidebar-ad { 
    grid-area: sidebar;
    background: #111111; 
    border-right: 2px solid #ff007f;
    padding: 30px 16px; 
    min-height: calc(100vh - 140px);
    position: sticky; 
    top: 140px; 
    display: flex;
    flex-direction: column;
    gap: 24px;
    z-index: 999;
    box-shadow: 0 0 20px rgba(255, 0, 127, 0.4);
    animation: neonPulse 1.5s infinite alternate;
  } 
  .container { 
    grid-area: container;
  } 
  .footer {
    grid-area: footer;
  }
}
`;

if (css.includes('grid-template-areas')) {
  css = css.replace(/@media \(min-width: 1024px\) \{[\s\S]*?\}\s*\}/g, mediaGrid);
} else {
  css += '\n' + mediaGrid;
}

fs.writeFileSync('public/css/style.css', css, 'utf8');
console.log('style.css updated with sticky masthead and sticky sidebar!');
