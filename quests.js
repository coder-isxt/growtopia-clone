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
    for (let i = 0; i < DAILY_QUESTS.length; i++) {
      const def = DAILY_QUESTS[i];
      quests[def.id] = { progress: 0, completed: false, rewarded: false };
    }
    return {
      dayKey: key,
      quests,
      visitedWorlds: {},
      updatedAt: 0
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
        const row = srcQuests[def.id] || {};
        const progress = Math.max(0, Math.min(def.target, toInt(row.progress, 0)));
        out.quests[def.id] = {
          progress,
          completed: Boolean(row.completed) || progress >= def.target,
          rewarded: Boolean(row.rewarded)
        };
      }
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

    for (let i = 0; i < DAILY_QUESTS.length; i++) {
      const def = DAILY_QUESTS[i];
      const row = state.quests[def.id];
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
      } else if (type === "trade_complete") {
        row.progress = Math.min(def.target, row.progress + 1);
        changed = true;
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
    if (!id || !state.quests[id]) return { state, changed: false };
    if (state.quests[id].rewarded) return { state, changed: false };
    state.quests[id].rewarded = true;
    state.updatedAt = Date.now();
    return { state, changed: true };
  }

  function getQuestById(id) {
    const qid = String(id || "");
    for (let i = 0; i < DAILY_QUESTS.length; i++) {
      if (DAILY_QUESTS[i].id === qid) return DAILY_QUESTS[i];
    }
    return null;
  }

  function getCatalog() {
    return DAILY_QUESTS.map((q) => ({ ...q, rewards: { ...(q.rewards || {}) } }));
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
