let _currentPage = 'fisico';

export function toggleNavDropdown() {
  document.getElementById('navDropdownPanel').classList.toggle('open');
}

export function closeNavDropdown() {
  document.getElementById('navDropdownPanel')?.classList.remove('open');
}

export function setNavPage(page) {
  _currentPage = page;
  const label = document.getElementById('navCurrentPage');
  const itemFisico = document.getElementById('navItemFisico');
  const itemHistorial = document.getElementById('navItemHistorial');
  const itemReportes = document.getElementById('navItemReportes');

  const labels = {
    fisico:    '<i class="ti ti-barbell"></i> Físico',
    historial: '<i class="ti ti-clipboard-list"></i> Historial',
    reportes:  '<i class="ti ti-file-description"></i> Reportes',
  };
  if (label) label.innerHTML = labels[page] || labels.fisico;

  itemFisico?.classList.toggle('active', page === 'fisico');
  itemHistorial?.classList.toggle('active', page === 'historial');
  itemReportes?.classList.toggle('active', page === 'reportes');

  closeNavDropdown();
}

export function navGoFisico() {
  window.hideHistPage?.();
  window.hideReportsPage?.();
  setNavPage('fisico');
}

export function navGoHistorial() {
  window.hideReportsPage?.();
  window.showHistPage?.();
  setNavPage('historial');
}

export function navGoReportes() {
  window.hideHistPage?.();
  window.showReportsPage?.();
  setNavPage('reportes');
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('#navDropdown')) closeNavDropdown();
});
