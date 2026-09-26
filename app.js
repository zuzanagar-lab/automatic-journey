// ---------- Pomocné funkcie na ukladanie dát (localStorage) ----------
const STORAGE_KEYS = {
  tracker: 'fibromotyl_tracker',
  journal: 'fibromotyl_journal',
  meds: 'fibromotyl_meds',
  labs: 'fibromotyl_labs',
  team: 'fibromotyl_team',
};

function loadData(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function todayISO() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function formatDate(iso) {
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ---------- Splash screen ----------
window.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  const app = document.getElementById('app');
  setTimeout(() => {
    splash.classList.add('fade-out');
    app.classList.remove('hidden');
    setTimeout(() => splash.remove(), 700);
  }, 1400);

  initNav();
  initTracker();
  initJournal();
  initMeds();
  initLabs();
  initTeam();
  renderDashboard();

  document.getElementById('todayDate').textContent = new Intl.DateTimeFormat('sk-SK', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  }).format(new Date());
});

// ---------- Navigácia ----------
function initNav() {
  const navItems = document.querySelectorAll('.nav-item');
  const views = document.querySelectorAll('.view');
  const sideNav = document.getElementById('sideNav');
  const menuToggle = document.getElementById('menuToggle');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const viewName = item.dataset.view;
      views.forEach(v => v.classList.remove('active'));
      document.getElementById('view-' + viewName).classList.add('active');
      sideNav.classList.remove('open');

      if (viewName === 'dashboard') renderDashboard();
    });
  });

  menuToggle.addEventListener('click', () => {
    sideNav.classList.toggle('open');
  });
}

// ---------- DENNÝ TRACKER ----------
function initTracker() {
  const form = document.getElementById('trackerForm');
  const dateInput = document.getElementById('trackerDate');
  dateInput.value = todayISO();

  ['pain', 'fatigue', 'sleep'].forEach(key => {
    const range = document.getElementById(key + 'Range');
    const label = document.getElementById(key + 'Value');
    range.addEventListener('input', () => { label.textContent = range.value; });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const entries = loadData(STORAGE_KEYS.tracker);
    entries.push({
      id: uid(),
      date: dateInput.value,
      pain: Number(document.getElementById('painRange').value),
      fatigue: Number(document.getElementById('fatigueRange').value),
      sleep: Number(document.getElementById('sleepRange').value),
      symptoms: document.getElementById('symptomsInput').value.trim(),
      note: document.getElementById('trackerNote').value.trim(),
    });
    entries.sort((a, b) => b.date.localeCompare(a.date));
    saveData(STORAGE_KEYS.tracker, entries);
    form.reset();
    dateInput.value = todayISO();
    document.getElementById('painValue').textContent = '5';
    document.getElementById('fatigueValue').textContent = '5';
    document.getElementById('sleepValue').textContent = '5';
    document.getElementById('painRange').value = 5;
    document.getElementById('fatigueRange').value = 5;
    document.getElementById('sleepRange').value = 5;
    renderTrackerHistory();
  });

  renderTrackerHistory();
}

function renderTrackerHistory() {
  const list = document.getElementById('trackerHistory');
  const entries = loadData(STORAGE_KEYS.tracker);
  if (entries.length === 0) {
    list.innerHTML = '<p class="empty-note">Zatiaľ žiadne záznamy.</p>';
    return;
  }
  list.innerHTML = entries.map(e => `
    <div class="entry">
      <div class="entry-main">
        <div class="entry-date">${formatDate(e.date)}</div>
        <div class="entry-meta">Bolesť: ${e.pain}/10 · Únava: ${e.fatigue}/10 · Spánok: ${e.sleep}/10</div>
        ${e.symptoms ? `<div class="entry-body">Symptómy: ${escapeHtml(e.symptoms)}</div>` : ''}
        ${e.note ? `<div class="entry-body">${escapeHtml(e.note)}</div>` : ''}
      </div>
      <button class="btn-danger" onclick="deleteEntry('${STORAGE_KEYS.tracker}', '${e.id}', renderTrackerHistory)">Zmazať</button>
    </div>
  `).join('');
}

// ---------- DENNÍK ----------
function initJournal() {
  const form = document.getElementById('journalForm');
  const dateInput = document.getElementById('journalDate');
  dateInput.value = todayISO();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const entries = loadData(STORAGE_KEYS.journal);
    entries.push({
      id: uid(),
      date: dateInput.value,
      text: document.getElementById('journalText').value.trim(),
    });
    entries.sort((a, b) => b.date.localeCompare(a.date));
    saveData(STORAGE_KEYS.journal, entries);
    form.reset();
    dateInput.value = todayISO();
    renderJournal();
  });

  renderJournal();
}

function renderJournal() {
  const list = document.getElementById('journalList');
  const entries = loadData(STORAGE_KEYS.journal);
  if (entries.length === 0) {
    list.innerHTML = '<p class="empty-note">Zatiaľ žiadne zápisy.</p>';
    return;
  }
  list.innerHTML = entries.map(e => `
    <div class="entry">
      <div class="entry-main">
        <div class="entry-date">${formatDate(e.date)}</div>
        <div class="entry-body">${escapeHtml(e.text)}</div>
      </div>
      <button class="btn-danger" onclick="deleteEntry('${STORAGE_KEYS.journal}', '${e.id}', renderJournal)">Zmazať</button>
    </div>
  `).join('');
}

// ---------- LIEKY ----------
function initMeds() {
  const form = document.getElementById('medsForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const entries = loadData(STORAGE_KEYS.meds);
    entries.push({
      id: uid(),
      name: document.getElementById('medName').value.trim(),
      dosage: document.getElementById('medDosage').value.trim(),
      time: document.getElementById('medTime').value.trim(),
      note: document.getElementById('medNote').value.trim(),
    });
    saveData(STORAGE_KEYS.meds, entries);
    form.reset();
    renderMeds();
  });
  renderMeds();
}

function renderMeds() {
  const list = document.getElementById('medsList');
  const entries = loadData(STORAGE_KEYS.meds);
  if (entries.length === 0) {
    list.innerHTML = '<p class="empty-note">Zatiaľ žiadne lieky.</p>';
    return;
  }
  list.innerHTML = entries.map(e => `
    <div class="entry">
      <div class="entry-main">
        <div class="entry-date">${escapeHtml(e.name)}</div>
        <div class="entry-meta">${escapeHtml(e.dosage)}${e.time ? ' · ' + escapeHtml(e.time) : ''}</div>
        ${e.note ? `<div class="entry-body">${escapeHtml(e.note)}</div>` : ''}
      </div>
      <button class="btn-danger" onclick="deleteEntry('${STORAGE_KEYS.meds}', '${e.id}', renderMeds)">Zmazať</button>
    </div>
  `).join('');
}

// ---------- VYŠETRENIA ----------
function initLabs() {
  const form = document.getElementById('labsForm');
  const dateInput = document.getElementById('labDate');
  dateInput.value = todayISO();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const entries = loadData(STORAGE_KEYS.labs);
    entries.push({
      id: uid(),
      date: dateInput.value,
      type: document.getElementById('labType').value.trim(),
      note: document.getElementById('labNote').value.trim(),
    });
    entries.sort((a, b) => b.date.localeCompare(a.date));
    saveData(STORAGE_KEYS.labs, entries);
    form.reset();
    dateInput.value = todayISO();
    renderLabs();
  });

  renderLabs();
}

function renderLabs() {
  const list = document.getElementById('labsList');
  const entries = loadData(STORAGE_KEYS.labs);
  if (entries.length === 0) {
    list.innerHTML = '<p class="empty-note">Zatiaľ žiadne vyšetrenia.</p>';
    return;
  }
  list.innerHTML = entries.map(e => `
    <div class="entry">
      <div class="entry-main">
        <div class="entry-date">${formatDate(e.date)} — ${escapeHtml(e.type)}</div>
        ${e.note ? `<div class="entry-body">${escapeHtml(e.note)}</div>` : ''}
      </div>
      <button class="btn-danger" onclick="deleteEntry('${STORAGE_KEYS.labs}', '${e.id}', renderLabs)">Zmazať</button>
    </div>
  `).join('');
}

// ---------- LEKÁRSKY TÍM ----------
function initTeam() {
  const form = document.getElementById('teamForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const entries = loadData(STORAGE_KEYS.team);
    entries.push({
      id: uid(),
      name: document.getElementById('teamName').value.trim(),
      role: document.getElementById('teamRole').value.trim(),
      phone: document.getElementById('teamPhone').value.trim(),
      note: document.getElementById('teamNote').value.trim(),
    });
    saveData(STORAGE_KEYS.team, entries);
    form.reset();
    renderTeam();
  });
  renderTeam();
}

function renderTeam() {
  const list = document.getElementById('teamList');
  const entries = loadData(STORAGE_KEYS.team);
  if (entries.length === 0) {
    list.innerHTML = '<p class="empty-note">Zatiaľ žiadne kontakty.</p>';
    return;
  }
  list.innerHTML = entries.map(e => `
    <div class="entry">
      <div class="entry-main">
        <div class="entry-date">${escapeHtml(e.name)}</div>
        <div class="entry-meta">${escapeHtml(e.role)}${e.phone ? ' · ' + escapeHtml(e.phone) : ''}</div>
        ${e.note ? `<div class="entry-body">${escapeHtml(e.note)}</div>` : ''}
      </div>
      <button class="btn-danger" onclick="deleteEntry('${STORAGE_KEYS.team}', '${e.id}', renderTeam)">Zmazať</button>
    </div>
  `).join('');
}

// ---------- SPOLOČNÉ: mazanie záznamu ----------
function deleteEntry(storageKey, id, rerenderFn) {
  const entries = loadData(storageKey).filter(e => e.id !== id);
  saveData(storageKey, entries);
  rerenderFn();
  if (storageKey === STORAGE_KEYS.tracker) renderDashboard();
}

// ---------- DASHBOARD ----------
function renderDashboard() {
  const trackerEntries = loadData(STORAGE_KEYS.tracker).slice().sort((a, b) => a.date.localeCompare(b.date));
  const medsCount = loadData(STORAGE_KEYS.meds).length;
  const teamCount = loadData(STORAGE_KEYS.team).length;

  const last7 = trackerEntries.slice(-7);
  const avg = (arr, key) => arr.length ? (arr.reduce((s, e) => s + e[key], 0) / arr.length).toFixed(1) : '—';

  const cards = document.getElementById('dashboardCards');
  cards.innerHTML = `
    <div class="stat-card">
      <div class="stat-label">Priemerná bolesť (7 dní)</div>
      <div class="stat-value">${avg(last7, 'pain')}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Priemerná únava (7 dní)</div>
      <div class="stat-value">${avg(last7, 'fatigue')}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Priemerný spánok (7 dní)</div>
      <div class="stat-value">${avg(last7, 'sleep')}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Lieky v evidencii</div>
      <div class="stat-value">${medsCount}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Kontakty na lekárov</div>
      <div class="stat-value">${teamCount}</div>
    </div>
  `;

  drawTrendChart(last7);
}

function drawTrendChart(entries) {
  const canvas = document.getElementById('trendChart');
  const emptyNote = document.getElementById('trendEmptyNote');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (entries.length === 0) {
    emptyNote.style.display = 'block';
    canvas.style.display = 'none';
    return;
  }
  emptyNote.style.display = 'none';
  canvas.style.display = 'block';

  const padding = 36;
  const w = canvas.width - padding * 2;
  const h = canvas.height - padding * 2;
  const maxVal = 10;
  const stepX = entries.length > 1 ? w / (entries.length - 1) : 0;

  // Axes
  ctx.strokeStyle = '#ddcdeb';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, padding + h);
  ctx.lineTo(padding + w, padding + h);
  ctx.stroke();

  const series = [
    { key: 'pain', color: '#c0446a', label: 'Bolesť' },
    { key: 'fatigue', color: '#a06cd5', label: 'Únava' },
    { key: 'sleep', color: '#4a1d73', label: 'Spánok' },
  ];

  series.forEach(s => {
    ctx.strokeStyle = s.color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    entries.forEach((e, i) => {
      const x = padding + i * stepX;
      const y = padding + h - (e[s.key] / maxVal) * h;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();

    entries.forEach((e, i) => {
      const x = padding + i * stepX;
      const y = padding + h - (e[s.key] / maxVal) * h;
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fill();
    });
  });

  // X labels (dates)
  ctx.fillStyle = '#6b5b7a';
  ctx.font = '11px sans-serif';
  ctx.textAlign = 'center';
  entries.forEach((e, i) => {
    const x = padding + i * stepX;
    ctx.fillText(formatDate(e.date).slice(0, 5), x, padding + h + 18);
  });

  // Legend
  let legendX = padding;
  const legendY = 14;
  ctx.textAlign = 'left';
  series.forEach(s => {
    ctx.fillStyle = s.color;
    ctx.fillRect(legendX, legendY - 8, 10, 10);
    ctx.fillStyle = '#2e1a3e';
    ctx.fillText(s.label, legendX + 14, legendY);
    legendX += ctx.measureText(s.label).width + 40;
  });
}

// ---------- Pomocná funkcia na bezpečné zobrazenie textu ----------
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
