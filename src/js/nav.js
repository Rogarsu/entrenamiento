let _currentPage = 'fisico';

export function toggleNavDropdown() {
  document.getElementById('navDropdownPanel').classList.toggle('open');
}

export function closeNavDropdown() {
  document.getElementById('navDropdownPanel')?.classList.remove('open');
}

export function setNavPage(page) {
  _currentPage = page;
  const label         = document.getElementById('navCurrentPage');
  const itemFisico    = document.getElementById('navItemFisico');
  const itemHistorial = document.getElementById('navItemHistorial');
  const itemReportes  = document.getElementById('navItemReportes');
  const itemNutricion = document.getElementById('navItemNutricion');
  const itemProgreso  = document.getElementById('navItemProgreso');

  const labels = {
    fisico:    '<i class="ti ti-barbell"></i> Físico',
    historial: '<i class="ti ti-clipboard-list"></i> Historial',
    reportes:  '<i class="ti ti-file-description"></i> Reportes',
    nutricion: '<i class="ti ti-leaf"></i> Nutrición',
    progreso:  '<i class="ti ti-trending-up"></i> Progreso',
  };
  if (label) label.innerHTML = labels[page] || labels.fisico;

  itemFisico?.classList.toggle('active', page === 'fisico');
  itemHistorial?.classList.toggle('active', page === 'historial');
  itemReportes?.classList.toggle('active', page === 'reportes');
  itemNutricion?.classList.toggle('active', page === 'nutricion');
  itemProgreso?.classList.toggle('active', page === 'progreso');

  closeNavDropdown();
}

export function navGoFisico() {
  window.hideHistPage?.();
  window.hideReportsPage?.();
  window.hideNutritionPage?.();
  window.hideProgressPage?.();
  setNavPage('fisico');
}

export function navGoHistorial() {
  window.hideReportsPage?.();
  window.hideNutritionPage?.();
  window.hideProgressPage?.();
  window.showHistPage?.();
  setNavPage('historial');
}

export function navGoReportes() {
  window.hideHistPage?.();
  window.hideNutritionPage?.();
  window.hideProgressPage?.();
  window.showReportsPage?.();
  setNavPage('reportes');
}

export function navGoNutricion() {
  window.hideHistPage?.();
  window.hideReportsPage?.();
  window.hideProgressPage?.();
  window.showNutritionPage?.();
  setNavPage('nutricion');
}

export function navGoProgreso() {
  window.hideHistPage?.();
  window.hideReportsPage?.();
  window.hideNutritionPage?.();
  window.showProgressPage?.();
  setNavPage('progreso');
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('#navDropdown')) closeNavDropdown();
});
