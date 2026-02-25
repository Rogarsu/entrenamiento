import { upsertSessionLog } from './db.js';

let _userId = null;

export const state = {
  logs: [],
  currentId: null,
  expandedPhases: [1, 2, 3, 4],
};

// Called on login with rows from Supabase session_logs table.
// If sessionLogs is null, falls back to localStorage (offline).
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
    // Offline fallback — load from localStorage
    state.logs = JSON.parse(localStorage.getItem('sv_logs') || '[]');
  }
}

export function getUserId() { return _userId; }

export function saveState() {
  localStorage.setItem('sv_logs', JSON.stringify(state.logs));
  // Sync latest log to Supabase in the background
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
