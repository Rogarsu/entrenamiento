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

const existingFiles = new Set(readdirSync('public/images').map(f => f.toLowerCase()));
let found = 0, missing = 0, missingNames = [];
for (const e of data) {
  const fn = sanitize(e.spanishName) + '.gif';
  if (existingFiles.has(fn.toLowerCase())) found++;
  else { missing++; missingNames.push(fn); }
}
console.log('Found:', found, 'Missing:', missing);
missingNames.slice(0, 30).forEach(n => console.log(' MISS:', n));
