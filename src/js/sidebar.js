import { state, isDone, getPlan } from './state.js';

export function buildSidebar() {
  const container = document.getElementById('phaseList');
  const phases = [1, 2, 3, 4];
  const phaseColors = { 1: 'ph1', 2: 'ph2', 3: 'ph3', 4: 'ph4' };

  container.innerHTML = phases.map(ph => {
    const pSessions = getPlan().filter(s => s.phase === ph);
    const donePh = pSessions.filter(s => isDone(s.id)).length;
    return `
    <div class="phase-section">
      <div class="phase-header ${phaseColors[ph]}" onclick="togglePhase(${ph})">
        <div class="phase-dot"></div>
        FASE ${ph}
        <span class="phase-badge">${donePh}/${pSessions.length}</span>
      </div>
      <div class="session-list" id="phase-list-${ph}" style="display:${state.expandedPhases.includes(ph) ? 'block' : 'none'}">
        ${pSessions.map(s => `
          <div class="session-item ${isDone(s.id) ? 'done-item' : ''} ${state.currentId === s.id ? 'active' : ''}"
               id="si-${s.id}" onclick="loadSession(${s.id})">
            <div class="s-num">${String(s.id).padStart(2, '0')}</div>
            <div class="s-title">${s.name.split('—')[1]?.trim() || s.name}</div>
            <div class="s-check ${isDone(s.id) ? 'done' : ''}">${isDone(s.id) ? '✓' : ''}</div>
          </div>
        `).join('')}
      </div>
    </div>`;
  }).join('');

  updateSidebarProgress();
}

export function updateSidebarProgress() {
  const total = getPlan().length;
  const done = getPlan().filter(s => isDone(s.id)).length;
  document.getElementById('sidebarProgress').textContent = `${done} / ${total} sesiones completadas`;
}

export function togglePhase(ph) {
  const el = document.getElementById(`phase-list-${ph}`);
  if (el.style.display === 'none') {
    el.style.display = 'block';
    if (!state.expandedPhases.includes(ph)) state.expandedPhases.push(ph);
  } else {
    el.style.display = 'none';
    state.expandedPhases = state.expandedPhases.filter(p => p !== ph);
  }
}

export function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}
