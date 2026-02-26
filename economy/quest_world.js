window.GTModules = window.GTModules || {};

window.GTModules.questWorld = (function createQuestWorldModule() {
  const DEFAULT_PATH_ID = "hero_reward_path";

  function createController(options) {
    const opts = options || {};
    const worldConfigById = new Map();
    const playerQuestStateByWorld = new Map();
    const questPathsById = new Map();
    let activeWorldId = "";
    let questWorldRef = null;
    let questWorldHandler = null;
    let questPathsRef = null;
    let questPathsHandler = null;
    let modalCtx = null;
    let domBound = false;

    function get(name, fallback) {
      const value = opts[name];
      if (typeof value === "function") return value();
      return value === undefined ? fallback : value;
    }

    function call(name) {
      const fn = opts[name];
      if (typeof fn !== "function") return undefined;
      const args = Array.prototype.slice.call(arguments, 1);
      return fn.apply(null, args);
    }

    function esc(value) {
      return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    function normalizeWorldId(value) {
      if (typeof opts.normalizeWorldId === "function") {
        return String(opts.normalizeWorldId(value) || "");
      }
      return String(value || "").trim().toUpperCase().slice(0, 24);
    }

    function normalizePathId(value) {
      return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, "_")
        .slice(0, 48);
    }

    function normalizeQuestId(value, fallbackId) {
      const safeFallback = String(fallbackId || "quest").trim().toLowerCase().replace(/[^a-z0-9_-]/g, "_").slice(0, 64) || "quest";
      const normalized = String(value || safeFallback).trim().toLowerCase().replace(/[^a-z0-9_-]/g, "_").slice(0, 64);
      return normalized || safeFallback;
    }

    function getCurrentWorldId() {
      return normalizeWorldId(get("getCurrentWorldId", ""));
    }

    function getNetwork() {
      const network = get("getNetwork", null);
      return network && typeof network === "object" ? network : null;
    }

    function getQuestNpcId() {
      const id = Math.floor(Number(get("getQuestNpcId", 0)) || 0);
      return id > 0 ? id : 53;
    }

    function getWorld() {
      const world = get("getWorld", null);
      return Array.isArray(world) ? world : null;
    }

    function getWorldSize() {
      const value = get("getWorldSize", null) || {};
      return {
        w: Math.max(1, Math.floor(Number(value.w) || 0)),
        h: Math.max(1, Math.floor(Number(value.h) || 0))
      };
    }

    function getQuestWorldRef(worldId) {
      const network = getNetwork();
      const safeWorldId = normalizeWorldId(worldId);
      if (!network || !network.enabled || !network.db || !safeWorldId) return null;
      const basePath = String(get("getBasePath", "growtopia-test") || "growtopia-test");
      return network.db.ref(basePath + "/worlds/" + safeWorldId + "/quest-world");
    }

    function getQuestPathsRef() {
      const network = getNetwork();
      if (!network || !network.enabled || !network.db) return null;
      const basePath = String(get("getBasePath", "growtopia-test") || "growtopia-test");
      return network.db.ref(basePath + "/quest-paths");
    }

    function getQuestPathRef(pathId) {
      const safePathId = normalizePathId(pathId);
      const pathsRef = getQuestPathsRef();
      if (!pathsRef || !safePathId) return null;
      return pathsRef.child(safePathId);
    }

    function getServerTimestampOrNow() {
      const firebaseRef = get("getFirebase", null);
      if (
        firebaseRef &&
        firebaseRef.database &&
        firebaseRef.database.ServerValue &&
        firebaseRef.database.ServerValue.TIMESTAMP
      ) {
        return firebaseRef.database.ServerValue.TIMESTAMP;
      }
      return Date.now();
    }

    function getBlockDefs() {
      const defs = get("getBlockDefs", null);
      return defs && typeof defs === "object" ? defs : {};
    }

    function getBlockNameById(blockId) {
      const id = Math.floor(Number(blockId) || 0);
      const defs = getBlockDefs();
      const def = defs[id];
      if (def && def.name) return String(def.name);
      return "Block " + id;
    }

    function parseBlockRef(value) {
      const parser = opts.parseBlockRef;
      if (typeof parser === "function") {
        const parsed = Math.floor(Number(parser(value)) || 0);
        if (parsed > 0) return parsed;
      }
      const fallback = Math.floor(Number(value) || 0);
      return fallback > 0 ? fallback : 0;
    }

    function getInventoryObject() {
      const inv = get("getInventory", null);
      return inv && typeof inv === "object" ? inv : null;
    }

    function getInventoryBlockCount(blockId) {
      const inv = getInventoryObject();
      const id = Math.floor(Number(blockId) || 0);
      if (!inv || !id) return 0;
      return Math.max(0, Math.floor(Number(inv[id]) || 0));
    }

    function consumeInventoryBlock(blockId, amount) {
      const inv = getInventoryObject();
      const id = Math.floor(Number(blockId) || 0);
      const need = Math.max(1, Math.floor(Number(amount) || 0));
      if (!inv || !id || !need) return false;
      const have = getInventoryBlockCount(id);
      if (have < need) return false;
      inv[id] = Math.max(0, have - need);
      call("saveInventory", false);
      call("refreshToolbar", true);
      return true;
    }

    function buildDefaultQuestPaths() {
      const heroQuestList = [
        {
          id: "hero_path_01_wood",
          title: "Bring me 50 wood blocks",
          description: "Gather wood and bring 50 blocks to me.",
          rewardText: "Reward: 1x Mystery Block",
          objective: {
            type: "bring_block",
            blockId: 4,
            amount: 50
          },
          reward: {
            blockKey: "mystery_block",
            blockAmount: 1
          }
        },
        {
          id: "hero_path_02_stone",
          title: "Bring me 80 stone blocks",
          description: "Great, now bring sturdy stone for the next ritual.",
          rewardText: "Reward: 1x Sun Shirt",
          objective: {
            type: "bring_block",
            blockId: 3,
            amount: 80
          },
          reward: {
            cosmeticId: "sun_shirt",
            cosmeticAmount: 1
          }
        },
        {
          id: "hero_path_03_brick",
          title: "Bring me 120 brick blocks",
          description: "Final step. Deliver 120 bricks and claim your title.",
          rewardText: "Reward: title {username} of Legend",
          objective: {
            type: "bring_block",
            blockId: 6,
            amount: 120
          },
          reward: {
            titleId: "is_hero",
            titleAmount: 1
          }
        }
      ];
      return [
        {
          id: DEFAULT_PATH_ID,
          name: "Hero Reward Path",
          quests: heroQuestList
        },
        {
          id: "starter_path",
          name: "Starter Path",
          quests: heroQuestList
        }
      ];
    }
    function normalizeQuestObjective(value) {
      const row = value && typeof value === "object" ? value : {};
      const rawType = String(row.type || row.kind || row.objectiveType || "").trim().toLowerCase();
      const type = (rawType === "bring_block" || rawType === "bringblock" || rawType === "fetch_block") ? "bring_block" : "";
      if (!type) return null;
      let blockId = Math.floor(Number(row.blockId) || 0);
      if (!blockId) {
        blockId = parseBlockRef(row.blockKey || row.block || row.item || "");
      }
      const amount = Math.max(1, Math.floor(Number(row.amount || row.count) || 1));
      if (!blockId) return null;
      return {
        type: "bring_block",
        blockId,
        amount
      };
    }

    function normalizeQuestReward(value) {
      const row = value && typeof value === "object" ? value : {};
      const out = {};
      const gems = Math.max(0, Math.floor(Number(row.gems) || 0));
      if (gems > 0) out.gems = gems;

      const titleId = String(row.titleId || row.title || "").trim().toLowerCase().slice(0, 64);
      if (titleId) {
        out.titleId = titleId;
        out.titleAmount = Math.max(1, Math.floor(Number(row.titleAmount || row.amount) || 1));
      }

      const cosmeticId = String(row.cosmeticId || row.itemId || "").trim().toLowerCase().slice(0, 64);
      if (cosmeticId) {
        out.cosmeticId = cosmeticId;
        out.cosmeticAmount = Math.max(1, Math.floor(Number(row.cosmeticAmount || row.amount) || 1));
      }

      let blockId = Math.floor(Number(row.blockId) || 0);
      if (!blockId) {
        blockId = parseBlockRef(row.blockKey || row.block || "");
      }
      if (blockId > 0) {
        out.blockId = blockId;
        out.blockAmount = Math.max(1, Math.floor(Number(row.blockAmount || row.amount) || 1));
      }

      return Object.keys(out).length ? out : null;
    }

    function describeQuestReward(reward) {
      const row = reward && typeof reward === "object" ? reward : null;
      if (!row) return "";
      const parts = [];
      const gems = Math.max(0, Math.floor(Number(row.gems) || 0));
      if (gems > 0) parts.push(gems + " gems");
      const blockId = Math.floor(Number(row.blockId) || 0);
      const blockAmount = Math.max(1, Math.floor(Number(row.blockAmount) || 1));
      if (blockId > 0) parts.push(blockAmount + "x " + getBlockNameById(blockId));
      const cosmeticId = String(row.cosmeticId || "").trim();
      const cosmeticAmount = Math.max(1, Math.floor(Number(row.cosmeticAmount) || 1));
      if (cosmeticId) parts.push(cosmeticAmount + "x " + cosmeticId);
      const titleId = String(row.titleId || "").trim();
      if (titleId) parts.push("title " + titleId);
      return parts.join(", ");
    }

    function normalizeQuestRow(value, index) {
      const row = value && typeof value === "object" ? value : {};
      const fallbackId = "quest_" + Math.max(1, index + 1);
      const objective = normalizeQuestObjective(row.objective || row.requirement || {});
      const reward = normalizeQuestReward(row.reward || row.rewards || {});
      const id = normalizeQuestId(row.id, fallbackId);
      const title = String(row.title || row.name || id).trim().slice(0, 80) || id;
      const description = String(row.description || "Quest objective placeholder.").trim().slice(0, 320) || "Quest objective placeholder.";
      const rewardTextRaw = typeof row.rewardText === "string"
        ? row.rewardText
        : (typeof row.reward === "string" ? row.reward : "");
      const rewardText = String(rewardTextRaw || describeQuestReward(reward) || "Reward placeholder").trim().slice(0, 180) || "Reward placeholder";
      return { id, title, description, rewardText, objective, reward };
    }

    function normalizeQuestList(value, fallbackToDefaults) {
      const src = Array.isArray(value) ? value : [];
      const out = [];
      const used = new Set();
      for (let i = 0; i < src.length; i++) {
        const row = normalizeQuestRow(src[i], i);
        if (!row.id || used.has(row.id)) continue;
        used.add(row.id);
        out.push(row);
      }
      if (!out.length && fallbackToDefaults) {
        const defaults = buildDefaultQuestPaths();
        const defaultRows = defaults[0] && defaults[0].quests ? defaults[0].quests : [];
        for (let i = 0; i < defaultRows.length; i++) {
          const row = normalizeQuestRow(defaultRows[i], i);
          if (!row.id || used.has(row.id)) continue;
          used.add(row.id);
          out.push(row);
        }
      }
      return out;
    }

    function normalizeQuestPath(value, fallbackId, fallbackName) {
      const row = value && typeof value === "object" ? value : {};
      const id = normalizePathId(row.id || fallbackId || DEFAULT_PATH_ID) || DEFAULT_PATH_ID;
      const name = String(row.name || row.title || fallbackName || id).trim().slice(0, 80) || id;
      return {
        id,
        name,
        quests: normalizeQuestList(row.quests, false),
        updatedAt: Number(row.updatedAt) || 0,
        updatedByName: String(row.updatedByName || "").trim().slice(0, 20),
        updatedByAccountId: String(row.updatedByAccountId || "").trim().slice(0, 64)
      };
    }

    function resetQuestPathsToDefaults() {
      questPathsById.clear();
      const defaults = buildDefaultQuestPaths();
      for (let i = 0; i < defaults.length; i++) {
        const normalized = normalizeQuestPath(defaults[i], defaults[i] && defaults[i].id, defaults[i] && defaults[i].name);
        if (!normalized.id) continue;
        questPathsById.set(normalized.id, normalized);
      }
    }

    function applyQuestPathsSnapshot(value) {
      const src = value && typeof value === "object" ? value : {};
      const next = new Map();
      const defaults = buildDefaultQuestPaths();
      for (let i = 0; i < defaults.length; i++) {
        const normalizedDefault = normalizeQuestPath(defaults[i], defaults[i] && defaults[i].id, defaults[i] && defaults[i].name);
        if (!normalizedDefault.id) continue;
        next.set(normalizedDefault.id, normalizedDefault);
      }
      const keys = Object.keys(src);
      for (let i = 0; i < keys.length; i++) {
        const key = normalizePathId(keys[i]);
        if (!key) continue;
        const normalized = normalizeQuestPath(src[keys[i]], key, key);
        if (!normalized.id) continue;
        next.set(normalized.id, normalized);
      }
      questPathsById.clear();
      next.forEach((row, id) => questPathsById.set(id, row));
      if (modalCtx) renderModal();
    }

    function listQuestPaths() {
      const rows = Array.from(questPathsById.values());
      rows.sort((a, b) => String(a.id || "").localeCompare(String(b.id || "")));
      return rows.map((row) => ({
        id: row.id,
        name: row.name,
        questsCount: Array.isArray(row.quests) ? row.quests.length : 0
      }));
    }

    function getQuestPathById(pathId) {
      const id = normalizePathId(pathId);
      if (!id) return null;
      return questPathsById.get(id) || null;
    }

    function normalizeWorldConfig(value) {
      if (!value || typeof value !== "object") return null;
      const enabled = value.enabled !== false;
      if (!enabled) return null;
      const tx = Math.floor(Number(value.npcTx) || 0);
      const ty = Math.floor(Number(value.npcTy) || 0);
      return {
        enabled: true,
        npcTx: tx,
        npcTy: ty,
        questPathId: normalizePathId(value.questPathId || value.pathId || ""),
        quests: normalizeQuestList(value.quests, false),
        updatedAt: Number(value.updatedAt) || 0,
        updatedByName: String(value.updatedByName || "").trim().slice(0, 20),
        updatedByAccountId: String(value.updatedByAccountId || "").trim().slice(0, 64)
      };
    }

    function buildWorldConfigPayload(config) {
      const row = config && typeof config === "object" ? config : {};
      const payload = {
        enabled: true,
        npcTx: Math.max(0, Math.floor(Number(row.npcTx) || 0)),
        npcTy: Math.max(0, Math.floor(Number(row.npcTy) || 0)),
        questPathId: normalizePathId(row.questPathId || ""),
        updatedAt: getServerTimestampOrNow(),
        updatedByName: String(get("getPlayerName", "") || "").slice(0, 20),
        updatedByAccountId: String(get("getPlayerProfileId", "") || "").slice(0, 64)
      };
      const legacyQuests = normalizeQuestList(row.quests, false);
      if (!payload.questPathId && legacyQuests.length) {
        payload.quests = legacyQuests;
      }
      return payload;
    }

    function buildQuestPathPayload(pathRow) {
      const normalized = normalizeQuestPath(pathRow, pathRow && pathRow.id, pathRow && pathRow.name);
      return {
        id: normalized.id,
        name: normalized.name,
        quests: normalized.quests,
        updatedAt: getServerTimestampOrNow(),
        updatedByName: String(get("getPlayerName", "") || "").slice(0, 20),
        updatedByAccountId: String(get("getPlayerProfileId", "") || "").slice(0, 64)
      };
    }

    function getOrCreatePlayerQuestState(worldId) {
      const safeWorldId = normalizeWorldId(worldId);
      if (!safeWorldId) {
        return {
          accepted: {},
          claimed: {},
          trackedId: "",
          activeQuestId: "",
          nextQuestIndex: 0,
          pathId: ""
        };
      }
      const existing = playerQuestStateByWorld.get(safeWorldId);
      if (existing && typeof existing === "object") {
        if (!existing.accepted || typeof existing.accepted !== "object") existing.accepted = {};
        if (!existing.claimed || typeof existing.claimed !== "object") existing.claimed = {};
        if (typeof existing.trackedId !== "string") existing.trackedId = "";
        if (typeof existing.activeQuestId !== "string") existing.activeQuestId = "";
        if (!Number.isFinite(existing.nextQuestIndex)) existing.nextQuestIndex = 0;
        if (typeof existing.pathId !== "string") existing.pathId = "";
        return existing;
      }
      const created = {
        accepted: {},
        claimed: {},
        trackedId: "",
        activeQuestId: "",
        nextQuestIndex: 0,
        pathId: ""
      };
      playerQuestStateByWorld.set(safeWorldId, created);
      return created;
    }

    function computeNextQuestIndex(rows, claimedMap) {
      const list = Array.isArray(rows) ? rows : [];
      const claimed = claimedMap && typeof claimedMap === "object" ? claimedMap : {};
      let index = 0;
      while (index < list.length) {
        const row = list[index] || {};
        const qid = String(row.id || "");
        if (!qid || !claimed[qid]) break;
        index++;
      }
      return Math.max(0, Math.min(list.length, index));
    }

    function getQuestChainRuntime(config, state) {
      const rows = resolveQuestListForConfig(config);
      const total = rows.length;
      const pathId = normalizePathId((config && config.questPathId) || "") || DEFAULT_PATH_ID;

      if (state.pathId !== pathId) {
        state.pathId = pathId;
        state.accepted = {};
        state.claimed = {};
        state.trackedId = "";
        state.activeQuestId = "";
        state.nextQuestIndex = 0;
      }

      const nextIndex = computeNextQuestIndex(rows, state.claimed);
      state.nextQuestIndex = nextIndex;

      const completed = nextIndex >= total;
      const currentQuest = completed ? null : (rows[nextIndex] || null);
      const currentQuestId = currentQuest ? String(currentQuest.id || "") : "";
      if (completed || !currentQuestId) {
        state.activeQuestId = "";
        state.trackedId = "";
      } else {
        if (state.accepted[currentQuestId] && !state.activeQuestId) {
          state.activeQuestId = currentQuestId;
        }
        if (state.activeQuestId && state.activeQuestId !== currentQuestId) {
          state.activeQuestId = "";
        }
        if (state.trackedId && state.trackedId !== currentQuestId) {
          state.trackedId = "";
        }
      }

      return {
        rows,
        total,
        nextIndex,
        completed,
        currentQuest,
        currentQuestId
      };
    }

    function setLocalWorldConfig(worldId, value) {
      const safeWorldId = normalizeWorldId(worldId);
      if (!safeWorldId) return;
      const normalized = normalizeWorldConfig(value);
      if (!normalized) {
        worldConfigById.delete(safeWorldId);
      } else {
        worldConfigById.set(safeWorldId, normalized);
      }
      if (safeWorldId === activeWorldId) {
        if (!normalized && modalCtx) {
          closeModal();
        } else if (modalCtx) {
          renderModal();
        }
      }
    }

    function getCurrentConfig() {
      if (!activeWorldId) return null;
      return worldConfigById.get(activeWorldId) || null;
    }

    function getCurrentQuestPathId() {
      const config = getCurrentConfig();
      if (!config) return "";
      const pathId = normalizePathId(config.questPathId || "");
      if (pathId) return pathId;
      return "";
    }

    function resolveQuestPathForConfig(config) {
      if (!config) return null;
      const pathId = normalizePathId(config.questPathId || "");
      if (!pathId) return null;
      return getQuestPathById(pathId);
    }

    function resolveQuestListForConfig(config) {
      const path = resolveQuestPathForConfig(config);
      if (path && Array.isArray(path.quests)) {
        return normalizeQuestList(path.quests, false);
      }
      if (Array.isArray(config && config.quests) && config.quests.length) {
        return normalizeQuestList(config.quests, false);
      }
      const fallbackPath = getQuestPathById(DEFAULT_PATH_ID);
      if (fallbackPath && Array.isArray(fallbackPath.quests) && fallbackPath.quests.length) {
        return normalizeQuestList(fallbackPath.quests, false);
      }
      return normalizeQuestList([], true);
    }

    function isActive() {
      return Boolean(getCurrentConfig());
    }

    function isQuestNpcTile(tx, ty) {
      const config = getCurrentConfig();
      if (!config) return false;
      const safeTx = Math.floor(Number(tx) || 0);
      const safeTy = Math.floor(Number(ty) || 0);
      if (safeTx !== config.npcTx || safeTy !== config.npcTy) return false;
      const world = getWorld();
      const questNpcId = getQuestNpcId();
      return Boolean(world && world[safeTy] && world[safeTy][safeTx] === questNpcId);
    }

    function getModalEls() {
      const modal = document.getElementById("questWorldModal");
      const title = document.getElementById("questWorldTitle");
      const body = document.getElementById("questWorldBody");
      const close = document.getElementById("questWorldCloseBtn");
      return { modal, title, body, close };
    }

    function ensureModalDom() {
      const existing = getModalEls();
      if (existing.modal && existing.title && existing.body && existing.close) {
        return existing;
      }
      const host = document.getElementById("gameShell") || document.body;
      if (!host) return existing;
      const wrap = document.createElement("div");
      wrap.innerHTML =
        '<div id="questWorldModal" class="vending-modal hidden">' +
          '<div class="vending-card sign-card">' +
            '<div class="vending-header">' +
              '<strong id="questWorldTitle">Quest Menu</strong>' +
              '<button id="questWorldCloseBtn" type="button">Close</button>' +
            "</div>" +
            '<div id="questWorldBody" class="vending-body"></div>' +
          "</div>" +
        "</div>";
      if (wrap.firstElementChild) host.appendChild(wrap.firstElementChild);
      return getModalEls();
    }

    function closeModal() {
      modalCtx = null;
      const els = ensureModalDom();
      if (els.modal) els.modal.classList.add("hidden");
    }

    function getQuestRowById(config, questId) {
      if (!config) return null;
      const rows = resolveQuestListForConfig(config);
      const safeId = String(questId || "").trim().toLowerCase();
      if (!safeId) return null;
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (!row || String(row.id || "").toLowerCase() !== safeId) continue;
        return row;
      }
      return null;
    }
    function getQuestObjectiveLabel(quest) {
      const objective = quest && quest.objective && typeof quest.objective === "object" ? quest.objective : null;
      if (!objective) return "";
      if (objective.type === "bring_block") {
        const amount = Math.max(1, Math.floor(Number(objective.amount) || 1));
        const blockId = Math.floor(Number(objective.blockId) || 0);
        return "Bring " + amount + "x " + getBlockNameById(blockId);
      }
      return "";
    }

    function getQuestObjectiveProgressLabel(quest) {
      const objective = quest && quest.objective && typeof quest.objective === "object" ? quest.objective : null;
      if (!objective) return "";
      if (objective.type === "bring_block") {
        const amount = Math.max(1, Math.floor(Number(objective.amount) || 1));
        const blockId = Math.floor(Number(objective.blockId) || 0);
        const have = getInventoryBlockCount(blockId);
        return "Progress: " + have + "/" + amount + " " + getBlockNameById(blockId);
      }
      return "";
    }

    function isOwnerRole() {
      return Boolean(call("hasOwnerRole"));
    }

    function renderOwnerControls() {
      return "";
    }

    function renderModal() {
      const els = ensureModalDom();
      if (!els.modal || !els.title || !els.body) return;
      if (!modalCtx) {
        els.modal.classList.add("hidden");
        return;
      }
      const config = getCurrentConfig();
      if (!config || !isQuestNpcTile(modalCtx.tx, modalCtx.ty)) {
        closeModal();
        return;
      }
      const state = getOrCreatePlayerQuestState(activeWorldId);
      const chain = getQuestChainRuntime(config, state);
      const currentPath = resolveQuestPathForConfig(config);
      const progressLine = chain.total
        ? (chain.completed ? "Path completed (" + chain.total + "/" + chain.total + ")." : ("Quest " + (chain.nextIndex + 1) + "/" + chain.total + "."))
        : "No quests configured.";
      const pathLine = currentPath
        ? (
            '<div class="vending-section">' +
              '<div class="vending-section-title">Quest Path</div>' +
              '<div class="sign-hint">' + esc(currentPath.name) + " (" + esc(currentPath.id) + ")</div>" +
              '<div class="sign-hint">' + esc(progressLine) + "</div>" +
            "</div>"
          )
        : (
            '<div class="vending-section">' +
              '<div class="vending-section-title">Quest Path</div>' +
              '<div class="sign-hint">' + esc(progressLine) + "</div>" +
            "</div>"
          );

      let listHtml = "";
      if (!chain.total) {
        listHtml =
          '<div class="vending-section">' +
            '<div class="vending-section-title">No quests configured</div>' +
            '<div class="sign-hint">Ask an owner admin to configure quest path data.</div>' +
          "</div>";
      } else if (chain.completed || !chain.currentQuest) {
        listHtml =
          '<div class="vending-section">' +
            '<div class="vending-section-title">Quest Path Complete</div>' +
            '<div class="sign-hint">You completed this quest chain.</div>' +
          "</div>";
      } else {
        const quest = chain.currentQuest;
        const qid = String(quest.id || "");
        const accepted = Boolean(state.accepted[qid]) && state.activeQuestId === qid;
        const tracked = state.trackedId === qid;
        const status = accepted ? (tracked ? "Accepted + Tracking" : "Accepted") : "Not accepted";
        const objectiveLabel = getQuestObjectiveLabel(quest);
        const progressLabel = getQuestObjectiveProgressLabel(quest);
        listHtml =
          '<div class="vending-section">' +
            '<div class="vending-section-title">' + esc(quest.title || qid) + "</div>" +
            '<div class="sign-hint">' + esc(quest.description || "Quest objective placeholder.") + "</div>" +
            (objectiveLabel ? ('<div class="sign-hint"><strong>Objective:</strong> ' + esc(objectiveLabel) + "</div>") : "") +
            (progressLabel ? ('<div class="sign-hint">' + esc(progressLabel) + "</div>") : "") +
            '<div class="sign-hint"><strong>' + esc(quest.rewardText || "Reward placeholder") + "</strong></div>" +
            '<div class="sign-hint">Status: ' + esc(status) + "</div>" +
            '<div class="vending-actions">' +
              '<button type="button" data-quest-act="accept" data-quest-id="' + esc(qid) + '"' + (accepted ? " disabled" : "") + '>Accept Quest</button>' +
              '<button type="button" data-quest-act="track" data-quest-id="' + esc(qid) + '"' + ((!accepted || tracked) ? " disabled" : "") + '>Track Quest</button>' +
              '<button type="button" data-quest-act="claim" data-quest-id="' + esc(qid) + '"' + (!accepted ? " disabled" : "") + '>Claim Reward</button>' +
            "</div>" +
          "</div>";
      }
      els.title.textContent = "Quest Menu (" + modalCtx.tx + "," + modalCtx.ty + ")";
      els.body.innerHTML = pathLine + listHtml + renderOwnerControls(config);
      els.modal.classList.remove("hidden");
    }

    function acceptQuest(questId) {
      const config = getCurrentConfig();
      if (!config) return false;
      const state = getOrCreatePlayerQuestState(activeWorldId);
      const chain = getQuestChainRuntime(config, state);
      if (chain.completed || !chain.currentQuest) {
        call("postLocalSystemChat", "This quest path is already completed.");
        return true;
      }
      const qid = String(chain.currentQuestId || "");
      if (!qid) return false;
      if (String(questId || "").trim().toLowerCase() !== qid.toLowerCase()) {
        call("postLocalSystemChat", "Complete quests in order. Only the current chain quest can be accepted.");
        return true;
      }
      if (state.accepted[qid] && state.activeQuestId === qid) {
        call("postLocalSystemChat", "Quest already accepted: " + (chain.currentQuest.title || qid) + ".");
        return true;
      }
      state.activeQuestId = qid;
      state.accepted[qid] = true;
      state.trackedId = qid;
      call("postLocalSystemChat", "Accepted quest: " + (chain.currentQuest.title || qid) + ".");
      renderModal();
      return true;
    }

    function trackQuest(questId) {
      const config = getCurrentConfig();
      if (!config) return false;
      const state = getOrCreatePlayerQuestState(activeWorldId);
      const chain = getQuestChainRuntime(config, state);
      if (chain.completed || !chain.currentQuest) {
        call("postLocalSystemChat", "This quest path is already completed.");
        return true;
      }
      const qid = String(chain.currentQuestId || "");
      if (!qid) return false;
      if (String(questId || "").trim().toLowerCase() !== qid.toLowerCase()) {
        call("postLocalSystemChat", "Only the current chain quest can be tracked.");
        return true;
      }
      if (!(state.accepted[qid] && state.activeQuestId === qid)) {
        call("postLocalSystemChat", "Accept the current quest first.");
        return true;
      }
      state.trackedId = qid;
      call("postLocalSystemChat", "Tracking quest: " + (chain.currentQuest.title || qid) + ".");
      renderModal();
      return true;
    }

    function fulfillQuestObjective(quest) {
      const objective = quest && quest.objective && typeof quest.objective === "object" ? quest.objective : null;
      if (!objective) return { ok: true, consumeMessage: "" };
      if (objective.type === "bring_block") {
        const blockId = Math.floor(Number(objective.blockId) || 0);
        const amount = Math.max(1, Math.floor(Number(objective.amount) || 1));
        const have = getInventoryBlockCount(blockId);
        const blockName = getBlockNameById(blockId);
        if (have < amount) {
          return {
            ok: false,
            message: "Bring " + amount + "x " + blockName + " first (" + have + "/" + amount + ")."
          };
        }
        if (!consumeInventoryBlock(blockId, amount)) {
          return {
            ok: false,
            message: "Failed to consume required items for this quest."
          };
        }
        return {
          ok: true,
          consumeMessage: "Turned in " + amount + "x " + blockName + "."
        };
      }
      return { ok: true, consumeMessage: "" };
    }

    function grantQuestReward(quest) {
      const reward = quest && quest.reward && typeof quest.reward === "object" ? quest.reward : null;
      if (!reward) {
        return {
          ok: true,
          rewardText: String(quest && quest.rewardText || "").trim()
        };
      }
      const tx = modalCtx && Number.isFinite(Number(modalCtx.tx)) ? Math.floor(Number(modalCtx.tx)) : 0;
      const ty = modalCtx && Number.isFinite(Number(modalCtx.ty)) ? Math.floor(Number(modalCtx.ty)) : 0;
      const result = call("grantQuestReward", reward, {
        questId: String(quest && quest.id || ""),
        worldId: activeWorldId,
        tx,
        ty
      });
      if (result && typeof result === "object" && result.ok === false) {
        return {
          ok: false,
          message: String(result.message || "Failed to grant quest reward.")
        };
      }
      const rewardText = result && typeof result === "object" && typeof result.rewardText === "string"
        ? String(result.rewardText).trim()
        : describeQuestReward(reward);
      return {
        ok: true,
        rewardText: rewardText || String(quest && quest.rewardText || "").trim()
      };
    }

    function claimQuest(questId) {
      const config = getCurrentConfig();
      if (!config) return false;
      const state = getOrCreatePlayerQuestState(activeWorldId);
      const chain = getQuestChainRuntime(config, state);
      if (chain.completed || !chain.currentQuest) {
        call("postLocalSystemChat", "This quest path is already completed.");
        return true;
      }
      const quest = chain.currentQuest;
      const qid = String(chain.currentQuestId || "");
      if (!qid) return false;
      if (String(questId || "").trim().toLowerCase() !== qid.toLowerCase()) {
        call("postLocalSystemChat", "Only the current chain quest can be claimed.");
        return true;
      }
      if (!(state.accepted[qid] && state.activeQuestId === qid)) {
        call("postLocalSystemChat", "Accept the quest first.");
        return true;
      }
      if (state.claimed[qid]) {
        call("postLocalSystemChat", "Quest reward already claimed.");
        return true;
      }
      const objectiveResult = fulfillQuestObjective(quest);
      if (!objectiveResult.ok) {
        call("postLocalSystemChat", objectiveResult.message || "Quest objective is not completed yet.");
        renderModal();
        return true;
      }
      const rewardResult = grantQuestReward(quest);
      if (!rewardResult.ok) {
        call("postLocalSystemChat", rewardResult.message || "Failed to grant quest reward.");
        renderModal();
        return true;
      }
      state.claimed[qid] = true;
      if (objectiveResult.consumeMessage) {
        call("postLocalSystemChat", objectiveResult.consumeMessage);
      }
      state.accepted[qid] = false;
      state.activeQuestId = "";
      state.trackedId = "";

      const afterChain = getQuestChainRuntime(config, state);
      const rewardSuffix = rewardResult.rewardText ? (" -> " + rewardResult.rewardText) : "";
      call("postLocalSystemChat", "Claimed reward for " + (quest.title || qid) + rewardSuffix + ".");
      if (afterChain.completed) {
        call("postLocalSystemChat", "Quest path complete. You earned the final chain reward.");
      } else if (afterChain.currentQuest) {
        call("postLocalSystemChat", "Next quest unlocked: " + (afterChain.currentQuest.title || afterChain.currentQuestId) + ".");
      }
      renderModal();
      return true;
    }
    function upsertPath(pathId, nextRow) {
      const safePathId = normalizePathId(pathId);
      if (!safePathId) return null;
      const existing = getQuestPathById(safePathId);
      const merged = normalizeQuestPath({
        ...(existing || {}),
        ...(nextRow || {}),
        id: safePathId
      }, safePathId, (existing && existing.name) || safePathId);
      questPathsById.set(safePathId, merged);
      const ref = getQuestPathRef(safePathId);
      if (ref) {
        const payload = buildQuestPathPayload(merged);
        ref.set(payload).catch(() => {});
      }
      return merged;
    }

    function ensurePath(pathId) {
      const safePathId = normalizePathId(pathId);
      if (!safePathId) return null;
      const existing = getQuestPathById(safePathId);
      if (existing) return existing;
      const name = safePathId
        .split("_")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
      return upsertPath(safePathId, { id: safePathId, name: name || safePathId, quests: [] });
    }

    function setWorldQuestPath(pathId) {
      const worldId = getCurrentWorldId();
      if (!worldId) return { ok: false, reason: "no_world" };
      const config = getCurrentConfig();
      if (!config) return { ok: false, reason: "quest_world_not_enabled" };
      const safePathId = normalizePathId(pathId);
      if (!safePathId) return { ok: false, reason: "invalid_path" };
      const ensured = ensurePath(safePathId);
      if (!ensured) return { ok: false, reason: "invalid_path" };
      const next = normalizeWorldConfig({
        ...config,
        questPathId: safePathId,
        updatedAt: Date.now(),
        updatedByName: String(get("getPlayerName", "") || "").slice(0, 20),
        updatedByAccountId: String(get("getPlayerProfileId", "") || "").slice(0, 64)
      });
      setLocalWorldConfig(worldId, next);
      const ref = getQuestWorldRef(worldId);
      if (ref && next) {
        ref.set(buildWorldConfigPayload(next)).catch(() => {});
      }
      if (modalCtx) renderModal();
      return { ok: true, worldId, pathId: safePathId };
    }

    function addFetchQuestToPath(pathId, blockRef, amount, title, description, rewardText) {
      const rawPathId = String(pathId || "").trim().toLowerCase();
      let safePathId = normalizePathId(rawPathId);
      if (!safePathId || safePathId === "current") {
        safePathId = getCurrentQuestPathId() || DEFAULT_PATH_ID;
      }
      if (!safePathId) return { ok: false, reason: "invalid_path" };
      const blockId = parseBlockRef(blockRef);
      if (!blockId) return { ok: false, reason: "invalid_block" };
      const safeAmount = Math.max(1, Math.floor(Number(amount) || 0));
      if (!safeAmount) return { ok: false, reason: "invalid_amount" };

      const path = ensurePath(safePathId);
      if (!path) return { ok: false, reason: "invalid_path" };
      const nextQuests = Array.isArray(path.quests) ? path.quests.slice() : [];
      const safeTitle = String(title || "").trim() || ("Bring me " + safeAmount + " " + getBlockNameById(blockId) + " blocks");
      const safeDescription = String(description || "").trim() || ("Bring " + safeAmount + "x " + getBlockNameById(blockId) + " to this quest NPC.");
      const safeRewardText = String(rewardText || "").trim() || "Reward placeholder";
      const questIdSeed = "bring_" + blockId + "_" + safeAmount + "_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7);
      const row = normalizeQuestRow({
        id: questIdSeed,
        title: safeTitle,
        description: safeDescription,
        rewardText: safeRewardText,
        objective: {
          type: "bring_block",
          blockId,
          amount: safeAmount
        }
      }, nextQuests.length);
      nextQuests.push(row);
      const updatedPath = upsertPath(safePathId, {
        ...path,
        quests: nextQuests
      });
      if (!updatedPath) return { ok: false, reason: "save_failed" };
      if (modalCtx) renderModal();
      return {
        ok: true,
        pathId: safePathId,
        quest: row
      };
    }

    function handleOwnerSetPathFromModal() {
      if (!isOwnerRole()) return;
      const typedInput = document.getElementById("questWorldPathInput");
      const selectInput = document.getElementById("questWorldPathSelect");
      const typed = typedInput ? String(typedInput.value || "").trim() : "";
      const selected = selectInput ? String(selectInput.value || "").trim() : "";
      const nextPathId = normalizePathId(typed || selected);
      if (!nextPathId) {
        call("postLocalSystemChat", "Invalid quest path id.");
        return;
      }
      const result = setWorldQuestPath(nextPathId);
      if (!result || !result.ok) {
        call("postLocalSystemChat", "Failed to set quest path.");
        return;
      }
      call("postLocalSystemChat", "Quest path set to " + result.pathId + " for this world.");
      renderModal();
    }

    function handleOwnerAddFetchFromModal() {
      if (!isOwnerRole()) return;
      const pathInput = document.getElementById("questWorldFetchPathInput");
      const blockInput = document.getElementById("questWorldFetchBlockInput");
      const amountInput = document.getElementById("questWorldFetchAmountInput");
      const titleInput = document.getElementById("questWorldFetchTitleInput");
      const descInput = document.getElementById("questWorldFetchDescriptionInput");
      const rewardInput = document.getElementById("questWorldFetchRewardInput");
      const pathId = pathInput ? String(pathInput.value || "").trim() : "current";
      const blockRef = blockInput ? String(blockInput.value || "").trim() : "";
      const amount = amountInput ? Number(amountInput.value) : 0;
      const title = titleInput ? String(titleInput.value || "").trim() : "";
      const description = descInput ? String(descInput.value || "").trim() : "";
      const rewardText = rewardInput ? String(rewardInput.value || "").trim() : "";
      const result = addFetchQuestToPath(pathId, blockRef, amount, title, description, rewardText);
      if (!result || !result.ok) {
        call("postLocalSystemChat", "Failed to add fetch quest. Check path, block, and amount.");
        return;
      }
      const currentPath = getCurrentQuestPathId();
      if (currentPath === result.pathId) {
        renderModal();
      }
      call("postLocalSystemChat", "Added fetch quest to path " + result.pathId + ": " + (result.quest && result.quest.title ? result.quest.title : "quest") + ".");
    }

    function bindModalEvents() {
      if (domBound) return;
      const els = ensureModalDom();
      if (!els.modal || !els.body || !els.close) return;
      domBound = true;
      els.close.addEventListener("click", closeModal);
      els.modal.addEventListener("click", (event) => {
        if (!event || !event.target) return;
        if (event.target === els.modal) closeModal();
      });
      els.body.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const act = String(target.dataset.questAct || "");
        const questId = String(target.dataset.questId || "");
        if (act && questId) {
          if (act === "accept") {
            acceptQuest(questId);
            return;
          }
          if (act === "track") {
            trackQuest(questId);
            return;
          }
          if (act === "claim") {
            claimQuest(questId);
            return;
          }
        }
        const adminAct = String(target.dataset.questAdminAct || "");
        if (!adminAct) return;
        if (adminAct === "set-path") {
          handleOwnerSetPathFromModal();
          return;
        }
        if (adminAct === "add-fetch") {
          handleOwnerAddFetchFromModal();
        }
      });
    }
    function detachWorldConfigListener() {
      if (questWorldRef && questWorldHandler) {
        questWorldRef.off("value", questWorldHandler);
      }
      questWorldRef = null;
      questWorldHandler = null;
    }

    function detachQuestPathsListener() {
      if (questPathsRef && questPathsHandler) {
        questPathsRef.off("value", questPathsHandler);
      }
      questPathsRef = null;
      questPathsHandler = null;
    }

    function attachQuestPathsListener() {
      if (questPathsRef && questPathsHandler) return;
      const ref = getQuestPathsRef();
      if (!ref) return;
      questPathsRef = ref;
      questPathsHandler = (snapshot) => {
        const raw = snapshot && typeof snapshot.val === "function" ? snapshot.val() : null;
        applyQuestPathsSnapshot(raw);
      };
      ref.on("value", questPathsHandler);
    }

    function attachWorldConfigListener(worldId) {
      detachWorldConfigListener();
      const safeWorldId = normalizeWorldId(worldId);
      if (!safeWorldId) return;
      const ref = getQuestWorldRef(safeWorldId);
      if (!ref) return;
      questWorldRef = ref;
      questWorldHandler = (snapshot) => {
        const raw = snapshot && typeof snapshot.val === "function" ? snapshot.val() : null;
        setLocalWorldConfig(safeWorldId, raw);
      };
      ref.on("value", questWorldHandler);
    }

    function onWorldEnter(worldId) {
      activeWorldId = normalizeWorldId(worldId);
      bindModalEvents();
      closeModal();
      attachQuestPathsListener();
      attachWorldConfigListener(activeWorldId);
    }

    function onWorldLeave() {
      closeModal();
      detachWorldConfigListener();
      activeWorldId = "";
    }

    function enableWorld(tx, ty) {
      const worldId = getCurrentWorldId();
      const world = getWorld();
      const size = getWorldSize();
      if (!worldId || !world) return { ok: false, reason: "no_world" };
      const safeTx = Math.floor(Number(tx) || 0);
      const safeTy = Math.floor(Number(ty) || 0);
      if (safeTx < 0 || safeTy < 0 || safeTx >= size.w || safeTy >= size.h) {
        return { ok: false, reason: "out_of_bounds" };
      }
      const questNpcId = getQuestNpcId();
      const previous = worldConfigById.get(worldId);
      if (previous && Number.isInteger(previous.npcTx) && Number.isInteger(previous.npcTy)) {
        const oldTx = Math.floor(Number(previous.npcTx) || 0);
        const oldTy = Math.floor(Number(previous.npcTy) || 0);
        if ((oldTx !== safeTx || oldTy !== safeTy) && world[oldTy] && world[oldTy][oldTx] === questNpcId) {
          world[oldTy][oldTx] = 0;
          call("clearTileDamage", oldTx, oldTy);
          call("syncBlock", oldTx, oldTy, 0);
        }
      }
      if (!world[safeTy]) return { ok: false, reason: "invalid_row" };
      world[safeTy][safeTx] = questNpcId;
      call("clearTileDamage", safeTx, safeTy);
      call("syncBlock", safeTx, safeTy, questNpcId);

      let nextPathId = normalizePathId(previous && previous.questPathId);
      const hasLegacyInline = Boolean(previous && Array.isArray(previous.quests) && previous.quests.length);
      if (!nextPathId && !hasLegacyInline) {
        nextPathId = DEFAULT_PATH_ID;
        ensurePath(nextPathId);
      }

      const payload = normalizeWorldConfig({
        enabled: true,
        npcTx: safeTx,
        npcTy: safeTy,
        questPathId: nextPathId,
        quests: hasLegacyInline ? previous.quests : [],
        updatedAt: Date.now(),
        updatedByName: String(get("getPlayerName", "") || "").slice(0, 20),
        updatedByAccountId: String(get("getPlayerProfileId", "") || "").slice(0, 64)
      });
      setLocalWorldConfig(worldId, payload);
      const ref = getQuestWorldRef(worldId);
      if (ref && payload) {
        ref.set(buildWorldConfigPayload(payload)).catch(() => {});
      }
      call("respawnPlayerAtDoor");
      return { ok: true, tx: safeTx, ty: safeTy, worldId };
    }

    function disableWorld() {
      const worldId = getCurrentWorldId();
      const world = getWorld();
      if (!worldId) return { ok: false, reason: "no_world" };
      const config = worldConfigById.get(worldId);
      const questNpcId = getQuestNpcId();
      if (world && config && Number.isInteger(config.npcTx) && Number.isInteger(config.npcTy)) {
        const tx = Math.floor(Number(config.npcTx) || 0);
        const ty = Math.floor(Number(config.npcTy) || 0);
        if (world[ty] && world[ty][tx] === questNpcId) {
          world[ty][tx] = 0;
          call("clearTileDamage", tx, ty);
          call("syncBlock", tx, ty, 0);
        }
      }
      setLocalWorldConfig(worldId, null);
      const ref = getQuestWorldRef(worldId);
      if (ref) ref.remove().catch(() => {});
      closeModal();
      return { ok: true, worldId };
    }

    function onNpcBroken(tx, ty) {
      const config = getCurrentConfig();
      if (!config) return false;
      const safeTx = Math.floor(Number(tx) || 0);
      const safeTy = Math.floor(Number(ty) || 0);
      if (safeTx !== config.npcTx || safeTy !== config.npcTy) return false;
      const worldId = getCurrentWorldId();
      if (!worldId) return false;
      setLocalWorldConfig(worldId, null);
      const ref = getQuestWorldRef(worldId);
      if (ref) ref.remove().catch(() => {});
      closeModal();
      return true;
    }

    function interact(tx, ty) {
      const safeTx = Math.floor(Number(tx) || 0);
      const safeTy = Math.floor(Number(ty) || 0);
      if (!isQuestNpcTile(safeTx, safeTy)) return false;
      bindModalEvents();
      modalCtx = { tx: safeTx, ty: safeTy };
      renderModal();
      return true;
    }

    function clearAll() {
      closeModal();
      detachWorldConfigListener();
      detachQuestPathsListener();
      activeWorldId = "";
      worldConfigById.clear();
      playerQuestStateByWorld.clear();
      resetQuestPathsToDefaults();
    }

    resetQuestPathsToDefaults();

    return {
      bindModalEvents,
      onWorldEnter,
      onWorldLeave,
      getCurrentConfig,
      getCurrentQuestPathId,
      isActive,
      isQuestNpcTile,
      enableWorld,
      disableWorld,
      setWorldQuestPath,
      addFetchQuestToPath,
      listQuestPaths,
      onNpcBroken,
      interact,
      closeModal,
      clearAll
    };
  }

  return {
    createController
  };
})();
