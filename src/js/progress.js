// ===== PROGRESS PAGE =====
// Training streaks, exercise weight progression, body weight tracking,
// wellness trends (energy/fatigue), and push notification support.

import { state, getUserId } from './state.js';
import { loadExLogs } from './storage.js';
import { fetchBodyMetrics, upsertBodyMetrics, insertBodyMeasurement } from './db.js';

// ── Module state ──────────────────────────────────────────────────────────────

let _bodyMetrics    = []; // [{ metric_date, weight_kg, waist_cm?, hip_cm?, chest_cm?, arm_cm?, thigh_cm? }]
let _selectedEx     = null;
let _selectedMeasure = 'waist_cm';

// ── Medidas corporales ────────────────────────────────────────────────────────

const MEASURES = [
  { key: 'waist_cm',  label: 'Cintura' },
  { key: 'hip_cm',    label: 'Cadera'  },
  { key: 'chest_cm',  label: 'Pecho'   },
  { key: 'arm_cm',    label: 'Brazo'   },
  { key: 'thigh_cm',  label: 'Muslo'   },
];

// ── SVG chart helpers ─────────────────────────────────────────────────────────

function _svgLine(points, { color = 'var(--accent)', w = 320, h = 110 } = {}) {
  if (!points || points.length < 2) {
    return '<p class="prog-no-data">Sin datos suficientes (mínimo 2 registros)</p>';
  }
  const ys = points.map(p => p.y);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const rangeY = maxY - minY || 1;
  const pL = 38, pR = 8, pT = 10, pB = 22;
  const cw = w - pL - pR, ch = h - pT - pB;
  const px = i => pL + (i / (points.length - 1)) * cw;
  const py = y => pT + ch - ((y - minY) / rangeY) * ch;
  const fmt = v => Number.isInteger(v) ? v : v.toFixed(1);
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${px(i).toFixed(1)},${py(p.y).toFixed(1)}`).join(' ');
  return `<svg viewBox="0 0 ${w} ${h}" class="prog-svg">
    <text x="${pL - 4}" y="${pT + 4}" text-anchor="end" class="prog-svg-lbl">${fmt(maxY)}</text>
    <text x="${pL - 4}" y="${pT + ch + 4}" text-anchor="end" class="prog-svg-lbl">${fmt(minY)}</text>
    <text x="${pL}" y="${h - 2}" text-anchor="middle" class="prog-svg-lbl">${points[0].x || ''}</text>
    <text x="${pL + cw}" y="${h - 2}" text-anchor="end" class="prog-svg-lbl">${points[points.length - 1].x || ''}</text>
    <line x1="${pL}" y1="${pT}" x2="${pL + cw}" y2="${pT}" stroke="var(--border)" stroke-width="0.5" opacity="0.6"/>
    <line x1="${pL}" y1="${pT + ch / 2}" x2="${pL + cw}" y2="${pT + ch / 2}" stroke="var(--border)" stroke-width="0.5" stroke-dasharray="3,3" opacity="0.4"/>
    <line x1="${pL}" y1="${pT + ch}" x2="${pL + cw}" y2="${pT + ch}" stroke="var(--border)" stroke-width="0.5" opacity="0.6"/>
    <path d="${pathD}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    ${points.map((p, i) => `<circle cx="${px(i).toFixed(1)}" cy="${py(p.y).toFixed(1)}" r="3" fill="${color}"/>`).join('')}
  </svg>`;
}

function _svgDual(wellness, { w = 320, h = 120 } = {}) {
  if (wellness.length < 2) {
    return '<p class="prog-no-data">Sin datos suficientes (mínimo 2 sesiones con bienestar registrado)</p>';
  }
  const pL = 28, pR = 8, pT = 10, pB = 22;
  const cw = w - pL - pR, ch = h - pT - pB;
  const minY = 1, rangeY = 9; // scale 1–10
  const n = wellness.length;
  const px = i => pL + (i / (n - 1)) * cw;
  const py = y => pT + ch - ((y - minY) / rangeY) * ch;
  const mkLine = (key, color) => {
    const d = wellness.map((pt, i) => `${i === 0 ? 'M' : 'L'}${px(i).toFixed(1)},${py(pt[key]).toFixed(1)}`).join(' ');
    const dots = wellness.map((pt, i) => `<circle cx="${px(i).toFixed(1)}" cy="${py(pt[key]).toFixed(1)}" r="2.5" fill="${color}"/>`).join('');
    return `<path d="${d}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>${dots}`;
  };
  return `<svg viewBox="0 0 ${w} ${h}" class="prog-svg">
    <text x="${pL - 4}" y="${pT + 4}" text-anchor="end" class="prog-svg-lbl">10</text>
    <text x="${pL - 4}" y="${pT + ch + 4}" text-anchor="end" class="prog-svg-lbl">1</text>
    <text x="${pL}" y="${h - 2}" text-anchor="middle" class="prog-svg-lbl">${wellness[0].x.slice(5) || ''}</text>
    <text x="${pL + cw}" y="${h - 2}" text-anchor="end" class="prog-svg-lbl">${wellness[wellness.length - 1].x.slice(5) || ''}</text>
    <line x1="${pL}" y1="${pT}" x2="${pL + cw}" y2="${pT}" stroke="var(--border)" stroke-width="0.5" opacity="0.6"/>
    <line x1="${pL}" y1="${pT + ch}" x2="${pL + cw}" y2="${pT + ch}" stroke="var(--border)" stroke-width="0.5" opacity="0.6"/>
    ${mkLine('energy', 'var(--green)')}
    ${mkLine('fatigue', 'var(--amber)')}
  </svg>`;
}

// ── Computations ──────────────────────────────────────────────────────────────

function _toISO(dateStr) {
  if (!dateStr) return null;
  if (dateStr.includes('/')) {
    const [d, m, y] = dateStr.split('/');
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }
  return dateStr.slice(0, 10);
}

function _isoWeek(isoDate) {
  // Returns "YYYY-Www" string for the ISO week containing the date
  const d = new Date(isoDate);
  d.setUTCHours(0, 0, 0, 0);
  // Thursday of the same week (ISO 8601 defines week by its Thursday)
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const year = d.getUTCFullYear();
  const week = Math.ceil(((d - new Date(Date.UTC(year, 0, 1))) / 86400000 + 1) / 7);
  return `${year}-W${String(week).padStart(2, '0')}`;
}

function _computeStreak() {
  const dates = [...new Set(state.logs.map(l => _toISO(l.date)).filter(Boolean))].sort();
  if (!dates.length) return { current: 0, best: 0 };

  // Collect unique weeks that have at least one session
  const weeks = [...new Set(dates.map(_isoWeek))].sort();
  if (!weeks.length) return { current: 0, best: 0 };

  // Best streak: longest run of consecutive ISO weeks
  let best = 1, temp = 1;
  for (let i = 1; i < weeks.length; i++) {
    const [y1, w1] = weeks[i - 1].split('-W').map(Number);
    const [y2, w2] = weeks[i].split('-W').map(Number);
    const diff = (y2 - y1) * 52 + (w2 - w1);
    if (diff === 1) { temp++; if (temp > best) best = temp; }
    else temp = 1;
  }

  // Current streak: count backwards from this week or last week
  const thisWeek = _isoWeek(new Date().toISOString().slice(0, 10));
  const lastWeek = _isoWeek(new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10));
  const lastLogged = weeks[weeks.length - 1];
  let current = 0;
  if (lastLogged === thisWeek || lastLogged === lastWeek) {
    current = 1;
    for (let i = weeks.length - 2; i >= 0; i--) {
      const [y1, w1] = weeks[i].split('-W').map(Number);
      const [y2, w2] = weeks[i + 1].split('-W').map(Number);
      const diff = (y2 - y1) * 52 + (w2 - w1);
      if (diff === 1) current++;
      else break;
    }
  }
  return { current, best };
}

function _weekStats() {
  const week = Array.from({ length: 7 }, (_, i) =>
    new Date(Date.now() - i * 86400000).toISOString().slice(0, 10)
  );
  const sessions = state.logs.filter(l => week.includes(_toISO(l.date))).length;
  const nutDays  = week.filter(d => localStorage.getItem(`sv_meal_${d}`)).length;
  return { sessions, nutDays };
}

function _buildExProgression() {
  const exLogs = loadExLogs();
  const byEx = {};
  for (const [key, data] of Object.entries(exLogs)) {
    const parts = key.split('_');
    const exId  = parts.slice(0, -1).join('_');
    if (!data.sets?.length) continue;
    const maxW = Math.max(...data.sets.map(s => parseFloat(s.weight) || 0));
    if (!maxW) continue;
    if (!byEx[exId]) byEx[exId] = [];
    byEx[exId].push({ x: (_toISO(data.date) || '').slice(5), y: maxW, ts: data.timestamp || data.date || '' });
  }
  for (const k of Object.keys(byEx)) {
    byEx[k].sort((a, b) => (a.ts < b.ts ? -1 : 1));
  }
  return byEx;
}

function _wellnessTrend() {
  return state.logs
    .filter(l => l.energy || l.fatigue)
    .map(l => ({ x: _toISO(l.date) || '', energy: l.energy || 0, fatigue: l.fatigue || 0 }))
    .sort((a, b) => (a.x < b.x ? -1 : 1));
}

// ── Notification helpers ──────────────────────────────────────────────────────

function _notifSection() {
  if (typeof Notification === 'undefined') {
    return '<p class="prog-no-data">Tu navegador no soporta notificaciones.</p>';
  }
  if (Notification.permission === 'granted') {
    return `
      <p class="prog-notif-ok"><i class="ti ti-check"></i> Notificaciones habilitadas</p>
      <button class="prog-notif-btn" onclick="progTestNotif()">
        <i class="ti ti-bell-ringing"></i> Enviar notificación de prueba
      </button>`;
  }
  if (Notification.permission === 'denied') {
    return '<p class="prog-no-data">Notificaciones bloqueadas. Permítelas desde la configuración de tu navegador.</p>';
  }
  return `
    <p class="prog-notif-desc">Activa notificaciones para recibir recordatorios de entrenamiento.</p>
    <button class="prog-notif-btn" onclick="progEnableNotif()">
      <i class="ti ti-bell"></i> Habilitar recordatorios
    </button>`;
}

// ── Render ────────────────────────────────────────────────────────────────────

function _render() {
  const streak  = _computeStreak();
  const { sessions: weekSessions, nutDays } = _weekStats();
  const exProg  = _buildExProgression();
  const exercises = Object.keys(exProg);
  if (_selectedEx === null && exercises.length) _selectedEx = exercises[0];
  const wellness = _wellnessTrend();

  // Body weight chart
  const wtPoints = _bodyMetrics
    .map(m => ({ x: (m.metric_date || '').slice(5), y: parseFloat(m.weight_kg) || 0 }))
    .filter(p => p.y);

  // Exercise chart
  const exPoints = (_selectedEx && exProg[_selectedEx]) ? exProg[_selectedEx] : [];
  const exOptions = exercises.map(ex =>
    `<option value="${ex}" ${ex === _selectedEx ? 'selected' : ''}>${_fmtExName(ex)}</option>`
  ).join('');

  // Weight trend delta
  let wtDeltaHtml = '';
  if (wtPoints.length >= 2) {
    const delta = (wtPoints[wtPoints.length - 1].y - wtPoints[0].y).toFixed(1);
    const sign  = delta > 0 ? '+' : '';
    const cls   = delta > 0 ? 'prog-delta--up' : delta < 0 ? 'prog-delta--down' : '';
    wtDeltaHtml = `<span class="prog-delta ${cls}">${sign}${delta} kg</span>`;
  }

  const today    = new Date().toISOString().slice(0, 10);
  const storedWt = _bodyMetrics.find(m => m.metric_date === today);

  document.getElementById('progressContent').innerHTML = `

    <!-- Quick Stats -->
    <div class="prog-stats">
      <div class="prog-stat prog-stat--fire">
        <div class="prog-stat-ico"><i class="ti ti-flame"></i></div>
        <div class="prog-stat-val">${streak.current}</div>
        <div class="prog-stat-lbl">Semanas seguidas</div>
      </div>
      <div class="prog-stat">
        <div class="prog-stat-ico"><i class="ti ti-trophy"></i></div>
        <div class="prog-stat-val">${streak.best}</div>
        <div class="prog-stat-lbl">Mejor racha (sem.)</div>
      </div>
      <div class="prog-stat">
        <div class="prog-stat-ico"><i class="ti ti-calendar-week"></i></div>
        <div class="prog-stat-val">${weekSessions}</div>
        <div class="prog-stat-lbl">Sesiones esta semana</div>
      </div>
      <div class="prog-stat">
        <div class="prog-stat-ico"><i class="ti ti-leaf"></i></div>
        <div class="prog-stat-val">${nutDays}/7</div>
        <div class="prog-stat-lbl">Días con nutrición</div>
      </div>
    </div>

    <!-- Peso Corporal -->
    <div class="prog-section">
      <div class="prog-section-hd">
        <div class="prog-section-title"><i class="ti ti-scale"></i> Peso Corporal</div>
        ${wtDeltaHtml}
      </div>
      <div class="prog-weight-input">
        <input type="number" id="progWeightVal" class="prog-wt-inp"
               placeholder="${storedWt ? storedWt.weight_kg : 'kg'}"
               value="${storedWt ? storedWt.weight_kg : ''}"
               step="0.1" min="30" max="300">
        <span class="prog-wt-unit">kg</span>
        <button class="prog-wt-btn" onclick="progLogWeight()"><i class="ti ti-check"></i> Guardar</button>
      </div>
      <div class="prog-chart-wrap">
        ${_svgLine(wtPoints, { color: 'var(--cyan)' })}
      </div>
    </div>

    <!-- Medidas Corporales -->
    ${_renderMeasuresSection()}

    <!-- Progresión de Ejercicios -->
    <div class="prog-section">
      <div class="prog-section-title"><i class="ti ti-trending-up"></i> Progresión de Pesos</div>
      ${exercises.length ? `
        <select class="prog-ex-select" onchange="progSetEx(this.value)">${exOptions}</select>
        <div class="prog-chart-wrap">
          ${_svgLine(exPoints, { color: 'var(--cyan)' })}
        </div>
        <p class="prog-chart-hint">Peso máximo registrado por sesión</p>
      ` : '<p class="prog-no-data">Registra pesos en tus ejercicios para ver la progresión aquí.</p>'}
    </div>

    <!-- Tendencias de Bienestar -->
    <div class="prog-section">
      <div class="prog-section-title"><i class="ti ti-heartbeat"></i> Tendencias de Bienestar</div>
      ${wellness.length >= 2 ? `
        <div class="prog-legend">
          <span class="prog-legend-dot" style="background:var(--green)"></span> Energía &nbsp;
          <span class="prog-legend-dot" style="background:var(--amber)"></span> Fatiga
        </div>
        <div class="prog-chart-wrap">
          ${_svgDual(wellness)}
        </div>
        <p class="prog-chart-hint">Escala 1–10 registrada en cada sesión completada</p>
      ` : '<p class="prog-no-data">Completa sesiones y registra energía/fatiga para ver tendencias.</p>'}
    </div>

    <!-- Recordatorios -->
    <div class="prog-section">
      <div class="prog-section-title"><i class="ti ti-bell"></i> Recordatorios</div>
      <div id="progNotifWrap">${_notifSection()}</div>
    </div>
  `;
}

function _fmtExName(exId) {
  return exId.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// ── Medidas corporales helpers ─────────────────────────────────────────────────

function _renderMeasuresSection() {
  const today = new Date().toISOString().slice(0, 10);
  // Último registro de hoy (puede tener hora incluida en la clave)
  const todayRec = [..._bodyMetrics].reverse().find(m => m.metric_date.startsWith(today));
  const firstRec = _bodyMetrics.find(m => MEASURES.some(ms => m[ms.key] != null));
  const lastRec  = [..._bodyMetrics].reverse().find(m => MEASURES.some(ms => m[ms.key] != null));

  // Inputs grid
  const inputs = MEASURES.map(ms => {
    const val = todayRec?.[ms.key] ?? '';
    return `<div class="prog-measure-item">
      <label class="prog-measure-lbl">${ms.label}</label>
      <div class="prog-measure-inp-wrap">
        <input type="number" id="progMeasure_${ms.key}" class="prog-wt-inp"
               placeholder="${val || 'cm'}" value="${val}" step="0.1" min="1" max="300">
        <span class="prog-wt-unit">cm</span>
      </div>
    </div>`;
  }).join('');

  // Tabla de última medida + delta
  let tableHtml = '';
  if (lastRec) {
    const rows = MEASURES.map(ms => {
      const last  = lastRec[ms.key];
      const first = firstRec?.[ms.key];
      if (last == null) return '';
      let deltaHtml = '';
      if (first != null && last !== first) {
        const d = (last - first).toFixed(1);
        const sign = d > 0 ? '+' : '';
        const cls  = d > 0 ? 'prog-delta--up' : 'prog-delta--down';
        deltaHtml = `<span class="prog-delta ${cls} prog-measure-delta">${sign}${d} cm</span>`;
      }
      return `<div class="prog-measure-row">
        <span class="prog-measure-name">${ms.label}</span>
        <span class="prog-measure-val">${last} cm</span>
        ${deltaHtml}
      </div>`;
    }).filter(Boolean).join('');
    if (rows) tableHtml = `<div class="prog-measure-table">${rows}</div>`;
  }

  // Gráfica de tendencia (medida seleccionada)
  const selPoints = _bodyMetrics
    .map(m => ({ x: (m.metric_date || '').slice(5), y: parseFloat(m[_selectedMeasure]) || 0 }))
    .filter(p => p.y);
  const selLabel = MEASURES.find(ms => ms.key === _selectedMeasure)?.label || '';
  const selectorOpts = MEASURES.map(ms =>
    `<option value="${ms.key}" ${ms.key === _selectedMeasure ? 'selected' : ''}>${ms.label}</option>`
  ).join('');

  const chartHtml = selPoints.length >= 2
    ? `<select class="prog-measure-select" onchange="progSetMeasure(this.value)">${selectorOpts}</select>
       <div class="prog-chart-wrap">${_svgLine(selPoints, { color: 'var(--cyan)' })}</div>
       <p class="prog-chart-hint">${selLabel} en cm por fecha</p>`
    : (lastRec
        ? `<p class="prog-no-data">Guarda una segunda medida para ver la gráfica y el delta.</p>`
        : `<p class="prog-no-data">Registra tu primera medida para ver la evolución aquí.</p>`);

  return `<div class="prog-section">
    <div class="prog-section-hd">
      <div class="prog-section-title"><i class="ti ti-ruler"></i> Medidas Corporales</div>
    </div>
    <div class="prog-measures-grid">${inputs}</div>
    <button class="prog-wt-btn prog-measures-save-btn" onclick="progLogMeasurements()">
      <i class="ti ti-check"></i> Guardar medidas
    </button>
    ${tableHtml}
    ${chartHtml}
  </div>`;
}

// ── Public API ────────────────────────────────────────────────────────────────

export function progSetEx(exId) {
  _selectedEx = exId;
  _render();
}

export async function progLogWeight() {
  const input = document.getElementById('progWeightVal');
  const val   = parseFloat(input?.value);
  if (!val || val < 30 || val > 300) return;
  const today  = new Date().toISOString().slice(0, 10);
  const userId = getUserId();
  const idx = _bodyMetrics.findIndex(m => m.metric_date === today);
  if (idx >= 0) _bodyMetrics[idx].weight_kg = val;
  else _bodyMetrics.push({ metric_date: today, weight_kg: val });
  _bodyMetrics.sort((a, b) => a.metric_date.localeCompare(b.metric_date));
  localStorage.setItem('sv_body_metrics', JSON.stringify(_bodyMetrics));
  if (userId) upsertBodyMetrics(userId, today, { weight_kg: val }).catch(console.error);
  _render();
}

export async function progLogMeasurements() {
  const now    = new Date();
  const today  = now.toISOString().slice(0, 10);
  // Clave con segundos → cada guardado es un punto distinto en la gráfica
  const key    = now.toISOString().slice(0, 19).replace('T', ' '); // "YYYY-MM-DD HH:MM:SS"
  const userId = getUserId();
  const fields = {};
  for (const ms of MEASURES) {
    const val = parseFloat(document.getElementById(`progMeasure_${ms.key}`)?.value);
    if (val > 0 && val <= 300) fields[ms.key] = val;
  }
  if (!Object.keys(fields).length) return;
  const idx = _bodyMetrics.findIndex(m => m.metric_date === key);
  if (idx >= 0) Object.assign(_bodyMetrics[idx], fields);
  else _bodyMetrics.push({ metric_date: key, ...fields });
  _bodyMetrics.sort((a, b) => a.metric_date.localeCompare(b.metric_date));
  localStorage.setItem('sv_body_metrics', JSON.stringify(_bodyMetrics));
  // Supabase: INSERT nuevo registro con timestamp único
  if (userId) insertBodyMeasurement(userId, key, today, fields).catch(console.error);
  _render();
  // Limpiar inputs y confirmar guardado visualmente
  for (const ms of MEASURES) {
    const el = document.getElementById(`progMeasure_${ms.key}`);
    if (el) el.value = '';
  }
  const btn = document.querySelector('.prog-measures-save-btn');
  if (btn) {
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="ti ti-circle-check-filled"></i> Guardado';
    btn.disabled = true;
    setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 1800);
  }
}

export function progSetMeasure(key) {
  _selectedMeasure = key;
  _render();
}

export async function progEnableNotif() {
  if (!('Notification' in window)) return;
  await Notification.requestPermission();
  const wrap = document.getElementById('progNotifWrap');
  if (wrap) wrap.innerHTML = _notifSection();
  if (Notification.permission === 'granted') progTestNotif();
}

export function progTestNotif() {
  if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
  new Notification('SistemaVida · Entrenamiento', {
    body: '¡Es hora de entrenar! 💪 Tu sesión de hoy te espera.',
    icon: './images/icon-192.svg',
  });
}

export async function showProgressPage() {
  try { _bodyMetrics = JSON.parse(localStorage.getItem('sv_body_metrics') || '[]'); } catch (e) { _bodyMetrics = []; }
  document.getElementById('progressPage').classList.add('open');
  _render();
  const userId = getUserId();
  if (userId) {
    fetchBodyMetrics(userId).then(data => {
      if (data && data.length) {
        // Merge: preservar entradas locales con hora (key > 10 chars),
        // agregar solo las fechas de Supabase que no existan ya en local
        const localDates = new Set(_bodyMetrics.map(m => m.metric_date.slice(0, 10)));
        const toAdd = data.filter(d => !localDates.has((d.metric_date || '').slice(0, 10)));
        if (toAdd.length) {
          _bodyMetrics = [..._bodyMetrics, ...toAdd];
          _bodyMetrics.sort((a, b) => a.metric_date.localeCompare(b.metric_date));
          localStorage.setItem('sv_body_metrics', JSON.stringify(_bodyMetrics));
          _render();
        }
      }
    });
  }
}

export function hideProgressPage() {
  document.getElementById('progressPage').classList.remove('open');
}
