// ===== PLAN GENERATOR =====
// Takes 7 onboarding answers and generates a sessions array
// compatible with the existing session.js renderer.

import { EXERCISES } from '../data/exercises.js';

// ─── QUESTIONNAIRE KEYS ────────────────────────────────────────────────────────
// objetivo: string or string[] — 'strength' | 'hypertrophy' | 'endurance' | 'weight_loss' | 'general'
// nivel:    'beginner' | 'intermediate' | 'advanced'
// dias:     1 | 2 | 3 | 4 | 5 | 6
// duracion: 45 | 60 | 75 | 90   (minutes per session)
// entorno:  'no_equipment' | 'home' | 'gym'
// enfoque:  'full_body' | 'upper_only' | 'lower_only' | 'upper_lower' | 'push_pull_legs'
// semanas:  4 | 8 | 12

// ─── SESSION TEMPLATES ───────────────────────────────────────────────────────
const SPLIT_TEMPLATES = {
  full_body:      ['Full Body A', 'Full Body B', 'Full Body C'],
  upper_only:     ['Tren Superior A', 'Tren Superior B'],
  lower_only:     ['Tren Inferior A', 'Tren Inferior B'],
  upper_lower:    ['Tren Superior A', 'Tren Inferior A', 'Tren Superior B', 'Tren Inferior B'],
  push_pull_legs: ['Empuje', 'Jalón / Espalda', 'Piernas', 'Empuje B', 'Jalón B', 'Piernas B'],
};

const MUSCLE_MAP = {
  'Full Body A':        ['quads', 'chest', 'back', 'core'],
  'Full Body B':        ['hamstrings', 'shoulders', 'back', 'core'],
  'Full Body C':        ['glutes', 'chest', 'biceps', 'triceps', 'core'],
  'Tren Superior A':    ['chest', 'back', 'shoulders', 'triceps'],
  'Tren Inferior A':    ['quads', 'hamstrings', 'glutes', 'calves', 'core'],
  'Tren Superior B':    ['back', 'chest', 'biceps', 'shoulders'],
  'Tren Inferior B':    ['quads', 'glutes', 'hamstrings', 'calves', 'core'],
  'Empuje':             ['chest', 'shoulders', 'triceps'],
  'Jalón / Espalda':    ['back', 'biceps', 'forearms'],
  'Piernas':            ['quads', 'hamstrings', 'glutes', 'calves'],
  'Empuje B':           ['chest', 'shoulders', 'triceps'],
  'Jalón B':            ['back', 'biceps'],
  'Piernas B':          ['quads', 'glutes', 'calves', 'core'],
};

const PHASE_NAMES = {
  1: { name: 'Fase 1 — Adaptación',      desc: 'Aprendizaje técnico, acondicionamiento articular y establecimiento de la base de volumen (MEV).', weeks: '4 semanas' },
  2: { name: 'Fase 2 — Desarrollo',      desc: 'Progresión de carga y volumen hacia el rango óptimo (MAV). Mayor intensidad y densidad.', weeks: '4 semanas' },
  3: { name: 'Fase 3 — Intensificación', desc: 'Máxima exigencia del mesociclo. Cargas altas, volumen cerca del MRV y adaptaciones clave.', weeks: '4 semanas' },
  4: { name: 'Fase 4 — Deload',          desc: 'Semana de descarga. Volumen reducido al 40-50% para facilitar la recuperación y supercompensación.', weeks: '1 semana' },
};

// ─── EVIDENCE-BASED PARAMETER TABLES ─────────────────────────────────────────

// Rep ranges vary by goal AND phase (periodization: adaptation → intensification)
// Phase 1 = higher reps (technique + connective tissue adaptation)
// Phase 3 = lower reps (intensification toward the strength-hypertrophy intersection)
// Phase 4 (deload) = moderate reps, submaximal load
const REP_MATRIX = {
  strength:    { 1: '6-8',   2: '4-6',   3: '3-5',   4: '8-10'  },
  hypertrophy: { 1: '12-15', 2: '8-12',  3: '6-10',  4: '12-15' },
  weight_loss: { 1: '15-20', 2: '12-15', 3: '12-15', 4: '15-20' },
  endurance:   { 1: '20-25', 2: '15-20', 3: '15-20', 4: '20-25' },
  general:     { 1: '12-15', 2: '10-12', 3: '8-10',  4: '12-15' },
};

// Rest periods by goal and exercise type
// Evidence: strength needs full PCr resynthesis (3-5 min); metabolic protocols use shorter rest
const REST_MAP = {
  strength:    { compound: '180-300 seg', isolation: '90-120 seg' },
  hypertrophy: { compound: '90-120 seg',  isolation: '60-90 seg'  },
  weight_loss: { compound: '60-75 seg',   isolation: '45-60 seg'  },
  endurance:   { compound: '45-60 seg',   isolation: '30-45 seg'  },
  general:     { compound: '90 seg',      isolation: '60 seg'     },
};

// RIR (Reps In Reserve) target — how close to failure the user should train
// Evidence: RIR 1-3 produces equal hypertrophy to failure with less recovery cost
const RIR_NOTE = {
  strength:    'RIR 1-2 · deja 1-2 reps en el tanque',
  hypertrophy: 'RIR 1-3 · esfuerzo alto sin llegar al fallo',
  weight_loss: 'RIR 2-3 · mantén buena técnica a ritmo alto',
  endurance:   'RIR 3-4 · ritmo sostenible y controlado',
  general:     'RIR 2-3 · esfuerzo moderado-alto',
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function _pick(arr, n, difficulty, env, preferLengthened) {
  const filtered = arr.filter(e => {
    const envOk = env === 'gym'
      ? true
      : env === 'home'
        ? (e.environment === 'home' || e.environment === 'no_equipment')
        : e.environment === 'no_equipment';
    const diffOk = difficulty === 'beginner'
      ? e.difficulty === 'beginner'
      : difficulty === 'intermediate'
        ? e.difficulty !== 'advanced'
        : true;
    return envOk && diffOk && e.category !== 'cardio' && e.category !== 'mobility';
  });

  // Prefer exercises that load the muscle in its lengthened/stretched position.
  // Evidence (Pedrosa 2022, Maeo 2023): lengthened-position loading produces
  // equal or greater hypertrophy than shortened-position at matched volume.
  const sorted = [...filtered].sort((a, b) => {
    if (preferLengthened) {
      if (a.lengthened && !b.lengthened) return -1;
      if (!a.lengthened && b.lengthened) return 1;
    }
    return Math.random() - 0.5;
  });

  return sorted.slice(0, n);
}

function _exForMuscle(muscle, difficulty, env, n = 2, objetivo = 'general') {
  const pool = EXERCISES.filter(e => e.muscle_primary === muscle);
  // Prioritize lengthened-position exercises for hypertrophy and strength goals
  const preferLengthened = objetivo === 'hypertrophy' || objetivo === 'strength';
  return _pick(pool, n, difficulty, env, preferLengthened);
}

function _toSessionExercise(ex, objetivo, phase, isDeload) {
  // ── Volume progression: MEV (phase 1) → MAV (phase 3), deload at 2 sets ──
  // Evidence: volume-hypertrophy dose-response (Schoenfeld 2017, Krieger 2010)
  let sets;
  if (isDeload) {
    sets = 2;
  } else {
    const phaseAdj = [0, 0, 1, 2][Math.min((phase || 1) - 1, 3)];
    const cap = (ex.category === 'compound' || ex.category === 'core') ? 5 : 4;
    sets = Math.min(ex.sets_default + phaseAdj, cap);
  }

  // ── Rep range: periodized by goal × phase ──────────────────────────────────
  const repMatrix = REP_MATRIX[objetivo] || REP_MATRIX.general;
  const phaseKey = isDeload ? 4 : Math.min(phase || 1, 3);
  const reps = repMatrix[phaseKey] || ex.reps_default;

  // ── Rest: goal-specific, compound vs isolation ────────────────────────────
  const restMap = REST_MAP[objetivo] || REST_MAP.general;
  const isIsolation = ex.category === 'isolation';
  const rest = isIsolation ? restMap.isolation : restMap.compound;

  // ── Notes: RIR target ─────────────────────────────────────────────────────
  const notes = RIR_NOTE[objetivo] || RIR_NOTE.general;

  return {
    id: ex.id,
    name: ex.name,
    muscle: ex.muscle_primary,
    equip: ex.equip,
    sets: String(sets),
    reps,
    rest,
    weight_guide: ex.weight_guide,
    notes,
  };
}

function _buildBlock(name, exercises) {
  return { name, exercises };
}

function _preSection() {
  return {
    hydration: 'Bebe 500 ml de agua 30-45 min antes. Si entrenas de mañana, añade una pequeña fuente de carbohidratos (fruta, tostada).',
    warmup: ['Caminata rápida o trote suave (5 min)', 'Inchworm (8 reps)', 'Círculos de brazos (15 c/dirección)'],
    mobility: ['Rotación torácica (10 c/lado)', 'Bisagra de cadera sin peso (10 reps)', 'Círculos de cadera (10 c/dirección)'],
    mental: 'Céntrate en el proceso, no en el resultado. Cada repetición ejecutada con buena técnica es un paso hacia tu objetivo.',
  };
}

function _postSection() {
  return {
    cooldown: ['Caminata suave (3-5 min)', 'Respiración profunda (10 respiraciones)'],
    stretches: ['Estiramiento de cuádriceps de pie (30 seg c/pierna)', 'Estiramiento de isquiotibiales (30 seg c/pierna)', 'Apertura de pecho (30 seg)', 'Estiramiento de dorsal (30 seg c/lado)'],
    nutrition: 'Consume proteína + carbohidratos dentro de los 60 min post-entrenamiento. Ejemplo: batido de proteína + plátano, o pollo + arroz.',
    recovery: 'Duerme 7-9 h. Aplica hielo en zonas inflamadas 10-15 min si es necesario. Hidratación continua durante el día.',
  };
}

// ─── MAIN GENERATOR ──────────────────────────────────────────────────────────

export function generatePlan(answers) {
  // Normalize objetivo: multi-select returns an array — use primary (first) for parameters
  const objetivoRaw = answers.objetivo;
  const objetivo = Array.isArray(objetivoRaw) ? (objetivoRaw[0] || 'general') : (objetivoRaw || 'general');
  const { nivel, dias, duracion, entorno, enfoque, semanas } = answers;

  const totalPhases = semanas >= 12 ? 4 : semanas >= 8 ? 3 : 2;
  const weeksPerPhase = Math.floor(semanas / totalPhases);

  const splitDays = SPLIT_TEMPLATES[enfoque] || SPLIT_TEMPLATES['full_body'];
  const sessionsPerWeek = Math.min(dias, splitDays.length);
  const dayTemplates = splitDays.slice(0, sessionsPerWeek);

  const exCount = duracion <= 45 ? 4 : duracion <= 60 ? 5 : duracion <= 75 ? 6 : 7;

  const sessions = [];
  let sessionId = 1;

  for (let phase = 1; phase <= totalPhases; phase++) {
    const isDeload = phase === totalPhases && totalPhases >= 3;
    const phaseWeeks = isDeload ? 1 : weeksPerPhase;

    for (let week = 1; week <= phaseWeeks; week++) {
      for (const templateName of dayTemplates) {
        const muscles = MUSCLE_MAP[templateName] || ['quads', 'chest', 'core'];
        const blocks = [];

        if (!isDeload) {
          const exPerMuscle = Math.max(1, Math.floor(exCount / muscles.length));
          for (const muscle of muscles) {
            const exs = _exForMuscle(muscle, nivel, entorno, exPerMuscle, objetivo);
            if (exs.length > 0) {
              blocks.push(_buildBlock(
                _muscleBlockName(muscle),
                exs.map(e => _toSessionExercise(e, objetivo, phase, false))
              ));
            }
          }
        } else {
          // Deload: full body, beginner exercises, 2 sets each
          const deloadMuscles = ['quads', 'chest', 'back', 'core'];
          for (const muscle of deloadMuscles) {
            const exs = _exForMuscle(muscle, 'beginner', entorno, 1, 'general');
            if (exs.length > 0) {
              blocks.push(_buildBlock(
                _muscleBlockName(muscle),
                [_toSessionExercise(exs[0], 'general', 4, true)]
              ));
            }
          }
        }

        const sessionPhase = totalPhases >= 4 && phase === totalPhases ? 4 : Math.min(phase, 4);

        sessions.push({
          id: sessionId++,
          phase: sessionPhase,
          name: `Sesión ${String(sessionId - 1).padStart(2, '0')} — ${templateName}${isDeload ? ' (Deload)' : ''}`,
          type: _splitType(templateName),
          intensity: _phaseIntensity(phase, totalPhases, isDeload),
          duration: `${duracion} min`,
          muscles,
          pre: _preSection(),
          workout: { blocks },
          post: _postSection(),
        });
      }
    }
  }

  return sessions;
}

function _muscleBlockName(muscle) {
  const names = {
    quads: 'Cuádriceps', hamstrings: 'Isquiotibiales', glutes: 'Glúteo',
    calves: 'Pantorrillas', core: 'Core', chest: 'Pecho',
    back: 'Espalda / Dorsal', shoulders: 'Hombros', biceps: 'Bíceps',
    triceps: 'Tríceps', forearms: 'Antebrazos',
  };
  return names[muscle] || muscle;
}

function _splitType(name) {
  if (name.includes('Piernas') || name.includes('Inferior')) return 'A';
  if (name.includes('Empuje') || name.includes('Superior')) return 'B';
  if (name.includes('Jalón') || name.includes('Espalda')) return 'C';
  if (name.includes('Full Body')) return 'F';
  return 'F';
}

function _phaseIntensity(phase, total, isDeload) {
  if (isDeload) return 'Bajo';
  const ratio = phase / total;
  if (ratio <= 0.33) return 'Bajo-Medio';
  if (ratio <= 0.66) return 'Medio';
  return 'Medio-Alto';
}

// ─── PHASE METADATA BUILDER ──────────────────────────────────────────────────

export function generatePhasesMeta(answers) {
  const { semanas } = answers;
  const totalPhases = semanas >= 12 ? 4 : semanas >= 8 ? 3 : 2;
  const weeksPerPhase = Math.floor(semanas / totalPhases);
  const phases = {};
  for (let i = 1; i <= totalPhases; i++) {
    const isDeload = i === totalPhases && totalPhases >= 3;
    const wks = isDeload ? 1 : weeksPerPhase;
    const meta = PHASE_NAMES[Math.min(i, 4)];
    phases[i] = { ...meta, weeks: `${wks} semana${wks > 1 ? 's' : ''}`, sessions: `${wks * answers.dias} sesiones` };
  }
  return phases;
}
