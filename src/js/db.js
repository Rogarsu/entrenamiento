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
  if (error) console.error('upsert session_log:', error);
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
  if (error) console.error('upsert exercise_log:', error);
}

// ── TRAINING PLANS ──────────────────────────────────────────────────────────

export async function fetchUserPlan(userId) {
  const { data, error } = await supabase
    .from('training_plans')
    .select('sessions')
    .eq('user_id', userId)
    .single();
  if (error) return null;
  return data?.sessions || null;
}

export async function upsertUserPlan(userId, sessions) {
  const { error } = await supabase.from('training_plans').upsert({
    user_id: userId,
    sessions,
  }, { onConflict: 'user_id' });
  if (error) console.error('upsert training_plan:', error);
}
