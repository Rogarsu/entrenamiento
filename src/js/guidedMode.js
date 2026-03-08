import { state, getPlan } from './state.js';
import { EXERCISES } from '../data/exercises.js';
import { getExLog, getLastExLog, saveExLog, getExSwap } from './storage.js';
import { getExImage } from '../data/images.js';
import { calcNextRecommendation } from './progression.js';
import { startRestTimer } from './timer.js';

// ── State ─────────────────────────────────────────────────────────────────────
let _gm = {
  blocks: [],
  startBlockIdx: 0,
  blockIdx: 0,
  exIdx: 0,
  totalExCount: 0,
  currentExNum: 0,
  currentSet: 0,
  numSets: 0,
  completedSets: [],
  restStr: '90 seg',
  _inlineTimer: null,
  _eitRemaining: 0,
  _eitTotal: 0,
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function _parseRestSecs(restStr) {
  if (!restStr) return 90;
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

function _overlay() { return document.getElementById('guidedOverlay'); }

function _stopGMTimer() {
  if (_gm._inlineTimer) {
    clearInterval(_gm._inlineTimer);
    _gm._inlineTimer = null;
  }
}

function _currentEx() {
  return _gm.blocks[_gm.blockIdx]?.exercises[_gm.exIdx];
}

function _isLastExercise() {
  const lastInBlock = _gm.exIdx >= _gm.blocks[_gm.blockIdx].exercises.length - 1;
  const lastBlock   = _gm.blockIdx >= _gm.blocks.length - 1;
  return lastInBlock && lastBlock;
}

function _updateGMChips() {
  const el = document.getElementById('gmSetsChips');
  if (!el) return;
  if (_gm.completedSets.length === 0) { el.innerHTML = ''; return; }
  el.innerHTML = _gm.completedSets.map((s, i) =>
    `<span class="gm-set-chip done">S${i + 1}: ${s.weight > 0 ? s.weight + 'kg' : 'PC'} × ${s.reps}</span>`
  ).join('');
}

// ── Muscle SVG ────────────────────────────────────────────────────────────────
function _muscleSvg(muscleName) {
  const m = (muscleName || '').toLowerCase();
  let zone = 'core';
  if (m.includes('pecho') || m.includes('chest') || m.includes('pectoral'))        zone = 'chest';
  else if (m.includes('espalda') || m.includes('back') || m.includes('dorsal') ||
           m.includes('trapecio') || m.includes('lumbar') || m.includes('lat'))     zone = 'back';
  else if (m.includes('hombro') || m.includes('shoulder') || m.includes('deltoid')) zone = 'shoulders';
  else if (m.includes('bícep') || m.includes('bicep'))                              zone = 'biceps';
  else if (m.includes('trícep') || m.includes('tricep'))                            zone = 'triceps';
  else if (m.includes('pierna') || m.includes('leg') || m.includes('cuádr') ||
           m.includes('quad') || m.includes('isquio') || m.includes('hamst') ||
           m.includes('fémor') || m.includes('femore'))                             zone = 'legs';
  else if (m.includes('glút') || m.includes('glute') || m.includes('pompi'))        zone = 'glutes';
  else if (m.includes('gemel') || m.includes('calf') || m.includes('soleo') ||
           m.includes('tibial'))                                                     zone = 'calves';
  else if (m.includes('abdom') || m.includes('core') || m.includes('oblicu'))       zone = 'core';

  const C = 'rgba(6,182,212,0.85)';
  const P = 'rgba(139,92,246,0.8)';

  const highlights = {
    chest:     `<rect x="19" y="22" width="22" height="14" rx="2" fill="${C}"/>`,
    core:      `<rect x="19" y="37" width="22" height="13" rx="2" fill="${C}"/>`,
    shoulders: `<rect x="7" y="18" width="9" height="11" rx="3" fill="${C}"/><rect x="44" y="18" width="9" height="11" rx="3" fill="${C}"/>`,
    biceps:    `<rect x="8" y="29" width="8" height="13" rx="3" fill="${C}"/><rect x="44" y="29" width="8" height="13" rx="3" fill="${C}"/>`,
    triceps:   `<rect x="8" y="29" width="8" height="13" rx="3" fill="${C}"/><rect x="44" y="29" width="8" height="13" rx="3" fill="${C}"/>`,
    legs:      `<rect x="18" y="53" width="10" height="20" rx="3" fill="${C}"/><rect x="32" y="53" width="10" height="20" rx="3" fill="${C}"/>`,
    glutes:    `<rect x="18" y="50" width="24" height="9" rx="3" fill="${C}"/>`,
    calves:    `<rect x="19" y="74" width="8" height="16" rx="3" fill="${C}"/><rect x="33" y="74" width="8" height="16" rx="3" fill="${C}"/>`,
    back:      `<rect x="19" y="22" width="22" height="28" rx="2" fill="${P}"/>`,
  };

  return `<svg viewBox="0 0 60 96" width="48" height="77" style="flex-shrink:0">
    <circle cx="30" cy="7" r="6" fill="none" stroke="var(--border2)" stroke-width="1.5"/>
    <rect x="26" y="13" width="8" height="5" rx="2" fill="none" stroke="var(--border2)" stroke-width="1.2"/>
    <rect x="17" y="18" width="26" height="32" rx="4" fill="none" stroke="var(--border2)" stroke-width="1.5"/>
    <rect x="7" y="18" width="9" height="28" rx="4" fill="none" stroke="var(--border2)" stroke-width="1.5"/>
    <rect x="44" y="18" width="9" height="28" rx="4" fill="none" stroke="var(--border2)" stroke-width="1.5"/>
    <rect x="17" y="51" width="11" height="35" rx="4" fill="none" stroke="var(--border2)" stroke-width="1.5"/>
    <rect x="32" y="51" width="11" height="35" rx="4" fill="none" stroke="var(--border2)" stroke-width="1.5"/>
    ${highlights[zone] || highlights.core}
  </svg>`;
}

// ── Equipment icon ────────────────────────────────────────────────────────────
function _equipIcon(equip) {
  const e = (equip || '').toLowerCase();
  let icon = 'ti-dumbbell';
  if      (e.includes('barra') || e.includes('barbell'))               icon = 'ti-barbell';
  else if (e.includes('mancuerna') || e.includes('dumbbell'))          icon = 'ti-dumbbell';
  else if (e.includes('polea') || e.includes('cable'))                 icon = 'ti-arrow-guide';
  else if (e.includes('máquina') || e.includes('machine'))             icon = 'ti-settings-cog';
  else if (e.includes('kettlebell'))                                    icon = 'ti-circle-filled';
  else if (e.includes('sin') || e.includes('corporal') || e.includes('bodyweight') || e.includes('no equip')) icon = 'ti-user';
  else if (e.includes('banco') || e.includes('silla') || e.includes('bench'))       icon = 'ti-armchair';
  else if (e.includes('banda') || e.includes('elástico') || e.includes('band'))     icon = 'ti-wave-saw-tool';
  else if (e.includes('trx') || e.includes('suspensión'))              icon = 'ti-rings';
  return `<i class="ti ${icon}"></i>`;
}

// ── Labels ────────────────────────────────────────────────────────────────────
function _diffLabel(diff) {
  const labels = { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado' };
  const cls    = { beginner: 'gm-diff--beginner', intermediate: 'gm-diff--intermediate', advanced: 'gm-diff--advanced' };
  const text   = labels[diff] || 'Intermedio';
  const c      = cls[diff] || cls.intermediate;
  return `<span class="gm-diff-badge ${c}">${text}</span>`;
}

function _catLabel(cat) {
  const map = { compound: 'Compuesto', isolation: 'Aislado', cardio: 'Cardio', core: 'Core', mobility: 'Movilidad' };
  return map[cat] || cat || '';
}

function _muscleName(muscle) {
  const map = {
    chest: 'Pecho', pecho: 'Pecho',
    back: 'Espalda', espalda: 'Espalda', lats: 'Dorsales', traps: 'Trapecios',
    shoulders: 'Hombros', hombros: 'Hombros',
    biceps: 'Bíceps', triceps: 'Tríceps',
    legs: 'Piernas', quads: 'Cuádriceps', hamstrings: 'Isquiotibiales',
    glutes: 'Glúteos', calves: 'Gemelos',
    core: 'Core', abs: 'Abdomen', forearms: 'Antebrazos',
  };
  return map[(muscle || '').toLowerCase()] || muscle || '—';
}

// ── Per-set input ─────────────────────────────────────────────────────────────
function _renderGMPerSetInput() {
  _stopGMTimer();
  const el = document.getElementById('gmLogSection');
  if (!el) return;
  const ex = _currentEx();
  if (!ex) return;

  const isLast = _gm.currentSet === _gm.numSets - 1;
  const lastLog = getLastExLog(ex.id, state.currentId);
  const lastSet = lastLog && lastLog.sets && lastLog.sets[_gm.currentSet];
  const wPh = lastSet && lastSet.weight ? lastSet.weight : 'kg';
  const rPh = lastSet && lastSet.reps  ? lastSet.reps  : 'reps';

  el.innerHTML = `
    <div class="ex-log-title">Serie ${_gm.currentSet + 1} de ${_gm.numSets}${ex.reps ? ' &nbsp;·&nbsp; ' + ex.reps : ''}</div>
    <div class="ex-log-set-row" style="margin-bottom:14px">
      <input class="ex-log-input" type="number" id="gmSetW" placeholder="${wPh}" min="0" step="0.5">
      <span class="ex-log-unit">kg</span>
      <span class="ex-log-unit" style="margin:0 4px">×</span>
      <input class="ex-log-input" type="number" id="gmSetR" placeholder="${rPh}" min="0">
      <span class="ex-log-unit">reps</span>
    </div>
    <button class="ex-log-save" onclick="window._gmCompleteSet()" style="width:100%">
      ${isLast ? '✓ Completar y guardar' : '✓ Completar serie'}
    </button>
  `;
  _updateGMChips();
  setTimeout(() => { const w = document.getElementById('gmSetW'); if (w) w.focus(); }, 50);
}

// ── Inline timer ──────────────────────────────────────────────────────────────
function _startGMTimer(secs) {
  _stopGMTimer();
  const el = document.getElementById('gmLogSection');
  if (!el) return;

  const circ = +(2 * Math.PI * 28).toFixed(2);
  _gm._eitRemaining = secs;
  _gm._eitTotal     = secs;

  el.innerHTML = `
    <div class="eit-wrap">
      <div class="eit-title">Descanso — siguiente: serie ${_gm.currentSet + 1} de ${_gm.numSets}</div>
      <div class="eit-ring-wrap">
        <svg class="eit-ring" viewBox="0 0 64 64">
          <circle class="eit-ring-bg" cx="32" cy="32" r="28"/>
          <circle class="eit-ring-fill" id="gmTimerFill" cx="32" cy="32" r="28"
            style="stroke-dasharray:${circ};stroke-dashoffset:0"/>
        </svg>
        <div class="eit-count" id="gmTimerCount">${_fmtSecs(secs)}</div>
      </div>
      <div class="eit-controls">
        <button class="eit-btn" onclick="window._gmTimerAdjust(-30)">−30</button>
        <button class="eit-btn" onclick="window._gmTimerAdjust(30)">+30</button>
        <button class="eit-btn-skip" onclick="window._gmTimerSkip()">Saltar <i class="ti ti-player-skip-forward"></i></button>
      </div>
    </div>
  `;
  _updateGMChips();

  _gm._inlineTimer = setInterval(() => {
    _gm._eitRemaining--;
    if (_gm._eitRemaining <= 0) {
      _gm._eitRemaining = 0;
      clearInterval(_gm._inlineTimer);
      _gm._inlineTimer = null;
      try { if (navigator.vibrate) navigator.vibrate([150, 80, 150]); } catch(e) {}
      _renderGMPerSetInput();
    } else {
      const cEl = document.getElementById('gmTimerCount');
      if (cEl) cEl.textContent = _fmtSecs(_gm._eitRemaining);
      const fEl = document.getElementById('gmTimerFill');
      if (fEl) {
        const p = _gm._eitTotal > 0 ? _gm._eitRemaining / _gm._eitTotal : 0;
        fEl.style.strokeDashoffset = `${circ * (1 - p)}`;
      }
    }
  }, 1000);
}

// ── Save exercise ─────────────────────────────────────────────────────────────
function _saveCurrentExercise() {
  const ex = _currentEx();
  if (!ex) return;

  saveExLog(ex.id, state.currentId, _gm.completedSets, ex.reps, ex.muscle);

  const badge = document.getElementById(`rec_badge_${ex.id}`);
  if (badge) {
    const rec = calcNextRecommendation(ex.reps, _gm.completedSets, ex.position || 1);
    const arrow = rec.dir === 'up' ? '↑' : rec.dir === 'down' ? '↓' : '→';
    badge.textContent = `📈 ${rec.nextWeight} kg × ${rec.targetReps} reps ${arrow}`;
    badge.style.color = '';
    badge.style.display = 'block';
  }

  const sumEl = document.getElementById(`ex_log_sum_${ex.id}`);
  if (sumEl) {
    const summary = _gm.completedSets.map(st => `${st.weight > 0 ? st.weight + 'kg' : 'PC'}×${st.reps}`).join(' · ');
    sumEl.innerHTML = `✓ ${summary}<span class="ex-edit-hint"> — toca para editar</span>`;
    sumEl.style.display = 'block';
  }
  const iconEl = document.getElementById(`ex_icon_${ex.id}`);
  if (iconEl) iconEl.textContent = '✏️';

  const logEl = document.getElementById('gmLogSection');
  if (logEl) {
    logEl.innerHTML = `
      <div class="ex-log-saved" style="display:block;margin-bottom:16px">
        <i class="ti ti-circle-check-filled" style="color:var(--cyan)"></i> Guardado
      </div>
      <button class="gm-next-btn" onclick="window._gmNext()">
        ${_isLastExercise() ? 'Ver resumen' : 'Siguiente ejercicio'}
        <i class="ti ti-arrow-right"></i>
      </button>
    `;
  }
  _updateGMChips();
  startRestTimer(ex.id);
}

// ── Navigation ────────────────────────────────────────────────────────────────
function _goNext() {
  _stopGMTimer();
  _gm.exIdx++;
  if (_gm.exIdx >= _gm.blocks[_gm.blockIdx].exercises.length) {
    _gm.blockIdx++;
    _gm.exIdx = 0;
  }
  if (_gm.blockIdx >= _gm.blocks.length) {
    _renderSummary();
    return;
  }
  _gm.currentExNum++;
  _gm.currentSet    = 0;
  _gm.completedSets = [];
  _renderExercise();
}

function _goPrev() {
  _stopGMTimer();
  if (_gm.exIdx > 0) {
    _gm.exIdx--;
  } else if (_gm.blockIdx > _gm.startBlockIdx) {
    _gm.blockIdx--;
    _gm.exIdx = _gm.blocks[_gm.blockIdx].exercises.length - 1;
  } else {
    _renderBlockSelector();
    return;
  }
  _gm.currentExNum  = Math.max(1, _gm.currentExNum - 1);
  _gm.currentSet    = 0;
  _gm.completedSets = [];
  _renderExercise();
}

// ── Screens ───────────────────────────────────────────────────────────────────
function _renderExercise() {
  _stopGMTimer();
  const el = _overlay();
  if (!el) return;

  const ex = _currentEx();
  if (!ex) { _renderSummary(); return; }

  _gm.numSets       = parseInt(ex.sets) || 3;
  _gm.currentSet    = 0;
  _gm.completedSets = [];
  _gm.restStr       = ex.rest || '90 seg';

  const imgSrc = getExImage(ex.id, ex.name);
  const pct    = Math.round((_gm.currentExNum - 1) / _gm.totalExCount * 100);

  const secMuscles = (ex.muscles_secondary || [])
    .map(m => `<span class="gm-sec-chip">${_muscleName(m)}</span>`)
    .join('');

  const imgPanel = imgSrc
    ? `<img src="${imgSrc}" class="gm-img" alt="${ex.name}">`
    : `<div class="gm-img-placeholder"><i class="ti ti-dumbbell"></i></div>`;

  const descPanel = `
    <div class="gm-desc-grid">
      <div class="gm-desc-cell">
        <div class="gm-desc-label">Nivel</div>
        ${_diffLabel(ex.difficulty)}
      </div>
      <div class="gm-desc-cell">
        <div class="gm-desc-label">Tipo</div>
        <span class="gm-cat-badge">${_catLabel(ex.category)}</span>
      </div>
    </div>
    <div class="gm-desc-divider"></div>
    <div class="gm-desc-label">Músculo principal</div>
    <div class="gm-muscle-card">
      ${_muscleSvg(ex.muscle || '')}
      <span class="gm-muscle-label">${ex.muscle || '—'}</span>
    </div>
    ${secMuscles ? `
    <div class="gm-desc-divider"></div>
    <div class="gm-desc-label">Músculos involucrados</div>
    <div class="gm-sec-muscles">${secMuscles}</div>
    ` : ''}
    <div class="gm-desc-divider"></div>
    <div class="gm-desc-label">Equipamiento</div>
    <div class="gm-equip-chip">
      ${_equipIcon(ex.equip)}
      <span>${ex.equip || '—'}</span>
    </div>
    ${ex.notes ? `
    <div class="gm-desc-divider"></div>
    <div class="gm-desc-label">Nota técnica</div>
    <div class="gm-desc-note">${ex.notes}</div>
    ` : ''}
  `;

  el.innerHTML = `
    <div class="gm-screen">
      <div class="gm-header">
        <button class="gm-nav-btn" onclick="window._gmBack()"><i class="ti ti-arrow-left"></i></button>
        <div class="gm-progress">
          <span class="gm-ex-counter">Ejercicio ${_gm.currentExNum} de ${_gm.totalExCount}</span>
          <div class="gm-progress-bar"><div class="gm-progress-fill" style="width:${pct}%"></div></div>
        </div>
        <button class="gm-nav-btn" onclick="closeGuidedMode()"><i class="ti ti-x"></i></button>
      </div>

      <div class="gm-tabs">
        <button class="gm-tab gm-tab--active" id="gmTabImg" onclick="window._gmSwitchTab('img')">
          <i class="ti ti-photo"></i> Imagen
        </button>
        <button class="gm-tab" id="gmTabDesc" onclick="window._gmSwitchTab('desc')">
          <i class="ti ti-info-circle"></i> Descripción
        </button>
      </div>

      <div id="gmPanelImg" class="gm-img-wrap">${imgPanel}</div>
      <div id="gmPanelDesc" class="gm-desc-panel" style="display:none">${descPanel}</div>

      <div class="gm-ex-info">
        <div class="gm-ex-name">${ex.name}</div>
        <div class="gm-ex-guide">
          ${ex.sets} series × ${ex.reps}${ex.weight_guide && ex.weight_guide !== '—' ? ' &nbsp;·&nbsp; ' + ex.weight_guide : ''}
        </div>
      </div>

      <div class="gm-log-section" id="gmLogSection"></div>
      <div class="gm-sets-chips" id="gmSetsChips"></div>
    </div>
  `;

  window._gmSwitchTab = (tab) => {
    const img  = document.getElementById('gmPanelImg');
    const desc = document.getElementById('gmPanelDesc');
    const tImg  = document.getElementById('gmTabImg');
    const tDesc = document.getElementById('gmTabDesc');
    if (!img || !desc) return;
    img.style.display  = tab === 'img'  ? '' : 'none';
    desc.style.display = tab === 'desc' ? '' : 'none';
    tImg?.classList.toggle('gm-tab--active',  tab === 'img');
    tDesc?.classList.toggle('gm-tab--active', tab === 'desc');
  };

  _renderGMPerSetInput();
}

function _renderBlockSelector() {
  const el = _overlay();
  if (!el) return;

  const blockItems = _gm.blocks.map((bl, i) => {
    const count = bl.exercises.length;
    const doneCount = bl.exercises.filter(ex => {
      const log = getExLog(ex.id, state.currentId);
      return log && log.sets && log.sets.length > 0;
    }).length;
    const doneStr = doneCount > 0
      ? `<span style="color:var(--cyan)">&nbsp;· ${doneCount}/${count} completados</span>`
      : '';
    return `
      <div class="gm-block-item" onclick="window._gmSelectBlock(${i})">
        <div class="gm-block-name">${bl.name}</div>
        <div class="gm-block-meta">${count} ejercicio${count !== 1 ? 's' : ''}${doneStr}</div>
      </div>`;
  }).join('');

  el.innerHTML = `
    <div class="gm-screen">
      <div class="gm-header">
        <div class="gm-header-title"><i class="ti ti-player-play-filled" style="color:var(--cyan)"></i> Modo guiado</div>
        <button class="gm-nav-btn" onclick="closeGuidedMode()"><i class="ti ti-x"></i></button>
      </div>
      <div class="gm-block-list">
        <div class="gm-section-label">Elige desde qué bloque empezar</div>
        ${blockItems}
      </div>
    </div>
  `;

  window._gmSelectBlock = (blockIdx) => _checkResume(blockIdx);
}

function _checkResume(startBlockIdx) {
  const hasAnyLog = _gm.blocks.slice(startBlockIdx).some(bl =>
    bl.exercises.some(ex => {
      const log = getExLog(ex.id, state.currentId);
      return log && log.sets && log.sets.length > 0;
    })
  );

  if (!hasAnyLog) {
    _startGuided(startBlockIdx, true);
    return;
  }

  const el = _overlay();
  el.innerHTML = `
    <div class="gm-screen">
      <div class="gm-header">
        <button class="gm-nav-btn" onclick="window._gmBackToBlocks()"><i class="ti ti-arrow-left"></i></button>
        <div class="gm-header-title">Modo guiado</div>
        <button class="gm-nav-btn" onclick="closeGuidedMode()"><i class="ti ti-x"></i></button>
      </div>
      <div class="gm-block-list">
        <div style="font-size:22px;font-weight:800;color:var(--text);margin-bottom:8px;font-family:var(--font-head)">¿Continuar donde lo dejaste?</div>
        <div style="font-family:var(--font-mono);font-size:12px;color:var(--text3);margin-bottom:24px;line-height:1.6">
          Ya hay ejercicios registrados en este bloque.
        </div>
        <div class="gm-block-item gm-block-item--cyan" onclick="window._gmStartFrom(${startBlockIdx}, false)">
          <div class="gm-block-name" style="color:var(--cyan)">↓ Retomar donde lo dejé</div>
          <div class="gm-block-meta">Salta los ejercicios ya completados</div>
        </div>
        <div class="gm-block-item" onclick="window._gmStartFrom(${startBlockIdx}, true)">
          <div class="gm-block-name">↺ Empezar desde el principio</div>
          <div class="gm-block-meta">Los registros existentes se preservan</div>
        </div>
      </div>
    </div>
  `;

  window._gmBackToBlocks = () => _renderBlockSelector();
  window._gmStartFrom    = (bIdx, fromStart) => _startGuided(bIdx, fromStart);
}

function _startGuided(startBlockIdx, fromStart) {
  _gm.startBlockIdx = startBlockIdx;
  _gm.blockIdx      = startBlockIdx;
  _gm.exIdx         = 0;
  _gm.totalExCount  = _gm.blocks.slice(startBlockIdx).reduce((a, bl) => a + bl.exercises.length, 0);
  _gm.currentExNum  = 1;
  _gm.currentSet    = 0;
  _gm.completedSets = [];

  if (!fromStart) {
    while (_gm.blockIdx < _gm.blocks.length) {
      const ex = _gm.blocks[_gm.blockIdx].exercises[_gm.exIdx];
      const log = getExLog(ex.id, state.currentId);
      if (!log || !log.sets || !log.sets.length) break;
      _gm.currentExNum++;
      _gm.exIdx++;
      if (_gm.exIdx >= _gm.blocks[_gm.blockIdx].exercises.length) {
        _gm.blockIdx++;
        _gm.exIdx = 0;
      }
    }
    if (_gm.blockIdx >= _gm.blocks.length) {
      _renderSummary();
      return;
    }
  }

  _renderExercise();
}

function _renderSummary() {
  _stopGMTimer();
  const el = _overlay();
  if (!el) return;

  const allExercises = _gm.blocks.slice(_gm.startBlockIdx).flatMap(bl => bl.exercises);
  const completedCount = allExercises.filter(ex => {
    const log = getExLog(ex.id, state.currentId);
    return log && log.sets && log.sets.length;
  }).length;

  const rows = allExercises.map(ex => {
    const log    = getExLog(ex.id, state.currentId);
    const hasLog = !!(log && log.sets && log.sets.length);
    const setsHtml = hasLog
      ? log.sets.map((s, i) =>
          `<span class="gm-sum-set">S${i + 1}: <strong>${s.weight > 0 ? s.weight + 'kg' : 'PC'} × ${s.reps}</strong></span>`
        ).join('')
      : `<span class="gm-sum-skipped">No registrado</span>`;
    return `
      <div class="gm-sum-row${hasLog ? ' gm-sum-row--done' : ''}">
        <div class="gm-sum-status">
          ${hasLog
            ? '<i class="ti ti-circle-check-filled" style="color:var(--cyan);font-size:18px"></i>'
            : '<i class="ti ti-circle" style="color:var(--text3);font-size:18px"></i>'}
        </div>
        <div class="gm-sum-body">
          <div class="gm-sum-name">${ex.name}</div>
          <div class="gm-sum-sets">${setsHtml}</div>
        </div>
      </div>`;
  }).join('');

  el.innerHTML = `
    <div class="gm-screen">
      <div class="gm-header">
        <div class="gm-header-title">
          <i class="ti ti-trophy" style="color:var(--cyan)"></i> Entrenamiento completado
        </div>
        <button class="gm-nav-btn" onclick="closeGuidedMode()"><i class="ti ti-x"></i></button>
      </div>
      <div class="gm-summary-hero">
        <i class="ti ti-trophy-filled gm-trophy-icon"></i>
        <div class="gm-summary-stat">${completedCount} / ${allExercises.length}</div>
        <div class="gm-summary-stat-label">ejercicios completados</div>
      </div>
      <div class="gm-summary">
        <div class="gm-section-label" style="margin-bottom:12px">Resumen de series</div>
        ${rows}
        <button class="gm-finish-btn" onclick="closeGuidedMode()">
          <i class="ti ti-check"></i> Finalizar y volver
        </button>
      </div>
    </div>
  `;
}

// ── Window handlers ───────────────────────────────────────────────────────────
window._gmCompleteSet = () => {
  const weight = parseFloat(document.getElementById('gmSetW')?.value) || 0;
  const reps   = parseInt(document.getElementById('gmSetR')?.value)   || 0;
  _gm.completedSets.push({ weight, reps });
  _gm.currentSet++;
  if (_gm.currentSet >= _gm.numSets) {
    _saveCurrentExercise();
  } else {
    _startGMTimer(_parseRestSecs(_gm.restStr));
  }
};

window._gmTimerSkip   = () => { _stopGMTimer(); _renderGMPerSetInput(); };
window._gmTimerAdjust = (delta) => {
  _gm._eitRemaining = Math.max(5, (_gm._eitRemaining || 0) + delta);
  if (_gm._eitRemaining > (_gm._eitTotal || 0)) _gm._eitTotal = _gm._eitRemaining;
  const circ = +(2 * Math.PI * 28).toFixed(2);
  const cEl = document.getElementById('gmTimerCount');
  if (cEl) cEl.textContent = _fmtSecs(_gm._eitRemaining);
  const fEl = document.getElementById('gmTimerFill');
  if (fEl) {
    const p = _gm._eitTotal > 0 ? _gm._eitRemaining / _gm._eitTotal : 0;
    fEl.style.strokeDashoffset = `${circ * (1 - p)}`;
  }
};
window._gmNext = () => _goNext();
window._gmBack = () => _goPrev();

// ── Public API ────────────────────────────────────────────────────────────────
export function openGuidedMode() {
  const plan = getPlan().find(s => s.id === state.currentId);
  if (!plan || !plan.workout) return;

  let globalPos = 0;
  _gm.blocks = plan.workout.blocks.map(bl => ({
    name: bl.name,
    note: bl.note || '',
    exercises: bl.exercises.map(ex => {
      globalPos++;
      const swapId   = getExSwap(ex.id, state.currentId);
      const swapEx   = swapId ? EXERCISES.find(x => x.id === swapId) : null;
      const catalog  = EXERCISES.find(x => x.id === (swapEx ? swapEx.id : ex.id));
      return {
        origId:           ex.id,
        id:               swapEx ? swapEx.id             : ex.id,
        name:             swapEx ? swapEx.name           : ex.name,
        muscle:           swapEx ? swapEx.muscle_primary : (ex.muscle       || catalog?.muscle_primary || ''),
        equip:            swapEx ? swapEx.equip          : (ex.equip        || catalog?.equip          || ''),
        sets:             ex.sets  || String(catalog?.sets_default || '3'),
        reps:             swapEx  ? (swapEx.reps_default || '') : (ex.reps  || catalog?.reps_default   || ''),
        rest:             swapEx  ? `${swapEx.rest_seconds || 90} seg` : (ex.rest || `${catalog?.rest_seconds || 90} seg`),
        weight_guide:     swapEx  ? (swapEx.weight_guide  || '—') : (ex.weight_guide || catalog?.weight_guide || '—'),
        notes:            ex.notes || '',
        difficulty:       catalog?.difficulty || 'intermediate',
        category:         catalog?.category   || 'compound',
        muscles_secondary: catalog?.muscles_secondary || [],
        position:         globalPos,
      };
    }),
  }));

  const el = _overlay();
  if (!el) return;
  el.style.display = 'block';
  _renderBlockSelector();
}

export function closeGuidedMode() {
  _stopGMTimer();
  const el = _overlay();
  if (el) el.style.display = 'none';
  if (state.currentId) window.loadSession?.(state.currentId);
}
