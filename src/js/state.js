export let state = {
  logs: JSON.parse(localStorage.getItem('sv_logs') || '[]'),
  currentId: null,
  expandedPhases: [1, 2, 3, 4],
};

export function saveState() {
  localStorage.setItem('sv_logs', JSON.stringify(state.logs));
}

export function isDone(id) {
  return state.logs.some(l => l.sessionId === id);
}

export function getLog(id) {
  return state.logs.find(l => l.sessionId === id);
}
