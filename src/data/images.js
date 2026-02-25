// Mapa de imágenes: key = id del ejercicio
export const EX_IMAGES = {
  'treadmill_walk':    'images/caminata rápida.gif',
  'calf_unilateral':   'images/calf_unilateral.webp',
  'dead_bug':          'images/Dead bug (bicho muerto).gif',
  'glute_bridge':      'images/Puente de glúteo (unilateral).gif',
  'lunge_walk':        'images/Estocada caminando.webp',
  'plank':             'images/Plancha Frontal.gif',
  'psoas_stretch':     'images/psoas_stretch.webp',
  'pigeon':            'images/paloma_gluteo.webp',
  'squat_goblet':      'images/Sentadilla goblet (mancuerna).gif',
  'rdl':               'images/Peso muerto rumano.gif',
  'abduction_machine': 'images/Abducción cadera (máquina).gif',
  'bench_flat':        'images/Press de banca plano (barra).gif',
  'db_press_incline':  'images/Press inclinado (mancuernas).gif',
  'db_fly_flat':       'images/Apertura plana (mancuernas).gif',
  'dips_tricep':       'images/Fondos en banco (tríceps).gif',
  'tricep_pushdown':   'images/Extensión tríceps (cuerda-cable).gif',
  'overhead_ext_db':   'images/Extensión overhead (mancuerna).gif',
  'pulldown_wide':     'images/Jalón al pecho agarre ancho.gif',
  'pulldown_neutral':  'images/Jalón agarre neutro.gif',
  'row_bar':           'images/Remo con barra inclinado.gif',
  'row_db':            'images/Remo mancuerna unilateral.gif',
  'facepull':          'images/Facepull con cuerda.gif',
  'curl_bar':          'images/Curl con barra recta o Z.gif',
  'curl_hammer':       'images/Curl martillo (mancuernas).gif',
};

// Keywords para ejercicios de texto (pre/post) sin id específico
export const EX_IMAGES_KEYWORDS = [
  { keywords: ['jumping jacks', 'jumping jack'], img: 'images/Jumping Jacks.gif' },
  { keywords: ['caminata rápida', 'caminata rapida'], img: 'images/caminata rápida.gif' },
  { keywords: ['movilidad tobillo', 'movilidad de tobillo', 'círculos de tobillo', 'circulos de tobillo'], img: 'images/movilidad_tobillo.webp' },
  { keywords: ['pantorrilla contra pared'], img: 'images/Pantorrilla contra pared.avif' },
  { keywords: ['apertura de cadera en cuclillas'], img: 'images/deep_squat_hip_opener.gif' },
  { keywords: ['isquiotibial con banda', 'isquiotibiales con cinta'], img: 'images/Isquiotibial con banda o toalla.avif' },
  { keywords: ['rotación espinal', 'rotacion espinal', 'rotaciones de rodilla'], img: 'images/rotaciones de rodilla.gif' },
  { keywords: ['paloma', 'figura 4', 'piriforme'], img: 'images/paloma_gluteo.webp' },
  { keywords: ['desbloqueo psoas', 'estiramiento de psoas', 'psoas'], img: 'images/Desbloqueo psoas rodilla en suelo inclinación adelante.gif' },
  { keywords: ['círculos de cadera', 'circulos de cadera'], img: 'images/círculos de cadera.gif' },
  { keywords: ['sentadillas de activación', 'sentadillas de activacion'], img: 'images/sentadillas de activación.webp' },
  { keywords: ['puentes de glúteo', 'puente de glúteo', 'puentes de gluteo', 'puente de gluteo'], img: 'images/puentes de glúteo lentos.gif' },
  { keywords: ['caminata suave', 'caminata muy lenta', 'caminata tranquila', 'trote suave'], img: 'images/caminata suave.gif' },
  { keywords: ['cuádriceps de pie', 'cuadriceps de pie'], img: 'images/Cuádriceps de pie.jpg' },
  { keywords: ['aductor sentado'], img: 'images/Aductor sentado pies juntos.webp' },
  { keywords: ['torsión espinal', 'torsion espinal'], img: 'images/Torsión espinal tumbado.png' },
  { keywords: ['bicicleta estática', 'bicicleta estatica', 'bicicleta o elíptica', 'bicicleta o eliptica'], img: 'images/bicicleta estática.gif' },
  { keywords: ['círculos de hombros', 'circulos de hombros'], img: 'images/círculos de hombros.gif' },
  { keywords: ['movilidad de hombro', 'círculos de brazo', 'circulos de brazo'], img: 'images/Movilidad de hombro círculos de brazo.gif' },
  { keywords: ['aperturas de pecho con banda'], img: 'images/aperturas de pecho con banda.gif' },
  { keywords: ['push-ups de rodilla', 'push-up de rodilla'], img: 'images/push-ups de rodilla lentos.gif' },
  { keywords: ['rotaciones de hombro con banda', 'rotación de hombro con banda', 'rotación externa de hombro con banda', 'rotacion externa de hombro con banda'], img: 'images/rotaciones de hombro con banda.avif' },
  { keywords: ['colgarse de barra', 'colgar de barra'], img: 'images/Colgarse de barra.webp' },
  { keywords: ['retracciones escapulares', 'retracción escapular', 'retraccion escapular'], img: 'images/retracciones escapulares.gif' },
  { keywords: ['superman'], img: 'images/superman lentos en el suelo.gif' },
  { keywords: ['gato-vaca', 'gato vaca'], img: 'images/Gato-vaca en el suelo.webp' },
  { keywords: ['niño extendido', 'nino extendido'], img: 'images/Niño extendido con brazos al frente.jpg' },
  { keywords: ['bíceps contra pared', 'biceps contra pared'], img: 'images/Bíceps contra pared, palma arriba.jpg' },
  { keywords: ['estiramiento de antebrazo dorsal'], img: 'images/Estiramiento de antebrazo dorsal.gif' },
  { keywords: ['estiramiento dorsal', 'brazo en alto con inclinación', 'brazo en alto con inclinacion'], img: 'images/Estiramiento dorsal brazo en alto con inclinación lateral.avif' },
  { keywords: ['apertura de pecho en marco de puerta'], img: 'images/Apertura de pecho en marco de puerta.jpg' },
  { keywords: ['extensión de muñeca y antebrazo', 'extension de muneca y antebrazo'], img: 'images/Extensión de muñeca y antebrazo.jpg' },
  { keywords: ['extensión y flexión de muñeca', 'extension y flexion de muneca', 'extensión de muñeca', 'extension de muneca'], img: 'images/Extensión y flexión de muñeca.png' },
  { keywords: ['rotación interna/externa de hombro', 'rotacion interna/externa de hombro'], img: 'images/Rotación internaexterna de hombro.png' },
  { keywords: ['tríceps sobre la cabeza', 'triceps sobre la cabeza'], img: 'images/Tríceps sobre la cabeza.jpg' },
  { keywords: ['cruce de brazo'], img: 'images/Cruce de brazo deltoides anterior.gif' },
];

export function getExImage(id, name) {
  if (EX_IMAGES[id]) return EX_IMAGES[id];
  const n = (name || '').toLowerCase();
  for (const entry of EX_IMAGES_KEYWORDS) {
    if (entry.keywords.some(k => n.includes(k))) return entry.img;
  }
  return null;
}
