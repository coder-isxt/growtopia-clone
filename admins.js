window.GTModules = window.GTModules || {};

window.GTModules.admins = {
  parseDurationToMs(input) {
    const value = String(input || "").trim().toLowerCase();
    const match = value.match(/^(\d+)\s*([smhd])$/);
    if (!match) return 0;
    const amount = Number(match[1]);
    const unit = match[2];
    if (!Number.isFinite(amount) || amount <= 0) return 0;
    const unitMs = unit === "s" ? 1000 : unit === "m" ? 60000 : unit === "h" ? 3600000 : 86400000;
    return amount * unitMs;
  },
  formatRemainingMs(ms) {
    const safe = Math.max(0, Math.floor(Number(ms) || 0));
    if (safe < 60000) return Math.ceil(safe / 1000) + "s";
    if (safe < 3600000) return Math.ceil(safe / 60000) + "m";
    if (safe < 86400000) return Math.ceil(safe / 3600000) + "h";
    return Math.ceil(safe / 86400000) + "d";
  },
  normalizeBanRecord(record) {
    const value = record || {};
    const typeRaw = String(value.type || "").toLowerCase();
    const type = typeRaw === "permanent" ? "permanent" : "temporary";
    const expiresAt = Number(value.expiresAt) || 0;
    return {
      type,
      expiresAt,
      reason: (value.reason || "Banned by admin").toString(),
      bannedBy: (value.bannedBy || "").toString(),
      createdAt: Number(value.createdAt) || 0
    };
  },
  getBanStatus(record, nowMs) {
    if (!record) return { active: false, expired: false, type: "temporary", remainingMs: 0, reason: "" };
    const normalized = this.normalizeBanRecord(record);
    if (normalized.type === "permanent") {
      return { active: true, expired: false, type: "permanent", remainingMs: Infinity, reason: normalized.reason };
    }
    const remainingMs = normalized.expiresAt - Number(nowMs || Date.now());
    if (!normalized.expiresAt || remainingMs <= 0) {
      return { active: false, expired: true, type: "temporary", remainingMs: 0, reason: normalized.reason };
    }
    return { active: true, expired: false, type: "temporary", remainingMs, reason: normalized.reason };
  },
  totalInventoryCount(inv, inventoryIds) {
    if (!inv || typeof inv !== "object") return 0;
    const ids = Array.isArray(inventoryIds) ? inventoryIds : [];
    let total = 0;
    for (const id of ids) {
      total += Math.max(0, Number(inv[id]) || 0);
    }
    return total;
  }
};

