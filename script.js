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
const vehicleSelect = document.getElementById('vehicle-select');
const vehicleOutput = document.getElementById('vehicle-output');
const vehicleCardList = document.getElementById('vehicle-card-list');
const driverProfileForm = document.getElementById('driver-profile-form');
const driverNameInput = document.getElementById('driver-name');
const driverOutput = document.getElementById('driver-output');
const speedCheckForm = document.getElementById('speed-check-form');
const speedZone = document.getElementById('speed-zone');
const speedInput = document.getElementById('speed-input');
const speedOutput = document.getElementById('speed-output');
const missionOutput = document.getElementById('mission-output');
const newMissionButton = document.getElementById('new-mission-button');
const completeMissionButton = document.getElementById('complete-mission-button');
const achievementList = document.getElementById('achievement-list');
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
const VOLAN_LOOP_KEY = 'simhub_volan_loop';

const vehicleData = {
  'econell-next': {
    name: 'Econell 12 Next',
    type: 'Varosi szolobusz',
    speed: '68 km/h',
    gearbox: 'Automata',
    rarity: 'Ingyenes',
    comfort: 'Modern, csendes utaster',
    capacity: '92 fo',
    image: 'images/econell-next.png',
    route: '1-es jarat',
    xpBonus: 18
  },
  'econell-12': {
    name: 'Econell 12',
    type: 'Varosi szolobusz',
    speed: '64 km/h',
    gearbox: 'Automata',
    rarity: 'Ingyenes',
    comfort: 'Klasszikus alapjarmu',
    capacity: '87 fo',
    image: 'images/econell-12.png',
    route: '7A',
    xpBonus: 16
  },
  'volvo-regio': {
    name: 'Volvo Alfa Regio',
    type: 'Helykozi busz',
    speed: '82 km/h',
    gearbox: 'Automata',
    rarity: 'Ingyenes',
    comfort: 'Hosszabb tavokra is kenyelmes',
    capacity: '61 fo',
    image: 'images/econell-12.png',
    route: '22',
    xpBonus: 19
  },
  'credo-inovell': {
    name: 'Credo Inovell',
    type: 'Limited kulonlegesseg',
    speed: '74 km/h',
    gearbox: 'Automata',
    rarity: 'Limited',
    comfort: 'Ritka es presztizs jarmu',
    capacity: '78 fo',
    image: 'images/credo-inovell.png',
    route: '88 Limited Tour',
    xpBonus: 28
  },
  'ikarus-c80a': {
    name: 'Ikarus C80A',
    type: 'Retro kulonjarati busz',
    speed: '71 km/h',
    gearbox: 'Kezi valto hangulattal',
    rarity: 'Limited',
    comfort: 'Nosztalgikus, karakteres vezetes',
    capacity: '72 fo',
    image: 'images/ikarus-c80a.png',
    route: 'Nosztalgia kor',
    xpBonus: 26
  },
  'ssm-econell': {
    name: 'SSM Econell 12',
    type: 'Exkluziv kulonkiadas',
    speed: '77 km/h',
    gearbox: 'Automata',
    rarity: 'Admin',
    comfort: 'Nagyon ritka, kulonleges elmeny',
    capacity: '90 fo',
    image: 'images/econell-next.png',
    route: 'Tulajdonosi meeting jarat',
    xpBonus: 34
  }
};

const missionTemplates = [
  { text: 'Vidd le az 1-es jaratot keses nelkul.', reward: 45, km: 18 },
  { text: 'Szallits utasokat a 7A vonalon forgalmas idoszakban.', reward: 55, km: 24 },
  { text: 'Teljesits egy helykozi korutat es tartsd a menetrendet.', reward: 70, km: 42 },
  { text: 'Mutasd meg, hogy limited busszal is pontos vagy.', reward: 85, km: 36 }
];

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

function readLoopState() {
  return readJson(VOLAN_LOOP_KEY, {
    xp: 0,
    level: 1,
    roads: 0,
    totalKm: 0,
    totalStops: 0,
    playTime: 0,
    favoriteBus: '-',
    currentMissionIndex: 0,
    missionCompleted: false,
    achievements: []
  });
}

function writeLoopState(state) {
  writeJson(VOLAN_LOOP_KEY, state);
}

function getSelectedVehicleKey() {
  if (vehicleSelect?.value) return vehicleSelect.value;
  return 'econell-next';
}

function renderVehicleCards() {
  if (!vehicleCardList) return;

  vehicleCardList.innerHTML = Object.entries(vehicleData)
    .map(
      ([key, vehicle]) => `
        <article class="bus-card ${key === getSelectedVehicleKey() ? 'selected' : ''}" data-vehicle-key="${key}">
          <img src="${vehicle.image}" alt="${vehicle.name}" />
          <div class="bus-card-body">
            <div class="bus-card-top">
              <div>
                <h4>${vehicle.name}</h4>
                <p>${vehicle.type}</p>
              </div>
              <span class="rarity-badge rarity-${vehicle.rarity.toLowerCase()}">${vehicle.rarity}</span>
            </div>
            <ul class="bus-stat-list">
              <li>Gyorsasag: <strong>${vehicle.speed}</strong></li>
              <li>Kapacitas: <strong>${vehicle.capacity}</strong></li>
              <li>Valto: <strong>${vehicle.gearbox}</strong></li>
              <li>Javasolt utvonal: <strong>${vehicle.route}</strong></li>
            </ul>
          </div>
        </article>
      `
    )
    .join('');
}

function renderVehicleCard(vehicleKey) {
  if (!vehicleOutput) return;
  const vehicle = vehicleData[vehicleKey];

  if (!vehicle) {
    vehicleOutput.innerHTML = '<p class="empty-state">Még nincs kiválasztott busz.</p>';
    return;
  }

  vehicleOutput.innerHTML = `
    <div class="info-card">
      <p><strong>${vehicle.name}</strong></p>
      <p>Típus: ${vehicle.type}</p>
      <p>Sebesség: ${vehicle.speed}</p>
      <p>Kapacitás: ${vehicle.capacity}</p>
      <p>Váltó: ${vehicle.gearbox}</p>
      <p>Ritkaság: ${vehicle.rarity}</p>
      <p>Ajánlott útvonal: ${vehicle.route}</p>
      <p>Hangulat: ${vehicle.comfort}</p>
    </div>
  `;

  renderVehicleCards();
}

function buildDriverProfile(name) {
  const cleanName = name.trim();
  const letters = Array.from(cleanName);
  const score = letters.reduce((sum, letter) => sum + letter.charCodeAt(0), 0);
  const ranks = ['Ujonc sofor', 'Menetrend mestere', 'Helykozi profi', 'Volan veteran', 'Garazs legenda'];
  const favoriteLines = ['22A', '104', '7', '15B', '88', '310'];
  const rank = ranks[score % ranks.length];
  const loopState = readLoopState();
  const km = Math.max(1200 + (score % 7800), loopState.totalKm);
  const line = favoriteLines[score % favoriteLines.length];
  const punctuality = 82 + (score % 17);
  const level = Math.max(1, loopState.level);
  const xp = loopState.xp;
  const roads = loopState.roads;
  const stops = Math.max(8, loopState.totalStops);
  const time = Math.max(45, loopState.playTime);
  const favoriteBus = loopState.favoriteBus === '-' ? vehicleData[getSelectedVehicleKey()].name : loopState.favoriteBus;

  return {
    name: cleanName,
    rank,
    km: `${km} km`,
    line,
    punctuality: `${punctuality}%`,
    level,
    xp,
    roads,
    favoriteBus,
    time: `${time} perc`,
    stops
  };
}

function renderDriverProfile(name) {
  if (!driverOutput) return;
  const cleanName = name.trim();

  if (!cleanName) {
    driverOutput.innerHTML = '<p class="empty-state">Adj meg egy nevet a profil megjelenítéséhez.</p>';
    return;
  }

  const profile = buildDriverProfile(cleanName);
  driverOutput.innerHTML = `
    <div class="info-card">
      <p><strong>${profile.name}</strong></p>
      <p>Rang: ${profile.rank}</p>
      <p>Szint / XP: ${profile.level}. szint / ${profile.xp} XP</p>
      <p>Vezetett utak: ${profile.roads}</p>
      <p>Vezetett km: ${profile.km}</p>
      <p>Kedvenc busz: ${profile.favoriteBus}</p>
      <p>Kedvenc járat: ${profile.line}</p>
      <p>Idő / megállók: ${profile.time} / ${profile.stops} megálló</p>
      <p>Pontossági mutató: ${profile.punctuality}</p>
    </div>
  `;
}

function renderSpeedCheck() {
  if (!speedOutput) return;
  const limit = Number(speedZone?.value || 50);
  const currentSpeed = Number(speedInput?.value || 0);

  if (!speedInput?.value) {
    speedOutput.innerHTML = '<p class="empty-state">Még nincs ellenőrzött sebesség.</p>';
    return;
  }

  const isValid = currentSpeed <= limit;
  speedOutput.innerHTML = `
    <div class="info-card ${isValid ? 'speed-ok' : 'speed-bad'}">
      <p><strong>${currentSpeed} km/h</strong></p>
      <p>Megengedett sebesség: ${limit} km/h</p>
      <p>Állapot: ${isValid ? 'Szabályos' : 'Nem szabályos'}</p>
      <p>${isValid ? 'Mehet tovább a járat.' : 'Lassíts, különben bukod a pontos kört.'}</p>
    </div>
  `;
}

function updateAchievementView() {
  if (!achievementList) return;
  const state = readLoopState();
  achievementList.querySelectorAll('.achievement-item').forEach((item) => {
    const key = item.getAttribute('data-achievement');
    item.classList.toggle('unlocked', state.achievements.includes(key));
  });
}

function renderMission() {
  if (!missionOutput) return;
  const state = readLoopState();
  const mission = missionTemplates[state.currentMissionIndex] || missionTemplates[0];
  missionOutput.innerHTML = `
    <p><strong>Aktuális feladat:</strong> ${mission.text}</p>
    <p>Jutalom: ${mission.reward} XP</p>
    <p>Állapot: ${state.missionCompleted ? 'Teljesítve, kérj új küldetést.' : 'Folyamatban'}</p>
    <p>Fejlődés: ${state.level}. szint / ${state.xp} XP / ${state.totalKm} km</p>
  `;
  updateAchievementView();
}

function unlockAchievement(state, key) {
  if (!state.achievements.includes(key)) {
    state.achievements.push(key);
  }
}

function completeMission() {
  const state = readLoopState();
  const mission = missionTemplates[state.currentMissionIndex] || missionTemplates[0];
  const selectedVehicle = vehicleData[getSelectedVehicleKey()];
  const gainedXp = mission.reward + selectedVehicle.xpBonus;

  state.xp += gainedXp;
  state.roads += 1;
  state.totalKm += mission.km;
  state.totalStops += 6 + state.currentMissionIndex * 2;
  state.playTime += 20 + state.currentMissionIndex * 5;
  state.favoriteBus = selectedVehicle.name;
  state.level = Math.floor(state.xp / 120) + 1;
  state.missionCompleted = true;

  unlockAchievement(state, 'first-trip');
  if (state.totalKm >= 100) unlockAchievement(state, 'hundred-km');
  if (selectedVehicle.rarity === 'Limited') unlockAchievement(state, 'limited-bus');

  writeLoopState(state);
  renderMission();
  if (driverNameInput?.value.trim()) {
    renderDriverProfile(driverNameInput.value);
  }
}

function generateNextMission() {
  const state = readLoopState();
  state.currentMissionIndex = (state.currentMissionIndex + 1) % missionTemplates.length;
  state.missionCompleted = false;
  writeLoopState(state);
  renderMission();
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

if (vehicleSelect) {
  vehicleSelect.addEventListener('change', () => {
    renderVehicleCard(vehicleSelect.value);
  });
}

if (driverProfileForm) {
  driverProfileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    renderDriverProfile(driverNameInput?.value || '');
  });
}

if (vehicleCardList) {
  vehicleCardList.addEventListener('click', (event) => {
    const card = event.target.closest('.bus-card');
    const vehicleKey = card?.getAttribute('data-vehicle-key');
    if (!vehicleKey || !vehicleSelect) return;
    vehicleSelect.value = vehicleKey;
    renderVehicleCard(vehicleKey);
  });
}

if (speedCheckForm) {
  speedCheckForm.addEventListener('submit', (event) => {
    event.preventDefault();
    renderSpeedCheck();
  });
}

if (newMissionButton) {
  newMissionButton.addEventListener('click', () => {
    generateNextMission();
  });
}

if (completeMissionButton) {
  completeMissionButton.addEventListener('click', () => {
    completeMission();
  });
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
}

if (vehicleCardList) {
  renderVehicleCards();
}

if (vehicleOutput) {
  renderVehicleCard(getSelectedVehicleKey());
}

if (missionOutput) {
  renderMission();
}
