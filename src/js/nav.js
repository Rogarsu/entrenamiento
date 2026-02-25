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

  if (page === 'fisico') {
    if (label) label.textContent = '🏋️ Físico';
    itemFisico?.classList.add('active');
    itemHistorial?.classList.remove('active');
  } else if (page === 'historial') {
    if (label) label.textContent = '📋 Historial';
    itemFisico?.classList.remove('active');
    itemHistorial?.classList.add('active');
  }

  closeNavDropdown();
}

export function navGoFisico() {
  window.hideHistPage?.();
  setNavPage('fisico');
}

export function navGoHistorial() {
  window.showHistPage?.();
  setNavPage('historial');
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('#navDropdown')) closeNavDropdown();
});
