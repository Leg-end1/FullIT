import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Fix the comments that were broken by newlines
content = content.replace(/\/\/ (.*)/g, '/* $1 */');

// Remove the extreme newlines I added
content = content.replace(/\n\n+/g, '\n');

fs.writeFileSync('src/App.tsx', content);
