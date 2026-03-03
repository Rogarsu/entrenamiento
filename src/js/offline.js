import { getUserId, saveState } from './state.js';
import { syncAllExLogs } from './storage.js';
import { upsertBodyMetric, upsertNutritionLog, upsertUserPrefs } from './db.js';

const TOAST_ID = 'offlineToast';
let _hideTimer = null;

function _getEl() {
  let el = document.getElementById(TOAST_ID);
  if (!el) {
    el = document.createElement('div');
    el.id = TOAST_ID;
    document.body.appendChild(el);
  }
  return el;
}

function _toast(msg, type, autohide = false) {
  if (_hideTimer) { clearTimeout(_hideTimer); _hideTimer = null; }
  const el = _getEl();
  el.textContent = msg;
  el.setAttribute('data-type', type);
  el.className = 'offline-toast';
  // Force reflow so transition triggers correctly
  void el.offsetHeight;
  el.classList.add('offline-toast--visible', `offline-toast--${type}`);
  if (autohide) _hideTimer = setTimeout(_hideToast, 2500);
}

function _hideToast() {
  const el = document.getElementById(TOAST_ID);
  if (el) el.classList.remove('offline-toast--visible');
}

async function syncAll() {
  const uid = getUserId();
  if (!uid) return;
  _toast('Sincronizando...', 'syncing', false);

  saveState();
  syncAllExLogs();

  try {
    const metrics = JSON.parse(localStorage.getItem('sv_body_metrics') || '[]');
    for (const m of metrics) {
      if (m.date && m.weight_kg != null) {
        await upsertBodyMetric(uid, m.date, m.weight_kg).catch(console.error);
      }
    }
  } catch(e) {}

  try {
    const today = new Date().toISOString().slice(0, 10);
    const slots = JSON.parse(localStorage.getItem(`sv_meal_${today}`) || 'null');
    if (slots) await upsertNutritionLog(uid, today, null, slots).catch(console.error);
  } catch(e) {}

  try {
    const fp = JSON.parse(localStorage.getItem('sv_food_profile') || 'null');
    const pm = JSON.parse(localStorage.getItem('sv_plan_meta') || 'null');
    const prefs = {};
    if (fp) prefs.food_profile = fp;
    if (pm) prefs.plan_meta = pm;
    if (Object.keys(prefs).length) await upsertUserPrefs(uid, prefs).catch(console.error);
  } catch(e) {}

  _toast('✓ Sincronizado', 'synced', true);
}

export function initOffline() {
  if (!navigator.onLine) {
    _toast('Sin conexión — cambios guardados localmente', 'offline');
  }
  window.addEventListener('offline', () => {
    _toast('Sin conexión — cambios guardados localmente', 'offline');
  });
  window.addEventListener('online', () => {
    syncAll();
  });
}
