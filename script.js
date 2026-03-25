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
const searchableBlocks = Array.from(
  document.querySelectorAll('.hero-content, .panel, .game-card')
);

function clearSearchHighlights() {
  searchableBlocks.forEach((block) => block.classList.remove('search-hit'));
}

function runSearch() {
  if (!searchInput) return;

  const query = searchInput.value.trim().toLowerCase();
  clearSearchHighlights();

  if (!query) return;

  const match = searchableBlocks.find((block) =>
    block.textContent.toLowerCase().includes(query)
  );

  if (!match) return;

  match.classList.add('search-hit');
  match.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
}
