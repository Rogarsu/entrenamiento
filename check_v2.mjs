import { readFileSync } from 'fs';

const data = JSON.parse(readFileSync('C:/Users/USUARIO/AppData/Local/Temp/mapping_v2.json', 'utf8'));
const std = data.filter(e => /^\d{5}/.test(e.imageFile));

console.log('ExerciseDB entries:', std.length);
console.log('Total entries:', data.length);

// Check all required fields
let allGood = true;
data.forEach((e, i) => {
  const required = ['imageFile','currentFile','exerciseId','spanishName','newFile','muscle','equipment','category','difficulty','sets_default','reps_default','rest_seconds','weight_guide'];
  required.forEach(f => {
    if (e[f] === undefined || e[f] === null || e[f] === '') {
      console.log('MISSING', f, 'in entry', i, e.imageFile);
      allGood = false;
    }
  });
});
if (allGood) console.log('All required fields present: OK');

// Check uniqueness
const names = data.map(r => r.spanishName);
const ids = data.map(r => r.exerciseId);
const dupNames = names.filter((n, i) => names.indexOf(n) !== i);
const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
console.log('Duplicate names:', dupNames.length);
console.log('Duplicate IDs:', dupIds.length);
if (dupNames.length > 0) console.log('Dup names:', [...new Set(dupNames)]);
if (dupIds.length > 0) console.log('Dup IDs:', [...new Set(dupIds)]);

// Sample by muscle group
const byMuscle = {};
std.forEach(e => {
  if (!byMuscle[e.muscle]) byMuscle[e.muscle] = [];
  byMuscle[e.muscle].push(e);
});

Object.keys(byMuscle).sort().forEach(m => {
  const sample = byMuscle[m].slice(0, 3);
  console.log('\n--- ' + m.toUpperCase() + ' (' + byMuscle[m].length + ') ---');
  sample.forEach(e => console.log('  ' + e.imageFile.substring(0, 50) + '\n    => ' + e.spanishName + ' [' + e.exerciseId + ']'));
});

// Check valid muscles
const validMuscles = ['chest','back','shoulders','biceps','triceps','forearms','quads','hamstrings','glutes','calves','core','cardio','waist','neck'];
const invalidMuscle = data.filter(e => !validMuscles.includes(e.muscle));
console.log('\nInvalid muscle entries:', invalidMuscle.length);
invalidMuscle.forEach(e => console.log('  ', e.imageFile, '->', e.muscle));

// Check valid categories
const validCats = ['compound','isolation','cardio','mobility','plyometric','warmup','cooldown'];
const invalidCat = data.filter(e => !validCats.includes(e.category));
console.log('Invalid category entries:', invalidCat.length);
invalidCat.forEach(e => console.log('  ', e.imageFile, '->', e.category));
