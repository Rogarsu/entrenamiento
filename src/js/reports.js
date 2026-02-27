// ===== REPORTS MODULE =====
// Generates printable PDFs for the training plan and exercise history.
// Uses window.open + print approach — no extra dependencies needed.

import { getPlan } from './state.js';
import { loadExLogs } from './storage.js';
import { getExNameFromSessions, getSessionName } from './history.js';

// ── PAGE SHOW / HIDE ──────────────────────────────────────────────────────────

export function showReportsPage() {
  document.getElementById('reportsPage').classList.add('open');
}

export function hideReportsPage() {
  document.getElementById('reportsPage').classList.remove('open');
}

// ── PRINT WINDOW ─────────────────────────────────────────────────────────────

const _PRINT_CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: Arial, Helvetica, sans-serif;
    color: #111;
    font-size: 11px;
    line-height: 1.5;
    padding: 24px;
  }
  .doc-header { margin-bottom: 20px; border-bottom: 3px solid #111; padding-bottom: 12px; }
  .doc-title { font-size: 22px; font-weight: 800; letter-spacing: 0.02em; }
  .doc-subtitle { font-size: 11px; color: #555; margin-top: 4px; }
  .doc-meta { font-size: 10px; color: #777; margin-top: 8px; }
  .section-title {
    font-size: 13px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.06em; margin: 24px 0 10px;
    padding: 6px 10px; background: #111; color: #fff; border-radius: 3px;
  }
  .session-block { margin-bottom: 18px; page-break-inside: avoid; }
  .session-name { font-size: 12px; font-weight: 700; margin-bottom: 3px; }
  .session-meta { font-size: 10px; color: #666; margin-bottom: 6px; }
  .badge {
    display: inline-block; padding: 1px 7px; border-radius: 3px;
    font-size: 9px; background: #eee; border: 1px solid #ddd;
    margin-right: 4px; text-transform: uppercase; letter-spacing: 0.04em;
  }
  .block-name { font-size: 10px; font-weight: 700; color: #444; margin: 8px 0 4px; text-transform: uppercase; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 10px; font-size: 10px; }
  th {
    background: #f2f2f2; text-align: left; padding: 5px 8px;
    border: 1px solid #ccc; font-size: 9px; text-transform: uppercase;
    letter-spacing: 0.05em; font-weight: 700;
  }
  td { padding: 5px 8px; border: 1px solid #ddd; vertical-align: middle; }
  tr:nth-child(even) td { background: #fafafa; }
  .progress-row td { font-weight: 700; color: #1a7a40; }
  .empty { color: #999; text-align: center; padding: 24px; }
  @media print {
    body { padding: 12px; font-size: 10px; }
    .section-title { font-size: 12px; }
    .session-block { page-break-inside: avoid; }
  }
`;

function _openPrint(title, bodyHtml) {
  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>${_PRINT_CSS}</style>
</head>
<body>
  <div class="doc-header">
    <div class="doc-title">⚡ SistemaVida · Entrenamiento Físico</div>
    <div class="doc-subtitle">${title}</div>
    <div class="doc-meta">Generado el ${today}</div>
  </div>
  ${bodyHtml}
  <script>
    window.onload = function() { setTimeout(function() { window.print(); }, 400); };
  </script>
</body>
</html>`;

  const win = window.open('', '_blank');
  if (win) {
    win.document.write(html);
    win.document.close();
  } else {
    alert('Tu navegador bloqueó la ventana emergente. Permite ventanas emergentes para esta página y vuelve a intentarlo.');
  }
}

// ── PLAN PDF ─────────────────────────────────────────────────────────────────

export function downloadPlanPDF() {
  const plan = getPlan();
  if (!plan || plan.length === 0) {
    alert('No hay plan cargado para exportar.');
    return;
  }

  const phases = [...new Set(plan.map(s => s.phase))].sort();
  const phaseLabels = {
    1: 'Fase 1 — Adaptación',
    2: 'Fase 2 — Desarrollo',
    3: 'Fase 3 — Intensificación',
    4: 'Fase 4 — Deload / Recuperación',
  };
  const typeLabels = {
    A: 'Piernas', B: 'Pecho / Tríceps', C: 'Espalda / Bíceps',
    D: 'Hombros', E: 'Cardio', F: 'Full Body', G: 'Deload',
  };

  let html = `<div class="doc-meta" style="margin-bottom:16px">${plan.length} sesiones · ${phases.length} fase${phases.length > 1 ? 's' : ''}</div>`;

  phases.forEach(ph => {
    const pSessions = plan.filter(s => s.phase === ph);
    html += `<div class="section-title">${phaseLabels[ph] || 'Fase ' + ph} &nbsp;·&nbsp; ${pSessions.length} sesiones</div>`;

    pSessions.forEach(s => {
      const shortName = s.name.includes('—') ? s.name.split('—')[1].trim() : s.name;
      html += `
      <div class="session-block">
        <div class="session-name">Sesión ${String(s.id).padStart(2, '0')} · ${shortName}</div>
        <div class="session-meta">
          <span class="badge">${typeLabels[s.type] || s.type}</span>
          <span class="badge">${s.intensity}</span>
          <span class="badge">⏱ ${s.duration}</span>
        </div>`;

      s.workout.blocks.forEach(bl => {
        html += `
        <div class="block-name">${bl.name}</div>
        <table>
          <thead><tr>
            <th style="min-width:170px">Ejercicio</th>
            <th>Músculo</th>
            <th style="text-align:center">Series</th>
            <th style="text-align:center">Reps</th>
            <th style="text-align:center">Descanso</th>
            <th>Guía de peso</th>
            <th>Notas</th>
          </tr></thead>
          <tbody>`;

        bl.exercises.forEach(e => {
          html += `
            <tr>
              <td>${e.name}</td>
              <td style="color:#555">${e.muscle}</td>
              <td style="text-align:center">${e.sets}</td>
              <td style="text-align:center">${e.reps}</td>
              <td style="text-align:center">${e.rest}</td>
              <td>${e.weight_guide || '—'}</td>
              <td style="color:#777;font-style:italic">${e.notes || '—'}</td>
            </tr>`;
        });

        html += `</tbody></table>`;
      });

      html += `</div>`; // session-block
    });
  });

  _openPrint('Plan de Entrenamiento', html);
}

// ── HISTORIAL PDF ─────────────────────────────────────────────────────────────

export function downloadHistorialPDF() {
  const all = loadExLogs();
  const keys = Object.keys(all);

  if (keys.length === 0) {
    alert('No hay registros de ejercicios para exportar. Guarda pesos y reps en tus sesiones primero.');
    return;
  }

  // Group: muscle → exercise → sorted log entries
  const byMuscle = {};

  keys.forEach(key => {
    const log = all[key];
    const parts = key.split('_');
    const sid = parseInt(parts.pop());
    const exId = parts.join('_');
    const muscle = log.muscle || 'Otros';
    const exName = getExNameFromSessions(exId);
    const sessionName = getSessionName(sid);

    if (!byMuscle[muscle]) byMuscle[muscle] = {};
    if (!byMuscle[muscle][exName]) byMuscle[muscle][exName] = [];

    byMuscle[muscle][exName].push({
      date: log.date || '—',
      session: sessionName,
      sets: log.sets || [],
      timestamp: log.timestamp || log.date || '',
    });
  });

  // Sort entries within each exercise chronologically
  Object.values(byMuscle).forEach(exMap => {
    Object.values(exMap).forEach(logs => {
      logs.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
    });
  });

  const allDates = keys.map(k => all[k].date).filter(Boolean).sort();
  const dateRange = allDates.length
    ? `${allDates[0]} → ${allDates[allDates.length - 1]}`
    : 'Sin fechas registradas';

  let html = `
  <div class="doc-meta" style="margin-bottom:16px">
    ${keys.length} registros · Período: ${dateRange}
  </div>`;

  const muscleOrder = [
    'Pecho', 'Espalda', 'Hombros', 'Bíceps', 'Tríceps', 'Antebrazos',
    'Cuádriceps', 'Isquiotibiales', 'Glúteo', 'Pantorrillas', 'Core',
  ];

  const sortedMuscles = Object.keys(byMuscle).sort((a, b) => {
    const ia = muscleOrder.findIndex(m => a.toLowerCase().includes(m.toLowerCase()));
    const ib = muscleOrder.findIndex(m => b.toLowerCase().includes(m.toLowerCase()));
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });

  sortedMuscles.forEach(muscle => {
    html += `<div class="section-title">${muscle}</div>`;
    const exercises = byMuscle[muscle];

    Object.keys(exercises).sort().forEach(exName => {
      const logs = exercises[exName];
      const maxSets = Math.max(...logs.map(l => l.sets.length));

      // Detect improvement: compare first vs last entry
      const first = logs[0]?.sets || [];
      const last = logs[logs.length - 1]?.sets || [];
      const firstMax = Math.max(...first.map(s => s.weight || 0), 0);
      const lastMax = Math.max(...last.map(s => s.weight || 0), 0);
      const improved = logs.length > 1 && lastMax > firstMax;
      const delta = improved ? ` ↑ +${(lastMax - firstMax).toFixed(1)} kg` : '';

      html += `
      <div class="session-block">
        <div class="session-name">${exName}${delta ? `<span style="color:#1a7a40;font-size:10px;font-weight:400;margin-left:8px">${delta}</span>` : ''}</div>
        <table>
          <thead><tr>
            <th>Fecha</th>
            <th>Sesión</th>`;

      for (let i = 0; i < maxSets; i++) {
        html += `<th style="text-align:center">Serie ${i + 1}</th>`;
      }
      html += `<th style="text-align:center">Vol. total</th></tr></thead><tbody>`;

      logs.forEach((log, idx) => {
        const isLast = idx === logs.length - 1 && logs.length > 1;
        const totalVol = log.sets.reduce((sum, s) => sum + (s.weight || 0) * (s.reps || 0), 0);

        html += `<tr${isLast ? ' class="progress-row"' : ''}>
          <td>${log.date}</td>
          <td style="color:#666;font-size:9px">${log.session}</td>`;

        for (let i = 0; i < maxSets; i++) {
          const s = log.sets[i];
          html += `<td style="text-align:center">${s
            ? (s.weight > 0 ? `${s.weight}kg × ${s.reps}` : `— × ${s.reps}`)
            : '—'}</td>`;
        }

        html += `<td style="text-align:center;color:#555">${totalVol > 0 ? totalVol.toLocaleString('es') + ' kg' : '—'}</td>`;
        html += `</tr>`;
      });

      html += `</tbody></table></div>`;
    });
  });

  _openPrint('Historial de Entrenamiento', html);
}
