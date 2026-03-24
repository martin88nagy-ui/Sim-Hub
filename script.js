const dropdown = document.querySelector('.dropdown');
const toggle = document.querySelector('.dropdown-toggle');

if (dropdown && toggle) {
  toggle.addEventListener('click', () => {
    const isOpen = dropdown.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const gameSelect = document.getElementById('gameSelect');
const qualitySelect = document.getElementById('qualitySelect');
const applyBtn = document.getElementById('applyBtn');
const statusBox = document.getElementById('statusBox');

function getLabel(selectElement) {
  return selectElement.options[selectElement.selectedIndex].text;
}

if (applyBtn && gameSelect && qualitySelect && statusBox) {
  applyBtn.addEventListener('click', () => {
    const game = getLabel(gameSelect);
    const quality = getLabel(qualitySelect);
    statusBox.textContent = `Aktuális állapot: ${game} + ${quality} profil.`;
  });
}
