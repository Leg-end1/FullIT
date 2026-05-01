import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

// replace sky/blue gradients and specific colors with neutral/black
content = content.replace(/via-sky-500/g, 'via-black');
content = content.replace(/text-sky-300/g, 'text-neutral-200');
content = content.replace(/hover:bg-sky-400/g, 'hover:bg-black hover:text-white');

// ensure button colors are consistently white/black
content = content.replace(/bg-yellow-500 text-slate-950/g, 'bg-black text-white');

fs.writeFileSync('src/App.tsx', content);
console.log('Final color cleanup done');
