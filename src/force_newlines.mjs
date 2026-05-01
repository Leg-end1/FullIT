import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(/([;{}>])/g, '$1\n');
fs.writeFileSync('src/App.tsx', content);
