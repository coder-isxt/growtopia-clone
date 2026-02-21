window.GTModules = window.GTModules || {};
window.GTModules.admin = {
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
    const safe = Math.max(0, Math.floor(ms));
    if (safe < 60000) return Math.ceil(safe / 1000) + "s";
    if (safe < 3600000) return Math.ceil(safe / 60000) + "m";
    if (safe < 86400000) return Math.ceil(safe / 3600000) + "h";
    return Math.ceil(safe / 86400000) + "d";
  },
  getAuditLevel(action) {
    const key = String(action || "").toLowerCase();
    if (!key) return "info";
    if (key === "permban" || key === "tempban") return "critical";
    if (key === "kick" || key === "resetinv" || key === "clear_logs" || key === "clearaudit") return "warn";
    if (key === "unban") return "success";
    if (key === "setrole" || key === "givex" || key === "giveitem" || key === "tp" || key === "summon" || key === "bring") return "accent";
    return "info";
  },
  getLogLevel(text) {
    const t = String(text || "").toLowerCase();
    if (!t) return "info";
    if (t.includes("error") || t.includes("failed") || t.includes("denied")) return "critical";
    if (t.includes("banned") || t.includes("kicked") || t.includes("expired")) return "warn";
    if (t.includes("created") || t.includes("joined") || t.includes("logged in") || t.includes("authenticated")) return "success";
    if (t.includes("session") || t.includes("world")) return "accent";
    return "info";
  }
};
