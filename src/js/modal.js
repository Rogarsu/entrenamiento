import { state } from './state.js';
import { SESSIONS } from '../data/sessions.js';
import { getExImage } from '../data/images.js';
import { getExLog, getLastExLog, saveExLog } from './storage.js';
import { calcNextRecommendation, calcCrossExRecommendation, getRelatedExLogs, getExRecommendation } from './progression.js';
import { escStr } from './helpers.js';

let _exCtx = null; // contexto del modal abierto

export function openExModal(id, name, muscle, equip, targetSets, targetReps, weightGuide) {
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
  let logSection = '';
  if (numSets > 0 && id !== 'pre' && id !== 'post') {
    _exCtx = { id, numSets, targetReps: targetReps || '', muscle: muscle || '', weightGuide: weightGuide || '' };
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
    logSection = `
      <div class="ex-modal-log">
        <div class="ex-log-title">📝 Tu registro — sesión actual</div>
        ${rows}
        <button class="ex-log-save" onclick="saveCurrentExLog()">💾 Guardar registro</button>
        <div class="ex-log-saved" id="exLogSaved">✓ Guardado</div>
      </div>
      <div class="ex-modal-rec" id="exModalRec">
        ${buildRecSection(id, state.currentId, targetReps || '', muscle || '', weightGuide || '')}
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
    const rec = calcNextRecommendation(targetReps, sets);
    const arrow = rec.dir === 'up' ? '↑' : rec.dir === 'down' ? '↓' : '→';
    badge.textContent = `📈 ${rec.nextWeight} kg × ${rec.targetReps} reps ${arrow}`;
    badge.style.color = '';
    badge.style.display = 'block';
  }

  const curSession = SESSIONS.find(x => x.id === state.currentId);
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

  const fb = document.getElementById('exLogSaved');
  if (fb) { fb.style.display = 'block'; setTimeout(() => { fb.style.display = 'none'; }, 2000); }
  const recDiv = document.getElementById('exModalRec');
  if (recDiv) recDiv.innerHTML = buildRecSection(id, state.currentId, targetReps, muscle, _exCtx.weightGuide);
}

export function buildRecSection(exId, sessionId, targetRepsStr, muscle, weightGuide) {
  const curLog = getExLog(exId, sessionId);
  const sameLog = getLastExLog(exId, sessionId);

  if (sameLog && sameLog.sets && sameLog.sets.length) {
    const rec = calcNextRecommendation(targetRepsStr, sameLog.sets);
    const arrow = rec.dir === 'up' ? '↑' : rec.dir === 'down' ? '↓' : '→';
    const cls = rec.dir === 'down' ? 'down' : '';
    const hist = sameLog.sets.map((s, i) => `S${i + 1}: ${s.weight}kg×${s.reps}`).join(' · ');
    return `<div class="ex-log-title">📈 Recomendación próxima sesión — mismo ejercicio</div>
      <div class="ex-rec-box"><span class="ex-rec-arrow ${cls}">${arrow}</span>${rec.nextWeight} kg × ${rec.targetReps} reps</div>
      <div class="ex-rec-reason">${rec.reason}</div>
      <div class="ex-rec-reason" style="margin-top:6px;opacity:0.65">Última sesión (${sameLog.date}): ${hist}</div>`;
  }

  if (curLog && curLog.sets && curLog.sets.length) {
    const rec = calcNextRecommendation(targetRepsStr, curLog.sets);
    const arrow = rec.dir === 'up' ? '↑' : rec.dir === 'down' ? '↓' : '→';
    const cls = rec.dir === 'down' ? 'down' : '';
    return `<div class="ex-log-title">📈 Proyección para la próxima sesión</div>
      <div class="ex-rec-box"><span class="ex-rec-arrow ${cls}">${arrow}</span>${rec.nextWeight} kg × ${rec.targetReps} reps</div>
      <div class="ex-rec-reason">${rec.reason}</div>`;
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
