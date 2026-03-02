// ===== NUTRICIÓN =====
// Horario completo del día basado en la hora de entrenamiento elegida por el usuario.
// Calcula automáticamente los tiempos de cada comida, ajusta contenido al objetivo
// y al tipo de sesión (piernas, pecho, espalda, etc.).
// Tab "Fundamentos": tarjetas acordeón educativas.

import { getPlanMeta, getPlan, isDone } from './state.js';

// ── TRAINING TIME OPTIONS ─────────────────────────────────────────────────────

const TRAINING_HOURS = [
  { label: '6am', hour: 6 },  { label: '7am', hour: 7 },
  { label: '8am', hour: 8 },  { label: '9am', hour: 9 },
  { label: '10am', hour: 10 }, { label: '12pm', hour: 12 },
  { label: '2pm',  hour: 14 }, { label: '4pm',  hour: 16 },
  { label: '5pm',  hour: 17 }, { label: '6pm',  hour: 18 },
  { label: '7pm',  hour: 19 }, { label: '8pm',  hour: 20 },
];

// ── LABELS ────────────────────────────────────────────────────────────────────

const OBJETIVO_LABELS = {
  strength:    'Ganar fuerza',
  hypertrophy: 'Ganar músculo',
  weight_loss: 'Perder peso',
  endurance:   'Mejorar resistencia',
  general:     'Condición general',
};

const NIVEL_LABELS = {
  beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado',
};

// ── SESSION-SPECIFIC NUTRITION ────────────────────────────────────────────────

const SESSION_NUTRITION = {
  A: {
    label: 'Piernas', color: 'var(--accent)',
    pre: { timing: '90 min antes', preOffset: 1.5,
      focus: 'Día de mayor demanda energética — los músculos más grandes necesitan el máximo glucógeno',
      foods: ['Arroz con pollo o carne magra', 'Pasta con proteína ligera', 'Avena + plátano + proteína en polvo', 'Papa cocida + huevos'],
    },
    post: { timing: '30–45 min después',
      focus: 'Mayor glucógeno quemado + mayor daño muscular del plan — máxima reposición',
      protein: '35–45g proteína',
      foods: ['Arroz + carne magra o pollo', 'Batata + proteína en polvo', 'Pasta + atún', 'Leche + plátano + proteína'],
    },
    hydration: { level: 'Alta', note: 'Músculos más grandes → mayor temperatura corporal y sudoración' },
    intensity: 'high',
  },
  B: {
    label: 'Pecho / Tríceps', color: 'var(--cyan)',
    pre: { timing: '60–90 min antes', preOffset: 1.25,
      focus: 'Carbohidratos moderados + proteína para series de empuje explosivo',
      foods: ['Arroz con atún o pollo', 'Pan integral con huevo', 'Avena + proteína en polvo', 'Banana + mantequilla de maní'],
    },
    post: { timing: '30–45 min después',
      focus: 'Proteína para reparar fibras pectorales y tríceps bajo carga',
      protein: '25–35g proteína',
      foods: ['Shake de proteína + arroz', 'Pechuga + papa cocida', 'Yogur griego + fruta', 'Huevos + tostadas integrales'],
    },
    hydration: { level: 'Moderada-alta', note: '' },
    intensity: 'medium',
  },
  C: {
    label: 'Espalda / Bíceps', color: 'var(--amber)',
    pre: { timing: '60–90 min antes', preOffset: 1.25,
      focus: 'La espalda es el grupo más grande del tren superior — carbohidratos moderados-altos',
      foods: ['Arroz + pollo o carne', 'Pan integral con mantequilla de maní', 'Avena + clara de huevo', 'Batata + atún'],
    },
    post: { timing: '30–45 min después',
      focus: 'Proteína alta — la espalda tiene el mayor volumen muscular del tren superior',
      protein: '30–40g proteína',
      foods: ['Arroz + salmón o carne magra', 'Batido de proteína + leche', 'Pollo + vegetales + carbohidrato', 'Requesón + fruta'],
    },
    hydration: { level: 'Alta', note: 'Jalones y remos activan toda la cadena posterior' },
    intensity: 'high',
  },
  D: {
    label: 'Hombros', color: 'var(--green)',
    pre: { timing: '60 min antes', preOffset: 1.0,
      focus: 'Carbohidratos moderados + proteína para el trabajo de deltoides y trapecios',
      foods: ['Arroz con proteína magra', 'Pan integral con huevo', 'Fruta + yogur griego', 'Avena + leche'],
    },
    post: { timing: '30–60 min después',
      focus: 'Proteína para reparar deltoides + carbohidratos de recuperación',
      protein: '20–30g proteína',
      foods: ['Shake de proteína', 'Pollo + arroz', 'Yogur griego + granola', 'Huevos + tostadas'],
    },
    hydration: { level: 'Moderada', note: '' },
    intensity: 'medium',
  },
  E: {
    label: 'Cardio', color: 'var(--red)',
    pre: { timing: '90 min antes', preOffset: 1.5,
      focus: 'Carbohidratos altos — el cardio depende casi exclusivamente del glucógeno como combustible',
      foods: ['Avena con miel y plátano', 'Pan integral con mermelada', 'Arroz con proteína ligera', 'Fruta + yogur griego'],
    },
    post: { timing: '30 min después',
      focus: 'Reponer glucógeno rápidamente + proteína para tejido muscular',
      protein: '20–25g proteína + carbohidratos prioritarios',
      foods: ['Fruta + shake de proteína', 'Arroz con atún', 'Plátano + leche', 'Jugo natural + proteína'],
    },
    hydration: { level: 'Muy alta', note: 'Electrolitos si la sesión dura +45 min — pizca de sal en el agua' },
    intensity: 'high',
  },
  F: {
    label: 'Full Body', color: 'var(--accent)',
    pre: { timing: '90 min antes', preOffset: 1.5,
      focus: 'Full body activa todos los sistemas energéticos — máximos carbohidratos y proteína',
      foods: ['Arroz + pollo o carne', 'Pasta con proteína', 'Avena + plátano + proteína en polvo', 'Papa cocida + huevos'],
    },
    post: { timing: '30–45 min después',
      focus: 'Todos los músculos necesitan recuperación simultánea — máxima reposición',
      protein: '35–45g proteína',
      foods: ['Arroz + carne magra', 'Batido de proteína + leche + plátano', 'Pasta + pollo', 'Batata + salmón'],
    },
    hydration: { level: 'Muy alta', note: 'Todo el cuerpo activo → máxima pérdida de líquido y electrolitos' },
    intensity: 'high',
  },
  G: {
    label: 'Deload', color: 'var(--text3)',
    pre: { timing: '60 min antes', preOffset: 1.0,
      focus: 'Semana de descarga — come ligero, no necesitas alta carga calórica',
      foods: ['Fruta + yogur griego', 'Pan integral con huevo', 'Avena ligera con leche', 'Ensalada con proteína'],
    },
    post: { timing: '30–60 min después',
      focus: 'Proteína moderada para mantener músculo — carbohidratos mínimos',
      protein: '20–25g proteína',
      foods: ['Yogur griego + fruta', 'Pollo + ensalada', 'Shake de proteína ligero', 'Huevos + vegetales'],
    },
    hydration: { level: 'Normal', note: 'Semana de descarga — misma hidratación base diaria' },
    intensity: 'low',
  },
};

const CARB_LEVEL = {
  strength:    { high: '5–7g/kg hoy', medium: '4–5g/kg hoy', low: '3–4g/kg hoy' },
  hypertrophy: { high: '4–6g/kg hoy', medium: '3–5g/kg hoy', low: '2–3g/kg hoy' },
  weight_loss: { high: '3–4g/kg (prioriza proteína)', medium: '2–3g/kg hoy', low: '1.5–2g/kg hoy' },
  endurance:   { high: '6–8g/kg hoy', medium: '5–6g/kg hoy', low: '4–5g/kg hoy' },
  general:     { high: '4–5g/kg hoy', medium: '3–4g/kg hoy', low: '2–3g/kg hoy' },
};

// ── FULL DAY MEAL CONTENT ─────────────────────────────────────────────────────
// Cada slot define el contenido específico para cada objetivo.

const MEAL_CONTENT = {
  wake: {
    hypertrophy: {
      label: 'Primera comida · Al despertar',
      note: 'Rompe el ayuno con proteína + carbohidratos — activa la síntesis proteica muscular después de 7-8h de ayuno',
      water: 'Bebe 400–500 ml de agua antes del café — rehidrata tras el sueño',
      foods: ['Avena (80g) con leche y plátano', 'Huevos revueltos (3 claras + 2 enteros)', 'Café negro sin azúcar (opcional)'],
      macro: '~40–50g proteína · ~60–80g carbos · bajo en grasas',
    },
    strength: {
      label: 'Primera comida · Al despertar',
      note: 'Glucógeno y proteína para el día de fuerza — desayuno no es opcional cuando buscas fuerza máxima',
      water: 'Bebe 400–500 ml de agua al despertar',
      foods: ['Avena (100g) con leche y miel', 'Huevos revueltos (3–4) + tostadas integrales', 'Café negro'],
      macro: '~40–50g proteína · ~70–90g carbos',
    },
    weight_loss: {
      label: 'Primera comida · Al despertar',
      note: 'Alta en proteína para preservar músculo en déficit calórico — rompe el ayuno sin exceso de carbohidratos',
      water: 'Bebe 500 ml de agua al despertar — mejora el metabolismo matutino',
      foods: ['Claras de huevo (5–6) + 1 yema', 'Avena (50g) con agua y canela', 'Café o té sin azúcar'],
      macro: '~35–40g proteína · ~25–35g carbos · bajo en grasas',
    },
    endurance: {
      label: 'Primera comida · Al despertar',
      note: 'Recarga glucógeno desde el primer momento — el cuerpo de resistencia vive de carbohidratos complejos',
      water: 'Bebe 400–500 ml de agua antes del café',
      foods: ['Avena (100g) con leche, miel y plátano', 'Pan integral (2 rebanadas) con mermelada de fruta', 'Jugo de naranja natural'],
      macro: '~25–35g proteína · ~80–100g carbos',
    },
    general: {
      label: 'Primera comida · Al despertar',
      note: 'Desayuno equilibrado para empezar el día con energía y activar el metabolismo',
      water: 'Bebe 400–500 ml de agua al despertar',
      foods: ['Huevos (2–3) con tostadas integrales', 'Avena con frutas y nueces', 'Café o té sin azúcar'],
      macro: '~30–40g proteína · ~40–60g carbos',
    },
  },

  midmorning: {
    hypertrophy: {
      label: 'Media mañana',
      note: 'Mantén la síntesis proteica activa — sin esta comida la señal anabólica cae antes del pre-entreno',
      water: '200–300 ml de agua',
      foods: ['Yogur griego (200g) con granola y fruta', 'Requesón + plátano', 'Pan integral + atún + vegetales'],
      macro: '~25–30g proteína · ~30–40g carbos',
    },
    strength: {
      label: 'Media mañana',
      note: 'Energía sostenida para el día — mantiene glucógeno estable hasta el pre-entreno',
      water: '200–300 ml de agua',
      foods: ['Pan integral + mantequilla de maní + banana', 'Leche con avena y proteína en polvo', 'Requesón + fruta + nueces'],
      macro: '~25–30g proteína · ~40–50g carbos',
    },
    weight_loss: {
      label: 'Snack de media mañana',
      note: 'Snack proteico para controlar el hambre y evitar comer de más en el almuerzo — sin exceso calórico',
      water: '300–400 ml de agua — la hidratación reduce el hambre',
      foods: ['Yogur griego natural (150g)', 'Fresas o arándanos (100g)', 'Opcional: 10 almendras'],
      macro: '~15–20g proteína · ~10–15g carbos',
    },
    endurance: {
      label: 'Media mañana',
      note: 'Carbohidratos para mantener el glucógeno muscular en niveles óptimos durante el día',
      water: '200–300 ml de agua',
      foods: ['Banana + granola (50g)', 'Pan integral con mermelada de fruta', 'Dátiles (5–6) + yogur griego'],
      macro: '~10–15g proteína · ~50–60g carbos',
    },
    general: {
      label: 'Media mañana',
      note: 'Snack nutritivo para mantener energía entre el desayuno y el almuerzo/pre-entreno',
      water: '200–300 ml de agua',
      foods: ['Fruta + puñado de nueces', 'Yogur griego natural', 'Pan integral con aguacate'],
      macro: '~10–20g proteína · ~20–30g carbos · grasas saludables',
    },
  },

  lunch: {
    hypertrophy: {
      label: 'Almuerzo',
      note: 'Comida principal sólida — proteína + carbohidratos para sostener el músculo y tener energía en la tarde',
      water: '300–400 ml de agua con la comida',
      foods: ['Arroz (150g) + pechuga de pollo (200g) + vegetales', 'Pasta integral + carne molida + ensalada', 'Lentejas + proteína magra + arroz'],
      macro: '~45–55g proteína · ~60–80g carbos',
    },
    strength: {
      label: 'Almuerzo',
      note: 'Comida grande y sólida para sostener la fuerza del día — carbohidratos prioritarios',
      water: '300–400 ml de agua',
      foods: ['Arroz (180g) + carne magra (200g) + vegetales', 'Papa cocida + pollo + legumbres', 'Pasta + carne + ensalada abundante'],
      macro: '~45–55g proteína · ~80–100g carbos',
    },
    weight_loss: {
      label: 'Almuerzo',
      note: 'Comida más grande del día en déficit — proteína alta, vegetales ilimitados, carbos moderados',
      water: 'Bebe 400 ml de agua antes del almuerzo para mayor saciedad',
      foods: ['Pollo (200g) o pescado + arroz integral (100g) + ensalada grande', 'Lentejas + vegetales + proteína magra', 'Sopa de verduras + proteína + tortilla de maíz'],
      macro: '~40–50g proteína · ~30–50g carbos · vegetales ilimitados',
    },
    endurance: {
      label: 'Almuerzo',
      note: 'Comida principal de carbohidratos — sostiene el glucógeno para la sesión de resistencia',
      water: '300–400 ml de agua',
      foods: ['Pasta integral (200g cocida) + pollo (150g)', 'Arroz + salmón + vegetales', 'Legumbres + proteína + arroz integral'],
      macro: '~35–45g proteína · ~80–100g carbos',
    },
    general: {
      label: 'Almuerzo',
      note: 'Almuerzo equilibrado — proteína + carbohidratos + vegetales en proporciones razonables',
      water: '300–400 ml de agua',
      foods: ['Proteína magra (180g) + carbohidrato (120g) + vegetales', 'Pollo + arroz integral + ensalada', 'Menú balanceado con proteína, carbo y grasa saludable'],
      macro: '~35–45g proteína · ~50–70g carbos',
    },
  },

  dinner: {
    hypertrophy: {
      label: 'Cena',
      note: 'Proteína alta + carbohidratos moderados para la recuperación y síntesis muscular durante el sueño',
      water: '200–300 ml de agua',
      foods: ['Pechuga de pollo (200g) + arroz (150g cocido)', 'Salmón + papa al horno + vegetales', 'Carne magra + legumbres + ensalada'],
      macro: '~45–55g proteína · ~40–60g carbos',
    },
    strength: {
      label: 'Cena',
      note: 'Carbohidratos + proteína para reponer glucógeno muscular y recuperar fuerza',
      water: '200–300 ml de agua',
      foods: ['Carne magra (200g) + arroz (150g cocido)', 'Pollo + papa cocida + vegetales', 'Pasta con carne molida + vegetales'],
      macro: '~45–55g proteína · ~60–80g carbos',
    },
    weight_loss: {
      label: 'Cena',
      note: 'Cena muy baja en carbos — durante el sueño el cuerpo usa grasa como energía preferencial',
      water: '200 ml de agua',
      foods: ['Pescado blanco o pollo (180g) a la plancha', 'Vegetales abundantes al vapor o crudos', 'Ensalada grande con proteína magra'],
      macro: '~40–50g proteína · vegetales libres · sin carbos',
    },
    endurance: {
      label: 'Cena',
      note: 'Recarga glucógeno para la siguiente sesión — alta en carbohidratos complejos antes del sueño',
      water: '200–300 ml de agua',
      foods: ['Pasta integral (200g cocida) + pollo (150g)', 'Arroz + salmón + vegetales', 'Lentejas + proteína magra'],
      macro: '~35–45g proteína · ~80–100g carbos',
    },
    general: {
      label: 'Cena',
      note: 'Cena equilibrada — ajusta las porciones según hambre y energía del día',
      water: '200 ml de agua',
      foods: ['Proteína magra (180g) + carbohidrato moderado + vegetales', 'Ensalada completa con pollo o atún', 'Sopa proteica + sandwich integral'],
      macro: '~35–45g proteína · ~40–60g carbos',
    },
  },

  lastmeal: {
    hypertrophy: {
      label: 'Última comida',
      sublabel: 'Antes de dormir',
      note: 'Proteína de lenta absorción (caseína) — alimenta los músculos durante las 7–8h de sueño cuando la síntesis proteica sigue activa',
      water: 'Opcional: leche caliente — mejora el sueño y aporta caseína natural',
      foods: ['Requesón o cottage cheese (200g)', 'Yogur griego natural + almendras (10–12)', 'Leche (250ml) + proteína en polvo de caseína'],
      macro: '~25–35g proteína · mínimos carbos · grasa moderada',
    },
    strength: {
      label: 'Última comida',
      sublabel: 'Antes de dormir',
      note: 'Proteína nocturna para maximizar recuperación y síntesis proteica mientras duermes — la fuerza se construye en el sueño',
      water: 'Leche caliente o infusión sin cafeína',
      foods: ['Requesón (200g) + nueces (15g)', 'Leche con caseína en polvo', 'Yogur griego natural + mantequilla de maní'],
      macro: '~25–35g proteína · grasas saludables',
    },
    endurance: {
      label: 'Última comida',
      sublabel: 'Antes de dormir',
      note: 'Carbohidratos + proteína — el cuerpo de resistencia necesita glucógeno incluso de noche para recuperar tejido',
      water: 'Infusión de manzanilla o leche caliente',
      foods: ['Plátano + leche (1 vaso)', 'Pan integral con mermelada + yogur griego', 'Yogur griego + granola (30g)'],
      macro: '~15–20g proteína · ~30–40g carbos',
    },
    general: {
      label: 'Última comida',
      sublabel: 'Solo si tienes hambre real',
      note: 'Solo si tienes hambre genuina — evita comer por costumbre. Si no hay hambre real, omítela sin problema',
      water: 'Infusión sin cafeína o leche caliente',
      foods: ['Yogur griego natural (150g)', 'Leche caliente (250ml)', 'Requesón + fruta pequeña'],
      macro: '~15–25g proteína',
    },
  },
};

// ── REST MEALS ────────────────────────────────────────────────────────────────

const REST_MEALS = {
  strength:    { note: 'Mantén la proteína igual. Reduce carbohidratos ~20–30%. Más vegetales y grasas saludables para apoyar la recuperación.', examples: ['Huevos + aguacate + ensalada', 'Salmón + brócoli al vapor', 'Pollo + vegetales salteados', 'Lentejas con verduras'] },
  hypertrophy: { note: 'Reducción leve de carbohidratos (−20%). Proteína igual o mayor. Más grasas saludables y vegetales.', examples: ['Salmón + vegetales + aguacate', 'Huevos con espinacas y queso', 'Pechuga + ensalada grande', 'Lentejas con carne magra'] },
  weight_loss: { note: 'Menor demanda calórica sin entreno. Maximiza vegetales, proteína alta y carbohidratos muy bajos.', examples: ['Ensalada grande con pollo o atún', 'Claras de huevo con vegetales', 'Sopa de verduras + proteína magra', 'Yogur griego con frutos rojos'] },
  endurance:   { note: 'Carbohidratos moderados para recuperar glucógeno. Proteína normal para reparar tejido muscular.', examples: ['Arroz integral + pollo', 'Pasta ligera + vegetales', 'Pan integral + huevos', 'Frutas + yogur griego'] },
  general:     { note: 'Come limpio y nutritivo. Prioriza proteína, vegetales variados y carbohidratos moderados.', examples: ['Pollo + vegetales + poco arroz', 'Huevos + aguacate + tostadas', 'Pescado + ensalada', 'Legumbres + vegetales'] },
};

// ── MACROS BASE ───────────────────────────────────────────────────────────────

const PROTEIN_RANGES = {
  strength:    { beginner: '1.6–2.0', intermediate: '1.8–2.2', advanced: '2.0–2.4' },
  hypertrophy: { beginner: '1.8–2.0', intermediate: '2.0–2.2', advanced: '2.0–2.4' },
  weight_loss: { beginner: '1.8–2.2', intermediate: '2.0–2.4', advanced: '2.2–2.6' },
  endurance:   { beginner: '1.4–1.6', intermediate: '1.6–1.8', advanced: '1.8–2.0' },
  general:     { beginner: '1.4–1.8', intermediate: '1.6–2.0', advanced: '1.8–2.2' },
};

const CALORIC_APPROACH = {
  strength:    { label: 'Superávit moderado', detail: '+200–300 kcal/día', color: 'var(--cyan)' },
  hypertrophy: { label: 'Superávit moderado', detail: '+300–500 kcal/día', color: 'var(--cyan)' },
  weight_loss: { label: 'Déficit moderado',   detail: '−300–500 kcal/día', color: 'var(--amber)' },
  endurance:   { label: 'Mantenimiento',       detail: '0 a −200 kcal/día', color: 'var(--green)' },
  general:     { label: 'Mantenimiento',       detail: '±100–200 kcal/día', color: 'var(--green)' },
};

const HYDRATION_BY_DURATION = {
  45: { liters: '2.5–3.0', during: '400–600 ml durante', before: '500 ml · 2h antes' },
  60: { liters: '3.0–3.5', during: '500–700 ml durante', before: '500 ml · 2h antes' },
  75: { liters: '3.0–3.5', during: '600–800 ml durante', before: '600 ml · 2h antes' },
  90: { liters: '3.5–4.0', during: '700–1000 ml durante', before: '600 ml · 2h antes' },
};

// ── FUNDAMENTOS ───────────────────────────────────────────────────────────────

const FUNDAMENTOS = [
  { id: 'proteinas', icon: 'ti-meat', title: 'Proteínas', relevantFor: ['strength', 'hypertrophy', 'weight_loss'], summary: 'El macronutriente más importante para el músculo.',
    content: ['<strong>¿Para qué?</strong> La proteína es el bloque constructor del tejido muscular. Después de entrenar, el músculo necesita aminoácidos para repararse y crecer. Sin proteína suficiente, no hay supercompensación.', '<strong>¿Cuánto?</strong> El rango óptimo es 1.6–2.4 g/kg de peso corporal al día según objetivo y nivel. Más proteína no siempre es mejor: el exceso se oxidará como energía.', '<strong>Fuentes de alta calidad:</strong> Pollo, huevo (especialmente claras), carne magra, pescado, yogur griego, requesón, leche, proteína en polvo (whey o caseína), legumbres.', '<strong>Distribución:</strong> Reparte la ingesta en 4–5 comidas con 25–40g de proteína cada una para maximizar la síntesis proteica muscular.'] },
  { id: 'carbohidratos', icon: 'ti-wheat', title: 'Carbohidratos', relevantFor: ['endurance', 'strength', 'hypertrophy'], summary: 'El combustible principal para el entrenamiento de alta intensidad.',
    content: ['<strong>¿Para qué?</strong> Los carbohidratos se almacenan como glucógeno en músculos e hígado. Es el combustible preferido para ejercicios de alta intensidad como levantar pesas o correr.', '<strong>Sin glucógeno suficiente:</strong> rendimiento reducido, mayor fatiga percibida, peor recuperación y menor adaptación a largo plazo.', '<strong>Tipos:</strong> Complejos (arroz, avena, batata, quinoa) → energía sostenida. Simples (fruta, miel) → recuperación post-entreno rápida.', '<strong>Timing:</strong> Concentra los carbohidratos alrededor del entrenamiento (pre y post). En días de descanso reduce la cantidad total.'] },
  { id: 'grasas', icon: 'ti-droplet', title: 'Grasas saludables', relevantFor: ['general', 'endurance', 'weight_loss'], summary: 'Esenciales para hormonas, articulaciones y absorción de vitaminas.',
    content: ['<strong>¿Para qué?</strong> Las grasas producen testosterona, cortisol y otras hormonas anabólicas. Protegen articulaciones y facilitan la absorción de vitaminas A, D, E y K.', '<strong>Fuentes:</strong> Aguacate, aceite de oliva extra virgen, nueces, almendras, maní, salmón, sardinas, huevos completos, aceitunas, chía, linaza.', '<strong>Omega-3:</strong> Propiedades antiinflamatorias que reducen daño muscular post-entreno. Fuentes: salmón, atún, sardinas, nueces, chía.', '<strong>Evita:</strong> Grasas trans (ultra-procesados, margarinas). Limita aceites vegetales refinados. Prefiere aceite de oliva para cocinar.'] },
  { id: 'hidratacion', icon: 'ti-droplets', title: 'Hidratación', relevantFor: ['endurance', 'weight_loss', 'general', 'strength'], summary: 'Una pérdida del 2% de peso en agua reduce el rendimiento hasta un 20%.',
    content: ['<strong>Señal clave:</strong> El color de la orina indica tu estado. Debe ser amarillo pálido. Oscura → toma agua inmediatamente. Transparente → bien hidratado.', '<strong>Durante el entreno:</strong> Bebe 150–250 ml cada 15–20 minutos. Para sesiones largas o con calor, aumenta la frecuencia.', '<strong>Electrolitos:</strong> En sesiones de +60 min o con alta sudoración, repón sodio y potasio. Una pizca de sal en el agua o un plátano ayuda significativamente.', '<strong>Alcohol:</strong> Interfiere con la síntesis proteica y la recuperación muscular. Evítalo en las 24h posteriores a un entrenamiento intenso.'] },
  { id: 'timing', icon: 'ti-clock', title: 'Timing nutricional', relevantFor: ['strength', 'hypertrophy'], summary: 'Cuándo comes importa casi tanto como qué comes.',
    content: ['<strong>Pre-entreno (60–90 min antes):</strong> Carbohidratos complejos + proteína moderada. Evita comidas muy grasosas o con mucha fibra — ralentizan la digestión.', '<strong>Post-entreno (30–60 min después):</strong> 25–40g de proteína + carbohidratos de absorción media-rápida. Momento más crítico para recuperación y crecimiento.', '<strong>Ventana anabólica:</strong> La síntesis proteica está elevada 24–48h post-entreno con un pico en las primeras 2h. No corras a comer, pero no demores más de 2h.', '<strong>Distribución diaria:</strong> 4–5 comidas cada 3–4 horas es lo más efectivo para mantener la síntesis proteica elevada.'] },
  { id: 'suplementacion', icon: 'ti-pill', title: 'Suplementación básica', relevantFor: ['strength', 'hypertrophy'], summary: 'Solo 3–4 suplementos tienen evidencia sólida. El resto es opcional.',
    content: ['<strong>Creatina monohidrato (3–5g/día):</strong> El suplemento más estudiado y efectivo. Mejora fuerza, potencia explosiva y masa muscular. No necesita carga. Tómala diariamente sin importar el horario.', '<strong>Proteína en polvo (whey):</strong> Práctica para alcanzar la ingesta proteica cuando la comida real no alcanza. Es simplemente proteína de rápida absorción — completamente opcional.', '<strong>Vitamina D3 (1000–2000 UI/día):</strong> La mayoría tenemos deficiencia. Impacta rendimiento muscular, inmunidad y testosterona.', '<strong>Omega-3 (1–3g EPA+DHA/día):</strong> Antiinflamatorio, mejora recuperación. Especialmente útil si no consumes pescado azul 2–3 veces/semana.'] },
];

// ── STATE ─────────────────────────────────────────────────────────────────────

let _activeTab    = 'plan';
let _openFundId   = null;
let _trainingHour = parseInt(localStorage.getItem('sv_nut_train_hour') || '17');

// ── TIME HELPER ───────────────────────────────────────────────────────────────

function _fmt(hour) {
  const total = Math.round(hour * 60);
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

// ── GENERATOR ─────────────────────────────────────────────────────────────────

function _generatePlan(meta) {
  const objetivo = meta?.objetivo || 'general';
  const nivel    = meta?.nivel    || 'beginner';
  const duracion = meta?.duracion || 60;

  const sessions = getPlan();
  const nextSes  = sessions.find(s => !isDone(s.id)) || null;
  const allDone  = sessions.length > 0 && sessions.every(s => isDone(s.id));

  const hydKey    = duracion <= 45 ? 45 : duracion >= 90 ? 90 : duracion >= 75 ? 75 : 60;
  const sesNut    = nextSes ? (SESSION_NUTRITION[nextSes.type] || SESSION_NUTRITION.F) : null;
  const carbLevel = sesNut ? (CARB_LEVEL[objetivo]?.[sesNut.intensity] || '') : '';

  return {
    objetivo, nivel, hasMeta: !!meta, allDone,
    nextSes, sesNut, carbLevel, duracion,
    protein:   PROTEIN_RANGES[objetivo]?.[nivel] || '1.6–2.0',
    caloric:   CALORIC_APPROACH[objetivo]        || CALORIC_APPROACH.general,
    restMeals: REST_MEALS[objetivo]              || REST_MEALS.general,
    hydration: HYDRATION_BY_DURATION[hydKey],
  };
}

// ── SCHEDULE BUILDER ──────────────────────────────────────────────────────────

function _buildSchedule(trainingHour, duracionMin, objetivo, sesNut) {
  const durH   = (duracionMin || 60) / 60;
  const preOff = sesNut?.pre.preOffset || 1.25;
  const wakeH  = Math.max(5, trainingHour - 4.5);
  const preH   = trainingHour - preOff;
  const postH  = trainingHour + durH + 0.5;  // 30 min after session ends
  const dinnerH = Math.min(21.5, postH + 2);
  const lastH   = Math.min(22.5, dinnerH + 1.5);

  // Show midmorning only if there's a 2.5h+ gap between wake and pre
  const showMid    = (preH - wakeH) >= 2.5;
  // Show lunch slot only if there's a long enough gap between midmorning and pre
  const midH       = wakeH + 2;
  const showLunch  = showMid && (preH - midH) >= 2.5;
  // Last meal: not for weight_loss
  const showLast   = objetivo !== 'weight_loss';

  return [
    { id: 'wake',       time: _fmt(wakeH),        type: 'normal' },
    showMid   && { id: 'midmorning', time: _fmt(wakeH + 2),    type: 'normal' },
    showLunch && { id: 'lunch',      time: _fmt(midH + 2.5),   type: 'normal' },
    { id: 'pre',        time: _fmt(preH),          type: 'pre' },
    { id: 'training',   time: _fmt(trainingHour),  type: 'training', duracion: duracionMin },
    { id: 'post',       time: _fmt(postH),          type: 'post' },
    { id: 'dinner',     time: _fmt(dinnerH),        type: 'normal' },
    showLast  && { id: 'lastmeal',  time: _fmt(lastH),         type: 'last' },
  ].filter(Boolean);
}

// ── RENDER: TIMELINE ──────────────────────────────────────────────────────────

function _renderTimeline(plan) {
  const { objetivo, sesNut, carbLevel, nextSes, hydration, duracion } = plan;
  const schedule = _buildSchedule(_trainingHour, duracion, objetivo, sesNut);

  const items = schedule.map(slot => {
    // TRAINING BLOCK
    if (slot.id === 'training') {
      const sesNum  = nextSes ? String(nextSes.id).padStart(2, '0') : '—';
      const sesName = nextSes ? (nextSes.name.split('—')[1]?.trim() || nextSes.name) : 'Entrenamiento';
      const label   = sesNut ? sesNut.label : '';
      return `
        <div class="nut-tl-item nut-tl-item--training">
          <div class="nut-tl-time">${slot.time}</div>
          <div class="nut-tl-line"></div>
          <div class="nut-tl-dot nut-tl-dot--training"></div>
          <div class="nut-tl-training">
            <div class="nut-tl-training-tag"><i class="ti ti-dumbbell"></i> Entrenamiento</div>
            ${nextSes ? `<div class="nut-tl-training-name">Sesión ${sesNum} — ${sesName}</div>` : ''}
            <div class="nut-tl-training-meta">${label}${duracion ? ` · ${duracion} min` : ''}</div>
            <div class="nut-tl-training-water">
              <i class="ti ti-droplets"></i>
              ${hydration.during} &nbsp;·&nbsp; ${hydration.before}
              ${sesNut?.hydration.note ? `<br><span class="nut-tl-water-note">${sesNut.hydration.note}</span>` : ''}
            </div>
          </div>
        </div>`;
    }

    // PRE-WORKOUT
    if (slot.id === 'pre') {
      if (!sesNut) return '';
      return `
        <div class="nut-tl-item nut-tl-item--pre">
          <div class="nut-tl-time">${slot.time}</div>
          <div class="nut-tl-line"></div>
          <div class="nut-tl-dot"></div>
          <div class="nut-tl-card nut-tl-card--pre">
            <div class="nut-tl-card-header">
              <span class="nut-tl-card-label">Pre-Entreno</span>
              <span class="nut-tl-badge nut-tl-badge--pre">${sesNut.pre.timing}</span>
            </div>
            <p class="nut-tl-focus">${sesNut.pre.focus}</p>
            <ul class="nut-meal-items">${sesNut.pre.foods.map(f => `<li>${f}</li>`).join('')}</ul>
            ${carbLevel ? `<div class="nut-carb-chip"><i class="ti ti-wheat"></i> Carbohidratos hoy: <strong>${carbLevel}</strong></div>` : ''}
          </div>
        </div>`;
    }

    // POST-WORKOUT
    if (slot.id === 'post') {
      if (!sesNut) return '';
      return `
        <div class="nut-tl-item nut-tl-item--post">
          <div class="nut-tl-time">${slot.time}</div>
          <div class="nut-tl-line"></div>
          <div class="nut-tl-dot"></div>
          <div class="nut-tl-card nut-tl-card--post">
            <div class="nut-tl-card-header">
              <span class="nut-tl-card-label">Post-Entreno</span>
              <span class="nut-tl-badge nut-tl-badge--post">${sesNut.post.timing}</span>
            </div>
            <p class="nut-tl-focus">${sesNut.post.focus}</p>
            <div class="nut-protein-chip"><i class="ti ti-meat"></i> <strong>${sesNut.post.protein}</strong></div>
            <ul class="nut-meal-items">${sesNut.post.foods.map(f => `<li>${f}</li>`).join('')}</ul>
          </div>
        </div>`;
    }

    // NORMAL / LAST MEAL
    const c = MEAL_CONTENT[slot.id]?.[objetivo];
    if (!c) return '';

    const isLast   = slot.id === 'lastmeal';
    const dotClass = isLast ? ' nut-tl-dot--last' : '';

    return `
      <div class="nut-tl-item nut-tl-item--${slot.type}">
        <div class="nut-tl-time">${slot.time}</div>
        <div class="nut-tl-line"></div>
        <div class="nut-tl-dot${dotClass}"></div>
        <div class="nut-tl-card${isLast ? ' nut-tl-card--last' : ''}">
          <div class="nut-tl-card-header">
            <span class="nut-tl-card-label">${c.label}</span>
            ${c.sublabel ? `<span class="nut-tl-sublabel">${c.sublabel}</span>` : ''}
          </div>
          <p class="nut-tl-focus">${c.note}</p>
          <ul class="nut-meal-items">${c.foods.map(f => `<li>${f}</li>`).join('')}</ul>
          <div class="nut-tl-footer">
            <div class="nut-tl-macro">${c.macro}</div>
            ${c.water ? `<div class="nut-tl-water"><i class="ti ti-droplets"></i> ${c.water}</div>` : ''}
          </div>
        </div>
      </div>`;
  }).join('');

  return `<div class="nut-timeline">${items}</div>`;
}

// ── RENDER: MI PLAN ───────────────────────────────────────────────────────────

function _renderPlan(plan) {
  const h  = plan.hydration;
  const rm = plan.restMeals;

  const noMeta = plan.hasMeta ? '' : `
    <div class="nut-no-meta">
      <i class="ti ti-info-circle"></i>
      Plan genérico activo. Inicia un <strong>Nuevo Ciclo</strong> para personalizar los macros según tu objetivo real.
    </div>`;

  // Training time selector
  const selector = `
    <div class="nut-train-selector">
      <div class="nut-train-selector-label"><i class="ti ti-clock"></i> ¿A qué hora entrenas?</div>
      <div class="nut-train-chips">
        ${TRAINING_HOURS.map(opt =>
          `<button class="nut-train-chip${_trainingHour === opt.hour ? ' nut-train-chip--active' : ''}" onclick="nutSetTrainingHour(${opt.hour})">${opt.label}</button>`
        ).join('')}
      </div>
    </div>`;

  // Compact next session header
  const sesHeader = plan.nextSes && plan.sesNut ? `
    <div class="nut-ses-header" style="border-color:${plan.sesNut.color}33">
      <span class="nut-ses-header-label">Próxima sesión</span>
      <span class="nut-ses-header-name">Sesión ${String(plan.nextSes.id).padStart(2, '0')} — ${plan.nextSes.name.split('—')[1]?.trim() || plan.nextSes.name}</span>
      <span class="nut-ses-type-chip" style="color:${plan.sesNut.color};background:${plan.sesNut.color}14;border-color:${plan.sesNut.color}44">${plan.sesNut.label}</span>
    </div>` : '';

  // Timeline title
  const tlTitle = `
    <div class="nut-tl-day-title">
      <i class="ti ti-calendar-event"></i> Horario del día de entrenamiento
    </div>`;

  // Macros base (compact)
  const macros = `
    <div class="nut-macros-base">
      <div class="nut-macros-base-title">Macros diarios · ${OBJETIVO_LABELS[plan.objetivo] || plan.objetivo} · ${NIVEL_LABELS[plan.nivel] || plan.nivel}</div>
      <div class="nut-macros-row">
        <div class="nut-macro-card">
          <div class="nut-macro-icon" style="color:var(--accent)"><i class="ti ti-meat"></i></div>
          <div class="nut-macro-val">${plan.protein}</div>
          <div class="nut-macro-unit">g/kg/día</div>
          <div class="nut-macro-label">Proteína</div>
          <button class="nut-fund-link" onclick="nutGoFund('proteinas')">¿Por qué? →</button>
        </div>
        <div class="nut-macro-card">
          <div class="nut-macro-icon" style="color:${plan.caloric.color}"><i class="ti ti-flame"></i></div>
          <div class="nut-macro-val" style="color:${plan.caloric.color};font-size:.85rem">${plan.caloric.label}</div>
          <div class="nut-macro-unit">${plan.caloric.detail}</div>
          <div class="nut-macro-label">Calorías</div>
          <button class="nut-fund-link" onclick="nutGoFund('carbohidratos')">¿Por qué? →</button>
        </div>
        <div class="nut-macro-card">
          <div class="nut-macro-icon" style="color:var(--cyan)"><i class="ti ti-droplets"></i></div>
          <div class="nut-macro-val">${h.liters}</div>
          <div class="nut-macro-unit">L/día total</div>
          <div class="nut-macro-label">Agua</div>
          <button class="nut-fund-link" onclick="nutGoFund('hidratacion')">¿Por qué? →</button>
        </div>
      </div>
    </div>`;

  // Rest day
  const restDay = `
    <div class="nut-day-block nut-day-block--rest">
      <div class="nut-day-header nut-day-header--rest">
        <i class="ti ti-moon"></i> Día de Descanso
        <span class="nut-rest-note-badge">siempre aplica</span>
      </div>
      <p class="nut-rest-note">${rm.note}</p>
      <div class="nut-rest-grid">
        ${rm.examples.map(e => `<div class="nut-rest-item"><i class="ti ti-check"></i> ${e}</div>`).join('')}
      </div>
    </div>`;

  if (plan.allDone) {
    return `${noMeta}
      <div class="nut-all-done-card">
        <div class="nut-all-done-icon"><i class="ti ti-trophy"></i></div>
        <div class="nut-all-done-title">¡Completaste todas las sesiones del ciclo!</div>
        <div class="nut-all-done-sub">Descansa, recupera y considera iniciar un Nuevo Ciclo para continuar progresando.</div>
      </div>
      ${macros}${restDay}`;
  }

  return `${noMeta}${selector}${sesHeader}${tlTitle}${_renderTimeline(plan)}${macros}${restDay}`;
}

// ── RENDER: FUNDAMENTOS ───────────────────────────────────────────────────────

function _renderFundamentos(objetivo) {
  return FUNDAMENTOS.map(f => {
    const isRelevant = f.relevantFor.includes(objetivo);
    const isOpen     = f.id === _openFundId;
    return `
      <div class="nut-fund-card${isOpen ? ' nut-fund-card--open' : ''}" id="fund-${f.id}">
        <button class="nut-fund-hdr" onclick="nutToggleFund('${f.id}')">
          <span class="nut-fund-ico"><i class="ti ${f.icon}"></i></span>
          <span class="nut-fund-ttl">${f.title}</span>
          ${isRelevant ? `<span class="nut-fund-badge">★ Clave</span>` : ''}
          <i class="ti ${isOpen ? 'ti-chevron-up' : 'ti-chevron-down'} nut-fund-chevron"></i>
        </button>
        <div class="nut-fund-summary">${f.summary}</div>
        ${isOpen ? `<div class="nut-fund-body">${f.content.map(p => `<p>${p}</p>`).join('')}</div>` : ''}
      </div>`;
  }).join('');
}

// ── BUILD ─────────────────────────────────────────────────────────────────────

function _build() {
  const meta = getPlanMeta();
  const plan = _generatePlan(meta);

  document.getElementById('nutritionContent').innerHTML = `
    <div class="nut-tabs">
      <button class="nut-tab${_activeTab === 'plan' ? ' nut-tab--active' : ''}" onclick="nutSetTab('plan')">
        <i class="ti ti-list-check"></i> Mi Plan
      </button>
      <button class="nut-tab${_activeTab === 'fundamentos' ? ' nut-tab--active' : ''}" onclick="nutSetTab('fundamentos')">
        <i class="ti ti-book-2"></i> Fundamentos
      </button>
    </div>
    <div id="nut-plan"        style="${_activeTab === 'plan'        ? '' : 'display:none'}">${_renderPlan(plan)}</div>
    <div id="nut-fundamentos" style="${_activeTab === 'fundamentos' ? '' : 'display:none'}">${_renderFundamentos(plan.objetivo)}</div>
  `;
}

// ── PUBLIC API ────────────────────────────────────────────────────────────────

export function showNutritionPage() {
  _activeTab = 'plan'; _openFundId = null;
  document.getElementById('nutritionPage').classList.add('open');
  _build();
}

export function hideNutritionPage() {
  document.getElementById('nutritionPage').classList.remove('open');
}

export function nutSetTab(tab) { _activeTab = tab; _build(); }

export function nutGoFund(fundId) {
  _activeTab = 'fundamentos'; _openFundId = fundId;
  _build();
  setTimeout(() => document.getElementById(`fund-${fundId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
}

export function nutToggleFund(fundId) {
  _openFundId = _openFundId === fundId ? null : fundId;
  const { objetivo } = _generatePlan(getPlanMeta());
  document.getElementById('nut-fundamentos').innerHTML = _renderFundamentos(objetivo);
}

export function nutSetTrainingHour(hour) {
  _trainingHour = hour;
  try { localStorage.setItem('sv_nut_train_hour', hour); } catch(e) {}
  _build();
}
