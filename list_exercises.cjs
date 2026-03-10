const fs = require('fs');
const content = fs.readFileSync('src/data/exercises.js', 'utf8');
const matches = [...content.matchAll(/\{ id: '([^']+)', name: '([^']+)', muscle_primary: '([^']+)'/g)];
const grouped = {};
for (const [, id, name, muscle] of matches) {
  if (!grouped[muscle]) grouped[muscle] = [];
  grouped[muscle].push({ id, name });
}
const order = ['chest','back','shoulders','biceps','triceps','forearms','quads','hamstrings','glutes','calves','core','waist','cardio','neck','mobility'];
const labels = {chest:'PECHO',back:'ESPALDA',shoulders:'HOMBROS',biceps:'BÍCEPS',triceps:'TRÍCEPS',forearms:'ANTEBRAZOS',quads:'CUÁDRICEPS',hamstrings:'ISQUIOTIBIALES',glutes:'GLÚTEOS',calves:'PANTORRILLAS',core:'CORE',waist:'CINTURA/OBLICUOS',cardio:'CARDIO',neck:'CUELLO',mobility:'MOVILIDAD'};
let total = 0;
for (const m of order) {
  if (!grouped[m]) continue;
  console.log('\n── ' + (labels[m]||m.toUpperCase()) + ' (' + grouped[m].length + ') ──');
  grouped[m].forEach((e,i) => console.log((i+1)+'. '+e.name));
  total += grouped[m].length;
}
console.log('\nTOTAL: ' + total + ' ejercicios');
