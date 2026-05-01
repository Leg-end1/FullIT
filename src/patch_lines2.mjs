import fs from 'fs';
let lines = fs.readFileSync('src/App.tsx', 'utf8').split('\n');

lines[775] = 'const finalResult = {';

fs.writeFileSync('src/App.tsx', lines.join('\n'));
console.log('Patched line 776');
