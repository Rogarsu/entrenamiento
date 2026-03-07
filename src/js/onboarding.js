// ===== ONBOARDING =====
// 7-step questionnaire shown to new users with no training plan.
// On completion, generates a plan via planner.js and saves it to Supabase.

import { generatePlan, generatePhasesMeta, SPLIT_TEMPLATES } from './planner.js';
import { setPlan, getUserId, savePlanMeta, clearSessionLogs, cachePlan, clearAllUserData } from './state.js';
import { upsertUserPlan, deleteUserLogs, deleteUserPlan, upsertUserPrefs } from './db.js';
import { clearExLogs } from './storage.js';
import { buildStats } from './stats.js';
import { buildSidebar } from './sidebar.js';

// ─── QUESTIONS ───────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    key: 'objetivo',
    multiSelect: true,
    title: '¿Cuál es tu objetivo principal?',
    subtitle: 'Puedes elegir más de uno — el plan combinará las estrategias.',
    options: [
      { value: 'strength',    label: 'Ganar fuerza',        icon: '<i class="ti ti-barbell"></i>',      desc: 'Cargas altas, pocas reps' },
      { value: 'hypertrophy', label: 'Ganar músculo',       icon: '<i class="ti ti-dumbbell"></i>',     desc: 'Volumen e hipertrofia' },
      { value: 'weight_loss', label: 'Perder peso',         icon: '<i class="ti ti-flame"></i>',        desc: 'Más repeticiones y cardio' },
      { value: 'endurance',   label: 'Mejorar resistencia', icon: '<i class="ti ti-run"></i>',          desc: 'Circuitos y resistencia' },
      { value: 'general',     label: 'Condición general',   icon: '<i class="ti ti-bolt"></i>',         desc: 'Equilibrio completo' },
    ],
  },
  {
    key: 'nivel',
    title: '¿Cuál es tu nivel de experiencia?',
    subtitle: 'Sé honesto — es clave para evitar lesiones y progresar bien.',
    options: [
      { value: 'beginner',     label: 'Principiante', icon: '<i class="ti ti-plant"></i>',       desc: 'Menos de 1 año entrenando' },
      { value: 'intermediate', label: 'Intermedio',   icon: '<i class="ti ti-trending-up"></i>', desc: '1-3 años de experiencia' },
      { value: 'advanced',     label: 'Avanzado',     icon: '<i class="ti ti-medal"></i>',       desc: 'Más de 3 años, técnica sólida' },
    ],
  },
  {
    key: 'dias',
    title: '¿Cuántos días a la semana puedes entrenar?',
    subtitle: 'Considera tus compromisos reales, no los ideales.',
    options: [
      { value: 1, label: '1 día',  icon: '<i class="ti ti-calendar-minus"></i>', desc: 'Sesión única semanal' },
      { value: 2, label: '2 días', icon: '<i class="ti ti-calendar"></i>',       desc: 'Mínimo, pero efectivo' },
      { value: 3, label: '3 días', icon: '<i class="ti ti-calendar-event"></i>', desc: 'Recomendado para la mayoría' },
      { value: 4, label: '4 días', icon: '<i class="ti ti-calendar-check"></i>', desc: 'Alta frecuencia semanal' },
      { value: 5, label: '5 días', icon: '<i class="ti ti-calendar-week"></i>',  desc: 'Alto volumen semanal' },
      { value: 6, label: '6 días', icon: '<i class="ti ti-calendar-plus"></i>',  desc: 'Máxima frecuencia' },
    ],
  },
  {
    key: 'duracion',
    title: '¿Cuánto tiempo tienes por sesión?',
    subtitle: 'Incluye calentamiento y enfriamiento.',
    options: [
      { value: 45, label: '45 minutos', icon: '<i class="ti ti-clock"></i>', desc: 'Sesiones cortas e intensas' },
      { value: 60, label: '60 minutos', icon: '<i class="ti ti-clock"></i>', desc: 'Lo más común y equilibrado' },
      { value: 75, label: '75 minutos', icon: '<i class="ti ti-clock"></i>', desc: 'Sesiones completas' },
      { value: 90, label: '90 minutos', icon: '<i class="ti ti-clock"></i>', desc: 'Máximo volumen por sesión' },
    ],
  },
  {
    key: 'entorno',
    title: '¿Dónde entrenas habitualmente?',
    subtitle: 'Esto define los ejercicios disponibles en tu plan.',
    options: [
      { value: 'no_equipment', label: 'Sin equipamiento', icon: '<i class="ti ti-home"></i>',     desc: 'Solo con el peso corporal' },
      { value: 'home',         label: 'Casa con equipo',  icon: '<i class="ti ti-barbell"></i>',  desc: 'Mancuernas, bandas, banco' },
      { value: 'gym',          label: 'Gimnasio',         icon: '<i class="ti ti-building"></i>', desc: 'Acceso a máquinas y barras' },
    ],
  },
  {
    key: 'enfoque',
    title: '¿Qué tipo de división de entrenamiento prefieres?',
    subtitle: 'Si no estás seguro, elige Full Body — es el más versátil.',
    options: [
      { value: 'full_body',      label: 'Full Body',          icon: '<i class="ti ti-refresh"></i>',      desc: 'Todo el cuerpo en cada sesión' },
      { value: 'upper_only',     label: 'Solo Tren Superior',  icon: '<i class="ti ti-arrow-up"></i>',    desc: 'Pecho, espalda, hombros y brazos' },
      { value: 'lower_only',     label: 'Solo Tren Inferior',  icon: '<i class="ti ti-arrow-down"></i>',  desc: 'Piernas, glúteo y core' },
      { value: 'upper_lower',    label: 'Superior + Inferior', icon: '<i class="ti ti-arrows-sort"></i>', desc: 'Alternancia tren superior/inferior' },
      { value: 'push_pull_legs', label: 'Push / Pull / Legs',  icon: '<i class="ti ti-repeat"></i>',      desc: 'Empuje, jalón y piernas' },
    ],
  },
  {
    key: 'semanas',
    title: '¿Cuántas semanas quieres que dure tu plan?',
    subtitle: 'Puedes regenerar el plan cuando termines.',
    options: [
      { value: 4,  label: '4 semanas',  icon: '<i class="ti ti-calendar-event"></i>', desc: 'Plan corto e intenso' },
      { value: 8,  label: '8 semanas',  icon: '<i class="ti ti-calendar-event"></i>', desc: 'El más equilibrado' },
      { value: 12, label: '12 semanas', icon: '<i class="ti ti-calendar-event"></i>', desc: 'Plan completo por fases' },
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
    const ans = _ob.answers[q.key];
    const isSelected = q.multiSelect
      ? (Array.isArray(ans) ? ans.includes(opt.value) : ans === opt.value)
      : ans === opt.value;
    const selected = isSelected ? ' selected' : '';
    // Use single quotes for string values to avoid breaking the double-quoted onclick attribute
    const valArg = typeof opt.value === 'string' ? `'${opt.value}'` : opt.value;
    const checkDot = q.multiSelect
      ? `<span class="ob-check-dot${isSelected ? ' ob-check-dot--on' : ''}"><i class="ti ti-check"></i></span>`
      : '';
    return `
      <button class="ob-option${selected}" onclick="_obSelect('${q.key}', ${valArg})">
        <span class="ob-option-icon">${opt.icon}</span>
        <span class="ob-option-label">${opt.label}</span>
        <span class="ob-option-desc">${opt.desc}</span>
        ${checkDot}
      </button>`;
  }).join('');

  const ans = _ob.answers[q.key];
  const canNext = q.multiSelect
    ? (Array.isArray(ans) && ans.length > 0)
    : (ans !== undefined);

  // Summary note: shown on the last step (semanas) with dias × semanas = total
  let summaryNote = '';
  if (q.key === 'semanas' && _ob.answers.dias && _ob.answers.semanas) {
    const totalSessions = _ob.answers.dias * _ob.answers.semanas;
    summaryNote = `<div class="ob-cycle-note">
      <i class="ti ti-info-circle"></i>
      <div><strong>${_ob.answers.dias} días/semana × ${_ob.answers.semanas} semanas = <span style="color:var(--cyan)">${totalSessions} sesiones en total</span></strong></div>
    </div>`;
  }

  // Cycle warning: shown when the chosen split has fewer day-types than the user's dias
  let cycleNote = '';
  if (q.key === 'enfoque' && _ob.answers.enfoque && _ob.answers.dias) {
    const templates = SPLIT_TEMPLATES[_ob.answers.enfoque];
    if (templates && _ob.answers.dias > templates.length) {
      const enfoqueLabels = {
        full_body: 'Full Body', upper_only: 'Solo Tren Superior',
        lower_only: 'Solo Tren Inferior', upper_lower: 'Superior + Inferior',
        push_pull_legs: 'Push / Pull / Legs',
      };
      const label = enfoqueLabels[_ob.answers.enfoque] || _ob.answers.enfoque;
      const extra = _ob.answers.dias - templates.length;
      cycleNote = `<div class="ob-warn-note">
        <i class="ti ti-alert-triangle"></i>
        <div>
          <strong>${label}</strong> tiene solo <strong>${templates.length} tipos de sesión</strong>, pero elegiste <strong>${_ob.answers.dias} días/semana</strong>.<br>
          Esto significa que ${extra} día${extra > 1 ? 's' : ''} por semana ciclarán de vuelta al inicio.<br><br>
          <strong>¿Eso es un problema?</strong> No, si sigues adelante el plan lo gestiona automáticamente:
          <ul>
            <li>Los tipos de sesión se repiten en orden (A → B → C → A…)</li>
            <li>Cada vuelta usa <strong>ejercicios distintos</strong> para el mismo grupo muscular</li>
            <li>No harás exactamente el mismo entrenamiento dos veces en la misma semana</li>
          </ul>
          Si prefieres que no haya repetición de tipos, elige una división con más variedad como <strong>Push / Pull / Legs</strong> (6 tipos).
        </div>
      </div>`;
    }
  }

  el.innerHTML = `
    <div class="ob-progress-bar">
      <div class="ob-progress-fill" style="width:${(progress / total) * 100}%"></div>
    </div>
    <div class="ob-step-counter">${progress} / ${total}</div>
    <div class="ob-title">${q.title}</div>
    <div class="ob-subtitle">${q.subtitle}</div>
    <div class="ob-options">${optionsHtml}</div>
    ${summaryNote}${cycleNote}
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
  const q = QUESTIONS.find(q => q.key === key);
  if (q && q.multiSelect) {
    const current = Array.isArray(_ob.answers[key]) ? [..._ob.answers[key]] : [];
    const idx = current.indexOf(value);
    if (idx >= 0) current.splice(idx, 1);
    else current.push(value);
    _ob.answers[key] = current;
  } else {
    _ob.answers[key] = value;
  }
  _render();
};

window._obNext = async function() {
  const q = QUESTIONS[_ob.step];
  const ans = _ob.answers[q.key];
  const valid = q.multiSelect ? (Array.isArray(ans) && ans.length > 0) : (ans !== undefined);
  if (!valid) return;

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
    savePlanMeta(_ob.answers);
    const sessions = generatePlan(_ob.answers);
    console.log('[Plan] Respuestas:', JSON.stringify(_ob.answers));
    console.log(`[Plan] Sesiones generadas: ${sessions.length} (${_ob.answers.dias} días × ${_ob.answers.semanas} semanas = ${_ob.answers.dias * _ob.answers.semanas} esperadas)`);
    const userId = getUserId();
    if (userId) {
      await upsertUserPlan(userId, sessions);
      // Persist onboarding answers so "Nuevo Ciclo" pre-fills correctly even on other devices
      upsertUserPrefs(userId, { plan_meta: _ob.answers }).catch(console.error);
    }
    cachePlan(sessions); // local cache so plan survives Supabase errors
    setPlan(sessions);
    buildStats();
    buildSidebar();
    document.getElementById('onboardingOverlay').style.display = 'none';
    document.getElementById('appContent').style.display = '';
  } catch (err) {
    console.error('Onboarding error:', err);
    document.getElementById('onboardingContent').innerHTML = `
      <div class="ob-error">
        <div class="ob-error-icon"><i class="ti ti-alert-triangle"></i></div>
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

// ── Plan modal (Nuevo Ciclo) ──────────────────────────────────────────────────

export function openPlanModal() {
  document.getElementById('planModal').style.display = 'flex';
}

export function closePlanModal() {
  document.getElementById('planModal').style.display = 'none';
}

// ── Reset modal (Reiniciar Progreso) ─────────────────────────────────────────

export function openResetModal() {
  document.getElementById('resetModal').style.display = 'flex';
}

export function closeResetModal() {
  document.getElementById('resetModal').style.display = 'none';
}

export async function resetProgress() {
  closeResetModal();
  clearSessionLogs();
  clearExLogs();
  const userId = getUserId();
  if (userId) deleteUserLogs(userId).catch(console.error);
  buildStats();
  buildSidebar();
}

export function showNewCycle() {
  closePlanModal();
  // Wipe everything: localStorage + Supabase. Start completely fresh.
  clearAllUserData();
  clearExLogs();
  const userId = getUserId();
  if (userId) {
    deleteUserLogs(userId).catch(console.error);
    deleteUserPlan(userId).catch(console.error);
    upsertUserPrefs(userId, { plan_meta: null }).catch(console.error);
  }
  _ob.step = 0;
  _ob.answers = {};
  document.getElementById('authOverlay').style.display = 'none';
  document.getElementById('appContent').style.display = 'none';
  document.getElementById('onboardingOverlay').style.display = 'flex';
  _render();
}
