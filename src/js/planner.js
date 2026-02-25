// ===== PLAN GENERATOR =====
// Takes 7 onboarding answers and generates a sessions array
// compatible with the existing session.js renderer.

import { EXERCISES } from '../data/exercises.js';

// ─── QUESTIONNAIRE KEYS ────────────────────────────────────────────────────────
// objetivo: 'strength' | 'hypertrophy' | 'endurance' | 'weight_loss' | 'general'
// nivel:    'beginner' | 'intermediate' | 'advanced'
// dias:     2 | 3 | 4 | 5
// duracion: 45 | 60 | 75 | 90   (minutes per session)
// entorno:  'no_equipment' | 'home' | 'gym'
// enfoque:  'full_body' | 'upper_lower' | 'push_pull_legs'
// semanas:  4 | 8 | 12

// ─── SESSION TEMPLATES ───────────────────────────────────────────────────────
const SPLIT_TEMPLATES = {
  full_body: ['Full Body A', 'Full Body B', 'Full Body C'],
  upper_lower: ['Tren Superior A', 'Tren Inferior A', 'Tren Superior B', 'Tren Inferior B'],
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
  1: { name: 'Fase 1 — Adaptación',    desc: 'Semanas iniciales: aprendizaje técnico, acondicionamiento articular y establecimiento de la base.', weeks: '4 semanas' },
  2: { name: 'Fase 2 — Desarrollo',    desc: 'Progresión de cargas y volumen. Mayor intensidad y densidad de entrenamiento.', weeks: '4 semanas' },
  3: { name: 'Fase 3 — Intensificación', desc: 'Máxima exigencia del mesociclo. Cargas altas, alta densidad y adaptaciones clave.', weeks: '4 semanas' },
  4: { name: 'Fase 4 — Deload',        desc: 'Semana de descarga. Volumen e intensidad reducidos para optimizar la recuperación y supercompensación.', weeks: '1 semana' },
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function _pick(arr, n, difficulty, env) {
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
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function _exForMuscle(muscle, difficulty, env, n = 2) {
  const pool = EXERCISES.filter(e => e.muscle_primary === muscle);
  return _pick(pool, n, difficulty, env);
}

function _toSessionExercise(ex, objetivo) {
  let sets = ex.sets_default;
  let reps = ex.reps_default;

  if (objetivo === 'strength') { sets = Math.min(sets + 1, 5); reps = '4-6'; }
  else if (objetivo === 'hypertrophy') { sets = Math.max(sets, 3); reps = ex.reps_default || '8-12'; }
  else if (objetivo === 'endurance' || objetivo === 'weight_loss') { reps = '15-20'; }

  return {
    id: ex.id,
    name: ex.name,
    muscle: ex.muscle_primary,
    equip: ex.equip,
    sets: String(sets),
    reps,
    rest: `${ex.rest_seconds} seg`,
    weight_guide: ex.weight_guide,
    notes: '',
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
  const { objetivo, nivel, dias, duracion, entorno, enfoque, semanas } = answers;

  // Determine phases based on semanas
  const totalPhases = semanas >= 12 ? 4 : semanas >= 8 ? 3 : 2;
  const weeksPerPhase = Math.floor(semanas / totalPhases);

  // Sessions per week from split template
  const splitDays = SPLIT_TEMPLATES[enfoque] || SPLIT_TEMPLATES['full_body'];
  const sessionsPerWeek = Math.min(dias, splitDays.length);
  const dayTemplates = splitDays.slice(0, sessionsPerWeek);

  // Exercises per session based on duration
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
          // Build exercise blocks for each muscle group
          const exPerMuscle = Math.max(1, Math.floor(exCount / muscles.length));
          for (const muscle of muscles) {
            const exs = _exForMuscle(muscle, nivel, entorno, exPerMuscle);
            if (exs.length > 0) {
              blocks.push(_buildBlock(
                _muscleBlockName(muscle),
                exs.map(e => _toSessionExercise(e, objetivo))
              ));
            }
          }
        } else {
          // Deload: full body lighter
          const deloadMuscles = ['quads', 'chest', 'back', 'core'];
          for (const muscle of deloadMuscles) {
            const exs = _exForMuscle(muscle, 'beginner', entorno, 1);
            if (exs.length > 0) {
              const ex = _toSessionExercise(exs[0], 'general');
              ex.sets = '2';
              blocks.push(_buildBlock(_muscleBlockName(muscle), [ex]));
            }
          }
        }

        const sessionPhase = totalPhases >= 4 && phase === totalPhases
          ? 4
          : Math.min(phase, 4);

        sessions.push({
          id: sessionId++,
          phase: sessionPhase,
          name: `Sesión ${String(sessionId - 1).padStart(2, '0')} — ${templateName}${isDeload ? ' (Deload)' : ''}`,
          type: _splitType(templateName),
          intensity: _phaseIntensity(phase, totalPhases, isDeload),
          duration: `${duracion} min`,
          muscles: muscles,
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
// Returns PHASES-compatible object for the generated plan

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
