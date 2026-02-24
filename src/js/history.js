import { loadExLogs } from './storage.js';
import { SESSIONS } from '../data/sessions.js';

export function getExNameFromSessions(exId) {
  for (const s of SESSIONS) {
    for (const bl of (s.workout?.blocks || [])) {
      for (const ex of (bl.exercises || [])) {
        if (ex.id === exId) return ex.name;
      }
    }
  }
  return exId;
}

export function getSessionName(sessionId) {
  const s = SESSIONS.find(x => x.id === sessionId);
  return s ? s.name : `Sesión ${sessionId}`;
}

export function buildHistoryPage(filterMuscle) {
  const all = loadExLogs();
  const keys = Object.keys(all);
  const tbody = document.getElementById('histTbody');
  const emptyMsg = document.getElementById('histEmpty');

  const rows = [];
  for (const key of keys) {
    const log = all[key];
    const parts = key.split('_');
    const sid = parseInt(parts.pop());
    const exId = parts.join('_');
    const exName = getExNameFromSessions(exId);
    const muscle = log.muscle || '—';
    if (filterMuscle && filterMuscle !== '__all__' && muscle.toLowerCase().indexOf(filterMuscle.toLowerCase()) === -1) continue;
    const sessionName = getSessionName(sid);
    const date = log.date || '—';
    const time = log.time || '—';
    (log.sets || []).forEach((set, i) => {
      rows.push({ muscle, exName, setNum: i + 1, reps: set.reps, weight: set.weight, sessionName, sid, date, time, timestamp: log.timestamp || '' });
    });
  }

  rows.sort((a, b) => {
    if (a.timestamp && b.timestamp) return b.timestamp.localeCompare(a.timestamp);
    return b.sid - a.sid;
  });

  if (rows.length === 0) {
    tbody.innerHTML = '';
    emptyMsg.style.display = 'block';
    document.querySelector('.hist-table-wrap').style.display = 'none';
  } else {
    emptyMsg.style.display = 'none';
    document.querySelector('.hist-table-wrap').style.display = '';
    tbody.innerHTML = rows.map(r => `
      <tr>
        <td><span class="hist-muscle">${r.muscle}</span></td>
        <td><span class="hist-ex-name">${r.exName}</span></td>
        <td><span class="hist-set-num">${r.setNum}</span></td>
        <td style="font-family:var(--font-mono);color:var(--text2)">${r.reps}</td>
        <td><span class="hist-weight">${r.weight > 0 ? r.weight + ' kg' : '—'}</span></td>
        <td><span class="hist-session-badge">${r.sessionName}</span></td>
        <td><span class="hist-date">${r.date} ${r.time}</span></td>
      </tr>`).join('');
  }

  const filtersDiv = document.getElementById('histFilters');
  const muscles = [...new Set(Object.values(all).map(l => l.muscle || '').filter(Boolean))].sort();
  const active = filterMuscle || '__all__';
  filtersDiv.innerHTML = [
    `<button class="hist-filter-btn${active === '__all__' ? ' active' : ''}" onclick="buildHistoryPage('__all__')">Todos</button>`,
    ...muscles.map(m => `<button class="hist-filter-btn${active === m ? ' active' : ''}" onclick="buildHistoryPage('${m.replace(/'/g, "\\'")}')">${m}</button>`)
  ].join('');
}

export function showHistPage() {
  document.getElementById('histPage').classList.add('open');
  buildHistoryPage();
}

export function hideHistPage() {
  document.getElementById('histPage').classList.remove('open');
}
