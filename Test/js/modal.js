/**
 * MINE-X HOSTING - Plan Deployment & Custom Configurator Modal
 * 
 * 1. Standard Plans (Dirt, Gold, Diamond, VPS, etc.):
 *    - FIXED SPECS ONLY. No customization sliders.
 *    - Shows clean deployment summary with confirmed plan hardware.
 * 
 * 2. Custom Plan (Get Quote):
 *    - Single Master RAM Slider.
 *    - Budget Tier: ₹9 / GB RAM.
 *    - Performance Tier: ₹18 / GB RAM.
 *    - CPU and Disk are AUTOMATED based on plan scaling ratios.
 * 
 * 3. Smooth transitions & high-z overlay to guarantee custom cursor visibility.
 */

class QuoteModal {
  constructor() {
    this.dialog = document.getElementById('quoteModal');
    if (!this.dialog) return;

    // Ensure modal backdrop overlay exists in DOM
    let backdrop = document.querySelector('.modal-backdrop-overlay');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop-overlay';
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.appendChild(backdrop);
    }
    this.backdrop = backdrop;

    this.title = document.getElementById('modalTitle');
    this.modalBody = this.dialog.querySelector('.modal-body');
    this.modalFooter = this.dialog.querySelector('.modal-footer');
    this.closeBtn = document.getElementById('modalCloseBtn');

    this.currentMode = 'budget'; // 'budget' (₹9/GB) or 'perf' (₹18/GB)
    this.customRam = 16; // default custom RAM in GB

    this.bindGlobalEvents();
  }

  bindGlobalEvents() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.backdrop) {
      this.backdrop.addEventListener('click', () => this.close());
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.dialog && this.dialog.classList.contains('is-open')) {
        this.close();
      }
    });

    this.dialog.addEventListener('close', () => {
      this.close();
    });
  }

  // Automated CPU assignment based on RAM and tier
  getAutomatedCpu(ram, mode) {
    if (ram <= 2) return '100% CPU (1 Core)';
    if (ram <= 4) return '200% CPU (2 Cores)';
    if (ram <= 8) return '300% CPU (3 Cores)';
    if (ram <= 16) return '400% CPU (4 Cores)';
    if (ram <= 32) return '500% CPU (5 Cores)';
    if (ram <= 48) return '600% CPU (6 Cores)';
    if (ram <= 64) return mode === 'budget' ? '800% CPU (8 Cores)' : '700% CPU (7 Cores)';
    const cores = Math.min(16, Math.ceil(ram / 8));
    return `${cores * 100}% CPU (${cores} Cores)`;
  }

  // Automated Disk assignment based on RAM and tier
  getAutomatedDisk(ram, mode) {
    const isPerf = mode === 'perf';
    const type = isPerf ? 'NVMe Gen4' : 'Enterprise SSD';
    if (ram <= 2) return `10 GB ${type}`;
    if (ram <= 4) return isPerf ? `20 GB ${type}` : `15 GB ${type}`;
    if (ram <= 8) return `30 GB ${type}`;
    if (ram <= 16) return `40 GB ${type}`;
    if (ram <= 32) return `50 GB ${type}`;
    if (ram <= 48) return `60 GB ${type}`;
    if (ram <= 64) return `80 GB ${type}`;
    const disk = Math.min(500, Math.round(ram * 1.25));
    return `${disk} GB ${type}`;
  }

  // Automated Price: ₹9/GB for Budget, ₹18/GB for Performance
  getAutomatedPrice(ram, mode) {
    const rate = mode === 'perf' ? 18 : 9;
    return ram * rate;
  }

  open(options = {}) {
    if (!this.dialog) return;

    if (options.type === 'standard') {
      this.renderStandardView(options);
    } else {
      this.renderCustomView(options);
    }

    // Open via high-z overlay (avoids #top-layer stacking bug)
    this.dialog.setAttribute('open', '');
    this.dialog.classList.add('is-open');
    if (this.backdrop) {
      this.backdrop.classList.add('is-open');
    }
    document.body.classList.add('modal-is-open');
    document.body.style.overflow = 'hidden';

    // Keep custom geometric cursor active and on top
    if (window.minexCursor && window.minexCursor.ensureVisible) {
      window.minexCursor.ensureVisible();
    }
  }

  close() {
    if (!this.dialog) return;
    this.dialog.removeAttribute('open');
    this.dialog.classList.remove('is-open');
    if (this.backdrop) {
      this.backdrop.classList.remove('is-open');
    }
    document.body.classList.remove('modal-is-open');
    document.body.style.overflow = '';
  }

  // -------------------------------------------------------------
  // 1. STANDARD PLAN VIEW: Fixed Specs, NO Sliders
  // -------------------------------------------------------------
  renderStandardView(options) {
    if (this.title) {
      this.title.innerText = `Deploy ${options.plan}`;
    }

    const priceText = options.price ? `₹${options.price}` : 'Selected';
    const ramText = options.ram || 'Allocated RAM';
    const diskText = options.disk || 'High-Speed Storage';
    const cpuText = options.cpu || 'Compute Dedicated';
    const modeBadge = options.mode === 'perf' ? 'EPYC PERFORMANCE' : (options.mode === 'vps' ? 'CLOUD VPS' : 'XEON BUDGET');

    this.modalBody.innerHTML = `
      <div class="modal-plan-summary">
        <div class="modal-plan-header">
          <div>
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--cyan-primary); letter-spacing: 0.08em; margin-bottom: 2px;">
              ${modeBadge} // FIXED SPECIFICATIONS
            </div>
            <div class="modal-plan-name">
              <span>${options.plan}</span>
            </div>
          </div>
          <div class="modal-plan-price-badge">
            ${priceText}<span class="unit">/mo</span>
          </div>
        </div>

        <div class="modal-spec-grid">
          <div class="modal-spec-cell">
            <span class="modal-spec-cell-label">Memory</span>
            <span class="modal-spec-cell-val">${ramText}</span>
          </div>
          <div class="modal-spec-cell">
            <span class="modal-spec-cell-label">Storage</span>
            <span class="modal-spec-cell-val">${diskText}</span>
          </div>
          <div class="modal-spec-cell">
            <span class="modal-spec-cell-label">CPU Cores</span>
            <span class="modal-spec-cell-val">${cpuText}</span>
          </div>
          <div class="modal-spec-cell">
            <span class="modal-spec-cell-label">DDoS Shield</span>
            <span class="modal-spec-cell-val">Path.net 3.2+ Tbps</span>
          </div>
          <div class="modal-spec-cell" style="grid-column: 1 / -1;">
            <span class="modal-spec-cell-label">Control Panel & Deployment</span>
            <span class="modal-spec-cell-val">Pterodactyl Game Panel // Automated 60-Second Setup</span>
          </div>
        </div>
      </div>

      <div>
        <label for="contactHandle" style="display: block; font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 6px;">
          Discord Tag / Email Address (for Panel Access)
        </label>
        <input type="text" id="contactHandle" class="modal-input-field" placeholder="e.g. user#1234 or you@domain.com">
      </div>

      <div id="modalFeedback" style="font-family: var(--font-mono); font-size: 0.85rem; text-align: center; min-height: 20px;"></div>
    `;

    this.modalFooter.innerHTML = `
      <button class="btn btn-secondary btn-sm" id="modalCancelBtn">Cancel</button>
      <button class="btn btn-primary btn-sm btn-glow" id="modalDeployConfirmBtn">Confirm & Deploy &rarr;</button>
    `;

    document.getElementById('modalCancelBtn')?.addEventListener('click', () => this.close());
    document.getElementById('modalDeployConfirmBtn')?.addEventListener('click', () => {
      const handleInput = document.getElementById('contactHandle');
      const handle = handleInput ? handleInput.value.trim() : '';
      if (!handle) {
        this.showFeedback('Please enter your Discord tag or email address.', '#F87171');
        return;
      }
      this.showFeedback(`Deployment queued for ${options.plan}! Instant node setup dispatched.`, '#00E5FF');
      setTimeout(() => this.close(), 2000);
    });
  }

  // -------------------------------------------------------------
  // 2. CUSTOM PLAN VIEW: Automated CPU & Disk by Plan Tier (₹9/GB or ₹18/GB)
  // -------------------------------------------------------------
  renderCustomView(options) {
    if (this.title) {
      this.title.innerText = 'Custom Server Configurator';
    }

    this.currentMode = options.mode === 'perf' ? 'perf' : 'budget';
    this.customRam = 16;

    const initialPrice = this.getAutomatedPrice(this.customRam, this.currentMode);
    const initialCpu = this.getAutomatedCpu(this.customRam, this.currentMode);
    const initialDisk = this.getAutomatedDisk(this.customRam, this.currentMode);

    this.modalBody.innerHTML = `
      <!-- Tier Switcher Pill: Budget (₹9/GB) vs Performance (₹18/GB) -->
      <div>
        <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">
          Select Hardware Architecture
        </div>
        <div class="modal-tier-switcher" role="tablist">
          <button class="modal-tier-tab ${this.currentMode === 'budget' ? 'active' : ''}" id="modalTierBudget">
            <span>BUDGET (₹9/GB RAM)</span>
          </button>
          <button class="modal-tier-tab ${this.currentMode === 'perf' ? 'active' : ''}" id="modalTierPerf">
            <span>PERFORMANCE (₹18/GB RAM)</span>
          </button>
        </div>
      </div>

      <!-- Single Master Memory Slider -->
      <div class="slider-group">
        <div class="slider-header">
          <span class="label">Memory Allocation (ECC RAM)</span>
          <span class="value" id="customRamDisplay">${this.customRam} GB RAM</span>
        </div>
        <input type="range" class="range-slider" id="customRamSlider" min="2" max="128" step="2" value="${this.customRam}">
      </div>

      <!-- Automated CPU & Disk Readouts -->
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Automated Hardware Scaling</span>
          <span class="auto-badge">Proportionate to RAM</span>
        </div>
        <div class="modal-auto-specs">
          <div class="modal-auto-cell">
            <span class="modal-spec-cell-label">Automated CPU Allocation</span>
            <span class="modal-spec-cell-val" id="customCpuDisplay">${initialCpu}</span>
          </div>
          <div class="modal-auto-cell">
            <span class="modal-spec-cell-label">Automated Flash Storage</span>
            <span class="modal-spec-cell-val" id="customDiskDisplay">${initialDisk}</span>
          </div>
        </div>
      </div>

      <!-- Real-time Pricing Box -->
      <div class="modal-calc-box">
        <div>
          <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted);" id="customRateFormula">
            RATE: ₹${this.currentMode === 'perf' ? '18' : '9'} / GB RAM
          </div>
          <div class="calc-price">₹<span id="customCalcPrice">${initialPrice}</span> <span class="unit">/month</span></div>
        </div>
        <button class="btn btn-secondary btn-sm" id="modalCopyBtn">Copy Specs</button>
      </div>

      <div>
        <label for="contactHandle" style="display: block; font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 6px;">
          Discord Tag / Email Address
        </label>
        <input type="text" id="contactHandle" class="modal-input-field" placeholder="e.g. user#1234 or you@domain.com">
      </div>

      <div id="modalFeedback" style="font-family: var(--font-mono); font-size: 0.85rem; text-align: center; min-height: 20px;"></div>
    `;

    this.modalFooter.innerHTML = `
      <button class="btn btn-secondary btn-sm" id="modalCancelBtn">Cancel</button>
      <button class="btn btn-primary btn-sm btn-glow" id="modalSubmitBtn">Submit Custom Quote Request</button>
    `;

    this.bindCustomViewEvents();
    this.updateCustomCalculations();
  }

  bindCustomViewEvents() {
    const tabBudget = document.getElementById('modalTierBudget');
    const tabPerf = document.getElementById('modalTierPerf');
    const slider = document.getElementById('customRamSlider');

    // Switch to Budget Tier (₹9/GB)
    tabBudget?.addEventListener('click', () => {
      if (this.currentMode === 'budget') return;
      this.currentMode = 'budget';
      tabBudget.classList.add('active');
      tabPerf?.classList.remove('active');
      this.updateCustomCalculations();
    });

    // Switch to Performance Tier (₹18/GB)
    tabPerf?.addEventListener('click', () => {
      if (this.currentMode === 'perf') return;
      this.currentMode = 'perf';
      tabPerf.classList.add('active');
      tabBudget?.classList.remove('active');
      this.updateCustomCalculations();
    });

    // Slider Dragging
    slider?.addEventListener('input', () => {
      this.customRam = parseInt(slider.value, 10);
      this.updateCustomCalculations();
    });

    // Copy Specs button
    document.getElementById('modalCopyBtn')?.addEventListener('click', () => {
      const modeName = this.currentMode === 'perf' ? 'AMD EPYC Performance' : 'Intel Xeon Budget';
      const cpu = this.getAutomatedCpu(this.customRam, this.currentMode);
      const disk = this.getAutomatedDisk(this.customRam, this.currentMode);
      const price = this.getAutomatedPrice(this.customRam, this.currentMode);
      const text = `MINE-X Custom Configuration (${modeName}):\n- Memory: ${this.customRam} GB RAM\n- CPU: ${cpu}\n- Storage: ${disk}\n- Automated Price: ₹${price}/month`;
      navigator.clipboard.writeText(text).then(() => {
        this.showFeedback('Configuration copied to clipboard!', '#00E5FF');
      }).catch(() => {
        this.showFeedback('Copied!', '#00E5FF');
      });
    });

    // Cancel Button
    document.getElementById('modalCancelBtn')?.addEventListener('click', () => this.close());

    // Submit Custom Quote
    document.getElementById('modalSubmitBtn')?.addEventListener('click', () => {
      const handleInput = document.getElementById('contactHandle');
      const handle = handleInput ? handleInput.value.trim() : '';
      if (!handle) {
        this.showFeedback('Please enter your Discord tag or email address.', '#F87171');
        return;
      }
      this.showFeedback('Quote request sent! Our engineers will contact you on Discord/Email shortly.', '#00E5FF');
      setTimeout(() => this.close(), 2200);
    });
  }

  updateCustomCalculations() {
    const ramDisplay = document.getElementById('customRamDisplay');
    const cpuDisplay = document.getElementById('customCpuDisplay');
    const diskDisplay = document.getElementById('customDiskDisplay');
    const priceDisplay = document.getElementById('customCalcPrice');
    const formulaDisplay = document.getElementById('customRateFormula');
    const slider = document.getElementById('customRamSlider');

    const price = this.getAutomatedPrice(this.customRam, this.currentMode);
    const cpu = this.getAutomatedCpu(this.customRam, this.currentMode);
    const disk = this.getAutomatedDisk(this.customRam, this.currentMode);

    // Dynamic glowing track fill
    if (slider) {
      const min = parseFloat(slider.min) || 2;
      const max = parseFloat(slider.max) || 128;
      const pct = Math.max(0, Math.min(100, ((this.customRam - min) / (max - min)) * 100));
      slider.style.background = `linear-gradient(to right, #00E5FF 0%, #0077FF ${pct}%, rgba(255, 255, 255, 0.1) ${pct}%, rgba(255, 255, 255, 0.1) 100%)`;
    }

    if (ramDisplay) ramDisplay.innerText = `${this.customRam} GB RAM`;
    if (cpuDisplay) cpuDisplay.innerText = cpu;
    if (diskDisplay) diskDisplay.innerText = disk;

    if (priceDisplay) {
      priceDisplay.innerText = `${price}`;
      // Smooth tactile pop micro-animation
      priceDisplay.classList.remove('num-pop');
      void priceDisplay.offsetWidth;
      priceDisplay.classList.add('num-pop');
    }

    if (formulaDisplay) {
      formulaDisplay.innerText = `RATE: ₹${this.currentMode === 'perf' ? '18' : '9'} / GB RAM`;
    }
  }

  showFeedback(msg, color = '#00E5FF') {
    const feedback = document.getElementById('modalFeedback');
    if (feedback) {
      feedback.innerText = msg;
      feedback.style.color = color;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.minexModal = new QuoteModal();
});
