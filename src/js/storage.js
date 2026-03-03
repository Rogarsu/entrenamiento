import { upsertExLog } from './db.js';
import { getUserId } from './state.js';

let _exLogs = {};

// Called on login with rows from Supabase exercise_logs table.
// If exLogs is null, falls back to localStorage (offline).
export function initExLogs(exLogs) {
  if (Array.isArray(exLogs) && getUserId()) {
    if (exLogs.length > 0) {
      // Supabase tiene datos → usarlos como fuente de verdad
      _exLogs = {};
      for (const row of exLogs) {
        const key = `${row.exercise_id}_${row.session_id}`;
        _exLogs[key] = {
          date: row.logged_date || '',
          time: row.logged_time || '',
          timestamp: row.logged_at || '',
          sets: row.sets || [],
          targetReps: row.target_reps || 0,
          muscle: row.muscle || '',
        };
      }
      localStorage.setItem('sv_ex_logs', JSON.stringify(_exLogs));
    } else {
      // Supabase vacío → confiar en localStorage, NO sobrescribir con vacío
      _exLogs = JSON.parse(localStorage.getItem('sv_ex_logs') || '{}');
      // Sincronizar a Supabase en background
      const uid = getUserId();
      if (uid && Object.keys(_exLogs).length > 0) {
        Object.entries(_exLogs).forEach(([key, data]) => {
          const lastUs = key.lastIndexOf('_');
          const exId = key.substring(0, lastUs);
          const sessionId = parseInt(key.substring(lastUs + 1));
          if (!isNaN(sessionId)) upsertExLog(uid, exId, sessionId, data).catch(console.error);
        });
      }
    }
  } else {
    // Offline fallback
    _exLogs = JSON.parse(localStorage.getItem('sv_ex_logs') || '{}');
  }
}

export function loadExLogs() {
  return _exLogs;
}

export function saveExLogs(data) {
  _exLogs = data;
  localStorage.setItem('sv_ex_logs', JSON.stringify(data));
}

export function getExLog(exId, sessionId) {
  return _exLogs[`${exId}_${sessionId}`] || null;
}

export function getLastExLog(exId, currentSessionId) {
  const entries = Object.entries(_exLogs)
    .filter(([k]) => k.startsWith(`${exId}_`) && parseInt(k.split('_').pop()) < currentSessionId)
    .sort((a, b) => parseInt(b[0].split('_').pop()) - parseInt(a[0].split('_').pop()));
  return entries.length ? entries[0][1] : null;
}

export function clearExLogs() {
  _exLogs = {};
  try { localStorage.removeItem('sv_ex_logs'); } catch(e) {}
}

export function syncAllExLogs() {
  const uid = getUserId();
  if (!uid || Object.keys(_exLogs).length === 0) return;
  Object.entries(_exLogs).forEach(([key, data]) => {
    const lastUs = key.lastIndexOf('_');
    const exId = key.substring(0, lastUs);
    const sessionId = parseInt(key.substring(lastUs + 1));
    if (!isNaN(sessionId)) upsertExLog(uid, exId, sessionId, data).catch(console.error);
  });
}

// ── Exercise swaps ──────────────────────────────────────────────
let _exSwaps = {};

export function initExSwaps() {
  try { _exSwaps = JSON.parse(localStorage.getItem('sv_ex_swaps') || '{}'); } catch(e) { _exSwaps = {}; }
}

export function getExSwap(exId, sessionId) {
  return _exSwaps[`${exId}|${sessionId}`] || null;
}

export function setExSwap(exId, sessionId, newExId) {
  const key = `${exId}|${sessionId}`;
  if (newExId) _exSwaps[key] = newExId;
  else delete _exSwaps[key];
  localStorage.setItem('sv_ex_swaps', JSON.stringify(_exSwaps));
}

export function clearExSwaps() {
  _exSwaps = {};
  try { localStorage.removeItem('sv_ex_swaps'); } catch(e) {}
}

export function saveExLog(exId, sessionId, sets, targetReps, muscle) {
  const now = new Date();
  const data = {
    date: now.toLocaleDateString('es-CO'),
    time: now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
    timestamp: now.toISOString(),
    sets,
    targetReps: parseInt(targetReps) || 0,
    muscle: muscle || '',
  };
  _exLogs[`${exId}_${sessionId}`] = data;
  localStorage.setItem('sv_ex_logs', JSON.stringify(_exLogs));
  // Sync to Supabase in the background
  const uid = getUserId();
  if (uid) upsertExLog(uid, exId, sessionId, data).catch(console.error);
}
