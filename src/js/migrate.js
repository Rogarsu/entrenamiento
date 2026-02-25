import { upsertSessionLog, upsertExLog } from './db.js';
import { initState } from './state.js';
import { initExLogs } from './storage.js';
import { fetchUserData } from './db.js';
import { buildStats } from './stats.js';
import { buildSidebar } from './sidebar.js';

const MIGRATED_KEY = 'sv_migrated';

// Returns true if there is local data worth migrating to Supabase
export function hasPendingLocalData(supabaseSessionLogs, supabaseExLogs) {
  if (localStorage.getItem(MIGRATED_KEY) === '1') return false;
  if (supabaseSessionLogs.length > 0 || supabaseExLogs.length > 0) return false;

  const localLogs = JSON.parse(localStorage.getItem('sv_logs') || '[]');
  const localExLogs = JSON.parse(localStorage.getItem('sv_ex_logs') || '{}');
  return localLogs.length > 0 || Object.keys(localExLogs).length > 0;
}

export function showMigrationBanner() {
  const banner = document.getElementById('migrationBanner');
  if (banner) banner.style.display = 'flex';
}

export function hideMigrationBanner() {
  const banner = document.getElementById('migrationBanner');
  if (banner) banner.style.display = 'none';
}

export async function migrateLocalData(userId) {
  const btn = document.getElementById('migrateBtnConfirm');
  if (btn) { btn.disabled = true; btn.textContent = 'Migrando...'; }

  const localLogs = JSON.parse(localStorage.getItem('sv_logs') || '[]');
  const localExLogs = JSON.parse(localStorage.getItem('sv_ex_logs') || '{}');

  // Migrate session logs
  for (const log of localLogs) {
    await upsertSessionLog(userId, log);
  }

  // Migrate exercise logs
  for (const [key, data] of Object.entries(localExLogs)) {
    const parts = key.split('_');
    const sessionId = parseInt(parts.pop());
    const exId = parts.join('_');
    await upsertExLog(userId, exId, sessionId, data);
  }

  // Mark as migrated so banner never shows again
  localStorage.setItem(MIGRATED_KEY, '1');

  // Reload from Supabase so in-memory state is in sync
  const { sessionLogs, exLogs } = await fetchUserData(userId);
  initState(sessionLogs, userId);
  initExLogs(exLogs);
  buildStats();
  buildSidebar();

  hideMigrationBanner();
}

export function dismissMigration() {
  localStorage.setItem(MIGRATED_KEY, '1');
  hideMigrationBanner();
}
