/* =========================================================
   NAVEGACIÓN Y TEMA
   ========================================================= */

const $main = document.getElementById('mainContent');
const $themeBtn = document.getElementById('themeToggle');
const $sidebarToggle = document.getElementById('sidebarToggle');
const $sidebar = document.getElementById('sidebar-wrapper');

/* --- Cargar página al hacer clic en menú --- */
document.addEventListener('click', function (e) {
  const link = e.target.closest('[data-page]');
  if (!link) return;

  e.preventDefault();
  const page = link.getAttribute('data-page');
  loadPage(page);
});

/* --- Función para cargar contenido dinámico --- */
function loadPage(page) {
  $main.innerHTML = '<div class="text-center mt-5"><div class="spinner-border" role="status"></div></div>';
  fetch(page)
    .then(res => {
      if (!res.ok) throw new Error('No se pudo cargar la página');
      return res.text();
    })
    .then(html => {
      $main.innerHTML = html;

      // Re-ejecutar scripts internos si los hay
      const scripts = $main.querySelectorAll('script');
      scripts.forEach(old => {
        const nuevo = document.createElement('script');
        [...old.attributes].forEach(attr => nuevo.setAttribute(attr.name, attr.value));
        nuevo.appendChild(document.createTextNode(old.innerHTML));
        old.parentNode.replaceChild(nuevo, old);
      });
    })
    .catch(err => {
      $main.innerHTML = `<div class="alert alert-danger mt-3">${err.message}</div>`;
    });
}

/* --- Tema claro/oscuro --- */
const stored = localStorage.getItem('theme');
let currentTheme = stored || 'light';
applyTheme(currentTheme);

$themeBtn.addEventListener('click', () => {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(currentTheme);
});

function applyTheme(theme) {
  document.documentElement.setAttribute('data-bs-theme', theme);
  $themeBtn.innerHTML = theme === 'light'
    ? '<i class="bi bi-moon"></i>'
    : '<i class="bi bi-sun"></i>';
  localStorage.setItem('theme', theme);
}

/* --- Toggle del sidebar (móvil) --- */
$sidebarToggle.addEventListener('click', () => {
  $sidebar.classList.toggle('d-none');
});

/* --- Cargar página inicial --- */
loadPage('inicial.html');