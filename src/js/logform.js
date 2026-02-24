import { state, saveState } from './state.js';
import { buildStats } from './stats.js';
import { buildSidebar } from './sidebar.js';
import { loadSession } from './session.js';

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
  buildStats();
  buildSidebar();
  loadSession(state.currentId);
}
