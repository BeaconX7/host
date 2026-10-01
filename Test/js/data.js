/**
 * SHADOWNODE - Centralized Data Store
 * All pricing, hardware specifications, game modes, infrastructure, and policies.
 * Transparent and verified infrastructure metrics.
 */

const MINEX_DATA = {
  brand: {
    name: "ShadowNode",
    fullName: "ShadowNode Hosting",
    tagline: "Power Your World — High Performance Minecraft & VPS Infrastructure",
    discord: "https://discord.gg/qsGp3FyNAK",
    billingCurrency: "₹",
  },

  // ⚡ SHADOW HOST — BUDGET PLANS (8 Plans)
  minecraftBudget: [
    {
      id: "budget-stone",
      name: "Shadow Stone",
      subtitle: "2GB",
      emoji: "🪨",
      tier: "stone",
      price: "44",
      numericPrice: 44,
      period: "/ Month",
      ram: "2GB",
      cpu: "100%",
      disk: "10GB NVMe",
      desc: "Starter NVMe plan for small survival worlds",
      badge: null
    },
    {
      id: "budget-iron",
      name: "Shadow Iron",
      subtitle: "4GB",
      emoji: "⛓️",
      tier: "iron",
      price: "79",
      numericPrice: 79,
      period: "/ Month",
      ram: "4GB",
      cpu: "150%",
      disk: "20GB NVMe",
      desc: "Solid performance for growing player communities",
      badge: null
    },
    {
      id: "budget-gold",
      name: "Shadow Gold",
      subtitle: "8GB",
      emoji: "🪙",
      tier: "gold",
      price: "149",
      numericPrice: 149,
      period: "/ Month",
      ram: "8GB",
      cpu: "250%",
      disk: "40GB NVMe",
      desc: "Best balance of memory and compute for SMP",
      badge: "POPULAR"
    },
    {
      id: "budget-diamond",
      name: "Shadow Diamond",
      subtitle: "12GB",
      emoji: "💎",
      tier: "diamond",
      price: "219",
      numericPrice: 219,
      period: "/ Month",
      ram: "12GB",
      cpu: "350%",
      disk: "60GB NVMe",
      desc: "Enhanced resources for active SMP & plugin servers",
      badge: null
    },
    {
      id: "budget-blaze",
      name: "Shadow Blaze",
      subtitle: "16GB",
      emoji: "🔥",
      tier: "blaze",
      price: "299",
      numericPrice: 299,
      period: "/ Month",
      ram: "16GB",
      cpu: "450%",
      disk: "80GB NVMe",
      desc: "Heavy-duty capability for large communities & events",
      badge: "BEST VALUE"
    },
    {
      id: "budget-obsidian",
      name: "Shadow Obsidian",
      subtitle: "24GB",
      emoji: "⬛",
      tier: "obsidian",
      price: "429",
      numericPrice: 429,
      period: "/ Month",
      ram: "24GB",
      cpu: "600%",
      disk: "120GB NVMe",
      desc: "High capacity node for expansive multiplayer realms",
      badge: null
    },
    {
      id: "budget-king",
      name: "Shadow King",
      subtitle: "32GB",
      emoji: "👑",
      tier: "king",
      price: "579",
      numericPrice: 579,
      period: "/ Month",
      ram: "32GB",
      cpu: "800%",
      disk: "160GB NVMe",
      desc: "Massive memory & 800% CPU for complex game modes",
      badge: null
    },
    {
      id: "budget-ultra",
      name: "Shadow Ultra",
      subtitle: "64GB",
      emoji: "⚡",
      tier: "ultra",
      price: "999",
      numericPrice: 999,
      period: "/ Month",
      ram: "64GB",
      cpu: "1200%",
      disk: "300GB NVMe",
      desc: "Extreme flagship compute for massive server networks",
      badge: "MAX POWER"
    }
  ],

  // 👑 SHADOW HOST — PREMIUM PLANS (8 Plans)
  minecraftPremium: [
    {
      id: "premium-starter",
      name: "Shadow Starter",
      subtitle: "4GB",
      emoji: "🌱",
      tier: "starter",
      price: "99",
      numericPrice: 99,
      period: "/ Month",
      ram: "4GB",
      cpu: "200%",
      disk: "25GB NVMe",
      desc: "Premium single-thread speeds for smooth vanilla & paper",
      badge: null
    },
    {
      id: "premium-plus",
      name: "Shadow Plus",
      subtitle: "8GB",
      emoji: "🔷",
      tier: "plus",
      price: "179",
      numericPrice: 179,
      period: "/ Month",
      ram: "8GB",
      cpu: "300%",
      disk: "50GB NVMe",
      desc: "High tickrate stability for active SMP & modded worlds",
      badge: null
    },
    {
      id: "premium-pro",
      name: "Shadow Pro",
      subtitle: "12GB",
      emoji: "🔮",
      tier: "pro",
      price: "249",
      numericPrice: 249,
      period: "/ Month",
      ram: "12GB",
      cpu: "400%",
      disk: "75GB NVMe",
      desc: "Tuned for heavy plugin setups, cross-play and minigames",
      badge: "POPULAR"
    },
    {
      id: "premium-diamond",
      name: "Shadow Diamond",
      subtitle: "16GB",
      emoji: "💎",
      tier: "diamond",
      price: "319",
      numericPrice: 319,
      period: "/ Month",
      ram: "16GB",
      cpu: "500%",
      disk: "100GB NVMe",
      desc: "High concurrency and modpack optimized architecture",
      badge: null
    },
    {
      id: "premium-blaze",
      name: "Shadow Blaze",
      subtitle: "24GB",
      emoji: "🔥",
      tier: "blaze",
      price: "449",
      numericPrice: 449,
      period: "/ Month",
      ram: "24GB",
      cpu: "700%",
      disk: "150GB NVMe",
      desc: "Blazing throughput for large networks & custom gamemodes",
      badge: "BEST VALUE"
    },
    {
      id: "premium-ultra",
      name: "Shadow Ultra",
      subtitle: "32GB",
      emoji: "⚡",
      tier: "ultra",
      price: "599",
      numericPrice: 599,
      period: "/ Month",
      ram: "32GB",
      cpu: "900%",
      disk: "200GB NVMe",
      desc: "Ultra responsiveness with 900% dedicated compute boost",
      badge: null
    },
    {
      id: "premium-apex",
      name: "Shadow Apex",
      subtitle: "48GB",
      emoji: "🚀",
      tier: "apex",
      price: "799",
      numericPrice: 799,
      period: "/ Month",
      ram: "48GB",
      cpu: "1100%",
      disk: "250GB NVMe",
      desc: "Apex performance tier for competitive gaming clusters",
      badge: null
    },
    {
      id: "premium-ultimate",
      name: "Shadow Ultimate",
      subtitle: "64GB",
      emoji: "👑",
      tier: "ultimate",
      price: "1,299",
      numericPrice: 1299,
      period: "/ Month",
      ram: "64GB",
      cpu: "1400%",
      disk: "350GB NVMe",
      desc: "The pinnacle of server power: 1400% CPU & 350GB NVMe",
      badge: "ELITE TIER"
    }
  ],

  // 🟦 SHADOW NODE — INTEL VPS (4 Plans)
  vpsIntel: [
    {
      id: "vps-intel-16",
      name: "Shadow Intel 16GB",
      subtitle: "16GB RAM",
      emoji: "⚙️",
      tier: "intel-16",
      price: "499",
      numericPrice: 499,
      period: "/ Month",
      ram: "16GB",
      cpu: "Intel",
      disk: "100GB NVMe",
      network: "1Gbps",
      desc: "High clock Intel compute with dedicated 1Gbps uplink",
      badge: null
    },
    {
      id: "vps-intel-32",
      name: "Shadow Intel 32GB",
      subtitle: "32GB RAM",
      emoji: "⚙️",
      tier: "intel-32",
      price: "899",
      numericPrice: 899,
      period: "/ Month",
      ram: "32GB",
      cpu: "Intel",
      disk: "200GB NVMe",
      network: "1Gbps",
      desc: "Balanced memory for database, app and container fleets",
      badge: "POPULAR"
    },
    {
      id: "vps-intel-48",
      name: "Shadow Intel 48GB",
      subtitle: "48GB RAM",
      emoji: "⚙️",
      tier: "intel-48",
      price: "1,199",
      numericPrice: 1199,
      period: "/ Month",
      ram: "48GB",
      cpu: "Intel",
      disk: "300GB NVMe",
      network: "1Gbps",
      desc: "Expansive RAM allocation for multi-service environments",
      badge: null
    },
    {
      id: "vps-intel-64",
      name: "Shadow Intel 64GB",
      subtitle: "64GB RAM",
      emoji: "👑",
      tier: "intel-64",
      price: "1,499",
      numericPrice: 1499,
      period: "/ Month",
      ram: "64GB",
      cpu: "Intel",
      disk: "400GB NVMe",
      network: "1Gbps",
      desc: "Flagship Intel virtual node with 400GB NVMe flash",
      badge: "ENTERPRISE"
    }
  ],

  // 🟥 SHADOW HOST — AMD VPS (4 Plans)
  vpsAmd: [
    {
      id: "vps-amd-16",
      name: "Shadow AMD 16GB",
      subtitle: "16GB RAM",
      emoji: "🚀",
      tier: "amd-16",
      price: "549",
      numericPrice: 549,
      period: "/ Month",
      ram: "16GB",
      cpu: "AMD",
      disk: "100GB NVMe",
      network: "1Gbps",
      desc: "High IPC AMD architecture with dedicated 1Gbps network",
      badge: null
    },
    {
      id: "vps-amd-32",
      name: "Shadow AMD 32GB",
      subtitle: "32GB RAM",
      emoji: "🚀",
      tier: "amd-32",
      price: "999",
      numericPrice: 999,
      period: "/ Month",
      ram: "32GB",
      cpu: "AMD",
      disk: "200GB NVMe",
      network: "1Gbps",
      desc: "Exceptional multithread throughput for modern workloads",
      badge: "BEST VALUE"
    },
    {
      id: "vps-amd-48",
      name: "Shadow AMD 48GB",
      subtitle: "48GB RAM",
      emoji: "🚀",
      tier: "amd-48",
      price: "1,299",
      numericPrice: 1299,
      period: "/ Month",
      ram: "48GB",
      cpu: "AMD",
      disk: "300GB NVMe",
      network: "1Gbps",
      desc: "Heavy-duty computational prowess with 300GB NVMe",
      badge: null
    },
    {
      id: "vps-amd-64",
      name: "Shadow AMD 64GB",
      subtitle: "64GB RAM",
      emoji: "👑",
      tier: "amd-64",
      price: "1,599",
      numericPrice: 1599,
      period: "/ Month",
      ram: "64GB",
      cpu: "AMD",
      disk: "400GB NVMe",
      network: "1Gbps",
      desc: "Ultimate AMD virtual powerhouse with 400GB NVMe",
      badge: "MAX PERFORMANCE"
    }
  ],

  // Features list
  features: [
    {
      id: "hardware",
      icon: "cpu",
      title: "HIGH PERFORMANCE HARDWARE",
      subtitle: "AMD & Intel Silicon",
      desc: "Top-tier single-threaded turbo clock speeds engineered specifically for sub-tick Minecraft loop frequencies and intense virtual compute."
    },
    {
      id: "storage",
      icon: "hard-drive",
      title: "PCIe GEN4 NVMe STORAGE",
      subtitle: "7,000+ MB/s Read & Write",
      desc: "Ultra-fast NVMe flash arrays in RAID configuration ensure instantaneous chunk generation, zero read-lag, and rapid world saving."
    },
    {
      id: "ddos",
      icon: "shield-check",
      title: "ALWAYS-ON DDoS PROTECTION",
      subtitle: "Multi-Terabit Scrubbing",
      desc: "Enterprise Layer 3/4 and Layer 7 intelligent mitigation filters malicious traffic at the edge before it can touch your gaming port."
    },
    {
      id: "deployment",
      icon: "zap",
      title: "FAST AUTOMATED DEPLOYMENT",
      subtitle: "Ready in Under 60 Seconds",
      desc: "Our automated provisioning orchestrator spins up your containerized environment immediately upon order setup."
    },
    {
      id: "panel",
      icon: "sliders",
      title: "PTERODACTYL CONTROL PANEL",
      subtitle: "Intuitive Server Management",
      desc: "Clean, responsive dashboard equipped with real-time web console, file browser, scheduled restarts, backup managers, and sub-user access."
    },
    {
      id: "support",
      icon: "headphones",
      title: "RELIABLE 24/7 SUPPORT",
      subtitle: "Direct Gaming Engineers",
      desc: "Direct access to knowledgeable technicians through our official Discord community who actually understand server setups."
    },
    {
      id: "scalability",
      icon: "trending-up",
      title: "SCALABLE COMPUTE RESOURCES",
      subtitle: "Seamless Plan Upgrades",
      desc: "Upgrade your RAM, CPU, or NVMe storage dynamically without IP address changes or data migration headaches."
    },
    {
      id: "backups",
      icon: "database-backup",
      title: "AUTOMATED OFFSITE BACKUPS",
      subtitle: "Redundant Snapshot Retention",
      desc: "Scheduled snapshot retention safely stored in independent off-site backup storage for effortless single-click rollbacks."
    }
  ],

  gameModes: [
    {
      name: "SURVIVAL",
      icon: "pickaxe",
      tagline: "SMP & Vanilla Worlds",
      desc: "Optimized for SMP, Vanilla, and economy survival communities with advanced entity culling and chunk streaming.",
      recPlan: "Shadow Stone / Iron (2 - 4 GB RAM)",
      plugins: "CoreProtect, EssentialsX, GriefPrevention, WorldGuard"
    },
    {
      name: "FACTIONS",
      icon: "shield",
      tagline: "High-Action PvP & Raids",
      desc: "Engineered for intense cannoning, massive TNT physics explosions, and concurrent faction warfare without TPS drops.",
      recPlan: "Shadow Blaze / Obsidian (16 - 24 GB RAM)",
      plugins: "FactionsUUID, SaberFactions, Cannons, CombatLog"
    },
    {
      name: "KINGDOMS",
      icon: "crown",
      tagline: "Diplomacy, RPG & Dynmap",
      desc: "Heavy plugin loads, territory databases, custom quests, and web-based dynmaps running smoothly with isolated ECC RAM.",
      recPlan: "Shadow King / Ultra (32 - 64 GB RAM)",
      plugins: "Towny, KingdomsX, Dynmap, MythicMobs"
    },
    {
      name: "SKYBLOCK",
      icon: "cloud",
      tagline: "Island Generation & Economics",
      desc: "Sub-millisecond island generation, cross-island visit routing, automatic mob hoppers, and custom minion loops.",
      recPlan: "Shadow Gold / Diamond (8 - 12 GB RAM)",
      plugins: "BentoBox, SuperiorSkyblock, UltraMinions, ShopGUI+"
    },
    {
      name: "MINIGAMES",
      icon: "gamepad-2",
      tagline: "Fast Arenas & Lobby Routing",
      desc: "Rapid arena resets, sub-tick networking, and Velocity/BungeeCord proxy support for Bedwars, Skywars, and Duels.",
      recPlan: "Shadow King / Ultra (32 - 64 GB RAM)",
      plugins: "Bedwars1058, ArenaRegen, Velocity, Citizens"
    },
    {
      name: "PRISON",
      icon: "lock",
      tagline: "Auto-Sell & High Mine Resets",
      desc: "Massive block break events, Fortune 1000+ calculations, asynchronous mine resets, and instant rankup databases.",
      recPlan: "Shadow Blaze / Obsidian (16 - 24 GB RAM)",
      plugins: "UltraPrisonCore, AutoSell, JetsMiners, MineResetLite"
    },
    {
      name: "CREATIVE",
      icon: "compass",
      tagline: "Mega Plots & Async WorldEdit",
      desc: "Large plot worlds with async WorldEdit limits, VoxelSniper support, and anti-crash packet safety features.",
      recPlan: "Shadow Gold / Diamond (8 - 12 GB RAM)",
      plugins: "PlotSquared, FastAsyncWorldEdit, VoxelSniper, goBrush"
    },
    {
      name: "CUSTOM",
      icon: "code",
      tagline: "Custom Jars & Heavy Modpacks",
      desc: "Run Forge, Fabric, NeoForge, or proprietary custom Jars with unlimited mod configurations and custom launch flags.",
      recPlan: "Shadow Ultra / Shadow Ultimate (32 - 64 GB RAM)",
      plugins: "All The Mods, Better MC, Custom Core Jars"
    }
  ],

  serverSoftware: [
    { name: "Paper", type: "High Performance Vanilla/Plugin", version: "1.20.x - 1.21.x" },
    { name: "Purpur", type: "Extremely Configurable Paper Fork", version: "Latest" },
    { name: "Spigot", type: "Classic CraftBukkit Evolution", version: "All Versions" },
    { name: "Fabric", type: "Lightweight Modular Modding", version: "All Versions" },
    { name: "Forge", type: "Extensive Heavy Modding Platform", version: "1.7.10 - 1.21.x" },
    { name: "Bedrock", type: "Native Bedrock Dedicated Server", version: "Cross-Play" },
    { name: "Velocity", type: "Next-Gen Ultra Fast Proxy", version: "Recommended" },
    { name: "BungeeCord", type: "Classic Minecraft Network Proxy", version: "Universal" }
  ],

  infrastructure: {
    specs: [
      { label: "PROCESSORS", title: "AMD & INTEL HIGH FREQUENCY", desc: "Extreme single-core turbo clocks engineered for high server tick rate and computing." },
      { label: "MEMORY", title: "DDR4 / DDR5 ECC", desc: "Error-correcting high frequency enterprise RAM ensuring zero memory corruption." },
      { label: "STORAGE", title: "ENTERPRISE NVMe", desc: "RAID-protected NVMe flash arrays delivering 7,000+ MB/s lightning read/write speeds." },
      { label: "NETWORK", title: "1Gbps DEDICATED UPLINK", desc: "Redundant upstream transit providers with automated low-latency path routing." },
      { label: "SECURITY", title: "3.2+ Tbps SCRUBBING", desc: "Always-on hardware scrubbing filters attacks before they reach your port." }
    ],
    locations: [
      { code: "MUM", name: "Mumbai, IN", ping: "8ms", status: "Optimal" },
      { code: "SGP", name: "Singapore, SG", ping: "28ms", status: "Optimal" },
      { code: "FRA", name: "Frankfurt, DE", ping: "98ms", status: "Optimal" },
      { code: "DAL", name: "Dallas, US", ping: "142ms", status: "Optimal" }
    ]
  },

  stats: [
    { value: 3.2, suffix: "+ Tbps", label: "DDOS FILTERING CAPACITY" },
    { value: 44, suffix: " ₹/Mo", label: "STARTING AFFORDABILITY" },
    { value: 99.98, suffix: "%", label: "GUARANTEED UPTIME SLA" },
    { value: 20, suffix: ".00", label: "STABLE TICK RATE (TPS)" }
  ],

  policy: [
    {
      icon: "clock",
      title: "24-48h Refund Guarantee",
      desc: "If our infrastructure fails to meet your performance standards within 24-48 hours of initial order, request a hassle-free refund through support."
    },
    {
      icon: "shield-alert",
      title: "Transparent Terms",
      desc: "Clear guidelines on hardware fair usage, Minecraft EULA compliance, zero unexpected surcharges, and straightforward renewal pricing."
    },
    {
      icon: "activity",
      title: "99.9% SLA Assurance",
      desc: "Unscheduled node outages exceeding our 99.9% uptime SLA are directly credited to your account balance upon verification."
    }
  ],

  reviews: [
    {
      name: "ShadowCrafter",
      role: "Network Owner (60+ Concurrent Players)",
      stars: 5,
      text: "Moved our SMP network to ShadowNode. Perfect 20.00 TPS during peak hours even with 50+ simultaneous players and complex Redstone farms."
    },
    {
      name: "PixelVanguard",
      role: "Modded Community Admin",
      stars: 5,
      text: "High-clock single-core performance is incredible. Heavy modpacks load cleanly, and the Discord team helped configure everything within minutes."
    },
    {
      name: "KryptonByte",
      role: "VPS Developer & Bot Host",
      stars: 5,
      text: "ShadowNode Intel & AMD VPS provides isolated compute with 1Gbps ports. Docker containers, bots, and databases run at blistering speeds."
    }
  ]
};

// Aliases for backward compatibility
MINEX_DATA.minecraftPerformance = MINEX_DATA.minecraftPremium;
MINEX_DATA.xeonGoldVPS = MINEX_DATA.vpsIntel;
MINEX_DATA.xeonBudgetVPS = MINEX_DATA.vpsAmd;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MINEX_DATA;
}
