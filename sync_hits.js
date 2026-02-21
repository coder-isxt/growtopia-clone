window.GTModules = window.GTModules || {};

window.GTModules.syncHits = (function createSyncHitsModule() {
  function createWorldHitsRef(db, basePath, worldId) {
    if (!db || !basePath || !worldId) return null;
    return db.ref(String(basePath) + "/worlds/" + String(worldId) + "/hits");
  }

  function normalizeHitRecord(value) {
    if (!value || typeof value !== "object") return null;
    const hits = Math.max(0, Math.floor(Number(value.hits) || 0));
    const updatedAt = Number(value.updatedAt) || 0;
    if (hits <= 0) return null;
    return {
      hits,
      updatedAt
    };
  }

  function buildHitPayload(hits) {
    const safeHits = Math.max(0, Math.floor(Number(hits) || 0));
    if (safeHits <= 0) return null;
    return {
      hits: safeHits,
      updatedAt: (typeof firebase !== "undefined" && firebase.database && firebase.database.ServerValue)
        ? firebase.database.ServerValue.TIMESTAMP
        : Date.now()
    };
  }

  return {
    createWorldHitsRef,
    normalizeHitRecord,
    buildHitPayload
  };
})();
