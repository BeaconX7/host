/**
 * SHADOWNODE - Pricing Render & Tab Switcher Engine
 * Dynamic rendering for Minecraft Budget vs Premium and VPS Intel vs AMD
 * Direct Discord "Join to Buy" integration
 */

class PricingEngine {
  constructor() {
    this.mcContainer = document.getElementById('minecraftPlansGrid');
    this.vpsContainer = document.getElementById('vpsPlansGrid');

    this.mcTabBudget = document.getElementById('tabMcBudget');
    this.mcTabPerf = document.getElementById('tabMcPerf');
    this.mcHardwareBadge = document.getElementById('mcHardwareBadge');

    // Support both new tab IDs and legacy IDs for seamless backward compatibility
    this.vpsTabIntel = document.getElementById('tabVpsIntel') || document.getElementById('tabVpsGold');
    this.vpsTabAmd = document.getElementById('tabVpsAmd') || document.getElementById('tabVpsBudget');
    this.vpsHardwareBadge = document.getElementById('vpsHardwareBadge');

    this.currentMcMode = 'budget'; // 'budget' or 'premium'
    this.currentVpsMode = 'intel'; // 'intel' or 'amd'

    this.discordUrl = (MINEX_DATA.brand && MINEX_DATA.brand.discord) || "https://discord.gg/qsGp3FyNAK";

    this.init();
  }

  init() {
    this.renderMinecraftPlans(this.currentMcMode);
    this.renderVPSPlans(this.currentVpsMode);
    this.bindTabs();
  }

  bindTabs() {
    // Minecraft Tabs (Budget vs Premium)
    if (this.mcTabBudget && this.mcTabPerf) {
      this.mcTabBudget.addEventListener('click', () => {
        if (this.currentMcMode === 'budget') return;
        this.currentMcMode = 'budget';
        this.mcTabBudget.classList.add('active');
        this.mcTabBudget.setAttribute('aria-selected', 'true');
        this.mcTabPerf.classList.remove('active');
        this.mcTabPerf.setAttribute('aria-selected', 'false');
        if (this.mcHardwareBadge) {
          this.mcHardwareBadge.innerHTML = '⚡ Architecture: <span class="highlight">NVMe High-Speed Cloud</span> // Starting from: <span class="highlight">₹44 / Month</span>';
        }
        this.animateGridSwitch(this.mcContainer, () => this.renderMinecraftPlans('budget'));
      });

      this.mcTabPerf.addEventListener('click', () => {
        if (this.currentMcMode === 'premium') return;
        this.currentMcMode = 'premium';
        this.mcTabPerf.classList.add('active');
        this.mcTabPerf.setAttribute('aria-selected', 'true');
        this.mcTabBudget.classList.remove('active');
        this.mcTabBudget.setAttribute('aria-selected', 'false');
        if (this.mcHardwareBadge) {
          this.mcHardwareBadge.innerHTML = '👑 Architecture: <span class="highlight">Extreme High-Clock NVMe</span> // Starting from: <span class="highlight">₹99 / Month</span>';
        }
        this.animateGridSwitch(this.mcContainer, () => this.renderMinecraftPlans('premium'));
      });
    }

    // VPS Tabs (Intel vs AMD)
    if (this.vpsTabIntel && this.vpsTabAmd) {
      this.vpsTabIntel.addEventListener('click', () => {
        if (this.currentVpsMode === 'intel') return;
        this.currentVpsMode = 'intel';
        this.vpsTabIntel.classList.add('active');
        this.vpsTabIntel.setAttribute('aria-selected', 'true');
        this.vpsTabAmd.classList.remove('active');
        this.vpsTabAmd.setAttribute('aria-selected', 'false');
        if (this.vpsHardwareBadge) {
          this.vpsHardwareBadge.innerHTML = '🟦 Architecture: <span class="highlight">Intel High-Performance</span> // <span class="highlight">1Gbps Dedicated Uplink</span>';
        }
        this.animateGridSwitch(this.vpsContainer, () => this.renderVPSPlans('intel'));
      });

      this.vpsTabAmd.addEventListener('click', () => {
        if (this.currentVpsMode === 'amd') return;
        this.currentVpsMode = 'amd';
        this.vpsTabAmd.classList.add('active');
        this.vpsTabAmd.setAttribute('aria-selected', 'true');
        this.vpsTabIntel.classList.remove('active');
        this.vpsTabIntel.setAttribute('aria-selected', 'false');
        if (this.vpsHardwareBadge) {
          this.vpsHardwareBadge.innerHTML = '🟥 Architecture: <span class="highlight">AMD High-Performance</span> // <span class="highlight">1Gbps Dedicated Uplink</span>';
        }
        this.animateGridSwitch(this.vpsContainer, () => this.renderVPSPlans('amd'));
      });
    }
  }

  animateGridSwitch(container, updateCallback) {
    if (!container) return;
    container.style.transition = 'opacity 0.16s ease, transform 0.16s cubic-bezier(0.4, 0, 1, 1)';
    container.style.opacity = '0';
    container.style.transform = 'translateY(10px) scale(0.985)';
    setTimeout(() => {
      updateCallback();
      container.style.transition = 'opacity 0.42s cubic-bezier(0.16, 1, 0.3, 1), transform 0.42s cubic-bezier(0.16, 1, 0.3, 1)';
      container.style.opacity = '1';
      container.style.transform = 'translateY(0) scale(1)';
      if (window.minexCursor && window.minexCursor.initCardTilt) {
        window.minexCursor.initCardTilt();
      }
    }, 160);
  }

  getDiscordIconSvg() {
    return `<svg class="discord-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>`;
  }

  renderMinecraftPlans(mode) {
    if (!this.mcContainer) return;
    const plans = mode === 'budget' ? MINEX_DATA.minecraftBudget : MINEX_DATA.minecraftPremium;
    const discordSvg = this.getDiscordIconSvg();

    this.mcContainer.innerHTML = plans.map((plan, idx) => {
      const isBestValue = plan.badge === 'BEST VALUE' || plan.badge === 'ELITE TIER' || plan.badge === 'MAX POWER';
      const badgeHtml = plan.badge ? `<span class="plan-badge ${isBestValue ? 'best-val' : 'popular'}">${plan.badge}</span>` : '';
      const currency = MINEX_DATA.brand.billingCurrency || '₹';

      return `
        <div class="price-card switch-anim ${isBestValue ? 'best-value' : ''}" 
             data-tier="${plan.tier}"
             style="animation-delay: ${idx * 0.04}s;">
          <div class="card-inner-top">
            <div class="card-header-row">
              <div class="plan-name-group">
                <div class="plan-title-line">
                  <span class="plan-emoji" aria-hidden="true">${plan.emoji || '⚡'}</span>
                  <h3 class="plan-title">${plan.name}</h3>
                </div>
                ${badgeHtml}
              </div>
            </div>
            
            <p class="plan-desc">${plan.desc}</p>

            <div class="card-price-row">
              <div class="price-amount">
                <span class="price-currency">${currency}</span>
                <span class="price-number">${plan.price}</span>
                <span class="price-unit">${plan.period || '/ Month'}</span>
              </div>
            </div>

            <div class="card-specs">
              <div class="spec-item">
                <div class="spec-item-left">
                  <span class="spec-icon" aria-hidden="true">💾</span>
                  <span>RAM Memory</span>
                </div>
                <span class="spec-item-val">${plan.ram}</span>
              </div>
              <div class="spec-item">
                <div class="spec-item-left">
                  <span class="spec-icon" aria-hidden="true">⚙️</span>
                  <span>CPU Power</span>
                </div>
                <span class="spec-item-val">${plan.cpu}</span>
              </div>
              <div class="spec-item">
                <div class="spec-item-left">
                  <span class="spec-icon" aria-hidden="true">💽</span>
                  <span>NVMe Storage</span>
                </div>
                <span class="spec-item-val">${plan.disk}</span>
              </div>
            </div>
          </div>

          <div class="card-footer-action">
            <a href="${this.discordUrl}" target="_blank" rel="noopener noreferrer" class="btn card-cta btn-discord-buy">
              ${discordSvg}
              <span>Join to Buy</span>
            </a>
          </div>
        </div>
      `;
    }).join('');

    if (window.minexCursor) {
      window.minexCursor.initCardTilt();
      window.minexCursor.initMagneticButtons();
    }
  }

  renderVPSPlans(mode) {
    if (!this.vpsContainer) return;
    const plans = mode === 'intel' ? MINEX_DATA.vpsIntel : MINEX_DATA.vpsAmd;
    const discordSvg = this.getDiscordIconSvg();
    const isIntel = mode === 'intel';

    this.vpsContainer.innerHTML = plans.map((plan, idx) => {
      const isBest = plan.badge === 'BEST VALUE' || plan.badge === 'MAX PERFORMANCE' || plan.badge === 'ENTERPRISE';
      const badgeHtml = plan.badge ? `<span class="plan-badge ${isBest ? 'best-val' : 'popular'}">${plan.badge}</span>` : '';
      const currency = MINEX_DATA.brand.billingCurrency || '₹';

      return `
        <div class="price-card switch-anim vps-card ${isBest ? 'best-value' : ''} ${isIntel ? 'vps-intel' : 'vps-amd'}" 
             data-tier="${plan.tier}"
             style="animation-delay: ${idx * 0.05}s;">
          <div class="card-inner-top">
            <div class="card-header-row">
              <div class="plan-name-group">
                <div class="plan-title-line">
                  <span class="plan-emoji" aria-hidden="true">${plan.emoji || (isIntel ? '⚙️' : '🚀')}</span>
                  <h3 class="plan-title">${plan.name}</h3>
                </div>
                ${badgeHtml}
              </div>
            </div>
            
            <p class="plan-desc">${plan.desc}</p>

            <div class="card-price-row">
              <div class="price-amount">
                <span class="price-currency">${currency}</span>
                <span class="price-number">${plan.price}</span>
                <span class="price-unit">${plan.period || '/ Month'}</span>
              </div>
            </div>

            <div class="card-specs">
              <div class="spec-item">
                <div class="spec-item-left">
                  <span class="spec-icon" aria-hidden="true">💾</span>
                  <span>RAM</span>
                </div>
                <span class="spec-item-val">${plan.ram}</span>
              </div>
              <div class="spec-item">
                <div class="spec-item-left">
                  <span class="spec-icon" aria-hidden="true">🧠</span>
                  <span>Processor</span>
                </div>
                <span class="spec-item-val">${plan.cpu}</span>
              </div>
              <div class="spec-item">
                <div class="spec-item-left">
                  <span class="spec-icon" aria-hidden="true">💽</span>
                  <span>Storage</span>
                </div>
                <span class="spec-item-val">${plan.disk}</span>
              </div>
              <div class="spec-item">
                <div class="spec-item-left">
                  <span class="spec-icon" aria-hidden="true">🌐</span>
                  <span>Network</span>
                </div>
                <span class="spec-item-val">${plan.network || '1Gbps'}</span>
              </div>
            </div>
          </div>

          <div class="card-footer-action">
            <a href="${this.discordUrl}" target="_blank" rel="noopener noreferrer" class="btn card-cta btn-discord-buy">
              ${discordSvg}
              <span>Join to Buy</span>
            </a>
          </div>
        </div>
      `;
    }).join('');

    if (window.minexCursor) {
      window.minexCursor.initCardTilt();
      window.minexCursor.initMagneticButtons();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.minexPricing = new PricingEngine();
});
