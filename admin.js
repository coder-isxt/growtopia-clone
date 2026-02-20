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
  }
};
