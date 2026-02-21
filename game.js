    (() => {
      const authScreenEl = document.getElementById("authScreen");
      const gameShellEl = document.getElementById("gameShell");
      const authUsernameEl = document.getElementById("authUsername");
      const authPasswordEl = document.getElementById("authPassword");
      const authCreateBtn = document.getElementById("authCreateBtn");
      const authLoginBtn = document.getElementById("authLoginBtn");
      const authStatusEl = document.getElementById("authStatus");
      const canvas = document.getElementById("game");
      const ctx = canvas.getContext("2d");
      const toolbar = document.getElementById("toolbar");
      const canvasWrapEl = document.getElementById("canvasWrap");
      const menuScreenEl = document.getElementById("menuScreen");
      const mobileControlsEl = document.getElementById("mobileControls");
      const mobileLeftBtn = document.getElementById("mobileLeftBtn");
      const mobileRightBtn = document.getElementById("mobileRightBtn");
      const mobileJumpBtn = document.getElementById("mobileJumpBtn");
      const networkStateEl = document.getElementById("networkState");
      const onlineCountEl = document.getElementById("onlineCount");
      const totalOnlineCountEl = document.getElementById("totalOnlineCount");
      const currentWorldLabelEl = document.getElementById("currentWorldLabel");
      const worldButtonsEl = document.getElementById("worldButtons");
      const worldInputEl = document.getElementById("worldInput");
      const enterWorldBtn = document.getElementById("enterWorldBtn");
      const chatToggleBtn = document.getElementById("chatToggleBtn");
      const logsToggleBtn = document.getElementById("logsToggleBtn");
      const adminToggleBtn = document.getElementById("adminToggleBtn");
      const adminPanelEl = document.getElementById("adminPanel");
      const adminSearchInput = document.getElementById("adminSearchInput");
      const adminAuditActionFilterEl = document.getElementById("adminAuditActionFilter");
      const adminAuditActorFilterEl = document.getElementById("adminAuditActorFilter");
      const adminAuditTargetFilterEl = document.getElementById("adminAuditTargetFilter");
      const adminAuditExportBtn = document.getElementById("adminAuditExportBtn");
      const adminCloseBtn = document.getElementById("adminCloseBtn");
      const adminAccountsEl = document.getElementById("adminAccounts");
      const chatPanelEl = document.getElementById("chatPanel");
      const chatMessagesEl = document.getElementById("chatMessages");
      const chatInputRowEl = document.getElementById("chatInputRow");
      const chatInputEl = document.getElementById("chatInput");
      const chatSendBtn = document.getElementById("chatSendBtn");
      const logsPanelEl = document.getElementById("logsPanel");
      const logsMessagesEl = document.getElementById("logsMessages");
      const clearLogsBtn = document.getElementById("clearLogsBtn");
      const exitWorldBtn = document.getElementById("exitWorldBtn");
      const logoutBtn = document.getElementById("logoutBtn");

      const modules = window.GTModules || {};
      const adminModule = modules.admin || {};
      const blocksModule = modules.blocks || {};
      const itemsModule = modules.items || {};
      const playerModule = modules.player || {};
      const chatModule = modules.chat || {};
      const menuModule = modules.menu || {};

      const SETTINGS = window.GT_SETTINGS || {};
      const TILE = Number(SETTINGS.TILE_SIZE) || 32;
      const WORLD_W = Number(SETTINGS.WORLD_WIDTH_TILES) || 140;
      const WORLD_H = Number(SETTINGS.WORLD_HEIGHT_TILES) || 30;
      const GRAVITY = Number(SETTINGS.GRAVITY) || 0.32;
      const FRICTION = Number(SETTINGS.FRICTION_GROUND) || 0.86;
      const AIR_CONTROL = Number(SETTINGS.AIR_CONTROL) || 0.6;
      const AIR_FRICTION = Number(SETTINGS.FRICTION_AIR) || 0.94;
      const PLAYER_W = Number(SETTINGS.PLAYER_WIDTH) || 22;
      const PLAYER_H = Number(SETTINGS.PLAYER_HEIGHT) || 30;
      const BASE_PATH = typeof SETTINGS.BASE_PATH === "string" && SETTINGS.BASE_PATH ? SETTINGS.BASE_PATH : "growtopia-test";
      const LOG_VIEWER_USERNAMES = Array.isArray(SETTINGS.LOG_VIEWER_USERNAMES) ? SETTINGS.LOG_VIEWER_USERNAMES : ["isxt"];
      const ADMIN_USERNAMES = Array.isArray(SETTINGS.ADMIN_USERNAMES) ? SETTINGS.ADMIN_USERNAMES : ["isxt"];
      const ADMIN_ROLE_BY_USERNAME = SETTINGS.ADMIN_ROLE_BY_USERNAME && typeof SETTINGS.ADMIN_ROLE_BY_USERNAME === "object"
        ? SETTINGS.ADMIN_ROLE_BY_USERNAME
        : {};
      const JUMP_COOLDOWN_MS = Number(SETTINGS.JUMP_COOLDOWN_MS) || 200;
      const MOVE_ACCEL = Number(SETTINGS.MOVE_ACCEL) || 0.46;
      const JUMP_VELOCITY = Number(SETTINGS.JUMP_VELOCITY) || -7.2;
      const MAX_MOVE_SPEED = Number(SETTINGS.MAX_MOVE_SPEED) || 3.7;
      const MAX_FALL_SPEED = Number(SETTINGS.MAX_FALL_SPEED) || 10;
      const ADMIN_ROLE_RANK = {
        none: 0,
        moderator: 1,
        admin: 2,
        manager: 3,
        owner: 4
      };
      const ADMIN_PERMISSIONS = {
        owner: ["panel_open", "view_logs", "tempban", "permban", "unban", "kick", "resetinv", "givex", "tp", "bring", "setrole", "clear_logs", "view_audit"],
        manager: ["panel_open", "view_logs", "tempban", "permban", "unban", "kick", "resetinv", "givex", "tp", "bring", "setrole_limited", "clear_logs", "view_audit"],
        admin: ["panel_open", "view_logs", "kick", "resetinv", "givex", "tp", "bring"],
        moderator: ["panel_open", "kick", "tp", "bring"],
        none: []
      };
      const DEFAULT_COMMAND_COOLDOWNS_MS = {
        owner: {},
        manager: { tempban: 2000, permban: 2000, unban: 1000, kick: 700, givex: 600, giveitem: 600, tp: 300, bring: 700, summon: 700, setrole: 2000 },
        admin: { kick: 900, givex: 900, giveitem: 900, tp: 400, bring: 900, summon: 900 },
        moderator: { kick: 1200, tp: 600, bring: 1200, summon: 1200 },
        none: {}
      };
      const ADMIN_COMMAND_COOLDOWNS_MS = SETTINGS.ADMIN_COMMAND_COOLDOWNS_MS && typeof SETTINGS.ADMIN_COMMAND_COOLDOWNS_MS === "object"
        ? SETTINGS.ADMIN_COMMAND_COOLDOWNS_MS
        : DEFAULT_COMMAND_COOLDOWNS_MS;
      const SAVED_AUTH_KEY = "growtopia_saved_auth_v1";

      const blockDefs = typeof blocksModule.getBlockDefs === "function" ? blocksModule.getBlockDefs() : {
        0: { name: "Air", color: "transparent", solid: false },
        1: { name: "Grass", color: "#4caf50", solid: true },
        2: { name: "Dirt", color: "#8b5a2b", solid: true },
        3: { name: "Stone", color: "#818a93", solid: true },
        4: { name: "Wood", color: "#a87038", solid: true },
        5: { name: "Sand", color: "#dfc883", solid: true },
        6: { name: "Brick", color: "#bb5644", solid: true }
      };

      const slotOrder = ["fist", 1, 2, 3, 4, 5, 6];
      const INVENTORY_IDS = [1, 2, 3, 4, 5, 6];
      const COSMETIC_SLOTS = ["clothes", "wings", "swords"];
      const COSMETIC_CATALOG = typeof itemsModule.getCosmeticItemsBySlot === "function"
        ? itemsModule.getCosmeticItemsBySlot()
        : { clothes: [], wings: [], swords: [] };
      const COSMETIC_LOOKUP = {};
      const COSMETIC_ITEMS = [];
      for (const slot of COSMETIC_SLOTS) {
        const map = {};
        const slotItems = Array.isArray(COSMETIC_CATALOG[slot]) ? COSMETIC_CATALOG[slot] : [];
        for (const item of slotItems) {
          map[item.id] = item;
          COSMETIC_ITEMS.push({ slot, ...item });
        }
        COSMETIC_LOOKUP[slot] = map;
      }
      const inventory = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0
      };

      let selectedSlot = 0;
      const keys = {};
      const playerId = "p_" + Math.random().toString(36).slice(2, 10);
      let playerName = "";
      let playerProfileId = "";
      let playerSessionRef = null;
      let playerSessionId = "";
      let playerSessionStartedAt = 0;
      let worldChatStartedAt = 0;
      let gameBootstrapped = false;
      let pendingTeleportSelf = null;
      let lastHandledTeleportCommandId = "";
      const remotePlayers = new Map();
      const overheadChatByPlayer = new Map();
      const worldOccupancy = new Map();
      let knownWorldIds = [];
      let totalOnlinePlayers = 0;
      let isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
      let isChatOpen = false;
      let isLogsOpen = false;
      let canViewAccountLogs = false;
      let canUseAdminPanel = false;
      let currentAdminRole = "none";
      let adminDataListening = false;
      let adminSearchQuery = "";
      let adminAuditActionFilter = "";
      let adminAuditActorFilter = "";
      let adminAuditTargetFilter = "";
      let isAdminOpen = false;
      const adminCommandLastUsedAt = new Map();
      const chatMessages = [];
      const logsMessages = [];
      const CHAT_BUBBLE_MS = 7000;
      const CHAT_BUBBLE_MAX_WIDTH = 190;
      const CHAT_BUBBLE_LINE_HEIGHT = 13;

      let currentWorldId = getInitialWorldId();
      let world = makeWorld(currentWorldId);
      let inWorld = false;

      const player = {
        x: TILE * 8,
        y: TILE * 11,
        vx: 0,
        vy: 0,
        grounded: false,
        facing: 1
      };
      const cosmeticInventory = {};
      const equippedCosmetics = {
        clothes: "",
        wings: "",
        swords: ""
      };

      let cameraX = 0;
      let cameraY = 0;
      let mouseWorld = { tx: 0, ty: 0 };
      let networkLastSyncAt = 0;
      let networkLastX = -1;
      let networkLastY = -1;
      let networkLastFacing = 0;
      let lastJumpAtMs = -9999;
      let lastAirJumpAtMs = -9999;
      let airJumpsUsed = 0;
      let wasJumpHeld = false;
      let mobileLastTouchActionAt = 0;
      const touchControls = {
        left: false,
        right: false,
        jump: false
      };

      const network = {
        enabled: false,
        connected: false,
        db: null,
        connectedRef: null,
        worldsIndexRef: null,
        globalPlayersRef: null,
        globalPlayerRef: null,
        playerRef: null,
        mySessionRef: null,
        myCommandRef: null,
        playersRef: null,
        blocksRef: null,
        chatRef: null,
        chatFeedRef: null,
        inventoryRef: null,
        accountLogsRef: null,
        accountLogsFeedRef: null,
        accountLogsRootRef: null,
        myBanRef: null,
        accountsRef: null,
        usernamesRef: null,
        adminRolesRef: null,
        adminAuditRef: null,
        bansRef: null,
        sessionsRootRef: null,
        inventoriesRootRef: null,
        authDb: null,
        handlers: {
          connected: null,
          worldsIndex: null,
          globalPlayers: null,
          inventory: null,
          mySession: null,
          myCommand: null,
          players: null,
          blockAdded: null,
          blockChanged: null,
          blockRemoved: null,
          chatAdded: null,
          accountLogAdded: null,
          myBan: null,
          adminAccounts: null,
          adminUsernames: null,
          adminRoles: null,
          adminAudit: null,
          adminBans: null,
          adminSessions: null,
          adminInventories: null
        }
      };

      const adminState = {
        accounts: {},
        usernames: {},
        roles: {},
        audit: [],
        bans: {},
        sessions: {},
        inventories: {},
        globalPlayers: {}
      };

      function setAuthStatus(text, isError) {
        authStatusEl.textContent = text;
        authStatusEl.classList.toggle("danger", Boolean(isError));
      }

      function setAuthBusy(isBusy) {
        authCreateBtn.disabled = isBusy;
        authLoginBtn.disabled = isBusy;
        authUsernameEl.disabled = isBusy;
        authPasswordEl.disabled = isBusy;
      }

      function normalizeUsername(value) {
        return (value || "").trim().toLowerCase();
      }

      function saveCredentials(username, password) {
        try {
          localStorage.setItem(SAVED_AUTH_KEY, JSON.stringify({
            username: (username || "").toString().slice(0, 20),
            password: (password || "").toString().slice(0, 64)
          }));
        } catch (error) {
          // ignore localStorage failures
        }
      }

      function loadSavedCredentials() {
        try {
          const raw = localStorage.getItem(SAVED_AUTH_KEY);
          if (!raw) return { username: "", password: "" };
          const parsed = JSON.parse(raw);
          return {
            username: (parsed && parsed.username || "").toString(),
            password: (parsed && parsed.password || "").toString()
          };
        } catch (error) {
          return { username: "", password: "" };
        }
      }

      function applySavedCredentialsToForm() {
        const saved = loadSavedCredentials();
        if (saved.username) authUsernameEl.value = saved.username;
        if (saved.password) authPasswordEl.value = saved.password;
      }

      function canUserViewLogs(username) {
        const normalized = normalizeUsername(username);
        if (LOG_VIEWER_USERNAMES.includes(normalized)) return true;
        return hasAdminPermission("view_logs");
      }

      function normalizeAdminRole(role) {
        const value = String(role || "").trim().toLowerCase();
        return ADMIN_ROLE_RANK[value] !== undefined ? value : "none";
      }

      function getRoleRank(role) {
        return ADMIN_ROLE_RANK[normalizeAdminRole(role)] || 0;
      }

      function hasAdminPermission(permissionKey) {
        const role = normalizeAdminRole(currentAdminRole);
        const list = ADMIN_PERMISSIONS[role] || [];
        return list.includes(permissionKey);
      }

      function getConfiguredRoleForUsername(username) {
        const normalized = normalizeUsername(username);
        if (!normalized) return "none";
        if (ADMIN_ROLE_BY_USERNAME[normalized]) {
          return normalizeAdminRole(ADMIN_ROLE_BY_USERNAME[normalized]);
        }
        if (ADMIN_USERNAMES.includes(normalized)) {
          return "owner";
        }
        return "none";
      }

      function getAccountRole(accountId, username) {
        if (accountId && adminState.roles[accountId]) {
          return normalizeAdminRole(adminState.roles[accountId]);
        }
        return getConfiguredRoleForUsername(username);
      }

      function refreshAdminCapabilities() {
        currentAdminRole = normalizeAdminRole(getAccountRole(playerProfileId, playerName));
        canUseAdminPanel = hasAdminPermission("panel_open");
        canViewAccountLogs = canUserViewLogs(playerName);
        clearLogsBtn.disabled = !hasAdminPermission("clear_logs");
        logsToggleBtn.classList.toggle("hidden", !canViewAccountLogs);
        adminToggleBtn.classList.toggle("hidden", !canUseAdminPanel);
        if (adminAuditActionFilterEl) adminAuditActionFilterEl.disabled = !hasAdminPermission("view_audit");
        if (adminAuditActorFilterEl) adminAuditActorFilterEl.disabled = !hasAdminPermission("view_audit");
        if (adminAuditTargetFilterEl) adminAuditTargetFilterEl.disabled = !hasAdminPermission("view_audit");
        if (adminAuditExportBtn) adminAuditExportBtn.disabled = !hasAdminPermission("view_audit");
        if (network.accountLogsRootRef && network.handlers.accountLogAdded) {
          network.accountLogsRootRef.off("value", network.handlers.accountLogAdded);
          if (canViewAccountLogs) {
            network.accountLogsRootRef.on("value", network.handlers.accountLogAdded);
          } else {
            clearLogsView();
          }
        }
        if (!canViewAccountLogs) setLogsOpen(false);
        if (!canUseAdminPanel) setAdminOpen(false);
        if (network.enabled) {
          syncAdminDataListeners();
        }
      }

      function canActorAffectTarget(targetAccountId, targetRole) {
        if (!targetAccountId || targetAccountId === playerProfileId) return false;
        const actorRank = getRoleRank(currentAdminRole);
        const targetRank = getRoleRank(targetRole);
        return actorRank > targetRank;
      }

      function canActorGrantTarget(targetAccountId, targetRole) {
        if (!targetAccountId) return false;
        if (targetAccountId === playerProfileId) return true;
        return canActorAffectTarget(targetAccountId, targetRole);
      }

      function canUserUseAdmin() {
        return hasAdminPermission("panel_open");
      }

      function canSetRoleTo(targetAccountId, nextRole) {
        const actorRole = normalizeAdminRole(currentAdminRole);
        const targetRole = getAccountRole(targetAccountId, adminState.accounts[targetAccountId] && adminState.accounts[targetAccountId].username);
        const actorRank = getRoleRank(actorRole);
        const targetRank = getRoleRank(targetRole);
        const desiredRole = normalizeAdminRole(nextRole);
        if (!targetAccountId || targetAccountId === playerProfileId) return false;
        if (actorRole === "owner") return true;
        if (!hasAdminPermission("setrole_limited")) return false;
        if (targetRank >= actorRank) return false;
        return desiredRole === "none" || desiredRole === "moderator" || desiredRole === "admin";
      }

      function getAssignableRoles() {
        if (normalizeAdminRole(currentAdminRole) === "owner") {
          return ["none", "moderator", "admin", "manager", "owner"];
        }
        if (hasAdminPermission("setrole_limited")) {
          return ["none", "moderator", "admin"];
        }
        return [];
      }

      function parseDurationToMs(input) {
        if (typeof adminModule.parseDurationToMs === "function") {
          return adminModule.parseDurationToMs(input);
        }
        const value = String(input || "").trim().toLowerCase();
        const match = value.match(/^(\d+)\s*([smhd])$/);
        if (!match) return 0;
        const amount = Number(match[1]);
        const unit = match[2];
        if (!Number.isFinite(amount) || amount <= 0) return 0;
        const unitMs = unit === "s" ? 1000 : unit === "m" ? 60000 : unit === "h" ? 3600000 : 86400000;
        return amount * unitMs;
      }

      function formatRemainingMs(ms) {
        if (typeof adminModule.formatRemainingMs === "function") {
          return adminModule.formatRemainingMs(ms);
        }
        const safe = Math.max(0, Math.floor(ms));
        if (safe < 60000) return Math.ceil(safe / 1000) + "s";
        if (safe < 3600000) return Math.ceil(safe / 60000) + "m";
        if (safe < 86400000) return Math.ceil(safe / 3600000) + "h";
        return Math.ceil(safe / 86400000) + "d";
      }

      function getCommandCooldownMs(commandKey) {
        const role = normalizeAdminRole(currentAdminRole);
        const roleMap = ADMIN_COMMAND_COOLDOWNS_MS[role] || {};
        return Number(roleMap[commandKey]) || 0;
      }

      function consumeCommandCooldown(commandKey) {
        const cooldown = getCommandCooldownMs(commandKey);
        if (cooldown <= 0) return 0;
        const now = Date.now();
        const key = (playerProfileId || "guest") + ":" + commandKey;
        const last = adminCommandLastUsedAt.get(key) || 0;
        const remaining = cooldown - (now - last);
        if (remaining > 0) {
          return remaining;
        }
        adminCommandLastUsedAt.set(key, now);
        return 0;
      }

      function ensureCommandReady(commandKey) {
        const left = consumeCommandCooldown(commandKey);
        if (left > 0) {
          postLocalSystemChat("Cooldown: wait " + formatRemainingMs(left) + " for /" + commandKey + ".");
          return false;
        }
        return true;
      }

      function normalizeBanRecord(record) {
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
      }

      function getBanStatus(record, nowMs) {
        if (!record) return { active: false, expired: false, type: "temporary", remainingMs: 0, reason: "" };
        const normalized = normalizeBanRecord(record);
        if (normalized.type === "permanent") {
          return { active: true, expired: false, type: "permanent", remainingMs: Infinity, reason: normalized.reason };
        }
        const remainingMs = normalized.expiresAt - nowMs;
        if (!normalized.expiresAt || remainingMs <= 0) {
          return { active: false, expired: true, type: "temporary", remainingMs: 0, reason: normalized.reason };
        }
        return { active: true, expired: false, type: "temporary", remainingMs, reason: normalized.reason };
      }

      function setAdminOpen(open) {
        if (!canUseAdminPanel) {
          isAdminOpen = false;
          adminPanelEl.classList.add("hidden");
          return;
        }
        isAdminOpen = Boolean(open);
        adminPanelEl.classList.toggle("hidden", !isAdminOpen);
      }

      function escapeHtml(value) {
        return String(value)
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll("\"", "&quot;")
          .replaceAll("'", "&#039;");
      }

      function totalInventoryCount(inv) {
        if (!inv || typeof inv !== "object") return 0;
        let total = 0;
        for (const id of INVENTORY_IDS) {
          total += Math.max(0, Number(inv[id]) || 0);
        }
        return total;
      }

      function renderAdminPanel() {
        if (!canUseAdminPanel) {
          adminAccountsEl.innerHTML = "";
          return;
        }
        const nowMs = Date.now();
        const accountIds = Object.keys(adminState.accounts || {}).sort((a, b) => {
          const aAcc = adminState.accounts[a] || {};
          const bAcc = adminState.accounts[b] || {};
          const aRole = getRoleRank(getAccountRole(a, aAcc.username));
          const bRole = getRoleRank(getAccountRole(b, bAcc.username));
          if (bRole !== aRole) return bRole - aRole;
          const aOnline = Boolean(adminState.sessions[a] && adminState.sessions[a].sessionId);
          const bOnline = Boolean(adminState.sessions[b] && adminState.sessions[b].sessionId);
          if (aOnline !== bOnline) return aOnline ? -1 : 1;
          return (aAcc.username || a).localeCompare(bAcc.username || b);
        });
        const query = adminSearchQuery.trim().toLowerCase();
        const filteredIds = query
          ? accountIds.filter((accountId) => {
            const account = adminState.accounts[accountId] || {};
            const username = (account.username || "").toLowerCase();
            return username.includes(query) || accountId.toLowerCase().includes(query);
          })
          : accountIds;
        const assignable = getAssignableRoles();
        const rows = filteredIds.map((accountId) => {
          const account = adminState.accounts[accountId] || {};
          const username = account.username || accountId;
          const banStatus = getBanStatus(adminState.bans[accountId], nowMs);
          const banned = banStatus.active;
          const online = Boolean(adminState.sessions[accountId] && adminState.sessions[accountId].sessionId);
          const invTotal = totalInventoryCount(adminState.inventories[accountId]);
          const role = getAccountRole(accountId, username);
          const roleOptions = assignable.map((r) => {
            const selected = r === role ? " selected" : "";
            return `<option value="${escapeHtml(r)}"${selected}>${escapeHtml(r)}</option>`;
          }).join("");
          const canSetRole = assignable.length > 0 && canSetRoleTo(accountId, role);
          const canTempBan = hasAdminPermission("tempban") && canActorAffectTarget(accountId, role);
          const canPermBan = hasAdminPermission("permban") && canActorAffectTarget(accountId, role);
          const canUnban = hasAdminPermission("unban") && canActorAffectTarget(accountId, role);
          const canKick = hasAdminPermission("kick") && canActorAffectTarget(accountId, role);
          const canReset = hasAdminPermission("resetinv") && canActorAffectTarget(accountId, role);
          const canGive = hasAdminPermission("givex") && canActorGrantTarget(accountId, role);
          const banText = banned
            ? (banStatus.type === "permanent" ? "Perm Banned" : "Temp Banned (" + formatRemainingMs(banStatus.remainingMs) + ")")
            : "Active";
          const roleControlMarkup = assignable.length > 0
            ? `<div class="admin-role-wrap">
                <select class="admin-role-select" data-account-id="${escapeHtml(accountId)}" ${canSetRole ? "" : "disabled"}>${roleOptions}</select>
                <button data-admin-act="setrole" data-account-id="${escapeHtml(accountId)}" ${canSetRole ? "" : "disabled"}>Set Role</button>
              </div>`
            : "";
          return `
            <div class="admin-row" data-account-id="${escapeHtml(accountId)}">
              <div class="admin-meta">
                <strong>@${escapeHtml(username)} <span class="admin-role role-${escapeHtml(role)}">${escapeHtml(role)}</span></strong>
                <span>${online ? "Online" : "Offline"} | ${banText} | Blocks: ${invTotal}</span>
              </div>
              <div class="admin-actions">
                <div class="admin-quick-actions">
                  <button data-admin-act="kick" data-account-id="${escapeHtml(accountId)}" ${canKick ? "" : "disabled"}>Kick</button>
                  <button data-admin-act="resetinv" data-account-id="${escapeHtml(accountId)}" ${canReset ? "" : "disabled"}>Reset Inv</button>
                  <button data-admin-act="unban" data-account-id="${escapeHtml(accountId)}" ${canUnban ? "" : "disabled"}>Unban</button>
                  <button data-admin-act="tempban" data-account-id="${escapeHtml(accountId)}" ${canTempBan ? "" : "disabled"}>Temp Ban</button>
                  <button data-admin-act="permban" data-account-id="${escapeHtml(accountId)}" ${canPermBan ? "" : "disabled"}>Perm Ban</button>
                </div>
                ${roleControlMarkup}
                <div class="admin-ban-wrap">
                  <select class="admin-ban-preset" data-account-id="${escapeHtml(accountId)}" ${canTempBan ? "" : "disabled"}>
                    <option value="15m">15m</option>
                    <option value="1h">1h</option>
                    <option value="24h">24h</option>
                    <option value="7d">7d</option>
                    <option value="custom">Custom</option>
                  </select>
                  <input class="admin-ban-duration" data-account-id="${escapeHtml(accountId)}" type="text" value="15m" placeholder="60m/12h/7d" ${canTempBan ? "" : "disabled"}>
                  <input class="admin-ban-reason" data-account-id="${escapeHtml(accountId)}" type="text" maxlength="80" value="Banned by admin" placeholder="reason" ${(canTempBan || canPermBan) ? "" : "disabled"}>
                </div>
                <div class="admin-give-wrap">
                  <input class="admin-give-block" data-account-id="${escapeHtml(accountId)}" type="number" min="1" max="6" step="1" value="1" placeholder="block">
                  <input class="admin-give-amount" data-account-id="${escapeHtml(accountId)}" type="number" min="1" step="1" value="10" placeholder="amount">
                  <button data-admin-act="give" data-account-id="${escapeHtml(accountId)}" ${canGive ? "" : "disabled"}>Give</button>
                </div>
                <div class="admin-give-item-wrap">
                  <select class="admin-give-item-id" data-account-id="${escapeHtml(accountId)}" ${canGive ? "" : "disabled"}>
                    ${COSMETIC_ITEMS.map((item) => '<option value="' + escapeHtml(item.id) + '">' + escapeHtml(item.id) + "</option>").join("")}
                  </select>
                  <input class="admin-give-item-amount" data-account-id="${escapeHtml(accountId)}" type="number" min="1" step="1" value="1" placeholder="amount">
                  <button data-admin-act="giveitem" data-account-id="${escapeHtml(accountId)}" ${canGive ? "" : "disabled"}>Give Item</button>
                </div>
              </div>
            </div>
          `;
        });
        const normalizedActionFilter = adminAuditActionFilter.trim().toLowerCase();
        const normalizedActorFilter = adminAuditActorFilter.trim().toLowerCase();
        const normalizedTargetFilter = adminAuditTargetFilter.trim().toLowerCase();
        const filteredAudit = (adminState.audit || []).filter((entry) => {
          const action = (entry.action || "").toLowerCase();
          const actor = (entry.actor || "").toLowerCase();
          const target = (entry.target || "").toLowerCase();
          if (normalizedActionFilter && action !== normalizedActionFilter) return false;
          if (normalizedActorFilter && !actor.includes(normalizedActorFilter)) return false;
          if (normalizedTargetFilter && !target.includes(normalizedTargetFilter)) return false;
          return true;
        });
        const auditRows = filteredAudit.slice(-60).map((entry) => {
          return `<div class="admin-audit-row">${escapeHtml(entry.time || "--:--")} | ${escapeHtml(entry.actor || "system")} | ${escapeHtml(entry.action || "-")} ${escapeHtml(entry.target || "")} ${escapeHtml(entry.details || "")}</div>`;
        }).join("");
        const auditMarkup = hasAdminPermission("view_audit")
          ? `<div class="admin-audit">
            <div class="admin-audit-title">Audit Trail</div>
            <div class="admin-audit-list">${auditRows || "<div class='admin-audit-row'>No entries yet.</div>"}</div>
          </div>`
          : "";
        adminAccountsEl.innerHTML = `
          <div class="admin-layout">
            <div class="admin-main">
              <div class="admin-summary">Signed in as <strong>${escapeHtml(playerName || "guest")}</strong> (${escapeHtml(currentAdminRole)}). Showing ${filteredIds.length}/${accountIds.length} players.</div>
              <div class="admin-list">
                ${rows.join("") || "<div class='admin-row'><div class='admin-meta'><strong>No players match filter.</strong></div></div>"}
              </div>
            </div>
            ${auditMarkup}
          </div>
        `;
      }

      function handleAdminAction(event) {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const action = target.dataset.adminAct;
        const accountId = target.dataset.accountId;
        if (!action || !accountId || !canUseAdminPanel || !network.db) return;
        if (action === "giveitem") {
          const itemSelect = adminAccountsEl.querySelector('.admin-give-item-id[data-account-id="' + accountId + '"]');
          const amountInput = adminAccountsEl.querySelector('.admin-give-item-amount[data-account-id="' + accountId + '"]');
          if (!(itemSelect instanceof HTMLSelectElement) || !(amountInput instanceof HTMLInputElement)) return;
          const itemId = itemSelect.value || "";
          const amount = Number(amountInput.value);
          const username = (adminState.accounts[accountId] && adminState.accounts[accountId].username) || accountId;
          const ok = applyCosmeticItemGrant(accountId, itemId, amount, "panel", username);
          if (ok) {
            postLocalSystemChat("Added item " + itemId + " x" + amount + " to @" + username + ".");
          }
          return;
        }
        if (action === "tempban" || action === "permban") {
          const durationInput = adminAccountsEl.querySelector('.admin-ban-duration[data-account-id="' + accountId + '"]');
          const reasonInput = adminAccountsEl.querySelector('.admin-ban-reason[data-account-id="' + accountId + '"]');
          const durationText = durationInput instanceof HTMLInputElement ? durationInput.value : "60m";
          const reasonText = reasonInput instanceof HTMLInputElement ? reasonInput.value : "Banned by admin";
          if (action === "tempban") {
            const durationMs = parseDurationToMs(durationText);
            if (!durationMs) {
              postLocalSystemChat("Invalid temp ban duration. Use formats like 60m, 12h, 7d.");
              return;
            }
            applyAdminAction("tempban", accountId, "panel", { durationMs, reason: reasonText, rawDuration: durationText });
          } else {
            applyAdminAction("permban", accountId, "panel", { reason: reasonText });
          }
          return;
        }
        if (action === "give") {
          const blockInput = adminAccountsEl.querySelector('.admin-give-block[data-account-id="' + accountId + '"]');
          const amountInput = adminAccountsEl.querySelector('.admin-give-amount[data-account-id="' + accountId + '"]');
          if (!(blockInput instanceof HTMLInputElement) || !(amountInput instanceof HTMLInputElement)) return;
          const blockId = Number(blockInput.value);
          const amount = Number(amountInput.value);
          const username = (adminState.accounts[accountId] && adminState.accounts[accountId].username) || accountId;
          const ok = applyInventoryGrant(accountId, blockId, amount, "panel", username);
          if (ok) {
            postLocalSystemChat("Added " + amount + " of block " + blockId + " to @" + username + ".");
          }
          return;
        }
        if (action === "setrole") {
          const select = adminAccountsEl.querySelector('.admin-role-select[data-account-id="' + accountId + '"]');
          if (!(select instanceof HTMLSelectElement)) return;
          const nextRole = normalizeAdminRole(select.value);
          const ok = applyAdminRoleChange(accountId, nextRole, "panel");
          if (ok) {
            postLocalSystemChat("Role updated for @" + ((adminState.accounts[accountId] && adminState.accounts[accountId].username) || accountId) + ".");
          }
          return;
        }
        applyAdminAction(action, accountId, "panel");
      }

      function handleAdminInputChange(event) {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        if (!(target instanceof HTMLSelectElement)) return;
        if (!target.classList.contains("admin-ban-preset")) return;
        const accountId = target.dataset.accountId;
        if (!accountId) return;
        if (target.value === "custom") return;
        const durationInput = adminAccountsEl.querySelector('.admin-ban-duration[data-account-id="' + accountId + '"]');
        if (durationInput instanceof HTMLInputElement) {
          durationInput.value = target.value;
        }
      }

      function refreshAuditActionFilterOptions() {
        if (!(adminAuditActionFilterEl instanceof HTMLSelectElement)) return;
        const current = adminAuditActionFilterEl.value || "";
        const actions = Array.from(new Set((adminState.audit || []).map((entry) => (entry.action || "").toString().trim()).filter(Boolean))).sort();
        const options = ['<option value="">All actions</option>'].concat(actions.map((action) => {
          const safe = escapeHtml(action);
          return '<option value="' + safe + '">' + safe + "</option>";
        }));
        adminAuditActionFilterEl.innerHTML = options.join("");
        adminAuditActionFilterEl.value = actions.includes(current) ? current : "";
      }

      function exportAuditTrail() {
        if (!hasAdminPermission("view_audit")) {
          postLocalSystemChat("Permission denied.");
          return;
        }
        const rows = (adminState.audit || []).map((entry) => ({
          createdAt: entry.createdAt || 0,
          time: entry.time || "",
          actor: entry.actor || "",
          action: entry.action || "",
          target: entry.target || "",
          details: entry.details || ""
        }));
        const blob = new Blob([JSON.stringify(rows, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const stamp = new Date().toISOString().replace(/[:.]/g, "-");
        const a = document.createElement("a");
        a.href = url;
        a.download = "growtopia-admin-audit-" + stamp + ".json";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        postLocalSystemChat("Audit exported (" + rows.length + " entries).");
      }

      function logAdminAudit(text) {
        if (!text) return;
        addClientLog(text.toString().slice(0, 180), playerProfileId, playerName, "admin_audit");
      }

      function applyInventoryGrant(accountId, blockId, amount, sourceTag, targetLabel) {
        if (!accountId || !canUseAdminPanel || !network.db) return false;
        if (!ensureCommandReady("givex")) return false;
        if (!hasAdminPermission("givex")) {
          postLocalSystemChat("Permission denied.");
          return false;
        }
        const targetUsername = (adminState.accounts[accountId] && adminState.accounts[accountId].username) || "";
        const targetRole = getAccountRole(accountId, targetUsername);
        if (!canActorGrantTarget(accountId, targetRole)) {
          postLocalSystemChat("Permission denied on target role.");
          return false;
        }
        const safeAmount = Math.floor(Number(amount));
        const safeBlock = Number(blockId);
        if (!INVENTORY_IDS.includes(safeBlock) || !Number.isInteger(safeAmount) || safeAmount <= 0) {
          postLocalSystemChat("Usage: blockId 1-6 and amount >= 1.");
          return false;
        }
        network.db.ref(BASE_PATH + "/player-inventories/" + accountId + "/" + safeBlock).transaction((current) => {
          const next = (Number(current) || 0) + safeAmount;
          return Math.max(0, next);
        }).then(() => {
          if (accountId === playerProfileId) {
            inventory[safeBlock] = Math.max(0, Math.floor((inventory[safeBlock] || 0) + safeAmount));
            refreshToolbar();
            saveInventory();
            reloadMyInventoryFromServer();
          }
          const target = targetLabel || targetUsername || accountId;
          logAdminAudit("Admin(" + sourceTag + ") gave @" + target + " block " + safeBlock + " amount " + safeAmount + ".");
          pushAdminAuditEntry("givex", accountId, "block=" + safeBlock + " amount=" + safeAmount);
          postLocalSystemChat("Granted block " + safeBlock + " x" + safeAmount + " to @" + target + ".");
        }).catch(() => {
          postLocalSystemChat("Failed to update inventory.");
        });
        return true;
      }

      function applyCosmeticItemGrant(accountId, itemId, amount, sourceTag, targetLabel) {
        if (!accountId || !canUseAdminPanel || !network.db) return false;
        if (!ensureCommandReady("giveitem")) return false;
        if (!hasAdminPermission("givex")) {
          postLocalSystemChat("Permission denied.");
          return false;
        }
        const targetUsername = (adminState.accounts[accountId] && adminState.accounts[accountId].username) || "";
        const targetRole = getAccountRole(accountId, targetUsername);
        if (!canActorGrantTarget(accountId, targetRole)) {
          postLocalSystemChat("Permission denied on target role.");
          return false;
        }
        const amountSafe = Math.floor(Number(amount));
        const itemIdSafe = String(itemId || "");
        const itemDef = COSMETIC_ITEMS.find((it) => it.id === itemIdSafe);
        if (!itemDef || !Number.isInteger(amountSafe) || amountSafe <= 0) {
          postLocalSystemChat("Usage: /giveitem <user> <itemId> <amount>");
          return false;
        }
        network.db.ref(BASE_PATH + "/player-inventories/" + accountId + "/cosmeticItems/" + itemIdSafe).transaction((current) => {
          const next = (Number(current) || 0) + amountSafe;
          return Math.max(0, next);
        }).then(() => {
          if (accountId === playerProfileId) {
            cosmeticInventory[itemIdSafe] = Math.max(0, Math.floor((cosmeticInventory[itemIdSafe] || 0) + amountSafe));
            refreshToolbar();
            saveInventory();
            reloadMyInventoryFromServer();
          }
          const target = targetLabel || targetUsername || accountId;
          logAdminAudit("Admin(" + sourceTag + ") gave @" + target + " item " + itemIdSafe + " x" + amountSafe + ".");
          pushAdminAuditEntry("giveitem", accountId, "item=" + itemIdSafe + " amount=" + amountSafe);
          postLocalSystemChat("Granted item " + itemIdSafe + " x" + amountSafe + " to @" + target + ".");
        }).catch(() => {
          postLocalSystemChat("Failed to give item.");
        });
        return true;
      }

      function pushAdminAuditEntry(action, targetAccountId, details) {
        if (!network.db) return;
        const payload = {
          actorAccountId: playerProfileId || "",
          actorUsername: playerName || "",
          actorRole: currentAdminRole,
          action: action || "",
          targetAccountId: targetAccountId || "",
          targetUsername: (adminState.accounts[targetAccountId] && adminState.accounts[targetAccountId].username) || "",
          details: (details || "").toString().slice(0, 180),
          createdAt: firebase.database.ServerValue.TIMESTAMP
        };
        network.db.ref(BASE_PATH + "/admin-audit").push(payload).catch(() => {});
      }

      function applyAdminAction(action, accountId, sourceTag, opts) {
        if (!action || !accountId || !canUseAdminPanel || !network.db) return false;
        if (!ensureCommandReady(action)) return false;
        const options = opts || {};
        const targetUsername = (adminState.accounts[accountId] && adminState.accounts[accountId].username) || "";
        const targetRole = getAccountRole(accountId, targetUsername);
        const affectsTarget = action !== "tp";
        if (!hasAdminPermission(action)) {
          postLocalSystemChat("Permission denied for action: " + action);
          return false;
        }
        if (affectsTarget && !canActorAffectTarget(accountId, targetRole)) {
          postLocalSystemChat("Permission denied on target role.");
          return false;
        }
        if (action === "tempban") {
          const durationMs = Number(options.durationMs) || 0;
          if (!durationMs) {
            postLocalSystemChat("Temp ban duration is required.");
            return false;
          }
          const reason = (options.reason || "Temporarily banned by admin").toString().slice(0, 80);
          const expiresAt = Date.now() + durationMs;
          network.db.ref(BASE_PATH + "/bans/" + accountId).set({
            type: "temporary",
            reason,
            bannedBy: playerName,
            durationMs,
            expiresAt,
            createdAt: firebase.database.ServerValue.TIMESTAMP
          }).then(() => {
            network.db.ref(BASE_PATH + "/account-sessions/" + accountId).remove().catch(() => {});
            const durationLabel = options.rawDuration || formatRemainingMs(durationMs);
            logAdminAudit("Admin(" + sourceTag + ") tempbanned account " + accountId + " for " + durationLabel + ".");
            pushAdminAuditEntry("tempban", accountId, "duration=" + durationLabel + " reason=" + reason);
          }).catch(() => {});
          return true;
        }
        if (action === "permban") {
          const reason = (options.reason || "Permanently banned by admin").toString().slice(0, 80);
          network.db.ref(BASE_PATH + "/bans/" + accountId).set({
            type: "permanent",
            reason,
            bannedBy: playerName,
            createdAt: firebase.database.ServerValue.TIMESTAMP
          }).then(() => {
            network.db.ref(BASE_PATH + "/account-sessions/" + accountId).remove().catch(() => {});
            logAdminAudit("Admin(" + sourceTag + ") permbanned account " + accountId + ".");
            pushAdminAuditEntry("permban", accountId, "reason=" + reason);
          }).catch(() => {});
          return true;
        }
        if (action === "unban") {
          network.db.ref(BASE_PATH + "/bans/" + accountId).remove().then(() => {
            logAdminAudit("Admin(" + sourceTag + ") unbanned account " + accountId + ".");
            pushAdminAuditEntry("unban", accountId, "");
          }).catch(() => {});
          return true;
        }
        if (action === "kick") {
          network.db.ref(BASE_PATH + "/account-sessions/" + accountId).remove().then(() => {
            logAdminAudit("Admin(" + sourceTag + ") kicked account " + accountId + ".");
            pushAdminAuditEntry("kick", accountId, "");
          }).catch(() => {});
          return true;
        }
        if (action === "resetinv") {
          const cosmeticItems = {};
          for (const item of COSMETIC_ITEMS) {
            cosmeticItems[item.id] = 0;
          }
          const resetPayload = {
            1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,
            cosmeticItems,
            equippedCosmetics: { clothes: "", wings: "", swords: "" }
          };
          network.db.ref(BASE_PATH + "/player-inventories/" + accountId).set(resetPayload).then(() => {
            logAdminAudit("Admin(" + sourceTag + ") reset inventory for " + accountId + ".");
            pushAdminAuditEntry("resetinv", accountId, "");
          }).catch(() => {});
          return true;
        }
        return false;
      }

      function applyAdminRoleChange(accountId, nextRole, sourceTag) {
        if (!accountId || !network.db || !canUseAdminPanel) return false;
        if (!ensureCommandReady("setrole")) return false;
        const normalized = normalizeAdminRole(nextRole);
        if (!hasAdminPermission("setrole") && !hasAdminPermission("setrole_limited")) {
          postLocalSystemChat("You cannot set roles.");
          return false;
        }
        if (!canSetRoleTo(accountId, normalized)) {
          postLocalSystemChat("You cannot set that role for this account.");
          return false;
        }
        const roleRef = network.db.ref(BASE_PATH + "/admin-roles/" + accountId);
        const op = normalized === "none" ? roleRef.remove() : roleRef.set(normalized);
        op.then(() => {
          logAdminAudit("Admin(" + sourceTag + ") set role " + normalized + " for account " + accountId + ".");
          pushAdminAuditEntry("setrole", accountId, "role=" + normalized);
        }).catch(() => {
          postLocalSystemChat("Role update failed.");
        });
        return true;
      }

      function findAccountIdByUserRef(userRef) {
        const ref = normalizeUsername(userRef);
        if (!ref) return "";
        if (ref.startsWith("acc_") && adminState.accounts[ref]) return ref;
        const byUsername = adminState.usernames[ref];
        if (byUsername) return byUsername;
        const fallback = Object.keys(adminState.accounts).find((id) => {
          const u = (adminState.accounts[id] && adminState.accounts[id].username || "").toLowerCase();
          return u === ref;
        });
        return fallback || "";
      }

      function clampTeleport(value, min, max) {
        if (typeof playerModule.clamp === "function") {
          return playerModule.clamp(value, min, max);
        }
        const n = Number(value);
        if (!Number.isFinite(n)) return min;
        return Math.max(min, Math.min(max, n));
      }

      function findOnlineGlobalPlayerByAccountId(accountId) {
        const players = adminState.globalPlayers || {};
        const ids = Object.keys(players);
        for (const id of ids) {
          const p = players[id] || {};
          if ((p.accountId || "") === accountId) {
            return p;
          }
        }
        return null;
      }

      function issueTeleportCommand(targetAccountId, worldId, x, y) {
        if (!network.db || !targetAccountId) return Promise.resolve(false);
        const safeWorld = normalizeWorldId(worldId || currentWorldId);
        if (!safeWorld) return Promise.resolve(false);
        const commandId = "tp_" + Math.random().toString(36).slice(2, 12);
        const payload = {
          id: commandId,
          world: safeWorld,
          x: clampTeleport(x, 0, WORLD_W * TILE - PLAYER_W - 2),
          y: clampTeleport(y, 0, WORLD_H * TILE - PLAYER_H - 2),
          by: playerName,
          issuedAt: firebase.database.ServerValue.TIMESTAMP
        };
        return network.db.ref(BASE_PATH + "/account-commands/" + targetAccountId + "/teleport").set(payload)
          .then(() => true)
          .catch(() => false);
      }

      function applySelfTeleport(worldId, x, y) {
        const safeWorld = normalizeWorldId(worldId);
        if (!safeWorld) return;
        const safeX = clampTeleport(x, 0, WORLD_W * TILE - PLAYER_W - 2);
        const safeY = clampTeleport(y, 0, WORLD_H * TILE - PLAYER_H - 2);
        if (!inWorld || currentWorldId !== safeWorld) {
          pendingTeleportSelf = { worldId: safeWorld, x: safeX, y: safeY };
          switchWorld(safeWorld, false);
          return;
        }
        player.x = safeX;
        player.y = safeY;
        player.vx = 0;
        player.vy = 0;
      }

      function postLocalSystemChat(text) {
        addChatMessage({
          name: "[System]",
          playerId: "",
          text: (text || "").toString().slice(0, 120),
          createdAt: Date.now()
        });
      }

      function handleAdminChatCommand(rawText) {
        if (!rawText.startsWith("/")) return false;
        const parts = rawText.trim().split(/\s+/);
        const command = (parts[0] || "").toLowerCase();
        if (command === "/adminhelp") {
          const available = ["/myrole"];
          if (hasAdminPermission("tempban")) available.push("/tempban", "/ban");
          if (hasAdminPermission("permban")) available.push("/permban");
          if (hasAdminPermission("unban")) available.push("/unban");
          if (hasAdminPermission("kick")) available.push("/kick");
          if (hasAdminPermission("resetinv")) available.push("/resetinv");
          if (hasAdminPermission("givex")) available.push("/givex", "/giveitem");
          if (hasAdminPermission("tp")) available.push("/tp");
          if (hasAdminPermission("bring")) available.push("/bring", "/summon");
          if (hasAdminPermission("setrole") || hasAdminPermission("setrole_limited")) available.push("/setrole", "/role");
          postLocalSystemChat("Role: " + currentAdminRole + " | Commands: " + (available.join(", ") || "none"));
          return true;
        }
        if (command === "/myrole") {
          postLocalSystemChat("Your role: " + currentAdminRole);
          return true;
        }
        if (!canUseAdminPanel) {
          postLocalSystemChat("You are not allowed to use admin commands.");
          return true;
        }
        const needsTarget = ["/unban", "/kick", "/resetinv"];
        if (command === "/tp") {
          if (!hasAdminPermission("tp")) {
            postLocalSystemChat("Permission denied.");
            return true;
          }
          if (!ensureCommandReady("tp")) return true;
          const targetRef = parts[1] || "";
          const accountId = findAccountIdByUserRef(targetRef);
          if (!accountId) {
            postLocalSystemChat("Target account not found: " + targetRef);
            return true;
          }
          const online = findOnlineGlobalPlayerByAccountId(accountId);
          if (!online || !online.world) {
            postLocalSystemChat("Target is not online.");
            return true;
          }
          applySelfTeleport(online.world, Number(online.x) || 0, Number(online.y) || 0);
          postLocalSystemChat("Teleported to @" + targetRef + ".");
          pushAdminAuditEntry("tp", accountId, "toWorld=" + (online.world || ""));
          return true;
        }
        if (command === "/givex") {
          const targetRef = parts[1] || "";
          const blockId = Number(parts[2]);
          const amount = Number(parts[3]);
          const accountId = findAccountIdByUserRef(targetRef);
          if (!accountId) {
            postLocalSystemChat("Target account not found: " + targetRef);
            return true;
          }
          if (!INVENTORY_IDS.includes(blockId) || !Number.isInteger(amount) || amount <= 0) {
            postLocalSystemChat("Usage: /givex <user> <blockId 1-6> <amount>");
            return true;
          }
          if (applyInventoryGrant(accountId, blockId, amount, "chat", targetRef)) {
            postLocalSystemChat("Updated inventory for @" + targetRef + ".");
          }
          return true;
        }
        if (command === "/giveitem") {
          const targetRef = parts[1] || "";
          const itemId = parts[2] || "";
          const amount = Number(parts[3]);
          const accountId = findAccountIdByUserRef(targetRef);
          if (!accountId) {
            postLocalSystemChat("Target account not found: " + targetRef);
            return true;
          }
          if (applyCosmeticItemGrant(accountId, itemId, amount, "chat", targetRef)) {
            postLocalSystemChat("Gave item " + itemId + " x" + amount + " to @" + targetRef + ".");
          }
          return true;
        }
        if (command === "/bring" || command === "/summon") {
          if (!hasAdminPermission("bring")) {
            postLocalSystemChat("Permission denied.");
            return true;
          }
          if (!ensureCommandReady(command === "/summon" ? "summon" : "bring")) return true;
          const targetRef = parts[1] || "";
          const accountId = findAccountIdByUserRef(targetRef);
          if (!accountId) {
            postLocalSystemChat("Target account not found: " + targetRef);
            return true;
          }
          const targetRole = getAccountRole(accountId, adminState.accounts[accountId] && adminState.accounts[accountId].username);
          if (!canActorAffectTarget(accountId, targetRole)) {
            postLocalSystemChat("Permission denied on target role.");
            return true;
          }
          if (!inWorld) {
            postLocalSystemChat("Enter a world first.");
            return true;
          }
          issueTeleportCommand(accountId, currentWorldId, player.x + 24, player.y).then((ok) => {
            if (ok) {
              postLocalSystemChat("Summon sent to @" + targetRef + ".");
              logAdminAudit("Admin(chat) summoned @" + targetRef + " to " + currentWorldId + ".");
              pushAdminAuditEntry("summon", accountId, "world=" + currentWorldId);
            } else {
              postLocalSystemChat("Failed to summon target.");
            }
          });
          return true;
        }
        if (command === "/tempban" || command === "/ban") {
          if (!hasAdminPermission("tempban")) {
            postLocalSystemChat("Permission denied.");
            return true;
          }
          const targetRef = parts[1] || "";
          let durationRaw = parts[2] || "";
          let durationMs = parseDurationToMs(durationRaw);
          let reasonStartIndex = 3;
          if (command === "/ban" && !durationMs) {
            durationRaw = "60m";
            durationMs = parseDurationToMs(durationRaw);
            reasonStartIndex = 2;
          }
          const reason = parts.slice(reasonStartIndex).join(" ").trim() || "Temporarily banned by admin";
          if (!targetRef || !durationMs) {
            postLocalSystemChat("Usage: /tempban <user> <60m|12h|7d> [reason]");
            return true;
          }
          const accountId = findAccountIdByUserRef(targetRef);
          if (!accountId) {
            postLocalSystemChat("Target account not found: " + targetRef);
            return true;
          }
          const ok = applyAdminAction("tempban", accountId, "chat", { durationMs, reason, rawDuration: durationRaw });
          if (ok) {
            postLocalSystemChat("Temp banned @" + targetRef + " for " + durationRaw + ".");
          }
          return true;
        }
        if (command === "/permban") {
          if (!hasAdminPermission("permban")) {
            postLocalSystemChat("Permission denied.");
            return true;
          }
          const targetRef = parts[1] || "";
          const reason = parts.slice(2).join(" ").trim() || "Permanently banned by admin";
          if (!targetRef) {
            postLocalSystemChat("Usage: /permban <user> [reason]");
            return true;
          }
          const accountId = findAccountIdByUserRef(targetRef);
          if (!accountId) {
            postLocalSystemChat("Target account not found: " + targetRef);
            return true;
          }
          const ok = applyAdminAction("permban", accountId, "chat", { reason });
          if (ok) {
            postLocalSystemChat("Permanently banned @" + targetRef + ".");
          }
          return true;
        }
        if (command === "/role") {
          const targetRef = parts[1] || "";
          const accountId = findAccountIdByUserRef(targetRef);
          if (!accountId) {
            postLocalSystemChat("Target account not found: " + targetRef);
            return true;
          }
          const username = (adminState.accounts[accountId] && adminState.accounts[accountId].username) || accountId;
          const role = getAccountRole(accountId, username);
          postLocalSystemChat("@" + username + " role: " + role);
          return true;
        }
        if (command === "/setrole") {
          if (!hasAdminPermission("setrole") && !hasAdminPermission("setrole_limited")) {
            postLocalSystemChat("Permission denied.");
            return true;
          }
          const targetRef = parts[1] || "";
          const nextRole = normalizeAdminRole(parts[2] || "none");
          if (!["none", "moderator", "admin", "manager", "owner"].includes(nextRole)) {
            postLocalSystemChat("Usage: /setrole <user> <none|moderator|admin|manager|owner>");
            return true;
          }
          const accountId = findAccountIdByUserRef(targetRef);
          if (!accountId) {
            postLocalSystemChat("Target account not found: " + targetRef);
            return true;
          }
          if (applyAdminRoleChange(accountId, nextRole, "chat")) {
            postLocalSystemChat("Set role " + nextRole + " for @" + targetRef + ".");
          }
          return true;
        }
        if (!needsTarget.includes(command)) return false;
        const targetRef = parts[1] || "";
        const accountId = findAccountIdByUserRef(targetRef);
        if (!accountId) {
          postLocalSystemChat("Target account not found: " + targetRef);
          return true;
        }
        const map = {
          "/unban": "unban",
          "/kick": "kick",
          "/resetinv": "resetinv"
        };
        const ok = applyAdminAction(map[command], accountId, "chat");
        if (ok) {
          postLocalSystemChat("Executed " + command + " for @" + (adminState.accounts[accountId] && adminState.accounts[accountId].username || accountId));
        }
        return true;
      }

      function validateCredentials(username, password) {
        if (!/^[a-z0-9_]{3,20}$/.test(username)) {
          return "Username must be 3-20 chars: a-z, 0-9, _.";
        }
        if (password.length < 4 || password.length > 64) {
          return "Password must be 4-64 characters.";
        }
        return "";
      }

      async function sha256Hex(text) {
        const bytes = new TextEncoder().encode(text);
        const hash = await crypto.subtle.digest("SHA-256", bytes);
        const array = Array.from(new Uint8Array(hash));
        return array.map((b) => b.toString(16).padStart(2, "0")).join("");
      }

      function getAuthDb() {
        if (!window.firebase) {
          throw new Error("Firebase SDK not loaded.");
        }
        const firebaseConfig = window.FIREBASE_CONFIG;
        if (!hasFirebaseConfig(firebaseConfig)) {
          throw new Error("Set firebase-config.js first.");
        }
        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }
        if (!network.authDb) {
          network.authDb = firebase.database();
        }
        return network.authDb;
      }

      async function reserveAccountSession(db, accountId, username) {
        const sessionRef = db.ref(BASE_PATH + "/account-sessions/" + accountId);
        const sessionId = "s_" + Math.random().toString(36).slice(2, 12);
        const startedAtLocal = Date.now();
        const result = await sessionRef.transaction((current) => {
          if (current && current.sessionId) {
            return;
          }
          return {
            sessionId,
            username,
            startedAt: firebase.database.ServerValue.TIMESTAMP
          };
        });
        if (!result.committed) {
          addClientLog("Session denied for @" + username + " (already active).");
          throw new Error("This account is already active in another client.");
        }
        await sessionRef.onDisconnect().remove();
        playerSessionRef = sessionRef;
        playerSessionId = sessionId;
        playerSessionStartedAt = startedAtLocal;
        chatMessages.length = 0;
        renderChatMessages();
        addClientLog("Session created for @" + username + " (" + sessionId + ").", accountId, username, sessionId);
      }

      function releaseAccountSession() {
        if (playerSessionRef) {
          playerSessionRef.remove().catch(() => {});
          if (playerName) {
            addClientLog("Session released for @" + playerName + ".");
          }
        }
        playerSessionRef = null;
        playerSessionId = "";
        playerSessionStartedAt = 0;
      }

      async function createAccountAndLogin() {
        const username = normalizeUsername(authUsernameEl.value);
        const password = authPasswordEl.value || "";
        const validation = validateCredentials(username, password);
        if (validation) {
          setAuthStatus(validation, true);
          return;
        }
        setAuthBusy(true);
        setAuthStatus("Creating account...", false);
        try {
          const db = getAuthDb();
          const usernameRef = db.ref(BASE_PATH + "/usernames/" + username);
          const accountId = "acc_" + Math.random().toString(36).slice(2, 12);
          const reserve = await usernameRef.transaction((current) => {
            if (current) return;
            return accountId;
          });
          if (!reserve.committed) {
            throw new Error("Username already exists.");
          }
          const passwordHash = await sha256Hex(password);
          await db.ref(BASE_PATH + "/accounts/" + accountId).set({
            username,
            passwordHash,
            createdAt: firebase.database.ServerValue.TIMESTAMP
          });
          addClientLog("Account created: @" + username + " (" + accountId + ").", accountId, username, "");
          await reserveAccountSession(db, accountId, username);
          saveCredentials(username, password);
          onAuthSuccess(accountId, username);
          setAuthStatus("Account created.", false);
        } catch (error) {
          setAuthStatus(error.message || "Account creation failed.", true);
        } finally {
          setAuthBusy(false);
        }
      }

      async function loginWithAccount() {
        const username = normalizeUsername(authUsernameEl.value);
        const password = authPasswordEl.value || "";
        const validation = validateCredentials(username, password);
        if (validation) {
          setAuthStatus(validation, true);
          return;
        }
        setAuthBusy(true);
        setAuthStatus("Logging in...", false);
        try {
          const db = getAuthDb();
          const usernameSnap = await db.ref(BASE_PATH + "/usernames/" + username).once("value");
          const accountId = usernameSnap.val();
          if (!accountId) {
            throw new Error("Account not found.");
          }
          const accountSnap = await db.ref(BASE_PATH + "/accounts/" + accountId).once("value");
          const account = accountSnap.val() || {};
          const passwordHash = await sha256Hex(password);
          if (account.passwordHash !== passwordHash) {
            addClientLog("Login failed for @" + username + " (invalid password).", accountId, username, "");
            throw new Error("Invalid password.");
          }
          const banSnap = await db.ref(BASE_PATH + "/bans/" + accountId).once("value");
          if (banSnap.exists()) {
            const banValue = banSnap.val();
            const status = getBanStatus(banValue, Date.now());
            if (status.expired) {
              await db.ref(BASE_PATH + "/bans/" + accountId).remove();
            } else if (status.active) {
              addClientLog("Login blocked for @" + username + " (banned).", accountId, username, "");
              const reasonText = status.reason ? " Reason: " + status.reason + "." : "";
              if (status.type === "permanent") {
                throw new Error("This account is permanently banned." + reasonText);
              }
              throw new Error("This account is temporarily banned for " + formatRemainingMs(status.remainingMs) + "." + reasonText);
            }
          }
          await reserveAccountSession(db, accountId, username);
          saveCredentials(username, password);
          onAuthSuccess(accountId, username);
          addClientLog("Login success: @" + username + ".");
          setAuthStatus("Logged in.", false);
        } catch (error) {
          setAuthStatus(error.message || "Login failed.", true);
        } finally {
          setAuthBusy(false);
        }
      }

      function onAuthSuccess(accountId, username) {
        playerProfileId = accountId;
        playerName = username;
        adminSearchQuery = "";
        adminAuditActionFilter = "";
        adminAuditActorFilter = "";
        adminAuditTargetFilter = "";
        if (adminSearchInput) adminSearchInput.value = "";
        if (adminAuditActionFilterEl) adminAuditActionFilterEl.value = "";
        if (adminAuditActorFilterEl) adminAuditActorFilterEl.value = "";
        if (adminAuditTargetFilterEl) adminAuditTargetFilterEl.value = "";
        currentAdminRole = normalizeAdminRole(getConfiguredRoleForUsername(username));
        refreshAdminCapabilities();
        addClientLog("Authenticated as @" + username + ".");
        authScreenEl.classList.add("hidden");
        gameShellEl.classList.remove("hidden");
        authPasswordEl.value = "";
        if (!gameBootstrapped) {
          bootstrapGame();
          gameBootstrapped = true;
        } else {
          loadInventoryFromLocal();
          refreshToolbar();
          setInWorldState(false);
          refreshWorldButtons([currentWorldId]);
          updateOnlineCount();
          initFirebaseMultiplayer();
        }
      }

      function getInventoryStorageKey() {
        return "growtopia_inventory_" + (playerProfileId || "guest");
      }

      function applyInventoryFromRecord(record) {
        for (const id of INVENTORY_IDS) {
          const value = Number(record && record[id]);
          inventory[id] = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
        }
        const itemRecord = record && record.cosmeticItems || {};
        const legacyOwned = record && record.owned || {};
        for (const item of COSMETIC_ITEMS) {
          const nestedValue = Number(itemRecord[item.id]);
          const topLevelValue = Number(record && record[item.id]);
          const legacyHasOwned = Array.isArray(legacyOwned[item.slot]) && legacyOwned[item.slot].includes(item.id);
          let finalValue = 0;
          if (Number.isFinite(nestedValue)) finalValue = Math.max(0, Math.floor(nestedValue));
          if (!finalValue && Number.isFinite(topLevelValue)) finalValue = Math.max(0, Math.floor(topLevelValue));
          if (!finalValue && legacyHasOwned) finalValue = 1;
          cosmeticInventory[item.id] = finalValue;
        }
        const equippedRecord = record && record.equippedCosmetics || record && record.equipped || {};
        for (const slot of COSMETIC_SLOTS) {
          const id = String(equippedRecord[slot] || "");
          equippedCosmetics[slot] = id && COSMETIC_LOOKUP[slot][id] && (cosmeticInventory[id] || 0) > 0 ? id : "";
        }
      }

      function normalizeRemoteEquippedCosmetics(raw) {
        const output = { clothes: "", wings: "", swords: "" };
        for (const slot of COSMETIC_SLOTS) {
          const id = String(raw && raw[slot] || "");
          output[slot] = id && COSMETIC_LOOKUP[slot][id] ? id : "";
        }
        return output;
      }

      function buildInventoryPayload() {
        const payload = {};
        for (const id of INVENTORY_IDS) {
          payload[id] = Math.max(0, Math.floor(inventory[id] || 0));
        }
        const itemPayload = {};
        for (const item of COSMETIC_ITEMS) {
          itemPayload[item.id] = Math.max(0, Math.floor(cosmeticInventory[item.id] || 0));
        }
        payload.cosmeticItems = itemPayload;
        payload.equippedCosmetics = {
          clothes: equippedCosmetics.clothes || "",
          wings: equippedCosmetics.wings || "",
          swords: equippedCosmetics.swords || ""
        };
        return payload;
      }

      function loadInventoryFromLocal() {
        try {
          const raw = localStorage.getItem(getInventoryStorageKey());
          if (!raw) return false;
          const parsed = JSON.parse(raw);
          applyInventoryFromRecord(parsed);
          return true;
        } catch (error) {
          return false;
        }
      }

      function saveInventoryToLocal() {
        try {
          localStorage.setItem(getInventoryStorageKey(), JSON.stringify(buildInventoryPayload()));
        } catch (error) {
          // ignore localStorage quota/write failures
        }
      }

      function saveInventory() {
        saveInventoryToLocal();
        if (!network.enabled || !network.inventoryRef) return;
        network.inventoryRef.set(buildInventoryPayload()).catch(() => {
          setNetworkState("Inventory save error", true);
        });
      }

      function reloadMyInventoryFromServer() {
        if (!network.enabled || !network.inventoryRef) return;
        network.inventoryRef.once("value").then((snapshot) => {
          if (!snapshot.exists()) return;
          applyInventoryFromRecord(snapshot.val() || {});
          saveInventoryToLocal();
          refreshToolbar();
        }).catch(() => {});
      }

      function getInitialWorldId() {
        return normalizeWorldId(localStorage.getItem("growtopia_current_world") || "default-world") || "default-world";
      }

      function normalizeWorldId(value) {
        return (value || "")
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9_-]/g, "-")
          .replace(/-+/g, "-")
          .replace(/^[-_]+|[-_]+$/g, "")
          .slice(0, 24);
      }

      function hashWorldSeed(worldId) {
        if (typeof blocksModule.hashWorldSeed === "function") {
          return blocksModule.hashWorldSeed(worldId);
        }
        let h = 2166136261;
        for (let i = 0; i < worldId.length; i++) {
          h ^= worldId.charCodeAt(i);
          h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
        }
        return (h >>> 0) || 1;
      }

      function chance(seed) {
        const n = Math.sin(seed * 12.9898) * 43758.5453;
        return n - Math.floor(n);
      }

      function makeWorld(worldId) {
        const w = Array.from({ length: WORLD_H }, () => Array(WORLD_W).fill(0));
        const seed = hashWorldSeed(worldId);
        const baseGround = 17;

        for (let x = 0; x < WORLD_W; x++) {
          const n1 = Math.sin((x + seed * 0.001) * 0.19) * 2;
          const n2 = Math.sin((x + seed * 0.003) * 0.06) * 3;
          const noise = Math.floor(n1 + n2);
          const groundY = baseGround + noise;

          for (let y = groundY; y < WORLD_H; y++) {
            if (y === groundY) w[y][x] = 1;
            else if (y < groundY + 3) w[y][x] = 2;
            else w[y][x] = 3;
          }
        }

        for (let x = 10; x < WORLD_W - 10; x += 7) {
          const gy = getTopSolidY(w, x);
          if (chance((x + seed) * 1.117) > 0.3 && gy > 3) {
            w[gy - 1][x] = 4;
          }
        }

        for (let x = 18; x < WORLD_W - 12; x += 12) {
          const gy = getTopSolidY(w, x);
          if (chance((x + seed) * 2.41) > 0.5) {
            for (let dx = 0; dx < 3; dx++) {
              w[gy][x + dx] = 5;
            }
          }
        }

        return w;
      }

      function getTopSolidY(grid, x) {
        for (let y = 0; y < WORLD_H; y++) {
          if (grid[y][x] !== 0) return y;
        }
        return WORLD_H - 1;
      }

      function resetForWorldChange() {
        remotePlayers.clear();
        updateOnlineCount();
        world = makeWorld(currentWorldId);
        player.x = TILE * 8;
        player.y = TILE * 11;
        player.vx = 0;
        player.vy = 0;
        networkLastX = -1;
        networkLastY = -1;
        networkLastFacing = 0;
        airJumpsUsed = 0;
      }

      function setInWorldState(nextValue) {
        inWorld = Boolean(nextValue);
        menuScreenEl.classList.toggle("hidden", inWorld);
        toolbar.classList.toggle("hidden", !inWorld);
        mobileControlsEl.classList.toggle("hidden", !inWorld || !isCoarsePointer);
        chatToggleBtn.classList.toggle("hidden", !inWorld);
        logsToggleBtn.classList.toggle("hidden", !canViewAccountLogs);
        adminToggleBtn.classList.toggle("hidden", !canUseAdminPanel);
        exitWorldBtn.classList.toggle("hidden", !inWorld);
        if (inWorld) {
          setChatOpen(false);
        } else {
          setChatOpen(false);
        }
        if (!canViewAccountLogs) {
          setLogsOpen(false);
        }
        if (!canUseAdminPanel) {
          setAdminOpen(false);
        }
        refreshCanvasWrapVisibility();
        setCurrentWorldUI();
        updateOnlineCount();
      }

      function formatChatTimestamp(timestamp) {
        if (typeof chatModule.formatChatTimestamp === "function") {
          return chatModule.formatChatTimestamp(timestamp);
        }
        if (!timestamp || typeof timestamp !== "number") return "";
        const d = new Date(timestamp);
        const hh = String(d.getHours()).padStart(2, "0");
        const mm = String(d.getMinutes()).padStart(2, "0");
        return hh + ":" + mm;
      }

      function renderChatMessages() {
        chatMessagesEl.innerHTML = "";
        const ordered = chatMessages
          .slice()
          .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
        for (const message of ordered) {
          const row = document.createElement("div");
          row.className = "chat-row";
          const time = formatChatTimestamp(message.createdAt);
          const name = (message.name || "Guest").slice(0, 16);
          const sessionTag = String(message.sessionId || "").slice(-4);
          const sessionLabel = sessionTag ? " #" + sessionTag : "";
          row.textContent = (time ? "[" + time + "] " : "") + name + sessionLabel + ": " + (message.text || "");
          chatMessagesEl.appendChild(row);
        }
        chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
      }

      function setChatOpen(open) {
        isChatOpen = Boolean(open) && inWorld;
        const showChatPanel = !gameShellEl.classList.contains("hidden");
        chatPanelEl.classList.toggle("hidden", !showChatPanel);
        if (chatInputRowEl) {
          chatInputRowEl.classList.toggle("hidden", !isChatOpen);
        }
        if (isChatOpen && isLogsOpen) {
          setLogsOpen(false);
        }
        if (isChatOpen) {
          keys["KeyA"] = false;
          keys["KeyD"] = false;
          keys["ArrowLeft"] = false;
          keys["ArrowRight"] = false;
          keys["KeyW"] = false;
          keys["Space"] = false;
          keys["ArrowUp"] = false;
          touchControls.left = false;
          touchControls.right = false;
          touchControls.jump = false;
          chatInputEl.focus();
        } else {
          chatInputEl.blur();
        }
      }

      function renderLogsMessages() {
        logsMessagesEl.innerHTML = "";
        for (const message of logsMessages) {
          const row = document.createElement("div");
          row.className = "logs-row";
          const time = formatChatTimestamp(message.createdAt);
          row.textContent = (time ? "[" + time + "] " : "") + (message.text || "");
          logsMessagesEl.appendChild(row);
        }
        logsMessagesEl.scrollTop = logsMessagesEl.scrollHeight;
      }

      function setLogsOpen(open) {
        if (!canViewAccountLogs) {
          isLogsOpen = false;
          logsPanelEl.classList.add("hidden");
          refreshCanvasWrapVisibility();
          return;
        }
        isLogsOpen = Boolean(open);
        logsPanelEl.classList.toggle("hidden", !isLogsOpen);
        if (isLogsOpen && isChatOpen) {
          setChatOpen(false);
        }
        refreshCanvasWrapVisibility();
      }

      function refreshCanvasWrapVisibility() {
        const showWrap = inWorld || isLogsOpen;
        canvasWrapEl.classList.toggle("hidden", !showWrap);
        canvas.classList.toggle("hidden", !inWorld);
      }

      function addLogMessage(message) {
        if (!message || !message.text) return;
        logsMessages.push(message);
        if (logsMessages.length > 120) {
          logsMessages.shift();
        }
        renderLogsMessages();
      }

      function clearLogsView() {
        logsMessages.length = 0;
        renderLogsMessages();
      }

      function clearLogsData() {
        if (hasAdminPermission("clear_logs") && network.db) {
          network.db.ref(BASE_PATH + "/account-logs").remove().then(() => {
            clearLogsView();
            logAdminAudit("Admin(panel) cleared account logs.");
            pushAdminAuditEntry("clear_logs", "", "");
          }).catch(() => {});
          return;
        }
        clearLogsView();
      }

      function addClientLog(text, accountIdOverride, usernameOverride, sessionIdOverride) {
        const targetAccountId = accountIdOverride || playerProfileId;
        if (!targetAccountId) return;
        let db;
        try {
          db = network.db || getAuthDb();
        } catch (error) {
          return;
        }
        const logRef = db.ref(BASE_PATH + "/account-logs/" + targetAccountId);
        logRef.push({
          text: text.toString().slice(0, 180),
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          sessionId: sessionIdOverride !== undefined ? sessionIdOverride : (playerSessionId || ""),
          sourcePlayerId: playerId,
          username: (usernameOverride || playerName || "").toString().slice(0, 20),
          accountId: targetAccountId
        }).catch(() => {});
      }

      function teardownGlobalRealtimeListeners() {
        if (network.connectedRef && network.handlers.connected) {
          network.connectedRef.off("value", network.handlers.connected);
        }
        if (network.inventoryRef && network.handlers.inventory) {
          network.inventoryRef.off("value", network.handlers.inventory);
        }
        if (network.mySessionRef && network.handlers.mySession) {
          network.mySessionRef.off("value", network.handlers.mySession);
        }
        if (network.myCommandRef && network.handlers.myCommand) {
          network.myCommandRef.off("value", network.handlers.myCommand);
        }
        if (network.worldsIndexRef && network.handlers.worldsIndex) {
          network.worldsIndexRef.off("value", network.handlers.worldsIndex);
        }
        if (network.globalPlayersRef && network.handlers.globalPlayers) {
          network.globalPlayersRef.off("value", network.handlers.globalPlayers);
        }
        if (network.accountLogsRootRef && network.handlers.accountLogAdded) {
          network.accountLogsRootRef.off("value", network.handlers.accountLogAdded);
        }
        if (network.myBanRef && network.handlers.myBan) {
          network.myBanRef.off("value", network.handlers.myBan);
        }
        if (network.accountsRef && network.handlers.adminAccounts) {
          network.accountsRef.off("value", network.handlers.adminAccounts);
        }
        if (network.usernamesRef && network.handlers.adminUsernames) {
          network.usernamesRef.off("value", network.handlers.adminUsernames);
        }
        if (network.adminRolesRef && network.handlers.adminRoles) {
          network.adminRolesRef.off("value", network.handlers.adminRoles);
        }
        if (network.adminAuditRef && network.handlers.adminAudit) {
          network.adminAuditRef.off("value", network.handlers.adminAudit);
        }
        if (network.bansRef && network.handlers.adminBans) {
          network.bansRef.off("value", network.handlers.adminBans);
        }
        if (network.sessionsRootRef && network.handlers.adminSessions) {
          network.sessionsRootRef.off("value", network.handlers.adminSessions);
        }
        if (network.inventoriesRootRef && network.handlers.adminInventories) {
          network.inventoriesRootRef.off("value", network.handlers.adminInventories);
        }
        adminDataListening = false;
      }

      function syncAdminDataListeners() {
        if (!network.enabled) return;
        if (canUseAdminPanel && adminDataListening) {
          if (hasAdminPermission("view_audit")) {
            if (network.adminAuditRef && network.handlers.adminAudit) {
              network.adminAuditRef.off("value", network.handlers.adminAudit);
              network.adminAuditRef.on("value", network.handlers.adminAudit);
            }
          } else {
            if (network.adminAuditRef && network.handlers.adminAudit) {
              network.adminAuditRef.off("value", network.handlers.adminAudit);
            }
            adminState.audit = [];
            refreshAuditActionFilterOptions();
          }
          return;
        }
        if (canUseAdminPanel && !adminDataListening) {
          if (network.accountsRef && network.handlers.adminAccounts) {
            network.accountsRef.on("value", network.handlers.adminAccounts);
          }
          if (network.usernamesRef && network.handlers.adminUsernames) {
            network.usernamesRef.on("value", network.handlers.adminUsernames);
          }
          if (network.bansRef && network.handlers.adminBans) {
            network.bansRef.on("value", network.handlers.adminBans);
          }
          if (network.sessionsRootRef && network.handlers.adminSessions) {
            network.sessionsRootRef.on("value", network.handlers.adminSessions);
          }
          if (network.inventoriesRootRef && network.handlers.adminInventories) {
            network.inventoriesRootRef.on("value", network.handlers.adminInventories);
          }
          if (hasAdminPermission("view_audit") && network.adminAuditRef && network.handlers.adminAudit) {
            network.adminAuditRef.on("value", network.handlers.adminAudit);
          }
          adminDataListening = true;
          return;
        }
        if (!canUseAdminPanel && adminDataListening) {
          if (network.accountsRef && network.handlers.adminAccounts) {
            network.accountsRef.off("value", network.handlers.adminAccounts);
          }
          if (network.usernamesRef && network.handlers.adminUsernames) {
            network.usernamesRef.off("value", network.handlers.adminUsernames);
          }
          if (network.bansRef && network.handlers.adminBans) {
            network.bansRef.off("value", network.handlers.adminBans);
          }
          if (network.sessionsRootRef && network.handlers.adminSessions) {
            network.sessionsRootRef.off("value", network.handlers.adminSessions);
          }
          if (network.inventoriesRootRef && network.handlers.adminInventories) {
            network.inventoriesRootRef.off("value", network.handlers.adminInventories);
          }
          if (network.adminAuditRef && network.handlers.adminAudit) {
            network.adminAuditRef.off("value", network.handlers.adminAudit);
          }
          adminState.accounts = {};
          adminState.usernames = {};
          adminState.roles = {};
          adminState.audit = [];
          refreshAuditActionFilterOptions();
          adminState.bans = {};
          adminState.sessions = {};
          adminState.inventories = {};
          renderAdminPanel();
          adminDataListening = false;
        }
      }

      function forceLogout(reason) {
        saveInventoryToLocal();
        if (inWorld) {
          sendSystemWorldMessage(playerName + " left the world.");
        }
        detachCurrentWorldListeners();
        teardownGlobalRealtimeListeners();
        if (network.globalPlayerRef) {
          network.globalPlayerRef.remove().catch(() => {});
        }
        releaseAccountSession();
        network.enabled = false;
        setInWorldState(false);
        setAdminOpen(false);
        pendingTeleportSelf = null;
        lastHandledTeleportCommandId = "";
        currentAdminRole = "none";
        canUseAdminPanel = false;
        canViewAccountLogs = false;
        adminSearchQuery = "";
        adminAuditActionFilter = "";
        adminAuditActorFilter = "";
        adminAuditTargetFilter = "";
        if (adminSearchInput) adminSearchInput.value = "";
        if (adminAuditActionFilterEl) adminAuditActionFilterEl.value = "";
        if (adminAuditActorFilterEl) adminAuditActorFilterEl.value = "";
        if (adminAuditTargetFilterEl) adminAuditTargetFilterEl.value = "";
        gameShellEl.classList.add("hidden");
        authScreenEl.classList.remove("hidden");
        setChatOpen(false);
        applySavedCredentialsToForm();
        setAuthStatus(reason || "Logged out.", true);
      }

      function sendSystemWorldMessage(text) {
        if (!inWorld) return;
        const safeText = (text || "").toString().slice(0, 120);
        if (!safeText) return;
        if (!network.enabled || !network.chatRef) {
          addChatMessage({
            name: "[System]",
            playerId: "",
            text: safeText,
            createdAt: Date.now()
          });
          return;
        }
        network.chatRef.push({
          name: "[System]",
          playerId: "",
          text: safeText,
          createdAt: firebase.database.ServerValue.TIMESTAMP
        }).catch(() => {
          setNetworkState("System message error", true);
        });
      }

      function addChatMessage(message) {
        if (!message || !message.text) return;
        chatMessages.push(message);
        if (chatMessages.length > 100) {
          chatMessages.shift();
        }
        if (message.playerId) {
          overheadChatByPlayer.set(message.playerId, {
            text: (message.text || "").toString().slice(0, 80),
            expiresAt: performance.now() + CHAT_BUBBLE_MS
          });
        }
        renderChatMessages();
      }

      function sendChatMessage() {
        if (!inWorld) return;
        const raw = chatInputEl.value || "";
        const trimmed = raw.trim();
        if (!trimmed) return;
        if (handleAdminChatCommand(trimmed)) {
          chatInputEl.value = "";
          setChatOpen(false);
          return;
        }
        const text = trimmed.slice(0, 120);
        if (!text) return;
        if (!network.enabled || !network.chatRef) {
          chatInputEl.value = "";
          addChatMessage({
            name: playerName,
            playerId,
            sessionId: playerSessionId || "",
            text,
            createdAt: Date.now()
          });
          setChatOpen(false);
          return;
        }
        try {
          overheadChatByPlayer.set(playerId, {
            text,
            expiresAt: performance.now() + CHAT_BUBBLE_MS
          });
          network.chatRef.push({
            name: playerName,
            playerId,
            sessionId: playerSessionId || "",
            text,
            createdAt: firebase.database.ServerValue.TIMESTAMP
          }).then(() => {
            chatInputEl.value = "";
            setChatOpen(false);
          }).catch(() => {
            setNetworkState("Chat send error", true);
          });
        } catch (error) {
          console.error(error);
          setNetworkState("Chat send error", true);
        }
      }

      function setCurrentWorldUI() {
        currentWorldLabelEl.textContent = inWorld ? currentWorldId : "menu";
        if (!worldInputEl.value) {
          worldInputEl.value = currentWorldId || "";
        }
      }

      function isSolidTile(tx, ty) {
        if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H) return true;
        const id = world[ty][tx];
        return blockDefs[id].solid;
      }

      function rectCollides(x, y, w, h) {
        const left = Math.floor(x / TILE);
        const right = Math.floor((x + w - 1) / TILE);
        const top = Math.floor(y / TILE);
        const bottom = Math.floor((y + h - 1) / TILE);

        for (let ty = top; ty <= bottom; ty++) {
          for (let tx = left; tx <= right; tx++) {
            if (isSolidTile(tx, ty)) return true;
          }
        }
        return false;
      }

      function updatePlayer() {
        const nowMs = performance.now();
        const moveLeft = keys["KeyA"] || keys["ArrowLeft"] || touchControls.left;
        const moveRight = keys["KeyD"] || keys["ArrowRight"] || touchControls.right;
        const jump = keys["KeyW"] || keys["Space"] || keys["ArrowUp"] || touchControls.jump;
        const jumpPressedThisFrame = jump && !wasJumpHeld;
        const hasWingDoubleJump = Boolean(equippedCosmetics.wings);

        if (moveLeft) {
          player.vx -= player.grounded ? MOVE_ACCEL : MOVE_ACCEL * AIR_CONTROL;
          player.facing = -1;
        }
        if (moveRight) {
          player.vx += player.grounded ? MOVE_ACCEL : MOVE_ACCEL * AIR_CONTROL;
          player.facing = 1;
        }
        if (jumpPressedThisFrame && player.grounded && (nowMs - lastJumpAtMs) >= JUMP_COOLDOWN_MS) {
          player.vy = JUMP_VELOCITY;
          player.grounded = false;
          lastJumpAtMs = nowMs;
          airJumpsUsed = 0;
        } else if (
          jumpPressedThisFrame &&
          !player.grounded &&
          hasWingDoubleJump &&
          airJumpsUsed < 1 &&
          (nowMs - lastAirJumpAtMs) >= 120
        ) {
          player.vy = JUMP_VELOCITY;
          lastAirJumpAtMs = nowMs;
          airJumpsUsed += 1;
        }

        player.vx = Math.max(-MAX_MOVE_SPEED, Math.min(MAX_MOVE_SPEED, player.vx));
        player.vy += GRAVITY;
        player.vy = Math.min(player.vy, MAX_FALL_SPEED);

        player.vx *= player.grounded ? FRICTION : AIR_FRICTION;

        let nextX = player.x + player.vx;
        if (!rectCollides(nextX, player.y, PLAYER_W, PLAYER_H)) {
          player.x = nextX;
        } else {
          const step = Math.sign(player.vx);
          while (!rectCollides(player.x + step, player.y, PLAYER_W, PLAYER_H)) {
            player.x += step;
          }
          player.vx = 0;
        }

        let nextY = player.y + player.vy;
        if (!rectCollides(player.x, nextY, PLAYER_W, PLAYER_H)) {
          player.y = nextY;
          player.grounded = false;
        } else {
          const step = Math.sign(player.vy);
          while (!rectCollides(player.x, player.y + step, PLAYER_W, PLAYER_H)) {
            player.y += step;
          }
          if (player.vy > 0) player.grounded = true;
          player.vy = 0;
        }

        if (player.grounded) {
          airJumpsUsed = 0;
        }

        if (player.y > WORLD_H * TILE) {
          player.x = TILE * 8;
          player.y = TILE * 8;
          player.vx = 0;
          player.vy = 0;
        }

        wasJumpHeld = jump;
      }

      function updateCamera() {
        const targetX = player.x + PLAYER_W / 2 - canvas.width / 2;
        const targetY = player.y + PLAYER_H / 2 - canvas.height / 2;

        cameraX += (targetX - cameraX) * 0.12;
        cameraY += (targetY - cameraY) * 0.12;

        cameraX = Math.max(0, Math.min(cameraX, WORLD_W * TILE - canvas.width));
        cameraY = Math.max(0, Math.min(cameraY, WORLD_H * TILE - canvas.height));
      }

      function drawBackground() {
        const t = performance.now() * 0.00008;
        const cloudShift = Math.sin(t) * 30;

        ctx.fillStyle = "#8fd9ff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(255,255,255,0.55)";
        for (let i = 0; i < 8; i++) {
          const x = ((i * 180 + cloudShift * (i % 2 ? 1 : -1)) % (canvas.width + 220)) - 110;
          const y = 40 + (i % 3) * 48;
          ctx.beginPath();
          ctx.ellipse(x, y, 55, 20, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = "#78c16a";
        ctx.fillRect(0, canvas.height - 46, canvas.width, 46);
      }

      function drawWorld() {
        const startX = Math.floor(cameraX / TILE);
        const endX = Math.ceil((cameraX + canvas.width) / TILE);
        const startY = Math.floor(cameraY / TILE);
        const endY = Math.ceil((cameraY + canvas.height) / TILE);

        for (let ty = startY; ty <= endY; ty++) {
          if (ty < 0 || ty >= WORLD_H) continue;
          for (let tx = startX; tx <= endX; tx++) {
            if (tx < 0 || tx >= WORLD_W) continue;
            const id = world[ty][tx];
            if (!id) continue;

            const x = tx * TILE - cameraX;
            const y = ty * TILE - cameraY;

            ctx.fillStyle = blockDefs[id].color;
            ctx.fillRect(x, y, TILE, TILE);
            ctx.fillStyle = "rgba(255,255,255,0.08)";
            ctx.fillRect(x + 2, y + 2, TILE - 4, 6);
            ctx.fillStyle = "rgba(0,0,0,0.14)";
            ctx.fillRect(x, y + TILE - 5, TILE, 5);
          }
        }
      }

      function drawWings(px, py, wingsId, facing) {
        if (!wingsId) return;
        const item = COSMETIC_LOOKUP.wings[wingsId];
        if (!item) return;
        ctx.fillStyle = item.color;
        const leftDir = facing === 1 ? -1 : 1;
        ctx.beginPath();
        ctx.moveTo(px + PLAYER_W / 2, py + 14);
        ctx.lineTo(px + PLAYER_W / 2 + leftDir * 16, py + 8);
        ctx.lineTo(px + PLAYER_W / 2 + leftDir * 20, py + 20);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(px + PLAYER_W / 2, py + 14);
        ctx.lineTo(px + PLAYER_W / 2 - leftDir * 16, py + 8);
        ctx.lineTo(px + PLAYER_W / 2 - leftDir * 20, py + 20);
        ctx.closePath();
        ctx.fill();
      }

      function drawClothes(px, py, clothesId) {
        if (!clothesId) return;
        const item = COSMETIC_LOOKUP.clothes[clothesId];
        if (!item) return;
        ctx.fillStyle = item.color;
        ctx.fillRect(px + 2, py + 15, PLAYER_W - 4, PLAYER_H - 15);
      }

      function drawSword(px, py, swordId, facing) {
        if (!swordId) return;
        const item = COSMETIC_LOOKUP.swords[swordId];
        if (!item) return;
        ctx.fillStyle = item.color;
        const handX = facing === 1 ? px + PLAYER_W - 1 : px - 9;
        ctx.fillRect(handX, py + 14, 9, 3);
      }

      function drawPlayer() {
        const px = player.x - cameraX;
        const py = player.y - cameraY;
        const cosmetics = equippedCosmetics;

        drawWings(px, py, cosmetics.wings, player.facing);

        ctx.fillStyle = "#263238";
        ctx.fillRect(px, py, PLAYER_W, PLAYER_H);

        drawClothes(px, py, cosmetics.clothes);

        ctx.fillStyle = "#ffdbac";
        ctx.fillRect(px + 4, py + 4, PLAYER_W - 8, 10);

        ctx.fillStyle = "#0d0d0d";
        const eyeX = player.facing === 1 ? px + PLAYER_W - 7 : px + 4;
        ctx.fillRect(eyeX, py + 8, 3, 3);

        drawSword(px, py, cosmetics.swords, player.facing);
      }

      function drawRemotePlayers() {
        remotePlayers.forEach((other) => {
          const px = other.x - cameraX;
          const py = other.y - cameraY;
          if (px < -40 || py < -40 || px > canvas.width + 40 || py > canvas.height + 40) return;
          const cosmetics = other.cosmetics || {};

          drawWings(px, py, cosmetics.wings || "", other.facing || 1);

          ctx.fillStyle = "#2a75bb";
          ctx.fillRect(px, py, PLAYER_W, PLAYER_H);

          drawClothes(px, py, cosmetics.clothes || "");

          ctx.fillStyle = "#ffdbac";
          ctx.fillRect(px + 4, py + 4, PLAYER_W - 8, 10);

          ctx.fillStyle = "#102338";
          const eyeX = other.facing === 1 ? px + PLAYER_W - 7 : px + 4;
          ctx.fillRect(eyeX, py + 8, 3, 3);

          drawSword(px, py, cosmetics.swords || "", other.facing || 1);

          ctx.fillStyle = "rgba(10, 25, 40, 0.75)";
          ctx.fillRect(px - 4, py - 19, 74, 15);
          ctx.fillStyle = "#f3fbff";
          ctx.font = "12px 'Trebuchet MS', sans-serif";
          ctx.fillText(other.name || "Player", px, py - 8);
        });
      }

      function wrapChatText(text, maxTextWidth) {
        const words = (text || "").split(/\s+/).filter(Boolean);
        if (!words.length) return [""];
        const lines = [];
        let line = words[0];
        for (let i = 1; i < words.length; i++) {
          const nextLine = line + " " + words[i];
          if (ctx.measureText(nextLine).width <= maxTextWidth) {
            line = nextLine;
          } else {
            lines.push(line);
            line = words[i];
          }
        }
        lines.push(line);
        return lines.slice(0, 4);
      }

      function drawAllOverheadChats() {
        const localPx = player.x - cameraX;
        const localPy = player.y - cameraY;
        drawOverheadChat(playerId, localPx + PLAYER_W / 2, localPy - 10);
        remotePlayers.forEach((other) => {
          const px = other.x - cameraX;
          const py = other.y - cameraY;
          drawOverheadChat(other.id || "", px + PLAYER_W / 2, py - 28);
        });
      }

      function drawOverheadChat(sourcePlayerId, centerX, baseY) {
        if (!sourcePlayerId) return;
        const entry = overheadChatByPlayer.get(sourcePlayerId);
        if (!entry) return;

        const now = performance.now();
        const remaining = entry.expiresAt - now;
        if (remaining <= 0) {
          overheadChatByPlayer.delete(sourcePlayerId);
          return;
        }

        const alpha = Math.max(0, Math.min(1, remaining / CHAT_BUBBLE_MS));
        const text = entry.text;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.font = "12px 'Trebuchet MS', sans-serif";
        const padX = 7;
        const padY = 5;
        const maxTextWidth = CHAT_BUBBLE_MAX_WIDTH - padX * 2;
        const lines = wrapChatText(text, maxTextWidth);
        let widestLine = 0;
        for (const line of lines) {
          widestLine = Math.max(widestLine, ctx.measureText(line).width);
        }
        const bubbleW = Math.min(CHAT_BUBBLE_MAX_WIDTH, Math.max(36, widestLine + padX * 2));
        const bubbleH = lines.length * CHAT_BUBBLE_LINE_HEIGHT + padY * 2;
        let bubbleX = centerX - bubbleW / 2;
        let bubbleY = baseY - bubbleH - 2;
        if (bubbleX < 4) bubbleX = 4;
        if (bubbleX + bubbleW > canvas.width - 4) bubbleX = canvas.width - 4 - bubbleW;
        if (bubbleY < 4) bubbleY = 4;

        ctx.fillStyle = "rgba(10, 25, 40, 0.92)";
        ctx.fillRect(bubbleX, bubbleY, bubbleW, bubbleH);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
        ctx.strokeRect(bubbleX, bubbleY, bubbleW, bubbleH);
        ctx.fillStyle = "#f7fbff";
        for (let i = 0; i < lines.length; i++) {
          ctx.fillText(lines[i], bubbleX + padX, bubbleY + padY + 10 + i * CHAT_BUBBLE_LINE_HEIGHT);
        }
        ctx.restore();
      }

      function drawCrosshair() {
        const x = mouseWorld.tx * TILE - cameraX;
        const y = mouseWorld.ty * TILE - cameraY;
        if (mouseWorld.tx < 0 || mouseWorld.ty < 0 || mouseWorld.tx >= WORLD_W || mouseWorld.ty >= WORLD_H) return;
        if (!canEditTarget(mouseWorld.tx, mouseWorld.ty)) return;

        ctx.strokeStyle = "rgba(255, 209, 102, 0.85)";
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 1, y + 1, TILE - 2, TILE - 2);
      }

      function drawInfo() {
        const tx = Math.floor((player.x + PLAYER_W / 2) / TILE);
        const ty = Math.floor((player.y + PLAYER_H / 2) / TILE);
        const selectedId = slotOrder[selectedSlot];
        const usingFist = selectedId === "fist";
        const itemName = usingFist ? "Fist" : blockDefs[selectedId].name;
        const countText = usingFist ? "infinite" : String(inventory[selectedId]);
        let cosmeticOwned = 0;
        for (const item of COSMETIC_ITEMS) {
          cosmeticOwned += Math.max(0, Number(cosmeticInventory[item.id]) || 0);
        }

        ctx.fillStyle = "rgba(9, 25, 41, 0.7)";
        ctx.fillRect(12, 12, 390, 62);
        ctx.strokeStyle = "rgba(255,255,255,0.25)";
        ctx.strokeRect(12, 12, 390, 62);

        ctx.fillStyle = "#f7fbff";
        ctx.font = "bold 15px 'Trebuchet MS', sans-serif";
        ctx.fillText("World: " + currentWorldId + " | Selected: " + itemName + " (" + countText + ")", 24, 36);
        ctx.font = "14px 'Trebuchet MS', sans-serif";
        ctx.fillText("Player Tile: " + tx + ", " + ty + " | Cosmetic items: " + cosmeticOwned, 24, 56);
      }

      function render() {
        drawBackground();
        drawWorld();
        drawRemotePlayers();
        drawPlayer();
        drawAllOverheadChats();
        drawCrosshair();
        drawInfo();
      }

      function canEditTarget(tx, ty) {
        if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H) return false;

        const centerX = player.x + PLAYER_W / 2;
        const centerY = player.y + PLAYER_H / 2;
        const targetX = tx * TILE + TILE / 2;
        const targetY = ty * TILE + TILE / 2;
        const dx = targetX - centerX;
        const dy = targetY - centerY;
        const dist = Math.hypot(dx, dy);
        return dist <= TILE * 4.5;
      }

      function tryPlace(tx, ty) {
        const id = slotOrder[selectedSlot];
        if (typeof id !== "number") return;
        if (!canEditTarget(tx, ty)) return;
        if (inventory[id] <= 0) return;
        if (world[ty][tx] !== 0) return;

        const bx = tx * TILE;
        const by = ty * TILE;
        if (bx < player.x + PLAYER_W && bx + TILE > player.x && by < player.y + PLAYER_H && by + TILE > player.y) {
          return;
        }

        world[ty][tx] = id;
        inventory[id]--;
        syncBlock(tx, ty, id);
        saveInventory();
        refreshToolbar();
      }

      function tryBreak(tx, ty) {
        if (!canEditTarget(tx, ty)) return;
        const id = world[ty][tx];
        if (id === 0) return;

        world[ty][tx] = 0;
        inventory[id] = (inventory[id] || 0) + 1;
        syncBlock(tx, ty, 0);
        saveInventory();
        refreshToolbar();
      }

      function useActionAt(tx, ty) {
        const selectedId = slotOrder[selectedSlot];
        if (selectedId === "fist") {
          tryBreak(tx, ty);
          return;
        }
        tryPlace(tx, ty);
      }

      function setNetworkState(label, isWarning) {
        networkStateEl.textContent = label;
        networkStateEl.classList.toggle("danger", Boolean(isWarning));
      }

      function updateOnlineCount() {
        const worldCount = inWorld ? (remotePlayers.size + 1) : 0;
        onlineCountEl.textContent = worldCount + " world online";
        totalOnlineCountEl.textContent = totalOnlinePlayers + " total online";
      }

      function hasFirebaseConfig(config) {
        return Boolean(config && config.apiKey && config.projectId && config.databaseURL);
      }

      function parseTileKey(key) {
        const parts = key.split("_");
        if (parts.length !== 2) return null;

        const tx = Number(parts[0]);
        const ty = Number(parts[1]);
        if (!Number.isInteger(tx) || !Number.isInteger(ty)) return null;
        if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H) return null;
        return { tx, ty };
      }

      function pickRandomWorlds(worldIds, count) {
        if (typeof menuModule.pickRandomWorlds === "function") {
          return menuModule.pickRandomWorlds(worldIds, count);
        }
        const pool = worldIds.slice();
        for (let i = pool.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const tmp = pool[i];
          pool[i] = pool[j];
          pool[j] = tmp;
        }
        return pool.slice(0, count);
      }

      function refreshWorldButtons(worldIds) {
        if (Array.isArray(worldIds)) {
          knownWorldIds = Array.from(new Set(worldIds.filter(Boolean)));
        }
        const occupancyWorlds = Array.from(worldOccupancy.keys());
        const fallback = currentWorldId ? [currentWorldId] : [];
        const unique = Array.from(new Set(knownWorldIds.concat(occupancyWorlds, fallback)));
        const randomWorlds = pickRandomWorlds(unique, 8);

        worldButtonsEl.innerHTML = "";
        for (const id of randomWorlds) {
          const count = worldOccupancy.get(id) || 0;
          const button = document.createElement("button");
          button.type = "button";
          button.className = "world-chip";
          button.textContent = count > 0 ? id + " [" + count + "]" : id;
          button.addEventListener("click", () => {
            switchWorld(id, true);
          });
          worldButtonsEl.appendChild(button);
        }
      }

      function detachCurrentWorldListeners() {
        if (network.playersRef && network.handlers.players) {
          network.playersRef.off("value", network.handlers.players);
        }
        if (network.blocksRef && network.handlers.blockAdded) {
          network.blocksRef.off("child_added", network.handlers.blockAdded);
        }
        if (network.blocksRef && network.handlers.blockChanged) {
          network.blocksRef.off("child_changed", network.handlers.blockChanged);
        }
        if (network.blocksRef && network.handlers.blockRemoved) {
          network.blocksRef.off("child_removed", network.handlers.blockRemoved);
        }
        if (network.chatFeedRef && network.handlers.chatAdded) {
          network.chatFeedRef.off("child_added", network.handlers.chatAdded);
        }

        if (network.playerRef) {
          network.playerRef.remove().catch(() => {});
        }

        network.playerRef = null;
        network.playersRef = null;
        network.blocksRef = null;
        network.chatRef = null;
        network.chatFeedRef = null;
        network.handlers.players = null;
        network.handlers.blockAdded = null;
        network.handlers.blockChanged = null;
        network.handlers.blockRemoved = null;
        network.handlers.chatAdded = null;
      }

      function leaveCurrentWorld() {
        sendSystemWorldMessage(playerName + " left the world.");
        addClientLog("Left world: " + currentWorldId + ".");
        detachCurrentWorldListeners();
        remotePlayers.clear();
        overheadChatByPlayer.clear();
        touchControls.left = false;
        touchControls.right = false;
        touchControls.jump = false;
        if (network.globalPlayerRef) {
          network.globalPlayerRef.remove().catch(() => {});
        }
        setInWorldState(false);
        refreshWorldButtons();
      }

      function writeWorldIndexMeta(worldId, createIfMissing) {
        if (!network.worldsIndexRef) return;
        const indexRef = network.worldsIndexRef.child(worldId);

        if (createIfMissing) {
          indexRef.once("value").then((snap) => {
            if (!snap.exists()) {
              indexRef.set({
                id: worldId,
                createdBy: playerName,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                updatedAt: firebase.database.ServerValue.TIMESTAMP
              });
            } else {
              indexRef.child("updatedAt").set(firebase.database.ServerValue.TIMESTAMP);
            }
          }).catch(() => {
            setNetworkState("World index error", true);
          });
          return;
        }

        indexRef.child("updatedAt").set(firebase.database.ServerValue.TIMESTAMP).catch(() => {});
      }

      function switchWorld(nextWorldId, createIfMissing) {
        const worldId = normalizeWorldId(nextWorldId);
        if (!worldId) return;
        const wasInWorld = inWorld;
        const previousWorldId = currentWorldId;

        if (!network.enabled) {
          setInWorldState(true);
          currentWorldId = worldId;
          localStorage.setItem("growtopia_current_world", worldId);
          setCurrentWorldUI();
          resetForWorldChange();
          refreshWorldButtons([worldId]);
          addChatMessage({
            name: "[System]",
            playerId: "",
            sessionId: playerSessionId || "",
            text: "Entered " + worldId + " with 1 player.",
            createdAt: Date.now()
          });
          return;
        }

        if (worldId === currentWorldId && network.playersRef) return;

        if (wasInWorld && previousWorldId && previousWorldId !== worldId) {
          sendSystemWorldMessage(playerName + " left the world.");
          addClientLog("Switched away from world: " + previousWorldId + ".");
        }
        setInWorldState(true);
        detachCurrentWorldListeners();
        currentWorldId = worldId;
        localStorage.setItem("growtopia_current_world", worldId);
        setCurrentWorldUI();
        resetForWorldChange();
        writeWorldIndexMeta(worldId, createIfMissing);
        worldChatStartedAt = Date.now();

        const worldPath = BASE_PATH + "/worlds/" + worldId;
        network.playersRef = network.db.ref(worldPath + "/players");
        network.blocksRef = network.db.ref(worldPath + "/blocks");
        network.chatRef = network.db.ref(worldPath + "/chat");
        if (worldChatStartedAt > 0) {
          network.chatFeedRef = network.chatRef.orderByChild("createdAt").startAt(worldChatStartedAt).limitToLast(100);
        } else {
          network.chatFeedRef = network.chatRef.limitToLast(100);
        }
        network.playerRef = network.playersRef.child(playerId);

        network.handlers.players = (snapshot) => {
          remotePlayers.clear();
          const players = snapshot.val() || {};

          Object.keys(players).forEach((id) => {
            if (id === playerId) return;
            const p = players[id];
            if (!p || typeof p.x !== "number" || typeof p.y !== "number") return;

            remotePlayers.set(id, {
              id,
              x: p.x,
              y: p.y,
              facing: p.facing || 1,
              name: (p.name || "Player").toString().slice(0, 16),
              cosmetics: normalizeRemoteEquippedCosmetics(p.cosmetics || {})
            });
          });

          updateOnlineCount();
        };

        const applyNetworkBlock = (snapshot) => {
          const tile = parseTileKey(snapshot.key || "");
          if (!tile) return;
          const id = Number(snapshot.val()) || 0;
          world[tile.ty][tile.tx] = id;
        };

        const clearNetworkBlock = (snapshot) => {
          const tile = parseTileKey(snapshot.key || "");
          if (!tile) return;
          world[tile.ty][tile.tx] = 0;
        };

        network.handlers.blockAdded = applyNetworkBlock;
        network.handlers.blockChanged = applyNetworkBlock;
        network.handlers.blockRemoved = clearNetworkBlock;
        network.handlers.chatAdded = (snapshot) => {
          const value = snapshot.val() || {};
          addChatMessage({
            name: (value.name || "Guest").toString().slice(0, 16),
            playerId: (value.playerId || "").toString(),
            sessionId: (value.sessionId || "").toString(),
            text: (value.text || "").toString().slice(0, 120),
            createdAt: typeof value.createdAt === "number" ? value.createdAt : Date.now()
          });
        };

        network.playersRef.on("value", network.handlers.players);
        network.blocksRef.on("child_added", network.handlers.blockAdded);
        network.blocksRef.on("child_changed", network.handlers.blockChanged);
        network.blocksRef.on("child_removed", network.handlers.blockRemoved);
        network.chatFeedRef.on("child_added", network.handlers.chatAdded);
        addClientLog("Joined world: " + worldId + ".");
        sendSystemWorldMessage(playerName + " joined the world.");
        network.playersRef.once("value").then((snapshot) => {
          const players = snapshot.val() || {};
          let count = Object.keys(players).length;
          if (!players[playerId]) count += 1;
          addChatMessage({
            name: "[System]",
            playerId: "",
            sessionId: playerSessionId || "",
            text: "Entered " + worldId + " with " + count + " player" + (count === 1 ? "" : "s") + ".",
            createdAt: Date.now()
          });
        }).catch(() => {});

        if (network.connected) {
          if (network.globalPlayerRef) {
            network.globalPlayerRef.onDisconnect().remove();
          }
          network.playerRef.onDisconnect().remove();
          syncPlayer(true);
          setNetworkState("Online", false);
        } else {
          setNetworkState("Connecting...", false);
        }

        if (pendingTeleportSelf && pendingTeleportSelf.worldId === currentWorldId) {
          player.x = clampTeleport(pendingTeleportSelf.x, 0, WORLD_W * TILE - PLAYER_W - 2);
          player.y = clampTeleport(pendingTeleportSelf.y, 0, WORLD_H * TILE - PLAYER_H - 2);
          player.vx = 0;
          player.vy = 0;
          pendingTeleportSelf = null;
          syncPlayer(true);
        }
      }

      function syncBlock(tx, ty, id) {
        if (!network.enabled || !network.blocksRef) return;

        network.blocksRef.child(tx + "_" + ty).set(id).catch(() => {
          setNetworkState("Network error", true);
        });
      }

      function syncPlayer(force) {
        if (!inWorld) return;
        if (!network.enabled || !network.playerRef) return;

        const now = performance.now();
        const rx = Math.round(player.x);
        const ry = Math.round(player.y);
        const moved = rx !== networkLastX || ry !== networkLastY || networkLastFacing !== player.facing;

        if (!force && !moved) return;
        if (!force && now - networkLastSyncAt < 90) return;

        networkLastSyncAt = now;
        networkLastX = rx;
        networkLastY = ry;
        networkLastFacing = player.facing;

        const payload = {
          name: playerName,
          accountId: playerProfileId,
          x: rx,
          y: ry,
          facing: player.facing,
          cosmetics: {
            clothes: equippedCosmetics.clothes || "",
            wings: equippedCosmetics.wings || "",
            swords: equippedCosmetics.swords || ""
          },
          world: currentWorldId,
          updatedAt: firebase.database.ServerValue.TIMESTAMP
        };

        network.playerRef.update(payload).catch(() => {
          setNetworkState("Network error", true);
        });

        if (!network.globalPlayerRef) return;
        network.globalPlayerRef.update(payload).catch(() => {
          setNetworkState("Network error", true);
        });
      }

      function enterWorldFromInput() {
        const id = normalizeWorldId(worldInputEl.value);
        if (!id) return;
        switchWorld(id, true);
      }

      function bindWorldControls() {
        enterWorldBtn.addEventListener("click", enterWorldFromInput);
        chatToggleBtn.addEventListener("click", () => {
          if (!inWorld) return;
          setChatOpen(true);
        });
        logsToggleBtn.addEventListener("click", () => {
          setLogsOpen(!isLogsOpen);
        });
        adminToggleBtn.addEventListener("click", () => {
          setAdminOpen(!isAdminOpen);
        });
        adminCloseBtn.addEventListener("click", () => {
          setAdminOpen(false);
        });
        if (adminSearchInput) {
          adminSearchInput.addEventListener("input", () => {
            adminSearchQuery = (adminSearchInput.value || "").trim().toLowerCase();
            renderAdminPanel();
          });
        }
        if (adminAuditActionFilterEl) {
          adminAuditActionFilterEl.addEventListener("change", () => {
            adminAuditActionFilter = (adminAuditActionFilterEl.value || "").trim().toLowerCase();
            renderAdminPanel();
          });
        }
        if (adminAuditActorFilterEl) {
          adminAuditActorFilterEl.addEventListener("input", () => {
            adminAuditActorFilter = (adminAuditActorFilterEl.value || "").trim().toLowerCase();
            renderAdminPanel();
          });
        }
        if (adminAuditTargetFilterEl) {
          adminAuditTargetFilterEl.addEventListener("input", () => {
            adminAuditTargetFilter = (adminAuditTargetFilterEl.value || "").trim().toLowerCase();
            renderAdminPanel();
          });
        }
        if (adminAuditExportBtn) {
          adminAuditExportBtn.addEventListener("click", () => {
            exportAuditTrail();
          });
        }
        adminAccountsEl.addEventListener("click", handleAdminAction);
        adminAccountsEl.addEventListener("change", handleAdminInputChange);
        clearLogsBtn.addEventListener("click", () => {
          clearLogsData();
        });
        chatSendBtn.addEventListener("click", () => {
          sendChatMessage();
        });
        chatInputEl.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            sendChatMessage();
          }
        });
        exitWorldBtn.addEventListener("click", () => {
          leaveCurrentWorld();
        });
        logoutBtn.addEventListener("click", () => {
          forceLogout("Logged out.");
        });
        worldInputEl.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            enterWorldFromInput();
          }
        });
      }

      function initFirebaseMultiplayer() {
        if (!playerProfileId) {
          setNetworkState("Auth required", true);
          return;
        }
        if (!window.firebase) {
          setNetworkState("Offline (set firebase-config.js)", true);
          refreshWorldButtons([currentWorldId]);
          totalOnlinePlayers = inWorld ? 1 : 0;
          updateOnlineCount();
          return;
        }

        try {
          network.db = getAuthDb();
          network.enabled = true;
          network.connectedRef = network.db.ref(".info/connected");
          network.worldsIndexRef = network.db.ref(BASE_PATH + "/worlds-index");
          network.globalPlayersRef = network.db.ref(BASE_PATH + "/global-players");
          network.globalPlayerRef = network.globalPlayersRef.child(playerId);
          network.mySessionRef = network.db.ref(BASE_PATH + "/account-sessions/" + playerProfileId);
          network.myCommandRef = network.db.ref(BASE_PATH + "/account-commands/" + playerProfileId + "/teleport");
          network.inventoryRef = network.db.ref(BASE_PATH + "/player-inventories/" + playerProfileId);
          network.accountLogsRootRef = network.db.ref(BASE_PATH + "/account-logs");
          network.myBanRef = network.db.ref(BASE_PATH + "/bans/" + playerProfileId);
          network.accountsRef = network.db.ref(BASE_PATH + "/accounts");
          network.usernamesRef = network.db.ref(BASE_PATH + "/usernames");
          network.adminRolesRef = network.db.ref(BASE_PATH + "/admin-roles");
          network.adminAuditRef = network.db.ref(BASE_PATH + "/admin-audit").limitToLast(120);
          network.bansRef = network.db.ref(BASE_PATH + "/bans");
          network.sessionsRootRef = network.db.ref(BASE_PATH + "/account-sessions");
          network.inventoriesRootRef = network.db.ref(BASE_PATH + "/player-inventories");
          setNetworkState("Connecting...", false);

          network.handlers.inventory = (snapshot) => {
            if (snapshot.exists()) {
              applyInventoryFromRecord(snapshot.val() || {});
              saveInventoryToLocal();
            } else {
              saveInventory();
            }
            refreshToolbar();
            if (inWorld) {
              syncPlayer(true);
            }
          };

          network.handlers.connected = (snapshot) => {
            const isConnected = snapshot.val() === true;
            network.connected = isConnected;

            if (isConnected) {
              if (network.globalPlayerRef) {
                network.globalPlayerRef.onDisconnect().remove();
              }
              if (network.playerRef) {
                network.playerRef.onDisconnect().remove();
                syncPlayer(true);
              }
              setNetworkState("Online", false);
            } else {
              setNetworkState("Reconnecting...", true);
            }
          };
          network.handlers.mySession = (snapshot) => {
            const value = snapshot.val();
            if (!value || !value.sessionId) {
              forceLogout("You were kicked or your session expired.");
              return;
            }
            if (playerSessionId && value.sessionId !== playerSessionId) {
              forceLogout("This account is active in another client.");
            }
          };
          network.handlers.myCommand = (snapshot) => {
            const value = snapshot.val();
            if (!value || !value.id) return;
            if (value.id === lastHandledTeleportCommandId) return;
            lastHandledTeleportCommandId = value.id;
            applySelfTeleport(value.world, value.x, value.y);
          };

          network.handlers.worldsIndex = (snapshot) => {
            const data = snapshot.val() || {};
            const worldIds = Object.keys(data).sort((a, b) => {
              const av = data[a] && data[a].updatedAt ? data[a].updatedAt : 0;
              const bv = data[b] && data[b].updatedAt ? data[b].updatedAt : 0;
              return bv - av;
            });
            refreshWorldButtons(worldIds);
          };

          network.handlers.globalPlayers = (snapshot) => {
            const data = snapshot.val() || {};
            adminState.globalPlayers = data;
            const count = Object.keys(data).length;
            totalOnlinePlayers = Math.max(inWorld ? 1 : 0, count);
            worldOccupancy.clear();
            Object.keys(data).forEach((id) => {
              const playerData = data[id];
              if (!playerData || !playerData.world) return;
              const wid = normalizeWorldId(playerData.world);
              if (!wid) return;
              worldOccupancy.set(wid, (worldOccupancy.get(wid) || 0) + 1);
            });
            refreshWorldButtons();
            updateOnlineCount();
          };
          network.handlers.accountLogAdded = (snapshot) => {
            if (!canViewAccountLogs) return;
            const byAccount = snapshot.val() || {};
            const flattened = [];
            Object.keys(byAccount).forEach((accountId) => {
              const accountLogs = byAccount[accountId] || {};
              Object.keys(accountLogs).forEach((logId) => {
                const value = accountLogs[logId] || {};
                const sourceSessionId = (value.sessionId || "").toString();
                if (sourceSessionId && sourceSessionId === playerSessionId) return;
                const uname = (value.username || (adminState.accounts[accountId] && adminState.accounts[accountId].username) || accountId).toString();
                flattened.push({
                  text: "@" + uname + ": " + (value.text || "").toString().slice(0, 180),
                  createdAt: typeof value.createdAt === "number" ? value.createdAt : 0
                });
              });
            });
            flattened.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
            logsMessages.length = 0;
            flattened.slice(-200).forEach((item) => logsMessages.push(item));
            renderLogsMessages();
          };
          network.handlers.myBan = (snapshot) => {
            if (!snapshot.exists()) return;
            const status = getBanStatus(snapshot.val(), Date.now());
            if (status.expired) {
              snapshot.ref.remove().catch(() => {});
              return;
            }
            const reasonText = status.reason ? " Reason: " + status.reason + "." : "";
            if (status.type === "permanent") {
              forceLogout("Your account is permanently banned." + reasonText);
              return;
            }
            forceLogout("Your account is temporarily banned for " + formatRemainingMs(status.remainingMs) + "." + reasonText);
          };
          network.handlers.adminAccounts = (snapshot) => {
            adminState.accounts = snapshot.val() || {};
            renderAdminPanel();
          };
          network.handlers.adminUsernames = (snapshot) => {
            adminState.usernames = snapshot.val() || {};
            renderAdminPanel();
          };
          network.handlers.adminRoles = (snapshot) => {
            adminState.roles = snapshot.val() || {};
            refreshAdminCapabilities();
            renderAdminPanel();
          };
          network.handlers.adminAudit = (snapshot) => {
            const data = snapshot.val() || {};
            const entries = Object.keys(data).map((id) => {
              const value = data[id] || {};
              const ts = typeof value.createdAt === "number" ? value.createdAt : 0;
              const actor = (value.actorUsername || value.actorAccountId || "system").toString().slice(0, 24);
              const action = (value.action || "").toString().slice(0, 24);
              const targetRaw = (value.targetUsername || value.targetAccountId || "").toString();
              return {
                id,
                createdAt: ts,
                time: formatChatTimestamp(ts),
                actor: actor ? "@" + actor : "system",
                action,
                target: targetRaw ? "@" + targetRaw : "",
                details: (value.details || "").toString().slice(0, 120)
              };
            }).sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
            adminState.audit = entries;
            refreshAuditActionFilterOptions();
            renderAdminPanel();
          };
          network.handlers.adminBans = (snapshot) => {
            adminState.bans = snapshot.val() || {};
            renderAdminPanel();
          };
          network.handlers.adminSessions = (snapshot) => {
            adminState.sessions = snapshot.val() || {};
            renderAdminPanel();
          };
          network.handlers.adminInventories = (snapshot) => {
            adminState.inventories = snapshot.val() || {};
            renderAdminPanel();
          };

          network.connectedRef.on("value", network.handlers.connected);
          network.inventoryRef.on("value", network.handlers.inventory);
          network.mySessionRef.on("value", network.handlers.mySession);
          network.myCommandRef.on("value", network.handlers.myCommand);
          network.worldsIndexRef.on("value", network.handlers.worldsIndex);
          network.globalPlayersRef.on("value", network.handlers.globalPlayers);
          network.myBanRef.on("value", network.handlers.myBan);
          network.adminRolesRef.on("value", network.handlers.adminRoles);
          if (canViewAccountLogs) {
            network.accountLogsRootRef.on("value", network.handlers.accountLogAdded);
          }
          syncAdminDataListeners();

          window.addEventListener("beforeunload", () => {
            saveInventory();
            if (inWorld) {
              sendSystemWorldMessage(playerName + " left the world.");
            }
            releaseAccountSession();
            if (network.globalPlayerRef) {
              network.globalPlayerRef.remove();
            }
            if (network.playerRef) {
              network.playerRef.remove();
            }
          });
        } catch (error) {
          console.error(error);
          setNetworkState("Firebase error", true);
          refreshWorldButtons([currentWorldId]);
          updateOnlineCount();
        }
      }

      function getCosmeticName(slot, itemId) {
        if (!itemId) return "None";
        const item = COSMETIC_LOOKUP[slot] && COSMETIC_LOOKUP[slot][itemId];
        return item ? item.name : itemId;
      }

      function equipCosmetic(slot, itemId) {
        if (!COSMETIC_SLOTS.includes(slot)) return;
        const id = String(itemId || "");
        if (id && (!COSMETIC_LOOKUP[slot][id] || (cosmeticInventory[id] || 0) <= 0)) return;
        equippedCosmetics[slot] = equippedCosmetics[slot] === id ? "" : id;
        saveInventory();
        refreshToolbar();
        syncPlayer(true);
      }

      function refreshToolbar() {
        toolbar.innerHTML = "";
        for (let i = 0; i < slotOrder.length; i++) {
          const id = slotOrder[i];
          const isFist = id === "fist";
          const chipColor = isFist ? "#f2c18d" : blockDefs[id].color;
          const title = isFist ? "Fist" : blockDefs[id].name;
          const countMarkup = isFist ? "" : '<span class="count">' + inventory[id] + "</span>";
          const slot = document.createElement("div");
          slot.className = "slot" + (i === selectedSlot ? " selected" : "");
          slot.title = title;
          slot.innerHTML =
            '<span class="key">' + (i + 1) + "</span>" +
            '<div class="block-chip" style="background:' + chipColor + '"></div>' +
            countMarkup;
          slot.addEventListener("click", () => {
            selectedSlot = i;
            refreshToolbar();
          });
          toolbar.appendChild(slot);
        }
        for (const item of COSMETIC_ITEMS) {
          const count = Math.max(0, Number(cosmeticInventory[item.id]) || 0);
          if (count <= 0) continue;
          const equipped = equippedCosmetics[item.slot] === item.id;
          const slot = document.createElement("div");
          slot.className = "slot cosmetic-slot" + (equipped ? " selected" : "");
          slot.title = item.slot + " | " + item.name + " | x" + count;
          const shortName = item.name.split(" ").map((part) => part[0]).join("").slice(0, 3).toUpperCase();
          slot.innerHTML =
            '<span class="key">' + item.slot.slice(0, 1).toUpperCase() + "</span>" +
            '<div class="block-chip" style="background:' + item.color + '"></div>' +
            '<span class="count">x' + count + "</span>" +
            '<span class="cosmetic-label">' + shortName + "</span>";
          slot.addEventListener("click", () => {
            equipCosmetic(item.slot, item.id);
          });
          toolbar.appendChild(slot);
        }
      }

      function worldFromClient(clientX, clientY) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (clientX - rect.left) * scaleX + cameraX;
        const y = (clientY - rect.top) * scaleY + cameraY;
        return {
          tx: Math.floor(x / TILE),
          ty: Math.floor(y / TILE)
        };
      }

      function worldFromPointer(event) {
        return worldFromClient(event.clientX, event.clientY);
      }

      function applyMobileEditAction(clientX, clientY) {
        if (!inWorld) return;
        const now = performance.now();
        if (now - mobileLastTouchActionAt < 90) return;
        mobileLastTouchActionAt = now;
        const pos = worldFromClient(clientX, clientY);
        mouseWorld = pos;
        useActionAt(pos.tx, pos.ty);
      }

      function bindHoldButton(button, key) {
        const setOn = (event) => {
          event.preventDefault();
          touchControls[key] = true;
        };
        const setOff = (event) => {
          event.preventDefault();
          touchControls[key] = false;
        };
        button.addEventListener("touchstart", setOn, { passive: false });
        button.addEventListener("touchend", setOff, { passive: false });
        button.addEventListener("touchcancel", setOff, { passive: false });
        button.addEventListener("mousedown", setOn);
        button.addEventListener("mouseup", setOff);
        button.addEventListener("mouseleave", setOff);
      }

      function bindMobileControls() {
        bindHoldButton(mobileLeftBtn, "left");
        bindHoldButton(mobileRightBtn, "right");
        bindHoldButton(mobileJumpBtn, "jump");
      }

      function resizeCanvas() {
        const wrap = canvas.parentElement;
        const rect = wrap.getBoundingClientRect();
        isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
        const minWidth = isCoarsePointer ? 320 : 720;
        const minHeight = isCoarsePointer ? 220 : 360;
        canvas.width = Math.max(minWidth, Math.floor(rect.width));
        canvas.height = Math.max(minHeight, Math.floor(rect.height));
        mobileControlsEl.classList.toggle("hidden", !inWorld || !isCoarsePointer);
      }

      window.addEventListener("resize", resizeCanvas);
      resizeCanvas();

      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isAdminOpen) {
          e.preventDefault();
          setAdminOpen(false);
          return;
        }
        if (inWorld && e.key === "Escape" && isChatOpen) {
          e.preventDefault();
          setChatOpen(false);
          return;
        }
        if (inWorld && !isCoarsePointer && e.key === "Enter" && !e.shiftKey) {
          if (document.activeElement === chatInputEl) return;
          e.preventDefault();
          setChatOpen(true);
          return;
        }
        if (isChatOpen && document.activeElement === chatInputEl) {
          return;
        }
        if (e.code.startsWith("Digit")) {
          const idx = Number(e.code.replace("Digit", "")) - 1;
          if (idx >= 0 && idx < slotOrder.length) {
            selectedSlot = idx;
            refreshToolbar();
          }
        }

        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
          e.preventDefault();
        }

        keys[e.code] = true;
      });

      window.addEventListener("keyup", (e) => {
        keys[e.code] = false;
      });

      canvas.addEventListener("mousemove", (e) => {
        mouseWorld = worldFromPointer(e);
      });

      canvas.addEventListener("mousedown", (e) => {
        if (!inWorld) return;
        const pos = worldFromPointer(e);
        mouseWorld = pos;
        if (e.button !== 0) return;
        useActionAt(pos.tx, pos.ty);
      });

      canvas.addEventListener("touchstart", (e) => {
        if (!inWorld) return;
        e.preventDefault();
        const touch = e.changedTouches[0];
        if (!touch) return;
        applyMobileEditAction(touch.clientX, touch.clientY);
      }, { passive: false });

      canvas.addEventListener("touchmove", (e) => {
        if (!inWorld) return;
        e.preventDefault();
        const touch = e.touches[0];
        if (!touch) return;
        applyMobileEditAction(touch.clientX, touch.clientY);
      }, { passive: false });

      canvas.addEventListener("contextmenu", (e) => e.preventDefault());
      mobileControlsEl.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
      mobileControlsEl.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });

      function bootstrapGame() {
        loadInventoryFromLocal();
        refreshToolbar();
        bindMobileControls();
        setInWorldState(false);
        refreshWorldButtons([currentWorldId]);
        updateOnlineCount();
        bindWorldControls();
        initFirebaseMultiplayer();

        function tick() {
          if (inWorld) {
            updatePlayer();
            updateCamera();
            syncPlayer(false);
          }
          render();
          requestAnimationFrame(tick);
        }
        tick();
      }

      authCreateBtn.addEventListener("click", () => {
        createAccountAndLogin();
      });
      authLoginBtn.addEventListener("click", () => {
        loginWithAccount();
      });
      authPasswordEl.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          loginWithAccount();
        }
      });
      authUsernameEl.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          authPasswordEl.focus();
        }
      });
      window.addEventListener("beforeunload", () => {
        releaseAccountSession();
      });
      applySavedCredentialsToForm();
      setAuthStatus("Create or login to continue.", false);
    })();
