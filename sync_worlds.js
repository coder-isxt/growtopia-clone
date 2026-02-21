window.GTModules = window.GTModules || {};

window.GTModules.syncWorlds = (function createSyncWorldsModule() {
  function createWorldRefs(db, basePath, worldId) {
    const worldPath = String(basePath || "") + "/worlds/" + String(worldId || "");
    const playersRef = db.ref(worldPath + "/players");
    const blocksRef = db.ref(worldPath + "/blocks");
    const chatRef = db.ref(worldPath + "/chat");
    return {
      worldPath,
      playersRef,
      blocksRef,
      chatRef
    };
  }

  function createChatFeed(chatRef, startedAtMs, limit) {
    const safeLimit = Math.max(20, Math.min(300, Number(limit) || 100));
    const since = Number(startedAtMs) || 0;
    if (since > 0) {
      return chatRef.orderByChild("createdAt").startAt(since).limitToLast(safeLimit);
    }
    return chatRef.limitToLast(safeLimit);
  }

  function computeWorldOccupancy(globalPlayersRaw, normalizeWorldId) {
    const occupancy = new Map();
    const source = globalPlayersRaw || {};
    Object.keys(source).forEach((id) => {
      const player = source[id];
      if (!player || !player.world) return;
      const wid = typeof normalizeWorldId === "function"
        ? normalizeWorldId(player.world)
        : String(player.world || "").toLowerCase().trim();
      if (!wid) return;
      occupancy.set(wid, (occupancy.get(wid) || 0) + 1);
    });
    return occupancy;
  }

  return {
    createWorldRefs,
    createChatFeed,
    computeWorldOccupancy
  };
})();

