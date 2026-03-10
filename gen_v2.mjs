import { readFileSync, writeFileSync } from 'fs';

const raw = JSON.parse(readFileSync('C:/Users/USUARIO/AppData/Local/Temp/exercise_mapping.json', 'utf8'));

function toId(name) {
  return name
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[ñ]/g, 'n')
    .replace(/[^a-z0-9\s]/g, ' ')
    .trim()
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .substring(0, 50)
    .replace(/_$/, '');
}

function extractBodyPart(imageFile) {
  const m = imageFile.match(/_([A-Za-z][A-Za-z-]+)(?:[-_]FIX|[-_]SFIX)?_720/i);
  return m ? m[1].toLowerCase() : '';
}

function extractExerciseName(imageFile) {
  let s = imageFile.replace(/\.gif$/i, '');
  s = s.replace(/^\d+[a-f0-9]+-/, '');
  s = s.replace(/_[A-Za-z][A-Za-z-]*(?:-FIX|-SFIX)?_720.*$/, '');
  s = s.replace(/_\d+$/, '');
  s = s.replace(/[-_]/g, ' ');
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

function detectMuscle(n, bp) {
  const nl = n.toLowerCase();
  const bpl = (bp || '').toLowerCase();
  if (bpl.includes('chest') || nl.includes('bench press') || nl.includes('chest fly') || nl.includes('pec deck') || nl.includes('pec ') || (nl.includes('fly') && !nl.includes('reverse fly') && !nl.includes('side') && bpl.includes('chest'))) return 'chest';
  if (bpl.includes('back') || nl.includes('deadlift') || nl.includes('bent over row') || nl.includes('pullover') || nl.includes('pulldown') || nl.includes('pull up') || nl.includes('pullup') || nl.includes('pull-up') || nl.includes('chin up') || nl.includes('chinup') || nl.includes('chin-up') || nl.includes('good morning') || nl.includes('hyperextension') || nl.includes('superman') || nl.includes('bird dog') || nl.includes('exercise ball alternating arm')) return 'back';
  if (bpl.includes('shoulder') || nl.includes('shoulder press') || nl.includes('lateral raise') || nl.includes('front raise') || nl.includes('upright row') || nl.includes('arnold') || nl.includes('face pull') || nl.includes('reverse fly') || nl.includes('shrug')) return 'shoulders';
  if ((bpl.includes('upper-arm') || bpl.includes('upper arm') || bpl.includes('upper_arm')) && (nl.includes('curl') || nl.includes('bicep') || nl.includes('pull-up') || nl.includes('pullup') || nl.includes('pull up') || nl.includes('brachialis'))) return 'biceps';
  if (nl.includes('bicep') || (nl.includes('curl') && !nl.includes('leg curl') && !nl.includes('wrist curl') && !nl.includes('hip') && bpl.includes('upper'))) return 'biceps';
  if (bpl.includes('tricep') || nl.includes('tricep') || nl.includes('skull crusher') || nl.includes('pushdown') || nl.includes('triceps extension') || nl.includes('tricep extension') || nl.includes('lying tricep')) return 'triceps';
  if (bpl.includes('forearm') || nl.includes('wrist curl') || nl.includes('reverse wrist') || nl.includes('finger curl') || (nl.includes('hammer curl') && bpl.includes('forearm')) || (nl.includes('reverse curl') && bpl.includes('forearm'))) return 'forearms';
  if (bpl.includes('thigh') || nl.includes('squat') || nl.includes('leg press') || nl.includes('leg extension') || nl.includes('lunge') || nl.includes('sissy') || nl.includes('hack squat') || nl.includes('step up') || nl.includes('step-up')) return 'quads';
  if (nl.includes('hamstring') || nl.includes('leg curl') || nl.includes('romanian deadlift') || nl.includes('rdl') || nl.includes('nordic curl') || nl.includes('stiff leg') || nl.includes('straight leg dead')) return 'hamstrings';
  if (bpl.includes('hip') || bpl.includes('glute') || nl.includes('glute bridge') || nl.includes('hip thrust') || nl.includes('hip abduction') || nl.includes('hip adduction') || nl.includes('donkey kick') || nl.includes('fire hydrant') || nl.includes('hip raise') || nl.includes('lying hip')) return 'glutes';
  if (bpl.includes('calve') || nl.includes('calf raise') || nl.includes('heel raise')) return 'calves';
  if (bpl.includes('waist') || bpl.includes('wiast') || nl.includes('crunch') || nl.includes('sit up') || nl.includes('situp') || nl.includes('russian twist') || nl.includes('side bend') || nl.includes('plank') || nl.includes('oblique') || nl.includes('leg raise') || nl.includes('hollow') || nl.includes('dead bug') || nl.includes('pallof') || nl.includes('mountain climb') || nl.includes('wood chop') || nl.includes('cable crunch') || nl.includes('hanging') || nl.includes('cocoon') || nl.includes('bicycle crunch') || nl.includes('elbow to knee') || nl.includes('bent over twist') || nl.includes('bottoms up') || nl.includes('pull in') || nl.includes('v-up') || nl.includes('reverse crunch') || nl.includes('crunchy frog') || nl.includes('seated leg raise') || nl.includes('seated in out') || nl.includes('roman chair')) return 'waist';
  if (bpl.includes('neck') || nl.includes('neck')) return 'neck';
  if (bpl.includes('cardio') || nl.includes('run') || nl.includes('walk') || nl.includes('bike') || nl.includes('cycling') || nl.includes('rowing machine') || nl.includes('elliptical') || nl.includes('stepmill') || nl.includes('burpee') || nl.includes('skater') || nl.includes('jumping') || nl.includes('zigzag') || nl.includes('duck walk') || nl.includes('farmers walk') || nl.includes('assault bike') || nl.includes('air bike')) return 'cardio';
  return 'core';
}

function detectEquipment(n) {
  const nl = n.toLowerCase();
  if (nl.includes('smith machine') || nl.includes('smith hip') || (nl.includes('smith ') && nl.includes('squat'))) return 'Máquina Smith';
  if (nl.includes('ez-barbell') || nl.includes('ez barbell') || nl.includes('ez-bar') || nl.includes('ez bar')) return 'Barra EZ';
  if (nl.includes('olympic barbell') || nl.includes('barbell')) return 'Barra';
  if (nl.includes('dumbbell') || nl.includes('dumbell')) return 'Mancuernas';
  if (nl.includes('sz-bar') || nl.includes('sz bar')) return 'Polea/Cable';
  if (nl.includes('cable')) return 'Polea/Cable';
  if (nl.includes('lever ') || nl.includes('machine')) return 'Máquina';
  if (nl.includes('kettlebell')) return 'Kettlebell';
  if (nl.includes('band') && !nl.includes('barbell')) return 'Banda elástica';
  if (nl.includes('trx') || nl.includes('suspension')) return 'TRX';
  if (nl.includes('stability ball') || nl.includes('exercise ball')) return 'Pelota de estabilidad';
  if (nl.includes('landmine')) return 'Landmine';
  if (nl.includes('air bike') || nl.includes('air-bike') || nl.includes('assault bike')) return 'Air bike';
  if (nl.includes('rowing machine') || nl.includes('rowing with rowing')) return 'Máquina de remo';
  if (nl.includes('elliptical')) return 'Elíptica';
  if (nl.includes('run equipment') || nl.includes('treadmill') || nl.includes('incline treadmill') || nl.includes('stepmill') || nl.includes('walk wave') || nl.includes('wheel run')) return 'Cinta/Caminadora';
  if (nl.includes('stationary bike') || nl.includes('bicycle recline') || nl.includes('hands bike')) return 'Bicicleta estática';
  if (nl.includes('bed sheet')) return 'Sábana';
  if (nl.includes('parallel bar')) return 'Barras paralelas';
  if (nl.includes('roman chair')) return 'Silla romana';
  return 'Sin equipamiento';
}

function detectCategory(n, muscle) {
  const nl = n.toLowerCase();
  if (muscle === 'cardio') return 'cardio';
  if (nl.includes('farmers walk') || nl.includes('cycling') || nl.includes('rowing machine') || nl.includes('elliptical') || nl.includes('burpee') || nl.includes('skater') || nl.includes('zigzag') || nl.includes('duck walk') || nl.includes('assault bike') || nl.includes('air-bike') || nl.includes('treadmill') || nl.includes('stepmill') || nl.includes('wheel run') || nl.includes('short stride run') || nl.includes('briskly walking') || nl.includes('backwards run') || nl.includes('quickly trot') || nl.includes('walking high knees') || nl.includes('run') || nl.includes('walk') || nl.includes('bike')) return 'cardio';
  if (nl.includes('plank') || nl.includes('bird dog') || nl.includes('dead bug') || nl.includes('hollow') || nl.includes('inchworm') || nl.includes('hip circle') || nl.includes('bear crawl')) return 'mobility';
  if (nl.includes('jump squat') || nl.includes('box jump') || nl.includes('jack burpee') || nl.includes('zigzag hop')) return 'plyometric';
  if (nl.includes('bench press') || nl.includes('squat') || nl.includes('deadlift') || nl.includes('row') || nl.includes('pull-up') || nl.includes('pullup') || nl.includes('chin-up') || nl.includes('chinup') || nl.includes('brachialis narrow pull') || nl.includes('lat pulldown') || nl.includes('pulldown') || nl.includes('overhead press') || nl.includes('military press') || nl.includes('dip') || nl.includes('push-up') || nl.includes('pushup') || nl.includes('lunge') || nl.includes('leg press') || nl.includes('hip thrust') || nl.includes('glute bridge')) return 'compound';
  return 'isolation';
}

function detectDifficulty(n, category, equipment) {
  const nl = n.toLowerCase();
  if (category === 'cardio' || category === 'mobility') return 'beginner';
  if (nl.includes('deadlift') || nl.includes('squat') || nl.includes('clean') || nl.includes('snatch') || nl.includes('thruster') || nl.includes('pistol') || nl.includes('handstand') || nl.includes('nordic') || nl.includes('turkish get-up') || nl.includes('jump squat')) return 'advanced';
  if (category === 'compound' && (equipment === 'Barra' || equipment === 'Barra EZ' || equipment === 'Máquina Smith')) return 'intermediate';
  return 'beginner';
}

function getDefaults(category, muscle, n, difficulty) {
  if (category === 'cardio') return { sets: 1, reps: '20-30 min', rest: 0 };
  if (category === 'mobility') return { sets: 1, reps: '30 seg', rest: 0 };
  if (category === 'plyometric') return { sets: 4, reps: '8-12', rest: 90 };
  if (difficulty === 'advanced') return { sets: 4, reps: '5-8', rest: 150 };
  if (category === 'compound') return { sets: 4, reps: '6-10', rest: 120 };
  if (muscle === 'waist' || muscle === 'core') return { sets: 3, reps: '12-15', rest: 45 };
  return { sets: 3, reps: '12-15', rest: 60 };
}

function getWeightGuide(n, equipment, category) {
  if (category === 'cardio') return 'Sin peso adicional';
  if (category === 'mobility') return 'Sin peso adicional';
  if (equipment === 'Sin equipamiento') return 'Peso corporal';
  if (equipment === 'Banda elástica') return 'Banda ligera a media';
  if (equipment === 'Mancuernas') return 'Mancuernas según nivel';
  if (equipment === 'Barra' || equipment === 'Barra EZ') return 'Barra con peso según nivel';
  if (equipment === 'Polea/Cable') return 'Ajustar polea según nivel';
  if (equipment === 'Máquina' || equipment === 'Máquina Smith') return 'Ajustar máquina según nivel';
  if (equipment === 'Kettlebell') return 'Kettlebell según nivel';
  if (equipment === 'Pelota de estabilidad') return 'Pelota de estabilidad';
  return 'Peso según nivel';
}

// ─── TRANSLATE TO SPANISH ─────────────────────────────────────────────────────

function translateToSpanish(exName, imageFile, muscle, equipment, category) {
  const n = exName;
  const nl = n.toLowerCase();
  const img = imageFile.toLowerCase();

  // CARDIO
  if (/air[\s-]bike/i.test(n) && img.includes('00031')) return 'Bicicleta de aire';
  if (/air[\s-]bike/i.test(n) && img.includes('(2)')) return 'Bicicleta de aire (variante)';
  if (/air[\s-]bike/i.test(n)) return 'Bicicleta de aire';
  if (/assault bike/i.test(n)) return 'Assault bike';
  if (/hands bike/i.test(n)) return 'Bicicleta de manos';
  if (/bicycle recline walk/i.test(n)) return 'Bicicleta reclinada';
  if (/stationary bike run version 3/i.test(n) && img.includes('(2)')) return 'Bicicleta estática versión 3 (variante)';
  if (/stationary bike run version 3/i.test(n)) return 'Bicicleta estática versión 3';
  if (/stationary bike run version 4/i.test(n) && img.includes('(2)')) return 'Bicicleta estática versión 4 (variante)';
  if (/stationary bike run version 4/i.test(n)) return 'Bicicleta estática versión 4';
  if (/stationary bike/i.test(n)) return 'Bicicleta estática';
  if (/rowing.*machine|rowing with rowing/i.test(n)) return 'Remo en máquina';
  if (/elliptical machine walk/i.test(n)) return 'Caminata en elíptica';
  if (/walk wave machine/i.test(n)) return 'Caminata en máquina Wave';
  if (/walking on incline treadmill/i.test(n)) return 'Caminata en cinta inclinada';
  if (/walking on stepmill/i.test(n)) return 'Caminata en escaladora';
  if (/run equipment/i.test(n) && img.includes('(2)')) return 'Carrera en cinta (variante 2)';
  if (/run equipment/i.test(n) && img.includes('(3)')) return 'Carrera en cinta (variante 3)';
  if (/run equipment/i.test(n) && img.includes('(4)')) return 'Carrera en cinta (variante 4)';
  if (/run equipment/i.test(n)) return 'Carrera en cinta';
  if (/short stride run/i.test(n) && img.includes('(2)')) return 'Carrera paso corto (variante)';
  if (/short stride run/i.test(n)) return 'Carrera paso corto';
  if (/backwards run/i.test(n)) return 'Carrera hacia atrás';
  if (/briskly walking/i.test(n) && img.includes('(2)')) return 'Caminata rápida (variante)';
  if (/briskly walking/i.test(n)) return 'Caminata rápida';
  if (/^run\b/i.test(n) && img.includes('(2)')) return 'Carrera (variante)';
  if (/^run\b/i.test(n)) return 'Carrera';
  if (/duck walk/i.test(n)) return 'Caminata en cuclillas';
  if (/walking high knees lunge/i.test(n)) return 'Zancada con rodillas altas caminando';
  if (/^walking\b/i.test(n) && img.includes('(2)')) return 'Caminata (variante)';
  if (/^walking\b/i.test(n)) return 'Caminata';
  if (/wheel run/i.test(n)) return 'Carrera en rueda';
  if (/quickly trot/i.test(n)) return 'Trote ligero en sitio';
  if (/farmers walk/i.test(n) && img.includes('(2)')) return 'Farmer walk (variante)';
  if (/farmers walk/i.test(n)) return 'Farmer walk';
  if (/jack burpee/i.test(n)) return 'Jumping jack con burpee';
  if (/dumbbell burpee/i.test(n)) return 'Burpee con mancuernas';
  if (/^burpee/i.test(n)) return 'Burpee';
  if (/skater/i.test(n)) return 'Skater lateral';
  if (/zigzag/i.test(n)) return 'Saltos en zigzag';
  if (/butt kicks/i.test(n)) return 'Talones a glúteos';

  // WAIST / CORE
  if (/45.*side bend|side bend.*45/i.test(n)) return 'Flexión lateral a 45°';
  if (/barbell.*side.*bent.*ii/i.test(n) && img.includes('(2)')) return 'Flexión lateral con barra II (variante 2)';
  if (/barbell.*side.*bent.*ii/i.test(n) && img.includes('(3)')) return 'Flexión lateral con barra II (variante 3)';
  if (/barbell.*side.*bent.*ii/i.test(n)) return 'Flexión lateral con barra II';
  if (/barbell.*side.*bend/i.test(n)) return 'Flexión lateral con barra';
  if (/cable.*side.*bend/i.test(n)) return 'Flexión lateral con cable';
  if (/dumbbell.*side.*bend/i.test(n) && img.includes('(2)')) return 'Flexión lateral con mancuerna (variante 2)';
  if (/dumbbell.*side.*bend/i.test(n) && img.includes('(3)')) return 'Flexión lateral con mancuerna (variante 3)';
  if (/dumbbell.*side.*bend/i.test(n)) return 'Flexión lateral con mancuerna';
  if (/band.*side.*bend/i.test(n)) return 'Flexión lateral con banda elástica';
  if (/barbell seated twist/i.test(n)) return 'Giro sentado con barra';
  if (/cable russian twists on stability ball/i.test(n)) return 'Giro ruso con cable en pelota';
  if (/cable.*seated.*crunch/i.test(n) && img.includes('02121')) return 'Crunch sentado con cable';
  if (/cable.*side.*crunch/i.test(n)) return 'Crunch lateral con cable';
  if (/cable.*standing.*crunch/i.test(n)) return 'Crunch de pie con cable';
  if (/cable.*kneeling.*crunch/i.test(n)) return 'Crunch arrodillado con cable';
  if (/cable.*tuck.*reverse.*crunch/i.test(n)) return 'Crunch inverso con rodillas al pecho en cable';
  if (/cable.*reverse.*crunch/i.test(n) && img.includes('(2)')) return 'Crunch inverso con cable (variante)';
  if (/cable.*reverse.*crunch/i.test(n)) return 'Crunch inverso con cable';
  if (/cable judo flip/i.test(n) && img.includes('(2)')) return 'Giro judo con cable (variante)';
  if (/cable judo flip/i.test(n)) return 'Giro judo con cable';
  if (/band.*bicycle.*crunch/i.test(n) && img.includes('(2)')) return 'Crunch bicicleta con banda (variante)';
  if (/band.*bicycle.*crunch/i.test(n)) return 'Crunch bicicleta con banda';
  if (/band.*kneeling.*twisting.*crunch/i.test(n) && img.includes('(2)')) return 'Crunch rotacional arrodillado con banda (variante 2)';
  if (/band.*kneeling.*twisting.*crunch/i.test(n) && img.includes('(3)')) return 'Crunch rotacional arrodillado con banda (variante 3)';
  if (/band.*kneeling.*twisting.*crunch/i.test(n)) return 'Crunch rotacional arrodillado con banda';
  if (/band.*standing.*twisting.*crunch/i.test(n) && img.includes('(2)')) return 'Crunch rotacional de pie con banda (variante)';
  if (/band.*standing.*twisting.*crunch/i.test(n)) return 'Crunch rotacional de pie con banda (giro)';
  if (/band.*standing.*crunch/i.test(n)) return 'Crunch de pie con banda';
  if (/alternate heel touchers/i.test(n)) return 'Toque de talones alterno';
  if (/weighted seated twist on stability ball/i.test(n)) return 'Giro sentado con peso en pelota';
  if (/russian twist.*dumbbell|dumbbell.*russian twist/i.test(n)) return 'Giro ruso con mancuerna';
  if (/weighted russian twist/i.test(n)) return 'Giro ruso con peso';
  if (/russian twist/i.test(n)) return 'Giro ruso';
  if (/cocoons/i.test(n) && img.includes('(2)')) return 'Cocoons abdominales (variante)';
  if (/cocoons/i.test(n)) return 'Cocoons abdominales';
  if (/cross body crunch|cross-body crunch/i.test(n) && img.includes('(2)')) return 'Crunch cruzado (variante)';
  if (/cross body crunch|cross-body crunch/i.test(n)) return 'Crunch cruzado';
  if (/crunch on stability ball/i.test(n) && img.includes('(2)')) return 'Crunch en pelota de estabilidad (variante)';
  if (/crunch on stability ball/i.test(n)) return 'Crunch en pelota de estabilidad';
  if (/elbow to knee sit.?up/i.test(n)) return 'Abdominales codo a rodilla';
  if (/elbow to knee side plank crunch/i.test(n) && img.includes('(2)')) return 'Plancha lateral codo a rodilla (variante)';
  if (/elbow to knee side plank crunch/i.test(n)) return 'Plancha lateral codo a rodilla';
  if (/lying elbow to knee/i.test(n)) return 'Codo a rodilla tumbado';
  if (/elbow.?to.?knee twists/i.test(n)) return 'Giros codo a rodilla';
  if (/^elbow to knee/i.test(n) && img.includes('(2)')) return 'Codo a rodilla (variante)';
  if (/^elbow to knee/i.test(n)) return 'Codo a rodilla';
  if (/oblique crunches floor/i.test(n)) return 'Crunch oblicuo en suelo';
  if (/oblique crunch version 2/i.test(n)) return 'Crunch oblicuo versión 2';
  if (/incline twisting sit.?up version 2/i.test(n)) return 'Abdominales inclinados con giro versión 2';
  if (/incline leg hip raise leg straight/i.test(n) && img.includes('(2)')) return 'Elevación de cadera con piernas rectas inclinada (variante)';
  if (/incline leg hip raise leg straight/i.test(n)) return 'Elevación de cadera con piernas rectas inclinada';
  if (/lever seated crunch chest pad/i.test(n)) return 'Crunch sentado con almohadilla en máquina';
  if (/lever seated crunch/i.test(n) && img.includes('14521')) return 'Crunch sentado en máquina';
  if (/lever lying crunch/i.test(n)) return 'Crunch tumbado en máquina';
  if (/lever total abdominal crunch/i.test(n) && img.includes('(2)')) return 'Crunch abdominal total en máquina (variante)';
  if (/lever total abdominal crunch/i.test(n)) return 'Crunch abdominal total en máquina';
  if (/lever lying leg raise bent knee/i.test(n) && img.includes('(2)')) return 'Elevación de piernas flexionadas en máquina (variante)';
  if (/lever lying leg raise bent knee/i.test(n)) return 'Elevación de piernas flexionadas en máquina';
  if (/extra decline sit.?up/i.test(n)) return 'Abdominales en banco declinado extra';
  if (/roman chair sit.?up/i.test(n) && img.includes('(2)')) return 'Abdominales en silla romana (variante)';
  if (/roman chair sit.?up/i.test(n)) return 'Abdominales en silla romana';
  if (/sit.?up with arms on chest/i.test(n)) return 'Abdominales con brazos cruzados';
  if (/seated leg raise/i.test(n) && img.includes('(2)')) return 'Elevación de piernas sentado (variante)';
  if (/seated leg raise/i.test(n)) return 'Elevación de piernas sentado';
  if (/seated in out leg raise on floor/i.test(n) && img.includes('(2)')) return 'Elevación piernas dentro-fuera sentado (variante 2)';
  if (/seated in out leg raise on floor/i.test(n) && img.includes('(3)')) return 'Elevación piernas dentro-fuera sentado (variante 3)';
  if (/seated in out leg raise on floor/i.test(n) && img.includes('(4)')) return 'Elevación piernas dentro-fuera sentado (variante 4)';
  if (/seated in out leg raise on floor/i.test(n)) return 'Elevación piernas dentro-fuera sentado';
  if (/crunchy frog on floor/i.test(n) && img.includes('(2)')) return 'Crunchy frog en suelo (variante)';
  if (/crunchy frog on floor/i.test(n)) return 'Crunchy frog en suelo';
  if (/bench reverse crunch circle/i.test(n)) return 'Crunch inverso circular en banco';
  if (/reverse crunch kick/i.test(n) && img.includes('(2)')) return 'Crunch inverso con patada (variante)';
  if (/reverse crunch kick/i.test(n)) return 'Crunch inverso con patada';
  if (/crunch single leg lift/i.test(n) && img.includes('(2)')) return 'Crunch con elevación de pierna (variante)';
  if (/crunch single leg lift/i.test(n)) return 'Crunch con elevación de pierna';
  if (/crunch hold/i.test(n)) return 'Crunch isométrico';
  if (/pull.?in on stability ball/i.test(n)) return 'Encogimiento de piernas en pelota';
  if (/side bridge ii/i.test(n)) return 'Plancha lateral versión II';
  if (/side hip on parallel bars/i.test(n)) return 'Elevación lateral de cadera en barras paralelas';
  if (/smith hip raise/i.test(n) && img.includes('(2)')) return 'Elevación de cadera en máquina Smith (variante 2)';
  if (/smith hip raise/i.test(n) && img.includes('(3)')) return 'Elevación de cadera en máquina Smith (variante 3)';
  if (/smith hip raise/i.test(n) && img.includes('(4)')) return 'Elevación de cadera en máquina Smith (variante 4)';
  if (/smith hip raise/i.test(n)) return 'Elevación de cadera en máquina Smith';
  if (/lying leg hip side raise on floor/i.test(n) && img.includes('(2)')) return 'Elevación lateral de cadera y pierna tumbado (variante)';
  if (/lying leg hip side raise on floor/i.test(n)) return 'Elevación lateral de cadera y pierna tumbado';
  if (/bent over twist/i.test(n) && img.includes('(2)')) return 'Giro inclinado (variante 2)';
  if (/bent over twist/i.test(n) && img.includes('(3)')) return 'Giro inclinado (variante 3)';
  if (/bent over twist/i.test(n) && img.includes('(4)')) return 'Giro inclinado (variante 4)';
  if (/bent over twist/i.test(n)) return 'Giro inclinado';
  if (/dumbbell v.?up/i.test(n) && img.includes('(2)')) return 'V-Up con mancuerna (variante)';
  if (/dumbbell v.?up/i.test(n)) return 'V-Up con mancuerna';
  if (/bottoms up/i.test(n) && img.includes('(2)')) return 'Bottoms-up abdominal (variante)';
  if (/bottoms up/i.test(n)) return 'Bottoms-up abdominal';

  // CHEST
  if (/barbell bench press/i.test(n)) return 'Press de banca con barra';
  if (/barbell decline wide.?grip press/i.test(n)) return 'Press declinado agarre ancho con barra';
  if (/barbell incline reverse.?grip press/i.test(n)) return 'Press inclinado agarre inverso con barra';
  if (/barbell incline bench press/i.test(n)) return 'Press de banca inclinado con barra';
  if (/barbell incline row/i.test(n)) return 'Remo inclinado con barra';
  if (/cable middle fly/i.test(n)) return 'Apertura con cable al medio pecho';
  if (/cable standing fly/i.test(n)) return 'Apertura con cable de pie';
  if (/cable one arm decline chest fly/i.test(n)) return 'Apertura declinada un brazo con cable';
  if (/cable standing up straight crossovers/i.test(n)) return 'Cruce de cables de pie recto';
  if (/cable upper chest crossovers/i.test(n)) return 'Cruce de cables pecho superior';
  if (/lever pec deck fly/i.test(n)) return 'Apertura en pec-deck';
  if (/lever seated fly/i.test(n)) return 'Apertura sentada en máquina';
  if (/lever crossovers/i.test(n)) return 'Cruce en máquina';
  if (/dumbbell decline twist fly/i.test(n)) return 'Apertura declinada con giro con mancuernas';
  if (/dumbbell decline fly/i.test(n)) return 'Apertura declinada con mancuernas';
  if (/dumbbell incline fly/i.test(n)) return 'Apertura inclinada con mancuernas';
  if (/dumbbell fly/i.test(n)) return 'Apertura plana con mancuernas';
  if (/landmine floor one arm chest fly/i.test(n)) return 'Apertura de pecho un brazo con landmine';
  if (/band high fly/i.test(n)) return 'Apertura alta con banda elástica';
  if (/barbell close.?grip bench press/i.test(n)) return 'Press de banca agarre cerrado con barra';

  // BACK
  if (/barbell bent.?over row/i.test(n)) return 'Remo con barra inclinado';
  if (/barbell decline bent.?arm pullover/i.test(n)) return 'Pull-over declinado con barra';
  if (/barbell decline wide.?grip pullover/i.test(n)) return 'Pull-over declinado agarre ancho con barra';
  if (/alternate lateral pulldown/i.test(n)) return 'Jalón al pecho alterno';
  if (/exercise ball alternating arm ups/i.test(n)) return 'Elevaciones alternas de brazo en pelota';

  // SHOULDERS
  if (/lever seated reverse fly parallel grip/i.test(n)) return 'Apertura posterior sentada agarre paralelo en máquina';
  if (/lever seated reverse fly/i.test(n)) return 'Apertura posterior sentada en máquina';
  if (/lever side hip abduction/i.test(n)) return 'Abducción lateral de cadera en máquina';
  if (/lever side hip adduction/i.test(n)) return 'Aducción lateral de cadera en máquina';
  if (/lever seated hip abduction/i.test(n) || img.includes('05971')) return 'Abducción de cadera sentada en máquina';
  if (/lever seated hip adduction/i.test(n) || img.includes('05981')) return 'Aducción de cadera sentada en máquina';
  if (/cable hip adduction/i.test(n) && img.includes('01681')) return 'Aducción de cadera con cable';
  if (/cable hip abduction version 2/i.test(n) && img.includes('(2)')) return 'Abducción de cadera con cable v2 (variante 2)';
  if (/cable hip abduction version 2/i.test(n) && img.includes('(3)')) return 'Abducción de cadera con cable v2 (variante 3)';
  if (/cable hip abduction version 2/i.test(n)) return 'Abducción de cadera con cable versión 2';

  // BICEPS
  if (/barbell alternate biceps curl/i.test(n)) return 'Curl de bíceps alterno con barra';
  if (/barbell standing close.?grip curl/i.test(n) && !(/ez/i.test(n))) return 'Curl de pie agarre cerrado con barra';
  if (/barbell standing wide.?grip biceps curl/i.test(n) && !(/ez/i.test(n))) return 'Curl de pie agarre ancho con barra';
  if (/barbell seated close.?grip concentration curl/i.test(n)) return 'Curl concentrado sentado agarre cerrado con barra';
  if (/barbell standing concentration curl/i.test(n)) return 'Curl concentrado de pie con barra';
  if (/barbell lying preacher curl/i.test(n)) return 'Curl predicador tumbado con barra';
  if (/barbell drag curl/i.test(n)) return 'Curl drag con barra';
  if (/barbell standing reverse.?grip curl/i.test(n)) return 'Curl de pie agarre inverso con barra';
  if (/^barbell curl/i.test(n)) return 'Curl de bíceps con barra';
  if (/barbell wrist curl ii/i.test(n)) return 'Curl de muñeca con barra II';
  if (/brachialis narrow pull.?ups/i.test(n)) return 'Dominadas estrechas para braquial';
  if (/cable one arm biceps curl version 2/i.test(n)) return 'Curl de bíceps un brazo con cable versión 2';
  if (/cable one arm biceps curl/i.test(n)) return 'Curl de bíceps un brazo con cable';
  if (/cable one.?arm curl/i.test(n) && img.includes('01901')) return 'Curl un brazo con cable';
  if (/cable reverse grip biceps curl sz.?bar/i.test(n)) return 'Curl de bíceps agarre inverso barra SZ en cable';
  if (/cable one arm preacher curl/i.test(n)) return 'Curl predicador un brazo con cable';
  if (/cable one arm reverse preacher curl/i.test(n)) return 'Curl predicador inverso un brazo con cable';
  if (/cable rope hammer preacher curl/i.test(n) && /one arm|one-arm/i.test(n)) return 'Curl predicador martillo con cuerda un brazo en cable';
  if (/cable rope hammer preacher curl/i.test(n)) return 'Curl predicador martillo con cuerda en cable';
  if (/cable preacher curl/i.test(n)) return 'Curl predicador con cable';
  if (/cable concentration curl/i.test(n)) return 'Curl concentrado con cable';
  if (/cable seated one arm concentration curl/i.test(n)) return 'Curl concentrado un brazo sentado con cable';
  if (/cable seated floor one arm concentration curl/i.test(n)) return 'Curl concentrado un brazo en suelo con cable';
  if (/cable squatting curl/i.test(n)) return 'Curl en cuclillas con cable';
  if (/cable reverse preacher curl/i.test(n)) return 'Curl predicador inverso con cable';
  if (/dumbbell alternate biceps curl/i.test(n)) return 'Curl de bíceps alterno con mancuernas';
  if (/dumbbell concentration curl/i.test(n) && !/standing/i.test(n)) return 'Curl concentrado con mancuerna';
  if (/dumbbell cross body hammer curl version 2/i.test(n)) return 'Curl martillo cruzado con mancuerna versión 2';
  if (/dumbbell cross body hammer curl/i.test(n) && img.includes('02981')) return 'Curl martillo cruzado con mancuerna';
  if (/dumbbell preacher curl/i.test(n)) return 'Curl predicador con mancuerna';
  if (/dumbbell seated revers.?grip concentration curl/i.test(n)) return 'Curl concentrado sentado agarre inverso con mancuerna';
  if (/dumbbell standing concentration curl/i.test(n) && img.includes('(2)')) return 'Curl concentrado de pie con mancuerna (variante)';
  if (/dumbbell standing concentration curl/i.test(n)) return 'Curl concentrado de pie con mancuerna';
  if (/dumbbell standing one arm reverse curl/i.test(n)) return 'Curl inverso un brazo de pie con mancuerna';
  if (/dumbbell one arm standing hammer curl/i.test(n)) return 'Curl martillo un brazo de pie con mancuerna';
  if (/dumbbell one arm standing curl/i.test(n)) return 'Curl de bíceps un brazo de pie con mancuerna';
  if (/dumbbell one arm hammer preacher curl/i.test(n)) return 'Curl predicador martillo un brazo con mancuerna';
  if (/ez.?barbell close.?grip curl/i.test(n) && img.includes('-1')) return 'Curl agarre cerrado con barra EZ (versión 1)';
  if (/ez.?barbell close.?grip curl/i.test(n)) return 'Curl agarre cerrado con barra EZ';
  if (/ez.?barbell reverse.?grip curl/i.test(n)) return 'Curl agarre inverso con barra EZ';
  if (/ez.?barbell reverse.?grip preacher curl/i.test(n) && img.includes('(2)')) return 'Curl predicador agarre inverso con barra EZ (variante)';
  if (/ez.?barbell reverse.?grip preacher curl/i.test(n)) return 'Curl predicador agarre inverso con barra EZ';
  if (/ez.?barbell spider curl/i.test(n) && img.includes('16281')) return 'Curl araña con barra EZ versión 2';
  if (/ez.?barbell spider curl/i.test(n)) return 'Curl araña con barra EZ';
  if (/ez.?barbell close.?grip preacher curl/i.test(n)) return 'Curl predicador agarre cerrado con barra EZ';
  if (/ez.?barbell standing wide.?grip biceps curl/i.test(n)) return 'Curl de pie agarre ancho con barra EZ';
  if (/ez.?bar seated close.?grip concentration curl/i.test(n)) return 'Curl concentrado sentado agarre cerrado con barra EZ';
  if (/lever alternate biceps curl/i.test(n)) return 'Curl de bíceps alterno en máquina';
  if (/lever biceps? curl/i.test(n)) return 'Curl de bíceps en máquina';
  if (/lever hammer grip preacher curl/i.test(n)) return 'Curl predicador agarre martillo en máquina';
  if (/lever reverse grip preacher curl/i.test(n) && img.includes('(2)')) return 'Curl predicador agarre inverso en máquina (variante)';
  if (/lever reverse grip preacher curl/i.test(n)) return 'Curl predicador agarre inverso en máquina';
  if (/band alternating biceps curl/i.test(n)) return 'Curl de bíceps alterno con banda';
  if (/band one arm overhead biceps curl/i.test(n)) return 'Curl de bíceps un brazo sobre cabeza con banda';
  if (/olympic barbell hammer curl/i.test(n) && img.includes('(2)')) return 'Curl martillo con barra olímpica (variante)';
  if (/olympic barbell hammer curl/i.test(n)) return 'Curl martillo con barra olímpica';
  if (/biceps curl with bed sheet/i.test(n)) return 'Curl de bíceps con sábana';
  if (/bodyweight side lying biceps curl/i.test(n) && img.includes('(2)')) return 'Curl de bíceps de lado peso corporal (variante)';
  if (/bodyweight side lying biceps curl/i.test(n)) return 'Curl de bíceps de lado peso corporal';
  if (/barbell standing reverse.?grip curl/i.test(n)) return 'Curl de pie agarre inverso con barra';

  // TRICEPS
  if (/barbell lying close.?grip triceps extension/i.test(n)) return 'Extensión de tríceps agarre cerrado tumbado con barra';
  if (/barbell lying triceps extension skull crusher/i.test(n)) return 'Skull crusher con barra';

  // FOREARMS
  if (/cable hammer curl with rope/i.test(n)) return 'Curl martillo con cuerda en cable';
  if (/cable one arm wrist curl/i.test(n)) return 'Curl de muñeca un brazo con cable';
  if (/cable reverse wrist curl/i.test(n) && img.includes('(2)')) return 'Curl de muñeca inverso con cable (variante)';
  if (/cable reverse wrist curl/i.test(n)) return 'Curl de muñeca inverso con cable';
  if (/cable reverse one arm curl/i.test(n)) return 'Curl inverso un brazo con cable';
  if (/cable standing pulldown with rope/i.test(n) && img.includes('(2)')) return 'Jalón de pie con cuerda en cable (variante)';
  if (/cable standing pulldown with rope/i.test(n)) return 'Jalón de pie con cuerda en cable';
  if (/cable wrist curl/i.test(n) && img.includes('(2)')) return 'Curl de muñeca con cable (variante 2)';
  if (/cable wrist curl/i.test(n) && img.includes('(3)')) return 'Curl de muñeca con cable (variante 3)';
  if (/cable wrist curl/i.test(n) && img.includes('(4)')) return 'Curl de muñeca con cable (variante 4)';
  if (/cable wrist curl/i.test(n)) return 'Curl de muñeca con cable';
  if (/dumbbell cross body hammer curl/i.test(n) && img.includes('02981')) return 'Curl martillo cruzado con mancuerna';
  if (/dumbbell one.?arm revers.? wrist curl/i.test(n)) return 'Curl de muñeca inverso un brazo con mancuerna';
  if (/dumbbell one.?arm wrist curl/i.test(n) && img.includes('(2)')) return 'Curl de muñeca un brazo con mancuerna (variante)';
  if (/dumbbell one.?arm wrist curl/i.test(n)) return 'Curl de muñeca un brazo con mancuerna';
  if (/dumbbell one arm reverse preacher curl/i.test(n)) return 'Curl predicador inverso un brazo con mancuerna';
  if (/dumbbell one arm seated neutral wrist curl/i.test(n)) return 'Curl de muñeca neutro sentado un brazo con mancuerna';
  if (/barbell reverse curl/i.test(n) && !img.includes('preacher')) return 'Curl inverso con barra';
  if (/barbell reverse preacher curl/i.test(n) && img.includes('(2)')) return 'Curl predicador inverso con barra (variante)';
  if (/barbell reverse preacher curl/i.test(n)) return 'Curl predicador inverso con barra';
  if (/barbell revers.? wrist curl ii/i.test(n)) return 'Curl de muñeca inverso con barra II';
  if (/dumbbell standing one arm reverse curl/i.test(n)) return 'Curl inverso un brazo de pie con mancuerna';
  if (/finger curls/i.test(n)) return 'Curl de dedos';
  if (/band reverse wrist curl/i.test(n)) return 'Curl de muñeca inverso con banda';
  if (/band wrist curl/i.test(n)) return 'Curl de muñeca con banda';

  // LEGS (specific dumbbell squat rules handled further below)
  // if (/dumbbell squat/i.test(n)) return 'Sentadilla con mancuernas'; // moved below
  if (/barbell full squat/i.test(n)) return 'Sentadilla completa con barra';
  if (/barbell bench squat/i.test(n)) return 'Sentadilla en banco con barra';
  if (/barbell narrow stance squat/i.test(n)) return 'Sentadilla estancia cerrada con barra';
  if (/barbell jump squat/i.test(n)) return 'Sentadilla con salto con barra';
  if (/barbell front raise/i.test(n)) return 'Elevación frontal con barra';

  // ─── EXTENDED SPECIFIC RULES ────────────────────────────────────────────────

  // BACK - rows
  if (/barbell upright row ii/i.test(n)) return 'Remo al mentón con barra II';
  if (/barbell upright row/i.test(n)) return 'Remo al mentón con barra';
  if (/barbell wide bench press/i.test(n)) return 'Press de banca ancho con barra';
  if (/barbell wide squat/i.test(n)) return 'Sentadilla ancha con barra';
  if (/barbell split squat/i.test(n)) return 'Sentadilla dividida con barra';
  if (/barbell reverse grip incline bench row/i.test(n)) return 'Remo inclinado agarre inverso en banco con barra';
  if (/barbell behind the back shrug/i.test(n)) return 'Encogimiento de hombros tras la espalda con barra';
  if (/barbell standing wide military press/i.test(n)) return 'Press militar ancho de pie con barra';
  if (/barbell glute bridge two legs on bench/i.test(n)) return 'Puente de glúteo dos piernas en banco con barra';

  // CABLE - back/rows
  if (/cable lateral pulldown with rope attachment/i.test(n)) return 'Jalón al pecho lateral con cuerda en cable';
  if (/cable pulldown bicep curl/i.test(n)) return 'Jalón y curl en cable';
  if (/cable pulldown pro.?lat/i.test(n)) return 'Jalón en cable con barra pro-lat';
  if (/^cable pulldown/i.test(n) && img.includes('01981')) return 'Jalón en cable (versión básica)';
  if (/^cable pulldown/i.test(n)) return 'Jalón en cable';
  if (/cable seated high row v.?bar/i.test(n)) return 'Remo sentado alto con barra V en cable';
  if (/cable straight arm pulldown/i.test(n)) return 'Jalón de brazos rectos con cable';
  if (/cable seated row bent.?bar/i.test(n)) return 'Remo sentado con barra curvada en cable';
  if (/cable seated row with v.?bar/i.test(n)) return 'Remo sentado con barra V en cable';
  if (/cable rope crossover seated row/i.test(n)) return 'Remo sentado con cruce de cuerda en cable';
  if (/cable rope extension incline bench row/i.test(n)) return 'Remo inclinado con extensión de cuerda en cable';
  if (/cable lateral pulldown with v.?bar/i.test(n)) return 'Jalón al pecho lateral con barra V en cable';
  if (/cable parallel grip lat pulldown on floor/i.test(n)) return 'Jalón al pecho agarre paralelo en suelo con cable';
  if (/cable bent.?over one arm lateral raise/i.test(n)) return 'Elevación lateral un brazo inclinado con cable';
  if (/cable forward lunge/i.test(n)) return 'Zancada frontal con cable';
  if (/cable seated.*row/i.test(n) && img.includes('08611')) return 'Remo sentado en polea baja';
  if (/cable incline bench row/i.test(n)) return 'Remo inclinado en banco con cable';
  if (/cable bent.?over row/i.test(n) && img.includes('38591')) return 'Remo inclinado con cable';

  // CABLE - waist/core
  if (/cable tuck reverse crunch/i.test(n)) return 'Crunch inverso con rodillas al pecho con cable';
  if (/cable reverse crunch/i.test(n) && img.includes('08731')) return 'Crunch inverso con cable (versión 2)';

  // DUMBBELL - back/rows
  if (/dumbbell bent.?over row.*\bback\b/i.test(n)) return 'Remo inclinado con mancuernas (espalda alta)';
  if (/dumbbell bent.?over row/i.test(n) && img.includes('02931')) return 'Remo inclinado con mancuernas';
  if (/dumbbell incline row/i.test(n) && img.includes('03271')) return 'Remo inclinado en banco con mancuernas';
  if (/dumbbell palm rotational bent.?over row/i.test(n)) return 'Remo inclinado con rotación palmar con mancuernas';

  // DUMBBELL - shoulders
  if (/dumbbell front raise ii/i.test(n)) return 'Elevación frontal con mancuernas II';
  if (/dumbbell front raise/i.test(n) && img.includes('03101')) return 'Elevación frontal con mancuernas';
  if (/dumbbell full can lateral raise/i.test(n)) return 'Elevación lateral "lata llena" con mancuernas';
  if (/dumbbell lateral raise/i.test(n)) return 'Elevación lateral con mancuernas';
  if (/dumbbell rotation reverse fly/i.test(n)) return 'Apertura posterior con rotación con mancuernas';
  if (/dumbbell arnold press ii/i.test(n)) return 'Press Arnold II con mancuernas';
  if (/dumbbell arnold press/i.test(n)) return 'Press Arnold con mancuernas';
  if (/dumbbell scott press/i.test(n)) return 'Press Scott con mancuernas';
  if (/dumbbell w.?press/i.test(n)) return 'Press en W con mancuernas';
  if (/dumbbell incline y.?raise/i.test(n)) return 'Elevación en Y inclinado con mancuernas';
  if (/dumbbell incline t.?raise/i.test(n)) return 'Elevación en T inclinado con mancuernas';
  if (/dumbbell incline two front raise with chest support/i.test(n)) return 'Elevación frontal doble inclinado con soporte con mancuernas';
  if (/dumbbell incline front raise with chest support/i.test(n)) return 'Elevación frontal inclinado con soporte con mancuernas';

  // DUMBBELL - triceps
  if (/dumbbell lying one arm supinated triceps extension/i.test(n)) return 'Extensión de tríceps un brazo tumbado agarre supino con mancuerna';
  if (/dumbbell tate press/i.test(n)) return 'Tate press con mancuernas';
  if (/dumbbell twisting bench press/i.test(n)) return 'Press de banca con giro con mancuernas';

  // DUMBBELL - chest
  if (/dumbbell pullover/i.test(n) && img.includes('03751')) return 'Pull-over plano con mancuerna';
  if (/dumbbell straight.?arm pullover/i.test(n)) return 'Pull-over brazos rectos con mancuerna';
  if (/dumbbell squeeze bench press/i.test(n)) return 'Press de banca con apretón con mancuernas';

  // DUMBBELL - legs/squats
  if (/dumbbell bench squat/i.test(n)) return 'Sentadilla en banco con mancuernas';
  if (/dumbbell plyo squat/i.test(n)) return 'Sentadilla pliométrica con mancuernas';
  if (/dumbbell jumping squat/i.test(n)) return 'Sentadilla con salto con mancuernas';
  if (/dumbbell goblet squat/i.test(n) || /dumbbell gobelt squat/i.test(n)) return 'Sentadilla goblet con mancuerna';
  if (/dumbbell wall squat/i.test(n)) return 'Sentadilla en pared con mancuernas';
  if (/dumbbell supported squat/i.test(n)) return 'Sentadilla asistida con mancuernas';
  if (/dumbbell squat/i.test(n) && img.includes('04131')) return 'Sentadilla con mancuernas (énfasis cadera)';
  if (/dumbbell squat/i.test(n) && img.includes('15551')) return 'Sentadilla con mancuernas (énfasis cuádriceps)';
  if (/dumbbell side lunge/i.test(n)) return 'Zancada lateral con mancuernas';
  if (/dumbbell gobelt curtsey lunge/i.test(n)) return 'Zancada cruzada goblet con mancuerna';

  // DUMBBELL - biceps
  if (/dumbbell lying wide curl/i.test(n)) return 'Curl tumbado agarre ancho con mancuernas';

  // DUMBBELL - core/cardio
  if (/dumbbell side bridge/i.test(n)) return 'Plancha lateral con mancuerna';

  // MACHINE / LEVER
  if (/lever triceps extension/i.test(n) && img.includes('06071')) return 'Extensión de tríceps en máquina I';
  if (/lever seated row plate.?loaded/i.test(n)) return 'Remo sentado en máquina con platos';
  if (/lever chest press version/i.test(n)) return 'Press de pecho en máquina versión 4';
  if (/lever triceps extension/i.test(n) && img.includes('10331')) return 'Extensión de tríceps en máquina';
  if (/lever triceps dip plate.?loaded/i.test(n)) return 'Fondos de tríceps en máquina con platos';
  if (/lever gripless shrug version/i.test(n)) return 'Encogimiento sin agarre en máquina versión 2';

  // CABLE - triceps extensions
  if (/cable rope high pulley overhead tricep extension/i.test(n)) return 'Extensión de tríceps sobre cabeza con polea alta con cuerda';
  if (/cable rope lying on floor tricep extension/i.test(n)) return 'Extensión de tríceps tumbado en suelo con cuerda en cable';
  if (/cable kneeling triceps extension version 2/i.test(n)) return 'Extensión de tríceps arrodillado con cable versión 2';

  // CABLE - misc
  if (/cable lying biceps curl version 2/i.test(n)) return 'Curl de bíceps tumbado con cable versión 2';
  if (/cable curl with multipurpose v.?bar/i.test(n)) return 'Curl con barra V multiusos en cable';

  // BODYWEIGHT / CALISTHENICS
  if (/handstand push.?up/i.test(n)) return 'Flexión en pino (handstand push-up)';
  if (/inverted row with straps/i.test(n)) return 'Remo invertido con correas';
  if (/inverted row with bed sheet/i.test(n)) return 'Remo invertido con sábana';
  if (/suspender.*inverted row/i.test(n)) return 'Remo invertido con suspensor';
  if (/inverted row ii/i.test(n)) return 'Remo invertido II';
  if (/^inverted row/i.test(n) && img.includes('04991')) return 'Remo invertido';
  if (/^inverted row/i.test(n)) return 'Remo invertido';
  if (/janda sit.?up/i.test(n)) return 'Abdominales Janda';
  if (/push.?up.?m/i.test(n) && img.includes('06621')) return 'Flexión de pecho';
  if (/clap push.?up/i.test(n)) return 'Flexión con palmada (pliométrica)';
  if (/plyo push.?up/i.test(n)) return 'Flexión pliométrica';
  if (/wide hand push.?up/i.test(n)) return 'Flexión con manos anchas';
  if (/pike push.?up on bench/i.test(n)) return 'Flexión en pica en banco versión 2';
  if (/pike push.?up between benches/i.test(n)) return 'Flexión en pica entre bancos';
  if (/push.?up on forearms/i.test(n)) return 'Flexión sobre antebrazos';
  if (/push.?up with push.?up handles/i.test(n)) return 'Flexión con agarres elevados';
  if (/archer push.?up/i.test(n)) return 'Flexión arquero';
  if (/twist push.?up/i.test(n)) return 'Flexión con giro';
  if (/cross arms push.?up/i.test(n)) return 'Flexión con brazos cruzados';
  if (/elbow lift reverse push.?up/i.test(n)) return 'Flexión inversa con elevación de codo';
  if (/reverse push.?up/i.test(n) && img.includes('37511')) return 'Flexión inversa (variante)';
  if (/reverse push.?up/i.test(n)) return 'Flexión inversa';
  if (/chin.?up around the bar/i.test(n)) return 'Dominadas supinas alrededor de la barra';
  if (/shoulder grip pull.?up/i.test(n)) return 'Dominadas agarre por hombros';
  if (/wide grip pull.?up on dip cage/i.test(n)) return 'Dominadas agarre ancho en jaula';
  if (/weighted one hand pull.?up/i.test(n)) return 'Dominadas un brazo con peso';
  if (/archer pull.?up/i.test(n)) return 'Dominadas arquero';
  if (/mixed grip chin.?up/i.test(n)) return 'Dominadas supinas agarre mixto';
  if (/chin.?up around the bar/i.test(n)) return 'Dominadas supinas alrededor de la barra';
  if (/chin.?up/i.test(n) && img.includes('13261')) return 'Dominadas supinas';
  if (/triceps dip bench leg/i.test(n)) return 'Fondos de tríceps en banco con piernas';
  if (/^triceps dip/i.test(n)) return 'Fondos de tríceps';
  if (/bench dip on floor/i.test(n)) return 'Fondos de tríceps en suelo';
  if (/korean dips/i.test(n)) return 'Fondos coreanos';
  if (/impossible dips/i.test(n)) return 'Fondos imposibles';
  if (/chest dip on straight bar/i.test(n)) return 'Fondos de pecho en barra recta';
  if (/scapula dips/i.test(n)) return 'Fondos escapulares';
  if (/triceps press/i.test(n) && img.includes('08161')) return 'Press de tríceps';
  if (/band push sit.?up/i.test(n)) return 'Abdominales push con banda';
  if (/band standing twisting crunch/i.test(n) && img.includes('(2)')) return 'Crunch rotacional de pie con banda (variante)';
  if (/band behind neck shoulder press/i.test(n)) return 'Press sobre cabeza tras nuca con banda';

  // CALF
  if (/sled forward angled calf raise/i.test(n)) return 'Elevación de talones en trineo inclinado';
  if (/hack calf raise/i.test(n)) return 'Elevación de talones hack';

  // WEIGHTED SPECIALTY
  if (/weighted svend press/i.test(n)) return 'Svend press con peso';
  if (/smith hex press/i.test(n)) return 'Hex press en máquina Smith';
  if (/^russian twist/i.test(n)) return 'Giro ruso';
  if (/weighted russian twist/i.test(n) && img.includes('23711')) return 'Giro ruso con peso';

  // WAIST SPECIALTY
  if (/hanging leg hip raise/i.test(n)) return 'Elevación de cadera colgado';
  if (/hanging straight leg raise/i.test(n)) return 'Elevación de piernas rectas colgado';
  if (/hanging scapular shrug/i.test(n)) return 'Encogimiento escapular colgado';
  if (/twisted leg raise/i.test(n)) return 'Elevación de piernas con giro';
  if (/hanging pike/i.test(n)) return 'Pica colgado';
  if (/leg pull.?in flat bench/i.test(n)) return 'Encogimiento de piernas en banco plano';

  // CARDIO
  if (/elbow.?to.?knee twists/i.test(n)) return 'Giros codo a rodilla cardio';
  if (/high knee squat/i.test(n)) return 'Sentadilla con rodillas altas';
  if (/high knee run/i.test(n)) return 'Carrera con rodillas altas';
  if (/high knee against wall/i.test(n)) return 'Rodillas altas contra la pared';
  if (/high knee jump rope/i.test(n)) return 'Saltar la cuerda con rodillas altas';
  if (/high jump rope/i.test(n)) return 'Saltar la cuerda (salto alto)';
  if (/side to side jump rope/i.test(n)) return 'Saltar la cuerda de lado a lado';
  if (/skip jump rope/i.test(n)) return 'Saltar la cuerda skipping';
  if (/high knee sprints/i.test(n)) return 'Sprints con rodillas altas';
  if (/squat tuck jump/i.test(n)) return 'Sentadilla con salto de rodillas';

  // LEGS SPECIALTY
  if (/sled wide hack squat/i.test(n)) return 'Hack sentadilla ancha en trineo';
  if (/stepdown squat/i.test(n)) return 'Sentadilla step-down';
  if (/assisted pistol squat/i.test(n)) return 'Sentadilla pistola asistida';
  if (/hyperextension version 2/i.test(n)) return 'Hiperextensión versión 2';

  // EZ BAR
  if (/ez.?barbell spider curl/i.test(n) && img.includes('16281')) return 'Curl araña con barra EZ versión 2';
  if (/ez.?barbell standing wide.?grip biceps curl/i.test(n) && img.includes('27411')) return 'Curl de pie agarre ancho con barra EZ versión 2';

  // ─── SPECIFIC EXERCISES (fallthrough from main rules) ───────────────────────

  // GLUTES / HIPS
  if (/barbell rack.?pull/i.test(n)) return 'Rack pull con barra';
  if (/barbell skier/i.test(n)) return 'Movimiento esquiador con barra';
  if (/hanging.*straight.*leg.*raise|hanging.*pike/i.test(n)) return 'Elevación de piernas rectas colgado';
  if (/hanging pike/i.test(n)) return 'Pica colgado';
  if (/cable.*kneeling.*pull.?through|kneeling.*cable.*pull.?through/i.test(n)) return 'Pull-through arrodillado con cable';
  if (/cable pull.?through/i.test(n) && /kneeling/i.test(n)) return 'Pull-through arrodillado con cable';
  if (/cable pull.?through/i.test(n)) return 'Pull-through con cable';
  if (/dumbbell sumo pull.?through/i.test(n)) return 'Pull-through sumo con mancuernas';
  if (/dumbbell side bridge/i.test(n)) return 'Plancha lateral con mancuerna';
  if (/lever standing rear kick/i.test(n)) return 'Patada trasera de pie en máquina';
  if (/band lying hip external rotation/i.test(n)) return 'Rotación externa de cadera tumbado con banda';
  if (/band lying hip internal rotatio/i.test(n)) return 'Rotación interna de cadera tumbado con banda';
  if (/band seated hip external rotation/i.test(n)) return 'Rotación externa de cadera sentado con banda';
  if (/band seated hip internal rotation/i.test(n)) return 'Rotación interna de cadera sentado con banda';

  // NECK
  if (/weighted lying side lifting head/i.test(n)) return 'Elevación lateral de cabeza con arnés tumbado';
  if (/weighted seated neck extension/i.test(n) && /head.?harness/i.test(n)) return 'Extensión de cuello sentado con arnés';
  if (/weighted lying neck extension/i.test(n)) return 'Extensión de cuello tumbado con peso';
  if (/weighted lying neck flexion/i.test(n)) return 'Flexión de cuello tumbado con peso';
  if (/lever neck extension/i.test(n) && /plate.?loaded/i.test(n)) return 'Extensión de cuello en máquina con plato';
  if (/lever neck.*side flexion.*plate.?loaded/i.test(n)) return 'Flexión lateral de cuello en máquina con plato';
  if (/cable seated neck extension/i.test(n) && /head.?harness/i.test(n)) return 'Extensión de cuello sentado con cable y arnés';
  if (/cable seated neck flexion/i.test(n) && /head.?harness/i.test(n)) return 'Flexión de cuello sentado con cable y arnés';

  // TRICEPS
  if (/cable triceps pushdown v.?bar/i.test(n)) return 'Jalón de tríceps con barra V en cable';
  if (/cable reverse grip triceps pushdown sz.?bar/i.test(n)) return 'Jalón de tríceps agarre inverso barra SZ en cable';
  if (/cable one arm side triceps pushdown/i.test(n)) return 'Jalón de tríceps lateral un brazo con cable';
  if (/cable one arm tricep pushdown/i.test(n)) return 'Jalón de tríceps un brazo con cable';
  if (/cable standing one arm tricep pushdown.*overhand/i.test(n)) return 'Jalón de tríceps un brazo agarre pronado de pie con cable';
  if (/cable incline pushdown/i.test(n)) return 'Jalón de tríceps inclinado con cable';

  // SHOULDERS / ROTATOR CUFF
  if (/cable seated shoulder internal rotation/i.test(n)) return 'Rotación interna de hombro sentado con cable';
  if (/cable standing shoulder external rotation/i.test(n)) return 'Rotación externa de hombro de pie con cable';
  if (/cable half kneeling external rotation/i.test(n)) return 'Rotación externa semiarrodillado con cable';
  if (/dumbbell lying external shoulder rotation/i.test(n)) return 'Rotación externa de hombro tumbado con mancuerna';
  if (/dumbbell upright shoulder external rotation/i.test(n)) return 'Rotación externa de hombro erguido con mancuerna';
  if (/dumbbell bench supported external rotation/i.test(n)) return 'Rotación externa de hombro apoyado en banco con mancuerna';
  if (/dumbbell lying one arm deltoid rear/i.test(n)) return 'Apertura posterior deltoides un brazo tumbado con mancuerna';
  if (/cable rear drive/i.test(n)) return 'Empuje trasero con cable';

  // WAIST / CORE
  if (/cable standing lift/i.test(n)) return 'Jalón de pie con cable (rotación)';
  if (/cable twisting pull/i.test(n)) return 'Jalón rotacional con cable';
  if (/lever seated twist/i.test(n)) return 'Giro sentado en máquina';
  if (/cable seated cross arm twist/i.test(n)) return 'Giro sentado con brazos cruzados con cable';
  if (/cable standing lat pushdown rope/i.test(n)) return 'Jalón de espalda de pie con cuerda en cable';
  if (/leg pull.?in flat bench/i.test(n)) return 'Encogimiento de piernas en banco plano';
  if (/standing wheel rollout/i.test(n)) return 'Rueda abdominal de pie';
  if (/lying straight leg marches/i.test(n)) return 'Marcha tumbado con piernas rectas';
  if (/seated flutter kick/i.test(n)) return 'Patadas de mariposa sentado';
  if (/hanging pike/i.test(n)) return 'Pica colgado';

  // FOREARMS
  if (/dumbbell seated one arm rotate/i.test(n)) return 'Rotación de antebrazo sentado un brazo con mancuerna';

  // LEGS / PLYOMETRIC
  if (/dumbbell split jump/i.test(n)) return 'Salto con zancada dividida con mancuernas';

  // GENERAL FALLBACK
  return generateSpanishFromEnglish(n, equipment, muscle, imageFile);
}

function generateSpanishFromEnglish(name, equipFull, muscle, imageFile) {
  const img = imageFile.toLowerCase();
  const variantMatch = img.match(/\((\d+)\)/);
  const variantNum = variantMatch ? parseInt(variantMatch[1]) : 0;
  const n = name;

  let equipmentStr = '';
  if (equipFull === 'Barra') equipmentStr = 'con barra';
  else if (equipFull === 'Barra EZ') equipmentStr = 'con barra EZ';
  else if (equipFull === 'Mancuernas') equipmentStr = 'con mancuernas';
  else if (equipFull === 'Polea/Cable') equipmentStr = 'con cable';
  else if (equipFull === 'Máquina') equipmentStr = 'en máquina';
  else if (equipFull === 'Máquina Smith') equipmentStr = 'en máquina Smith';
  else if (equipFull === 'Kettlebell') equipmentStr = 'con kettlebell';
  else if (equipFull === 'Banda elástica') equipmentStr = 'con banda elástica';
  else if (equipFull === 'Pelota de estabilidad') equipmentStr = 'en pelota';
  else if (equipFull === 'Landmine') equipmentStr = 'con landmine';

  let movement = '';
  if (/bench press/i.test(n)) movement = 'Press de banca';
  else if (/incline.*press|press.*incline/i.test(n)) movement = 'Press inclinado';
  else if (/decline.*press|press.*decline/i.test(n)) movement = 'Press declinado';
  else if (/overhead press|military press|shoulder press/i.test(n)) movement = 'Press sobre cabeza';
  else if (/leg press/i.test(n)) movement = 'Prensa de piernas';
  else if (/press/i.test(n)) movement = 'Press';
  else if (/romanian deadlift|rdl/i.test(n)) movement = 'Peso muerto rumano';
  else if (/sumo deadlift/i.test(n)) movement = 'Peso muerto sumo';
  else if (/deadlift/i.test(n)) movement = 'Peso muerto';
  else if (/upright row/i.test(n)) movement = 'Remo al mentón';
  else if (/t.?bar row/i.test(n)) movement = 'Remo en T';
  else if (/bent.?over row/i.test(n)) movement = 'Remo inclinado';
  else if (/seated row/i.test(n)) movement = 'Remo sentado';
  else if (/row/i.test(n)) movement = 'Remo';
  else if (/lat pulldown|lateral pulldown/i.test(n)) movement = 'Jalón al pecho';
  else if (/pulldown/i.test(n)) movement = 'Jalón';
  else if (/pull.?up/i.test(n)) movement = 'Dominadas';
  else if (/chin.?up/i.test(n)) movement = 'Dominadas supinas';
  else if (/pullover|pull.?over/i.test(n)) movement = 'Pull-over';
  else if (/leg curl|hamstring curl/i.test(n)) movement = 'Curl femoral';
  else if (/leg extension/i.test(n)) movement = 'Extensión de piernas';
  else if (/hip thrust/i.test(n)) movement = 'Hip thrust';
  else if (/glute bridge|hip bridge/i.test(n)) movement = 'Puente de glúteo';
  else if (/calf raise|heel raise/i.test(n)) movement = 'Elevación de talones';
  else if (/good morning/i.test(n)) movement = 'Buenos días';
  else if (/hyperextension/i.test(n)) movement = 'Hiperextensión';
  else if (/face pull/i.test(n)) movement = 'Face pull';
  else if (/shrug/i.test(n)) movement = 'Encogimiento de hombros';
  else if (/lateral raise|side raise/i.test(n)) movement = 'Elevación lateral';
  else if (/front raise/i.test(n)) movement = 'Elevación frontal';
  else if (/rear.*raise|reverse.*raise/i.test(n)) movement = 'Elevación posterior';
  else if (/fly|flies/i.test(n)) movement = 'Apertura';
  else if (/kickback/i.test(n)) movement = 'Patada de tríceps';
  else if (/tricep.*extension|extension.*tricep/i.test(n)) movement = 'Extensión de tríceps';
  else if (/skull.?crusher/i.test(n)) movement = 'Skull crusher';
  else if (/extension/i.test(n)) movement = 'Extensión';
  else if (/hip abduction/i.test(n)) movement = 'Abducción de cadera';
  else if (/hip adduction/i.test(n)) movement = 'Aducción de cadera';
  else if (/abduction/i.test(n)) movement = 'Abducción';
  else if (/adduction/i.test(n)) movement = 'Aducción';
  else if (/step.?up/i.test(n)) movement = 'Subida al cajón';
  else if (/box jump/i.test(n)) movement = 'Salto al cajón';
  else if (/squat/i.test(n)) movement = 'Sentadilla';
  else if (/lunge/i.test(n)) movement = 'Zancada';
  else if (/wrist curl/i.test(n)) movement = 'Curl de muñeca';
  else if (/biceps curl|bicep curl/i.test(n)) movement = 'Curl de bíceps';
  else if (/hammer curl/i.test(n)) movement = 'Curl martillo';
  else if (/concentration curl/i.test(n)) movement = 'Curl concentrado';
  else if (/preacher curl/i.test(n)) movement = 'Curl predicador';
  else if (/drag curl/i.test(n)) movement = 'Curl drag';
  else if (/spider curl/i.test(n)) movement = 'Curl araña';
  else if (/zottman curl/i.test(n)) movement = 'Curl Zottman';
  else if (/reverse curl/i.test(n)) movement = 'Curl inverso';
  else if (/curl/i.test(n)) movement = 'Curl';
  else if (/crunch/i.test(n)) movement = 'Crunch';
  else if (/sit.?up/i.test(n)) movement = 'Abdominales';
  else if (/plank/i.test(n)) movement = 'Plancha';
  else if (/push.?up/i.test(n)) movement = 'Flexión';
  else if (/dip/i.test(n)) movement = 'Fondos';
  else if (/swing/i.test(n)) movement = 'Swing';
  else if (/turkish get.?up/i.test(n)) movement = 'Turkish get-up';
  else if (/clean/i.test(n)) movement = 'Clean';
  else if (/thruster/i.test(n)) movement = 'Thruster';
  else if (/leg raise/i.test(n)) movement = 'Elevación de piernas';
  else if (/hip raise|hip lift/i.test(n)) movement = 'Elevación de cadera';
  else if (/raise/i.test(n)) movement = 'Elevación';
  else if (/mountain climb/i.test(n)) movement = 'Mountain climber';
  else if (/high knee/i.test(n)) movement = 'Rodillas altas';
  else if (/jumping jack/i.test(n)) movement = 'Jumping jack';
  else if (/jump rope/i.test(n)) movement = 'Saltar la cuerda';
  else movement = n.replace(/[\s-]+/g, ' ').trim();

  const mods = [];
  if (/incline/i.test(n) && !movement.includes('inclinado')) mods.push('inclinado');
  if (/decline/i.test(n) && !movement.includes('declinado')) mods.push('declinado');
  if (/overhead/i.test(n) && !movement.includes('cabeza')) mods.push('sobre cabeza');
  if (/close.?grip/i.test(n)) mods.push('agarre cerrado');
  if (/wide.?grip/i.test(n)) mods.push('agarre ancho');
  if (/neutral.?grip/i.test(n)) mods.push('agarre neutro');
  if (/reverse.?grip|underhand/i.test(n)) mods.push('agarre inverso');
  if (/alternate|alternating/i.test(n)) mods.push('alterno');
  if (/one.?arm|single.?arm/i.test(n)) mods.push('un brazo');
  if (/one.?leg|single.?leg/i.test(n)) mods.push('una pierna');
  if (/seated/i.test(n) && !movement.includes('sentado') && !movement.includes('sentada')) mods.push('sentado');
  if (/standing/i.test(n) && !movement.includes('pie')) mods.push('de pie');
  if (/lying/i.test(n) && !movement.includes('tumbado')) mods.push('tumbado');
  if (/kneeling/i.test(n)) mods.push('de rodillas');
  if (/sumo/i.test(n) && !movement.includes('sumo')) mods.push('sumo');
  if (/bulgarian/i.test(n)) mods.push('búlgaro');
  if (/romanian/i.test(n) && !movement.includes('rumano')) mods.push('rumano');
  if (/stiff.?leg|straight.?leg/i.test(n) && !movement.includes('rígidas')) mods.push('piernas rígidas');
  if (/hammer/i.test(n) && !movement.includes('martillo')) mods.push('martillo');
  if (/preacher/i.test(n) && !movement.includes('predicador')) mods.push('predicador');
  if (/concentration/i.test(n) && !movement.includes('concentrado')) mods.push('concentrado');
  if (/spider/i.test(n) && !movement.includes('araña')) mods.push('araña');
  if (/drag/i.test(n) && !movement.includes('drag')) mods.push('drag');
  if (/arnold/i.test(n)) mods.push('Arnold');
  if (/front /i.test(n) && !movement.includes('frontal')) mods.push('frontal');
  if (/lateral/i.test(n) && !movement.includes('lateral')) mods.push('lateral');
  if (/(rear |back fly)/i.test(n) && !movement.includes('posterior')) mods.push('posterior');
  if (/cross.?body/i.test(n) && !movement.includes('cruzado')) mods.push('cruzado');
  if (/chest.?supported/i.test(n)) mods.push('con soporte de pecho');
  if (/reverse/i.test(n) && !movement.includes('inverso') && !/reverse.?grip/i.test(n) && !/reverse curl/i.test(n) && !/reverse.?wrist/i.test(n)) mods.push('inverso');
  if (/narrow/i.test(n) && !movement.includes('estrech')) mods.push('estrecho');

  if (equipmentStr) mods.push(equipmentStr);
  if (variantNum >= 2) mods.push(`variante ${variantNum}`);

  let result = movement;
  if (mods.length > 0) result += ' ' + mods.join(' ');
  return result;
}

// ─── BUILD FINAL MAPPING ─────────────────────────────────────────────────────

const usedNames = new Map();
const usedIds = new Map();

function makeUnique(name, imageFile) {
  if (!usedNames.has(name)) {
    usedNames.set(name, imageFile);
    return name;
  }
  const idPrefix = imageFile.match(/^(\d+[a-f0-9]*)/);
  const suffix = idPrefix ? ` (id ${idPrefix[1]})` : ` (${usedNames.size})`;
  const newName = name + suffix;
  if (!usedNames.has(newName)) {
    usedNames.set(newName, imageFile);
    return newName;
  }
  return name + ` (${Math.floor(Math.random()*99999)})`;
}

function makeUniqueId(id, imageFile) {
  if (!usedIds.has(id)) {
    usedIds.set(id, imageFile);
    return id;
  }
  const idPrefix = imageFile.match(/^(\d+)/);
  const suffix = idPrefix ? `_${idPrefix[1]}` : `_${usedIds.size}`;
  const newId = (id + suffix).substring(0, 55).replace(/_+$/, '');
  if (!usedIds.has(newId)) {
    usedIds.set(newId, imageFile);
    return newId;
  }
  return (id + `_${Math.floor(Math.random()*9999)}`).substring(0, 55);
}

// Check if an entry is a non-ExerciseDB custom exercise (already has Spanish name)
function isCustomEntry(entry) {
  return !/^\d{5}/.test(entry.imageFile);
}

const result = raw.map((entry) => {
  const { imageFile, newFile } = entry;

  // For custom (non-ExerciseDB) entries, use their existing metadata directly
  if (isCustomEntry(entry)) {
    const spanishName = makeUnique(entry.spanishName || imageFile.replace(/\.\w+$/, ''), imageFile);
    const exerciseId = makeUniqueId(entry.exerciseId || toId(spanishName), imageFile);
    const equipment = entry.equipment || detectEquipment(imageFile);
    const muscle = entry.muscle || 'core';
    const category = entry.category || 'isolation';
    const difficulty = entry.difficulty || 'beginner';
    const sets_default = entry.sets_default || 3;
    const reps_default = entry.reps_default || '12-15';
    const rest_seconds = entry.rest_seconds !== undefined ? entry.rest_seconds : 60;
    const weight_guide = entry.weight_guide || getWeightGuide('', equipment, category);
    const currentFile = newFile || imageFile;
    const ext = imageFile.match(/\.(\w+)$/)?.[1] || 'gif';
    const newFileName = spanishName + '.' + ext;
    return {
      imageFile,
      currentFile,
      exerciseId,
      spanishName,
      newFile: newFileName,
      muscle,
      equipment,
      category,
      difficulty,
      sets_default,
      reps_default,
      rest_seconds,
      weight_guide
    };
  }

  const exName = extractExerciseName(imageFile);
  const bodyPart = extractBodyPart(imageFile);

  const equipment = detectEquipment(exName);
  const muscle = detectMuscle(exName, bodyPart);
  const category = detectCategory(exName, muscle);
  const difficulty = detectDifficulty(exName, category, equipment);
  const defaults = getDefaults(category, muscle, exName, difficulty);
  const weightGuide = getWeightGuide(exName, equipment, category);

  let spanishName = translateToSpanish(exName, imageFile, muscle, equipment, category);
  spanishName = makeUnique(spanishName, imageFile);

  const exerciseId = makeUniqueId(toId(spanishName), imageFile);

  const currentFile = newFile || imageFile;
  const newFileName = spanishName + '.gif';

  return {
    imageFile,
    currentFile,
    exerciseId,
    spanishName,
    newFile: newFileName,
    muscle,
    equipment,
    category,
    difficulty,
    sets_default: defaults.sets,
    reps_default: defaults.reps,
    rest_seconds: defaults.rest,
    weight_guide: weightGuide
  };
});

// ─── WRITE OUTPUT ─────────────────────────────────────────────────────────────

writeFileSync('C:/Users/USUARIO/AppData/Local/Temp/mapping_v2.json', JSON.stringify(result, null, 2), 'utf8');

const allNames = result.map(r => r.spanishName);
const allIds = result.map(r => r.exerciseId);
const dupNames = allNames.filter((n, i) => allNames.indexOf(n) !== i);
const dupIds = allIds.filter((id, i) => allIds.indexOf(id) !== i);

const summary = [
  `MAPPING V2 SUMMARY`,
  `==================`,
  `Total entries: ${result.length}`,
  `Duplicate Spanish names: ${dupNames.length}`,
  `Duplicate exercise IDs: ${dupIds.length}`,
  dupNames.length > 0 ? `\nDuplicate names:\n${[...new Set(dupNames)].join('\n')}` : '',
  dupIds.length > 0 ? `\nDuplicate IDs:\n${[...new Set(dupIds)].join('\n')}` : '',
  `\n--- FIRST 20 ENTRIES ---`,
  ...result.slice(0, 20).map((r, i) =>
    `${i+1}. [${r.imageFile}]\n   ES: ${r.spanishName}\n   ID: ${r.exerciseId}\n   Muscle: ${r.muscle} | Cat: ${r.category} | Equip: ${r.equipment} | Diff: ${r.difficulty}`
  )
].filter(Boolean).join('\n');

writeFileSync('C:/Users/USUARIO/AppData/Local/Temp/mapping_v2_summary.txt', summary, 'utf8');

console.log('Done!');
console.log('Total:', result.length);
console.log('Duplicate names:', dupNames.length);
console.log('Duplicate IDs:', dupIds.length);
if (dupNames.length > 0) {
  console.log('Dup names sample:', [...new Set(dupNames)].slice(0, 30));
}
if (dupIds.length > 0) {
  console.log('Dup IDs sample:', [...new Set(dupIds)].slice(0, 30));
}
