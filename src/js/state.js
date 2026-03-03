import { upsertSessionLog, upsertNutritionLog } from './db.js';
import { SESSIONS as DEFAULT_SESSIONS } from '../data/sessions.js';

let _userId = null;
let _activeSessions = null; // null = fallback to DEFAULT_SESSIONS

export const state = {
  logs: [],
  currentId: null,
  expandedPhases: [1, 2, 3, 4],
};

// ── Plan (dynamic per user) ────────────────────────────────────────────────────

export function setPlan(sessions) {
  _activeSessions = sessions;
}

export function getPlan() {
  return _activeSessions || DEFAULT_SESSIONS;
}

// ── Auth init ──────────────────────────────────────────────────────────────────

export function initState(sessionLogs, userId) {
  _userId = userId;
  if (Array.isArray(sessionLogs) && userId) {
    state.logs = sessionLogs.map(r => ({
      sessionId: r.session_id,
      date: r.completed_date || '',
      duration: r.duration || 0,
      energy: r.energy || 0,
      fatigue: r.fatigue || 0,
      pain: r.pain || '',
      notes: r.notes || '',
    }));
    localStorage.setItem('sv_logs', JSON.stringify(state.logs));
  } else {
    state.logs = JSON.parse(localStorage.getItem('sv_logs') || '[]');
  }
}

export function getUserId() { return _userId; }

export function saveState() {
  localStorage.setItem('sv_logs', JSON.stringify(state.logs));
  if (_userId) {
    const latest = state.logs[state.logs.length - 1];
    if (latest) upsertSessionLog(_userId, latest).catch(console.error);
  }
}

export function isDone(id) {
  return state.logs.some(l => l.sessionId === id);
}

export function getLog(id) {
  return state.logs.find(l => l.sessionId === id);
}

// ── Plan cache (localStorage backup for offline / Supabase error fallback) ────

export function cachePlan(sessions) {
  try { localStorage.setItem('sv_plan_cache', JSON.stringify(sessions)); } catch(e) {}
}

export function getCachedPlan() {
  try { return JSON.parse(localStorage.getItem('sv_plan_cache') || 'null'); } catch(e) { return null; }
}

// ── Plan meta (onboarding answers) ────────────────────────────────────────────

export function savePlanMeta(answers) {
  try { localStorage.setItem('sv_plan_meta', JSON.stringify(answers)); } catch(e) {}
}

export function getPlanMeta() {
  try { return JSON.parse(localStorage.getItem('sv_plan_meta') || 'null'); } catch(e) { return null; }
}

export function clearSessionLogs() {
  state.logs = [];
  try { localStorage.removeItem('sv_logs'); } catch(e) {}
}

// ── Meal log ───────────────────────────────────────────────────────────────────

let _mealLog = { date: null, slots: new Set() };

export function getMealChecks() { return _mealLog.slots; }

export function initMealLog(slots) {
  const today = new Date().toISOString().slice(0, 10);
  _mealLog = { date: today, slots: new Set(slots || []) };
}

export function toggleMealSlot(slotId, sessionId) {
  const today = new Date().toISOString().slice(0, 10);
  if (_mealLog.date !== today) _mealLog = { date: today, slots: new Set() };
  if (_mealLog.slots.has(slotId)) _mealLog.slots.delete(slotId);
  else _mealLog.slots.add(slotId);
  const arr = [..._mealLog.slots];
  try { localStorage.setItem(`sv_meal_${today}`, JSON.stringify(arr)); } catch(e) {}
  if (_userId) upsertNutritionLog(_userId, today, sessionId, arr).catch(console.error);
}

// ── Today's session ────────────────────────────────────────────────────────────

export function getLastCompletedToday() {
  const todayLocal = new Date().toLocaleDateString('es-CO'); // e.g. '15/1/2025'
  const todayISO   = new Date().toISOString().slice(0, 10);  // e.g. '2025-01-15'
  const log = [...state.logs].reverse().find(l =>
    l.date === todayLocal || (l.date && l.date.slice(0, 10) === todayISO)
  );
  return log ? log.sessionId : null;
}
