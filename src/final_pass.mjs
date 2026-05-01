import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Convert any remaining Sky/Blue to Black/White/Neutral
content = content.replace(/bg-sky-400/g, 'bg-black text-white hover:bg-neutral-800');
content = content.replace(/text-sky-500/g, 'text-black');
content = content.replace(/hover:text-slate-200/g, 'hover:text-black');
content = content.replace(/bg-neutral-100 blacks/g, 'bg-black');

// 2. Remove all shadows that are blueish
content = content.replace(/shadow-\[0_0_[^\]]+rgba\(14,165,233,[^\]]+\)\]/g, 'shadow-sm');

// 3. Fix the "NavItem" where I might have messed up labels
content = content.replace(/active \? "text-neutral-700 " : "text-neutral-400 hover:text-slate-200"/g, 'active ? "text-black font-bold" : "text-neutral-400 hover:text-black"');

// 4. Fix any "text-black " (extra space)
content = content.replace(/text-black\s+/g, 'text-black ');

// 5. Replace bg-[#0d1117] remnants
content = content.replace(/bg-\[#0d1117\]/g, 'bg-neutral-50');
content = content.replace(/bg-\[#161b22\]/g, 'bg-neutral-100');

// 6. Ensure header is clean white
content = content.replace(/bg-white\/80/g, 'bg-white/90');

// 7. Fix the "Terminate Session" color
content = content.replace(/bg-red-50 text-red-600 border border-red-200 hover:bg-red-500 hover:text-black/g, 'bg-white text-neutral-400 border border-neutral-200 hover:bg-black hover:text-white hover:border-black');

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('Final aesthetic pass done');
