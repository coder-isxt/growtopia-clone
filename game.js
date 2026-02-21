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
      const leftPanelResizeHandleEl = document.getElementById("leftPanelResizeHandle");
      const rightPanelResizeHandleEl = document.getElementById("rightPanelResizeHandle");
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
      const adminToggleBtn = document.getElementById("adminToggleBtn");
      const adminPanelEl = document.getElementById("adminPanel");
      const adminSearchInput = document.getElementById("adminSearchInput");
      const adminAuditActionFilterEl = document.getElementById("adminAuditActionFilter");
      const adminAuditActorFilterEl = document.getElementById("adminAuditActorFilter");
      const adminAuditTargetFilterEl = document.getElementById("adminAuditTargetFilter");
      const adminForceReloadBtn = document.getElementById("adminForceReloadBtn");
      const adminAuditExportBtn = document.getElementById("adminAuditExportBtn");
      const adminCloseBtn = document.getElementById("adminCloseBtn");
      const adminAccountsEl = document.getElementById("adminAccounts");
      const adminInventoryModalEl = document.getElementById("adminInventoryModal");
      const adminInventoryTitleEl = document.getElementById("adminInventoryTitle");
      const adminInventoryBodyEl = document.getElementById("adminInventoryBody");
      const adminInventoryCloseBtn = document.getElementById("adminInventoryCloseBtn");
      const vendingModalEl = document.getElementById("vendingModal");
      const vendingTitleEl = document.getElementById("vendingTitle");
      const vendingBodyEl = document.getElementById("vendingBody");
      const vendingActionsEl = document.getElementById("vendingActions");
      const vendingCloseBtn = document.getElementById("vendingCloseBtn");
      const signModalEl = document.getElementById("signModal");
      const signTitleEl = document.getElementById("signTitle");
      const signTextInputEl = document.getElementById("signTextInput");
      const signSaveBtn = document.getElementById("signSaveBtn");
      const signCloseBtn = document.getElementById("signCloseBtn");
      const announcementPopupEl = document.getElementById("announcementPopup");
      const announcementTextEl = document.getElementById("announcementText");
      const tradeMenuModalEl = document.getElementById("tradeMenuModal");
      const tradeMenuTitleEl = document.getElementById("tradeMenuTitle");
      const tradeMenuCloseBtn = document.getElementById("tradeMenuCloseBtn");
      const tradeStartBtn = document.getElementById("tradeStartBtn");
      const tradeCancelBtn = document.getElementById("tradeCancelBtn");
      const tradeRequestModalEl = document.getElementById("tradeRequestModal");
      const tradeRequestTextEl = document.getElementById("tradeRequestText");
      const tradeAcceptBtn = document.getElementById("tradeAcceptBtn");
      const tradeDeclineBtn = document.getElementById("tradeDeclineBtn");
      const worldLockModalEl = document.getElementById("worldLockModal");
      const worldLockTitleEl = document.getElementById("worldLockTitle");
      const worldLockAdminInputEl = document.getElementById("worldLockAdminInput");
      const worldLockAdminAddBtn = document.getElementById("worldLockAdminAddBtn");
      const worldLockAdminsEl = document.getElementById("worldLockAdmins");
      const worldLockCloseBtn = document.getElementById("worldLockCloseBtn");
      const doorModalEl = document.getElementById("doorModal");
      const doorTitleEl = document.getElementById("doorTitle");
      const doorPublicBtn = document.getElementById("doorPublicBtn");
      const doorOwnerOnlyBtn = document.getElementById("doorOwnerOnlyBtn");
      const doorCloseBtn = document.getElementById("doorCloseBtn");
      const cameraModalEl = document.getElementById("cameraModal");
      const cameraTitleEl = document.getElementById("cameraTitle");
      const cameraCloseBtn = document.getElementById("cameraCloseBtn");
      const cameraSaveBtn = document.getElementById("cameraSaveBtn");
      const cameraEventJoinEl = document.getElementById("cameraEventJoin");
      const cameraEventLeaveEl = document.getElementById("cameraEventLeave");
      const cameraEventVendingEl = document.getElementById("cameraEventVending");
      const cameraFilterStaffEl = document.getElementById("cameraFilterStaff");
      const cameraLogsListEl = document.getElementById("cameraLogsList");
      const weatherModalEl = document.getElementById("weatherModal");
      const weatherTitleEl = document.getElementById("weatherTitle");
      const weatherCloseBtn = document.getElementById("weatherCloseBtn");
      const weatherPresetSelectEl = document.getElementById("weatherPresetSelect");
      const weatherImageUrlInputEl = document.getElementById("weatherImageUrlInput");
      const weatherResolvedLabelEl = document.getElementById("weatherResolvedLabel");
      const weatherPreviewImgEl = document.getElementById("weatherPreviewImg");
      const weatherPreviewEmptyEl = document.getElementById("weatherPreviewEmpty");
      const weatherSaveBtn = document.getElementById("weatherSaveBtn");
      const weatherClearBtn = document.getElementById("weatherClearBtn");
      const updatingOverlayEl = document.getElementById("updatingOverlay");
      const chatPanelEl = document.getElementById("chatPanel");
      const chatMessagesEl = document.getElementById("chatMessages");
      const chatInputRowEl = document.getElementById("chatInputRow");
      const chatInputEl = document.getElementById("chatInput");
      const chatSendBtn = document.getElementById("chatSendBtn");
      const logsMessagesEl = document.getElementById("logsMessages");
      const exitWorldBtn = document.getElementById("exitWorldBtn");
      const logoutBtn = document.getElementById("logoutBtn");

      const modules = window.GTModules || {};
      const adminModule = modules.admin || {};
      const blocksModule = modules.blocks || {};
      const blockKeysModule = modules.blockKeys || {};
      const itemsModule = modules.items || {};
      const playerModule = modules.player || {};
      const authStorageModule = modules.authStorage || {};
      const worldModule = modules.world || {};
      const physicsModule = modules.physics || {};
      const animationsModule = modules.animations || {};
      const syncPlayerModule = modules.syncPlayer || {};
      const syncBlocksModule = modules.syncBlocks || {};
      const syncWorldsModule = modules.syncWorlds || {};
      const chatModule = modules.chat || {};
      const menuModule = modules.menu || {};
      const vendingModule = modules.vending || {};
      const tradeModule = modules.trade || {};

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
      const WATER_MOVE_MULT = 0.62;
      const WATER_GRAVITY_MULT = 0.35;
      const WATER_FALL_MULT = 0.52;
      const WATER_FRICTION_MULT = 0.86;
      const ANTI_GRAV_RADIUS_TILES = Math.max(2, Number(SETTINGS.ANTI_GRAV_RADIUS_TILES) || 8);
      const ANTI_GRAV_GRAVITY_MULT = Math.max(0.05, Math.min(1, Number(SETTINGS.ANTI_GRAV_GRAVITY_MULT) || 0.2));
      const ANTI_GRAV_FALL_MULT = Math.max(0.05, Math.min(1, Number(SETTINGS.ANTI_GRAV_FALL_MULT) || 0.42));
      const ANTI_GRAV_AIR_JUMP_COOLDOWN_MS = Math.max(70, Number(SETTINGS.ANTI_GRAV_AIR_JUMP_COOLDOWN_MS) || 140);
      const BASE_PATH = typeof SETTINGS.BASE_PATH === "string" && SETTINGS.BASE_PATH ? SETTINGS.BASE_PATH : "growtopia-test";
      const LOG_VIEWER_USERNAMES = Array.isArray(SETTINGS.LOG_VIEWER_USERNAMES) ? SETTINGS.LOG_VIEWER_USERNAMES : ["isxt"];
      const ADMIN_USERNAMES = Array.isArray(SETTINGS.ADMIN_USERNAMES) ? SETTINGS.ADMIN_USERNAMES : ["isxt"];
      const ADMIN_ROLE_BY_USERNAME = SETTINGS.ADMIN_ROLE_BY_USERNAME && typeof SETTINGS.ADMIN_ROLE_BY_USERNAME === "object"
        ? SETTINGS.ADMIN_ROLE_BY_USERNAME
        : {};
      const JUMP_COOLDOWN_MS = Number(SETTINGS.JUMP_COOLDOWN_MS) || 200;
      const PLAYER_SYNC_MIN_MS = Math.max(25, Number(SETTINGS.PLAYER_SYNC_MIN_MS) || 90);
      const GLOBAL_SYNC_MIN_MS = Math.max(PLAYER_SYNC_MIN_MS, Number(SETTINGS.GLOBAL_SYNC_MIN_MS) || 240);
      const LAYOUT_PREFS_KEY = "gt_layout_panels_v3";
      const DESKTOP_PANEL_LEFT_DEFAULT = 200;
      const DESKTOP_PANEL_RIGHT_DEFAULT = 190;
      const DESKTOP_PANEL_MIN = 140;
      const DESKTOP_PANEL_MAX_RATIO = 0.26;
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
        owner: ["panel_open", "view_logs", "tempban", "permban", "unban", "kick", "resetinv", "givex", "tp", "bring", "setrole", "clear_logs", "view_audit", "force_reload"],
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
      const WEATHER_PRESET_IMAGES = Array.isArray(SETTINGS.WEATHER_PRESET_IMAGES)
        ? SETTINGS.WEATHER_PRESET_IMAGES
        : [];
      const SAVED_AUTH_KEY = "growtopia_saved_auth_v1";
      const FORCE_RELOAD_MARKER_KEY = "growtopia_force_reload_marker_v1";
      const CAMERA_ZOOM_PREF_KEY = "growtopia_camera_zoom_v1";
      const CAMERA_ZOOM_MIN = Math.max(0.5, Number(SETTINGS.CAMERA_ZOOM_MIN) || 0.7);
      const CAMERA_ZOOM_MAX = Math.max(CAMERA_ZOOM_MIN + 0.1, Number(SETTINGS.CAMERA_ZOOM_MAX) || 2.2);
      const CAMERA_ZOOM_STEP = Math.max(0.05, Number(SETTINGS.CAMERA_ZOOM_STEP) || 0.12);

      const blockDefs = typeof blocksModule.getBlockDefs === "function" ? blocksModule.getBlockDefs() : {
        0: { key: "air", name: "Air", color: "transparent", solid: false, icon: "A", faIcon: "fa-regular fa-circle" },
        1: { key: "grass_block", name: "Grass", color: "#4caf50", solid: true, icon: "GR", faIcon: "fa-solid fa-seedling" },
        2: { key: "dirt_block", name: "Dirt", color: "#8b5a2b", solid: true, icon: "DI", faIcon: "fa-solid fa-mound" },
        3: { key: "stone_block", name: "Stone", color: "#818a93", solid: true, icon: "ST", faIcon: "fa-solid fa-cube" },
        4: { key: "wood_block", name: "Wood", color: "#a87038", solid: true, icon: "WO", faIcon: "fa-solid fa-tree" },
        5: { key: "sand_block", name: "Sand", color: "#dfc883", solid: true, icon: "SA", faIcon: "fa-regular fa-hourglass-half" },
        6: { key: "brick_block", name: "Brick", color: "#bb5644", solid: true, icon: "BR", faIcon: "fa-solid fa-border-all" },
        7: { key: "spawn_door", name: "Door", color: "#57c2ff", solid: false, unbreakable: true, icon: "DR", faIcon: "fa-solid fa-door-open" },
        8: { key: "bedrock", name: "Bedrock", color: "#4e5a68", solid: true, unbreakable: true, icon: "BD", faIcon: "fa-solid fa-mountain" },
        9: { key: "world_lock", name: "World Lock", color: "#ffd166", solid: true, icon: "WL", faIcon: "fa-solid fa-lock" },
        10: { key: "door_block", name: "Door Block", color: "#5fc2ff", solid: false, icon: "DB", faIcon: "fa-solid fa-door-open" },
        11: { key: "water_block", name: "Water", color: "rgba(72, 174, 255, 0.7)", solid: false, liquid: true, icon: "WA", faIcon: "fa-solid fa-water" },
        12: { key: "platform_block", name: "Platform", color: "#7a5a3f", solid: false, oneWay: true, icon: "PF", faIcon: "fa-solid fa-grip-lines" },
        13: { key: "stair_block", name: "Stair NW", color: "#b28457", solid: false, stair: true, rotatable: true, icon: "S1", faIcon: "fa-solid fa-stairs" },
        14: { key: "stair_block_r1", name: "Stair NE", color: "#b28457", solid: false, stair: true, rotatable: true, icon: "S2", faIcon: "fa-solid fa-stairs" },
        15: { key: "stair_block_r2", name: "Stair SE", color: "#b28457", solid: false, stair: true, rotatable: true, icon: "S3", faIcon: "fa-solid fa-stairs" },
        16: { key: "stair_block_r3", name: "Stair SW", color: "#b28457", solid: false, stair: true, rotatable: true, icon: "S4", faIcon: "fa-solid fa-stairs" },
        17: { key: "vending_machine", name: "Vending Machine", color: "#4d6b8b", solid: true, icon: "VM", faIcon: "fa-solid fa-store" },
        18: { key: "sign_block", name: "Sign", color: "#b98a58", solid: false, icon: "SG", faIcon: "fa-solid fa-signs-post" },
        19: { key: "anti_gravity_generator", name: "Anti Gravity Generator", color: "#6de9ff", solid: true, icon: "AG", faIcon: "fa-solid fa-meteor" },
        20: { key: "camera_block", name: "Camera", color: "#8eb7d6", solid: true, icon: "CM", faIcon: "fa-solid fa-video" },
        21: { key: "weather_machine", name: "Weather Machine", color: "#7aa8d9", solid: true, icon: "WM", faIcon: "fa-solid fa-cloud-sun-rain" }
      };
      const SPAWN_TILE_X = 8;
      const SPAWN_TILE_Y = 11;
      const SPAWN_DOOR_ID = 7;
      const SPAWN_BASE_ID = 8;

      const WORLD_LOCK_ID = 9;
      const DOOR_BLOCK_ID = 10;
      const WATER_ID = 11;
      const PLATFORM_ID = 12;
      const STAIR_BASE_ID = 13;
      const STAIR_ROTATION_IDS = [13, 14, 15, 16];
      const VENDING_ID = 17;
      const SIGN_ID = 18;
      const ANTI_GRAV_ID = 19;
      const CAMERA_ID = 20;
      const WEATHER_MACHINE_ID = 21;
      const TOOL_FIST = "fist";
      const TOOL_WRENCH = "wrench";
      const slotOrder = [TOOL_FIST, TOOL_WRENCH, 1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 17, 18, 19, 20, 21];
      const INVENTORY_IDS = [1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 17, 18, 19, 20, 21];
      const COSMETIC_SLOTS = ["clothes", "wings", "swords"];
      const blockMaps = typeof blockKeysModule.buildMaps === "function"
        ? blockKeysModule.buildMaps(blockDefs)
        : { idToKey: {}, keyToId: {} };
      const BLOCK_ID_TO_KEY = blockMaps.idToKey || {};
      const BLOCK_KEY_TO_ID = blockMaps.keyToId || {};
      const COSMETIC_CATALOG = typeof itemsModule.getCosmeticItemsBySlot === "function"
        ? itemsModule.getCosmeticItemsBySlot()
        : { clothes: [], wings: [], swords: [] };
      const COSMETIC_ASSET_BASE = typeof itemsModule.getCosmeticAssetBasePath === "function"
        ? (itemsModule.getCosmeticAssetBasePath() || "./assets/cosmetics")
        : "./assets/cosmetics";
      const COSMETIC_LOOKUP = {};
      const COSMETIC_ITEMS = [];
      const cosmeticImageCache = new Map();
      const blockImageCache = new Map();
      const waterFramePathCache = [];
      const WATER_FRAME_MS = Math.max(80, Number(SETTINGS.WATER_FRAME_MS) || 170);
      const WEATHER_PRESETS = (() => {
        const out = [];
        const seen = new Set();
        out.push({ id: "none", name: "Default Sky", url: "" });
        seen.add("none");
        for (let i = 0; i < WEATHER_PRESET_IMAGES.length; i++) {
          const row = WEATHER_PRESET_IMAGES[i] || {};
          const id = String(row.id || "").trim().toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 32);
          const name = String(row.name || "").trim().slice(0, 36);
          const url = String(row.url || "").trim().slice(0, 420);
          if (!id || seen.has(id)) continue;
          out.push({ id, name: name || id, url });
          seen.add(id);
        }
        return out;
      })();
      const WEATHER_PRESET_MAP = new Map(WEATHER_PRESETS.map((preset) => [preset.id, preset]));
      for (const slot of COSMETIC_SLOTS) {
        const map = {};
        const slotItems = Array.isArray(COSMETIC_CATALOG[slot]) ? COSMETIC_CATALOG[slot] : [];
        for (const item of slotItems) {
          const imagePath = (item && item.image ? String(item.image) : "").trim();
          const resolvedImage = imagePath
            ? (/^(https?:)?\/\//.test(imagePath) || imagePath.startsWith("/") || imagePath.startsWith("./") || imagePath.startsWith("../")
              ? imagePath
              : (COSMETIC_ASSET_BASE.replace(/\/+$/, "") + "/" + imagePath.replace(/^\/+/, "")))
            : "";
          const normalized = { slot, ...item, imagePath: resolvedImage };
          map[item.id] = normalized;
          COSMETIC_ITEMS.push(normalized);
        }
        COSMETIC_LOOKUP[slot] = map;
      }
      const inventory = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        17: 0,
        18: 0,
        19: 0,
        20: 0,
        21: 0
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
      let desktopLeftPanelWidth = DESKTOP_PANEL_LEFT_DEFAULT;
      let desktopRightPanelWidth = DESKTOP_PANEL_RIGHT_DEFAULT;
      let layoutResizeSide = "";
      let gameBootstrapped = false;
      let pendingTeleportSelf = null;
      let lastHandledTeleportCommandId = "";
      const remotePlayers = new Map();
      const remoteAnimationTracker = typeof animationsModule.createTracker === "function"
        ? animationsModule.createTracker()
        : new Map();
      const overheadChatByPlayer = new Map();
      const signTexts = new Map();
      const doorAccessByTile = new Map();
      const antiGravityByTile = new Map();
      const cameraConfigsByTile = new Map();
      const cameraLogsByTile = new Map();
      const localWeatherByWorld = new Map();
      const worldOccupancy = new Map();
      let vendingController = null;
      let tradeController = null;
      let signEditContext = null;
      let worldLockEditContext = null;
      let doorEditContext = null;
      let cameraEditContext = null;
      let weatherEditContext = null;
      let currentWorldWeather = null;
      let knownWorldIds = [];
      let totalOnlinePlayers = 0;
      let hasRenderedMenuWorldList = false;
      let currentWorldLock = null;
      let lastLockDeniedNoticeAt = 0;
      let lastHandledForceReloadEventId = loadForceReloadMarker();
      let lastHandledAnnouncementEventId = "";
      let announcementHideTimer = 0;
      let isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
      let isChatOpen = false;
      let suppressChatOpenUntilMs = 0;
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
      const DROP_PICKUP_RADIUS = 26;
      const DROP_MAX_PER_WORLD = 220;
      const PLAYER_NAME_FONT = "12px 'Trebuchet MS', sans-serif";
      const playerWrenchHitboxes = [];
      const worldDrops = new Map();
      let lastDropAtMs = 0;

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

      function getVendingController() {
        if (vendingController) return vendingController;
        if (typeof vendingModule.createController !== "function") return null;
        vendingController = vendingModule.createController({
          getNetwork: () => network,
          getBasePath: () => BASE_PATH,
          getCurrentWorldId: () => currentWorldId,
          getPlayerProfileId: () => playerProfileId,
          getPlayerName: () => playerName,
          getFirebase: () => (typeof firebase !== "undefined" ? firebase : null),
          getBlockKeyById,
          parseBlockRef,
          getActiveSellableBlockId,
          saveInventory,
          refreshToolbar,
          syncBlock,
          postLocalSystemChat,
          canEditTarget,
          getInventory: () => inventory,
          getInventoryIds: () => INVENTORY_IDS,
          getCosmeticInventory: () => cosmeticInventory,
          getCosmeticItems: () => COSMETIC_ITEMS,
          getVendingId: () => VENDING_ID,
          getWorldLockId: () => WORLD_LOCK_ID,
          getWorld: () => world,
          getVendingModalEl: () => vendingModalEl,
          getVendingTitleEl: () => vendingTitleEl,
          getVendingBodyEl: () => vendingBodyEl,
          getVendingActionsEl: () => vendingActionsEl,
          getVendingCloseBtnEl: () => vendingCloseBtn,
          onVendingPurchase: (payload) => {
            const raw = payload && typeof payload === "object" ? payload : {};
            const buyerName = (raw.buyerName || playerName || "player").toString().slice(0, 20);
            const buyerAccountId = (raw.buyerAccountId || playerProfileId || "").toString();
            const itemLabel = (raw.itemLabel || "item").toString().slice(0, 44);
            const totalItems = Math.max(1, Math.floor(Number(raw.totalItems) || 1));
            const totalPrice = Math.max(0, Math.floor(Number(raw.totalPrice) || 0));
            logCameraEvent(
              "vending_purchase",
              buyerName + " bought " + totalItems + "x " + itemLabel + " for " + totalPrice + " WL.",
              buyerAccountId,
              buyerName
            );
          }
        });
        if (typeof vendingController.bindModalEvents === "function") {
          vendingController.bindModalEvents();
        }
        return vendingController;
      }

      function getTradeController() {
        if (tradeController) return tradeController;
        if (typeof tradeModule.createController !== "function") return null;
        tradeController = tradeModule.createController({
          getFirebase: () => (typeof firebase !== "undefined" ? firebase : null),
          getNetwork: () => network,
          getBasePath: () => BASE_PATH,
          getCurrentWorldId: () => currentWorldId,
          getPlayerProfileId: () => playerProfileId,
          getPlayerName: () => playerName,
          getPlayerSessionStartedAt: () => playerSessionStartedAt,
          getInventory: () => inventory,
          getCosmeticInventory: () => cosmeticInventory,
          getEquippedCosmetics: () => equippedCosmetics,
          getInventoryIds: () => INVENTORY_IDS,
          getCosmeticItems: () => COSMETIC_ITEMS,
          getCosmeticSlots: () => COSMETIC_SLOTS,
          getRemotePlayers: () => remotePlayers,
          getBlockDefs: () => blockDefs,
          getBlockKeyById,
          getPlayerRect: () => ({ w: PLAYER_W, h: PLAYER_H }),
          getTileSize: () => TILE,
          rectsOverlap,
          postLocalSystemChat,
          showAnnouncementPopup,
          refreshToolbar,
          saveInventory,
          getTradeMenuModalEl: () => tradeMenuModalEl,
          getTradeMenuTitleEl: () => tradeMenuTitleEl,
          getTradeMenuCloseBtnEl: () => tradeMenuCloseBtn,
          getTradeStartBtnEl: () => tradeStartBtn,
          getTradeCancelBtnEl: () => tradeCancelBtn,
          getTradeRequestModalEl: () => tradeRequestModalEl,
          getTradeRequestTextEl: () => tradeRequestTextEl,
          getTradeAcceptBtnEl: () => tradeAcceptBtn,
          getTradeDeclineBtnEl: () => tradeDeclineBtn,
          getTradePanelModalEl: () => document.getElementById("tradePanelModal"),
          getTradePanelTitleEl: () => document.getElementById("tradePanelTitle"),
          getTradePanelBodyEl: () => document.getElementById("tradePanelBody"),
          getTradePanelActionsEl: () => document.getElementById("tradePanelActions"),
          getTradePanelCloseBtnEl: () => document.getElementById("tradePanelCloseBtn")
        });
        return tradeController;
      }

      let cameraX = 0;
      let cameraY = 0;
      let cameraZoom = loadCameraZoomPref();
      let mouseWorld = { tx: 0, ty: 0 };
      const playerSyncController = typeof syncPlayerModule.createController === "function"
        ? syncPlayerModule.createController({
          playerMinIntervalMs: PLAYER_SYNC_MIN_MS,
          globalMinIntervalMs: GLOBAL_SYNC_MIN_MS
        })
        : null;
      const blockSyncer = typeof syncBlocksModule.createBatchSync === "function"
        ? syncBlocksModule.createBatchSync({
          getRef: () => network.blocksRef,
          onError: () => setNetworkState("Network error", true),
          flushDelayMs: 16
        })
        : null;
      let lastJumpAtMs = -9999;
      let lastAirJumpAtMs = -9999;
      let airJumpsUsed = 0;
      let wasJumpHeld = false;
      let suppressSpawnSafetyUntilMs = 0;
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
        myTradeRequestRef: null,
        myTradeResponseRef: null,
        myActiveTradeRef: null,
        playersRef: null,
        blocksRef: null,
        dropsRef: null,
        dropFeedRef: null,
        vendingRef: null,
        signsRef: null,
        doorsRef: null,
        antiGravRef: null,
        weatherRef: null,
        camerasRef: null,
        cameraLogsRef: null,
        cameraLogsFeedRef: null,
        lockRef: null,
        chatRef: null,
        chatFeedRef: null,
        inventoryRef: null,
        accountLogsRef: null,
        accountLogsFeedRef: null,
        accountLogsRootRef: null,
        forceReloadRef: null,
        announcementRef: null,
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
          myTradeRequest: null,
          myTradeResponse: null,
          myActiveTrade: null,
          players: null,
          blockAdded: null,
          blockChanged: null,
          blockRemoved: null,
          dropAdded: null,
          dropChanged: null,
          dropRemoved: null,
          vendingAdded: null,
          vendingChanged: null,
          vendingRemoved: null,
          signAdded: null,
          signChanged: null,
          signRemoved: null,
          doorAdded: null,
          doorChanged: null,
          doorRemoved: null,
          antiGravAdded: null,
          antiGravChanged: null,
          antiGravRemoved: null,
          worldWeather: null,
          cameraAdded: null,
          cameraChanged: null,
          cameraRemoved: null,
          cameraLogAdded: null,
          worldLock: null,
          chatAdded: null,
          accountLogAdded: null,
          forceReload: null,
          announcement: null,
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
        if (typeof authStorageModule.saveCredentials === "function") {
          authStorageModule.saveCredentials(SAVED_AUTH_KEY, username, password);
          return;
        }
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
        if (typeof authStorageModule.loadCredentials === "function") {
          return authStorageModule.loadCredentials(SAVED_AUTH_KEY);
        }
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

      function loadForceReloadMarker() {
        try {
          return (sessionStorage.getItem(FORCE_RELOAD_MARKER_KEY) || "").toString();
        } catch (error) {
          return "";
        }
      }

      function saveForceReloadMarker(eventId) {
        try {
          sessionStorage.setItem(FORCE_RELOAD_MARKER_KEY, (eventId || "").toString().slice(0, 60));
        } catch (error) {
          // ignore sessionStorage failures
        }
      }

      function normalizeCameraZoom(value) {
        const numeric = Number(value);
        const safe = Number.isFinite(numeric) ? numeric : 1;
        return Math.max(CAMERA_ZOOM_MIN, Math.min(CAMERA_ZOOM_MAX, safe));
      }

      function loadCameraZoomPref() {
        try {
          return normalizeCameraZoom(localStorage.getItem(CAMERA_ZOOM_PREF_KEY) || 1);
        } catch (error) {
          return 1;
        }
      }

      function saveCameraZoomPref(value) {
        try {
          localStorage.setItem(CAMERA_ZOOM_PREF_KEY, String(normalizeCameraZoom(value)));
        } catch (error) {
          // ignore localStorage failures
        }
      }

      function setCameraZoom(nextZoom, persist) {
        const normalized = normalizeCameraZoom(nextZoom);
        if (Math.abs(normalized - cameraZoom) < 0.0001) return;
        cameraZoom = normalized;
        if (persist) saveCameraZoomPref(cameraZoom);
        updateCamera(true);
      }

      function changeCameraZoom(delta) {
        setCameraZoom(cameraZoom + Number(delta || 0), true);
      }

      function getCameraViewWidth() {
        return canvas.width / Math.max(0.01, cameraZoom);
      }

      function getCameraViewHeight() {
        return canvas.height / Math.max(0.01, cameraZoom);
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
        adminToggleBtn.classList.toggle("hidden", !canUseAdminPanel);
        if (adminForceReloadBtn) {
          const canForceReload = hasAdminPermission("force_reload");
          adminForceReloadBtn.classList.toggle("hidden", !canForceReload);
          adminForceReloadBtn.disabled = !canForceReload;
        }
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
          closeAdminInventoryModal();
          return;
        }
        isAdminOpen = Boolean(open);
        adminPanelEl.classList.toggle("hidden", !isAdminOpen);
        if (isAdminOpen) {
          refreshAuditActionFilterOptions();
          renderAdminPanel();
        }
        if (!isAdminOpen) {
          closeAdminInventoryModal();
        }
      }

      function renderAdminPanelFromLiveUpdate() {
        if (isAdminOpen) return;
        renderAdminPanel();
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

      function getAuditLevel(action) {
        if (typeof adminModule.getAuditLevel === "function") {
          return adminModule.getAuditLevel(action);
        }
        return "info";
      }

      function getLogLevel(text) {
        if (typeof adminModule.getLogLevel === "function") {
          return adminModule.getLogLevel(text);
        }
        return "info";
      }

      function scrollElementToBottom(el) {
        if (!(el instanceof HTMLElement)) return;
        el.scrollTop = el.scrollHeight;
        requestAnimationFrame(() => {
          el.scrollTop = el.scrollHeight;
        });
      }

      function closeAdminInventoryModal() {
        if (adminInventoryModalEl) {
          adminInventoryModalEl.classList.add("hidden");
          delete adminInventoryModalEl.dataset.accountId;
        }
      }

      function canEditAdminInventoryModal() {
        return getRoleRank(currentAdminRole) >= getRoleRank("manager");
      }

      function syncAdminPanelAfterInventoryChange(accountId) {
        if (!accountId) return;
        if (isAdminOpen) {
          renderAdminPanel();
        }
        if (adminInventoryModalEl && !adminInventoryModalEl.classList.contains("hidden") && adminInventoryModalEl.dataset.accountId === accountId) {
          openAdminInventoryModal(accountId);
        }
      }

      function setLocalInventoryBlockCount(accountId, blockId, nextValue) {
        if (!accountId) return;
        if (!adminState.inventories[accountId] || typeof adminState.inventories[accountId] !== "object") {
          adminState.inventories[accountId] = {};
        }
        const safeId = Number(blockId);
        adminState.inventories[accountId][safeId] = Math.max(0, Math.floor(Number(nextValue) || 0));
      }

      function setLocalInventoryCosmeticCount(accountId, itemId, nextValue) {
        if (!accountId) return;
        if (!adminState.inventories[accountId] || typeof adminState.inventories[accountId] !== "object") {
          adminState.inventories[accountId] = {};
        }
        if (!adminState.inventories[accountId].cosmeticItems || typeof adminState.inventories[accountId].cosmeticItems !== "object") {
          adminState.inventories[accountId].cosmeticItems = {};
        }
        const safeItemId = String(itemId || "");
        adminState.inventories[accountId].cosmeticItems[safeItemId] = Math.max(0, Math.floor(Number(nextValue) || 0));
      }

      function adjustLocalInventoryBlockCount(accountId, blockId, delta) {
        const safeId = Number(blockId);
        const current = Math.max(0, Math.floor(Number(adminState.inventories[accountId] && adminState.inventories[accountId][safeId]) || 0));
        setLocalInventoryBlockCount(accountId, safeId, current + Number(delta || 0));
      }

      function adjustLocalInventoryCosmeticCount(accountId, itemId, delta) {
        const safeItemId = String(itemId || "");
        const current = Math.max(0, Math.floor(Number(adminState.inventories[accountId] && adminState.inventories[accountId].cosmeticItems && adminState.inventories[accountId].cosmeticItems[safeItemId]) || 0));
        setLocalInventoryCosmeticCount(accountId, safeItemId, current + Number(delta || 0));
      }

      function buildAdminInventoryItemOptions(kind) {
        if (kind === "cosmetic") {
          return COSMETIC_ITEMS.map((item) => {
            return '<option value="' + escapeHtml(item.id) + '">' + escapeHtml(item.name + " (" + item.id + ")") + "</option>";
          }).join("");
        }
        return INVENTORY_IDS.map((id) => {
          const label = blockDefs[id] && blockDefs[id].name ? blockDefs[id].name : ("Block " + id);
          return '<option value="' + escapeHtml(getBlockKeyById(id)) + '">' + escapeHtml(label + " (" + getBlockKeyById(id) + ")") + "</option>";
        }).join("");
      }

      function openAdminInventoryModal(accountId) {
        if (!canUseAdminPanel || !adminInventoryModalEl || !adminInventoryTitleEl || !adminInventoryBodyEl) return;
        const account = adminState.accounts[accountId] || {};
        const username = (account.username || accountId || "unknown").toString();
        const inv = adminState.inventories[accountId] || {};
        const rows = [];
        for (const id of INVENTORY_IDS) {
          const qty = Math.max(0, Math.floor(Number(inv[id]) || 0));
          if (qty <= 0) continue;
          const def = blockDefs[id] || {};
          const blockKey = getBlockKeyById(id);
          rows.push({
            kind: "block",
            itemId: blockKey,
            label: def.name ? def.name + " (Block " + id + ")" : "Block " + id,
            qty
          });
        }
        const itemRecord = inv && inv.cosmeticItems || {};
        for (const item of COSMETIC_ITEMS) {
          const qty = Math.max(0, Math.floor(Number(itemRecord[item.id]) || 0));
          if (qty <= 0) continue;
          rows.push({
            kind: "cosmetic",
            itemId: item.id,
            label: (item.name || item.id) + " (" + item.slot + ")",
            qty
          });
        }
        adminInventoryTitleEl.textContent = "@" + username + " Inventory";
        adminInventoryModalEl.dataset.accountId = accountId;
        const canEdit = canEditAdminInventoryModal() && canActorGrantTarget(accountId, getAccountRole(accountId, username));
        const currentItemOptions = rows.length
          ? rows.map((row) => {
            return '<option value="' + escapeHtml(row.kind + ":" + row.itemId) + '">' + escapeHtml(row.label + " x" + row.qty) + "</option>";
          }).join("")
          : "<option value=''>No owned items</option>";
        const editorMarkup = canEdit
          ? "<div class='admin-inventory-tools'>" +
            "<select class='admin-inv-kind' data-account-id='" + escapeHtml(accountId) + "'>" +
            "<option value='block'>Blocks</option>" +
            "<option value='cosmetic'>Cosmetics</option>" +
            "</select>" +
            "<select class='admin-inv-item' data-account-id='" + escapeHtml(accountId) + "'>" + buildAdminInventoryItemOptions("block") + "</select>" +
            "<input class='admin-inv-amount' data-account-id='" + escapeHtml(accountId) + "' type='number' min='1' step='1' value='1'>" +
            "<button data-admin-inv-act='add' data-account-id='" + escapeHtml(accountId) + "'>Add</button>" +
            "<button data-admin-inv-act='remove' data-account-id='" + escapeHtml(accountId) + "'>Remove</button>" +
            "<select class='admin-inv-current' data-account-id='" + escapeHtml(accountId) + "'>" + currentItemOptions + "</select>" +
            "<button data-admin-inv-act='removeallselected' data-account-id='" + escapeHtml(accountId) + "' " + (rows.length ? "" : "disabled") + ">Remove Selected All</button>" +
            "</div>"
          : "";
        if (!rows.length) {
          adminInventoryBodyEl.innerHTML = editorMarkup + "<div class='admin-inventory-row'><span class='admin-inventory-item'>No items.</span><span class='admin-inventory-qty'>0</span></div>";
        } else {
          adminInventoryBodyEl.innerHTML = editorMarkup + rows.map((row) => {
            return "<div class='admin-inventory-row'>" +
              "<span class='admin-inventory-item'>" + escapeHtml(row.label) + "</span>" +
              "<span class='admin-inventory-qty'>" + row.qty + "</span>" +
              (canEdit
                ? "<button data-admin-inv-act='removeall' data-account-id='" + escapeHtml(accountId) + "' data-kind='" + escapeHtml(row.kind) + "' data-item-id='" + escapeHtml(row.itemId) + "'>Remove All</button>"
                : "") +
              "</div>";
          }).join("");
        }
        adminInventoryModalEl.classList.remove("hidden");
      }

      function closeVendingModal() {
        const ctrl = getVendingController();
        if (ctrl && typeof ctrl.closeModal === "function") {
          ctrl.closeModal();
          return;
        }
        if (vendingModalEl) vendingModalEl.classList.add("hidden");
      }

      function renderVendingModal(tx, ty, vm) {
        const ctrl = getVendingController();
        if (ctrl && typeof ctrl.renderModal === "function") {
          ctrl.renderModal(tx, ty, vm);
        }
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
        const onlineCount = accountIds.filter((accountId) => Boolean(adminState.sessions[accountId] && adminState.sessions[accountId].sessionId)).length;
        const bannedCount = accountIds.filter((accountId) => getBanStatus(adminState.bans[accountId], nowMs).active).length;
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
          const onlineStatusClass = online ? "online" : "offline";
          const banStatusClass = banned ? "banned" : "active";
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
                <div class="admin-status-row">
                  <span class="admin-status ${onlineStatusClass}">${online ? "Online" : "Offline"}</span>
                  <span class="admin-status ${banStatusClass}">${escapeHtml(banText)}</span>
                  <span class="admin-status neutral">Blocks ${invTotal}</span>
                </div>
              </div>
              <div class="admin-actions">
                <div class="admin-quick-actions">
                  <button data-admin-act="viewinv" data-account-id="${escapeHtml(accountId)}">View Inv</button>
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
                  <select class="admin-give-block" data-account-id="${escapeHtml(accountId)}" ${canGive ? "" : "disabled"}>
                    ${INVENTORY_IDS.map((id) => '<option value="' + escapeHtml(getBlockKeyById(id)) + '">' + escapeHtml((blockDefs[id] && blockDefs[id].name ? blockDefs[id].name : ("Block " + id)) + " (" + getBlockKeyById(id) + ")") + "</option>").join("")}
                  </select>
                  <input class="admin-give-amount" data-account-id="${escapeHtml(accountId)}" type="number" min="1" step="1" value="10" placeholder="amount">
                  <button data-admin-act="give" data-account-id="${escapeHtml(accountId)}" ${canGive ? "" : "disabled"}>Give</button>
                </div>
                <div class="admin-give-item-wrap">
                  <select class="admin-give-item-id" data-account-id="${escapeHtml(accountId)}" ${canGive ? "" : "disabled"}>
                    ${COSMETIC_ITEMS.map((item) => '<option value="' + escapeHtml(item.id) + '">' + escapeHtml(item.name + " (" + item.id + ")") + "</option>").join("")}
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
        const auditRows = filteredAudit.slice(-120).map((entry) => {
          const level = getAuditLevel(entry.action || "");
          return `<div class="admin-audit-row level-${escapeHtml(level)}">${escapeHtml(entry.time || "--:--")} | ${escapeHtml(entry.actor || "system")} | ${escapeHtml(entry.action || "-")} ${escapeHtml(entry.target || "")} ${escapeHtml(entry.details || "")}</div>`;
        }).join("");
        const logRows = logsMessages.slice(-200).map((entry) => {
          const level = getLogLevel(entry.text || "");
          return `<div class="admin-audit-row level-${escapeHtml(level)}">${escapeHtml(formatChatTimestamp(entry.createdAt || 0))} | ${escapeHtml(entry.text || "")}</div>`;
        }).join("");
        const auditMarkup = hasAdminPermission("view_audit")
          ? `<div class="admin-audit admin-card">
            <div class="admin-card-header">
              <div class="admin-audit-title">Audit Trail</div>
              <button data-admin-act="clearaudit" ${hasAdminPermission("clear_logs") ? "" : "disabled"}>Clear</button>
            </div>
            <div class="admin-audit-list">${auditRows || "<div class='admin-audit-row'>No entries yet.</div>"}</div>
          </div>`
          : "";
        const logsMarkup = canViewAccountLogs
          ? `<div class="admin-audit admin-card">
            <div class="admin-card-header">
              <div class="admin-audit-title">Account Logs</div>
              <button data-admin-act="clearlogs" ${hasAdminPermission("clear_logs") ? "" : "disabled"}>Clear</button>
            </div>
            <div class="admin-logs-list">${logRows || "<div class='admin-audit-row'>No logs yet.</div>"}</div>
          </div>`
          : "";
        adminAccountsEl.innerHTML = `
          <div class="admin-layout">
            <div class="admin-main">
              <div class="admin-summary">
                <div class="admin-summary-main">Signed in as <strong>${escapeHtml(playerName || "guest")}</strong> (${escapeHtml(currentAdminRole)}).</div>
                <div class="admin-summary-stats">
                  <span class="admin-stat-chip">Showing ${filteredIds.length}/${accountIds.length}</span>
                  <span class="admin-stat-chip">Online ${onlineCount}</span>
                  <span class="admin-stat-chip">Banned ${bannedCount}</span>
                  <span class="admin-stat-chip">Global online ${totalOnlinePlayers}</span>
                </div>
                <div class="admin-summary-hint">Quick commands: /adminhelp, /where user, /goto user, /bringall, /announce msg</div>
              </div>
              <div class="admin-list">
                ${rows.join("") || "<div class='admin-row'><div class='admin-meta'><strong>No players match filter.</strong></div></div>"}
              </div>
            </div>
            <div class="admin-sidepanels">
              ${auditMarkup}
              ${logsMarkup}
            </div>
          </div>
        `;
        const auditListEl = adminAccountsEl.querySelector(".admin-audit-list");
        scrollElementToBottom(auditListEl);
        const logsListEl = adminAccountsEl.querySelector(".admin-logs-list");
        scrollElementToBottom(logsListEl);
      }

      function handleAdminAction(event) {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const action = target.dataset.adminAct;
        const accountId = target.dataset.accountId;
        if (!action || !canUseAdminPanel) return;
        if (action === "clearaudit") {
          if (!network.db || !hasAdminPermission("clear_logs")) return;
          network.db.ref(BASE_PATH + "/admin-audit").remove().then(() => {
            adminState.audit = [];
            renderAdminPanel();
            postLocalSystemChat("Audit trail cleared.");
          }).catch(() => {
            postLocalSystemChat("Failed to clear audit trail.");
          });
          return;
        }
        if (action === "clearlogs") {
          clearLogsData();
          return;
        }
        if (!accountId) return;
        if (action === "viewinv") {
          openAdminInventoryModal(accountId);
          return;
        }
        if (!network.db) return;
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
          if (!(blockInput instanceof HTMLSelectElement) || !(amountInput instanceof HTMLInputElement)) return;
          const blockId = blockInput.value || "";
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

      function handleAdminInventoryModalChange(event) {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        if (!(target instanceof HTMLSelectElement)) return;
        if (!target.classList.contains("admin-inv-kind")) return;
        const accountId = target.dataset.accountId || "";
        if (!accountId) return;
        const itemSelect = adminInventoryBodyEl.querySelector('.admin-inv-item[data-account-id="' + accountId + '"]');
        if (!(itemSelect instanceof HTMLSelectElement)) return;
        itemSelect.innerHTML = buildAdminInventoryItemOptions(target.value === "cosmetic" ? "cosmetic" : "block");
      }

      function handleAdminInventoryModalAction(event) {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const action = (target.dataset.adminInvAct || "").trim();
        if (!action) return;
        if (!network.db || !canUseAdminPanel) return;
        const accountId = (target.dataset.accountId || "").trim();
        if (!accountId) return;
        const account = adminState.accounts[accountId] || {};
        const username = (account.username || accountId).toString();
        const role = getAccountRole(accountId, username);
        if (!canEditAdminInventoryModal() || !canActorGrantTarget(accountId, role)) {
          postLocalSystemChat("Permission denied.");
          return;
        }
        const kindSelect = adminInventoryBodyEl.querySelector('.admin-inv-kind[data-account-id="' + accountId + '"]');
        const itemSelect = adminInventoryBodyEl.querySelector('.admin-inv-item[data-account-id="' + accountId + '"]');
        const amountInput = adminInventoryBodyEl.querySelector('.admin-inv-amount[data-account-id="' + accountId + '"]');
        if (!(kindSelect instanceof HTMLSelectElement) || !(itemSelect instanceof HTMLSelectElement) || !(amountInput instanceof HTMLInputElement)) return;
        const removeAllItem = (kind, itemId) => {
          const cleanKind = kind === "cosmetic" ? "cosmetic" : "block";
          const cleanItemId = String(itemId || "").trim();
          if (!cleanItemId) return;
          if (cleanKind === "cosmetic") {
            const itemDef = COSMETIC_ITEMS.find((it) => it.id === cleanItemId);
            if (!itemDef) return;
            network.db.ref(BASE_PATH + "/player-inventories/" + accountId + "/cosmeticItems/" + cleanItemId).set(0).then(() => {
              setLocalInventoryCosmeticCount(accountId, cleanItemId, 0);
              logAdminAudit("Admin(inventory-modal) removed all item " + cleanItemId + " for @" + username + ".");
              pushAdminAuditEntry("inventory_remove_all", accountId, "item=" + cleanItemId);
              syncAdminPanelAfterInventoryChange(accountId);
            }).catch(() => {
              postLocalSystemChat("Failed to remove cosmetic item.");
            });
            return;
          }
          const blockId = parseBlockRef(cleanItemId);
          if (!INVENTORY_IDS.includes(blockId)) return;
          network.db.ref(BASE_PATH + "/player-inventories/" + accountId + "/" + blockId).set(0).then(() => {
            setLocalInventoryBlockCount(accountId, blockId, 0);
            logAdminAudit("Admin(inventory-modal) removed all block " + blockId + " for @" + username + ".");
            pushAdminAuditEntry("inventory_remove_all", accountId, "block=" + blockId);
            syncAdminPanelAfterInventoryChange(accountId);
          }).catch(() => {
            postLocalSystemChat("Failed to remove block item.");
          });
        };
        if (action === "removeallselected") {
          const currentSelect = adminInventoryBodyEl.querySelector('.admin-inv-current[data-account-id="' + accountId + '"]');
          if (!(currentSelect instanceof HTMLSelectElement)) return;
          const raw = String(currentSelect.value || "");
          const sep = raw.indexOf(":");
          if (sep <= 0) return;
          const selectedKind = raw.slice(0, sep);
          const selectedItemId = raw.slice(sep + 1);
          removeAllItem(selectedKind, selectedItemId);
          return;
        }
        if (action === "removeall") {
          removeAllItem(target.dataset.kind, target.dataset.itemId);
          return;
        }
        const amount = Math.max(1, Math.floor(Number(amountInput.value) || 1));
        const delta = action === "remove" ? -amount : amount;
        if (kindSelect.value === "cosmetic") {
          const itemId = (itemSelect.value || "").toString();
          if (!itemId) return;
          const itemDef = COSMETIC_ITEMS.find((it) => it.id === itemId);
          if (!itemDef) return;
          network.db.ref(BASE_PATH + "/player-inventories/" + accountId + "/cosmeticItems/" + itemId).transaction((current) => {
            const now = Math.max(0, Math.floor(Number(current) || 0));
            return Math.max(0, now + delta);
          }).then((result) => {
            const next = Math.max(0, Math.floor(Number(result && result.snapshot && result.snapshot.val ? result.snapshot.val() : 0) || 0));
            setLocalInventoryCosmeticCount(accountId, itemId, next);
            logAdminAudit("Admin(inventory-modal) " + (delta > 0 ? "added " : "removed ") + "item " + itemId + " x" + amount + " for @" + username + ".");
            pushAdminAuditEntry(delta > 0 ? "inventory_add" : "inventory_remove", accountId, "item=" + itemId + " amount=" + amount);
            syncAdminPanelAfterInventoryChange(accountId);
          }).catch(() => {
            postLocalSystemChat("Failed to update cosmetic item.");
          });
          return;
        }
        const blockId = parseBlockRef(itemSelect.value || "");
        if (!INVENTORY_IDS.includes(blockId)) return;
        network.db.ref(BASE_PATH + "/player-inventories/" + accountId + "/" + blockId).transaction((current) => {
          const now = Math.max(0, Math.floor(Number(current) || 0));
          return Math.max(0, now + delta);
        }).then((result) => {
          const next = Math.max(0, Math.floor(Number(result && result.snapshot && result.snapshot.val ? result.snapshot.val() : 0) || 0));
          setLocalInventoryBlockCount(accountId, blockId, next);
          logAdminAudit("Admin(inventory-modal) " + (delta > 0 ? "added " : "removed ") + "block " + blockId + " x" + amount + " for @" + username + ".");
          pushAdminAuditEntry(delta > 0 ? "inventory_add" : "inventory_remove", accountId, "block=" + blockId + " amount=" + amount);
          syncAdminPanelAfterInventoryChange(accountId);
        }).catch(() => {
          postLocalSystemChat("Failed to update block item.");
        });
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

      function buildAssetVersionTag() {
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, "0");
        const dd = String(now.getDate()).padStart(2, "0");
        const hh = String(now.getHours()).padStart(2, "0");
        const mi = String(now.getMinutes()).padStart(2, "0");
        const ss = String(now.getSeconds()).padStart(2, "0");
        return yyyy + "-" + mm + "-" + dd + "-" + hh + mi + ss;
      }

      async function hardReloadClient(assetVersion) {
        try {
          if ("caches" in window && window.caches && typeof window.caches.keys === "function") {
            const keys = await window.caches.keys();
            await Promise.all(keys.map((key) => window.caches.delete(key)));
          }
        } catch (error) {
          // ignore cache cleanup failures
        }
        const url = new URL(window.location.href);
        const nextVersion = (assetVersion || "").toString().trim();
        if (nextVersion) {
          url.searchParams.set("v", nextVersion);
          try {
            localStorage.setItem("gt_asset_version", nextVersion);
          } catch (error) {
            // ignore localStorage write failures
          }
        }
        url.searchParams.set("_fr", Date.now().toString());
        window.location.replace(url.toString());
      }

      function showUpdatingOverlay() {
        if (!updatingOverlayEl) return;
        updatingOverlayEl.classList.remove("hidden");
      }

      function hideAnnouncementPopup() {
        if (!announcementPopupEl) return;
        announcementPopupEl.classList.add("hidden");
      }

      function showAnnouncementPopup(message) {
        if (!announcementPopupEl || !announcementTextEl) return;
        const text = (message || "").toString().trim().slice(0, 180);
        if (!text) return;
        announcementTextEl.textContent = text;
        announcementPopupEl.classList.remove("hidden");
        if (announcementHideTimer) {
          clearTimeout(announcementHideTimer);
        }
        announcementHideTimer = setTimeout(() => {
          hideAnnouncementPopup();
          announcementHideTimer = 0;
        }, 5000);
      }

      function triggerForceReloadAll(sourceTag) {
        if (!network.db || !hasAdminPermission("force_reload")) {
          postLocalSystemChat("Permission denied.");
          return;
        }
        const eventId = "fr_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
        const assetVersion = buildAssetVersionTag();
        network.db.ref(BASE_PATH + "/system/force-reload").set({
          id: eventId,
          assetVersion,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          actorAccountId: playerProfileId || "",
          actorUsername: playerName || "",
          source: (sourceTag || "panel").toString().slice(0, 16)
        }).then(() => {
          logAdminAudit("Admin(" + (sourceTag || "panel") + ") requested global client reload.");
          pushAdminAuditEntry("force_reload", "", "all_clients version=" + assetVersion);
          postLocalSystemChat("Force reload broadcast sent (v=" + assetVersion + ").");
        }).catch(() => {
          postLocalSystemChat("Failed to send reload broadcast.");
        });
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
        const safeBlock = parseBlockRef(blockId);
        if (!INVENTORY_IDS.includes(safeBlock) || !Number.isInteger(safeAmount) || safeAmount <= 0) {
          postLocalSystemChat("Usage: blockId <number|key> (e.g. wood_block) and amount >= 1.");
          return false;
        }
        network.db.ref(BASE_PATH + "/player-inventories/" + accountId + "/" + safeBlock).transaction((current) => {
          const next = (Number(current) || 0) + safeAmount;
          return Math.max(0, next);
        }).then((result) => {
          const next = Math.max(0, Math.floor(Number(result && result.snapshot && result.snapshot.val ? result.snapshot.val() : 0) || 0));
          setLocalInventoryBlockCount(accountId, safeBlock, next);
          const target = targetLabel || targetUsername || accountId;
          logAdminAudit("Admin(" + sourceTag + ") gave @" + target + " block " + safeBlock + " amount " + safeAmount + ".");
          pushAdminAuditEntry("givex", accountId, "block=" + safeBlock + " amount=" + safeAmount);
          syncAdminPanelAfterInventoryChange(accountId);
          //postLocalSystemChat("Granted block " + safeBlock + " x" + safeAmount + " to @" + target + ".");
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
        }).then((result) => {
          const next = Math.max(0, Math.floor(Number(result && result.snapshot && result.snapshot.val ? result.snapshot.val() : 0) || 0));
          setLocalInventoryCosmeticCount(accountId, itemIdSafe, next);
          const target = targetLabel || targetUsername || accountId;
          logAdminAudit("Admin(" + sourceTag + ") gave @" + target + " item " + itemIdSafe + " x" + amountSafe + ".");
          pushAdminAuditEntry("giveitem", accountId, "item=" + itemIdSafe + " amount=" + amountSafe);
          syncAdminPanelAfterInventoryChange(accountId);
          //postLocalSystemChat("Granted item " + itemIdSafe + " x" + amountSafe + " to @" + target + ".");
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
            adminState.inventories[accountId] = JSON.parse(JSON.stringify(resetPayload));
            logAdminAudit("Admin(" + sourceTag + ") reset inventory for " + accountId + ".");
            pushAdminAuditEntry("resetinv", accountId, "");
            syncAdminPanelAfterInventoryChange(accountId);
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
          suppressSpawnSafetyUntilMs = performance.now() + 2500;
          pendingTeleportSelf = { worldId: safeWorld, x: safeX, y: safeY };
          switchWorld(safeWorld, false);
          return;
        }
        suppressSpawnSafetyUntilMs = performance.now() + 900;
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
        if (command === "/lock") {
          if (!inWorld) {
            postLocalSystemChat("Enter a world first.");
            return true;
          }
          if (isWorldLocked()) {
            if (isWorldLockOwner()) {
              postLocalSystemChat("You already own this world's lock.");
            } else {
              notifyWorldLockedDenied();
            }
            return true;
          }
          const target = getSpawnStructureTiles().base;
          const oldSelected = selectedSlot;
          const idx = slotOrder.indexOf(WORLD_LOCK_ID);
          if (idx < 0 || (inventory[WORLD_LOCK_ID] || 0) <= 0) {
            postLocalSystemChat("You need a World Lock item.");
            return true;
          }
          selectedSlot = idx;
          tryPlace(target.tx, target.ty);
          selectedSlot = oldSelected;
          refreshToolbar();
          return true;
        }
        if (command === "/unlock") {
          if (!inWorld) {
            postLocalSystemChat("Enter a world first.");
            return true;
          }
          if (!isWorldLocked()) {
            postLocalSystemChat("World is not locked.");
            return true;
          }
          if (!isWorldLockOwner()) {
            notifyWorldLockedDenied();
            return true;
          }
          const lockTx = Number(currentWorldLock && currentWorldLock.tx);
          const lockTy = Number(currentWorldLock && currentWorldLock.ty);
          if (Number.isInteger(lockTx) && Number.isInteger(lockTy) && lockTx >= 0 && lockTy >= 0 && lockTx < WORLD_W && lockTy < WORLD_H) {
            tryBreak(lockTx, lockTy);
          } else {
            currentWorldLock = null;
            if (network.enabled && network.lockRef) {
              network.lockRef.remove().catch(() => {});
            }
            postLocalSystemChat("World unlocked.");
          }
          return true;
        }
        if (command === "/adminhelp") {
          const available = ["/myrole"];
          available.push("/lock", "/unlock");
          available.push("/online");
          if (hasAdminPermission("tp")) available.push("/where", "/goto");
          if (hasAdminPermission("bring")) available.push("/bringall");
          available.push("/announce");
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
        if (command === "/online") {
          const worldOnline = inWorld ? (remotePlayers.size + 1) : 0;
          postLocalSystemChat("Online now: " + totalOnlinePlayers + " total | " + worldOnline + " in " + (inWorld ? currentWorldId : "menu"));
          return true;
        }
        if (!canUseAdminPanel) {
          postLocalSystemChat("You are not allowed to use admin commands.");
          return true;
        }
        if (command === "/where") {
          if (!hasAdminPermission("tp")) {
            postLocalSystemChat("Permission denied.");
            return true;
          }
          const targetRef = parts[1] || "";
          if (!targetRef) {
            postLocalSystemChat("Usage: /where <user>");
            return true;
          }
          const accountId = findAccountIdByUserRef(targetRef);
          if (!accountId) {
            postLocalSystemChat("Target account not found: " + targetRef);
            return true;
          }
          const online = findOnlineGlobalPlayerByAccountId(accountId);
          if (!online || !online.world) {
            postLocalSystemChat("@" + targetRef + " is offline.");
            return true;
          }
          const tx = Math.max(0, Math.floor((Number(online.x) || 0) / TILE));
          const ty = Math.max(0, Math.floor((Number(online.y) || 0) / TILE));
          postLocalSystemChat("@" + targetRef + " is in " + online.world + " at " + tx + "," + ty + ".");
          return true;
        }
        if (command === "/goto") {
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
        if (command === "/announce") {
          const message = parts.slice(1).join(" ").trim();
          if (!message) {
            postLocalSystemChat("Usage: /announce <message>");
            return true;
          }
          if (!network.db) {
            postLocalSystemChat("Network unavailable.");
            return true;
          }
          const announceId = "an_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
          const msg = message.slice(0, 140);
          network.db.ref(BASE_PATH + "/system/announcement").set({
            id: announceId,
            text: msg,
            actorUsername: (playerName || "admin").toString().slice(0, 20),
            createdAt: firebase.database.ServerValue.TIMESTAMP
          }).then(() => {
            sendSystemWorldMessage("[Admin] " + (playerName || "admin") + ": " + msg);
            postLocalSystemChat("Announcement sent.");
            pushAdminAuditEntry("announce", "", msg.slice(0, 80));
          }).catch(() => {
            postLocalSystemChat("Failed to send announcement.");
          });
          return true;
        }
        if (command === "/clearaudit") {
          if (!hasAdminPermission("clear_logs") || !network.db) {
            postLocalSystemChat("Permission denied.");
            return true;
          }
          network.db.ref(BASE_PATH + "/admin-audit").remove().then(() => {
            adminState.audit = [];
            refreshAuditActionFilterOptions();
            renderAdminPanel();
            postLocalSystemChat("Audit trail cleared.");
            pushAdminAuditEntry("clear_audit", "", "");
          }).catch(() => {
            postLocalSystemChat("Failed to clear audit trail.");
          });
          return true;
        }
        if (command === "/clearlogs") {
          if (!hasAdminPermission("clear_logs")) {
            postLocalSystemChat("Permission denied.");
            return true;
          }
          clearLogsData();
          return true;
        }
        if (command === "/bringall") {
          if (!hasAdminPermission("bring")) {
            postLocalSystemChat("Permission denied.");
            return true;
          }
          if (!inWorld) {
            postLocalSystemChat("Enter a world first.");
            return true;
          }
          if (!ensureCommandReady("bring")) return true;
          const players = adminState.globalPlayers || {};
          const uniqueTargets = new Set();
          const allowedTargets = [];
          for (const p of Object.values(players)) {
            if (!p || p.world !== currentWorldId) continue;
            const accountId = (p.accountId || "").toString();
            if (!accountId || accountId === playerProfileId || uniqueTargets.has(accountId)) continue;
            const role = getAccountRole(accountId, adminState.accounts[accountId] && adminState.accounts[accountId].username);
            if (!canActorAffectTarget(accountId, role)) continue;
            uniqueTargets.add(accountId);
            allowedTargets.push(accountId);
          }
          if (!allowedTargets.length) {
            postLocalSystemChat("No summonable players found in this world.");
            return true;
          }
          Promise.all(allowedTargets.map((accountId) => {
            return issueTeleportCommand(accountId, currentWorldId, player.x + 24, player.y);
          })).then((results) => {
            const okCount = results.filter(Boolean).length;
            postLocalSystemChat("Summoned " + okCount + "/" + allowedTargets.length + " players.");
            logAdminAudit("Admin(chat) used bringall in " + currentWorldId + " (" + okCount + "/" + allowedTargets.length + ").");
            pushAdminAuditEntry("bringall", "", "world=" + currentWorldId + " ok=" + okCount + "/" + allowedTargets.length);
          }).catch(() => {
            postLocalSystemChat("Failed to summon all players.");
          });
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
          const blockRef = parts[2] || "";
          const blockId = parseBlockRef(blockRef);
          const amount = Number(parts[3]);
          const accountId = findAccountIdByUserRef(targetRef);
          if (!accountId) {
            postLocalSystemChat("Target account not found: " + targetRef);
            return true;
          }
          if (!INVENTORY_IDS.includes(blockId) || !Number.isInteger(amount) || amount <= 0) {
            postLocalSystemChat("Usage: /givex <user> <block_key|block_id> <amount>");
            return true;
          }
          if (applyInventoryGrant(accountId, blockRef || blockId, amount, "chat", targetRef)) {
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

      async function getAuthDb() {
        if (!window.firebase) {
          throw new Error("Firebase SDK not loaded.");
        }
        const firebaseConfig = window.FIREBASE_CONFIG;
        if (firebaseConfig && !firebaseConfig.apiKey && typeof window.getFirebaseApiKey === "function") {
          try {
            firebaseConfig.apiKey = await window.getFirebaseApiKey();
          } catch (error) {
            throw new Error("Failed to fetch Firebase API key at runtime.");
          }
        }
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
          const db = await getAuthDb();
          network.db = db;
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
          const db = await getAuthDb();
          network.db = db;
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

      function makeWorld(worldId) {
        const hashFn = typeof blocksModule.hashWorldSeed === "function"
          ? blocksModule.hashWorldSeed
          : (typeof worldModule.hashWorldSeed === "function" ? worldModule.hashWorldSeed.bind(worldModule) : null);
        if (typeof worldModule.createWorld === "function") {
          return worldModule.createWorld(
            worldId,
            WORLD_W,
            WORLD_H,
            hashFn,
            SPAWN_TILE_X,
            SPAWN_TILE_Y,
            SPAWN_DOOR_ID,
            SPAWN_BASE_ID
          );
        }
        const w = Array.from({ length: WORLD_H }, () => Array(WORLD_W).fill(0));
        if (typeof worldModule.applySpawnStructureToGrid === "function") {
          worldModule.applySpawnStructureToGrid(w, WORLD_W, WORLD_H, SPAWN_TILE_X, SPAWN_TILE_Y, SPAWN_DOOR_ID, SPAWN_BASE_ID);
        }
        return w;
      }

      function getSpawnStructureTiles() {
        if (typeof worldModule.getSpawnStructureTiles === "function") {
          return worldModule.getSpawnStructureTiles(SPAWN_TILE_X, SPAWN_TILE_Y, SPAWN_DOOR_ID, SPAWN_BASE_ID);
        }
        return {
          door: { tx: SPAWN_TILE_X, ty: SPAWN_TILE_Y, id: SPAWN_DOOR_ID },
          base: { tx: SPAWN_TILE_X, ty: SPAWN_TILE_Y + 1, id: SPAWN_BASE_ID }
        };
      }

      function applySpawnStructureToGrid(grid) {
        if (!Array.isArray(grid) || !grid.length) return;
        if (typeof worldModule.applySpawnStructureToGrid === "function") {
          worldModule.applySpawnStructureToGrid(grid, WORLD_W, WORLD_H, SPAWN_TILE_X, SPAWN_TILE_Y, SPAWN_DOOR_ID, SPAWN_BASE_ID);
          return;
        }
        const tiles = getSpawnStructureTiles();
        grid[tiles.door.ty][tiles.door.tx] = tiles.door.id;
        grid[tiles.base.ty][tiles.base.tx] = tiles.base.id;
      }

      function getProtectedTileRequiredId(tx, ty) {
        const tiles = getSpawnStructureTiles();
        if (tx === tiles.door.tx && ty === tiles.door.ty) return tiles.door.id;
        if (tx === tiles.base.tx && ty === tiles.base.ty) return tiles.base.id;
        return 0;
      }

      function enforceSpawnStructureInWorldData() {
        applySpawnStructureToGrid(world);
      }

      function enforceSpawnStructureInDatabase() {
        if (!network.enabled || !network.blocksRef || !network.db) return;
        const tiles = getSpawnStructureTiles();
        const updates = {};
        updates[tiles.door.tx + "_" + tiles.door.ty] = tiles.door.id;
        updates[tiles.base.tx + "_" + tiles.base.ty] = tiles.base.id;
        network.blocksRef.update(updates).catch(() => {});
      }

      function findSafeDoorSpawnPosition() {
        const tiles = getSpawnStructureTiles();
        const doorTx = tiles.door.tx;
        const doorTy = tiles.door.ty;
        const baseX = doorTx * TILE + Math.floor((TILE - PLAYER_W) / 2);
        const baseY = doorTy * TILE + (TILE - PLAYER_H);
        const dxOffsets = [0, -1, 1, -2, 2, -3, 3];
        for (let dy = 0; dy <= 8; dy++) {
          for (let i = 0; i < dxOffsets.length; i++) {
            const tx = doorTx + dxOffsets[i];
            const ty = doorTy - dy;
            if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H) continue;
            const x = tx * TILE + Math.floor((TILE - PLAYER_W) / 2);
            const y = ty * TILE + (TILE - PLAYER_H);
            if (!rectCollides(x, y, PLAYER_W, PLAYER_H)) {
              return { x, y };
            }
          }
        }
        return { x: baseX, y: baseY };
      }

      function ensurePlayerSafeSpawn(forceToDoor) {
        if (!inWorld && !forceToDoor) return;
        if (performance.now() < suppressSpawnSafetyUntilMs) return;
        const force = Boolean(forceToDoor);
        if (!force && !rectCollides(player.x, player.y, PLAYER_W, PLAYER_H)) {
          return;
        }
        const safe = findSafeDoorSpawnPosition();
        player.x = clampTeleport(safe.x, 0, WORLD_W * TILE - PLAYER_W - 2);
        player.y = clampTeleport(safe.y, 0, WORLD_H * TILE - PLAYER_H - 2);
        player.vx = 0;
        player.vy = 0;
        player.grounded = false;
      }

      function resetForWorldChange() {
        remotePlayers.clear();
        clearWorldDrops();
        const ctrl = getVendingController();
        if (ctrl && typeof ctrl.clearAll === "function") ctrl.clearAll();
        signTexts.clear();
        doorAccessByTile.clear();
        antiGravityByTile.clear();
        cameraConfigsByTile.clear();
        cameraLogsByTile.clear();
        closeSignModal();
        closeWorldLockModal();
        closeDoorModal();
        closeCameraModal();
        closeWeatherModal();
        closeTradeMenuModal();
        closeTradeRequestModal();
        updateOnlineCount();
        world = makeWorld(currentWorldId);
        setLocalWorldWeather(localWeatherByWorld.get(currentWorldId) || null);
        if (blockSyncer && typeof blockSyncer.reset === "function") {
          blockSyncer.reset();
        }
        player.x = TILE * SPAWN_TILE_X;
        player.y = TILE * SPAWN_TILE_Y;
        player.vx = 0;
        player.vy = 0;
        ensurePlayerSafeSpawn(true);
        if (playerSyncController && typeof playerSyncController.reset === "function") {
          playerSyncController.reset();
        }
        airJumpsUsed = 0;
      }

      function setInWorldState(nextValue) {
        inWorld = Boolean(nextValue);
        menuScreenEl.classList.toggle("hidden", inWorld);
        toolbar.classList.toggle("hidden", !inWorld);
        applyToolbarPosition();
        mobileControlsEl.classList.toggle("hidden", !inWorld || !isCoarsePointer);
        chatToggleBtn.classList.toggle("hidden", !inWorld);
        adminToggleBtn.classList.toggle("hidden", !canUseAdminPanel);
        exitWorldBtn.classList.toggle("hidden", !inWorld);
        if (inWorld) {
          hasRenderedMenuWorldList = false;
          setChatOpen(false);
        } else {
          setChatOpen(false);
          closeVendingModal();
          closeSignModal();
          closeWorldLockModal();
          closeDoorModal();
          closeCameraModal();
          closeWeatherModal();
          closeTradeMenuModal();
          closeTradeRequestModal();
          if (!hasRenderedMenuWorldList) {
            refreshWorldButtons(null, true);
            hasRenderedMenuWorldList = true;
          }
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
        if (!logsMessagesEl) return;
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
        isLogsOpen = Boolean(open) && false;
      }

      function refreshCanvasWrapVisibility() {
        const showWrap = inWorld;
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
        const db = network.db;
        if (!db) {
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
        if (network.myTradeRequestRef && network.handlers.myTradeRequest) {
          network.myTradeRequestRef.off("value", network.handlers.myTradeRequest);
        }
        if (network.myTradeResponseRef && network.handlers.myTradeResponse) {
          network.myTradeResponseRef.off("value", network.handlers.myTradeResponse);
        }
        if (network.myActiveTradeRef && network.handlers.myActiveTrade) {
          network.myActiveTradeRef.off("value", network.handlers.myActiveTrade);
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
        if (network.forceReloadRef && network.handlers.forceReload) {
          network.forceReloadRef.off("value", network.handlers.forceReload);
        }
        if (network.announcementRef && network.handlers.announcement) {
          network.announcementRef.off("value", network.handlers.announcement);
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
          logCameraEvent(
            "player_leave",
            playerName + " left " + currentWorldId + ".",
            playerProfileId,
            playerName
          );
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
        hideAnnouncementPopup();
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
        suppressChatOpenUntilMs = performance.now() + 300;
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
          chatInputEl.value = "";
          setChatOpen(false);
          network.chatRef.push({
            name: playerName,
            playerId,
            sessionId: playerSessionId || "",
            text,
            createdAt: firebase.database.ServerValue.TIMESTAMP
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
        if (id === DOOR_BLOCK_ID) {
          if (!isWorldLocked()) return false;
          const mode = getLocalDoorMode(tx, ty);
          if (mode === "owner" && !isWorldLockOwner() && !isWorldLockAdmin()) return true;
          return false;
        }
        const def = blockDefs[id];
        return Boolean(def && def.solid);
      }

      function isUnbreakableTileId(id) {
        const def = blockDefs[id];
        return Boolean(def && def.unbreakable);
      }

      function getBlockKeyById(id) {
        return (BLOCK_ID_TO_KEY[id] || ("block_" + id)).toString();
      }

      function parseBlockRef(value) {
        if (typeof blockKeysModule.parseBlockRef === "function") {
          return blockKeysModule.parseBlockRef(value, BLOCK_KEY_TO_ID, blockDefs);
        }
        const raw = (value || "").toString().trim().toLowerCase();
        if (!raw) return 0;
        if (BLOCK_KEY_TO_ID[raw] !== undefined) return Number(BLOCK_KEY_TO_ID[raw]);
        const numeric = Number(raw);
        if (Number.isInteger(numeric) && blockDefs[numeric]) return numeric;
        return 0;
      }

      function isLiquidTile(tx, ty) {
        if (typeof physicsModule.isLiquidTile === "function") {
          return physicsModule.isLiquidTile(world, blockDefs, tx, ty, WORLD_W, WORLD_H);
        }
        if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H) return false;
        const id = world[ty][tx];
        const def = blockDefs[id];
        return Boolean(def && def.liquid);
      }

      function isOneWayPlatformTile(tx, ty) {
        if (typeof physicsModule.isOneWayPlatformTile === "function") {
          return physicsModule.isOneWayPlatformTile(world, blockDefs, tx, ty, WORLD_W, WORLD_H);
        }
        if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H) return false;
        const id = world[ty][tx];
        const def = blockDefs[id];
        return Boolean(def && def.oneWay);
      }

      function isStairTileId(id) {
        return STAIR_ROTATION_IDS.includes(id);
      }

      function getRotatedBlockId(id) {
        const idx = STAIR_ROTATION_IDS.indexOf(id);
        if (idx < 0) return 0;
        return STAIR_ROTATION_IDS[(idx + 1) % STAIR_ROTATION_IDS.length];
      }

      function getInventoryDropId(id) {
        return STAIR_ROTATION_IDS.includes(id) ? STAIR_BASE_ID : id;
      }

      function getTileKey(tx, ty) {
        return String(tx) + "_" + String(ty);
      }

      function normalizeDoorAccessRecord(value) {
        if (!value) return null;
        let mode = "public";
        if (typeof value === "string") {
          mode = value.toLowerCase() === "owner" ? "owner" : "public";
        } else if (typeof value === "object") {
          mode = String(value.mode || "public").toLowerCase() === "owner" ? "owner" : "public";
        }
        return {
          mode,
          updatedAt: value && typeof value.updatedAt === "number" ? value.updatedAt : 0
        };
      }

      function setLocalDoorAccess(tx, ty, value) {
        const key = getTileKey(tx, ty);
        const normalized = normalizeDoorAccessRecord(value);
        if (!normalized) {
          doorAccessByTile.delete(key);
          if (doorEditContext && doorEditContext.tx === tx && doorEditContext.ty === ty) {
            closeDoorModal();
          }
          return;
        }
        doorAccessByTile.set(key, normalized);
      }

      function getLocalDoorMode(tx, ty) {
        const entry = doorAccessByTile.get(getTileKey(tx, ty));
        return entry && entry.mode === "owner" ? "owner" : "public";
      }

      function normalizeAntiGravityRecord(value) {
        if (value === undefined || value === null) return null;
        let enabled = true;
        if (typeof value === "boolean") {
          enabled = value;
        } else if (typeof value === "string") {
          const normalized = value.toLowerCase().trim();
          enabled = !(normalized === "0" || normalized === "false" || normalized === "off" || normalized === "disabled");
        } else if (typeof value === "object") {
          if (typeof value.enabled === "boolean") {
            enabled = value.enabled;
          } else if (value.enabled !== undefined && value.enabled !== null) {
            const normalized = String(value.enabled).toLowerCase().trim();
            enabled = !(normalized === "0" || normalized === "false" || normalized === "off" || normalized === "disabled");
          }
        }
        return {
          enabled: Boolean(enabled),
          updatedAt: value && typeof value.updatedAt === "number" ? value.updatedAt : 0
        };
      }

      function setLocalAntiGravityState(tx, ty, value) {
        const key = getTileKey(tx, ty);
        const normalized = normalizeAntiGravityRecord(value);
        if (!normalized) {
          antiGravityByTile.delete(key);
          return;
        }
        antiGravityByTile.set(key, normalized);
      }

      function isAntiGravityEnabledAt(tx, ty) {
        if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H) return false;
        if (world[ty][tx] !== ANTI_GRAV_ID) return false;
        const entry = antiGravityByTile.get(getTileKey(tx, ty));
        if (!entry) return true;
        return entry.enabled !== false;
      }

      function saveAntiGravityState(tx, ty, enabled) {
        if (world[ty][tx] !== ANTI_GRAV_ID) {
          setLocalAntiGravityState(tx, ty, null);
          return;
        }
        const payload = {
          enabled: Boolean(enabled),
          updatedAt: Date.now()
        };
        setLocalAntiGravityState(tx, ty, payload);
        if (network.enabled && network.antiGravRef) {
          network.antiGravRef.child(getTileKey(tx, ty)).set({
            enabled: Boolean(enabled),
            updatedAt: firebase.database.ServerValue.TIMESTAMP
          }).catch(() => {});
        }
      }

      function toggleAntiGravityGenerator(tx, ty) {
        if (!canEditTarget(tx, ty)) return;
        if (world[ty][tx] !== ANTI_GRAV_ID) return;
        if (!canEditCurrentWorld()) {
          notifyWorldLockedDenied();
          return;
        }
        const nextEnabled = !isAntiGravityEnabledAt(tx, ty);
        saveAntiGravityState(tx, ty, nextEnabled);
        postLocalSystemChat("Anti gravity generator " + (nextEnabled ? "enabled." : "disabled."));
      }

      function isPlayerInAntiGravityField(x, y, w, h) {
        const centerTx = Math.floor((x + w / 2) / TILE);
        const centerTy = Math.floor((y + h / 2) / TILE);
        const startX = Math.max(0, centerTx - ANTI_GRAV_RADIUS_TILES);
        const endX = Math.min(WORLD_W - 1, centerTx + ANTI_GRAV_RADIUS_TILES);
        const startY = Math.max(0, centerTy - ANTI_GRAV_RADIUS_TILES);
        const endY = Math.min(WORLD_H - 1, centerTy + ANTI_GRAV_RADIUS_TILES);
        for (let ty = startY; ty <= endY; ty++) {
          for (let tx = startX; tx <= endX; tx++) {
            if (!isAntiGravityEnabledAt(tx, ty)) continue;
            const dx = tx - centerTx;
            const dy = ty - centerTy;
            if ((dx * dx + dy * dy) <= (ANTI_GRAV_RADIUS_TILES * ANTI_GRAV_RADIUS_TILES)) {
              return true;
            }
          }
        }
        return false;
      }

      function buildDefaultCameraConfig() {
        return {
          events: {
            playerJoin: true,
            playerLeave: true,
            vendingPurchase: true
          },
          excludeAdminOwner: false,
          updatedAt: 0
        };
      }

      function normalizeCameraConfig(value) {
        const defaults = buildDefaultCameraConfig();
        if (!value || typeof value !== "object") return defaults;
        const eventsRaw = value.events && typeof value.events === "object" ? value.events : {};
        return {
          events: {
            playerJoin: eventsRaw.playerJoin !== false,
            playerLeave: eventsRaw.playerLeave !== false,
            vendingPurchase: eventsRaw.vendingPurchase !== false
          },
          excludeAdminOwner: Boolean(value.excludeAdminOwner),
          updatedAt: typeof value.updatedAt === "number" ? value.updatedAt : 0
        };
      }

      function setLocalCameraConfig(tx, ty, value) {
        const key = getTileKey(tx, ty);
        if (!value) {
          cameraConfigsByTile.delete(key);
          cameraLogsByTile.delete(key);
          if (cameraEditContext && cameraEditContext.tx === tx && cameraEditContext.ty === ty) {
            closeCameraModal();
          }
          return;
        }
        cameraConfigsByTile.set(key, normalizeCameraConfig(value));
        if (cameraEditContext && cameraEditContext.tx === tx && cameraEditContext.ty === ty) {
          renderCameraModal();
        }
      }

      function appendLocalCameraLog(tileKey, value) {
        if (!tileKey) return;
        const current = cameraLogsByTile.get(tileKey) || [];
        current.push(value);
        if (current.length > 120) {
          current.splice(0, current.length - 120);
        }
        cameraLogsByTile.set(tileKey, current);
        if (cameraEditContext && getTileKey(cameraEditContext.tx, cameraEditContext.ty) === tileKey) {
          renderCameraModal();
        }
      }

      function closeCameraModal() {
        cameraEditContext = null;
        if (cameraModalEl) cameraModalEl.classList.add("hidden");
      }

      function renderCameraModal() {
        if (!cameraEditContext || !cameraModalEl || !cameraTitleEl || !cameraLogsListEl) return;
        const tx = Number(cameraEditContext.tx);
        const ty = Number(cameraEditContext.ty);
        if (!Number.isInteger(tx) || !Number.isInteger(ty)) return;
        if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H || world[ty][tx] !== CAMERA_ID) {
          closeCameraModal();
          return;
        }
        const key = getTileKey(tx, ty);
        const config = normalizeCameraConfig(cameraConfigsByTile.get(key) || buildDefaultCameraConfig());
        cameraTitleEl.textContent = "Camera (" + tx + "," + ty + ")";
        if (cameraEventJoinEl) cameraEventJoinEl.checked = config.events.playerJoin !== false;
        if (cameraEventLeaveEl) cameraEventLeaveEl.checked = config.events.playerLeave !== false;
        if (cameraEventVendingEl) cameraEventVendingEl.checked = config.events.vendingPurchase !== false;
        if (cameraFilterStaffEl) cameraFilterStaffEl.checked = Boolean(config.excludeAdminOwner);

        const rows = (cameraLogsByTile.get(key) || []).slice().sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
        cameraLogsListEl.innerHTML = rows.length
          ? rows.map((row) => {
            const time = formatChatTimestamp(Number(row.createdAt) || 0);
            const line = (time ? "[" + time + "] " : "") + (row.text || "");
            return "<div class='camera-log-row'>" + escapeHtml(line) + "</div>";
          }).join("")
          : "<div class='camera-log-row'>No logs yet.</div>";
        cameraLogsListEl.scrollTop = cameraLogsListEl.scrollHeight;
      }

      function saveCameraConfig(tx, ty, config) {
        if (!world[ty] || world[ty][tx] !== CAMERA_ID) {
          setLocalCameraConfig(tx, ty, null);
          return;
        }
        const normalized = normalizeCameraConfig(config || {});
        normalized.updatedAt = Date.now();
        setLocalCameraConfig(tx, ty, normalized);
        if (network.enabled && network.camerasRef) {
          network.camerasRef.child(getTileKey(tx, ty)).set({
            events: {
              playerJoin: normalized.events.playerJoin,
              playerLeave: normalized.events.playerLeave,
              vendingPurchase: normalized.events.vendingPurchase
            },
            excludeAdminOwner: normalized.excludeAdminOwner,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
          }).catch(() => {});
        }
      }

      function openCameraModal(tx, ty) {
        if (!cameraModalEl || !cameraTitleEl) return;
        if (!canEditTarget(tx, ty)) return;
        if (world[ty][tx] !== CAMERA_ID) return;
        cameraEditContext = { tx, ty };
        renderCameraModal();
        cameraModalEl.classList.remove("hidden");
      }

      function isAdminOrOwnerActor(accountId, username) {
        const role = getAccountRole(accountId || "", username || "");
        return role === "admin" || role === "manager" || role === "owner";
      }

      function logCameraEvent(eventType, text, actorAccountId, actorName) {
        if (!inWorld) return;
        const safeText = (text || "").toString().replace(/\s+/g, " ").trim().slice(0, 180);
        if (!safeText) return;
        const tileKeys = [];
        for (const [tileKey, configValue] of cameraConfigsByTile.entries()) {
          const config = normalizeCameraConfig(configValue);
          let enabled = false;
          if (eventType === "player_join") enabled = config.events.playerJoin !== false;
          if (eventType === "player_leave") enabled = config.events.playerLeave !== false;
          if (eventType === "vending_purchase") enabled = config.events.vendingPurchase !== false;
          if (!enabled) continue;
          if (config.excludeAdminOwner && isAdminOrOwnerActor(actorAccountId, actorName)) continue;
          tileKeys.push(tileKey);
        }
        if (!tileKeys.length) return;
        const createdAt = Date.now();
        if (!network.enabled || !network.cameraLogsRef) {
          for (const tileKey of tileKeys) {
            appendLocalCameraLog(tileKey, {
              tileKey,
              eventType,
              text: safeText,
              actorAccountId: actorAccountId || "",
              actorName: actorName || "",
              createdAt
            });
          }
          return;
        }
        for (const tileKey of tileKeys) {
          network.cameraLogsRef.push({
            tileKey,
            eventType,
            text: safeText,
            actorAccountId: actorAccountId || "",
            actorName: actorName || "",
            createdAt: firebase.database.ServerValue.TIMESTAMP
          }).catch(() => {});
        }
      }

      function normalizeWeatherRecord(value) {
        if (!value || typeof value !== "object") return null;
        const presetRaw = String(value.presetId || "").trim().toLowerCase();
        const presetId = WEATHER_PRESET_MAP.has(presetRaw) ? presetRaw : "none";
        const imageUrl = String(value.imageUrl || "").trim().slice(0, 420);
        const sourceTxNum = Math.floor(Number(value.sourceTx));
        const sourceTyNum = Math.floor(Number(value.sourceTy));
        const sourceTx = Number.isInteger(sourceTxNum) ? sourceTxNum : -1;
        const sourceTy = Number.isInteger(sourceTyNum) ? sourceTyNum : -1;
        if (presetId === "none" && !imageUrl) return null;
        return {
          presetId,
          imageUrl,
          sourceTx,
          sourceTy,
          updatedAt: typeof value.updatedAt === "number" ? value.updatedAt : 0
        };
      }

      function getWeatherPresetUrl(presetId) {
        const preset = WEATHER_PRESET_MAP.get(String(presetId || "").trim().toLowerCase());
        return preset ? String(preset.url || "").trim() : "";
      }

      function getActiveWeatherImageUrl() {
        const weather = normalizeWeatherRecord(currentWorldWeather);
        if (!weather) return "";
        if (
          Number.isInteger(weather.sourceTx) &&
          Number.isInteger(weather.sourceTy) &&
          weather.sourceTx >= 0 &&
          weather.sourceTy >= 0 &&
          weather.sourceTx < WORLD_W &&
          weather.sourceTy < WORLD_H &&
          world[weather.sourceTy] &&
          world[weather.sourceTy][weather.sourceTx] !== WEATHER_MACHINE_ID
        ) {
          return "";
        }
        const custom = String(weather.imageUrl || "").trim();
        if (custom) return custom;
        return getWeatherPresetUrl(weather.presetId);
      }

      function setLocalWorldWeather(value) {
        currentWorldWeather = normalizeWeatherRecord(value);
        if (currentWorldId) {
          if (currentWorldWeather) {
            localWeatherByWorld.set(currentWorldId, currentWorldWeather);
          } else {
            localWeatherByWorld.delete(currentWorldId);
          }
        }
        if (weatherEditContext) {
          renderWeatherModal();
        }
      }

      function closeWeatherModal() {
        weatherEditContext = null;
        if (weatherModalEl) weatherModalEl.classList.add("hidden");
      }

      function refreshWeatherPreview() {
        if (!weatherPresetSelectEl || !weatherImageUrlInputEl) return;
        const presetId = String(weatherPresetSelectEl.value || "none").trim().toLowerCase();
        const custom = String(weatherImageUrlInputEl.value || "").trim();
        const resolved = custom || getWeatherPresetUrl(presetId);
        if (weatherResolvedLabelEl) {
          weatherResolvedLabelEl.textContent = resolved ? ("Active image: " + resolved) : "Active image: Default Sky";
        }
        if (weatherPreviewImgEl) {
          if (resolved) {
            weatherPreviewImgEl.src = resolved;
            weatherPreviewImgEl.classList.remove("hidden");
            if (weatherPreviewEmptyEl) weatherPreviewEmptyEl.classList.add("hidden");
          } else {
            weatherPreviewImgEl.classList.add("hidden");
            weatherPreviewImgEl.removeAttribute("src");
            if (weatherPreviewEmptyEl) weatherPreviewEmptyEl.classList.remove("hidden");
          }
        }
      }

      function renderWeatherModal() {
        if (!weatherEditContext || !weatherModalEl || !weatherTitleEl || !weatherPresetSelectEl || !weatherImageUrlInputEl) return;
        const tx = Number(weatherEditContext.tx);
        const ty = Number(weatherEditContext.ty);
        if (!Number.isInteger(tx) || !Number.isInteger(ty)) return;
        if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H || world[ty][tx] !== WEATHER_MACHINE_ID) {
          closeWeatherModal();
          return;
        }
        weatherTitleEl.textContent = "Weather Machine (" + tx + "," + ty + ")";
        weatherPresetSelectEl.innerHTML = WEATHER_PRESETS.map((preset) => {
          return "<option value=\"" + escapeHtml(preset.id) + "\">" + escapeHtml(preset.name) + "</option>";
        }).join("");
        const record = normalizeWeatherRecord(currentWorldWeather) || { presetId: "none", imageUrl: "" };
        weatherPresetSelectEl.value = WEATHER_PRESET_MAP.has(record.presetId) ? record.presetId : "none";
        weatherImageUrlInputEl.value = String(record.imageUrl || "");
        refreshWeatherPreview();
      }

      function saveWorldWeatherFromMachine(tx, ty, presetIdRaw, imageUrlRaw) {
        if (!world[ty] || world[ty][tx] !== WEATHER_MACHINE_ID) {
          setLocalWorldWeather(null);
          return;
        }
        const presetId = WEATHER_PRESET_MAP.has(String(presetIdRaw || "").trim().toLowerCase())
          ? String(presetIdRaw || "").trim().toLowerCase()
          : "none";
        const imageUrl = String(imageUrlRaw || "").trim().slice(0, 420);
        if (presetId === "none" && !imageUrl) {
          setLocalWorldWeather(null);
          if (network.enabled && network.weatherRef) {
            network.weatherRef.remove().catch(() => {});
          }
          return;
        }
        const payload = {
          presetId,
          imageUrl,
          sourceTx: tx,
          sourceTy: ty,
          updatedAt: Date.now()
        };
        setLocalWorldWeather(payload);
        if (network.enabled && network.weatherRef) {
          network.weatherRef.set({
            presetId,
            imageUrl,
            sourceTx: tx,
            sourceTy: ty,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
          }).catch(() => {});
        }
      }

      function openWeatherModal(tx, ty) {
        if (!weatherModalEl || !weatherTitleEl) return;
        if (!canEditTarget(tx, ty)) return;
        if (world[ty][tx] !== WEATHER_MACHINE_ID) return;
        if (!canEditCurrentWorld()) {
          notifyWorldLockedDenied();
          return;
        }
        weatherEditContext = { tx, ty };
        renderWeatherModal();
        weatherModalEl.classList.remove("hidden");
      }

      function closeDoorModal() {
        doorEditContext = null;
        if (doorModalEl) doorModalEl.classList.add("hidden");
      }

      function saveDoorMode(tx, ty, mode) {
        const safeMode = mode === "owner" ? "owner" : "public";
        if (world[ty][tx] !== DOOR_BLOCK_ID) {
          setLocalDoorAccess(tx, ty, null);
          return;
        }
        if (safeMode === "public") {
          setLocalDoorAccess(tx, ty, null);
          if (network.enabled && network.doorsRef) {
            network.doorsRef.child(getTileKey(tx, ty)).remove().catch(() => {});
          }
          return;
        }
        const payload = {
          mode: "owner",
          updatedAt: Date.now()
        };
        setLocalDoorAccess(tx, ty, payload);
        if (network.enabled && network.doorsRef) {
          network.doorsRef.child(getTileKey(tx, ty)).set({
            mode: "owner",
            updatedAt: firebase.database.ServerValue.TIMESTAMP
          }).catch(() => {});
        }
      }

      function openDoorModal(tx, ty) {
        if (!doorModalEl || !doorTitleEl) return;
        if (!canEditTarget(tx, ty)) return;
        if (world[ty][tx] !== DOOR_BLOCK_ID) return;
        if (!isWorldLocked()) {
          postLocalSystemChat("Door access options are only available in world-locked worlds.");
          return;
        }
        if (!isWorldLockOwner()) {
          notifyWorldLockedDenied();
          return;
        }
        doorEditContext = { tx, ty };
        const mode = getLocalDoorMode(tx, ty);
        doorTitleEl.textContent = "Door (" + tx + "," + ty + ") - " + (mode === "owner" ? "Owner Only" : "Public");
        if (doorPublicBtn) doorPublicBtn.classList.toggle("active", mode === "public");
        if (doorOwnerOnlyBtn) doorOwnerOnlyBtn.classList.toggle("active", mode === "owner");
        doorModalEl.classList.remove("hidden");
      }

      function normalizeSignRecord(value) {
        if (!value) return null;
        let text = "";
        if (typeof value === "string") {
          text = value;
        } else if (typeof value === "object") {
          text = (value.text || "").toString();
        }
        text = text.replace(/\s+/g, " ").trim().slice(0, 120);
        if (!text) return null;
        return {
          text,
          updatedAt: value && typeof value.updatedAt === "number" ? value.updatedAt : 0
        };
      }

      function setLocalSignText(tx, ty, value) {
        const key = getTileKey(tx, ty);
        const normalized = normalizeSignRecord(value);
        if (!normalized) {
          signTexts.delete(key);
          if (signEditContext && signEditContext.tx === tx && signEditContext.ty === ty) {
            closeSignModal();
          }
          return;
        }
        signTexts.set(key, normalized);
      }

      function getLocalSignText(tx, ty) {
        const entry = signTexts.get(getTileKey(tx, ty));
        return entry && entry.text ? entry.text : "";
      }

      function closeSignModal() {
        signEditContext = null;
        if (signModalEl) signModalEl.classList.add("hidden");
      }

      function saveSignText(tx, ty, rawText) {
        const text = (rawText || "").toString().replace(/\s+/g, " ").trim().slice(0, 120);
        if (!text) {
          setLocalSignText(tx, ty, null);
          if (network.enabled && network.signsRef) {
            network.signsRef.child(getTileKey(tx, ty)).remove().catch(() => {});
          }
          return;
        }
        const payload = {
          text,
          updatedAt: Date.now()
        };
        setLocalSignText(tx, ty, payload);
        if (network.enabled && network.signsRef) {
          network.signsRef.child(getTileKey(tx, ty)).set({
            text,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
          }).catch(() => {});
        }
      }

      function openSignModal(tx, ty) {
        if (!signModalEl || !signTextInputEl || !signTitleEl) return;
        if (!canEditTarget(tx, ty)) return;
        if (world[ty][tx] !== SIGN_ID) return;
        if (!canEditCurrentWorld()) {
          notifyWorldLockedDenied();
          return;
        }
        signEditContext = { tx, ty };
        signTitleEl.textContent = "Sign (" + tx + "," + ty + ")";
        signTextInputEl.value = getLocalSignText(tx, ty);
        signModalEl.classList.remove("hidden");
        signTextInputEl.focus();
      }

      function normalizeVendingRecord(value) {
        const ctrl = getVendingController();
        if (!ctrl || typeof ctrl.normalizeRecord !== "function") return null;
        return ctrl.normalizeRecord(value);
      }

      function setLocalVendingMachine(tx, ty, value) {
        const ctrl = getVendingController();
        if (!ctrl || typeof ctrl.setLocal !== "function") return;
        ctrl.setLocal(tx, ty, value);
      }

      function getLocalVendingMachine(tx, ty) {
        const ctrl = getVendingController();
        if (!ctrl || typeof ctrl.getLocal !== "function") return null;
        return ctrl.getLocal(tx, ty);
      }

      function canManageVending(vm) {
        return Boolean(vm && playerProfileId && vm.ownerAccountId === playerProfileId);
      }

      function getActiveSellableBlockId() {
        const selectedId = slotOrder[selectedSlot];
        if (typeof selectedId === "number" && INVENTORY_IDS.includes(selectedId) && selectedId !== VENDING_ID) {
          return selectedId;
        }
        return 0;
      }

      function selectVendingBlockForSale(defaultId) {
        const defaultKey = defaultId ? getBlockKeyById(defaultId) : "";
        const text = window.prompt("Sell which block? Enter block key or id (e.g. wood_block).", defaultKey);
        if (!text) return 0;
        const parsed = parseBlockRef(text);
        if (!INVENTORY_IDS.includes(parsed) || parsed === VENDING_ID) return 0;
        return parsed;
      }

      function promptPositiveInt(message, fallback) {
        const raw = window.prompt(message, String(fallback || 1));
        if (!raw) return 0;
        const value = Math.floor(Number(raw));
        if (!Number.isInteger(value) || value <= 0) return 0;
        return value;
      }

      function normalizeWorldLock(value) {
        if (!value || typeof value !== "object") return null;
        const ownerAccountId = (value.ownerAccountId || "").toString();
        if (!ownerAccountId) return null;
        const adminsRaw = value.admins && typeof value.admins === "object" ? value.admins : {};
        const admins = {};
        for (const [accountId, entry] of Object.entries(adminsRaw)) {
          const safeAccountId = String(accountId || "").trim();
          if (!safeAccountId || safeAccountId === ownerAccountId) continue;
          const username = entry && typeof entry === "object"
            ? normalizeUsername((entry.username || "").toString())
            : "";
          admins[safeAccountId] = {
            username: username || ""
          };
        }
        return {
          ownerAccountId,
          ownerName: (value.ownerName || "").toString(),
          tx: Number.isInteger(value.tx) ? value.tx : Number(value.tx) || 0,
          ty: Number.isInteger(value.ty) ? value.ty : Number(value.ty) || 0,
          createdAt: typeof value.createdAt === "number" ? value.createdAt : 0,
          admins
        };
      }

      function isWorldLocked() {
        return Boolean(currentWorldLock && currentWorldLock.ownerAccountId);
      }

      function isWorldLockOwner() {
        return Boolean(playerProfileId && currentWorldLock && currentWorldLock.ownerAccountId === playerProfileId);
      }

      function isWorldLockAdmin() {
        if (!playerProfileId || !currentWorldLock || !currentWorldLock.admins) return false;
        if (isWorldLockOwner()) return false;
        return Boolean(currentWorldLock.admins[playerProfileId]);
      }

      function canEditCurrentWorld() {
        if (!isWorldLocked()) return true;
        return isWorldLockOwner() || isWorldLockAdmin();
      }

      function notifyWorldLockedDenied() {
        const now = performance.now();
        if (now - lastLockDeniedNoticeAt < 900) return;
        lastLockDeniedNoticeAt = now;
        const owner = currentWorldLock && currentWorldLock.ownerName ? currentWorldLock.ownerName : "owner";
        postLocalSystemChat("World is locked by @" + owner + ".");
      }

      function notifyOwnerOnlyWorldEdit(partName) {
        const name = (partName || "this").toString();
        postLocalSystemChat("Only the world owner can edit " + name + ".");
      }

      async function resolveAccountIdByUsername(username) {
        if (!network.enabled || !network.db) return "";
        const normalized = normalizeUsername(username);
        if (!normalized) return "";
        try {
          const snap = await network.db.ref(BASE_PATH + "/usernames/" + normalized).once("value");
          const accountId = (snap && snap.val ? snap.val() : "").toString();
          return accountId || "";
        } catch (error) {
          return "";
        }
      }

      function closeWorldLockModal() {
        worldLockEditContext = null;
        if (worldLockModalEl) worldLockModalEl.classList.add("hidden");
      }

      function getWorldLockAdminsList() {
        if (!currentWorldLock || !currentWorldLock.admins) return [];
        return Object.entries(currentWorldLock.admins)
          .map(([accountId, data]) => {
            const username = normalizeUsername(data && data.username ? data.username : "") || accountId;
            return { accountId, username };
          })
          .sort((a, b) => a.username.localeCompare(b.username));
      }

      function renderWorldLockModal() {
        if (!worldLockModalEl || !worldLockTitleEl || !worldLockAdminsEl) return;
        const owner = (currentWorldLock && currentWorldLock.ownerName ? currentWorldLock.ownerName : "owner").toString();
        worldLockTitleEl.textContent = "World Lock - @" + owner;
        const rows = getWorldLockAdminsList();
        if (!rows.length) {
          worldLockAdminsEl.innerHTML = "<div class='worldlock-admin-empty'>No world admins.</div>";
          return;
        }
        worldLockAdminsEl.innerHTML = rows.map((row) => {
          return "<div class='worldlock-admin-row'>" +
            "<span class='worldlock-admin-name'>@" + escapeHtml(row.username) + "</span>" +
            "<button type='button' data-worldlock-remove='" + escapeHtml(row.accountId) + "'>Remove</button>" +
            "</div>";
        }).join("");
      }

      function openWorldLockModal(tx, ty) {
        if (!worldLockModalEl) return;
        if (!isWorldLocked() || !isWorldLockOwner()) {
          notifyWorldLockedDenied();
          return;
        }
        const lockTx = Number(currentWorldLock && currentWorldLock.tx);
        const lockTy = Number(currentWorldLock && currentWorldLock.ty);
        if (!Number.isInteger(lockTx) || !Number.isInteger(lockTy) || tx !== lockTx || ty !== lockTy) return;
        worldLockEditContext = { tx, ty };
        if (worldLockAdminInputEl) worldLockAdminInputEl.value = "";
        renderWorldLockModal();
        worldLockModalEl.classList.remove("hidden");
      }

      function closeTradeMenuModal() {
        const ctrl = getTradeController();
        if (!ctrl || typeof ctrl.closeAll !== "function") return;
        ctrl.closeAll();
      }

      function closeTradeRequestModal() {
        const ctrl = getTradeController();
        if (!ctrl || typeof ctrl.closeRequestModal !== "function") return;
        ctrl.closeRequestModal();
      }

      function showIncomingTradeRequest(req) {
        const ctrl = getTradeController();
        if (!ctrl || typeof ctrl.onTradeRequest !== "function") return;
        ctrl.onTradeRequest(req);
      }

      function respondToTradeRequest(accept) {
        const ctrl = getTradeController();
        if (!ctrl || typeof ctrl.respondToTradeRequest !== "function") return;
        ctrl.respondToTradeRequest(accept);
      }

      function removeWorldAdmin(accountId) {
        if (!network.enabled || !network.lockRef || !isWorldLocked() || !isWorldLockOwner()) return;
        const safeAccountId = (accountId || "").toString().trim();
        if (!safeAccountId || safeAccountId === currentWorldLock.ownerAccountId) return;
        network.lockRef.child("admins").child(safeAccountId).remove()
          .then(() => {
            postLocalSystemChat("Removed world admin.");
          })
          .catch(() => {
            postLocalSystemChat("Failed to remove world admin.");
          });
      }

      async function addWorldAdminByUsername(rawUsername) {
        if (!network.enabled || !network.lockRef || !isWorldLocked() || !isWorldLockOwner()) return;
        const username = normalizeUsername(rawUsername);
        if (!username) {
          postLocalSystemChat("Enter a valid username.");
          return;
        }
        const accountId = await resolveAccountIdByUsername(username);
        if (!accountId) {
          postLocalSystemChat("User not found.");
          return;
        }
        if (accountId === currentWorldLock.ownerAccountId) {
          postLocalSystemChat("Owner already has full access.");
          return;
        }
        network.lockRef.child("admins").child(accountId).set({
          username,
          addedBy: playerProfileId || "",
          updatedAt: firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
          postLocalSystemChat("Added @" + username + " as world admin.");
          if (worldLockAdminInputEl) worldLockAdminInputEl.value = "";
        }).catch(() => {
          postLocalSystemChat("Failed to add world admin.");
        });
      }

      function isProtectedSpawnTile(tx, ty) {
        const tiles = getSpawnStructureTiles();
        return (tx === tiles.door.tx && ty === tiles.door.ty) || (tx === tiles.base.tx && ty === tiles.base.ty);
      }

      function rectCollides(x, y, w, h) {
        if (typeof physicsModule.rectCollides === "function") {
          return physicsModule.rectCollides(world, blockDefs, x, y, w, h, TILE, WORLD_W, WORLD_H, isSolidTile);
        }
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

      function rectTouchesLiquid(x, y, w, h) {
        if (typeof physicsModule.rectTouchesLiquid === "function") {
          return physicsModule.rectTouchesLiquid(world, blockDefs, x, y, w, h, TILE, WORLD_W, WORLD_H);
        }
        const left = Math.floor(x / TILE);
        const right = Math.floor((x + w - 1) / TILE);
        const top = Math.floor(y / TILE);
        const bottom = Math.floor((y + h - 1) / TILE);
        for (let ty = top; ty <= bottom; ty++) {
          for (let tx = left; tx <= right; tx++) {
            if (isLiquidTile(tx, ty)) return true;
          }
        }
        return false;
      }

      function getStairSurfaceY(id, tx, ty, worldX) {
        if (typeof physicsModule.getStairSurfaceY === "function") {
          return physicsModule.getStairSurfaceY(id, tx, ty, worldX, TILE);
        }
        const localX = Math.max(0, Math.min(1, (worldX - tx * TILE) / TILE));
        let localY = localX;
        if (id === 14 || id === 15) localY = 1 - localX;
        return ty * TILE + localY * TILE;
      }

      function snapPlayerToStairSurface() {
        if (typeof physicsModule.snapPlayerToStairSurface === "function") {
          return physicsModule.snapPlayerToStairSurface(player, world, STAIR_ROTATION_IDS, TILE, PLAYER_W, PLAYER_H, WORLD_W, WORLD_H);
        }
        const footLeftX = player.x + 3;
        const footRightX = player.x + PLAYER_W - 3;
        const footCenterX = player.x + PLAYER_W * 0.5;
        const bottomY = player.y + PLAYER_H;
        const checkFeet = [footLeftX, footCenterX, footRightX];
        let targetBottom = Infinity;
        let found = false;
        for (let i = 0; i < checkFeet.length; i++) {
          const fx = checkFeet[i];
          const tx = Math.floor(fx / TILE);
          const baseTy = Math.floor((bottomY - 1) / TILE);
          for (let yOff = -1; yOff <= 1; yOff++) {
            const ty = baseTy + yOff;
            if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H) continue;
            const id = world[ty][tx];
            if (!isStairTileId(id)) continue;
            const surfaceY = getStairSurfaceY(id, tx, ty, fx);
            if (bottomY < surfaceY - 6 || bottomY > surfaceY + 8) continue;
            targetBottom = Math.min(targetBottom, surfaceY);
            found = true;
          }
        }
        if (!found) return false;
        player.y = targetBottom - PLAYER_H;
        player.grounded = true;
        if (player.vy > 0) player.vy = 0;
        return true;
      }

      function rectCollidesOneWayPlatformDownward(x, prevY, nextY, w, h) {
        if (typeof physicsModule.rectCollidesOneWayPlatformDownward === "function") {
          return physicsModule.rectCollidesOneWayPlatformDownward(world, blockDefs, x, prevY, nextY, w, h, TILE, WORLD_W, WORLD_H);
        }
        if (nextY <= prevY) return false;
        const left = Math.floor(x / TILE);
        const right = Math.floor((x + w - 1) / TILE);
        const prevBottom = prevY + h;
        const nextBottom = nextY + h;
        const startTy = Math.floor((prevBottom - 1) / TILE);
        const endTy = Math.floor((nextBottom - 1) / TILE);
        for (let ty = startTy; ty <= endTy; ty++) {
          for (let tx = left; tx <= right; tx++) {
            if (!isOneWayPlatformTile(tx, ty)) continue;
            const tileTop = ty * TILE;
            if (prevBottom <= tileTop + 1 && nextBottom >= tileTop + 1) {
              return true;
            }
          }
        }
        return false;
      }

      function updatePlayer() {
        if (rectCollides(player.x, player.y, PLAYER_W, PLAYER_H)) {
          ensurePlayerSafeSpawn(true);
        }
        const nowMs = performance.now();
        const moveLeft = keys["KeyA"] || keys["ArrowLeft"] || touchControls.left;
        const moveRight = keys["KeyD"] || keys["ArrowRight"] || touchControls.right;
        const jump = keys["KeyW"] || keys["Space"] || keys["ArrowUp"] || touchControls.jump;
        const jumpPressedThisFrame = jump && !wasJumpHeld;
        const hasWingDoubleJump = Boolean(equippedCosmetics.wings);
        const inWater = rectTouchesLiquid(player.x, player.y, PLAYER_W, PLAYER_H);
        const inAntiGravity = isPlayerInAntiGravityField(player.x, player.y, PLAYER_W, PLAYER_H);
        const moveAccel = inWater ? MOVE_ACCEL * WATER_MOVE_MULT : MOVE_ACCEL;
        const maxMoveSpeed = inWater ? MAX_MOVE_SPEED * WATER_MOVE_MULT : MAX_MOVE_SPEED;
        let gravityNow = inWater ? GRAVITY * WATER_GRAVITY_MULT : GRAVITY;
        let maxFallNow = inWater ? MAX_FALL_SPEED * WATER_FALL_MULT : MAX_FALL_SPEED;
        const frictionNow = inWater ? Math.min(0.96, FRICTION * WATER_FRICTION_MULT) : FRICTION;
        const airFrictionNow = inWater ? Math.min(0.985, AIR_FRICTION * WATER_FRICTION_MULT) : AIR_FRICTION;
        if (inAntiGravity) {
          gravityNow *= ANTI_GRAV_GRAVITY_MULT;
          maxFallNow *= ANTI_GRAV_FALL_MULT;
        }

        if (moveLeft) {
          player.vx -= player.grounded ? moveAccel : moveAccel * AIR_CONTROL;
          player.facing = -1;
        }
        if (moveRight) {
          player.vx += player.grounded ? moveAccel : moveAccel * AIR_CONTROL;
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
          inAntiGravity &&
          (nowMs - lastAirJumpAtMs) >= ANTI_GRAV_AIR_JUMP_COOLDOWN_MS
        ) {
          player.vy = JUMP_VELOCITY;
          lastAirJumpAtMs = nowMs;
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

        player.vx = Math.max(-maxMoveSpeed, Math.min(maxMoveSpeed, player.vx));
        player.vy += gravityNow;
        player.vy = Math.min(player.vy, maxFallNow);

        player.vx *= player.grounded ? frictionNow : airFrictionNow;

        const tryStepUpOnHorizontalMove = (targetX) => {
          if (Math.abs(player.vx) < 0.01) return false;
          const maxStepPx = 10;
          for (let stepUp = 1; stepUp <= maxStepPx; stepUp++) {
            const testY = player.y - stepUp;
            if (testY < 0) break;
            if (rectCollides(targetX, testY, PLAYER_W, PLAYER_H)) continue;
            const supportedBySolid = rectCollides(targetX, testY + 1, PLAYER_W, PLAYER_H);
            const supportedByPlatform = rectCollidesOneWayPlatformDownward(targetX, testY, testY + 1, PLAYER_W, PLAYER_H);
            if (!supportedBySolid && !supportedByPlatform) continue;
            player.x = targetX;
            player.y = testY;
            return true;
          }
          return false;
        };

        let nextX = player.x + player.vx;
        if (!rectCollides(nextX, player.y, PLAYER_W, PLAYER_H)) {
          player.x = nextX;
        } else {
          if (tryStepUpOnHorizontalMove(nextX)) {
            player.grounded = true;
          } else {
          const step = Math.sign(player.vx);
          while (!rectCollides(player.x + step, player.y, PLAYER_W, PLAYER_H)) {
            player.x += step;
          }
          player.vx = 0;
          }
        }

        let nextY = player.y + player.vy;
        if (player.vy > 0) {
          const hitsSolid = rectCollides(player.x, nextY, PLAYER_W, PLAYER_H);
          const hitsPlatform = rectCollidesOneWayPlatformDownward(player.x, player.y, nextY, PLAYER_W, PLAYER_H);
          if (!hitsSolid && !hitsPlatform) {
            player.y = nextY;
            player.grounded = false;
          } else {
            while (true) {
              const testY = player.y + 1;
              if (rectCollides(player.x, testY, PLAYER_W, PLAYER_H)) break;
              if (rectCollidesOneWayPlatformDownward(player.x, player.y, testY, PLAYER_W, PLAYER_H)) break;
              player.y = testY;
            }
            player.grounded = true;
            player.vy = 0;
          }
        } else if (!rectCollides(player.x, nextY, PLAYER_W, PLAYER_H)) {
          player.y = nextY;
          player.grounded = false;
        } else {
          const step = Math.sign(player.vy);
          while (!rectCollides(player.x, player.y + step, PLAYER_W, PLAYER_H)) {
            player.y += step;
          }
          player.vy = 0;
        }

        if (player.grounded) {
          airJumpsUsed = 0;
        }

        if (!player.grounded || player.vy >= 0) {
          snapPlayerToStairSurface();
        }

        if (player.y > WORLD_H * TILE) {
          player.x = TILE * 8;
          player.y = TILE * 8;
          player.vx = 0;
          player.vy = 0;
        }

        wasJumpHeld = jump;
      }

      function updateCamera(forceSnap) {
        const viewW = getCameraViewWidth();
        const viewH = getCameraViewHeight();
        const targetX = player.x + PLAYER_W / 2 - viewW / 2;
        const targetY = player.y + PLAYER_H / 2 - viewH / 2;

        if (forceSnap) {
          cameraX = targetX;
          cameraY = targetY;
        } else {
          cameraX += (targetX - cameraX) * 0.12;
          cameraY += (targetY - cameraY) * 0.12;
        }

        cameraX = Math.max(0, Math.min(cameraX, WORLD_W * TILE - viewW));
        cameraY = Math.max(0, Math.min(cameraY, WORLD_H * TILE - viewH));
      }

      function drawBackground() {
        const viewW = getCameraViewWidth();
        const viewH = getCameraViewHeight();
        const weatherImageUrl = getActiveWeatherImageUrl();
        if (weatherImageUrl) {
          const weatherImg = getBlockImageByPath(weatherImageUrl);
          if (weatherImg) {
            const sx = weatherImg.naturalWidth || weatherImg.width || 1;
            const sy = weatherImg.naturalHeight || weatherImg.height || 1;
            const scale = Math.max(viewW / sx, viewH / sy);
            const drawW = sx * scale;
            const drawH = sy * scale;
            const drawX = (viewW - drawW) * 0.5;
            const drawY = (viewH - drawH) * 0.5;
            ctx.save();
            ctx.imageSmoothingEnabled = true;
            ctx.drawImage(weatherImg, drawX, drawY, drawW, drawH);
            ctx.fillStyle = "rgba(11, 24, 38, 0.1)";
            ctx.fillRect(0, 0, viewW, viewH);
            ctx.restore();
            return;
          }
        }
        const t = performance.now() * 0.00008;
        const cloudShift = Math.sin(t) * 30;

        ctx.fillStyle = "#8fd9ff";
        ctx.fillRect(0, 0, viewW, viewH);

        ctx.fillStyle = "rgba(255,255,255,0.55)";
        for (let i = 0; i < 8; i++) {
          const x = ((i * 180 + cloudShift * (i % 2 ? 1 : -1)) % (viewW + 220)) - 110;
          const y = 40 + (i % 3) * 48;
          ctx.beginPath();
          ctx.ellipse(x, y, 55, 20, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = "#78c16a";
        ctx.fillRect(0, viewH - 46, viewW, 46);
      }

      function drawWorld() {
        const viewW = getCameraViewWidth();
        const viewH = getCameraViewHeight();
        const startX = Math.floor(cameraX / TILE);
        const endX = Math.ceil((cameraX + viewW) / TILE);
        const startY = Math.floor(cameraY / TILE);
        const endY = Math.ceil((cameraY + viewH) / TILE);

        for (let ty = startY; ty <= endY; ty++) {
          if (ty < 0 || ty >= WORLD_H) continue;
          for (let tx = startX; tx <= endX; tx++) {
            if (tx < 0 || tx >= WORLD_W) continue;
            const id = world[ty][tx];
            if (!id) continue;

            const x = tx * TILE - cameraX;
            const y = ty * TILE - cameraY;
            const def = blockDefs[id];
            if (!def) continue;

            if (id === PLATFORM_ID) {
              if (drawBlockImage(def, x, y)) {
                continue;
              }
              ctx.fillStyle = "#6d4f35";
              ctx.fillRect(x, y + 2, TILE, 6);
              ctx.fillStyle = "rgba(255, 238, 202, 0.25)";
              ctx.fillRect(x + 1, y + 2, TILE - 2, 2);
              continue;
            }

            if (STAIR_ROTATION_IDS.includes(id)) {
              if (drawStairImage(id, def, x, y)) {
                continue;
              }
              ctx.fillStyle = def.color;
              ctx.beginPath();
              if (id === 13) {
                ctx.moveTo(x, y);
                ctx.lineTo(x, y + TILE);
                ctx.lineTo(x + TILE, y + TILE);
              } else if (id === 14) {
                ctx.moveTo(x, y);
                ctx.lineTo(x + TILE, y);
                ctx.lineTo(x, y + TILE);
              } else if (id === 15) {
                ctx.moveTo(x, y + TILE);
                ctx.lineTo(x + TILE, y + TILE);
                ctx.lineTo(x + TILE, y);
              } else {
                ctx.moveTo(x, y);
                ctx.lineTo(x + TILE, y);
                ctx.lineTo(x + TILE, y + TILE);
              }
              ctx.closePath();
              ctx.fill();
              ctx.fillStyle = "rgba(255,255,255,0.11)";
              ctx.fillRect(x + 2, y + 2, TILE - 4, 4);
              continue;
            }

            if (id === SIGN_ID && drawBlockImage(def, x, y)) continue;

            if (id === VENDING_ID) {
              ctx.fillStyle = "#4d6b8b";
              ctx.fillRect(x, y, TILE, TILE);
              ctx.fillStyle = "rgba(255,255,255,0.12)";
              ctx.fillRect(x + 3, y + 3, TILE - 6, 8);
              ctx.fillStyle = "#9cd8ff";
              ctx.fillRect(x + 6, y + 14, TILE - 12, 10);
              ctx.fillStyle = "#ffd166";
              ctx.fillRect(x + TILE - 10, y + 6, 4, 4);
              continue;
            }

            if (id === WATER_ID && drawAnimatedWater(def, x, y, tx, ty)) {
              continue;
            }

            if (drawBlockImage(def, x, y)) {
              continue;
            }

            ctx.fillStyle = def.color;
            ctx.fillRect(x, y, TILE, TILE);
            if (def.liquid) {
              const wave = Math.sin((performance.now() * 0.01) + tx * 0.7 + ty * 0.4) * 1.6;
              ctx.fillStyle = "rgba(210, 245, 255, 0.3)";
              ctx.fillRect(x + 1, y + 3 + wave, TILE - 2, 4);
              ctx.fillStyle = "rgba(18, 84, 170, 0.2)";
              ctx.fillRect(x, y + TILE - 4, TILE, 4);
            } else {
              ctx.fillStyle = "rgba(255,255,255,0.08)";
              ctx.fillRect(x + 2, y + 2, TILE - 4, 6);
              ctx.fillStyle = "rgba(0,0,0,0.14)";
              ctx.fillRect(x, y + TILE - 5, TILE, 5);
            }
          }
        }
      }

      function drawWorldDrops() {
        if (!worldDrops.size) return;
        const viewW = getCameraViewWidth();
        const viewH = getCameraViewHeight();
        const now = performance.now();
        worldDrops.forEach((drop) => {
          if (!drop) return;
          const x = drop.x - cameraX;
          const y = drop.y - cameraY + Math.sin((now + drop.id.length * 91) * 0.005) * 1.5;
          if (x < -TILE || y < -TILE || x > viewW + TILE || y > viewH + TILE) return;
          if (drop.type === "block") {
            const def = blockDefs[drop.blockId];
            if (def && drawBlockImage(def, x, y)) {
              // draw count badge
            } else {
              ctx.save();
              ctx.fillStyle = def && def.color ? def.color : "#a0a0a0";
              ctx.fillRect(x, y, TILE, TILE);
              ctx.restore();
            }
          } else {
            let drawn = false;
            for (let i = 0; i < COSMETIC_ITEMS.length; i++) {
              const item = COSMETIC_ITEMS[i];
              if (!item || item.id !== drop.cosmeticId) continue;
              drawn = drawCosmeticSprite(item, x + 2, y + 2, TILE - 4, TILE - 4, 1);
              if (!drawn) {
                ctx.save();
                ctx.fillStyle = item.color || "#9bb4ff";
                ctx.fillRect(x + 4, y + 4, TILE - 8, TILE - 8);
                ctx.restore();
              }
              break;
            }
          }
          if (drop.amount > 1) {
            ctx.save();
            ctx.font = "11px 'Trebuchet MS', sans-serif";
            const label = "x" + drop.amount;
            const labelW = ctx.measureText(label).width + 8;
            ctx.fillStyle = "rgba(8, 22, 34, 0.85)";
            ctx.fillRect(x + TILE - labelW - 1, y + TILE - 14, labelW, 13);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.24)";
            ctx.strokeRect(x + TILE - labelW - 1, y + TILE - 14, labelW, 13);
            ctx.fillStyle = "#f7fbff";
            ctx.fillText(label, x + TILE - labelW + 3, y + TILE - 4);
            ctx.restore();
          }
        });
      }

      function drawSignTopText() {
        const tx = Math.floor((player.x + PLAYER_W / 2) / TILE);
        const ty = Math.floor((player.y + PLAYER_H / 2) / TILE);
        if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H) return;
        if (world[ty][tx] !== SIGN_ID) return;
        const text = getLocalSignText(tx, ty);
        if (!text) return;
        ctx.save();
        ctx.font = "13px 'Trebuchet MS', sans-serif";
        const padX = 8;
        const padY = 6;
        const maxW = Math.min(420, canvas.width - 24);
        const lines = wrapChatText(text, maxW - padX * 2).slice(0, 4);
        let widest = 0;
        for (let i = 0; i < lines.length; i++) {
          widest = Math.max(widest, ctx.measureText(lines[i]).width);
        }
        const bubbleW = Math.min(maxW, Math.max(70, widest + padX * 2));
        const bubbleH = lines.length * 15 + padY * 2;
        const x = (canvas.width - bubbleW) / 2;
        const y = 18;
        ctx.fillStyle = "rgba(12, 24, 35, 0.9)";
        ctx.fillRect(x, y, bubbleW, bubbleH);
        ctx.strokeStyle = "rgba(255,255,255,0.28)";
        ctx.strokeRect(x, y, bubbleW, bubbleH);
        ctx.fillStyle = "#f4f9ff";
        for (let i = 0; i < lines.length; i++) {
          ctx.fillText(lines[i], x + padX, y + padY + 11 + i * 15);
        }
        ctx.restore();
      }

      function getCosmeticImage(item) {
        if (!item || !item.imagePath) return null;
        const key = String(item.imagePath);
        if (!cosmeticImageCache.has(key)) {
          const img = new Image();
          img.decoding = "async";
          img.src = key;
          cosmeticImageCache.set(key, img);
        }
        const img = cosmeticImageCache.get(key);
        if (!img || !img.complete || img.naturalWidth <= 0 || img.naturalHeight <= 0) return null;
        return img;
      }

      function getBlockImage(def) {
        if (!def || !def.imagePath) return null;
        const key = String(def.imagePath);
        if (!blockImageCache.has(key)) {
          const img = new Image();
          img.decoding = "async";
          img.src = key;
          blockImageCache.set(key, img);
        }
        const img = blockImageCache.get(key);
        if (!img || !img.complete || img.naturalWidth <= 0 || img.naturalHeight <= 0) return null;
        return img;
      }

      function getBlockImageByPath(path) {
        const key = String(path || "").trim();
        if (!key) return null;
        if (!blockImageCache.has(key)) {
          const img = new Image();
          img.decoding = "async";
          img.src = key;
          blockImageCache.set(key, img);
        }
        const img = blockImageCache.get(key);
        if (!img || !img.complete || img.naturalWidth <= 0 || img.naturalHeight <= 0) return null;
        return img;
      }

      function buildWaterFramePaths(def) {
        if (!def || !def.imagePath) return [];
        const explicit = Array.isArray(SETTINGS.WATER_FRAME_PATHS)
          ? SETTINGS.WATER_FRAME_PATHS.map((x) => String(x || "").trim()).filter(Boolean)
          : [];
        if (explicit.length >= 4) {
          return explicit.slice(0, 4);
        }
        const base = String(def.imagePath).trim();
        const extIdx = base.lastIndexOf(".");
        const hasExt = extIdx > 0;
        const stem = hasExt ? base.slice(0, extIdx) : base;
        const ext = hasExt ? base.slice(extIdx) : "";
        const underscored = [1, 2, 3, 4].map((i) => stem + "_" + i + ext);
        const numbered = [1, 2, 3, 4].map((i) => stem + i + ext);
        const candidates = [];
        for (const p of underscored.concat(numbered)) {
          if (!candidates.includes(p) && p !== base) candidates.push(p);
        }
        return candidates.slice(0, 8);
      }

      function getWaterFrameImages(def) {
        if (!waterFramePathCache.length) {
          const paths = buildWaterFramePaths(def);
          for (const p of paths) waterFramePathCache.push(p);
        }
        const ready = [];
        for (const p of waterFramePathCache) {
          const img = getBlockImageByPath(p);
          if (img) ready.push(img);
          if (ready.length >= 4) break;
        }
        return ready;
      }

      function drawAnimatedWater(def, x, y, tx, ty) {
        const frames = getWaterFrameImages(def);
        if (!frames.length) return false;
        if (frames.length === 1) {
          ctx.save();
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(frames[0], x, y, TILE, TILE);
          ctx.restore();
          return true;
        }
        const now = performance.now();
        const phaseOffset = ((tx * 31 + ty * 17) % 997) / 997;
        const animPos = ((now / WATER_FRAME_MS) + phaseOffset) % frames.length;
        const i0 = Math.floor(animPos) % frames.length;
        const i1 = (i0 + 1) % frames.length;
        const blend = animPos - Math.floor(animPos);
        ctx.save();
        ctx.imageSmoothingEnabled = false;
        ctx.globalAlpha = 1 - blend;
        ctx.drawImage(frames[i0], x, y, TILE, TILE);
        ctx.globalAlpha = blend;
        ctx.drawImage(frames[i1], x, y, TILE, TILE);
        ctx.restore();
        return true;
      }

      function drawBlockImage(def, x, y) {
        const img = getBlockImage(def);
        if (!img) return false;
        ctx.save();
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, x, y, TILE, TILE);
        ctx.restore();
        return true;
      }

      function drawStairImage(id, def, x, y) {
        const baseDef = blockDefs[STAIR_BASE_ID] || def;
        const img = getBlockImage(baseDef) || getBlockImage(def);
        if (!img) return false;
        // Base orientation is NW (id 13). Rotated stairs mirror this texture.
        ctx.save();
        ctx.imageSmoothingEnabled = false;
        ctx.translate(x + TILE * 0.5, y + TILE * 0.5);
        if (id === 14) {
          ctx.scale(-1, 1);
        } else if (id === 15) {
          ctx.scale(-1, -1);
        } else if (id === 16) {
          ctx.scale(1, -1);
        }
        ctx.drawImage(img, -TILE * 0.5, -TILE * 0.5, TILE, TILE);
        ctx.restore();
        return true;
      }

      function drawCosmeticSprite(item, x, y, w, h, facing) {
        const img = getCosmeticImage(item);
        if (!img) return false;
        ctx.save();
        ctx.imageSmoothingEnabled = false;
        if (facing === -1) {
          const pivot = x + w / 2;
          ctx.translate(pivot, 0);
          ctx.scale(-1, 1);
          ctx.translate(-pivot, 0);
        }
        ctx.drawImage(img, x, y, w, h);
        ctx.restore();
        return true;
      }

      function drawWings(px, py, wingsId, facing, wingFlap) {
        if (!wingsId) return;
        const item = COSMETIC_LOOKUP.wings[wingsId];
        if (!item) return;
        const flap = Number(wingFlap) || 0;
        const wingImg = getCosmeticImage(item);
        if (wingImg) {
          const centerX = px + PLAYER_W / 2;
          const centerY = py + 14;
          const baseAngle = 0.42;
          const flapAngle = flap * 0.42;
          const wingH = 20;
          const wingW = Math.max(10, Math.round(wingH * (wingImg.naturalWidth / Math.max(1, wingImg.naturalHeight))));
          const offsetX = Number(item && item.offsetX);
          const offsetY = Number(item && item.offsetY);
          const useOffsetX = Number.isFinite(offsetX) ? offsetX : 3;
          const useOffsetY = Number.isFinite(offsetY) ? offsetY : 0;
          const drawWingSide = (sideSign) => {
            const angle = sideSign * (baseAngle + flapAngle);
            ctx.save();
            ctx.translate(centerX + sideSign * (1.5 + useOffsetX), centerY + useOffsetY);
            ctx.rotate(angle);
            if (sideSign < 0) ctx.scale(-1, 1);
            // Wing sprite attach point is left edge of image.
            ctx.drawImage(wingImg, 0, -wingH / 2, wingW, wingH);
            ctx.restore();
          };
          drawWingSide(-1);
          drawWingSide(1);
          return;
        }
        ctx.fillStyle = item.color;
        const centerX = px + PLAYER_W / 2;
        const centerY = py + 14;
        const forwardSign = facing === 1 ? 1 : -1;
        const drawWing = (sideSign) => {
          const dir = sideSign * forwardSign;
          const base = 0.5 * sideSign;
          const angle = base + flap * sideSign;
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(16 * dir, -7);
          ctx.lineTo(23 * dir, 2);
          ctx.lineTo(17 * dir, 11);
          ctx.lineTo(4 * dir, 9);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        };
        drawWing(-1);
        drawWing(1);
      }

      function drawClothes(px, py, clothesId) {
        if (!clothesId) return;
        const item = COSMETIC_LOOKUP.clothes[clothesId];
        if (!item) return;
        if (drawCosmeticSprite(item, px + 3, py + 12, PLAYER_W - 6, 14, 1)) {
          return;
        }
        ctx.fillStyle = item.color;
        ctx.fillRect(px + 5, py + 14, PLAYER_W - 10, 10);
      }

      function drawSword(px, py, swordId, facing, swordSwing) {
        if (!swordId) return;
        const item = COSMETIC_LOOKUP.swords[swordId];
        if (!item) return;
        ctx.fillStyle = item.color;
        const swing = Number(swordSwing) || 0;
        const handX = facing === 1 ? px + PLAYER_W - 3 + swing : px - 7 - swing;
        if (drawCosmeticSprite(item, handX - 2, py + 12 + swing * 0.25, 12, 8, facing)) {
          return;
        }
        ctx.fillRect(handX, py + 15 + swing * 0.25, 8, 3);
      }

      function drawHumanoid(px, py, facing, bodyColor, skinColor, eyeColor, clothesId, pose, lookX, lookY) {
        const armSwing = Number(pose && pose.armSwing) || 0;
        const legSwing = Number(pose && pose.legSwing) || 0;
        const leftArmY = py + 13 + Math.round(-armSwing * 0.7);
        const rightArmY = py + 13 + Math.round(armSwing * 0.7);
        const leftLegY = py + 23 + Math.round(-legSwing * 0.8);
        const rightLegY = py + 23 + Math.round(legSwing * 0.8);
        const lookDx = Math.max(-1, Math.min(1, Number(lookX) || 0));
        const lookDy = Math.max(-1, Math.min(1, Number(lookY) || 0));
        const pupilDx = Math.round(lookDx * 1.7);
        const pupilDy = Math.round(lookDy * 1.2);
        const faceTilt = facing === 1 ? 1 : -1;

        const headX = px + 3;
        const headY = py + 1;
        const headW = PLAYER_W - 6;
        const headH = 11;
        const torsoX = px + 5;
        const torsoY = py + 13;
        const torsoW = PLAYER_W - 10;
        const torsoH = 9;

        ctx.fillStyle = skinColor;
        ctx.fillRect(headX, headY, headW, headH);
        ctx.fillRect(torsoX, torsoY, torsoW, torsoH);
        ctx.fillRect(px + 2, leftArmY, 3, 8);
        ctx.fillRect(px + PLAYER_W - 5, rightArmY, 3, 8);
        ctx.fillRect(px + 6, leftLegY, 4, 7);
        ctx.fillRect(px + PLAYER_W - 10, rightLegY, 4, 7);

        drawClothes(px, py, clothesId);

        ctx.fillStyle = "rgba(0,0,0,0.18)";
        ctx.fillRect(torsoX, torsoY - 1, torsoW, 1);
        ctx.fillRect(torsoX, torsoY + torsoH, torsoW, 1);

        const leftEyeX = px + 5 + (faceTilt > 0 ? 0 : -1);
        const rightEyeX = px + PLAYER_W - 11 + (faceTilt > 0 ? 1 : 0);
        const eyeY = py + 4;
        ctx.fillStyle = "#f3f6ff";
        ctx.fillRect(leftEyeX, eyeY, 5, 4);
        ctx.fillRect(rightEyeX, eyeY, 5, 4);

        ctx.fillStyle = eyeColor;
        ctx.fillRect(leftEyeX + 2 + pupilDx, eyeY + 1 + pupilDy, 2, 2);
        ctx.fillRect(rightEyeX + 1 + pupilDx, eyeY + 1 + pupilDy, 2, 2);

        const mouthX = px + 8 + (faceTilt > 0 ? 1 : -1);
        const mouthY = py + 10 + Math.max(-1, Math.min(1, pupilDy));
        ctx.fillStyle = "rgba(85, 52, 43, 0.95)";
        ctx.fillRect(mouthX, mouthY, 5, 2);

        const noseX = faceTilt > 0 ? px + 13 : px + 8;
        ctx.fillStyle = "rgba(124, 84, 66, 0.9)";
        ctx.fillRect(noseX, py + 8, 2, 2);

        return {};
      }

      function getLocalLookVector() {
        return {
          x: player.facing === -1 ? -0.75 : 0.75,
          y: 0
        };
      }

      function getRemoteLookVector(other) {
        return {
          x: (other && other.facing === -1) ? -0.75 : 0.75,
          y: 0
        };
      }

      function drawPlayer() {
        const nowMs = performance.now();
        const px = player.x - cameraX;
        const py = player.y - cameraY;
        const cosmetics = equippedCosmetics;
        const localMotion = typeof animationsModule.sampleLocal === "function"
          ? animationsModule.sampleLocal(player)
          : { speed: Math.abs(player.vx), vy: player.vy, grounded: player.grounded };
        const pose = typeof animationsModule.buildPose === "function"
          ? animationsModule.buildPose(localMotion, nowMs, playerId)
          : { bodyBob: 0, bodyTilt: 0, wingFlap: 0, swordSwing: 0, eyeYOffset: 0, eyeHeight: 3 };
        const basePy = py + (pose.bodyBob || 0);

        drawWings(px, basePy, cosmetics.wings, player.facing, pose.wingFlap || 0);

        ctx.save();
        ctx.translate(px + PLAYER_W / 2, basePy + PLAYER_H / 2);
        ctx.rotate(Number(pose.bodyTilt) || 0);
        ctx.translate(-(px + PLAYER_W / 2), -(basePy + PLAYER_H / 2));

        const localLook = getLocalLookVector();
        drawHumanoid(px, basePy, player.facing, "#263238", "#b98a78", "#0d0d0d", cosmetics.clothes, pose, localLook.x, localLook.y);

        drawSword(px, basePy, cosmetics.swords, player.facing, pose.swordSwing || 0);
        ctx.restore();
      }

      function drawRemotePlayers() {
        const nowMs = performance.now();
        const viewW = getCameraViewWidth();
        const viewH = getCameraViewHeight();
        const keepIds = [];
        playerWrenchHitboxes.length = 0;
        const wrenchSelected = slotOrder[selectedSlot] === TOOL_WRENCH;
        remotePlayers.forEach((other) => {
          const otherId = (other.id || "").toString();
          keepIds.push(otherId);
          const px = other.x - cameraX;
          const py = other.y - cameraY;
          if (px < -40 || py < -40 || px > viewW + 40 || py > viewH + 40) return;
          const cosmetics = other.cosmetics || {};
          const remoteMotion = typeof animationsModule.sampleRemote === "function"
            ? animationsModule.sampleRemote(remoteAnimationTracker, otherId, other.x, other.y, nowMs)
            : { speed: 0, vy: 0, grounded: true };
          const pose = typeof animationsModule.buildPose === "function"
            ? animationsModule.buildPose(remoteMotion, nowMs, otherId)
            : { bodyBob: 0, bodyTilt: 0, wingFlap: 0, swordSwing: 0, eyeYOffset: 0, eyeHeight: 3 };
          const basePy = py + (pose.bodyBob || 0);

          drawWings(px, basePy, cosmetics.wings || "", other.facing || 1, pose.wingFlap || 0);

          ctx.save();
          ctx.translate(px + PLAYER_W / 2, basePy + PLAYER_H / 2);
          ctx.rotate(Number(pose.bodyTilt) || 0);
          ctx.translate(-(px + PLAYER_W / 2), -(basePy + PLAYER_H / 2));

          const remoteLook = getRemoteLookVector(other);
          drawHumanoid(px, basePy, other.facing || 1, "#2a75bb", "#b98a78", "#102338", cosmetics.clothes || "", pose, remoteLook.x, remoteLook.y);

          drawSword(px, basePy, cosmetics.swords || "", other.facing || 1, pose.swordSwing || 0);
          ctx.restore();

          const nameText = String(other.name || "Player").slice(0, 20);
          const nameX = px;
          const nameY = basePy - 8;
          ctx.font = PLAYER_NAME_FONT;
          ctx.fillStyle = "#f3fbff";
          ctx.fillText(nameText, nameX, nameY);
          if (wrenchSelected && other.accountId) {
            const textWidth = ctx.measureText(nameText).width;
            const iconSize = 12;
            const iconX = Math.floor(nameX + textWidth + 5);
            const iconY = Math.floor(nameY - 10);
            drawNameWrenchIcon(iconX, iconY, iconSize);
            playerWrenchHitboxes.push({
              x: iconX,
              y: iconY,
              w: iconSize,
              h: iconSize,
              accountId: String(other.accountId || ""),
              name: nameText
            });
          }
        });
        if (typeof animationsModule.pruneTracker === "function") {
          animationsModule.pruneTracker(remoteAnimationTracker, keepIds);
        }
      }

      function drawNameWrenchIcon(x, y, size) {
        ctx.save();
        const r = size / 2;
        ctx.fillStyle = "rgba(255, 209, 102, 0.95)";
        ctx.beginPath();
        ctx.arc(x + r, y + r, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(14, 36, 56, 0.9)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.strokeStyle = "rgba(14, 36, 56, 0.95)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x + 3, y + size - 4);
        ctx.lineTo(x + size - 4, y + 4);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x + size - 4, y + 4, 2, 0.4, 2.75);
        ctx.stroke();
        ctx.restore();
      }

      function hitWrenchNameIcon(canvasX, canvasY) {
        if (!inWorld) return null;
        for (let i = playerWrenchHitboxes.length - 1; i >= 0; i--) {
          const hit = playerWrenchHitboxes[i];
          if (canvasX >= hit.x && canvasX <= hit.x + hit.w && canvasY >= hit.y && canvasY <= hit.y + hit.h) {
            return hit;
          }
        }
        return null;
      }

      function openWrenchMenuFromNameIcon(clientX, clientY) {
        if (slotOrder[selectedSlot] !== TOOL_WRENCH) return false;
        const point = canvasPointFromClient(clientX, clientY);
        const hit = hitWrenchNameIcon(point.x / Math.max(0.01, cameraZoom), point.y / Math.max(0.01, cameraZoom));
        if (!hit || !hit.accountId) return false;
        const tradeCtrl = getTradeController();
        if (!tradeCtrl || typeof tradeCtrl.handleWrenchPlayer !== "function") return false;
        return Boolean(tradeCtrl.handleWrenchPlayer({ accountId: hit.accountId, name: hit.name }));
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
        const viewW = getCameraViewWidth();
        if (bubbleX + bubbleW > viewW - 4) bubbleX = viewW - 4 - bubbleW;
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
        const usingFist = selectedId === TOOL_FIST;
        const usingWrench = selectedId === TOOL_WRENCH;
        const usingTool = usingFist || usingWrench;
        const itemName = usingFist ? "Fist" : (usingWrench ? "Wrench" : blockDefs[selectedId].name);
        const countText = usingTool ? "infinite" : String(inventory[selectedId]);
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
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.setTransform(cameraZoom, 0, 0, cameraZoom, 0, 0);
        drawBackground();
        drawWorld();
        drawWorldDrops();
        drawRemotePlayers();
        drawPlayer();
        drawAllOverheadChats();
        drawCrosshair();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        drawSignTopText();
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

      function rectsOverlap(ax, ay, aw, ah, bx, by, bw, bh) {
        return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
      }

      function tileOccupiedByAnyPlayer(tx, ty) {
        const bx = tx * TILE;
        const by = ty * TILE;
        if (rectsOverlap(bx, by, TILE, TILE, player.x, player.y, PLAYER_W, PLAYER_H)) {
          return true;
        }
        for (const other of remotePlayers.values()) {
          if (!other || typeof other.x !== "number" || typeof other.y !== "number") continue;
          if (rectsOverlap(bx, by, TILE, TILE, other.x, other.y, PLAYER_W, PLAYER_H)) {
            return true;
          }
        }
        return false;
      }

      function tryPlace(tx, ty) {
        const id = slotOrder[selectedSlot];
        if (typeof id !== "number") return;
        if (!canEditTarget(tx, ty)) return;
        if (isProtectedSpawnTile(tx, ty)) return;
        if (!canEditCurrentWorld()) {
          notifyWorldLockedDenied();
          return;
        }
        if (inventory[id] <= 0) return;
        if (world[ty][tx] !== 0) return;
        if (tileOccupiedByAnyPlayer(tx, ty)) return;
        if (isWorldLocked() && !isWorldLockOwner()) {
          if (id === WORLD_LOCK_ID) {
            notifyOwnerOnlyWorldEdit("the world lock");
            return;
          }
          if (id === VENDING_ID) {
            notifyOwnerOnlyWorldEdit("vending machines");
            return;
          }
        }

        const bx = tx * TILE;
        const by = ty * TILE;
        if (bx < player.x + PLAYER_W && bx + TILE > player.x && by < player.y + PLAYER_H && by + TILE > player.y) {
          return;
        }

        const finalizePlace = () => {
          world[ty][tx] = id;
          inventory[id]--;
          syncBlock(tx, ty, id);
          if (id === VENDING_ID) {
            setLocalVendingMachine(tx, ty, {
              ownerAccountId: playerProfileId || "",
              ownerName: (playerName || "").toString().slice(0, 20),
              sellType: "block",
              sellBlockId: 0,
              sellCosmeticId: "",
              sellQuantity: 1,
              sellBlockKey: "",
              priceLocks: 0,
              stock: 0,
              earningsLocks: 0,
              updatedAt: Date.now()
            });
            seedVendingMachineOwner(tx, ty);
          } else if (id === SIGN_ID) {
            saveSignText(tx, ty, "");
          } else if (id === ANTI_GRAV_ID) {
            saveAntiGravityState(tx, ty, true);
          } else if (id === CAMERA_ID) {
            saveCameraConfig(tx, ty, buildDefaultCameraConfig());
          }
          saveInventory();
          refreshToolbar();
        };

        if (id === WORLD_LOCK_ID) {
          if (isWorldLocked()) {
            if (isWorldLockOwner()) {
              postLocalSystemChat("This world already has your lock.");
            } else {
              notifyWorldLockedDenied();
            }
            return;
          }
          const ownerName = (playerName || "player").toString().slice(0, 20);
          if (!network.enabled || !network.lockRef) {
            currentWorldLock = {
              ownerAccountId: playerProfileId || "",
              ownerName,
              tx,
              ty,
              createdAt: Date.now()
            };
            finalizePlace();
            postLocalSystemChat("World locked.");
            return;
          }
          network.lockRef.transaction((current) => {
            if (current && current.ownerAccountId) return;
            return {
              ownerAccountId: playerProfileId || "",
              ownerName,
              tx,
              ty,
              createdAt: firebase.database.ServerValue.TIMESTAMP
            };
          }).then((result) => {
            if (!result.committed) {
              const existing = normalizeWorldLock(result.snapshot && result.snapshot.val ? result.snapshot.val() : null);
              currentWorldLock = existing;
              notifyWorldLockedDenied();
              return;
            }
            currentWorldLock = normalizeWorldLock(result.snapshot && result.snapshot.val ? result.snapshot.val() : null) || {
              ownerAccountId: playerProfileId || "",
              ownerName,
              tx,
              ty,
              createdAt: Date.now()
            };
            finalizePlace();
            postLocalSystemChat("World locked.");
          }).catch(() => {
            postLocalSystemChat("Failed to place world lock.");
          });
          return;
        }

        finalizePlace();
      }

      function tryBreak(tx, ty) {
        if (!canEditTarget(tx, ty)) return;
        const id = world[ty][tx];
        if (id === 0) return;
        if (id === SPAWN_DOOR_ID) return;
        if (!canEditCurrentWorld()) {
          notifyWorldLockedDenied();
          return;
        }
        if (isProtectedSpawnTile(tx, ty)) return;
        if (isUnbreakableTileId(id)) return;
        if (id === WORLD_LOCK_ID && !isWorldLockOwner()) {
          notifyWorldLockedDenied();
          return;
        }
        if (id === VENDING_ID && isWorldLocked() && !isWorldLockOwner()) {
          notifyOwnerOnlyWorldEdit("vending machines");
          return;
        }

        if (id === VENDING_ID) {
          const ctrl = getVendingController();
          if (ctrl && typeof ctrl.onBreakWithFist === "function" && ctrl.onBreakWithFist(tx, ty)) {
            return;
          }
        }
        if (id === SIGN_ID) {
          saveSignText(tx, ty, "");
          if (signEditContext && signEditContext.tx === tx && signEditContext.ty === ty) {
            closeSignModal();
          }
        }
        if (id === DOOR_BLOCK_ID) {
          setLocalDoorAccess(tx, ty, null);
          if (network.enabled && network.doorsRef) {
            network.doorsRef.child(getTileKey(tx, ty)).remove().catch(() => {});
          }
        }
        if (id === ANTI_GRAV_ID) {
          setLocalAntiGravityState(tx, ty, null);
          if (network.enabled && network.antiGravRef) {
            network.antiGravRef.child(getTileKey(tx, ty)).remove().catch(() => {});
          }
        }
        if (id === CAMERA_ID) {
          setLocalCameraConfig(tx, ty, null);
          if (network.enabled && network.camerasRef) {
            network.camerasRef.child(getTileKey(tx, ty)).remove().catch(() => {});
          }
        }
        if (id === WEATHER_MACHINE_ID) {
          const active = normalizeWeatherRecord(currentWorldWeather);
          if (active && active.sourceTx === tx && active.sourceTy === ty) {
            setLocalWorldWeather(null);
            if (network.enabled && network.weatherRef) {
              network.weatherRef.remove().catch(() => {});
            }
          }
        }

        world[ty][tx] = 0;
        const dropId = getInventoryDropId(id);
        if (INVENTORY_IDS.includes(dropId)) {
          inventory[dropId] = (inventory[dropId] || 0) + 1;
        }
        syncBlock(tx, ty, 0);
        if (id === WORLD_LOCK_ID) {
          currentWorldLock = null;
          if (network.enabled && network.lockRef) {
            network.lockRef.remove().catch(() => {});
          }
          postLocalSystemChat("World unlocked.");
        }
        saveInventory();
        refreshToolbar();
      }

      function tryRotate(tx, ty) {
        if (!canEditTarget(tx, ty)) return;
        const id = world[ty][tx];
        if (!id || id === SPAWN_DOOR_ID) return;
        if (isProtectedSpawnTile(tx, ty)) return;
        if (!canEditCurrentWorld()) {
          notifyWorldLockedDenied();
          return;
        }
        if (id === WORLD_LOCK_ID && !isWorldLockOwner()) {
          notifyWorldLockedDenied();
          return;
        }
        if (id === VENDING_ID && isWorldLocked() && !isWorldLockOwner()) {
          notifyOwnerOnlyWorldEdit("vending machines");
          return;
        }
        const nextId = getRotatedBlockId(id);
        if (!nextId) return;
        world[ty][tx] = nextId;
        syncBlock(tx, ty, nextId);
      }

      function createOrUpdateVendingMachine(tx, ty, updater) {
        const ctrl = getVendingController();
        if (!ctrl || typeof ctrl.createOrUpdateMachine !== "function") return Promise.resolve(null);
        return ctrl.createOrUpdateMachine(tx, ty, updater);
      }

      function seedVendingMachineOwner(tx, ty) {
        const ctrl = getVendingController();
        if (!ctrl || typeof ctrl.seedOwner !== "function") return;
        ctrl.seedOwner(tx, ty);
      }

      function configureVendingMachine(tx, ty, vm) {
        const ctrl = getVendingController();
        if (!ctrl || typeof ctrl.configureMachine !== "function") return;
        ctrl.configureMachine(tx, ty, vm);
      }

      function collectVendingEarnings(tx, ty, vm) {
        const ctrl = getVendingController();
        if (!ctrl || typeof ctrl.collectEarnings !== "function") return;
        ctrl.collectEarnings(tx, ty, vm);
      }

      function removeVendingMachine(tx, ty, vm) {
        const ctrl = getVendingController();
        if (!ctrl || typeof ctrl.removeMachine !== "function") return;
        ctrl.removeMachine(tx, ty, vm);
      }

      function buyFromVendingMachine(tx, ty, vm) {
        const ctrl = getVendingController();
        if (!ctrl || typeof ctrl.buy !== "function") return;
        ctrl.buy(tx, ty, vm);
      }

      function interactWithVendingMachine(tx, ty) {
        const ctrl = getVendingController();
        if (!ctrl || typeof ctrl.interact !== "function") return;
        ctrl.interact(tx, ty);
      }

      function interactWithWrench(tx, ty) {
        if (!canEditTarget(tx, ty)) return;
        const id = world[ty][tx];
        if (id === WORLD_LOCK_ID) {
          openWorldLockModal(tx, ty);
          return;
        }
        if (id === VENDING_ID) {
          interactWithVendingMachine(tx, ty);
          return;
        }
        if (id === SIGN_ID) {
          openSignModal(tx, ty);
          return;
        }
        if (id === ANTI_GRAV_ID) {
          toggleAntiGravityGenerator(tx, ty);
          return;
        }
        if (id === DOOR_BLOCK_ID) {
          openDoorModal(tx, ty);
          return;
        }
        if (id === CAMERA_ID) {
          openCameraModal(tx, ty);
          return;
        }
        if (id === WEATHER_MACHINE_ID) {
          openWeatherModal(tx, ty);
        }
      }

      function useActionAt(tx, ty) {
        if (isProtectedSpawnTile(tx, ty)) return;
        const selectedId = slotOrder[selectedSlot];
        if (selectedId === TOOL_WRENCH) {
          interactWithWrench(tx, ty);
          return;
        }
        if (selectedId === TOOL_FIST) {
          tryBreak(tx, ty);
          return;
        }
        tryPlace(tx, ty);
      }

      function useSecondaryActionAt(tx, ty) {
        if (isProtectedSpawnTile(tx, ty)) return;
        const selectedId = slotOrder[selectedSlot];
        if (selectedId === TOOL_WRENCH) {
          interactWithWrench(tx, ty);
          return;
        }
        if (selectedId !== TOOL_FIST) return;
        tryRotate(tx, ty);
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

      function normalizeDropRecord(id, value) {
        if (!id || !value || typeof value !== "object") return null;
        const typeRaw = String(value.type || "").trim().toLowerCase();
        const type = typeRaw === "cosmetic" ? "cosmetic" : "block";
        const blockId = Math.max(0, Math.floor(Number(value.blockId) || 0));
        const cosmeticId = String(value.cosmeticId || "").trim().slice(0, 64);
        const amount = Math.max(1, Math.floor(Number(value.amount) || 1));
        if (type === "block" && !blockId) return null;
        if (type === "cosmetic" && !cosmeticId) return null;
        const x = Number(value.x);
        const y = Number(value.y);
        if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
        const clampedX = Math.max(0, Math.min(x, WORLD_W * TILE - TILE));
        const clampedY = Math.max(0, Math.min(y, WORLD_H * TILE - TILE));
        return {
          id: String(id),
          type,
          blockId,
          cosmeticId,
          amount,
          x: clampedX,
          y: clampedY,
          ownerAccountId: String(value.ownerAccountId || ""),
          ownerSessionId: String(value.ownerSessionId || ""),
          ownerName: String(value.ownerName || "").slice(0, 20),
          createdAt: typeof value.createdAt === "number" ? value.createdAt : Date.now(),
          noPickupUntil: 0
        };
      }

      function getDropLabel(drop) {
        if (!drop) return "item";
        if (drop.type === "cosmetic") {
          for (let i = 0; i < COSMETIC_ITEMS.length; i++) {
            const item = COSMETIC_ITEMS[i];
            if (item && item.id === drop.cosmeticId) return item.name || drop.cosmeticId;
          }
          return drop.cosmeticId || "cosmetic";
        }
        const def = blockDefs[drop.blockId];
        return def && def.name ? def.name : ("Block " + drop.blockId);
      }

      function addOrUpdateWorldDrop(id, value) {
        const normalized = normalizeDropRecord(id, value);
        if (!normalized) {
          worldDrops.delete(String(id || ""));
          return;
        }
        if (normalized.ownerSessionId && normalized.ownerSessionId === playerSessionId) {
          normalized.noPickupUntil = performance.now() + 550;
        }
        worldDrops.set(normalized.id, normalized);
      }

      function clearWorldDrops() {
        worldDrops.clear();
      }

      function removeWorldDrop(id) {
        worldDrops.delete(String(id || ""));
      }

      function dropSelectedInventoryItem() {
        if (!inWorld) return;
        const selectedId = slotOrder[selectedSlot];
        if (typeof selectedId !== "number") return;
        if (!INVENTORY_IDS.includes(selectedId)) return;
        if ((inventory[selectedId] || 0) <= 0) return;
        const now = performance.now();
        if (now - lastDropAtMs < 150) return;
        lastDropAtMs = now;
        const dropX = Math.max(0, Math.min(player.x + (PLAYER_W / 2) - (TILE / 2), WORLD_W * TILE - TILE));
        const dropY = Math.max(0, Math.min(player.y + PLAYER_H - TILE, WORLD_H * TILE - TILE));
        const payload = {
          type: "block",
          blockId: selectedId,
          amount: 1,
          x: dropX,
          y: dropY,
          ownerAccountId: playerProfileId || "",
          ownerSessionId: playerSessionId || "",
          ownerName: (playerName || "").toString().slice(0, 20),
          createdAt: Date.now()
        };

        inventory[selectedId] = Math.max(0, Math.floor((inventory[selectedId] || 0) - 1));
        saveInventory();
        refreshToolbar();

        if (!network.enabled || !network.dropsRef) {
          const localId = "local_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7);
          addOrUpdateWorldDrop(localId, payload);
          return;
        }
        network.dropsRef.push({
          ...payload,
          createdAt: firebase.database.ServerValue.TIMESTAMP
        }).catch(() => {});
      }

      function tryPickupWorldDrop(drop) {
        if (!drop || !drop.id) return;
        if (drop.noPickupUntil && performance.now() < drop.noPickupUntil) return;
        const px = player.x + PLAYER_W / 2;
        const py = player.y + PLAYER_H / 2;
        const dx = (drop.x + TILE / 2) - px;
        const dy = (drop.y + TILE / 2) - py;
        if ((dx * dx + dy * dy) > (DROP_PICKUP_RADIUS * DROP_PICKUP_RADIUS)) return;

        const applyPickup = () => {
          if (drop.type === "cosmetic") {
            cosmeticInventory[drop.cosmeticId] = Math.max(0, Math.floor((cosmeticInventory[drop.cosmeticId] || 0) + drop.amount));
          } else {
            inventory[drop.blockId] = Math.max(0, Math.floor((inventory[drop.blockId] || 0) + drop.amount));
          }
          saveInventory();
          refreshToolbar();
          postLocalSystemChat("Picked up " + drop.amount + "x " + getDropLabel(drop) + ".");
        };

        if (!network.enabled || !network.dropsRef) {
          removeWorldDrop(drop.id);
          applyPickup();
          return;
        }

        drop.noPickupUntil = performance.now() + 280;
        const ref = network.dropsRef.child(drop.id);
        ref.transaction((current) => {
          if (!current) return current;
          return null;
        }).then((result) => {
          if (!result.committed) return;
          removeWorldDrop(drop.id);
          applyPickup();
        }).catch(() => {});
      }

      function updateWorldDrops() {
        if (!inWorld || !worldDrops.size) return;
        if (worldDrops.size > DROP_MAX_PER_WORLD) {
          const ids = Array.from(worldDrops.keys());
          ids.sort();
          const removeCount = worldDrops.size - DROP_MAX_PER_WORLD;
          for (let i = 0; i < removeCount; i++) {
            worldDrops.delete(ids[i]);
          }
        }
        const entries = Array.from(worldDrops.values());
        for (let i = 0; i < entries.length; i++) {
          tryPickupWorldDrop(entries[i]);
        }
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

      function refreshWorldButtons(worldIds, force) {
        if (Array.isArray(worldIds)) {
          knownWorldIds = Array.from(new Set(worldIds.filter(Boolean)));
        }
        if (!inWorld && hasRenderedMenuWorldList && !force) {
          return;
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
        if (blockSyncer && typeof blockSyncer.flush === "function") {
          blockSyncer.flush();
        }
        if (network.lockRef && network.handlers.worldLock) {
          network.lockRef.off("value", network.handlers.worldLock);
        }
        if (network.dropFeedRef && network.handlers.dropAdded) {
          network.dropFeedRef.off("child_added", network.handlers.dropAdded);
        }
        if (network.dropsRef && network.handlers.dropChanged) {
          network.dropsRef.off("child_changed", network.handlers.dropChanged);
        }
        if (network.dropsRef && network.handlers.dropRemoved) {
          network.dropsRef.off("child_removed", network.handlers.dropRemoved);
        }
        if (network.vendingRef && network.handlers.vendingAdded) {
          network.vendingRef.off("child_added", network.handlers.vendingAdded);
        }
        if (network.vendingRef && network.handlers.vendingChanged) {
          network.vendingRef.off("child_changed", network.handlers.vendingChanged);
        }
        if (network.vendingRef && network.handlers.vendingRemoved) {
          network.vendingRef.off("child_removed", network.handlers.vendingRemoved);
        }
        if (network.signsRef && network.handlers.signAdded) {
          network.signsRef.off("child_added", network.handlers.signAdded);
        }
        if (network.signsRef && network.handlers.signChanged) {
          network.signsRef.off("child_changed", network.handlers.signChanged);
        }
        if (network.signsRef && network.handlers.signRemoved) {
          network.signsRef.off("child_removed", network.handlers.signRemoved);
        }
        if (network.doorsRef && network.handlers.doorAdded) {
          network.doorsRef.off("child_added", network.handlers.doorAdded);
        }
        if (network.doorsRef && network.handlers.doorChanged) {
          network.doorsRef.off("child_changed", network.handlers.doorChanged);
        }
        if (network.doorsRef && network.handlers.doorRemoved) {
          network.doorsRef.off("child_removed", network.handlers.doorRemoved);
        }
        if (network.antiGravRef && network.handlers.antiGravAdded) {
          network.antiGravRef.off("child_added", network.handlers.antiGravAdded);
        }
        if (network.antiGravRef && network.handlers.antiGravChanged) {
          network.antiGravRef.off("child_changed", network.handlers.antiGravChanged);
        }
        if (network.antiGravRef && network.handlers.antiGravRemoved) {
          network.antiGravRef.off("child_removed", network.handlers.antiGravRemoved);
        }
        if (network.weatherRef && network.handlers.worldWeather) {
          network.weatherRef.off("value", network.handlers.worldWeather);
        }
        if (network.camerasRef && network.handlers.cameraAdded) {
          network.camerasRef.off("child_added", network.handlers.cameraAdded);
        }
        if (network.camerasRef && network.handlers.cameraChanged) {
          network.camerasRef.off("child_changed", network.handlers.cameraChanged);
        }
        if (network.camerasRef && network.handlers.cameraRemoved) {
          network.camerasRef.off("child_removed", network.handlers.cameraRemoved);
        }
        if (network.cameraLogsFeedRef && network.handlers.cameraLogAdded) {
          network.cameraLogsFeedRef.off("child_added", network.handlers.cameraLogAdded);
        }
        if (typeof syncWorldsModule.detachWorldListeners === "function") {
          syncWorldsModule.detachWorldListeners(network, network.handlers, true);
        } else if (network.playerRef) {
          network.playerRef.remove().catch(() => {});
        }
        if (blockSyncer && typeof blockSyncer.reset === "function") {
          blockSyncer.reset();
        }

        network.playerRef = null;
        network.playersRef = null;
        network.blocksRef = null;
        network.dropsRef = null;
        network.dropFeedRef = null;
        network.vendingRef = null;
        network.signsRef = null;
        network.doorsRef = null;
        network.antiGravRef = null;
        network.weatherRef = null;
        network.camerasRef = null;
        network.cameraLogsRef = null;
        network.cameraLogsFeedRef = null;
        network.lockRef = null;
        network.chatRef = null;
        network.chatFeedRef = null;
        network.handlers.players = null;
        network.handlers.blockAdded = null;
        network.handlers.blockChanged = null;
        network.handlers.blockRemoved = null;
        network.handlers.dropAdded = null;
        network.handlers.dropChanged = null;
        network.handlers.dropRemoved = null;
        network.handlers.vendingAdded = null;
        network.handlers.vendingChanged = null;
        network.handlers.vendingRemoved = null;
        network.handlers.signAdded = null;
        network.handlers.signChanged = null;
        network.handlers.signRemoved = null;
        network.handlers.doorAdded = null;
        network.handlers.doorChanged = null;
        network.handlers.doorRemoved = null;
        network.handlers.antiGravAdded = null;
        network.handlers.antiGravChanged = null;
        network.handlers.antiGravRemoved = null;
        network.handlers.worldWeather = null;
        network.handlers.cameraAdded = null;
        network.handlers.cameraChanged = null;
        network.handlers.cameraRemoved = null;
        network.handlers.cameraLogAdded = null;
        network.handlers.worldLock = null;
        network.handlers.chatAdded = null;
        currentWorldLock = null;
        const ctrl = getVendingController();
        if (ctrl && typeof ctrl.clearAll === "function") ctrl.clearAll();
        signTexts.clear();
        doorAccessByTile.clear();
        antiGravityByTile.clear();
        cameraConfigsByTile.clear();
        cameraLogsByTile.clear();
        currentWorldWeather = null;
        clearWorldDrops();
        closeSignModal();
        closeWorldLockModal();
        closeDoorModal();
        closeCameraModal();
        closeWeatherModal();
        closeTradeMenuModal();
        closeTradeRequestModal();
      }

      function leaveCurrentWorld() {
        sendSystemWorldMessage(playerName + " left the world.");
        logCameraEvent(
          "player_leave",
          playerName + " left " + currentWorldId + ".",
          playerProfileId,
          playerName
        );
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
          logCameraEvent(
            "player_leave",
            playerName + " left " + previousWorldId + ".",
            playerProfileId,
            playerName
          );
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

        const worldRefs = typeof syncWorldsModule.createWorldRefs === "function"
          ? syncWorldsModule.createWorldRefs(network.db, BASE_PATH, worldId)
          : null;
        network.playersRef = worldRefs && worldRefs.playersRef ? worldRefs.playersRef : network.db.ref(BASE_PATH + "/worlds/" + worldId + "/players");
        network.blocksRef = worldRefs && worldRefs.blocksRef ? worldRefs.blocksRef : network.db.ref(BASE_PATH + "/worlds/" + worldId + "/blocks");
        network.dropsRef = network.db.ref(BASE_PATH + "/worlds/" + worldId + "/drops");
        network.dropFeedRef = network.dropsRef.limitToLast(DROP_MAX_PER_WORLD);
        network.vendingRef = network.db.ref(BASE_PATH + "/worlds/" + worldId + "/vending");
        network.signsRef = network.db.ref(BASE_PATH + "/worlds/" + worldId + "/signs");
        network.doorsRef = network.db.ref(BASE_PATH + "/worlds/" + worldId + "/doors");
        network.antiGravRef = network.db.ref(BASE_PATH + "/worlds/" + worldId + "/anti-gravity");
        network.weatherRef = network.db.ref(BASE_PATH + "/worlds/" + worldId + "/weather");
        network.camerasRef = network.db.ref(BASE_PATH + "/worlds/" + worldId + "/cameras");
        network.cameraLogsRef = network.db.ref(BASE_PATH + "/worlds/" + worldId + "/camera-logs");
        network.cameraLogsFeedRef = network.cameraLogsRef.limitToLast(500);
        network.lockRef = network.db.ref(BASE_PATH + "/worlds/" + worldId + "/lock");
        network.chatRef = worldRefs && worldRefs.chatRef ? worldRefs.chatRef : network.db.ref(BASE_PATH + "/worlds/" + worldId + "/chat");
        network.chatFeedRef = typeof syncWorldsModule.createChatFeed === "function"
          ? syncWorldsModule.createChatFeed(network.chatRef, worldChatStartedAt, 100)
          : (worldChatStartedAt > 0
            ? network.chatRef.orderByChild("createdAt").startAt(worldChatStartedAt).limitToLast(100)
            : network.chatRef.limitToLast(100));
        network.playerRef = network.playersRef.child(playerId);
        network.handlers.worldLock = (snapshot) => {
          currentWorldLock = normalizeWorldLock(snapshot.val());
          if (worldLockModalEl && !worldLockModalEl.classList.contains("hidden")) {
            if (!isWorldLocked() || !isWorldLockOwner()) {
              closeWorldLockModal();
            } else {
              renderWorldLockModal();
            }
          }
        };
        if (network.lockRef && network.handlers.worldLock) {
          network.lockRef.on("value", network.handlers.worldLock);
        }

        const applyBlockValue = (tx, ty, id) => {
          const requiredId = getProtectedTileRequiredId(tx, ty);
          if (requiredId) {
            world[ty][tx] = requiredId;
            if (id !== requiredId && network.blocksRef) {
              network.blocksRef.child(tx + "_" + ty).set(requiredId).catch(() => {});
            }
            setLocalVendingMachine(tx, ty, null);
            setLocalSignText(tx, ty, null);
            setLocalDoorAccess(tx, ty, null);
            setLocalAntiGravityState(tx, ty, null);
            setLocalCameraConfig(tx, ty, null);
            return;
          }
          world[ty][tx] = id;
          if (id !== VENDING_ID) {
            setLocalVendingMachine(tx, ty, null);
          }
          if (id !== SIGN_ID) {
            setLocalSignText(tx, ty, null);
          }
          if (id !== DOOR_BLOCK_ID) {
            setLocalDoorAccess(tx, ty, null);
          }
          if (id !== ANTI_GRAV_ID) {
            setLocalAntiGravityState(tx, ty, null);
          }
          if (id !== CAMERA_ID) {
            setLocalCameraConfig(tx, ty, null);
          }
        };
        const clearBlockValue = (tx, ty) => {
          const requiredId = getProtectedTileRequiredId(tx, ty);
          if (requiredId) {
            world[ty][tx] = requiredId;
            if (network.blocksRef) {
              network.blocksRef.child(tx + "_" + ty).set(requiredId).catch(() => {});
            }
            setLocalVendingMachine(tx, ty, null);
            setLocalSignText(tx, ty, null);
            setLocalDoorAccess(tx, ty, null);
            setLocalAntiGravityState(tx, ty, null);
            setLocalCameraConfig(tx, ty, null);
            return;
          }
          world[ty][tx] = 0;
          setLocalVendingMachine(tx, ty, null);
          setLocalSignText(tx, ty, null);
          setLocalDoorAccess(tx, ty, null);
          setLocalAntiGravityState(tx, ty, null);
          setLocalCameraConfig(tx, ty, null);
        };

        const handlers = typeof syncWorldsModule.buildWorldHandlers === "function"
          ? syncWorldsModule.buildWorldHandlers({
            remotePlayers,
            playerId,
            normalizeRemoteEquippedCosmetics,
            updateOnlineCount,
            parseTileKey,
            applyBlockValue,
            clearBlockValue,
            addChatMessage
          })
          : null;
        if (!handlers) {
          setNetworkState("Sync module missing", true);
          return;
        }
        network.handlers.players = handlers.players;
        network.handlers.blockAdded = handlers.blockAdded;
        network.handlers.blockChanged = handlers.blockChanged;
        network.handlers.blockRemoved = handlers.blockRemoved;
        network.handlers.dropAdded = (snapshot) => {
          addOrUpdateWorldDrop(snapshot.key || "", snapshot.val() || {});
        };
        network.handlers.dropChanged = network.handlers.dropAdded;
        network.handlers.dropRemoved = (snapshot) => {
          removeWorldDrop(snapshot.key || "");
        };
        network.handlers.chatAdded = handlers.chatAdded;
        network.handlers.vendingAdded = (snapshot) => {
          const tile = parseTileKey(snapshot.key || "");
          if (!tile) return;
          setLocalVendingMachine(tile.tx, tile.ty, snapshot.val());
        };
        network.handlers.vendingChanged = network.handlers.vendingAdded;
        network.handlers.vendingRemoved = (snapshot) => {
          const tile = parseTileKey(snapshot.key || "");
          if (!tile) return;
          setLocalVendingMachine(tile.tx, tile.ty, null);
        };
        network.handlers.signAdded = (snapshot) => {
          const tile = parseTileKey(snapshot.key || "");
          if (!tile) return;
          setLocalSignText(tile.tx, tile.ty, snapshot.val());
        };
        network.handlers.signChanged = network.handlers.signAdded;
        network.handlers.signRemoved = (snapshot) => {
          const tile = parseTileKey(snapshot.key || "");
          if (!tile) return;
          setLocalSignText(tile.tx, tile.ty, null);
        };
        network.handlers.doorAdded = (snapshot) => {
          const tile = parseTileKey(snapshot.key || "");
          if (!tile) return;
          setLocalDoorAccess(tile.tx, tile.ty, snapshot.val());
        };
        network.handlers.doorChanged = network.handlers.doorAdded;
        network.handlers.doorRemoved = (snapshot) => {
          const tile = parseTileKey(snapshot.key || "");
          if (!tile) return;
          setLocalDoorAccess(tile.tx, tile.ty, null);
        };
        network.handlers.antiGravAdded = (snapshot) => {
          const tile = parseTileKey(snapshot.key || "");
          if (!tile) return;
          setLocalAntiGravityState(tile.tx, tile.ty, snapshot.val());
        };
        network.handlers.antiGravChanged = network.handlers.antiGravAdded;
        network.handlers.antiGravRemoved = (snapshot) => {
          const tile = parseTileKey(snapshot.key || "");
          if (!tile) return;
          setLocalAntiGravityState(tile.tx, tile.ty, null);
        };
        network.handlers.worldWeather = (snapshot) => {
          setLocalWorldWeather(snapshot.val());
        };
        network.handlers.cameraAdded = (snapshot) => {
          const tile = parseTileKey(snapshot.key || "");
          if (!tile) return;
          setLocalCameraConfig(tile.tx, tile.ty, snapshot.val());
        };
        network.handlers.cameraChanged = network.handlers.cameraAdded;
        network.handlers.cameraRemoved = (snapshot) => {
          const tile = parseTileKey(snapshot.key || "");
          if (!tile) return;
          setLocalCameraConfig(tile.tx, tile.ty, null);
        };
        network.handlers.cameraLogAdded = (snapshot) => {
          const value = snapshot.val() || {};
          const tileKey = (value.tileKey || "").toString();
          const tile = parseTileKey(tileKey);
          if (!tile) return;
          if (!cameraConfigsByTile.has(tileKey) && (!world[tile.ty] || world[tile.ty][tile.tx] !== CAMERA_ID)) return;
          appendLocalCameraLog(tileKey, {
            tileKey,
            eventType: (value.eventType || "").toString().slice(0, 40),
            text: (value.text || "").toString().slice(0, 180),
            actorAccountId: (value.actorAccountId || "").toString().slice(0, 80),
            actorName: (value.actorName || "").toString().slice(0, 24),
            createdAt: typeof value.createdAt === "number" ? value.createdAt : Date.now()
          });
        };
        if (typeof syncWorldsModule.attachWorldListeners === "function") {
          syncWorldsModule.attachWorldListeners(network, network.handlers);
        }
        if (network.vendingRef && network.handlers.vendingAdded) {
          network.vendingRef.on("child_added", network.handlers.vendingAdded);
          network.vendingRef.on("child_changed", network.handlers.vendingChanged);
          network.vendingRef.on("child_removed", network.handlers.vendingRemoved);
        }
        if (network.dropFeedRef && network.handlers.dropAdded) {
          network.dropFeedRef.on("child_added", network.handlers.dropAdded);
          network.dropsRef.on("child_changed", network.handlers.dropChanged);
          network.dropsRef.on("child_removed", network.handlers.dropRemoved);
        }
        if (network.signsRef && network.handlers.signAdded) {
          network.signsRef.on("child_added", network.handlers.signAdded);
          network.signsRef.on("child_changed", network.handlers.signChanged);
          network.signsRef.on("child_removed", network.handlers.signRemoved);
        }
        if (network.doorsRef && network.handlers.doorAdded) {
          network.doorsRef.on("child_added", network.handlers.doorAdded);
          network.doorsRef.on("child_changed", network.handlers.doorChanged);
          network.doorsRef.on("child_removed", network.handlers.doorRemoved);
        }
        if (network.antiGravRef && network.handlers.antiGravAdded) {
          network.antiGravRef.on("child_added", network.handlers.antiGravAdded);
          network.antiGravRef.on("child_changed", network.handlers.antiGravChanged);
          network.antiGravRef.on("child_removed", network.handlers.antiGravRemoved);
        }
        if (network.weatherRef && network.handlers.worldWeather) {
          network.weatherRef.on("value", network.handlers.worldWeather);
        }
        if (network.camerasRef && network.handlers.cameraAdded) {
          network.camerasRef.on("child_added", network.handlers.cameraAdded);
          network.camerasRef.on("child_changed", network.handlers.cameraChanged);
          network.camerasRef.on("child_removed", network.handlers.cameraRemoved);
        }
        if (network.cameraLogsFeedRef && network.handlers.cameraLogAdded) {
          network.cameraLogsFeedRef.on("child_added", network.handlers.cameraLogAdded);
        }
        enforceSpawnStructureInWorldData();
        enforceSpawnStructureInDatabase();
        addClientLog("Joined world: " + worldId + ".");
        sendSystemWorldMessage(playerName + " joined the world.");
        setTimeout(() => {
          if (!inWorld || currentWorldId !== worldId) return;
          logCameraEvent(
            "player_join",
            playerName + " entered " + worldId + ".",
            playerProfileId,
            playerName
          );
        }, 140);
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
          suppressSpawnSafetyUntilMs = performance.now() + 2500;
          player.x = clampTeleport(pendingTeleportSelf.x, 0, WORLD_W * TILE - PLAYER_W - 2);
          player.y = clampTeleport(pendingTeleportSelf.y, 0, WORLD_H * TILE - PLAYER_H - 2);
          player.vx = 0;
          player.vy = 0;
          pendingTeleportSelf = null;
          syncPlayer(true);
        }
        ensurePlayerSafeSpawn(false);
        setTimeout(() => {
          if (!inWorld || currentWorldId !== worldId) return;
          ensurePlayerSafeSpawn(false);
        }, 350);
        setTimeout(() => {
          if (!inWorld || currentWorldId !== worldId) return;
          ensurePlayerSafeSpawn(false);
        }, 1200);
      }

      function syncBlock(tx, ty, id) {
        if (!network.enabled || !network.blocksRef) return;
        if (blockSyncer && typeof blockSyncer.enqueue === "function") {
          blockSyncer.enqueue(tx, ty, id);
          return;
        }
        network.blocksRef.child(tx + "_" + ty).set(id).catch(() => {
          setNetworkState("Network error", true);
        });
      }

      function syncPlayer(force) {
        if (!inWorld) return;
        if (!network.enabled || !network.playerRef) return;

        const now = performance.now();
        const rawPayload = {
          name: playerName,
          accountId: playerProfileId,
          x: Math.round(player.x),
          y: Math.round(player.y),
          facing: player.facing,
          cosmetics: {
            clothes: equippedCosmetics.clothes || "",
            wings: equippedCosmetics.wings || "",
            swords: equippedCosmetics.swords || ""
          },
          world: currentWorldId,
          updatedAt: firebase.database.ServerValue.TIMESTAMP
        };
        const payload = typeof syncPlayerModule.buildPayload === "function"
          ? syncPlayerModule.buildPayload(rawPayload)
          : rawPayload;

        let writePlayer = true;
        let writeGlobal = Boolean(network.globalPlayerRef);
        if (playerSyncController && typeof playerSyncController.compute === "function") {
          const syncDecision = playerSyncController.compute({
            nowMs: now,
            force,
            x: payload.x,
            y: payload.y,
            facing: payload.facing,
            world: payload.world
          });
          writePlayer = Boolean(syncDecision.writePlayer);
          writeGlobal = Boolean(syncDecision.writeGlobal) && Boolean(network.globalPlayerRef);
        }
        if (!writePlayer && !writeGlobal) return;

        if (writePlayer) {
          network.playerRef.update(payload).catch(() => {
            setNetworkState("Network error", true);
          });
        }
        if (!writeGlobal || !network.globalPlayerRef) return;
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
        adminToggleBtn.addEventListener("click", () => {
          setAdminOpen(!isAdminOpen);
        });
        adminCloseBtn.addEventListener("click", () => {
          setAdminOpen(false);
        });
        if (adminInventoryCloseBtn) {
          adminInventoryCloseBtn.addEventListener("click", () => {
            closeAdminInventoryModal();
          });
        }
        if (adminInventoryModalEl) {
          adminInventoryModalEl.addEventListener("click", (event) => {
            if (event.target === adminInventoryModalEl) {
              closeAdminInventoryModal();
            }
          });
        }
        if (adminInventoryBodyEl) {
          adminInventoryBodyEl.addEventListener("click", handleAdminInventoryModalAction);
          adminInventoryBodyEl.addEventListener("change", handleAdminInventoryModalChange);
        }
        const vendingCtrl = getVendingController();
        if (vendingCtrl && typeof vendingCtrl.bindModalEvents === "function") {
          vendingCtrl.bindModalEvents();
        }
        if (signCloseBtn) {
          signCloseBtn.addEventListener("click", () => {
            closeSignModal();
          });
        }
        if (signModalEl) {
          signModalEl.addEventListener("click", (event) => {
            if (event.target === signModalEl) {
              closeSignModal();
            }
          });
        }
        if (signSaveBtn) {
          signSaveBtn.addEventListener("click", () => {
            if (!signEditContext || !signTextInputEl) return;
            const tx = Number(signEditContext.tx);
            const ty = Number(signEditContext.ty);
            if (!Number.isInteger(tx) || !Number.isInteger(ty)) return;
            if (!canEditCurrentWorld()) {
              notifyWorldLockedDenied();
              closeSignModal();
              return;
            }
            if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H || world[ty][tx] !== SIGN_ID) {
              closeSignModal();
              return;
            }
            saveSignText(tx, ty, signTextInputEl.value || "");
            closeSignModal();
            postLocalSystemChat("Sign saved.");
          });
        }
        if (worldLockCloseBtn) {
          worldLockCloseBtn.addEventListener("click", () => {
            closeWorldLockModal();
          });
        }
        if (worldLockModalEl) {
          worldLockModalEl.addEventListener("click", (event) => {
            if (event.target === worldLockModalEl) {
              closeWorldLockModal();
              return;
            }
            const target = event.target;
            if (!(target instanceof HTMLElement)) return;
            const removeAccountId = (target.dataset.worldlockRemove || "").trim();
            if (removeAccountId) {
              removeWorldAdmin(removeAccountId);
            }
          });
        }
        if (worldLockAdminAddBtn) {
          worldLockAdminAddBtn.addEventListener("click", () => {
            if (!worldLockAdminInputEl) return;
            addWorldAdminByUsername(worldLockAdminInputEl.value || "");
          });
        }
        if (worldLockAdminInputEl) {
          worldLockAdminInputEl.addEventListener("keydown", (event) => {
            if (event.key !== "Enter") return;
            event.preventDefault();
            addWorldAdminByUsername(worldLockAdminInputEl.value || "");
          });
        }
        if (doorCloseBtn) {
          doorCloseBtn.addEventListener("click", () => {
            closeDoorModal();
          });
        }
        if (doorModalEl) {
          doorModalEl.addEventListener("click", (event) => {
            if (event.target === doorModalEl) {
              closeDoorModal();
            }
          });
        }
        if (doorPublicBtn) {
          doorPublicBtn.addEventListener("click", () => {
            if (!doorEditContext) return;
            const tx = Number(doorEditContext.tx);
            const ty = Number(doorEditContext.ty);
            if (!Number.isInteger(tx) || !Number.isInteger(ty)) return;
            if (!isWorldLocked() || !isWorldLockOwner()) {
              notifyWorldLockedDenied();
              closeDoorModal();
              return;
            }
            if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H || world[ty][tx] !== DOOR_BLOCK_ID) {
              closeDoorModal();
              return;
            }
            saveDoorMode(tx, ty, "public");
            openDoorModal(tx, ty);
            postLocalSystemChat("Door access set to public.");
          });
        }
        if (doorOwnerOnlyBtn) {
          doorOwnerOnlyBtn.addEventListener("click", () => {
            if (!doorEditContext) return;
            const tx = Number(doorEditContext.tx);
            const ty = Number(doorEditContext.ty);
            if (!Number.isInteger(tx) || !Number.isInteger(ty)) return;
            if (!isWorldLocked() || !isWorldLockOwner()) {
              notifyWorldLockedDenied();
              closeDoorModal();
              return;
            }
            if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H || world[ty][tx] !== DOOR_BLOCK_ID) {
              closeDoorModal();
              return;
            }
            saveDoorMode(tx, ty, "owner");
            openDoorModal(tx, ty);
            postLocalSystemChat("Door access set to owner only.");
          });
        }
        if (cameraCloseBtn) {
          cameraCloseBtn.addEventListener("click", () => {
            closeCameraModal();
          });
        }
        if (cameraModalEl) {
          cameraModalEl.addEventListener("click", (event) => {
            if (event.target === cameraModalEl) {
              closeCameraModal();
            }
          });
        }
        if (cameraSaveBtn) {
          cameraSaveBtn.addEventListener("click", () => {
            if (!cameraEditContext) return;
            const tx = Number(cameraEditContext.tx);
            const ty = Number(cameraEditContext.ty);
            if (!Number.isInteger(tx) || !Number.isInteger(ty)) return;
            if (!canEditCurrentWorld()) {
              notifyWorldLockedDenied();
              closeCameraModal();
              return;
            }
            if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H || world[ty][tx] !== CAMERA_ID) {
              closeCameraModal();
              return;
            }
            saveCameraConfig(tx, ty, {
              events: {
                playerJoin: Boolean(cameraEventJoinEl && cameraEventJoinEl.checked),
                playerLeave: Boolean(cameraEventLeaveEl && cameraEventLeaveEl.checked),
                vendingPurchase: Boolean(cameraEventVendingEl && cameraEventVendingEl.checked)
              },
              excludeAdminOwner: Boolean(cameraFilterStaffEl && cameraFilterStaffEl.checked)
            });
            postLocalSystemChat("Camera settings saved.");
            renderCameraModal();
          });
        }
        if (weatherPreviewImgEl && weatherPreviewEmptyEl) {
          weatherPreviewImgEl.addEventListener("error", () => {
            weatherPreviewImgEl.classList.add("hidden");
            if (weatherPreviewEmptyEl) weatherPreviewEmptyEl.classList.remove("hidden");
          });
          weatherPreviewImgEl.addEventListener("load", () => {
            weatherPreviewImgEl.classList.remove("hidden");
            if (weatherPreviewEmptyEl) weatherPreviewEmptyEl.classList.add("hidden");
          });
        }
        if (weatherCloseBtn) {
          weatherCloseBtn.addEventListener("click", () => {
            closeWeatherModal();
          });
        }
        if (weatherModalEl) {
          weatherModalEl.addEventListener("click", (event) => {
            if (event.target === weatherModalEl) {
              closeWeatherModal();
            }
          });
        }
        if (weatherPresetSelectEl) {
          weatherPresetSelectEl.addEventListener("change", () => {
            refreshWeatherPreview();
          });
        }
        if (weatherImageUrlInputEl) {
          weatherImageUrlInputEl.addEventListener("input", () => {
            refreshWeatherPreview();
          });
        }
        if (weatherSaveBtn) {
          weatherSaveBtn.addEventListener("click", () => {
            if (!weatherEditContext) return;
            const tx = Number(weatherEditContext.tx);
            const ty = Number(weatherEditContext.ty);
            if (!Number.isInteger(tx) || !Number.isInteger(ty)) return;
            if (!canEditCurrentWorld()) {
              notifyWorldLockedDenied();
              closeWeatherModal();
              return;
            }
            if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H || world[ty][tx] !== WEATHER_MACHINE_ID) {
              closeWeatherModal();
              return;
            }
            const presetId = weatherPresetSelectEl ? weatherPresetSelectEl.value : "none";
            const imageUrl = weatherImageUrlInputEl ? weatherImageUrlInputEl.value : "";
            saveWorldWeatherFromMachine(tx, ty, presetId, imageUrl);
            postLocalSystemChat("Weather updated.");
            renderWeatherModal();
          });
        }
        if (weatherClearBtn) {
          weatherClearBtn.addEventListener("click", () => {
            if (!weatherEditContext) return;
            const accepted = window.confirm("Clear world weather and return to default sky?");
            if (!accepted) return;
            saveWorldWeatherFromMachine(Number(weatherEditContext.tx), Number(weatherEditContext.ty), "none", "");
            postLocalSystemChat("Weather cleared.");
            renderWeatherModal();
          });
        }
        const tradeCtrl = getTradeController();
        if (tradeCtrl && typeof tradeCtrl.bindUiEvents === "function") {
          tradeCtrl.bindUiEvents();
        }
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
        if (adminForceReloadBtn) {
          adminForceReloadBtn.addEventListener("click", () => {
            if (!hasAdminPermission("force_reload")) return;
            const accepted = window.confirm("Force reload all currently connected clients?");
            if (!accepted) return;
            triggerForceReloadAll("panel");
          });
        }
        adminAccountsEl.addEventListener("click", handleAdminAction);
        adminAccountsEl.addEventListener("change", handleAdminInputChange);
        chatSendBtn.addEventListener("click", () => {
          sendChatMessage();
        });
        chatInputEl.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            event.stopPropagation();
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

      async function initFirebaseMultiplayer() {
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
          network.db = await getAuthDb();
          network.enabled = true;
          network.connectedRef = network.db.ref(".info/connected");
          network.worldsIndexRef = network.db.ref(BASE_PATH + "/worlds-index");
          network.globalPlayersRef = network.db.ref(BASE_PATH + "/global-players");
          network.globalPlayerRef = network.globalPlayersRef.child(playerId);
          network.mySessionRef = network.db.ref(BASE_PATH + "/account-sessions/" + playerProfileId);
          network.myCommandRef = network.db.ref(BASE_PATH + "/account-commands/" + playerProfileId + "/teleport");
          network.myTradeRequestRef = network.db.ref(BASE_PATH + "/account-commands/" + playerProfileId + "/tradeRequest");
          network.myTradeResponseRef = network.db.ref(BASE_PATH + "/account-commands/" + playerProfileId + "/tradeResponse");
          network.myActiveTradeRef = network.db.ref(BASE_PATH + "/active-trades/" + playerProfileId);
          network.inventoryRef = network.db.ref(BASE_PATH + "/player-inventories/" + playerProfileId);
          network.accountLogsRootRef = network.db.ref(BASE_PATH + "/account-logs");
          network.forceReloadRef = network.db.ref(BASE_PATH + "/system/force-reload");
          network.announcementRef = network.db.ref(BASE_PATH + "/system/announcement");
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
          network.handlers.myTradeRequest = (snapshot) => {
            const ctrl = getTradeController();
            if (!ctrl || typeof ctrl.onTradeRequest !== "function") return;
            ctrl.onTradeRequest(snapshot.val() || {});
          };
          network.handlers.myTradeResponse = (snapshot) => {
            const ctrl = getTradeController();
            if (!ctrl || typeof ctrl.onTradeResponse !== "function") return;
            ctrl.onTradeResponse(snapshot.val() || {});
          };
          network.handlers.myActiveTrade = (snapshot) => {
            const ctrl = getTradeController();
            if (!ctrl || typeof ctrl.onActiveTradePointer !== "function") return;
            ctrl.onActiveTradePointer(snapshot.val() || "");
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
            const occupancy = typeof syncWorldsModule.computeWorldOccupancy === "function"
              ? syncWorldsModule.computeWorldOccupancy(data, normalizeWorldId)
              : null;
            worldOccupancy.clear();
            if (occupancy instanceof Map) {
              occupancy.forEach((value, key) => {
                worldOccupancy.set(key, value);
              });
            } else {
              Object.keys(data).forEach((id) => {
                const playerData = data[id];
                if (!playerData || !playerData.world) return;
                const wid = normalizeWorldId(playerData.world);
                if (!wid) return;
                worldOccupancy.set(wid, (worldOccupancy.get(wid) || 0) + 1);
              });
            }
            refreshWorldButtons();
            updateOnlineCount();
          };
          network.handlers.accountLogAdded = (snapshot) => {
            if (!canViewAccountLogs) return;
            const byAccount = snapshot.val() || {};
            const flattened = [];
            Object.keys(byAccount).forEach((accountId) => {
              if (playerProfileId && accountId === playerProfileId) return;
              const accountLogs = byAccount[accountId] || {};
              Object.keys(accountLogs).forEach((logId) => {
                const value = accountLogs[logId] || {};
                const sourceSessionId = (value.sessionId || "").toString();
                const sourcePlayerId = (value.sourcePlayerId || "").toString();
                const sourceAccountId = (value.accountId || "").toString();
                if (sourceSessionId && sourceSessionId === playerSessionId) return;
                if (sourcePlayerId && sourcePlayerId === playerId) return;
                if (playerProfileId && sourceAccountId && sourceAccountId === playerProfileId) return;
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
          network.handlers.forceReload = (snapshot) => {
            const value = snapshot.val() || {};
            const eventId = (value.id || "").toString();
            if (!eventId) return;
            if (eventId === lastHandledForceReloadEventId) return;
            const markerId = loadForceReloadMarker();
            if (markerId && markerId === eventId) {
              lastHandledForceReloadEventId = eventId;
              return;
            }
            const createdAt = Number(value.createdAt) || 0;
            if (createdAt > 0 && playerSessionStartedAt > 0 && createdAt <= playerSessionStartedAt) {
              lastHandledForceReloadEventId = eventId;
              saveForceReloadMarker(eventId);
              return;
            }
            lastHandledForceReloadEventId = eventId;
            saveForceReloadMarker(eventId);
            const assetVersion = (value.assetVersion || "").toString().trim();
            addClientLog("Global reload requested by @" + ((value.actorUsername || "owner").toString().slice(0, 20)) + ". Hard reloading" + (assetVersion ? " (v=" + assetVersion + ")" : "") + "...");
            showUpdatingOverlay();
            setTimeout(() => {
              hardReloadClient(assetVersion);
            }, 2200);
          };
          network.handlers.announcement = (snapshot) => {
            const value = snapshot.val() || {};
            const eventId = (value.id || "").toString();
            if (!eventId || eventId === lastHandledAnnouncementEventId) return;
            const createdAt = Number(value.createdAt) || 0;
            if (createdAt > 0 && playerSessionStartedAt > 0 && createdAt <= playerSessionStartedAt) {
              lastHandledAnnouncementEventId = eventId;
              return;
            }
            lastHandledAnnouncementEventId = eventId;
            const actor = (value.actorUsername || "admin").toString().slice(0, 20);
            const text = (value.text || "").toString().slice(0, 140);
            if (!text) return;
            showAnnouncementPopup("@" + actor + ": " + text);
          };
          network.handlers.adminAccounts = (snapshot) => {
            adminState.accounts = snapshot.val() || {};
            renderAdminPanelFromLiveUpdate();
          };
          network.handlers.adminUsernames = (snapshot) => {
            adminState.usernames = snapshot.val() || {};
            renderAdminPanelFromLiveUpdate();
          };
          network.handlers.adminRoles = (snapshot) => {
            adminState.roles = snapshot.val() || {};
            refreshAdminCapabilities();
            renderAdminPanelFromLiveUpdate();
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
            if (!isAdminOpen) {
              refreshAuditActionFilterOptions();
            }
            renderAdminPanelFromLiveUpdate();
          };
          network.handlers.adminBans = (snapshot) => {
            adminState.bans = snapshot.val() || {};
            renderAdminPanelFromLiveUpdate();
          };
          network.handlers.adminSessions = (snapshot) => {
            adminState.sessions = snapshot.val() || {};
            renderAdminPanelFromLiveUpdate();
          };
          network.handlers.adminInventories = (snapshot) => {
            adminState.inventories = snapshot.val() || {};
            renderAdminPanelFromLiveUpdate();
          };

          network.connectedRef.on("value", network.handlers.connected);
          network.inventoryRef.on("value", network.handlers.inventory);
          network.mySessionRef.on("value", network.handlers.mySession);
          network.myCommandRef.on("value", network.handlers.myCommand);
          network.myTradeRequestRef.on("value", network.handlers.myTradeRequest);
          network.myTradeResponseRef.on("value", network.handlers.myTradeResponse);
          network.myActiveTradeRef.on("value", network.handlers.myActiveTrade);
          network.worldsIndexRef.on("value", network.handlers.worldsIndex);
          network.globalPlayersRef.on("value", network.handlers.globalPlayers);
          network.myBanRef.on("value", network.handlers.myBan);
          network.forceReloadRef.on("value", network.handlers.forceReload);
          network.announcementRef.on("value", network.handlers.announcement);
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

      function createInventorySection(title, subtitle) {
        const section = document.createElement("section");
        section.className = "inventory-section";
        const head = document.createElement("div");
        head.className = "inventory-section-head";
        const titleEl = document.createElement("strong");
        titleEl.textContent = title;
        const subtitleEl = document.createElement("span");
        subtitleEl.textContent = subtitle || "";
        head.appendChild(titleEl);
        head.appendChild(subtitleEl);
        const grid = document.createElement("div");
        grid.className = "inventory-grid";
        section.appendChild(head);
        section.appendChild(grid);
        return { section, grid };
      }

      function createIconChip(baseColor, label, extraClass, faIconClass, imageSrc) {
        const icon = document.createElement("div");
        icon.className = "item-icon " + (extraClass || "");
        if (baseColor) icon.style.setProperty("--chip-color", baseColor);
        const fallbackLabel = document.createElement("span");
        fallbackLabel.className = "item-icon-fallback-label";
        fallbackLabel.textContent = label || "";
        icon.appendChild(fallbackLabel);
        if (faIconClass) {
          const fallbackIcon = document.createElement("i");
          fallbackIcon.className = "item-icon-fallback-icon " + faIconClass;
          icon.appendChild(fallbackIcon);
        }
        if (imageSrc) {
          const img = document.createElement("img");
          img.className = "item-icon-image";
          img.alt = "";
          img.loading = "lazy";
          img.decoding = "async";
          img.addEventListener("load", () => {
            icon.classList.add("image-ready");
          });
          img.addEventListener("error", () => {
            icon.classList.remove("image-ready");
            img.remove();
          });
          img.src = imageSrc;
          icon.appendChild(img);
          return icon;
        }
        return icon;
      }

      function createInventorySlot(opts) {
        const slot = document.createElement("button");
        slot.type = "button";
        slot.className = "inventory-slot" + (opts.selected ? " selected" : "") + (opts.muted ? " muted" : "") + (opts.variant ? " " + opts.variant : "");
        slot.title = opts.title || "";
        const key = document.createElement("span");
        key.className = "slot-key";
        key.textContent = opts.keyLabel || "";
        const icon = createIconChip(opts.color, opts.iconLabel, opts.iconClass, opts.faIconClass, opts.imageSrc);
        const name = document.createElement("span");
        name.className = "slot-name";
        name.textContent = opts.name || "";
        slot.appendChild(key);
        slot.appendChild(icon);
        slot.appendChild(name);
        if (opts.countText) {
          const count = document.createElement("span");
          count.className = "slot-count";
          count.textContent = opts.countText;
          slot.appendChild(count);
        }
        if (opts.badgeText) {
          const badge = document.createElement("span");
          badge.className = "slot-badge";
          badge.textContent = opts.badgeText;
          slot.appendChild(badge);
        }
        if (typeof opts.onClick === "function") {
          slot.addEventListener("click", opts.onClick);
        }
        return slot;
      }

      function refreshToolbar() {
        toolbar.innerHTML = "";
        const blockSection = createInventorySection("Blocks & Tools", "Click to select (1: Fist, 2: Wrench)");
        const cosmeticEntries = [];
        for (let i = 0; i < slotOrder.length; i++) {
          const id = slotOrder[i];
          const isFist = id === TOOL_FIST;
          const isWrench = id === TOOL_WRENCH;
          const isTool = isFist || isWrench;
          if (!isTool && Math.max(0, Number(inventory[id]) || 0) <= 0) continue;
          const blockDef = isTool ? null : blockDefs[id];
          const title = isFist ? "Fist" : (isWrench ? "Wrench" : (blockDef && blockDef.name ? blockDef.name : "Block"));
          const slotEl = createInventorySlot({
            selected: i === selectedSlot,
            variant: "inventory-slot-block",
            title: title + (isTool ? "" : " (x" + (inventory[id] || 0) + ")"),
            keyLabel: isFist ? "1" : (isWrench ? "2" : ""),
            color: isFist ? "#c59b81" : (isWrench ? "#90a4ae" : (blockDef && blockDef.color ? blockDef.color : "#999")),
            iconClass: isTool ? "icon-fist" : "icon-block",
            faIconClass: isFist ? "fa-solid fa-hand-fist" : (isWrench ? "fa-solid fa-screwdriver-wrench" : (blockDef && blockDef.faIcon ? blockDef.faIcon : "")),
            imageSrc: !isTool && blockDef && blockDef.imagePath ? blockDef.imagePath : "",
            iconLabel: isFist ? "F" : (isWrench ? "W" : ((blockDef && blockDef.icon) || title.slice(0, 2).toUpperCase())),
            name: title,
            countText: isTool ? "" : "x" + (inventory[id] || 0),
            onClick: () => {
              if (!isTool) {
                const ctrl = getVendingController();
                if (ctrl && typeof ctrl.handleInventoryPick === "function") {
                  if (ctrl.handleInventoryPick({ type: "block", blockId: id })) {
                    return;
                  }
                }
              }
              selectedSlot = i;
              refreshToolbar();
            }
          });
          blockSection.grid.appendChild(slotEl);
        }
        toolbar.appendChild(blockSection.section);
        for (const item of COSMETIC_ITEMS) {
          const count = Math.max(0, Number(cosmeticInventory[item.id]) || 0);
          if (count <= 0) continue;
          cosmeticEntries.push({ ...item, count });
        }
        if (cosmeticEntries.length > 0) {
          cosmeticEntries.sort((a, b) => {
            const slotDiff = COSMETIC_SLOTS.indexOf(a.slot) - COSMETIC_SLOTS.indexOf(b.slot);
            if (slotDiff !== 0) return slotDiff;
            return a.name.localeCompare(b.name);
          });
          const equippedCount = COSMETIC_SLOTS.reduce((sum, slot) => sum + (equippedCosmetics[slot] ? 1 : 0), 0);
          const cosmeticSection = createInventorySection("Cosmetics", equippedCount + " equipped");
          for (const item of cosmeticEntries) {
            const equipped = equippedCosmetics[item.slot] === item.id;
            const slotEl = createInventorySlot({
              selected: equipped,
              variant: "inventory-slot-cosmetic",
              title: item.slot + " | " + item.name + " | x" + item.count,
              keyLabel: item.slot.slice(0, 2).toUpperCase(),
              color: item.color || "#8aa0b5",
              iconClass: "icon-cosmetic icon-" + item.slot,
              faIconClass: item.faIcon || "",
              imageSrc: item.imagePath || "",
              iconLabel: item.icon || item.name.slice(0, 2).toUpperCase(),
              name: item.name,
              countText: "x" + item.count,
              badgeText: equipped ? "E" : "",
              onClick: () => {
                const ctrl = getVendingController();
                if (ctrl && typeof ctrl.handleInventoryPick === "function") {
                  if (ctrl.handleInventoryPick({ type: "cosmetic", cosmeticId: item.id })) {
                    return;
                  }
                }
                equipCosmetic(item.slot, item.id);
              }
            });
            cosmeticSection.grid.appendChild(slotEl);
          }
          toolbar.appendChild(cosmeticSection.section);
        }
      }

      function canvasPointFromClient(clientX, clientY) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (clientX - rect.left) * scaleX;
        const y = (clientY - rect.top) * scaleY;
        return { x, y };
      }

      function worldFromClient(clientX, clientY) {
        const point = canvasPointFromClient(clientX, clientY);
        const zoom = Math.max(0.01, cameraZoom);
        const x = point.x / zoom + cameraX;
        const y = point.y / zoom + cameraY;
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

      function applyToolbarPosition() {
        toolbar.style.transform = "none";
      }

      function clampPanelWidths(leftValue, rightValue) {
        const viewportWidth = Math.max(980, window.innerWidth || 0);
        const centerMin = viewportWidth < 1220 ? 700 : 980;
        const maxByRatio = Math.floor(viewportWidth * DESKTOP_PANEL_MAX_RATIO);
        let left = Math.max(DESKTOP_PANEL_MIN, Math.min(maxByRatio, Math.round(Number(leftValue) || DESKTOP_PANEL_LEFT_DEFAULT)));
        let right = Math.max(DESKTOP_PANEL_MIN, Math.min(maxByRatio, Math.round(Number(rightValue) || DESKTOP_PANEL_RIGHT_DEFAULT)));
        const edgePadding = 40;
        let centerWidth = viewportWidth - left - right - edgePadding;
        if (centerWidth < centerMin) {
          let deficit = centerMin - centerWidth;
          const leftSlack = Math.max(0, left - DESKTOP_PANEL_MIN);
          const rightSlack = Math.max(0, right - DESKTOP_PANEL_MIN);
          const totalSlack = leftSlack + rightSlack;
          if (totalSlack > 0) {
            const leftCut = Math.min(leftSlack, Math.round(deficit * (leftSlack / totalSlack)));
            left -= leftCut;
            deficit -= leftCut;
            const rightCut = Math.min(rightSlack, deficit);
            right -= rightCut;
          }
        }
        return {
          left: Math.max(DESKTOP_PANEL_MIN, left),
          right: Math.max(DESKTOP_PANEL_MIN, right)
        };
      }

      function applyDesktopPanelLayout(leftValue, rightValue, persist) {
        const next = clampPanelWidths(leftValue, rightValue);
        desktopLeftPanelWidth = next.left;
        desktopRightPanelWidth = next.right;
        document.documentElement.style.setProperty("--left-panel-w", desktopLeftPanelWidth + "px");
        document.documentElement.style.setProperty("--right-panel-w", desktopRightPanelWidth + "px");
        if (persist) {
          try {
            localStorage.setItem(LAYOUT_PREFS_KEY, JSON.stringify({
              left: desktopLeftPanelWidth,
              right: desktopRightPanelWidth
            }));
          } catch (error) {
            // ignore localStorage failures
          }
        }
      }

      function loadDesktopPanelLayout() {
        let savedLeft = DESKTOP_PANEL_LEFT_DEFAULT;
        let savedRight = DESKTOP_PANEL_RIGHT_DEFAULT;
        try {
          const raw = localStorage.getItem(LAYOUT_PREFS_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            savedLeft = Number(parsed && parsed.left);
            savedRight = Number(parsed && parsed.right);
          }
        } catch (error) {
          // ignore parse failures
        }
        applyDesktopPanelLayout(savedLeft, savedRight, false);
      }

      function setLayoutResizeHandlesVisible() {
        const desktopMode = !isCoarsePointer;
        if (leftPanelResizeHandleEl) leftPanelResizeHandleEl.classList.toggle("hidden", !desktopMode);
        if (rightPanelResizeHandleEl) rightPanelResizeHandleEl.classList.toggle("hidden", !desktopMode);
      }

      function onLayoutResizeMove(event) {
        if (!layoutResizeSide || isCoarsePointer) return;
        const clientX = Number(event.clientX);
        if (!Number.isFinite(clientX)) return;
        const viewportWidth = Math.max(980, window.innerWidth || 0);
        if (layoutResizeSide === "left") {
          const nextLeft = clientX - 12;
          applyDesktopPanelLayout(nextLeft, desktopRightPanelWidth, true);
        } else if (layoutResizeSide === "right") {
          const nextRight = viewportWidth - clientX - 12;
          applyDesktopPanelLayout(desktopLeftPanelWidth, nextRight, true);
        }
        resizeCanvas();
      }

      function onLayoutResizeEnd() {
        if (!layoutResizeSide) return;
        layoutResizeSide = "";
        document.body.classList.remove("layout-resizing");
      }

      function initDesktopLayoutResize() {
        loadDesktopPanelLayout();
        setLayoutResizeHandlesVisible();
        const bindHandle = (handle, side) => {
          if (!handle) return;
          handle.addEventListener("pointerdown", (event) => {
            if (isCoarsePointer) return;
            if (typeof event.button === "number" && event.button !== 0) return;
            layoutResizeSide = side;
            document.body.classList.add("layout-resizing");
            event.preventDefault();
          });
        };
        bindHandle(leftPanelResizeHandleEl, "left");
        bindHandle(rightPanelResizeHandleEl, "right");
        window.addEventListener("pointermove", onLayoutResizeMove, { passive: true });
        window.addEventListener("pointerup", onLayoutResizeEnd);
        window.addEventListener("pointercancel", onLayoutResizeEnd);
        resizeCanvas();
      }

      function resizeCanvas() {
        const wrap = canvas.parentElement;
        const rect = wrap.getBoundingClientRect();
        isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
        const measuredWidth = Math.floor(rect.width);
        const measuredHeight = Math.floor(rect.height);
        const targetWidth = Math.max(1, measuredWidth || canvas.clientWidth || canvas.width || 1);
        const targetHeight = Math.max(1, measuredHeight || canvas.clientHeight || canvas.height || 1);
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        canvas.style.width = targetWidth + "px";
        canvas.style.height = targetHeight + "px";
        ctx.imageSmoothingEnabled = false;
        ctx.textBaseline = "alphabetic";
        mobileControlsEl.classList.toggle("hidden", !inWorld || !isCoarsePointer);
        setLayoutResizeHandlesVisible();
        if (!isCoarsePointer) {
          applyDesktopPanelLayout(desktopLeftPanelWidth, desktopRightPanelWidth, false);
        }
        applyToolbarPosition();
      }

      window.addEventListener("resize", resizeCanvas);
      resizeCanvas();
      initDesktopLayoutResize();

      window.addEventListener("keydown", (e) => {
        const activeEl = document.activeElement;
        const isTypingContext = Boolean(
          activeEl &&
          (
            activeEl.tagName === "INPUT" ||
            activeEl.tagName === "TEXTAREA" ||
            activeEl.tagName === "SELECT" ||
            activeEl.isContentEditable
          )
        );
        if (e.key === "Escape" && vendingModalEl && !vendingModalEl.classList.contains("hidden")) {
          e.preventDefault();
          closeVendingModal();
          return;
        }
        if (e.key === "Escape" && signModalEl && !signModalEl.classList.contains("hidden")) {
          e.preventDefault();
          closeSignModal();
          return;
        }
        if (e.key === "Escape" && worldLockModalEl && !worldLockModalEl.classList.contains("hidden")) {
          e.preventDefault();
          closeWorldLockModal();
          return;
        }
        if (e.key === "Escape" && doorModalEl && !doorModalEl.classList.contains("hidden")) {
          e.preventDefault();
          closeDoorModal();
          return;
        }
        if (e.key === "Escape" && weatherModalEl && !weatherModalEl.classList.contains("hidden")) {
          e.preventDefault();
          closeWeatherModal();
          return;
        }
        if (e.key === "Escape" && tradeMenuModalEl && !tradeMenuModalEl.classList.contains("hidden")) {
          e.preventDefault();
          closeTradeMenuModal();
          return;
        }
        if (e.key === "Escape" && tradeRequestModalEl && !tradeRequestModalEl.classList.contains("hidden")) {
          e.preventDefault();
          respondToTradeRequest(false);
          return;
        }
        const tradePanelEl = document.getElementById("tradePanelModal");
        if (e.key === "Escape" && tradePanelEl && !tradePanelEl.classList.contains("hidden")) {
          e.preventDefault();
          closeTradeMenuModal();
          return;
        }
        if (e.key === "Escape" && adminInventoryModalEl && !adminInventoryModalEl.classList.contains("hidden")) {
          e.preventDefault();
          closeAdminInventoryModal();
          return;
        }
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
          if (performance.now() < suppressChatOpenUntilMs) return;
          if (document.activeElement === chatInputEl) return;
          e.preventDefault();
          setChatOpen(true);
          return;
        }
        if (isChatOpen && document.activeElement === chatInputEl) {
          return;
        }
        if (!isTypingContext && e.code.startsWith("Digit")) {
          if (e.code === "Digit1") {
            selectedSlot = 0;
            refreshToolbar();
          } else if (e.code === "Digit2") {
            selectedSlot = 1;
            refreshToolbar();
          }
        }
        if (!isTypingContext && inWorld) {
          if (e.code === "KeyQ") {
            e.preventDefault();
            dropSelectedInventoryItem();
            return;
          }
          if (e.key === "+" || e.key === "=" || e.code === "NumpadAdd") {
            e.preventDefault();
            changeCameraZoom(CAMERA_ZOOM_STEP);
            return;
          }
          if (e.key === "-" || e.key === "_" || e.code === "NumpadSubtract") {
            e.preventDefault();
            changeCameraZoom(-CAMERA_ZOOM_STEP);
            return;
          }
          if (e.key === "0" || e.code === "Numpad0") {
            e.preventDefault();
            setCameraZoom(1, true);
            return;
          }
        }

        if (isTypingContext) {
          return;
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

      canvas.addEventListener("wheel", (e) => {
        if (!inWorld) return;
        if (e.ctrlKey) return;
        e.preventDefault();
        changeCameraZoom(e.deltaY < 0 ? CAMERA_ZOOM_STEP : -CAMERA_ZOOM_STEP);
      }, { passive: false });

      canvas.addEventListener("mousedown", (e) => {
        if (!inWorld) return;
        if (e.button === 0 && openWrenchMenuFromNameIcon(e.clientX, e.clientY)) return;
        const pos = worldFromPointer(e);
        mouseWorld = pos;
        if (e.button === 0) {
          useActionAt(pos.tx, pos.ty);
          return;
        }
        if (e.button === 2) {
          useSecondaryActionAt(pos.tx, pos.ty);
        }
      });

      canvas.addEventListener("touchstart", (e) => {
        if (!inWorld) return;
        e.preventDefault();
        const touch = e.changedTouches[0];
        if (!touch) return;
        if (openWrenchMenuFromNameIcon(touch.clientX, touch.clientY)) return;
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
            updateWorldDrops();
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
