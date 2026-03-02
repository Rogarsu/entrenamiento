// ===== ESTILOS =====
import '@tabler/icons-webfont/dist/tabler-icons.min.css';
import './styles/base.css';
import './styles/nav.css';
import './styles/layout.css';
import './styles/session.css';
import './styles/modal.css';
import './styles/stats.css';
import './styles/history.css';
import './styles/wellness.css';
import './styles/auth.css';
import './styles/onboarding.css';
import './styles/reports.css';
import './styles/nutrition.css';

// ===== MÓDULOS JS =====
import { buildSidebar, togglePhase, toggleSidebar } from './js/sidebar.js';
import { loadSession, switchTab } from './js/session.js';
import { openLogForm, closeLogForm, saveLog } from './js/logform.js';
import { openExModal, closeExModal, saveCurrentExLog } from './js/modal.js';
import { buildHistoryPage, showHistPage, hideHistPage, histSetEx, histToggleSort } from './js/history.js';
import { toggleNavDropdown, navGoFisico, navGoHistorial, navGoReportes, navGoNutricion } from './js/nav.js';
import { showNutritionPage, hideNutritionPage, nutSetTab, nutGoFund, nutToggleFund, nutSetTrainingHour, nutOpenRecipeModal, nutCloseRecipeModal, nutSetView } from './js/nutrition.js';
import { showReportsPage, hideReportsPage, downloadPlanPDF, downloadHistorialPDF } from './js/reports.js';
import { openWellnessCheck, closeWellnessModal } from './js/wellness.js';
import { initAuth, authToggleTab, authSignIn, authSignUp, authSignInGoogle, authSignOut } from './js/auth.js';
import { dismissMigration, migrateLocalData as _migrate } from './js/migrate.js';
import { getUserId } from './js/state.js';
import { openPlanModal, closePlanModal, showNewCycle, openResetModal, closeResetModal, resetProgress } from './js/onboarding.js';

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
window.navGoFisico    = navGoFisico;
window.navGoHistorial = navGoHistorial;
window.navGoReportes  = navGoReportes;
window.navGoNutricion = navGoNutricion;
window.showNutritionPage = showNutritionPage;
window.hideNutritionPage = hideNutritionPage;
window.nutSetTab          = nutSetTab;
window.nutGoFund          = nutGoFund;
window.nutToggleFund      = nutToggleFund;
window.nutSetTrainingHour  = nutSetTrainingHour;
window.nutOpenRecipeModal  = nutOpenRecipeModal;
window.nutCloseRecipeModal = nutCloseRecipeModal;
window.nutSetView          = nutSetView;
window.showReportsPage = showReportsPage;
window.hideReportsPage = hideReportsPage;
window.downloadPlanPDF = downloadPlanPDF;
window.downloadHistorialPDF = downloadHistorialPDF;
window.openWellnessCheck = openWellnessCheck;
window.closeWellnessModal = closeWellnessModal;
window.authToggleTab = authToggleTab;
window.authSignIn = authSignIn;
window.authSignUp = authSignUp;
window.authSignInGoogle = authSignInGoogle;
window.authSignOut = authSignOut;
window.migrateLocalData = () => _migrate(getUserId());
window.dismissMigration = dismissMigration;
window.openPlanModal  = openPlanModal;
window.closePlanModal = closePlanModal;
window.showNewCycle   = showNewCycle;
window.openResetModal  = openResetModal;
window.closeResetModal = closeResetModal;
window.resetProgress   = resetProgress;

// ===== INIT =====
// buildStats() and buildSidebar() are called inside initAuth()
// after user data is loaded from Supabase.
initAuth();
