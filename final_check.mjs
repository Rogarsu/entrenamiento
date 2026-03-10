import { readFileSync } from 'fs';

const data = JSON.parse(readFileSync('C:/Users/USUARIO/AppData/Local/Temp/mapping_v2.json', 'utf8'));

console.log('=== FINAL VALIDATION ===\n');
console.log('Total entries:', data.length);

// 1. Check all required fields
let allGood = true;
const required = ['imageFile','currentFile','exerciseId','spanishName','newFile','muscle','equipment','category','difficulty','sets_default','reps_default','rest_seconds','weight_guide'];
data.forEach((e, i) => {
  required.forEach(f => {
    if (e[f] === undefined || e[f] === null || e[f] === '') {
      console.log('MISSING', f, 'in entry', i, e.imageFile);
      allGood = false;
    }
  });
});
console.log('Required fields check:', allGood ? 'ALL PRESENT' : 'ISSUES FOUND');

// 2. Uniqueness
const names = data.map(r => r.spanishName);
const ids = data.map(r => r.exerciseId);
const dupNames = names.filter((n, i) => names.indexOf(n) !== i);
const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
console.log('Duplicate Spanish names:', dupNames.length === 0 ? 'NONE (OK)' : dupNames.length + ' DUPLICATES');
console.log('Duplicate exercise IDs:', dupIds.length === 0 ? 'NONE (OK)' : dupIds.length + ' DUPLICATES');
if (dupNames.length > 0) console.log('  Names:', [...new Set(dupNames)]);
if (dupIds.length > 0) console.log('  IDs:', [...new Set(dupIds)]);

// 3. Valid muscles
const validMuscles = ['chest','back','shoulders','biceps','triceps','forearms','quads','hamstrings','glutes','calves','core','cardio','waist','neck','mobility'];
const invalidMuscle = data.filter(e => !validMuscles.includes(e.muscle));
console.log('Invalid muscle groups:', invalidMuscle.length === 0 ? 'NONE (OK)' : invalidMuscle.length);
invalidMuscle.forEach(e => console.log('  ', e.imageFile, '->', e.muscle));

// 4. Valid categories
const validCats = ['compound','isolation','cardio','mobility','plyometric','warmup','cooldown'];
const invalidCat = data.filter(e => !validCats.includes(e.category));
console.log('Invalid categories:', invalidCat.length === 0 ? 'NONE (OK)' : invalidCat.length);
invalidCat.forEach(e => console.log('  ', e.imageFile, '->', e.category));

// 5. Valid difficulties
const validDiff = ['beginner','intermediate','advanced'];
const invalidDiff = data.filter(e => !validDiff.includes(e.difficulty));
console.log('Invalid difficulties:', invalidDiff.length === 0 ? 'NONE (OK)' : invalidDiff.length);

// 6. Distribution stats
console.log('\n=== DISTRIBUTION ===');
const byMuscle = {};
const byCat = {};
const byDiff = {};
data.forEach(e => {
  byMuscle[e.muscle] = (byMuscle[e.muscle] || 0) + 1;
  byCat[e.category] = (byCat[e.category] || 0) + 1;
  byDiff[e.difficulty] = (byDiff[e.difficulty] || 0) + 1;
});
console.log('By muscle:', byMuscle);
console.log('By category:', byCat);
console.log('By difficulty:', byDiff);

// 7. Check ExerciseDB entries count
const std = data.filter(e => /^\d{5}/.test(e.imageFile));
const custom = data.filter(e => !/^\d{5}/.test(e.imageFile));
console.log('\nExerciseDB entries:', std.length);
console.log('Custom entries:', custom.length);

// 8. Sample output - first 20
console.log('\n=== FIRST 20 ENTRIES ===');
data.slice(0, 20).forEach((e, i) => {
  console.log(`${i+1}. ${e.spanishName}`);
  console.log(`   ID: ${e.exerciseId}`);
  console.log(`   Muscle: ${e.muscle} | Category: ${e.category} | Equipment: ${e.equipment} | Diff: ${e.difficulty}`);
  console.log(`   Sets: ${e.sets_default} | Reps: ${e.reps_default} | Rest: ${e.rest_seconds}s`);
  console.log(`   Weight: ${e.weight_guide}`);
  console.log();
});
