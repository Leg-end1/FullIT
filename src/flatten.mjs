import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove all newlines to restore the "one-line" valid JS state
content = content.replace(/\n/g, ' ');

// 2. Fix the mess created by previous patches if they were added as newlines
content = content.replace(/\s+/g, ' ');

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx flattened');
