// ===== ESTILOS =====
import './styles/base.css';
import './styles/nav.css';
import './styles/layout.css';
import './styles/session.css';
import './styles/modal.css';
import './styles/stats.css';
import './styles/history.css';
import './styles/wellness.css';

// ===== MÓDULOS JS =====
import { buildStats } from './js/stats.js';
import { buildSidebar, togglePhase, toggleSidebar } from './js/sidebar.js';
import { loadSession, switchTab } from './js/session.js';
import { openLogForm, closeLogForm, saveLog } from './js/logform.js';
import { openExModal, closeExModal, saveCurrentExLog } from './js/modal.js';
import { buildHistoryPage, showHistPage, hideHistPage, histSetEx, histToggleSort } from './js/history.js';
import { toggleNavDropdown, navGoFisico, navGoHistorial } from './js/nav.js';
import { openWellnessCheck, closeWellnessModal } from './js/wellness.js';

// ===== EXPONER A WINDOW (para onclick en HTML) =====
window.toggleSidebar = toggleSidebar;
window.togglePhase = togglePhase;
window.loadSession = loadSession;
window.switchTab = switchTab;
window.openLogForm = openLogForm;
window.closeLogForm = closeLogForm;
window.saveLog = saveLog;
window.openExModal = openExModal;
window.closeExModal = closeExModal;
window.saveCurrentExLog = saveCurrentExLog;
window.showHistPage = showHistPage;
window.hideHistPage = hideHistPage;
window.buildHistoryPage = buildHistoryPage;
window.histSetEx = histSetEx;
window.histToggleSort = histToggleSort;
window.toggleNavDropdown = toggleNavDropdown;
window.navGoFisico = navGoFisico;
window.navGoHistorial = navGoHistorial;
window.openWellnessCheck = openWellnessCheck;
window.closeWellnessModal = closeWellnessModal;

// ===== INIT =====
buildStats();
buildSidebar();
