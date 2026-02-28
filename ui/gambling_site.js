window.GTModules = window.GTModules || {};

(function initGamblingSite() {
  "use strict";

  const SAVED_AUTH_KEY = "growtopia_saved_auth_v1";
  const LAST_WORLD_KEY = "gt_gambling_site_world_v1";

  const authModule = (window.GTModules && window.GTModules.auth) || {};
  const authStorageModule = (window.GTModules && window.GTModules.authStorage) || {};
  const dbModule = (window.GTModules && window.GTModules.db) || {};
  const slotsModule = (window.GTModules && window.GTModules.slots) || {};

  const MACHINE_DEFS = buildMachineDefinitions();
  const WORLD_LOCK_ITEM_ID = resolveWorldLockItemId();

  const state = {
    db: null,
    network: {},
    user: null,
    worldId: "",
    worldLock: null,
    ownerTax: null,
    machines: [],
    refs: {
      lock: null,
      machines: null,
      ownerTax: null,
      inventoryLocks: null
    },
    handlers: {
      lock: null,
      machines: null,
      ownerTax: null,
      inventoryLocks: null
    },
    machineSearch: "",
    walletLocks: 0,
    selectedSpectateTileKey: ""
  };

  const els = {
    openGameBtn: document.getElementById("openGameBtn"),
    logoutBtn: document.getElementById("logoutBtn"),
    authCard: document.getElementById("authCard"),
    authUsername: document.getElementById("authUsername"),
    authPassword: document.getElementById("authPassword"),
    authLoginBtn: document.getElementById("authLoginBtn"),
    authCreateBtn: document.getElementById("authCreateBtn"),
    authStatus: document.getElementById("authStatus"),
    sessionLabel: document.getElementById("sessionLabel"),
    scopeLabel: document.getElementById("scopeLabel"),
    lockAccessLabel: document.getElementById("lockAccessLabel"),
    dashboardCard: document.getElementById("dashboardCard"),
    worldInput: document.getElementById("worldInput"),
    loadWorldBtn: document.getElementById("loadWorldBtn"),
    refreshBtn: document.getElementById("refreshBtn"),
    machineSearch: document.getElementById("machineSearch"),
    sumMachines: document.getElementById("sumMachines"),
    sumBank: document.getElementById("sumBank"),
    sumMine: document.getElementById("sumMine"),
    sumWallet: document.getElementById("sumWallet"),
    sumTax: document.getElementById("sumTax"),
    taxControls: document.getElementById("taxControls"),
    taxPercentInput: document.getElementById("taxPercentInput"),
    saveTaxBtn: document.getElementById("saveTaxBtn"),
    machineTbody: document.getElementById("machineTbody"),
    machineEmpty: document.getElementById("machineEmpty"),
    spectateBody: document.getElementById("spectateBody")
  };

  function buildMachineDefinitions() {
    const slotsDefs = typeof slotsModule.getDefinitions === "function"
      ? slotsModule.getDefinitions()
      : {};
    const out = {
      reme_roulette: {
        id: "reme_roulette",
        name: "Reme Roulette",
        minBet: 1,
        maxBet: 30000
      },
      blackjack: {
        id: "blackjack",
        name: "Blackjack",
        minBet: 1,
        maxBet: 30000
      }
    };
    ["slots", "slots_v2", "slots_v3", "slots_v4", "slots_v6"].forEach((id) => {
      const row = slotsDefs && slotsDefs[id] ? slotsDefs[id] : {};
      out[id] = {
        id,
        name: String(row.name || id.replace(/_/g, " ")),
        minBet: Math.max(1, Math.floor(Number(row.minBet) || 1)),
        maxBet: Math.max(1, Math.floor(Number(row.maxBet) || 30000))
      };
    });
    return out;
  }

  function normalizeUsername(value) {
    return String(value || "").trim().toLowerCase();
  }

  function resolveWorldLockItemId() {
    const catalog = (window.GTModules && window.GTModules.itemCatalog) || {};
    if (typeof catalog.getBlocks === "function") {
      const rows = catalog.getBlocks();
      if (Array.isArray(rows)) {
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i] || {};
          if (String(row.key || "").trim() !== "world_lock") continue;
          const id = Math.floor(Number(row.id));
          if (Number.isInteger(id) && id > 0) return id;
        }
      }
    }
    return 9;
  }

  function normalizeWorldId(value) {
    return String(value || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^[-_]+|[-_]+$/g, "")
      .slice(0, 24);
  }

  function makeStatus(message, mode) {
    if (!(els.authStatus instanceof HTMLElement)) return;
    els.authStatus.textContent = String(message || "");
    els.authStatus.classList.remove("error", "ok");
    if (mode === "error") {
      els.authStatus.classList.add("error");
    } else if (mode === "ok") {
      els.authStatus.classList.add("ok");
    }
  }

  function setAuthBusy(isBusy) {
    const busy = Boolean(isBusy);
    if (els.authLoginBtn instanceof HTMLButtonElement) els.authLoginBtn.disabled = busy;
    if (els.authCreateBtn instanceof HTMLButtonElement) els.authCreateBtn.disabled = busy;
    if (els.authUsername instanceof HTMLInputElement) els.authUsername.disabled = busy;
    if (els.authPassword instanceof HTMLInputElement) els.authPassword.disabled = busy;
  }

  function setWorldBusy(isBusy) {
    const busy = Boolean(isBusy);
    if (els.loadWorldBtn instanceof HTMLButtonElement) els.loadWorldBtn.disabled = busy;
    if (els.refreshBtn instanceof HTMLButtonElement) els.refreshBtn.disabled = busy;
    if (els.worldInput instanceof HTMLInputElement) els.worldInput.disabled = busy;
  }

  function updateSessionUi() {
    const user = state.user;
    if (els.sessionLabel instanceof HTMLElement) {
      els.sessionLabel.textContent = user ? ("@" + user.username + " (" + user.accountId + ")") : "Not logged in";
    }
    if (els.scopeLabel instanceof HTMLElement) {
      els.scopeLabel.textContent = state.worldId ? state.worldId : "No world selected";
    }
    if (els.lockAccessLabel instanceof HTMLElement) {
      const lock = state.worldLock;
      if (!user || !lock || !lock.ownerAccountId) {
        els.lockAccessLabel.textContent = "No world lock context";
      } else if (isWorldLockOwner()) {
        els.lockAccessLabel.textContent = "World owner";
      } else if (isWorldLockAdmin()) {
        els.lockAccessLabel.textContent = "World admin";
      } else {
        els.lockAccessLabel.textContent = "Visitor";
      }
    }
    if (els.logoutBtn instanceof HTMLButtonElement) {
      els.logoutBtn.classList.toggle("hidden", !user);
    }
    if (els.dashboardCard instanceof HTMLElement) {
      els.dashboardCard.classList.toggle("hidden", !user);
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
        username: String(parsed && parsed.username || ""),
        password: String(parsed && parsed.password || "")
      };
    } catch (_error) {
      return { username: "", password: "" };
    }
  }

  function saveCredentials(username, password) {
    if (typeof authStorageModule.saveCredentials === "function") {
      authStorageModule.saveCredentials(SAVED_AUTH_KEY, username, password);
      return;
    }
    try {
      localStorage.setItem(SAVED_AUTH_KEY, JSON.stringify({
        username: String(username || "").slice(0, 20),
        password: String(password || "").slice(0, 64)
      }));
    } catch (_error) {
      // ignore localStorage write failures
    }
  }

  function loadLastWorld() {
    try {
      return normalizeWorldId(localStorage.getItem(LAST_WORLD_KEY) || "");
    } catch (_error) {
      return "";
    }
  }

  function saveLastWorld(worldId) {
    try {
      localStorage.setItem(LAST_WORLD_KEY, normalizeWorldId(worldId));
    } catch (_error) {
      // ignore
    }
  }

  async function ensureDb() {
    if (state.db) return state.db;
    if (typeof dbModule.getOrInitAuthDb !== "function") {
      throw new Error("DB module missing.");
    }
    const db = await dbModule.getOrInitAuthDb({
      network: state.network,
      firebaseRef: window.firebase,
      firebaseConfig: window.FIREBASE_CONFIG,
      getFirebaseApiKey: window.getFirebaseApiKey
    });
    state.db = db;
    return db;
  }

  function normalizeLockRecord(value) {
    if (!value || typeof value !== "object") return null;
    const ownerAccountId = String(value.ownerAccountId || "").trim();
    if (!ownerAccountId) return null;
    const adminsRaw = value.admins && typeof value.admins === "object" ? value.admins : {};
    const admins = {};
    Object.keys(adminsRaw).forEach((accountId) => {
      const safeId = String(accountId || "").trim();
      if (!safeId || safeId === ownerAccountId) return;
      const row = adminsRaw[accountId] && typeof adminsRaw[accountId] === "object" ? adminsRaw[accountId] : {};
      admins[safeId] = { username: normalizeUsername(row.username || "") };
    });
    return {
      ownerAccountId,
      ownerName: String(value.ownerName || "").trim().slice(0, 20),
      admins
    };
  }

  function normalizeOwnerTax(value) {
    if (!value || typeof value !== "object") return null;
    const percentRaw = value.taxPercent !== undefined ? value.taxPercent : value.percent;
    const txRaw = Math.floor(Number(value.tx));
    const tyRaw = Math.floor(Number(value.ty));
    return {
      percent: Math.max(0, Math.min(100, Math.floor(Number(percentRaw) || 0))),
      earningsLocks: Math.max(0, Math.floor(Number(value.earningsLocks) || 0)),
      tx: Number.isInteger(txRaw) ? txRaw : -1,
      ty: Number.isInteger(tyRaw) ? tyRaw : -1,
      ownerAccountId: String(value.ownerAccountId || "").trim(),
      ownerName: String(value.ownerName || "").trim().slice(0, 20)
    };
  }

  function normalizeMachineStats(value) {
    const row = value && typeof value === "object" ? value : {};
    return {
      plays: Math.max(0, Math.floor(Number(row.plays) || 0)),
      totalBet: Math.max(0, Math.floor(Number(row.totalBet) || 0)),
      totalPayout: Math.max(0, Math.floor(Number(row.totalPayout) || 0)),
      lastPlayerRoll: Math.max(0, Math.floor(Number(row.lastPlayerRoll) || 0)),
      lastHouseRoll: Math.max(0, Math.floor(Number(row.lastHouseRoll) || 0)),
      lastPlayerReme: Math.max(0, Math.floor(Number(row.lastPlayerReme) || 0)),
      lastHouseReme: Math.max(0, Math.floor(Number(row.lastHouseReme) || 0)),
      lastMultiplier: Math.max(0, Number(row.lastMultiplier) || 0),
      lastOutcome: String(row.lastOutcome || "").slice(0, 24),
      lastSlotsText: String(row.lastSlotsText || "").slice(0, 220),
      lastSlotsSummary: String(row.lastSlotsSummary || "").slice(0, 220),
      lastSlotsLines: String(row.lastSlotsLines || "").slice(0, 220),
      lastPlayerName: String(row.lastPlayerName || "").slice(0, 24),
      lastAt: Math.max(0, Math.floor(Number(row.lastAt) || 0))
    };
  }

  function normalizeBlackjackRound(value) {
    if (!value || typeof value !== "object") return null;
    const handsRaw = Array.isArray(value.hands) ? value.hands : [];
    const dealerCardsRaw = Array.isArray(value.dealerCards) ? value.dealerCards : [];
    return {
      active: Boolean(value.active),
      playerName: String(value.playerName || "").slice(0, 20),
      summary: String(value.summary || "").slice(0, 220),
      aggregateOutcome: String(value.aggregateOutcome || "").slice(0, 24),
      totalPayout: Math.max(0, Math.floor(Number(value.totalPayout) || 0)),
      dealerCards: dealerCardsRaw
        .map((n) => Math.max(1, Math.min(13, Math.floor(Number(n) || 1))))
        .slice(0, 16),
      hands: handsRaw.slice(0, 4).map((handRaw) => {
        const hand = handRaw && typeof handRaw === "object" ? handRaw : {};
        const cardsRaw = Array.isArray(hand.cards) ? hand.cards : [];
        return {
          cards: cardsRaw
            .map((n) => Math.max(1, Math.min(13, Math.floor(Number(n) || 1))))
            .slice(0, 16),
          bet: Math.max(1, Math.floor(Number(hand.bet) || 1)),
          done: Boolean(hand.done),
          outcome: String(hand.outcome || "").slice(0, 24),
          payout: Math.max(0, Math.floor(Number(hand.payout) || 0))
        };
      })
    };
  }

  function normalizeMachineRecord(tileKey, raw) {
    if (!raw || typeof raw !== "object") return null;
    const [txRaw, tyRaw] = String(tileKey || "").split("_");
    const tx = Math.floor(Number(txRaw));
    const ty = Math.floor(Number(tyRaw));
    if (!Number.isFinite(tx) || !Number.isFinite(ty)) return null;

    const typeId = String(raw.type || "reme_roulette").trim();
    const def = MACHINE_DEFS[typeId] || MACHINE_DEFS.reme_roulette;
    const maxBetRaw = Math.floor(Number(raw.maxBet));
    const maxBet = Math.max(def.minBet, Math.min(def.maxBet, Number.isFinite(maxBetRaw) ? maxBetRaw : def.maxBet));

    return {
      tileKey: String(tileKey || ""),
      tx,
      ty,
      type: def.id,
      typeName: def.name,
      minBet: def.minBet,
      hardMaxBet: def.maxBet,
      maxBet,
      ownerAccountId: String(raw.ownerAccountId || "").trim(),
      ownerName: String(raw.ownerName || "").trim().slice(0, 20),
      inUseAccountId: String(raw.inUseAccountId || "").trim(),
      inUseName: String(raw.inUseName || "").trim().slice(0, 20),
      earningsLocks: Math.max(0, Math.floor(Number(raw.earningsLocks) || 0)),
      updatedAt: Math.max(0, Math.floor(Number(raw.updatedAt) || 0)),
      stats: normalizeMachineStats(raw.stats),
      blackjackRound: normalizeBlackjackRound(raw.blackjackRound)
    };
  }

  function getMachineOwnerLabel(machine) {
    const name = String(machine.ownerName || "").trim();
    if (name) return "@" + name;
    return machine.ownerAccountId || "unknown";
  }

  function isWorldLocked() {
    return Boolean(state.worldLock && state.worldLock.ownerAccountId);
  }

  function isWorldLockOwner() {
    const user = state.user;
    return Boolean(user && state.worldLock && state.worldLock.ownerAccountId && state.worldLock.ownerAccountId === user.accountId);
  }

  function isWorldLockAdmin() {
    const user = state.user;
    if (!user || !state.worldLock || !state.worldLock.admins) return false;
    if (isWorldLockOwner()) return false;
    return Boolean(state.worldLock.admins[user.accountId]);
  }

  function canCollectMachine(machine) {
    const user = state.user;
    if (!user || !machine) return false;
    return Boolean(machine.ownerAccountId && machine.ownerAccountId === user.accountId);
  }

  function canEditMachineMaxBet(machine) {
    if (!machine || !state.user) return false;
    if (isWorldLocked()) {
      if (isWorldLockOwner()) return true;
      if (!canCollectMachine(machine)) return false;
      if (isWorldLockAdmin()) return false;
      return true;
    }
    return canCollectMachine(machine);
  }

  function detachWorldListeners() {
    if (state.refs.lock && state.handlers.lock) state.refs.lock.off("value", state.handlers.lock);
    if (state.refs.machines && state.handlers.machines) state.refs.machines.off("value", state.handlers.machines);
    if (state.refs.ownerTax && state.handlers.ownerTax) state.refs.ownerTax.off("value", state.handlers.ownerTax);
    if (state.refs.inventoryLocks && state.handlers.inventoryLocks) state.refs.inventoryLocks.off("value", state.handlers.inventoryLocks);

    state.refs.lock = null;
    state.refs.machines = null;
    state.refs.ownerTax = null;
    state.refs.inventoryLocks = null;
    state.handlers.lock = null;
    state.handlers.machines = null;
    state.handlers.ownerTax = null;
    state.handlers.inventoryLocks = null;
    state.worldLock = null;
    state.ownerTax = null;
    state.machines = [];
    state.walletLocks = 0;
    state.selectedSpectateTileKey = "";
  }

  function renderSummary() {
    const rows = Array.isArray(state.machines) ? state.machines : [];
    const me = state.user ? state.user.accountId : "";
    const totalBank = rows.reduce((sum, row) => sum + Math.max(0, Number(row.earningsLocks) || 0), 0);
    const mine = rows.filter((row) => row.ownerAccountId && row.ownerAccountId === me).length;
    const tax = state.ownerTax || { percent: 0, earningsLocks: 0 };

    if (els.sumMachines instanceof HTMLElement) els.sumMachines.textContent = String(rows.length);
    if (els.sumBank instanceof HTMLElement) els.sumBank.textContent = String(totalBank) + " WL";
    if (els.sumMine instanceof HTMLElement) els.sumMine.textContent = String(mine);
    if (els.sumWallet instanceof HTMLElement) els.sumWallet.textContent = String(state.walletLocks) + " WL";
    if (els.sumTax instanceof HTMLElement) els.sumTax.textContent = String(tax.percent) + "% / " + String(tax.earningsLocks) + " WL";
  }

  function renderScope() {
    updateSessionUi();
    const lock = state.worldLock;
    if (!state.worldId) {
      if (els.scopeLabel instanceof HTMLElement) els.scopeLabel.textContent = "No world selected";
      return;
    }
    if (els.scopeLabel instanceof HTMLElement) {
      if (!lock || !lock.ownerAccountId) {
        els.scopeLabel.textContent = state.worldId + " (unlocked)";
      } else {
        const ownerName = String(lock.ownerName || "").trim() || lock.ownerAccountId;
        els.scopeLabel.textContent = state.worldId + " (lock owner @" + ownerName + ")";
      }
    }
  }

  function renderMachines() {
    if (!(els.machineTbody instanceof HTMLElement) || !(els.machineEmpty instanceof HTMLElement)) return;
    els.machineTbody.innerHTML = "";

    const query = String(state.machineSearch || "").trim().toLowerCase();
    const rows = (Array.isArray(state.machines) ? state.machines : []).filter((row) => {
      if (!query) return true;
      const owner = (row.ownerName || row.ownerAccountId || "").toLowerCase();
      const type = String(row.typeName || row.type || "").toLowerCase();
      const tile = row.tx + "," + row.ty;
      return owner.includes(query) || type.includes(query) || tile.includes(query) || row.tileKey.includes(query);
    });

    if (!rows.length) {
      els.machineEmpty.classList.remove("hidden");
      return;
    }
    els.machineEmpty.classList.add("hidden");

    const frag = document.createDocumentFragment();

    rows.sort((a, b) => {
      if (a.ty !== b.ty) return a.ty - b.ty;
      return a.tx - b.tx;
    }).forEach((machine) => {
      const tr = document.createElement("tr");

      const tdTile = document.createElement("td");
      tdTile.textContent = machine.tx + ", " + machine.ty;

      const tdType = document.createElement("td");
      tdType.textContent = machine.typeName;

      const tdOwner = document.createElement("td");
      const ownerSpan = document.createElement("span");
      ownerSpan.className = "machine-owner" + (canCollectMachine(machine) ? " me" : "");
      ownerSpan.textContent = getMachineOwnerLabel(machine);
      tdOwner.appendChild(ownerSpan);

      const tdBank = document.createElement("td");
      tdBank.textContent = String(machine.earningsLocks) + " WL";

      const tdState = document.createElement("td");
      const stateTag = document.createElement("span");
      stateTag.className = "tag " + (machine.inUseAccountId ? "warn" : "good");
      stateTag.textContent = machine.inUseAccountId
        ? ("In use" + (machine.inUseName ? " by @" + machine.inUseName : ""))
        : "Idle";
      tdState.appendChild(stateTag);

      const tdMaxBet = document.createElement("td");
      const wrap = document.createElement("div");
      wrap.className = "machine-bet";
      const input = document.createElement("input");
      input.type = "number";
      input.min = String(machine.minBet);
      input.max = String(machine.hardMaxBet);
      input.step = "1";
      input.value = String(machine.maxBet);
      input.dataset.tileKey = machine.tileKey;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = "Save";
      btn.dataset.tileKey = machine.tileKey;
      btn.dataset.act = "save-maxbet";

      const canEdit = canEditMachineMaxBet(machine);
      input.disabled = !canEdit;
      btn.disabled = !canEdit;

      wrap.appendChild(input);
      wrap.appendChild(btn);

      if (!canEdit) {
        const info = document.createElement("span");
        info.className = "tag danger";
        info.textContent = isWorldLocked() ? "No lock permission" : "Not machine owner";
        wrap.appendChild(info);
      }

      tdMaxBet.appendChild(wrap);

      const tdBankActions = document.createElement("td");
      const bankWrap = document.createElement("div");
      bankWrap.className = "machine-bank-controls";
      const bankAmountInput = document.createElement("input");
      bankAmountInput.type = "number";
      bankAmountInput.min = "1";
      bankAmountInput.step = "1";
      bankAmountInput.placeholder = "WL amount";
      bankAmountInput.value = "1";
      bankAmountInput.dataset.tileKey = machine.tileKey;
      bankAmountInput.dataset.bankAmount = "1";

      const refillBtn = document.createElement("button");
      refillBtn.type = "button";
      refillBtn.textContent = "Refill";
      refillBtn.dataset.tileKey = machine.tileKey;
      refillBtn.dataset.act = "refill-bank";

      const withdrawBtn = document.createElement("button");
      withdrawBtn.type = "button";
      withdrawBtn.textContent = "Withdraw";
      withdrawBtn.dataset.tileKey = machine.tileKey;
      withdrawBtn.dataset.act = "withdraw-bank";

      const emptyBtn = document.createElement("button");
      emptyBtn.type = "button";
      emptyBtn.textContent = "Empty";
      emptyBtn.dataset.tileKey = machine.tileKey;
      emptyBtn.dataset.act = "empty-bank";

      const canBank = canCollectMachine(machine);
      bankAmountInput.disabled = !canBank;
      refillBtn.disabled = !canBank;
      withdrawBtn.disabled = !canBank;
      emptyBtn.disabled = !canBank || machine.earningsLocks <= 0;

      bankWrap.appendChild(bankAmountInput);
      bankWrap.appendChild(refillBtn);
      bankWrap.appendChild(withdrawBtn);
      bankWrap.appendChild(emptyBtn);
      if (!canBank) {
        const bankMuted = document.createElement("span");
        bankMuted.className = "bank-muted";
        bankMuted.textContent = "Machine owner only";
        bankWrap.appendChild(bankMuted);
      }
      tdBankActions.appendChild(bankWrap);

      const tdSpectate = document.createElement("td");
      const spectateBtn = document.createElement("button");
      spectateBtn.type = "button";
      spectateBtn.textContent = state.selectedSpectateTileKey === machine.tileKey ? "Spectating" : "Spectate";
      spectateBtn.dataset.tileKey = machine.tileKey;
      spectateBtn.dataset.act = "spectate-machine";
      tdSpectate.appendChild(spectateBtn);

      tr.appendChild(tdTile);
      tr.appendChild(tdType);
      tr.appendChild(tdOwner);
      tr.appendChild(tdBank);
      tr.appendChild(tdState);
      tr.appendChild(tdMaxBet);
      tr.appendChild(tdBankActions);
      tr.appendChild(tdSpectate);
      frag.appendChild(tr);
    });

    els.machineTbody.appendChild(frag);
  }

  function renderAll() {
    renderScope();
    renderTaxControls();
    renderSummary();
    renderMachines();
    renderSpectate();
  }

  function findMachineByTileKey(tileKey) {
    const safe = String(tileKey || "");
    const rows = Array.isArray(state.machines) ? state.machines : [];
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].tileKey === safe) return rows[i];
    }
    return null;
  }

  function formatCard(value) {
    const c = Math.max(1, Math.min(13, Math.floor(Number(value) || 1)));
    if (c === 1) return "A";
    if (c === 11) return "J";
    if (c === 12) return "Q";
    if (c === 13) return "K";
    return String(c);
  }

  function formatTs(ts) {
    const safe = Math.max(0, Math.floor(Number(ts) || 0));
    if (!safe) return "-";
    const d = new Date(safe);
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return hh + ":" + mm + ":" + ss;
  }

  function renderSpectate() {
    if (!(els.spectateBody instanceof HTMLElement)) return;
    const rows = Array.isArray(state.machines) ? state.machines : [];
    if (!rows.length) {
      els.spectateBody.textContent = "No machines to spectate in this world.";
      return;
    }
    let machine = findMachineByTileKey(state.selectedSpectateTileKey);
    if (!machine) {
      machine = rows.find((row) => row.inUseAccountId) || rows[0];
      state.selectedSpectateTileKey = machine ? machine.tileKey : "";
    }
    if (!machine) {
      els.spectateBody.textContent = "Pick a machine to spectate.";
      return;
    }

    const stats = machine.stats || {};
    const lines = [];
    lines.push("Tile: " + machine.tx + "," + machine.ty + " | " + machine.typeName);
    lines.push("Owner: " + getMachineOwnerLabel(machine));
    lines.push("In use: " + (machine.inUseAccountId ? ("yes" + (machine.inUseName ? " by @" + machine.inUseName : "")) : "no"));
    lines.push("Bank: " + machine.earningsLocks + " WL | Max Bet: " + machine.maxBet + " WL");
    lines.push("Plays: " + stats.plays + " | Total Bet: " + stats.totalBet + " | Total Payout: " + stats.totalPayout);
    lines.push("Last Outcome: " + (stats.lastOutcome || "-") + " | Last At: " + formatTs(stats.lastAt));

    if (machine.type === "blackjack" && machine.blackjackRound && machine.blackjackRound.active) {
      const round = machine.blackjackRound;
      const dealerCards = round.dealerCards.map((card) => formatCard(card)).join(" ");
      const handTexts = round.hands.map((hand, index) => {
        const cards = hand.cards.map((card) => formatCard(card)).join(" ");
        return "Hand " + (index + 1) + ": [" + cards + "] bet=" + hand.bet + " outcome=" + (hand.outcome || "-");
      });
      lines.push("Blackjack: ACTIVE" + (round.playerName ? " @" + round.playerName : ""));
      lines.push("Dealer: " + (dealerCards || "-"));
      if (handTexts.length) lines.push(handTexts.join(" | "));
      if (round.summary) lines.push("Round: " + round.summary);
    } else if (machine.type.indexOf("slots") === 0) {
      if (stats.lastSlotsSummary) lines.push("Last Slots: " + stats.lastSlotsSummary);
      if (stats.lastSlotsLines) lines.push("Lines: " + stats.lastSlotsLines);
      if (stats.lastSlotsText) lines.push("Board: " + stats.lastSlotsText);
    } else {
      if (stats.lastPlayerRoll || stats.lastHouseRoll) {
        lines.push("Last rolls: player=" + stats.lastPlayerRoll + " house=" + stats.lastHouseRoll);
        lines.push("Last reme: player=" + stats.lastPlayerReme + " house=" + stats.lastHouseReme + " x" + stats.lastMultiplier);
      }
    }

    els.spectateBody.textContent = lines.join("\n");
  }

  function renderTaxControls() {
    if (!(els.taxControls instanceof HTMLElement)) return;
    const show = Boolean(state.user && state.worldId && isWorldLockOwner());
    els.taxControls.classList.toggle("hidden", !show);
    if (!show) return;
    const tax = state.ownerTax;
    const hasTaxMachine = Boolean(tax && Number.isInteger(tax.tx) && tax.tx >= 0 && Number.isInteger(tax.ty) && tax.ty >= 0);
    if (els.taxPercentInput instanceof HTMLInputElement) {
      if (hasTaxMachine) {
        els.taxPercentInput.disabled = false;
        els.taxPercentInput.value = String(Math.max(0, Math.min(100, Math.floor(Number(tax && tax.percent) || 0))));
      } else {
        els.taxPercentInput.disabled = true;
        els.taxPercentInput.value = "";
      }
    }
    if (els.saveTaxBtn instanceof HTMLButtonElement) {
      els.saveTaxBtn.disabled = !hasTaxMachine;
    }
  }

  function parsePositiveAmount(rawValue) {
    const parsed = Math.floor(Number(rawValue));
    if (!Number.isFinite(parsed) || parsed <= 0) return 0;
    return parsed;
  }

  function readTxnNumber(txn, fallback) {
    const safeFallback = Math.max(0, Math.floor(Number(fallback) || 0));
    const snap = txn && txn.snapshot ? txn.snapshot : null;
    const value = snap && typeof snap.val === "function" ? snap.val() : safeFallback;
    return Math.max(0, Math.floor(Number(value) || 0));
  }

  async function adjustWalletLocks(amountDelta) {
    const user = state.user;
    if (!user || !state.worldId) return { ok: false, reason: "not-ready", amount: 0 };
    if (!state.refs.inventoryLocks) return { ok: false, reason: "missing-wallet-ref", amount: 0 };
    const delta = Math.floor(Number(amountDelta) || 0);
    if (!Number.isInteger(delta) || delta === 0) return { ok: false, reason: "invalid-delta", amount: 0 };

    const txn = await state.refs.inventoryLocks.transaction((currentRaw) => {
      const current = Math.max(0, Math.floor(Number(currentRaw) || 0));
      const next = current + delta;
      if (next < 0) return;
      return next;
    });

    if (!txn || !txn.committed) {
      return { ok: false, reason: delta < 0 ? "not-enough-locks" : "wallet-update-rejected", amount: 0 };
    }
    const next = readTxnNumber(txn, state.walletLocks);
    state.walletLocks = next;
    return { ok: true, next, amount: Math.abs(delta) };
  }

  async function refillMachineBank(tileKey, amountRaw) {
    const machine = findMachineByTileKey(tileKey);
    if (!machine || !state.user || !state.worldId) return;
    if (!canCollectMachine(machine)) {
      makeStatus("Only machine owner can refill the machine.", "error");
      return;
    }
    const amount = parsePositiveAmount(amountRaw);
    if (!amount) {
      makeStatus("Invalid refill amount.", "error");
      return;
    }

    try {
      const walletTxn = await adjustWalletLocks(-amount);
      if (!walletTxn.ok) {
        makeStatus(walletTxn.reason === "not-enough-locks" ? "Not enough World Locks in your inventory." : "Failed to spend World Locks.", "error");
        return;
      }

      const db = await ensureDb();
      const basePath = String(window.GT_SETTINGS && window.GT_SETTINGS.BASE_PATH || "growtopia-test");
      const machineRef = db.ref(basePath + "/worlds/" + state.worldId + "/gamble-machines/" + machine.tileKey);
      const myAccountId = state.user.accountId;

      const txn = await machineRef.transaction((currentRaw) => {
        const current = normalizeMachineRecord(machine.tileKey, currentRaw);
        if (!current) return currentRaw;
        if (!current.ownerAccountId || current.ownerAccountId !== myAccountId) return currentRaw;
        return {
          ...currentRaw,
          earningsLocks: Math.max(0, Math.floor(Number(current.earningsLocks) || 0)) + amount,
          updatedAt: Date.now()
        };
      });

      if (!txn || !txn.committed) {
        await adjustWalletLocks(amount);
        makeStatus("Refill rejected. Your WL were refunded.", "error");
        return;
      }

      makeStatus("Refilled machine with " + amount + " WL.", "ok");
    } catch (error) {
      await adjustWalletLocks(amount);
      makeStatus((error && error.message) || "Failed to refill machine.", "error");
    }
  }

  async function withdrawMachineBank(tileKey, amountRaw, emptyAll) {
    const machine = findMachineByTileKey(tileKey);
    if (!machine || !state.user || !state.worldId) return;
    if (!canCollectMachine(machine)) {
      makeStatus("Only machine owner can withdraw from the machine.", "error");
      return;
    }
    const requestedAmount = emptyAll
      ? Math.max(0, Math.floor(Number(machine.earningsLocks) || 0))
      : parsePositiveAmount(amountRaw);
    if (!requestedAmount) {
      makeStatus(emptyAll ? "Machine bank is already empty." : "Invalid withdraw amount.", "error");
      return;
    }

    try {
      const db = await ensureDb();
      const basePath = String(window.GT_SETTINGS && window.GT_SETTINGS.BASE_PATH || "growtopia-test");
      const machineRef = db.ref(basePath + "/worlds/" + state.worldId + "/gamble-machines/" + machine.tileKey);
      const myAccountId = state.user.accountId;
      let withdrawn = 0;

      const txn = await machineRef.transaction((currentRaw) => {
        const current = normalizeMachineRecord(machine.tileKey, currentRaw);
        if (!current) return currentRaw;
        if (!current.ownerAccountId || current.ownerAccountId !== myAccountId) return currentRaw;
        const bank = Math.max(0, Math.floor(Number(current.earningsLocks) || 0));
        if (bank <= 0) return currentRaw;
        const amount = emptyAll ? bank : Math.min(bank, requestedAmount);
        withdrawn = amount;
        return {
          ...currentRaw,
          earningsLocks: Math.max(0, bank - amount),
          updatedAt: Date.now()
        };
      });

      if (!txn || !txn.committed || withdrawn <= 0) {
        makeStatus("Withdraw rejected.", "error");
        return;
      }

      const walletTxn = await adjustWalletLocks(withdrawn);
      if (!walletTxn.ok) {
        await machineRef.transaction((currentRaw) => {
          const current = normalizeMachineRecord(machine.tileKey, currentRaw);
          if (!current) return currentRaw;
          if (!current.ownerAccountId || current.ownerAccountId !== myAccountId) return currentRaw;
          return {
            ...currentRaw,
            earningsLocks: Math.max(0, Math.floor(Number(current.earningsLocks) || 0)) + withdrawn,
            updatedAt: Date.now()
          };
        });
        makeStatus("Failed to move withdrawn WL to your inventory. Machine bank restored.", "error");
        return;
      }

      makeStatus((emptyAll ? "Emptied machine bank: " : "Withdrew ") + withdrawn + " WL.", "ok");
    } catch (error) {
      makeStatus((error && error.message) || "Failed to withdraw from machine.", "error");
    }
  }

  async function saveTaxPercent() {
    if (!state.user || !state.worldId) return;
    if (!isWorldLockOwner()) {
      makeStatus("Only world owner can modify tax amount.", "error");
      return;
    }
    const tax = state.ownerTax;
    if (!tax || !Number.isInteger(tax.tx) || tax.tx < 0 || !Number.isInteger(tax.ty) || tax.ty < 0) {
      makeStatus("Owner tax machine not found in this world.", "error");
      return;
    }
    if (!(els.taxPercentInput instanceof HTMLInputElement)) return;
    const nextPercent = Math.max(0, Math.min(100, Math.floor(Number(els.taxPercentInput.value) || 0)));

    try {
      const db = await ensureDb();
      const basePath = String(window.GT_SETTINGS && window.GT_SETTINGS.BASE_PATH || "growtopia-test");
      const taxRef = db.ref(basePath + "/worlds/" + state.worldId + "/owner-tax");
      await taxRef.set({
        tx: tax.tx,
        ty: tax.ty,
        taxPercent: nextPercent,
        ownerAccountId: String(state.worldLock && state.worldLock.ownerAccountId || state.user.accountId || "").trim(),
        ownerName: String(state.worldLock && state.worldLock.ownerName || state.user.username || "").trim().slice(0, 20),
        earningsLocks: Math.max(0, Math.floor(Number(tax.earningsLocks) || 0)),
        updatedAt: Date.now()
      });
      makeStatus("Updated world owner tax to " + nextPercent + "%.", "ok");
    } catch (error) {
      makeStatus((error && error.message) || "Failed to save tax amount.", "error");
    }
  }

  function normalizeAdminRole(rawRole) {
    const allowed = ["none", "moderator", "admin", "manager", "owner"];
    if (rawRole === undefined || rawRole === null) return "none";
    if (typeof rawRole === "string") {
      const safe = rawRole.trim().toLowerCase();
      return allowed.includes(safe) ? safe : "none";
    }
    if (typeof rawRole === "object") {
      const row = rawRole || {};
      const candidate = row.role !== undefined
        ? row.role
        : (row.value !== undefined ? row.value : row.name);
      return normalizeAdminRole(candidate);
    }
    return "none";
  }

  async function resolveUserRole(accountId, username) {
    const db = await ensureDb();
    const basePath = String(window.GT_SETTINGS && window.GT_SETTINGS.BASE_PATH || "growtopia-test");
    try {
      const roleSnap = await db.ref(basePath + "/admin-roles/" + accountId).once("value");
      const role = normalizeAdminRole(roleSnap.val());
      if (role !== "none") return role;
    } catch (_error) {
      // ignore
    }

    const byName = window.GT_SETTINGS && window.GT_SETTINGS.ADMIN_ROLE_BY_USERNAME;
    const fromName = byName && typeof byName === "object"
      ? normalizeAdminRole(byName[username])
      : "none";
    return fromName;
  }

  async function loginWithPassword(createMode) {
    if (!(els.authUsername instanceof HTMLInputElement) || !(els.authPassword instanceof HTMLInputElement)) return;

    const username = normalizeUsername(els.authUsername.value || "");
    const password = String(els.authPassword.value || "");

    if (typeof authModule.validateCredentials === "function") {
      const validation = authModule.validateCredentials(username, password);
      if (validation) {
        makeStatus(validation, "error");
        return;
      }
    }

    setAuthBusy(true);
    makeStatus(createMode ? "Creating account..." : "Logging in...");
    try {
      const db = await ensureDb();
      const basePath = String(window.GT_SETTINGS && window.GT_SETTINGS.BASE_PATH || "growtopia-test");
      const firebaseRef = window.firebase;

      let accountId = "";
      const usernameRef = db.ref(basePath + "/usernames/" + username);

      if (createMode) {
        accountId = "acc_" + Math.random().toString(36).slice(2, 12);
        const reserve = await usernameRef.transaction((current) => {
          if (current) return;
          return accountId;
        });
        if (!reserve || !reserve.committed) {
          throw new Error("Username already exists.");
        }
        if (typeof authModule.sha256Hex !== "function") {
          throw new Error("Auth module missing hash function.");
        }
        const passwordHash = await authModule.sha256Hex(password);
        await db.ref(basePath + "/accounts/" + accountId).set({
          username,
          passwordHash,
          createdAt: firebaseRef && firebaseRef.database ? firebaseRef.database.ServerValue.TIMESTAMP : Date.now()
        });
      } else {
        const usernameSnap = await usernameRef.once("value");
        accountId = String(usernameSnap.val() || "").trim();
        if (!accountId) throw new Error("Account not found.");
      }

      const accountSnap = await db.ref(basePath + "/accounts/" + accountId).once("value");
      const account = accountSnap.val() || {};

      if (typeof authModule.sha256Hex !== "function") {
        throw new Error("Auth module missing hash function.");
      }
      const passwordHash = await authModule.sha256Hex(password);
      if (String(account.passwordHash || "") !== passwordHash) {
        throw new Error("Invalid password.");
      }

      const role = await resolveUserRole(accountId, username);
      state.user = {
        accountId,
        username,
        role
      };

      saveCredentials(username, password);
      updateSessionUi();
      makeStatus("Logged in as @" + username + ".", "ok");

      const lastWorld = loadLastWorld();
      if (lastWorld && els.worldInput instanceof HTMLInputElement) {
        els.worldInput.value = lastWorld;
      }
    } catch (error) {
      makeStatus((error && error.message) || "Login failed.", "error");
    } finally {
      setAuthBusy(false);
    }
  }

  function logout() {
    detachWorldListeners();
    state.user = null;
    state.worldId = "";
    state.machineSearch = "";
    if (els.machineSearch instanceof HTMLInputElement) els.machineSearch.value = "";
    updateSessionUi();
    renderAll();
    makeStatus("Logged out.");
  }

  async function attachWorld(worldId) {
    const user = state.user;
    if (!user) {
      makeStatus("Login first.", "error");
      return;
    }

    const safeWorldId = normalizeWorldId(worldId);
    if (!safeWorldId) {
      makeStatus("Invalid world id.", "error");
      return;
    }

    setWorldBusy(true);
    makeStatus("Loading world " + safeWorldId + "...");

    try {
      const db = await ensureDb();
      const basePath = String(window.GT_SETTINGS && window.GT_SETTINGS.BASE_PATH || "growtopia-test");

      detachWorldListeners();
      state.worldId = safeWorldId;
      saveLastWorld(safeWorldId);

      const root = db.ref(basePath + "/worlds/" + safeWorldId);
      state.refs.lock = root.child("lock");
      state.refs.machines = root.child("gamble-machines");
      state.refs.ownerTax = root.child("owner-tax");
      state.refs.inventoryLocks = db.ref(basePath + "/player-inventories/" + state.user.accountId + "/" + WORLD_LOCK_ITEM_ID);

      state.handlers.lock = (snapshot) => {
        state.worldLock = normalizeLockRecord(snapshot.val());
        renderAll();
      };
      state.handlers.machines = (snapshot) => {
        const value = snapshot.val();
        const rows = [];
        if (value && typeof value === "object") {
          Object.keys(value).forEach((tileKey) => {
            const row = normalizeMachineRecord(tileKey, value[tileKey]);
            if (row) rows.push(row);
          });
        }
        state.machines = rows;
        if (state.selectedSpectateTileKey && !rows.some((row) => row.tileKey === state.selectedSpectateTileKey)) {
          state.selectedSpectateTileKey = "";
        }
        renderAll();
      };
      state.handlers.ownerTax = (snapshot) => {
        state.ownerTax = normalizeOwnerTax(snapshot.val());
        renderAll();
      };
      state.handlers.inventoryLocks = (snapshot) => {
        state.walletLocks = Math.max(0, Math.floor(Number(snapshot && snapshot.val ? snapshot.val() : 0) || 0));
        renderSummary();
      };

      state.refs.lock.on("value", state.handlers.lock);
      state.refs.machines.on("value", state.handlers.machines);
      state.refs.ownerTax.on("value", state.handlers.ownerTax);
      state.refs.inventoryLocks.on("value", state.handlers.inventoryLocks);

      makeStatus("Loaded world " + safeWorldId + ".", "ok");
      renderAll();
    } catch (error) {
      makeStatus((error && error.message) || "Failed to load world.", "error");
    } finally {
      setWorldBusy(false);
    }
  }

  async function saveMachineMaxBet(tileKey, inputValue) {
    const machine = findMachineByTileKey(tileKey);
    if (!machine || !state.user || !state.worldId) return;
    if (!canEditMachineMaxBet(machine)) {
      makeStatus("You do not have permission to edit this machine.", "error");
      return;
    }

    const requestedRaw = Math.floor(Number(inputValue));
    const requested = Math.max(machine.minBet, Math.min(machine.hardMaxBet, Number.isFinite(requestedRaw) ? requestedRaw : machine.maxBet));

    try {
      const db = await ensureDb();
      const basePath = String(window.GT_SETTINGS && window.GT_SETTINGS.BASE_PATH || "growtopia-test");
      const machineRef = db.ref(basePath + "/worlds/" + state.worldId + "/gamble-machines/" + machine.tileKey);

      const now = Date.now();
      const lock = state.worldLock;
      const myAccountId = state.user.accountId;

      const txn = await machineRef.transaction((currentRaw) => {
        const current = normalizeMachineRecord(machine.tileKey, currentRaw);
        if (!current) return currentRaw;

        const isLocked = Boolean(lock && lock.ownerAccountId);
        const isOwner = Boolean(lock && lock.ownerAccountId && lock.ownerAccountId === myAccountId);
        const isAdmin = Boolean(lock && lock.admins && lock.admins[myAccountId]);
        const ownsMachine = Boolean(current.ownerAccountId && current.ownerAccountId === myAccountId);

        let canEdit = false;
        if (isLocked) {
          if (isOwner) {
            canEdit = true;
          } else if (ownsMachine && !isAdmin) {
            canEdit = true;
          }
        } else {
          canEdit = ownsMachine;
        }

        if (!canEdit) return currentRaw;

        return {
          ...currentRaw,
          maxBet: requested,
          updatedAt: now
        };
      });

      if (!txn || !txn.committed) {
        makeStatus("Max bet update was rejected.", "error");
        return;
      }

      makeStatus("Updated max bet to " + requested + " WL at tile " + machine.tx + "," + machine.ty + ".", "ok");
    } catch (error) {
      makeStatus((error && error.message) || "Failed to update max bet.", "error");
    }
  }

  function bindEvents() {
    if (els.openGameBtn instanceof HTMLButtonElement) {
      els.openGameBtn.addEventListener("click", () => {
        window.location.href = "index.html";
      });
    }

    if (els.logoutBtn instanceof HTMLButtonElement) {
      els.logoutBtn.addEventListener("click", logout);
    }

    if (els.authLoginBtn instanceof HTMLButtonElement) {
      els.authLoginBtn.addEventListener("click", () => {
        loginWithPassword(false);
      });
    }

    if (els.authCreateBtn instanceof HTMLButtonElement) {
      els.authCreateBtn.addEventListener("click", () => {
        loginWithPassword(true);
      });
    }

    if (els.authPassword instanceof HTMLInputElement) {
      els.authPassword.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        loginWithPassword(false);
      });
    }

    if (els.loadWorldBtn instanceof HTMLButtonElement) {
      els.loadWorldBtn.addEventListener("click", () => {
        if (!(els.worldInput instanceof HTMLInputElement)) return;
        attachWorld(els.worldInput.value || "");
      });
    }

    if (els.refreshBtn instanceof HTMLButtonElement) {
      els.refreshBtn.addEventListener("click", () => {
        if (!state.worldId) {
          makeStatus("No world selected.", "error");
          return;
        }
        attachWorld(state.worldId);
      });
    }

    if (els.worldInput instanceof HTMLInputElement) {
      els.worldInput.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        attachWorld(els.worldInput.value || "");
      });
    }

    if (els.machineSearch instanceof HTMLInputElement) {
      els.machineSearch.addEventListener("input", () => {
        state.machineSearch = String(els.machineSearch.value || "").trim().toLowerCase();
        renderMachines();
      });
    }

    if (els.machineTbody instanceof HTMLElement) {
      els.machineTbody.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const tileKey = String(target.dataset.tileKey || "").trim();
        const act = String(target.dataset.act || "").trim();
        if (!tileKey || !act) return;

        if (act === "spectate-machine") {
          state.selectedSpectateTileKey = tileKey;
          renderMachines();
          renderSpectate();
          return;
        }

        if (act === "save-maxbet") {
          const input = els.machineTbody.querySelector('input[data-tile-key="' + tileKey + '"]:not([data-bank-amount])');
          if (!(input instanceof HTMLInputElement)) return;
          saveMachineMaxBet(tileKey, input.value);
          return;
        }

        if (act === "refill-bank" || act === "withdraw-bank") {
          const bankInput = els.machineTbody.querySelector('input[data-tile-key="' + tileKey + '"][data-bank-amount]');
          if (!(bankInput instanceof HTMLInputElement)) return;
          if (act === "refill-bank") {
            refillMachineBank(tileKey, bankInput.value);
          } else {
            withdrawMachineBank(tileKey, bankInput.value, false);
          }
          return;
        }

        if (act === "empty-bank") {
          withdrawMachineBank(tileKey, 0, true);
        }
      });
    }

    if (els.saveTaxBtn instanceof HTMLButtonElement) {
      els.saveTaxBtn.addEventListener("click", () => {
        saveTaxPercent();
      });
    }

    if (els.taxPercentInput instanceof HTMLInputElement) {
      els.taxPercentInput.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        saveTaxPercent();
      });
    }

    window.addEventListener("beforeunload", () => {
      detachWorldListeners();
    });
  }

  function init() {
    bindEvents();
    updateSessionUi();
    renderAll();

    const saved = loadSavedCredentials();
    if (els.authUsername instanceof HTMLInputElement && saved.username) {
      els.authUsername.value = String(saved.username || "").slice(0, 20);
    }
    if (els.authPassword instanceof HTMLInputElement && saved.password) {
      els.authPassword.value = String(saved.password || "").slice(0, 64);
    }

    const lastWorld = loadLastWorld();
    if (els.worldInput instanceof HTMLInputElement && lastWorld) {
      els.worldInput.value = lastWorld;
    }
  }

  init();
})();
