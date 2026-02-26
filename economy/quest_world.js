window.GTModules = window.GTModules || {};

window.GTModules.questWorld = (function createQuestWorldModule() {
  function createController(options) {
    const opts = options || {};
    const worldConfigById = new Map();
    const playerQuestStateByWorld = new Map();
    let activeWorldId = "";
    let questWorldRef = null;
    let questWorldHandler = null;
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

    function buildDefaultQuestList() {
      return [
        {
          id: "ring_master_trial",
          title: "Ring Master Trial",
          description: "Break 10 blocks in this quest world.",
          rewardText: "Reward: 1x World Lock"
        },
        {
          id: "carnival_hustle",
          title: "Carnival Hustle",
          description: "Collect 20 dropped blocks.",
          rewardText: "Reward: 200 Gems"
        },
        {
          id: "legendary_wizard_path",
          title: "Legendary Wizard Path",
          description: "Harvest 5 trees.",
          rewardText: "Reward: 1x Mystery Block"
        }
      ];
    }

    function normalizeQuestRow(value, index) {
      const row = value && typeof value === "object" ? value : {};
      const fallbackId = "quest_" + Math.max(1, index + 1);
      const id = String(row.id || fallbackId).trim().toLowerCase().replace(/[^a-z0-9_-]/g, "_").slice(0, 40) || fallbackId;
      const title = String(row.title || row.name || id).trim().slice(0, 60) || id;
      const description = String(row.description || "Quest objective placeholder.").trim().slice(0, 220) || "Quest objective placeholder.";
      const rewardText = String(row.rewardText || row.reward || "Reward placeholder").trim().slice(0, 120) || "Reward placeholder";
      return { id, title, description, rewardText };
    }

    function normalizeQuestList(value) {
      const src = Array.isArray(value) ? value : [];
      const out = [];
      const used = new Set();
      for (let i = 0; i < src.length; i++) {
        const row = normalizeQuestRow(src[i], i);
        if (!row.id || used.has(row.id)) continue;
        used.add(row.id);
        out.push(row);
      }
      if (!out.length) {
        const fallback = buildDefaultQuestList();
        for (let i = 0; i < fallback.length; i++) {
          const row = normalizeQuestRow(fallback[i], i);
          if (!row.id || used.has(row.id)) continue;
          used.add(row.id);
          out.push(row);
        }
      }
      return out;
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
        quests: normalizeQuestList(value.quests),
        updatedAt: Number(value.updatedAt) || 0,
        updatedByName: String(value.updatedByName || "").trim().slice(0, 20),
        updatedByAccountId: String(value.updatedByAccountId || "").trim().slice(0, 64)
      };
    }

    function getOrCreatePlayerQuestState(worldId) {
      const safeWorldId = normalizeWorldId(worldId);
      if (!safeWorldId) {
        return { accepted: {}, claimed: {}, trackedId: "" };
      }
      const existing = playerQuestStateByWorld.get(safeWorldId);
      if (existing && typeof existing === "object") return existing;
      const created = { accepted: {}, claimed: {}, trackedId: "" };
      playerQuestStateByWorld.set(safeWorldId, created);
      return created;
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
      if (!config || !Array.isArray(config.quests)) return null;
      const safeId = String(questId || "").trim().toLowerCase();
      if (!safeId) return null;
      for (let i = 0; i < config.quests.length; i++) {
        const row = config.quests[i];
        if (!row || String(row.id || "").toLowerCase() !== safeId) continue;
        return row;
      }
      return null;
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
      const rows = Array.isArray(config.quests) ? config.quests : [];
      const listHtml = rows.length
        ? rows.map((quest) => {
            const qid = String(quest.id || "");
            const accepted = Boolean(state.accepted[qid]);
            const claimed = Boolean(state.claimed[qid]);
            const tracked = state.trackedId === qid;
            const status = claimed
              ? "Claimed"
              : (accepted ? (tracked ? "Accepted + Tracking" : "Accepted") : (tracked ? "Tracking (stub)" : "Not accepted"));
            return (
              '<div class="vending-section">' +
                '<div class="vending-section-title">' + esc(quest.title || qid) + "</div>" +
                '<div class="sign-hint">' + esc(quest.description || "Quest objective placeholder.") + "</div>" +
                '<div class="sign-hint"><strong>' + esc(quest.rewardText || "Reward placeholder") + "</strong></div>" +
                '<div class="sign-hint">Status: ' + esc(status) + "</div>" +
                '<div class="vending-actions">' +
                  '<button type="button" data-quest-act="accept" data-quest-id="' + esc(qid) + '"' + (accepted ? " disabled" : "") + '>Accept Quest</button>' +
                  '<button type="button" data-quest-act="track" data-quest-id="' + esc(qid) + '"' + (tracked ? " disabled" : "") + '>Track Quest</button>' +
                  '<button type="button" data-quest-act="claim" data-quest-id="' + esc(qid) + '"' + ((!accepted || claimed) ? " disabled" : "") + '>Claim Reward</button>' +
                "</div>" +
              "</div>"
            );
          }).join("")
        : (
          '<div class="vending-section">' +
            '<div class="vending-section-title">No quests configured</div>' +
            '<div class="sign-hint">Ask an owner admin to configure quest data.</div>' +
          "</div>"
        );
      els.title.textContent = "Quest Menu (" + modalCtx.tx + "," + modalCtx.ty + ")";
      els.body.innerHTML = listHtml;
      els.modal.classList.remove("hidden");
    }

    function acceptQuest(questId) {
      const config = getCurrentConfig();
      if (!config) return false;
      const quest = getQuestRowById(config, questId);
      if (!quest) return false;
      const state = getOrCreatePlayerQuestState(activeWorldId);
      const qid = String(quest.id || "");
      if (!qid) return false;
      if (state.accepted[qid]) {
        call("postLocalSystemChat", "Quest already accepted: " + (quest.title || qid) + ".");
        return true;
      }
      state.accepted[qid] = true;
      if (!state.trackedId) state.trackedId = qid;
      call("postLocalSystemChat", "Accepted quest: " + (quest.title || qid) + ".");
      renderModal();
      return true;
    }

    function trackQuest(questId) {
      const config = getCurrentConfig();
      if (!config) return false;
      const quest = getQuestRowById(config, questId);
      if (!quest) return false;
      const state = getOrCreatePlayerQuestState(activeWorldId);
      const qid = String(quest.id || "");
      if (!qid) return false;
      state.trackedId = qid;
      call("postLocalSystemChat", "Tracking quest: " + (quest.title || qid) + ".");
      renderModal();
      return true;
    }

    function claimQuest(questId) {
      const config = getCurrentConfig();
      if (!config) return false;
      const quest = getQuestRowById(config, questId);
      if (!quest) return false;
      const state = getOrCreatePlayerQuestState(activeWorldId);
      const qid = String(quest.id || "");
      if (!qid) return false;
      if (!state.accepted[qid]) {
        call("postLocalSystemChat", "Accept the quest first.");
        return true;
      }
      if (state.claimed[qid]) {
        call("postLocalSystemChat", "Quest reward already claimed.");
        return true;
      }
      state.claimed[qid] = true;
      call("postLocalSystemChat", "Claimed reward for " + (quest.title || qid) + " (stub).");
      renderModal();
      return true;
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
        if (!act || !questId) return;
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

      const payload = {
        enabled: true,
        npcTx: safeTx,
        npcTy: safeTy,
        quests: normalizeQuestList(previous && previous.quests),
        updatedAt: Date.now(),
        updatedByName: String(get("getPlayerName", "") || "").slice(0, 20),
        updatedByAccountId: String(get("getPlayerProfileId", "") || "").slice(0, 64)
      };
      setLocalWorldConfig(worldId, payload);
      const ref = getQuestWorldRef(worldId);
      if (ref) {
        ref.set({
          enabled: true,
          npcTx: safeTx,
          npcTy: safeTy,
          quests: payload.quests,
          updatedAt: getServerTimestampOrNow(),
          updatedByName: payload.updatedByName,
          updatedByAccountId: payload.updatedByAccountId
        }).catch(() => {});
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
      activeWorldId = "";
      worldConfigById.clear();
      playerQuestStateByWorld.clear();
    }

    return {
      bindModalEvents,
      onWorldEnter,
      onWorldLeave,
      getCurrentConfig,
      isActive,
      isQuestNpcTile,
      enableWorld,
      disableWorld,
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
