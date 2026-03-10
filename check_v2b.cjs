const { readFileSync, readdirSync } = require('fs');
const TMPDIR = 'C:\\Users\\USUARIO\\AppData\\Local\\Temp';

const data = JSON.parse(readFileSync(TMPDIR + '\\mapping_v2.json', 'utf8'));

function sanitize(name) {
  return name
    .replace(/\//g, ' - ').replace(/\\/g, ' - ')
    .replace(/:/g, ' -').replace(/\*/g, '').replace(/\?/g, '')
    .replace(/"/g, '').replace(/</g, '').replace(/>/g, '')
    .replace(/\|/g, '-').replace(/\s+/g, ' ').trim();
}

const targetNames = new Set(data.map(e => sanitize(e.spanishName).toLowerCase() + '.gif'));
const existing = readdirSync('public/images');

const unmatched = existing.filter(f => f.endsWith('.gif') && !targetNames.has(f.toLowerCase()));
console.log('Unmatched GIFs:', unmatched.length);
unmatched.forEach(f => console.log(' ', f));
