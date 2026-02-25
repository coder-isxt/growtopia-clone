    (() => {
      const authScreenEl = document.getElementById("authScreen");
      const gameShellEl = document.getElementById("gameShell");
      const authUsernameEl = document.getElementById("authUsername");
      const authPasswordEl = document.getElementById("authPassword");
      const authCreateBtn = document.getElementById("authCreateBtn");
      const authLoginBtn = document.getElementById("authLoginBtn");
      const authStatusEl = document.getElementById("authStatus");
      const authMainNoticeEl = document.getElementById("authMainNotice");
      const canvas = document.getElementById("game");
      const ctx = canvas.getContext("2d");
      const toolbar = document.getElementById("toolbar");
      const leftPanelResizeHandleEl = document.getElementById("leftPanelResizeHandle");
      const rightPanelResizeHandleEl = document.getElementById("rightPanelResizeHandle");
      const canvasWrapEl = document.getElementById("canvasWrap");
      const menuScreenEl = document.getElementById("menuScreen");
      const menuMainNoticeEl = document.getElementById("menuMainNotice");
      const mobileControlsEl = document.getElementById("mobileControls");
      const mobileLeftBtn = document.getElementById("mobileLeftBtn");
      const mobileRightBtn = document.getElementById("mobileRightBtn");
      const mobileJumpBtn = document.getElementById("mobileJumpBtn");
      const mobilePrimaryBtn = document.getElementById("mobilePrimaryBtn");
      const mobileSecondaryBtn = document.getElementById("mobileSecondaryBtn");
      const mobileFistBtn = document.getElementById("mobileFistBtn");
      const mobileWrenchBtn = document.getElementById("mobileWrenchBtn");
      const mobilePlayModeBtn = document.getElementById("mobilePlayModeBtn");
      const mobileChatBtn = document.getElementById("mobileChatBtn");
      const mobileInventoryBtn = document.getElementById("mobileInventoryBtn");
      const mobileExitBtn = document.getElementById("mobileExitBtn");
      const networkStateEl = document.getElementById("networkState");
      const gemsCountEl = document.getElementById("gemsCount");
      const onlineCountEl = document.getElementById("onlineCount");
      const totalOnlineCountEl = document.getElementById("totalOnlineCount");
      const currentWorldLabelEl = document.getElementById("currentWorldLabel");
      const worldButtonsEl = document.getElementById("worldButtons");
      const worldInputEl = document.getElementById("worldInput");
      const enterWorldBtn = document.getElementById("enterWorldBtn");
      const chatToggleBtn = document.getElementById("chatToggleBtn");
      const friendsToggleBtn = document.getElementById("friendsToggleBtn");
      const titlesToggleBtn = document.getElementById("titlesToggleBtn");
      const questsToggleBtn = document.getElementById("questsToggleBtn");
      const achievementsToggleBtn = document.getElementById("achievementsToggleBtn");
      const shopToggleBtn = document.getElementById("shopToggleBtn");
      const adminToggleBtn = document.getElementById("adminToggleBtn");
      const respawnBtn = document.getElementById("respawnBtn");
      const adminPanelEl = document.getElementById("adminPanel");
      const adminSearchInput = document.getElementById("adminSearchInput");
      const adminAuditActionFilterEl = document.getElementById("adminAuditActionFilter");
      const adminAuditActorFilterEl = document.getElementById("adminAuditActorFilter");
      const adminAuditTargetFilterEl = document.getElementById("adminAuditTargetFilter");
      const adminForceReloadBtn = document.getElementById("adminForceReloadBtn");
      const adminBackupDownloadBtn = document.getElementById("adminBackupDownloadBtn");
      const adminBackupUploadBtn = document.getElementById("adminBackupUploadBtn");
      const adminBackupUploadInput = document.getElementById("adminBackupUploadInput");
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
      const donationModalEl = document.getElementById("donationModal");
      const donationTitleEl = document.getElementById("donationTitle");
      const donationBodyEl = document.getElementById("donationBody");
      const donationActionsEl = document.getElementById("donationActions");
      const donationCloseBtn = document.getElementById("donationCloseBtn");
      const chestModalEl = document.getElementById("chestModal");
      const chestTitleEl = document.getElementById("chestTitle");
      const chestBodyEl = document.getElementById("chestBody");
      const chestActionsEl = document.getElementById("chestActions");
      const chestCloseBtn = document.getElementById("chestCloseBtn");
      const gambleModalEl = document.getElementById("gambleModal");
      const gambleTitleEl = document.getElementById("gambleTitle");
      const gambleBodyEl = document.getElementById("gambleBody");
      const gambleActionsEl = document.getElementById("gambleActions");
      const gambleCloseBtn = document.getElementById("gambleCloseBtn");
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
      const profileModalEl = document.getElementById("profileModal");
      const profileTitleEl = document.getElementById("profileTitle");
      const profileBodyEl = document.getElementById("profileBody");
      const profileActionsEl = document.getElementById("profileActions");
      const profileCloseBtn = document.getElementById("profileCloseBtn");
      const friendsModalEl = document.getElementById("friendsModal");
      const friendsTitleEl = document.getElementById("friendsTitle");
      const friendsBodyEl = document.getElementById("friendsBody");
      const friendsActionsEl = document.getElementById("friendsActions");
      const friendsCloseBtn = document.getElementById("friendsCloseBtn");
      const titlesModalEl = document.getElementById("titlesModal");
      const titlesTitleEl = document.getElementById("titlesTitle");
      const titlesBodyEl = document.getElementById("titlesBody");
      const titlesActionsEl = document.getElementById("titlesActions");
      const titlesCloseBtn = document.getElementById("titlesCloseBtn");
      const achievementsModalEl = document.getElementById("achievementsModal");
      const achievementsTitleEl = document.getElementById("achievementsTitle");
      const achievementsBodyEl = document.getElementById("achievementsBody");
      const achievementsActionsEl = document.getElementById("achievementsActions");
      const achievementsCloseBtn = document.getElementById("achievementsCloseBtn");
      const questsModalEl = document.getElementById("questsModal");
      const questsTitleEl = document.getElementById("questsTitle");
      const questsBodyEl = document.getElementById("questsBody");
      const questsActionsEl = document.getElementById("questsActions");
      const questsCloseBtn = document.getElementById("questsCloseBtn");
      const worldLockModalEl = document.getElementById("worldLockModal");
      const worldLockTitleEl = document.getElementById("worldLockTitle");
      const worldLockAdminInputEl = document.getElementById("worldLockAdminInput");
      const worldLockAdminAddBtn = document.getElementById("worldLockAdminAddBtn");
      const worldLockAdminsEl = document.getElementById("worldLockAdmins");
      const worldLockBanInputEl = document.getElementById("worldLockBanInput");
      const worldLockBan1hBtn = document.getElementById("worldLockBan1hBtn");
      const worldLockBanPermBtn = document.getElementById("worldLockBanPermBtn");
      const worldLockBansEl = document.getElementById("worldLockBans");
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

      function ensureGambleModalDom() {
        if (document.getElementById("gambleModal")) return;
        const host = document.getElementById("gameShell") || document.body;
        if (!host) return;
        const wrap = document.createElement("div");
        wrap.innerHTML =
          '<div id="gambleModal" class="vending-modal hidden">' +
            '<div class="vending-card sign-card">' +
              '<div class="vending-header">' +
                '<strong id="gambleTitle">Gambling Machine</strong>' +
                '<button id="gambleCloseBtn" type="button">Close</button>' +
              '</div>' +
              '<div id="gambleBody" class="vending-body"></div>' +
              '<div id="gambleActions" class="vending-actions"></div>' +
            '</div>' +
          '</div>';
        if (wrap.firstElementChild) host.appendChild(wrap.firstElementChild);
      }
      ensureGambleModalDom();

      const modules = window.GTModules || {};
      const adminModule = modules.admin || {};
      const blocksModule = modules.blocks || {};
      const farmablesModule = modules.farmables || {};
      const seedsModule = modules.seeds || {};
      const plantsModule = modules.plants || {};
      const gemsModule = modules.gems || {};
      const rewardsModule = modules.rewards || {};
      const texturesModule = modules.textures || {};
      const blockKeysModule = modules.blockKeys || {};
      const itemsModule = modules.items || {};
      const cosmeticsModule = modules.cosmetics || {};
      const playerModule = modules.player || {};
      const authStorageModule = modules.authStorage || {};
      const dbModule = modules.db || {};
      const worldModule = modules.world || {};
      const physicsModule = modules.physics || {};
      const animationsModule = modules.animations || {};
      const particlesModule = modules.particles || {};
      const drawUtilsModule = modules.drawUtils || {};
      const inputUtilsModule = modules.inputUtils || {};
      const syncPlayerModule = modules.syncPlayer || {};
      const syncBlocksModule = modules.syncBlocks || {};
      const syncWorldsModule = modules.syncWorlds || {};
      const syncHitsModule = modules.syncHits || {};
      const commandsModule = modules.commands || {};
      const chatModule = modules.chat || {};
      const menuModule = modules.menu || {};
      const messagesModule = modules.messages || {};
      const anticheatModule = modules.anticheat || {};
      const progressionModule = modules.progression || {};
      const achievementsModule = modules.achievements || {};
      const questsModule = modules.quests || {};
      const gachaModule = modules.gacha || {};
      const backupModule = modules.backup || {};
      const vendingModule = modules.vending || {};
      const donationModule = modules.donation || {};
      const chestModule = modules.chest || {};
      const friendsModule = modules.friends || {};
      const tradeModule = modules.trade || {};
      const shopModule = modules.shop || {};
      const signModule = modules.sign || {};
      const gambleModule = modules.gambling || modules.gamble || {};

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
      const adminRoleConfig = typeof adminModule.createRoleConfig === "function"
        ? adminModule.createRoleConfig(SETTINGS)
        : {
            roleRank: { none: 0, moderator: 1, admin: 2, manager: 3, owner: 4 },
            permissions: {
              owner: ["panel_open", "view_logs", "view_audit", "clear_logs", "force_reload", "db_backup", "db_restore", "setrole", "tempban", "permban", "unban", "kick", "resetinv", "givex", "give_block", "give_item", "give_title", "remove_title", "tp", "reach", "bring", "summon", "freeze", "unfreeze", "godmode", "clearworld", "announce", "announce_user"],
              manager: ["panel_open", "view_logs", "view_audit", "clear_logs", "setrole_limited", "tempban", "permban", "unban", "kick", "resetinv", "givex", "give_block", "give_item", "give_title", "remove_title", "tp", "reach", "bring", "summon", "freeze", "unfreeze", "godmode", "clearworld", "announce", "announce_user"],
              admin: ["panel_open", "view_logs", "view_audit", "kick", "resetinv", "givex", "give_block", "give_item", "give_title", "remove_title", "tp", "reach", "bring", "summon", "freeze", "unfreeze", "godmode", "clearworld", "announce", "announce_user"],
              moderator: ["panel_open", "kick", "tp", "reach", "bring", "summon", "announce", "announce_user"],
              none: []
            },
            commandCooldownsMs: SETTINGS.ADMIN_COMMAND_COOLDOWNS_MS && typeof SETTINGS.ADMIN_COMMAND_COOLDOWNS_MS === "object"
              ? SETTINGS.ADMIN_COMMAND_COOLDOWNS_MS
              : {
                  owner: {},
                  manager: { tempban: 2000, permban: 2000, unban: 1000, kick: 700, give_block: 600, give_item: 600, givetitle: 600, removetitle: 600, tp: 300, reach: 500, bring: 700, summon: 700, setrole: 2000, freeze: 700, unfreeze: 700, godmode: 700, clearworld: 2500, announce: 500, announce_user: 500 },
                  admin: { kick: 900, give_block: 900, give_item: 900, givetitle: 900, removetitle: 900, tp: 400, reach: 600, bring: 900, summon: 900, freeze: 900, unfreeze: 900, godmode: 900, clearworld: 3000, announce: 700, announce_user: 700 },
                  moderator: { kick: 1200, tp: 600, reach: 900, bring: 1200, summon: 1200, announce: 900, announce_user: 900 },
                  none: {}
                },
            roleByUsername: SETTINGS.ADMIN_ROLE_BY_USERNAME && typeof SETTINGS.ADMIN_ROLE_BY_USERNAME === "object" ? SETTINGS.ADMIN_ROLE_BY_USERNAME : {},
            adminUsernames: Array.isArray(SETTINGS.ADMIN_USERNAMES) ? SETTINGS.ADMIN_USERNAMES : ["isxt"]
          };
      const JUMP_COOLDOWN_MS = Number(SETTINGS.JUMP_COOLDOWN_MS) || 200;
      const PLAYER_SYNC_MIN_MS = Math.max(25, Number(SETTINGS.PLAYER_SYNC_MIN_MS) || 60);
      const GLOBAL_SYNC_MIN_MS = Math.max(PLAYER_SYNC_MIN_MS, Number(SETTINGS.GLOBAL_SYNC_MIN_MS) || 170);
      const LAYOUT_PREFS_KEY = "gt_layout_panels_v3";
      const DESKTOP_PANEL_LEFT_DEFAULT = 302;
      const DESKTOP_PANEL_RIGHT_DEFAULT = 375;
      const DESKTOP_PANEL_MIN = 140;
      const DESKTOP_PANEL_MAX_RATIO = 0.26;
      const MOVE_ACCEL = Number(SETTINGS.MOVE_ACCEL) || 0.46;
      const JUMP_VELOCITY = Number(SETTINGS.JUMP_VELOCITY) || -7.2;
      const MAX_MOVE_SPEED = Number(SETTINGS.MAX_MOVE_SPEED) || 3.7;
      const MAX_FALL_SPEED = Number(SETTINGS.MAX_FALL_SPEED) || 10;
      const WEATHER_PRESET_IMAGES = Array.isArray(SETTINGS.WEATHER_PRESET_IMAGES)
        ? SETTINGS.WEATHER_PRESET_IMAGES
        : [];
      const SAVED_AUTH_KEY = "growtopia_saved_auth_v1";
      const FORCE_RELOAD_MARKER_KEY = "growtopia_force_reload_marker_v1";
      const FORCE_RELOAD_NOTICE_KEY = "growtopia_force_reload_notice_v1";
      const CAMERA_ZOOM_PREF_KEY = "growtopia_camera_zoom_v1";
      const CAMERA_ZOOM_MIN = Math.max(0.5, Number(SETTINGS.CAMERA_ZOOM_MIN) || 0.7);
      const CAMERA_ZOOM_MAX = Math.max(CAMERA_ZOOM_MIN + 0.1, Number(SETTINGS.CAMERA_ZOOM_MAX) || 2.2);
      const CAMERA_ZOOM_STEP = Math.max(0.05, Number(SETTINGS.CAMERA_ZOOM_STEP) || 0.12);

      const baseBlockDefs = typeof blocksModule.getBlockDefs === "function" ? blocksModule.getBlockDefs() : {};
      const farmableBlockDefs = typeof farmablesModule.getFarmableDefs === "function" ? farmablesModule.getFarmableDefs() : {};
      const worldBlockDefs = { ...baseBlockDefs, ...farmableBlockDefs };
      const SPAWN_TILE_X = 8;
      const SPAWN_TILE_Y = 11;
      const SPAWN_DOOR_ID = 7;
      const SPAWN_BASE_ID = 8;
      const SPAWN_MOVER_ID = 40;

      const WORLD_LOCK_ID = 9;
      const DOOR_BLOCK_ID = 10;
      const WATER_ID = 11;
      const PLATFORM_ID = 12;
      const STAIR_BASE_ID = 13;
      const STAIR_ROTATION_IDS = [13, 14, 15, 16];
      const SPIKE_BASE_ID = 33;
      const SPIKE_ROTATION_IDS = [33, 37, 38, 39];
      const VENDING_ID = 17;
      const GAMBLE_ID = 32;
      const SIGN_ID = 18;
      const ANTI_GRAV_ID = 19;
      const CAMERA_ID = 20;
      const WEATHER_MACHINE_ID = 21;
      const DISPLAY_BLOCK_ID = 22;
      const WOOD_PLANK_ID = 23;
      const OBSIDIAN_LOCK_ID = 24;
      const EMERALD_LOCK_ID = 42;
      const DONATION_BOX_ID = 34;
      const STORAGE_CHEST_ID = 36;
      const TREE_YIELD_BLOCK_ID = 4;
      const TREE_GROW_MS = Math.max(5000, Number(SETTINGS.TREE_GROW_MS) || 120000);
      const TREE_STAGE_COUNT = 4;
      const TREE_GEM_MIN = Math.max(0, Math.floor(Number(SETTINGS.TREE_GEM_MIN) || 1));
      const TREE_GEM_MAX = Math.max(TREE_GEM_MIN, Math.floor(Number(SETTINGS.TREE_GEM_MAX) || 4));
      const SEED_DROP_CHANCE = 1 / 8;
      const BREAK_RETURN_ITEM_CHANCE = 1 / 5;
      const PASSIVE_LOCK_AUTOCONVERT = Boolean(SETTINGS.PASSIVE_LOCK_AUTOCONVERT);
      const INVENTORY_ITEM_LIMIT = 300;
      let spawnTileX = SPAWN_TILE_X;
      let spawnTileY = SPAWN_TILE_Y;
      const DEFAULT_EDIT_REACH_TILES = 4.5;
      const MIN_EDIT_REACH_TILES = 1;
      const MAX_EDIT_REACH_TILES = 16;
      const TOOL_FIST = "fist";
      const TOOL_WRENCH = "wrench";
      const farmableRegistry = typeof farmablesModule.createRegistry === "function"
        ? farmablesModule.createRegistry(worldBlockDefs, {})
        : {
            ids: [],
            byId: {},
            isFarmable: () => false,
            rollGems: () => 0,
            getBreakXp: (_id, fallbackXp) => Math.max(1, Math.floor(Number(fallbackXp) || 1))
          };
      const seedRegistry = typeof seedsModule.createSeedRegistry === "function"
        ? seedsModule.createSeedRegistry(worldBlockDefs, {
            growMs: TREE_GROW_MS,
            forceSeedForBlockIds: Array.isArray(farmableRegistry.ids) ? farmableRegistry.ids : []
          })
        : { defs: {}, config: {} };
      const blockDefs = { ...worldBlockDefs, ...(seedRegistry.defs || {}) };
      const LOCK_BLOCK_IDS = (() => {
        const ids = Object.values(blockDefs)
          .filter((def) => def && def.worldLock === true)
          .map((def) => Number(def.id))
          .filter((id) => Number.isInteger(id) && id > 0);
        return ids.length ? ids : [WORLD_LOCK_ID];
      })();
      const LOCK_BLOCK_ID_SET = new Set(LOCK_BLOCK_IDS);
      const LOCK_VALUE_BY_ID = (() => {
        const out = {};
        for (const id of LOCK_BLOCK_IDS) {
          const def = blockDefs[id] || {};
          const value = Math.max(1, Math.floor(Number(def.lockValue) || (id === OBSIDIAN_LOCK_ID ? 100 : 1)));
          out[id] = value;
        }
        return out;
      })();
      const LOCK_CURRENCY_DEFS = LOCK_BLOCK_IDS
        .map((id) => ({
          id,
          value: Math.max(1, Math.floor(Number(LOCK_VALUE_BY_ID[id]) || 1)),
          autoConvert: Boolean((blockDefs[id] || {}).lockAutoConvert !== false)
        }))
        .sort((a, b) => a.value - b.value);
      const PLANT_SEED_CONFIG = seedRegistry && seedRegistry.config && typeof seedRegistry.config === "object"
        ? seedRegistry.config
        : {};
      const PLANT_SEED_IDS = Object.keys(PLANT_SEED_CONFIG).map((id) => Number(id)).filter((id) => Number.isInteger(id));
      const PLANT_SEED_ID_SET = new Set(PLANT_SEED_IDS);
      const SEED_DROP_BY_BLOCK_ID = (() => {
        const out = {};
        for (const seedId of PLANT_SEED_IDS) {
          const cfg = PLANT_SEED_CONFIG[seedId] || {};
          const sourceId = Math.max(0, Math.floor(Number(cfg.dropFromBlockId) || 0));
          if (sourceId > 0) out[sourceId] = seedId;
        }
        return out;
      })();
      const INVENTORY_IDS = Object.keys(blockDefs)
        .map((id) => Math.floor(Number(id)))
        .filter((id) => Number.isInteger(id) && id > 0)
        .sort((a, b) => a - b);
      const SEED_INVENTORY_IDS = INVENTORY_IDS.filter((id) => PLANT_SEED_ID_SET.has(id));
      const BLOCK_ONLY_INVENTORY_IDS = INVENTORY_IDS.filter((id) => !PLANT_SEED_ID_SET.has(id));
      const FARMABLE_INVENTORY_IDS = BLOCK_ONLY_INVENTORY_IDS.filter((id) => farmableRegistry.isFarmable(id));
      const NORMAL_BLOCK_INVENTORY_IDS = BLOCK_ONLY_INVENTORY_IDS.filter((id) => !FARMABLE_INVENTORY_IDS.includes(id));
      const slotOrder = [TOOL_FIST, TOOL_WRENCH].concat(INVENTORY_IDS);
      const cosmeticBundle = typeof cosmeticsModule.buildCatalog === "function"
        ? cosmeticsModule.buildCatalog(itemsModule)
        : {
            slots: ["shirts", "pants", "shoes", "hats", "wings", "swords"],
            lookup: {},
            items: []
          };
      const COSMETIC_SLOTS = Array.isArray(cosmeticBundle.slots) ? cosmeticBundle.slots : ["shirts", "pants", "shoes", "hats", "wings", "swords"];
      const blockMaps = typeof blockKeysModule.buildMaps === "function"
        ? blockKeysModule.buildMaps(blockDefs)
        : { idToKey: {}, keyToId: {} };
      if (typeof texturesModule.applyDefaultBlockTextures === "function") {
        texturesModule.applyDefaultBlockTextures(blockDefs);
      }
      const BLOCK_ID_TO_KEY = blockMaps.idToKey || {};
      const BLOCK_KEY_TO_ID = blockMaps.keyToId || {};
      const COSMETIC_LOOKUP = cosmeticBundle.lookup && typeof cosmeticBundle.lookup === "object" ? cosmeticBundle.lookup : {};
      const COSMETIC_ITEMS = Array.isArray(cosmeticBundle.items) ? cosmeticBundle.items : [];
      const TITLE_CATALOG = (typeof itemsModule.getTitleCatalog === "function"
        ? itemsModule.getTitleCatalog()
        : [])
        .map((raw) => {
          const row = raw && typeof raw === "object" ? raw : {};
          const styleRaw = row.style && typeof row.style === "object" ? row.style : {};
          return {
            id: String(row.id || "").trim().slice(0, 32),
            name: String(row.name || "").trim().slice(0, 24),
            color: String(row.color || "").trim().slice(0, 24) || "#8fb4ff",
            defaultUnlocked: Boolean(row.defaultUnlocked),
            style: {
              bold: Boolean(styleRaw.bold),
              glow: Boolean(styleRaw.glow),
              rainbow: Boolean(styleRaw.rainbow),
              glowColor: String(styleRaw.glowColor || "").trim().slice(0, 24)
            }
          };
        })
        .filter((row) => row.id && row.name);
      const TITLE_LOOKUP = {};
      for (const title of TITLE_CATALOG) {
        TITLE_LOOKUP[title.id] = title;
      }
      const TITLE_DEFAULT_ID = (TITLE_CATALOG.find((title) => title.defaultUnlocked) || TITLE_CATALOG[0] || {}).id || "";
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
      const inventory = {};
      for (let i = 0; i < INVENTORY_IDS.length; i++) {
        inventory[INVENTORY_IDS[i]] = 0;
      }
      let selectedSlot = 0;
      const keys = {};
      const playerId = "p_" + Math.random().toString(36).slice(2, 10);
      let playerName = "";
      let playerProfileId = "";
      let playerSessionRef = null;
      let playerSessionId = "";
      let playerSessionStartedAt = 0;
      let progressionXp = 0;
      let progressionLevel = 1;
      let progressionXpIntoLevel = 0;
      let progressionXpForNext = 100;
      let progressionSaveTimer = 0;
      let achievementsState = null;
      let achievementsSaveTimer = 0;
      let questsState = null;
      let questsSaveTimer = 0;
      let worldChatStartedAt = 0;
      let desktopLeftPanelWidth = DESKTOP_PANEL_LEFT_DEFAULT;
      let desktopRightPanelWidth = DESKTOP_PANEL_RIGHT_DEFAULT;
      let layoutResizeSide = "";
      let gameBootstrapped = false;
      let pendingTeleportSelf = null;
      let lastHandledTeleportCommandId = "";
      let hasSeenInitialTeleportCommandSnapshot = false;
      let hasSeenInitialSessionSnapshot = false;
      let missingSessionSinceMs = 0;
      let lastHandledReachCommandId = "";
      let lastPrivateMessageFrom = null;
      let worldJoinRequestToken = 0;
      const remotePlayers = new Map();
      const remoteAnimationTracker = typeof animationsModule.createTracker === "function"
        ? animationsModule.createTracker()
        : new Map();
      const remoteHitTracker = typeof syncHitsModule.createRemoteHitTracker === "function"
        ? syncHitsModule.createRemoteHitTracker()
        : new Map();
      const overheadChatByPlayer = new Map();
      const displayItemsByTile = new Map();
      const doorAccessByTile = new Map();
      const antiGravityByTile = new Map();
      const cameraConfigsByTile = new Map();
      const cameraLogsByTile = new Map();
      const localWeatherByWorld = new Map();
      const worldOccupancy = new Map();
      const worldLockOwnerCache = new Map();
      let worldIndexMetaById = {};
      let ownedWorldScanInFlight = false;
      let ownedWorldScanToken = 0;
      let vendingController = null;
      let gambleController = null;
      let donationController = null;
      let chestController = null;
      let friendsController = null;
      let tradeController = null;
      let messagesController = null;
      let shopController = null;
      let signController = null;
      let plantsController = null;
      let gemsController = null;
      let rewardsController = null;
      let editReachTiles = DEFAULT_EDIT_REACH_TILES;
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
      let lastHandledFreezeCommandId = "";
      let lastHandledGodModeCommandId = "";
      let lastHandledPrivateAnnouncementId = "";
      let announcementHideTimer = 0;
      let serverMainPageNoticeText = "";
      let localUpdateNoticeText = "";
      let publicMainNoticeDb = null;
      let publicMainNoticeRef = null;
      let publicMainNoticeHandler = null;
      let isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
      let isMobileUi = false;
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
      let adminBackupList = [];
      let adminBackupSelectedId = "";
      let adminBackupLoading = false;
      let isAdminOpen = false;
      let adminCommandsMenuOpen = false;
      let hasSeenAdminRoleSnapshot = false;
      const adminCommandLastUsedAt = new Map();
      const chatMessages = [];
      const recentChatFingerprintAt = new Map();
      const logsMessages = [];
      const antiCheatMessages = [];
      const CHAT_BUBBLE_FULL_MS = 5000;
      const CHAT_BUBBLE_FADE_MS = 1500;
      const CHAT_BUBBLE_MS = CHAT_BUBBLE_FULL_MS + CHAT_BUBBLE_FADE_MS;
      const CHAT_BUBBLE_MAX_WIDTH = 190;
      const CHAT_BUBBLE_LINE_HEIGHT = 13;
      const DROP_PICKUP_RADIUS = 26;
      const DROP_MAX_PER_WORLD = 220;
      const PLAYER_NAME_FONT = "12px 'Trebuchet MS', sans-serif";
      const playerWrenchHitboxes = [];
      const localPlayerWrenchHitbox = [];
      const worldDrops = new Map();
      const tileDamageByKey = new Map();
      let lastDropAtMs = 0;
      const inventoryDrag = {
        active: false,
        pointerId: null,
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0,
        moved: false,
        amount: 1,
        maxAmount: 1,
        entry: null,
        ghostEl: null
      };
      let toolbarRenderQueued = false;
      let toolbarRenderRafId = 0;
      let lastToolbarRefresh = 0;
      let suppressInventoryClickUntilMs = 0;
      let pickupInventoryFlushTimer = 0;
      let inventorySaveTimer = 0;
      let manualLockConvertHoldUntilMs = 0;
      let lastInventoryFullHintAt = 0;
      let isPointerDown = false;

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
      let currentPhysicsLimits = {
        maxMoveSpeedPerTick: Math.max(0.01, Number(MAX_MOVE_SPEED) || 0),
        maxFallSpeedPerTick: Math.max(0.01, Number(MAX_FALL_SPEED) || 0),
        gravityPerTick: Math.max(0.001, Number(GRAVITY) || 0),
        jumpVelocityPerTick: Math.abs(Number(JUMP_VELOCITY) || 0),
        inWater: false,
        inAntiGravity: false
      };
      const cosmeticState = typeof cosmeticsModule.createInventoryState === "function"
        ? cosmeticsModule.createInventoryState(COSMETIC_ITEMS, COSMETIC_SLOTS)
        : { cosmeticInventory: {}, equippedCosmetics: {} };
      const cosmeticInventory = cosmeticState.cosmeticInventory || {};
      const titleInventory = {};
      const equippedCosmetics = cosmeticState.equippedCosmetics || { shirts: "", pants: "", shoes: "", hats: "", wings: "", swords: "" };
      let equippedTitleId = "";
      for (const title of TITLE_CATALOG) {
        titleInventory[title.id] = title.defaultUnlocked ? 1 : 0;
      }
      if (TITLE_DEFAULT_ID) {
        equippedTitleId = TITLE_DEFAULT_ID;
      }

      function getVendingController() {
        if (vendingController) return vendingController;
        if (typeof vendingModule.createController !== "function") return null;
        vendingController = vendingModule.createController({
          getNetwork: () => network,
          getBasePath: () => BASE_PATH,
          getCurrentWorldId: () => currentWorldId,
          getPlayerProfileId: () => playerProfileId,
          getPlayerSessionId: () => playerSessionId,
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
          getObsidianLockId: () => OBSIDIAN_LOCK_ID,
          getLockCurrencyConfig,
          getTotalLockValue,
          distributeLockValueToInventory,
          spendLockValue,
          addLockValue,
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

      function getDonationController() {
        if (donationController) return donationController;
        if (typeof donationModule.createController !== "function") return null;
        donationController = donationModule.createController({
          getNetwork: () => network,
          getBasePath: () => BASE_PATH,
          getCurrentWorldId: () => currentWorldId,
          getPlayerProfileId: () => playerProfileId,
          getPlayerName: () => playerName,
          getFirebase: () => (typeof firebase !== "undefined" ? firebase : null),
          getInventory: () => inventory,
          getCosmeticInventory: () => cosmeticInventory,
          getInventoryIds: () => INVENTORY_IDS,
          getCosmeticItems: () => COSMETIC_ITEMS,
          getBlockDefs: () => blockDefs,
          clampInventoryCount,
          saveInventory,
          refreshToolbar,
          postLocalSystemChat,
          getDonationModalEl: () => donationModalEl,
          getDonationTitleEl: () => donationTitleEl,
          getDonationBodyEl: () => donationBodyEl,
          getDonationActionsEl: () => donationActionsEl,
          getDonationCloseBtnEl: () => donationCloseBtn
        });
        if (typeof donationController.bindModalEvents === "function") {
          donationController.bindModalEvents();
        }
        return donationController;
      }

      function getChestController() {
        if (chestController) return chestController;
        if (typeof chestModule.createController !== "function") return null;
        chestController = chestModule.createController({
          getNetwork: () => network,
          getBasePath: () => BASE_PATH,
          getCurrentWorldId: () => currentWorldId,
          getPlayerProfileId: () => playerProfileId,
          getPlayerName: () => playerName,
          getFirebase: () => (typeof firebase !== "undefined" ? firebase : null),
          getInventory: () => inventory,
          getCosmeticInventory: () => cosmeticInventory,
          getInventoryIds: () => INVENTORY_IDS,
          getCosmeticItems: () => COSMETIC_ITEMS,
          getBlockDefs: () => blockDefs,
          clampInventoryCount,
          saveInventory,
          refreshToolbar,
          postLocalSystemChat,
          canManageAt: () => isWorldLocked() && isWorldLockOwner(),
          isWorldLocked: () => isWorldLocked(),
          getChestModalEl: () => chestModalEl,
          getChestTitleEl: () => chestTitleEl,
          getChestBodyEl: () => chestBodyEl,
          getChestActionsEl: () => chestActionsEl,
          getChestCloseBtnEl: () => chestCloseBtn
        });
        if (typeof chestController.bindModalEvents === "function") {
          chestController.bindModalEvents();
        }
        return chestController;
      }

      function getGambleController() {
        if (gambleController) return gambleController;
        if (typeof gambleModule.createController !== "function") return null;
        gambleController = gambleModule.createController({
          getNetwork: () => network,
          getBasePath: () => BASE_PATH,
          getCurrentWorldId: () => currentWorldId,
          getPlayerProfileId: () => playerProfileId,
          getPlayerName: () => playerName,
          getFirebase: () => (typeof firebase !== "undefined" ? firebase : null),
          getInventory: () => inventory,
          getWorld: () => world,
          getGambleId: () => GAMBLE_ID,
          getWorldLockId: () => WORLD_LOCK_ID,
          getObsidianLockId: () => OBSIDIAN_LOCK_ID,
          getLockCurrencyConfig,
          getTotalLockValue,
          distributeLockValueToInventory,
          spendLockValue,
          addLockValue,
          getIsMobileUi: () => Boolean(isMobileUi),
          isWorldLocked: () => isWorldLocked(),
          isWorldLockOwner: () => isWorldLockOwner(),
          isWorldLockAdmin: () => isWorldLockAdmin(),
          clampInventoryCount,
          saveInventory,
          refreshToolbar,
          postLocalSystemChat,
          getGambleModalEl: () => gambleModalEl || document.getElementById("gambleModal"),
          getGambleTitleEl: () => gambleTitleEl || document.getElementById("gambleTitle"),
          getGambleBodyEl: () => gambleBodyEl || document.getElementById("gambleBody"),
          getGambleActionsEl: () => gambleActionsEl || document.getElementById("gambleActions"),
          getGambleCloseBtnEl: () => gambleCloseBtn || document.getElementById("gambleCloseBtn")
        });
        if (typeof gambleController.bindModalEvents === "function") {
          gambleController.bindModalEvents();
        }
        return gambleController;
      }

      function getPresenceByAccountId(accountId) {
        const targetId = String(accountId || "");
        if (!targetId) return null;
        const players = adminState.globalPlayers || {};
        for (const entry of Object.values(players)) {
          if (!entry || typeof entry !== "object") continue;
          if (String(entry.accountId || "") !== targetId) continue;
          return {
            accountId: targetId,
            name: String(entry.name || "").slice(0, 20),
            world: normalizeWorldId(entry.world || ""),
            x: Number(entry.x),
            y: Number(entry.y),
            online: true,
            progression: normalizeProgressionRecord(entry.progression || {}),
            achievements: {
              completed: Math.max(0, Math.floor(Number(entry.achievements && entry.achievements.completed) || 0)),
              total: Math.max(0, Math.floor(Number(entry.achievements && entry.achievements.total) || 0))
            }
          };
        }
        return null;
      }

      function warpToFriendAccount(accountId) {
        const presence = getPresenceByAccountId(accountId);
        if (!presence || !presence.online || !presence.world) return false;
        const warpWorld = normalizeWorldId(presence.world);
        if (!warpWorld) return false;
        const warpX = Number.isFinite(presence.x) ? Math.floor(presence.x) : Math.floor(player.x);
        const warpY = Number.isFinite(presence.y) ? Math.floor(presence.y) : Math.floor(player.y);
        pendingTeleportSelf = {
          worldId: warpWorld,
          x: warpX,
          y: warpY
        };
        switchWorld(warpWorld, false);
        postLocalSystemChat("Warping to @" + (presence.name || accountId) + "...");
        return true;
      }

      function getFriendsController() {
        if (friendsController) return friendsController;
        if (typeof friendsModule.createController !== "function") return null;
        friendsController = friendsModule.createController({
          getNetwork: () => network,
          getBasePath: () => BASE_PATH,
          getPlayerProfileId: () => playerProfileId,
          getPlayerName: () => playerName,
          getFriendsToggleBtnEl: () => friendsToggleBtn,
          getProfileModalEl: () => profileModalEl,
          getProfileTitleEl: () => profileTitleEl,
          getProfileBodyEl: () => profileBodyEl,
          getProfileActionsEl: () => profileActionsEl,
          getProfileCloseBtnEl: () => profileCloseBtn,
          getFriendsModalEl: () => friendsModalEl,
          getFriendsTitleEl: () => friendsTitleEl,
          getFriendsBodyEl: () => friendsBodyEl,
          getFriendsActionsEl: () => friendsActionsEl,
          getFriendsCloseBtnEl: () => friendsCloseBtn,
          getPresenceByAccountId,
          onWarpToFriend: (accountId) => warpToFriendAccount(accountId),
          onOpenTrade: (accountId, name) => {
            const tradeCtrl = getTradeController();
            if (!tradeCtrl || typeof tradeCtrl.handleWrenchPlayer !== "function") return;
            tradeCtrl.handleWrenchPlayer({ accountId, name });
          },
          getProfileProgressionHtml: ({ presence }) => {
            const progression = presence && presence.progression ? presence.progression : null;
            const ach = presence && presence.achievements ? presence.achievements : { completed: 0, total: 0 };
            const achCompleted = Math.max(0, Math.floor(Number(ach.completed) || 0));
            const achTotalRaw = Math.max(0, Math.floor(Number(ach.total) || 0));
            const achTotal = achTotalRaw > 0
              ? achTotalRaw
              : Math.max(0, Math.floor(Number((typeof achievementsModule.getCatalog === "function" ? achievementsModule.getCatalog().length : 0)) || 0));
            if (!progression) {
              return (
                "<div class='vending-section'>" +
                  "<div class='vending-section-title'>Progression</div>" +
                  "<div class='vending-stat-grid'>" +
                    "<div class='vending-stat'><span>Level</span><strong>?</strong></div>" +
                    "<div class='vending-stat'><span>XP</span><strong>?</strong></div>" +
                    "<div class='vending-stat'><span>Achievements</span><strong>" + achCompleted + " / " + achTotal + "</strong></div>" +
                  "</div>" +
                "</div>"
              );
            }
            const level = Math.max(1, Math.floor(Number(progression.level) || 1));
            const xpInto = Math.max(0, Math.floor(Number(progression.xpIntoLevel) || 0));
            const xpNext = Math.max(0, Math.floor(Number(progression.xpForNext) || 0));
            const pct = xpNext > 0 ? Math.max(0, Math.min(100, (xpInto / xpNext) * 100)) : 100;
            return (
              "<div class='vending-section'>" +
                "<div class='vending-section-title'>Progression</div>" +
                "<div class='vending-stat-grid'>" +
                  "<div class='vending-stat'><span>Level</span><strong>" + level + "</strong></div>" +
                  "<div class='vending-stat'><span>XP</span><strong>" + xpInto + " / " + xpNext + "</strong></div>" +
                  "<div class='vending-stat'><span>Achievements</span><strong>" + achCompleted + " / " + achTotal + "</strong></div>" +
                "</div>" +
                "<div style='margin-top:8px;height:9px;border-radius:999px;background:rgba(18,35,52,0.85);border:1px solid rgba(128,182,232,0.35);overflow:hidden;'>" +
                  "<div style='height:100%;width:" + pct.toFixed(2) + "%;background:linear-gradient(90deg,#55d6ff,#7cff9b);'></div>" +
                "</div>" +
              "</div>"
            );
          },
          postLocalSystemChat
        });
        if (typeof friendsController.bindUiEvents === "function") {
          friendsController.bindUiEvents();
        }
        return friendsController;
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
          getTradePanelCloseBtnEl: () => document.getElementById("tradePanelCloseBtn"),
          getToolbarEl: () => toolbar,
          getFriendsController: () => getFriendsController(),
          startInventoryDragFromTrade: (entry, event) => {
            startInventoryDrag(entry, event);
          },
          onTradeCompleted: (payload) => {
            const tradeId = payload && payload.tradeId ? String(payload.tradeId) : "";
            applyQuestEvent("trade_complete", { tradeId, count: 1 });
            applyAchievementEvent("trade_complete", { tradeId });
          }
        });
        return tradeController;
      }

      function getPlantsController() {
        if (plantsController) return plantsController;
        if (typeof plantsModule.createController !== "function") return null;
        plantsController = plantsModule.createController({
          getNetwork: () => network,
          getTreeGrowMs: () => TREE_GROW_MS,
          getTreeYieldBlockId: () => TREE_YIELD_BLOCK_ID,
          getTreeStageCount: () => TREE_STAGE_COUNT,
          getBlockDefs: () => blockDefs
        });
        return plantsController;
      }

      function getShopController() {
        if (shopController) return shopController;
        if (typeof shopModule.createController !== "function") return null;
        shopController = shopModule.createController({
          getPlayerGems: () => {
            const ctrl = getGemsController();
            if (!ctrl || typeof ctrl.get !== "function") return 0;
            return Math.max(0, Math.floor(Number(ctrl.get()) || 0));
          },
          spendPlayerGems: (amount) => {
            const cost = Math.max(0, Math.floor(Number(amount) || 0));
            if (cost <= 0) return true;
            const ctrl = getGemsController();
            if (!ctrl || typeof ctrl.get !== "function" || typeof ctrl.add !== "function") return false;
            const current = Math.max(0, Math.floor(Number(ctrl.get()) || 0));
            if (current < cost) return false;
            ctrl.add(-cost);
            updateGemsLabel();
            return true;
          },
          getInventory: () => inventory,
          getCosmeticInventory: () => cosmeticInventory,
          getInventoryItemLimit: () => INVENTORY_ITEM_LIMIT,
          getBlockDefs: () => blockDefs,
          getCosmeticItems: () => COSMETIC_ITEMS,
          saveInventory,
          refreshToolbar,
          postLocalSystemChat,
          showAnnouncementPopup
        });
        return shopController;
      }

      function getMessagesController() {
        if (messagesController) return messagesController;
        if (typeof messagesModule.createController !== "function") return null;
        messagesController = messagesModule.createController({
          getNetwork: () => network,
          getFirebase: () => (typeof firebase !== "undefined" ? firebase : null),
          getBasePath: () => BASE_PATH,
          getPlayerProfileId: () => playerProfileId,
          getPlayerName: () => playerName,
          getPlayerSessionStartedAt: () => playerSessionStartedAt,
          resolveAccountIdByUsernameFast,
          findAccountIdByUserRef,
          postLocalSystemChat
        });
        return messagesController;
      }

      function getSignController() {
        if (signController) return signController;
        if (typeof signModule.createController !== "function") return null;
        signController = signModule.createController({
          getTileKey,
          getWorld: () => world,
          getWorldSize: () => ({ w: WORLD_W, h: WORLD_H }),
          getSignId: () => SIGN_ID,
          canEditTarget,
          canEditCurrentWorld,
          notifyWorldLockedDenied,
          getNetwork: () => network,
          getFirebase: () => (typeof firebase !== "undefined" ? firebase : null),
          wrapChatText,
          getPlayer: () => player,
          getPlayerRect: () => ({ w: PLAYER_W, h: PLAYER_H }),
          getTileSize: () => TILE,
          getCamera: () => ({ x: cameraX, y: cameraY }),
          getCameraZoom: () => cameraZoom,
          getCanvas: () => canvas,
          getSignModalElements: () => ({
            modal: signModalEl,
            title: signTitleEl,
            input: signTextInputEl
          })
        });
        return signController;
      }

      function getGemsController() {
        if (gemsController) return gemsController;
        if (typeof gemsModule.createController !== "function") return null;
        gemsController = gemsModule.createController({});
        return gemsController;
      }

      function getRewardsController() {
        if (rewardsController) return rewardsController;
        if (typeof rewardsModule.createController !== "function") return null;
        rewardsController = rewardsModule.createController({
          getTreeGemMin: () => TREE_GEM_MIN,
          getTreeGemMax: () => TREE_GEM_MAX
        });
        return rewardsController;
      }

      function logAntiCheatEvent(rule, severity, details) {
        if (!network.db) return;
        const safeRule = String(rule || "unknown").trim().slice(0, 48);
        if (!safeRule) return;
        const safeSeverity = String(severity || "warn").trim().toLowerCase().slice(0, 16) || "warn";
        const detailText = typeof details === "string"
          ? details
          : JSON.stringify(details || {}).slice(0, 800);
        network.db.ref(BASE_PATH + "/anti-cheat-logs").push({
          rule: safeRule,
          severity: safeSeverity,
          details: detailText,
          accountId: playerProfileId || "",
          username: (playerName || "").toString().slice(0, 20),
          sessionId: playerSessionId || "",
          world: inWorld ? (currentWorldId || "") : "menu",
          createdAt: firebase.database.ServerValue.TIMESTAMP
        }).catch(() => {});
      }

      let cameraX = 0;
      let cameraY = 0;
      let cameraZoom = loadCameraZoomPref();
      let mouseWorld = { tx: 0, ty: 0 };
      const antiCheatController = typeof anticheatModule.createController === "function"
        ? anticheatModule.createController({
          getPlayerName: () => playerName,
          getPlayerProfileId: () => playerProfileId,
          getPlayerSessionId: () => playerSessionId,
          getCurrentWorldId: () => currentWorldId,
          getInWorld: () => inWorld,
          getPlayer: () => player,
          getPlayerRect: () => ({ w: PLAYER_W, h: PLAYER_H }),
          getTileSize: () => TILE,
          getTickRate: () => FIXED_FPS,
          getEditReachTiles: () => editReachTiles,
          getPhysicsLimits: () => currentPhysicsLimits,
          postLocalSystemChat,
          getWatchedStorageKeys: () => ([
            SAVED_AUTH_KEY,
            getInventoryStorageKey(),
            getProgressionStorageKey(),
            getAchievementsStorageKey(),
            getQuestsStorageKey()
          ]),
          appendLogEntry: (entry) => {
            if (!entry || !entry.rule) return;
            logAntiCheatEvent(entry.rule, entry.severity, entry.details);
          }
        })
        : null;
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
      const gachaController = typeof gachaModule.createController === "function"
        ? gachaModule.createController({
          getBlockIdByKey: (blockKey) => parseBlockRef(blockKey),
          random: Math.random
        })
        : null;
      const particleController = typeof particlesModule.createController === "function"
        ? particlesModule.createController({
          maxParticles: Number(SETTINGS.PARTICLES_MAX) || 340
        })
        : null;
      let lastJumpAtMs = -9999;
      let lastAirJumpAtMs = -9999;
      let airJumpsUsed = 0;
      let wingFlapPulseEndsAtMs = 0;
      let wingFlapPulseStrength = 0;
      let wasJumpHeld = false;
      let lastHitAtMs = -9999;
      let lastBlockHitAtMs = -9999;
      let lastHoldActionAtMs = -9999;
      let lastHoldActionTile = null;
      let lastHitDirectionY = 0;
      let lastWaterSplashAtMs = -9999;
      let lastSpikeKillAtMs = -9999;
      let wasInWaterLastFrame = false;
      let danceUntilMs = 0;
      let isFrozenByAdmin = false;
      let isGodModeByAdmin = false;
      let frozenByAdminBy = "";
      let lastFrozenHintAtMs = -9999;
      let suppressSpawnSafetyUntilMs = 0;
      let mobileLastTouchActionAt = 0;
      let mobileTouchActionMode = "primary";
      let isMobileInventoryOpen = false;
      let mobilePlayModeEnabled = true;
      const touchControls = {
        left: false,
        right: false,
        jump: false
      };
      const HIT_ANIM_MS = 200;
      const BLOCK_HIT_COOLDOWN_MS = Math.max(60, Number(SETTINGS.BLOCK_HIT_COOLDOWN_MS) || 120);
      const SPIKE_KILL_COOLDOWN_MS = Math.max(350, Number(SETTINGS.SPIKE_KILL_COOLDOWN_MS) || 700);
      const DANCE_DURATION_MS = Math.max(1200, Number(SETTINGS.DANCE_DURATION_MS) || 5000);
      const FIXED_FPS = 60;
      const FIXED_FRAME_MS = 1000 / FIXED_FPS;
      const MAX_TICK_CATCHUP = 4;

      function triggerWingFlapPulse(strength) {
        const now = performance.now();
        wingFlapPulseEndsAtMs = now + 260;
        wingFlapPulseStrength = Math.max(0.35, Number(strength) || 1);
        if (particleController && typeof particleController.emitWingFlap === "function") {
          particleController.emitWingFlap(
            player.x + PLAYER_W / 2,
            player.y + 15,
            player.facing || 1,
            wingFlapPulseStrength
          );
        }
      }

      function getWingFlapPulse(nowMs) {
        if (nowMs >= wingFlapPulseEndsAtMs) return 0;
        const durationMs = 260;
        const progress = Math.max(0, Math.min(1, 1 - ((wingFlapPulseEndsAtMs - nowMs) / durationMs)));
        // One impulse cycle: upstroke first, then downstroke.
        const envelope = Math.sin(progress * Math.PI);
        const direction = -1 + (2 * progress); // -1 -> +1 across pulse
        return envelope * direction * wingFlapPulseStrength;
      }

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
        myReachRef: null,
        myFreezeRef: null,
        myGodModeRef: null,
        myPrivateAnnouncementRef: null,
        myPmRef: null,
        myPmFeedRef: null,
        myTradeRequestRef: null,
        myTradeResponseRef: null,
        myActiveTradeRef: null,
        myFriendsRef: null,
        myFriendRequestsRef: null,
        playersRef: null,
        blocksRef: null,
        hitsRef: null,
        dropsRef: null,
        dropFeedRef: null,
        vendingRef: null,
        gambleRef: null,
        donationRef: null,
        chestsRef: null,
        signsRef: null,
        displaysRef: null,
        doorsRef: null,
        antiGravRef: null,
        plantsRef: null,
        weatherRef: null,
        camerasRef: null,
        cameraLogsRef: null,
        cameraLogsFeedRef: null,
        spawnMetaRef: null,
        lockRef: null,
        chatRef: null,
        chatFeedRef: null,
        inventoryRef: null,
        progressRef: null,
        achievementsRef: null,
        questsRef: null,
        accountLogsRef: null,
        accountLogsFeedRef: null,
        accountLogsRootRef: null,
        antiCheatLogsRef: null,
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
          progression: null,
          achievements: null,
          quests: null,
          mySession: null,
          myCommand: null,
          myReach: null,
          myFreeze: null,
          myGodMode: null,
          myPrivateAnnouncement: null,
          myPmAdded: null,
          myTradeRequest: null,
          myTradeResponse: null,
          myActiveTrade: null,
          myFriends: null,
          myFriendRequests: null,
          players: null,
          playerAdded: null,
          playerChanged: null,
          playerRemoved: null,
          blockAdded: null,
          blockChanged: null,
          blockRemoved: null,
          hitAdded: null,
          hitChanged: null,
          hitRemoved: null,
          dropAdded: null,
          dropChanged: null,
          dropRemoved: null,
          vendingAdded: null,
          vendingChanged: null,
          vendingRemoved: null,
          gambleAdded: null,
          gambleChanged: null,
          gambleRemoved: null,
          donationAdded: null,
          donationChanged: null,
          donationRemoved: null,
          chestAdded: null,
          chestChanged: null,
          chestRemoved: null,
          signAdded: null,
          signChanged: null,
          signRemoved: null,
          displayAdded: null,
          displayChanged: null,
          displayRemoved: null,
          doorAdded: null,
          doorChanged: null,
          doorRemoved: null,
          antiGravAdded: null,
          antiGravChanged: null,
          antiGravRemoved: null,
          plantAdded: null,
          plantChanged: null,
          plantRemoved: null,
          worldWeather: null,
          cameraAdded: null,
          cameraChanged: null,
          cameraRemoved: null,
          cameraLogAdded: null,
          worldLock: null,
          chatAdded: null,
          accountLogAdded: null,
          antiCheatLogAdded: null,
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
      let packetClient = null;
      let packetMoveInFlight = false;
      let packetQueuedMoveData = null;

      function getPacketClient() {
        if (packetClient) return packetClient;
        if (!dbModule || typeof dbModule.createPacketClient !== "function") return null;
        packetClient = dbModule.createPacketClient({
          endpoint: window.PACKET_API_ENDPOINT,
          getPlayerId: () => playerId || "",
          getSessionId: () => playerSessionId || "",
          getSessionToken: () => {
            const sid = String(playerSessionId || "");
            const pid = String(playerId || "");
            return sid ? ("pkt." + sid + "." + pid) : "";
          }
        });
        return packetClient;
      }

      function sendAuthoritativePacket(type, data) {
        const client = getPacketClient();
        if (!client || typeof client.send !== "function") {
          return Promise.reject(new Error("Packet client unavailable."));
        }
        return client.send(type, data || {});
      }

      function sendPresenceLeavePacket() {
        if (!network.enabled) return;
        sendAuthoritativePacket("PRESENCE", {
          action: "leave",
          worldId: (inWorld ? currentWorldId : "menu") || "menu"
        }).catch(() => {});
      }

      function queueMovePacket(data) {
        const payload = data && typeof data === "object" ? data : {};
        packetQueuedMoveData = payload;
        if (packetMoveInFlight) return;
        const run = () => {
          const nextData = packetQueuedMoveData;
          packetQueuedMoveData = null;
          if (!nextData || !network.enabled || !playerProfileId || !playerSessionId) {
            packetMoveInFlight = false;
            return;
          }
          packetMoveInFlight = true;
          sendAuthoritativePacket("MOVE", nextData)
            .catch(() => {
              setNetworkState("Network error", true);
            })
            .finally(() => {
              packetMoveInFlight = false;
              if (packetQueuedMoveData) run();
            });
        };
        run();
      }

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
        saveJsonToLocalStorage(SAVED_AUTH_KEY, {
          username: (username || "").toString().slice(0, 20),
          password: (password || "").toString().slice(0, 64)
        });
      }

      function loadSavedCredentials() {
        if (typeof authStorageModule.loadCredentials === "function") {
          return authStorageModule.loadCredentials(SAVED_AUTH_KEY);
        }
        const parsed = loadJsonFromLocalStorage(SAVED_AUTH_KEY);
        return {
          username: (parsed && parsed.username || "").toString(),
          password: (parsed && parsed.password || "").toString()
        };
      }

      function applySavedCredentialsToForm() {
        const saved = loadSavedCredentials();
        if (saved.username) authUsernameEl.value = saved.username;
        if (saved.password) authPasswordEl.value = saved.password;
        const secure = window.GTModules && window.GTModules.secureStorage;
        if ((!saved.username && !saved.password) && secure && typeof secure.init === "function") {
          secure.init().then(() => {
            const late = loadSavedCredentials();
            if (late.username && !authUsernameEl.value) authUsernameEl.value = late.username;
            if (late.password && !authPasswordEl.value) authPasswordEl.value = late.password;
          }).catch(() => {});
        }
      }

      function saveJsonToLocalStorage(storageKey, payload) {
        const key = String(storageKey || "");
        if (!key) return;
        const secure = window.GTModules && window.GTModules.secureStorage;
        if (secure && typeof secure.saveJson === "function") {
          secure.saveJson(key, payload);
          return;
        }
        try {
          localStorage.setItem(key, JSON.stringify(payload));
        } catch (error) {
          // ignore localStorage failures
        }
      }

      function loadJsonFromLocalStorage(storageKey) {
        const key = String(storageKey || "");
        if (!key) return null;
        const secure = window.GTModules && window.GTModules.secureStorage;
        if (secure && typeof secure.loadJson === "function") {
          const value = secure.loadJson(key);
          if (value && typeof value === "object") return value;
        }
        try {
          const raw = localStorage.getItem(key);
          if (!raw) return null;
          const parsed = JSON.parse(raw);
          return parsed && typeof parsed === "object" ? parsed : null;
        } catch (error) {
          return null;
        }
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

      function saveForceReloadNotice(text) {
        try {
          sessionStorage.setItem(FORCE_RELOAD_NOTICE_KEY, String(text || "").slice(0, 200));
        } catch (error) {
          // ignore sessionStorage failures
        }
      }

      function takeForceReloadNotice() {
        try {
          const text = (sessionStorage.getItem(FORCE_RELOAD_NOTICE_KEY) || "").toString();
          if (text) sessionStorage.removeItem(FORCE_RELOAD_NOTICE_KEY);
          return text;
        } catch (error) {
          return "";
        }
      }

      function renderMainPageNotice() {
        const parts = [];
        if (localUpdateNoticeText) parts.push(localUpdateNoticeText);
        if (serverMainPageNoticeText) parts.push(serverMainPageNoticeText);
        const text = parts.join(" | ").trim().slice(0, 420);
        const apply = (el) => {
          if (!(el instanceof HTMLElement)) return;
          if (!text) {
            el.textContent = "";
            el.classList.add("hidden");
            return;
          }
          el.textContent = text;
          el.classList.remove("hidden");
        };
        apply(authMainNoticeEl);
        apply(menuMainNoticeEl);
      }

      function setServerMainPageNotice(text) {
        serverMainPageNoticeText = String(text || "").trim().slice(0, 220);
        renderMainPageNotice();
      }

      function setLocalUpdateNotice(text) {
        localUpdateNoticeText = String(text || "").trim().slice(0, 220);
        renderMainPageNotice();
      }

      async function startPublicMainNoticeListener() {
        if (publicMainNoticeRef) return;
        try {
          publicMainNoticeDb = await getAuthDb();
          if (!publicMainNoticeDb) return;
          publicMainNoticeRef = publicMainNoticeDb.ref(BASE_PATH + "/system/main-notification");
          publicMainNoticeHandler = (snapshot) => {
            const value = snapshot && snapshot.val ? (snapshot.val() || {}) : {};
            const text = (value.text || "").toString().trim().slice(0, 220);
            setServerMainPageNotice(text);
          };
          publicMainNoticeRef.on("value", publicMainNoticeHandler);
        } catch (error) {
          // ignore when DB is unavailable pre-login
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

      function canViewAntiCheatLogs() {
        return getRoleRank(currentAdminRole) >= getRoleRank("manager");
      }

      function normalizeAdminRole(role) {
        if (typeof adminModule.normalizeAdminRole === "function") {
          return adminModule.normalizeAdminRole(role, adminRoleConfig);
        }
        const value = String(role || "").trim().toLowerCase();
        return ["none", "moderator", "admin", "manager", "owner"].includes(value) ? value : "none";
      }

      function getRoleRank(role) {
        if (typeof adminModule.getRoleRank === "function") {
          return adminModule.getRoleRank(role, adminRoleConfig);
        }
        const map = adminRoleConfig && adminRoleConfig.roleRank ? adminRoleConfig.roleRank : {};
        return Number(map[normalizeAdminRole(role)]) || 0;
      }

      function hasAdminPermission(permissionKey) {
        if (typeof adminModule.hasAdminPermission === "function") {
          return adminModule.hasAdminPermission(currentAdminRole, permissionKey, adminRoleConfig);
        }
        const role = normalizeAdminRole(currentAdminRole);
        const map = adminRoleConfig && adminRoleConfig.permissions ? adminRoleConfig.permissions : {};
        const list = Array.isArray(map[role]) ? map[role] : [];
        return list.includes(permissionKey);
      }

      function getConfiguredRoleForUsername(username) {
        if (typeof adminModule.getConfiguredRoleForUsername === "function") {
          return adminModule.getConfiguredRoleForUsername(username, adminRoleConfig);
        }
        const normalized = normalizeUsername(username);
        if (!normalized) return "none";
        const roleByUsername = adminRoleConfig && adminRoleConfig.roleByUsername ? adminRoleConfig.roleByUsername : {};
        if (roleByUsername[normalized]) return normalizeAdminRole(roleByUsername[normalized]);
        const adminUsernames = adminRoleConfig && Array.isArray(adminRoleConfig.adminUsernames) ? adminRoleConfig.adminUsernames : ["isxt"];
        if (adminUsernames.includes(normalized)) return "owner";
        return "none";
      }

      function getAccountRole(accountId, username) {
        if (accountId && adminState.roles[accountId]) {
          return normalizeAdminRole(adminState.roles[accountId]);
        }
        return getConfiguredRoleForUsername(username);
      }

      function formatRoleLabel(role) {
        const normalized = normalizeAdminRole(role);
        if (normalized === "none") return "Player";
        return normalized.charAt(0).toUpperCase() + normalized.slice(1);
      }

      function refreshAdminCapabilities(announceRoleChange) {
        const previousRole = normalizeAdminRole(currentAdminRole);
        currentAdminRole = normalizeAdminRole(getAccountRole(playerProfileId, playerName));
        const nextRole = normalizeAdminRole(currentAdminRole);
        if (announceRoleChange && playerProfileId && previousRole !== nextRole) {
          const prevRank = getRoleRank(previousRole);
          const nextRank = getRoleRank(nextRole);
          let headline = "Your role was updated.";
          if (nextRank > prevRank) headline = "You were promoted to";
          if (nextRank < prevRank) headline = "You were demoted to";
          const details = formatRoleLabel(nextRole);
          showAnnouncementPopup(headline + " " + details, 5600);
          postLocalSystemChat("[System] Role change: " + details + ".");
        }
        canUseAdminPanel = hasAdminPermission("panel_open");
        canViewAccountLogs = canUserViewLogs(playerName);
        adminToggleBtn.classList.toggle("hidden", !canUseAdminPanel);
        if (adminForceReloadBtn) {
          const canForceReload = hasAdminPermission("force_reload");
          adminForceReloadBtn.classList.toggle("hidden", !canForceReload);
          adminForceReloadBtn.disabled = !canForceReload;
        }
        if (adminBackupDownloadBtn) {
          const canDownloadBackupJson = hasAdminPermission("db_restore");
          adminBackupDownloadBtn.classList.toggle("hidden", !canDownloadBackupJson);
          adminBackupDownloadBtn.disabled = !canDownloadBackupJson;
        }
        if (adminBackupUploadBtn) {
          const canUploadBackupJson = hasAdminPermission("db_backup");
          adminBackupUploadBtn.classList.toggle("hidden", !canUploadBackupJson);
          adminBackupUploadBtn.disabled = !canUploadBackupJson;
        }
        if (adminBackupUploadInput) {
          adminBackupUploadInput.disabled = !hasAdminPermission("db_backup");
        }
        if (adminAuditActionFilterEl) adminAuditActionFilterEl.disabled = !hasAdminPermission("view_audit");
        if (adminAuditActorFilterEl) adminAuditActorFilterEl.disabled = !hasAdminPermission("view_audit");
        if (adminAuditTargetFilterEl) adminAuditTargetFilterEl.disabled = !hasAdminPermission("view_audit");
        if (adminAuditExportBtn) adminAuditExportBtn.disabled = !hasAdminPermission("view_audit");
        if (!hasAdminPermission("db_restore")) {
          adminBackupList = [];
          adminBackupSelectedId = "";
          adminBackupLoading = false;
        }
        if (network.accountLogsRootRef && network.handlers.accountLogAdded) {
          network.accountLogsRootRef.off("value", network.handlers.accountLogAdded);
          if (canViewAccountLogs) {
            network.accountLogsRootRef.on("value", network.handlers.accountLogAdded);
          } else {
            clearLogsView();
          }
        }
        if (network.antiCheatLogsRef && network.handlers.antiCheatLogAdded) {
          network.antiCheatLogsRef.off("value", network.handlers.antiCheatLogAdded);
          if (canViewAntiCheatLogs()) {
            network.antiCheatLogsRef.on("value", network.handlers.antiCheatLogAdded);
          } else {
            antiCheatMessages.length = 0;
          }
        }
        if (!canUseAdminPanel) setAdminOpen(false);
        if (network.enabled) {
          syncAdminDataListeners();
        }
      }

      function canActorAffectTarget(targetAccountId, targetRole) {
        if (!targetAccountId) return false;
        if (targetAccountId === playerProfileId) return true;
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
        if (typeof adminModule.getCommandCooldownMs === "function") {
          return adminModule.getCommandCooldownMs(currentAdminRole, commandKey, adminRoleConfig);
        }
        const role = normalizeAdminRole(currentAdminRole);
        const map = adminRoleConfig && adminRoleConfig.commandCooldownsMs ? adminRoleConfig.commandCooldownsMs : {};
        const roleMap = map[role] && typeof map[role] === "object" ? map[role] : {};
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
          if (hasAdminPermission("db_restore")) {
            refreshAdminBackups(true);
          }
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

      function getAvailableRankCommands() {
        const list = [
          "/myrole",
          "/warp <world>",
          "/dance",
          "/msg <user> <message>",
          "/r <message>",
          "/lock",
          "/unlock",
          "/online"
        ];
        if (hasAdminPermission("tp")) list.push("/where <user>", "/goto <user>", "/tp <user>");
        if (hasAdminPermission("bring")) list.push("/bringall", "/bring <user>", "/summon <user>");
        if (hasAdminPermission("announce")) list.push("/announce <message>");
        if (hasAdminPermission("announce")) list.push("/mainnotif <message>", "/mainnotif clear");
        if (hasAdminPermission("announce_user")) list.push("/announcep <user> <message>");
        if (hasAdminPermission("tempban")) list.push("/tempban <user> <60m|12h|7d> [reason]", "/ban <user> [60m|12h|7d] [reason]");
        if (hasAdminPermission("permban")) list.push("/permban <user> [reason]");
        if (hasAdminPermission("unban")) list.push("/unban <user>");
        if (hasAdminPermission("kick")) list.push("/kick <user>");
        if (hasAdminPermission("freeze")) list.push("/freeze <user>");
        if (hasAdminPermission("unfreeze")) list.push("/unfreeze <user>");
        if (hasAdminPermission("godmode")) list.push("/godmode [user] <on|off>");
        if (hasAdminPermission("clearworld")) list.push("/clearworld");
        if (hasAdminPermission("resetinv")) list.push("/resetinv <user>");
        if (hasAdminPermission("give_block")) list.push("/givex <user> <block_key> <amount>", "/givefarmable <user> <farmable_key> <amount>");
        if (hasAdminPermission("give_item")) list.push("/giveitem <user> <item_id> <amount>", "/spawnd <item> <qty_per_drop> <tile_amount>");
        if (hasAdminPermission("give_title")) list.push("/givetitle <user> <title_id> <amount>");
        if (hasAdminPermission("remove_title")) list.push("/removetitle <user> <title_id> <amount>");
        if (hasAdminPermission("reach")) list.push("/reach <user> <amount>");
        if (hasAdminPermission("setrole") || hasAdminPermission("setrole_limited")) list.push("/setrole <user> <none|moderator|admin|manager|owner>", "/role <user>");
        if (hasAdminPermission("clear_logs")) list.push("/clearaudit", "/clearlogs");
        return list;
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

      function setLocalInventoryTitleCount(accountId, titleId, nextValue) {
        if (!accountId) return;
        if (!adminState.inventories[accountId] || typeof adminState.inventories[accountId] !== "object") {
          adminState.inventories[accountId] = {};
        }
        if (!adminState.inventories[accountId].titleItems || typeof adminState.inventories[accountId].titleItems !== "object") {
          adminState.inventories[accountId].titleItems = {};
        }
        const safeTitleId = String(titleId || "");
        adminState.inventories[accountId].titleItems[safeTitleId] = clampTitleUnlocked(nextValue);
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
        if (kind === "farmable") {
          return FARMABLE_INVENTORY_IDS.map((id) => {
            const label = blockDefs[id] && blockDefs[id].name ? blockDefs[id].name : ("Farmable " + id);
            return '<option value="' + escapeHtml(getBlockKeyById(id)) + '">' + escapeHtml(label + " (" + getBlockKeyById(id) + ")") + "</option>";
          }).join("");
        }
        if (kind === "cosmetic") {
          return COSMETIC_ITEMS.map((item) => {
            return '<option value="' + escapeHtml(item.id) + '">' + escapeHtml(item.name + " (" + item.id + ")") + "</option>";
          }).join("");
        }
        if (kind === "title") {
          return TITLE_CATALOG.map((title) => {
            return '<option value="' + escapeHtml(title.id) + '">' + escapeHtml(title.name + " (" + title.id + ")") + "</option>";
          }).join("");
        }
        return NORMAL_BLOCK_INVENTORY_IDS.map((id) => {
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
          const isFarmable = FARMABLE_INVENTORY_IDS.includes(id);
          rows.push({
            kind: isFarmable ? "farmable" : "block",
            itemId: blockKey,
            label: def.name ? (def.name + " (" + (isFarmable ? "Farmable " : "Block ") + id + ")") : ((isFarmable ? "Farmable " : "Block ") + id),
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
        const titleRecord = inv && inv.titleItems || {};
        for (const title of TITLE_CATALOG) {
          const qty = Math.max(0, Math.floor(Number(titleRecord[title.id]) || 0));
          if (qty <= 0) continue;
          rows.push({
            kind: "title",
            itemId: title.id,
            label: title.name + " (title)",
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
            "<option value='farmable'>Farmables</option>" +
            "<option value='cosmetic'>Cosmetics</option>" +
            "<option value='title'>Titles</option>" +
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

      function normalizeDonationBoxRecord(value) {
        const ctrl = getDonationController();
        if (ctrl && typeof ctrl.normalizeRecord === "function") {
          return ctrl.normalizeRecord(value);
        }
        return value && typeof value === "object" ? value : {};
      }

      function setLocalDonationBox(tx, ty, value) {
        const ctrl = getDonationController();
        if (ctrl && typeof ctrl.setLocal === "function") {
          ctrl.setLocal(tx, ty, value);
        }
      }

      function getLocalDonationBox(tx, ty) {
        const ctrl = getDonationController();
        if (ctrl && typeof ctrl.getLocal === "function") {
          return ctrl.getLocal(tx, ty);
        }
        return null;
      }

      function closeDonationModal() {
        const ctrl = getDonationController();
        if (ctrl && typeof ctrl.closeModal === "function") {
          ctrl.closeModal();
          return;
        }
        if (donationModalEl) donationModalEl.classList.add("hidden");
      }

      function seedDonationBoxOwner(tx, ty) {
        const ctrl = getDonationController();
        if (ctrl && typeof ctrl.seedOwner === "function") {
          ctrl.seedOwner(tx, ty);
        }
      }

      function getDonationStoredCount(items) {
        const ctrl = getDonationController();
        if (ctrl && typeof ctrl.getStoredCount === "function") {
          return ctrl.getStoredCount(items);
        }
        const list = items && typeof items === "object" ? items : {};
        let total = 0;
        for (const value of Object.values(list)) {
          total += Math.max(0, Math.floor(Number(value) || 0));
        }
        return total;
      }

      function openDonationModal(tx, ty) {
        if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H) return;
        if (!isDonationBoxBlockId(world[ty][tx])) return;
        const ctrl = getDonationController();
        if (ctrl && typeof ctrl.openModal === "function") {
          ctrl.openModal(tx, ty);
        }
      }

      function closeChestModal() {
        const ctrl = getChestController();
        if (ctrl && typeof ctrl.closeModal === "function") {
          ctrl.closeModal();
          return;
        }
        if (chestModalEl) chestModalEl.classList.add("hidden");
      }

      function openChestModal(tx, ty) {
        if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H) return;
        if (!isChestBlockId(world[ty][tx])) return;
        const ctrl = getChestController();
        if (ctrl && typeof ctrl.openModal === "function") {
          ctrl.openModal(tx, ty);
        }
      }

      function closeGambleModal() {
        const ctrl = getGambleController();
        if (ctrl && typeof ctrl.closeModal === "function") {
          ctrl.closeModal();
          return;
        }
        if (gambleModalEl) gambleModalEl.classList.add("hidden");
      }

      function openGambleModal(tx, ty) {
        if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H) return;
        const tileId = Number(world[ty] && world[ty][tx]);
        if (tileId !== GAMBLE_ID) return;
        const ctrl = getGambleController();
        if (ctrl && typeof ctrl.openModal === "function") {
          ctrl.openModal(tx, ty);
          return;
        }
        postLocalSystemChat("Gamble module unavailable.");
      }

      function getAdminBackupOptionsMarkup() {
        if (!adminBackupList.length) {
          return "<option value=''>No backups found</option>";
        }
        return adminBackupList.map((row) => {
          const createdAt = Number(row.createdAt) || 0;
          const when = createdAt > 0 ? formatChatTimestamp(createdAt) : "--:--";
          const by = String(row.createdByUsername || "").trim() || "unknown";
          const label = row.id + " | " + when + " | @" + by;
          const selected = row.id === adminBackupSelectedId ? " selected" : "";
          return "<option value='" + escapeHtml(row.id) + "'" + selected + ">" + escapeHtml(label) + "</option>";
        }).join("");
      }

      function refreshAdminBackups(force) {
        if (!hasAdminPermission("db_restore")) return Promise.resolve([]);
        if (!network.db) return Promise.resolve([]);
        if (adminBackupLoading && !force) return Promise.resolve(adminBackupList.slice());
        adminBackupLoading = true;
        const listFn = typeof backupModule.listBackups === "function"
          ? backupModule.listBackups({
            db: network.db,
            basePath: BASE_PATH,
            limit: 80
          })
          : network.db.ref(BASE_PATH + "/backups").limitToLast(80).once("value").then((snapshot) => {
            const data = snapshot && snapshot.val ? (snapshot.val() || {}) : {};
            return Object.keys(data).map((id) => {
              const value = data[id] || {};
              return {
                id: String(id || ""),
                createdAt: Number(value.createdAt) || 0,
                createdByUsername: (value.createdByUsername || "").toString()
              };
            }).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
          });
        return Promise.resolve(listFn).then((rows) => {
          adminBackupList = Array.isArray(rows) ? rows.filter((row) => row && row.id) : [];
          if (!adminBackupList.some((row) => row.id === adminBackupSelectedId)) {
            adminBackupSelectedId = adminBackupList.length ? adminBackupList[0].id : "";
          }
          if (isAdminOpen) {
            renderAdminPanel();
          }
          return adminBackupList.slice();
        }).catch(() => {
          if (isAdminOpen) {
            postLocalSystemChat("Failed to load backups.");
          }
          return [];
        }).finally(() => {
          adminBackupLoading = false;
        });
      }

      function runDatabaseBackup(sourceTag) {
        if (!network.db || !hasAdminPermission("db_backup")) {
          postLocalSystemChat("Permission denied.");
          return;
        }
        postLocalSystemChat("Creating database backup...");
        const createFn = typeof backupModule.createBackup === "function"
          ? backupModule.createBackup({
            db: network.db,
            firebase,
            basePath: BASE_PATH,
            createdByAccountId: playerProfileId || "",
            createdByUsername: playerName || ""
          })
          : Promise.reject(new Error("backup module unavailable"));
        Promise.resolve(createFn).then((result) => {
          const backupId = (result && result.id ? result.id : "").toString();
          if (backupId) {
            adminBackupSelectedId = backupId;
          }
          logAdminAudit("Admin(" + (sourceTag || "panel") + ") created database backup " + backupId + ".");
          pushAdminAuditEntry("db_backup", "", "backupId=" + backupId);
          postLocalSystemChat("Backup created: " + backupId + ".");
          refreshAdminBackups(true);
        }).catch((error) => {
          const msg = error && error.message ? error.message : "unknown error";
          postLocalSystemChat("Backup failed: " + msg + ".");
        });
      }

      function runDatabaseRestore(backupId, sourceTag) {
        const safeBackupId = String(backupId || "").trim();
        if (!network.db || !hasAdminPermission("db_restore")) {
          postLocalSystemChat("Permission denied.");
          return;
        }
        if (!safeBackupId) {
          postLocalSystemChat("Select a backup to restore.");
          return;
        }
        const accepted = window.confirm("Restore backup " + safeBackupId + "? This replaces current game data but keeps backups.");
        if (!accepted) return;
        postLocalSystemChat("Restoring backup " + safeBackupId + "...");
        const restoreFn = typeof backupModule.restoreBackup === "function"
          ? backupModule.restoreBackup({
            db: network.db,
            firebase,
            basePath: BASE_PATH,
            backupId: safeBackupId
          })
          : Promise.reject(new Error("backup module unavailable"));
        Promise.resolve(restoreFn).then(() => {
          adminBackupSelectedId = safeBackupId;
          logAdminAudit("Admin(" + (sourceTag || "panel") + ") restored database backup " + safeBackupId + ".");
          pushAdminAuditEntry("db_restore", "", "backupId=" + safeBackupId);
          postLocalSystemChat("Backup restored: " + safeBackupId + ".");
          refreshAdminBackups(true);
          if (inWorld && currentWorldId) {
            setTimeout(() => {
              if (!inWorld || !currentWorldId) return;
              switchWorld(currentWorldId, true);
            }, 220);
          }
        }).catch((error) => {
          const msg = error && error.message ? error.message : "unknown error";
          postLocalSystemChat("Restore failed: " + msg + ".");
        });
      }

      function getSelectedBackupId() {
        const backupEl = adminAccountsEl.querySelector(".admin-console-backup");
        const fromUi = backupEl instanceof HTMLSelectElement ? String(backupEl.value || "").trim() : "";
        if (fromUi) {
          adminBackupSelectedId = fromUi;
          return fromUi;
        }
        return String(adminBackupSelectedId || "").trim();
      }

      function downloadSelectedBackupJson() {
        if (!network.db || !hasAdminPermission("db_restore")) {
          postLocalSystemChat("Permission denied.");
          return;
        }
        const backupId = getSelectedBackupId();
        if (!backupId) {
          postLocalSystemChat("Select a backup first.");
          return;
        }
        postLocalSystemChat("Preparing backup JSON...");
        const exportFn = typeof backupModule.exportBackupJson === "function"
          ? backupModule.exportBackupJson({
            db: network.db,
            basePath: BASE_PATH,
            backupId
          })
          : Promise.reject(new Error("backup module unavailable"));
        Promise.resolve(exportFn).then((payload) => {
          const json = JSON.stringify(payload || {}, null, 2);
          const blob = new Blob([json], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "gt-backup-" + backupId + ".json";
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
          logAdminAudit("Admin(panel) downloaded backup JSON " + backupId + ".");
          pushAdminAuditEntry("db_export_json", "", "backupId=" + backupId);
          postLocalSystemChat("Downloaded backup JSON: " + backupId + ".");
        }).catch((error) => {
          const msg = error && error.message ? error.message : "unknown error";
          postLocalSystemChat("Download failed: " + msg + ".");
        });
      }

      function importBackupJsonFile(file) {
        if (!file) return;
        if (!network.db || !hasAdminPermission("db_backup")) {
          postLocalSystemChat("Permission denied.");
          return;
        }
        file.text().then((text) => {
          let parsed = null;
          try {
            parsed = JSON.parse(String(text || "{}"));
          } catch (error) {
            postLocalSystemChat("Invalid JSON file.");
            return;
          }
          postLocalSystemChat("Importing backup JSON...");
          const importFn = typeof backupModule.importBackupJson === "function"
            ? backupModule.importBackupJson({
              db: network.db,
              firebase,
              basePath: BASE_PATH,
              createdByAccountId: playerProfileId || "",
              createdByUsername: playerName || "",
              json: parsed
            })
            : Promise.reject(new Error("backup module unavailable"));
          Promise.resolve(importFn).then((result) => {
            const backupId = (result && result.id ? result.id : "").toString();
            if (backupId) {
              adminBackupSelectedId = backupId;
            }
            logAdminAudit("Admin(panel) imported backup JSON as " + backupId + ".");
            pushAdminAuditEntry("db_import_json", "", "backupId=" + backupId);
            postLocalSystemChat("Imported backup JSON as " + backupId + ".");
            refreshAdminBackups(true);
          }).catch((error) => {
            const msg = error && error.message ? error.message : "unknown error";
            postLocalSystemChat("Import failed: " + msg + ".");
          });
        }).catch(() => {
          postLocalSystemChat("Failed to read JSON file.");
        }).finally(() => {
          if (adminBackupUploadInput) {
            adminBackupUploadInput.value = "";
          }
        });
      }

      function closeFriendModals() {
        const ctrl = getFriendsController();
        if (ctrl && typeof ctrl.closeAll === "function") {
          ctrl.closeAll();
        }
        closeAchievementsMenu();
        closeTitlesMenu();
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
        const playerOptions = accountIds.map((accountId) => {
          const account = adminState.accounts[accountId] || {};
          const username = (account.username || accountId).toString();
          const role = getAccountRole(accountId, username);
          const online = Boolean(adminState.sessions[accountId] && adminState.sessions[accountId].sessionId);
          const label = "@" + username + " [" + role + (online ? ", online" : ", offline") + "]";
          return '<option value="' + escapeHtml(accountId) + '">' + escapeHtml(label) + "</option>";
        }).join("");
        const adminActionOptions = [
          { id: "viewinv", label: "View Inventory", perm: "panel_open" },
          { id: "kick", label: "Kick", perm: "kick" },
          { id: "resetinv", label: "Reset Inventory", perm: "resetinv" },
          { id: "unban", label: "Unban", perm: "unban" },
          { id: "tempban", label: "Temp Ban", perm: "tempban" },
          { id: "permban", label: "Perm Ban", perm: "permban" },
          { id: "freeze", label: "Freeze", perm: "freeze" },
          { id: "unfreeze", label: "Unfreeze", perm: "unfreeze" },
          { id: "godmode", label: "Godmode", perm: "godmode" },
          { id: "setrole", label: "Set Role", perm: hasAdminPermission("setrole") ? "setrole" : "setrole_limited" },
          { id: "give_block", label: "Give Block", perm: "give_block" },
          { id: "give_farmable", label: "Give Farmable", perm: "give_block" },
          { id: "give_seed", label: "Give Seed", perm: "give_block" },
          { id: "give_item", label: "Give Cosmetic", perm: "give_item" },
          { id: "give_title", label: "Add Title", perm: "give_title" },
          { id: "remove_title", label: "Remove Title", perm: "remove_title" },
          { id: "reach", label: "Set Reach", perm: "reach" },
          { id: "announce_user", label: "Private Announcement", perm: "announce_user" },
          { id: "db_backup", label: "Backup DB", perm: "db_backup" },
          { id: "db_restore", label: "Restore Backup", perm: "db_restore" }
        ].filter((row) => hasAdminPermission(row.perm));
        const actionOptionsMarkup = adminActionOptions.map((row) => {
          return '<option value="' + escapeHtml(row.id) + '">' + escapeHtml(row.label) + "</option>";
        }).join("");
        const backupOptionsMarkup = getAdminBackupOptionsMarkup();
        const adminConsoleMarkup = `
          <div class="admin-console admin-card">
            <div class="admin-card-header">
              <div class="admin-audit-title">Action Console</div>
            </div>
            <div class="admin-console-help">Flow: choose player, choose action, fill required fields, then execute.</div>
            <div class="admin-console-grid">
              <div class="admin-console-field admin-console-field-wide">
                <label>Find Player</label>
                <input class="admin-console-player-filter" type="text" placeholder="Filter players...">
              </div>
              <div class="admin-console-field">
                <label>Target</label>
                <select class="admin-console-player">${playerOptions}</select>
              </div>
              <div class="admin-console-field">
                <label>Action</label>
                <select class="admin-console-action">${actionOptionsMarkup}</select>
              </div>
              <div class="admin-console-opt admin-console-opt-duration hidden admin-console-field">
                <label>Duration</label>
                <input class="admin-console-duration" type="text" value="15m" placeholder="60m / 12h / 7d">
              </div>
              <div class="admin-console-opt admin-console-opt-reason hidden admin-console-field admin-console-field-wide">
                <label>Reason</label>
                <input class="admin-console-reason" type="text" maxlength="80" value="Banned by admin" placeholder="Reason">
              </div>
              <div class="admin-console-opt admin-console-opt-role hidden admin-console-field">
                <label>Role</label>
                <select class="admin-console-role">
                  ${assignable.map((r) => '<option value="' + escapeHtml(r) + '">' + escapeHtml(r) + "</option>").join("")}
                </select>
              </div>
              <div class="admin-console-opt admin-console-opt-block hidden admin-console-field">
                <label>Block</label>
                <select class="admin-console-block">
                  ${NORMAL_BLOCK_INVENTORY_IDS.map((id) => '<option value="' + escapeHtml(getBlockKeyById(id)) + '">' + escapeHtml((blockDefs[id] && blockDefs[id].name ? blockDefs[id].name : ("Block " + id)) + " (" + getBlockKeyById(id) + ")") + "</option>").join("")}
                </select>
              </div>
              <div class="admin-console-opt admin-console-opt-farmable hidden admin-console-field">
                <label>Farmable</label>
                <select class="admin-console-farmable">
                  ${FARMABLE_INVENTORY_IDS.map((id) => '<option value="' + escapeHtml(getBlockKeyById(id)) + '">' + escapeHtml((blockDefs[id] && blockDefs[id].name ? blockDefs[id].name : ("Farmable " + id)) + " (" + getBlockKeyById(id) + ")") + "</option>").join("")}
                </select>
              </div>
              <div class="admin-console-opt admin-console-opt-seed hidden admin-console-field">
                <label>Seed</label>
                <select class="admin-console-seed">
                  ${SEED_INVENTORY_IDS.map((id) => '<option value="' + escapeHtml(getBlockKeyById(id)) + '">' + escapeHtml((blockDefs[id] && blockDefs[id].name ? blockDefs[id].name : ("Seed " + id)) + " (" + getBlockKeyById(id) + ")") + "</option>").join("")}
                </select>
              </div>
              <div class="admin-console-opt admin-console-opt-item hidden admin-console-field">
                <label>Cosmetic</label>
                <select class="admin-console-item">
                  ${COSMETIC_ITEMS.map((item) => '<option value="' + escapeHtml(item.id) + '">' + escapeHtml(item.name + " (" + item.id + ")") + "</option>").join("")}
                </select>
              </div>
              <div class="admin-console-opt admin-console-opt-title hidden admin-console-field">
                <label>Title</label>
                <select class="admin-console-title">
                  ${TITLE_CATALOG.map((title) => '<option value="' + escapeHtml(title.id) + '">' + escapeHtml(title.name + " (" + title.id + ")") + "</option>").join("")}
                </select>
              </div>
              <div class="admin-console-opt admin-console-opt-amount hidden admin-console-field">
                <label>Amount</label>
                <input class="admin-console-amount" type="number" min="1" step="1" value="1" placeholder="Amount">
              </div>
              <div class="admin-console-opt admin-console-opt-backup hidden admin-console-field admin-console-field-wide">
                <label>Backup</label>
                <select class="admin-console-backup">${backupOptionsMarkup}</select>
              </div>
              <div class="admin-console-opt admin-console-opt-reach hidden admin-console-field">
                <label>Reach Tiles</label>
                <input class="admin-console-reach" type="number" min="1" max="16" step="0.1" value="4.5" placeholder="Reach tiles">
              </div>
              <div class="admin-console-opt admin-console-opt-godmode hidden admin-console-field">
                <label>Godmode</label>
                <select class="admin-console-godmode">
                  <option value="on">Godmode ON</option>
                  <option value="off">Godmode OFF</option>
                </select>
              </div>
              <div class="admin-console-opt admin-console-opt-message hidden admin-console-field admin-console-field-wide">
                <label>Message</label>
                <input class="admin-console-message" type="text" maxlength="140" placeholder="Message">
              </div>
              <div class="admin-console-run-wrap">
                <button data-admin-act="runconsole">Execute Action</button>
              </div>
            </div>
          </div>
        `;
        const rows = filteredIds.map((accountId) => {
          const account = adminState.accounts[accountId] || {};
          const username = account.username || accountId;
          const discordInfo = account.discordUsername ? ` (@${account.discordUsername} | ${account.discordId})` : "";
          const banStatus = getBanStatus(adminState.bans[accountId], nowMs);
          const banned = banStatus.active;
          const online = Boolean(adminState.sessions[accountId] && adminState.sessions[accountId].sessionId);
          const invTotal = totalInventoryCount(adminState.inventories[accountId]);
          const role = getAccountRole(accountId, username);
          const banText = banned
            ? (banStatus.type === "permanent" ? "Perm Banned" : "Temp Banned (" + formatRemainingMs(banStatus.remainingMs) + ")")
            : "Active";
          const onlineStatusClass = online ? "online" : "offline";
          const banStatusClass = banned ? "banned" : "active";
          return `
            <div class="admin-row" data-account-id="${escapeHtml(accountId)}">
              <div class="admin-meta">
                <strong>@${escapeHtml(username)}${escapeHtml(discordInfo)} <span class="admin-role role-${escapeHtml(role)}">${escapeHtml(role)}</span></strong>
                <div class="admin-status-row">
                  <span class="admin-status ${onlineStatusClass}">${online ? "Online" : "Offline"}</span>
                  <span class="admin-status ${banStatusClass}">${escapeHtml(banText)}</span>
                  <span class="admin-status neutral">Blocks ${invTotal}</span>
                </div>
                <div class="admin-sub">${escapeHtml(accountId)}</div>
              </div>
              <div class="admin-actions-row">
                <button data-admin-act="viewinv" data-account-id="${escapeHtml(accountId)}">View Inv</button>
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
        const antiCheatRows = antiCheatMessages.slice(-220).map((entry) => {
          const sev = (entry.severity || "warn").toString().toLowerCase();
          const level = sev === "critical" ? "danger" : (sev === "warn" ? "warn" : "info");
          return `<div class="admin-audit-row level-${escapeHtml(level)}">${escapeHtml(formatChatTimestamp(entry.createdAt || 0))} | [${escapeHtml(sev.toUpperCase())}] ${escapeHtml(entry.text || "")}</div>`;
        }).join("");
        const antiCheatMarkup = canViewAntiCheatLogs()
          ? `<div class="admin-audit admin-card">
            <div class="admin-card-header">
              <div class="admin-audit-title">Anti-Cheat</div>
              <button data-admin-act="clearanticheat" ${hasAdminPermission("clear_logs") ? "" : "disabled"}>Clear</button>
            </div>
            <div class="admin-anticheat-list">${antiCheatRows || "<div class='admin-audit-row'>No anti-cheat logs yet.</div>"}</div>
          </div>`
          : "";
        const statsCardsMarkup = `
          <div class="admin-dash-stats">
            <div class="admin-dash-stat admin-dash-stat-teal">
              <div class="admin-dash-stat-label">Players (Visible)</div>
              <div class="admin-dash-stat-value">${filteredIds.length}<span>/${accountIds.length}</span></div>
            </div>
            <div class="admin-dash-stat admin-dash-stat-cyan">
              <div class="admin-dash-stat-label">Online Now</div>
              <div class="admin-dash-stat-value">${onlineCount}</div>
            </div>
            <div class="admin-dash-stat admin-dash-stat-red">
              <div class="admin-dash-stat-label">Banned</div>
              <div class="admin-dash-stat-value">${bannedCount}</div>
            </div>
            <div class="admin-dash-stat admin-dash-stat-amber">
              <div class="admin-dash-stat-label">Global Online</div>
              <div class="admin-dash-stat-value">${totalOnlinePlayers}</div>
            </div>
          </div>
        `;
        const roleCommandList = getAvailableRankCommands();
        const commandItemsMarkup = roleCommandList.map((cmd) => {
          return '<div class="admin-cmd-item" data-cmd-text="' + escapeHtml(String(cmd).toLowerCase()) + '"><code>' + escapeHtml(cmd) + "</code></div>";
        }).join("");
        adminAccountsEl.innerHTML = `
          <div class="admin-dashboard">
            <aside class="admin-dash-sidebar">
              <div class="admin-dash-brand">Dashboard</div>
              <div class="admin-dash-user">Signed in as <strong>@${escapeHtml(playerName || "guest")}</strong></div>
              <div class="admin-dash-role">Role: ${escapeHtml(currentAdminRole)}</div>
              <button class="admin-sidebar-btn" data-admin-act="togglecommands">Commands (${roleCommandList.length})</button>
              <div class="admin-summary-hint">Quick: /adminhelp, /where user, /goto user, /bringall, /announce</div>
            </aside>
            <div class="admin-dash-main">
              ${statsCardsMarkup}
              <div class="admin-layout">
                <div class="admin-main">
                  <div class="admin-summary">
                    ${adminConsoleMarkup}
                  </div>
                  <div class="admin-list">
                    ${rows.join("") || "<div class='admin-row'><div class='admin-meta'><strong>No players match filter.</strong></div></div>"}
                  </div>
                </div>
                <div class="admin-sidepanels">
                  ${auditMarkup}
                  ${logsMarkup}
                  ${antiCheatMarkup}
                </div>
              </div>
            </div>
            <div class="admin-commands-modal ${adminCommandsMenuOpen ? "" : "hidden"}">
              <div class="admin-commands-card">
                <div class="admin-card-header">
                  <div class="admin-audit-title">Commands For ${escapeHtml(currentAdminRole)}</div>
                  <button data-admin-act="closecommands">Close</button>
                </div>
                <div class="admin-console-field admin-console-field-wide">
                  <label>Search Commands</label>
                  <input class="admin-cmd-search" type="text" placeholder="Type command or keyword...">
                </div>
                <div class="admin-sidebar-commands-list">${commandItemsMarkup || "<div class='admin-cmd-item'><code>No commands.</code></div>"}</div>
              </div>
            </div>
          </div>
        `;
        const auditListEl = adminAccountsEl.querySelector(".admin-audit-list");
        scrollElementToBottom(auditListEl);
        const logsListEl = adminAccountsEl.querySelector(".admin-logs-list");
        scrollElementToBottom(logsListEl);
        const antiCheatListEl = adminAccountsEl.querySelector(".admin-anticheat-list");
        scrollElementToBottom(antiCheatListEl);
        updateAdminConsoleOptionVisibility();
      }

      function updateAdminConsoleOptionVisibility() {
        const actionEl = adminAccountsEl.querySelector(".admin-console-action");
        if (!(actionEl instanceof HTMLSelectElement)) return;
        const action = String(actionEl.value || "");
        const map = {
          duration: adminAccountsEl.querySelector(".admin-console-opt-duration"),
          reason: adminAccountsEl.querySelector(".admin-console-opt-reason"),
          role: adminAccountsEl.querySelector(".admin-console-opt-role"),
          block: adminAccountsEl.querySelector(".admin-console-opt-block"),
          farmable: adminAccountsEl.querySelector(".admin-console-opt-farmable"),
          seed: adminAccountsEl.querySelector(".admin-console-opt-seed"),
          item: adminAccountsEl.querySelector(".admin-console-opt-item"),
          title: adminAccountsEl.querySelector(".admin-console-opt-title"),
          amount: adminAccountsEl.querySelector(".admin-console-opt-amount"),
          backup: adminAccountsEl.querySelector(".admin-console-opt-backup"),
          reach: adminAccountsEl.querySelector(".admin-console-opt-reach"),
          godmode: adminAccountsEl.querySelector(".admin-console-opt-godmode"),
          message: adminAccountsEl.querySelector(".admin-console-opt-message")
        };
        Object.values(map).forEach((el) => {
          if (el instanceof HTMLElement) el.classList.add("hidden");
        });
        if (action === "tempban") {
          if (map.duration instanceof HTMLElement) map.duration.classList.remove("hidden");
          if (map.reason instanceof HTMLElement) map.reason.classList.remove("hidden");
        } else if (action === "permban") {
          if (map.reason instanceof HTMLElement) map.reason.classList.remove("hidden");
        } else if (action === "setrole") {
          if (map.role instanceof HTMLElement) map.role.classList.remove("hidden");
        } else if (action === "give_block") {
          if (map.block instanceof HTMLElement) map.block.classList.remove("hidden");
          if (map.amount instanceof HTMLElement) map.amount.classList.remove("hidden");
        } else if (action === "give_farmable") {
          if (map.farmable instanceof HTMLElement) map.farmable.classList.remove("hidden");
          if (map.amount instanceof HTMLElement) map.amount.classList.remove("hidden");
        } else if (action === "give_seed") {
          if (map.seed instanceof HTMLElement) map.seed.classList.remove("hidden");
          if (map.amount instanceof HTMLElement) map.amount.classList.remove("hidden");
        } else if (action === "give_item") {
          if (map.item instanceof HTMLElement) map.item.classList.remove("hidden");
          if (map.amount instanceof HTMLElement) map.amount.classList.remove("hidden");
        } else if (action === "give_title" || action === "remove_title") {
          if (map.title instanceof HTMLElement) map.title.classList.remove("hidden");
          if (map.amount instanceof HTMLElement) map.amount.classList.remove("hidden");
        } else if (action === "reach") {
          if (map.reach instanceof HTMLElement) map.reach.classList.remove("hidden");
        } else if (action === "godmode") {
          if (map.godmode instanceof HTMLElement) map.godmode.classList.remove("hidden");
        } else if (action === "announce_user") {
          if (map.message instanceof HTMLElement) map.message.classList.remove("hidden");
        } else if (action === "db_restore") {
          if (map.backup instanceof HTMLElement) map.backup.classList.remove("hidden");
        }
      }

      function handleAdminAction(event) {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const action = target.dataset.adminAct;
        const accountId = target.dataset.accountId;
        if (!action) {
          const row = target.closest(".admin-row");
          if (row instanceof HTMLElement) {
            const rowAccountId = String(row.dataset.accountId || "").trim();
            const playerSelectEl = adminAccountsEl.querySelector(".admin-console-player");
            if (rowAccountId && playerSelectEl instanceof HTMLSelectElement) {
              playerSelectEl.value = rowAccountId;
            }
          }
          return;
        }
        if (!action || !canUseAdminPanel) return;
        if (action === "togglecommands") {
          adminCommandsMenuOpen = !adminCommandsMenuOpen;
          renderAdminPanel();
          return;
        }
        if (action === "closecommands") {
          adminCommandsMenuOpen = false;
          renderAdminPanel();
          return;
        }
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
        if (action === "clearanticheat") {
          if (!network.db || !hasAdminPermission("clear_logs")) return;
          network.db.ref(BASE_PATH + "/anti-cheat-logs").remove().then(() => {
            antiCheatMessages.length = 0;
            renderAdminPanel();
            postLocalSystemChat("Anti-cheat logs cleared.");
            logAdminAudit("Admin(panel) cleared anti-cheat logs.");
            pushAdminAuditEntry("clear_logs", "", "target=anti-cheat");
          }).catch(() => {
            postLocalSystemChat("Failed to clear anti-cheat logs.");
          });
          return;
        }
        if (action === "runconsole") {
          if (!network.db) return;
          const playerSelectEl = adminAccountsEl.querySelector(".admin-console-player");
          const actionSelectEl = adminAccountsEl.querySelector(".admin-console-action");
          if (!(playerSelectEl instanceof HTMLSelectElement) || !(actionSelectEl instanceof HTMLSelectElement)) return;
          const selectedAction = String(actionSelectEl.value || "").trim();
          if (!selectedAction) {
            postLocalSystemChat("Select action first.");
            return;
          }
          if (selectedAction === "db_backup") {
            runDatabaseBackup("panel");
            return;
          }
          if (selectedAction === "db_restore") {
            const backupEl = adminAccountsEl.querySelector(".admin-console-backup");
            const backupId = backupEl instanceof HTMLSelectElement ? (backupEl.value || "") : "";
            runDatabaseRestore(backupId, "panel");
            return;
          }
          const targetAccountId = String(playerSelectEl.value || "").trim();
          if (!targetAccountId) {
            postLocalSystemChat("Select player first.");
            return;
          }
          const targetUsername = (adminState.accounts[targetAccountId] && adminState.accounts[targetAccountId].username) || targetAccountId;
          if (selectedAction === "viewinv") {
            openAdminInventoryModal(targetAccountId);
            return;
          }
          if (selectedAction === "setrole") {
            const roleSelectEl = adminAccountsEl.querySelector(".admin-console-role");
            if (!(roleSelectEl instanceof HTMLSelectElement)) return;
            const nextRole = normalizeAdminRole(roleSelectEl.value || "none");
            const ok = applyAdminRoleChange(targetAccountId, nextRole, "panel");
            if (ok) {
              postLocalSystemChat("Role updated for @" + targetUsername + ".");
            }
            return;
          }
          if (selectedAction === "tempban") {
            const durationEl = adminAccountsEl.querySelector(".admin-console-duration");
            const reasonEl = adminAccountsEl.querySelector(".admin-console-reason");
            const durationText = durationEl instanceof HTMLInputElement ? durationEl.value : "15m";
            const reasonText = reasonEl instanceof HTMLInputElement ? reasonEl.value : "Banned by admin";
            const durationMs = parseDurationToMs(durationText);
            if (!durationMs) {
              postLocalSystemChat("Invalid temp ban duration. Use 60m / 12h / 7d.");
              return;
            }
            applyAdminAction("tempban", targetAccountId, "panel", { durationMs, reason: reasonText, rawDuration: durationText });
            return;
          }
          if (selectedAction === "permban") {
            const reasonEl = adminAccountsEl.querySelector(".admin-console-reason");
            const reasonText = reasonEl instanceof HTMLInputElement ? reasonEl.value : "Banned by admin";
            applyAdminAction("permban", targetAccountId, "panel", { reason: reasonText });
            return;
          }
          if (selectedAction === "give_block") {
            const blockEl = adminAccountsEl.querySelector(".admin-console-block");
            const amountEl = adminAccountsEl.querySelector(".admin-console-amount");
            if (!(blockEl instanceof HTMLSelectElement) || !(amountEl instanceof HTMLInputElement)) return;
            const blockRef = blockEl.value || "";
            const amount = Number(amountEl.value);
            const safeId = parseBlockRef(blockRef);
            if (!NORMAL_BLOCK_INVENTORY_IDS.includes(safeId)) {
              postLocalSystemChat("Selected block is not a normal block.");
              return;
            }
            const ok = applyInventoryGrant(targetAccountId, blockRef, amount, "panel", targetUsername);
            if (ok) {
              postLocalSystemChat("Added " + amount + " of block " + blockRef + " to @" + targetUsername + ".");
            }
            return;
          }
          if (selectedAction === "give_farmable") {
            const farmableEl = adminAccountsEl.querySelector(".admin-console-farmable");
            const amountEl = adminAccountsEl.querySelector(".admin-console-amount");
            if (!(farmableEl instanceof HTMLSelectElement) || !(amountEl instanceof HTMLInputElement)) return;
            const blockRef = farmableEl.value || "";
            const amount = Number(amountEl.value);
            const safeId = parseBlockRef(blockRef);
            if (!FARMABLE_INVENTORY_IDS.includes(safeId)) {
              postLocalSystemChat("Selected block is not a farmable.");
              return;
            }
            const ok = applyInventoryGrant(targetAccountId, blockRef, amount, "panel", targetUsername);
            if (ok) {
              postLocalSystemChat("Added " + amount + " of farmable " + blockRef + " to @" + targetUsername + ".");
            }
            return;
          }
          if (selectedAction === "give_seed") {
            const seedEl = adminAccountsEl.querySelector(".admin-console-seed");
            const amountEl = adminAccountsEl.querySelector(".admin-console-amount");
            if (!(seedEl instanceof HTMLSelectElement) || !(amountEl instanceof HTMLInputElement)) return;
            const seedRef = seedEl.value || "";
            const amount = Number(amountEl.value);
            const ok = applyInventoryGrant(targetAccountId, seedRef, amount, "panel", targetUsername);
            if (ok) {
              postLocalSystemChat("Added " + amount + " of seed " + seedRef + " to @" + targetUsername + ".");
            }
            return;
          }
          if (selectedAction === "give_item") {
            const itemEl = adminAccountsEl.querySelector(".admin-console-item");
            const amountEl = adminAccountsEl.querySelector(".admin-console-amount");
            if (!(itemEl instanceof HTMLSelectElement) || !(amountEl instanceof HTMLInputElement)) return;
            const itemId = itemEl.value || "";
            const amount = Number(amountEl.value);
            const ok = applyCosmeticItemGrant(targetAccountId, itemId, amount, "panel", targetUsername);
            if (ok) {
              postLocalSystemChat("Added item " + itemId + " x" + amount + " to @" + targetUsername + ".");
            }
            return;
          }
          if (selectedAction === "give_title" || selectedAction === "remove_title") {
            const titleEl = adminAccountsEl.querySelector(".admin-console-title");
            const amountEl = adminAccountsEl.querySelector(".admin-console-amount");
            if (!(titleEl instanceof HTMLSelectElement) || !(amountEl instanceof HTMLInputElement)) return;
            const titleId = titleEl.value || "";
            const amount = Number(amountEl.value);
            const removeMode = selectedAction === "remove_title";
            const ok = applyTitleGrant(targetAccountId, titleId, amount, "panel", targetUsername, removeMode);
            if (ok) {
              postLocalSystemChat((removeMode ? "Removed title " : "Added title ") + titleId + " x" + amount + (removeMode ? " from @" : " to @") + targetUsername + ".");
            }
            return;
          }
          if (selectedAction === "reach") {
            if (!hasAdminPermission("reach")) {
              postLocalSystemChat("Permission denied.");
              return;
            }
            if (!ensureCommandReady("reach")) return;
            const reachEl = adminAccountsEl.querySelector(".admin-console-reach");
            const amountRaw = reachEl instanceof HTMLInputElement ? Number(reachEl.value) : NaN;
            if (!Number.isFinite(amountRaw)) {
              postLocalSystemChat("Invalid reach amount.");
              return;
            }
            const targetRole = getAccountRole(targetAccountId, targetUsername);
            if (targetAccountId !== playerProfileId && !canActorAffectTarget(targetAccountId, targetRole)) {
              postLocalSystemChat("Permission denied on target role.");
              return;
            }
            const amount = Math.max(1, Math.min(16, Math.round(amountRaw * 10) / 10));
            issueReachCommand(targetAccountId, amount).then((ok) => {
              if (!ok) {
                postLocalSystemChat("Failed to set reach for @" + targetUsername + ".");
                return;
              }
              postLocalSystemChat("Set @" + targetUsername + " reach to " + amount.toFixed(1) + " tiles.");
              logAdminAudit("Admin(panel) set reach for @" + targetUsername + " to " + amount.toFixed(1) + ".");
              pushAdminAuditEntry("reach", targetAccountId, "amount=" + amount.toFixed(1));
            }).catch(() => {
              postLocalSystemChat("Failed to set reach for @" + targetUsername + ".");
            });
            return;
          }
          if (selectedAction === "announce_user") {
            if (!hasAdminPermission("announce_user")) {
              postLocalSystemChat("Permission denied.");
              return;
            }
            if (!ensureCommandReady("announcep")) return;
            const msgEl = adminAccountsEl.querySelector(".admin-console-message");
            const msg = msgEl instanceof HTMLInputElement ? String(msgEl.value || "").trim() : "";
            if (!msg) {
              postLocalSystemChat("Message is required.");
              return;
            }
            const targetRole = getAccountRole(targetAccountId, targetUsername);
            if (!canActorAffectTarget(targetAccountId, targetRole)) {
              postLocalSystemChat("Permission denied on target role.");
              return;
            }
            issuePrivateAnnouncement(targetAccountId, msg).then((ok) => {
              if (!ok) {
                postLocalSystemChat("Failed to send private announcement.");
                return;
              }
              postLocalSystemChat("Private announcement sent to @" + targetUsername + ".");
              logAdminAudit("Admin(panel) private announced to @" + targetUsername + ".");
              pushAdminAuditEntry("announce_user", targetAccountId, msg.slice(0, 80));
            });
            return;
          }
          if (selectedAction === "godmode") {
            const modeEl = adminAccountsEl.querySelector(".admin-console-godmode");
            const mode = modeEl instanceof HTMLSelectElement ? String(modeEl.value || "on") : "on";
            const enabled = mode !== "off";
            const ok = applyAdminAction("godmode", targetAccountId, "panel", { enabled });
            if (ok) {
              postLocalSystemChat("Set godmode " + (enabled ? "ON" : "OFF") + " for @" + targetUsername + ".");
            }
            return;
          }
          applyAdminAction(selectedAction, targetAccountId, "panel");
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
        if (action === "givetitle" || action === "removetitle") {
          const titleSelect = adminAccountsEl.querySelector('.admin-give-title-id[data-account-id="' + accountId + '"]');
          const amountInput = adminAccountsEl.querySelector('.admin-give-title-amount[data-account-id="' + accountId + '"]');
          if (!(titleSelect instanceof HTMLSelectElement) || !(amountInput instanceof HTMLInputElement)) return;
          const titleId = titleSelect.value || "";
          const amount = Number(amountInput.value);
          const username = (adminState.accounts[accountId] && adminState.accounts[accountId].username) || accountId;
          const ok = applyTitleGrant(accountId, titleId, amount, "panel", username, action === "removetitle");
          if (ok) {
            postLocalSystemChat((action === "removetitle" ? "Removed title " : "Added title ") + titleId + " x" + amount + (action === "removetitle" ? " from @" : " to @") + username + ".");
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
        if (target instanceof HTMLSelectElement && target.classList.contains("admin-console-action")) {
          updateAdminConsoleOptionVisibility();
          if (String(target.value || "") === "db_restore" && !adminBackupList.length) {
            refreshAdminBackups(false);
          }
          return;
        }
        if (target instanceof HTMLSelectElement && target.classList.contains("admin-console-backup")) {
          adminBackupSelectedId = String(target.value || "").trim();
          return;
        }
        if (target instanceof HTMLInputElement && target.classList.contains("admin-console-player-filter")) {
          const select = adminAccountsEl.querySelector(".admin-console-player");
          if (!(select instanceof HTMLSelectElement)) return;
          const query = String(target.value || "").trim().toLowerCase();
          let firstVisible = "";
          for (let i = 0; i < select.options.length; i++) {
            const option = select.options[i];
            const label = String(option.text || "").toLowerCase();
            const value = String(option.value || "").toLowerCase();
            const visible = !query || label.includes(query) || value.includes(query);
            option.hidden = !visible;
            if (visible && !firstVisible) firstVisible = option.value;
          }
          if (firstVisible && (select.selectedOptions.length === 0 || select.selectedOptions[0].hidden)) {
            select.value = firstVisible;
          }
          return;
        }
        if (target instanceof HTMLInputElement && target.classList.contains("admin-cmd-search")) {
          const q = String(target.value || "").trim().toLowerCase();
          const rows = adminAccountsEl.querySelectorAll(".admin-cmd-item[data-cmd-text]");
          let any = false;
          rows.forEach((row) => {
            if (!(row instanceof HTMLElement)) return;
            const txt = String(row.dataset.cmdText || "");
            const show = !q || txt.includes(q);
            row.classList.toggle("hidden", !show);
            if (show) any = true;
          });
          const list = adminAccountsEl.querySelector(".admin-sidebar-commands-list");
          if (list instanceof HTMLElement) {
            let empty = list.querySelector(".admin-cmd-empty");
            if (!any) {
              if (!empty) {
                const el = document.createElement("div");
                el.className = "admin-cmd-empty";
                el.textContent = "No matching commands.";
                list.appendChild(el);
              }
            } else if (empty) {
              empty.remove();
            }
          }
          return;
        }
        if (target instanceof HTMLSelectElement && target.classList.contains("admin-ban-preset")) {
          const accountId = target.dataset.accountId;
          if (!accountId) return;
          if (target.value === "custom") return;
          const durationInput = adminAccountsEl.querySelector('.admin-ban-duration[data-account-id="' + accountId + '"]');
          if (durationInput instanceof HTMLInputElement) {
            durationInput.value = target.value;
          }
          return;
        }
        if (!(target instanceof HTMLInputElement)) return;
        const accountId = String(target.dataset.accountId || "");
        if (!accountId) return;
        const isBlockFilter = target.classList.contains("admin-give-block-filter");
        const isItemFilter = target.classList.contains("admin-give-item-filter");
        const isTitleFilter = target.classList.contains("admin-give-title-filter");
        if (!isBlockFilter && !isItemFilter && !isTitleFilter) return;
        const query = String(target.value || "").trim().toLowerCase();
        let select = null;
        let options = [];
        if (isBlockFilter) {
          select = adminAccountsEl.querySelector('.admin-give-block[data-account-id="' + accountId + '"]');
          options = INVENTORY_IDS.map((id) => {
            const key = getBlockKeyById(id);
            const label = (blockDefs[id] && blockDefs[id].name ? blockDefs[id].name : ("Block " + id)) + " (" + key + ")";
            return { value: key, label };
          });
        } else if (isItemFilter) {
          select = adminAccountsEl.querySelector('.admin-give-item-id[data-account-id="' + accountId + '"]');
          options = COSMETIC_ITEMS.map((item) => ({ value: item.id, label: (item.name || item.id) + " (" + item.id + ")" }));
        } else {
          select = adminAccountsEl.querySelector('.admin-give-title-id[data-account-id="' + accountId + '"]');
          options = TITLE_CATALOG.map((title) => ({ value: title.id, label: title.name + " (" + title.id + ")" }));
        }
        if (!(select instanceof HTMLSelectElement)) return;
        const prev = String(select.value || "");
        const filtered = query
          ? options.filter((opt) => opt.label.toLowerCase().includes(query) || opt.value.toLowerCase().includes(query))
          : options;
        select.innerHTML = filtered.map((opt) => "<option value=\"" + escapeHtml(opt.value) + "\">" + escapeHtml(opt.label) + "</option>").join("");
        if (filtered.length <= 0) {
          select.innerHTML = "<option value=\"\">No results</option>";
          select.disabled = true;
          return;
        }
        select.disabled = false;
        if (filtered.some((opt) => opt.value === prev)) {
          select.value = prev;
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
        const kind = target.value === "cosmetic"
          ? "cosmetic"
          : (target.value === "title"
              ? "title"
              : (target.value === "farmable" ? "farmable" : "block"));
        itemSelect.innerHTML = buildAdminInventoryItemOptions(kind);
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
          const cleanKind = kind === "cosmetic" ? "cosmetic" : (kind === "title" ? "title" : (kind === "farmable" ? "farmable" : "block"));
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
          if (cleanKind === "title") {
            const titleDef = TITLE_LOOKUP[cleanItemId];
            if (!titleDef) return;
            network.db.ref(BASE_PATH + "/player-inventories/" + accountId + "/titleItems/" + cleanItemId).set(0).then(() => {
              setLocalInventoryTitleCount(accountId, cleanItemId, 0);
              logAdminAudit("Admin(inventory-modal) removed all title " + cleanItemId + " for @" + username + ".");
              pushAdminAuditEntry("inventory_remove_all", accountId, "title=" + cleanItemId);
              syncAdminPanelAfterInventoryChange(accountId);
            }).catch(() => {
              postLocalSystemChat("Failed to remove title.");
            });
            return;
          }
          const blockId = parseBlockRef(cleanItemId);
          if (cleanKind === "farmable") {
            if (!FARMABLE_INVENTORY_IDS.includes(blockId)) return;
          } else if (!NORMAL_BLOCK_INVENTORY_IDS.includes(blockId)) {
            return;
          }
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
        if (kindSelect.value === "title") {
          const titleId = String(itemSelect.value || "").trim();
          if (!titleId || !TITLE_LOOKUP[titleId]) return;
          network.db.ref(BASE_PATH + "/player-inventories/" + accountId + "/titleItems/" + titleId).transaction((current) => {
            if (delta > 0) return 1;
            return 0;
          }).then((result) => {
            const next = clampTitleUnlocked(result && result.snapshot && result.snapshot.val ? result.snapshot.val() : 0);
            setLocalInventoryTitleCount(accountId, titleId, next);
            logAdminAudit("Admin(inventory-modal) " + (delta > 0 ? "unlocked " : "removed ") + "title " + titleId + " for @" + username + ".");
            pushAdminAuditEntry(delta > 0 ? "inventory_add" : "inventory_remove", accountId, "title=" + titleId + " unlocked=" + next);
            syncAdminPanelAfterInventoryChange(accountId);
          }).catch(() => {
            postLocalSystemChat("Failed to update title.");
          });
          return;
        }
        const blockKind = kindSelect.value === "farmable" ? "farmable" : "block";
        const blockId = parseBlockRef(itemSelect.value || "");
        if (blockKind === "farmable") {
          if (!FARMABLE_INVENTORY_IDS.includes(blockId)) return;
        } else if (!NORMAL_BLOCK_INVENTORY_IDS.includes(blockId)) {
          return;
        }
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

      function showAnnouncementPopup(message, durationMs) {
        if (!announcementPopupEl || !announcementTextEl) return;
        const text = (message || "").toString().trim().slice(0, 180);
        if (!text) return;
        const safeDuration = Math.max(1200, Math.min(8000, Math.floor(Number(durationMs) || 5000)));
        announcementTextEl.textContent = text;
        announcementPopupEl.classList.remove("hidden");
        if (announcementHideTimer) {
          clearTimeout(announcementHideTimer);
        }
        announcementHideTimer = setTimeout(() => {
          hideAnnouncementPopup();
          announcementHideTimer = 0;
        }, safeDuration);
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
        if (!ensureCommandReady("give_block")) return false;
        if (!hasAdminPermission("give_block")) {
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
        if (!ensureCommandReady("give_item")) return false;
        if (!hasAdminPermission("give_item")) {
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

      function applyTitleGrant(accountId, titleId, amount, sourceTag, targetLabel, removeMode) {
        if (!accountId || !canUseAdminPanel || !network.db) return false;
        if (!ensureCommandReady(removeMode ? "removetitle" : "givetitle")) return false;
        if (!hasAdminPermission(removeMode ? "remove_title" : "give_title")) {
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
        const titleIdSafe = String(titleId || "").trim();
        const titleDef = TITLE_LOOKUP[titleIdSafe] || null;
        if (!titleDef || !Number.isInteger(amountSafe) || amountSafe <= 0) {
          postLocalSystemChat("Usage: " + (removeMode ? "/removetitle" : "/givetitle") + " <user> <title_id> <amount>");
          return false;
        }
        network.db.ref(BASE_PATH + "/player-inventories/" + accountId + "/titleItems/" + titleIdSafe).transaction((current) => {
          return removeMode ? 0 : 1;
        }).then((result) => {
          const next = clampTitleUnlocked(result && result.snapshot && result.snapshot.val ? result.snapshot.val() : 0);
          setLocalInventoryTitleCount(accountId, titleIdSafe, next);
          const target = targetLabel || targetUsername || accountId;
          logAdminAudit("Admin(" + sourceTag + ") " + (removeMode ? "removed title " : "unlocked title ") + titleIdSafe + " " + (removeMode ? "from" : "to") + " @" + target + ".");
          pushAdminAuditEntry(removeMode ? "removetitle" : "givetitle", accountId, "title=" + titleIdSafe + " unlocked=" + next);
          syncAdminPanelAfterInventoryChange(accountId);
        }).catch(() => {
          postLocalSystemChat("Failed to update title.");
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
        const isSelfTarget = accountId === playerProfileId;
        if (!hasAdminPermission(action)) {
          postLocalSystemChat("Permission denied for action: " + action);
          return false;
        }
        if (isSelfTarget && (action === "kick" || action === "tempban" || action === "permban")) {
          postLocalSystemChat("You cannot use " + action + " on yourself.");
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
        if (action === "freeze" || action === "unfreeze") {
          const frozen = action === "freeze";
          issueFreezeCommand(accountId, frozen).then((ok) => {
            if (!ok) return;
            logAdminAudit("Admin(" + sourceTag + ") " + (frozen ? "froze" : "unfroze") + " account " + accountId + ".");
            pushAdminAuditEntry(action, accountId, "");
          }).catch(() => {});
          return true;
        }
        if (action === "godmode") {
          const enabled = Boolean(options.enabled);
          issueGodModeCommand(accountId, enabled).then((ok) => {
            if (!ok) return;
            logAdminAudit("Admin(" + sourceTag + ") set godmode " + (enabled ? "ON" : "OFF") + " for account " + accountId + ".");
            pushAdminAuditEntry("godmode", accountId, "enabled=" + (enabled ? "1" : "0"));
          }).catch(() => {});
          return true;
        }
        if (action === "resetinv") {
          const cosmeticItems = {};
          for (const item of COSMETIC_ITEMS) {
            cosmeticItems[item.id] = 0;
          }
          const titleItems = {};
          for (const title of TITLE_CATALOG) {
            titleItems[title.id] = title.defaultUnlocked ? 1 : 0;
          }
          const resetPayload = {
            1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,
            cosmeticItems,
            titleItems,
            equippedTitle: TITLE_DEFAULT_ID || "",
            equippedCosmetics: { shirts: "", pants: "", shoes: "", hats: "", wings: "", swords: "" }
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

      function normalizeEditReachTiles(value) {
        const n = Number(value);
        const safe = Number.isFinite(n) ? n : DEFAULT_EDIT_REACH_TILES;
        return Math.max(MIN_EDIT_REACH_TILES, Math.min(MAX_EDIT_REACH_TILES, safe));
      }

      function getEditReachTiles() {
        return normalizeEditReachTiles(editReachTiles);
      }

      function setEditReachTiles(value) {
        editReachTiles = normalizeEditReachTiles(value);
      }

      function resetEditReachTiles() {
        editReachTiles = DEFAULT_EDIT_REACH_TILES;
      }

      function issueReachCommand(targetAccountId, reachTiles) {
        if (!network.db || !targetAccountId) return Promise.resolve(false);
        const payload = {
          id: "rch_" + Math.random().toString(36).slice(2, 12),
          reachTiles: normalizeEditReachTiles(reachTiles),
          by: (playerName || "admin").toString().slice(0, 20),
          issuedAt: firebase.database.ServerValue.TIMESTAMP
        };
        return network.db.ref(BASE_PATH + "/account-commands/" + targetAccountId + "/reach").set(payload)
          .then(() => true)
          .catch(() => false);
      }

      function issueFreezeCommand(targetAccountId, frozen) {
        if (!network.db || !targetAccountId) return Promise.resolve(false);
        const commandId = "frz_" + Math.random().toString(36).slice(2, 12);
        const payload = {
          id: commandId,
          frozen: Boolean(frozen),
          by: (playerName || "admin").toString().slice(0, 20),
          issuedAt: firebase.database.ServerValue.TIMESTAMP
        };
        return network.db.ref(BASE_PATH + "/account-commands/" + targetAccountId + "/freeze").set(payload)
          .then(() => true)
          .catch(() => false);
      }

      function issueGodModeCommand(targetAccountId, enabled) {
        if (!network.db || !targetAccountId) return Promise.resolve(false);
        const commandId = "god_" + Math.random().toString(36).slice(2, 12);
        const payload = {
          id: commandId,
          enabled: Boolean(enabled),
          by: (playerName || "admin").toString().slice(0, 20),
          issuedAt: firebase.database.ServerValue.TIMESTAMP
        };
        return network.db.ref(BASE_PATH + "/account-commands/" + targetAccountId + "/godmode").set(payload)
          .then(() => true)
          .catch(() => false);
      }

      function issuePrivateAnnouncement(targetAccountId, messageText) {
        if (!network.db || !targetAccountId) return Promise.resolve(false);
        const commandId = "pa_" + Math.random().toString(36).slice(2, 12);
        const text = (messageText || "").toString().trim().slice(0, 180);
        if (!text) return Promise.resolve(false);
        const payload = {
          id: commandId,
          text,
          actorUsername: (playerName || "admin").toString().slice(0, 20),
          issuedAt: firebase.database.ServerValue.TIMESTAMP
        };
        return network.db.ref(BASE_PATH + "/account-commands/" + targetAccountId + "/announce").set(payload)
          .then(() => true)
          .catch(() => false);
      }

      function issuePrivateMessage(targetAccountId, messageText) {
        if (!network.db || !targetAccountId) return Promise.resolve(false);
        const text = (messageText || "").toString().trim().slice(0, 160);
        if (!text) return Promise.resolve(false);
        const payload = {
          id: "pm_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8),
          fromAccountId: playerProfileId || "",
          fromUsername: (playerName || "").toString().slice(0, 20),
          text,
          createdAt: firebase.database.ServerValue.TIMESTAMP
        };
        return network.db.ref(BASE_PATH + "/account-commands/" + targetAccountId + "/pm").push(payload)
          .then(() => true)
          .catch(() => false);
      }

      function resolveAccountIdByUsernameFast(username) {
        if (!network.db) return Promise.resolve("");
        const normalized = normalizeUsername(username);
        if (!normalized) return Promise.resolve("");
        return network.db.ref(BASE_PATH + "/usernames/" + normalized).once("value")
          .then((snap) => (snap && snap.val ? String(snap.val() || "") : ""))
          .catch(() => "");
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

      function setFrozenState(nextFrozen, byName) {
        const frozen = Boolean(nextFrozen);
        isFrozenByAdmin = frozen;
        frozenByAdminBy = (byName || "").toString().slice(0, 20);
        if (frozen) {
          player.vx = 0;
          player.vy = 0;
          const suffix = frozenByAdminBy ? " by @" + frozenByAdminBy : "";
          postLocalSystemChat("You were frozen" + suffix + ".");
        } else {
          const suffix = frozenByAdminBy ? " by @" + frozenByAdminBy : "";
          postLocalSystemChat("You were unfrozen" + suffix + ".");
        }
      }

      function setGodModeState(nextEnabled, byName) {
        const enabled = Boolean(nextEnabled);
        isGodModeByAdmin = enabled;
        const actor = (byName || "").toString().slice(0, 20);
        if (enabled) {
          const suffix = actor ? " by @" + actor : "";
          postLocalSystemChat("Godmode enabled" + suffix + ".");
          return;
        }
        const suffix = actor ? " by @" + actor : "";
        postLocalSystemChat("Godmode disabled" + suffix + ".");
      }

      function shouldBlockActionForFreeze() {
        if (!isFrozenByAdmin) return false;
        const now = performance.now();
        if (now - lastFrozenHintAtMs > 900) {
          lastFrozenHintAtMs = now;
          postLocalSystemChat("You are frozen and cannot act.");
        }
        return true;
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
        if (typeof commandsModule.handleChatCommand !== "function") return false;
        return commandsModule.handleChatCommand({
          normalizeWorldId,
          switchWorld,
          postLocalSystemChat,
          setDanceUntilMs: (value) => { danceUntilMs = Number(value) || 0; },
          DANCE_DURATION_MS,
          inWorld,
          syncPlayer,
          isWorldLocked,
          isWorldLockOwner,
          notifyWorldLockedDenied,
          getSpawnStructureTiles,
          getSelectedSlot: () => selectedSlot,
          setSelectedSlot: (value) => { selectedSlot = Number(value) || 0; },
          slotOrder,
          WORLD_LOCK_ID,
          LOCK_BLOCK_IDS,
          inventory,
          tryPlace,
          refreshToolbar,
          currentWorldLock,
          setCurrentWorldLock: (value) => { currentWorldLock = value; },
          network,
          tryBreak,
          WORLD_W,
          WORLD_H,
          hasAdminPermission,
          currentAdminRole,
          totalOnlinePlayers,
          remotePlayers,
          currentWorldId,
          canUseAdminPanel,
          findAccountIdByUserRef,
          findOnlineGlobalPlayerByAccountId,
          TILE,
          ensureCommandReady,
          applySelfTeleport,
          pushAdminAuditEntry,
          getAccountRole,
          adminState,
          canActorAffectTarget,
          issuePrivateAnnouncement,
          issueReachCommand,
          logAdminAudit,
          BASE_PATH,
          playerName,
          firebase,
          sendSystemWorldMessage,
          clearLogsData,
          refreshAuditActionFilterOptions,
          renderAdminPanel,
          playerProfileId,
          isGodModeEnabled: () => isGodModeByAdmin,
          issueTeleportCommand,
          player,
          applyAdminAction,
          clearCurrentWorldToBedrock,
          parseBlockRef,
          INVENTORY_IDS,
          FARMABLE_INVENTORY_IDS,
          NORMAL_BLOCK_INVENTORY_IDS,
          getBlockNameById: (id) => {
            const def = blockDefs[Math.floor(Number(id) || 0)];
            return def && def.name ? def.name : "";
          },
          getCosmeticItems: () => COSMETIC_ITEMS,
          TOOL_FIST,
          TOOL_WRENCH,
          spawnWorldDropEntry,
          applyInventoryGrant,
          applyCosmeticItemGrant,
          applyTitleGrant,
          parseDurationToMs,
          applyAdminRoleChange,
          normalizeAdminRole,
          handlePrivateMessageCommand: (command, parts) => {
            const ctrl = getMessagesController();
            if (!ctrl || typeof ctrl.handleCommand !== "function") return false;
            return ctrl.handleCommand(command, parts);
          },
          resolveAccountIdByUsernameFast,
          issuePrivateMessage,
          getLastPrivateMessageFrom: () => lastPrivateMessageFrom
        }, rawText);
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

      function sha256HexJs(text) {
        function rightRotate(value, amount) {
          return (value >>> amount) | (value << (32 - amount));
        }
        function utf8Bytes(str) {
          const out = [];
          for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code < 0x80) {
              out.push(code);
            } else if (code < 0x800) {
              out.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
            } else if (code >= 0xd800 && code <= 0xdbff) {
              i++;
              const low = str.charCodeAt(i);
              const cp = ((code - 0xd800) << 10) + (low - 0xdc00) + 0x10000;
              out.push(
                0xf0 | (cp >> 18),
                0x80 | ((cp >> 12) & 0x3f),
                0x80 | ((cp >> 6) & 0x3f),
                0x80 | (cp & 0x3f)
              );
            } else {
              out.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
            }
          }
          return out;
        }
        const k = [
          0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
          0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
          0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
          0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
          0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
          0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
          0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
          0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
        ];
        const h = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
        const bytes = utf8Bytes(text);
        const bitLenHi = Math.floor((bytes.length * 8) / 0x100000000);
        const bitLenLo = (bytes.length * 8) >>> 0;
        bytes.push(0x80);
        while ((bytes.length % 64) !== 56) bytes.push(0);
        bytes.push((bitLenHi >>> 24) & 0xff, (bitLenHi >>> 16) & 0xff, (bitLenHi >>> 8) & 0xff, bitLenHi & 0xff);
        bytes.push((bitLenLo >>> 24) & 0xff, (bitLenLo >>> 16) & 0xff, (bitLenLo >>> 8) & 0xff, bitLenLo & 0xff);
        const w = new Array(64);
        for (let i = 0; i < bytes.length; i += 64) {
          for (let t = 0; t < 16; t++) {
            const j = i + t * 4;
            w[t] = ((bytes[j] << 24) | (bytes[j + 1] << 16) | (bytes[j + 2] << 8) | bytes[j + 3]) >>> 0;
          }
          for (let t = 16; t < 64; t++) {
            const s0 = rightRotate(w[t - 15], 7) ^ rightRotate(w[t - 15], 18) ^ (w[t - 15] >>> 3);
            const s1 = rightRotate(w[t - 2], 17) ^ rightRotate(w[t - 2], 19) ^ (w[t - 2] >>> 10);
            w[t] = (((w[t - 16] + s0) >>> 0) + ((w[t - 7] + s1) >>> 0)) >>> 0;
          }
          let a = h[0], b = h[1], c = h[2], d = h[3], e = h[4], f = h[5], g = h[6], hh = h[7];
          for (let t = 0; t < 64; t++) {
            const S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
            const ch = (e & f) ^ (~e & g);
            const temp1 = (((((hh + S1) >>> 0) + ch) >>> 0) + ((k[t] + w[t]) >>> 0)) >>> 0;
            const S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
            const maj = (a & b) ^ (a & c) ^ (b & c);
            const temp2 = (S0 + maj) >>> 0;
            hh = g; g = f; f = e; e = (d + temp1) >>> 0;
            d = c; c = b; b = a; a = (temp1 + temp2) >>> 0;
          }
          h[0] = (h[0] + a) >>> 0; h[1] = (h[1] + b) >>> 0; h[2] = (h[2] + c) >>> 0; h[3] = (h[3] + d) >>> 0;
          h[4] = (h[4] + e) >>> 0; h[5] = (h[5] + f) >>> 0; h[6] = (h[6] + g) >>> 0; h[7] = (h[7] + hh) >>> 0;
        }
        return h.map((n) => n.toString(16).padStart(8, "0")).join("");
      }

      async function sha256Hex(text) {
        const subtle = (globalThis.crypto && globalThis.crypto.subtle) ? globalThis.crypto.subtle : null;
        if (subtle) {
          const bytes = new TextEncoder().encode(text);
          const hash = await subtle.digest("SHA-256", bytes);
          const array = Array.from(new Uint8Array(hash));
          return array.map((b) => b.toString(16).padStart(2, "0")).join("");
        }
        return sha256HexJs(text);
      }

      async function getAuthDb() {
        if (typeof dbModule.getOrInitAuthDb === "function") {
          return dbModule.getOrInitAuthDb({
            network,
            firebaseRef: (typeof firebase !== "undefined" ? firebase : window.firebase || null),
            firebaseConfig: window.FIREBASE_CONFIG,
            getFirebaseApiKey: window.getFirebaseApiKey
          });
        }
        const withTimeout = (promise, timeoutMs, label) => {
          const ms = Math.max(1000, Number(timeoutMs) || 8000);
          let timer = null;
          const timeoutPromise = new Promise((_, reject) => {
            timer = setTimeout(() => reject(new Error(label + " timed out.")), ms);
          });
          return Promise.race([Promise.resolve(promise), timeoutPromise]).finally(() => {
            if (timer) clearTimeout(timer);
          });
        };
        if (!window.firebase) {
          throw new Error("Firebase SDK not loaded.");
        }

        const firebaseConfig = window.FIREBASE_CONFIG;

        // If apiKey missing, try to fetch it at runtime
        if (firebaseConfig && !firebaseConfig.apiKey && typeof window.getFirebaseApiKey === "function") {
          try {
            const fetched = await withTimeout(window.getFirebaseApiKey(), 8000, "API key fetch");

            // Support BOTH formats:
            // 1) new API: { ok: true, key: "..." }
            // 2) old API: "..."
            const apiKey =
              (fetched && typeof fetched === "object" && fetched.ok && typeof fetched.key === "string" && fetched.key) ||
              (typeof fetched === "string" && fetched.trim()) ||
              null;

            if (!apiKey) {
              throw new Error("Invalid API key response format.");
            }

            firebaseConfig.apiKey = apiKey;
          } catch (error) {
            throw new Error("Failed to fetch Firebase API key at runtime. " + (error?.message || error));
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

      function withAuthTimeout(promise, label, timeoutMs) {
        const ms = Math.max(1000, Number(timeoutMs) || 12000);
        let timer = null;
        const timeoutPromise = new Promise((_, reject) => {
          timer = setTimeout(() => {
            reject(new Error((label || "Auth operation") + " timed out."));
          }, ms);
        });
        return Promise.race([Promise.resolve(promise), timeoutPromise]).finally(() => {
          if (timer) clearTimeout(timer);
        });
      }

      function getWorkerSessionEndpoint() {
        const packetEndpoint = String(window.PACKET_API_ENDPOINT || "").trim();
        if (packetEndpoint) {
          if (/\/packet\/?$/i.test(packetEndpoint)) {
            return packetEndpoint.replace(/\/packet\/?$/i, "/session");
          }
          return packetEndpoint.replace(/\/+$/, "") + "/session";
        }
        const origin = String(window.location && window.location.origin || "").trim();
        if (!origin) return "";
        return origin.replace(/\/+$/, "") + "/session";
      }

      async function requestWorkerSession(action, accountId, username, sessionId) {
        const endpoint = getWorkerSessionEndpoint();
        if (!endpoint) throw new Error("Session endpoint is not configured.");
        const payload = {
          action: String(action || "").trim().toLowerCase(),
          accountId: String(accountId || "").trim(),
          username: String(username || "").trim(),
          sessionId: String(sessionId || "").trim()
        };
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "omit"
        });
        const body = await response.json().catch(() => ({}));
        if (!response.ok || !body || body.ok !== true) {
          const msg = body && body.error && body.error.message
            ? String(body.error.message)
            : ("Session API error (" + response.status + ")");
          throw new Error(msg);
        }
        return body;
      }

      async function readAuthValueWithRetry(path, label) {
        const safePath = String(path || "").trim();
        if (!safePath) throw new Error("Invalid auth read path.");
        const firstDb = await withAuthTimeout(getAuthDb(), "Auth DB init", 16000);
        try {
          return await withAuthTimeout(firstDb.ref(safePath).once("value"), label, 18000);
        } catch (error) {
          const message = String((error && error.message) || "");
          if (!/timed out/i.test(message)) throw error;
          setAuthStatus((label || "Auth read") + " is slow, retrying...", false);
          try {
            if (firstDb && typeof firstDb.goOffline === "function") firstDb.goOffline();
            if (firstDb && typeof firstDb.goOnline === "function") firstDb.goOnline();
          } catch (e) {
            // ignore reconnect hint failures
          }
          const secondDb = await withAuthTimeout(getAuthDb(), "Auth DB reconnect", 20000);
          return withAuthTimeout(secondDb.ref(safePath).once("value"), label + " retry", 28000);
        }
      }

      async function reserveAccountSession(db, accountId, username) {
        const sessionId = "s_" + Math.random().toString(36).slice(2, 12);
        const startedAtLocal = Date.now();
        let claimedSessionId = sessionId;
        try {
          const out = await withAuthTimeout(
            requestWorkerSession("claim", accountId, username, sessionId),
            "Session reservation",
            14000
          );
          claimedSessionId = String(out && out.sessionId || sessionId);
        } catch (error) {
          const message = String((error && error.message) || "");
          if (/already active/i.test(message)) {
            addClientLog("Session denied for @" + username + " (already active).");
            throw new Error("This account is already active in another client.");
          }
          throw error;
        }
        playerSessionRef = null;
        playerSessionId = claimedSessionId;
        playerSessionStartedAt = startedAtLocal;
        chatMessages.length = 0;
        recentChatFingerprintAt.clear();
        renderChatMessages();
        addClientLog("Session created for @" + username + " (" + claimedSessionId + ").", accountId, username, claimedSessionId);
      }

      function releaseAccountSession() {
        const accountId = String(playerProfileId || "").trim();
        const sid = String(playerSessionId || "").trim();
        if (accountId && sid) {
          requestWorkerSession("release", accountId, playerName, sid).catch(() => {});
          if (playerName) addClientLog("Session released for @" + playerName + ".");
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
          const db = await withAuthTimeout(getAuthDb(), "Auth DB init", 12000);
          network.db = db;
          const usernameRef = db.ref(BASE_PATH + "/usernames/" + username);
          const accountId = "acc_" + Math.random().toString(36).slice(2, 12);
          const reserve = await withAuthTimeout(usernameRef.transaction((current) => {
            if (current) return;
            return accountId;
          }), "Username reservation", 12000);
          if (!reserve.committed) {
            throw new Error("Username already exists.");
          }
          const passwordHash = await withAuthTimeout(sha256Hex(password), "Password hashing", 8000);
          await withAuthTimeout(db.ref(BASE_PATH + "/accounts/" + accountId).set({
            username,
            passwordHash,
            createdAt: firebase.database.ServerValue.TIMESTAMP
          }), "Account create write", 12000);
          addClientLog("Account created: @" + username + " (" + accountId + ").", accountId, username, "");
          await withAuthTimeout(reserveAccountSession(db, accountId, username), "Session create", 12000);
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
          const db = await withAuthTimeout(getAuthDb(), "Auth DB init", 12000);
          network.db = db;
          const usernameSnap = await readAuthValueWithRetry(BASE_PATH + "/usernames/" + username, "Lookup username");
          const accountId = usernameSnap.val();
          if (!accountId) {
            throw new Error("Account not found.");
          }
          const accountSnap = await readAuthValueWithRetry(BASE_PATH + "/accounts/" + accountId, "Load account");
          const account = accountSnap.val() || {};
          const passwordHash = await withAuthTimeout(sha256Hex(password), "Password hashing", 8000);
          if (account.passwordHash !== passwordHash) {
            addClientLog("Login failed for @" + username + " (invalid password).", accountId, username, "");
            throw new Error("Invalid password.");
          }
          const banSnap = await readAuthValueWithRetry(BASE_PATH + "/bans/" + accountId, "Load ban status");
          if (banSnap.exists()) {
            const banValue = banSnap.val();
            const status = getBanStatus(banValue, Date.now());
            if (status.expired) {
              db.ref(BASE_PATH + "/bans/" + accountId).remove().catch(() => {});
            } else if (status.active) {
              addClientLog("Login blocked for @" + username + " (banned).", accountId, username, "");
              const reasonText = status.reason ? " Reason: " + status.reason + "." : "";
              if (status.type === "permanent") {
                throw new Error("This account is permanently banned." + reasonText);
              }
              throw new Error("This account is temporarily banned for " + formatRemainingMs(status.remainingMs) + "." + reasonText);
            }
          }
          await withAuthTimeout(reserveAccountSession(db, accountId, username), "Session create", 12000);
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
        hasSeenInitialSessionSnapshot = false;
        missingSessionSinceMs = 0;
        loadQuestsFromLocal();
        postDailyQuestStatus();
        const gemsCtrl = getGemsController();
        if (gemsCtrl && typeof gemsCtrl.reset === "function") {
          gemsCtrl.reset();
        }
        updateGemsLabel();
        adminSearchQuery = "";
        adminAuditActionFilter = "";
        adminAuditActorFilter = "";
        adminAuditTargetFilter = "";
        adminBackupList = [];
        adminBackupSelectedId = "";
        adminBackupLoading = false;
        if (adminSearchInput) adminSearchInput.value = "";
        if (adminAuditActionFilterEl) adminAuditActionFilterEl.value = "";
        if (adminAuditActorFilterEl) adminAuditActorFilterEl.value = "";
        if (adminAuditTargetFilterEl) adminAuditTargetFilterEl.value = "";
        currentAdminRole = normalizeAdminRole(getConfiguredRoleForUsername(username));
        refreshAdminCapabilities();
        if (antiCheatController && typeof antiCheatController.onSessionStart === "function") {
          antiCheatController.onSessionStart();
        }
        addClientLog("Authenticated as @" + username + ".");
        authScreenEl.classList.add("hidden");
        gameShellEl.classList.remove("hidden");
        authPasswordEl.value = "";
        if (!gameBootstrapped) {
          bootstrapGame();
          gameBootstrapped = true;
        } else {
          loadInventoryFromLocal();
          loadProgressionFromLocal();
          if (!loadAchievementsFromLocal()) {
            achievementsState = normalizeAchievementsState({});
          }
          if (!loadQuestsFromLocal()) {
            questsState = normalizeQuestsState({});
          }
          refreshToolbar();
          //postDailyQuestStatus();
          setInWorldState(false);
          updateOnlineCount();
          initFirebaseMultiplayer();
        }
      }

      function getInventoryStorageKey() {
        return "growtopia_inventory_" + (playerProfileId || "guest");
      }

      function getProgressionStorageKey() {
        return "growtopia_progression_" + (playerProfileId || "guest");
      }

      function normalizeProgressionRecord(raw) {
        if (typeof progressionModule.normalizeProgress === "function") {
          return progressionModule.normalizeProgress(raw || {});
        }
        const xp = Math.max(0, Math.floor(Number(raw && raw.xp) || 0));
        return {
          xp,
          level: Math.max(1, Math.floor(Number(raw && raw.level) || 1)),
          xpIntoLevel: Math.max(0, Math.floor(Number(raw && raw.xpIntoLevel) || 0)),
          xpForNext: Math.max(0, Math.floor(Number(raw && raw.xpForNext) || 100))
        };
      }

      function buildProgressionPayload() {
        const normalized = normalizeProgressionRecord({ xp: progressionXp });
        return {
          xp: normalized.xp,
          level: normalized.level,
          xpIntoLevel: normalized.xpIntoLevel,
          xpForNext: normalized.xpForNext
        };
      }

      function ensureLevelTitleUnlocks(level, announce, persistInventory) {
        if (typeof progressionModule.getTitleUnlockIdsForLevel !== "function") return false;
        const unlockIds = progressionModule.getTitleUnlockIdsForLevel(level);
        if (!Array.isArray(unlockIds) || !unlockIds.length) return false;
        const unlockedNames = [];
        for (let i = 0; i < unlockIds.length; i++) {
          const id = String(unlockIds[i] || "").trim();
          if (!id || !TITLE_LOOKUP[id]) continue;
          if ((titleInventory[id] || 0) > 0) continue;
          titleInventory[id] = 1;
          unlockedNames.push(TITLE_LOOKUP[id].name || id);
        }
        if (!unlockedNames.length) return false;
        if (persistInventory) {
          saveInventory();
        }
        refreshToolbar();
        if (announce) {
          postLocalSystemChat("Unlocked title(s): " + unlockedNames.join(", ") + ".");
        }
        return true;
      }

      function applyProgressionFromRecord(record, announceUnlocks) {
        const normalized = normalizeProgressionRecord(record || {});
        progressionXp = normalized.xp;
        progressionLevel = normalized.level;
        progressionXpIntoLevel = normalized.xpIntoLevel;
        progressionXpForNext = normalized.xpForNext;
        ensureLevelTitleUnlocks(progressionLevel, Boolean(announceUnlocks), false);
      }

      function saveProgressionToLocal() {
        saveJsonToLocalStorage(getProgressionStorageKey(), buildProgressionPayload());
      }

      function loadProgressionFromLocal() {
        const parsed = loadJsonFromLocalStorage(getProgressionStorageKey());
        if (!parsed) return false;
        applyProgressionFromRecord(parsed, false);
        return true;
      }

      function flushProgressionSave() {
        progressionSaveTimer = 0;
        saveProgressionToLocal();
        if (!network.enabled || !network.progressRef) return;
        const payload = buildProgressionPayload();
        payload.updatedAt = firebase.database.ServerValue.TIMESTAMP;
        network.progressRef.set(payload).catch(() => {
          setNetworkState("Progression save error", true);
        });
      }

      function scheduleProgressionSave(immediate) {
        if (immediate) {
          if (progressionSaveTimer) { clearTimeout(progressionSaveTimer); progressionSaveTimer = 0; }
          flushProgressionSave();
          return;
        }
        if (!progressionSaveTimer) {
          progressionSaveTimer = setTimeout(flushProgressionSave, 260);
        }
      }

      function awardXp(amount, reason) {
        const add = Math.max(0, Math.floor(Number(amount) || 0));
        if (!add) return;
        const before = buildProgressionPayload();
        let next = null;
        if (typeof progressionModule.gainXp === "function") {
          const result = progressionModule.gainXp({ xp: before.xp }, add);
          next = result && result.after ? result.after : null;
        }
        if (!next) {
          next = normalizeProgressionRecord({ xp: before.xp + add });
        }
        progressionXp = next.xp;
        progressionLevel = next.level;
        progressionXpIntoLevel = next.xpIntoLevel;
        progressionXpForNext = next.xpForNext;
        const leveledUp = progressionLevel > before.level;
        ensureLevelTitleUnlocks(progressionLevel, leveledUp, true);
        scheduleProgressionSave(false);
        if (leveledUp) {
          postLocalSystemChat("Level up! You are now level " + progressionLevel + ".");
          if (reason) {
            postLocalSystemChat("+ " + add + " XP (" + reason + ").");
          }
        }
        syncPlayer(leveledUp);
      }

      function getAchievementsStorageKey() {
        return "growtopia_achievements_" + (playerProfileId || "guest");
      }

      function normalizeAchievementsState(raw) {
        if (typeof achievementsModule.normalizeState === "function") {
          return achievementsModule.normalizeState(raw || {});
        }
        return raw && typeof raw === "object" ? raw : {};
      }

      function buildAchievementsPayload() {
        if (typeof achievementsModule.buildPayload === "function") {
          return achievementsModule.buildPayload(achievementsState || {});
        }
        return normalizeAchievementsState(achievementsState || {});
      }

      function getAchievementsSummary() {
        const state = normalizeAchievementsState(achievementsState || {});
        achievementsState = state;
        if (typeof achievementsModule.summarize === "function") {
          const summary = achievementsModule.summarize(state);
          return {
            completed: Math.max(0, Math.floor(Number(summary && summary.completed) || 0)),
            total: Math.max(0, Math.floor(Number(summary && summary.total) || 0))
          };
        }
        const rows = state.achievements && typeof state.achievements === "object" ? state.achievements : {};
        let completed = 0;
        const ids = Object.keys(rows);
        for (let i = 0; i < ids.length; i++) {
          if (rows[ids[i]] && rows[ids[i]].completed) completed += 1;
        }
        return { completed, total: ids.length };
      }

      function saveAchievementsToLocal() {
        saveJsonToLocalStorage(getAchievementsStorageKey(), buildAchievementsPayload());
      }

      function loadAchievementsFromLocal() {
        const parsed = loadJsonFromLocalStorage(getAchievementsStorageKey());
        if (!parsed) return false;
        achievementsState = normalizeAchievementsState(parsed);
        return true;
      }

      function flushAchievementsSave() {
        achievementsSaveTimer = 0;
        saveAchievementsToLocal();
        if (!network.enabled || !network.achievementsRef) return;
        const payload = buildAchievementsPayload();
        payload.updatedAt = firebase.database.ServerValue.TIMESTAMP;
        network.achievementsRef.set(payload).catch(() => {
          setNetworkState("Achievement save error", true);
        });
      }

      function scheduleAchievementsSave(immediate) {
        if (immediate) {
          if (achievementsSaveTimer) { clearTimeout(achievementsSaveTimer); achievementsSaveTimer = 0; }
          flushAchievementsSave();
          return;
        }
        if (!achievementsSaveTimer) {
          achievementsSaveTimer = setTimeout(flushAchievementsSave, 260);
        }
      }

      function applyAchievementEvent(eventType, payload) {
        if (typeof achievementsModule.applyEvent !== "function") return;
        const result = achievementsModule.applyEvent(achievementsState || {}, eventType, payload || {});
        if (!result || !result.state) return;
        achievementsState = normalizeAchievementsState(result.state);
        if (!result.changed) return;
        if (achievementsModalEl && !achievementsModalEl.classList.contains("hidden")) {
          renderAchievementsMenu();
        }
        const unlocked = Array.isArray(result.unlockedNow) ? result.unlockedNow : [];
        for (let i = 0; i < unlocked.length; i++) {
          const id = String(unlocked[i] || "");
          if (!id) continue;
          const def = typeof achievementsModule.getAchievementById === "function"
            ? achievementsModule.getAchievementById(id)
            : null;
          postLocalSystemChat("Achievement unlocked: " + (def && def.label ? def.label : id) + ".");
        }
        scheduleAchievementsSave(false);
      }

      function addPlayerGems(amount, trackAchievement) {
        const delta = Math.floor(Number(amount) || 0);
        if (!delta) return 0;
        const gemsCtrl = getGemsController();
        if (!gemsCtrl || typeof gemsCtrl.add !== "function" || typeof gemsCtrl.get !== "function") return 0;
        const before = Math.max(0, Math.floor(Number(gemsCtrl.get()) || 0));
        gemsCtrl.add(delta);
        const after = Math.max(0, Math.floor(Number(gemsCtrl.get()) || 0));
        const gained = Math.max(0, after - before);
        updateGemsLabel();
        if (trackAchievement && gained > 0) {
          applyAchievementEvent("gems_earned", { amount: gained });
        }
        return gained;
      }

      function renderAchievementsMenu() {
        if (!achievementsBodyEl || !achievementsActionsEl || !achievementsTitleEl) return;
        const state = normalizeAchievementsState(achievementsState || {});
        achievementsState = state;
        const catalog = typeof achievementsModule.getCatalog === "function" ? achievementsModule.getCatalog() : [];
        const summary = getAchievementsSummary();
        achievementsTitleEl.textContent = "Achievements (" + summary.completed + "/" + summary.total + ")";
        if (!catalog.length) {
          achievementsBodyEl.innerHTML = "<div class='vending-empty'>No achievements configured.</div>";
          achievementsActionsEl.innerHTML = "<button type='button' data-ach-act='close'>Close</button>";
          return;
        }
        const rows = [];
        for (let i = 0; i < catalog.length; i++) {
          const def = catalog[i];
          const row = state.achievements && state.achievements[def.id] ? state.achievements[def.id] : { progress: 0, completed: false };
          const target = Math.max(1, Math.floor(Number(def.target) || 1));
          const progress = Math.max(0, Math.min(target, Math.floor(Number(row.progress) || 0)));
          const pct = Math.max(0, Math.min(100, (progress / target) * 100));
          rows.push(
            "<div class='vending-section'>" +
              "<div class='vending-stat-grid'>" +
                "<div class='vending-stat'><span>Achievement</span><strong>" + escapeHtml(def.label || def.id) + "</strong></div>" +
                "<div class='vending-stat'><span>Status</span><strong>" + (row.completed ? "Completed" : "In progress") + "</strong></div>" +
                "<div class='vending-stat'><span>Progress</span><strong>" + progress + " / " + target + "</strong></div>" +
              "</div>" +
              "<div style='margin-top:8px;height:8px;border-radius:999px;background:rgba(18,35,52,0.8);border:1px solid rgba(128,182,232,0.35);overflow:hidden;'>" +
                "<div style='height:100%;width:" + pct.toFixed(2) + "%;background:" + (row.completed ? "linear-gradient(90deg,#7cff9b,#5ff1c8)" : "linear-gradient(90deg,#55d6ff,#8fb4ff)") + ";'></div>" +
              "</div>" +
            "</div>"
          );
        }
        achievementsBodyEl.innerHTML = rows.join("");
        achievementsActionsEl.innerHTML = "<button type='button' data-ach-act='close'>Close</button>";
      }

      function closeAchievementsMenu() {
        if (achievementsModalEl) achievementsModalEl.classList.add("hidden");
      }

      function openAchievementsMenu() {
        renderAchievementsMenu();
        if (achievementsModalEl) achievementsModalEl.classList.remove("hidden");
      }

      function renderQuestsMenu() {
        if (!questsBodyEl || !questsActionsEl || !questsTitleEl) return;
        const state = normalizeQuestsState(questsState || {});
        questsState = state;
        const catalog = typeof questsModule.getCatalog === "function" ? questsModule.getCatalog() : [];
        if (!catalog.length) {
          questsTitleEl.textContent = "Quests";
          questsBodyEl.innerHTML = "<div class='vending-empty'>No quests configured.</div>";
          questsActionsEl.innerHTML = "<button type='button' data-quest-act='close'>Close</button>";
          return;
        }

        const daily = [];
        const other = [];
        let doneCount = 0;
        for (let i = 0; i < catalog.length; i++) {
          const def = catalog[i];
          const group = String(def.category || "daily") === "other" ? other : daily;
          group.push(def);
          const rowSource = String(def.category || "daily") === "other"
            ? (state.globalQuests && state.globalQuests[def.id])
            : (state.quests && state.quests[def.id]);
          if (rowSource && rowSource.completed) doneCount++;
        }
        questsTitleEl.textContent = "Quests (" + doneCount + "/" + catalog.length + ")";

        const renderGroup = (title, defs, groupKey) => {
          if (!defs.length) return "";
          const rows = [];
          for (let i = 0; i < defs.length; i++) {
            const def = defs[i];
            const rowSource = groupKey === "other"
              ? (state.globalQuests && state.globalQuests[def.id])
              : (state.quests && state.quests[def.id]);
            const row = rowSource || { progress: 0, completed: false, rewarded: false };
            const target = Math.max(1, Math.floor(Number(def.target) || 1));
            const progress = Math.max(0, Math.min(target, Math.floor(Number(row.progress) || 0)));
            const pct = Math.max(0, Math.min(100, (progress / target) * 100));
            const status = row.rewarded ? "Rewarded" : (row.completed ? "Completed" : "In progress");
            const rewardText = describeQuestRewards(def.rewards || {});
            rows.push(
              "<div class='vending-section'>" +
                "<div class='vending-stat-grid'>" +
                  "<div class='vending-stat'><span>Quest</span><strong>" + escapeHtml(def.label || def.id) + "</strong></div>" +
                  "<div class='vending-stat'><span>Status</span><strong>" + escapeHtml(status) + "</strong></div>" +
                  "<div class='vending-stat'><span>Progress</span><strong>" + progress + " / " + target + "</strong></div>" +
                "</div>" +
                "<div style='margin-top:8px;height:8px;border-radius:999px;background:rgba(18,35,52,0.8);border:1px solid rgba(128,182,232,0.35);overflow:hidden;'>" +
                  "<div style='height:100%;width:" + pct.toFixed(2) + "%;background:" + (row.completed ? "linear-gradient(90deg,#7cff9b,#5ff1c8)" : "linear-gradient(90deg,#55d6ff,#8fb4ff)") + ";'></div>" +
                "</div>" +
                (rewardText ? ("<div class='sign-hint' style='margin-top:8px;'>Reward: " + escapeHtml(rewardText) + "</div>") : "") +
              "</div>"
            );
          }
          return "<div class='vending-section'><strong>" + escapeHtml(title) + "</strong></div>" + rows.join("");
        };

        questsBodyEl.innerHTML = renderGroup("Daily Quests", daily, "daily") + renderGroup("Other Quests", other, "other");
        questsActionsEl.innerHTML = "<button type='button' data-quest-act='close'>Close</button>";
      }

      function closeQuestsMenu() {
        if (questsModalEl) questsModalEl.classList.add("hidden");
      }

      function openQuestsMenu() {
        renderQuestsMenu();
        if (questsModalEl) questsModalEl.classList.remove("hidden");
      }

      function renderTitlesMenu() {
        if (!titlesBodyEl || !titlesActionsEl || !titlesTitleEl) return;
        const unlocked = [];
        for (const title of TITLE_CATALOG) {
          if ((titleInventory[title.id] || 0) <= 0) continue;
          unlocked.push(title);
        }
        titlesTitleEl.textContent = "Titles (" + unlocked.length + "/" + TITLE_CATALOG.length + ")";
        if (!unlocked.length) {
          titlesBodyEl.innerHTML = "<div class='vending-empty'>No titles unlocked yet.</div>";
          titlesActionsEl.innerHTML = "<button type='button' data-title-act='close'>Close</button>";
          return;
        }
        const rows = [];
        for (let i = 0; i < unlocked.length; i++) {
          const title = unlocked[i];
          const equipped = equippedTitleId === title.id;
          const previewName = formatTitleWithUsername(title.name || title.id, playerName || "Player");
          const style = normalizeTitleStyle(title.style);
          const previewClass = "title-menu-preview" + (style.rainbow ? " chat-title-rainbow" : "");
          const previewStyle = [];
          if (!style.rainbow) {
            previewStyle.push("color:" + escapeHtml(title.color || "#8fb4ff"));
          }
          if (style.bold) {
            previewStyle.push("font-weight:800");
          }
          if (style.glow) {
            const glowColor = escapeHtml(style.glowColor || title.color || "#8fb4ff");
            previewStyle.push("text-shadow:0 0 10px " + glowColor + ",0 0 16px " + glowColor);
          }
          rows.push(
            "<div class='vending-section'>" +
              "<div class='vending-stat-grid'>" +
                "<div class='vending-stat'><span>Title</span><strong class='" + previewClass + "'" + (previewStyle.length ? (" style='" + previewStyle.join(";") + "'") : "") + ">" + escapeHtml(previewName) + "</strong></div>" +
                //"<div class='vending-stat'><span>Status</span><strong>" + (equipped ? "Equipped" : "Unlocked") + "</strong></div>" +
              "</div>" +
              "<div class='vending-actions' style='justify-content:flex-start;'>" +
                "<button type='button' data-title-equip='" + escapeHtml(title.id) + "'>" + (equipped ? "Unequip" : "Equip") + "</button>" +
              "</div>" +
            "</div>"
          );
        }
        titlesBodyEl.innerHTML = rows.join("");
        titlesActionsEl.innerHTML = "<button type='button' data-title-act='close'>Close</button>";
      }

      function closeTitlesMenu() {
        if (titlesModalEl) titlesModalEl.classList.add("hidden");
      }

      function openTitlesMenu() {
        renderTitlesMenu();
        if (titlesModalEl) titlesModalEl.classList.remove("hidden");
      }

      function getQuestsStorageKey() {
        return "growtopia_quests_" + (playerProfileId || "guest");
      }

      function normalizeQuestsState(raw) {
        if (typeof questsModule.normalizeState === "function") {
          return questsModule.normalizeState(raw || {}, Date.now());
        }
        return raw && typeof raw === "object" ? raw : {};
      }

      function buildQuestsPayload() {
        if (typeof questsModule.buildPayload === "function") {
          return questsModule.buildPayload(questsState || {});
        }
        return normalizeQuestsState(questsState || {});
      }

      function saveQuestsToLocal() {
        saveJsonToLocalStorage(getQuestsStorageKey(), buildQuestsPayload());
      }

      function loadQuestsFromLocal() {
        const parsed = loadJsonFromLocalStorage(getQuestsStorageKey());
        if (!parsed) return false;
        questsState = normalizeQuestsState(parsed);
        return true;
      }

      function describeQuestRewards(rewards) {
        const row = rewards && typeof rewards === "object" ? rewards : {};
        const parts = [];
        const gems = Math.max(0, Math.floor(Number(row.gems) || 0));
        if (gems > 0) parts.push(gems + " gems");
        const cosmeticId = String(row.cosmeticId || "").trim();
        const cosmeticAmount = Math.max(1, Math.floor(Number(row.cosmeticAmount) || 1));
        if (cosmeticId) {
          let cosmeticName = cosmeticId;
          for (let i = 0; i < COSMETIC_ITEMS.length; i++) {
            if (COSMETIC_ITEMS[i] && COSMETIC_ITEMS[i].id === cosmeticId) {
              cosmeticName = COSMETIC_ITEMS[i].name || cosmeticId;
              break;
            }
          }
          parts.push(cosmeticAmount + "x " + cosmeticName);
        }
        const titleId = String(row.titleId || "").trim();
        const titleAmount = Math.max(1, Math.floor(Number(row.titleAmount) || 1));
        if (titleId && TITLE_LOOKUP[titleId]) {
          parts.push(titleAmount + "x title " + (TITLE_LOOKUP[titleId].name || titleId));
        }
        return parts.join(", ");
      }

      function grantQuestRewards(questDef) {
        const def = questDef && typeof questDef === "object" ? questDef : null;
        if (!def) return false;
        const rewards = def.rewards && typeof def.rewards === "object" ? def.rewards : {};
        let changed = false;
        const gems = Math.max(0, Math.floor(Number(rewards.gems) || 0));
        if (gems > 0) {
          const gained = addPlayerGems(gems, true);
          if (gained > 0) changed = true;
        }
        const cosmeticId = String(rewards.cosmeticId || "").trim();
        if (cosmeticId && cosmeticInventory.hasOwnProperty(cosmeticId)) {
          const amount = Math.max(1, Math.floor(Number(rewards.cosmeticAmount) || 1));
          cosmeticInventory[cosmeticId] = clampInventoryCount((cosmeticInventory[cosmeticId] || 0) + amount);
          changed = true;
        }
        const titleId = String(rewards.titleId || "").trim();
        if (titleId && TITLE_LOOKUP[titleId]) {
          if ((titleInventory[titleId] || 0) <= 0) {
            titleInventory[titleId] = 1;
            changed = true;
          }
        }
        if (changed) {
          saveInventory();
          refreshToolbar();
          syncPlayer(true);
        }
        const categoryLabel = String(def.category || "daily") === "other" ? "Quest" : "Daily quest";
        const rewardText = describeQuestRewards(rewards);
        if (rewardText) {
          postLocalSystemChat(categoryLabel + " complete: " + (def.label || def.id) + " -> " + rewardText + ".");
        } else {
          postLocalSystemChat(categoryLabel + " complete: " + (def.label || def.id) + ".");
        }
        return changed;
      }

      function flushQuestsSave() {
        questsSaveTimer = 0;
        saveQuestsToLocal();
        if (!network.enabled || !network.questsRef) return;
        const payload = buildQuestsPayload();
        payload.updatedAt = firebase.database.ServerValue.TIMESTAMP;
        network.questsRef.set(payload).catch(() => {
          setNetworkState("Quest save error", true);
        });
      }

      function scheduleQuestsSave(immediate) {
        if (immediate) {
          if (questsSaveTimer) { clearTimeout(questsSaveTimer); questsSaveTimer = 0; }
          flushQuestsSave();
          return;
        }
        if (!questsSaveTimer) {
          questsSaveTimer = setTimeout(flushQuestsSave, 260);
        }
      }

      function applyQuestEvent(eventType, payload) {
        if (typeof questsModule.applyEvent !== "function") return;
        const result = questsModule.applyEvent(questsState || {}, eventType, payload || {});
        if (!result || !result.state) return;
        questsState = normalizeQuestsState(result.state);
        if (!result.changed) return;
        const completed = Array.isArray(result.completedNow) ? result.completedNow : [];
        for (let i = 0; i < completed.length; i++) {
          const questId = String(completed[i] || "");
          if (!questId) continue;
          const row = questsState && questsState.quests ? questsState.quests[questId] : null;
          if (!row || row.rewarded) continue;
          const def = typeof questsModule.getQuestById === "function"
            ? questsModule.getQuestById(questId)
            : null;
          grantQuestRewards(def);
          if (typeof questsModule.markRewarded === "function") {
            const marked = questsModule.markRewarded(questsState, questId);
            if (marked && marked.state) questsState = normalizeQuestsState(marked.state);
          } else {
            row.rewarded = true;
          }
        }
        scheduleQuestsSave(false);
      }

      function postDailyQuestStatus() {
        const state = normalizeQuestsState(questsState || {});
        questsState = state;
        const catalog = typeof questsModule.getCatalog === "function" ? questsModule.getCatalog() : [];
        if (!Array.isArray(catalog) || !catalog.length) return;
        const pending = [];
        for (let i = 0; i < catalog.length; i++) {
          const def = catalog[i];
          if (String(def.category || "daily") !== "daily") continue;
          const row = state.quests && state.quests[def.id] ? state.quests[def.id] : null;
          if (!row || row.rewarded) continue;
          pending.push((def.label || def.id) + " (" + Math.max(0, Number(row.progress) || 0) + "/" + Math.max(1, Number(def.target) || 1) + ")");
        }
        if (!pending.length) {
          postLocalSystemChat("Daily quests completed for today.");
          return;
        }
        postLocalSystemChat("Daily quests: " + pending.slice(0, 3).join(" | "));
      }

      function clampInventoryCount(value) {
        const n = Number(value);
        const safe = Number.isFinite(n) ? Math.floor(n) : 0;
        return Math.max(0, Math.min(INVENTORY_ITEM_LIMIT, safe));
      }

      function clampTitleUnlocked(value) {
        return Number(value) > 0 ? 1 : 0;
      }

      function getLockCurrencyConfig() {
        return LOCK_CURRENCY_DEFS.slice();
      }

      function getAutoLockDefsAsc() {
        return LOCK_CURRENCY_DEFS.filter((row) => row.autoConvert !== false).slice().sort((a, b) => a.value - b.value);
      }

      function getNonAutoLockDefsDesc() {
        return LOCK_CURRENCY_DEFS.filter((row) => row.autoConvert === false).slice().sort((a, b) => b.value - a.value);
      }

      function getAutoLockValue(inv) {
        const source = inv && typeof inv === "object" ? inv : inventory;
        let total = 0;
        for (const row of getAutoLockDefsAsc()) {
          total += Math.max(0, Math.floor(Number(source[row.id]) || 0)) * row.value;
        }
        return Math.max(0, Math.floor(total));
      }

      function getNonAutoLockValue(inv) {
        const source = inv && typeof inv === "object" ? inv : inventory;
        let total = 0;
        for (const row of getNonAutoLockDefsDesc()) {
          total += Math.max(0, Math.floor(Number(source[row.id]) || 0)) * row.value;
        }
        return Math.max(0, Math.floor(total));
      }

      function getTotalLockValue(inv) {
        const source = inv && typeof inv === "object" ? inv : inventory;
        let total = 0;
        for (const row of LOCK_CURRENCY_DEFS) {
          const count = Math.max(0, Math.floor(Number(source[row.id]) || 0));
          total += count * row.value;
        }
        return Math.max(0, Math.floor(total));
      }

      function setAutoLockValue(inv, totalValue) {
        const source = inv && typeof inv === "object" ? inv : inventory;
        let remaining = Math.max(0, Math.floor(Number(totalValue) || 0));
        const defs = getAutoLockDefsAsc().slice().sort((a, b) => b.value - a.value);
        if (!defs.length) return;
        for (let i = 0; i < defs.length; i++) {
          const row = defs[i];
          if (!row || row.id <= 0) continue;
          const count = row.value > 0 ? Math.floor(remaining / row.value) : 0;
          const next = clampInventoryCount(count);
          source[row.id] = next;
          remaining -= next * row.value;
        }
        if (remaining > 0 && defs.length) {
          const base = defs[defs.length - 1];
          source[base.id] = clampInventoryCount(Math.max(0, Math.floor(Number(source[base.id]) || 0)) + remaining);
        }
      }

      function setNonAutoLockValue(inv, totalValue) {
        const source = inv && typeof inv === "object" ? inv : inventory;
        let remaining = Math.max(0, Math.floor(Number(totalValue) || 0));
        const defs = getNonAutoLockDefsDesc();
        if (!defs.length) return;
        for (let i = 0; i < defs.length; i++) {
          const row = defs[i];
          const count = row.value > 0 ? Math.floor(remaining / row.value) : 0;
          const next = clampInventoryCount(count);
          source[row.id] = next;
          remaining -= next * row.value;
        }
      }

      function distributeLockValueToInventory(inv, totalValue) {
        const source = inv && typeof inv === "object" ? inv : inventory;
        const targetTotal = Math.max(0, Math.floor(Number(totalValue) || 0));
        const nonAutoTotal = getNonAutoLockValue(source);
        const autoTarget = Math.max(0, targetTotal - nonAutoTotal);
        setAutoLockValue(source, autoTarget);
      }

      function spendLockValue(inv, amount) {
        const source = inv && typeof inv === "object" ? inv : inventory;
        const cost = Math.max(0, Math.floor(Number(amount) || 0));
        if (!cost) return true;
        const autoTotal = getAutoLockValue(source);
        const nonAutoTotal = getNonAutoLockValue(source);
        if ((autoTotal + nonAutoTotal) < cost) return false;
        if (autoTotal >= cost) {
          setAutoLockValue(source, autoTotal - cost);
          return true;
        }
        const remainingCost = cost - autoTotal;
        setAutoLockValue(source, 0);
        setNonAutoLockValue(source, Math.max(0, nonAutoTotal - remainingCost));
        return true;
      }

      function addLockValue(inv, amount) {
        const source = inv && typeof inv === "object" ? inv : inventory;
        const add = Math.max(0, Math.floor(Number(amount) || 0));
        if (!add) return;
        const autoTotal = getAutoLockValue(source);
        setAutoLockValue(source, autoTotal + add);
      }

      function getNextHigherAutoLockDef(lockId) {
        const defs = LOCK_CURRENCY_DEFS.filter((row) => row.autoConvert !== false).slice().sort((a, b) => a.value - b.value);
        const idx = defs.findIndex((row) => row.id === lockId);
        if (idx < 0 || idx >= defs.length - 1) return null;
        return defs[idx + 1];
      }

      function getNextLowerAutoLockDef(lockId) {
        const defs = LOCK_CURRENCY_DEFS.filter((row) => row.autoConvert !== false).slice().sort((a, b) => a.value - b.value);
        const idx = defs.findIndex((row) => row.id === lockId);
        if (idx <= 0) return null;
        return defs[idx - 1];
      }

      function convertLockByDoubleClick(lockId) {
        const safeId = Math.max(0, Math.floor(Number(lockId) || 0));
        const selfDef = LOCK_CURRENCY_DEFS.find((row) => row.id === safeId);
        if (!selfDef || selfDef.autoConvert === false) return;
        const higher = getNextHigherAutoLockDef(safeId);
        if (higher) {
          const current = Math.max(0, Math.floor(Number(inventory[safeId]) || 0));
          const needed = Math.max(1, Math.floor(higher.value / selfDef.value));
          const currentHigher = Math.max(0, Math.floor(Number(inventory[higher.id]) || 0));
          if (current >= needed && currentHigher < INVENTORY_ITEM_LIMIT) {
            inventory[safeId] = current - needed;
            inventory[higher.id] = currentHigher + 1;
            manualLockConvertHoldUntilMs = performance.now() + 1800;
            saveInventory();
            refreshToolbar(true);
            postLocalSystemChat("Converted " + needed + " " + (blockDefs[safeId] && blockDefs[safeId].name || "locks") + " into 1 " + (blockDefs[higher.id] && blockDefs[higher.id].name || "lock") + ".");
            return;
          }
        }
        const lower = getNextLowerAutoLockDef(safeId);
        if (!lower) return;
        const current = Math.max(0, Math.floor(Number(inventory[safeId]) || 0));
        if (current <= 0) return;
        const ratio = Math.max(1, Math.floor(selfDef.value / lower.value));
        const lowerNow = Math.max(0, Math.floor(Number(inventory[lower.id]) || 0));
        if ((lowerNow + ratio) > INVENTORY_ITEM_LIMIT) {
          postLocalSystemChat("Cannot convert: " + (blockDefs[lower.id] && blockDefs[lower.id].name || "target lock") + " would exceed " + INVENTORY_ITEM_LIMIT + ".");
          return;
        }
        inventory[safeId] = current - 1;
        inventory[lower.id] = lowerNow + ratio;
        manualLockConvertHoldUntilMs = performance.now() + 1800;
        saveInventory();
        refreshToolbar(true);
        postLocalSystemChat("Converted 1 " + (blockDefs[safeId] && blockDefs[safeId].name || "lock") + " into " + ratio + " " + (blockDefs[lower.id] && blockDefs[lower.id].name || "locks") + ".");
      }

      function autoConvertWorldLocksInInventory(force) {
        if (!force && !PASSIVE_LOCK_AUTOCONVERT) return false;
        if (performance.now() < manualLockConvertHoldUntilMs) return false;
        const before = getTotalLockValue(inventory);
        distributeLockValueToInventory(inventory, before);
        const after = getTotalLockValue(inventory);
        return before !== after;
      }

      function clampLocalInventoryAll() {
        autoConvertWorldLocksInInventory();
        for (const id of INVENTORY_IDS) {
          inventory[id] = clampInventoryCount(inventory[id]);
        }
        if (typeof cosmeticsModule.clampInventory === "function") {
          cosmeticsModule.clampInventory(cosmeticInventory, COSMETIC_ITEMS, clampInventoryCount);
        } else {
          for (const item of COSMETIC_ITEMS) {
            cosmeticInventory[item.id] = clampInventoryCount(cosmeticInventory[item.id]);
          }
        }
        for (const title of TITLE_CATALOG) {
          titleInventory[title.id] = clampTitleUnlocked(titleInventory[title.id]);
        }
      }

      function ensureDefaultTitleUnlocked() {
        if (!TITLE_DEFAULT_ID) return;
        if ((titleInventory[TITLE_DEFAULT_ID] || 0) <= 0) {
          titleInventory[TITLE_DEFAULT_ID] = 1;
        }
      }

      function getTitleDef(titleId) {
        const id = String(titleId || "").trim();
        return id ? (TITLE_LOOKUP[id] || null) : null;
      }

      function formatTitleWithUsername(titleText, username) {
        const template = String(titleText || "");
        if (!template) return "";
        const uname = String(username || "Player").slice(0, 16);
        return template.replace(/\{username\}/gi, uname);
      }

      function normalizeTitleStyle(styleRaw) {
        const style = styleRaw && typeof styleRaw === "object" ? styleRaw : {};
        return {
          bold: Boolean(style.bold),
          glow: Boolean(style.glow),
          rainbow: Boolean(style.rainbow),
          glowColor: String(style.glowColor || "").trim().slice(0, 24)
        };
      }

      function getTitleStyleById(titleId) {
        const def = getTitleDef(titleId);
        return normalizeTitleStyle(def && def.style);
      }

      function shouldShowNameAlongsideTitle(titleText, username) {
        const safeTitle = String(titleText || "").trim().toLowerCase();
        const safeUser = String(username || "").trim().toLowerCase();
        if (!safeTitle || !safeUser) return true;
        return !safeTitle.includes(safeUser);
      }

      function getRainbowTitleColor(nowMs) {
        const t = (Number(nowMs) || performance.now()) * 0.12;
        return "hsl(" + (Math.floor(t) % 360) + " 95% 66%)";
      }

      function getEquippedTitleDef() {
        const def = getTitleDef(equippedTitleId);
        if (!def) return null;
        if ((titleInventory[def.id] || 0) <= 0) return null;
        return def;
      }

      function getEquippedTitlePayload() {
        const def = getEquippedTitleDef();
        if (!def) return { id: "", name: "", color: "", style: normalizeTitleStyle(null) };
        return {
          id: def.id,
          name: formatTitleWithUsername(def.name, playerName),
          color: def.color || "#8fb4ff",
          style: normalizeTitleStyle(def.style)
        };
      }

      function applyInventoryFromRecord(record) {
        for (const id of INVENTORY_IDS) {
          const keyName = getBlockKeyById(id);
          const directValue = Number(record && record[id]);
          const keyValue = keyName ? Number(record && record[keyName]) : NaN;
          const value = Number.isFinite(directValue) ? directValue : keyValue;
          inventory[id] = clampInventoryCount(value);
        }
        autoConvertWorldLocksInInventory();
        if (typeof cosmeticsModule.applyFromRecord === "function") {
          cosmeticsModule.applyFromRecord({
            record,
            cosmeticInventory,
            equippedCosmetics,
            items: COSMETIC_ITEMS,
            lookup: COSMETIC_LOOKUP,
            slots: COSMETIC_SLOTS,
            clampCount: clampInventoryCount
          });
        }
        const titleRecord = record && record.titleItems || {};
        for (const title of TITLE_CATALOG) {
          const nestedValue = Number(titleRecord[title.id]);
          const topLevelValue = Number(record && record[title.id]);
          let finalValue = 0;
          if (Number.isFinite(nestedValue)) finalValue = clampTitleUnlocked(nestedValue);
          if (!finalValue && Number.isFinite(topLevelValue)) finalValue = clampTitleUnlocked(topLevelValue);
          if (!finalValue && title.defaultUnlocked) finalValue = 1;
          titleInventory[title.id] = clampTitleUnlocked(finalValue);
        }
        ensureDefaultTitleUnlocked();
        const equippedTitleRaw = String(record && record.equippedTitle || "");
        equippedTitleId = equippedTitleRaw && TITLE_LOOKUP[equippedTitleRaw] && (titleInventory[equippedTitleRaw] || 0) > 0
          ? equippedTitleRaw
          : "";
        if (!equippedTitleId && TITLE_DEFAULT_ID && (titleInventory[TITLE_DEFAULT_ID] || 0) > 0) {
          equippedTitleId = TITLE_DEFAULT_ID;
        }
        const gemsCtrl = getGemsController();
        if (gemsCtrl && typeof gemsCtrl.readFromRecord === "function") {
          gemsCtrl.readFromRecord(record || {});
        }
        updateGemsLabel();
      }

      function normalizeRemoteEquippedCosmetics(raw) {
        if (typeof cosmeticsModule.normalizeRemoteEquipped === "function") {
          return cosmeticsModule.normalizeRemoteEquipped(raw, COSMETIC_SLOTS, COSMETIC_LOOKUP);
        }
        return { shirts: "", pants: "", shoes: "", hats: "", wings: "", swords: "" };
      }

      function buildInventoryPayload() {
        clampLocalInventoryAll();
        const payload = {};
        for (const id of INVENTORY_IDS) {
          payload[id] = clampInventoryCount(inventory[id]);
        }
        if (typeof cosmeticsModule.writePayload === "function") {
          cosmeticsModule.writePayload(payload, cosmeticInventory, equippedCosmetics, COSMETIC_ITEMS, COSMETIC_SLOTS, clampInventoryCount);
        } else {
          const itemPayload = {};
          for (const item of COSMETIC_ITEMS) {
            itemPayload[item.id] = clampInventoryCount(cosmeticInventory[item.id]);
          }
          payload.cosmeticItems = itemPayload;
          payload.equippedCosmetics = {};
          for (const slot of COSMETIC_SLOTS) {
            payload.equippedCosmetics[slot] = equippedCosmetics[slot] || "";
          }
        }
        const titlePayload = {};
        for (const title of TITLE_CATALOG) {
          titlePayload[title.id] = clampTitleUnlocked(titleInventory[title.id]);
        }
        payload.titleItems = titlePayload;
        payload.equippedTitle = getEquippedTitlePayload().id || "";
        const gemsCtrl = getGemsController();
        if (gemsCtrl && typeof gemsCtrl.writeToPayload === "function") {
          gemsCtrl.writeToPayload(payload);
        } else {
          payload.gems = 0;
        }
        return payload;
      }

      function updateGemsLabel() {
        if (!gemsCountEl) return;
        const gemsCtrl = getGemsController();
        if (gemsCtrl && typeof gemsCtrl.formatLabel === "function") {
          gemsCountEl.textContent = gemsCtrl.formatLabel();
        } else {
          gemsCountEl.textContent = "0 gems";
        }
        const shopCtrl = getShopController();
        if (shopCtrl && typeof shopCtrl.isOpen === "function" && shopCtrl.isOpen() && typeof shopCtrl.render === "function") {
          shopCtrl.render();
        }
      }

      function loadInventoryFromLocal() {
        const parsed = loadJsonFromLocalStorage(getInventoryStorageKey());
        if (!parsed) return false;
        applyInventoryFromRecord(parsed);
        return true;
      }

      function saveInventoryToLocal() {
        saveJsonToLocalStorage(getInventoryStorageKey(), buildInventoryPayload());
      }

      function saveInventory(immediate = true) {
        if (immediate) {
          if (inventorySaveTimer) { clearTimeout(inventorySaveTimer); inventorySaveTimer = 0; }
          clampLocalInventoryAll();
          saveInventoryToLocal();
          if (network.enabled && network.inventoryRef) {
            network.inventoryRef.set(buildInventoryPayload()).catch(() => {});
          }
          return;
        }
        if (!inventorySaveTimer) {
          inventorySaveTimer = setTimeout(() => {
            inventorySaveTimer = 0;
            saveInventory(true);
          }, 1000);
        }
      }

      function schedulePickupInventoryFlush() {
        if (pickupInventoryFlushTimer) return;
        pickupInventoryFlushTimer = window.setTimeout(() => {
          pickupInventoryFlushTimer = 0;
          saveInventory(true);
          refreshToolbar();
        }, 70);
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
        return "default-world";
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
        for (let x = 0; x < WORLD_W; x++) {
          if (WORLD_H - 2 >= 0) w[WORLD_H - 2][x] = SPAWN_BASE_ID;
          if (WORLD_H - 1 >= 0) w[WORLD_H - 1][x] = SPAWN_BASE_ID;
        }
        if (typeof worldModule.applySpawnStructureToGrid === "function") {
          worldModule.applySpawnStructureToGrid(w, WORLD_W, WORLD_H, SPAWN_TILE_X, SPAWN_TILE_Y, SPAWN_DOOR_ID, SPAWN_BASE_ID);
        }
        return w;
      }

      function getSpawnStructureTiles() {
        const safeTx = Math.max(0, Math.min(WORLD_W - 1, Math.floor(Number(spawnTileX))));
        const safeTy = Math.max(0, Math.min(WORLD_H - 2, Math.floor(Number(spawnTileY))));
        return {
          door: { tx: safeTx, ty: safeTy, id: SPAWN_DOOR_ID },
          base: { tx: safeTx, ty: safeTy + 1, id: SPAWN_BASE_ID }
        };
      }

      function setSpawnStructureTile(tx, ty) {
        const rawTx = Number(tx);
        const rawTy = Number(ty);
        const nextTx = Number.isFinite(rawTx) ? Math.floor(rawTx) : SPAWN_TILE_X;
        const nextTy = Number.isFinite(rawTy) ? Math.floor(rawTy) : SPAWN_TILE_Y;
        const safeTx = Math.max(0, Math.min(WORLD_W - 1, nextTx));
        const safeTy = Math.max(0, Math.min(WORLD_H - 2, nextTy));
        spawnTileX = safeTx;
        spawnTileY = safeTy;
      }

      function resetSpawnStructureTile() {
        setSpawnStructureTile(SPAWN_TILE_X, SPAWN_TILE_Y);
      }

      function refreshSpawnStructureFromWorld() {
        for (let ty = 0; ty < WORLD_H; ty++) {
          const row = world[ty];
          if (!Array.isArray(row)) continue;
          for (let tx = 0; tx < WORLD_W; tx++) {
            if (row[tx] === SPAWN_DOOR_ID) {
              setSpawnStructureTile(tx, ty);
              return;
            }
          }
        }
        resetSpawnStructureTile();
      }

      function applySpawnStructureFromBlockMap(blockMap) {
        const data = blockMap && typeof blockMap === "object" ? blockMap : {};
        for (const [key, rawId] of Object.entries(data)) {
          if (Math.floor(Number(rawId)) !== SPAWN_DOOR_ID) continue;
          const parts = String(key).split("_");
          if (parts.length !== 2) continue;
          const tx = Math.floor(Number(parts[0]));
          const ty = Math.floor(Number(parts[1]));
          if (!Number.isInteger(tx) || !Number.isInteger(ty)) continue;
          if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H) continue;
          setSpawnStructureTile(tx, ty);
          return true;
        }
        return false;
      }

      function applySpawnStructureToGrid(grid) {
        if (!Array.isArray(grid) || !grid.length) return;
        const tiles = getSpawnStructureTiles();
        if (typeof worldModule.applySpawnStructureToGrid === "function") {
          worldModule.applySpawnStructureToGrid(grid, WORLD_W, WORLD_H, tiles.door.tx, tiles.door.ty, SPAWN_DOOR_ID, SPAWN_BASE_ID);
          return;
        }
        grid[tiles.door.ty][tiles.door.tx] = tiles.door.id;
        grid[tiles.base.ty][tiles.base.tx] = tiles.base.id;
      }

      function getProtectedTileRequiredId(tx, ty) {
        if (ty >= WORLD_H - 2 && tx >= 0 && tx < WORLD_W) return SPAWN_BASE_ID;
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

      function buildSpawnStructureCleanupUpdates(blockMap, keepDoorTx, keepDoorTy) {
        const safeDoorTx = Math.max(0, Math.min(WORLD_W - 1, Math.floor(Number(keepDoorTx) || 0)));
        const safeDoorTy = Math.max(0, Math.min(WORLD_H - 2, Math.floor(Number(keepDoorTy) || 0)));
        const keepDoorKey = safeDoorTx + "_" + safeDoorTy;
        const keepBaseKey = safeDoorTx + "_" + (safeDoorTy + 1);
        const updates = {};
        const data = blockMap && typeof blockMap === "object" ? blockMap : {};
        Object.keys(data).forEach((key) => {
          const id = Math.floor(Number(data[key]));
          if (!Number.isInteger(id)) return;
          if (id === SPAWN_DOOR_ID) {
            if (key !== keepDoorKey) {
              updates[key] = null;
            }
            return;
          }
          if (id !== SPAWN_BASE_ID || key === keepBaseKey) return;
          const tile = parseTileKey(key);
          if (!tile) return;
          if (tile.ty < WORLD_H - 2) {
            updates[key] = null;
          }
        });
        updates[keepDoorKey] = SPAWN_DOOR_ID;
        updates[keepBaseKey] = SPAWN_BASE_ID;
        return updates;
      }

      function cleanupSpawnStructureInWorldData() {
        const tiles = getSpawnStructureTiles();
        for (let ty = 0; ty < WORLD_H; ty++) {
          const row = world[ty];
          if (!Array.isArray(row)) continue;
          for (let tx = 0; tx < WORLD_W; tx++) {
            const id = row[tx];
            if (id === SPAWN_DOOR_ID && (tx !== tiles.door.tx || ty !== tiles.door.ty)) {
              row[tx] = 0;
              clearTileDamage(tx, ty);
              continue;
            }
            if (id === SPAWN_BASE_ID && ty < WORLD_H - 2 && (tx !== tiles.base.tx || ty !== tiles.base.ty)) {
              row[tx] = 0;
              clearTileDamage(tx, ty);
            }
          }
        }
        world[tiles.door.ty][tiles.door.tx] = SPAWN_DOOR_ID;
        world[tiles.base.ty][tiles.base.tx] = SPAWN_BASE_ID;
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
        if (particleController && typeof particleController.clear === "function") {
          particleController.clear();
        }
        clearAllTileDamage();
        const ctrl = getVendingController();
        if (ctrl && typeof ctrl.clearAll === "function") ctrl.clearAll();
        const gambleCtrl = getGambleController();
        if (gambleCtrl && typeof gambleCtrl.clearAll === "function") gambleCtrl.clearAll();
        const donationCtrl = getDonationController();
        if (donationCtrl && typeof donationCtrl.clearAll === "function") donationCtrl.clearAll();
        const chestCtrl = getChestController();
        if (chestCtrl && typeof chestCtrl.clearAll === "function") chestCtrl.clearAll();
        const signCtrl = getSignController();
        if (signCtrl && typeof signCtrl.clearAll === "function") signCtrl.clearAll();
        displayItemsByTile.clear();
        doorAccessByTile.clear();
        antiGravityByTile.clear();
        clearTreePlants();
        cameraConfigsByTile.clear();
        cameraLogsByTile.clear();
        closeSignModal();
        closeWorldLockModal();
        closeDoorModal();
        closeCameraModal();
        closeWeatherModal();
        closeGambleModal();
        closeDonationModal();
        closeChestModal();
        closeTradeMenuModal();
        closeTradeRequestModal();
        closeFriendModals();
        updateOnlineCount();
        world = makeWorld(currentWorldId);
        setLocalWorldWeather(localWeatherByWorld.get(currentWorldId) || null);
        if (blockSyncer && typeof blockSyncer.reset === "function") {
          blockSyncer.reset();
        }
        const spawn = getSpawnStructureTiles().door;
        player.x = TILE * spawn.tx;
        player.y = TILE * spawn.ty;
        player.vx = 0;
        player.vy = 0;
        ensurePlayerSafeSpawn(true);
        if (playerSyncController && typeof playerSyncController.reset === "function") {
          playerSyncController.reset();
        }
        airJumpsUsed = 0;
        wasInWaterLastFrame = false;
        lastWaterSplashAtMs = -9999;
      }

      function setInWorldState(nextValue) {
        inWorld = Boolean(nextValue);
        menuScreenEl.classList.toggle("hidden", inWorld);
        if (!inWorld || isMobileUi) {
          isMobileInventoryOpen = false;
        }
        syncMobileOverlayVisibility();
        syncMobilePlayModeClass();
        updateMobileControlsUi();
        applyToolbarPosition();
        chatToggleBtn.classList.toggle("hidden", !inWorld);
        adminToggleBtn.classList.toggle("hidden", !canUseAdminPanel);
        respawnBtn.classList.toggle("hidden", !inWorld);
        exitWorldBtn.classList.toggle("hidden", !inWorld);
        if (inWorld) {
          if (isMobileUi) {
            mobilePlayModeEnabled = true;
          }
          hasRenderedMenuWorldList = false;
          setChatOpen(false);
        } else {
          if (particleController && typeof particleController.clear === "function") {
            particleController.clear();
          }
          wasInWaterLastFrame = false;
          stopInventoryDrag();
          setChatOpen(false);
          closeAchievementsMenu();
          closeTitlesMenu();
          closeVendingModal();
          closeDonationModal();
          closeChestModal();
          closeGambleModal();
          closeSignModal();
          closeWorldLockModal();
          closeDoorModal();
          closeCameraModal();
          closeWeatherModal();
          closeTradeMenuModal();
          closeTradeRequestModal();
          closeFriendModals();
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
        // Recompute canvas/panel layout after visibility changes.
        requestAnimationFrame(() => {
          resizeCanvas();
          requestAnimationFrame(() => {
            resizeCanvas();
          });
        });
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
          const titleId = String(message.titleId || "").trim();
          const fallbackTitle = getTitleDef(titleId);
          const rawTitleName = String(message.titleName || (fallbackTitle && fallbackTitle.name) || "").trim();
          const titleName = formatTitleWithUsername(rawTitleName, name).slice(0, 24);
          const titleColor = String(message.titleColor || (fallbackTitle && fallbackTitle.color) || "#8fb4ff").trim().slice(0, 24);
          const titleStyle = normalizeTitleStyle(
            (message.titleStyle && typeof message.titleStyle === "object")
              ? message.titleStyle
              : (fallbackTitle && fallbackTitle.style)
          );
          const showNameLabel = shouldShowNameAlongsideTitle(titleName, name);
          const prefix = document.createElement("span");
          prefix.textContent = (time ? "[" + time + "] " : "");
          row.appendChild(prefix);
          if (titleName) {
            const titleEl = document.createElement("span");
            titleEl.className = "chat-title";
            if (titleStyle.rainbow) {
              titleEl.classList.add("chat-title-rainbow");
            } else {
              titleEl.style.color = titleColor || "#8fb4ff";
            }
            if (titleStyle.bold) {
              titleEl.style.fontWeight = "800";
            }
            if (titleStyle.glow) {
              const glowColor = titleStyle.glowColor || titleColor || "#8fb4ff";
              titleEl.style.textShadow = "0 0 10px " + glowColor + ", 0 0 16px " + glowColor;
            }
            titleEl.textContent = "[" + titleName + "] ";
            row.appendChild(titleEl);
          }
          if (showNameLabel) {
            const nameEl = document.createElement("span");
            nameEl.textContent = name + sessionLabel + ": ";
            row.appendChild(nameEl);
          } else {
            const sepEl = document.createElement("span");
            sepEl.textContent = ": ";
            row.appendChild(sepEl);
          }
          const textEl = document.createElement("span");
          textEl.textContent = (message.text || "");
          row.appendChild(textEl);
          chatMessagesEl.appendChild(row);
        }
        chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
      }

      function syncMobileOverlayVisibility() {
        const hasPassiveInventoryModalOpen = (() => {
          if (!isMobileUi || !inWorld) return false;
          const ids = ["vendingModal", "donationModal", "chestModal", "tradePanelModal"];
          for (let i = 0; i < ids.length; i++) {
            const el = document.getElementById(ids[i]);
            if (!el || el.classList.contains("hidden")) continue;
            if (el.classList.contains("inventory-passive") || el.classList.contains("trade-modal-passive")) {
              return true;
            }
          }
          return false;
        })();
        document.body.classList.toggle("mobile-passive-dnd", Boolean(hasPassiveInventoryModalOpen));
        const showChatPanel = !gameShellEl.classList.contains("hidden") && (!isMobileUi || isChatOpen);
        chatPanelEl.classList.toggle("hidden", !showChatPanel);
        const showToolbar = inWorld && (!isMobileUi || isMobileInventoryOpen || hasPassiveInventoryModalOpen);
        toolbar.classList.toggle("hidden", !showToolbar);
        mobileControlsEl.classList.toggle("hidden", !(inWorld && isMobileUi));
      }

      function syncMobilePlayModeClass() {
        document.body.classList.toggle("mobile-world-active", Boolean(inWorld && isMobileUi && mobilePlayModeEnabled));
      }

      function setChatOpen(open) {
        isChatOpen = Boolean(open) && inWorld;
        if (isMobileUi && isChatOpen) {
          isMobileInventoryOpen = false;
        }
        syncMobileOverlayVisibility();
        syncMobilePlayModeClass();
        updateMobileControlsUi();
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
        if (network.progressRef && network.handlers.progression) {
          network.progressRef.off("value", network.handlers.progression);
        }
        if (network.achievementsRef && network.handlers.achievements) {
          network.achievementsRef.off("value", network.handlers.achievements);
        }
        if (network.questsRef && network.handlers.quests) {
          network.questsRef.off("value", network.handlers.quests);
        }
        if (network.mySessionRef && network.handlers.mySession) {
          network.mySessionRef.off("value", network.handlers.mySession);
        }
        if (network.myCommandRef && network.handlers.myCommand) {
          network.myCommandRef.off("value", network.handlers.myCommand);
        }
        if (network.myReachRef && network.handlers.myReach) {
          network.myReachRef.off("value", network.handlers.myReach);
        }
        if (network.myFreezeRef && network.handlers.myFreeze) {
          network.myFreezeRef.off("value", network.handlers.myFreeze);
        }
        if (network.myGodModeRef && network.handlers.myGodMode) {
          network.myGodModeRef.off("value", network.handlers.myGodMode);
        }
        if (network.myPrivateAnnouncementRef && network.handlers.myPrivateAnnouncement) {
          network.myPrivateAnnouncementRef.off("value", network.handlers.myPrivateAnnouncement);
        }
        if (network.myPmFeedRef && network.handlers.myPmAdded) {
          network.myPmFeedRef.off("child_added", network.handlers.myPmAdded);
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
        if (network.myFriendsRef && network.handlers.myFriends) {
          network.myFriendsRef.off("value", network.handlers.myFriends);
        }
        if (network.myFriendRequestsRef && network.handlers.myFriendRequests) {
          network.myFriendRequestsRef.off("value", network.handlers.myFriendRequests);
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
        if (network.antiCheatLogsRef && network.handlers.antiCheatLogAdded) {
          network.antiCheatLogsRef.off("value", network.handlers.antiCheatLogAdded);
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
          if (canViewAntiCheatLogs()) {
            if (network.antiCheatLogsRef && network.handlers.antiCheatLogAdded) {
              network.antiCheatLogsRef.off("value", network.handlers.antiCheatLogAdded);
              network.antiCheatLogsRef.on("value", network.handlers.antiCheatLogAdded);
            }
          } else {
            if (network.antiCheatLogsRef && network.handlers.antiCheatLogAdded) {
              network.antiCheatLogsRef.off("value", network.handlers.antiCheatLogAdded);
            }
            antiCheatMessages.length = 0;
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
          if (canViewAntiCheatLogs() && network.antiCheatLogsRef && network.handlers.antiCheatLogAdded) {
            network.antiCheatLogsRef.on("value", network.handlers.antiCheatLogAdded);
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
          if (network.antiCheatLogsRef && network.handlers.antiCheatLogAdded) {
            network.antiCheatLogsRef.off("value", network.handlers.antiCheatLogAdded);
          }
          adminState.accounts = {};
          adminState.usernames = {};
          adminState.roles = {};
          adminState.audit = [];
          refreshAuditActionFilterOptions();
          adminState.bans = {};
          adminState.sessions = {};
          adminState.inventories = {};
          antiCheatMessages.length = 0;
          renderAdminPanel();
          adminDataListening = false;
        }
      }

      function forceLogout(reason) {
        saveInventoryToLocal();
        saveProgressionToLocal();
        saveAchievementsToLocal();
        saveQuestsToLocal();
        if (progressionSaveTimer) {
          clearTimeout(progressionSaveTimer);
          progressionSaveTimer = 0;
        }
        if (achievementsSaveTimer) {
          clearTimeout(achievementsSaveTimer);
          achievementsSaveTimer = 0;
        }
        if (questsSaveTimer) {
          clearTimeout(questsSaveTimer);
          questsSaveTimer = 0;
        }
        if (inventorySaveTimer) {
          clearTimeout(inventorySaveTimer);
          inventorySaveTimer = 0;
        }
        if (inWorld) {
          sendSystemWorldMessage(playerName + " left the world.");
          logCameraEvent(
            "player_leave",
            playerName + " left " + currentWorldId + ".",
            playerProfileId,
            playerName
          );
        }
        sendPresenceLeavePacket();
        detachCurrentWorldListeners();
        teardownGlobalRealtimeListeners();
        releaseAccountSession();
        network.enabled = false;
        packetQueuedMoveData = null;
        packetMoveInFlight = false;
        setInWorldState(false);
        setAdminOpen(false);
        pendingTeleportSelf = null;
        lastPrivateMessageFrom = null;
        const msgCtrl = getMessagesController();
        if (msgCtrl && typeof msgCtrl.resetSession === "function") {
          msgCtrl.resetSession();
        }
        lastHandledTeleportCommandId = "";
        hasSeenInitialTeleportCommandSnapshot = false;
        hasSeenInitialSessionSnapshot = false;
        missingSessionSinceMs = 0;
        lastHandledReachCommandId = "";
        lastHandledFreezeCommandId = "";
        lastHandledGodModeCommandId = "";
        lastHandledPrivateAnnouncementId = "";
        isFrozenByAdmin = false;
        isGodModeByAdmin = false;
        frozenByAdminBy = "";
        progressionXp = 0;
        progressionLevel = 1;
        progressionXpIntoLevel = 0;
        progressionXpForNext = 100;
        achievementsState = null;
        questsState = null;
        worldIndexMetaById = {};
        worldLockOwnerCache.clear();
        ownedWorldScanInFlight = false;
        danceUntilMs = 0;
        currentAdminRole = "none";
        hasSeenAdminRoleSnapshot = false;
        canUseAdminPanel = false;
        canViewAccountLogs = false;
        const gemsCtrl = getGemsController();
        if (gemsCtrl && typeof gemsCtrl.reset === "function") {
          gemsCtrl.reset();
        }
        resetEditReachTiles();
        updateGemsLabel();
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
        closeAchievementsMenu();
        closeTitlesMenu();
        const shopCtrl = getShopController();
        if (shopCtrl && typeof shopCtrl.closeModal === "function") {
          shopCtrl.closeModal();
        }
        applySavedCredentialsToForm();
        setAuthStatus(reason || "Logged out.", true);
      }

      function sendSystemWorldMessage(text) {
        if (!inWorld) return;
        const safeText = (text || "").toString().slice(0, 120);
        if (!safeText) return;
        if (!network.enabled) {
          addChatMessage({
            name: "[System]",
            playerId: "",
            text: safeText,
            createdAt: Date.now()
          });
          return;
        }
        sendAuthoritativePacket("CHAT", {
          worldId: currentWorldId,
          name: "[System]",
          message: safeText,
          system: true,
          sessionId: "",
          titleId: "",
          titleName: "",
          titleColor: "",
          titleStyle: normalizeTitleStyle(null)
        }).catch(() => {
          setNetworkState("System message error", true);
        });
      }

      function addChatMessage(message) {
        if (!message || !message.text) return;
        const name = String(message.name || "");
        const player = String(message.playerId || "");
        const session = String(message.sessionId || "");
        const title = String(message.titleId || "");
        const text = String(message.text || "");
        const createdAt = Number(message.createdAt) || Date.now();
        const finger = [name, player, session, title, text].join("|");
        const nowMs = Date.now();
        const lastAt = Number(recentChatFingerprintAt.get(finger) || 0);
        const createdDiff = Math.abs(createdAt - lastAt);
        const nearDuplicate = lastAt > 0 && (createdDiff <= 2500 || Math.abs(nowMs - lastAt) <= 2500);
        if (nearDuplicate) return;
        recentChatFingerprintAt.set(finger, createdAt || nowMs);
        if (recentChatFingerprintAt.size > 300) {
          const cutoff = nowMs - 15000;
          for (const [k, t] of recentChatFingerprintAt) {
            if (Number(t) < cutoff) {
              recentChatFingerprintAt.delete(k);
            }
          }
        }
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
        const titlePayload = getEquippedTitlePayload();
        if (antiCheatController && typeof antiCheatController.onChatSend === "function") {
          antiCheatController.onChatSend(text);
        }
        if (!network.enabled) {
          chatInputEl.value = "";
          addChatMessage({
            name: playerName,
            playerId,
            sessionId: playerSessionId || "",
            titleId: titlePayload.id || "",
            titleName: titlePayload.name || "",
            titleColor: titlePayload.color || "",
            titleStyle: titlePayload.style || normalizeTitleStyle(null),
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
          sendAuthoritativePacket("CHAT", {
            worldId: currentWorldId,
            name: playerName,
            message: text,
            sessionId: playerSessionId || "",
            titleId: titlePayload.id || "",
            titleName: titlePayload.name || "",
            titleColor: titlePayload.color || "",
            titleStyle: titlePayload.style || normalizeTitleStyle(null)
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

      function isLethalTile(tx, ty) {
        if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H) return false;
        const id = world[ty][tx];
        const def = blockDefs[id];
        return Boolean(def && def.lethal);
      }

      function isDonationBoxBlockId(id) {
        const def = blockDefs[id];
        return Boolean(def && def.donationBox);
      }

      function isChestBlockId(id) {
        const def = blockDefs[id];
        return Boolean(def && def.chestStorage);
      }

      function isGachaBlockId(id) {
        if (!gachaController || typeof gachaController.isGachaBlockId !== "function") return false;
        return Boolean(gachaController.isGachaBlockId(id));
      }

      function applyGachaEffect(effectId, tx, ty) {
        const effect = String(effectId || "").trim().toLowerCase();
        const cx = tx * TILE + TILE * 0.5;
        const cy = ty * TILE + TILE * 0.5;
        if (!particleController) return;
        if (effect === "splash") {
          if (typeof particleController.emitWaterSplash === "function") {
            particleController.emitWaterSplash(cx, cy, 10);
          }
          return;
        }
        if (effect === "seed") {
          if (typeof particleController.emitSeedDrop === "function") {
            particleController.emitSeedDrop(cx, cy);
          }
          return;
        }
        if (effect === "sparkle" || effect === "burst" || !effect) {
          if (typeof particleController.emitBlockBreak === "function") {
            particleController.emitBlockBreak(cx, cy, 16);
          }
        }
      }

      function grantGachaBlockReward(blockId, amount, tx, ty) {
        const id = Math.floor(Number(blockId) || 0);
        const qty = Math.max(0, Math.floor(Number(amount) || 0));
        if (!id || !qty || !INVENTORY_IDS.includes(id)) return 0;
        const current = Math.max(0, Math.floor(Number(inventory[id]) || 0));
        const room = Math.max(0, INVENTORY_ITEM_LIMIT - current);
        const addNow = Math.min(room, qty);
        if (addNow > 0) {
          inventory[id] = current + addNow;
        }
        const spill = qty - addNow;
        if (spill > 0) {
          spawnWorldDropEntry({ type: "block", blockId: id }, spill, tx * TILE, ty * TILE);
        }
        return qty;
      }

      function grantGachaCosmeticReward(cosmeticId, amount) {
        const id = String(cosmeticId || "").trim();
        const qty = Math.max(0, Math.floor(Number(amount) || 0));
        if (!id || !qty || !cosmeticInventory.hasOwnProperty(id)) return 0;
        cosmeticInventory[id] = clampInventoryCount((cosmeticInventory[id] || 0) + qty);
        return qty;
      }

      function grantGachaTitleReward(titleId, amount) {
        const id = String(titleId || "").trim();
        const qty = Math.max(0, Math.floor(Number(amount) || 0));
        if (!id || !qty || !TITLE_LOOKUP[id]) return 0;
        if ((titleInventory[id] || 0) > 0) return 0;
        titleInventory[id] = 1;
        return 1;
      }

      function resolveGachaBreak(blockId, tx, ty) {
        if (!gachaController || typeof gachaController.roll !== "function") return false;
        const result = gachaController.roll(blockId);
        if (!result || !Array.isArray(result.rolls) || !result.rolls.length) return false;
        let changedInventory = false;
        for (let i = 0; i < result.rolls.length; i++) {
          const row = result.rolls[i] || {};
          const kind = String(row.kind || "").trim().toLowerCase();
          const amount = Math.max(0, Math.floor(Number(row.amount) || 0));
          if (kind === "block") {
            const rewardBlockId = parseBlockRef(row.blockKey || "");
            const given = grantGachaBlockReward(rewardBlockId, amount || 1, tx, ty);
            changedInventory = changedInventory || given > 0;
          } else if (kind === "cosmetic") {
            const given = grantGachaCosmeticReward(row.cosmeticId, amount || 1);
            changedInventory = changedInventory || given > 0;
          } else if (kind === "title") {
            const given = grantGachaTitleReward(row.titleId, amount || 1);
            changedInventory = changedInventory || given > 0;
          } else if (kind === "gems") {
            const given = addPlayerGems(amount || 0, true);
            changedInventory = changedInventory || given > 0;
          } else if (kind === "effect") {
            applyGachaEffect(row.effect, tx, ty);
          }
          const text = String(row.text || "").trim();
          if (text) {
            postLocalSystemChat("[Gacha] " + text);
          }
        }
        if (changedInventory) {
          saveInventory();
          refreshToolbar();
          syncPlayer(true);
        }
        //showAnnouncementPopup("Mystery block opened!");
        return true;
      }

      function rectTouchesLethal(x, y, w, h) {
        const left = Math.floor(x / TILE);
        const right = Math.floor((x + w - 1) / TILE);
        const top = Math.floor(y / TILE);
        const bottom = Math.floor((y + h - 1) / TILE);
        for (let ty = top; ty <= bottom; ty++) {
          for (let tx = left; tx <= right; tx++) {
            if (isLethalTile(tx, ty)) return true;
          }
        }
        return false;
      }

      function isStairTileId(id) {
        return STAIR_ROTATION_IDS.includes(id);
      }

      function getRotatedBlockId(id) {
        const idx = STAIR_ROTATION_IDS.indexOf(id);
        if (idx >= 0) return STAIR_ROTATION_IDS[(idx + 1) % STAIR_ROTATION_IDS.length];
        const spikeIdx = SPIKE_ROTATION_IDS.indexOf(id);
        if (spikeIdx >= 0) return SPIKE_ROTATION_IDS[(spikeIdx + 1) % SPIKE_ROTATION_IDS.length];
        return 0;
      }

      function getInventoryDropId(id) {
        if (STAIR_ROTATION_IDS.includes(id)) return STAIR_BASE_ID;
        if (SPIKE_ROTATION_IDS.includes(id)) return SPIKE_BASE_ID;
        return id;
      }

      function isPlantSeedBlockId(id) {
        return PLANT_SEED_ID_SET.has(Number(id));
      }

      function getPlantSeedConfig(seedBlockId) {
        return PLANT_SEED_CONFIG[Number(seedBlockId)] || null;
      }

      function resolvePlantFruitAmount(plant) {
        const rec = plant && typeof plant === "object" ? plant : {};
        const fromRecord = Math.max(0, Math.floor(Number(rec.fruitAmount) || 0));
        if (fromRecord > 0) return Math.max(1, Math.min(5, fromRecord));
        const plantedAt = Math.max(1, Math.floor(Number(rec.plantedAt) || 1));
        const yieldId = Math.max(1, Math.floor(Number(rec.yieldBlockId) || TREE_YIELD_BLOCK_ID));
        const seed = ((plantedAt ^ (yieldId * 2654435761)) >>> 0);
        return 1 + (seed % 5);
      }

      function getTileKey(tx, ty) {
        return String(tx) + "_" + String(ty);
      }

      function getBlockDurability(id) {
        const def = blockDefs[id];
        if (!def) return 1;
        if (def.unbreakable || id === SPAWN_DOOR_ID || id === SPAWN_BASE_ID) return Infinity;
        const configured = Math.floor(Number(def.durability) || 0);
        if (configured > 0) return configured;
        if (isWorldLockBlockId(id)) return 8;
        if (id === VENDING_ID || id === CAMERA_ID || id === WEATHER_MACHINE_ID) return 6;
        if (id === SPAWN_BASE_ID) return Infinity;
        if (def.stair || def.oneWay || def.liquid || id === SIGN_ID) return 2;
        return 3;
      }

      function getEquippedBreakPower() {
        const item = typeof cosmeticsModule.getEquippedItem === "function"
          ? cosmeticsModule.getEquippedItem("swords", equippedCosmetics, COSMETIC_LOOKUP)
          : null;
        if (!item) {
          return { multiplier: 1, instantBreak: false };
        }
        const multiplier = Math.max(1, Number(item && item.breakMultiplier) || 1);
        const instantBreak = Boolean(item && item.instantBreak);
        return { multiplier, instantBreak };
      }

      function clearTileDamage(tx, ty) {
        tileDamageByKey.delete(getTileKey(tx, ty));
      }

      function clearAllTileDamage() {
        tileDamageByKey.clear();
      }

      function getTileDamage(tx, ty) {
        const key = getTileKey(tx, ty);
        const entry = tileDamageByKey.get(key);
        if (!entry) return { hits: 0, updatedAt: 0 };
        return {
          hits: Math.max(0, Math.floor(Number(entry.hits) || 0)),
          updatedAt: Number(entry.updatedAt) || 0
        };
      }

      function setTileDamage(tx, ty, hits) {
        const nextHits = Math.max(0, Math.floor(Number(hits) || 0));
        const key = getTileKey(tx, ty);
        if (nextHits <= 0) {
          tileDamageByKey.delete(key);
          return;
        }
        tileDamageByKey.set(key, {
          hits: nextHits,
          updatedAt: performance.now()
        });
      }

      function tickTileDamageDecay() {
        if (!tileDamageByKey.size) return;
        const now = performance.now();
        tileDamageByKey.forEach((entry, key) => {
          if (!entry) {
            tileDamageByKey.delete(key);
            return;
          }
          const age = now - (Number(entry.updatedAt) || 0);
          if (age < 2400) return;
          const nextHits = Math.max(0, Math.floor(Number(entry.hits) || 0) - 1);
          if (nextHits <= 0) {
            tileDamageByKey.delete(key);
            return;
          }
          tileDamageByKey.set(key, { hits: nextHits, updatedAt: now - 1400 });
        });
      }

      const damageSyncTimers = {};

      function syncTileDamageToNetwork(tx, ty, hits) {
        if (!network.enabled || !inWorld) return;
        
        if (network.playerRef && typeof syncHitsModule.buildPlayerHitPayload === "function") {
          const playerHit = syncHitsModule.buildPlayerHitPayload(tx, ty, hits);
          if (playerHit) {
            network.playerRef.child("lastHit").set(playerHit).catch(() => {});
          }
        }
        
        if (!network.hitsRef) return;
        const key = getTileKey(tx, ty);
        
        // Clear previous timer to bundle rapid hits into a single network call
        if (damageSyncTimers[key]) {
          clearTimeout(damageSyncTimers[key]);
        }
        
        damageSyncTimers[key] = setTimeout(() => {
          delete damageSyncTimers[key];
          
          if (typeof syncHitsModule.writeHit === "function") {
            syncHitsModule.writeHit(network.hitsRef, key, hits, firebase);
            return;
          }
          const safeHits = Math.max(0, Math.floor(Number(hits) || 0));
          if (!safeHits) {
            network.hitsRef.child(key).remove().catch(() => {});
            return;
          }
          network.hitsRef.child(key).set({
            hits: safeHits,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
          }).catch(() => {});
        }, 100); // Waits 100ms after the LAST hit before telling Firebase
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

      function setLocalTreePlant(tx, ty, value) {
        const ctrl = getPlantsController();
        if (!ctrl || typeof ctrl.setLocal !== "function") return;
        ctrl.setLocal(tx, ty, value);
      }

      function getLocalTreePlant(tx, ty) {
        const ctrl = getPlantsController();
        if (!ctrl || typeof ctrl.getLocal !== "function") return null;
        return ctrl.getLocal(tx, ty);
      }

      function saveTreePlant(tx, ty, value) {
        const ctrl = getPlantsController();
        if (!ctrl || typeof ctrl.save !== "function") return;
        ctrl.save(tx, ty, value);
      }

      function clearTreePlants() {
        const ctrl = getPlantsController();
        if (!ctrl || typeof ctrl.clear !== "function") return;
        ctrl.clear();
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

      function setLocalSignText(tx, ty, value) {
        const ctrl = getSignController();
        if (!ctrl || typeof ctrl.setLocalText !== "function") return;
        ctrl.setLocalText(tx, ty, value);
      }

      function getLocalSignText(tx, ty) {
        const ctrl = getSignController();
        if (!ctrl || typeof ctrl.getLocalText !== "function") return "";
        return ctrl.getLocalText(tx, ty);
      }

      function normalizeDisplayItemRecord(value) {
        if (!value || typeof value !== "object") return null;
        const typeRaw = String(value.type || "").trim().toLowerCase();
        const type = typeRaw === "cosmetic" ? "cosmetic" : "block";
        const blockId = Math.max(0, Math.floor(Number(value.blockId) || 0));
        const cosmeticId = String(value.cosmeticId || "").trim().slice(0, 64);
        if (type === "block" && !blockId) return null;
        if (type === "cosmetic" && !cosmeticId) return null;
        return {
          type,
          blockId,
          cosmeticId,
          updatedAt: typeof value.updatedAt === "number" ? value.updatedAt : 0
        };
      }

      function setLocalDisplayItem(tx, ty, value) {
        const key = getTileKey(tx, ty);
        const normalized = normalizeDisplayItemRecord(value);
        if (!normalized) {
          displayItemsByTile.delete(key);
          return;
        }
        displayItemsByTile.set(key, normalized);
      }

      function getLocalDisplayItem(tx, ty) {
        return displayItemsByTile.get(getTileKey(tx, ty)) || null;
      }

      function saveDisplayItem(tx, ty, value) {
        const normalized = normalizeDisplayItemRecord(value);
        setLocalDisplayItem(tx, ty, normalized);
        if (!network.enabled || !network.displaysRef) return;
        const ref = network.displaysRef.child(getTileKey(tx, ty));
        if (!normalized) {
          ref.remove().catch(() => {});
          return;
        }
        ref.set({
          type: normalized.type,
          blockId: normalized.type === "block" ? normalized.blockId : 0,
          cosmeticId: normalized.type === "cosmetic" ? normalized.cosmeticId : "",
          updatedAt: firebase.database.ServerValue.TIMESTAMP
        }).catch(() => {});
      }

      function grantDisplayItemToInventory(item) {
        const normalized = normalizeDisplayItemRecord(item);
        if (!normalized) return false;
        if (normalized.type === "cosmetic") {
          const cosmeticId = normalized.cosmeticId;
          if (!cosmeticId) return false;
          cosmeticInventory[cosmeticId] = Math.max(0, Math.floor((cosmeticInventory[cosmeticId] || 0) + 1));
          saveInventory();
          refreshToolbar();
          syncPlayer(true);
          return true;
        }
        const blockId = normalized.blockId;
        if (!blockId || !INVENTORY_IDS.includes(blockId)) return false;
        inventory[blockId] = Math.max(0, Math.floor((inventory[blockId] || 0) + 1));
        saveInventory();
        refreshToolbar();
        return true;
      }

      function tryPlaceItemIntoDisplay(tx, ty, entry) {
        if (!inWorld) return false;
        if (!entry || (entry.type !== "block" && entry.type !== "cosmetic")) return false;
        if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H) return false;
        if (world[ty][tx] !== DISPLAY_BLOCK_ID) return false;
        if (!canEditTarget(tx, ty)) return false;
        if (!canEditCurrentWorld()) {
          notifyWorldLockedDenied();
          return false;
        }

        const maxAmount = getMaxDroppableAmount(entry);
        if (maxAmount <= 0) return false;

        const existing = getLocalDisplayItem(tx, ty);
        if (existing) {
          grantDisplayItemToInventory(existing);
        }

        if (entry.type === "cosmetic") {
          const cosmeticId = String(entry.cosmeticId || "");
          if (!cosmeticId || (cosmeticInventory[cosmeticId] || 0) <= 0) return false;
          cosmeticInventory[cosmeticId] = Math.max(0, Math.floor((cosmeticInventory[cosmeticId] || 0) - 1));
          if ((cosmeticInventory[cosmeticId] || 0) <= 0) {
            for (let i = 0; i < COSMETIC_SLOTS.length; i++) {
              const slot = COSMETIC_SLOTS[i];
              if (equippedCosmetics[slot] === cosmeticId) equippedCosmetics[slot] = "";
            }
          }
          saveDisplayItem(tx, ty, { type: "cosmetic", cosmeticId, updatedAt: Date.now() });
          saveInventory();
          refreshToolbar();
          syncPlayer(true);
          return true;
        }

        const blockId = Math.max(0, Math.floor(Number(entry.blockId) || 0));
        if (!blockId || !INVENTORY_IDS.includes(blockId) || (inventory[blockId] || 0) <= 0) return false;
        inventory[blockId] = Math.max(0, Math.floor((inventory[blockId] || 0) - 1));
        saveDisplayItem(tx, ty, { type: "block", blockId, updatedAt: Date.now() });
        saveInventory();
        refreshToolbar();
        return true;
      }

      function closeSignModal() {
        const ctrl = getSignController();
        if (!ctrl || typeof ctrl.closeModal !== "function") return;
        ctrl.closeModal();
      }

      function saveSignText(tx, ty, rawText) {
        const ctrl = getSignController();
        if (!ctrl || typeof ctrl.saveText !== "function") return;
        ctrl.saveText(tx, ty, rawText);
      }

      function openSignModal(tx, ty) {
        const ctrl = getSignController();
        if (!ctrl || typeof ctrl.openModal !== "function") return;
        ctrl.openModal(tx, ty);
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

      function setLocalGambleMachine(tx, ty, value) {
        const ctrl = getGambleController();
        if (!ctrl || typeof ctrl.setLocal !== "function") return;
        ctrl.setLocal(tx, ty, value);
        if (typeof ctrl.isOpen === "function" && ctrl.isOpen() && typeof ctrl.renderOpen === "function") {
          ctrl.renderOpen();
        }
      }

      function getLocalGambleMachine(tx, ty) {
        const ctrl = getGambleController();
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
        const lockBlockIdRaw = Math.floor(Number(value.lockBlockId));
        const lockBlockId = LOCK_BLOCK_ID_SET.has(lockBlockIdRaw) ? lockBlockIdRaw : WORLD_LOCK_ID;
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
        const bansRaw = value.bans && typeof value.bans === "object" ? value.bans : {};
        const bans = {};
        for (const [accountId, entry] of Object.entries(bansRaw)) {
          const safeAccountId = String(accountId || "").trim();
          if (!safeAccountId || safeAccountId === ownerAccountId) continue;
          const row = entry && typeof entry === "object" ? entry : {};
          const username = normalizeUsername((row.username || "").toString()) || "";
          const byUsername = normalizeUsername((row.byUsername || "").toString()) || "";
          const expiresAtRaw = Number(row.expiresAt);
          const expiresAt = Number.isFinite(expiresAtRaw) ? Math.max(0, Math.floor(expiresAtRaw)) : 0;
          bans[safeAccountId] = {
            username,
            byAccountId: String(row.byAccountId || "").trim(),
            byUsername,
            createdAt: typeof row.createdAt === "number" ? row.createdAt : 0,
            expiresAt
          };
        }
        return {
          ownerAccountId,
          ownerName: (value.ownerName || "").toString(),
          lockBlockId,
          tx: Number.isInteger(value.tx) ? value.tx : Number(value.tx) || 0,
          ty: Number.isInteger(value.ty) ? value.ty : Number(value.ty) || 0,
          createdAt: typeof value.createdAt === "number" ? value.createdAt : 0,
          admins,
          bans
        };
      }

      function getWorldBanStatusForAccount(lock, accountId, nowMs) {
        const now = Number(nowMs) || Date.now();
        const safeAccountId = String(accountId || "").trim();
        if (!lock || !safeAccountId || !lock.bans || !lock.bans[safeAccountId]) return { active: false, permanent: false, remainingMs: 0 };
        const row = lock.bans[safeAccountId] || {};
        const expiresAt = Math.floor(Number(row.expiresAt) || 0);
        if (expiresAt > 0 && expiresAt <= now) return { active: false, permanent: false, remainingMs: 0 };
        if (expiresAt <= 0) return { active: true, permanent: true, remainingMs: Infinity };
        return { active: true, permanent: false, remainingMs: Math.max(0, expiresAt - now) };
      }

      function getCurrentWorldBanStatus() {
        return getWorldBanStatusForAccount(currentWorldLock, playerProfileId, Date.now());
      }

      function ensureNotWorldBanned(lock, worldId) {
        const ban = getWorldBanStatusForAccount(lock, playerProfileId, Date.now());
        if (!ban.active) return true;
        const worldLabel = (worldId || currentWorldId || "this world").toString();
        if (ban.permanent) {
          postLocalSystemChat("You are banned from " + worldLabel + " until the owner unbans you.");
        } else {
          postLocalSystemChat("You are banned from " + worldLabel + " for " + formatRemainingMs(ban.remainingMs) + ".");
        }
        return false;
      }

      function isWorldLocked() {
        return Boolean(currentWorldLock && currentWorldLock.ownerAccountId);
      }

      function isWorldLockOwner() {
        return Boolean(playerProfileId && currentWorldLock && currentWorldLock.ownerAccountId === playerProfileId);
      }

      function isWorldLockBlockId(id) {
        return LOCK_BLOCK_ID_SET.has(Number(id));
      }

      function getCurrentWorldLockBlockId() {
        const id = Math.floor(Number(currentWorldLock && currentWorldLock.lockBlockId));
        return isWorldLockBlockId(id) ? id : WORLD_LOCK_ID;
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

      function getWorldLockBansList() {
        if (!currentWorldLock || !currentWorldLock.bans) return [];
        const now = Date.now();
        return Object.entries(currentWorldLock.bans)
          .map(([accountId, data]) => {
            const username = normalizeUsername(data && data.username ? data.username : "") || accountId;
            const status = getWorldBanStatusForAccount(currentWorldLock, accountId, now);
            return { accountId, username, status, expiresAt: Math.floor(Number(data && data.expiresAt) || 0) };
          })
          .filter((row) => row.status.active)
          .sort((a, b) => a.username.localeCompare(b.username));
      }

      function renderWorldLockModal() {
        if (!worldLockModalEl || !worldLockTitleEl || !worldLockAdminsEl || !worldLockBansEl) return;
        const owner = (currentWorldLock && currentWorldLock.ownerName ? currentWorldLock.ownerName : "owner").toString();
        worldLockTitleEl.textContent = "World Lock - @" + owner;
        const rows = getWorldLockAdminsList();
        if (!rows.length) {
          worldLockAdminsEl.innerHTML = "<div class='worldlock-admin-empty'>No world admins.</div>";
        } else {
          worldLockAdminsEl.innerHTML = rows.map((row) => {
            return "<div class='worldlock-admin-row'>" +
              "<span class='worldlock-admin-name'>@" + escapeHtml(row.username) + "</span>" +
              "<button type='button' data-worldlock-remove='" + escapeHtml(row.accountId) + "'>Remove</button>" +
              "</div>";
          }).join("");
        }
        const bans = getWorldLockBansList();
        if (!bans.length) {
          worldLockBansEl.innerHTML = "<div class='worldlock-admin-empty'>No world bans.</div>";
        } else {
          worldLockBansEl.innerHTML = bans.map((row) => {
            const statusText = row.status.permanent ? "Perm" : ("1h (" + formatRemainingMs(row.status.remainingMs) + ")");
            return "<div class='worldlock-admin-row'>" +
              "<span class='worldlock-admin-name'>@" + escapeHtml(row.username) + " - " + escapeHtml(statusText) + "</span>" +
              "<button type='button' data-worldlock-unban='" + escapeHtml(row.accountId) + "'>Unban</button>" +
              "</div>";
          }).join("");
        }
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
        if (worldLockBanInputEl) worldLockBanInputEl.value = "";
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

      async function setWorldBanByUsername(rawUsername, durationMs) {
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
          postLocalSystemChat("You cannot ban the world owner.");
          return;
        }
        const expiresAt = Number(durationMs) > 0 ? (Date.now() + Math.floor(Number(durationMs))) : 0;
        network.lockRef.child("bans").child(accountId).set({
          username,
          byAccountId: playerProfileId || "",
          byUsername: normalizeUsername(playerName || "") || "",
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          expiresAt
        }).then(() => {
          postLocalSystemChat("Banned @" + username + (expiresAt > 0 ? " for 1 hour." : " until unban."));
        }).catch(() => {
          postLocalSystemChat("Failed to ban user.");
        });
      }

      function unbanWorldPlayer(accountId) {
        if (!network.enabled || !network.lockRef || !isWorldLocked() || !isWorldLockOwner()) return;
        const safeAccountId = (accountId || "").toString().trim();
        if (!safeAccountId) return;
        network.lockRef.child("bans").child(safeAccountId).remove()
          .then(() => {
            postLocalSystemChat("Player unbanned from world.");
          })
          .catch(() => {
            postLocalSystemChat("Failed to unban player.");
          });
      }

      function isProtectedSpawnTile(tx, ty) {
        return getProtectedTileRequiredId(tx, ty) > 0;
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
          return physicsModule.snapPlayerToStairSurface(player, world, blockDefs, STAIR_ROTATION_IDS, TILE, PLAYER_W, PLAYER_H, WORLD_W, WORLD_H);
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
            const testY = surfaceY - PLAYER_H;
            if (rectCollides(player.x, testY, PLAYER_W, PLAYER_H)) continue;
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
        const moveTowards = (value, target, step) => {
          const v = Number(value) || 0;
          const t = Number(target) || 0;
          const s = Math.max(0, Number(step) || 0);
          if (v < t) return Math.min(t, v + s);
          if (v > t) return Math.max(t, v - s);
          return t;
        };
        if (rectCollides(player.x, player.y, PLAYER_W, PLAYER_H)) {
          ensurePlayerSafeSpawn(true);
        }
        const nowMs = performance.now();
        const moveLeft = keys["KeyA"] || keys["ArrowLeft"] || touchControls.left;
        const moveRight = keys["KeyD"] || keys["ArrowRight"] || touchControls.right;
        const jump = keys["KeyW"] || keys["Space"] || keys["ArrowUp"] || touchControls.jump;
        const jumpPressedThisFrame = jump && !wasJumpHeld;
        if (isFrozenByAdmin) {
          player.vx = 0;
          player.vy = 0;
          currentPhysicsLimits = {
            maxMoveSpeedPerTick: Math.max(0.01, Number(MAX_MOVE_SPEED) || 0),
            maxFallSpeedPerTick: Math.max(0.01, Number(MAX_FALL_SPEED) || 0),
            gravityPerTick: Math.max(0.001, Number(GRAVITY) || 0),
            jumpVelocityPerTick: Math.abs(Number(JUMP_VELOCITY) || 0),
            inWater: false,
            inAntiGravity: false
          };
          wasInWaterLastFrame = rectTouchesLiquid(player.x, player.y, PLAYER_W, PLAYER_H);
          wasJumpHeld = jump;
          return;
        }
        const hasWingDoubleJump = Boolean(equippedCosmetics.wings);
        const equippedShoes = typeof cosmeticsModule.getEquippedItem === "function"
          ? cosmeticsModule.getEquippedItem("shoes", equippedCosmetics, COSMETIC_LOOKUP)
          : null;
        const shoeSpeedBoost = Math.max(-0.3, Math.min(1.5, Number(equippedShoes && equippedShoes.speedBoost) || 0));
        const shoeJumpBoost = Math.max(-0.25, Math.min(1.0, Number(equippedShoes && equippedShoes.jumpBoost) || 0));
        const speedMult = Math.max(0.65, 1 + shoeSpeedBoost);
        const jumpVelocityNow = JUMP_VELOCITY * Math.max(0.7, 1 + shoeJumpBoost);
        const inWater = rectTouchesLiquid(player.x, player.y, PLAYER_W, PLAYER_H);
        const inAntiGravity = isPlayerInAntiGravityField(player.x, player.y, PLAYER_W, PLAYER_H);
        const moveAccelBase = inWater ? MOVE_ACCEL * WATER_MOVE_MULT : MOVE_ACCEL;
        const moveAccel = moveAccelBase * (1 + shoeSpeedBoost * 0.65);
        const maxMoveSpeed = (inWater ? MAX_MOVE_SPEED * WATER_MOVE_MULT : MAX_MOVE_SPEED) * speedMult;
        let gravityNow = inWater ? GRAVITY * WATER_GRAVITY_MULT : GRAVITY;
        let maxFallNow = inWater ? MAX_FALL_SPEED * WATER_FALL_MULT : MAX_FALL_SPEED;
        const airFrictionNow = inWater ? Math.min(0.985, AIR_FRICTION * WATER_FRICTION_MULT) : AIR_FRICTION;
        if (inAntiGravity) {
          gravityNow *= ANTI_GRAV_GRAVITY_MULT;
          maxFallNow *= ANTI_GRAV_FALL_MULT;
        }
        currentPhysicsLimits = {
          maxMoveSpeedPerTick: Math.max(0.01, Number(maxMoveSpeed) || 0),
          maxFallSpeedPerTick: Math.max(0.01, Number(maxFallNow) || 0),
          gravityPerTick: Math.max(0.001, Number(gravityNow) || 0),
          jumpVelocityPerTick: Math.abs(Number(jumpVelocityNow) || 0),
          inWater: Boolean(inWater),
          inAntiGravity: Boolean(inAntiGravity)
        };

        const moveDir = (moveRight ? 1 : 0) - (moveLeft ? 1 : 0);
        if (moveDir !== 0) {
          const accelStep = player.grounded ? moveAccel : (moveAccel * AIR_CONTROL);
          player.vx = moveTowards(player.vx, moveDir * maxMoveSpeed, accelStep);
          player.facing = moveDir > 0 ? 1 : -1;
        } else if (player.grounded) {
          const stopStep = Math.max(0.1, maxMoveSpeed * 0.16);
          player.vx = moveTowards(player.vx, 0, stopStep);
          if (Math.abs(player.vx) < 0.14) {
            player.vx = 0;
          }
        }
        if (jumpPressedThisFrame && player.grounded && (nowMs - lastJumpAtMs) >= JUMP_COOLDOWN_MS) {
          player.vy = jumpVelocityNow;
          player.grounded = false;
          lastJumpAtMs = nowMs;
          airJumpsUsed = 0;
          triggerWingFlapPulse(0.9);
        } else if (
          jumpPressedThisFrame &&
          !player.grounded &&
          inAntiGravity &&
          (nowMs - lastAirJumpAtMs) >= ANTI_GRAV_AIR_JUMP_COOLDOWN_MS
        ) {
          player.vy = jumpVelocityNow;
          lastAirJumpAtMs = nowMs;
          triggerWingFlapPulse(1.1);
        } else if (
          jumpPressedThisFrame &&
          !player.grounded &&
          hasWingDoubleJump &&
          airJumpsUsed < 1 &&
          (nowMs - lastAirJumpAtMs) >= 120
        ) {
          player.vy = jumpVelocityNow;
          lastAirJumpAtMs = nowMs;
          airJumpsUsed += 1;
          triggerWingFlapPulse(1.25);
        }

        player.vx = Math.max(-maxMoveSpeed, Math.min(maxMoveSpeed, player.vx));
        player.vy += gravityNow;
        player.vy = Math.min(player.vy, maxFallNow);

        if (!player.grounded) {
          player.vx *= airFrictionNow;
        } else if (Math.abs(player.vx) < 0.12) {
          player.vx = 0;
        }

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

        if (particleController && typeof particleController.emitWaterSplash === "function") {
          const enteringWater = inWater && !wasInWaterLastFrame;
          const movingInWater = inWater && Math.abs(player.vx) > 1.05 && player.grounded;
          if ((enteringWater || movingInWater) && (nowMs - lastWaterSplashAtMs) >= 170) {
            lastWaterSplashAtMs = nowMs;
            const intensity = enteringWater
              ? Math.max(7, Math.min(14, Math.round(Math.abs(player.vy) * 2.4)))
              : 5;
            particleController.emitWaterSplash(
              player.x + PLAYER_W / 2,
              player.y + PLAYER_H - 2,
              intensity
            );
          }
        }

        // Only snap to stair surface while descending/landing, never during upward jump.
        if (player.vy >= 0) {
          snapPlayerToStairSurface();
        }

        if (!isGodModeByAdmin && rectTouchesLethal(player.x, player.y, PLAYER_W, PLAYER_H)) {
          if ((nowMs - lastSpikeKillAtMs) >= SPIKE_KILL_COOLDOWN_MS) {
            lastSpikeKillAtMs = nowMs;
            respawnPlayerAtDoor();
            postLocalSystemChat("You were killed by spikes.");
          }
          wasJumpHeld = jump;
          return;
        }

        if (player.y > WORLD_H * TILE) {
          player.x = TILE * 8;
          player.y = TILE * 8;
          player.vx = 0;
          player.vy = 0;
        }

        wasInWaterLastFrame = inWater;
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

      function drawAllDamageOverlays() {
        if (tileDamageByKey.size === 0) return;
        
        const viewW = getCameraViewWidth();
        const viewH = getCameraViewHeight();
        const startX = Math.floor(cameraX / TILE);
        const endX = Math.ceil((cameraX + viewW) / TILE);
        const startY = Math.floor(cameraY / TILE);
        const endY = Math.ceil((cameraY + viewH) / TILE);

        tileDamageByKey.forEach((damage, key) => {
          if (!damage || !damage.hits) return;
          const parts = key.split("_");
          const tx = parseInt(parts[0], 10);
          const ty = parseInt(parts[1], 10);
          
          if (tx < startX || tx > endX || ty < startY || ty > endY) return;
          
          const id = world[ty] && world[ty][tx];
          if (!id) return;
          const durability = getBlockDurability(id);
          if (!Number.isFinite(durability) || durability <= 1) return;
          
          const ratio = Math.max(0, Math.min(1, damage.hits / durability));
          if (ratio <= 0) return;
          
          const x = tx * TILE - cameraX;
          const y = ty * TILE - cameraY;
          const stage = Math.max(1, Math.min(4, Math.ceil(ratio * 4)));
          const alpha = 0.22 + stage * 0.14;
          const crackColor = "rgba(245, 251, 255, " + alpha.toFixed(3) + ")";
          const seed = ((tx * 73856093) ^ (ty * 19349663) ^ (id * 83492791)) >>> 0;
          
          ctx.save();
          ctx.strokeStyle = crackColor;
          ctx.lineWidth = 1;
          ctx.beginPath();
          const lineCount = 2 + stage * 2;
          for (let i = 0; i < lineCount; i++) {
            const a = ((seed + i * 137) % 1000) / 1000;
            const b = ((seed + i * 241 + 71) % 1000) / 1000;
            const c = ((seed + i * 389 + 19) % 1000) / 1000;
            const d = ((seed + i * 521 + 43) % 1000) / 1000;
            const x1 = x + 1 + a * (TILE - 2);
            const y1 = y + 1 + b * (TILE - 2);
            const x2 = x + 1 + c * (TILE - 2);
            const y2 = y + 1 + d * (TILE - 2);
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
          }
          ctx.stroke();
          ctx.restore();
        });
      }

      function drawWorld() {
        const viewW = getCameraViewWidth();
        const viewH = getCameraViewHeight();
        const startX = Math.floor(cameraX / TILE);
        const endX = Math.ceil((cameraX + viewW) / TILE);
        const startY = Math.floor(cameraY / TILE);
        const endY = Math.ceil((cameraY + viewH) / TILE);

        // const //drawBlockDamageOverlay = (tx, ty, id, x, y) => {
        //   if (!id) return;
        //   const durability = getBlockDurability(id);
        //   if (!Number.isFinite(durability) || durability <= 1) return;
        //   const damage = getTileDamage(tx, ty);
        //   if (!damage.hits) return;
        //   const ratio = Math.max(0, Math.min(1, damage.hits / durability));
        //   if (ratio <= 0) return;
        //   const stage = Math.max(1, Math.min(4, Math.ceil(ratio * 4)));
        //   const alpha = 0.22 + stage * 0.14;
        //   const crackColor = "rgba(245, 251, 255, " + alpha.toFixed(3) + ")";
        //   const seed = ((tx * 73856093) ^ (ty * 19349663) ^ (id * 83492791)) >>> 0;
        //   ctx.save();
        //   ctx.strokeStyle = crackColor;
        //   ctx.lineWidth = 1;
        //   ctx.beginPath();
        //   const lineCount = 2 + stage * 2;
        //   for (let i = 0; i < lineCount; i++) {
        //     const a = ((seed + i * 137) % 1000) / 1000;
        //     const b = ((seed + i * 241 + 71) % 1000) / 1000;
        //     const c = ((seed + i * 389 + 19) % 1000) / 1000;
        //     const d = ((seed + i * 521 + 43) % 1000) / 1000;
        //     const x1 = x + 1 + a * (TILE - 2);
        //     const y1 = y + 1 + b * (TILE - 2);
        //     const x2 = x + 1 + c * (TILE - 2);
        //     const y2 = y + 1 + d * (TILE - 2);
        //     ctx.moveTo(x1, y1);
        //     ctx.lineTo(x2, y2);
        //   }
        //   ctx.stroke();
        //   ctx.restore();
        // };

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
                //drawBlockDamageOverlay(tx, ty, id, x, y);
                continue;
              }
              ctx.fillStyle = "#6d4f35";
              ctx.fillRect(x, y + 2, TILE, 6);
              ctx.fillStyle = "rgba(255, 238, 202, 0.25)";
              ctx.fillRect(x + 1, y + 2, TILE - 2, 2);
              //drawBlockDamageOverlay(tx, ty, id, x, y);
              continue;
            }

            if (STAIR_ROTATION_IDS.includes(id)) {
              if (drawStairImage(id, def, x, y)) {
                //drawBlockDamageOverlay(tx, ty, id, x, y);
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
              //drawBlockDamageOverlay(tx, ty, id, x, y);
              continue;
            }

            if (SPIKE_ROTATION_IDS.includes(id)) {
              if (drawSpikeImage(id, def, x, y)) {
                //drawBlockDamageOverlay(tx, ty, id, x, y);
                continue;
              }
              ctx.fillStyle = def.color || "#8d9aae";
              const spikeIdx = SPIKE_ROTATION_IDS.indexOf(id);
              const spikeAngle = spikeIdx >= 0 ? (spikeIdx * Math.PI / 2) : 0;
              ctx.save();
              ctx.translate(x + TILE * 0.5, y + TILE * 0.5);
              if (spikeAngle !== 0) ctx.rotate(spikeAngle);
              ctx.beginPath();
              ctx.moveTo(-TILE * 0.5, TILE * 0.5);
              ctx.lineTo(-TILE * 0.5, -TILE * 0.5);
              ctx.lineTo(TILE * 0.5, TILE * 0.5);
              ctx.closePath();
              ctx.fill();
              ctx.restore();
              //drawBlockDamageOverlay(tx, ty, id, x, y);
              continue;
            }

            if (isPlantSeedBlockId(id)) {
              drawTreePlant(tx, ty, x, y);
              //drawBlockDamageOverlay(tx, ty, id, x, y);
              continue;
            }

            if (id === DISPLAY_BLOCK_ID) {
              ctx.fillStyle = def.color || "#314154";
              ctx.fillRect(x, y, TILE, TILE);
              ctx.strokeStyle = "rgba(255,255,255,0.95)";
              ctx.lineWidth = 1;
              ctx.strokeRect(x + 0.5, y + 0.5, TILE - 1, TILE - 1);
              ctx.strokeStyle = "rgba(255,255,255,0.45)";
              ctx.strokeRect(x + 2.5, y + 2.5, TILE - 5, TILE - 5);

              const displayItem = getLocalDisplayItem(tx, ty);
              if (displayItem) {
                if (displayItem.type === "cosmetic") {
                  let drawnCosmetic = false;
                  for (let i = 0; i < COSMETIC_ITEMS.length; i++) {
                    const item = COSMETIC_ITEMS[i];
                    if (!item || item.id !== displayItem.cosmeticId) continue;
                    drawnCosmetic = drawCosmeticSprite(item, x + 4, y + 4, TILE - 8, TILE - 8, 1);
                    if (!drawnCosmetic) {
                      ctx.fillStyle = item.color || "#9bb4ff";
                      ctx.fillRect(x + 5, y + 5, TILE - 10, TILE - 10);
                    }
                    break;
                  }
                } else {
                  const displayDef = blockDefs[displayItem.blockId];
                  const displayImg = getBlockImage(displayDef);
                  if (displayImg) {
                    ctx.save();
                    ctx.imageSmoothingEnabled = false;
                    ctx.drawImage(displayImg, x + 4, y + 4, TILE - 8, TILE - 8);
                    ctx.restore();
                  } else {
                    ctx.fillStyle = (displayDef && displayDef.color) ? displayDef.color : "#cfd8e5";
                    ctx.fillRect(x + 5, y + 5, TILE - 10, TILE - 10);
                  }
                }
              }
              //drawBlockDamageOverlay(tx, ty, id, x, y);
              continue;
            }

            if (id === SIGN_ID && drawBlockImage(def, x, y)) {
              //drawBlockDamageOverlay(tx, ty, id, x, y);
              continue;
            }

            if (id === VENDING_ID) {
              if (drawBlockImage(def, x, y)) {
                //drawBlockDamageOverlay(tx, ty, id, x, y);
                drawVendingWorldLabel(tx, ty, x, y);
                continue;
              }
              ctx.fillStyle = "#4d6b8b";
              ctx.fillRect(x, y, TILE, TILE);
              ctx.fillStyle = "rgba(255,255,255,0.12)";
              ctx.fillRect(x + 3, y + 3, TILE - 6, 8);
              ctx.fillStyle = "#9cd8ff";
              ctx.fillRect(x + 6, y + 14, TILE - 12, 10);
              ctx.fillStyle = "#ffd166";
              ctx.fillRect(x + TILE - 10, y + 6, 4, 4);
              //drawBlockDamageOverlay(tx, ty, id, x, y);
              drawVendingWorldLabel(tx, ty, x, y);
              continue;
            }

            if (id === WATER_ID && drawAnimatedWater(def, x, y, tx, ty)) {
              //drawBlockDamageOverlay(tx, ty, id, x, y);
              continue;
            }

            if (drawBlockImage(def, x, y)) {
              //drawBlockDamageOverlay(tx, ty, id, x, y);
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
            //drawBlockDamageOverlay(tx, ty, id, x, y);
          }
        }
      }

      function drawBlockImageInWorld(def, x, y)
      {
        const DROP_RENDER_SCALE = 0.65;
        const img = getBlockImage(def);
        if (!img) return false;
        ctx.save();
        ctx.imageSmoothingEnabled = false;
        const size = TILE * DROP_RENDER_SCALE;
        const offset = (TILE - size) / 2;
        ctx.drawImage(img, x + offset, y + offset, size, size);
        ctx.restore();
        return true;
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
          if (drop.type === "tool") {
            ctx.save();
            ctx.fillStyle = drop.toolId === TOOL_WRENCH ? "#89a4b4" : "#c59b81";
            ctx.fillRect(x, y, TILE, TILE);
            ctx.strokeStyle = "rgba(0,0,0,0.35)";
            ctx.strokeRect(x + 0.5, y + 0.5, TILE - 1, TILE - 1);
            ctx.fillStyle = "rgba(12,20,30,0.8)";
            ctx.font = "bold 11px 'Trebuchet MS', sans-serif";
            ctx.fillText(drop.toolId === TOOL_WRENCH ? "W" : "F", x + 7, y + 12);
            ctx.restore();
          } else if (drop.type === "block") {
            const def = blockDefs[drop.blockId];

            if (def && drawBlockImageInWorld(def, x, y)) {
              // draw count badge
            } else {
              ctx.save();
              ctx.fillStyle = def && def.color ? def.color : "#a0a0a0";
              const size = TILE * 0.65;
              const offset = (TILE - size) / 2;
              ctx.fillRect(x + offset, y + offset, size, size);
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
                const size = TILE * 0.65;
                const offset = (TILE - size) / 2;

                ctx.fillRect(x + offset, y + offset, size, size);
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
        const ctrl = getSignController();
        if (!ctrl || typeof ctrl.drawTopText !== "function") return;
        ctrl.drawTopText(ctx);
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

      function getVendingWorldLabel(tx, ty) {
        const ctrl = getVendingController();
        if (!ctrl || typeof ctrl.getLocal !== "function") return "";
        const vm = ctrl.getLocal(tx, ty);
        if (!vm) return "";
        const qty = Math.max(1, Math.floor(Number(vm.sellQuantity) || 1));
        const price = Math.max(0, Math.floor(Number(vm.priceLocks) || 0));
        let itemName = "";
        if (String(vm.sellType || "") === "cosmetic") {
          const cosmeticId = String(vm.sellCosmeticId || "").trim();
          let cosmeticItem = null;
          if (cosmeticId) {
            for (let i = 0; i < COSMETIC_ITEMS.length; i++) {
              const item = COSMETIC_ITEMS[i];
              if (item && item.id === cosmeticId) {
                cosmeticItem = item;
                break;
              }
            }
          }
          itemName = cosmeticItem && cosmeticItem.name ? cosmeticItem.name : cosmeticId;
        } else {
          const blockId = Math.max(0, Math.floor(Number(vm.sellBlockId) || 0));
          const itemDef = blockDefs[blockId];
          itemName = itemDef && itemDef.name ? itemDef.name : "";
        }
        if (!itemName || price <= 0) return "Unconfigured";
        return itemName + " x" + qty + " / " + price + " WL";
      }

      function drawVendingWorldLabel(tx, ty, x, y) {
        const label = getVendingWorldLabel(tx, ty);
        if (!label) return;
        const playerTx = Math.floor((player.x + PLAYER_W / 2) / TILE);
        const playerTy = Math.floor((player.y + PLAYER_H / 2) / TILE);
        if (playerTx !== tx || playerTy !== ty) return;
        ctx.save();
        ctx.font = "10px 'Trebuchet MS', sans-serif";
        const maxWidth = 138;
        const lines = wrapChatText(label, maxWidth - 8).slice(0, 2);
        let textW = 0;
        for (let i = 0; i < lines.length; i++) {
          textW = Math.max(textW, ctx.measureText(lines[i]).width);
        }
        const bubbleW = Math.max(52, Math.min(maxWidth, Math.ceil(textW) + 8));
        const bubbleH = lines.length * 12 + 6;
        let bx = x + Math.floor((TILE - bubbleW) / 2);
        const by = y - bubbleH - 4;
        const viewW = getCameraViewWidth();
        if (bx < 4) bx = 4;
        if (bx + bubbleW > viewW - 4) bx = viewW - 4 - bubbleW;
        ctx.fillStyle = "rgba(8, 22, 34, 0.86)";
        ctx.fillRect(bx, by, bubbleW, bubbleH);
        ctx.strokeStyle = "rgba(255,255,255,0.26)";
        ctx.strokeRect(bx + 0.5, by + 0.5, bubbleW - 1, bubbleH - 1);
        ctx.fillStyle = "#f4fbff";
        for (let i = 0; i < lines.length; i++) {
          ctx.fillText(lines[i], bx + 4, by + 11 + i * 12);
        }
        ctx.restore();
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

      function drawSpikeImage(id, def, x, y) {
        const baseDef = blockDefs[SPIKE_BASE_ID] || def;
        const img = getBlockImage(baseDef) || getBlockImage(def);
        if (!img) return false;
        const idx = SPIKE_ROTATION_IDS.indexOf(id);
        const angle = idx >= 0 ? (idx * Math.PI / 2) : 0;
        ctx.save();
        ctx.imageSmoothingEnabled = false;
        ctx.translate(x + TILE * 0.5, y + TILE * 0.5);
        if (angle !== 0) ctx.rotate(angle);
        ctx.drawImage(img, -TILE * 0.5, -TILE * 0.5, TILE, TILE);
        ctx.restore();
        return true;
      }

      function drawTreePlant(tx, ty, x, y) {
        const ctrl = getPlantsController();
        if (!ctrl || typeof ctrl.drawTree !== "function") return;
        ctrl.drawTree(ctx, tx, ty, x, y, TILE);
        const plant = getLocalTreePlant(tx, ty);
        if (!plant || typeof ctrl.getGrowthState !== "function") return;
        const growth = ctrl.getGrowthState(plant);
        if (!growth) return;
        const fruitCount = resolvePlantFruitAmount(plant);
        const fruitBlockId = Math.max(1, Math.floor(Number(plant.yieldBlockId) || TREE_YIELD_BLOCK_ID));
        const fruitDef = blockDefs[fruitBlockId] || null;
        if (growth.mature) {
          const cols = 3;
          const rows = Math.ceil(fruitCount / cols);
          const cell = 8;
          const gap = 2;
          const gridW = cols * cell + (cols - 1) * gap;
          const gridH = rows * cell + (rows - 1) * gap;
          const label = "x" + fruitCount;
          ctx.save();
          ctx.font = "bold 11px 'Trebuchet MS', sans-serif";
          const labelW = Math.ceil(ctx.measureText(label).width);
          const boxW = Math.max(gridW + 8, labelW + 10);
          const boxH = gridH + 22;
          let bx = x + Math.floor((TILE - boxW) / 2);
          const by = y - boxH - 8;
          const viewW = getCameraViewWidth();
          if (bx < 4) bx = 4;
          if (bx + boxW > viewW - 4) bx = viewW - 4 - boxW;
          ctx.fillStyle = "rgba(8, 22, 34, 0.9)";
          ctx.fillRect(bx, by, boxW, boxH);
          ctx.strokeStyle = "rgba(255,255,255,0.35)";
          ctx.strokeRect(bx + 0.5, by + 0.5, boxW - 1, boxH - 1);
          ctx.fillStyle = "#f7fbff";
          ctx.fillText(label, bx + Math.floor((boxW - labelW) / 2), by + 11);
          const gx = bx + Math.floor((boxW - gridW) / 2);
          const gy = by + 14;
          for (let i = 0; i < fruitCount; i++) {
            const cx = i % cols;
            const cy = Math.floor(i / cols);
            const px = gx + cx * (cell + gap);
            const py = gy + cy * (cell + gap);
            ctx.fillStyle = fruitDef && fruitDef.color ? fruitDef.color : "#67c95a";
            ctx.fillRect(px, py, cell, cell);
            ctx.strokeStyle = "rgba(255,255,255,0.35)";
            ctx.strokeRect(px + 0.5, py + 0.5, cell - 1, cell - 1);
          }
          ctx.restore();
          return;
        }
        const playerTx = Math.floor((player.x + PLAYER_W / 2) / TILE);
        const playerTy = Math.floor((player.y + PLAYER_H / 2) / TILE);
        if (playerTx !== tx || playerTy !== ty) return;
        const growMs = Math.max(1, Math.floor(Number(plant.growMs) || TREE_GROW_MS));
        const plantedAt = Math.max(0, Math.floor(Number(plant.plantedAt) || 0));
        const remainingMs = Math.max(0, (plantedAt + growMs) - Date.now());
        const remainingSec = Math.max(0, Math.ceil(remainingMs / 1000));
        const label = "Grow: " + remainingSec + "s";
        ctx.save();
        ctx.font = "11px 'Trebuchet MS', sans-serif";
        const w = Math.ceil(ctx.measureText(label).width) + 10;
        const h = 15;
        let bx = x + Math.floor((TILE - w) / 2);
        const by = y - h - 4;
        const viewW = getCameraViewWidth();
        if (bx < 4) bx = 4;
        if (bx + w > viewW - 4) bx = viewW - 4 - w;
        ctx.fillStyle = "rgba(8, 22, 34, 0.88)";
        ctx.fillRect(bx, by, w, h);
        ctx.strokeStyle = "rgba(255,255,255,0.28)";
        ctx.strokeRect(bx + 0.5, by + 0.5, w - 1, h - 1);
        ctx.fillStyle = "#f7fbff";
        ctx.fillText(label, bx + 5, by + 11);
        ctx.restore();
      }

      function drawCosmeticSprite(item, x, y, w, h, facing, opts) {
        const img = getCosmeticImage(item);
        if (!img) return false;
        const options = opts && typeof opts === "object" ? opts : {};
        const mode = options.mode === "fill" ? "fill" : "contain";
        const alignX = Math.max(0, Math.min(1, Number(options.alignX)));
        const alignY = Math.max(0, Math.min(1, Number(options.alignY)));
        const useAlignX = Number.isFinite(alignX) ? alignX : 0.5;
        const useAlignY = Number.isFinite(alignY) ? alignY : 0.5;
        let drawX = x;
        let drawY = y;
        let drawW = w;
        let drawH = h;
        if (mode === "contain") {
          const iw = Math.max(1, img.naturalWidth || 1);
          const ih = Math.max(1, img.naturalHeight || 1);
          const scale = Math.min(w / iw, h / ih);
          drawW = Math.max(1, iw * scale);
          drawH = Math.max(1, ih * scale);
          drawX = x + (w - drawW) * useAlignX;
          drawY = y + (h - drawH) * useAlignY;
        }
        ctx.save();
        ctx.imageSmoothingEnabled = false;
        if (facing === -1) {
          const pivot = drawX + drawW / 2;
          ctx.translate(pivot, 0);
          ctx.scale(-1, 1);
          ctx.translate(-pivot, 0);
        }
        ctx.drawImage(img, drawX, drawY, drawW, drawH);
        ctx.restore();
        return true;
      }


      // COSMETICS
      function drawWings(px, py, wingsId, facing, wingFlap, wingOpen) {
        if (!wingsId) return;
        const item = COSMETIC_LOOKUP.wings[wingsId];
        if (!item) return;
        const flap = Number(wingFlap) || 0;
        const open = Math.max(0, Math.min(1, Number(wingOpen) || 0));
        const upStroke = Math.max(0, -flap);
        const downStroke = Math.max(0, flap);
        // Strong hinge-style flap: quick downstroke + lighter upstroke.
        const flapStroke = (downStroke * 1.2) - (upStroke * 0.8);
        const wingImg = getCosmeticImage(item);
        if (wingImg) {
          const centerX = px + PLAYER_W / 2;
          const centerY = py + 17.5;
          const baseAngle = 0.2 + open * 0.34;
          const wingH = 19;
          const wingW = Math.max(10, Math.round(wingH * (wingImg.naturalWidth / Math.max(1, wingImg.naturalHeight))));
          const offsetX = Number(item && item.offsetX);
          const offsetY = Number(item && item.offsetY);
          const useOffsetX = Number.isFinite(offsetX) ? offsetX : 3;
          const useOffsetY = Number.isFinite(offsetY) ? offsetY : 0;
          const drawWingSide = (sideSign) => {
            const angle = (sideSign * baseAngle) - (sideSign * flapStroke * 1.2);
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
        const centerY = py + 17.5;
        const forwardSign = facing === 1 ? 1 : -1;
        const drawWing = (sideSign) => {
          const dir = sideSign * forwardSign;
          const base = (0.24 + open * 0.34) * sideSign;
          const angle = base - (sideSign * flapStroke);
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

      function drawShirt(px, py, shirtId) {
        if (!shirtId) return;
        const item = COSMETIC_LOOKUP.shirts && COSMETIC_LOOKUP.shirts[shirtId];
        if (!item) return;
        if (drawCosmeticSprite(item, px + 5, py + 11, PLAYER_W - 10, 12, 1, { mode: "contain", alignX: 0.5, alignY: 0.5 })) {
          return;
        }
        ctx.fillStyle = item.color;
        ctx.fillRect(px + 5, py + 12, PLAYER_W - 10, 10);
      }

      function drawPants(px, py, pantsId) {
        if (!pantsId) return;
        const item = COSMETIC_LOOKUP.pants && COSMETIC_LOOKUP.pants[pantsId];
        if (!item) return;
        if (drawCosmeticSprite(item, px + 5, py + 21, PLAYER_W - 10, 8, 1, { mode: "contain", alignX: 0.5, alignY: 0.5 })) {
          return;
        }
        ctx.fillStyle = item.color || "#7e92a3";
        ctx.fillRect(px + 6, py + 22, 4, 7);
        ctx.fillRect(px + PLAYER_W - 10, py + 22, 4, 7);
      }

      function drawShoes(px, py, shoesId, facing) {
        if (!shoesId) return;
        const item = COSMETIC_LOOKUP.shoes && COSMETIC_LOOKUP.shoes[shoesId];
        if (!item) return;
        const leftX = px + 5;
        const rightX = px + PLAYER_W - 9;
        const shoeY = py + 26;
        const shoeW = 6;
        const shoeH = 4;
        const facingSign = facing === -1 ? -1 : 1;
        const drewLeft = drawCosmeticSprite(item, leftX, shoeY, shoeW, shoeH, facingSign, { mode: "contain", alignX: 0.5, alignY: 1 });
        const drewRight = drawCosmeticSprite(item, rightX, shoeY, shoeW, shoeH, facingSign, { mode: "contain", alignX: 0.5, alignY: 1 });
        if (drewLeft || drewRight) return;
        ctx.fillStyle = item.color || "#5f5f6a";
        ctx.fillRect(leftX + 1, shoeY + 1, shoeW - 1, shoeH - 1);
        ctx.fillRect(rightX + 1, shoeY + 1, shoeW - 1, shoeH - 1);
      }

      function drawHat(px, py, hatId, facing) {
        if (!hatId) return;
        const item = COSMETIC_LOOKUP.hats && COSMETIC_LOOKUP.hats[hatId];
        if (!item) return;
        const hatBoxX = px - 2;
        const hatBoxY = py - 11;
        const hatBoxW = PLAYER_W + 4;
        const hatBoxH = 12;
        if (drawCosmeticSprite(item, hatBoxX, hatBoxY, hatBoxW, hatBoxH, facing === -1 ? -1 : 1, { mode: "contain", alignX: 0.5, alignY: 1 })) {
          return;
        }
        ctx.fillStyle = item.color || "#d7c7a3";
        ctx.fillRect(px + 3, py - 2, PLAYER_W - 6, 2);
      }

      function drawSword(px, py, swordId, facing, swordSwing, hitDirectionY, hitStrength) {
        if (!swordId) return;
        const item = COSMETIC_LOOKUP.swords[swordId];
        if (!item) return;
        
        const pivotX = facing === 1 ? (px + PLAYER_W - 5 + 1.5) : (px + 2 + 1.5);
        const pivotY = py + 13 + 1;
        let handX, handY, angle;

        if (Number(hitStrength) > 0) {
          const targetRotation = facing * (-Math.PI / 2 + (Number(hitDirectionY) || 0) * Math.PI / 4);
          const rotation = targetRotation * Number(hitStrength);
          handX = pivotX - Math.sin(rotation) * 7;
          handY = pivotY + Math.cos(rotation) * 7;
          angle = (Number(hitDirectionY) || 0) * (Math.PI / 4) * Number(hitStrength);
        } else {
          const facingSign = facing === 1 ? 1 : -1;
          const swing = (Number(swordSwing) || 0) * facingSign;
          const armSwing = Math.max(-4, Math.min(4, swing * 0.18));
          handX = facing === 1 ? (px + PLAYER_W - 3) : (px + 3);
          handY = py + 19 + armSwing;
          const baseAngle = 0;
          const slash = Math.max(-1.2, Math.min(1.2, swing * 0.12));
          angle = baseAngle + slash;
        }
        
        const bladeW = 12;
        const bladeH = 8;

        ctx.save();
        ctx.translate(handX, handY);
        if (facing === -1) ctx.scale(-1, 1);
        ctx.rotate(angle);
        const img = getCosmeticImage(item);
        if (img) {
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(img, 0, -bladeH / 2, bladeW, bladeH);
          ctx.restore();
          return;
        }
        ctx.fillStyle = item.color;
        ctx.fillRect(0, -1.5, 9, 3);
        ctx.fillStyle = "rgba(255,255,255,0.65)";
        ctx.fillRect(6, -1, 4, 2);
        ctx.restore();
      }
      // CHARACTER
      function drawHumanoid(px, py, facing, bodyColor, skinColor, eyeColor, shirtId, pantsId, shoesId, hatId, pose, lookX, lookY) {
        function fillChamferRect(x, y, w, h, color) {
          const rx = Math.round(x);
          const ry = Math.round(y);
          const rw = Math.max(2, Math.round(w));
          const rh = Math.max(2, Math.round(h));
          ctx.fillStyle = color;
          if (rw <= 3 || rh <= 3) {
            ctx.fillRect(rx, ry, rw, rh);
            return;
          }
          ctx.fillRect(rx + 1, ry, rw - 2, 1);
          ctx.fillRect(rx, ry + 1, rw, rh - 2);
          ctx.fillRect(rx + 1, ry + rh - 1, rw - 2, 1);
        }

        const armSwing = Number(pose && pose.armSwing) || 0;
        const legSwing = Number(pose && pose.legSwing) || 0;
        const hitStrength = Math.max(0, Math.min(1, Number(pose && pose.hitStrength) || 0));
        const hitMode = String(pose && pose.hitMode || "");
        const hitDirectionY = Number(pose && pose.hitDirectionY) || 0;
        let leftArmY = py + 13 + Math.round(-armSwing * 0.6);
        let rightArmY = py + 13 + Math.round(armSwing * 0.6);
        const leftLegY = py + 23 + Math.round(-legSwing * 0.75);
        const rightLegY = py + 23 + Math.round(legSwing * 0.75);
        const faceTilt = facing === 1 ? 1 : -1;

        // Growtopia-like blocky proportions.
        const headX = px + 2;
        const headY = py;
        const headW = PLAYER_W - 4;
        const headH = 12;
        const torsoX = px + 5;
        const torsoY = py + 12;
        const torsoW = PLAYER_W - 10;
        const torsoH = 8;

        fillChamferRect(headX, headY, headW, headH, skinColor);
        fillChamferRect(torsoX, torsoY, torsoW, torsoH, skinColor);
        let leftArmX = px + 2;
        let rightArmX = px + PLAYER_W - 5;
        if (hitStrength > 0) {
          const forward = Math.round((hitMode === "fist" ? 4 : 2) * hitStrength) * (facing === 1 ? 1 : -1);
          if (facing === 1) {
            rightArmX += forward;
          } else {
            leftArmX += forward;
          }
        }

        const drawArmRect = (x, y, isAttackArm) => {
          if (hitStrength > 0 && isAttackArm) {
            const pivotX = x + 1.5;
            const pivotY = y + 1;
            const targetRotation = facing * (-Math.PI / 2 + (hitDirectionY * Math.PI / 4));
            const rotation = targetRotation * hitStrength;
            ctx.save();
            ctx.translate(pivotX, pivotY);
            ctx.rotate(rotation);
            ctx.translate(-pivotX, -pivotY);
            fillChamferRect(x, y, 3, 8, skinColor);
            if (hitMode === "fist" && hitStrength > 0.05) {
              const fistY = y + 5;
              const fistX = facing === 1 ? (x + 2) : (x - 2);
              fillChamferRect(fistX, fistY, 3, 3, skinColor);
            }
            ctx.restore();
          } else {
            fillChamferRect(x, y, 3, 8, skinColor);
          }
        };

        drawArmRect(leftArmX, leftArmY, facing === -1);
        drawArmRect(rightArmX, rightArmY, facing === 1);

        fillChamferRect(px + 6, leftLegY, 4, 7, skinColor);
        fillChamferRect(px + PLAYER_W - 10, rightLegY, 4, 7, skinColor);

        drawShirt(px, py, shirtId);
        drawPants(px, py, pantsId);
        drawShoes(px, py, shoesId, facing);
        drawHat(px, py, hatId, facing);

        ctx.fillStyle = "rgba(0,0,0,0.14)";
        ctx.fillRect(headX + 1, headY + 1, headW - 2, 1);
        ctx.fillRect(torsoX + 1, torsoY - 1, torsoW - 2, 1);
        ctx.fillRect(torsoX + 1, torsoY + torsoH, torsoW - 2, 1);

        // Eyes are offset by facing direction (no mouse-follow wobble).
        const faceOffset = faceTilt > 0 ? 1 : -1;
        const leftEyeX = px + 5 + faceOffset;
        const rightEyeX = px + PLAYER_W - 11 + faceOffset;
        const eyeY = py + 3;
        ctx.fillStyle = "#f3f6ff";
        ctx.fillRect(leftEyeX, eyeY, 5, 4);
        ctx.fillRect(rightEyeX, eyeY, 5, 4);

        ctx.fillStyle = eyeColor;
        const pupilOffset = faceTilt > 0 ? 1 : 0;
        ctx.fillRect(leftEyeX + 1 + pupilOffset, eyeY + 1, 2, 2);
        ctx.fillRect(rightEyeX + 1 + pupilOffset, eyeY + 1, 2, 2);

        const mouthX = px + 8 + faceOffset;
        const mouthY = py + 9;
        ctx.fillStyle = "rgba(85, 52, 43, 0.95)";
        ctx.fillRect(mouthX, mouthY, 5, 1);
        ctx.fillRect(mouthX + 1, mouthY + 1, 3, 1);

        const noseX = faceTilt > 0 ? px + 13 : px + 6;
        ctx.fillStyle = "rgba(124, 84, 66, 0.9)";
        ctx.fillRect(noseX, py + 7, 2, 2);

        // Small head shading for pixel depth similar to GT style.
        ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
        if (faceTilt > 0) {
          ctx.fillRect(headX + headW - 1, headY + 1, 1, headH - 2);
        } else {
          ctx.fillRect(headX, headY + 1, 1, headH - 2);
        }

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
        localPlayerWrenchHitbox.length = 0;
        const nowMs = performance.now();
        const px = Math.round(player.x - cameraX);
        const py = Math.round(player.y - cameraY);
        const cosmetics = equippedCosmetics;
        const localMotion = typeof animationsModule.sampleLocal === "function"
          ? animationsModule.sampleLocal(player, nowMs)
          : { speed: Math.abs(player.vx), vy: player.vy, grounded: player.grounded };
        const pose = typeof animationsModule.buildPose === "function"
          ? animationsModule.buildPose(localMotion, nowMs, playerId)
          : { bodyBob: 0, bodyTilt: 0, wingFlap: 0, wingOpen: 0.24, swordSwing: 0, eyeYOffset: 0, eyeHeight: 3 };
        if (danceUntilMs > Date.now()) {
          const danceT = nowMs * 0.015;
          pose.bodyBob = (Number(pose.bodyBob) || 0) + Math.sin(danceT * 1.6) * 1.6;
          pose.bodyTilt = (Number(pose.bodyTilt) || 0) + Math.sin(danceT) * 0.18;
          pose.armSwing = (Number(pose.armSwing) || 0) + Math.sin(danceT * 2.3) * 3.6;
          pose.legSwing = (Number(pose.legSwing) || 0) + Math.cos(danceT * 2.3) * 2.8;
        }
        const hitT = Math.max(0, Math.min(1, 1 - ((nowMs - lastHitAtMs) / HIT_ANIM_MS)));
        if (hitT > 0) {
          const hitEase = hitT * hitT * (3 - 2 * hitT);
          const facingSign = player.facing === 1 ? 1 : -1;
          pose.bodyTilt = (Number(pose.bodyTilt) || 0) + facingSign * (0.07 * hitEase);
          pose.hitDirectionY = lastHitDirectionY;
          if (cosmetics.swords) {
            pose.hitMode = "sword";
            pose.hitStrength = hitEase;
            pose.armSwing = (Number(pose.armSwing) || 0) + facingSign * (1.1 * hitEase);
            pose.swordSwing = (Number(pose.swordSwing) || 0) + facingSign * (8.2 * hitEase);
          } else {
            pose.hitMode = "fist";
            pose.hitStrength = hitEase;
            pose.armSwing = (Number(pose.armSwing) || 0) + facingSign * (3.1 * hitEase);
            pose.swordSwing = 0;
          }
        } else {
          pose.hitMode = "";
          pose.hitStrength = 0;
        }
        // Pixel-snap body baseline to avoid subpixel jitter and slight ground clipping.
        const basePy = Math.round(py + (pose.bodyBob || 0) - 1);
        const localWingFlap = (pose.wingFlap || 0) + getWingFlapPulse(nowMs);
        const localWingOpen = Math.max(0, Math.min(1, Number(pose.wingOpen) || 0.24));

        drawWings(px, basePy, cosmetics.wings, player.facing, localWingFlap, localWingOpen);

        ctx.save();
        ctx.translate(px + PLAYER_W / 2, basePy + PLAYER_H / 2);
        ctx.rotate(Number(pose.bodyTilt) || 0);
        ctx.translate(-(px + PLAYER_W / 2), -(basePy + PLAYER_H / 2));

        const localLook = getLocalLookVector();
        drawHumanoid(px, basePy, player.facing, "#263238", "#b98a78", "#0d0d0d", cosmetics.shirts, cosmetics.pants, cosmetics.shoes, cosmetics.hats, pose, localLook.x, localLook.y);

        drawSword(px, basePy, cosmetics.swords, player.facing, pose.swordSwing || 0, pose.hitDirectionY, pose.hitStrength);
        ctx.restore();
        const titleDef = getEquippedTitleDef();
        const nameText = String(playerName || "Player").slice(0, 20);
        const nameY = basePy - 8;
        ctx.font = PLAYER_NAME_FONT;
        const localTitleName = titleDef ? formatTitleWithUsername(titleDef.name, nameText) : "";
        const showLocalName = shouldShowNameAlongsideTitle(localTitleName, nameText);
        const titleText = localTitleName ? ("[" + localTitleName + "] ") : "";
        const localTitleStyle = normalizeTitleStyle(titleDef && titleDef.style);
        const titleWidth = titleText ? ctx.measureText(titleText).width : 0;
        const nameWidth = showLocalName ? ctx.measureText(nameText).width : 0;
        const totalWidth = titleWidth + nameWidth;
        let cursorX = Math.round(px + PLAYER_W / 2 - totalWidth / 2);
        if (titleDef) {
          const titleColor = localTitleStyle.rainbow
            ? getRainbowTitleColor(nowMs)
            : (titleDef.color || "#8fb4ff");
          ctx.fillStyle = titleColor;
          if (localTitleStyle.bold) {
            ctx.font = "bold " + PLAYER_NAME_FONT;
          }
          if (localTitleStyle.glow) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = localTitleStyle.glowColor || titleColor;
          }
          ctx.fillText(titleText, cursorX, nameY);
          ctx.shadowBlur = 0;
          ctx.shadowColor = "transparent";
          ctx.font = PLAYER_NAME_FONT;
          cursorX += titleWidth;
        }
        if (showLocalName) {
          ctx.fillStyle = "#f3fbff";
          ctx.fillText(nameText, cursorX, nameY);
        }
        if (slotOrder[selectedSlot] === TOOL_WRENCH) {
          const textWidth = (cursorX - (Math.round(px + PLAYER_W / 2 - totalWidth / 2))) + nameWidth;
          const iconSize = 22 / cameraZoom;
          const iconX = Math.round(px + PLAYER_W / 2 - totalWidth / 2) + textWidth + (6 / cameraZoom);
          const iconY = nameY - (4 / cameraZoom) - (iconSize / 2);
          drawNameWrenchIcon(iconX, iconY, iconSize);
          localPlayerWrenchHitbox.push({
            x: iconX,
            y: iconY,
            w: iconSize,
            h: iconSize,
            accountId: playerProfileId || "local",
            name: nameText
          });
        }
      }

      function drawRemotePlayers() {
        const nowMs = performance.now();
        const nowEpoch = Date.now();
        const viewW = getCameraViewWidth();
        const viewH = getCameraViewHeight();
        const keepIds = [];
        playerWrenchHitboxes.length = 0;
        const wrenchSelected = slotOrder[selectedSlot] === TOOL_WRENCH;
        const visiblePlayers = [];
        remotePlayers.forEach((other) => {
          const otherId = (other.id || "").toString();
          keepIds.push(otherId);
          const px = Math.round(other.x - cameraX);
          const py = Math.round(other.y - cameraY);
          if (px < -40 || py < -40 || px > viewW + 40 || py > viewH + 40) return;
          const distance = Math.sqrt(px * px + py * py);
          visiblePlayers.push({ other, otherId, px, py, distance });
        });
        // Sort by distance and limit to 30 closest
        visiblePlayers.sort((a, b) => a.distance - b.distance);
        visiblePlayers.slice(0, 30).forEach(({ other, otherId, px, py }) => {
          const cosmetics = other.cosmetics || {};
          const remoteMotion = typeof animationsModule.sampleRemote === "function"
            ? animationsModule.sampleRemote(remoteAnimationTracker, otherId, other.x, other.y, nowMs)
            : { speed: 0, vy: 0, grounded: true };
          const pose = typeof animationsModule.buildPose === "function"
            ? animationsModule.buildPose(remoteMotion, nowMs, otherId)
            : { bodyBob: 0, bodyTilt: 0, wingFlap: 0, wingOpen: 0.24, swordSwing: 0, eyeYOffset: 0, eyeHeight: 3 };
          if ((Number(other.danceUntil) || 0) > nowEpoch) {
            const danceT = nowMs * 0.015;
            pose.bodyBob = (Number(pose.bodyBob) || 0) + Math.sin(danceT * 1.6) * 1.6;
            pose.bodyTilt = (Number(pose.bodyTilt) || 0) + Math.sin(danceT) * 0.18;
            pose.armSwing = (Number(pose.armSwing) || 0) + Math.sin(danceT * 2.3) * 3.6;
            pose.legSwing = (Number(pose.legSwing) || 0) + Math.cos(danceT * 2.3) * 2.8;
          }
          const basePy = Math.round(py + (pose.bodyBob || 0) - 1);

          drawWings(px, basePy, cosmetics.wings || "", other.facing || 1, pose.wingFlap || 0, pose.wingOpen || 0.24);

          ctx.save();
          ctx.translate(px + PLAYER_W / 2, basePy + PLAYER_H / 2);
          ctx.rotate(Number(pose.bodyTilt) || 0);
          ctx.translate(-(px + PLAYER_W / 2), -(basePy + PLAYER_H / 2));

          const remoteLook = getRemoteLookVector(other);
          drawHumanoid(px, basePy, other.facing || 1, "#2a75bb", "#b98a78", "#102338", cosmetics.shirts || "", cosmetics.pants || "", cosmetics.shoes || "", cosmetics.hats || "", pose, remoteLook.x, remoteLook.y);

          drawSword(px, basePy, cosmetics.swords || "", other.facing || 1, pose.swordSwing || 0, 0, 0);
          ctx.restore();

          const nameText = String(other.name || "Player").slice(0, 20);
          const titleRaw = other && other.title && typeof other.title === "object" ? other.title : {};
          const fallbackTitle = getTitleDef(titleRaw.id || "");
          const rawRemoteTitle = String(titleRaw.name || (fallbackTitle && fallbackTitle.name) || "");
          const titleName = formatTitleWithUsername(rawRemoteTitle, nameText).slice(0, 24);
          const titleColor = String(titleRaw.color || (fallbackTitle && fallbackTitle.color) || "#8fb4ff").slice(0, 24);
          const remoteTitleStyle = normalizeTitleStyle(
            (titleRaw.style && typeof titleRaw.style === "object")
              ? titleRaw.style
              : (fallbackTitle && fallbackTitle.style)
          );
          const showRemoteName = shouldShowNameAlongsideTitle(titleName, nameText);
          const nameY = basePy - 8;
          ctx.font = PLAYER_NAME_FONT;
          const titleText = titleName ? ("[" + titleName + "] ") : "";
          const titleWidth = titleText ? ctx.measureText(titleText).width : 0;
          const nameWidth = showRemoteName ? ctx.measureText(nameText).width : 0;
          const totalWidth = titleWidth + nameWidth;
          const nameX = Math.round(px + PLAYER_W / 2 - totalWidth / 2);
          let cursorX = nameX;
          if (titleName) {
            const styledColor = remoteTitleStyle.rainbow
              ? getRainbowTitleColor(nowMs)
              : (titleColor || "#8fb4ff");
            ctx.fillStyle = styledColor;
            if (remoteTitleStyle.bold) {
              ctx.font = "bold " + PLAYER_NAME_FONT;
            }
            if (remoteTitleStyle.glow) {
              ctx.shadowBlur = 10;
              ctx.shadowColor = remoteTitleStyle.glowColor || styledColor;
            }
            ctx.fillText(titleText, cursorX, nameY);
            ctx.shadowBlur = 0;
            ctx.shadowColor = "transparent";
            ctx.font = PLAYER_NAME_FONT;
            cursorX += titleWidth;
          }
          if (showRemoteName) {
            ctx.fillStyle = "#f3fbff";
            ctx.fillText(nameText, cursorX, nameY);
          }
          if (wrenchSelected && other.accountId) {
            const textWidth = (cursorX - nameX) + nameWidth;
            const iconSize = 22 / cameraZoom;
            const iconX = Math.round(nameX + textWidth + (6 / cameraZoom));
            const iconY = nameY - (4 / cameraZoom) - (iconSize / 2);
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
        ctx.lineWidth = Math.max(1, size * 0.08);
        ctx.stroke();
        ctx.strokeStyle = "rgba(14, 36, 56, 0.95)";
        ctx.lineWidth = Math.max(1.5, size * 0.12);
        const pad = size * 0.25;
        ctx.beginPath();
        ctx.moveTo(x + pad, y + size - pad);
        ctx.lineTo(x + size - pad, y + pad);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x + size - pad, y + pad, size * 0.15, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      function hitWrenchNameIcon(worldX, worldY) {
        if (!inWorld) return null;
        for (let i = localPlayerWrenchHitbox.length - 1; i >= 0; i--) {
          const hit = localPlayerWrenchHitbox[i];
          if (worldX >= hit.x && worldX <= hit.x + hit.w && worldY >= hit.y && worldY <= hit.y + hit.h) {
            return hit;
          }
        }
        for (let i = playerWrenchHitboxes.length - 1; i >= 0; i--) {
          const hit = playerWrenchHitboxes[i];
          if (worldX >= hit.x && worldX <= hit.x + hit.w && worldY >= hit.y && worldY <= hit.y + hit.h) {
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
        const targetAccountId = hit.accountId === "local" ? (playerProfileId || "") : hit.accountId;
        if (!targetAccountId) return false;
        const friendCtrl = getFriendsController();
        if (!friendCtrl || typeof friendCtrl.openProfileByAccount !== "function") return false;
        return Boolean(friendCtrl.openProfileByAccount(targetAccountId, hit.name));
      }

      function wrapChatText(text, maxTextWidth) {
        if (typeof drawUtilsModule.wrapTextLines === "function") {
          return drawUtilsModule.wrapTextLines(ctx, text, maxTextWidth, 4);
        }
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

        let alpha = 1;
        const fadeStart = CHAT_BUBBLE_FADE_MS;
        if (remaining <= fadeStart) {
          const t = Math.max(0, Math.min(1, remaining / fadeStart));
          // Smooth fade-out (ease-out cubic) during final 1.5s.
          alpha = t * t * (3 - 2 * t);
        }
        const text = entry.text;
        if (typeof drawUtilsModule.drawOverheadBubble === "function") {
          drawUtilsModule.drawOverheadBubble(ctx, {
            centerX,
            baseY,
            text,
            alpha,
            maxWidth: CHAT_BUBBLE_MAX_WIDTH,
            lineHeight: CHAT_BUBBLE_LINE_HEIGHT,
            viewWidth: getCameraViewWidth(),
            font: "12px 'Trebuchet MS', sans-serif"
          });
          return;
        }
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
        const selectedId = slotOrder[selectedSlot];
        if (selectedId === TOOL_FIST || selectedId === TOOL_WRENCH) return;
        if (typeof selectedId !== "number") return;

        const reachTiles = Math.max(1, getEditReachTiles());
        const centerTx = Math.floor((player.x + PLAYER_W / 2) / TILE);
        const centerTy = Math.floor((player.y + PLAYER_H / 2) / TILE);
        const minTx = Math.max(0, centerTx - Math.ceil(reachTiles));
        const maxTx = Math.min(WORLD_W - 1, centerTx + Math.ceil(reachTiles));
        const minTy = Math.max(0, centerTy - Math.ceil(reachTiles));
        const maxTy = Math.min(WORLD_H - 1, centerTy + Math.ceil(reachTiles));

        ctx.save();
        ctx.strokeStyle = "rgba(255, 209, 102, 0.26)";
        ctx.lineWidth = 1;
        for (let ty = minTy; ty <= maxTy; ty++) {
          for (let tx = minTx; tx <= maxTx; tx++) {
            if (!canEditTarget(tx, ty)) continue;
            const x = tx * TILE - cameraX;
            const y = ty * TILE - cameraY;
            ctx.strokeRect(x + 0.5, y + 0.5, TILE - 1, TILE - 1);
          }
        }
        ctx.restore();
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
        drawAllDamageOverlays(); // ADDED HERE
        if (particleController && typeof particleController.draw === "function") {
          particleController.draw(ctx, cameraX, cameraY);
        }
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
        return dist <= TILE * getEditReachTiles();
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

      function getRemotePlayerAtTile(tx, ty) {
        const bx = tx * TILE;
        const by = ty * TILE;
        for (const other of remotePlayers.values()) {
          if (!other || !other.accountId || typeof other.x !== "number" || typeof other.y !== "number") continue;
          if (rectsOverlap(bx, by, TILE, TILE, other.x, other.y, PLAYER_W, PLAYER_H)) {
            return other;
          }
        }
        return null;
      }

      function clearWorldRuntimePlacementData() {
        const vendingCtrl = getVendingController();
        if (vendingCtrl && typeof vendingCtrl.clearAll === "function") vendingCtrl.clearAll();
        const gambleCtrl = getGambleController();
        if (gambleCtrl && typeof gambleCtrl.clearAll === "function") gambleCtrl.clearAll();
        const donationCtrl = getDonationController();
        if (donationCtrl && typeof donationCtrl.clearAll === "function") donationCtrl.clearAll();
        const chestCtrl = getChestController();
        if (chestCtrl && typeof chestCtrl.clearAll === "function") chestCtrl.clearAll();
        const signCtrl = getSignController();
        if (signCtrl && typeof signCtrl.clearAll === "function") signCtrl.clearAll();
        displayItemsByTile.clear();
        doorAccessByTile.clear();
        antiGravityByTile.clear();
        cameraConfigsByTile.clear();
        cameraLogsByTile.clear();
        currentWorldWeather = null;
      }

      function clearCurrentWorldToBedrock(sourceTag) {
        if (!inWorld) {
          postLocalSystemChat("Enter a world first.");
          return false;
        }
        const preserveLockTx = Number(currentWorldLock && currentWorldLock.tx);
        const preserveLockTy = Number(currentWorldLock && currentWorldLock.ty);
        const preserveLock = Number.isInteger(preserveLockTx) && Number.isInteger(preserveLockTy);
        const spawnTiles = getSpawnStructureTiles();
        const updates = {};
        let changed = 0;
        for (let ty = 0; ty < WORLD_H; ty++) {
          for (let tx = 0; tx < WORLD_W; tx++) {
            let nextId = 0;
            if (ty >= WORLD_H - 2) {
              nextId = SPAWN_BASE_ID;
            } else if (tx === spawnTiles.door.tx && ty === spawnTiles.door.ty) {
              nextId = SPAWN_DOOR_ID;
            } else if (tx === spawnTiles.base.tx && ty === spawnTiles.base.ty) {
              nextId = SPAWN_BASE_ID;
            } else if (preserveLock && tx === preserveLockTx && ty === preserveLockTy) {
              nextId = getCurrentWorldLockBlockId();
            }
            if (world[ty][tx] === nextId) continue;
            world[ty][tx] = nextId;
            clearTileDamage(tx, ty);
            updates[tx + "_" + ty] = nextId;
            changed++;
          }
        }
        clearWorldRuntimePlacementData();
        clearWorldDrops();
        closeVendingModal();
        closeDonationModal();
        closeChestModal();
        closeSignModal();
        closeDoorModal();
        closeCameraModal();
        closeWeatherModal();
        closeGambleModal();
        if (network.enabled) {
          const dbOps = [];
          if (network.blocksRef && Object.keys(updates).length) {
            dbOps.push(network.blocksRef.update(updates));
          }
          if (network.hitsRef) dbOps.push(network.hitsRef.remove());
          if (network.dropsRef) dbOps.push(network.dropsRef.remove());
          if (network.vendingRef) dbOps.push(network.vendingRef.remove());
          if (network.gambleRef) dbOps.push(network.gambleRef.remove());
          if (network.donationRef) dbOps.push(network.donationRef.remove());
          if (network.chestsRef) dbOps.push(network.chestsRef.remove());
          if (network.signsRef) dbOps.push(network.signsRef.remove());
          if (network.displaysRef) dbOps.push(network.displaysRef.remove());
          if (network.doorsRef) dbOps.push(network.doorsRef.remove());
          if (network.antiGravRef) dbOps.push(network.antiGravRef.remove());
          if (network.plantsRef) dbOps.push(network.plantsRef.remove());
          if (network.weatherRef) dbOps.push(network.weatherRef.remove());
          if (network.camerasRef) dbOps.push(network.camerasRef.remove());
          if (network.cameraLogsRef) dbOps.push(network.cameraLogsRef.remove());
          Promise.allSettled(dbOps).finally(() => {
            if (network.enabled) syncPlayer(true);
          });
        }
        enforceSpawnStructureInWorldData();
        ensurePlayerSafeSpawn(true);
        logAdminAudit("Admin(" + (sourceTag || "panel") + ") cleared world " + currentWorldId + " to bedrock.");
        pushAdminAuditEntry("clearworld", "", "world=" + currentWorldId + " changed=" + changed);
        postLocalSystemChat("World cleared to bedrock (" + changed + " tiles updated).");
        return true;
      }

      function tryUseSpawnMover(tx, ty) {
        if (!inWorld) return false;
        if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H) return false;
        if (!canEditTarget(tx, ty)) return false;
        if (!canEditCurrentWorld()) {
          notifyWorldLockedDenied();
          return false;
        }
        if (ty >= WORLD_H - 2) {
          postLocalSystemChat("Spawn door must be above the bedrock floor.");
          return false;
        }
        if (inventory[SPAWN_MOVER_ID] <= 0) return false;
        if (tileOccupiedByAnyPlayer(tx, ty) || tileOccupiedByAnyPlayer(tx, ty + 1)) {
          postLocalSystemChat("Cannot move spawn onto a player.");
          return false;
        }
        const targetDoorId = world[ty][tx];
        const targetBaseId = world[ty + 1][tx];
        const canUseDoorTile = targetDoorId === 0 || targetDoorId === SPAWN_DOOR_ID;
        const canUseBaseTile = targetBaseId === 0 || targetBaseId === SPAWN_BASE_ID;
        if (!canUseDoorTile || !canUseBaseTile) {
          postLocalSystemChat("Target door tile must be empty (base can be empty/bedrock).");
          return false;
        }

        // Remove every existing spawn door except the new target tile.
        const staleDoorTiles = [];
        for (let scanY = 0; scanY < WORLD_H; scanY++) {
          const row = world[scanY];
          if (!Array.isArray(row)) continue;
          for (let scanX = 0; scanX < WORLD_W; scanX++) {
            if (row[scanX] !== SPAWN_DOOR_ID) continue;
            if (scanX === tx && scanY === ty) continue;
            staleDoorTiles.push({ tx: scanX, ty: scanY });
          }
        }
        for (let i = 0; i < staleDoorTiles.length; i++) {
          const tile = staleDoorTiles[i];
          world[tile.ty][tile.tx] = 0;
          clearTileDamage(tile.tx, tile.ty);
        }

        setSpawnStructureTile(tx, ty);
        const nextTiles = getSpawnStructureTiles();
        cleanupSpawnStructureInWorldData();
        world[nextTiles.door.ty][nextTiles.door.tx] = SPAWN_DOOR_ID;
        world[nextTiles.base.ty][nextTiles.base.tx] = SPAWN_BASE_ID;
        clearTileDamage(nextTiles.door.tx, nextTiles.door.ty);
        clearTileDamage(nextTiles.base.tx, nextTiles.base.ty);
        if (network.enabled && network.blocksRef) {
          const pushCleanup = () => {
            network.blocksRef.once("value").then((snapshot) => {
              const map = snapshot && snapshot.val ? (snapshot.val() || {}) : {};
              const updates = buildSpawnStructureCleanupUpdates(map, nextTiles.door.tx, nextTiles.door.ty);
              return network.blocksRef.update(updates);
            }).catch(() => {
              setNetworkState("Network error", true);
            });
          };
          pushCleanup();
          if (network.spawnMetaRef) {
            network.spawnMetaRef.set({
              tx: nextTiles.door.tx,
              ty: nextTiles.door.ty,
              by: (playerName || "").toString().slice(0, 20),
              updatedAt: firebase.database.ServerValue.TIMESTAMP
            }).catch(() => {});
          }
          setTimeout(() => {
            if (!inWorld || !network.enabled || !network.blocksRef) return;
            pushCleanup();
          }, 420);
        } else {
          for (let i = 0; i < staleDoorTiles.length; i++) {
            const tile = staleDoorTiles[i];
            syncBlock(tile.tx, tile.ty, 0);
          }
          syncBlock(nextTiles.door.tx, nextTiles.door.ty, SPAWN_DOOR_ID);
          syncBlock(nextTiles.base.tx, nextTiles.base.ty, SPAWN_BASE_ID);
        }

        inventory[SPAWN_MOVER_ID] = Math.max(0, Math.floor((inventory[SPAWN_MOVER_ID] || 0) - 1));
        saveInventory();
        refreshToolbar();
        postLocalSystemChat("Spawn moved to " + tx + "," + ty + ".");
        return true;
      }

      function tryPlace(tx, ty) {
        const id = slotOrder[selectedSlot];
        if (typeof id !== "number") return;
        if (id === SPAWN_MOVER_ID) {
          tryUseSpawnMover(tx, ty);
          return;
        }
        if (!canEditTarget(tx, ty)) return;
        if (isProtectedSpawnTile(tx, ty)) return;
        if (!canEditCurrentWorld()) {
          notifyWorldLockedDenied();
          return;
        }
        if (inventory[id] <= 0) return;
        if (world[ty][tx] !== 0) return;
        if (tileOccupiedByAnyPlayer(tx, ty)) return;
        if (isPlantSeedBlockId(id)) {
          const supportTy = ty + 1;
          if (supportTy >= WORLD_H || world[supportTy][tx] === 0) {
            postLocalSystemChat("Seeds can only be planted on top of blocks.");
            return;
          }
        }
        if (isWorldLocked() && !isWorldLockOwner()) {
          if (isWorldLockBlockId(id)) {
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
          clearTileDamage(tx, ty);
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
          } else if (id === GAMBLE_ID) {
            const gambleCtrl = getGambleController();
            if (gambleCtrl && typeof gambleCtrl.onPlaced === "function") {
              gambleCtrl.onPlaced(tx, ty);
            }
          } else if (isDonationBoxBlockId(id)) {
            const donationCtrl = getDonationController();
            if (donationCtrl && typeof donationCtrl.onPlaced === "function") {
              donationCtrl.onPlaced(tx, ty);
            } else {
              seedDonationBoxOwner(tx, ty);
            }
          } else if (isChestBlockId(id)) {
            const chestCtrl = getChestController();
            if (chestCtrl && typeof chestCtrl.onPlaced === "function") {
              chestCtrl.onPlaced(tx, ty);
            }
          } else if (id === SIGN_ID) {
            saveSignText(tx, ty, "");
          } else if (id === ANTI_GRAV_ID) {
            saveAntiGravityState(tx, ty, true);
          } else if (id === CAMERA_ID) {
            saveCameraConfig(tx, ty, buildDefaultCameraConfig());
          } else if (id === DISPLAY_BLOCK_ID) {
            saveDisplayItem(tx, ty, null);
          } else if (isPlantSeedBlockId(id)) {
            const seedCfg = getPlantSeedConfig(id) || {};
            const ctrl = getPlantsController();
            const seedPlant = (ctrl && typeof ctrl.createSeedPlant === "function")
              ? ctrl.createSeedPlant(Date.now(), {
                  yieldBlockId: seedCfg.yieldBlockId || TREE_YIELD_BLOCK_ID,
                  growMs: seedCfg.growMs || TREE_GROW_MS,
                  randomFn: Math.random
                })
              : {
                  type: "tree",
                  plantedAt: Date.now(),
                  growMs: seedCfg.growMs || TREE_GROW_MS,
                  yieldBlockId: seedCfg.yieldBlockId || TREE_YIELD_BLOCK_ID,
                  fruitAmount: 1 + Math.floor(Math.random() * 5)
                };
            if (!seedPlant.fruitAmount || Number(seedPlant.fruitAmount) <= 0) {
              seedPlant.fruitAmount = resolvePlantFruitAmount(seedPlant);
            }
            saveTreePlant(tx, ty, seedPlant);
          }
          saveInventory(false);
          refreshToolbar();
          awardXp(3, "placing blocks");
        };

        if (isWorldLockBlockId(id)) {
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
              lockBlockId: id,
              tx,
              ty,
              createdAt: Date.now()
            };
            finalizePlace();
            postLocalSystemChat("World locked.");
            applyAchievementEvent("world_lock_placed", { worldId: currentWorldId });
            return;
          }
          network.lockRef.transaction((current) => {
            if (current && current.ownerAccountId) return;
            return {
              ownerAccountId: playerProfileId || "",
              ownerName,
              lockBlockId: id,
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
              lockBlockId: id,
              tx,
              ty,
              createdAt: Date.now()
            };
            finalizePlace();
            postLocalSystemChat("World locked.");
            applyAchievementEvent("world_lock_placed", { worldId: currentWorldId });
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
        if (isWorldLocked() && isWorldLockBlockId(id) && !isWorldLockOwner()) {
          notifyWorldLockedDenied();
          return;
        }
        if (id === VENDING_ID && isWorldLocked() && !isWorldLockOwner()) {
          notifyOwnerOnlyWorldEdit("vending machines");
          return;
        }
        if (isDonationBoxBlockId(id)) {
          const donationCtrl = getDonationController();
          const box = donationCtrl && typeof donationCtrl.getLocal === "function"
            ? donationCtrl.getLocal(tx, ty)
            : getLocalDonationBox(tx, ty);
          if (box && box.ownerAccountId && box.ownerAccountId !== playerProfileId) {
            postLocalSystemChat("Only the donation box owner can break it.");
            return;
          }
          const storedCount = donationCtrl && typeof donationCtrl.getStoredCountAt === "function"
            ? donationCtrl.getStoredCountAt(tx, ty)
            : getDonationStoredCount(box && box.items);
          if (storedCount > 0) {
            postLocalSystemChat("Collect donations before breaking this box.");
            return;
          }
        }
        if (isChestBlockId(id)) {
          const chestCtrl = getChestController();
          const chest = chestCtrl && typeof chestCtrl.getLocal === "function" ? chestCtrl.getLocal(tx, ty) : null;
          const canManageChest = isWorldLocked()
            ? isWorldLockOwner()
            : Boolean(chest && chest.ownerAccountId && chest.ownerAccountId === playerProfileId);
          if (!canManageChest) {
            postLocalSystemChat("Only the chest manager can break storage chests.");
            return;
          }
          const stored = chestCtrl && typeof chestCtrl.getStoredCountAt === "function"
            ? chestCtrl.getStoredCountAt(tx, ty)
            : 0;
          if (stored > 0) {
            postLocalSystemChat("Collect chest items before breaking it.");
            return;
          }
        }

        const now = performance.now();
        if ((now - lastBlockHitAtMs) < BLOCK_HIT_COOLDOWN_MS) return;
        lastBlockHitAtMs = now;

        if (isPlantSeedBlockId(id)) {
          const plant = getLocalTreePlant(tx, ty);
          const fixedFruitAmount = resolvePlantFruitAmount(plant);
          if (plant && Number(plant.fruitAmount) !== fixedFruitAmount) {
            saveTreePlant(tx, ty, { ...plant, fruitAmount: fixedFruitAmount });
          }
          const ctrl = getPlantsController();
          const baseHarvest = (ctrl && typeof ctrl.getHarvestReward === "function")
            ? ctrl.getHarvestReward(plant, Math.random)
            : null;
          if (!baseHarvest) {
            postLocalSystemChat("Seed is still growing.");
            return;
          }
          const rewardsCtrl = getRewardsController();
          const harvestRaw = (rewardsCtrl && typeof rewardsCtrl.getTreeHarvestRewards === "function")
            ? rewardsCtrl.getTreeHarvestRewards(baseHarvest, Math.random)
            : {
                blockId: Math.max(1, Math.floor(Number(baseHarvest.blockId) || TREE_YIELD_BLOCK_ID)),
                amount: Math.max(1, Math.floor(Number(baseHarvest.amount) || 1)),
                gems: 1 + Math.floor(Math.random() * 4)
              };
          const harvest = {
            blockId: Math.max(1, Math.floor(Number(harvestRaw && harvestRaw.blockId) || TREE_YIELD_BLOCK_ID)),
            amount: fixedFruitAmount,
            gems: Math.max(0, Math.floor(Number(harvestRaw && harvestRaw.gems) || 0))
          };
          const rewardBlockId = Math.max(1, Math.floor(Number(harvest.blockId) || TREE_YIELD_BLOCK_ID));
          const rewardAmount = Math.max(1, Math.floor(Number(harvest.amount) || 1));
          const gemReward = Math.max(0, Math.floor(Number(harvest.gems) || 0));
          world[ty][tx] = 0;
          clearTileDamage(tx, ty);
          saveTreePlant(tx, ty, null);
          syncBlock(tx, ty, 0);
          if (particleController && typeof particleController.emitBlockBreak === "function") {
            particleController.emitBlockBreak(tx * TILE + TILE * 0.5, ty * TILE + TILE * 0.5, 11);
          }
          if (INVENTORY_IDS.includes(rewardBlockId)) {
            inventory[rewardBlockId] = (inventory[rewardBlockId] || 0) + rewardAmount;
          }
          addPlayerGems(gemReward, true);
          saveInventory(false);
          refreshToolbar(true);
          awardXp(15, "harvesting");
          applyAchievementEvent("tree_harvest", { count: 1 });
          applyQuestEvent("break_block", { count: 1 });
          const rewardDef = blockDefs[rewardBlockId];
          const rewardName = rewardDef && rewardDef.name ? rewardDef.name : ("Block " + rewardBlockId);
          postLocalSystemChat("Harvested seed: +" + rewardAmount + " " + rewardName + " and +" + gemReward + " gems.");
          return;
        }

        const durability = getBlockDurability(id);
        if (!Number.isFinite(durability)) return;
        const breakPower = getEquippedBreakPower();
        const hitAmount = breakPower.instantBreak
          ? Math.max(1, Math.floor(durability))
          : Math.max(1, Math.floor(breakPower.multiplier));

        if (id === VENDING_ID) {
          const ctrl = getVendingController();
          if (ctrl && typeof ctrl.onBreakWithFist === "function" && ctrl.onBreakWithFist(tx, ty)) {
            return;
          }
        }

        const damage = getTileDamage(tx, ty);
        const nextHits = Math.max(1, damage.hits + hitAmount);
        if (nextHits < durability) {
          setTileDamage(tx, ty, nextHits);
          syncTileDamageToNetwork(tx, ty, nextHits);
          return;
        }
        clearTileDamage(tx, ty);

        if (id === SIGN_ID) {
          saveSignText(tx, ty, "");
          const signCtrl = getSignController();
          if (signCtrl && typeof signCtrl.isEditingTile === "function" && signCtrl.isEditingTile(tx, ty)) {
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
        if (id === DISPLAY_BLOCK_ID) {
          const existingDisplay = getLocalDisplayItem(tx, ty);
          if (existingDisplay) {
            grantDisplayItemToInventory(existingDisplay);
          }
          saveDisplayItem(tx, ty, null);
        }
        if (isDonationBoxBlockId(id)) {
          const donationCtrl = getDonationController();
          if (donationCtrl && typeof donationCtrl.onBroken === "function") {
            donationCtrl.onBroken(tx, ty);
          } else {
            setLocalDonationBox(tx, ty, null);
          }
          if (network.enabled && network.donationRef) {
            network.donationRef.child(getTileKey(tx, ty)).remove().catch(() => {});
          }
        }
        if (isChestBlockId(id)) {
          const chestCtrl = getChestController();
          if (chestCtrl && typeof chestCtrl.onBroken === "function") {
            chestCtrl.onBroken(tx, ty);
          }
          if (network.enabled && network.chestsRef) {
            network.chestsRef.child(getTileKey(tx, ty)).remove().catch(() => {});
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
        if (id === GAMBLE_ID) {
          const gambleCtrl = getGambleController();
          if (gambleCtrl && typeof gambleCtrl.canBreakAt === "function" && !gambleCtrl.canBreakAt(tx, ty)) {
            postLocalSystemChat("Only the machine owner can break this gambling machine.");
            return;
          }
          if (gambleCtrl && typeof gambleCtrl.claimOnBreak === "function") {
            gambleCtrl.claimOnBreak(tx, ty);
          } else {
            setLocalGambleMachine(tx, ty, null);
            if (network.enabled && network.gambleRef) {
              network.gambleRef.child(getTileKey(tx, ty)).remove().catch(() => {});
            }
          }
        }
        if (isPlantSeedBlockId(id)) {
          saveTreePlant(tx, ty, null);
        }

        world[ty][tx] = 0;
        if (particleController && typeof particleController.emitBlockBreak === "function") {
          particleController.emitBlockBreak(tx * TILE + TILE * 0.5, ty * TILE + TILE * 0.5, 12);
        }
        if (isGachaBlockId(id)) {
          resolveGachaBreak(id, tx, ty);
        } else {
          const dropId = getInventoryDropId(id);
          const shouldReturnBrokenItem = Math.random() < BREAK_RETURN_ITEM_CHANCE;
          if (shouldReturnBrokenItem && INVENTORY_IDS.includes(dropId)) {
            const currentCount = Math.max(0, Math.floor(Number(inventory[dropId]) || 0));
            if (currentCount >= INVENTORY_ITEM_LIMIT) {
              if (Math.random() < (1 / 3)) {
                spawnWorldDropEntry(
                  { type: "block", blockId: dropId },
                  1,
                  tx * TILE,
                  ty * TILE
                );
              }
            } else {
              inventory[dropId] = currentCount + 1;
            }
          }
          const seedDropId = SEED_DROP_BY_BLOCK_ID[id] || 0;
          if (seedDropId && !isWorldLockBlockId(id) && Math.random() < SEED_DROP_CHANCE) {
            inventory[seedDropId] = (inventory[seedDropId] || 0) + 1;
            if (particleController && typeof particleController.emitSeedDrop === "function") {
              particleController.emitSeedDrop(tx * TILE + TILE * 0.5, ty * TILE + TILE * 0.4);
            }
            const seedDef = blockDefs[seedDropId];
            const seedName = seedDef && seedDef.name ? seedDef.name : "Seed";
            postLocalSystemChat("You found a " + seedName + ".");
          }
        }
        syncBlock(tx, ty, 0);
        if (isWorldLockBlockId(id)) {
          currentWorldLock = null;
          if (network.enabled && network.lockRef) {
            network.lockRef.remove().catch(() => {});
          }
          postLocalSystemChat("World unlocked.");
        }
        const farmableXp = farmableRegistry && typeof farmableRegistry.getBreakXp === "function"
          ? farmableRegistry.getBreakXp(id, 5)
          : 5;
        if (farmableRegistry && typeof farmableRegistry.isFarmable === "function" && farmableRegistry.isFarmable(id)) {
          const farmableGems = Math.max(0, Math.floor(Number(
            typeof farmableRegistry.rollGems === "function" ? farmableRegistry.rollGems(id, Math.random) : 0
          ) || 0));
          if (farmableGems > 0) {
            addPlayerGems(farmableGems, true);
          }
        }
        saveInventory(false);
        refreshToolbar(true);
        awardXp(farmableXp, "breaking blocks");
        applyQuestEvent("break_block", { count: 1 });
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
        if (isWorldLocked() && isWorldLockBlockId(id) && !isWorldLockOwner()) {
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
        clearTileDamage(tx, ty);
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
        const remoteAtTile = getRemotePlayerAtTile(tx, ty);
        if (remoteAtTile) {
          const friendCtrl = getFriendsController();
          if (friendCtrl && typeof friendCtrl.openProfile === "function") {
            friendCtrl.openProfile({
              accountId: remoteAtTile.accountId,
              name: remoteAtTile.name
            });
            return;
          }
        }
        const id = world[ty][tx];
        if (isWorldLockBlockId(id)) {
          openWorldLockModal(tx, ty);
          return;
        }
        if (id === VENDING_ID) {
          interactWithVendingMachine(tx, ty);
          return;
        }
        if (id === GAMBLE_ID) {
          openGambleModal(tx, ty);
          return;
        }
        if (isDonationBoxBlockId(id)) {
          openDonationModal(tx, ty);
          return;
        }
        if (isChestBlockId(id)) {
          openChestModal(tx, ty);
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
        if (shouldBlockActionForFreeze()) return;
        if (isProtectedSpawnTile(tx, ty)) return;
        const selectedId = slotOrder[selectedSlot];
        if (antiCheatController && typeof antiCheatController.onActionAttempt === "function") {
          antiCheatController.onActionAttempt({
            action: selectedId === TOOL_WRENCH ? "wrench" : (selectedId === TOOL_FIST ? "break" : "place"),
            tx,
            ty
          });
        }
        if (selectedId === TOOL_FIST) {
          const playerCenterTileX = (player.x + PLAYER_W * 0.5) / TILE;
          if (Number.isFinite(playerCenterTileX) && tx !== Math.floor(playerCenterTileX)) {
            player.facing = tx >= playerCenterTileX ? 1 : -1;
          }
          const playerCenterTileY = (player.y + PLAYER_H * 0.5) / TILE;
          if (ty < Math.floor(playerCenterTileY)) {
            lastHitDirectionY = -1;
          } else if (ty > Math.floor(playerCenterTileY)) {
            lastHitDirectionY = 1;
          } else {
            lastHitDirectionY = 0;
          }
          lastHitAtMs = performance.now();
        }
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
        if (shouldBlockActionForFreeze()) return;
        if (isProtectedSpawnTile(tx, ty)) return;
        const selectedId = slotOrder[selectedSlot];
        if (antiCheatController && typeof antiCheatController.onActionAttempt === "function") {
          antiCheatController.onActionAttempt({
            action: selectedId === TOOL_WRENCH ? "wrench_secondary" : (selectedId === TOOL_FIST ? "rotate" : "secondary"),
            tx,
            ty
          });
        }
        if (selectedId === TOOL_FIST) {
          lastHitAtMs = performance.now();
        }
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
        const type = (typeRaw === "cosmetic" || typeRaw === "tool") ? typeRaw : "block";
        const blockId = Math.max(0, Math.floor(Number(value.blockId) || 0));
        const cosmeticId = String(value.cosmeticId || "").trim().slice(0, 64);
        const toolIdRaw = String(value.toolId || "").trim().toLowerCase();
        const toolId = (toolIdRaw === TOOL_FIST || toolIdRaw === TOOL_WRENCH) ? toolIdRaw : "";
        const amount = Math.max(1, Math.floor(Number(value.amount) || 1));
        if (type === "block" && !blockId) return null;
        if (type === "cosmetic" && !cosmeticId) return null;
        if (type === "tool" && !toolId) return null;
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
          toolId,
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
        if (drop.type === "tool") {
          if (drop.toolId === TOOL_WRENCH) return "Wrench";
          return "Fist";
        }
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

      function getMaxDroppableAmount(entry) {
        if (!entry || !entry.type) return 0;
        const tradeCtrl = getTradeController();
        if (tradeCtrl && typeof tradeCtrl.getDragEntryMax === "function") {
          const maxFromTrade = Math.max(0, Math.floor(Number(tradeCtrl.getDragEntryMax(entry)) || 0));
          if (maxFromTrade > 0) return maxFromTrade;
        }
        if (entry.type === "block") {
          const blockId = Math.max(0, Math.floor(Number(entry.blockId) || 0));
          if (!blockId || !INVENTORY_IDS.includes(blockId)) return 0;
          return Math.max(0, Math.floor(Number(inventory[blockId]) || 0));
        }
        if (entry.type === "cosmetic") {
          const cosmeticId = String(entry.cosmeticId || "");
          return Math.max(0, Math.floor(Number(cosmeticInventory[cosmeticId]) || 0));
        }
        if (entry.type === "tool") {
          return 0;
        }
        return 0;
      }

      function isSameDropKind(drop, entry) {
        if (!drop || !entry) return false;
        if (drop.type !== entry.type) return false;
        if (drop.type === "block") {
          return Math.floor(Number(drop.blockId) || 0) === Math.floor(Number(entry.blockId) || 0);
        }
        if (drop.type === "cosmetic") {
          return String(drop.cosmeticId || "") === String(entry.cosmeticId || "");
        }
        if (drop.type === "tool") {
          return String(drop.toolId || "") === String(entry.toolId || "");
        }
        return false;
      }

      function findNearbyDropStackCandidate(entry, x, y) {
        if (!entry || !worldDrops.size) return null;
        const tx = Math.floor(x / TILE);
        const ty = Math.floor(y / TILE);
        for (const drop of worldDrops.values()) {
          if (!drop || !drop.id) continue;
          if (!isSameDropKind(drop, entry)) continue;
          const dtx = Math.floor(Number(drop.x || 0) / TILE);
          const dty = Math.floor(Number(drop.y || 0) / TILE);
          if (dtx === tx && dty === ty) {
            return drop;
          }
        }
        return null;
      }

      function applyStackAmountToLocalDrop(dropId, amountDelta) {
        const key = String(dropId || "");
        if (!key || !worldDrops.has(key)) return false;
        const existing = worldDrops.get(key);
        if (!existing) return false;
        const nextAmount = Math.max(
          1,
          Math.floor(Number(existing.amount) || 1) + Math.max(1, Math.floor(Number(amountDelta) || 1))
        );
        worldDrops.set(key, { ...existing, amount: nextAmount });
        return true;
      }

      function spawnWorldDropEntry(entry, amount, dropX, dropY) {
        if (!inWorld || !entry) return false;
        const qty = Math.max(1, Math.floor(Number(amount) || 1));
        const worldX = Number.isFinite(dropX) ? dropX : (player.x + (PLAYER_W / 2) - (TILE / 2));
        const worldY = Number.isFinite(dropY) ? dropY : (player.y + PLAYER_H - TILE);
        const clampedX = Math.max(0, Math.min(worldX, WORLD_W * TILE - TILE));
        const clampedY = Math.max(0, Math.min(worldY, WORLD_H * TILE - TILE));

        const payload = {
          type: entry.type,
          blockId: 0,
          cosmeticId: "",
          toolId: "",
          amount: qty,
          x: clampedX,
          y: clampedY,
          ownerAccountId: playerProfileId || "",
          ownerSessionId: playerSessionId || "",
          ownerName: (playerName || "").toString().slice(0, 20),
          createdAt: Date.now()
        };

        if (entry.type === "block") {
          payload.blockId = Math.max(0, Math.floor(Number(entry.blockId) || 0));
        } else if (entry.type === "cosmetic") {
          payload.cosmeticId = String(entry.cosmeticId || "").trim().slice(0, 64);
        } else if (entry.type === "tool") {
          payload.toolId = String(entry.toolId || "").trim();
        } else {
          return false;
        }

        const stackTarget = findNearbyDropStackCandidate(entry, clampedX, clampedY);
        if (stackTarget) {
          if (!network.enabled || !network.dropsRef || String(stackTarget.id).startsWith("local_")) {
            return applyStackAmountToLocalDrop(stackTarget.id, qty);
          }
          network.dropsRef.child(stackTarget.id).transaction((current) => {
            if (!current || typeof current !== "object") return current;
            const currentType = String(current.type || "").trim().toLowerCase();
            const safeType = currentType === "cosmetic" || currentType === "tool" ? currentType : "block";
            if (safeType !== entry.type) return current;
            if (safeType === "block") {
              if (Math.floor(Number(current.blockId) || 0) !== Math.floor(Number(entry.blockId) || 0)) return current;
            } else if (safeType === "cosmetic") {
              if (String(current.cosmeticId || "") !== String(entry.cosmeticId || "")) return current;
            } else if (safeType === "tool") {
              if (String(current.toolId || "") !== String(entry.toolId || "")) return current;
            }
            const currentAmount = Math.max(1, Math.floor(Number(current.amount) || 1));
            return {
              ...current,
              amount: currentAmount + qty,
              updatedAt: firebase.database.ServerValue.TIMESTAMP
            };
          }).then((result) => {
            if (result && result.committed) return;
            network.dropsRef.push({
              ...payload,
              createdAt: firebase.database.ServerValue.TIMESTAMP
            }).catch(() => {});
          }).catch(() => {
            network.dropsRef.push({
              ...payload,
              createdAt: firebase.database.ServerValue.TIMESTAMP
            }).catch(() => {});
          });
          return true;
        }

        if (!network.enabled || !network.dropsRef) {
          const localId = "local_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7);
          addOrUpdateWorldDrop(localId, payload);
          return true;
        }
        network.dropsRef.push({
          ...payload,
          createdAt: firebase.database.ServerValue.TIMESTAMP
        }).catch(() => {});
        return true;
      }

      function dropInventoryEntry(entry, amount, dropX, dropY) {
        if (!inWorld || !entry) return false;
        const now = performance.now();
        if (now - lastDropAtMs < 120) return false;
        const maxAmount = getMaxDroppableAmount(entry);
        if (maxAmount <= 0) return false;
        const qty = Math.max(1, Math.min(maxAmount, Math.floor(Number(amount) || 1)));

        const defaultDropX = player.x + (PLAYER_W / 2) - (TILE / 2);
        const defaultDropY = player.y + PLAYER_H - TILE;
        const worldX = Number.isFinite(dropX) ? dropX : defaultDropX;
        const worldY = Number.isFinite(dropY) ? dropY : defaultDropY;
        const clampedX = Math.max(0, Math.min(worldX, WORLD_W * TILE - TILE));
        const clampedY = Math.max(0, Math.min(worldY, WORLD_H * TILE - TILE));

        const payload = {
          type: entry.type,
          blockId: 0,
          cosmeticId: "",
          toolId: "",
          amount: qty,
          x: clampedX,
          y: clampedY,
          ownerAccountId: playerProfileId || "",
          ownerSessionId: playerSessionId || "",
          ownerName: (playerName || "").toString().slice(0, 20),
          createdAt: Date.now()
        };

        let changedInventory = false;
        if (entry.type === "block") {
          const blockId = Math.max(0, Math.floor(Number(entry.blockId) || 0));
          payload.blockId = blockId;
          inventory[blockId] = Math.max(0, Math.floor((inventory[blockId] || 0) - qty));
          changedInventory = true;
        } else if (entry.type === "cosmetic") {
          const cosmeticId = String(entry.cosmeticId || "").trim().slice(0, 64);
          payload.cosmeticId = cosmeticId;
          cosmeticInventory[cosmeticId] = Math.max(0, Math.floor((cosmeticInventory[cosmeticId] || 0) - qty));
          if ((cosmeticInventory[cosmeticId] || 0) <= 0) {
            for (let i = 0; i < COSMETIC_SLOTS.length; i++) {
              const slot = COSMETIC_SLOTS[i];
              if (equippedCosmetics[slot] === cosmeticId) {
                equippedCosmetics[slot] = "";
              }
            }
          }
          changedInventory = true;
        } else if (entry.type === "tool") {
          const toolId = String(entry.toolId || "").trim();
          payload.toolId = toolId;
        } else {
          return false;
        }

        lastDropAtMs = now;
        if (changedInventory) {
          saveInventory();
          refreshToolbar();
          if (entry.type === "cosmetic") {
            syncPlayer(true);
          }
        }

        const stackTarget = findNearbyDropStackCandidate(entry, clampedX, clampedY);
        if (stackTarget) {
          if (!network.enabled || !network.dropsRef || String(stackTarget.id).startsWith("local_")) {
            if (applyStackAmountToLocalDrop(stackTarget.id, qty)) {
              return true;
            }
          } else {
            network.dropsRef.child(stackTarget.id).transaction((current) => {
              if (!current || typeof current !== "object") return current;
              const currentType = String(current.type || "").trim().toLowerCase();
              const safeType = currentType === "cosmetic" || currentType === "tool" ? currentType : "block";
              if (safeType !== entry.type) return current;
              if (safeType === "block") {
                if (Math.floor(Number(current.blockId) || 0) !== Math.floor(Number(entry.blockId) || 0)) return current;
              } else if (safeType === "cosmetic") {
                if (String(current.cosmeticId || "") !== String(entry.cosmeticId || "")) return current;
              } else if (safeType === "tool") {
                if (String(current.toolId || "") !== String(entry.toolId || "")) return current;
              }
              const currentAmount = Math.max(1, Math.floor(Number(current.amount) || 1));
              return {
                ...current,
                amount: currentAmount + qty,
                updatedAt: firebase.database.ServerValue.TIMESTAMP
              };
            }).then((result) => {
              if (result && result.committed) return;
              network.dropsRef.push({
                ...payload,
                createdAt: firebase.database.ServerValue.TIMESTAMP
              }).catch(() => {});
            }).catch(() => {
              network.dropsRef.push({
                ...payload,
                createdAt: firebase.database.ServerValue.TIMESTAMP
              }).catch(() => {});
            });
            return true;
          }
        }

        if (!network.enabled || !network.dropsRef) {
          const localId = "local_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7);
          addOrUpdateWorldDrop(localId, payload);
          return true;
        }
        network.dropsRef.push({
          ...payload,
          createdAt: firebase.database.ServerValue.TIMESTAMP
        }).catch(() => {});
        return true;
      }

      function dropSelectedInventoryItem() {
        if (!inWorld) return;
        const selectedId = slotOrder[selectedSlot];
        if (selectedId === TOOL_FIST || selectedId === TOOL_WRENCH) return;
        if (typeof selectedId !== "number") return;
        dropInventoryEntry({ type: "block", blockId: selectedId }, 1);
      }

      function tryPickupWorldDrop(drop) {
        if (!drop || !drop.id) return;
        if (drop.noPickupUntil && performance.now() < drop.noPickupUntil) return;
        const px = player.x + PLAYER_W / 2;
        const py = player.y + PLAYER_H / 2;
        const dx = (drop.x + TILE / 2) - px;
        const dy = (drop.y + TILE / 2) - py;
        if ((dx * dx + dy * dy) > (DROP_PICKUP_RADIUS * DROP_PICKUP_RADIUS)) return;

        if (drop.type === "block") {
          const current = Math.max(0, Math.floor(Number(inventory[drop.blockId]) || 0));
          const incoming = Math.max(1, Math.floor(Number(drop.amount) || 1));
          if (current >= INVENTORY_ITEM_LIMIT || (current + incoming) > INVENTORY_ITEM_LIMIT) {
            const now = performance.now();
            drop.noPickupUntil = now + 320;
            if ((now - lastInventoryFullHintAt) > 900) {
              lastInventoryFullHintAt = now;
              postLocalSystemChat("Inventory full for " + getDropLabel(drop) + " (max " + INVENTORY_ITEM_LIMIT + ").");
            }
            return;
          }
        } else if (drop.type === "cosmetic") {
          const current = Math.max(0, Math.floor(Number(cosmeticInventory[drop.cosmeticId]) || 0));
          const incoming = Math.max(1, Math.floor(Number(drop.amount) || 1));
          if (current >= INVENTORY_ITEM_LIMIT || (current + incoming) > INVENTORY_ITEM_LIMIT) {
            const now = performance.now();
            drop.noPickupUntil = now + 320;
            if ((now - lastInventoryFullHintAt) > 900) {
              lastInventoryFullHintAt = now;
              postLocalSystemChat("Inventory full for " + getDropLabel(drop) + " (max " + INVENTORY_ITEM_LIMIT + ").");
            }
            return;
          }
        }

        const pickupTargetWorld = {
          x: cameraX + Math.max(24, getCameraViewWidth() - 18),
          y: cameraY + Math.max(22, Math.min(getCameraViewHeight() - 22, 56))
        };

        const applyPickup = () => {
          if (particleController && typeof particleController.emitPickup === "function") {
            particleController.emitPickup(
              drop.x + TILE * 0.5,
              drop.y + TILE * 0.5,
              pickupTargetWorld.x,
              pickupTargetWorld.y,
              drop.amount,
              drop.type
            );
          }
          if (drop.type === "cosmetic") {
            cosmeticInventory[drop.cosmeticId] = clampInventoryCount((cosmeticInventory[drop.cosmeticId] || 0) + drop.amount);
          } else if (drop.type === "block") {
            inventory[drop.blockId] = clampInventoryCount((inventory[drop.blockId] || 0) + drop.amount);
          }
          if (drop.type !== "tool") {
            schedulePickupInventoryFlush();
          }
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

      function getWorldLockOwnerAccountId(worldId) {
        const id = normalizeWorldId(worldId);
        if (!id) return "";
        const meta = worldIndexMetaById && worldIndexMetaById[id];
        const byIndex = (meta && meta.lockOwnerAccountId ? String(meta.lockOwnerAccountId) : "").trim();
        if (byIndex) return byIndex;
        const byCache = (worldLockOwnerCache.get(id) || "").toString().trim();
        return byCache;
      }

      function refreshOwnedWorldCacheByScan(worldIds) {
        if (inWorld || !network.enabled || !network.db || !playerProfileId) return;
        if (ownedWorldScanInFlight) return;
        const ids = Array.isArray(worldIds) ? worldIds.filter(Boolean) : [];
        if (!ids.length) return;
        const missing = ids.filter((id) => !getWorldLockOwnerAccountId(id));
        if (!missing.length) return;
        ownedWorldScanInFlight = true;
        const scanToken = ++ownedWorldScanToken;
        const batch = missing.slice(0, 120);
        Promise.all(batch.map((wid) => {
          return network.db.ref(BASE_PATH + "/worlds/" + wid + "/lock/ownerAccountId").once("value")
            .then((snap) => {
              const ownerId = snap && snap.val ? String(snap.val() || "").trim() : "";
              worldLockOwnerCache.set(wid, ownerId);
            })
            .catch(() => {
              worldLockOwnerCache.set(wid, "");
            });
        })).finally(() => {
          if (scanToken === ownedWorldScanToken) {
            ownedWorldScanInFlight = false;
            if (!inWorld && !hasRenderedMenuWorldList) {
              refreshWorldButtons(null, true);
            }
          }
        });
      }

      function refreshWorldButtons(worldIds, force) {
        if (Array.isArray(worldIds)) {
          knownWorldIds = Array.from(new Set(worldIds.filter(Boolean)));
        }
        if (!inWorld && hasRenderedMenuWorldList && !force && !Array.isArray(worldIds)) {
          return;
        }
        const occupancyWorlds = Array.from(worldOccupancy.keys());
        const unique = Array.from(new Set(knownWorldIds.concat(occupancyWorlds)));
        const ownedWorlds = unique
          .filter((id) => {
            const ownerId = getWorldLockOwnerAccountId(id);
            return ownerId && playerProfileId && ownerId === playerProfileId;
          })
          .sort((a, b) => {
            const ao = worldOccupancy.get(a) || 0;
            const bo = worldOccupancy.get(b) || 0;
            if (bo !== ao) return bo - ao;
            return a.localeCompare(b);
          });
        const othersPool = unique.filter((id) => !ownedWorlds.includes(id));
        const randomWorlds = pickRandomWorlds(othersPool, 8);

        worldButtonsEl.innerHTML = "";
        const renderWorldGroup = (title, ids, owned) => {
          if (!ids.length) return;
          const header = document.createElement("div");
          header.className = "world-group-title" + (owned ? " owned" : "");
          header.textContent = title;
          worldButtonsEl.appendChild(header);
          for (const id of ids) {
            const count = worldOccupancy.get(id) || 0;
            const button = document.createElement("button");
            button.type = "button";
            button.className = "world-chip" + (owned ? " owned" : "");
            button.textContent = count > 0 ? id + " [" + count + "]" : id;
            button.addEventListener("click", () => {
              switchWorld(id, true);
            });
            worldButtonsEl.appendChild(button);
          }
        };
        renderWorldGroup("Your Worlds", ownedWorlds, true);
        renderWorldGroup("Other Worlds", randomWorlds, false);
        refreshOwnedWorldCacheByScan(unique);
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
        if (network.hitsRef && network.handlers.hitAdded) {
          network.hitsRef.off("child_added", network.handlers.hitAdded);
        }
        if (network.hitsRef && network.handlers.hitChanged) {
          network.hitsRef.off("child_changed", network.handlers.hitChanged);
        }
        if (network.hitsRef && network.handlers.hitRemoved) {
          network.hitsRef.off("child_removed", network.handlers.hitRemoved);
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
        if (network.gambleRef && network.handlers.gambleAdded) {
          network.gambleRef.off("child_added", network.handlers.gambleAdded);
        }
        if (network.gambleRef && network.handlers.gambleChanged) {
          network.gambleRef.off("child_changed", network.handlers.gambleChanged);
        }
        if (network.gambleRef && network.handlers.gambleRemoved) {
          network.gambleRef.off("child_removed", network.handlers.gambleRemoved);
        }
        if (network.donationRef && network.handlers.donationAdded) {
          network.donationRef.off("child_added", network.handlers.donationAdded);
        }
        if (network.donationRef && network.handlers.donationChanged) {
          network.donationRef.off("child_changed", network.handlers.donationChanged);
        }
        if (network.donationRef && network.handlers.donationRemoved) {
          network.donationRef.off("child_removed", network.handlers.donationRemoved);
        }
        if (network.chestsRef && network.handlers.chestAdded) {
          network.chestsRef.off("child_added", network.handlers.chestAdded);
        }
        if (network.chestsRef && network.handlers.chestChanged) {
          network.chestsRef.off("child_changed", network.handlers.chestChanged);
        }
        if (network.chestsRef && network.handlers.chestRemoved) {
          network.chestsRef.off("child_removed", network.handlers.chestRemoved);
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
        if (network.displaysRef && network.handlers.displayAdded) {
          network.displaysRef.off("child_added", network.handlers.displayAdded);
        }
        if (network.displaysRef && network.handlers.displayChanged) {
          network.displaysRef.off("child_changed", network.handlers.displayChanged);
        }
        if (network.displaysRef && network.handlers.displayRemoved) {
          network.displaysRef.off("child_removed", network.handlers.displayRemoved);
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
        if (network.plantsRef && network.handlers.plantAdded) {
          network.plantsRef.off("child_added", network.handlers.plantAdded);
        }
        if (network.plantsRef && network.handlers.plantChanged) {
          network.plantsRef.off("child_changed", network.handlers.plantChanged);
        }
        if (network.plantsRef && network.handlers.plantRemoved) {
          network.plantsRef.off("child_removed", network.handlers.plantRemoved);
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
          syncWorldsModule.detachWorldListeners(network, network.handlers, false);
        }
        if (blockSyncer && typeof blockSyncer.reset === "function") {
          blockSyncer.reset();
        }

        network.playerRef = null;
        network.playersRef = null;
        network.blocksRef = null;
        network.hitsRef = null;
        network.dropsRef = null;
        network.dropFeedRef = null;
        network.vendingRef = null;
        network.gambleRef = null;
        network.donationRef = null;
        network.chestsRef = null;
        network.signsRef = null;
        network.displaysRef = null;
        network.doorsRef = null;
        network.antiGravRef = null;
        network.plantsRef = null;
        network.weatherRef = null;
        network.camerasRef = null;
        network.cameraLogsRef = null;
        network.cameraLogsFeedRef = null;
        network.spawnMetaRef = null;
        network.lockRef = null;
        network.chatRef = null;
        network.chatFeedRef = null;
        network.handlers.players = null;
        network.handlers.playerAdded = null;
        network.handlers.playerChanged = null;
        network.handlers.playerRemoved = null;
        network.handlers.blockAdded = null;
        network.handlers.blockChanged = null;
        network.handlers.blockRemoved = null;
        network.handlers.hitAdded = null;
        network.handlers.hitChanged = null;
        network.handlers.hitRemoved = null;
        network.handlers.dropAdded = null;
        network.handlers.dropChanged = null;
        network.handlers.dropRemoved = null;
        network.handlers.vendingAdded = null;
        network.handlers.vendingChanged = null;
        network.handlers.vendingRemoved = null;
        network.handlers.gambleAdded = null;
        network.handlers.gambleChanged = null;
        network.handlers.gambleRemoved = null;
        network.handlers.donationAdded = null;
        network.handlers.donationChanged = null;
        network.handlers.donationRemoved = null;
        network.handlers.chestAdded = null;
        network.handlers.chestChanged = null;
        network.handlers.chestRemoved = null;
        network.handlers.signAdded = null;
        network.handlers.signChanged = null;
        network.handlers.signRemoved = null;
        network.handlers.displayAdded = null;
        network.handlers.displayChanged = null;
        network.handlers.displayRemoved = null;
        network.handlers.doorAdded = null;
        network.handlers.doorChanged = null;
        network.handlers.doorRemoved = null;
        network.handlers.antiGravAdded = null;
        network.handlers.antiGravChanged = null;
        network.handlers.antiGravRemoved = null;
        network.handlers.plantAdded = null;
        network.handlers.plantChanged = null;
        network.handlers.plantRemoved = null;
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
        const gambleCtrl = getGambleController();
        if (gambleCtrl && typeof gambleCtrl.clearAll === "function") gambleCtrl.clearAll();
        const donationCtrl = getDonationController();
        if (donationCtrl && typeof donationCtrl.clearAll === "function") donationCtrl.clearAll();
        const chestCtrl = getChestController();
        if (chestCtrl && typeof chestCtrl.clearAll === "function") chestCtrl.clearAll();
        const signCtrl = getSignController();
        if (signCtrl && typeof signCtrl.clearAll === "function") signCtrl.clearAll();
        displayItemsByTile.clear();
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
        closeGambleModal();
        closeDonationModal();
        closeChestModal();
        closeTradeMenuModal();
        closeTradeRequestModal();
        closeFriendModals();
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
        resetEditReachTiles();
        setInWorldState(false);
        if (antiCheatController && typeof antiCheatController.onWorldSwitch === "function") {
          antiCheatController.onWorldSwitch("menu");
        }
        if (network.enabled && network.globalPlayerRef) {
          syncPlayer(true);
        }
        refreshWorldButtons();
      }

      function respawnPlayerAtDoor() {
        if (!inWorld) return;
        const safe = findSafeDoorSpawnPosition();
        player.x = clampTeleport(safe.x, 0, WORLD_W * TILE - PLAYER_W - 2);
        player.y = clampTeleport(safe.y, 0, WORLD_H * TILE - PLAYER_H - 2);
        player.vx = 0;
        player.vy = 0;
        player.grounded = false;
        airJumpsUsed = 0;
        suppressSpawnSafetyUntilMs = performance.now() + 350;
        if (network.enabled) {
          syncPlayer(true);
        }
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

      function syncWorldIndexLockOwner(worldId, lockData) {
        if (!network.worldsIndexRef || !worldId) return;
        const lock = lockData && typeof lockData === "object" ? lockData : null;
        const ownerAccountId = lock && lock.ownerAccountId ? String(lock.ownerAccountId).trim() : "";
        const ownerName = lock && lock.ownerName ? String(lock.ownerName).slice(0, 20) : "";
        const indexRef = network.worldsIndexRef.child(worldId);
        if (ownerAccountId) {
          worldLockOwnerCache.set(worldId, ownerAccountId);
          indexRef.update({
            lockOwnerAccountId: ownerAccountId,
            lockOwnerName: ownerName || "",
            updatedAt: firebase.database.ServerValue.TIMESTAMP
          }).catch(() => {});
          return;
        }
        worldLockOwnerCache.set(worldId, "");
        indexRef.child("lockOwnerAccountId").remove().catch(() => {});
        indexRef.child("lockOwnerName").remove().catch(() => {});
      }

      function switchWorld(nextWorldId, createIfMissing, skipWorldBanCheck) {
        const worldId = normalizeWorldId(nextWorldId);
        if (!worldId) return;
        const requestToken = skipWorldBanCheck ? worldJoinRequestToken : (++worldJoinRequestToken);
        if (network.enabled && !skipWorldBanCheck && playerProfileId) {
          const lockRef = network.db.ref(BASE_PATH + "/worlds/" + worldId + "/lock");
          lockRef.once("value").then((snapshot) => {
            if (requestToken !== worldJoinRequestToken) return;
            const lock = normalizeWorldLock(snapshot && snapshot.val ? snapshot.val() : null);
            if (!ensureNotWorldBanned(lock, worldId)) return;
            switchWorld(worldId, createIfMissing, true);
          }).catch(() => {
            if (requestToken !== worldJoinRequestToken) return;
            switchWorld(worldId, createIfMissing, true);
          });
          return;
        }
        const wasInWorld = inWorld;
        const previousWorldId = currentWorldId;
        if (antiCheatController && typeof antiCheatController.onWorldSwitch === "function") {
          antiCheatController.onWorldSwitch(worldId);
        }

        if (!network.enabled) {
          setInWorldState(true);
          currentWorldId = worldId;
          resetSpawnStructureTile();
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
          applyQuestEvent("visit_world", { worldId });
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
        resetSpawnStructureTile();
        setCurrentWorldUI();
        resetForWorldChange();
        writeWorldIndexMeta(worldId, createIfMissing);
        worldChatStartedAt = Date.now();

        const worldRefs = typeof syncWorldsModule.createWorldRefs === "function"
          ? syncWorldsModule.createWorldRefs(network.db, BASE_PATH, worldId)
          : null;
        network.playersRef = worldRefs && worldRefs.playersRef ? worldRefs.playersRef : network.db.ref(BASE_PATH + "/worlds/" + worldId + "/players");
        network.blocksRef = worldRefs && worldRefs.blocksRef ? worldRefs.blocksRef : network.db.ref(BASE_PATH + "/worlds/" + worldId + "/blocks");
        network.hitsRef = typeof syncHitsModule.createWorldHitsRef === "function"
          ? syncHitsModule.createWorldHitsRef(network.db, BASE_PATH, worldId)
          : network.db.ref(BASE_PATH + "/worlds/" + worldId + "/hits");
        network.dropsRef = network.db.ref(BASE_PATH + "/worlds/" + worldId + "/drops");
        network.dropFeedRef = network.dropsRef.limitToLast(DROP_MAX_PER_WORLD);
        network.vendingRef = network.db.ref(BASE_PATH + "/worlds/" + worldId + "/vending");
        network.gambleRef = network.db.ref(BASE_PATH + "/worlds/" + worldId + "/gamble-machines");
        network.donationRef = network.db.ref(BASE_PATH + "/worlds/" + worldId + "/donation-boxes");
        network.chestsRef = network.db.ref(BASE_PATH + "/worlds/" + worldId + "/chests");
        network.signsRef = network.db.ref(BASE_PATH + "/worlds/" + worldId + "/signs");
        network.displaysRef = network.db.ref(BASE_PATH + "/worlds/" + worldId + "/displays");
        network.doorsRef = network.db.ref(BASE_PATH + "/worlds/" + worldId + "/doors");
        network.antiGravRef = network.db.ref(BASE_PATH + "/worlds/" + worldId + "/anti-gravity");
        network.plantsRef = network.db.ref(BASE_PATH + "/worlds/" + worldId + "/plants");
        network.weatherRef = network.db.ref(BASE_PATH + "/worlds/" + worldId + "/weather");
        network.camerasRef = network.db.ref(BASE_PATH + "/worlds/" + worldId + "/cameras");
        network.cameraLogsRef = network.db.ref(BASE_PATH + "/worlds/" + worldId + "/camera-logs");
        network.cameraLogsFeedRef = network.cameraLogsRef.limitToLast(500);
        network.spawnMetaRef = network.db.ref(BASE_PATH + "/worlds/" + worldId + "/meta/spawn");
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
          syncWorldIndexLockOwner(currentWorldId, currentWorldLock);
          if (!isWorldLockOwner() && !ensureNotWorldBanned(currentWorldLock, currentWorldId)) {
            leaveCurrentWorld();
            return;
          }
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
          clearTileDamage(tx, ty);
          const requiredId = getProtectedTileRequiredId(tx, ty);
          if (requiredId) {
            world[ty][tx] = requiredId;
            if (id !== requiredId && network.blocksRef) {
              network.blocksRef.child(tx + "_" + ty).set(requiredId).catch(() => {});
            }
            setLocalVendingMachine(tx, ty, null);
            setLocalGambleMachine(tx, ty, null);
            setLocalDonationBox(tx, ty, null);
            {
              const chestCtrl = getChestController();
              if (chestCtrl && typeof chestCtrl.setLocal === "function") {
                chestCtrl.setLocal(tx, ty, null);
              }
            }
            setLocalSignText(tx, ty, null);
            setLocalDisplayItem(tx, ty, null);
            setLocalDoorAccess(tx, ty, null);
            setLocalAntiGravityState(tx, ty, null);
            setLocalCameraConfig(tx, ty, null);
            return;
          }
          world[ty][tx] = id;
          if (id === SPAWN_DOOR_ID) {
            setSpawnStructureTile(tx, ty);
          }
          if (id !== VENDING_ID) {
            setLocalVendingMachine(tx, ty, null);
          }
          if (id !== GAMBLE_ID) {
            setLocalGambleMachine(tx, ty, null);
          }
          if (!isDonationBoxBlockId(id)) {
            setLocalDonationBox(tx, ty, null);
          }
          if (!isChestBlockId(id)) {
            const chestCtrl = getChestController();
            if (chestCtrl && typeof chestCtrl.setLocal === "function") {
              chestCtrl.setLocal(tx, ty, null);
            }
          }
          if (id !== SIGN_ID) {
            setLocalSignText(tx, ty, null);
          }
          if (id !== DISPLAY_BLOCK_ID) {
            setLocalDisplayItem(tx, ty, null);
          }
          if (id !== DOOR_BLOCK_ID) {
            setLocalDoorAccess(tx, ty, null);
          }
          if (id !== ANTI_GRAV_ID) {
            setLocalAntiGravityState(tx, ty, null);
          }
          if (!isPlantSeedBlockId(id)) {
            setLocalTreePlant(tx, ty, null);
          }
          if (id !== CAMERA_ID) {
            setLocalCameraConfig(tx, ty, null);
          }
        };
        const clearBlockValue = (tx, ty) => {
          clearTileDamage(tx, ty);
          const requiredId = getProtectedTileRequiredId(tx, ty);
          if (requiredId) {
            world[ty][tx] = requiredId;
            if (network.blocksRef) {
              network.blocksRef.child(tx + "_" + ty).set(requiredId).catch(() => {});
            }
            setLocalVendingMachine(tx, ty, null);
            setLocalGambleMachine(tx, ty, null);
            setLocalDonationBox(tx, ty, null);
            {
              const chestCtrl = getChestController();
              if (chestCtrl && typeof chestCtrl.setLocal === "function") {
                chestCtrl.setLocal(tx, ty, null);
              }
            }
            setLocalSignText(tx, ty, null);
            setLocalDisplayItem(tx, ty, null);
            setLocalDoorAccess(tx, ty, null);
            setLocalAntiGravityState(tx, ty, null);
            setLocalCameraConfig(tx, ty, null);
            return;
          }
          world[ty][tx] = 0;
          setLocalVendingMachine(tx, ty, null);
          setLocalGambleMachine(tx, ty, null);
          setLocalDonationBox(tx, ty, null);
          {
            const chestCtrl = getChestController();
            if (chestCtrl && typeof chestCtrl.setLocal === "function") {
              chestCtrl.setLocal(tx, ty, null);
            }
          }
          setLocalSignText(tx, ty, null);
          setLocalDisplayItem(tx, ty, null);
          setLocalDoorAccess(tx, ty, null);
          setLocalAntiGravityState(tx, ty, null);
          setLocalTreePlant(tx, ty, null);
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
            addChatMessage,
            onPlayerHit: (sourcePlayerId, rawHit) => {
              if (typeof syncHitsModule.consumeRemoteHit === "function") {
                syncHitsModule.consumeRemoteHit(remoteHitTracker, sourcePlayerId, rawHit, (tx, ty, hits) => {
                  if (hits <= 0) {
                    clearTileDamage(tx, ty);
                  } else {
                    setTileDamage(tx, ty, hits);
                  }
                });
                return;
              }
              if (!rawHit || typeof rawHit !== "object") return;
              const tx = Math.floor(Number(rawHit.tx));
              const ty = Math.floor(Number(rawHit.ty));
              const hits = Math.max(0, Math.floor(Number(rawHit.hits) || 0));
              if (!Number.isInteger(tx) || !Number.isInteger(ty)) return;
              if (hits <= 0) {
                clearTileDamage(tx, ty);
              } else {
                setTileDamage(tx, ty, hits);
              }
            }
          })
          : null;
        if (!handlers) {
          setNetworkState("Sync module missing", true);
          return;
        }
        network.handlers.players = handlers.players;
        network.handlers.playerAdded = handlers.playerAdded;
        network.handlers.playerChanged = handlers.playerChanged;
        network.handlers.playerRemoved = handlers.playerRemoved;
        network.handlers.blockAdded = handlers.blockAdded;
        network.handlers.blockChanged = handlers.blockChanged;
        network.handlers.blockRemoved = handlers.blockRemoved;
        network.handlers.hitAdded = (snapshot) => {
          const tile = parseTileKey(snapshot.key || "");
          if (!tile) return;
          const raw = snapshot.val();
          const normalized = typeof syncHitsModule.normalizeHitRecord === "function"
            ? syncHitsModule.normalizeHitRecord(raw)
            : (raw && typeof raw === "object" ? {
              hits: Math.max(0, Math.floor(Number(raw.hits) || 0)),
              updatedAt: Number(raw.updatedAt) || 0
            } : null);
          if (!normalized || !normalized.hits) {
            clearTileDamage(tile.tx, tile.ty);
            return;
          }
          setTileDamage(tile.tx, tile.ty, normalized.hits);
        };
        network.handlers.hitChanged = network.handlers.hitAdded;
        network.handlers.hitRemoved = (snapshot) => {
          const tile = parseTileKey(snapshot.key || "");
          if (!tile) return;
          clearTileDamage(tile.tx, tile.ty);
        };
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
        network.handlers.gambleAdded = (snapshot) => {
          const tile = parseTileKey(snapshot.key || "");
          if (!tile) return;
          setLocalGambleMachine(tile.tx, tile.ty, snapshot.val());
        };
        network.handlers.gambleChanged = network.handlers.gambleAdded;
        network.handlers.gambleRemoved = (snapshot) => {
          const tile = parseTileKey(snapshot.key || "");
          if (!tile) return;
          setLocalGambleMachine(tile.tx, tile.ty, null);
        };
        network.handlers.donationAdded = (snapshot) => {
          const tile = parseTileKey(snapshot.key || "");
          if (!tile) return;
          setLocalDonationBox(tile.tx, tile.ty, snapshot.val());
        };
        network.handlers.donationChanged = network.handlers.donationAdded;
        network.handlers.donationRemoved = (snapshot) => {
          const tile = parseTileKey(snapshot.key || "");
          if (!tile) return;
          setLocalDonationBox(tile.tx, tile.ty, null);
        };
        network.handlers.chestAdded = (snapshot) => {
          const tile = parseTileKey(snapshot.key || "");
          if (!tile) return;
          const chestCtrl = getChestController();
          if (chestCtrl && typeof chestCtrl.setLocal === "function") {
            chestCtrl.setLocal(tile.tx, tile.ty, snapshot.val());
          }
        };
        network.handlers.chestChanged = network.handlers.chestAdded;
        network.handlers.chestRemoved = (snapshot) => {
          const tile = parseTileKey(snapshot.key || "");
          if (!tile) return;
          const chestCtrl = getChestController();
          if (chestCtrl && typeof chestCtrl.setLocal === "function") {
            chestCtrl.setLocal(tile.tx, tile.ty, null);
          }
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
        network.handlers.displayAdded = (snapshot) => {
          const tile = parseTileKey(snapshot.key || "");
          if (!tile) return;
          setLocalDisplayItem(tile.tx, tile.ty, snapshot.val());
        };
        network.handlers.displayChanged = network.handlers.displayAdded;
        network.handlers.displayRemoved = (snapshot) => {
          const tile = parseTileKey(snapshot.key || "");
          if (!tile) return;
          setLocalDisplayItem(tile.tx, tile.ty, null);
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
        network.handlers.plantAdded = (snapshot) => {
          const tile = parseTileKey(snapshot.key || "");
          if (!tile) return;
          setLocalTreePlant(tile.tx, tile.ty, snapshot.val());
        };
        network.handlers.plantChanged = network.handlers.plantAdded;
        network.handlers.plantRemoved = (snapshot) => {
          const tile = parseTileKey(snapshot.key || "");
          if (!tile) return;
          setLocalTreePlant(tile.tx, tile.ty, null);
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
        if (network.gambleRef && network.handlers.gambleAdded) {
          network.gambleRef.on("child_added", network.handlers.gambleAdded);
          network.gambleRef.on("child_changed", network.handlers.gambleChanged);
          network.gambleRef.on("child_removed", network.handlers.gambleRemoved);
        }
        if (network.donationRef && network.handlers.donationAdded) {
          network.donationRef.on("child_added", network.handlers.donationAdded);
          network.donationRef.on("child_changed", network.handlers.donationChanged);
          network.donationRef.on("child_removed", network.handlers.donationRemoved);
        }
        if (network.chestsRef && network.handlers.chestAdded) {
          network.chestsRef.on("child_added", network.handlers.chestAdded);
          network.chestsRef.on("child_changed", network.handlers.chestChanged);
          network.chestsRef.on("child_removed", network.handlers.chestRemoved);
        }
        if (network.dropFeedRef && network.handlers.dropAdded) {
          network.dropFeedRef.on("child_added", network.handlers.dropAdded);
          network.dropsRef.on("child_changed", network.handlers.dropChanged);
          network.dropsRef.on("child_removed", network.handlers.dropRemoved);
        }
        if (network.hitsRef && network.handlers.hitAdded) {
          network.hitsRef.on("child_added", network.handlers.hitAdded);
          network.hitsRef.on("child_changed", network.handlers.hitChanged);
          network.hitsRef.on("child_removed", network.handlers.hitRemoved);
        }
        if (network.signsRef && network.handlers.signAdded) {
          network.signsRef.on("child_added", network.handlers.signAdded);
          network.signsRef.on("child_changed", network.handlers.signChanged);
          network.signsRef.on("child_removed", network.handlers.signRemoved);
        }
        if (network.displaysRef && network.handlers.displayAdded) {
          network.displaysRef.on("child_added", network.handlers.displayAdded);
          network.displaysRef.on("child_changed", network.handlers.displayChanged);
          network.displaysRef.on("child_removed", network.handlers.displayRemoved);
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
        if (network.plantsRef && network.handlers.plantAdded) {
          network.plantsRef.on("child_added", network.handlers.plantAdded);
          network.plantsRef.on("child_changed", network.handlers.plantChanged);
          network.plantsRef.on("child_removed", network.handlers.plantRemoved);
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
        if (network.blocksRef && typeof network.blocksRef.once === "function") {
          const blocksPromise = network.blocksRef.once("value");
          const metaPromise = network.spawnMetaRef && typeof network.spawnMetaRef.once === "function"
            ? network.spawnMetaRef.once("value").catch(() => null)
            : Promise.resolve(null);
          Promise.all([blocksPromise, metaPromise]).then(([blocksSnap, metaSnap]) => {
            if (!inWorld || currentWorldId !== worldId) return;
            const blockMap = blocksSnap && blocksSnap.val ? (blocksSnap.val() || {}) : {};
            const meta = metaSnap && metaSnap.val ? (metaSnap.val() || {}) : {};
            const metaTx = Math.floor(Number(meta.tx));
            const metaTy = Math.floor(Number(meta.ty));
            const hasMetaSpawn = Number.isInteger(metaTx) && Number.isInteger(metaTy)
              && metaTx >= 0 && metaTy >= 0 && metaTx < WORLD_W && metaTy < WORLD_H - 1;
            if (hasMetaSpawn) {
              setSpawnStructureTile(metaTx, metaTy);
            } else {
              const found = applySpawnStructureFromBlockMap(blockMap);
              if (!found) {
                refreshSpawnStructureFromWorld();
              }
            }
            cleanupSpawnStructureInWorldData();
            const tiles = getSpawnStructureTiles();
            const updates = buildSpawnStructureCleanupUpdates(blockMap, tiles.door.tx, tiles.door.ty);
            network.blocksRef.update(updates).catch(() => {});
            if (network.spawnMetaRef) {
              network.spawnMetaRef.set({
                tx: tiles.door.tx,
                ty: tiles.door.ty,
                updatedAt: firebase.database.ServerValue.TIMESTAMP
              }).catch(() => {});
            }
            ensurePlayerSafeSpawn(true);
          }).catch(() => {
            if (!inWorld || currentWorldId !== worldId) return;
            refreshSpawnStructureFromWorld();
            cleanupSpawnStructureInWorldData();
            enforceSpawnStructureInDatabase();
            ensurePlayerSafeSpawn(true);
          });
        } else {
          refreshSpawnStructureFromWorld();
          cleanupSpawnStructureInWorldData();
          enforceSpawnStructureInDatabase();
          ensurePlayerSafeSpawn(true);
        }
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
        applyQuestEvent("visit_world", { worldId });

        if (network.connected) {
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
        if (!network.enabled || !currentWorldId) return;
        syncTileDamageToNetwork(tx, ty, 0);
        sendAuthoritativePacket("PLACE_BLOCK", {
          worldId: currentWorldId,
          x: tx,
          y: ty,
          blockId: Math.max(0, Math.floor(Number(id) || 0))
        }).catch(() => {
          setNetworkState("Network error", true);
        });
      }

      function syncPlayer(force) {
        if (!network.enabled) return;
        if (!network.playerRef && !network.globalPlayerRef) return;

        const now = performance.now();
        let writePlayer = inWorld && Boolean(network.playerRef);
        let writeGlobal = Boolean(network.globalPlayerRef);

        // Figure out if we ACTUALLY need to sync before allocating memory
        if (playerSyncController && typeof playerSyncController.compute === "function") {
          const syncDecision = playerSyncController.compute({
            nowMs: now,
            force,
            x: Math.round(player.x),
            y: Math.round(player.y),
            facing: player.facing,
            world: inWorld ? currentWorldId : "menu"
          });
          writePlayer = Boolean(syncDecision.writePlayer);
          writeGlobal = Boolean(syncDecision.writeGlobal) && Boolean(network.globalPlayerRef);
        }

        // OPTIMIZATION: Early exit! Saves 60 heavy object allocations per second.
        if (!writePlayer && !writeGlobal) return;

        const rawPayload = {
          name: playerName,
          accountId: playerProfileId,
          x: Math.round(player.x),
          y: Math.round(player.y),
          facing: player.facing,
          cosmetics: {
            shirts: equippedCosmetics.shirts || "",
            pants: equippedCosmetics.pants || "",
            shoes: equippedCosmetics.shoes || "",
            hats: equippedCosmetics.hats || "",
            wings: equippedCosmetics.wings || "",
            swords: equippedCosmetics.swords || ""
          },
          title: getEquippedTitlePayload(),
          progression: buildProgressionPayload(),
          achievements: getAchievementsSummary(),
          danceUntil: Math.max(0, Math.floor(danceUntilMs)),
          world: inWorld ? currentWorldId : "menu",
          updatedAt: firebase.database.ServerValue.TIMESTAMP
        };
        
        const payload = typeof syncPlayerModule.buildPayload === "function"
          ? syncPlayerModule.buildPayload(rawPayload)
          : rawPayload;

        if (writePlayer || writeGlobal) {
          const movePacket = {
            worldId: inWorld ? currentWorldId : "menu",
            x: Math.round(player.x),
            y: Math.round(player.y),
            facing: player.facing,
            vx: Number(player.vx) || 0,
            vy: Number(player.vy) || 0,
            dtMs: Math.max(16, Math.floor(Number(FIXED_FRAME_MS) || 16)),
            profile: payload
          };
          queueMovePacket(movePacket);
        }
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
          if (isMobileUi) {
            setChatOpen(!isChatOpen);
          } else {
            setChatOpen(true);
          }
        });
        if (shopToggleBtn) {
          shopToggleBtn.addEventListener("click", () => {
            const ctrl = getShopController();
            if (!ctrl || typeof ctrl.openModal !== "function") return;
            ctrl.openModal();
          });
        }
        if (achievementsToggleBtn) {
          achievementsToggleBtn.addEventListener("click", () => {
            openAchievementsMenu();
          });
        }
        if (questsToggleBtn) {
          questsToggleBtn.addEventListener("click", () => {
            openQuestsMenu();
          });
        }
        if (titlesToggleBtn) {
          titlesToggleBtn.addEventListener("click", () => {
            openTitlesMenu();
          });
        }
        if (achievementsCloseBtn) {
          achievementsCloseBtn.addEventListener("click", () => {
            closeAchievementsMenu();
          });
        }
        if (questsCloseBtn) {
          questsCloseBtn.addEventListener("click", () => {
            closeQuestsMenu();
          });
        }
        if (titlesCloseBtn) {
          titlesCloseBtn.addEventListener("click", () => {
            closeTitlesMenu();
          });
        }
        if (achievementsModalEl) {
          achievementsModalEl.addEventListener("click", (event) => {
            if (event.target === achievementsModalEl) {
              closeAchievementsMenu();
            }
          });
        }
        if (achievementsActionsEl) {
          achievementsActionsEl.addEventListener("click", (event) => {
            const target = event.target;
            if (!(target instanceof HTMLElement)) return;
            if (String(target.dataset.achAct || "") === "close") {
              closeAchievementsMenu();
            }
          });
        }
        if (questsModalEl) {
          questsModalEl.addEventListener("click", (event) => {
            if (event.target === questsModalEl) {
              closeQuestsMenu();
            }
          });
        }
        if (titlesModalEl) {
          titlesModalEl.addEventListener("click", (event) => {
            if (event.target === titlesModalEl) {
              closeTitlesMenu();
            }
          });
        }
        if (questsActionsEl) {
          questsActionsEl.addEventListener("click", (event) => {
            const target = event.target;
            if (!(target instanceof HTMLElement)) return;
            if (String(target.dataset.questAct || "") === "close") {
              closeQuestsMenu();
            }
          });
        }
        if (titlesActionsEl) {
          titlesActionsEl.addEventListener("click", (event) => {
            const target = event.target;
            if (!(target instanceof HTMLElement)) return;
            if (String(target.dataset.titleAct || "") === "close") {
              closeTitlesMenu();
            }
          });
        }
        if (titlesBodyEl) {
          titlesBodyEl.addEventListener("click", (event) => {
            const target = event.target;
            if (!(target instanceof HTMLElement)) return;
            const titleId = String(target.dataset.titleEquip || "").trim();
            if (!titleId) return;
            equipTitle(titleId);
            renderTitlesMenu();
          });
        }
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
        const donationCtrl = getDonationController();
        if (donationCtrl && typeof donationCtrl.bindModalEvents === "function") {
          donationCtrl.bindModalEvents();
        }
        const chestCtrl = getChestController();
        if (chestCtrl && typeof chestCtrl.bindModalEvents === "function") {
          chestCtrl.bindModalEvents();
        }
        const gambleCtrl = getGambleController();
        if (gambleCtrl && typeof gambleCtrl.bindModalEvents === "function") {
          gambleCtrl.bindModalEvents();
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
            const signCtrl = getSignController();
            if (!signCtrl || typeof signCtrl.getEditContext !== "function" || !signTextInputEl) return;
            const editCtx = signCtrl.getEditContext();
            if (!editCtx) return;
            const tx = Number(editCtx.tx);
            const ty = Number(editCtx.ty);
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
              return;
            }
            const unbanAccountId = (target.dataset.worldlockUnban || "").trim();
            if (unbanAccountId) {
              unbanWorldPlayer(unbanAccountId);
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
        if (worldLockBan1hBtn) {
          worldLockBan1hBtn.addEventListener("click", () => {
            if (!worldLockBanInputEl) return;
            setWorldBanByUsername(worldLockBanInputEl.value || "", 60 * 60 * 1000);
          });
        }
        if (worldLockBanPermBtn) {
          worldLockBanPermBtn.addEventListener("click", () => {
            if (!worldLockBanInputEl) return;
            setWorldBanByUsername(worldLockBanInputEl.value || "", 0);
          });
        }
        if (worldLockBanInputEl) {
          worldLockBanInputEl.addEventListener("keydown", (event) => {
            if (event.key !== "Enter") return;
            event.preventDefault();
            setWorldBanByUsername(worldLockBanInputEl.value || "", 60 * 60 * 1000);
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
        const friendCtrl = getFriendsController();
        if (friendCtrl && typeof friendCtrl.bindUiEvents === "function") {
          friendCtrl.bindUiEvents();
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
        if (adminBackupDownloadBtn) {
          adminBackupDownloadBtn.addEventListener("click", () => {
            downloadSelectedBackupJson();
          });
        }
        if (adminBackupUploadBtn) {
          adminBackupUploadBtn.addEventListener("click", () => {
            if (!hasAdminPermission("db_backup")) return;
            if (adminBackupUploadInput) {
              adminBackupUploadInput.click();
            }
          });
        }
        if (adminBackupUploadInput) {
          adminBackupUploadInput.addEventListener("change", () => {
            const files = adminBackupUploadInput.files;
            const file = files && files[0] ? files[0] : null;
            if (!file) return;
            importBackupJsonFile(file);
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
        adminAccountsEl.addEventListener("input", handleAdminInputChange);
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
        respawnBtn.addEventListener("click", () => {
          respawnPlayerAtDoor();
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
          refreshWorldButtons(null, true);
          totalOnlinePlayers = inWorld ? 1 : 0;
          updateOnlineCount();
          return;
        }

        try {
          hasSeenInitialTeleportCommandSnapshot = false;
          network.db = await getAuthDb();
          network.enabled = true;
          hasSeenAdminRoleSnapshot = false;
          network.connectedRef = network.db.ref(".info/connected");
          network.worldsIndexRef = network.db.ref(BASE_PATH + "/worlds-index");
          network.globalPlayersRef = network.db.ref(BASE_PATH + "/global-players");
          network.globalPlayerRef = network.globalPlayersRef.child(playerId);
          network.mySessionRef = network.db.ref(BASE_PATH + "/account-sessions/" + playerProfileId);
          network.myCommandRef = network.db.ref(BASE_PATH + "/account-commands/" + playerProfileId + "/teleport");
          network.myReachRef = network.db.ref(BASE_PATH + "/account-commands/" + playerProfileId + "/reach");
          network.myFreezeRef = network.db.ref(BASE_PATH + "/account-commands/" + playerProfileId + "/freeze");
          network.myGodModeRef = network.db.ref(BASE_PATH + "/account-commands/" + playerProfileId + "/godmode");
          network.myPrivateAnnouncementRef = network.db.ref(BASE_PATH + "/account-commands/" + playerProfileId + "/announce");
          network.myPmRef = network.db.ref(BASE_PATH + "/account-commands/" + playerProfileId + "/pm");
          network.myPmFeedRef = network.myPmRef.limitToLast(80);
          network.myTradeRequestRef = network.db.ref(BASE_PATH + "/account-commands/" + playerProfileId + "/tradeRequest");
          network.myTradeResponseRef = network.db.ref(BASE_PATH + "/account-commands/" + playerProfileId + "/tradeResponse");
          network.myActiveTradeRef = network.db.ref(BASE_PATH + "/active-trades/" + playerProfileId);
          network.myFriendsRef = network.db.ref(BASE_PATH + "/friends/" + playerProfileId);
          network.myFriendRequestsRef = network.db.ref(BASE_PATH + "/friend-requests/" + playerProfileId);
          network.inventoryRef = network.db.ref(BASE_PATH + "/player-inventories/" + playerProfileId);
          network.progressRef = network.db.ref(BASE_PATH + "/player-progress/" + playerProfileId);
          network.achievementsRef = network.db.ref(BASE_PATH + "/player-achievements/" + playerProfileId);
          network.questsRef = network.db.ref(BASE_PATH + "/player-quests/" + playerProfileId);
          network.accountLogsRootRef = network.db.ref(BASE_PATH + "/account-logs");
          network.antiCheatLogsRef = network.db.ref(BASE_PATH + "/anti-cheat-logs").limitToLast(320);
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

          network.handlers.progression = (snapshot) => {
            if (snapshot.exists()) {
              applyProgressionFromRecord(snapshot.val() || {}, false);
              saveProgressionToLocal();
            } else {
              scheduleProgressionSave(true);
            }
            if (inWorld) {
              syncPlayer(true);
            }
          };

          network.handlers.achievements = (snapshot) => {
            if (snapshot.exists()) {
              achievementsState = normalizeAchievementsState(snapshot.val() || {});
              saveAchievementsToLocal();
            } else {
              achievementsState = normalizeAchievementsState({});
              scheduleAchievementsSave(true);
            }
            const open = achievementsModalEl && !achievementsModalEl.classList.contains("hidden");
            if (open) renderAchievementsMenu();
            if (inWorld) {
              syncPlayer(true);
            }
          };

          network.handlers.quests = (snapshot) => {
            if (snapshot.exists()) {
              questsState = normalizeQuestsState(snapshot.val() || {});
              saveQuestsToLocal();
            } else {
              questsState = normalizeQuestsState({});
              scheduleQuestsSave(true);
            }
          };

          network.handlers.connected = (snapshot) => {
            const isConnected = snapshot.val() === true;
            network.connected = isConnected;

            if (isConnected) {
              syncPlayer(true);
              setNetworkState("Online", false);
            } else {
              setNetworkState("Reconnecting...", true);
            }
          };
          network.handlers.mySession = (snapshot) => {
            const value = snapshot.val();
            const sessionIdValue = String(value && value.sessionId || "").trim();
            if (!sessionIdValue) {
              const now = Date.now();
              if (!hasSeenInitialSessionSnapshot) {
                hasSeenInitialSessionSnapshot = true;
                missingSessionSinceMs = now;
                return;
              }
              if (!missingSessionSinceMs) missingSessionSinceMs = now;
              if ((now - missingSessionSinceMs) < 8000) {
                return;
              }
              forceLogout("You were kicked or your session expired.");
              return;
            }
            hasSeenInitialSessionSnapshot = true;
            missingSessionSinceMs = 0;
            if (playerSessionId && sessionIdValue !== playerSessionId) {
              forceLogout("This account is active in another client.");
            }
          };
          network.handlers.myCommand = (snapshot) => {
            const value = snapshot.val();
            if (!value || !value.id) {
              if (!hasSeenInitialTeleportCommandSnapshot) {
                hasSeenInitialTeleportCommandSnapshot = true;
              }
              return;
            }
            const commandId = String(value.id || "");
            const issuedAt = Number(value.issuedAt || value.createdAt) || 0;
            if (!hasSeenInitialTeleportCommandSnapshot) {
              hasSeenInitialTeleportCommandSnapshot = true;
              if (!issuedAt || (playerSessionStartedAt > 0 && issuedAt <= playerSessionStartedAt)) {
                lastHandledTeleportCommandId = commandId;
                return;
              }
            }
            if (commandId === lastHandledTeleportCommandId) return;
            if (issuedAt > 0 && playerSessionStartedAt > 0 && issuedAt <= playerSessionStartedAt) {
              lastHandledTeleportCommandId = commandId;
              return;
            }
            lastHandledTeleportCommandId = commandId;
            applySelfTeleport(value.world, value.x, value.y);
          };
          network.handlers.myReach = (snapshot) => {
            const value = snapshot.val();
            if (!value || !value.id) return;
            if (value.id === lastHandledReachCommandId) return;
            lastHandledReachCommandId = value.id;
            const nextReach = normalizeEditReachTiles(value.reachTiles);
            setEditReachTiles(nextReach);
            const by = (value.by || "admin").toString().slice(0, 20);
            postLocalSystemChat("Reach set to " + nextReach.toFixed(1) + " tiles by @" + by + ". Resets when you exit world.");
          };
          network.handlers.myFreeze = (snapshot) => {
            const value = snapshot.val();
            if (!value || !value.id) return;
            if (value.id === lastHandledFreezeCommandId) return;
            lastHandledFreezeCommandId = value.id;
            const frozen = Boolean(value.frozen);
            const byName = (value.by || "admin").toString().slice(0, 20);
            setFrozenState(frozen, byName);
          };
          network.handlers.myGodMode = (snapshot) => {
            const value = snapshot.val();
            if (!value || !value.id) return;
            if (value.id === lastHandledGodModeCommandId) return;
            lastHandledGodModeCommandId = value.id;
            const enabled = Boolean(value.enabled);
            const byName = (value.by || "admin").toString().slice(0, 20);
            setGodModeState(enabled, byName);
          };
          network.handlers.myPrivateAnnouncement = (snapshot) => {
            const value = snapshot.val() || {};
            const eventId = (value.id || "").toString();
            const text = (value.text || "").toString().trim().slice(0, 180);
            if (!eventId || !text) return;
            const issuedAt = Number(value.issuedAt) || 0;
            if (issuedAt > 0 && playerSessionStartedAt > 0 && issuedAt <= playerSessionStartedAt) return;
            if (eventId === lastHandledPrivateAnnouncementId) return;
            lastHandledPrivateAnnouncementId = eventId;
            const actor = (value.actorUsername || "admin").toString().slice(0, 20);
            showAnnouncementPopup("[Private] @" + actor + ": " + text);
          };
          network.handlers.myPmAdded = (snapshot) => {
            const msgCtrl = getMessagesController();
            if (msgCtrl && typeof msgCtrl.handleIncomingPm === "function") {
              msgCtrl.handleIncomingPm(snapshot);
              const lastFrom = typeof msgCtrl.getLastPrivateMessageFrom === "function"
                ? msgCtrl.getLastPrivateMessageFrom()
                : null;
              lastPrivateMessageFrom = lastFrom && typeof lastFrom === "object" ? lastFrom : null;
              return;
            }
            const value = snapshot.val() || {};
            const text = (value.text || "").toString().trim().slice(0, 160);
            if (!text) return;
            const createdAt = Number(value.createdAt) || 0;
            if (createdAt > 0 && playerSessionStartedAt > 0 && createdAt <= playerSessionStartedAt) return;
            const fromAccountId = (value.fromAccountId || "").toString();
            const fromUsername = (value.fromUsername || "").toString().slice(0, 20) || fromAccountId || "unknown";
            lastPrivateMessageFrom = {
              accountId: fromAccountId,
              username: fromUsername
            };
            postLocalSystemChat("[PM] @" + fromUsername + ": " + text);
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
          network.handlers.myFriends = (snapshot) => {
            const ctrl = getFriendsController();
            if (!ctrl || typeof ctrl.setFriendsData !== "function") return;
            ctrl.setFriendsData(snapshot.val() || {});
          };
          network.handlers.myFriendRequests = (snapshot) => {
            const ctrl = getFriendsController();
            if (!ctrl || typeof ctrl.setRequestsData !== "function") return;
            ctrl.setRequestsData(snapshot.val() || {});
          };

          network.handlers.worldsIndex = (snapshot) => {
            const data = snapshot.val() || {};
            worldIndexMetaById = data;
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
            totalOnlinePlayers = count;
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
            // Avoid frequent menu DOM rebuilds while actively playing in-world.
            if (!inWorld) {
              refreshWorldButtons();
            }
            updateOnlineCount();
            const friendCtrl = getFriendsController();
            if (friendCtrl && typeof friendCtrl.renderOpen === "function") {
              friendCtrl.renderOpen();
            }
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
          network.handlers.antiCheatLogAdded = (snapshot) => {
            if (!canViewAntiCheatLogs()) return;
            const rows = snapshot.val() || {};
            const flattened = [];
            Object.keys(rows).forEach((id) => {
              const value = rows[id] || {};
              const rule = (value.rule || "unknown").toString().slice(0, 48);
              const sev = (value.severity || "warn").toString().toLowerCase().slice(0, 16);
              const uname = (value.username || value.accountId || "unknown").toString().slice(0, 24);
              const worldId = (value.world || "").toString().slice(0, 24);
              let detailRaw = value.details;
              if (detailRaw && typeof detailRaw === "object") {
                try {
                  detailRaw = JSON.stringify(detailRaw);
                } catch (error) {
                  detailRaw = String(detailRaw);
                }
              }
              const detail = (detailRaw == null ? "" : String(detailRaw)).slice(0, 220);
              const text = "@" + uname + " | " + rule + (worldId ? (" | " + worldId) : "") + (detail ? (" | " + detail) : "");
              flattened.push({
                text,
                severity: sev || "warn",
                createdAt: typeof value.createdAt === "number" ? value.createdAt : 0
              });
            });
            flattened.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
            antiCheatMessages.length = 0;
            flattened.slice(-220).forEach((item) => antiCheatMessages.push(item));
            renderAdminPanelFromLiveUpdate();
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
            const updateText = "Game updated" + (assetVersion ? " (v=" + assetVersion + ")" : "") + ".";
            saveForceReloadNotice(updateText);
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
            refreshAdminCapabilities(hasSeenAdminRoleSnapshot);
            hasSeenAdminRoleSnapshot = true;
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
          network.progressRef.on("value", network.handlers.progression);
          network.achievementsRef.on("value", network.handlers.achievements);
          network.questsRef.on("value", network.handlers.quests);
          network.mySessionRef.on("value", network.handlers.mySession);
          network.myCommandRef.on("value", network.handlers.myCommand);
          network.myReachRef.on("value", network.handlers.myReach);
          network.myFreezeRef.on("value", network.handlers.myFreeze);
          network.myGodModeRef.on("value", network.handlers.myGodMode);
          network.myPrivateAnnouncementRef.on("value", network.handlers.myPrivateAnnouncement);
          network.myPmFeedRef.on("child_added", network.handlers.myPmAdded);
          network.myTradeRequestRef.on("value", network.handlers.myTradeRequest);
          network.myTradeResponseRef.on("value", network.handlers.myTradeResponse);
          network.myActiveTradeRef.on("value", network.handlers.myActiveTrade);
          network.myFriendsRef.on("value", network.handlers.myFriends);
          network.myFriendRequestsRef.on("value", network.handlers.myFriendRequests);
          network.worldsIndexRef.on("value", network.handlers.worldsIndex);
          network.globalPlayersRef.on("value", network.handlers.globalPlayers);
          network.myBanRef.on("value", network.handlers.myBan);
          network.forceReloadRef.on("value", network.handlers.forceReload);
          network.announcementRef.on("value", network.handlers.announcement);
          network.adminRolesRef.on("value", network.handlers.adminRoles);
          if (canViewAccountLogs) {
            network.accountLogsRootRef.on("value", network.handlers.accountLogAdded);
          }
          if (canViewAntiCheatLogs()) {
            network.antiCheatLogsRef.on("value", network.handlers.antiCheatLogAdded);
          }
          syncAdminDataListeners();

          window.addEventListener("beforeunload", () => {
            saveInventory();
            scheduleProgressionSave(true);
            scheduleAchievementsSave(true);
            scheduleQuestsSave(true);
            if (inWorld) {
              sendSystemWorldMessage(playerName + " left the world.");
            }
            sendPresenceLeavePacket();
            releaseAccountSession();
          });
        } catch (error) {
          console.error(error);
          setNetworkState("Firebase error", true);
          refreshWorldButtons(null, true);
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

      function equipTitle(titleId) {
        const id = String(titleId || "").trim();
        if (id && (!TITLE_LOOKUP[id] || (titleInventory[id] || 0) <= 0)) return;
        equippedTitleId = equippedTitleId === id ? "" : id;
        if (!equippedTitleId && TITLE_DEFAULT_ID && (titleInventory[TITLE_DEFAULT_ID] || 0) > 0) {
          equippedTitleId = TITLE_DEFAULT_ID;
        }
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

      function ensureInventoryDragGhost() {
        if (inventoryDrag.ghostEl) return inventoryDrag.ghostEl;
        const ghost = document.createElement("div");
        ghost.className = "inventory-drag-ghost hidden";
        ghost.innerHTML = "<div class=\"drag-title\"></div><div class=\"drag-qty\"></div>";
        document.body.appendChild(ghost);
        inventoryDrag.ghostEl = ghost;
        return ghost;
      }

      function updateInventoryDragGhost() {
        const ghost = ensureInventoryDragGhost();
        const entry = inventoryDrag.entry || {};
        const titleEl = ghost.querySelector(".drag-title");
        const qtyEl = ghost.querySelector(".drag-qty");
        const label = String(entry.label || getDropLabel(entry) || "Item");
        if (titleEl) titleEl.textContent = label;
        if (qtyEl) qtyEl.textContent = "x" + inventoryDrag.amount + " / " + inventoryDrag.maxAmount;
      }

      function setInventoryDragGhostPosition(clientX, clientY) {
        const ghost = ensureInventoryDragGhost();
        ghost.style.left = Math.round(clientX + 12) + "px";
        ghost.style.top = Math.round(clientY + 12) + "px";
      }

      function stopInventoryDrag() {
        inventoryDrag.active = false;
        inventoryDrag.pointerId = null;
        inventoryDrag.entry = null;
        inventoryDrag.amount = 1;
        inventoryDrag.maxAmount = 1;
        inventoryDrag.moved = false;
        if (inventoryDrag.ghostEl) inventoryDrag.ghostEl.classList.add("hidden");
      }

      function isPointInsideCanvas(clientX, clientY) {
        if (typeof inputUtilsModule.pointInsideElement === "function") {
          return inputUtilsModule.pointInsideElement(canvas, clientX, clientY);
        }
        const rect = canvas.getBoundingClientRect();
        return (
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom
        );
      }

      function startInventoryDrag(entry, event) {
        if (!inWorld || !entry) return;
        const maxAmount = getMaxDroppableAmount(entry);
        if (maxAmount <= 0) return;
        inventoryDrag.active = true;
        inventoryDrag.pointerId = event.pointerId;
        inventoryDrag.startX = Number(event.clientX) || 0;
        inventoryDrag.startY = Number(event.clientY) || 0;
        inventoryDrag.lastX = inventoryDrag.startX;
        inventoryDrag.lastY = inventoryDrag.startY;
        inventoryDrag.moved = false;
        inventoryDrag.entry = { ...entry };
        inventoryDrag.maxAmount = maxAmount;
        inventoryDrag.amount = Math.max(1, Math.min(maxAmount, Math.floor(Number(entry.defaultAmount) || 1)));
        updateInventoryDragGhost();
        setInventoryDragGhostPosition(inventoryDrag.startX, inventoryDrag.startY);
      }

      function onInventoryDragMove(event) {
        if (!inventoryDrag.active) return;
        if (inventoryDrag.pointerId !== null && event.pointerId !== undefined && event.pointerId !== inventoryDrag.pointerId) return;
        const x = Number(event.clientX);
        const y = Number(event.clientY);
        if (!Number.isFinite(x) || !Number.isFinite(y)) return;
        inventoryDrag.lastX = x;
        inventoryDrag.lastY = y;
        const dx = x - inventoryDrag.startX;
        const dy = y - inventoryDrag.startY;
        if (!inventoryDrag.moved && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
          inventoryDrag.moved = true;
          if (inventoryDrag.ghostEl) inventoryDrag.ghostEl.classList.remove("hidden");
        }
        if (inventoryDrag.moved) {
          setInventoryDragGhostPosition(x, y);
        }
      }

      function onInventoryDragWheel(event) {
        if (!inventoryDrag.active || !inventoryDrag.entry) return;
        event.preventDefault();
        event.stopPropagation();
        if (inventoryDrag.maxAmount <= 1) return;
        const step = event.shiftKey ? 10 : 1;
        if (event.deltaY < 0) {
          inventoryDrag.amount = Math.min(inventoryDrag.maxAmount, inventoryDrag.amount + step);
        } else if (event.deltaY > 0) {
          inventoryDrag.amount = Math.max(1, inventoryDrag.amount - step);
        }
        updateInventoryDragGhost();
      }

      function onInventoryDragEnd(event) {
        if (!inventoryDrag.active) return;
        if (inventoryDrag.pointerId !== null && event.pointerId !== undefined && event.pointerId !== inventoryDrag.pointerId) return;
        const wasDrag = inventoryDrag.moved;
        const endX = Number(event.clientX);
        const endY = Number(event.clientY);
        const chestCtrl = getChestController();
        if (wasDrag && Number.isFinite(endX) && Number.isFinite(endY) && chestCtrl) {
          if (typeof chestCtrl.handleInventoryDragEnd === "function") {
            const chestResult = chestCtrl.handleInventoryDragEnd(
              inventoryDrag.entry,
              inventoryDrag.amount,
              endX,
              endY
            ) || {};
            if (chestResult.handled) {
              suppressInventoryClickUntilMs = performance.now() + 180;
              stopInventoryDrag();
              return;
            }
            if (chestResult.blockWorldDrop) {
              stopInventoryDrag();
              return;
            }
          }
        }
        const donationCtrl = getDonationController();
        if (wasDrag && Number.isFinite(endX) && Number.isFinite(endY) && donationCtrl) {
          if (typeof donationCtrl.handleInventoryDragEnd === "function") {
            const donationResult = donationCtrl.handleInventoryDragEnd(
              inventoryDrag.entry,
              inventoryDrag.amount,
              endX,
              endY
            ) || {};
            if (donationResult.handled) {
              suppressInventoryClickUntilMs = performance.now() + 180;
              stopInventoryDrag();
              return;
            }
            if (donationResult.blockWorldDrop) {
              stopInventoryDrag();
              return;
            }
          }
        }
        const tradeCtrl = getTradeController();
        if (wasDrag && Number.isFinite(endX) && Number.isFinite(endY) && tradeCtrl) {
          if (typeof tradeCtrl.handleInventoryDragEnd === "function") {
            const tradeResult = tradeCtrl.handleInventoryDragEnd(
              inventoryDrag.entry,
              inventoryDrag.amount,
              endX,
              endY
            ) || {};
            if (tradeResult.handled) {
              suppressInventoryClickUntilMs = performance.now() + 180;
              stopInventoryDrag();
              return;
            }
            if (tradeResult.blockWorldDrop) {
              stopInventoryDrag();
              return;
            }
          }
        }
        if (wasDrag && Number.isFinite(endX) && Number.isFinite(endY) && isPointInsideCanvas(endX, endY) && inWorld) {
          const pos = worldFromClient(endX, endY);
          if (pos.tx >= 0 && pos.ty >= 0 && pos.tx < WORLD_W && pos.ty < WORLD_H && world[pos.ty][pos.tx] === DISPLAY_BLOCK_ID) {
            if (tryPlaceItemIntoDisplay(pos.tx, pos.ty, inventoryDrag.entry)) {
              suppressInventoryClickUntilMs = performance.now() + 180;
              stopInventoryDrag();
              return;
            }
          }
          const dropX = Math.max(0, Math.min(pos.tx * TILE, WORLD_W * TILE - TILE));
          const dropY = Math.max(0, Math.min(pos.ty * TILE, WORLD_H * TILE - TILE));
          if (dropInventoryEntry(inventoryDrag.entry, inventoryDrag.amount, dropX, dropY)) {
            suppressInventoryClickUntilMs = performance.now() + 180;
          }
        }
        stopInventoryDrag();
      }

      function createInventorySlot(opts) {
        const slot = document.createElement("button");
        slot.type = "button";
        slot.className = "inventory-slot" + (opts.selected ? " selected" : "") + (opts.muted ? " muted" : "") + (opts.variant ? " " + opts.variant : "");
        slot.title = opts.title || "";
        const icon = createIconChip(opts.color, opts.iconLabel, opts.iconClass, opts.faIconClass, opts.imageSrc);
        slot.appendChild(icon);
        if (opts.countText !== undefined && opts.countText !== null) { // Modified condition
          const count = document.createElement("span");
          count.className = "slot-count";
          count.textContent = opts.countText;
          if (opts.countId) count.id = opts.countId; // Add this line to assign an ID
          slot.appendChild(count);
        }
        if (opts.badgeText) {
          const badge = document.createElement("span");
          badge.className = "slot-badge";
          badge.textContent = opts.badgeText;
          slot.appendChild(badge);
        }
        if (typeof opts.getDragEntry === "function") {
          slot.addEventListener("pointerdown", (event) => {
            if (typeof event.button === "number" && event.button !== 0) return;
            startInventoryDrag(opts.getDragEntry(), event);
          });
        }
        if (typeof opts.onClick === "function") {
          slot.addEventListener("click", (event) => {
            if (performance.now() < suppressInventoryClickUntilMs) {
              event.preventDefault();
              return;
            }
            opts.onClick(event);
          });
        }
        if (typeof opts.onDoubleClick === "function") {
          slot.addEventListener("dblclick", (event) => {
            if (performance.now() < suppressInventoryClickUntilMs) {
              event.preventDefault();
              return;
            }
            opts.onDoubleClick(event);
          });
        }
        return slot;
      }




      let lastInventorySignature = "";

      function getInventorySignature() {
        // Creates a quick string to check if we have NEW items (which requires a full DOM rebuild).
        // Use slotOrder for blocks (toolbar order) instead of full INVENTORY_IDS for fewer iterations.
        let sig = selectedSlot + ";";
        for (const id of slotOrder) {
          if (id === TOOL_FIST || id === TOOL_WRENCH) sig += id + ",";
          else if ((inventory[id] || 0) > 0) sig += id + ",";
        }
        for (const item of COSMETIC_ITEMS) if (cosmeticInventory[item.id] > 0) sig += item.id + (equippedCosmetics[item.slot] === item.id ? "E" : "") + ",";
        sig += equippedTitleId;
        return sig;
      }

      function fastUpdateToolbarCounts() {
        // Directly updates the text of existing DOM elements without causing layout thrashing
        for (let i = 0; i < slotOrder.length; i++) {
          const id = slotOrder[i];
          if (id === TOOL_FIST || id === TOOL_WRENCH) continue;
          const el = document.getElementById("slot-count-block-" + id);
          if (el) el.textContent = "x" + (inventory[id] || 0);
        }
      }

      function renderToolbarNow() {
        lastToolbarRefresh = performance.now();
        
        // --- OPTIMIZATION: Check if we only need to update the numbers ---
        const currentSig = getInventorySignature();
        if (lastInventorySignature === currentSig && toolbar.innerHTML !== "") {
          fastUpdateToolbarCounts();
          return;
        }
        lastInventorySignature = currentSig;
        // ----------------------------------------------------------------

        toolbar.innerHTML = "";
        const blockSection = createInventorySection("Blocks & Tools", "Click to select (1: Fist, 2: Wrench)");
        const farmableSection = createInventorySection("Farmables", "Separate from normal blocks: higher XP + gem drops");
        let hasFarmableEntries = false;
        const cosmeticEntries = [];
        for (let i = 0; i < slotOrder.length; i++) {
          const id = slotOrder[i];
          const isFist = id === TOOL_FIST;
          const isWrench = id === TOOL_WRENCH;
          const isTool = isFist || isWrench;
          if (!isTool && Math.max(0, Number(inventory[id]) || 0) <= 0) continue;
          const isFarmable = !isTool && FARMABLE_INVENTORY_IDS.includes(id);
          const blockDef = isTool ? null : blockDefs[id];
          const title = isFist ? "Fist" : (isWrench ? "Wrench" : (blockDef && blockDef.name ? blockDef.name : "Block"));
          const slotEl = createInventorySlot({
            selected: i === selectedSlot,
            variant: isFarmable ? "inventory-slot-farmable" : "inventory-slot-block",
            title: (isFarmable ? "[Farmable] " : "") + title + (isTool ? "" : " (x" + (inventory[id] || 0) + ")"),
            color: isFist ? "#c59b81" : (isWrench ? "#90a4ae" : (blockDef && blockDef.color ? blockDef.color : "#999")),
            iconClass: isTool ? "icon-fist" : "icon-block",
            faIconClass: isFist ? "fa-solid fa-hand-fist" : (isWrench ? "fa-solid fa-screwdriver-wrench" : (blockDef && blockDef.faIcon ? blockDef.faIcon : "")),
            imageSrc: !isTool && blockDef && blockDef.imagePath ? blockDef.imagePath : "",
            iconLabel: isFist ? "F" : (isWrench ? "W" : ((blockDef && blockDef.icon) || title.slice(0, 2).toUpperCase())),
            name: title,
            countText: isTool ? "" : "x" + (inventory[id] || 0),
            countId: isTool ? "" : "slot-count-block-" + id, // Injecting ID here
            getDragEntry: isTool ? null : () => ({ type: "block", blockId: id, label: title, defaultAmount: 1 }),
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
              refreshToolbar(true); // Force a full rebuild to show selected state
            },
            onDoubleClick: (!isTool && LOCK_BLOCK_ID_SET.has(id)) ? () => {
              convertLockByDoubleClick(id);
            } : null
          });
          if (isFarmable) {
            farmableSection.grid.appendChild(slotEl);
            hasFarmableEntries = true;
          } else {
            blockSection.grid.appendChild(slotEl);
          }
        }
        toolbar.appendChild(blockSection.section);
        if (hasFarmableEntries) {
          toolbar.appendChild(farmableSection.section);
        }


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
              color: item.color || "#8aa0b5",
              iconClass: "icon-cosmetic icon-" + item.slot,
              faIconClass: item.faIcon || "",
              imageSrc: item.imagePath || "",
              iconLabel: item.icon || item.name.slice(0, 2).toUpperCase(),
              name: item.name,
              countText: "x" + item.count,
              badgeText: equipped ? "E" : "",
              getDragEntry: () => ({
                type: "cosmetic",
                cosmeticId: item.id,
                label: item.name,
                defaultAmount: 1
              }),
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
        const donationCtrl = getDonationController();
        if (donationCtrl && typeof donationCtrl.isOpen === "function" && donationCtrl.isOpen()) {
          if (typeof donationCtrl.renderOpen === "function") donationCtrl.renderOpen();
        }
        const chestCtrl = getChestController();
        if (chestCtrl && typeof chestCtrl.isOpen === "function" && chestCtrl.isOpen()) {
          if (typeof chestCtrl.renderOpen === "function") chestCtrl.renderOpen();
        }
        if (titlesModalEl && !titlesModalEl.classList.contains("hidden")) {
          renderTitlesMenu();
        }
        updateMobileControlsUi();
      }

      let toolbarRenderTimeout = 0;
      
      function refreshToolbar(immediate) {
        autoConvertWorldLocksInInventory();
        if (immediate) {
          if (toolbarRenderTimeout) {
            clearTimeout(toolbarRenderTimeout);
            toolbarRenderTimeout = 0;
          }
          renderToolbarNow();
          return;
        }
        
        // Batch rapidly incoming requests instead of dropping them
        if (!toolbarRenderTimeout) {
          toolbarRenderTimeout = setTimeout(() => {
            toolbarRenderTimeout = 0;
            renderToolbarNow();
          }, 150); 
        }
      }

      function canvasPointFromClient(clientX, clientY) {
        if (typeof inputUtilsModule.canvasPointFromClient === "function") {
          return inputUtilsModule.canvasPointFromClient(canvas, clientX, clientY);
        }
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (clientX - rect.left) * scaleX;
        const y = (clientY - rect.top) * scaleY;
        return { x, y };
      }

      function worldFromClient(clientX, clientY) {
        if (typeof inputUtilsModule.worldFromClient === "function") {
          return inputUtilsModule.worldFromClient(
            canvas,
            clientX,
            clientY,
            cameraX,
            cameraY,
            cameraZoom,
            TILE
          );
        }
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

      function bindHoldButton(button, key) {
        if (!button) return;
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

      function setMobileTouchActionMode(nextMode) {
        mobileTouchActionMode = nextMode === "secondary" ? "secondary" : "primary";
        updateMobileControlsUi();
      }

      function setSelectedToolSlotById(toolId) {
        const targetIndex = slotOrder.indexOf(toolId);
        if (targetIndex < 0) return;
        if (selectedSlot !== targetIndex) {
          selectedSlot = targetIndex;
          refreshToolbar(true);
        } else {
          updateMobileControlsUi();
        }
      }

      function updateMobileControlsUi() {
        if (mobilePrimaryBtn) mobilePrimaryBtn.classList.toggle("active", mobileTouchActionMode === "primary");
        if (mobileSecondaryBtn) mobileSecondaryBtn.classList.toggle("active", mobileTouchActionMode === "secondary");
        const selectedId = slotOrder[selectedSlot];
        if (mobileFistBtn) mobileFistBtn.classList.toggle("active", selectedId === TOOL_FIST);
        if (mobileWrenchBtn) mobileWrenchBtn.classList.toggle("active", selectedId === TOOL_WRENCH);
        if (mobilePlayModeBtn) mobilePlayModeBtn.classList.toggle("active", mobilePlayModeEnabled);
        if (mobileChatBtn) mobileChatBtn.classList.toggle("active", isChatOpen);
        if (mobileInventoryBtn) mobileInventoryBtn.classList.toggle("active", isMobileInventoryOpen);
      }

      function bindMobileControls() {
        const bindTapButton = (button, onTap) => {
          if (!button || typeof onTap !== "function") return;
          const run = (event) => {
            event.preventDefault();
            onTap();
          };
          button.addEventListener("touchstart", run, { passive: false });
          button.addEventListener("click", run);
        };
        bindHoldButton(mobileLeftBtn, "left");
        bindHoldButton(mobileRightBtn, "right");
        bindHoldButton(mobileJumpBtn, "jump");
        bindTapButton(mobilePrimaryBtn, () => setMobileTouchActionMode("primary"));
        bindTapButton(mobileSecondaryBtn, () => setMobileTouchActionMode("secondary"));
        bindTapButton(mobileFistBtn, () => setSelectedToolSlotById(TOOL_FIST));
        bindTapButton(mobileWrenchBtn, () => setSelectedToolSlotById(TOOL_WRENCH));
        bindTapButton(mobilePlayModeBtn, () => {
          if (!inWorld || !isMobileUi) return;
          mobilePlayModeEnabled = !mobilePlayModeEnabled;
          syncMobilePlayModeClass();
          updateMobileControlsUi();
        });
        bindTapButton(mobileChatBtn, () => {
          if (!inWorld || !isMobileUi) return;
          setChatOpen(!isChatOpen);
        });
        bindTapButton(mobileInventoryBtn, () => {
          if (!inWorld || !isMobileUi) return;
          isMobileInventoryOpen = !isMobileInventoryOpen;
          if (isMobileInventoryOpen) {
            setChatOpen(false);
          } else {
            syncMobileOverlayVisibility();
          }
          updateMobileControlsUi();
        });
        bindTapButton(mobileExitBtn, () => {
          if (!inWorld) return;
          leaveCurrentWorld();
        });
        updateMobileControlsUi();
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

      function syncDesktopVerticalBounds() {
        const desktopMode = (window.innerWidth || 0) >= 980;
        if (!desktopMode) {
          document.documentElement.style.removeProperty("--desktop-content-top");
          document.documentElement.style.removeProperty("--desktop-content-bottom");
          return;
        }
        let anchorEl = inWorld ? canvasWrapEl : menuScreenEl;
        if (!anchorEl || anchorEl.classList.contains("hidden")) {
          anchorEl = inWorld ? menuScreenEl : canvasWrapEl;
        }
        if (!anchorEl) return;
        const rect = anchorEl.getBoundingClientRect();
        if (!Number.isFinite(rect.top) || !Number.isFinite(rect.bottom) || rect.height <= 1) return;
        const topPx = Math.max(0, Math.round(rect.top));
        const bottomPx = Math.max(0, Math.round((window.innerHeight || 0) - rect.bottom));
        document.documentElement.style.setProperty("--desktop-content-top", topPx + "px");
        document.documentElement.style.setProperty("--desktop-content-bottom", bottomPx + "px");
      }

      function persistDesktopPanelLayout() {
        try {
          localStorage.setItem(LAYOUT_PREFS_KEY, JSON.stringify({
            left: desktopLeftPanelWidth,
            right: desktopRightPanelWidth
          }));
        } catch (error) {
          // ignore localStorage failures
        }
      }

      function loadDesktopPanelLayout() {
        // Fixed desktop panel layout requested by user.
        applyDesktopPanelLayout(DESKTOP_PANEL_LEFT_DEFAULT, DESKTOP_PANEL_RIGHT_DEFAULT, false);
        try {
          localStorage.removeItem(LAYOUT_PREFS_KEY);
        } catch (error) {
          // ignore localStorage failures
        }
      }

      function setLayoutResizeHandlesVisible() {
        // Resize handles are disabled for fixed layout mode.
        if (leftPanelResizeHandleEl) leftPanelResizeHandleEl.classList.add("hidden");
        if (rightPanelResizeHandleEl) rightPanelResizeHandleEl.classList.add("hidden");
      }

      function onLayoutResizeMove(event) {
        if (!layoutResizeSide) return;
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
        persistDesktopPanelLayout();
      }

      function initDesktopLayoutResize() {
        loadDesktopPanelLayout();
        setLayoutResizeHandlesVisible();
        layoutResizeSide = "";
        document.body.classList.remove("layout-resizing");
        resizeCanvas();
      }

      function resizeCanvas() {
        const wrap = canvas.parentElement;
        const rect = wrap.getBoundingClientRect();
        isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
        const hasTouch = (typeof navigator !== "undefined" && (Number(navigator.maxTouchPoints) > 0 || Number(navigator.msMaxTouchPoints) > 0)) || ("ontouchstart" in window);
        const narrowViewport = (window.innerWidth || 0) <= 860;
        isMobileUi = Boolean(narrowViewport && (isCoarsePointer || hasTouch));
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
        if (!isMobileUi) {
          isMobileInventoryOpen = false;
          mobilePlayModeEnabled = true;
        }
        syncMobileOverlayVisibility();
        syncMobilePlayModeClass();
        updateMobileControlsUi();
        setLayoutResizeHandlesVisible();
        applyDesktopPanelLayout(desktopLeftPanelWidth, desktopRightPanelWidth, false);
        syncDesktopVerticalBounds();
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
        if (e.key === "Escape" && donationModalEl && !donationModalEl.classList.contains("hidden")) {
          e.preventDefault();
          closeDonationModal();
          return;
        }
        if (e.key === "Escape" && chestModalEl && !chestModalEl.classList.contains("hidden")) {
          e.preventDefault();
          closeChestModal();
          return;
        }
        if (e.key === "Escape" && gambleModalEl && !gambleModalEl.classList.contains("hidden")) {
          e.preventDefault();
          closeGambleModal();
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
        if (e.key === "Escape" && profileModalEl && !profileModalEl.classList.contains("hidden")) {
          e.preventDefault();
          const friendCtrl = getFriendsController();
          if (friendCtrl && typeof friendCtrl.closeProfile === "function") friendCtrl.closeProfile();
          return;
        }
        if (e.key === "Escape" && friendsModalEl && !friendsModalEl.classList.contains("hidden")) {
          e.preventDefault();
          const friendCtrl = getFriendsController();
          if (friendCtrl && typeof friendCtrl.closeFriends === "function") friendCtrl.closeFriends();
          return;
        }
        if (e.key === "Escape" && achievementsModalEl && !achievementsModalEl.classList.contains("hidden")) {
          e.preventDefault();
          closeAchievementsMenu();
          return;
        }
        if (e.key === "Escape" && titlesModalEl && !titlesModalEl.classList.contains("hidden")) {
          e.preventDefault();
          closeTitlesMenu();
          return;
        }
        const tradePanelEl = document.getElementById("tradePanelModal");
        if (e.key === "Escape" && tradePanelEl && !tradePanelEl.classList.contains("hidden")) {
          e.preventDefault();
          closeTradeMenuModal();
          return;
        }
        const shopCtrl = getShopController();
        if (e.key === "Escape" && shopCtrl && typeof shopCtrl.isOpen === "function" && shopCtrl.isOpen()) {
          e.preventDefault();
          if (typeof shopCtrl.closeModal === "function") shopCtrl.closeModal();
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
        if (inWorld && !isMobileUi && e.key === "Enter" && !e.shiftKey) {
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
        const pos = worldFromPointer(e);
        mouseWorld = pos;
        if (e.button === 0) {
          if (openWrenchMenuFromNameIcon(e.clientX, e.clientY)) return;
          isPointerDown = true;
          useActionAt(pos.tx, pos.ty);
          return;
        }
        if (e.button === 2) {
          useSecondaryActionAt(pos.tx, pos.ty);
        }
      });

      window.addEventListener("mouseup", () => {
        isPointerDown = false;
      });

      canvas.addEventListener("touchstart", (e) => {
        if (!inWorld) return;
        e.preventDefault();
        const touch = e.changedTouches[0];
        if (!touch) return;
        if (openWrenchMenuFromNameIcon(touch.clientX, touch.clientY)) return;
        const mobileSecondary = isMobileUi && mobileTouchActionMode === "secondary";
        isPointerDown = !mobileSecondary;
        const pos = worldFromClient(touch.clientX, touch.clientY);
        mouseWorld = pos;
        if (mobileSecondary) {
          useSecondaryActionAt(pos.tx, pos.ty);
          mobileLastTouchActionAt = performance.now();
        } else {
          useActionAt(pos.tx, pos.ty);
          mobileLastTouchActionAt = performance.now();
        }
      }, { passive: false });

      canvas.addEventListener("touchmove", (e) => {
        if (!inWorld) return;
        e.preventDefault();
        const touch = e.touches[0];
        if (!touch) return;
        const pos = worldFromClient(touch.clientX, touch.clientY);
        mouseWorld = pos;
      }, { passive: false });

      window.addEventListener("touchend", () => { isPointerDown = false; });
      window.addEventListener("touchcancel", () => { isPointerDown = false; });

      window.addEventListener("pointermove", onInventoryDragMove, { passive: true });
      window.addEventListener("pointerup", onInventoryDragEnd);
      window.addEventListener("pointercancel", onInventoryDragEnd);
      window.addEventListener("wheel", onInventoryDragWheel, { passive: false, capture: true });

      canvas.addEventListener("contextmenu", (e) => e.preventDefault());
      mobileControlsEl.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
      mobileControlsEl.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });

      function bootstrapGame() {
        loadInventoryFromLocal();
        loadProgressionFromLocal();
        if (!loadAchievementsFromLocal()) {
          achievementsState = normalizeAchievementsState({});
        }
        if (!loadQuestsFromLocal()) {
          questsState = normalizeQuestsState({});
        }
        refreshToolbar();
        //postDailyQuestStatus();
        bindMobileControls();
        setInWorldState(false);
        updateOnlineCount();
        bindWorldControls();
        initFirebaseMultiplayer();

        let lastTickTs = performance.now();
        let tickAccumulatorMs = 0;
        function tick(nowTs) {
          const now = Number(nowTs);
          if (!Number.isFinite(now)) {
            requestAnimationFrame(tick);
            return;
          }
          let deltaMs = now - lastTickTs;
          lastTickTs = now;
          if (!Number.isFinite(deltaMs) || deltaMs < 0) deltaMs = FIXED_FRAME_MS;
          if (deltaMs > 250) deltaMs = FIXED_FRAME_MS;
          tickAccumulatorMs += deltaMs;

          let ticksRun = 0;
          while (tickAccumulatorMs >= FIXED_FRAME_MS && ticksRun < MAX_TICK_CATCHUP) {
            if (inWorld) {
              if (isPointerDown && !isChatOpen && !isAdminOpen) {
                const selectedId = slotOrder[selectedSlot];
                if (selectedId !== TOOL_WRENCH) {
                  const sameTile = lastHoldActionTile && lastHoldActionTile.tx === mouseWorld.tx && lastHoldActionTile.ty === mouseWorld.ty;
                  if (sameTile && (lastTickTs - lastHoldActionAtMs) < BLOCK_HIT_COOLDOWN_MS) {
                    // Throttle: skip useActionAt until cooldown elapsed or tile changed
                  } else {
                    lastHoldActionTile = { tx: mouseWorld.tx, ty: mouseWorld.ty };
                    lastHoldActionAtMs = lastTickTs;
                    useActionAt(mouseWorld.tx, mouseWorld.ty);
                  }
                }
              }
              updatePlayer();
              if (particleController && typeof particleController.update === "function") {
                particleController.update(FIXED_FRAME_MS / 1000);
              }
              updateCamera();
              tickTileDamageDecay();
              updateWorldDrops();
              syncPlayer(false);
            }
            tickAccumulatorMs -= FIXED_FRAME_MS;
            ticksRun++;
          }
          if (ticksRun > 0) {
            // Run anti-cheat once per rendered frame (not per fixed sub-tick) to avoid tiny dtMs false flags.
            if (antiCheatController && typeof antiCheatController.onFrame === "function") {
              antiCheatController.onFrame();
            }
            render();
          }
          requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
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
      window.addEventListener("unhandledrejection", (event) => {
        if (!event || !event.reason) return;
        const message = (event.reason && event.reason.message) ? event.reason.message : String(event.reason);
        if (!gameShellEl.classList.contains("hidden")) return;
        setAuthBusy(false);
        setAuthStatus(message || "Unexpected error.", true);
      });
      window.addEventListener("error", (event) => {
        if (!event) return;
        const message = event.message || (event.error && event.error.message) || "";
        if (!message) return;
        if (!gameShellEl.classList.contains("hidden")) return;
        setAuthBusy(false);
        setAuthStatus(message, true);
      });
      window.addEventListener("beforeunload", () => {
        releaseAccountSession();
      });
      applySavedCredentialsToForm();
      setLocalUpdateNotice(takeForceReloadNotice());
      startPublicMainNoticeListener();
      setAuthStatus("Create or login to continue.", false);
    })();
