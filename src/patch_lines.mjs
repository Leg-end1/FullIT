import fs from 'fs';
let lines = fs.readFileSync('src/App.tsx', 'utf8').split('\n');

// Find line 760 (1-based index 760 -> array index 759)
lines[759] = 'const strategy = EvaluationFactory.getStrategyForTask(task.id);';
lines[762] = 'const aiResponse = await fetch("/api/evaluate", {';

fs.writeFileSync('src/App.tsx', lines.join('\n'));
console.log('Patched lines 760 and 763');
