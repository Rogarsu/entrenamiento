import { upsertSessionLog } from './db.js';
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

// ── Today's session ────────────────────────────────────────────────────────────

export function getLastCompletedToday() {
  const todayLocal = new Date().toLocaleDateString('es-CO'); // e.g. '15/1/2025'
  const todayISO   = new Date().toISOString().slice(0, 10);  // e.g. '2025-01-15'
  const log = [...state.logs].reverse().find(l =>
    l.date === todayLocal || (l.date && l.date.slice(0, 10) === todayISO)
  );
  return log ? log.sessionId : null;
}
