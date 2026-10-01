/**
 * MINE-X HOSTING — Signature Continuous Motion + Mouse-Parallax Background Engine
 * 
 * 1. CONTINUOUS AUTONOMOUS MOTION:
 *    Always active even when the mouse is completely still:
 *    - Drifting atmospheric depth
 *    - Floating ambient cyan/blue lightfield
 *    - Slowly crawling technical precision grid
 *    - Floating abstract geometric schematics & buslines
 *    - Drifting network nodes with dynamic connections & glowing signal pulses
 *    - Slowly rising cosmic particles
 * 
 * 2. MOUSE PARALLAX MULTI-DEPTH:
 *    Calibrated layer depths reacting with smooth lerp interpolation:
 *    - Layer 1 (Atmosphere): ~3px
 *    - Layer 2 (Lightfield): ~6px
 *    - Layer 3 (Grid): ~8px
 *    - Layer 4 (Geometric Shapes): ~13px
 *    - Layer 5 (Network Nodes Canvas): ~9px
 *    - Layer 6 (Foreground Particles Canvas): ~16px
 * 
 * Both effects operate SIMULTANEOUSLY for a deep, alive, 2026 infrastructure feel.
 */

class SignatureBackground {
  constructor() {
    this.container = document.querySelector('.bg-experience');
    if (!this.container) return;

    this.layer1 = document.querySelector('.bg-layer-1-atmosphere');
    this.layer2 = document.querySelector('.bg-layer-2-lightfield');
    this.layer3 = document.querySelector('.bg-layer-3-grid');
    this.layer4 = document.querySelector('.bg-layer-4-shapes');
    this.canvasNetwork = document.getElementById('bgNetworkCanvas');
    this.canvasParticles = document.getElementById('bgParticlesCanvas');

    this.ctxNetwork = this.canvasNetwork ? this.canvasNetwork.getContext('2d') : null;
    this.ctxParticles = this.canvasParticles ? this.canvasParticles.getContext('2d') : null;

    // Check reduced motion & device tiers
    this.updateDeviceTier();

    // Mouse coordinates normalized [-1, 1]
    this.targetX = 0;
    this.targetY = 0;
    this.currentX = 0;
    this.currentY = 0;

    // Raw screen mouse position for node interactions
    this.mouseX = -9999;
    this.mouseY = -9999;

    // Calibrated layer parallax intensities (pixels)
    this.speedLayer1 = 3;   // Back atmosphere: 2-4px
    this.speedLayer2 = 6;   // Ambient light: 4-7px
    this.speedLayer3 = 8;   // Technical grid: 6-8px
    this.speedLayer4 = 13;  // Abstract shapes: 10-14px
    this.speedLayer5 = 9;   // Network nodes: 8-10px
    this.speedLayer6 = 16;  // Foreground particles: 12-18px

    // Network topology & distant particles data
    this.nodes = [];
    this.connections = [];
    this.pulses = [];
    this.particles = [];

    this.initCanvasSize();
    this.initData();
    this.bindEvents();
    this.animate(0);
  }

  updateDeviceTier() {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches || ('ontouchstart' in window);
    const width = window.innerWidth;

    if (width < 768 || (isTouch && width <= 768)) {
      this.deviceTier = 'mobile';
      this.numNodes = 10;
      this.numParticles = 16;
      this.maxDistance = 130;
      this.enableParallax = false; // Disable mouse-parallax on mobile
    } else if (width <= 1024) {
      this.deviceTier = 'tablet';
      this.numNodes = 16;
      this.numParticles = 24;
      this.maxDistance = 160;
      this.enableParallax = !isTouch; // Only if fine pointer available
    } else {
      this.deviceTier = 'desktop';
      this.numNodes = 28;
      this.numParticles = 42;
      this.maxDistance = 200;
      this.enableParallax = !this.reducedMotion;
    }
  }

  initCanvasSize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    if (this.canvasNetwork && this.ctxNetwork) {
      this.canvasNetwork.width = this.width * this.dpr;
      this.canvasNetwork.height = this.height * this.dpr;
      this.canvasNetwork.style.width = `${this.width}px`;
      this.canvasNetwork.style.height = `${this.height}px`;
      this.ctxNetwork.scale(this.dpr, this.dpr);
    }

    if (this.canvasParticles && this.ctxParticles) {
      this.canvasParticles.width = this.width * this.dpr;
      this.canvasParticles.height = this.height * this.dpr;
      this.canvasParticles.style.width = `${this.width}px`;
      this.canvasParticles.style.height = `${this.height}px`;
      this.ctxParticles.scale(this.dpr, this.dpr);
    }
  }

  initData() {
    this.nodes = [];
    this.connections = [];
    this.pulses = [];
    this.particles = [];

    // Layer 5 Network Nodes
    for (let i = 0; i < this.numNodes; i++) {
      this.nodes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        radius: Math.random() > 0.8 ? 2.5 : 1.5,
        baseAlpha: 0.25 + Math.random() * 0.4,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    // Connect neighbors initially
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const dx = this.nodes[i].x - this.nodes[j].x;
        const dy = this.nodes[i].y - this.nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.maxDistance) {
          this.connections.push({ from: i, to: j });
          if (Math.random() > 0.6) {
            this.pulses.push({
              from: i,
              to: j,
              progress: Math.random(),
              speed: 0.003 + Math.random() * 0.004
            });
          }
        }
      }
    }

    // Layer 6 Distant Ambient Cosmic Particles
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: -0.12 - Math.random() * 0.2, // subtle upward drift
        size: 0.8 + Math.random() * 1.6,
        alpha: 0.12 + Math.random() * 0.28,
        pulseSpeed: 0.002 + Math.random() * 0.003,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.updateDeviceTier();
      this.initCanvasSize();
      this.initData();
    }, { passive: true });

    // Track mouse on desktop & trackpad
    const onMove = (e) => {
      if (!this.enableParallax || e.pointerType === 'touch') return;
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      this.targetX = (e.clientX - halfW) / halfW;
      this.targetY = (e.clientY - halfH) / halfH;
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });

    document.addEventListener('mouseleave', () => {
      this.targetX = 0;
      this.targetY = 0;
      this.mouseX = -9999;
      this.mouseY = -9999;
    });
  }

  renderCanvases(time) {
    // ----------------------------------------
    // Layer 5: Network Nodes, Connections & Pulses
    // ----------------------------------------
    if (this.ctxNetwork && this.canvasNetwork) {
      this.ctxNetwork.clearRect(0, 0, this.width, this.height);

      // Update and draw nodes
      for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > this.width) node.vx *= -1;
        if (node.y < 0 || node.y > this.height) node.vy *= -1;

        // Subtle reaction to mouse cursor proximity (Connected feel)
        if (this.mouseX > 0 && this.mouseY > 0) {
          const mdx = this.mouseX - node.x;
          const mdy = this.mouseY - node.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 140) {
            // Very gentle nudge towards cursor
            node.x += (mdx / mdist) * 0.15;
            node.y += (mdy / mdist) * 0.15;
          }
        }

        const alpha = node.baseAlpha + Math.sin(time * 0.002 + node.pulseOffset) * 0.15;
        this.ctxNetwork.beginPath();
        this.ctxNetwork.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        this.ctxNetwork.fillStyle = `rgba(168, 85, 247, ${Math.max(0.14, alpha)})`;
        this.ctxNetwork.shadowColor = '#A855F7';
        this.ctxNetwork.shadowBlur = 5;
        this.ctxNetwork.fill();
        this.ctxNetwork.shadowBlur = 0;
      }

      // Draw dynamic proximity lines between nodes
      for (let i = 0; i < this.nodes.length; i++) {
        for (let j = i + 1; j < this.nodes.length; j++) {
          const n1 = this.nodes[i];
          const n2 = this.nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < this.maxDistance) {
            const lineAlpha = (1 - dist / this.maxDistance) * 0.15;
            this.ctxNetwork.beginPath();
            this.ctxNetwork.moveTo(n1.x, n1.y);
            this.ctxNetwork.lineTo(n2.x, n2.y);
            this.ctxNetwork.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
            this.ctxNetwork.lineWidth = 1;
            this.ctxNetwork.stroke();
          }
        }
      }

      // Draw faint line connecting cursor to closest node (Connected feel)
      if (this.mouseX > 0 && this.mouseY > 0) {
        for (let i = 0; i < this.nodes.length; i++) {
          const node = this.nodes[i];
          const dx = this.mouseX - node.x;
          const dy = this.mouseY - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const cursorLineAlpha = (1 - dist / 130) * 0.24;
            this.ctxNetwork.beginPath();
            this.ctxNetwork.moveTo(this.mouseX, this.mouseY);
            this.ctxNetwork.lineTo(node.x, node.y);
            this.ctxNetwork.strokeStyle = `rgba(192, 132, 252, ${cursorLineAlpha})`;
            this.ctxNetwork.lineWidth = 1;
            this.ctxNetwork.stroke();
          }
        }
      }

      // Draw traveling signal pulses
      for (let i = 0; i < this.pulses.length; i++) {
        const pulse = this.pulses[i];
        pulse.progress += pulse.speed;
        if (pulse.progress > 1) pulse.progress = 0;

        const n1 = this.nodes[pulse.from];
        const n2 = this.nodes[pulse.to];
        if (!n1 || !n2) continue;

        const px = n1.x + (n2.x - n1.x) * pulse.progress;
        const py = n1.y + (n2.y - n1.y) * pulse.progress;

        this.ctxNetwork.beginPath();
        this.ctxNetwork.arc(px, py, 1.8, 0, Math.PI * 2);
        this.ctxNetwork.fillStyle = '#FFFFFF';
        this.ctxNetwork.shadowColor = '#C084FC';
        this.ctxNetwork.shadowBlur = 6;
        this.ctxNetwork.fill();
        this.ctxNetwork.shadowBlur = 0;
      }
    }

    // ----------------------------------------
    // Layer 6: Subtle Distant Ambient Particles
    // ----------------------------------------
    if (this.ctxParticles && this.canvasParticles) {
      this.ctxParticles.clearRect(0, 0, this.width, this.height);

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around smoothly
        if (p.x < 0) p.x = this.width;
        if (p.x > this.width) p.x = 0;
        if (p.y < 0) p.y = this.height;
        if (p.y > this.height) p.y = 0;

        const alpha = p.alpha + Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.1;

        this.ctxParticles.beginPath();
        this.ctxParticles.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctxParticles.fillStyle = `rgba(192, 132, 252, ${Math.max(0.08, alpha)})`;
        this.ctxParticles.shadowColor = '#7C3AED';
        this.ctxParticles.shadowBlur = 4;
        this.ctxParticles.fill();
        this.ctxParticles.shadowBlur = 0;
      }
    }
  }

  animate = (time = 0) => {
    // 1. Calculate Continuous Time-Based Autonomous Drift
    // (Active 100% of the time, even when the mouse never moves)
    const drift1X = Math.sin(time * 0.0003) * 8;
    const drift1Y = Math.cos(time * 0.00025) * 6;

    const drift2X = Math.cos(time * 0.0004) * 16;
    const drift2Y = Math.sin(time * 0.00035) * 14;

    const drift3X = Math.sin(time * 0.0003) * 10 + ((time * 0.008) % 52);
    const drift3Y = Math.cos(time * 0.00025) * 8 + ((time * 0.005) % 52);

    const drift4X = Math.sin(time * 0.00045) * 18;
    const drift4Y = Math.cos(time * 0.0004) * 14;

    const drift5X = Math.sin(time * 0.00035) * 6;
    const drift5Y = Math.cos(time * 0.0003) * 6;

    const drift6X = Math.cos(time * 0.0004) * 8;
    const drift6Y = Math.sin(time * 0.00035) * 8;

    // 2. Smooth Lerp Interpolation for Mouse Parallax
    if (this.enableParallax) {
      const lerp = 0.065;
      this.currentX += (this.targetX - this.currentX) * lerp;
      this.currentY += (this.targetY - this.currentY) * lerp;
    } else {
      this.currentX = 0;
      this.currentY = 0;
    }

    // 3. Combine Autonomous Motion + Calibrated Mouse Parallax
    // Layer 1: Back Atmosphere (2-4px)
    if (this.layer1) {
      const x = drift1X + (this.currentX * this.speedLayer1);
      const y = drift1Y + (this.currentY * this.speedLayer1);
      this.layer1.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    }

    // Layer 2: Ambient Lightfield (4-7px)
    if (this.layer2) {
      const x = drift2X + (this.currentX * this.speedLayer2);
      const y = drift2Y + (this.currentY * this.speedLayer2);
      this.layer2.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    }

    // Layer 3: Technical Grid (6-8px)
    if (this.layer3) {
      const x = drift3X + (this.currentX * this.speedLayer3);
      const y = drift3Y + (this.currentY * this.speedLayer3);
      this.layer3.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    }

    // Layer 4: Abstract Geometric Shapes (10-14px)
    if (this.layer4) {
      const x = drift4X + (this.currentX * this.speedLayer4);
      const y = drift4Y + (this.currentY * this.speedLayer4);
      this.layer4.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    }

    // Layer 5: Network Nodes Canvas (8-10px)
    if (this.canvasNetwork) {
      const x = drift5X + (this.currentX * this.speedLayer5);
      const y = drift5Y + (this.currentY * this.speedLayer5);
      this.canvasNetwork.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    }

    // Layer 6: Foreground Particles Canvas (12-18px)
    if (this.canvasParticles) {
      const x = drift6X + (this.currentX * this.speedLayer6);
      const y = drift6Y + (this.currentY * this.speedLayer6);
      this.canvasParticles.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    }

    // 4. Render Canvases
    this.renderCanvases(time);

    requestAnimationFrame(this.animate);
  };
}

document.addEventListener('DOMContentLoaded', () => {
  window.minexBg = new SignatureBackground();
});
