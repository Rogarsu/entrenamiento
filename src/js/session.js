import { PHASES } from '../data/phases.js';
import { EXERCISES } from '../data/exercises.js';
import { state, isDone, getLog, getPlan } from './state.js';
import { getExLog, getExSwap } from './storage.js';
import { getExRecommendation } from './progression.js';
import { escStr } from './helpers.js';
import { setNavPage } from './nav.js';

export function loadSession(id) {
  state.currentId = id;
  const s = getPlan().find(x => x.id === id);
  if (!s) return;

  // Close any overlay page so the main view is visible and update nav label
  window.hideNutritionPage?.();
  window.hideHistPage?.();
  window.hideReportsPage?.();
  window.hideProgressPage?.();
  setNavPage('fisico');

  document.querySelectorAll('.session-item').forEach(el => el.classList.remove('active'));
  const si = document.getElementById(`si-${id}`);
  if (si) { si.classList.add('active'); si.scrollIntoView({ block: 'nearest' }); }

  buildPhaseIntro(s.phase);

  const phaseColors = { 1: 'mb-phase1', 2: 'mb-phase2', 3: 'mb-phase3', 4: 'mb-phase4' };
  const intColors = { 'Bajo': 'mb-int-low', 'Medio': 'mb-int-med', 'Alto': 'mb-int-high', 'Medio-Alto': 'mb-int-high', 'Bajo-Medio': 'mb-int-med' };
  const typeName = { 'A': 'Piernas', 'B': 'Pecho/Tríceps', 'C': 'Espalda/Bíceps', 'D': 'Hombros', 'E': 'Cardio', 'F': 'Full Body', 'G': 'Deload' };

  const done = isDone(id);
  const log = getLog(id);

  // ── Stopwatch ──────────────────────────────────────────────────────────
  const _startTs = localStorage.getItem(`sv_session_start_${id}`);
  let swHtml = '';
  if (!done) {
    if (_startTs) {
      const _sd = new Date(parseInt(_startTs));
      const _hm = _sd.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
      const _el = Math.round((Date.now() - parseInt(_startTs)) / 60000);
      swHtml = `<div class="session-sw sw-active">
        <i class="ti ti-player-play-filled"></i>
        <div class="sw-info">
          <span class="sw-on">En curso · iniciada a las ${_hm}</span>
          <span class="sw-elapsed">${_el} min transcurridos</span>
        </div>
      </div>`;
    } else {
      swHtml = `<div class="session-sw">
        <button class="sw-start-btn" onclick="startSessionTimer()"><i class="ti ti-player-play"></i> Iniciar sesión</button>
        <span class="sw-hint">Captura la hora de inicio para medir la duración</span>
      </div>`;
    }
  }

  // ── Exercise completion summary ─────────────────────────────────────────
  const _totalEx = s.workout.blocks.reduce((a, bl) => a + bl.exercises.length, 0);
  const _doneEx = s.workout.blocks.reduce((a, bl) => a + bl.exercises.filter(e => {
    const swId = getExSwap(e.id, id);
    const exLog = getExLog(swId || e.id, id);
    return !!(exLog && exLog.sets && exLog.sets.length);
  }).length, 0);
  const _pendingNames = done ? [] : s.workout.blocks.flatMap(bl =>
    bl.exercises
      .filter(e => {
        const swId = getExSwap(e.id, id);
        const exLog = getExLog(swId || e.id, id);
        return !(exLog && exLog.sets && exLog.sets.length);
      })
      .map(e => {
        const swId = getExSwap(e.id, id);
        return swId ? (EXERCISES.find(x => x.id === swId)?.name || e.name) : e.name;
      })
  );
  const exCheckHtml = `<div class="log-ex-check" id="logExCheck">
    <span class="${_doneEx === _totalEx ? 'lex-complete' : 'lex-partial'}">
      <i class="ti ti-dumbbell"></i> ${_doneEx}/${_totalEx} ejercicios registrados
    </span>
    ${_pendingNames.length ? `<div class="lex-pending">Sin registrar: ${_pendingNames.join(', ')}</div>` : ''}
  </div>`;
  const _durRowHtml = _startTs
    ? `<div class="log-dur-row">
        <span class="log-label"><i class="ti ti-clock"></i> Duración</span>
        <div class="log-dur-display" id="logDurDisplay"><span class="log-dur-val">${Math.round((Date.now() - parseInt(_startTs)) / 60000)} min</span><span class="log-dur-auto"> · calculado automáticamente</span></div>
      </div>`
    : '';

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
        <div><span style="color:var(--text3)">DURACIÓN</span><br><span style="color:var(--text)">${log.duration > 0 ? log.duration + ' min' : '—'}</span></div>
        <div><span style="color:var(--text3)">ENERGÍA</span><br><span style="color:var(--amber)">${log.energy}/10</span></div>
        <div><span style="color:var(--text3)">FATIGA</span><br><span style="color:var(--cyan)">${log.fatigue}/10</span></div>
        <div><span style="color:var(--text3)">FECHA</span><br><span style="color:var(--text)">${log.date}</span></div>
      </div>
      ${log.notes ? `<div style="margin-top:10px;font-size:12px;color:var(--text2);font-style:italic;padding-top:10px;border-top:1px solid var(--border)">${log.notes}</div>` : ''}
    </div>` : ''}

    ${swHtml}

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
      <button class="gm-launch-btn" onclick="openGuidedMode()">
        <i class="ti ti-player-play-filled"></i> Modo guiado
      </button>
      ${(() => { let _exPos = 0; return s.workout.blocks.map(bl => `
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
                _exPos++;
                const _pos = _exPos;
                // Check for a user-requested swap
                const swapId = getExSwap(e.id, s.id);
                const swapEx = swapId ? EXERCISES.find(x => x.id === swapId) : null;
                const displayId   = swapEx ? swapEx.id   : e.id;
                const displayName = swapEx ? swapEx.name : e.name;
                const displayMuscle = swapEx ? swapEx.muscle_primary : e.muscle;
                const displayEquip  = swapEx ? swapEx.equip          : e.equip;
                const displayReps   = swapEx ? swapEx.reps_default   : e.reps;
                const displayRest   = swapEx ? `${swapEx.rest_seconds} seg` : e.rest;
                const displayWg     = swapEx ? (swapEx.weight_guide || '—') : (e.weight_guide || '—');

                const exRec = getExRecommendation(displayId, s.id, displayReps || '', displayMuscle || '', displayWg, _pos);
                const exLog = getExLog(displayId, s.id);
                const hasLog = !!(exLog && exLog.sets && exLog.sets.length);
                const logSummary = hasLog
                  ? exLog.sets.map(st => `${st.weight > 0 ? st.weight + 'kg' : '—'}×${st.reps}`).join(' · ')
                  : '';
                let badgeHtml = '';
                if (exRec) {
                  if (exRec.type === 'same') {
                    const r = exRec.rec;
                    const arr = r.dir === 'up' ? '↑' : r.dir === 'down' ? '↓' : '→';
                    badgeHtml = `<div class="ex-rec-badge" id="rec_badge_${displayId}"><i class="ti ti-trending-up"></i> ${r.nextWeight} kg × ${r.targetReps} reps ${arr}</div>`;
                  } else if (exRec.type === 'related' && exRec.crossRec.suggestedWeight) {
                    const icon = exRec.crossRec.level === 'high' ? '↑' : exRec.crossRec.level === 'low' ? '↓' : '→';
                    badgeHtml = `<div class="ex-rec-badge" id="rec_badge_${displayId}" style="color:var(--cyan)"><i class="ti ti-chart-bar"></i> ~${exRec.crossRec.suggestedWeight} kg ${icon}</div>`;
                  } else {
                    badgeHtml = `<div class="ex-rec-badge" id="rec_badge_${displayId}" style="display:none"></div>`;
                  }
                } else {
                  badgeHtml = `<div class="ex-rec-badge" id="rec_badge_${displayId}" style="display:none"></div>`;
                }
                const swapBadge = swapEx
                  ? `<span class="ex-swap-badge"><i class="ti ti-refresh"></i> Alternativa</span>`
                  : '';
                return `
                <tr>
                  <td>
                    <div class="ex-name${hasLog ? ' ex-logged' : ''}" onclick="openExModal('${displayId}','${escStr(displayName)}','${escStr(displayMuscle)}','${escStr(displayEquip)}','${e.sets}','${escStr(displayReps)}','${escStr(displayWg)}','${e.id}',${_pos})">
                      <span class="img-icon" id="ex_icon_${displayId}">${hasLog ? '<i class="ti ti-pencil"></i>' : '<i class="ti ti-photo"></i>'}</span> ${displayName}${swapBadge}
                    </div>
                    <div class="ex-muscle">${displayMuscle}</div>
                    <div class="ex-log-row" id="ex_log_sum_${displayId}"${hasLog ? '' : ' style="display:none"'}><i class="ti ti-check"></i> ${logSummary}<span class="ex-edit-hint"> — toca para editar</span></div>
                  </td>
                  <td><span class="ex-sets">${e.sets}</span></td>
                  <td><span class="ex-reps">${displayReps}</span></td>
                  <td><span class="ex-rest">${displayRest}</span></td>
                  <td><span class="ex-weight">${displayWg}</span>${badgeHtml}</td>
                  <td><span class="ex-notes">${e.notes || '—'}</span></td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      `).join(''); })()}
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
        : `<button class="mark-btn" onclick="finishSessionTimer()"><i class="ti ti-flag"></i> Sesión finalizada</button>`
      }
      <div class="log-form" id="logForm">
        ${exCheckHtml}
        ${_durRowHtml}
        <div class="log-grid">
          <div class="log-field"><label class="log-label">Energía (1-10)</label><input class="log-input" type="number" id="logEnergy" value="7" min="1" max="10"></div>
          <div class="log-field"><label class="log-label">Fatiga (1-10)</label><input class="log-input" type="number" id="logFatigue" value="6" min="1" max="10"></div>
          <div class="log-field log-input-full"><label class="log-label">Dolor / molestia</label><input class="log-input" type="text" id="logPain" value="ninguna"></div>
          <div class="log-field log-input-full"><label class="log-label">Notas y pesos usados</label><textarea class="log-input" id="logNotes" placeholder="Ejercicios, sensaciones, pesos utilizados..."></textarea></div>
          <div class="log-field"><label class="log-label"><i class="ti ti-scale"></i> Peso corporal (kg)</label><input class="log-input" type="number" id="logWeight" placeholder="opcional" min="30" max="300" step="0.1"></div>
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

// ── Session timer (window globals called from HTML) ────────────────────────
window.startSessionTimer = () => {
  const id = state.currentId;
  if (!id || localStorage.getItem(`sv_session_start_${id}`)) return;
  localStorage.setItem(`sv_session_start_${id}`, Date.now().toString());
  loadSession(id);
};

window.finishSessionTimer = () => {
  const id = state.currentId;
  if (!id) return;

  // Update duration display with real elapsed time
  const startTs = localStorage.getItem(`sv_session_start_${id}`);
  if (startTs) {
    const endTs = Date.now();
    localStorage.setItem(`sv_session_end_${id}`, endTs.toString());
    const durEl = document.getElementById('logDurDisplay');
    if (durEl) {
      const dur = Math.max(1, Math.round((endTs - parseInt(startTs)) / 60000));
      durEl.innerHTML = `<span class="log-dur-val">${dur} min</span><span class="log-dur-auto"> · calculado automáticamente</span>`;
    }
  }

  // Update exercise completion check with current logged state
  const exCheckEl = document.getElementById('logExCheck');
  if (exCheckEl) {
    const s = getPlan().find(x => x.id === id);
    if (s) {
      const totalEx = s.workout.blocks.reduce((a, bl) => a + bl.exercises.length, 0);
      const doneEx = s.workout.blocks.reduce((a, bl) => a + bl.exercises.filter(e => {
        const swId = getExSwap(e.id, id);
        const exLog = getExLog(swId || e.id, id);
        return !!(exLog && exLog.sets && exLog.sets.length);
      }).length, 0);
      const pendingNames = s.workout.blocks.flatMap(bl =>
        bl.exercises
          .filter(e => {
            const swId = getExSwap(e.id, id);
            const exLog = getExLog(swId || e.id, id);
            return !(exLog && exLog.sets && exLog.sets.length);
          })
          .map(e => {
            const swId = getExSwap(e.id, id);
            return swId ? (EXERCISES.find(x => x.id === swId)?.name || e.name) : e.name;
          })
      );
      exCheckEl.innerHTML = `
        <span class="${doneEx === totalEx ? 'lex-complete' : 'lex-partial'}">
          <i class="ti ti-dumbbell"></i> ${doneEx}/${totalEx} ejercicios registrados
        </span>
        ${pendingNames.length ? `<div class="lex-pending">Sin registrar: ${pendingNames.join(', ')}</div>` : ''}
      `;
    }
  }

  window.openLogForm?.();
};
