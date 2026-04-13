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
  { keywords: ['fuvarnaplo','fuvar', 'napló' 'fuvarnapló'], target: 'volan.html#fuvarnaplo
  
  
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

const tripLogForm = document.getElementById('trip-log-save-form');
const tripList = document.getElementById('trip-list');
const tripMessage = document.getElementById('trip-save-message');
const tripStart = document.getElementById('trip-start');
const tripEnd = document.getElementById('trip-end');
const tripBus = document.getElementById('trip-bus');
const tripDuration = document.getElementById('trip-duration');
const tripDate = document.getElementById('trip-date');
const tripRating = document.getElementById('trip-rating');
const statCount = document.getElementById('stat-count');
const statDuration = document.getElementById('stat-duration');
const statBus = document.getElementById('stat-bus');
const statLastDate = document.getElementById('stat-last-date');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const authStatus = document.getElementById('auth-status');
const authAvatar = document.getElementById('auth-avatar');
const logoutButton = document.getElementById('logout-button');
const registerPageForm = document.getElementById('register-page-form');
const loginPageForm = document.getElementById('login-page-form');

const VOLAN_USERS_KEY = 'simhub_volan_users';
const VOLAN_CURRENT_USER_KEY = 'simhub_volan_current_user';
const VOLAN_TRIPS_KEY = 'simhub_volan_trips';

function readJson(key, fallback) {
  try {
    return JSON.parse(window.localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function getCurrentUser() {
  return window.localStorage.getItem(VOLAN_CURRENT_USER_KEY) || '';
}

function setCurrentUser(username) {
  if (username) {
    window.localStorage.setItem(VOLAN_CURRENT_USER_KEY, username);
  } else {
    window.localStorage.removeItem(VOLAN_CURRENT_USER_KEY);
  }
  updateAuthStatus();
}

function updateAuthStatus() {
  if (!authStatus) return;
  const currentUser = getCurrentUser();
  authStatus.textContent = currentUser
    ? `Bejelentkezve: ${currentUser}`
    : 'Jelenleg nincs bejelentkezett profil.';
  if (authAvatar) {
    authAvatar.textContent = currentUser ? currentUser.charAt(0).toUpperCase() : '-';
  }
}

function parseMinutes(durationText) {
  const match = durationText.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function renderTrips() {
  if (!tripList) return;
  const trips = readJson(VOLAN_TRIPS_KEY, []);
  const currentUser = getCurrentUser();
  const visibleTrips = currentUser ? trips.filter((trip) => trip.user === currentUser) : [];

  if (!visibleTrips.length) {
    tripList.innerHTML = currentUser
      ? '<p class="empty-state">Még nincs saját mentett fuvar.</p>'
      : '<p class="empty-state">A fuvarok megjelenítéséhez jelentkezz be.</p>';
    if (statCount) statCount.textContent = '0';
    if (statDuration) statDuration.textContent = '0 perc';
    if (statBus) statBus.textContent = '-';
    if (statLastDate) statLastDate.textContent = '-';
    return;
  }

  tripList.innerHTML = visibleTrips
    .slice()
    .reverse()
    .map(
      (trip) => `
        <article class="trip-entry">
          <p><strong>${trip.bus}</strong></p>
          <p>📍 ${trip.start} → ${trip.end}</p>
          <p>⏱️ ${trip.duration}</p>
          <p>📅 ${trip.date}</p>
          <p>${trip.rating}</p>
          <p class="trip-meta">Mentette: ${trip.user}</p>
          <button type="button" class="search-button trip-delete" data-trip-id="${trip.id}">Törlés</button>
        </article>
      `
    )
    .join('');

  const totalMinutes = visibleTrips.reduce((sum, trip) => sum + parseMinutes(trip.duration), 0);
  const busCounts = visibleTrips.reduce((map, trip) => {
    map[trip.bus] = (map[trip.bus] || 0) + 1;
    return map;
  }, {});
  const mostUsedBus = Object.entries(busCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';
  const lastTrip = visibleTrips[visibleTrips.length - 1];

  if (statCount) statCount.textContent = String(visibleTrips.length);
  if (statDuration) statDuration.textContent = `${totalMinutes} perc`;
  if (statBus) statBus.textContent = mostUsedBus;
  if (statLastDate) statLastDate.textContent = lastTrip?.date || '-';
}

if (registerForm) {
  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('register-username')?.value.trim();
    const password = document.getElementById('register-password')?.value.trim();
    const users = readJson(VOLAN_USERS_KEY, []);

    if (!username || !password) {
      if (authStatus) authStatus.textContent = 'A regisztrációhoz tölts ki mindkét mezőt.';
      return;
    }

    if (users.some((user) => user.username === username)) {
      if (authStatus) authStatus.textContent = 'Ez a felhasználónév már foglalt.';
      return;
    }

    users.push({ username, password });
    writeJson(VOLAN_USERS_KEY, users);
    setCurrentUser(username);
    if (authStatus) authStatus.textContent = `Sikeres regisztráció: ${username}`;
    registerForm.reset();
  });
}

if (registerPageForm) {
  registerPageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('register-username')?.value.trim();
    const password = document.getElementById('register-password')?.value.trim();
    const users = readJson(VOLAN_USERS_KEY, []);

    if (!username || !password) {
      if (authStatus) authStatus.textContent = 'A regisztrációhoz tölts ki mindkét mezőt.';
      return;
    }

    if (users.some((user) => user.username === username)) {
      if (authStatus) authStatus.textContent = 'Ez a felhasználónév már foglalt.';
      return;
    }

    users.push({ username, password });
    writeJson(VOLAN_USERS_KEY, users);
    setCurrentUser(username);
    if (authStatus) authStatus.textContent = `Sikeres regisztráció: ${username}`;
    registerPageForm.reset();
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('login-username')?.value.trim();
    const password = document.getElementById('login-password')?.value.trim();
    const users = readJson(VOLAN_USERS_KEY, []);
    const matchedUser = users.find((user) => user.username === username && user.password === password);

    if (!matchedUser) {
      if (authStatus) authStatus.textContent = 'Hibás felhasználónév vagy jelszó.';
      return;
    }

    setCurrentUser(matchedUser.username);
    if (authStatus) authStatus.textContent = `Sikeres bejelentkezés: ${matchedUser.username}`;
    loginForm.reset();
  });
}

if (loginPageForm) {
  loginPageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('login-username')?.value.trim();
    const password = document.getElementById('login-password')?.value.trim();
    const users = readJson(VOLAN_USERS_KEY, []);
    const matchedUser = users.find((user) => user.username === username && user.password === password);

    if (!matchedUser) {
      if (authStatus) authStatus.textContent = 'Hibás felhasználónév vagy jelszó.';
      return;
    }

    setCurrentUser(matchedUser.username);
    if (authStatus) authStatus.textContent = `Sikeres bejelentkezés: ${matchedUser.username}`;
    loginPageForm.reset();
  });
}

if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    setCurrentUser('');
    if (authStatus) authStatus.textContent = 'Sikeres kilépés.';
  });
}

if (tripLogForm && tripList) {
  tripLogForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const currentUser = getCurrentUser();
    if (!currentUser) {
      if (tripMessage) tripMessage.textContent = 'A fuvar mentéséhez előbb jelentkezz be.';
      return;
    }

    const trip = {
      id: Date.now(),
      start: tripStart?.value.trim() || '',
      end: tripEnd?.value.trim() || '',
      bus: tripBus?.value.trim() || '',
      duration: tripDuration?.value.trim() || '',
      date: tripDate?.value.trim() || '',
      rating: tripRating?.value.trim() || '',
      user: currentUser
    };

    if (!trip.start || !trip.end || !trip.bus || !trip.duration || !trip.date) {
      if (tripMessage) tripMessage.textContent = 'Tölts ki minden fontos mezőt a fuvar mentéséhez.';
      return;
    }

    const trips = readJson(VOLAN_TRIPS_KEY, []);
    trips.push(trip);
    writeJson(VOLAN_TRIPS_KEY, trips);
    renderTrips();
    if (tripMessage) tripMessage.textContent = 'A fuvar elmentve és megjelenítve.';
    tripLogForm.reset();
  });

  renderTrips();
}

if (tripList) {
  tripList.addEventListener('click', (event) => {
    const button = event.target.closest('.trip-delete');
    if (!button) return;
    const tripId = Number(button.getAttribute('data-trip-id'));
    const trips = readJson(VOLAN_TRIPS_KEY, []).filter((trip) => trip.id !== tripId);
    writeJson(VOLAN_TRIPS_KEY, trips);
    renderTrips();
    if (tripMessage) tripMessage.textContent = 'A fuvar törölve lett.';
  });
}

if (authStatus) {
  updateAuthStatus();
}let buses = [
  { id: 1, name: "Ikarus C80A" },
  { id: 2, name: "Volvo Alfa Regio" },
  { id: 3, name: "Credo Inovell" }
 { id: 4, name: "Credo Econell 12 (sárga)" }
 { id: 3, name: "Credo Econell 12 (fehér)" }
 { id: 3, name: "Credo Econell 12 Next" }

];

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// 🚍 buszok kirajzolása
function renderBuses() {
  const busList = document.getElementById("busList");
  busList.innerHTML = "";

  buses.forEach(bus => {
    const isFav = favorites.includes(bus.id);

    busList.innerHTML += `
      <div>
        🚌 ${bus.name}
        <button onclick="toggleFav(${bus.id})">
          ${isFav ? "💔 Levétel" : "❤️ Kedvenc"}
        </button>
      </div>
    `;
  });
}

// ❤️ kedvenc hozzáadás / törlés
function toggleFav(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderBuses();
  renderFavs();
}

// ❤️ kedvencek lista
function renderFavs() {
  const favList = document.getElementById("favList");
  favList.innerHTML = "";

  const favBuses = buses.filter(b => favorites.includes(b.id));

  favBuses.forEach(bus => {
    favList.innerHTML += `<div>❤️ ${bus.name}</div>`;
  });

  if (favBuses.length === 0) {
    favList.innerHTML = "<p>Nincs kedvenc busz 😢</p>";
  }
}

renderBuses();
renderFavs();
