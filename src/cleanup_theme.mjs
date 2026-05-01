import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove theme state and effects
content = content.replace(/const \[theme, setTheme\] = useState<'dark' \| 'light'>\('light'\);/g, '');
content = content.replace(/useEffect\(\(\) => \{[\s\S]*?\}, \[theme\]\);/g, '');
content = content.replace(/useEffect\(\(\) => \{[\s\S]*?\}, \[\]\);/g, (match) => {
    if (match.includes('localStorage.getItem(\'theme\')')) return '';
    return match;
});

// 2. Remove theme toggle button block
// Looking for the button with setTheme
const themeToggleRegex = /<button\s+onClick=\{\(\) => setTheme\(theme === 'dark' \? 'light' : 'dark'\)\}[\s\S]*?<\/button>/g;
content = content.replace(themeToggleRegex, '');

// 3. Remove all dark: classes
content = content.replace(/\bdark:[\w/\[\]#\-\(\)\.]+/g, '');

// 4. Simplify color strings that were "text-black dark:text-white"
// After removing dark:, they might look like "text-black " or "bg-white "
content = content.replace(/\s+/g, ' ');

// 5. Broadly cleanup common pattern after dark: removal
content = content.replace(/text-black dark:text-white/g, 'text-black');
content = content.replace(/bg-white dark:bg-\[#0a0a0a\]/g, 'bg-white');
content = content.replace(/bg-neutral-50 dark:bg-neutral-900/g, 'bg-neutral-50');
content = content.replace(/border-neutral-200 dark:border-neutral-800/g, 'border-neutral-200');

// Additional clean for specific v0 look:
// Replace any remaining complex backgrounds or borders with simpler ones
content = content.replace(/bg-neutral-100 dark:bg-neutral-800/g, 'bg-neutral-50');
content = content.replace(/border-neutral-300 dark:border-neutral-700/g, 'border-neutral-200');

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('App.tsx cleaned up');
