/* ===================================
   善種 SeedGood — Main JavaScript
   =================================== */

// ===== Navigation =====
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      mobileMenu.classList.remove('open');
    }
  });
}

// ===== Counter Animation =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const start = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString();
    }
  }
  requestAnimationFrame(update);
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('[data-target]');
      counters.forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

// Observe hero stats and big metrics
document.querySelectorAll('.hero-stats, .big-metrics-grid').forEach(el => {
  counterObserver.observe(el);
});

// Also trigger for individual big-metric elements
document.querySelectorAll('.big-metric-num[data-target]').forEach(el => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(el);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(el);
});

// ===== Scroll Reveal =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.event-card, .testimonial-card, .trust-card, .story-card, .team-card, .cat-impact-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
  revealObserver.observe(el);
});

// ===== Newsletter Subscribe =====
function handleSubscribe(e) {
  e.preventDefault();
  const input = e.target.querySelector('input[type="email"]');
  const btn = e.target.querySelector('button');
  const email = input.value;

  btn.textContent = '訂閱中...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = '✓ 訂閱成功！';
    btn.style.background = '#52B788';
    input.value = '';
    input.placeholder = '感謝訂閱！';
    setTimeout(() => {
      btn.textContent = '訂閱電子報';
      btn.disabled = false;
      btn.style.background = '';
      input.placeholder = '輸入你的電子信箱';
    }, 3000);
  }, 1200);
}

// ===== Smooth Active State for Cat Strip =====
document.querySelectorAll('.cat-item').forEach(item => {
  item.addEventListener('click', function(e) {
    document.querySelectorAll('.cat-item').forEach(i => i.classList.remove('active'));
    this.classList.add('active');
  });
});

// ===== Active Page Highlight =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href && href.startsWith(currentPage)) {
    link.classList.add('active');
  }
});
