// ===== NUTRICIÓN =====
// Horario completo del día basado en la hora de entrenamiento elegida por el usuario.
// Calcula automáticamente los tiempos de cada comida, ajusta contenido al objetivo
// y al tipo de sesión (piernas, pecho, espalda, etc.).
// Tab "Fundamentos": tarjetas acordeón educativas.

import { getPlanMeta, getPlan, isDone, getLastCompletedToday } from './state.js';

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

// ── RECIPES ───────────────────────────────────────────────────────────────────

const RECIPES = {
  wake: [
    { name: 'Avena proteica con plátano', time: '5 min', servings: 1,
      ingredients: ['80g avena en hojuelas', '250ml leche o bebida vegetal', '1 plátano maduro', '1 scoop proteína en polvo (opcional)', '1 cdta miel', 'Canela al gusto'],
      steps: ['Calienta la leche con la avena 2-3 min a fuego medio, revolviendo constantemente.', 'Retira del fuego, mezcla la proteína en polvo y la miel hasta disolver.', 'Sirve en bowl con el plátano en rodajas y espolvorea canela.'] },
    { name: 'Revuelto de claras con tostada integral', time: '7 min', servings: 1,
      ingredients: ['5 claras de huevo + 1 yema', '2 rebanadas de pan integral', '1 tomate pequeño', 'Sal, pimienta y orégano', '1 cdta aceite de oliva'],
      steps: ['Bate las claras con la yema, sal y pimienta.', 'Calienta el aceite en sartén antiadherente a fuego medio. Vierte los huevos y revuelve suavemente hasta cuajar (2-3 min).', 'Tuesta el pan. Sirve el revuelto con tomate en rodajas y espolvorea orégano.'] },
  ],
  midmorning: [
    { name: 'Bowl de yogur griego con granola', time: '2 min', servings: 1,
      ingredients: ['200g yogur griego natural', '30g granola sin azúcar añadida', '1 puñado fresas o arándanos', '1 cdta miel'],
      steps: ['Vierte el yogur en un bowl amplio.', 'Distribuye la granola y las frutas por encima.', 'Termina con la miel. Consume de inmediato para que la granola no se ablande.'] },
    { name: 'Tostada con atún y aguacate', time: '5 min', servings: 1,
      ingredients: ['2 rebanadas pan integral', '1 lata pequeña de atún en agua', '½ aguacate maduro', 'Jugo de ½ limón', 'Sal, pimienta y tomates cherry (opcional)'],
      steps: ['Tuesta el pan al punto deseado.', 'Aplasta el aguacate con el limón, sal y pimienta hasta obtener una pasta.', 'Escurre bien el atún. Unta el aguacate en las tostadas y coloca el atún encima. Añade tomatitos si deseas.'] },
  ],
  lunch: [
    { name: 'Arroz con pollo y vegetales salteados', time: '20 min', servings: 1,
      ingredients: ['150g arroz cocido', '180g pechuga de pollo', '1 taza brócoli + zanahoria', '2 dientes de ajo', 'Aceite de oliva, sal, pimienta, comino', 'Salsa de soja al gusto'],
      steps: ['Condimenta el pollo con ajo picado, sal, pimienta y comino. Cocina en sartén a fuego medio-alto, 6-8 min por lado.', 'En el mismo sartén, saltea los vegetales con un chorrito de aceite 4-5 min hasta tiernos.', 'Sirve el pollo en tiras sobre el arroz con los vegetales salteados. Añade soja al gusto.'] },
    { name: 'Bowl de lentejas con carne magra', time: '25 min', servings: 1,
      ingredients: ['150g lentejas cocidas', '150g carne molida o pollo picado', '½ cebolla', '1 tomate mediano', '1 diente de ajo', 'Comino, sal, pimentón ahumado'],
      steps: ['Sofríe la cebolla y el ajo picados en aceite de oliva a fuego medio, 3 min.', 'Agrega la carne y saltea hasta dorar bien, unos 5 min.', 'Incorpora el tomate picado y las lentejas cocidas. Condimenta con comino, sal y pimentón. Cocina 5 min más.'] },
  ],
  dinner: [
    { name: 'Salmón a la plancha con batata y brócoli', time: '20 min', servings: 1,
      ingredients: ['180g filete de salmón', '150g batata o boniato', '1 taza de brócoli', 'Jugo de ½ limón', 'Eneldo o perejil fresco', 'Aceite de oliva, sal, pimienta'],
      steps: ['Cocina la batata en microondas 8 min (o al horno 25 min a 200°C).', 'Cuece el brócoli al vapor 5 min (o microondas con un poco de agua, 3 min).', 'Sella el salmón en sartén con aceite, 3-4 min por lado. Exprime limón y espolvorea eneldo al servir.'] },
    { name: 'Pollo al horno con vegetales mediterráneos', time: '35 min', servings: 1,
      ingredients: ['200g pollo (muslo o pechuga)', '1 calabacín', '1 pimiento rojo', '½ berenjena', 'Ajo en polvo, orégano, paprika', 'Aceite de oliva, sal'],
      steps: ['Precalienta el horno a 200°C.', 'Corta los vegetales en trozos medianos. Coloca el pollo y los vegetales en bandeja para horno.', 'Condimenta todo con especias, sal y un chorrito de aceite. Hornea 30-35 min hasta que el pollo esté dorado y cocido.'] },
  ],
  lastmeal: [
    { name: 'Bowl de requesón con nueces y canela', time: '2 min', servings: 1,
      ingredients: ['200g requesón o cottage cheese', '15g nueces troceadas', '1 cdta miel', 'Canela molida al gusto'],
      steps: ['Sirve el requesón frío en un bowl.', 'Agrega las nueces troceadas por encima.', 'Termina con miel y una buena pizca de canela. Consume 30-60 min antes de dormir.'] },
    { name: 'Batido nocturno de caseína', time: '2 min', servings: 1,
      ingredients: ['250ml leche entera o semi', '1 scoop proteína en polvo (caseína o whey)', '1 cda mantequilla de maní natural'],
      steps: ['Vierte la leche en shaker o batidora.', 'Añade la proteína y la mantequilla de maní.', 'Agita o bate 30 seg hasta obtener mezcla homogénea. Bebe 30-60 min antes de dormir.'] },
  ],
  pre: [
    { name: 'Avena pre-entreno energética', time: '5 min', servings: 1,
      ingredients: ['80g avena en hojuelas', '200ml leche', '1 plátano maduro', '1 cda miel', '1 scoop proteína en polvo (opcional)'],
      steps: ['Cocina la avena con la leche 3 min en microondas o sartén a fuego medio.', 'Retira del fuego. Si usas proteína, mézclala ahora. Añade miel.', 'Sirve con el plátano en rodajas. Consume 60-90 min antes de entrenar.'] },
    { name: 'Arroz con pollo compacto', time: '15 min', servings: 1,
      ingredients: ['120g arroz blanco cocido', '150g pechuga de pollo', 'Ajo en polvo, sal, orégano', '1 cdta aceite de oliva'],
      steps: ['Sazona el pollo y cocina en sartén antiadherente 6-8 min por lado hasta dorado.', 'Corta en tiras y sirve sobre el arroz en bowl.', 'Añade un chorrito de aceite. Consume 60-90 min antes del entrenamiento.'] },
  ],
  post: [
    { name: 'Batido de recuperación rápido', time: '2 min', servings: 1,
      ingredients: ['250ml leche o bebida vegetal', '1 scoop proteína whey', '1 plátano maduro', '30g avena rápida o 1 cda miel'],
      steps: ['Coloca todos los ingredientes en la batidora.', 'Bate 30 seg hasta obtener mezcla homogénea.', 'Bebe dentro de los 30-45 min post-entrenamiento. Si no tienes batidora, usa shaker: proteína + leche + plátano aplastado.'] },
    { name: 'Arroz con carne post-entreno', time: '15 min', servings: 1,
      ingredients: ['150g arroz blanco cocido (absorción rápida)', '180g carne molida o pollo', 'Vegetales al gusto', 'Ajo, sal, salsa de soja'],
      steps: ['Saltea la carne con ajo picado en sartén a fuego medio-alto, 5-7 min.', 'Añade los vegetales y saltea 3 min más. Sazona con soja.', 'Mezcla con el arroz ya cocido. Come dentro de los 30-45 min post-entrenamiento.'] },
  ],
};

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
  const allDone  = sessions.length > 0 && sessions.every(s => isDone(s.id));

  // If a session was completed today, keep showing its nutrition for the rest of the day
  const todayId  = getLastCompletedToday();
  const todaySes = todayId ? sessions.find(s => s.id === todayId) : null;
  const doneToday = !!todaySes;
  const nextSes  = doneToday ? todaySes : (sessions.find(s => !isDone(s.id)) || null);

  const hydKey    = duracion <= 45 ? 45 : duracion >= 90 ? 90 : duracion >= 75 ? 75 : 60;
  const sesNut    = nextSes ? (SESSION_NUTRITION[nextSes.type] || SESSION_NUTRITION.F) : null;
  const carbLevel = sesNut ? (CARB_LEVEL[objetivo]?.[sesNut.intensity] || '') : '';

  return {
    objetivo, nivel, hasMeta: !!meta, allDone, doneToday,
    nextSes, sesNut, carbLevel, duracion,
    protein:   PROTEIN_RANGES[objetivo]?.[nivel] || '1.6–2.0',
    caloric:   CALORIC_APPROACH[objetivo]        || CALORIC_APPROACH.general,
    restMeals: REST_MEALS[objetivo]              || REST_MEALS.general,
    hydration: HYDRATION_BY_DURATION[hydKey],
  };
}

// ── SCHEDULE BUILDER ──────────────────────────────────────────────────────────

function _buildSchedule(trainingHour, duracionMin, objetivo, sesNut) {
  const durH    = (duracionMin || 60) / 60;
  const preOff  = sesNut?.pre.preOffset || 1.25;
  const wakeH   = Math.max(5, trainingHour - 4.5);
  const rawPreH = trainingHour - preOff;
  const postH   = trainingHour + durH + 0.5;

  // Early training: pre-workout would be before or too close to wake → combine into one
  const earlyTraining = rawPreH < wakeH + 0.3;
  const preH          = earlyTraining ? wakeH : rawPreH;

  // Pre-training optional meals
  const showMid   = !earlyTraining && (preH - wakeH) >= 2.5;
  const midH      = wakeH + 2;
  const showLunch = showMid && (preH - midH) >= 2.5;

  // Dinner: skip if training ended after 8:30pm (post-workout IS the last meal)
  const showDinner = postH < 20.5;
  const dinnerH    = showDinner ? Math.min(22, Math.max(postH + 1.5, 18)) : null;

  // Post-training filler meals: only when there is a big gap before dinner
  const postGap       = showDinner ? dinnerH - postH : 0;
  const showMidPost   = postGap >= 4;
  const midPostH      = showMidPost ? postH + 2 : null;
  const showLunchPost = postGap >= 6;
  const lunchPostH    = showLunchPost ? Math.min(dinnerH - 2.5, postH + 4.5) : null;

  // Last meal: not for weight_loss, and only if dinner is early enough
  const showLast = showDinner && objetivo !== 'weight_loss' && dinnerH <= 21;
  const lastH    = showLast ? Math.min(22.5, dinnerH + 1.5) : null;

  return [
    earlyTraining
      ? { id: 'pre',        time: _fmt(preH),          type: 'pre', earlyWake: true }
      : { id: 'wake',       time: _fmt(wakeH),          type: 'normal' },
    !earlyTraining && showMid      && { id: 'midmorning', time: _fmt(midH),       type: 'normal' },
    !earlyTraining && showLunch    && { id: 'lunch',      time: _fmt(midH + 2.5), type: 'normal' },
    !earlyTraining                 && { id: 'pre',        time: _fmt(preH),        type: 'pre' },
    { id: 'training',  time: _fmt(trainingHour), type: 'training', duracion: duracionMin },
    { id: 'post',      time: _fmt(postH),         type: 'post' },
    showMidPost   && { id: 'midpost',   time: _fmt(midPostH),   type: 'normal' },
    showLunchPost && { id: 'lunchpost', time: _fmt(lunchPostH), type: 'normal' },
    showDinner    && { id: 'dinner',    time: _fmt(dinnerH),    type: 'normal' },
    showLast      && { id: 'lastmeal',  time: _fmt(lastH),      type: 'last' },
  ].filter(Boolean);
}

// ── RENDER: TIMELINE ──────────────────────────────────────────────────────────

// midpost / lunchpost reuse the same MEAL_CONTENT keys
const _SLOT_CONTENT_MAP = { midpost: 'midmorning', lunchpost: 'lunch' };

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
      const earlyNote = slot.earlyWake
        ? `<p class="nut-tl-early-note"><i class="ti ti-sun"></i> Primera comida del día · actúa como pre-entreno</p>`
        : '';
      return `
        <div class="nut-tl-item nut-tl-item--pre">
          <div class="nut-tl-time">${slot.time}</div>
          <div class="nut-tl-line"></div>
          <div class="nut-tl-dot"></div>
          <div class="nut-tl-card nut-tl-card--pre">
            ${earlyNote}
            <div class="nut-tl-card-header">
              <button class="nut-tl-card-label nut-tl-card-label--btn" onclick="nutOpenRecipeModal('pre')">Pre-Entreno <i class="ti ti-chef-hat"></i></button>
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
              <button class="nut-tl-card-label nut-tl-card-label--btn" onclick="nutOpenRecipeModal('post')">Post-Entreno <i class="ti ti-chef-hat"></i></button>
              <span class="nut-tl-badge nut-tl-badge--post">${sesNut.post.timing}</span>
            </div>
            <p class="nut-tl-focus">${sesNut.post.focus}</p>
            <div class="nut-protein-chip"><i class="ti ti-meat"></i> <strong>${sesNut.post.protein}</strong></div>
            <ul class="nut-meal-items">${sesNut.post.foods.map(f => `<li>${f}</li>`).join('')}</ul>
          </div>
        </div>`;
    }

    // NORMAL / LAST MEAL (midpost / lunchpost → reuse midmorning / lunch content)
    const contentId = _SLOT_CONTENT_MAP[slot.id] || slot.id;
    const c = MEAL_CONTENT[contentId]?.[objetivo];
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
            <button class="nut-tl-card-label nut-tl-card-label--btn" onclick="nutOpenRecipeModal('${contentId}')">${c.label} <i class="ti ti-chef-hat"></i></button>
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
      <span class="nut-ses-header-label">${plan.doneToday ? 'Sesión de hoy' : 'Próxima sesión'}</span>
      <span class="nut-ses-header-name">Sesión ${String(plan.nextSes.id).padStart(2, '0')} — ${plan.nextSes.name.split('—')[1]?.trim() || plan.nextSes.name}</span>
      <span class="nut-ses-type-chip" style="color:${plan.sesNut.color};background:${plan.sesNut.color}14;border-color:${plan.sesNut.color}44">${plan.sesNut.label}</span>
      ${plan.doneToday ? `<span class="nut-ses-done-badge"><i class="ti ti-check"></i> Completada hoy</span>` : ''}
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

export function nutOpenRecipeModal(slotId) {
  const recipes = RECIPES[slotId];
  if (!recipes) return;

  const { objetivo } = _generatePlan(getPlanMeta());
  const mealLabel = MEAL_CONTENT[slotId]?.[objetivo]?.label
    || (slotId === 'pre' ? 'Pre-Entreno' : slotId === 'post' ? 'Post-Entreno' : slotId);

  document.getElementById('nutRecipeTitle').textContent = mealLabel;
  document.getElementById('nutRecipeCards').innerHTML = recipes.map((r, i) => `
    <div class="nut-recipe-card">
      <div class="nut-recipe-card-name">${r.name}</div>
      <div class="nut-recipe-meta">
        <span><i class="ti ti-clock"></i> ${r.time}</span>
        <span><i class="ti ti-bowl-spoon"></i> ${r.servings} porción</span>
      </div>
      <div class="nut-recipe-cols">
        <div class="nut-recipe-section">
          <div class="nut-recipe-section-title"><i class="ti ti-basket"></i> Ingredientes</div>
          <ul class="nut-recipe-list">${r.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
        </div>
        <div class="nut-recipe-section">
          <div class="nut-recipe-section-title"><i class="ti ti-list-numbers"></i> Preparación</div>
          <ol class="nut-recipe-steps">${r.steps.map(s => `<li>${s}</li>`).join('')}</ol>
        </div>
      </div>
    </div>
  `).join('<div class="nut-recipe-divider"></div>');

  document.getElementById('nutRecipeModal').style.display = 'flex';
}

export function nutCloseRecipeModal() {
  document.getElementById('nutRecipeModal').style.display = 'none';
}
