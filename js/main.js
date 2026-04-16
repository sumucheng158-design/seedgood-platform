/* ===================================
   善種 SeedGood — Main JavaScript
   炭黑 × 青綠 Edition — Optimized
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
    resultsBox.innerHTML = `<div class="search-no-result">找不到「${query}」相關活動</div>`;
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

// ===== Events Filter Tabs =====
document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  });
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

// ===== Newsletter =====
function handleSubscribe(e) {
  e.preventDefault();
  const input = e.target.querySelector('input[type="email"]');
  const btn = e.target.querySelector('button');
  btn.textContent = '訂閱中...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '✓ 已訂閱';
    btn.style.background = 'var(--teal-dark)';
    input.value = '';
    input.placeholder = '感謝訂閱！';
    showToast('太棒了！你已成功訂閱善種電子報', '🌱');
    setTimeout(() => {
      btn.textContent = '訂閱電子報'; btn.disabled = false; btn.style.background = '';
      input.placeholder = '輸入你的電子信箱';
    }, 4000);
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

// ===== Countdown Timers =====
function updateCountdowns() {
  document.querySelectorAll('[data-event-date]').forEach(el => {
    const eventDate = new Date(el.dataset.eventDate);
    const diff = eventDate - new Date();
    if (diff <= 0) { el.innerHTML = '<span style="color:var(--teal);font-weight:600">活動進行中</span>'; return; }
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
