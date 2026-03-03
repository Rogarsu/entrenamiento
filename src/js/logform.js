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
  const log = {
    sessionId: state.currentId,
    date: new Date().toLocaleDateString('es-CO'),
    duration: parseInt(document.getElementById('logDur').value) || 70,
    energy: parseInt(document.getElementById('logEnergy').value) || 7,
    fatigue: parseInt(document.getElementById('logFatigue').value) || 6,
    pain: document.getElementById('logPain').value || 'ninguna',
    notes: document.getElementById('logNotes').value || '',
  };
  state.logs = state.logs.filter(l => l.sessionId !== state.currentId);
  state.logs.push(log);
  saveState();

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
  loadSession(state.currentId);
}
