/* ===================================
   善種 SeedGood — Main JavaScript
   Enhanced Edition — All Features
   =================================== */

// ===== Scroll Progress Bar =====
const progressBar = document.getElementById('scroll-progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progressBar.style.width = (scrollTop / scrollHeight * 100) + '%';
  }, { passive: true });
}

// ===== Navigation =====
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  nav && nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    const isOpen = mobileMenu.classList.contains('open');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = isOpen ? '0' : '';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) mobileMenu.classList.remove('open');
  });
}

// ===== Active Page Highlight =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href && href.startsWith(currentPage)) link.classList.add('active');
});

// ===== Counter Animation =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.hero-stats, .big-metrics-grid').forEach(el => counterObserver.observe(el));
document.querySelectorAll('.big-metric-num[data-target]').forEach(el => {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) animateCounter(el); });
  }, { threshold: 0.5 }).observe(el);
});

// ===== Scroll Reveal =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.event-card, .testimonial-card, .trust-card, .story-card, .team-card, .cat-impact-card, .big-metric').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
  revealObserver.observe(el);
});

// ===== Live Search =====
const searchData = [
  { title: '氣候變遷與我們：每個人都能做的環境行動', meta: '7月12日 · 台北市文化中心', icon: '🎤', url: 'event-detail.html' },
  { title: '非暴力溝通工作坊：用對話解決衝突', meta: '7月19日 · 線上 Zoom', icon: '🛠️', url: 'event-detail.html' },
  { title: '城市農耕體驗：帶孩子認識食物的旅程', meta: '7月26日 · 大安森林公園', icon: '🌱', url: 'event-detail.html' },
  { title: '數位公民素養講座：辨識假訊息的工具', meta: '8月2日 · 台中市圖書館', icon: '📚', url: 'event-detail.html' },
  { title: '河川守護行動：淡水河流域生態復育', meta: '8月9日 · 淡水河岸', icon: '🤝', url: 'event-detail.html' },
  { title: '設計思考工作坊：用設計解決社會問題', meta: '8月16日 · 線上', icon: '💡', url: 'event-detail.html' },
];

function renderSearchResults(query, boxId) {
  const resultsBox = document.getElementById(boxId);
  if (!resultsBox) return;
  const filtered = query
    ? searchData.filter(e => e.title.includes(query) || e.meta.includes(query))
    : searchData;
  if (!filtered.length) {
    resultsBox.innerHTML = `
      <div class="search-no-result">
        <div class="search-empty-icon">🔍</div>
        <p>找不到「${query}」相關活動</p>
        <p style="font-size:.8rem;margin-top:.4rem;color:var(--text-muted)">試試其他關鍵字，或<a href="events.html" style="color:var(--teal)">瀏覽所有活動</a></p>
      </div>`;
    return;
  }
  resultsBox.innerHTML = filtered.map(e => `
    <a class="search-result-item" href="${e.url}">
      <div class="search-result-dot">${e.icon}</div>
      <div>
        <div class="search-result-title">${e.title}</div>
        <div class="search-result-meta">${e.meta}</div>
      </div>
    </a>
  `).join('');
}

function initSearch(inputId, overlayId, resultsBoxId) {
  const input = document.getElementById(inputId);
  const overlay = document.getElementById(overlayId);
  const closeBtn = document.getElementById('searchClose');
  if (!input || !overlay) return;
  input.addEventListener('input', () => {
    const q = input.value.trim();
    if (q.length > 0) { overlay.classList.add('active'); renderSearchResults(q, resultsBoxId); }
    else overlay.classList.remove('active');
  });
  input.addEventListener('focus', () => { if (input.value.trim()) overlay.classList.add('active'); });
  if (closeBtn) closeBtn.addEventListener('click', () => { overlay.classList.remove('active'); input.value = ''; });
  overlay.addEventListener('click', (e) => { if (e.target === overlay) { overlay.classList.remove('active'); input.value = ''; } });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { overlay.classList.remove('active'); input.value = ''; } });
}

initSearch('heroSearch', 'searchOverlay', 'searchResultsBox');
initSearch('eventsSearch', 'searchOverlay', 'searchResultsBox');

// ===== Events Filter Tabs (with actual filtering) =====
const filterTabs = document.querySelectorAll('.filter-tab');
const eventCards = document.querySelectorAll('#eventsContainer .event-card');
const resultsCountEl = document.getElementById('resultsCount');

function updateResultsCount() {
  const visible = document.querySelectorAll('#eventsContainer .event-card:not([style*="display: none"])').length;
  if (resultsCountEl) resultsCountEl.textContent = `顯示 ${visible} 個活動`;
}

filterTabs.forEach(tab => {
  tab.addEventListener('click', function() {
    filterTabs.forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    const filter = this.dataset.filter;
    eventCards.forEach(card => {
      const show = filter === 'all' || card.dataset.type === filter;
      card.style.display = show ? '' : 'none';
    });
    updateResultsCount();
    applyCityDateFilter();
  });
});

// ===== City / Date / Mode Filter =====
function applyCityDateFilter() {
  const city = document.getElementById('cityFilter')?.value || '';
  const mode = document.getElementById('modeFilter')?.value || '';
  const activeType = document.querySelector('.filter-tab.active')?.dataset.filter || 'all';

  document.querySelectorAll('#eventsContainer .event-card').forEach(card => {
    const matchType = activeType === 'all' || card.dataset.type === activeType;
    const matchCity = !city || card.dataset.city === city;
    const matchMode = !mode || card.dataset.mode === mode;
    card.style.display = (matchType && matchCity && matchMode) ? '' : 'none';
  });
  updateResultsCount();
}

['cityFilter','dateFilter','modeFilter'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('change', applyCityDateFilter);
});

// ===== View Toggle =====
const gridViewBtn = document.getElementById('gridView');
const listViewBtn = document.getElementById('listView');
const eventsGrid = document.querySelector('.events-grid');
if (gridViewBtn && listViewBtn && eventsGrid) {
  gridViewBtn.addEventListener('click', () => {
    eventsGrid.classList.remove('list-view');
    gridViewBtn.classList.add('active'); listViewBtn.classList.remove('active');
  });
  listViewBtn.addEventListener('click', () => {
    eventsGrid.classList.add('list-view');
    listViewBtn.classList.add('active'); gridViewBtn.classList.remove('active');
  });
}

// ===== Category Strip =====
document.querySelectorAll('.cat-item').forEach(item => {
  item.addEventListener('click', function() {
    document.querySelectorAll('.cat-item').forEach(i => i.classList.remove('active'));
    this.classList.add('active');
  });
});

// ===== Confetti =====
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  canvas.style.display = 'block';
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ['#00B89C', '#33C9B0', '#FF6B35', '#ffffff', '#B3EDE6', '#FF8F65', '#1C1C1C'];
  const pieces = Array.from({ length: 140 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height * 0.5,
    r: Math.random() * 8 + 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: Math.random() * 4 + 2,
    wind: (Math.random() - 0.5) * 2.5,
    rot: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 8,
    shape: Math.random() > 0.5 ? 'rect' : 'circle',
  }));
  let frame, elapsed = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    elapsed++;
    let alive = 0;
    pieces.forEach(p => {
      p.y += p.speed; p.x += p.wind; p.rot += p.rotSpeed;
      if (p.y < canvas.height + 20) alive++;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.min(1, Math.max(0, (canvas.height - p.y) / 120 + 0.2));
      if (p.shape === 'rect') ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.55);
      else { ctx.beginPath(); ctx.arc(0, 0, p.r / 2, 0, Math.PI * 2); ctx.fill(); }
      ctx.restore();
    });
    if (alive > 0 && elapsed < 260) frame = requestAnimationFrame(animate);
    else { ctx.clearRect(0, 0, canvas.width, canvas.height); canvas.style.display = 'none'; cancelAnimationFrame(frame); }
  }
  animate();
}

// ===== Toast =====
function showToast(message, icon) {
  icon = icon || '✓';
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.id = 'globalToast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('show'), 3500);
}

// ===== Newsletter (with confetti) =====
function handleSubscribe(e) {
  e.preventDefault();
  const form = e.target;
  const input = form.querySelector('input[type="email"]');
  const btn = form.querySelector('button');
  const wrapper = form.closest('.newsletter-inner') || form.parentElement;
  btn.textContent = '訂閱中...';
  btn.disabled = true;
  setTimeout(() => {
    // Replace form with thank-you state
    form.style.transition = 'opacity .4s';
    form.style.opacity = '0';
    setTimeout(() => {
      form.innerHTML = `
        <div class="newsletter-success">
          <span class="newsletter-success-icon">🌱</span>
          <p>感謝訂閱！每月精選公益活動<br>將直送到你的信箱。</p>
        </div>`;
      form.style.opacity = '1';
    }, 400);
    showToast('太棒了！你已成功訂閱善種電子報', '🌱');
    launchConfetti();
  }, 1200);
}

// ===== Registration Multi-step Form =====
function nextStep(step) {
  document.querySelectorAll('.step-form').forEach(f => f.classList.add('hidden'));
  const target = document.getElementById('step' + step);
  if (target) target.classList.remove('hidden');
  document.querySelectorAll('.reg-step').forEach((s, i) => {
    s.classList.remove('active', 'done');
    if (i + 1 < step) s.classList.add('done');
    else if (i + 1 === step) s.classList.add('active');
  });
}

function completeRegistration() {
  document.querySelectorAll('.step-form').forEach(f => f.classList.add('hidden'));
  const success = document.getElementById('registerSuccess');
  if (success) success.classList.remove('hidden');
  document.querySelectorAll('.reg-step').forEach(s => s.classList.add('done'));
  launchConfetti();
  showToast('報名成功！期待在活動中見到你', '🎉');
}

// ===== Floating Action Button =====
const fabMain = document.getElementById('fabMain');
const fabMenu = document.getElementById('fabMenu');
if (fabMain && fabMenu) {
  fabMain.addEventListener('click', (e) => {
    e.stopPropagation();
    fabMain.classList.toggle('open');
    const items = fabMenu.querySelectorAll('.fab-item');
    const isOpen = fabMain.classList.contains('open');
    items.forEach((item, i) => {
      clearTimeout(item._fabTimeout);
      if (isOpen) item._fabTimeout = setTimeout(() => item.classList.add('visible'), i * 65);
      else item.classList.remove('visible');
    });
  });
  document.addEventListener('click', (e) => {
    const container = document.querySelector('.fab-container');
    if (container && !container.contains(e.target)) {
      fabMain.classList.remove('open');
      fabMenu.querySelectorAll('.fab-item').forEach(item => item.classList.remove('visible'));
    }
  });
}

// ===== Countdown Timers (fixed & enhanced) =====
function updateCountdowns() {
  document.querySelectorAll('[data-event-date]').forEach(el => {
    const eventDate = new Date(el.dataset.eventDate);
    const diff = eventDate - new Date();
    if (diff <= 0) {
      el.innerHTML = '<span class="countdown-live">● 活動進行中</span>';
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    el.innerHTML = `
      <div class="countdown-unit"><span class="countdown-num">${days}</span><span class="countdown-label">天</span></div>
      <span class="countdown-sep">:</span>
      <div class="countdown-unit"><span class="countdown-num">${String(hours).padStart(2,'0')}</span><span class="countdown-label">時</span></div>
      <span class="countdown-sep">:</span>
      <div class="countdown-unit"><span class="countdown-num">${String(mins).padStart(2,'0')}</span><span class="countdown-label">分</span></div>
    `;
  });
}
updateCountdowns();
setInterval(updateCountdowns, 30000);

// ===== Favorite / Bookmark Events =====
function getFavorites() {
  try { return JSON.parse(localStorage.getItem('sg_favorites') || '[]'); } catch { return []; }
}
function saveFavorites(favs) {
  try { localStorage.setItem('sg_favorites', JSON.stringify(favs)); } catch {}
}
function toggleFavorite(id, btn) {
  let favs = getFavorites();
  const idx = favs.indexOf(id);
  if (idx > -1) {
    favs.splice(idx, 1);
    btn.classList.remove('favorited');
    btn.setAttribute('aria-label', '加入收藏');
    showToast('已移除收藏', '🤍');
  } else {
    favs.push(id);
    btn.classList.add('favorited');
    btn.setAttribute('aria-label', '取消收藏');
    showToast('已加入收藏！', '❤️');
  }
  saveFavorites(favs);
}

function initFavoriteButtons() {
  const favs = getFavorites();
  document.querySelectorAll('.event-card').forEach((card, i) => {
    const id = card.dataset.eventId || `event-${i}`;
    card.dataset.eventId = id;
    if (!card.querySelector('.fav-btn')) {
      const btn = document.createElement('button');
      btn.className = 'fav-btn' + (favs.includes(id) ? ' favorited' : '');
      btn.setAttribute('aria-label', favs.includes(id) ? '取消收藏' : '加入收藏');
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(id, btn);
      });
      card.appendChild(btn);
    }
  });
}
initFavoriteButtons();

// ===== Seats Progress Bar (visual) =====
function initSeatsProgress() {
  document.querySelectorAll('[data-seats-used][data-seats-total]').forEach(el => {
    const used = parseInt(el.dataset.seatsUsed);
    const total = parseInt(el.dataset.seatsTotal);
    const pct = Math.min(100, Math.round(used / total * 100));
    const remaining = total - used;
    const color = pct >= 90 ? 'var(--accent)' : pct >= 70 ? '#F4A261' : 'var(--teal)';
    el.innerHTML = `
      <div class="seats-visual-label">
        <span>剩餘 <strong style="color:${color}">${remaining}</strong> 席</span>
        <span style="font-size:.72rem;color:var(--text-muted)">${used}/${total} 已報名</span>
      </div>
      <div class="seats-visual-bar">
        <div class="seats-visual-fill" style="width:${pct}%;background:${color}"></div>
      </div>`;
  });
}
initSeatsProgress();

// ===== Add to Calendar =====
function addToCalendar(title, startIso, endIso, location, description) {
  const fmt = (d) => d.replace(/[-:]/g,'').replace('.000','');
  const start = fmt(new Date(startIso).toISOString());
  const end = fmt(new Date(endIso).toISOString());
  const ics = [
    'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//SeedGood//TW',
    'BEGIN:VEVENT',
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    `LOCATION:${location || ''}`,
    `DESCRIPTION:${description || ''}`,
    'END:VEVENT','END:VCALENDAR'
  ].join('\r\n');
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'seedgood-event.ics'; a.click();
  URL.revokeObjectURL(url);
  showToast('行事曆檔案已下載！', '📅');
}

// ===== Impact Ripple Interaction =====
const impactCircle = document.querySelector('.impact-circle');
if (impactCircle) {
  impactCircle.style.cursor = 'pointer';
  impactCircle.addEventListener('click', () => {
    impactCircle.classList.add('ripple-burst');
    showToast('你的參與已影響 3,247 人！', '💚');
    setTimeout(() => impactCircle.classList.remove('ripple-burst'), 1000);
  });
}

// ===== Personalized Recommendation (localStorage-based) =====
function trackEventView(type) {
  if (!type) return;
  try {
    const prefs = JSON.parse(localStorage.getItem('sg_prefs') || '{}');
    prefs[type] = (prefs[type] || 0) + 1;
    localStorage.setItem('sg_prefs', JSON.stringify(prefs));
  } catch {}
}

function getTopPreference() {
  try {
    const prefs = JSON.parse(localStorage.getItem('sg_prefs') || '{}');
    let top = null, max = 0;
    Object.entries(prefs).forEach(([k, v]) => { if (v > max) { max = v; top = k; } });
    return top;
  } catch { return null; }
}

// Track current page event type
const heroCard = document.querySelector('.event-card[data-type]');
if (heroCard) trackEventView(heroCard.dataset.type);

// ===== Carbon Footprint Calculator (on event-detail page) =====
function initCarbonCalc() {
  const calc = document.getElementById('carbonCalc');
  if (!calc) return;
  function compute() {
    const flights = parseFloat(document.getElementById('calcFlights')?.value || 0);
    const meat = parseFloat(document.getElementById('calcMeat')?.value || 0);
    const elec = parseFloat(document.getElementById('calcElec')?.value || 0);
    // kg CO2e / year
    const total = Math.round(flights * 900 + meat * 550 + elec * 18);
    const avg = 11800; // Taiwan avg kg CO2e/yr
    const pct = Math.round(total / avg * 100);
    const bar = calc.querySelector('.calc-bar-fill');
    const numEl = calc.querySelector('.calc-num');
    const compEl = calc.querySelector('.calc-compare');
    if (bar) bar.style.width = Math.min(100, pct) + '%';
    if (numEl) numEl.textContent = total.toLocaleString();
    if (compEl) compEl.textContent = pct < 100
      ? `比台灣平均低 ${100 - pct}%`
      : `比台灣平均高 ${pct - 100}%`;
  }
  calc.querySelectorAll('input[type=range]').forEach(r => r.addEventListener('input', () => {
    const out = document.getElementById(r.id + 'Out');
    if (out) out.textContent = r.value;
    compute();
  }));
  compute();
}
initCarbonCalc();

// ===== Share Card Generator =====
function generateShareCard() {
  const title = document.querySelector('.event-hero-title')?.textContent?.trim() || '善種活動';
  const date = document.querySelector('.event-hero-meta span')?.textContent?.trim() || '';
  const text = `📌 ${title}\n${date}\n\n透過善種參與這場活動！`;
  if (navigator.share) {
    navigator.share({ title: '善種 SeedGood', text, url: location.href }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(text + '\n' + location.href).then(() => {
      showToast('活動資訊已複製！', '📋');
    });
  }
}

// ===== Host Application Form =====
function submitHostApplication(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  btn.textContent = '送出中...';
  btn.disabled = true;
  setTimeout(() => {
    const form = e.target;
    form.innerHTML = `
      <div style="text-align:center;padding:2rem">
        <div style="font-size:2.5rem;margin-bottom:1rem">🎉</div>
        <h3 style="font-size:1.3rem;margin-bottom:.5rem">申請已送出！</h3>
        <p style="color:var(--text-secondary)">我們將在 3 個工作天內與你聯絡，感謝你願意播種善意！</p>
      </div>`;
    launchConfetti();
  }, 1400);
}
