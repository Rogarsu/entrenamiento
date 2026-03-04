import { state, saveState, getUserId } from './state.js';
import { buildStats } from './stats.js';
import { buildSidebar } from './sidebar.js';
import { loadSession } from './session.js';
import { upsertBodyMetric } from './db.js';

export function openLogForm() {
  document.getElementById('logForm').classList.add('open');
}

export function closeLogForm() {
  document.getElementById('logForm').classList.remove('open');
}

export function saveLog() {
  const _sid = state.currentId;
  const _startTs = localStorage.getItem(`sv_session_start_${_sid}`);
  const _endTs   = localStorage.getItem(`sv_session_end_${_sid}`);
  const duration = _startTs
    ? Math.round(((_endTs ? parseInt(_endTs) : Date.now()) - parseInt(_startTs)) / 60000)
    : 0;

  const log = {
    sessionId: _sid,
    date: new Date().toLocaleDateString('es-CO'),
    duration,
    energy: parseInt(document.getElementById('logEnergy').value) || 7,
    fatigue: parseInt(document.getElementById('logFatigue').value) || 6,
    pain: document.getElementById('logPain').value || 'ninguna',
    notes: document.getElementById('logNotes').value || '',
  };
  state.logs = state.logs.filter(l => l.sessionId !== _sid);
  state.logs.push(log);
  saveState();

  // Clean up session timer entries
  try {
    localStorage.removeItem(`sv_session_start_${_sid}`);
    localStorage.removeItem(`sv_session_end_${_sid}`);
  } catch(e) {}

  // Save body weight if provided
  const wt = parseFloat(document.getElementById('logWeight')?.value);
  if (wt && wt >= 30 && wt <= 300) {
    const today = new Date().toISOString().slice(0, 10);
    const uid = getUserId();
    const metrics = JSON.parse(localStorage.getItem('sv_body_metrics') || '[]');
    const idx = metrics.findIndex(m => m.metric_date === today);
    if (idx >= 0) metrics[idx].weight_kg = wt;
    else metrics.push({ metric_date: today, weight_kg: wt });
    metrics.sort((a, b) => a.metric_date.localeCompare(b.metric_date));
    localStorage.setItem('sv_body_metrics', JSON.stringify(metrics));
    if (uid) upsertBodyMetric(uid, today, wt).catch(console.error);
  }

  buildStats();
  buildSidebar();
  loadSession(_sid);
}
