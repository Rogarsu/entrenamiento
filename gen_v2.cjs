const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

const TMPDIR = 'C:\\Users\\USUARIO\\AppData\\Local\\Temp';
const PROJ = __dirname;

const mapping = JSON.parse(readFileSync(path.join(TMPDIR, 'mapping_v2.json'), 'utf8'));

// ── Sanitize filename (no path separators, no illegal chars) ────────────────
function sanitize(name) {
  return name
    .replace(/\//g, ' - ').replace(/\\/g, ' - ')
    .replace(/:/g, ' -').replace(/\*/g, '').replace(/\?/g, '')
    .replace(/"/g, '').replace(/</g, '').replace(/>/g, '')
    .replace(/\|/g, '-').replace(/\s+/g, ' ').trim();
}

// ── Deduplicate new filenames ────────────────────────────────────────────────
const usedFiles = new Set();
const renameMap = [];   // {from (current renamed file), to (new descriptive file)}
const imageById = {};   // exerciseId → final image path for images.js

// We need to map from the CURRENT renamed file to new descriptive file.
// The current file is in entry.newFile (from mapping_v1).
// We use the original imageFile to get the current name via the old rename_images.sh.
// Instead: we have the current file from the old mapping in entry.newFile (already sanitized).
// BUT the old mapping deduped with numbers. So we need to re-derive current names.

// Re-derive current filenames using the same logic as the first run (with dedup).
const oldUsedFiles = new Set();
const oldCurrentFile = {};
const oldMapping = JSON.parse(readFileSync(path.join(TMPDIR, 'exercise_mapping.json'), 'utf8'));
for (const e of oldMapping) {
  let fn = e.newFile
    .replace(/\//g, ' - ').replace(/\\/g, ' - ')
    .replace(/:/g, ' -').replace(/\*/g, '').replace(/\?/g, '')
    .replace(/"/g, '').replace(/</g, '').replace(/>/g, '')
    .replace(/\|/g, '-').replace(/\s+/g, ' ').trim();
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

// ── Build rename list ────────────────────────────────────────────────────────
for (const entry of mapping) {
  const currentFile = oldCurrentFile[entry.imageFile];
  if (!currentFile) {
    console.warn('WARNING: no current file found for', entry.imageFile);
    continue;
  }

  // Get extension from current file
  const ext = currentFile.lastIndexOf('.');
  const extension = ext >= 0 ? currentFile.slice(ext) : '.gif';

  // New descriptive name
  let newName = sanitize(entry.spanishName) + extension;

  // Deduplicate
  const origNew = newName;
  let counter = 2;
  while (usedFiles.has(newName)) {
    const dotIdx = origNew.lastIndexOf('.');
    newName = origNew.slice(0, dotIdx) + ' (' + counter + ')' + origNew.slice(dotIdx);
    counter++;
  }
  usedFiles.add(newName);

  renameMap.push({ from: currentFile, to: newName, id: entry.exerciseId });
  if (!imageById[entry.exerciseId]) {
    imageById[entry.exerciseId] = 'images/' + newName;
  }
}

// ── 1. Rename shell script ───────────────────────────────────────────────────
const renameLines = renameMap.map(r =>
  'mv "public/images/' + r.from.replace(/"/g, '\\"') + '" "public/images/' + r.to.replace(/"/g, '\\"') + '"'
);
writeFileSync(path.join(TMPDIR, 'rename_v2.sh'), renameLines.join('\n') + '\n', 'utf8');
console.log('rename_v2.sh:', renameLines.length, 'lines');

// ── 2. images.js ────────────────────────────────────────────────────────────
const imgEntries = Object.entries(imageById)
  .map(([id, p]) => "  '" + id + "': '" + p.replace(/'/g, "\\'") + "',")
  .join('\n');

const imagesJs = "// Mapa de imágenes: key = id del ejercicio (749 ejercicios únicos)\nexport const EX_IMAGES = {\n" + imgEntries + "\n};\n\nexport function getExImage(id, name) {\n  if (EX_IMAGES[id]) return EX_IMAGES[id];\n  return null;\n}\n";
writeFileSync(path.join(TMPDIR, 'images_v2.js'), imagesJs, 'utf8');
console.log('images_v2.js:', Object.keys(imageById).length, 'entries');

// ── 3. exercises.js fragment (749 entries) ───────────────────────────────────
const muscleGroupOrder = ['chest','back','shoulders','biceps','triceps','forearms','quads','hamstrings','glutes','calves','core','waist','neck','cardio','mobility'];
const groups = {};
for (const entry of mapping) {
  const m = entry.muscle || 'core';
  if (!groups[m]) groups[m] = [];
  groups[m].push(entry);
}

// Map muscle to ES display
const muscleLabel = {
  chest:'PECHO', back:'ESPALDA', shoulders:'HOMBROS', biceps:'BÍCEPS', triceps:'TRÍCEPS',
  forearms:'ANTEBRAZOS', quads:'CUÁDRICEPS', hamstrings:'ISQUIOTIBIALES', glutes:'GLÚTEOS',
  calves:'PANTORRILLAS', core:'CORE', waist:'CINTURA/OBLICUOS', neck:'CUELLO',
  cardio:'CARDIO', mobility:'MOVILIDAD'
};

let exFragment = '// ── EJERCICIOS EXERCISEDB (749 únicos) ──────────────────────────────────────\n';
for (const m of muscleGroupOrder) {
  const arr = groups[m];
  if (!arr || arr.length === 0) continue;
  exFragment += '\n  // ' + (muscleLabel[m] || m.toUpperCase()) + ' (' + arr.length + ')\n';
  for (const ex of arr) {
    const name = (ex.spanishName || ex.exerciseId).replace(/'/g, "\\'");
    const equip = (ex.equipment || 'Varios').replace(/'/g, "\\'");
    const env = (ex.equipment || '').toLowerCase().includes('sin') || (ex.equipment || '').toLowerCase().includes('peso corporal') ? 'no_equipment' : 'gym';
    const diff = ex.difficulty || 'beginner';
    const cat = ex.category || 'isolation';
    const sets = ex.sets_default || 3;
    const reps = (ex.reps_default || '10-12').replace(/'/g, "\\'");
    const rest = ex.rest_seconds || 60;
    const wg = (ex.weight_guide || 'Moderado').replace(/'/g, "\\'");
    // muscles_secondary: guess from muscle group
    const sec = { chest:['triceps','shoulders'], back:['biceps'], shoulders:['triceps'], biceps:['forearms'], triceps:['chest'], quads:['glutes','hamstrings'], hamstrings:['glutes'], glutes:['hamstrings'], cardio:[] }[m] || [];
    exFragment += "  { id: '" + ex.exerciseId + "', name: '" + name + "', muscle_primary: '" + m + "', muscles_secondary: " + JSON.stringify(sec) + ", equip: '" + equip + "', environment: '" + env + "', difficulty: '" + diff + "', category: '" + cat + "', sets_default: " + sets + ", reps_default: '" + reps + "', rest_seconds: " + rest + ", weight_guide: '" + wg + "' },\n";
  }
}
writeFileSync(path.join(TMPDIR, 'exercises_v2_fragment.js'), exFragment, 'utf8');
console.log('exercises_v2_fragment.js: lines =', exFragment.split('\n').length);

// ── Summary ─────────────────────────────────────────────────────────────────
const dupFiles = renameMap.map(r => r.to).filter((v, i, a) => a.indexOf(v) !== i);
console.log('\nDuplicate new filenames:', dupFiles.length);
if (dupFiles.length > 0) console.log(dupFiles.slice(0, 5));
console.log('\nSample renames:');
renameMap.slice(0, 5).forEach(r => console.log(' ', r.from, '->', r.to));
console.log('\nSample images.js:');
Object.entries(imageById).slice(0, 5).forEach(([id, p]) => console.log(' ', id + ':', p));
console.log('\nDone!');
