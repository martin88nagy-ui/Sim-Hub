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

const gameSelect = document.getElementById('gameSelect');
const qualitySelect = document.getElementById('qualitySelect');
const applyBtn = document.getElementById('applyBtn');
const statusBox = document.getElementById('statusBox');
const trafficSelect = document.getElementById('trafficSelect');
const mirrorSelect = document.getElementById('mirrorSelect');

function getLabel(selectElement) {
  return selectElement.options[selectElement.selectedIndex].text;
}

if (applyBtn && qualitySelect && statusBox) {
  applyBtn.addEventListener('click', () => {
    const quality = getLabel(qualitySelect);
    const game = document.body.classList.contains('theme-ets2')
      ? 'ETS2'
      : document.body.classList.contains('theme-ats')
        ? 'ATS'
        : gameSelect
          ? getLabel(gameSelect)
          : 'Játék';

    if (trafficSelect) {
      statusBox.textContent = `Aktuális állapot: ${game} + ${quality} + ${getLabel(trafficSelect)} forgalom.`;
      return;
    }

    if (mirrorSelect) {
      statusBox.textContent = `Aktuális állapot: ${game} + ${quality} + ${getLabel(mirrorSelect)} tükörminőség.`;
      return;
    }

    statusBox.textContent = `Aktuális állapot: ${game} + ${quality} profil.`;
  });
}
