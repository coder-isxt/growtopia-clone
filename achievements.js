window.GTModules = window.GTModules || {};

window.GTModules.achievements = (function createAchievementsModule() {
  const CATALOG = [
    {
      id: "first_trade",
      label: "First Trade",
      target: 1,
      metric: "trades",
      event: "trade_complete"
    },
    {
      id: "first_world_lock",
      label: "First World Lock",
      target: 1,
      metric: "worldLocks",
      event: "world_lock_placed"
    },
    {
      id: "harvest_100_trees",
      label: "Harvest 100 Trees",
      target: 100,
      metric: "treesHarvested",
      event: "tree_harvest"
    },
    {
      id: "earn_10k_gems",
      label: "Earn 10,000 Gems",
      target: 10000,
      metric: "gemsEarned",
      event: "gems_earned"
    }
  ];

  function toInt(value, fallback) {
    const n = Math.floor(Number(value));
    return Number.isFinite(n) ? n : fallback;
  }

  function makeFresh() {
    const achievements = {};
    for (let i = 0; i < CATALOG.length; i++) {
      const row = CATALOG[i];
      achievements[row.id] = { progress: 0, completed: false };
    }
    return {
      achievements,
      stats: {
        trades: 0,
        worldLocks: 0,
        treesHarvested: 0,
        gemsEarned: 0
      },
      updatedAt: 0
    };
  }

  function normalizeState(raw) {
    const src = raw && typeof raw === "object" ? raw : {};
    const base = makeFresh();
    const stats = src.stats && typeof src.stats === "object" ? src.stats : {};
    base.stats.trades = Math.max(0, toInt(stats.trades, 0));
    base.stats.worldLocks = Math.max(0, toInt(stats.worldLocks, 0));
    base.stats.treesHarvested = Math.max(0, toInt(stats.treesHarvested, 0));
    base.stats.gemsEarned = Math.max(0, toInt(stats.gemsEarned, 0));
    const rows = src.achievements && typeof src.achievements === "object" ? src.achievements : {};

    for (let i = 0; i < CATALOG.length; i++) {
      const def = CATALOG[i];
      const row = rows[def.id] || {};
      const statValue = Math.max(0, toInt(base.stats[def.metric], 0));
      const progress = Math.max(0, Math.min(def.target, Math.max(statValue, toInt(row.progress, 0))));
      base.achievements[def.id] = {
        progress,
        completed: Boolean(row.completed) || progress >= def.target
      };
    }
    base.updatedAt = Math.max(0, toInt(src.updatedAt, 0));
    return base;
  }

  function buildPayload(state) {
    return normalizeState(state || {});
  }

  function getAchievementById(id) {
    const safe = String(id || "");
    for (let i = 0; i < CATALOG.length; i++) {
      if (CATALOG[i].id === safe) return CATALOG[i];
    }
    return null;
  }

  function summarize(state) {
    const normalized = normalizeState(state || {});
    let completed = 0;
    for (let i = 0; i < CATALOG.length; i++) {
      const id = CATALOG[i].id;
      if (normalized.achievements[id] && normalized.achievements[id].completed) {
        completed += 1;
      }
    }
    return {
      completed,
      total: CATALOG.length
    };
  }

  function applyEvent(currentState, eventType, payload) {
    const type = String(eventType || "");
    const info = payload && typeof payload === "object" ? payload : {};
    const state = normalizeState(currentState || {});
    let changed = false;
    const unlockedNow = [];

    if (type === "trade_complete") {
      state.stats.trades = Math.max(0, state.stats.trades + 1);
      changed = true;
    } else if (type === "world_lock_placed") {
      state.stats.worldLocks = Math.max(0, state.stats.worldLocks + 1);
      changed = true;
    } else if (type === "tree_harvest") {
      const count = Math.max(1, toInt(info.count, 1));
      state.stats.treesHarvested = Math.max(0, state.stats.treesHarvested + count);
      changed = true;
    } else if (type === "gems_earned") {
      const amount = Math.max(0, toInt(info.amount, 0));
      if (amount > 0) {
        state.stats.gemsEarned = Math.max(0, state.stats.gemsEarned + amount);
        changed = true;
      }
    }

    if (!changed) {
      return { state, changed: false, unlockedNow };
    }

    for (let i = 0; i < CATALOG.length; i++) {
      const def = CATALOG[i];
      const row = state.achievements[def.id];
      if (!row) continue;
      const statValue = Math.max(0, toInt(state.stats[def.metric], 0));
      const next = Math.min(def.target, statValue);
      if (next !== row.progress) row.progress = next;
      if (!row.completed && row.progress >= def.target) {
        row.completed = true;
        unlockedNow.push(def.id);
      }
    }
    state.updatedAt = Date.now();
    return { state, changed: true, unlockedNow };
  }

  function getCatalog() {
    return CATALOG.map((row) => ({ ...row }));
  }

  return {
    normalizeState,
    buildPayload,
    applyEvent,
    getCatalog,
    getAchievementById,
    summarize
  };
})();
