// Navigation / paging
let currentPage = 1;

const pages = Array.from(document.querySelectorAll('.page'));
const totalPages = pages.length;

function getTotalPages() {
  return document.querySelectorAll('.page').length || 1;
}

function showPage(n) {
  const total = getTotalPages();
  if (n < 1 || n > total) return;

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(`page${n}`);
  if (target) target.classList.add('active');

  currentPage = n;
  updateNavigation();
}

function updateNavigation() {
  const total = getTotalPages();
  document.getElementById('currentPage').textContent = currentPage;
  document.getElementById('totalPages').textContent = total;
  document.getElementById('prevBtn').disabled = currentPage === 1;
  document.getElementById('nextBtn').disabled = currentPage === total;
  // Update hash for deep-linking
  history.replaceState(null, '', `#page=${currentPage}`);
}

function changePage(delta) {
  showPage(currentPage + delta);
}

function initFromHash() {
  const match = location.hash.match(/page=(\d+)/i);
  const n = match ? parseInt(match[1], 10) : 1;
  showPage(Number.isFinite(n) ? n : 1);
}

function attachHandlers() {
  document.getElementById('prevBtn').addEventListener('click', () => changePage(-1));
  document.getElementById('nextBtn').addEventListener('click', () => changePage(1));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') changePage(-1);
    if (e.key === 'ArrowRight') changePage(1);
  });

  // React to manual hash changes (e.g., user edits address bar)
  window.addEventListener('hashchange', initFromHash);
}

// Boot
attachHandlers();
initFromHash();


function startPresentation() {
  // Hide splash page
  document.getElementById('splash').style.display = 'none';

  // Show first page + navigation
  showPage(1);
  document.querySelector('.navigation').style.display = 'flex';
}
