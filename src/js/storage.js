export function loadExLogs() {
  return JSON.parse(localStorage.getItem('sv_ex_logs') || '{}');
}

export function saveExLogs(data) {
  localStorage.setItem('sv_ex_logs', JSON.stringify(data));
}

export function getExLog(exId, sessionId) {
  return loadExLogs()[`${exId}_${sessionId}`] || null;
}

export function getLastExLog(exId, currentSessionId) {
  const all = loadExLogs();
  const entries = Object.entries(all)
    .filter(([k]) => k.startsWith(`${exId}_`) && parseInt(k.split('_').pop()) < currentSessionId)
    .sort((a, b) => parseInt(b[0].split('_').pop()) - parseInt(a[0].split('_').pop()));
  return entries.length ? entries[0][1] : null;
}

export function saveExLog(exId, sessionId, sets, targetReps, muscle) {
  const all = loadExLogs();
  const now = new Date();
  all[`${exId}_${sessionId}`] = {
    date: now.toLocaleDateString('es-CO'),
    time: now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
    timestamp: now.toISOString(),
    sets,
    targetReps: parseInt(targetReps) || 0,
    muscle: muscle || '',
  };
  saveExLogs(all);
}
