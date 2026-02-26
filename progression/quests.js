window.GTModules = window.GTModules || {};

window.GTModules.quests = (function createQuestsModule() {
  const DAILY_QUESTS = [
    {
      id: "break_50_blocks",
      label: "Break 50 blocks",
      target: 50,
      event: "break_block",
      rewards: { gems: 60 }
    },
    {
      id: "visit_3_worlds",
      label: "Visit 3 worlds",
      target: 3,
      event: "visit_world",
      rewards: { cosmeticId: "cloth_tunic", cosmeticAmount: 1 }
    },
    {
      id: "trade_once",
      label: "Trade once",
      target: 1,
      event: "trade_complete",
      rewards: { titleId: "trader", titleAmount: 1, gems: 25 }
    }
  ];
  const OTHER_QUESTS = [
    {
      id: "break_500_blocks_total",
      label: "Break 500 blocks",
      target: 500,
      event: "break_block",
      category: "other",
      rewards: { gems: 220 }
    },
    {
      id: "visit_25_worlds_total",
      label: "Visit 25 worlds",
      target: 25,
      event: "visit_world",
      category: "other",
      rewards: { titleId: "traveler", titleAmount: 1, gems: 120 }
    },
    {
      id: "trade_10_times_total",
      label: "Trade 10 times",
      target: 10,
      event: "trade_complete",
      category: "other",
      rewards: { cosmeticId: "swift_sneakers", cosmeticAmount: 1, gems: 140 }
    }
  ];
  const ALL_QUESTS = DAILY_QUESTS
    .map((q) => ({ ...q, category: "daily" }))
    .concat(OTHER_QUESTS.map((q) => ({ ...q, category: "other" })));

  function toInt(value, fallback) {
    const n = Math.floor(Number(value));
    return Number.isFinite(n) ? n : fallback;
  }

  function dayKeyFromTs(ts) {
    const date = new Date(Number(ts) || Date.now());
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, "0");
    const d = String(date.getUTCDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }

  function buildFresh(dayKey) {
    const key = String(dayKey || dayKeyFromTs(Date.now()));
    const quests = {};
    const globalQuests = {};
    for (let i = 0; i < DAILY_QUESTS.length; i++) {
      const def = DAILY_QUESTS[i];
      quests[def.id] = { progress: 0, completed: false, rewarded: false };
    }
    for (let i = 0; i < OTHER_QUESTS.length; i++) {
      const def = OTHER_QUESTS[i];
      globalQuests[def.id] = { progress: 0, completed: false, rewarded: false };
    }
    return {
      dayKey: key,
      quests,
      globalQuests,
      visitedWorlds: {},
      updatedAt: 0
    };
  }

  function normalizeQuestRow(def, row) {
    const data = row && typeof row === "object" ? row : {};
    const target = Math.max(1, Number(def && def.target) || 1);
    const progress = Math.max(0, Math.min(target, toInt(data.progress, 0)));
    return {
      progress,
      completed: Boolean(data.completed) || progress >= target,
      rewarded: Boolean(data.rewarded)
    };
  }

  function normalizeState(raw, nowTs) {
    const today = dayKeyFromTs(nowTs);
    const src = raw && typeof raw === "object" ? raw : {};
    const srcDay = String(src.dayKey || "");
    const base = srcDay === today ? src : buildFresh(today);
    const out = buildFresh(today);
    if (srcDay === today) {
      const rawVisited = base.visitedWorlds && typeof base.visitedWorlds === "object" ? base.visitedWorlds : {};
      const visited = {};
      Object.keys(rawVisited).forEach((worldId) => {
        const id = String(worldId || "").trim().toLowerCase();
        if (!id) return;
        if (!rawVisited[worldId]) return;
        visited[id] = true;
      });
      out.visitedWorlds = visited;
      const srcQuests = base.quests && typeof base.quests === "object" ? base.quests : {};
      for (let i = 0; i < DAILY_QUESTS.length; i++) {
        const def = DAILY_QUESTS[i];
        out.quests[def.id] = normalizeQuestRow(def, srcQuests[def.id]);
      }
    }
    const srcGlobal = src && src.globalQuests && typeof src.globalQuests === "object" ? src.globalQuests : {};
    for (let i = 0; i < OTHER_QUESTS.length; i++) {
      const def = OTHER_QUESTS[i];
      out.globalQuests[def.id] = normalizeQuestRow(def, srcGlobal[def.id]);
    }
    out.updatedAt = toInt(base.updatedAt, 0);
    const visitQuest = out.quests.visit_3_worlds;
    if (visitQuest) {
      const worldCount = Object.keys(out.visitedWorlds).length;
      visitQuest.progress = Math.max(visitQuest.progress, Math.min(3, worldCount));
      if (visitQuest.progress >= 3) {
        visitQuest.completed = true;
      }
    }
    return out;
  }

  function buildPayload(state) {
    return normalizeState(state || {}, Date.now());
  }

  function applyEvent(currentState, eventType, payload) {
    const type = String(eventType || "");
    const details = payload && typeof payload === "object" ? payload : {};
    const state = normalizeState(currentState || {}, Date.now());
    const completedNow = [];
    let changed = false;

    for (let i = 0; i < ALL_QUESTS.length; i++) {
      const def = ALL_QUESTS[i];
      const row = def.category === "daily" ? state.quests[def.id] : state.globalQuests[def.id];
      if (!row || row.completed) continue;
      if (def.event !== type) continue;

      if (type === "break_block") {
        const delta = Math.max(1, toInt(details.count, 1));
        const next = Math.min(def.target, row.progress + delta);
        if (next !== row.progress) {
          row.progress = next;
          changed = true;
        }
      } else if (type === "visit_world") {
        if (def.category === "daily") {
          const worldId = String(details.worldId || "").trim().toLowerCase();
          if (worldId && !state.visitedWorlds[worldId]) {
            state.visitedWorlds[worldId] = true;
            changed = true;
          }
          const count = Math.min(def.target, Object.keys(state.visitedWorlds).length);
          if (count !== row.progress) {
            row.progress = count;
            changed = true;
          }
        } else {
          const delta = Math.max(1, toInt(details.count, 1));
          const next = Math.min(def.target, row.progress + delta);
          if (next !== row.progress) {
            row.progress = next;
            changed = true;
          }
        }
      } else if (type === "trade_complete") {
        const delta = Math.max(1, toInt(details.count, 1));
        const next = Math.min(def.target, row.progress + delta);
        if (next !== row.progress) {
          row.progress = next;
          changed = true;
        }
      }

      if (row.progress >= def.target && !row.completed) {
        row.completed = true;
        completedNow.push(def.id);
        changed = true;
      }
    }

    if (changed) {
      state.updatedAt = Date.now();
    }
    return { state, changed, completedNow };
  }

  function markRewarded(currentState, questId) {
    const state = normalizeState(currentState || {}, Date.now());
    const id = String(questId || "");
    if (!id) return { state, changed: false };
    let row = null;
    if (state.quests[id]) row = state.quests[id];
    else if (state.globalQuests[id]) row = state.globalQuests[id];
    if (!row) return { state, changed: false };
    if (row.rewarded) return { state, changed: false };
    row.rewarded = true;
    state.updatedAt = Date.now();
    return { state, changed: true };
  }

  function getQuestById(id) {
    const qid = String(id || "");
    for (let i = 0; i < ALL_QUESTS.length; i++) {
      if (ALL_QUESTS[i].id === qid) return ALL_QUESTS[i];
    }
    return null;
  }

  function getCatalog() {
    return ALL_QUESTS.map((q) => ({ ...q, rewards: { ...(q.rewards || {}) } }));
  }

  return {
    dayKeyFromTs,
    normalizeState,
    buildPayload,
    applyEvent,
    markRewarded,
    getQuestById,
    getCatalog
  };
})();
