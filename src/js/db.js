import { supabase } from './supabase.js';

// ── FETCH ──────────────────────────────────────────────────────────────────────

export async function fetchUserData(userId) {
  const [{ data: sl, error: e1 }, { data: el, error: e2 }] = await Promise.all([
    supabase.from('session_logs').select('*').eq('user_id', userId),
    supabase.from('exercise_logs').select('*').eq('user_id', userId),
  ]);
  if (e1) console.error('session_logs fetch:', e1);
  if (e2) console.error('exercise_logs fetch:', e2);
  return { sessionLogs: sl || [], exLogs: el || [] };
}

// ── UPSERT ─────────────────────────────────────────────────────────────────────

export async function upsertSessionLog(userId, log) {
  const { error } = await supabase.from('session_logs').upsert({
    user_id: userId,
    session_id: log.sessionId,
    completed_date: log.date,
    duration: log.duration,
    energy: log.energy,
    fatigue: log.fatigue,
    pain: log.pain,
    notes: log.notes,
  }, { onConflict: 'user_id,session_id' });
  if (error) console.error('[DB] upsert session_log falló — verifica RLS en Supabase:', error.message, error);
}

export async function upsertExLog(userId, exId, sessionId, data) {
  const { error } = await supabase.from('exercise_logs').upsert({
    user_id: userId,
    exercise_id: exId,
    session_id: sessionId,
    sets: data.sets,
    target_reps: data.targetReps,
    muscle: data.muscle,
    logged_date: data.date,
    logged_time: data.time,
    logged_at: data.timestamp,
  }, { onConflict: 'user_id,exercise_id,session_id' });
  if (error) console.error('[DB] upsert exercise_log falló — verifica RLS en Supabase:', error.message, error);
}

// ── TRAINING PLANS ──────────────────────────────────────────────────────────

export async function fetchUserPlan(userId) {
  const { data, error } = await supabase
    .from('training_plans')
    .select('sessions')
    .eq('user_id', userId)
    .single();
  if (error) {
    // PGRST116 = "no rows" → user has no plan yet (normal for new users)
    if (error.code === 'PGRST116') return null;
    // Any other error (network, RLS, etc.) → throw so caller uses cached plan
    throw error;
  }
  return data?.sessions || null;
}

export async function upsertUserPlan(userId, sessions) {
  const { error } = await supabase.from('training_plans').upsert({
    user_id: userId,
    sessions,
  }, { onConflict: 'user_id' });
  if (error) console.error('[DB] upsert training_plan falló — verifica RLS en Supabase:', error.message, error);
}

export async function deleteUserLogs(userId) {
  await Promise.all([
    supabase.from('session_logs').delete().eq('user_id', userId),
    supabase.from('exercise_logs').delete().eq('user_id', userId),
  ]);
}

export async function deleteUserPlan(userId) {
  await supabase.from('training_plans').delete().eq('user_id', userId);
}

// ── NUTRITION LOGS ──────────────────────────────────────────────────────────

export async function fetchNutritionLog(userId, date) {
  const { data, error } = await supabase
    .from('nutrition_logs')
    .select('completed_slots, session_id')
    .eq('user_id', userId)
    .eq('log_date', date)
    .single();
  if (error) return null;
  return data;
}

export async function upsertNutritionLog(userId, date, sessionId, completedSlots) {
  const { error } = await supabase.from('nutrition_logs').upsert({
    user_id: userId,
    log_date: date,
    session_id: sessionId,
    completed_slots: completedSlots,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id,log_date' });
  if (error) console.error('[DB] upsert nutrition_log falló — verifica RLS en Supabase:', error.message, error);
}

// ── USER PREFERENCES ─────────────────────────────────────────────────────────

export async function fetchUserPrefs(userId) {
  const { data, error } = await supabase
    .from('user_preferences')
    .select('food_profile, plan_meta')
    .eq('user_id', userId)
    .single();
  if (error) return null; // table missing or no row yet → use localStorage
  return data || null;
}

export async function upsertUserPrefs(userId, prefs) {
  const { error } = await supabase.from('user_preferences').upsert({
    user_id: userId,
    ...prefs,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' });
  if (error) console.error('[DB] upsert user_preferences falló — verifica RLS en Supabase:', error.message, error);
}

// ── BODY METRICS ─────────────────────────────────────────────────────────────

export async function fetchBodyMetrics(userId) {
  const { data, error } = await supabase
    .from('body_metrics')
    .select('metric_date, metric_timestamp, weight_kg, waist_cm, hip_cm, chest_cm, arm_cm, thigh_cm')
    .eq('user_id', userId)
    .order('metric_timestamp', { ascending: true });
  if (error) { console.error('fetchBodyMetrics:', error); return []; }
  // Normalizar: usar metric_timestamp como metric_date local si existe
  return (data || []).map(r => ({
    ...r,
    metric_date: r.metric_timestamp || r.metric_date,
  }));
}

// Upsert de PESO — un registro por día, conflict en metric_date
export async function upsertBodyMetrics(userId, date, fields) {
  const payload = { user_id: userId, metric_date: date };
  for (const [k, v] of Object.entries(fields)) {
    if (v !== null && v !== undefined) payload[k] = v;
  }
  const { error } = await supabase.from('body_metrics').upsert(
    payload,
    { onConflict: 'user_id,metric_date' }
  );
  if (error) console.error('[DB] upsert body_metrics falló — verifica RLS en Supabase:', error.message, error);
}

// Insert de MEDIDAS — Postgres genera ID único automático, siempre crea fila nueva
export async function insertBodyMeasurement(userId, timestamp, dateStr, fields) {
  const payload = { user_id: userId, metric_date: dateStr, metric_timestamp: timestamp };
  for (const [k, v] of Object.entries(fields)) {
    if (v !== null && v !== undefined) payload[k] = v;
  }
  const { error } = await supabase.from('body_metrics').insert(payload);
  if (error) console.error('[DB] insert body measurement falló:', error.message, error);
}

// Alias para compatibilidad con llamadas existentes (solo peso)
export async function upsertBodyMetric(userId, date, weightKg) {
  return upsertBodyMetrics(userId, date, { weight_kg: weightKg });
}
