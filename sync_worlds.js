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

  function attachWorldListeners(network, handlers) {
    if (!network || !handlers) return;
    if (network.playersRef && handlers.players) {
      network.playersRef.on("value", handlers.players);
    }
    if (network.blocksRef && handlers.blockAdded) {
      network.blocksRef.on("child_added", handlers.blockAdded);
    }
    if (network.blocksRef && handlers.blockChanged) {
      network.blocksRef.on("child_changed", handlers.blockChanged);
    }
    if (network.blocksRef && handlers.blockRemoved) {
      network.blocksRef.on("child_removed", handlers.blockRemoved);
    }
    if (network.chatFeedRef && handlers.chatAdded) {
      network.chatFeedRef.on("child_added", handlers.chatAdded);
    }
  }

  function detachWorldListeners(network, handlers, removePlayerRef) {
    if (!network) return;
    const h = handlers || {};
    if (network.playersRef && h.players) {
      network.playersRef.off("value", h.players);
    }
    if (network.blocksRef && h.blockAdded) {
      network.blocksRef.off("child_added", h.blockAdded);
    }
    if (network.blocksRef && h.blockChanged) {
      network.blocksRef.off("child_changed", h.blockChanged);
    }
    if (network.blocksRef && h.blockRemoved) {
      network.blocksRef.off("child_removed", h.blockRemoved);
    }
    if (network.chatFeedRef && h.chatAdded) {
      network.chatFeedRef.off("child_added", h.chatAdded);
    }
    if (removePlayerRef && network.playerRef) {
      network.playerRef.remove().catch(() => {});
    }
  }

  function buildWorldHandlers(options) {
    const opts = options || {};
    const remotePlayers = opts.remotePlayers;
    const playerId = String(opts.playerId || "");
    const normalizeCosmetics = typeof opts.normalizeRemoteEquippedCosmetics === "function"
      ? opts.normalizeRemoteEquippedCosmetics
      : (v) => v || {};
    const updateOnlineCount = typeof opts.updateOnlineCount === "function" ? opts.updateOnlineCount : () => {};
    const parseTileKey = typeof opts.parseTileKey === "function" ? opts.parseTileKey : () => null;
    const applyBlockValue = typeof opts.applyBlockValue === "function" ? opts.applyBlockValue : () => {};
    const clearBlockValue = typeof opts.clearBlockValue === "function" ? opts.clearBlockValue : () => {};
    const addChatMessage = typeof opts.addChatMessage === "function" ? opts.addChatMessage : () => {};

    const handlers = {};
    handlers.players = (snapshot) => {
      if (remotePlayers && typeof remotePlayers.clear === "function") {
        remotePlayers.clear();
      }
      const players = snapshot.val() || {};
      Object.keys(players).forEach((id) => {
        if (id === playerId) return;
        const p = players[id];
        if (!p || typeof p.x !== "number" || typeof p.y !== "number") return;
        if (remotePlayers && typeof remotePlayers.set === "function") {
          remotePlayers.set(id, {
            id,
            x: p.x,
            y: p.y,
            facing: p.facing || 1,
            name: (p.name || "Player").toString().slice(0, 16),
            cosmetics: normalizeCosmetics(p.cosmetics || {})
          });
        }
      });
      updateOnlineCount();
    };

    handlers.blockAdded = (snapshot) => {
      const tile = parseTileKey(snapshot.key || "");
      if (!tile) return;
      const id = Number(snapshot.val()) || 0;
      applyBlockValue(tile.tx, tile.ty, id);
    };
    handlers.blockChanged = handlers.blockAdded;
    handlers.blockRemoved = (snapshot) => {
      const tile = parseTileKey(snapshot.key || "");
      if (!tile) return;
      clearBlockValue(tile.tx, tile.ty);
    };
    handlers.chatAdded = (snapshot) => {
      const value = snapshot.val() || {};
      addChatMessage({
        name: (value.name || "Guest").toString().slice(0, 16),
        playerId: (value.playerId || "").toString(),
        sessionId: (value.sessionId || "").toString(),
        text: (value.text || "").toString().slice(0, 120),
        createdAt: typeof value.createdAt === "number" ? value.createdAt : Date.now()
      });
    };
    return handlers;
  }

  return {
    createWorldRefs,
    createChatFeed,
    computeWorldOccupancy,
    attachWorldListeners,
    detachWorldListeners,
    buildWorldHandlers
  };
})();
