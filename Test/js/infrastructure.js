/**
 * MINE-X HOSTING - Infrastructure Visualization & Location Switcher
 */

class InfrastructureVisualizer {
  constructor() {
    this.locContainer = document.getElementById('infraLocationTabs');
    this.specsContainer = document.getElementById('infraSpecsGrid');
    this.pingDisplay = document.getElementById('infraPingValue');
    this.statusDisplay = document.getElementById('infraStatusValue');

    if (!this.specsContainer) return;
    this.init();
  }

  init() {
    this.renderLocations();
    this.renderSpecs();
  }

  renderLocations() {
    if (!this.locContainer) return;
    const locations = MINEX_DATA.infrastructure.locations;

    this.locContainer.innerHTML = locations.map((loc, idx) => `
      <button class="loc-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}">
        ${loc.name}
      </button>
    `).join('');

    this.locContainer.querySelectorAll('.loc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.locContainer.querySelectorAll('.loc-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        this.updateLocation(locations[idx]);
      });
    });

    // Default to first
    this.updateLocation(locations[0]);
  }

  updateLocation(loc) {
    if (this.pingDisplay) {
      this.pingDisplay.innerText = loc.ping;
    }
    if (this.statusDisplay) {
      this.statusDisplay.innerText = `${loc.status} (Route Verified)`;
    }
  }

  renderSpecs() {
    if (!this.specsContainer) return;
    const specs = MINEX_DATA.infrastructure.specs;

    this.specsContainer.innerHTML = specs.map(spec => `
      <div class="infra-spec-card">
        <span class="infra-spec-label">${spec.label}</span>
        <h4 class="infra-spec-title">${spec.title}</h4>
        <p class="infra-spec-detail">${spec.desc}</p>
      </div>
    `).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.minexInfra = new InfrastructureVisualizer();
});
