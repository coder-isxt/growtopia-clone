window.GTModules = window.GTModules || {};
window.GTModules.admin = {
  DEFAULT_ROLE_RANK: {
    none: 0,
    moderator: 1,
    admin: 2,
    manager: 3,
    owner: 4
  },
  DEFAULT_PERMISSIONS: {
    owner: ["panel_open", "view_logs", "tempban", "permban", "unban", "kick", "resetinv", "givex", "tp", "bring", "setrole", "clear_logs", "view_audit", "force_reload", "freeze", "unfreeze", "announce_user"],
    manager: ["panel_open", "view_logs", "tempban", "permban", "unban", "kick", "resetinv", "givex", "tp", "bring", "setrole_limited", "clear_logs", "view_audit", "freeze", "unfreeze", "announce_user"],
    admin: ["panel_open", "view_logs", "kick", "resetinv", "givex", "tp", "bring", "freeze", "unfreeze", "announce_user"],
    moderator: ["panel_open", "kick", "tp", "bring", "announce_user"],
    none: []
  },
  DEFAULT_COMMAND_COOLDOWNS_MS: {
    owner: {},
    manager: { tempban: 2000, permban: 2000, unban: 1000, kick: 700, givex: 600, giveitem: 600, tp: 300, bring: 700, summon: 700, setrole: 2000, freeze: 700, unfreeze: 700, announcep: 500 },
    admin: { kick: 900, givex: 900, giveitem: 900, tp: 400, bring: 900, summon: 900, freeze: 900, unfreeze: 900, announcep: 700 },
    moderator: { kick: 1200, tp: 600, bring: 1200, summon: 1200, announcep: 900 },
    none: {}
  },
  createRoleConfig(settings) {
    const cfg = settings && typeof settings === "object" ? settings : {};
    return {
      roleRank: cfg.ADMIN_ROLE_RANK && typeof cfg.ADMIN_ROLE_RANK === "object" ? cfg.ADMIN_ROLE_RANK : this.DEFAULT_ROLE_RANK,
      permissions: cfg.ADMIN_PERMISSIONS && typeof cfg.ADMIN_PERMISSIONS === "object" ? cfg.ADMIN_PERMISSIONS : this.DEFAULT_PERMISSIONS,
      commandCooldownsMs: cfg.ADMIN_COMMAND_COOLDOWNS_MS && typeof cfg.ADMIN_COMMAND_COOLDOWNS_MS === "object" ? cfg.ADMIN_COMMAND_COOLDOWNS_MS : this.DEFAULT_COMMAND_COOLDOWNS_MS,
      roleByUsername: cfg.ADMIN_ROLE_BY_USERNAME && typeof cfg.ADMIN_ROLE_BY_USERNAME === "object" ? cfg.ADMIN_ROLE_BY_USERNAME : {},
      adminUsernames: Array.isArray(cfg.ADMIN_USERNAMES) ? cfg.ADMIN_USERNAMES : ["isxt"]
    };
  },
  normalizeAdminRole(role, roleConfig) {
    const cfg = roleConfig || {};
    const roleRank = cfg.roleRank && typeof cfg.roleRank === "object" ? cfg.roleRank : this.DEFAULT_ROLE_RANK;
    const value = String(role || "").trim().toLowerCase();
    return roleRank[value] !== undefined ? value : "none";
  },
  getRoleRank(role, roleConfig) {
    const cfg = roleConfig || {};
    const roleRank = cfg.roleRank && typeof cfg.roleRank === "object" ? cfg.roleRank : this.DEFAULT_ROLE_RANK;
    const normalized = this.normalizeAdminRole(role, cfg);
    return Number(roleRank[normalized]) || 0;
  },
  hasAdminPermission(role, permissionKey, roleConfig) {
    const cfg = roleConfig || {};
    const permissions = cfg.permissions && typeof cfg.permissions === "object" ? cfg.permissions : this.DEFAULT_PERMISSIONS;
    const normalized = this.normalizeAdminRole(role, cfg);
    const list = Array.isArray(permissions[normalized]) ? permissions[normalized] : [];
    return list.includes(permissionKey);
  },
  getConfiguredRoleForUsername(username, roleConfig) {
    const cfg = roleConfig || {};
    const normalized = String(username || "").trim().toLowerCase();
    if (!normalized) return "none";
    const roleByUsername = cfg.roleByUsername && typeof cfg.roleByUsername === "object" ? cfg.roleByUsername : {};
    if (roleByUsername[normalized]) {
      return this.normalizeAdminRole(roleByUsername[normalized], cfg);
    }
    const adminUsernames = Array.isArray(cfg.adminUsernames) ? cfg.adminUsernames : ["isxt"];
    if (adminUsernames.includes(normalized)) return "owner";
    return "none";
  },
  getCommandCooldownMs(role, commandKey, roleConfig) {
    const cfg = roleConfig || {};
    const map = cfg.commandCooldownsMs && typeof cfg.commandCooldownsMs === "object"
      ? cfg.commandCooldownsMs
      : this.DEFAULT_COMMAND_COOLDOWNS_MS;
    const normalized = this.normalizeAdminRole(role, cfg);
    const roleMap = map[normalized] && typeof map[normalized] === "object" ? map[normalized] : {};
    return Number(roleMap[commandKey]) || 0;
  },
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
    if (key === "kick" || key === "resetinv" || key === "clear_logs" || key === "clearaudit" || key === "freeze") return "warn";
    if (key === "unban") return "success";
    if (key === "setrole" || key === "givex" || key === "giveitem" || key === "tp" || key === "summon" || key === "bring" || key === "unfreeze" || key === "announce_user") return "accent";
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
