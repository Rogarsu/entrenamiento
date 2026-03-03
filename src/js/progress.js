// ===== PROGRESS PAGE =====
// Training streaks, exercise weight progression, body weight tracking,
// wellness trends (energy/fatigue), and push notification support.

import { state, getUserId } from './state.js';
import { loadExLogs } from './storage.js';
import { fetchBodyMetrics, upsertBodyMetric } from './db.js';

// ── Module state ──────────────────────────────────────────────────────────────

let _bodyMetrics = []; // [{ metric_date: 'YYYY-MM-DD', weight_kg: number }]
let _selectedEx  = null;

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

function _computeStreak() {
  const dates = [...new Set(state.logs.map(l => _toISO(l.date)).filter(Boolean))].sort();
  if (!dates.length) return { current: 0, best: 0 };
  let best = 1, temp = 1;
  for (let i = 1; i < dates.length; i++) {
    const diff = (new Date(dates[i]) - new Date(dates[i - 1])) / 86400000;
    if (diff === 1) { temp++; if (temp > best) best = temp; }
    else temp = 1;
  }
  const today = new Date().toISOString().slice(0, 10);
  const yday  = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const last  = dates[dates.length - 1];
  let current = 0;
  if (last === today || last === yday) {
    current = 1;
    for (let i = dates.length - 2; i >= 0; i--) {
      if ((new Date(dates[i + 1]) - new Date(dates[i])) / 86400000 === 1) current++;
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
        <div class="prog-stat-lbl">Racha actual</div>
      </div>
      <div class="prog-stat">
        <div class="prog-stat-ico"><i class="ti ti-trophy"></i></div>
        <div class="prog-stat-val">${streak.best}</div>
        <div class="prog-stat-lbl">Mejor racha</div>
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

    <!-- Progresión de Ejercicios -->
    <div class="prog-section">
      <div class="prog-section-title"><i class="ti ti-trending-up"></i> Progresión de Pesos</div>
      ${exercises.length ? `
        <select class="prog-ex-select" onchange="progSetEx(this.value)">${exOptions}</select>
        <div class="prog-chart-wrap">
          ${_svgLine(exPoints, { color: 'var(--accent)' })}
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
  if (userId) upsertBodyMetric(userId, today, val).catch(console.error);
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
        _bodyMetrics = data;
        localStorage.setItem('sv_body_metrics', JSON.stringify(_bodyMetrics));
        _render();
      }
    });
  }
}

export function hideProgressPage() {
  document.getElementById('progressPage').classList.remove('open');
}
