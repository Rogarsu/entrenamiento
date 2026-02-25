// ===== ONBOARDING =====
// 7-step questionnaire shown to new users with no training plan.
// On completion, generates a plan via planner.js and saves it to Supabase.

import { generatePlan, generatePhasesMeta } from './planner.js';
import { setPlan } from './state.js';
import { upsertUserPlan } from './db.js';
import { getUserId } from './state.js';
import { buildStats } from './stats.js';
import { buildSidebar } from './sidebar.js';

// ─── QUESTIONS ───────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    key: 'objetivo',
    title: '¿Cuál es tu objetivo principal?',
    subtitle: 'Esto determinará la estructura y enfoque de tu plan.',
    options: [
      { value: 'strength',    label: 'Ganar fuerza',      icon: '🏋️', desc: 'Cargas altas, pocas reps' },
      { value: 'hypertrophy', label: 'Ganar músculo',     icon: '💪', desc: 'Volumen e hipertrofia' },
      { value: 'weight_loss', label: 'Perder peso',       icon: '🔥', desc: 'Más repeticiones y cardio' },
      { value: 'endurance',   label: 'Mejorar resistencia', icon: '🏃', desc: 'Circuitos y resistencia' },
      { value: 'general',     label: 'Condición general',  icon: '⚡', desc: 'Equilibrio completo' },
    ],
  },
  {
    key: 'nivel',
    title: '¿Cuál es tu nivel de experiencia?',
    subtitle: 'Sé honesto — es clave para evitar lesiones y progresar bien.',
    options: [
      { value: 'beginner',     label: 'Principiante',   icon: '🌱', desc: 'Menos de 1 año entrenando' },
      { value: 'intermediate', label: 'Intermedio',     icon: '📈', desc: '1-3 años de experiencia' },
      { value: 'advanced',     label: 'Avanzado',       icon: '🔥', desc: 'Más de 3 años, técnica sólida' },
    ],
  },
  {
    key: 'dias',
    title: '¿Cuántos días a la semana puedes entrenar?',
    subtitle: 'Considera tus compromisos reales, no los ideales.',
    options: [
      { value: 2, label: '2 días',  icon: '📅', desc: 'Mínimo, pero efectivo' },
      { value: 3, label: '3 días',  icon: '📅', desc: 'Recomendado para la mayoría' },
      { value: 4, label: '4 días',  icon: '📅', desc: 'Alta frecuencia' },
      { value: 5, label: '5 días',  icon: '📅', desc: 'Alto volumen semanal' },
    ],
  },
  {
    key: 'duracion',
    title: '¿Cuánto tiempo tienes por sesión?',
    subtitle: 'Incluye calentamiento y enfriamiento.',
    options: [
      { value: 45, label: '45 minutos',  icon: '⏱', desc: 'Sesiones cortas e intensas' },
      { value: 60, label: '60 minutos',  icon: '⏱', desc: 'Lo más común y equilibrado' },
      { value: 75, label: '75 minutos',  icon: '⏱', desc: 'Sesiones completas' },
      { value: 90, label: '90 minutos',  icon: '⏱', desc: 'Máximo volumen por sesión' },
    ],
  },
  {
    key: 'entorno',
    title: '¿Dónde entrenas habitualmente?',
    subtitle: 'Esto define los ejercicios disponibles en tu plan.',
    options: [
      { value: 'no_equipment', label: 'Sin equipamiento',  icon: '🏠', desc: 'Solo con el peso corporal' },
      { value: 'home',         label: 'Casa con equipo',   icon: '🏋️', desc: 'Mancuernas, bandas, banco' },
      { value: 'gym',          label: 'Gimnasio',          icon: '🏟️', desc: 'Acceso a máquinas y barras' },
    ],
  },
  {
    key: 'enfoque',
    title: '¿Qué tipo de división de entrenamiento prefieres?',
    subtitle: 'Si no estás seguro, elige Full Body — es el más versátil.',
    options: [
      { value: 'full_body',       label: 'Full Body',          icon: '🔄', desc: 'Todo el cuerpo por sesión' },
      { value: 'upper_lower',     label: 'Superior / Inferior', icon: '↕️', desc: 'Tren superior vs inferior' },
      { value: 'push_pull_legs',  label: 'Push / Pull / Legs',  icon: '🔁', desc: 'Empuje, jalón y piernas' },
    ],
  },
  {
    key: 'semanas',
    title: '¿Cuántas semanas quieres que dure tu plan?',
    subtitle: 'Puedes regenerar el plan cuando termines.',
    options: [
      { value: 4,  label: '4 semanas',  icon: '📆', desc: 'Plan corto e intenso' },
      { value: 8,  label: '8 semanas',  icon: '📆', desc: 'El más equilibrado' },
      { value: 12, label: '12 semanas', icon: '📆', desc: 'Plan completo por fases' },
    ],
  },
];

// ─── STATE ───────────────────────────────────────────────────────────────────

const _ob = {
  step: 0,
  answers: {},
};

// ─── RENDER ──────────────────────────────────────────────────────────────────

function _render() {
  const q = QUESTIONS[_ob.step];
  const el = document.getElementById('onboardingContent');
  const progress = _ob.step + 1;
  const total = QUESTIONS.length;

  const optionsHtml = q.options.map(opt => {
    const selected = _ob.answers[q.key] === opt.value ? ' selected' : '';
    // Use single quotes for string values to avoid breaking the double-quoted onclick attribute
    const valArg = typeof opt.value === 'string' ? `'${opt.value}'` : opt.value;
    return `
      <button class="ob-option${selected}" onclick="_obSelect('${q.key}', ${valArg})">
        <span class="ob-option-icon">${opt.icon}</span>
        <span class="ob-option-label">${opt.label}</span>
        <span class="ob-option-desc">${opt.desc}</span>
      </button>`;
  }).join('');

  const canNext = _ob.answers[q.key] !== undefined;

  el.innerHTML = `
    <div class="ob-progress-bar">
      <div class="ob-progress-fill" style="width:${(progress / total) * 100}%"></div>
    </div>
    <div class="ob-step-counter">${progress} / ${total}</div>
    <div class="ob-title">${q.title}</div>
    <div class="ob-subtitle">${q.subtitle}</div>
    <div class="ob-options">${optionsHtml}</div>
    <div class="ob-nav">
      ${_ob.step > 0 ? '<button class="ob-btn-back" onclick="_obBack()">← Anterior</button>' : '<div></div>'}
      <button class="ob-btn-next" onclick="_obNext()" ${canNext ? '' : 'disabled'}>
        ${_ob.step < total - 1 ? 'Siguiente →' : '✓ Generar mi plan'}
      </button>
    </div>
  `;
}

function _renderGenerating() {
  document.getElementById('onboardingContent').innerHTML = `
    <div class="ob-generating">
      <div class="ob-spinner"></div>
      <div class="ob-generating-title">Generando tu plan personalizado...</div>
      <div class="ob-generating-sub">Esto tomará solo un momento.</div>
    </div>
  `;
}

// ─── INTERNAL HANDLERS (exposed to window for dynamic onclick) ────────────────

window._obSelect = function(key, value) {
  _ob.answers[key] = value;
  _render();
};

window._obNext = async function() {
  const q = QUESTIONS[_ob.step];
  if (_ob.answers[q.key] === undefined) return;

  if (_ob.step < QUESTIONS.length - 1) {
    _ob.step++;
    _render();
  } else {
    await _finishOnboarding();
  }
};

window._obBack = function() {
  if (_ob.step > 0) {
    _ob.step--;
    _render();
  }
};

async function _finishOnboarding() {
  _renderGenerating();
  try {
    const sessions = generatePlan(_ob.answers);
    const userId = getUserId();
    if (userId) {
      await upsertUserPlan(userId, sessions);
    }
    setPlan(sessions);
    buildStats();
    buildSidebar();
    document.getElementById('onboardingOverlay').style.display = 'none';
    document.getElementById('appContent').style.display = '';
  } catch (err) {
    console.error('Onboarding error:', err);
    document.getElementById('onboardingContent').innerHTML = `
      <div class="ob-error">
        <div class="ob-error-icon">⚠️</div>
        <div class="ob-error-msg">Hubo un error al generar tu plan. Inténtalo de nuevo.</div>
        <button class="ob-btn-next" onclick="_obRetry()">Reintentar</button>
      </div>`;
  }
}

window._obRetry = function() {
  _ob.step = 0;
  _ob.answers = {};
  _render();
};

// ─── PUBLIC API ──────────────────────────────────────────────────────────────

export function showOnboarding() {
  _ob.step = 0;
  _ob.answers = {};
  document.getElementById('authOverlay').style.display = 'none';
  document.getElementById('appContent').style.display = 'none';
  document.getElementById('onboardingOverlay').style.display = 'flex';
  _render();
}

export function hideOnboarding() {
  document.getElementById('onboardingOverlay').style.display = 'none';
  document.getElementById('appContent').style.display = '';
}
