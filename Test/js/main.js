/**
 * MINE-X HOSTING - Multi-Page Main Controller
 * Sticky navbar, active page detection, mobile drawer, scroll reveals, and component renderers
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar & Responsive Mobile Drawer
  const navbar = document.querySelector('.navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Ensure backdrop exists
  let navBackdrop = document.getElementById('navBackdrop');
  if (!navBackdrop) {
    navBackdrop = document.createElement('div');
    navBackdrop.className = 'nav-backdrop';
    navBackdrop.id = 'navBackdrop';
    navBackdrop.setAttribute('aria-hidden', 'true');
    document.body.appendChild(navBackdrop);
  }

  // Inject drawer header & mobile actions if not present
  if (navMenu && !navMenu.querySelector('.nav-drawer-header')) {
    const header = document.createElement('div');
    header.className = 'nav-drawer-header';
    header.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <img src="assets/logo.png" alt="ShadowNode Logo" class="brand-logo-img" style="height: 32px; width: auto; border-radius: 6px;">
        <span class="brand-text" style="font-size: 0.96rem;"><span class="brand-name">Shadow</span><span class="brand-sub">Node</span></span>
      </div>
      <button class="nav-drawer-close" id="navDrawerClose" aria-label="Close navigation">&times;</button>
    `;
    navMenu.insertBefore(header, navMenu.firstChild);

    const actions = document.createElement('div');
    actions.className = 'nav-drawer-actions';
    actions.innerHTML = `
      <div class="nav-drawer-status">
        <span class="status-dot"></span>
        <span>ALL SYSTEMS OPERATIONAL</span>
      </div>
      <a href="minecraft.html" class="btn btn-primary btn-glow btn-sm">Get Started</a>
      <a href="https://discord.gg/qsGp3FyNAK" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm nav-btn-discord" style="width: 100%; justify-content: center;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
        <span>Join Discord</span>
      </a>
    `;
    navMenu.appendChild(actions);
  }

  function setDrawerOpen(open) {
    if (!navMenu || !navToggle) return;
    navToggle.classList.toggle('open', open);
    navMenu.classList.toggle('open', open);
    navBackdrop?.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-drawer-open', open);
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = !navMenu.classList.contains('open');
      setDrawerOpen(willOpen);
    });

    const drawerCloseBtn = document.getElementById('navDrawerClose');
    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', () => setDrawerOpen(false));
    }

    navBackdrop?.addEventListener('click', () => setDrawerOpen(false));

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        setDrawerOpen(false);
      }
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => setDrawerOpen(false));
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1140 && navMenu.classList.contains('open')) {
        setDrawerOpen(false);
      }
    }, { passive: true });
  }

  // 2. Active Page Highlighting in Navigation
  const rawPath = window.location.pathname.split('/').pop() || 'index.html';
  const currentPath = rawPath.endsWith('.html') ? rawPath : (rawPath ? rawPath + '.html' : 'index.html');
  document.querySelectorAll('.nav-menu .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === 'index.html' && (href === 'index.html' || href === '/'))) {
      link.classList.add('active');
    } else if (href !== currentPath && !href.startsWith('#')) {
      link.classList.remove('active');
    }
  });

  // 3. Scroll Reveal Animation via IntersectionObserver
  initScrollReveals();

  // 4. Render Homepage & Features Page Features Grid if present
  const featuresContainer = document.getElementById('featuresGrid');
  if (featuresContainer && MINEX_DATA.features) {
    featuresContainer.innerHTML = MINEX_DATA.features.map(f => `
      <div class="feature-card reveal-on-scroll">
        <div class="feature-icon-wrapper">
          ${getFeatureIconSvg(f.icon)}
        </div>
        <h3 class="feature-card-title">${f.title}</h3>
        <div class="feature-card-subtitle">${f.subtitle || ''}</div>
        <p class="feature-card-desc">${f.desc}</p>
      </div>
    `).join('');
    initScrollReveals();
  }

  // 5. Render Game Modes Grid if present
  const gameModesContainer = document.getElementById('gameModesGrid');
  if (gameModesContainer && MINEX_DATA.gameModes) {
    gameModesContainer.innerHTML = MINEX_DATA.gameModes.map(gm => `
      <div class="mode-card reveal-on-scroll">
        <div>
          <div class="mode-icon-tag">
            ${getGameModeIconSvg(gm.icon)}
          </div>
          <h3 class="mode-name">${gm.name}</h3>
          <div class="mode-tagline">${gm.tagline}</div>
          <p class="mode-desc">${gm.desc}</p>
        </div>
        <div class="mode-meta">
          <div>Recommended: <strong>${gm.recPlan}</strong></div>
          <div style="margin-top: 4px; font-size: 0.7rem; color: var(--text-muted);">Stack: ${gm.plugins}</div>
        </div>
      </div>
    `).join('');
    initScrollReveals();
  }

  // 6. Render Server Software Badges if present
  const softwareContainer = document.getElementById('softwareBadges');
  if (softwareContainer && MINEX_DATA.serverSoftware) {
    softwareContainer.innerHTML = MINEX_DATA.serverSoftware.map(sw => `
      <div class="software-badge reveal-on-scroll">
        <span class="sw-dot"></span>
        <span>${sw.name}</span>
      </div>
    `).join('');
    initScrollReveals();
  }

  // 7. Render Statistics Counters if present
  const statsContainer = document.getElementById('statsGrid');
  if (statsContainer && MINEX_DATA.stats) {
    statsContainer.innerHTML = MINEX_DATA.stats.map(s => `
      <div class="stat-box reveal-on-scroll">
        <div class="stat-number" data-target="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `).join('');

    initCounters();
  }

  // 8. Render Policy Grid if present
  const policyContainer = document.getElementById('policyGrid');
  if (policyContainer && MINEX_DATA.policy) {
    policyContainer.innerHTML = MINEX_DATA.policy.map(p => `
      <div class="policy-card reveal-on-scroll">
        <div class="policy-icon">
          ${getPolicyIconSvg(p.icon)}
        </div>
        <h3 class="policy-title">${p.title}</h3>
        <p class="policy-desc">${p.desc}</p>
      </div>
    `).join('');
    initScrollReveals();
  }

  // 9. Render Reviews Grid if present
  const reviewsContainer = document.getElementById('reviewsGrid');
  if (reviewsContainer && MINEX_DATA.reviews) {
    reviewsContainer.innerHTML = MINEX_DATA.reviews.map(r => `
      <div class="review-card reveal-on-scroll">
        <div class="review-stars">
          ${'★'.repeat(r.stars)}
        </div>
        <p class="review-text">"${r.text}"</p>
        <div class="review-author">
          <div class="review-avatar">${r.name.charAt(0)}</div>
          <div class="author-info">
            <h4>${r.name}</h4>
            <span>${r.role}</span>
          </div>
        </div>
      </div>
    `).join('');
    initScrollReveals();
  }

  // 8. Smooth Page Navigation Transitions
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('javascript:') || link.target === '_blank') {
      return;
    }

    link.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      document.body.classList.add('page-transitioning');
      setTimeout(() => {
        window.location.href = href;
      }, 70);
    });
  });

  // Re-bind cursor card tilt & magnetic buttons after all dynamic templates are populated
  if (window.minexCursor) {
    window.minexCursor.initCardTilt();
    window.minexCursor.initMagneticButtons();
  }
});

// Staggered Scroll Reveal Observer
function initScrollReveals() {
  const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  // Stagger siblings in grid containers
  elements.forEach((el) => {
    const parent = el.parentElement;
    if (parent && (parent.classList.contains('pricing-grid') || parent.classList.contains('features-grid') || parent.classList.contains('game-modes-grid') || parent.classList.contains('stats-grid') || parent.classList.contains('vps-grid'))) {
      const siblings = Array.from(parent.children).filter(c => c.classList.contains('reveal-on-scroll'));
      const sibIndex = siblings.indexOf(el);
      if (sibIndex >= 0) {
        el.style.transitionDelay = `${(sibIndex % 4) * 0.055}s`;
      }
    }
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// Numerical Counter Roll-up with Smooth Quartic Deceleration
function initCounters() {
  const statElements = document.querySelectorAll('.stat-number');
  if (!('IntersectionObserver' in window)) {
    statElements.forEach(el => {
      el.innerText = `${el.getAttribute('data-target')}${el.getAttribute('data-suffix')}`;
    });
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetStr = el.getAttribute('data-target') || '0';
        const target = parseFloat(targetStr);
        const suffix = el.getAttribute('data-suffix') || '';
        const decMatch = targetStr.match(/\.(\d+)/);
        const decCount = decMatch ? decMatch[1].length : 0;
        const duration = 1600;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Quartic ease-out for ultra smooth deceleration
          const eased = 1 - Math.pow(1 - progress, 4);
          const currentVal = target * eased;

          el.innerText = decCount > 0 ? `${currentVal.toFixed(decCount)}${suffix}` : `${Math.floor(currentVal)}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.innerText = decCount > 0 ? `${target.toFixed(decCount)}${suffix}` : `${target}${suffix}`;
          }
        }

        requestAnimationFrame(updateCounter);
        obs.unobserve(el);
      }
    });
  }, { 
    threshold: 0.15,
    rootMargin: '0px 0px -30px 0px'
  });

  statElements.forEach(el => observer.observe(el));
}

// SVG Icons
function getFeatureIconSvg(name) {
  const map = {
    'cpu': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`,
    'hard-drive': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" x2="2" y1="12" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" x2="6.01" y1="16" y2="16"/><line x1="10" x2="10.01" y1="16" y2="16"/></svg>`,
    'shield-check': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`,
    'zap': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>`,
    'sliders': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="1" x2="7" y1="14" y2="14"/><line x1="9" x2="15" y1="8" y2="8"/><line x1="17" x2="23" y1="16" y2="16"/></svg>`,
    'headphones': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>`,
    'trending-up': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
    'database-backup': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 12a9 3 0 0 0 5 2.69"/><path d="M21 9.3V5"/><path d="M3 5v14a9 3 0 0 0 6.47 2.88"/><path d="M12 12v4h4"/><path d="M13 20a5 5 0 1 0-3.9-7.9"/></svg>`
  };
  return map[name] || '';
}

function getGameModeIconSvg(name) {
  const map = {
    'pickaxe': `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.531 4.268 6.61 12.189l-2.07-.69a2 2 0 0 0-2.316.744l-.394.59a2 2 0 0 0 .5 2.658l2.76 2.07 2.07 2.76a2 2 0 0 0 2.658.5l.59-.394a2 2 0 0 0 .744-2.316l-.69-2.07 7.92-7.92"/><path d="m19 5 2 2"/><path d="m14 10 2 2"/></svg>`,
    'shield': `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>`,
    'crown': `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>`,
    'cloud': `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
    'gamepad-2': `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/><line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></svg>`,
    'lock': `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    'compass': `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
    'code': `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`
  };
  return map[name] || '';
}

function getPolicyIconSvg(name) {
  const map = {
    'clock': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    'shield-alert': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
    'activity': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.48 12H2"/></svg>`
  };
  return map[name] || '';
}
