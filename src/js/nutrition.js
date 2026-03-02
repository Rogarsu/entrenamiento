// ===== NUTRICIÓN =====
// Genera una guía nutricional dinámica basada en la próxima sesión incompleta del plan.
// Tab "Mi Plan": pre/post-entreno específico al tipo de sesión (piernas, pecho, etc.),
//               ajustado al objetivo del usuario. Día de descanso siempre visible.
// Tab "Fundamentos": tarjetas acordeón educativas vinculadas al plan.

import { getPlanMeta, getPlan, isDone } from './state.js';

// ── LABELS ────────────────────────────────────────────────────────────────────

const OBJETIVO_LABELS = {
  strength:    'Ganar fuerza',
  hypertrophy: 'Ganar músculo',
  weight_loss: 'Perder peso',
  endurance:   'Mejorar resistencia',
  general:     'Condición general',
};

const NIVEL_LABELS = {
  beginner:     'Principiante',
  intermediate: 'Intermedio',
  advanced:     'Avanzado',
};

// ── NUTRICIÓN POR TIPO DE SESIÓN ──────────────────────────────────────────────
// Qué comer ANTES y DESPUÉS según el músculo que se trabaja.

const SESSION_NUTRITION = {
  A: {
    label: 'Piernas',
    color: 'var(--accent)',
    pre: {
      timing: '90 min antes',
      focus: 'Día de mayor demanda energética del plan — los músculos más grandes requieren más glucógeno',
      foods: [
        'Arroz con pollo o carne magra',
        'Pasta con proteína ligera',
        'Avena + plátano + proteína en polvo',
        'Papa cocida + huevos revueltos',
      ],
    },
    post: {
      timing: '30–45 min después',
      focus: 'Mayor glucógeno quemado + mayor daño muscular de todo el plan — máxima reposición',
      protein: '35–45g proteína',
      foods: [
        'Arroz + carne magra o pollo',
        'Batata + proteína en polvo',
        'Pasta + atún',
        'Leche + plátano + proteína en polvo',
      ],
    },
    hydration: { level: 'Alta', note: 'Músculos más grandes → mayor temperatura corporal y sudoración' },
    intensity: 'high',
  },
  B: {
    label: 'Pecho / Tríceps',
    color: 'var(--cyan)',
    pre: {
      timing: '60–90 min antes',
      focus: 'Carbohidratos moderados + proteína para soportar series de empuje explosivo',
      foods: [
        'Arroz con atún o pollo',
        'Pan integral con huevo',
        'Avena + proteína en polvo',
        'Banana + mantequilla de maní',
      ],
    },
    post: {
      timing: '30–45 min después',
      focus: 'Proteína para reparar las fibras pectorales y el tríceps bajo carga',
      protein: '25–35g proteína',
      foods: [
        'Shake de proteína + arroz',
        'Pechuga + papa cocida',
        'Yogur griego + fruta',
        'Huevos + tostadas integrales',
      ],
    },
    hydration: { level: 'Moderada-alta', note: '' },
    intensity: 'medium',
  },
  C: {
    label: 'Espalda / Bíceps',
    color: 'var(--amber)',
    pre: {
      timing: '60–90 min antes',
      focus: 'La espalda es el grupo muscular más grande del tren superior — carbohidratos moderados-altos',
      foods: [
        'Arroz + pollo o carne',
        'Pan integral con mantequilla de maní',
        'Avena + clara de huevo',
        'Batata + atún',
      ],
    },
    post: {
      timing: '30–45 min después',
      focus: 'Proteína alta — la espalda tiene el mayor volumen muscular del tren superior',
      protein: '30–40g proteína',
      foods: [
        'Arroz + salmón o carne magra',
        'Batido de proteína + leche',
        'Pollo + vegetales + carbohidrato',
        'Requesón + fruta',
      ],
    },
    hydration: { level: 'Alta', note: 'Jalones y remos activan toda la cadena posterior — alta activación metabólica' },
    intensity: 'high',
  },
  D: {
    label: 'Hombros',
    color: 'var(--green)',
    pre: {
      timing: '60 min antes',
      focus: 'Carbohidratos moderados + proteína para el trabajo de deltoides y trapecio',
      foods: [
        'Arroz con proteína magra',
        'Pan integral con huevo',
        'Fruta + yogur griego',
        'Avena + leche',
      ],
    },
    post: {
      timing: '30–60 min después',
      focus: 'Proteína para reparar deltoides + carbohidratos de recuperación',
      protein: '20–30g proteína',
      foods: [
        'Shake de proteína',
        'Pollo + arroz',
        'Yogur griego + granola',
        'Huevos + tostadas integrales',
      ],
    },
    hydration: { level: 'Moderada', note: '' },
    intensity: 'medium',
  },
  E: {
    label: 'Cardio',
    color: 'var(--red)',
    pre: {
      timing: '90 min antes',
      focus: 'Carbohidratos altos — el cardio depende casi exclusivamente del glucógeno como combustible',
      foods: [
        'Avena con miel y plátano',
        'Pan integral con mermelada',
        'Arroz con proteína ligera',
        'Fruta + yogur griego',
      ],
    },
    post: {
      timing: '30 min después',
      focus: 'Reponer glucógeno rápidamente + algo de proteína para el tejido muscular',
      protein: '20–25g proteína + carbohidratos prioritarios',
      foods: [
        'Fruta + shake de proteína',
        'Arroz con atún',
        'Plátano + leche',
        'Jugo natural + proteína en polvo',
      ],
    },
    hydration: { level: 'Muy alta', note: 'Agrega electrolitos si la sesión dura más de 45 min — una pizca de sal en el agua ayuda' },
    intensity: 'high',
  },
  F: {
    label: 'Full Body',
    color: 'var(--accent)',
    pre: {
      timing: '90 min antes',
      focus: 'Full body activa todos los sistemas energéticos — necesitas carbohidratos altos y proteína',
      foods: [
        'Arroz + pollo o carne',
        'Pasta con proteína',
        'Avena + plátano + proteína en polvo',
        'Papa cocida + huevos',
      ],
    },
    post: {
      timing: '30–45 min después',
      focus: 'Todos los músculos necesitan recuperación simultánea — máxima reposición de nutrientes',
      protein: '35–45g proteína',
      foods: [
        'Arroz + carne magra',
        'Batido de proteína + leche + plátano',
        'Pasta + pollo',
        'Batata + salmón',
      ],
    },
    hydration: { level: 'Muy alta', note: 'Todo el cuerpo activo → máxima pérdida de líquido y electrolitos' },
    intensity: 'high',
  },
  G: {
    label: 'Deload',
    color: 'var(--text3)',
    pre: {
      timing: '60 min antes',
      focus: 'Semana de descarga — no requiere alta demanda calórica, come ligero y limpio',
      foods: [
        'Fruta + yogur griego',
        'Pan integral con huevo',
        'Avena ligera con leche',
        'Ensalada con proteína',
      ],
    },
    post: {
      timing: '30–60 min después',
      focus: 'Proteína moderada para mantener el músculo — carbohidratos mínimos',
      protein: '20–25g proteína',
      foods: [
        'Yogur griego + fruta',
        'Pollo + ensalada',
        'Shake de proteína ligero',
        'Huevos + vegetales al vapor',
      ],
    },
    hydration: { level: 'Normal', note: 'Semana de descarga — misma hidratación base diaria' },
    intensity: 'low',
  },
};

// ── CARBOHIDRATOS AJUSTADOS POR OBJETIVO + INTENSIDAD DE SESIÓN ───────────────

const CARB_LEVEL = {
  strength:    { high: '5–7g/kg hoy',                    medium: '4–5g/kg hoy',      low: '3–4g/kg hoy' },
  hypertrophy: { high: '4–6g/kg hoy',                    medium: '3–5g/kg hoy',      low: '2–3g/kg hoy' },
  weight_loss: { high: '3–4g/kg (prioriza proteína)',     medium: '2–3g/kg hoy',      low: '1.5–2g/kg hoy' },
  endurance:   { high: '6–8g/kg hoy',                    medium: '5–6g/kg hoy',      low: '4–5g/kg hoy' },
  general:     { high: '4–5g/kg hoy',                    medium: '3–4g/kg hoy',      low: '2–3g/kg hoy' },
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

// ── DÍA DE DESCANSO POR OBJETIVO ─────────────────────────────────────────────

const REST_MEALS = {
  strength: {
    note: 'Mantén la proteína igual. Reduce carbohidratos ~20–30%. Más vegetales y grasas saludables para apoyar la recuperación.',
    examples: ['Huevos + aguacate + ensalada', 'Salmón + brócoli al vapor', 'Pollo + vegetales salteados', 'Lentejas o garbanzos con verduras'],
  },
  hypertrophy: {
    note: 'Reducción leve de carbohidratos (−20%). Proteína igual o mayor. Más grasas saludables y vegetales.',
    examples: ['Salmón + vegetales + aguacate', 'Huevos con espinacas y queso', 'Pechuga + ensalada grande', 'Lentejas con carne magra'],
  },
  weight_loss: {
    note: 'Menor demanda calórica sin entreno. Maximiza vegetales, proteína alta y carbohidratos muy bajos.',
    examples: ['Ensalada grande con pollo o atún', 'Claras de huevo con vegetales', 'Sopa de verduras + proteína magra', 'Yogur griego con frutos rojos'],
  },
  endurance: {
    note: 'Carbohidratos moderados para recuperar glucógeno. Proteína normal para reparar el tejido muscular.',
    examples: ['Arroz integral + pollo', 'Pasta ligera + vegetales', 'Pan integral + huevos', 'Frutas + yogur griego'],
  },
  general: {
    note: 'Come limpio y nutritivo. Prioriza proteína, vegetales variados y carbohidratos moderados.',
    examples: ['Pollo + vegetales + poco arroz', 'Huevos + aguacate + tostadas', 'Pescado + ensalada', 'Legumbres + vegetales'],
  },
};

// ── FUNDAMENTOS ───────────────────────────────────────────────────────────────

const FUNDAMENTOS = [
  {
    id: 'proteinas',
    icon: 'ti-meat',
    title: 'Proteínas',
    relevantFor: ['strength', 'hypertrophy', 'weight_loss'],
    summary: 'El macronutriente más importante para el músculo.',
    content: [
      '<strong>¿Para qué?</strong> La proteína es el bloque constructor del tejido muscular. Después de entrenar, el músculo necesita aminoácidos para repararse y crecer. Sin proteína suficiente, no hay supercompensación.',
      '<strong>¿Cuánto?</strong> El rango óptimo es 1.6–2.4 g/kg de peso corporal al día, según objetivo y nivel. Más proteína no siempre es mejor: el exceso se oxidará como energía sin beneficio adicional.',
      '<strong>Fuentes de alta calidad:</strong> Pollo, huevo (especialmente claras), carne magra, pescado, yogur griego, requesón, leche, proteína en polvo (whey o caseína), legumbres.',
      '<strong>Distribución:</strong> Reparte la ingesta en 4–5 comidas con 25–40g de proteína cada una. Esto maximiza la síntesis proteica muscular mejor que concentrar toda la proteína en 1–2 comidas grandes.',
    ],
  },
  {
    id: 'carbohidratos',
    icon: 'ti-wheat',
    title: 'Carbohidratos',
    relevantFor: ['endurance', 'strength', 'hypertrophy'],
    summary: 'El combustible principal para el entrenamiento de alta intensidad.',
    content: [
      '<strong>¿Para qué?</strong> Los carbohidratos se almacenan como glucógeno en músculos e hígado. Es el combustible preferido del cuerpo para ejercicios de alta intensidad como levantar pesas o correr.',
      '<strong>Sin glucógeno suficiente:</strong> rendimiento reducido, mayor fatiga percibida, peor recuperación y menor adaptación al entrenamiento a largo plazo.',
      '<strong>Tipos:</strong> Complejos (arroz, avena, batata, quinoa, legumbres) → energía sostenida durante el día. Simples (fruta, miel, glucosa) → recuperación post-entreno rápida.',
      '<strong>Timing:</strong> Concentra los carbohidratos alrededor del entrenamiento (pre y post). En días de descanso, reduce la cantidad total según tu objetivo calórico.',
    ],
  },
  {
    id: 'grasas',
    icon: 'ti-droplet',
    title: 'Grasas saludables',
    relevantFor: ['general', 'endurance', 'weight_loss'],
    summary: 'Esenciales para hormonas, articulaciones y absorción de vitaminas.',
    content: [
      '<strong>¿Para qué?</strong> Las grasas son necesarias para producir testosterona, cortisol y otras hormonas anabólicas. También protegen las articulaciones y facilitan la absorción de vitaminas A, D, E y K.',
      '<strong>Fuentes:</strong> Aguacate, aceite de oliva extra virgen, nueces, almendras, maní, salmón, sardinas, huevos completos, aceitunas, semillas de chía y linaza.',
      '<strong>Omega-3:</strong> Propiedades antiinflamatorias que reducen el daño muscular post-entreno y mejoran la recuperación. Fuentes: salmón, atún, sardinas, nueces, chía, linaza.',
      '<strong>Evita:</strong> Grasas trans (comida ultra-procesada, margarinas industriales). Limita los aceites vegetales refinados (girasol, maíz, soya). Prefiere aceite de oliva para cocinar.',
    ],
  },
  {
    id: 'hidratacion',
    icon: 'ti-droplets',
    title: 'Hidratación',
    relevantFor: ['endurance', 'weight_loss', 'general', 'strength'],
    summary: 'Una pérdida del 2% de peso en agua reduce el rendimiento hasta un 20%.',
    content: [
      '<strong>Señal clave:</strong> El color de la orina indica tu estado de hidratación. Debe ser amarillo pálido. Oscura → toma agua. Transparente → bien hidratado.',
      '<strong>Durante el entreno:</strong> Bebe 150–250 ml cada 15–20 minutos de ejercicio. Para sesiones largas o con mucho calor, aumenta la cantidad y la frecuencia.',
      '<strong>Electrolitos:</strong> En sesiones de más de 60 min o con alta sudoración, repón sodio y potasio. Una pizca de sal en el agua o un plátano después ayuda significativamente.',
      '<strong>Alcohol:</strong> Interfiere directamente con la síntesis proteica y la recuperación muscular. Evítalo en las 24h posteriores a un entrenamiento intenso.',
    ],
  },
  {
    id: 'timing',
    icon: 'ti-clock',
    title: 'Timing nutricional',
    relevantFor: ['strength', 'hypertrophy'],
    summary: 'Cuándo comes importa casi tanto como qué comes.',
    content: [
      '<strong>Pre-entreno (60–90 min antes):</strong> Carbohidratos complejos + proteína moderada. Evita comidas muy grasosas o con mucha fibra — ralentizan la digestión y pueden causar malestar.',
      '<strong>Post-entreno (30–60 min después):</strong> 25–40g de proteína + carbohidratos de absorción media-rápida. Es el momento más crítico para la recuperación y el crecimiento muscular.',
      '<strong>Ventana anabólica:</strong> La síntesis proteica muscular está elevada por 24–48h después del entreno, con un pico en las primeras 2h. No necesitas correr a comer, pero no demores más de 2h.',
      '<strong>Distribución diaria:</strong> 4–5 comidas cada 3–4 horas es lo más efectivo para mantener la síntesis proteica elevada a lo largo del día.',
    ],
  },
  {
    id: 'suplementacion',
    icon: 'ti-pill',
    title: 'Suplementación básica',
    relevantFor: ['strength', 'hypertrophy'],
    summary: 'Solo 3–4 suplementos tienen evidencia sólida. El resto es opcional.',
    content: [
      '<strong>Creatina monohidrato (3–5g/día):</strong> El suplemento más estudiado y efectivo del mercado. Mejora fuerza, potencia explosiva y masa muscular. No necesita "carga". Tómala diariamente independiente del horario.',
      '<strong>Proteína en polvo (whey):</strong> Práctica para alcanzar tu ingesta proteica diaria cuando la comida real no alcanza. No es mágica — es simplemente proteína de rápida absorción. Completamente opcional si ya llegas con alimentos.',
      '<strong>Vitamina D3 (1000–2000 UI/día):</strong> La mayoría tiene deficiencia, especialmente con poca exposición solar. Impacta el rendimiento muscular, el sistema inmune y los niveles de testosterona.',
      '<strong>Omega-3 (1–3g EPA+DHA/día):</strong> Antiinflamatorio, mejora la recuperación y la sensibilidad a la insulina. Especialmente útil si no consumes pescado azul (salmón, sardinas, atún) 2–3 veces por semana.',
    ],
  },
];

// ── INTERNAL STATE ────────────────────────────────────────────────────────────

let _activeTab  = 'plan';
let _openFundId = null;

// ── GENERATOR ─────────────────────────────────────────────────────────────────

function _generatePlan(meta) {
  const objetivo = meta?.objetivo || 'general';
  const nivel    = meta?.nivel    || 'beginner';
  const duracion = meta?.duracion || 60;

  // Find next incomplete session in order
  const sessions = getPlan();
  const nextSes  = sessions.find(s => !isDone(s.id)) || null;
  const allDone  = sessions.length > 0 && sessions.every(s => isDone(s.id));

  const hydKey    = duracion <= 45 ? 45 : duracion >= 90 ? 90 : duracion >= 75 ? 75 : 60;
  const sesNut    = nextSes ? (SESSION_NUTRITION[nextSes.type] || SESSION_NUTRITION.F) : null;
  const carbLevel = sesNut ? (CARB_LEVEL[objetivo]?.[sesNut.intensity] || '') : '';

  return {
    objetivo, nivel, hasMeta: !!meta, allDone,
    nextSes, sesNut, carbLevel,
    protein:   PROTEIN_RANGES[objetivo]?.[nivel] || '1.6–2.0',
    caloric:   CALORIC_APPROACH[objetivo]        || CALORIC_APPROACH.general,
    restMeals: REST_MEALS[objetivo]              || REST_MEALS.general,
    hydration: HYDRATION_BY_DURATION[hydKey],
  };
}

// ── RENDER HELPERS ────────────────────────────────────────────────────────────

function _renderNextSession(plan) {
  const { nextSes, sesNut, carbLevel, hydration, objetivo } = plan;

  if (!nextSes || !sesNut) return '';

  const sesNum  = String(nextSes.id).padStart(2, '0');
  const sesName = nextSes.name.split('—')[1]?.trim() || nextSes.name;

  return `
    <div class="nut-next-card" style="border-color:${sesNut.color}22">
      <div class="nut-next-card-header" style="border-color:${sesNut.color}33">
        <div class="nut-next-label">Próxima sesión</div>
        <div class="nut-next-session-name">
          <span class="nut-next-num" style="color:${sesNut.color}">Sesión ${sesNum}</span>
          <span class="nut-next-title">${sesName}</span>
        </div>
        <div class="nut-next-badges">
          <span class="nut-type-badge" style="background:${sesNut.color}18;color:${sesNut.color};border-color:${sesNut.color}44">
            ${sesNut.label}
          </span>
          <span class="nut-type-badge" style="background:var(--bg);color:var(--text3);border-color:var(--border)">
            Fase ${nextSes.phase}
          </span>
          <span class="nut-type-badge" style="background:var(--bg);color:var(--text3);border-color:var(--border)">
            ${nextSes.intensity}
          </span>
        </div>
      </div>

      <!-- PRE-ENTRENO -->
      <div class="nut-section nut-section--pre">
        <div class="nut-section-header">
          <span class="nut-section-title nut-section-title--pre">Pre-Entreno</span>
          <span class="nut-section-timing">${sesNut.pre.timing}</span>
        </div>
        <p class="nut-section-focus">${sesNut.pre.focus}</p>
        <ul class="nut-meal-items">
          ${sesNut.pre.foods.map(f => `<li>${f}</li>`).join('')}
        </ul>
        ${carbLevel ? `<div class="nut-carb-chip"><i class="ti ti-wheat"></i> Carbohidratos: <strong>${carbLevel}</strong></div>` : ''}
        <button class="nut-fund-link nut-fund-link--block" onclick="nutGoFund('timing')">¿Por qué este timing? →</button>
      </div>

      <!-- POST-ENTRENO -->
      <div class="nut-section nut-section--post">
        <div class="nut-section-header">
          <span class="nut-section-title nut-section-title--post">Post-Entreno</span>
          <span class="nut-section-timing">${sesNut.post.timing}</span>
        </div>
        <p class="nut-section-focus">${sesNut.post.focus}</p>
        <div class="nut-protein-chip"><i class="ti ti-meat"></i> <strong>${sesNut.post.protein}</strong></div>
        <ul class="nut-meal-items">
          ${sesNut.post.foods.map(f => `<li>${f}</li>`).join('')}
        </ul>
        <button class="nut-fund-link nut-fund-link--block" onclick="nutGoFund('proteinas')">¿Por qué tanta proteína? →</button>
      </div>

      <!-- HIDRATACIÓN -->
      <div class="nut-section-hydration">
        <div class="nut-hydration-row">
          <i class="ti ti-droplets" style="color:var(--cyan)"></i>
          <div>
            <span class="nut-hydration-level">Hidratación ${sesNut.hydration.level}</span>
            <span class="nut-hydration-amounts">${hydration.during} &nbsp;·&nbsp; ${hydration.before}</span>
          </div>
        </div>
        ${sesNut.hydration.note ? `<p class="nut-hydration-note-text">${sesNut.hydration.note}</p>` : ''}
      </div>

      <!-- SUPLEMENTOS RÁPIDOS -->
      <div class="nut-supl-row">
        <i class="ti ti-pill" style="color:var(--text3)"></i>
        <span>¿Tomar creatina hoy? <strong>Sí</strong> — cualquier momento del día.</span>
        <button class="nut-fund-link" onclick="nutGoFund('suplementacion')" style="margin-top:0">Ver guía →</button>
      </div>
    </div>
  `;
}

function _renderAllDone() {
  return `
    <div class="nut-all-done-card">
      <div class="nut-all-done-icon"><i class="ti ti-trophy"></i></div>
      <div class="nut-all-done-title">¡Completaste todas las sesiones del ciclo!</div>
      <div class="nut-all-done-sub">Descansa, recupera y considera iniciar un Nuevo Ciclo para continuar progresando.</div>
    </div>
  `;
}

function _renderMacrosBase(plan) {
  const h = plan.hydration;
  return `
    <div class="nut-macros-base">
      <div class="nut-macros-base-title">Macros diarios base · ${OBJETIVO_LABELS[plan.objetivo] || plan.objetivo} · ${NIVEL_LABELS[plan.nivel] || plan.nivel}</div>
      <div class="nut-macros-row">
        <div class="nut-macro-card">
          <div class="nut-macro-icon" style="color:var(--accent)"><i class="ti ti-meat"></i></div>
          <div class="nut-macro-val">${plan.protein}</div>
          <div class="nut-macro-unit">g / kg / día</div>
          <div class="nut-macro-label">Proteína</div>
          <button class="nut-fund-link" onclick="nutGoFund('proteinas')">¿Por qué? →</button>
        </div>
        <div class="nut-macro-card">
          <div class="nut-macro-icon" style="color:${plan.caloric.color}"><i class="ti ti-flame"></i></div>
          <div class="nut-macro-val" style="color:${plan.caloric.color};font-size:.9rem">${plan.caloric.label}</div>
          <div class="nut-macro-unit">${plan.caloric.detail}</div>
          <div class="nut-macro-label">Calorías</div>
          <button class="nut-fund-link" onclick="nutGoFund('carbohidratos')">¿Por qué? →</button>
        </div>
        <div class="nut-macro-card">
          <div class="nut-macro-icon" style="color:var(--cyan)"><i class="ti ti-droplets"></i></div>
          <div class="nut-macro-val">${h.liters}</div>
          <div class="nut-macro-unit">litros / día</div>
          <div class="nut-macro-label">Agua total</div>
          <button class="nut-fund-link" onclick="nutGoFund('hidratacion')">¿Por qué? →</button>
        </div>
      </div>
    </div>
  `;
}

function _renderRestDay(restMeals) {
  return `
    <div class="nut-day-block nut-day-block--rest">
      <div class="nut-day-header nut-day-header--rest">
        <i class="ti ti-moon"></i> Día de Descanso
        <span class="nut-rest-note-badge">siempre aplica</span>
      </div>
      <p class="nut-rest-note">${restMeals.note}</p>
      <div class="nut-rest-grid">
        ${restMeals.examples.map(e => `<div class="nut-rest-item"><i class="ti ti-check"></i> ${e}</div>`).join('')}
      </div>
    </div>
  `;
}

// ── RENDER: MI PLAN ───────────────────────────────────────────────────────────

function _renderPlan(plan) {
  const noMetaNote = plan.hasMeta ? '' : `
    <div class="nut-no-meta">
      <i class="ti ti-info-circle"></i>
      Plan genérico activo. Completa el onboarding o inicia un <strong>Nuevo Ciclo</strong> para personalizar los macros y recomendaciones.
    </div>`;

  return `
    ${noMetaNote}
    ${plan.allDone ? _renderAllDone() : _renderNextSession(plan)}
    ${_renderMacrosBase(plan)}
    ${_renderRestDay(plan.restMeals)}
    <div class="nut-cta-supl">
      <i class="ti ti-pill"></i>
      <span>¿Qué suplementos valen la pena?</span>
      <button class="nut-fund-link" onclick="nutGoFund('suplementacion')">Ver guía →</button>
    </div>
  `;
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
      </div>
    `;
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
  _activeTab  = 'plan';
  _openFundId = null;
  document.getElementById('nutritionPage').classList.add('open');
  _build();
}

export function hideNutritionPage() {
  document.getElementById('nutritionPage').classList.remove('open');
}

export function nutSetTab(tab) {
  _activeTab = tab;
  _build();
}

export function nutGoFund(fundId) {
  _activeTab  = 'fundamentos';
  _openFundId = fundId;
  _build();
  setTimeout(() => {
    document.getElementById(`fund-${fundId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 50);
}

export function nutToggleFund(fundId) {
  _openFundId = _openFundId === fundId ? null : fundId;
  const meta       = getPlanMeta();
  const { objetivo } = _generatePlan(meta);
  document.getElementById('nut-fundamentos').innerHTML = _renderFundamentos(objetivo);
}
