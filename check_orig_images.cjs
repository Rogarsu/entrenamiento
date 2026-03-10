const { readdirSync } = require('fs');
const existing = new Set(readdirSync('public/images').map(f => f.toLowerCase()));

// These are the original images.js paths (manual mapping for original exercises)
const origPaths = [
  'Flexión de brazos.gif','Press de banca agarre ancho.gif','Flexión sobre antebrazos.gif',
  'Flexión un brazo.gif','Flexión diamante.gif','Flexión pliométrica.gif','Flexión arquero.gif',
  'Flexión en pica.gif','Press de banca con mancuernas.gif','Press tumbado martillo con mancuernas.gif',
  'Press de banca con barra.gif','Press inclinado agarre neutro.gif','Press inclinado con barra.gif',
  'Press declinado con barra.gif','Press declinado con mancuernas.gif','Press de banca agarre cerrado con barra.gif',
  'Press inclinado agarre cerrado con mancuernas.gif','Press inclinado agarre cerrado con barra.gif',
  'Svend press.gif','Press con apriete con mancuernas.gif','Hex press en máquina Smith.gif',
  'Press de pecho en máquina.gif','Press inclinado en máquina.gif','Press declinado en máquina.gif',
  'Press de pecho con polea.gif','Press de pecho con banda (variante).gif',
  'Apertura de pecho con mancuernas.gif','Apertura inclinada con mancuernas.gif',
  'Apertura declinada con mancuernas.gif','Apertura con polea.gif','Apertura en máquina (pec deck).gif',
  'Apertura alta con banda elástica.gif','Apertura con landmine.gif',
  'Pull-over con mancuerna.gif','Pull-over con barra.gif','Pull-over con polea.gif','Fondos para pecho.gif',
  'Dominadas agarre estrecho.gif','Dominadas agarre ancho.gif','Dominadas agarre neutro.gif',
  'Dominadas agarre mixto.gif','Dominadas supinas un brazo.gif','Remo invertido.gif',
  'Retracción escapular.gif','Jalón al pecho con polea.gif','Remo con polea sentado (variante).gif',
  'Remo con mancuerna.gif','Remo inverso con mancuernas.gif','Remo con barra.gif',
  'Remo con barra agarre ancho.gif','Remo con barra agarre supino.gif',
  'Remo inclinado con barra.gif','Remo inclinado con mancuernas.gif','Remo en T.gif',
  'Face pull con polea.gif','Encogimiento de hombros.gif','Rack pull con barra.gif',
  'Hiperextensión.gif','Superman.gif','Peso muerto piernas rígidas.gif',
  'Peso muerto rumano con mancuernas.gif','Peso muerto en máquina.gif',
  'Press de hombros con polea.gif','Press militar con barra (variante).gif','Press Arnold.gif',
  'Press de hombros en máquina.gif','Press por detrás del cuello.gif',
  'Press de hombros en pino con pared.gif','Press de hombros con landmine.gif',
  'Elevación con mancuerna.gif','Elevación frontal con barra.gif','Elevación posterior con barra.gif',
  'Remo al mentón con barra.gif','Band pull-apart.gif',
];

let found = 0, missing = 0;
for (const f of origPaths) {
  if (existing.has(f.toLowerCase())) found++;
  else { missing++; console.log('MISS:', f); }
}
console.log(`\nOriginal images: ${found} found, ${missing} missing`);
