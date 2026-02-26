window.GTModules = window.GTModules || {};
window.GTState = window.GTState || {};

window.GTModules.state = (function createStateModule() {
  const root = window.GTState;

  function aliasGlobal(name) {
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, name);
    if (descriptor && !descriptor.configurable) return;
    Object.defineProperty(globalThis, name, {
      configurable: true,
      enumerable: false,
      get() {
        return root[name];
      },
      set(value) {
        root[name] = value;
      }
    });
  }

  function ensure(name, initFactory) {
    if (!Object.prototype.hasOwnProperty.call(root, name)) {
      root[name] = typeof initFactory === "function" ? initFactory() : initFactory;
    }
    aliasGlobal(name);
    return root[name];
  }

  function buildWeatherPresets(images) {
    const rows = Array.isArray(images) ? images : [];
    const out = [{ id: "none", name: "Default Sky", url: "" }];
    const seen = new Set(["none"]);
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i] || {};
      const id = String(row.id || "").trim().toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 32);
      const name = String(row.name || "").trim().slice(0, 36);
      const url = String(row.url || "").trim().slice(0, 420);
      if (!id || seen.has(id)) continue;
      out.push({ id, name: name || id, url });
      seen.add(id);
    }
    return out;
  }

  function initRuntimeState(options) {
    const opts = options || {};
    const inventoryIds = Array.isArray(opts.inventoryIds) ? opts.inventoryIds : [];
    const titleCatalog = Array.isArray(opts.titleCatalog) ? opts.titleCatalog : [];
    const cosmeticItems = Array.isArray(opts.cosmeticItems) ? opts.cosmeticItems : [];
    const cosmeticSlots = Array.isArray(opts.cosmeticSlots) ? opts.cosmeticSlots : [];

    ensure("cosmeticImageCache", () => new Map());
    ensure("blockImageCache", () => new Map());
    ensure("waterFramePathCache", () => []);
    ensure("WATER_FRAME_MS", () => Math.max(80, Number(opts.waterFrameMs) || 170));
    ensure("WEATHER_PRESETS", () => buildWeatherPresets(opts.weatherPresetImages));
    ensure("WEATHER_PRESET_MAP", () => new Map((root.WEATHER_PRESETS || []).map((preset) => [preset.id, preset])));
    ensure("inventory", () => {
      const inv = {};
      for (let i = 0; i < inventoryIds.length; i++) {
        inv[inventoryIds[i]] = 0;
      }
      return inv;
    });
    ensure("selectedSlot", () => 0);
    ensure("keys", () => ({}));
    ensure("playerId", () => "p_" + Math.random().toString(36).slice(2, 10));
    ensure("playerName", () => "");
    ensure("playerProfileId", () => "");
    ensure("playerSessionRef", () => null);
    ensure("playerSessionId", () => "");
    ensure("playerSessionStartedAt", () => 0);
    ensure("progressionXp", () => 0);
    ensure("progressionLevel", () => 1);
    ensure("progressionXpIntoLevel", () => 0);
    ensure("progressionXpForNext", () => 100);
    ensure("progressionSaveTimer", () => 0);
    ensure("achievementsState", () => null);
    ensure("achievementsSaveTimer", () => 0);
    ensure("questsState", () => null);
    ensure("questsSaveTimer", () => 0);
    ensure("worldChatStartedAt", () => 0);
    ensure("desktopLeftPanelWidth", () => Math.floor(Number(opts.desktopPanelLeftDefault) || 0));
    ensure("desktopRightPanelWidth", () => Math.floor(Number(opts.desktopPanelRightDefault) || 0));
    ensure("layoutResizeSide", () => "");
    ensure("gameBootstrapped", () => false);
    ensure("pendingTeleportSelf", () => null);
    ensure("lastHandledTeleportCommandId", () => "");
    ensure("hasSeenInitialTeleportCommandSnapshot", () => false);
    ensure("lastHandledReachCommandId", () => "");
    ensure("lastPrivateMessageFrom", () => null);
    ensure("worldJoinRequestToken", () => 0);
    ensure("remotePlayers", () => new Map());
    ensure("remoteAnimationTracker", () => {
      const moduleRef = opts.animationsModule || {};
      if (typeof moduleRef.createTracker === "function") {
        return moduleRef.createTracker();
      }
      return new Map();
    });
    ensure("remoteHitTracker", () => {
      const moduleRef = opts.syncHitsModule || {};
      if (typeof moduleRef.createRemoteHitTracker === "function") {
        return moduleRef.createRemoteHitTracker();
      }
      return new Map();
    });
    ensure("overheadChatByPlayer", () => new Map());
    ensure("displayItemsByTile", () => new Map());
    ensure("doorAccessByTile", () => new Map());
    ensure("antiGravityByTile", () => new Map());
    ensure("cameraConfigsByTile", () => new Map());
    ensure("cameraLogsByTile", () => new Map());
    ensure("localWeatherByWorld", () => new Map());
    ensure("worldOccupancy", () => new Map());
    ensure("worldLockOwnerCache", () => new Map());
    ensure("worldIndexMetaById", () => ({}));
    ensure("ownedWorldScanInFlight", () => false);
    ensure("ownedWorldScanToken", () => 0);
    ensure("vendingController", () => null);
    ensure("gambleController", () => null);
    ensure("donationController", () => null);
    ensure("chestController", () => null);
    ensure("friendsController", () => null);
    ensure("tradeController", () => null);
    ensure("messagesController", () => null);
    ensure("shopController", () => null);
    ensure("signController", () => null);
    ensure("plantsController", () => null);
    ensure("gemsController", () => null);
    ensure("rewardsController", () => null);
    ensure("dropsController", () => null);
    ensure("drawController", () => null);
    ensure("adminPanelController", () => null);
    ensure("cameraX", () => 0);
    ensure("cameraY", () => 0);
    ensure("cameraZoom", () => {
      if (typeof opts.loadCameraZoomPref === "function") {
        return Number(opts.loadCameraZoomPref()) || 1;
      }
      return 1;
    });
    ensure("mouseWorld", () => ({ tx: 0, ty: 0 }));
    ensure("editReachTiles", () => Number(opts.defaultEditReachTiles) || 0);
    ensure("worldLockEditContext", () => null);
    ensure("doorEditContext", () => null);
    ensure("cameraEditContext", () => null);
    ensure("weatherEditContext", () => null);
    ensure("currentWorldWeather", () => null);
    ensure("knownWorldIds", () => []);
    ensure("totalOnlinePlayers", () => 0);
    ensure("hasRenderedMenuWorldList", () => false);
    ensure("currentWorldLock", () => null);
    ensure("lastLockDeniedNoticeAt", () => 0);
    ensure("lastHandledForceReloadEventId", () => {
      if (typeof opts.loadForceReloadMarker === "function") {
        return String(opts.loadForceReloadMarker() || "");
      }
      return "";
    });
    ensure("lastHandledAnnouncementEventId", () => "");
    ensure("lastHandledFreezeCommandId", () => "");
    ensure("lastHandledGodModeCommandId", () => "");
    ensure("lastHandledPrivateAnnouncementId", () => "");
    ensure("announcementHideTimer", () => 0);
    ensure("serverMainPageNoticeText", () => "");
    ensure("localUpdateNoticeText", () => "");
    ensure("publicMainNoticeDb", () => null);
    ensure("publicMainNoticeRef", () => null);
    ensure("publicMainNoticeHandler", () => null);
    ensure("isCoarsePointer", () => {
      if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
        return window.matchMedia("(pointer: coarse)").matches;
      }
      return false;
    });
    ensure("isMobileUi", () => false);
    ensure("isChatOpen", () => false);
    ensure("suppressChatOpenUntilMs", () => 0);
    ensure("isLogsOpen", () => false);
    ensure("canViewAccountLogs", () => false);
    ensure("canUseAdminPanel", () => false);
    ensure("currentAdminRole", () => "none");
    ensure("adminDataListening", () => false);
    ensure("adminSearchQuery", () => "");
    ensure("adminAuditActionFilter", () => "");
    ensure("adminAuditActorFilter", () => "");
    ensure("adminAuditTargetFilter", () => "");
    ensure("adminBackupList", () => []);
    ensure("adminBackupSelectedId", () => "");
    ensure("adminBackupLoading", () => false);
    ensure("isAdminOpen", () => false);
    ensure("adminCommandsMenuOpen", () => false);
    ensure("hasSeenAdminRoleSnapshot", () => false);
    ensure("adminCommandLastUsedAt", () => new Map());
    ensure("chatMessages", () => []);
    ensure("recentChatFingerprintAt", () => new Map());
    ensure("logsMessages", () => []);
    ensure("antiCheatMessages", () => []);
    ensure("CHAT_BUBBLE_FULL_MS", () => 5000);
    ensure("CHAT_BUBBLE_FADE_MS", () => 1500);
    ensure("CHAT_BUBBLE_MS", () => root.CHAT_BUBBLE_FULL_MS + root.CHAT_BUBBLE_FADE_MS);
    ensure("CHAT_BUBBLE_MAX_WIDTH", () => 190);
    ensure("CHAT_BUBBLE_LINE_HEIGHT", () => 13);
    ensure("DROP_PICKUP_RADIUS", () => 26);
    ensure("DROP_MAX_PER_WORLD", () => 220);
    ensure("PLAYER_NAME_FONT", () => "12px 'Trebuchet MS', sans-serif");
    ensure("playerWrenchHitboxes", () => []);
    ensure("localPlayerWrenchHitbox", () => []);
    ensure("worldDrops", () => new Map());
    ensure("tileDamageByKey", () => new Map());
    ensure("lastDropAtMs", () => 0);
    ensure("inventoryDrag", () => ({
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
    }));
    ensure("toolbarRenderQueued", () => false);
    ensure("toolbarRenderRafId", () => 0);
    ensure("lastToolbarRefresh", () => 0);
    ensure("suppressInventoryClickUntilMs", () => 0);
    ensure("pickupInventoryFlushTimer", () => 0);
    ensure("inventorySaveTimer", () => 0);
    ensure("manualLockConvertHoldUntilMs", () => 0);
    ensure("lastInventoryFullHintAt", () => 0);
    ensure("isPointerDown", () => false);
    ensure("currentWorldId", () => {
      if (typeof opts.getInitialWorldId === "function") {
        return opts.getInitialWorldId();
      }
      return "START";
    });
    ensure("world", () => {
      if (typeof opts.makeWorld === "function") {
        return opts.makeWorld(root.currentWorldId);
      }
      return [];
    });
    ensure("inWorld", () => false);
    ensure("player", () => {
      const tile = Number(opts.tileSize) || 32;
      return {
        x: tile * 8,
        y: tile * 11,
        vx: 0,
        vy: 0,
        grounded: false,
        facing: 1
      };
    });
    ensure("currentPhysicsLimits", () => ({
      maxMoveSpeedPerTick: Math.max(0.01, Number(opts.maxMoveSpeed) || 0),
      maxFallSpeedPerTick: Math.max(0.01, Number(opts.maxFallSpeed) || 0),
      gravityPerTick: Math.max(0.001, Number(opts.gravity) || 0),
      jumpVelocityPerTick: Math.abs(Number(opts.jumpVelocity) || 0),
      inWater: false,
      inAntiGravity: false
    }));

    const cosmeticState = (opts.cosmeticsModule && typeof opts.cosmeticsModule.createInventoryState === "function")
      ? opts.cosmeticsModule.createInventoryState(cosmeticItems, cosmeticSlots)
      : { cosmeticInventory: {}, equippedCosmetics: {} };
    ensure("cosmeticInventory", () => cosmeticState.cosmeticInventory || {});
    ensure("titleInventory", () => {
      const out = {};
      for (let i = 0; i < titleCatalog.length; i++) {
        const title = titleCatalog[i] || {};
        const id = String(title.id || "");
        if (!id) continue;
        out[id] = title.defaultUnlocked ? 1 : 0;
      }
      return out;
    });
    ensure("equippedCosmetics", () => cosmeticState.equippedCosmetics || { shirts: "", pants: "", shoes: "", hats: "", wings: "", swords: "" });
    ensure("equippedTitleId", () => String(opts.titleDefaultId || ""));
    if (!root.equippedTitleId && opts.titleDefaultId && root.titleInventory && root.titleInventory[opts.titleDefaultId]) {
      root.equippedTitleId = String(opts.titleDefaultId);
    }

    return root;
  }

  return {
    initRuntimeState
  };
})();
