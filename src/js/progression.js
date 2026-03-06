import { loadExLogs, getLastExLog } from './storage.js';

export const MUSCLE_KEYS = [
  'cuádricep','cuadricep','glúteo','gluteo','isquiotibial','pectoral',
  'trícep','tricep','bícep','bicep','deltoid','hombro','dorsal','trapecio',
  'romboid','pantorrilla','gemelo','core','abdomin','lumbar','aductor','abductor',
  'erectore','manguito',
];

export function musclesOverlap(m1, m2) {
  const a = (m1 || '').toLowerCase();
  const b = (m2 || '').toLowerCase();
  return MUSCLE_KEYS.some(k => a.includes(k) && b.includes(k));
}

export function getRelatedExLogs(targetMuscle, currentSessionId, excludeExId) {
  const all = loadExLogs();
  const related = [];
  for (const [key, log] of Object.entries(all)) {
    const parts = key.split('_');
    const sid = parseInt(parts.pop());
    const exId = parts.join('_');
    if (sid > currentSessionId) continue;
    if (exId === excludeExId) continue;
    if (!log.muscle || !musclesOverlap(targetMuscle, log.muscle)) continue;
    related.push({ exId, sessionId: sid, log });
  }
  related.sort((a, b) => b.sessionId - a.sessionId);
  return related;
}

// Returns the 1-based global position of an exercise within a session's workout blocks.
// Works for any session structure, including user-created plans.
export function getExercisePosition(session, exId) {
  let pos = 0;
  for (const bl of (session?.workout?.blocks || [])) {
    for (const e of bl.exercises) {
      pos++;
      if (e.id === exId) return pos;
    }
  }
  return 1; // fallback: treat as first exercise
}

// Fatigue factor per position beyond #2: ~5% per extra exercise (capped at 15%).
// Research basis: accumulated fatigue reduces strength output ~5-8% per prior compound exercise.
function _fatigueFactor(position) {
  return position >= 3 ? Math.min(0.15, (position - 2) * 0.05) : 0;
}

export function calcNextRecommendation(targetRepsStr, sets, position = 1) {
  const targetReps = parseInt(targetRepsStr) || 10;
  const increment = 2.5;
  const avgReps = sets.reduce((s, x) => s + x.reps, 0) / sets.length;
  const lastWeight = sets[sets.length - 1].weight;
  let nextWeight, reason, dir;
  if (avgReps >= targetReps) {
    nextWeight = lastWeight + increment;
    reason = `Completaste ${Math.round(avgReps)} reps en promedio. ¡Sube el peso!`;
    dir = 'up';
  } else if (avgReps >= targetReps * 0.85) {
    nextWeight = lastWeight;
    reason = `Cerca del objetivo (${Math.round(avgReps)} reps prom.). Mantén el peso y completa todas las series.`;
    dir = 'eq';
  } else {
    nextWeight = Math.max(lastWeight - increment, 0);
    reason = `Fue exigente (${Math.round(avgReps)} reps prom.). Baja un poco y enfócate en la técnica.`;
    dir = 'down';
  }

  // ── Fatigue correction ──────────────────────────────────────────────────
  // When an exercise is done 3rd or later in a session, performance is affected
  // by accumulated fatigue. We normalize the recommendation to avoid penalizing
  // the athlete for something environmental, not a real strength regression.
  // Exception: if avgReps < 65% of target the shortfall is too large to be
  // explained by fatigue alone — treat it as a genuine strength limitation.
  let fatigueNote = null;
  const ff = _fatigueFactor(position);
  if (ff > 0) {
    const genuineFail = avgReps < targetReps * 0.65;
    if (genuineFail && dir === 'down') {
      fatigueNote = `Ejercicio #${position} — fallo severo (${Math.round(avgReps)}/${targetReps} reps). El peso base es demasiado alto; reducirlo es la decisión correcta independientemente de la fatiga.`;
    } else if (!genuineFail) {
      const pct = Math.round(ff * 100);
      const freshEquiv = Math.round(lastWeight * (1 + ff) * 2) / 2; // round to 0.5 kg
      if (dir === 'down') {
        nextWeight = freshEquiv;
        dir = 'eq';
        reason = `Bajo rendimiento ajustado por fatiga acumulada (ejercicio #${position}). Peso normalizado para la próxima sesión: ${freshEquiv} kg.`;
        fatigueNote = `Ejercicio #${position} en sesión — fatiga estimada ~${pct}% · recomendación ajustada al alza`;
      } else if (dir === 'eq' && freshEquiv > lastWeight) {
        nextWeight = freshEquiv;
        dir = 'up';
        reason = `Buen rendimiento con fatiga acumulada (ejercicio #${position}). En condiciones frescas apunta a ${freshEquiv} kg.`;
        fatigueNote = `Ejercicio #${position} en sesión — fatiga estimada ~${pct}% · proyección corregida`;
      } else if (dir === 'up') {
        fatigueNote = `Ejercicio #${position} — excelente resultado a pesar de la fatiga acumulada`;
      }
    }
  }

  return { nextWeight, targetReps, reason, dir, fatigueNote, position };
}

export function calcCrossExRecommendation(weightGuide, relatedLogs) {
  const ratios = relatedLogs.slice(0, 5).map(({ log }) => {
    if (!log.targetReps || !log.sets || !log.sets.length) return null;
    const avgReps = log.sets.reduce((s, x) => s + x.reps, 0) / log.sets.length;
    return Math.min(avgReps / log.targetReps, 1.3);
  }).filter(r => r !== null);
  if (!ratios.length) return null;
  const avgRatio = ratios.reduce((s, x) => s + x, 0) / ratios.length;

  const nums = (weightGuide || '').match(/\d+(\.\d+)?/g);
  const weights = nums ? nums.map(Number).sort((a, b) => a - b) : [];
  const minW = weights.length >= 2 ? weights[0] : null;
  const maxW = weights.length >= 2 ? weights[weights.length - 1] : null;

  let suggestedWeight = null, suggestedRange = null;
  if (minW !== null && maxW !== null && maxW > minW) {
    const pos = avgRatio >= 1.0 ? 0.75 : avgRatio >= 0.9 ? 0.5 : avgRatio >= 0.85 ? 0.35 : 0.2;
    suggestedWeight = Math.round((minW + (maxW - minW) * pos) * 2) / 2;
    suggestedRange = `${minW}–${maxW} kg`;
  }

  const level = avgRatio >= 1.0 ? 'high' : avgRatio >= 0.85 ? 'medium' : 'low';
  const reasons = {
    high:   'Tu rendimiento en músculos similares ha sido excelente → apunta al extremo superior.',
    medium: 'Buen rendimiento en músculos similares → comienza a mitad del rango.',
    low:    'Comienza en el extremo inferior del rango y progresa con seguridad.',
  };
  return { suggestedWeight, suggestedRange, level, reason: reasons[level], avgRatio };
}

export function getExRecommendation(exId, sessionId, targetRepsStr, muscle, weightGuide, position = 1) {
  const sameLog = getLastExLog(exId, sessionId);
  if (sameLog && sameLog.sets && sameLog.sets.length) {
    return { type: 'same', rec: calcNextRecommendation(targetRepsStr, sameLog.sets, position), log: sameLog };
  }
  if (muscle) {
    const related = getRelatedExLogs(muscle, sessionId, exId);
    if (related.length) {
      const crossRec = calcCrossExRecommendation(weightGuide, related);
      if (crossRec) return { type: 'related', crossRec, related };
    }
  }
  return null;
}
