import { state, getPlan } from './state.js';
import { getExImage } from '../data/images.js';
import { EXERCISES } from '../data/exercises.js';
import { getExLog, getLastExLog, saveExLog, setExSwap } from './storage.js';
import { calcNextRecommendation, calcCrossExRecommendation, getRelatedExLogs, getExRecommendation } from './progression.js';
import { escStr } from './helpers.js';
import { startRestTimer } from './timer.js';
import { loadSession } from './session.js';

let _exCtx = null; // contexto del modal abierto

export function openExModal(id, name, muscle, equip, targetSets, targetReps, weightGuide, originalId, position = 1) {
  const modal = document.getElementById('exModalContent');
  const imgSrc = getExImage(id, name);
  const imgSection = imgSrc
    ? `<div class="ex-modal-img" style="padding:0;background:var(--bg2);height:auto">
        <img src="${imgSrc}" alt="${name}" style="width:100%;height:auto;display:block">
       </div>`
    : `<div class="ex-modal-img">
        <div class="ex-modal-img-placeholder">🏋️</div>
        <div class="ex-modal-img-text">${name}</div>
        <div class="ex-modal-img-soon">📸 Imagen del ejercicio — próximamente</div>
       </div>`;
  const bodyExtra = imgSrc ? '' : `
      <div style="font-size:12px;color:var(--text3);margin-top:12px;font-family:var(--font-mono);line-height:1.7">
        Al hacer clic en el ícono 🖼 de cualquier ejercicio podrás ver aquí la imagen y video demostrativo del movimiento.<br>
        <span style="color:var(--amber)">Esta función estará disponible en la próxima versión.</span>
      </div>`;

  const numSets = parseInt(targetSets) || 0;
  // originalId is the plan's exercise id (may differ from id when swapped)
  const origId = originalId || id;
  let logSection = '';
  if (numSets > 0 && id !== 'pre' && id !== 'post') {
    _exCtx = { id, origId, numSets, targetReps: targetReps || '', muscle: muscle || '', weightGuide: weightGuide || '', position: parseInt(position) || 1 };
    const existing = getExLog(id, state.currentId);
    const rows = Array.from({ length: numSets }, (_, i) => {
      const saved = existing && existing.sets && existing.sets[i];
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
    const isSwapped = origId !== id;
    const swapBtnHtml = `
      <div class="ex-swap-actions">
        <button class="ex-swap-btn" onclick="window._exShowPicker()"><i class="ti ti-refresh"></i> Cambiar ejercicio</button>
        ${isSwapped ? `<button class="ex-swap-btn ex-swap-reset" onclick="window._exResetSwap()"><i class="ti ti-arrow-back-up"></i> Volver al original</button>` : ''}
      </div>
      <div id="exPickerWrap" style="display:none"></div>`;
    logSection = `
      <div class="ex-modal-log">
        <div class="ex-log-title">📝 Tu registro — sesión actual</div>
        ${rows}
        <button class="ex-log-save" onclick="saveCurrentExLog()">💾 Guardar registro</button>
        <div class="ex-log-saved" id="exLogSaved">✓ Guardado</div>
      </div>
      ${swapBtnHtml}
      <div class="ex-modal-rec" id="exModalRec">
        ${buildRecSection(id, state.currentId, targetReps || '', muscle || '', weightGuide || '', parseInt(position) || 1)}
      </div>`;
  }

  modal.innerHTML = `
    ${imgSection}
    <div class="ex-modal-body">
      <div class="ex-modal-name">${name}</div>
      <div class="ex-modal-muscle">💪 ${muscle}</div>
      <div class="ex-modal-equip">🔧 ${equip}</div>
      ${bodyExtra}
      ${logSection}
    </div>
  `;
  document.getElementById('exModal').classList.add('open');
}

export function closeExModal() {
  document.getElementById('exModal').classList.remove('open');
}

export function saveCurrentExLog() {
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

  const curSession = getPlan().find(x => x.id === state.currentId);
  if (curSession) {
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

  startRestTimer(id);

  const fb = document.getElementById('exLogSaved');
  if (fb) { fb.style.display = 'block'; setTimeout(() => { fb.style.display = 'none'; }, 2000); }
  const recDiv = document.getElementById('exModalRec');
  if (recDiv) recDiv.innerHTML = buildRecSection(id, state.currentId, targetReps, muscle, _exCtx.weightGuide, _exCtx.position || 1);

  // Update the logged-values summary row in the exercise table (live, no full re-render)
  const sumEl = document.getElementById(`ex_log_sum_${id}`);
  if (sumEl) {
    const summary = sets.map(st => `${st.weight > 0 ? st.weight + 'kg' : '—'}×${st.reps}`).join(' · ');
    sumEl.innerHTML = `✓ ${summary}<span class="ex-edit-hint"> — toca para editar</span>`;
    sumEl.style.display = 'block';
  }
  const iconEl = document.getElementById(`ex_icon_${id}`);
  if (iconEl) iconEl.textContent = '✏️';
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

  // Alternatives: same muscle_primary, exclude current displayed exercise
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
