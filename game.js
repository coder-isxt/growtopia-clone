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
      const adminCloseBtn = document.getElementById("adminCloseBtn");
      const adminAccountsEl = document.getElementById("adminAccounts");
      const chatPanelEl = document.getElementById("chatPanel");
      const chatMessagesEl = document.getElementById("chatMessages");
      const chatInputEl = document.getElementById("chatInput");
      const chatSendBtn = document.getElementById("chatSendBtn");
      const logsPanelEl = document.getElementById("logsPanel");
      const logsMessagesEl = document.getElementById("logsMessages");
      const clearLogsBtn = document.getElementById("clearLogsBtn");
      const exitWorldBtn = document.getElementById("exitWorldBtn");

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
      const JUMP_COOLDOWN_MS = Number(SETTINGS.JUMP_COOLDOWN_MS) || 200;
      const MOVE_ACCEL = Number(SETTINGS.MOVE_ACCEL) || 0.46;
      const JUMP_VELOCITY = Number(SETTINGS.JUMP_VELOCITY) || -7.2;
      const MAX_MOVE_SPEED = Number(SETTINGS.MAX_MOVE_SPEED) || 3.7;
      const MAX_FALL_SPEED = Number(SETTINGS.MAX_FALL_SPEED) || 10;

      const blockDefs = {
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
      let isAdminOpen = false;
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

      let cameraX = 0;
      let cameraY = 0;
      let mouseWorld = { tx: 0, ty: 0 };
      let networkLastSyncAt = 0;
      let networkLastX = -1;
      let networkLastY = -1;
      let networkLastFacing = 0;
      let lastJumpAtMs = -9999;
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
          adminBans: null,
          adminSessions: null,
          adminInventories: null
        }
      };

      const adminState = {
        accounts: {},
        usernames: {},
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

      function canUserViewLogs(username) {
        return LOG_VIEWER_USERNAMES.includes(normalizeUsername(username));
      }

      function canUserUseAdmin(username) {
        return ADMIN_USERNAMES.includes(normalizeUsername(username));
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
        const accountIds = Object.keys(adminState.accounts || {});
        const rows = accountIds.map((accountId) => {
          const account = adminState.accounts[accountId] || {};
          const username = account.username || accountId;
          const banned = Boolean(adminState.bans[accountId]);
          const online = Boolean(adminState.sessions[accountId] && adminState.sessions[accountId].sessionId);
          const invTotal = totalInventoryCount(adminState.inventories[accountId]);
          return `
            <div class="admin-row" data-account-id="${escapeHtml(accountId)}">
              <div class="admin-meta">
                <strong>@${escapeHtml(username)}</strong>
                <span>${online ? "Online" : "Offline"} | ${banned ? "Banned" : "Active"} | Blocks: ${invTotal}</span>
              </div>
              <div class="admin-actions">
                <button data-admin-act="ban" data-account-id="${escapeHtml(accountId)}">Ban</button>
                <button data-admin-act="unban" data-account-id="${escapeHtml(accountId)}">Unban</button>
                <button data-admin-act="kick" data-account-id="${escapeHtml(accountId)}">Kick</button>
                <button data-admin-act="resetinv" data-account-id="${escapeHtml(accountId)}">Reset Inv</button>
              </div>
            </div>
          `;
        });
        adminAccountsEl.innerHTML = rows.join("");
      }

      function handleAdminAction(event) {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const action = target.dataset.adminAct;
        const accountId = target.dataset.accountId;
        if (!action || !accountId || !canUseAdminPanel || !network.db) return;
        applyAdminAction(action, accountId, "panel");
      }

      function applyAdminAction(action, accountId, sourceTag) {
        if (!action || !accountId || !canUseAdminPanel || !network.db) return;
        if (action === "ban") {
          network.db.ref(BASE_PATH + "/bans/" + accountId).set({
            reason: "Banned by admin",
            bannedBy: playerName,
            createdAt: firebase.database.ServerValue.TIMESTAMP
          }).then(() => {
            network.db.ref(BASE_PATH + "/account-sessions/" + accountId).remove().catch(() => {});
            addClientLog("Admin(" + sourceTag + ") banned account " + accountId + ".");
          }).catch(() => {});
          return true;
        }
        if (action === "unban") {
          network.db.ref(BASE_PATH + "/bans/" + accountId).remove().then(() => {
            addClientLog("Admin(" + sourceTag + ") unbanned account " + accountId + ".");
          }).catch(() => {});
          return true;
        }
        if (action === "kick") {
          network.db.ref(BASE_PATH + "/account-sessions/" + accountId).remove().then(() => {
            addClientLog("Admin(" + sourceTag + ") kicked account " + accountId + ".");
          }).catch(() => {});
          return true;
        }
        if (action === "resetinv") {
          const resetPayload = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
          network.db.ref(BASE_PATH + "/player-inventories/" + accountId).set(resetPayload).then(() => {
            addClientLog("Admin(" + sourceTag + ") reset inventory for " + accountId + ".");
          }).catch(() => {});
          return true;
        }
        return false;
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
          postLocalSystemChat("Commands: /ban user, /unban user, /kick user, /resetinv user, /tp user, /givex user block amount, /bring user, /summon user");
          return true;
        }
        if (!canUseAdminPanel) {
          postLocalSystemChat("You are not allowed to use admin commands.");
          return true;
        }
        const needsTarget = ["/ban", "/unban", "/kick", "/resetinv"];
        if (command === "/tp") {
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
          if (!INVENTORY_IDS.includes(blockId) || !Number.isInteger(amount) || amount === 0) {
            postLocalSystemChat("Usage: /givex <user> <blockId 1-6> <amount>");
            return true;
          }
          network.db.ref(BASE_PATH + "/player-inventories/" + accountId + "/" + blockId).transaction((current) => {
            const next = (Number(current) || 0) + amount;
            return Math.max(0, next);
          }).then(() => {
            postLocalSystemChat("Updated inventory for @" + targetRef + ".");
            addClientLog("Admin(chat) givex " + targetRef + " block " + blockId + " amount " + amount + ".");
          }).catch(() => {
            postLocalSystemChat("Failed to update inventory.");
          });
          return true;
        }
        if (command === "/bring" || command === "/summon") {
          const targetRef = parts[1] || "";
          const accountId = findAccountIdByUserRef(targetRef);
          if (!accountId) {
            postLocalSystemChat("Target account not found: " + targetRef);
            return true;
          }
          if (!inWorld) {
            postLocalSystemChat("Enter a world first.");
            return true;
          }
          issueTeleportCommand(accountId, currentWorldId, player.x + 24, player.y).then((ok) => {
            if (ok) {
              postLocalSystemChat("Summon sent to @" + targetRef + ".");
              addClientLog("Admin(chat) summon " + targetRef + " to " + currentWorldId + ".");
            } else {
              postLocalSystemChat("Failed to summon target.");
            }
          });
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
          "/ban": "ban",
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
            addClientLog("Login blocked for @" + username + " (banned).", accountId, username, "");
            throw new Error("This account is banned.");
          }
          await reserveAccountSession(db, accountId, username);
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
        canViewAccountLogs = canUserViewLogs(username);
        canUseAdminPanel = canUserUseAdmin(username);
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
      }

      function buildInventoryPayload() {
        const payload = {};
        for (const id of INVENTORY_IDS) {
          payload[id] = Math.max(0, Math.floor(inventory[id] || 0));
        }
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
      }

      function setInWorldState(nextValue) {
        inWorld = Boolean(nextValue);
        menuScreenEl.classList.toggle("hidden", inWorld);
        canvasWrapEl.classList.toggle("hidden", !inWorld);
        toolbar.classList.toggle("hidden", !inWorld);
        mobileControlsEl.classList.toggle("hidden", !inWorld || !isCoarsePointer);
        chatToggleBtn.classList.toggle("hidden", !inWorld);
        logsToggleBtn.classList.toggle("hidden", !canViewAccountLogs);
        adminToggleBtn.classList.toggle("hidden", !canUseAdminPanel);
        exitWorldBtn.classList.toggle("hidden", !inWorld);
        if (!inWorld) {
          setChatOpen(false);
          chatMessages.length = 0;
          renderChatMessages();
        }
        if (!canViewAccountLogs) {
          setLogsOpen(false);
        }
        if (!canUseAdminPanel) {
          setAdminOpen(false);
        }
        setCurrentWorldUI();
        updateOnlineCount();
      }

      function formatChatTimestamp(timestamp) {
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
          row.textContent = (time ? "[" + time + "] " : "") + name + ": " + (message.text || "");
          chatMessagesEl.appendChild(row);
        }
        chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
      }

      function setChatOpen(open) {
        isChatOpen = Boolean(open) && inWorld;
        chatPanelEl.classList.toggle("hidden", !isChatOpen);
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
          return;
        }
        isLogsOpen = Boolean(open);
        logsPanelEl.classList.toggle("hidden", !isLogsOpen);
        if (isLogsOpen && isChatOpen) {
          setChatOpen(false);
        }
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
        if (canUseAdminPanel && network.db) {
          network.db.ref(BASE_PATH + "/account-logs").remove().then(() => {
            clearLogsView();
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
        if (network.bansRef && network.handlers.adminBans) {
          network.bansRef.off("value", network.handlers.adminBans);
        }
        if (network.sessionsRootRef && network.handlers.adminSessions) {
          network.sessionsRootRef.off("value", network.handlers.adminSessions);
        }
        if (network.inventoriesRootRef && network.handlers.adminInventories) {
          network.inventoriesRootRef.off("value", network.handlers.adminInventories);
        }
      }

      function forceLogout(reason) {
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
        authPasswordEl.value = "";
        pendingTeleportSelf = null;
        lastHandledTeleportCommandId = "";
        gameShellEl.classList.add("hidden");
        authScreenEl.classList.remove("hidden");
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
        if (chatMessages.length > 60) {
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
          return;
        }
        const text = trimmed.slice(0, 120);
        if (!text) return;
        if (!network.enabled || !network.chatRef) {
          chatInputEl.value = "";
          addChatMessage({
            name: playerName,
            playerId,
            text,
            createdAt: Date.now()
          });
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
            text,
            createdAt: firebase.database.ServerValue.TIMESTAMP
          }).then(() => {
            chatInputEl.value = "";
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

      function drawPlayer() {
        const px = player.x - cameraX;
        const py = player.y - cameraY;

        ctx.fillStyle = "#263238";
        ctx.fillRect(px, py, PLAYER_W, PLAYER_H);

        ctx.fillStyle = "#ffdbac";
        ctx.fillRect(px + 4, py + 4, PLAYER_W - 8, 10);

        ctx.fillStyle = "#0d0d0d";
        const eyeX = player.facing === 1 ? px + PLAYER_W - 7 : px + 4;
        ctx.fillRect(eyeX, py + 8, 3, 3);
      }

      function drawRemotePlayers() {
        remotePlayers.forEach((other) => {
          const px = other.x - cameraX;
          const py = other.y - cameraY;
          if (px < -40 || py < -40 || px > canvas.width + 40 || py > canvas.height + 40) return;

          ctx.fillStyle = "#2a75bb";
          ctx.fillRect(px, py, PLAYER_W, PLAYER_H);

          ctx.fillStyle = "#ffdbac";
          ctx.fillRect(px + 4, py + 4, PLAYER_W - 8, 10);

          ctx.fillStyle = "#102338";
          const eyeX = other.facing === 1 ? px + PLAYER_W - 7 : px + 4;
          ctx.fillRect(eyeX, py + 8, 3, 3);

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

        ctx.fillStyle = "rgba(9, 25, 41, 0.7)";
        ctx.fillRect(12, 12, 390, 62);
        ctx.strokeStyle = "rgba(255,255,255,0.25)";
        ctx.strokeRect(12, 12, 390, 62);

        ctx.fillStyle = "#f7fbff";
        ctx.font = "bold 15px 'Trebuchet MS', sans-serif";
        ctx.fillText("World: " + currentWorldId + " | Selected: " + itemName + " (" + countText + ")", 24, 36);
        ctx.font = "14px 'Trebuchet MS', sans-serif";
        ctx.fillText("Player Tile: " + tx + ", " + ty, 24, 56);
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

        setInWorldState(true);

        if (!network.enabled) {
          currentWorldId = worldId;
          localStorage.setItem("growtopia_current_world", worldId);
          setCurrentWorldUI();
          resetForWorldChange();
          refreshWorldButtons([worldId]);
          return;
        }

        if (worldId === currentWorldId && network.playersRef) return;

        if (inWorld && currentWorldId) {
          sendSystemWorldMessage(playerName + " left the world.");
          addClientLog("Switched away from world: " + currentWorldId + ".");
        }
        detachCurrentWorldListeners();
        currentWorldId = worldId;
        localStorage.setItem("growtopia_current_world", worldId);
        setCurrentWorldUI();
        resetForWorldChange();
        writeWorldIndexMeta(worldId, createIfMissing);

        const worldPath = BASE_PATH + "/worlds/" + worldId;
        network.playersRef = network.db.ref(worldPath + "/players");
        network.blocksRef = network.db.ref(worldPath + "/blocks");
        network.chatRef = network.db.ref(worldPath + "/chat");
        network.chatFeedRef = network.chatRef.limitToLast(40);
        network.playerRef = network.playersRef.child(playerId);
        chatMessages.length = 0;
        renderChatMessages();

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
              name: (p.name || "Player").toString().slice(0, 16)
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
          setChatOpen(!isChatOpen);
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
        adminAccountsEl.addEventListener("click", handleAdminAction);
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
            forceLogout("Your account has been banned.");
          };
          network.handlers.adminAccounts = (snapshot) => {
            adminState.accounts = snapshot.val() || {};
            renderAdminPanel();
          };
          network.handlers.adminUsernames = (snapshot) => {
            adminState.usernames = snapshot.val() || {};
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
          if (canViewAccountLogs) {
            network.accountLogsRootRef.on("value", network.handlers.accountLogAdded);
          }
          if (canUseAdminPanel) {
            network.accountsRef.on("value", network.handlers.adminAccounts);
            network.usernamesRef.on("value", network.handlers.adminUsernames);
            network.bansRef.on("value", network.handlers.adminBans);
            network.sessionsRootRef.on("value", network.handlers.adminSessions);
            network.inventoriesRootRef.on("value", network.handlers.adminInventories);
          }

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
      setAuthStatus("Create or login to continue.", false);
    })();
