/**
 * MINE-X HOSTING — Custom Geometric Reticle Cursor & Interactive Micro-Interactions
 * 
 * Features:
 * - Geometric cyan diamond core with instant tracking
 * - Segmented outer reticle ring with spring lerp lag
 * - Dynamic hover morphing (buttons, links, cards)
 * - Click feedback scaling
 * - 3D card tilt tracking with perspective
 * - Magnetic button attraction
 * - Touch-screen fallback protection
 */

class CustomCursor {
  constructor() {
    // Only enable on desktop & laptop with mouse / trackpad
    this.checkDeviceType();
    if (this.isTouchDevice) {
      document.body.classList.remove('has-custom-cursor');
      return;
    }

    this.core = document.querySelector('.custom-cursor-core');
    this.ring = document.querySelector('.custom-cursor-ring');
    if (!this.core || !this.ring) return;

    document.body.classList.add('has-custom-cursor');

    this.targetX = window.innerWidth / 2;
    this.targetY = window.innerHeight / 2;
    this.ringX = this.targetX;
    this.ringY = this.targetY;

    this.isVisible = false;

    this.bindEvents();
    this.initCardTilt();
    this.initMagneticButtons();
    this.render();
  }

  bindEvents() {
    const handleMove = (e) => {
      if (e.pointerType === 'touch') return;
      this.targetX = e.clientX;
      this.targetY = e.clientY;

      if (!this.isVisible) {
        this.isVisible = true;
        this.core.style.opacity = '1';
        this.ring.style.opacity = '1';
      }
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('mousemove', handleMove, { passive: true });

    document.addEventListener('mouseleave', () => {
      this.isVisible = false;
      this.core.style.opacity = '0';
      this.ring.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      this.isVisible = true;
      this.core.style.opacity = '1';
      this.ring.style.opacity = '1';
    });

    // Click feedback
    window.addEventListener('mousedown', (e) => {
      if (e.pointerType === 'touch') return;
      this.core.classList.add('is-clicked');
      this.ring.classList.add('is-clicked');
    });

    window.addEventListener('mouseup', () => {
      this.core.classList.remove('is-clicked');
      this.ring.classList.remove('is-clicked');
    });

    // Event delegation for hover states
    document.addEventListener('mouseover', (e) => {
      const target = e.target;
      if (!target) return;

      // Button & Interactive Control hover
      if (target.closest('button, .btn, .tab-btn, .modal-close-btn, [role="button"], .loc-btn, .nav-toggle, .software-badge, input[type="range"], .range-slider')) {
        this.ring.classList.add('hover-btn');
        this.core.classList.add('hover-btn');
        return;
      }

      // Link / Nav hover
      if (target.closest('a, .nav-link, .brand-link, .footer-links a')) {
        this.ring.classList.add('hover-link');
        return;
      }

      // Card hover
      if (target.closest('.price-card, .product-showcase-card, .feature-card, .telemetry-card, .mode-card, .editorial-feature-card, .stat-box, .policy-card, .review-card, .faq-item')) {
        this.ring.classList.add('hover-card');
        return;
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target;
      if (!target) return;

      if (target.closest('button, .btn, .tab-btn, .modal-close-btn, [role="button"], .loc-btn, .nav-toggle, .software-badge')) {
        this.ring.classList.remove('hover-btn');
        this.core.classList.remove('hover-btn');
      }
      if (target.closest('a, .nav-link, .brand-link, .footer-links a')) {
        this.ring.classList.remove('hover-link');
      }
      if (target.closest('.price-card, .product-showcase-card, .feature-card, .telemetry-card, .mode-card, .editorial-feature-card, .stat-box, .policy-card, .review-card, .faq-item')) {
        this.ring.classList.remove('hover-card');
      }
    });
  }

  checkDeviceType() {
    this.isTouchDevice = 
      window.matchMedia('(hover: none), (pointer: coarse)').matches ||
      ('ontouchstart' in window && !window.matchMedia('(pointer: fine)').matches) ||
      (navigator.maxTouchPoints > 0 && window.innerWidth <= 1024);
  }

  initCardTilt() {
    this.checkDeviceType();
    if (this.isTouchDevice) return;

    const cards = document.querySelectorAll('.price-card, .telemetry-card, .product-showcase-card, .mode-card, .editorial-feature-card, .feature-card, .stat-box, .review-card, .policy-card');
    cards.forEach(card => {
      if (card.dataset.tiltBound) return;
      card.dataset.tiltBound = 'true';

      card.addEventListener('mousemove', (e) => {
        if (this.isTouchDevice) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Dynamic specular spotlight percentage
        const mouseXPct = ((x / rect.width) * 100).toFixed(1);
        const mouseYPct = ((y / rect.height) * 100).toFixed(1);
        card.style.setProperty('--mouse-x', `${mouseXPct}%`);
        card.style.setProperty('--mouse-y', `${mouseYPct}%`);

        // Gentle, cinematic tilt (max 4.2 degrees)
        const rotateX = ((y - centerY) / centerY) * -4.2;
        const rotateY = ((x - centerX) / centerX) * 4.2;

        // Ultra-smooth damping transition during movement
        card.style.transition = 'transform 0.09s cubic-bezier(0.2, 0, 0.2, 1)';
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease';
        card.style.transform = '';
      });
    });
  }

  initMagneticButtons() {
    this.checkDeviceType();
    if (this.isTouchDevice) return;

    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary, .brand-link, .tab-btn');
    magneticBtns.forEach(btn => {
      if (btn.dataset.magneticBound) return;
      btn.dataset.magneticBound = 'true';

      btn.addEventListener('mousemove', (e) => {
        if (this.isTouchDevice) return;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transition = 'transform 0.08s cubic-bezier(0.2, 0, 0.2, 1)';
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
        btn.style.transform = '';
      });
    });
  }

  ensureVisible() {
    this.isVisible = true;
    if (this.core) this.core.style.opacity = '1';
    if (this.ring) this.ring.style.opacity = '1';
  }

  render = () => {
    // Instant core tracking with zero latency
    this.core.style.left = `${this.targetX}px`;
    this.core.style.top = `${this.targetY}px`;

    // Fluid spring lerp (0.19) for outer reticle follower
    const lerp = 0.19;
    this.ringX += (this.targetX - this.ringX) * lerp;
    this.ringY += (this.targetY - this.ringY) * lerp;

    this.ring.style.left = `${this.ringX.toFixed(1)}px`;
    this.ring.style.top = `${this.ringY.toFixed(1)}px`;

    requestAnimationFrame(this.render);
  };
}

document.addEventListener('DOMContentLoaded', () => {
  window.minexCursor = new CustomCursor();
});
