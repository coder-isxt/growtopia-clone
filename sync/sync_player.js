window.GTModules = window.GTModules || {};

window.GTModules.syncPlayer = (function createSyncPlayerModule() {
  function toInt(value, fallback) {
    const n = Number(value);
    if (!Number.isFinite(n)) return fallback;
    return Math.floor(n);
  }

  function createController(config) {
    const cfg = config || {};
    const playerMinIntervalMs = Math.max(25, toInt(cfg.playerMinIntervalMs, 90));
    const globalMinIntervalMs = Math.max(playerMinIntervalMs, toInt(cfg.globalMinIntervalMs, 220));

    const state = {
      lastPlayerAt: 0,
      lastGlobalAt: 0,
      lastX: Number.NaN,
      lastY: Number.NaN,
      lastFacing: Number.NaN,
      lastWorld: ""
    };

    function reset() {
      state.lastPlayerAt = 0;
      state.lastGlobalAt = 0;
      state.lastX = Number.NaN;
      state.lastY = Number.NaN;
      state.lastFacing = Number.NaN;
      state.lastWorld = "";
    }

    function compute(args) {
      const input = args || {};
      const nowMs = Number(input.nowMs) || 0;
      const force = Boolean(input.force);
      const x = toInt(input.x, 0);
      const y = toInt(input.y, 0);
      const facing = toInt(input.facing, 1);
      const world = String(input.world || "");

      const moved = x !== state.lastX || y !== state.lastY || facing !== state.lastFacing;
      const worldChanged = world !== state.lastWorld;
      if (!force && !moved && !worldChanged) {
        return { writePlayer: false, writeGlobal: false, x, y, facing };
      }

      const canWritePlayer = force || (nowMs - state.lastPlayerAt >= playerMinIntervalMs);
      const canWriteGlobal = force || worldChanged || (nowMs - state.lastGlobalAt >= globalMinIntervalMs);
      if (!canWritePlayer && !canWriteGlobal) {
        return { writePlayer: false, writeGlobal: false, x, y, facing };
      }

      // Commit state only for writes we actually perform.
      state.lastX = x;
      state.lastY = y;
      state.lastFacing = facing;
      state.lastWorld = world;
      if (canWritePlayer) state.lastPlayerAt = nowMs;
      if (canWriteGlobal) state.lastGlobalAt = nowMs;

      return {
        writePlayer: canWritePlayer,
        writeGlobal: canWriteGlobal,
        x,
        y,
        facing
      };
    }

    return {
      reset,
      compute
    };
  }

  function buildPayload(input) {
    const data = input || {};
    const rawTitle = data && data.title && typeof data.title === "object" ? data.title : {};
    const rawTitleStyle = rawTitle && rawTitle.style && typeof rawTitle.style === "object" ? rawTitle.style : {};
    const rawProgression = data && data.progression && typeof data.progression === "object" ? data.progression : {};
    const rawAchievements = data && data.achievements && typeof data.achievements === "object" ? data.achievements : {};
    return {
      name: String(data.name || "").slice(0, 16),
      accountId: String(data.accountId || ""),
      x: toInt(data.x, 0),
      y: toInt(data.y, 0),
      facing: toInt(data.facing, 1),
      cosmetics: {
        shirts: String(data.cosmetics && (data.cosmetics.shirts || data.cosmetics.clothes) || ""),
        pants: String(data.cosmetics && data.cosmetics.pants || ""),
        shoes: String(data.cosmetics && data.cosmetics.shoes || ""),
        hats: String(data.cosmetics && data.cosmetics.hats || ""),
        wings: String(data.cosmetics && data.cosmetics.wings || ""),
        swords: String(data.cosmetics && data.cosmetics.swords || "")
      },
      title: {
        id: String(rawTitle.id || "").slice(0, 32),
        name: String(rawTitle.name || "").slice(0, 24),
        color: String(rawTitle.color || "").slice(0, 24),
        style: {
          bold: Boolean(rawTitleStyle.bold),
          glow: Boolean(rawTitleStyle.glow),
          rainbow: Boolean(rawTitleStyle.rainbow),
          glowColor: String(rawTitleStyle.glowColor || "").slice(0, 24)
        }
      },
      progression: {
        xp: Math.max(0, toInt(rawProgression.xp, 0)),
        level: Math.max(1, toInt(rawProgression.level, 1)),
        xpIntoLevel: Math.max(0, toInt(rawProgression.xpIntoLevel, 0)),
        xpForNext: Math.max(0, toInt(rawProgression.xpForNext, 0))
      },
      achievements: {
        completed: Math.max(0, toInt(rawAchievements.completed, 0)),
        total: Math.max(0, toInt(rawAchievements.total, 0))
      },
      danceUntil: Math.max(0, toInt(data.danceUntil, 0)),
      world: String(data.world || ""),
      updatedAt: data.updatedAt
    };
  }

  return {
    createController,
    buildPayload
  };
})();
