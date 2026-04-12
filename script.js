const dropdowns = Array.from(document.querySelectorAll('.dropdown'));

dropdowns.forEach((dropdown) => {
  const toggle = dropdown.querySelector('.dropdown-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const willOpen = !dropdown.classList.contains('open');

    dropdowns.forEach((item) => {
      item.classList.remove('open');
      const itemToggle = item.querySelector('.dropdown-toggle');
      if (itemToggle) itemToggle.setAttribute('aria-expanded', 'false');
    });

    if (willOpen) {
      dropdown.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });
});

document.addEventListener('click', (event) => {
  dropdowns.forEach((dropdown) => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('open');
      const toggle = dropdown.querySelector('.dropdown-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  });
});

const searchForm = document.querySelector('.nav-search');
const searchInput = document.getElementById('site-search');
const searchToggle = document.querySelector('.search-toggle');
const searchCancel = document.querySelector('.search-cancel');
const topbar = document.querySelector('.topbar');
const searchableBlocks = Array.from(
  document.querySelectorAll('.hero-content, .panel, .game-card')
);

function closeSearch() {
  if (!topbar || !searchToggle || !searchInput) return;
  topbar.classList.remove('search-open');
  searchToggle.setAttribute('aria-expanded', 'false');
  searchInput.value = '';
  searchInput.placeholder = 'Keresés...';
  clearSearchHighlights();
}

const searchRoutes = [
  { keywords: ['omsi', 'bus', 'bus simulator'], target: 'omsi.html#bemutato' },
  { keywords: ['volan', 'volán', 'gyenge gep', 'gyenge gép', 'roblox'], target: 'volan.html#bemutato' },
  { keywords: ['ets2', 'euro truck'], target: 'ets2.html#bemutato' },
  { keywords: ['ats', 'american truck'], target: 'ats.html#bemutato' },
  { keywords: ['pcbs2', 'pc builder', 'pc builder simulator'], target: 'pcbs2.html#bemutato' },
  { keywords: ['kapcsolat', 'email', 'discord'], target: 'kapcsolat.html' },
  { keywords: ['rolunk', 'rólunk'], target: '#rolunk' },
  { keywords: ['tartalmak', 'stream', 'mod', 'jatekmenet', 'játékmenet'], target: '#tartalmak' },
  { keywords: ['jatekok', 'játékok'], target: '#jatekok' },
  { keywords: ['adatvedelem', 'adatvédelem'], target: 'adatvedelem.html' },
  { keywords: ['felhasznalasi feltetelek', 'felhasználási feltételek'], target: 'felhasznalasi-feltetelek.html' },
  { keywords: ['impresszum'], target: 'impresszum.html' }
];

function clearSearchHighlights() {
  searchableBlocks.forEach((block) => block.classList.remove('search-hit'));
}

function runSearch() {
  if (!searchInput) return;

  const query = searchInput.value.trim().toLowerCase();
  clearSearchHighlights();

  if (!query) return;

  const route = searchRoutes.find((item) =>
    item.keywords.some((keyword) => query.includes(keyword))
  );

  if (route) {
    closeSearch();
    window.location.href = route.target;
    return;
  }

  const match = searchableBlocks.find((block) =>
    block.textContent.toLowerCase().includes(query)
  );

  if (!match) {
    searchInput.value = '';
    searchInput.placeholder = 'Nincs találat';
    window.setTimeout(() => {
      searchInput.placeholder = 'Keresés...';
    }, 1400);
    return;
  }

  match.classList.add('search-hit');
  match.scrollIntoView({ behavior: 'smooth', block: 'center' });
  closeSearch();
}

if (searchToggle && topbar && searchInput) {
  searchToggle.addEventListener('click', () => {
    const isOpen = topbar.classList.toggle('search-open');
    searchToggle.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      searchInput.focus();
    }
  });
}

if (searchCancel) {
  searchCancel.addEventListener('click', () => {
    closeSearch();
  });
}

if (searchForm && searchInput) {
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    runSearch();
  });

  searchInput.addEventListener('input', () => {
    if (!searchInput.value.trim()) {
      clearSearchHighlights();
    }
  });

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && topbar && searchToggle) {
      closeSearch();
    }
  });
}
