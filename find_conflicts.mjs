import { readFileSync } from 'fs';
const data = JSON.parse(readFileSync('C:/Users/USUARIO/AppData/Local/Temp/mapping_v2.json', 'utf8'));

const conflictIds = [
  '01201301','01981301','02931301','03101301','03341301',
  '04131301','04991301','08731301','10071301','10331301',
  '13261301','15551301','16281301','21371301','23711301',
  '27411301','30861301','37511301','38591301'
];

conflictIds.forEach(id => {
  const entry = data.find(e => e.imageFile.startsWith(id));
  if (!entry) return;
  const baseName = entry.spanishName.replace(/ \(id \d+\)$/, '');
  const others = data.filter(e => e.spanishName === baseName && !e.imageFile.startsWith(id));
  console.log('\nCONFLICT: ' + id);
  console.log('  Image:', entry.imageFile);
  console.log('  Would be named:', baseName);
  console.log('  Conflicts with:', others.map(o => o.imageFile + ' => ' + o.spanishName));
});
