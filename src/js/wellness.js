import { state, getPlan } from './state.js';

// ─── Muscle group definitions ─────────────────────────────────────────────────
const MUSCLE_GROUPS = {
  quads:      { label: 'Cuádriceps',       icon: '🦵', keywords: ['cuádricep', 'cuadricep'] },
  glutes:     { label: 'Glúteo',           icon: '🍑', keywords: ['glúteo', 'gluteo'] },
  hamstrings: { label: 'Isquiotibiales',   icon: '🦵', keywords: ['isquiotibial'] },
  calves:     { label: 'Pantorrillas',     icon: '🦶', keywords: ['pantorrill'] },
  core:       { label: 'Core / Abdomen',   icon: '🧱', keywords: ['core', 'abdomin', 'oblicu', 'erector'] },
  chest:      { label: 'Pecho',            icon: '💪', keywords: ['pecho'] },
  back:       { label: 'Espalda / Dorsal', icon: '🔙', keywords: ['dorsal', 'espalda', 'romboid', 'trapecio'] },
  shoulder:   { label: 'Hombros',          icon: '🏋️', keywords: ['hombro', 'deltoid'] },
  biceps:     { label: 'Bíceps',           icon: '💪', keywords: ['bíceps', 'biceps'] },
  triceps:    { label: 'Tríceps',          icon: '💪', keywords: ['tríceps', 'triceps'] },
  forearms:   { label: 'Antebrazos',       icon: '🦾', keywords: ['antebrazo', 'muñeca', 'muneca'] },
};

// ─── Recommendations per muscle group ────────────────────────────────────────
const RECS = {
  quads: {
    stretches: [
      { name: 'Cuádriceps de pie', img: 'images/Cuádriceps de pie.jpg', dur: '30 seg c/pierna' },
    ],
    tip: 'Aplica hielo 10-15 min si hay inflamación reciente. Si es solo tensión, calor suave funciona mejor.',
    med2: '<strong>Ibuprofeno 400 mg</strong> después de una comida si el dolor limita tus movimientos.',
    med3: '<strong>Ibuprofeno 400–600 mg</strong> cada 8 h con alimentos, máximo 3 días. Si persiste o hay hinchazón notable, consulta un médico.',
  },
  glutes: {
    stretches: [
      { name: 'Paloma / Figura 4 (piriforme)', img: 'images/paloma_gluteo.webp', dur: '40 seg c/lado' },
      { name: 'Puente de glúteo suave', img: 'images/puentes de glúteo lentos.gif', dur: '10 reps lentas' },
    ],
    tip: 'Usa una pelota de tenis o foam roller bajo el glúteo para liberar tensión en el piriforme.',
    med2: '<strong>Ibuprofeno 400 mg</strong> post-comida si el dolor al sentarte es marcado.',
    med3: '<strong>Ibuprofeno 400–600 mg</strong> cada 8 h con comida, máx. 3 días. Si el dolor irradia hacia la pierna, consulta médico.',
  },
  hamstrings: {
    stretches: [
      { name: 'Isquiotibial con banda o toalla', img: 'images/Isquiotibial con banda o toalla.avif', dur: '30 seg c/pierna' },
    ],
    tip: 'No estires agresivamente si el dolor es agudo — llega hasta sentir tensión, no dolor. Calor suave antes de estirar.',
    med2: '<strong>Acetaminofén 500 mg</strong> o <strong>Ibuprofeno 400 mg</strong> post-comida según tolerancia.',
    med3: '<strong>Ibuprofeno 400–600 mg</strong> cada 8 h. Reposo de ejercicios de pierna 48–72 h. Si hay un punto muy localizado de dolor agudo (posible tirón), ve al médico.',
  },
  calves: {
    stretches: [
      { name: 'Pantorrilla contra pared', img: 'images/Pantorrilla contra pared.avif', dur: '30 seg c/lado' },
    ],
    tip: 'Masajea la pantorrilla con movimientos ascendentes (de tobillo hacia rodilla) para mejorar la circulación.',
    med2: '<strong>Acetaminofén 500 mg</strong> para el dolor. Crema de <strong>Diclofenaco</strong> aplicada localmente también ayuda.',
    med3: '<strong>Ibuprofeno 400 mg</strong> cada 8 h con comida. Si hay un punto muy duro y doloroso (posible contractura), consulta fisioterapeuta.',
  },
  core: {
    stretches: [
      { name: 'Gato-vaca en el suelo', img: 'images/Gato-vaca en el suelo.webp', dur: '10 reps lentas' },
      { name: 'Niño extendido', img: 'images/Niño extendido con brazos al frente.jpg', dur: '45 seg' },
      { name: 'Torsión espinal tumbado', img: 'images/Torsión espinal tumbado.png', dur: '30 seg c/lado' },
    ],
    tip: 'Caminar suavemente y acostarte en posición fetal (rodillas al pecho) ayuda con las agujetas abdominales.',
    med2: '<strong>Acetaminofén 500 mg</strong> suele ser suficiente para el dolor muscular de core.',
    med3: '<strong>Ibuprofeno 400 mg</strong> post-comida. Evita ejercicios de core por 48 h hasta que baje la inflamación.',
  },
  chest: {
    stretches: [
      { name: 'Apertura de pecho en marco de puerta', img: 'images/Apertura de pecho en marco de puerta.jpg', dur: '30 seg × 3' },
      { name: 'Aperturas de pecho con banda', img: 'images/aperturas de pecho con banda.gif', dur: '15 reps lentas' },
    ],
    tip: 'Duerme boca arriba con los brazos ligeramente abiertos. Aplica calor suave en el pectoral 15 min.',
    med2: '<strong>Ibuprofeno 400 mg</strong> post-comida si el dolor al respirar profundo o levantar los brazos es notable.',
    med3: '<strong>Ibuprofeno 400–600 mg</strong> cada 8 h. Si el dolor es muy agudo al respirar o toser, descarta otras causas con un médico.',
  },
  back: {
    stretches: [
      { name: 'Niño extendido con brazos al frente', img: 'images/Niño extendido con brazos al frente.jpg', dur: '45 seg' },
      { name: 'Gato-vaca en el suelo', img: 'images/Gato-vaca en el suelo.webp', dur: '10 reps lentas' },
      { name: 'Torsión espinal tumbado', img: 'images/Torsión espinal tumbado.png', dur: '30 seg c/lado' },
      { name: 'Estiramiento dorsal lateral', img: 'images/Estiramiento dorsal brazo en alto con inclinación lateral.avif', dur: '30 seg c/lado' },
    ],
    tip: 'Aplica calor (almohadilla o ducha caliente) 15–20 min para relajar la musculatura. Evita cargas pesadas 24–48 h.',
    med2: '<strong>Ibuprofeno 400 mg</strong> post-comida. También puedes usar <strong>gel de Diclofenaco 1%</strong> aplicado localmente 2–3 veces al día.',
    med3: '<strong>Ibuprofeno 400–600 mg</strong> cada 8 h + <strong>Diclofenaco gel</strong> tópico. Si hay dolor irradiado al brazo o pierna, o entumecimiento, consulta médico urgente.',
  },
  shoulder: {
    stretches: [
      { name: 'Cruce de brazo (deltoides)', img: 'images/Cruce de brazo deltoides anterior.gif', dur: '30 seg c/brazo' },
      { name: 'Rotación interna/externa de hombro', img: 'images/Rotación internaexterna de hombro.png', dur: '15 reps lentas' },
      { name: 'Movilidad de hombro — círculos', img: 'images/Movilidad de hombro círculos de brazo.gif', dur: '15 círculos c/dirección' },
    ],
    tip: 'Evita levantar el brazo por encima de la cabeza hasta que baje el dolor. Calor suave 10–15 min.',
    med2: '<strong>Ibuprofeno 400 mg</strong> post-comida. <strong>Gel de Diclofenaco</strong> aplicado en el hombro 2–3 veces al día.',
    med3: '<strong>Ibuprofeno 400–600 mg</strong> cada 8 h. Si el dolor es en un punto específico (manguito rotador) y no mejora en 3–4 días, consulta fisiatra.',
  },
  biceps: {
    stretches: [
      { name: 'Bíceps contra pared, palma arriba', img: 'images/Bíceps contra pared, palma arriba.jpg', dur: '30 seg c/brazo' },
    ],
    tip: 'Masajea el vientre muscular del bíceps con movimientos longitudinales. Evita cargar peso con el codo flexionado.',
    med2: '<strong>Acetaminofén 500 mg</strong> o <strong>Ibuprofeno 400 mg</strong> post-comida.',
    med3: '<strong>Ibuprofeno 400–600 mg</strong> cada 8 h. Reposo total de curl y ejercicios que flexionen el codo contra resistencia.',
  },
  triceps: {
    stretches: [
      { name: 'Tríceps sobre la cabeza', img: 'images/Tríceps sobre la cabeza.jpg', dur: '30 seg c/brazo' },
    ],
    tip: 'Aplica calor suave en la parte posterior del brazo. Evita extensiones de codo y fondos.',
    med2: '<strong>Acetaminofén 500 mg</strong> o <strong>Ibuprofeno 400 mg</strong> post-comida.',
    med3: '<strong>Ibuprofeno 400–600 mg</strong> cada 8 h. Evita press y fondos por 48–72 h.',
  },
  forearms: {
    stretches: [
      { name: 'Extensión de muñeca y antebrazo', img: 'images/Extensión de muñeca y antebrazo.jpg', dur: '30 seg c/lado' },
      { name: 'Extensión y flexión de muñeca', img: 'images/Extensión y flexión de muñeca.png', dur: '20 reps lentas' },
      { name: 'Estiramiento de antebrazo dorsal', img: 'images/Estiramiento de antebrazo dorsal.gif', dur: '30 seg c/lado' },
    ],
    tip: 'Usa una pelota de estrés para movilidad activa. Masajea el antebrazo con movimientos longitudinales.',
    med2: '<strong>Gel de Diclofenaco 1%</strong> aplicado localmente es muy efectivo para el antebrazo.',
    med3: '<strong>Ibuprofeno 400 mg</strong> + <strong>Diclofenaco gel</strong>. Si hay hormigueo en los dedos o muñeca, puede indicar túnel carpiano: consulta médico.',
  },
};

// ─── State ────────────────────────────────────────────────────────────────────
const _w = { step: 1, recentSessions: [], muscles: [], sore: [], severity: {} };

// ─── Helpers ──────────────────────────────────────────────────────────────────
function _muscleKey(str) {
  const s = str.toLowerCase();
  for (const [key, def] of Object.entries(MUSCLE_GROUPS)) {
    if (def.keywords.some(k => s.includes(k))) return key;
  }
  return null;
}

function _getRecentSessions(n = 3) {
  const sorted = [...state.logs].sort((a, b) => b.sessionId - a.sessionId);
  return sorted.slice(0, n).map(l => getPlan().find(s => s.id === l.sessionId)).filter(Boolean);
}

function _getMusclesFromSessions(sessions) {
  const keys = new Set();
  for (const s of sessions) {
    for (const m of (s.muscles || [])) {
      const k = _muscleKey(m);
      if (k) keys.add(k);
    }
  }
  return [...keys];
}

// ─── Step renderers ───────────────────────────────────────────────────────────
function _renderStep1() {
  const sessions = _getRecentSessions(3);
  const el = document.getElementById('wellnessContent');

  if (sessions.length === 0) {
    el.innerHTML = `
      <div class="wellness-step-title">🩺 ¿Cómo me siento?</div>
      <div class="wellness-empty">Completa al menos una sesión de entrenamiento para activar esta función.</div>`;
    return;
  }

  _w.recentSessions = sessions;
  _w.muscles = _getMusclesFromSessions(sessions);
  _w.sore = [];

  const sessionList = sessions.map(s => `<span class="wellness-session-tag">${s.name}</span>`).join('');
  const cards = _w.muscles.map(key => {
    const g = MUSCLE_GROUPS[key];
    return `
      <label class="wellness-muscle-card" id="wmc_${key}">
        <input type="checkbox" class="wellness-cb" value="${key}" onchange="_wToggle(this)">
        <span class="wellness-muscle-icon">${g.icon}</span>
        <span class="wellness-muscle-label">${g.label}</span>
      </label>`;
  }).join('');

  el.innerHTML = `
    <div class="wellness-step-title">🩺 ¿Cómo me siento?</div>
    <div class="wellness-step-sub">Basado en tus últimas ${sessions.length} sesión${sessions.length > 1 ? 'es' : ''} completada${sessions.length > 1 ? 's' : ''}:</div>
    <div class="wellness-session-list">${sessionList}</div>
    <div class="wellness-question">¿Tienes tensión o dolor en alguna de estas zonas?</div>
    <div class="wellness-muscle-grid">${cards}</div>
    <div class="wellness-actions">
      <button class="wellness-btn-primary" onclick="_wNext1()">Siguiente →</button>
    </div>`;
}

function _renderStep2() {
  const el = document.getElementById('wellnessContent');

  if (_w.sore.length === 0) {
    el.innerHTML = `
      <div class="wellness-step-title">✅ ¡Sin molestias!</div>
      <div class="wellness-empty">No seleccionaste ninguna zona con dolor.<br>Eso es una buena señal de recuperación.</div>
      <div class="wellness-actions">
        <button class="wellness-btn-secondary" onclick="_wBack()">← Volver</button>
        <button class="wellness-btn-primary" onclick="closeWellnessModal()">Cerrar</button>
      </div>`;
    return;
  }

  const rows = _w.sore.map(key => {
    const g = MUSCLE_GROUPS[key];
    const cur = _w.severity[key] || 0;
    const btns = [
      { n: 1, label: 'Leve',     cls: 'sev-1', desc: 'leve molestia' },
      { n: 2, label: 'Moderado', cls: 'sev-2', desc: 'limita movimiento' },
      { n: 3, label: 'Fuerte',   cls: 'sev-3', desc: 'dificulta el día' },
    ].map(b => `
      <button class="wellness-sev-btn ${b.cls}${cur === b.n ? ' active' : ''}"
        onclick="_wSeverity('${key}', ${b.n})" title="${b.desc}">
        ${b.n} — ${b.label}
      </button>`).join('');

    return `
      <div class="wellness-severity-row">
        <div class="wellness-sev-label">${g.icon} ${g.label}</div>
        <div class="wellness-sev-btns">${btns}</div>
      </div>`;
  }).join('');

  el.innerHTML = `
    <div class="wellness-step-title">Intensidad del dolor</div>
    <div class="wellness-step-sub">Indica qué tan intenso es en cada zona:</div>
    ${rows}
    <div class="wellness-actions">
      <button class="wellness-btn-secondary" onclick="_wBack()">← Volver</button>
      <button class="wellness-btn-primary" onclick="_wNext2()">Ver plan de recuperación →</button>
    </div>`;
}

function _renderStep3() {
  const el = document.getElementById('wellnessContent');
  const hasHigh = _w.sore.some(k => (_w.severity[k] || 1) >= 2);

  const cards = _w.sore.map(key => {
    const g = MUSCLE_GROUPS[key];
    const sev = _w.severity[key] || 1;
    const rec = RECS[key];
    if (!rec) return '';

    const sevBadge = sev === 1
      ? '<span class="sev-badge sev-1">Leve</span>'
      : sev === 2
        ? '<span class="sev-badge sev-2">Moderado</span>'
        : '<span class="sev-badge sev-3">Fuerte</span>';

    const stretches = rec.stretches.map(s => `
      <div class="wellness-stretch-item">
        ${s.img ? `<img src="${s.img}" class="wellness-stretch-img" alt="${s.name}">` : '<div class="wellness-stretch-img wellness-stretch-img-placeholder">🤸</div>'}
        <div class="wellness-stretch-info">
          <div class="wellness-stretch-name">${s.name}</div>
          <div class="wellness-stretch-dur">⏱ ${s.dur}</div>
        </div>
      </div>`).join('');

    const medHtml = sev >= 2 ? `
      <div class="wellness-med">
        <div class="wellness-med-title">💊 Analgésico sugerido</div>
        <div class="wellness-med-text">${sev === 2 ? rec.med2 : rec.med3}</div>
      </div>` : '';

    return `
      <div class="wellness-rec-card">
        <div class="wellness-rec-header">${g.icon} ${g.label} ${sevBadge}</div>
        <div class="wellness-tip">💡 ${rec.tip}</div>
        <div class="wellness-stretches-title">Estiramientos recomendados</div>
        <div class="wellness-stretches">${stretches}</div>
        ${medHtml}
      </div>`;
  }).join('');

  const disclaimer = hasHigh ? `
    <div class="wellness-disclaimer">
      ⚕️ <strong>Aviso:</strong> Las sugerencias de medicamentos son orientativas para el dolor muscular típico post-entrenamiento.
      Consulta siempre con un médico o farmacéutico antes de automedicarte, especialmente si tienes condiciones preexistentes,
      tomas otros medicamentos, o si el dolor no mejora en 3–5 días.
    </div>` : '';

  el.innerHTML = `
    <div class="wellness-step-title">📋 Plan de recuperación</div>
    ${cards}
    ${disclaimer}
    <div class="wellness-actions">
      <button class="wellness-btn-secondary" onclick="_wBack()">← Volver</button>
      <button class="wellness-btn-primary" onclick="closeWellnessModal()">✓ Listo</button>
    </div>`;
}

// ─── Internal handlers (on window for dynamic onclick) ────────────────────────
window._wToggle = function(cb) {
  const card = cb.closest('.wellness-muscle-card');
  if (cb.checked) {
    _w.sore.push(cb.value);
    card.classList.add('selected');
  } else {
    _w.sore = _w.sore.filter(k => k !== cb.value);
    card.classList.remove('selected');
    delete _w.severity[cb.value];
  }
};

window._wSeverity = function(key, n) {
  _w.severity[key] = n;
  _renderStep2();
};

window._wNext1 = function() { _w.step = 2; _renderStep2(); };
window._wNext2 = function() {
  for (const k of _w.sore) { if (!_w.severity[k]) _w.severity[k] = 1; }
  _w.step = 3;
  _renderStep3();
};
window._wBack = function() {
  _w.step = Math.max(1, _w.step - 1);
  if (_w.step === 1) _renderStep1();
  else _renderStep2();
};

// ─── Public API ───────────────────────────────────────────────────────────────
export function openWellnessCheck() {
  _w.step = 1;
  _w.sore = [];
  _w.severity = {};
  document.getElementById('wellnessModal').classList.add('open');
  _renderStep1();
}

export function closeWellnessModal() {
  document.getElementById('wellnessModal').classList.remove('open');
}
