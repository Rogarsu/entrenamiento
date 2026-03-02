// ===== NUTRICIÓN =====
// Plan nutricional personalizado (basado en onboarding) + guía de fundamentos.
// Tab "Mi Plan": macros, comidas y timing adaptados al objetivo/nivel/duración.
// Tab "Fundamentos": tarjetas acordeón educativas vinculadas al plan.

import { getPlanMeta } from './state.js';

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

// ── PLAN DATA ─────────────────────────────────────────────────────────────────

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

const TRAINING_MEALS = {
  strength: {
    breakfast: {
      items: ['Avena con leche y plátano', 'Huevos revueltos (3–4)', 'Tostadas integrales con mantequilla de maní'],
      macro: 'Alto en carbohidratos y proteína',
    },
    pre: {
      timing: '60–90 min antes',
      items: ['Arroz con pollo o atún', 'Banana + mantequilla de maní', 'Pan integral con huevo'],
      macro: 'Carbohidratos de absorción media + proteína',
    },
    post: {
      timing: '30–45 min después',
      items: ['Batido de proteína con leche', 'Arroz con carne magra', 'Yogur griego + fruta'],
      macro: '30–40g de proteína + carbohidratos rápidos',
    },
    dinner: {
      items: ['Pechuga de pollo o pescado', 'Vegetales al vapor', 'Arroz o papa cocida'],
      macro: 'Proteína + carbohidratos moderados',
    },
  },
  hypertrophy: {
    breakfast: {
      items: ['Avena con proteína en polvo y fruta', 'Claras de huevo + 2 yemas', 'Tostada integral con aguacate'],
      macro: 'Carbohidratos + proteína, moderado en grasas',
    },
    pre: {
      timing: '60–90 min antes',
      items: ['Arroz + pechuga de pollo', 'Tortillas con huevo y avena', 'Banana + batido de proteína'],
      macro: 'Carbohidratos complejos + proteína',
    },
    post: {
      timing: '30–45 min después',
      items: ['Shake de proteína (whey)', 'Arroz con pollo o atún', 'Leche con plátano y proteína'],
      macro: '25–40g proteína + 40–80g carbohidratos',
    },
    dinner: {
      items: ['Carne magra o salmón', 'Vegetales variados salteados', 'Carbohidratos según hambre'],
      macro: 'Proteína alta, carbohidratos según saciedad',
    },
  },
  weight_loss: {
    breakfast: {
      items: ['Claras de huevo (4–5) + 1 yema', 'Avena con agua y canela', 'Frutas bajas en azúcar (fresas, arándanos)'],
      macro: 'Proteína alta, carbohidratos moderados',
    },
    pre: {
      timing: '45–60 min antes',
      items: ['Batata pequeña + pollo', 'Yogur bajo en grasa + fruta', 'Arroz integral + atún'],
      macro: 'Carbohidratos de absorción lenta + proteína',
    },
    post: {
      timing: '30 min después',
      items: ['Shake de proteína con agua', 'Pollo + vegetales al vapor', 'Atún con ensalada verde'],
      macro: '25–30g proteína, carbohidratos mínimos',
    },
    dinner: {
      items: ['Pescado o pollo a la plancha', 'Vegetales abundantes', 'Sin o mínimos carbohidratos'],
      macro: 'Proteína alta, muy bajo en carbohidratos',
    },
  },
  endurance: {
    breakfast: {
      items: ['Avena abundante con miel y plátano', 'Pan integral con mantequilla de maní', 'Jugo de naranja natural'],
      macro: 'Alto en carbohidratos, moderado en proteína',
    },
    pre: {
      timing: '90–120 min antes',
      items: ['Pasta o arroz con proteína ligera', 'Pan con mermelada y plátano', 'Avena + miel + proteína'],
      macro: 'Carbohidratos complejos predominantes',
    },
    post: {
      timing: '30 min después',
      items: ['Batido proteína + jugo o fruta', 'Arroz con atún', 'Banana + yogur griego'],
      macro: 'Reponer glucógeno + reparar tejido muscular',
    },
    dinner: {
      items: ['Pasta o arroz integral', 'Proteína magra (pollo, huevo)', 'Vegetales cocidos'],
      macro: 'Carbohidratos para recuperar glucógeno',
    },
  },
  general: {
    breakfast: {
      items: ['Huevos (2–3) con tostadas integrales', 'Avena con frutas y nueces', 'Yogur griego + granola'],
      macro: 'Equilibrado en macros',
    },
    pre: {
      timing: '60–90 min antes',
      items: ['Fruta + proteína ligera', 'Arroz + pollo', 'Tortillas con huevo y vegetales'],
      macro: 'Carbohidratos + proteína',
    },
    post: {
      timing: '30–60 min después',
      items: ['Batido de proteína', 'Yogur + fruta', 'Pollo + arroz'],
      macro: '20–30g proteína + carbohidratos moderados',
    },
    dinner: {
      items: ['Proteína magra variada', 'Vegetales abundantes', 'Carbohidratos según saciedad'],
      macro: 'Equilibrado, ligero en grasas',
    },
  },
};

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

const HYDRATION_BY_DURATION = {
  45: { liters: '2.5–3.0', during: '400–600 ml durante', before: '500 ml · 2h antes' },
  60: { liters: '3.0–3.5', during: '500–700 ml durante', before: '500 ml · 2h antes' },
  75: { liters: '3.0–3.5', during: '600–800 ml durante', before: '600 ml · 2h antes' },
  90: { liters: '3.5–4.0', during: '700–1000 ml durante', before: '600 ml · 2h antes' },
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

let _activeTab = 'plan';
let _openFundId = null;

// ── GENERATOR ─────────────────────────────────────────────────────────────────

function _generatePlan(meta) {
  const objetivo = meta?.objetivo || 'general';
  const nivel    = meta?.nivel    || 'beginner';
  const duracion = meta?.duracion || 60;

  const hydKey = duracion <= 45 ? 45 : duracion >= 90 ? 90 : duracion >= 75 ? 75 : 60;

  return {
    objetivo,
    nivel,
    hasMeta: !!meta,
    protein:       PROTEIN_RANGES[objetivo]?.[nivel] || '1.6–2.0',
    caloric:       CALORIC_APPROACH[objetivo]        || CALORIC_APPROACH.general,
    trainingMeals: TRAINING_MEALS[objetivo]          || TRAINING_MEALS.general,
    restMeals:     REST_MEALS[objetivo]              || REST_MEALS.general,
    hydration:     HYDRATION_BY_DURATION[hydKey],
  };
}

// ── RENDER: MI PLAN ───────────────────────────────────────────────────────────

function _renderPlan(plan) {
  const tm = plan.trainingMeals;
  const rm = plan.restMeals;
  const h  = plan.hydration;

  const noMetaNote = plan.hasMeta ? '' : `
    <div class="nut-no-meta">
      <i class="ti ti-info-circle"></i>
      Plan genérico activo. Completa el onboarding o inicia un <strong>Nuevo Ciclo</strong> para personalizar tu plan nutricional.
    </div>`;

  return `
    ${noMetaNote}
    <div class="nut-hero">
      <div class="nut-hero-meta">
        <span class="nut-hero-obj">${OBJETIVO_LABELS[plan.objetivo] || plan.objetivo}</span>
        <span class="nut-hero-lvl">${NIVEL_LABELS[plan.nivel] || plan.nivel}</span>
      </div>
      <p class="nut-hero-desc">Guía nutricional adaptada a tu objetivo y nivel. Úsala como base y ajusta según tu respuesta y contexto personal.</p>
    </div>

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
        <div class="nut-macro-val" style="color:${plan.caloric.color};font-size:.95rem">${plan.caloric.label}</div>
        <div class="nut-macro-unit">${plan.caloric.detail}</div>
        <div class="nut-macro-label">Calorías</div>
        <button class="nut-fund-link" onclick="nutGoFund('carbohidratos')">¿Por qué? →</button>
      </div>
      <div class="nut-macro-card">
        <div class="nut-macro-icon" style="color:var(--cyan)"><i class="ti ti-droplets"></i></div>
        <div class="nut-macro-val">${h.liters}</div>
        <div class="nut-macro-unit">litros / día</div>
        <div class="nut-macro-label">Hidratación</div>
        <button class="nut-fund-link" onclick="nutGoFund('hidratacion')">¿Por qué? →</button>
      </div>
    </div>

    <div class="nut-day-block">
      <div class="nut-day-header"><i class="ti ti-dumbbell"></i> Día de Entrenamiento</div>

      <div class="nut-meal">
        <div class="nut-meal-header">
          <span class="nut-meal-badge">Desayuno</span>
          <span class="nut-meal-macro">${tm.breakfast.macro}</span>
        </div>
        <ul class="nut-meal-items">${tm.breakfast.items.map(i => `<li>${i}</li>`).join('')}</ul>
      </div>

      <div class="nut-meal nut-meal--pre">
        <div class="nut-meal-header">
          <span class="nut-meal-badge nut-meal-badge--pre">Pre-entreno · ${tm.pre.timing}</span>
          <span class="nut-meal-macro">${tm.pre.macro}</span>
        </div>
        <ul class="nut-meal-items">${tm.pre.items.map(i => `<li>${i}</li>`).join('')}</ul>
        <button class="nut-fund-link nut-fund-link--block" onclick="nutGoFund('timing')">Ver timing nutricional →</button>
      </div>

      <div class="nut-meal nut-meal--post">
        <div class="nut-meal-header">
          <span class="nut-meal-badge nut-meal-badge--post">Post-entreno · ${tm.post.timing}</span>
          <span class="nut-meal-macro">${tm.post.macro}</span>
        </div>
        <ul class="nut-meal-items">${tm.post.items.map(i => `<li>${i}</li>`).join('')}</ul>
      </div>

      <div class="nut-meal">
        <div class="nut-meal-header">
          <span class="nut-meal-badge">Cena</span>
          <span class="nut-meal-macro">${tm.dinner.macro}</span>
        </div>
        <ul class="nut-meal-items">${tm.dinner.items.map(i => `<li>${i}</li>`).join('')}</ul>
      </div>

      <div class="nut-hydration-tip">
        <i class="ti ti-droplets"></i>
        <span><strong>${h.during}</strong> &nbsp;·&nbsp; <strong>${h.before}</strong></span>
      </div>
    </div>

    <div class="nut-day-block nut-day-block--rest">
      <div class="nut-day-header nut-day-header--rest"><i class="ti ti-moon"></i> Día de Descanso</div>
      <p class="nut-rest-note">${rm.note}</p>
      <div class="nut-rest-grid">
        ${rm.examples.map(e => `<div class="nut-rest-item"><i class="ti ti-check"></i> ${e}</div>`).join('')}
      </div>
    </div>

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

// ── BUILD (full page render) ──────────────────────────────────────────────────

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
