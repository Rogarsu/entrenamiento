import { readFileSync } from 'fs';

const data = JSON.parse(readFileSync('C:/Users/USUARIO/AppData/Local/Temp/mapping_v2.json', 'utf8'));
const std = data.filter(e => /^\d{5}/.test(e.imageFile));

// Find entries where Spanish name looks like it wasn't properly translated
// (contains capital English words, weird patterns, etc.)
const suspicious = std.filter(e => {
  const n = e.spanishName;
  // Check for untranslated English words
  const englishPatterns = [
    /\bBarbell\b/, /\bDumbbell\b/, /\bCable\b/, /\bLever\b/, /\bWeighted\b/,
    /\bStanding\b/, /\bSeated\b/, /\bLying\b/, /\bHanging\b/, /\bBench\b/,
    /\bHead\b/, /\bNeck\b/, /\bShoulder\b/, /\bLifting\b/, /\bSkier\b/, /\bRack\b/
  ];
  return englishPatterns.some(p => p.test(n));
});

console.log('Suspicious entries (untranslated English):', suspicious.length);
suspicious.forEach(e => {
  console.log('\nIMAGE:', e.imageFile);
  console.log('  NAME:', e.spanishName);
  console.log('  ID:', e.exerciseId);
  console.log('  Muscle:', e.muscle);
});
