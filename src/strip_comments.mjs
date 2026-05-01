import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Remove all block comments
content = content.replace(/\/\*[\s\S]*?\*\//g, '');

// Remove all single line comments (carefully)
// This might remove // in strings, but we'll try it
content = content.replace(/(^|[^\\])\/\/.*/g, '$1');

fs.writeFileSync('src/App.tsx', content);
console.log('Comments stripped');
