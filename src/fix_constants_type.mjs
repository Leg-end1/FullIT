import fs from 'fs';
let content = fs.readFileSync('src/constants.ts', 'utf8');
content = content.replace(/"numTasks": \d+,/g, '');
fs.writeFileSync('src/constants.ts', content);
console.log('Removed numTasks from constants.ts');
