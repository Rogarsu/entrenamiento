import { supabase } from './supabase.js';
import { fetchUserData, fetchUserPlan, upsertUserPlan } from './db.js';
import { initState, setPlan } from './state.js';
import { initExLogs } from './storage.js';
import { buildStats } from './stats.js';
import { buildSidebar } from './sidebar.js';
import { hasPendingLocalData, showMigrationBanner } from './migrate.js';
import { showOnboarding } from './onboarding.js';
import { SESSIONS as DEFAULT_SESSIONS } from '../data/sessions.js';

// ── INTERNAL ───────────────────────────────────────────────────────────────────

async function _loadAndRender(user) {
  const { sessionLogs, exLogs } = await fetchUserData(user.id);
  initState(sessionLogs, user.id);
  initExLogs(exLogs);

  // Load user's training plan from Supabase
  const planSessions = await fetchUserPlan(user.id);

  if (planSessions) {
    // User has a saved plan
    setPlan(planSessions);
    buildStats();
    buildSidebar();
    if (hasPendingLocalData(sessionLogs, exLogs)) showMigrationBanner();
  } else if (sessionLogs.length > 0) {
    // Existing user (has logs but no plan row) → save DEFAULT_SESSIONS as their plan
    await upsertUserPlan(user.id, DEFAULT_SESSIONS);
    setPlan(DEFAULT_SESSIONS);
    buildStats();
    buildSidebar();
    if (hasPendingLocalData(sessionLogs, exLogs)) showMigrationBanner();
  } else {
    // New user with no logs and no plan → show onboarding
    if (hasPendingLocalData(sessionLogs, exLogs)) showMigrationBanner();
    showOnboarding();
    return false; // signal: onboarding is showing, app not shown yet
  }

  return true;
}

function _showApp(user) {
  document.getElementById('authOverlay').style.display = 'none';
  document.getElementById('onboardingOverlay').style.display = 'none';
  document.getElementById('appContent').style.display = '';
  const el = document.getElementById('navUserEmail');
  if (el) el.textContent = user.email;
}

function _showLogin() {
  document.getElementById('authOverlay').style.display = 'flex';
  document.getElementById('appContent').style.display = 'none';
  document.getElementById('onboardingOverlay').style.display = 'none';
  _renderTab('signin');
}

function _setError(msg) {
  const el = document.getElementById('authError');
  if (el) { el.textContent = msg || ''; el.style.display = msg ? 'block' : 'none'; }
}

function _setLoading(on) {
  const btn = document.getElementById('authSubmitBtn');
  if (btn) btn.disabled = on;
}

function _renderTab(tab) {
  ['signin', 'signup'].forEach(t => {
    document.getElementById(`authTab_${t}`).classList.toggle('active', t === tab);
    document.getElementById(`authForm_${t}`).style.display = t === tab ? '' : 'none';
  });
  _setError('');
  const success = document.getElementById('authSuccess');
  if (success) success.style.display = 'none';
}

// ── PUBLIC: INIT ───────────────────────────────────────────────────────────────

export async function initAuth() {
  // Check for existing session (handles OAuth redirect too)
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    const appReady = await _loadAndRender(session.user);
    if (appReady) _showApp(session.user);
    else {
      // Onboarding is showing — still update nav email
      const el = document.getElementById('navUserEmail');
      if (el) el.textContent = session.user.email;
    }
  } else {
    _showLogin();
  }

  // Listen for future auth state changes
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session) {
      const appReady = await _loadAndRender(session.user);
      if (appReady) _showApp(session.user);
      else {
        const el = document.getElementById('navUserEmail');
        if (el) el.textContent = session.user.email;
      }
    } else if (event === 'SIGNED_OUT') {
      initState([], null);
      initExLogs([]);
      _showLogin();
    }
  });
}

// ── PUBLIC: AUTH ACTIONS (called from HTML onclick) ───────────────────────────

export function authToggleTab(tab) {
  _renderTab(tab);
}

export async function authSignIn() {
  const email = document.getElementById('authEmail').value.trim();
  const pass = document.getElementById('authPass').value;
  if (!email || !pass) { _setError('Ingresa tu email y contraseña.'); return; }
  _setLoading(true);
  _setError('');
  const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
  _setLoading(false);
  if (error) _setError(error.message === 'Invalid login credentials'
    ? 'Email o contraseña incorrectos.'
    : error.message);
}

export async function authSignUp() {
  const email = document.getElementById('authEmailUp').value.trim();
  const pass = document.getElementById('authPassUp').value;
  const pass2 = document.getElementById('authPassUp2').value;
  if (!email || !pass) { _setError('Ingresa email y contraseña.'); return; }
  if (pass !== pass2) { _setError('Las contraseñas no coinciden.'); return; }
  if (pass.length < 6) { _setError('La contraseña debe tener al menos 6 caracteres.'); return; }
  _setLoading(true);
  _setError('');
  const { error } = await supabase.auth.signUp({ email, password: pass });
  _setLoading(false);
  if (error) {
    _setError(error.message);
  } else {
    document.getElementById('authSuccess').style.display = 'block';
    document.getElementById('authSuccess').textContent = '✓ Revisa tu email para confirmar tu cuenta.';
  }
}

export async function authSignInGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin },
  });
  if (error) _setError(error.message);
}

export async function authSignOut() {
  await supabase.auth.signOut();
}
