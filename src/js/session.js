import { PHASES } from '../data/phases.js';
import { state, isDone, getLog, getPlan } from './state.js';
import { getExLog } from './storage.js';
import { getExRecommendation } from './progression.js';
import { escStr } from './helpers.js';

export function loadSession(id) {
  state.currentId = id;
  const s = getPlan().find(x => x.id === id);
  if (!s) return;

  // Close any overlay page so the main view is visible
  window.hideNutritionPage?.();
  window.hideHistPage?.();
  window.hideReportsPage?.();

  document.querySelectorAll('.session-item').forEach(el => el.classList.remove('active'));
  const si = document.getElementById(`si-${id}`);
  if (si) { si.classList.add('active'); si.scrollIntoView({ block: 'nearest' }); }

  buildPhaseIntro(s.phase);

  const phaseColors = { 1: 'mb-phase1', 2: 'mb-phase2', 3: 'mb-phase3', 4: 'mb-phase4' };
  const intColors = { 'Bajo': 'mb-int-low', 'Medio': 'mb-int-med', 'Alto': 'mb-int-high', 'Medio-Alto': 'mb-int-high', 'Bajo-Medio': 'mb-int-med' };
  const typeName = { 'A': 'Piernas', 'B': 'Pecho/Tríceps', 'C': 'Espalda/Bíceps', 'D': 'Hombros', 'E': 'Cardio', 'F': 'Full Body', 'G': 'Deload' };

  const done = isDone(id);
  const log = getLog(id);

  document.getElementById('sessionDetail').innerHTML = `
    <div class="session-header">
      <div class="session-num">Sesión ${String(id).padStart(2, '0')} · Fase ${s.phase}</div>
      <div class="session-title">${s.name}</div>
      <div class="session-meta">
        <span class="meta-badge ${phaseColors[s.phase]}">FASE ${s.phase}</span>
        <span class="meta-badge ${intColors[s.intensity] || 'mb-gray'}">${s.intensity}</span>
        <span class="meta-badge mb-gray"><i class="ti ti-clock"></i> ${s.duration}</span>
        <span class="meta-badge mb-gray">${typeName[s.type] || s.type}</span>
        ${done ? '<span class="meta-badge" style="border-color:var(--green);color:var(--green);background:rgba(34,197,94,0.1)"><i class="ti ti-check"></i> COMPLETADA</span>' : ''}
      </div>
    </div>

    ${done && log ? `<div class="section-card" style="border-color:rgba(34,197,94,0.3);background:rgba(34,197,94,0.05)">
      <div class="sc-label" style="color:var(--green)">Registro guardado</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:10px;font-family:var(--font-mono);font-size:12px">
        <div><span style="color:var(--text3)">DURACIÓN</span><br><span style="color:var(--text)">${log.duration} min</span></div>
        <div><span style="color:var(--text3)">ENERGÍA</span><br><span style="color:var(--amber)">${log.energy}/10</span></div>
        <div><span style="color:var(--text3)">FATIGA</span><br><span style="color:var(--cyan)">${log.fatigue}/10</span></div>
        <div><span style="color:var(--text3)">FECHA</span><br><span style="color:var(--text)">${log.date}</span></div>
      </div>
      ${log.notes ? `<div style="margin-top:10px;font-size:12px;color:var(--text2);font-style:italic;padding-top:10px;border-top:1px solid var(--border)">${log.notes}</div>` : ''}
    </div>` : ''}

    <div class="tabs">
      <button class="tab-btn active" onclick="switchTab(this,'pre')"><i class="ti ti-flame"></i> Pre-Entreno</button>
      <button class="tab-btn" onclick="switchTab(this,'workout')"><i class="ti ti-dumbbell"></i> Entreno</button>
      <button class="tab-btn" onclick="switchTab(this,'post')"><i class="ti ti-heart"></i> Post-Entreno</button>
    </div>

    <!-- PRE TAB -->
    <div class="tab-content active" id="tab-pre">
      <div class="section-card">
        <div class="sc-label">Hidratación y nutrición pre</div>
        <div class="info-item"><span class="info-bullet">◆</span><span class="info-text">${s.pre.hydration}</span></div>
      </div>
      <div class="section-card">
        <div class="sc-label">Calentamiento específico</div>
        ${s.pre.warmup.map(w => `<div class="info-item info-clickable" onclick="openExModal('pre','${escStr(w)}','Calentamiento','Sin equipamiento')"><span class="info-bullet">→</span><span class="info-text">${w}</span><span class="img-icon"><i class="ti ti-photo"></i></span></div>`).join('')}
      </div>
      <div class="section-card">
        <div class="sc-label">Movilidad articular</div>
        ${s.pre.mobility.map(m => `<div class="info-item info-clickable" onclick="openExModal('pre','${escStr(m)}','Movilidad articular','Sin equipamiento')"><span class="info-bullet">○</span><span class="info-text">${m}</span><span class="img-icon"><i class="ti ti-photo"></i></span></div>`).join('')}
      </div>
      <div class="section-card" style="border-color:rgba(245,158,11,0.25);background:rgba(245,158,11,0.04)">
        <div class="sc-label" style="color:var(--amber)">Mentalidad</div>
        <div style="font-size:13px;color:var(--text2);line-height:1.6;font-style:italic">"${s.pre.mental}"</div>
      </div>
    </div>

    <!-- WORKOUT TAB -->
    <div class="tab-content" id="tab-workout">
      ${s.workout.blocks.map(bl => `
        <div class="block-title">${bl.name}</div>
        ${bl.note ? `<div class="block-note"><i class="ti ti-bolt"></i> ${bl.note}</div>` : ''}
        <div class="ex-table-container">
          <table class="ex-table">
            <thead><tr>
              <th style="min-width:220px">Ejercicio</th>
              <th>Series</th>
              <th>Reps / Tiempo</th>
              <th>Descanso</th>
              <th>Guía de peso</th>
              <th>Notas</th>
            </tr></thead>
            <tbody>
              ${bl.exercises.map(e => {
                const exRec = getExRecommendation(e.id, s.id, e.reps || '', e.muscle || '', e.weight_guide || '');
                const exLog = getExLog(e.id, s.id);
                const hasLog = !!(exLog && exLog.sets && exLog.sets.length);
                const logSummary = hasLog
                  ? exLog.sets.map(st => `${st.weight > 0 ? st.weight + 'kg' : '—'}×${st.reps}`).join(' · ')
                  : '';
                let badgeHtml = '';
                if (exRec) {
                  if (exRec.type === 'same') {
                    const r = exRec.rec;
                    const arr = r.dir === 'up' ? '↑' : r.dir === 'down' ? '↓' : '→';
                    badgeHtml = `<div class="ex-rec-badge" id="rec_badge_${e.id}"><i class="ti ti-trending-up"></i> ${r.nextWeight} kg × ${r.targetReps} reps ${arr}</div>`;
                  } else if (exRec.type === 'related' && exRec.crossRec.suggestedWeight) {
                    const icon = exRec.crossRec.level === 'high' ? '↑' : exRec.crossRec.level === 'low' ? '↓' : '→';
                    badgeHtml = `<div class="ex-rec-badge" id="rec_badge_${e.id}" style="color:var(--cyan)"><i class="ti ti-chart-bar"></i> ~${exRec.crossRec.suggestedWeight} kg ${icon}</div>`;
                  } else {
                    badgeHtml = `<div class="ex-rec-badge" id="rec_badge_${e.id}" style="display:none"></div>`;
                  }
                } else {
                  badgeHtml = `<div class="ex-rec-badge" id="rec_badge_${e.id}" style="display:none"></div>`;
                }
                return `
                <tr>
                  <td>
                    <div class="ex-name${hasLog ? ' ex-logged' : ''}" onclick="openExModal('${e.id}','${escStr(e.name)}','${escStr(e.muscle)}','${escStr(e.equip)}','${e.sets}','${escStr(e.reps)}','${escStr(e.weight_guide || '')}')">
                      <span class="img-icon" id="ex_icon_${e.id}">${hasLog ? '<i class="ti ti-pencil"></i>' : '<i class="ti ti-photo"></i>'}</span> ${e.name}
                    </div>
                    <div class="ex-muscle">${e.muscle}</div>
                    <div class="ex-log-row" id="ex_log_sum_${e.id}"${hasLog ? '' : ' style="display:none"'}><i class="ti ti-check"></i> ${logSummary}<span class="ex-edit-hint"> — toca para editar</span></div>
                  </td>
                  <td><span class="ex-sets">${e.sets}</span></td>
                  <td><span class="ex-reps">${e.reps}</span></td>
                  <td><span class="ex-rest">${e.rest}</span></td>
                  <td><span class="ex-weight">${e.weight_guide || '—'}</span>${badgeHtml}</td>
                  <td><span class="ex-notes">${e.notes || '—'}</span></td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      `).join('')}
    </div>

    <!-- POST TAB -->
    <div class="tab-content" id="tab-post">
      <div class="section-card">
        <div class="sc-label">Enfriamiento</div>
        ${s.post.cooldown.map(c => `<div class="info-item info-clickable" onclick="openExModal('post','${escStr(c)}','Enfriamiento','Sin equipamiento')"><span class="info-bullet">↓</span><span class="info-text">${c}</span><span class="img-icon"><i class="ti ti-photo"></i></span></div>`).join('')}
      </div>
      <div class="section-card">
        <div class="sc-label">Estiramientos</div>
        ${s.post.stretches.map(st => `<div class="info-item info-clickable" onclick="openExModal('post','${escStr(st)}','Estiramiento','Colchoneta / Sin equipamiento')"><span class="info-bullet">~</span><span class="info-text">${st}</span><span class="img-icon"><i class="ti ti-photo"></i></span></div>`).join('')}
      </div>
      <div class="section-card" style="border-color:rgba(6,182,212,0.25);background:rgba(6,182,212,0.04)">
        <div class="sc-label" style="color:var(--cyan)">Nutrición post-entreno</div>
        <div style="font-size:13px;color:var(--text2);line-height:1.6">${s.post.nutrition}</div>
      </div>
      <div class="section-card">
        <div class="sc-label">Recuperación</div>
        <div style="font-size:13px;color:var(--text2);line-height:1.6">${s.post.recovery}</div>
      </div>
    </div>

    <!-- MARK DONE -->
    <div class="mark-section">
      ${done
        ? `<button class="mark-btn already-done" disabled><i class="ti ti-check"></i> Sesión ya registrada</button>`
        : `<button class="mark-btn" onclick="openLogForm()"><i class="ti ti-check"></i> Marcar como completada</button>`
      }
      <div class="log-form" id="logForm">
        <div class="log-grid">
          <div class="log-field"><label class="log-label">Duración (min)</label><input class="log-input" type="number" id="logDur" value="70" min="1" max="180"></div>
          <div class="log-field"><label class="log-label">Energía (1-10)</label><input class="log-input" type="number" id="logEnergy" value="7" min="1" max="10"></div>
          <div class="log-field"><label class="log-label">Fatiga (1-10)</label><input class="log-input" type="number" id="logFatigue" value="6" min="1" max="10"></div>
          <div class="log-field log-input-full"><label class="log-label">Dolor / molestia</label><input class="log-input" type="text" id="logPain" value="ninguna"></div>
          <div class="log-field log-input-full"><label class="log-label">Notas y pesos usados</label><textarea class="log-input" id="logNotes" placeholder="Ejercicios, sensaciones, pesos utilizados..."></textarea></div>
        </div>
        <div class="log-actions">
          <button class="btn-save" onclick="saveLog()"><i class="ti ti-device-floppy"></i> Guardar</button>
          <button class="btn-cancel" onclick="closeLogForm()">Cancelar</button>
        </div>
      </div>
    </div>
  `;

  if (window.innerWidth <= 768) document.getElementById('sidebar').classList.remove('open');
}

export function buildPhaseIntro(phase) {
  const p = PHASES[phase];
  const phaseColors = { 1: 'var(--amber)', 2: 'var(--cyan)', 3: 'var(--red)', 4: 'var(--green)' };
  const color = phaseColors[phase];
  const pSessions = getPlan().filter(s => s.phase === phase);
  const done = pSessions.filter(s => isDone(s.id)).length;

  document.getElementById('phaseIntroBox').innerHTML = `
    <div class="phase-intro" style="border-color:${color}30">
      <div class="pi-phase" style="color:${color}">FASE ${phase}</div>
      <div class="pi-name" style="color:${color}">${p.name.split('—')[1]?.trim() || p.name}</div>
      <div class="pi-desc">${p.desc}</div>
      <div class="pi-stats">
        <div class="pi-stat"><div class="pi-stat-val" style="color:${color}">${p.weeks}</div><div class="pi-stat-label">Duración</div></div>
        <div class="pi-stat"><div class="pi-stat-val" style="color:${color}">${done}/${p.sessions.split(' ')[0]}</div><div class="pi-stat-label">Completadas</div></div>
      </div>
    </div>
  `;
}

export function switchTab(btn, tabId) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const tab = document.getElementById('tab-' + tabId);
  if (tab) tab.classList.add('active');
}
