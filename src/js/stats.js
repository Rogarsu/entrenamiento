import { SESSIONS } from '../data/sessions.js';
import { state, isDone } from './state.js';

export function buildStats() {
  const total = SESSIONS.length;
  const done = SESSIONS.filter(s => isDone(s.id)).length;
  const totalMin = state.logs.reduce((a, b) => a + (b.duration || 0), 0);
  const avgEnergy = state.logs.length
    ? (state.logs.reduce((a, b) => a + (b.energy || 0), 0) / state.logs.length).toFixed(1)
    : '--';

  document.getElementById('statsRow').innerHTML = `
    <div class="stat-card">
      <div class="stat-val">${done}</div>
      <div class="stat-label">Sesiones completadas</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">${done ? Math.round(done / total * 100) : 0}%</div>
      <div class="stat-label">Progreso total</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">${totalMin}</div>
      <div class="stat-label">Minutos entrenados</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">${avgEnergy}</div>
      <div class="stat-label">Energía media /10</div>
    </div>
  `;
}
