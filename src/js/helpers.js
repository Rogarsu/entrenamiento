export function escStr(str) {
  return (str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// ── Exercise card visual helpers (used by modal.js and guidedMode.js) ─────────

export function muscleSvg(muscleName) {
  const m = (muscleName || '').toLowerCase();
  let zone = 'core';
  if (m.includes('pecho') || m.includes('chest') || m.includes('pectoral'))          zone = 'chest';
  else if (m.includes('espalda') || m.includes('back') || m.includes('dorsal') ||
           m.includes('trapecio') || m.includes('lumbar') || m.includes('lat'))       zone = 'back';
  else if (m.includes('hombro') || m.includes('shoulder') || m.includes('deltoid'))   zone = 'shoulders';
  else if (m.includes('bícep') || m.includes('bicep'))                                zone = 'biceps';
  else if (m.includes('trícep') || m.includes('tricep'))                              zone = 'triceps';
  else if (m.includes('pierna') || m.includes('leg') || m.includes('cuádr') ||
           m.includes('quad') || m.includes('isquio') || m.includes('hamst') ||
           m.includes('fémor') || m.includes('femore'))                               zone = 'legs';
  else if (m.includes('glút') || m.includes('glute') || m.includes('pompi'))          zone = 'glutes';
  else if (m.includes('gemel') || m.includes('calf') || m.includes('soleo') ||
           m.includes('tibial'))                                                       zone = 'calves';
  else if (m.includes('abdom') || m.includes('core') || m.includes('oblicu'))         zone = 'core';

  const C = 'rgba(6,182,212,0.85)';
  const P = 'rgba(139,92,246,0.8)';

  const highlights = {
    chest:     `<rect x="19" y="22" width="22" height="14" rx="2" fill="${C}"/>`,
    core:      `<rect x="19" y="37" width="22" height="13" rx="2" fill="${C}"/>`,
    shoulders: `<rect x="7" y="18" width="9" height="11" rx="3" fill="${C}"/><rect x="44" y="18" width="9" height="11" rx="3" fill="${C}"/>`,
    biceps:    `<rect x="8" y="29" width="8" height="13" rx="3" fill="${C}"/><rect x="44" y="29" width="8" height="13" rx="3" fill="${C}"/>`,
    triceps:   `<rect x="8" y="29" width="8" height="13" rx="3" fill="${C}"/><rect x="44" y="29" width="8" height="13" rx="3" fill="${C}"/>`,
    legs:      `<rect x="18" y="53" width="10" height="20" rx="3" fill="${C}"/><rect x="32" y="53" width="10" height="20" rx="3" fill="${C}"/>`,
    glutes:    `<rect x="18" y="50" width="24" height="9" rx="3" fill="${C}"/>`,
    calves:    `<rect x="19" y="74" width="8" height="16" rx="3" fill="${C}"/><rect x="33" y="74" width="8" height="16" rx="3" fill="${C}"/>`,
    back:      `<rect x="19" y="22" width="22" height="28" rx="2" fill="${P}"/>`,
  };

  return `<svg viewBox="0 0 60 96" width="48" height="77" style="flex-shrink:0">
    <circle cx="30" cy="7" r="6" fill="none" stroke="var(--border2)" stroke-width="1.5"/>
    <rect x="26" y="13" width="8" height="5" rx="2" fill="none" stroke="var(--border2)" stroke-width="1.2"/>
    <rect x="17" y="18" width="26" height="32" rx="4" fill="none" stroke="var(--border2)" stroke-width="1.5"/>
    <rect x="7" y="18" width="9" height="28" rx="4" fill="none" stroke="var(--border2)" stroke-width="1.5"/>
    <rect x="44" y="18" width="9" height="28" rx="4" fill="none" stroke="var(--border2)" stroke-width="1.5"/>
    <rect x="17" y="51" width="11" height="35" rx="4" fill="none" stroke="var(--border2)" stroke-width="1.5"/>
    <rect x="32" y="51" width="11" height="35" rx="4" fill="none" stroke="var(--border2)" stroke-width="1.5"/>
    ${highlights[zone] || highlights.core}
  </svg>`;
}

export function equipIcon(equip) {
  const e = (equip || '').toLowerCase();
  let icon = 'ti-dumbbell';
  if      (e.includes('barra') || e.includes('barbell'))                               icon = 'ti-barbell';
  else if (e.includes('mancuerna') || e.includes('dumbbell'))                          icon = 'ti-dumbbell';
  else if (e.includes('polea') || e.includes('cable'))                                 icon = 'ti-arrow-guide';
  else if (e.includes('máquina') || e.includes('machine'))                             icon = 'ti-settings-cog';
  else if (e.includes('kettlebell'))                                                    icon = 'ti-circle-filled';
  else if (e.includes('sin') || e.includes('corporal') || e.includes('bodyweight') ||
           e.includes('no equip'))                                                      icon = 'ti-user';
  else if (e.includes('banco') || e.includes('silla') || e.includes('bench'))          icon = 'ti-armchair';
  else if (e.includes('banda') || e.includes('elástico') || e.includes('band'))        icon = 'ti-wave-saw-tool';
  else if (e.includes('trx') || e.includes('suspensión'))                              icon = 'ti-rings';
  return `<i class="ti ${icon}"></i>`;
}

export function diffLabel(diff) {
  const labels = { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado' };
  const cls    = { beginner: 'gm-diff--beginner', intermediate: 'gm-diff--intermediate', advanced: 'gm-diff--advanced' };
  return `<span class="gm-diff-badge ${cls[diff] || cls.intermediate}">${labels[diff] || 'Intermedio'}</span>`;
}

export function catLabel(cat) {
  const map = { compound: 'Compuesto', isolation: 'Aislado', cardio: 'Cardio', core: 'Core', mobility: 'Movilidad' };
  return map[cat] || cat || '';
}

export function muscleName(muscle) {
  const map = {
    chest: 'Pecho', pecho: 'Pecho',
    back: 'Espalda', espalda: 'Espalda', lats: 'Dorsales', traps: 'Trapecios',
    shoulders: 'Hombros', hombros: 'Hombros',
    biceps: 'Bíceps', triceps: 'Tríceps',
    legs: 'Piernas', quads: 'Cuádriceps', hamstrings: 'Isquiotibiales',
    glutes: 'Glúteos', calves: 'Gemelos',
    core: 'Core', abs: 'Abdomen', forearms: 'Antebrazos',
  };
  return map[(muscle || '').toLowerCase()] || muscle || '—';
}
