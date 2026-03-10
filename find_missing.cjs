const { readFileSync, readdirSync } = require('fs');
const TMPDIR = 'C:\\Users\\USUARIO\\AppData\\Local\\Temp';

const data = JSON.parse(readFileSync(TMPDIR + '\\mapping_v2.json', 'utf8'));
const oldMapping = JSON.parse(readFileSync(TMPDIR + '\\exercise_mapping.json', 'utf8'));

function sanitize(name) {
  return name
    .replace(/\//g, ' - ').replace(/\\/g, ' - ')
    .replace(/:/g, ' -').replace(/\*/g, '').replace(/\?/g, '')
    .replace(/"/g, '').replace(/</g, '').replace(/>/g, '')
    .replace(/\|/g, '-').replace(/\s+/g, ' ').trim();
}

// Derive old current names (same logic as gen_v2.cjs)
const oldUsedFiles = new Set();
const oldCurrentFile = {};
for (const e of oldMapping) {
  let fn = sanitize(e.newFile);
  let counter = 2;
  const orig = fn;
  while (oldUsedFiles.has(fn)) {
    const ext = orig.lastIndexOf('.');
    fn = orig.slice(0, ext) + ' ' + counter + orig.slice(ext);
    counter++;
  }
  oldUsedFiles.add(fn);
  oldCurrentFile[e.imageFile] = fn;
}

const targetNames = new Set(data.map(e => sanitize(e.spanishName).toLowerCase() + '.gif'));
const existing = new Set(readdirSync('public/images').map(f => f.toLowerCase()));

const missing = data.filter(e => !existing.has(sanitize(e.spanishName).toLowerCase() + '.gif'));
console.log('Missing targets:', missing.length);
missing.forEach(e => {
  const currentName = oldCurrentFile[e.imageFile] || '?';
  const currentExists = existing.has(currentName.toLowerCase());
  console.log(`  TARGET: ${sanitize(e.spanishName)}.gif`);
  console.log(`  ORIG:   ${e.imageFile}`);
  console.log(`  CURR:   ${currentName} [${currentExists ? 'EXISTS' : 'MISSING'}]`);
  console.log();
});
