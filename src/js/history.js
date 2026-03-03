import { loadExLogs } from './storage.js';
import { getPlan } from './state.js';

const _state = { muscle: '__all__', ex: '', sortDir: 'desc' };

export function getExNameFromSessions(exId) {
  for (const s of getPlan()) {
    for (const bl of (s.workout?.blocks || [])) {
      for (const ex of (bl.exercises || [])) {
        if (ex.id === exId) return ex.name;
      }
    }
  }
  return exId;
}

export function getSessionName(sessionId) {
  const s = getPlan().find(x => x.id === sessionId);
  return s ? s.name : `Sesión ${sessionId}`;
}

function _buildRows(all) {
  const rows = [];
  for (const key of Object.keys(all)) {
    const log = all[key];
    const parts = key.split('_');
    const sid = parseInt(parts.pop());
    const exId = parts.join('_');
    const exName = getExNameFromSessions(exId);
    const muscle = log.muscle || '—';

    if (_state.ex && !exName.toLowerCase().includes(_state.ex.toLowerCase()) && !muscle.toLowerCase().includes(_state.ex.toLowerCase())) continue;

    const sessionName = getSessionName(sid);
    const date = log.date || '—';
    const time = log.time || '—';
    (log.sets || []).forEach((set, i) => {
      rows.push({ muscle, exName, setNum: i + 1, reps: set.reps, weight: set.weight, sessionName, sid, date, time, timestamp: log.timestamp || '' });
    });
  }

  rows.sort((a, b) => {
    const cmp = (a.timestamp && b.timestamp)
      ? a.timestamp.localeCompare(b.timestamp)
      : a.sid - b.sid;
    return _state.sortDir === 'desc' ? -cmp : cmp;
  });

  return rows;
}

function _renderTable(rows) {
  const tbody = document.getElementById('histTbody');
  const emptyMsg = document.getElementById('histEmpty');
  const wrap = document.querySelector('.hist-table-wrap');

  if (rows.length === 0) {
    tbody.innerHTML = '';
    emptyMsg.style.display = 'block';
    wrap.style.display = 'none';
  } else {
    emptyMsg.style.display = 'none';
    wrap.style.display = '';
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

  const sortTh = document.getElementById('histSortTh');
  if (sortTh) sortTh.innerHTML = `Fecha & Hora <span class="hist-sort-icon"><i class="ti ti-arrow-${_state.sortDir === 'desc' ? 'down' : 'up'}"></i></span>`;
}

function _renderFilters() {
  const filtersDiv = document.getElementById('histFilters');
  filtersDiv.innerHTML = `
    <div class="hist-filter-row">
      <input class="hist-search" type="text" placeholder="Buscar ejercicio o músculo..." value="${_state.ex}" oninput="histSetEx(this.value)">
    </div>`;
}

export function buildHistoryPage(opts) {
  if (opts && typeof opts === 'object') {
    Object.assign(_state, opts);
  } else if (typeof opts === 'string') {
    _state.muscle = opts;
  }
  const all = loadExLogs();
  _renderFilters();
  _renderTable(_buildRows(all));
}

export function histSetEx(value) {
  _state.ex = value;
  _renderTable(_buildRows(loadExLogs()));
}

export function histToggleSort() {
  _state.sortDir = _state.sortDir === 'desc' ? 'asc' : 'desc';
  _renderTable(_buildRows(loadExLogs()));
}

export function showHistPage() {
  _state.muscle = '__all__';
  _state.ex = '';
  _state.sortDir = 'desc';
  document.getElementById('histPage').classList.add('open');
  buildHistoryPage();
}

export function hideHistPage() {
  document.getElementById('histPage').classList.remove('open');
}
