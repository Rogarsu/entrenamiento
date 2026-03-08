import { state, getPlan } from './state.js';
import { getExImage } from '../data/images.js';
import { EXERCISES } from '../data/exercises.js';
import { getExLog, getLastExLog, saveExLog, setExSwap } from './storage.js';
import { calcNextRecommendation, calcCrossExRecommendation, getRelatedExLogs, getExRecommendation } from './progression.js';
import { escStr, muscleSvg, equipIcon, diffLabel, catLabel, muscleName } from './helpers.js';
import { startRestTimer } from './timer.js';
import { loadSession } from './session.js';

let _exCtx = null;

// ── Inline set-timer helpers ──────────────────────────────────────────────────

function _parseRestSecs(restStr) {
  if (!restStr) return 90;
  // "90-120 seg" → lower bound
  const range = restStr.match(/(\d+)\s*[-–]\s*(\d+)\s*seg/i);
  if (range) return parseInt(range[1]);
  const seg = restStr.match(/(\d+)\s*seg/i);
  if (seg) return parseInt(seg[1]);
  const min = restStr.match(/(\d+)\s*min/i);
  if (min) return parseInt(min[1]) * 60;
  return 90;
}

function _fmtSecs(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, '0')}`;
}

function _logSection() { return document.getElementById('exLogSection'); }

function _stopInlineTimer() {
  if (_exCtx && _exCtx._inlineTimer) {
    clearInterval(_exCtx._inlineTimer);
    _exCtx._inlineTimer = null;
  }
}

function _doneSummaryHtml(completedSets) {
  if (!completedSets.length) return '';
  return `<div class="eit-done-list">` +
    completedSets.map((s, i) => `<div class="eit-done-row">
      <span class="eit-label">Serie ${i + 1}</span>
      <span>${s.weight > 0 ? s.weight + ' kg' : '—'} × ${s.reps} reps</span>
    </div>`).join('') +
    `</div>`;
}

function _renderPerSetInput() {
  _stopInlineTimer();
  const el = _logSection();
  if (!el || !_exCtx) return;
  const { currentSet, numSets, completedSets, targetReps } = _exCtx;
  const isLast = currentSet === numSets - 1;

  // Pre-fill placeholder from last session
  const lastLog = getLastExLog(_exCtx.id, state.currentId);
  const lastSet = lastLog && lastLog.sets && lastLog.sets[currentSet];
  const wPh = lastSet && lastSet.weight ? lastSet.weight : 'kg';
  const rPh = lastSet && lastSet.reps ? lastSet.reps : 'reps';

  el.innerHTML = `
    ${_doneSummaryHtml(completedSets)}
    <div class="ex-log-title">📝 Serie ${currentSet + 1} de ${numSets}${targetReps ? ' &nbsp;·&nbsp; ' + targetReps : ''}</div>
    <div class="ex-log-set-row" style="margin-bottom:14px">
      <input class="ex-log-input" type="number" id="exSetW" placeholder="${wPh}" min="0" step="0.5" style="width:80px">
      <span class="ex-log-unit">kg</span>
      <span class="ex-log-unit" style="margin:0 4px">×</span>
      <input class="ex-log-input" type="number" id="exSetR" placeholder="${rPh}" min="0" style="width:80px">
      <span class="ex-log-unit">reps</span>
    </div>
    <button class="ex-log-save" onclick="window._exCompleteSet()" style="width:100%">
      ${isLast ? '✓ Completar y guardar' : '✓ Completar serie →'}
    </button>
  `;
  setTimeout(() => { const w = document.getElementById('exSetW'); if (w) w.focus(); }, 50);
}

function _startInlineTimer(secs) {
  _stopInlineTimer();
  const el = _logSection();
  if (!el || !_exCtx) return;

  const circ = +(2 * Math.PI * 28).toFixed(2);
  _exCtx._eitRemaining = secs;
  _exCtx._eitTotal = secs;

  const { currentSet, numSets, completedSets } = _exCtx;

  el.innerHTML = `
    ${_doneSummaryHtml(completedSets)}
    <div class="eit-wrap">
      <div class="eit-title">Descanso — siguiente: serie ${currentSet + 1} de ${numSets}</div>
      <div class="eit-ring-wrap">
        <svg class="eit-ring" viewBox="0 0 64 64">
          <circle class="eit-ring-bg" cx="32" cy="32" r="28"/>
          <circle class="eit-ring-fill" id="eitRingFill" cx="32" cy="32" r="28"
            style="stroke-dasharray:${circ};stroke-dashoffset:0"/>
        </svg>
        <div class="eit-count" id="eitCount">${_fmtSecs(secs)}</div>
      </div>
      <div class="eit-controls">
        <button class="eit-btn" onclick="window._eitAdjust(-30)">−30</button>
        <button class="eit-btn" onclick="window._eitAdjust(30)">+30</button>
        <button class="eit-btn-skip" onclick="window._eitSkip()">Saltar <i class="ti ti-player-skip-forward"></i></button>
      </div>
    </div>
  `;

  _exCtx._inlineTimer = setInterval(() => {
    if (!_exCtx) return;
    _exCtx._eitRemaining--;
    if (_exCtx._eitRemaining <= 0) {
      _exCtx._eitRemaining = 0;
      clearInterval(_exCtx._inlineTimer);
      _exCtx._inlineTimer = null;
      try { if (navigator.vibrate) navigator.vibrate([150, 80, 150]); } catch(e) {}
      _renderPerSetInput();
    } else {
      const countEl = document.getElementById('eitCount');
      if (countEl) countEl.textContent = _fmtSecs(_exCtx._eitRemaining);
      const fillEl = document.getElementById('eitRingFill');
      if (fillEl) {
        const progress = _exCtx._eitTotal > 0 ? _exCtx._eitRemaining / _exCtx._eitTotal : 0;
        fillEl.style.strokeDashoffset = `${circ * (1 - progress)}`;
      }
    }
  }, 1000);
}

function _updateCrossBadges(id) {
  const curSession = getPlan().find(x => x.id === state.currentId);
  if (!curSession) return;
  curSession.workout.blocks.forEach(bl => {
    bl.exercises.forEach(ex => {
      if (ex.id === id) return;
      const exBadge = document.getElementById(`rec_badge_${ex.id}`);
      if (!exBadge) return;
      const exRec = getExRecommendation(ex.id, state.currentId, ex.reps || '', ex.muscle || '', ex.weight_guide || '');
      if (!exRec) return;
      if (exRec.type === 'same') {
        const r = exRec.rec;
        const arr = r.dir === 'up' ? '↑' : r.dir === 'down' ? '↓' : '→';
        exBadge.textContent = `📈 ${r.nextWeight} kg × ${r.targetReps} reps ${arr}`;
        exBadge.style.color = '';
        exBadge.style.display = 'block';
      } else if (exRec.type === 'related' && exRec.crossRec && exRec.crossRec.suggestedWeight) {
        const icon = exRec.crossRec.level === 'high' ? '↑' : exRec.crossRec.level === 'low' ? '↓' : '→';
        exBadge.textContent = `📊 ~${exRec.crossRec.suggestedWeight} kg ${icon}`;
        exBadge.style.color = 'var(--cyan)';
        exBadge.style.display = 'block';
      }
    });
  });
}

function _updateSessionRow(id, sets) {
  const sumEl = document.getElementById(`ex_log_sum_${id}`);
  if (sumEl) {
    const summary = sets.map(st => `${st.weight > 0 ? st.weight + 'kg' : '—'}×${st.reps}`).join(' · ');
    sumEl.innerHTML = `✓ ${summary}<span class="ex-edit-hint"> — toca para editar</span>`;
    sumEl.style.display = 'block';
  }
  const iconEl = document.getElementById(`ex_icon_${id}`);
  if (iconEl) iconEl.textContent = '✏️';
}

function _saveAllSets() {
  if (!_exCtx) return;
  _stopInlineTimer();
  const { id, targetReps, muscle, completedSets } = _exCtx;

  saveExLog(id, state.currentId, completedSets, targetReps, muscle);

  const badge = document.getElementById(`rec_badge_${id}`);
  if (badge) {
    const rec = calcNextRecommendation(targetReps, completedSets, _exCtx.position || 1);
    const arrow = rec.dir === 'up' ? '↑' : rec.dir === 'down' ? '↓' : '→';
    badge.textContent = `📈 ${rec.nextWeight} kg × ${rec.targetReps} reps ${arrow}`;
    badge.style.color = '';
    badge.style.display = 'block';
  }
  _updateCrossBadges(id);
  _updateSessionRow(id, completedSets);

  // Show done state inside modal
  const el = _logSection();
  if (el) {
    el.innerHTML = `
      ${_doneSummaryHtml(completedSets)}
      <div class="ex-log-saved" style="display:block;margin-top:8px">✓ Guardado</div>
    `;
  }

  const recDiv = document.getElementById('exModalRec');
  if (recDiv) recDiv.innerHTML = buildRecSection(id, state.currentId, targetReps, muscle, _exCtx.weightGuide, _exCtx.position || 1);

  startRestTimer(id);
}

// ── Window handlers ───────────────────────────────────────────────────────────

window._exCompleteSet = () => {
  if (!_exCtx || _exCtx.currentSet < 0) return;
  const weight = parseFloat(document.getElementById('exSetW')?.value) || 0;
  const reps = parseInt(document.getElementById('exSetR')?.value) || 0;
  _exCtx.completedSets.push({ weight, reps });
  _exCtx.currentSet++;
  if (_exCtx.currentSet >= _exCtx.numSets) {
    _saveAllSets();
  } else {
    _startInlineTimer(_parseRestSecs(_exCtx.restStr));
  }
};

window._eitSkip = () => {
  _stopInlineTimer();
  _renderPerSetInput();
};

window._eitAdjust = (delta) => {
  if (!_exCtx) return;
  _exCtx._eitRemaining = Math.max(5, (_exCtx._eitRemaining || 0) + delta);
  if (_exCtx._eitRemaining > (_exCtx._eitTotal || 0)) _exCtx._eitTotal = _exCtx._eitRemaining;
  const circ = +(2 * Math.PI * 28).toFixed(2);
  const countEl = document.getElementById('eitCount');
  if (countEl) countEl.textContent = _fmtSecs(_exCtx._eitRemaining);
  const fillEl = document.getElementById('eitRingFill');
  if (fillEl) {
    const progress = _exCtx._eitTotal > 0 ? _exCtx._eitRemaining / _exCtx._eitTotal : 0;
    fillEl.style.strokeDashoffset = `${circ * (1 - progress)}`;
  }
};

// ── Main modal ────────────────────────────────────────────────────────────────

export function openExModal(id, name, muscle, equip, targetSets, targetReps, weightGuide, originalId, position = 1) {
  const modal = document.getElementById('exModalContent');
  const imgSrc  = getExImage(id, name);
  const catalog = EXERCISES.find(x => x.id === id);

  // ── Description tab content
  const secMuscles = (catalog?.muscles_secondary || [])
    .map(m => `<span class="gm-sec-chip">${muscleName(m)}</span>`)
    .join('');

  const descPanel = `
    <div class="gm-desc-grid">
      <div class="gm-desc-cell">
        <div class="gm-desc-label">Nivel</div>
        ${diffLabel(catalog?.difficulty)}
      </div>
      <div class="gm-desc-cell">
        <div class="gm-desc-label">Tipo</div>
        <span class="gm-cat-badge">${catLabel(catalog?.category)}</span>
      </div>
    </div>
    <div class="gm-desc-divider"></div>
    <div class="gm-desc-label">Músculo principal</div>
    <div class="gm-muscle-card">
      ${muscleSvg(muscle)}
      <span class="gm-muscle-label">${muscle || '—'}</span>
    </div>
    ${secMuscles ? `
    <div class="gm-desc-divider"></div>
    <div class="gm-desc-label">Músculos involucrados</div>
    <div class="gm-sec-muscles">${secMuscles}</div>
    ` : ''}
    <div class="gm-desc-divider"></div>
    <div class="gm-desc-label">Equipamiento</div>
    <div class="gm-equip-chip">
      ${equipIcon(equip)}
      <span>${equip || '—'}</span>
    </div>
  `;

  const numSets = parseInt(targetSets) || 0;
  const origId  = originalId || id;
  let logSection = '';

  if (numSets > 0 && id !== 'pre' && id !== 'post') {
    let restStr = '90 seg';
    const session = getPlan().find(s => s.id === state.currentId);
    if (session) {
      for (const bl of session.workout.blocks) {
        const ex = bl.exercises.find(e => e.id === origId);
        if (ex && ex.rest) { restStr = ex.rest; break; }
      }
    }

    const existing  = getExLog(id, state.currentId);
    const isSwapped = origId !== id;
    const swapBtnHtml = `
      <div class="ex-swap-actions">
        <button class="ex-swap-btn" onclick="window._exShowPicker()"><i class="ti ti-refresh"></i> Cambiar ejercicio</button>
        ${isSwapped ? `<button class="ex-swap-btn ex-swap-reset" onclick="window._exResetSwap()"><i class="ti ti-arrow-back-up"></i> Volver al original</button>` : ''}
      </div>
      <div id="exPickerWrap" style="display:none"></div>`;

    if (existing && existing.sets && existing.sets.length) {
      // EDIT MODE — show all sets at once
      _exCtx = { id, origId, numSets, targetReps: targetReps || '', muscle: muscle || '', weightGuide: weightGuide || '', position: parseInt(position) || 1, restStr, currentSet: -1, completedSets: [], _inlineTimer: null };
      const rows = Array.from({ length: numSets }, (_, i) => {
        const saved = existing.sets[i];
        const w = saved ? saved.weight : '';
        const r = saved ? saved.reps : '';
        return `<div class="ex-log-set-row">
          <span class="ex-log-set-label">Serie ${i + 1}</span>
          <input class="ex-log-input" type="number" id="exw_${i}" placeholder="kg" value="${w}" min="0" step="0.5">
          <span class="ex-log-unit">kg</span>
          <span class="ex-log-unit" style="margin:0 2px">×</span>
          <input class="ex-log-input" type="number" id="exr_${i}" placeholder="reps" value="${r}" min="0">
          <span class="ex-log-unit">reps</span>
        </div>`;
      }).join('');
      logSection = `
        <div class="ex-modal-log">
          <div class="ex-log-title"><i class="ti ti-pencil"></i> Editando registro — sesión actual</div>
          ${rows}
          <button class="ex-log-save" onclick="saveCurrentExLog()"><i class="ti ti-device-floppy"></i> Guardar cambios</button>
          <div class="ex-log-saved" id="exLogSaved">✓ Guardado</div>
        </div>
        ${swapBtnHtml}
        <div class="ex-modal-rec" id="exModalRec">
          ${buildRecSection(id, state.currentId, targetReps || '', muscle || '', weightGuide || '', parseInt(position) || 1)}
        </div>`;
    } else {
      // PER-SET MODE — new entry (one set at a time)
      _exCtx = { id, origId, numSets, targetReps: targetReps || '', muscle: muscle || '', weightGuide: weightGuide || '', position: parseInt(position) || 1, restStr, currentSet: 0, completedSets: [], _inlineTimer: null };
      logSection = `
        <div class="ex-modal-log">
          <div id="exLogSection"></div>
        </div>
        ${swapBtnHtml}
        <div class="ex-modal-rec" id="exModalRec">
          ${buildRecSection(id, state.currentId, targetReps || '', muscle || '', weightGuide || '', parseInt(position) || 1)}
        </div>`;
    }
  }

  modal.innerHTML = `
    <div class="ex-modal-tabs">
      <button class="ex-modal-tab ex-modal-tab--active" id="exTabImg" onclick="window._exSwitchTab('img')">
        <i class="ti ti-photo"></i> Imagen
      </button>
      <button class="ex-modal-tab" id="exTabDesc" onclick="window._exSwitchTab('desc')">
        <i class="ti ti-info-circle"></i> Descripción
      </button>
    </div>

    <div id="exPanelImg" class="ex-modal-img-wrap">
      ${imgSrc
        ? `<img src="${imgSrc}" alt="${name}" class="ex-modal-img-full">`
        : `<div class="ex-modal-img-placeholder"><i class="ti ti-dumbbell"></i></div>`}
    </div>

    <div id="exPanelDesc" class="ex-modal-desc-panel" style="display:none">
      ${descPanel}
    </div>

    <div class="ex-modal-body">
      <div class="ex-modal-name">${name}</div>
      <div class="ex-modal-guide">
        ${targetSets} series × ${targetReps}${weightGuide && weightGuide !== '—' ? ' &nbsp;·&nbsp; ' + weightGuide : ''}
      </div>
      ${logSection}
    </div>
  `;

  window._exSwitchTab = (tab) => {
    const img  = document.getElementById('exPanelImg');
    const desc = document.getElementById('exPanelDesc');
    const tImg  = document.getElementById('exTabImg');
    const tDesc = document.getElementById('exTabDesc');
    if (!img || !desc) return;
    img.style.display  = tab === 'img'  ? '' : 'none';
    desc.style.display = tab === 'desc' ? '' : 'none';
    tImg?.classList.toggle('ex-modal-tab--active',  tab === 'img');
    tDesc?.classList.toggle('ex-modal-tab--active', tab === 'desc');
  };

  document.getElementById('exModal').classList.add('open');

  if (_exCtx && _exCtx.currentSet === 0) {
    _renderPerSetInput();
  }
}

export function closeExModal() {
  _stopInlineTimer();
  document.getElementById('exModal').classList.remove('open');
}

export function saveCurrentExLog() {
  // Used in EDIT MODE only (existing log with all sets visible)
  if (!_exCtx) return;
  const { id, numSets, targetReps, muscle } = _exCtx;
  const sets = [];
  for (let i = 0; i < numSets; i++) {
    const w = parseFloat(document.getElementById(`exw_${i}`)?.value) || 0;
    const r = parseInt(document.getElementById(`exr_${i}`)?.value) || 0;
    sets.push({ weight: w, reps: r });
  }
  saveExLog(id, state.currentId, sets, targetReps, muscle);

  const badge = document.getElementById(`rec_badge_${id}`);
  if (badge) {
    const rec = calcNextRecommendation(targetReps, sets, _exCtx.position || 1);
    const arrow = rec.dir === 'up' ? '↑' : rec.dir === 'down' ? '↓' : '→';
    badge.textContent = `📈 ${rec.nextWeight} kg × ${rec.targetReps} reps ${arrow}`;
    badge.style.color = '';
    badge.style.display = 'block';
  }
  _updateCrossBadges(id);

  startRestTimer(id);

  const fb = document.getElementById('exLogSaved');
  if (fb) { fb.style.display = 'block'; setTimeout(() => { fb.style.display = 'none'; }, 2000); }
  const recDiv = document.getElementById('exModalRec');
  if (recDiv) recDiv.innerHTML = buildRecSection(id, state.currentId, targetReps, muscle, _exCtx.weightGuide, _exCtx.position || 1);

  _updateSessionRow(id, sets);
}

export function buildRecSection(exId, sessionId, targetRepsStr, muscle, weightGuide, position = 1) {
  const curLog = getExLog(exId, sessionId);
  const sameLog = getLastExLog(exId, sessionId);

  if (sameLog && sameLog.sets && sameLog.sets.length) {
    const rec = calcNextRecommendation(targetRepsStr, sameLog.sets, position);
    const arrow = rec.dir === 'up' ? '↑' : rec.dir === 'down' ? '↓' : '→';
    const cls = rec.dir === 'down' ? 'down' : '';
    const hist = sameLog.sets.map((s, i) => `S${i + 1}: ${s.weight}kg×${s.reps}`).join(' · ');
    return `<div class="ex-log-title">📈 Recomendación próxima sesión — mismo ejercicio</div>
      <div class="ex-rec-box"><span class="ex-rec-arrow ${cls}">${arrow}</span>${rec.nextWeight} kg × ${rec.targetReps} reps</div>
      <div class="ex-rec-reason">${rec.reason}</div>
      ${rec.fatigueNote ? `<div class="ex-fatigue-note"><i class="ti ti-info-circle"></i> ${rec.fatigueNote}</div>` : ''}
      <div class="ex-rec-reason" style="margin-top:6px;opacity:0.65">Última sesión (${sameLog.date}): ${hist}</div>`;
  }

  if (curLog && curLog.sets && curLog.sets.length) {
    const rec = calcNextRecommendation(targetRepsStr, curLog.sets, position);
    const arrow = rec.dir === 'up' ? '↑' : rec.dir === 'down' ? '↓' : '→';
    const cls = rec.dir === 'down' ? 'down' : '';
    return `<div class="ex-log-title">📈 Proyección para la próxima sesión</div>
      <div class="ex-rec-box"><span class="ex-rec-arrow ${cls}">${arrow}</span>${rec.nextWeight} kg × ${rec.targetReps} reps</div>
      <div class="ex-rec-reason">${rec.reason}</div>
      ${rec.fatigueNote ? `<div class="ex-fatigue-note"><i class="ti ti-info-circle"></i> ${rec.fatigueNote}</div>` : ''}`;
  }

  if (muscle) {
    const related = getRelatedExLogs(muscle, sessionId, exId);
    if (related.length) {
      const cr = calcCrossExRecommendation(weightGuide, related);
      if (cr) {
        const icon = cr.level === 'high' ? '↑' : cr.level === 'low' ? '↓' : '→';
        const cls = cr.level === 'low' ? 'down' : '';
        const weightLine = cr.suggestedWeight
          ? `<div class="ex-rec-box"><span class="ex-rec-arrow ${cls}">${icon}</span>~${cr.suggestedWeight} kg <span style="font-size:13px;font-weight:400;color:var(--text3)">(rango guía: ${cr.suggestedRange})</span></div>`
          : `<div class="ex-rec-box"><span class="ex-rec-arrow ${cls}">${icon}</span>${cr.level === 'high' ? 'Extremo superior' : cr.level === 'low' ? 'Extremo inferior' : 'Mitad del rango'} de la guía</div>`;
        const relNames = [...new Set(related.slice(0, 3).map(r => r.exId.replace(/_/g, ' ')))].join(', ');
        return `<div class="ex-log-title">📊 Basado en músculos similares (${related.length} ejercicio${related.length > 1 ? 's' : ''})</div>
          ${weightLine}
          <div class="ex-rec-reason">${cr.reason}</div>
          <div class="ex-rec-reason" style="margin-top:6px;opacity:0.65">Ejercicios referencia: ${relNames}</div>`;
      }
    }
  }

  return `<div class="ex-log-title">📈 Recomendación próxima sesión</div>
    <div class="ex-rec-first">Primera vez registrando este ejercicio y grupo muscular.<br>Usa la guía de peso como referencia inicial y anota lo que uses hoy.</div>`;
}

// ── Exercise swap helpers ──────────────────────────────────────────────────
window._exShowPicker = () => {
  if (!_exCtx) return;
  const wrap = document.getElementById('exPickerWrap');
  if (!wrap) return;
  if (wrap.style.display !== 'none') { wrap.style.display = 'none'; return; }

  const currentMuscle = _exCtx.muscle;
  const alts = EXERCISES.filter(ex => ex.muscle_primary === currentMuscle && ex.id !== _exCtx.id);

  if (!alts.length) {
    wrap.innerHTML = `<div class="ex-picker-empty">No hay alternativas para este grupo muscular.</div>`;
    wrap.style.display = 'block';
    return;
  }

  const items = alts.map(ex => {
    const diffLabel = { beginner: 'Básico', intermediate: 'Intermedio', advanced: 'Avanzado' }[ex.difficulty] || ex.difficulty;
    return `<div class="ex-picker-item" onclick="window._exSelectAlt('${ex.id}')">
      <div class="ex-picker-name">${ex.name}</div>
      <div class="ex-picker-meta">${ex.equip} · ${diffLabel}</div>
    </div>`;
  }).join('');

  wrap.innerHTML = `
    <div class="ex-picker">
      <div class="ex-picker-title"><i class="ti ti-refresh"></i> Elegir alternativa — ${currentMuscle}</div>
      <div class="ex-picker-list">${items}</div>
    </div>`;
  wrap.style.display = 'block';
};

window._exSelectAlt = (newExId) => {
  if (!_exCtx) return;
  setExSwap(_exCtx.origId, state.currentId, newExId);
  closeExModal();
  loadSession(state.currentId);
};

window._exResetSwap = () => {
  if (!_exCtx) return;
  setExSwap(_exCtx.origId, state.currentId, null);
  closeExModal();
  loadSession(state.currentId);
};
