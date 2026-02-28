window.GTModules = window.GTModules || {};

(function initGamblingSlotsSite() {
  "use strict";

  const SAVED_AUTH_KEY = "growtopia_saved_auth_v1";
  const LAST_WORLD_KEY = "gt_slots_site_world_v1";
  const SLOT_MACHINE_IDS = ["slots", "slots_v2", "slots_v3", "slots_v4", "slots_v6"];

  // Demo casino mode: independent slot experience not tied to user-hosted machines
  let CASINO_MODE = false;
  const STANDALONE_MACHINE = {
    tileKey: "casino_demo",
    type: "slots",
    typeName: "Demo Slots",
    tx: 0,
    ty: 0,
    minBet: 1,
    maxBet: 10000,
    maxPayoutMultiplier: 100,
    reels: 3,
    rows: 1,
    earningsLocks: 99999999,
    ownerName: "Demo",
    ownerAccountId: "demo",
    inUseAccountId: null,
    inUseName: "",
    stats: {
      plays: 0,
      totalBet: 0,
      totalPayout: 0,
      lastOutcome: "lose",
      lastMultiplier: 0,
      lastSlotsText: "",
      lastSlotsLineIds: "",
      lastSlotsLines: ""
    }
  };

  // UI-only feature: show different slot game names than the in-game machines
  // This makes the web gamble UI feel distinct from the actual game slots.
  const INFINITE_BANK = true; // toggle to make all banks infinite in the UI
  const UI_GAME_ALIASES = {
    slots: "Nebula Run",
    slots_v2: "Crystal Forge",
    slots_v3: "Spectral Vault",
    slots_v4: "Emerald Oasis",
    slots_v6: "Quantum Core"
  };
  const PAYLINES_5 = [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [2, 2, 2, 2, 2],
    [0, 1, 2, 1, 0],
    [2, 1, 0, 1, 2],
    [0, 0, 1, 2, 2],
    [2, 2, 1, 0, 0],
    [1, 0, 1, 2, 1],
    [1, 2, 1, 0, 1],
    [0, 1, 1, 1, 2],
    [3, 3, 3, 3, 3]
  ];

  const SYMBOL_LABELS = {
    CHERRY: "Cherry", LEMON: "Lemon", BAR: "Bar", BELL: "Bell", SEVEN: "Seven", "7": "Seven",
    GEM: "Gem", PICK: "Pickaxe", MINER: "Miner", GOLD: "Gold", DYN: "Dynamite", WILD: "Wild", SCAT: "Scatter", BONUS: "Bonus",
    RUBY: "Ruby", EMER: "Emerald", CLUB: "Club", RING: "Ring", SKULL: "Skull", REAPR: "Reaper", BLOOD: "Blood",
    LEAF: "Leaf", STON: "Stone", MASK: "Mask", IDOL: "Idol", ORAC: "Oracle", FRGT: "Forgotten",
    COIN: "Coin", ORE: "Ore", CART: "Cart", RELC: "Relic", "?": "Unknown"
  };

  const SYMBOL_ICONS = {
    CHERRY: "\u{1F352}", LEMON: "\u{1F34B}", BAR: "\u25A0", BELL: "\u{1F514}", SEVEN: "7", "7": "7",
    GEM: "\u{1F48E}", PICK: "\u26CF", MINER: "\u{1F477}", GOLD: "\u{1FA99}", DYN: "\u{1F4A3}", WILD: "\u2728", SCAT: "\u{1F31F}", BONUS: "\u{1F381}",
    RUBY: "\u2666", EMER: "\u{1F49A}", CLUB: "\u2663", RING: "\u{1F48D}", SKULL: "\u{1F480}", REAPR: "\u2620", BLOOD: "\u{1FA78}",
    LEAF: "\u{1F343}", STON: "\u{1FAA8}", MASK: "\u{1F3AD}", IDOL: "\u{1F5FF}", ORAC: "\u{1F52E}", FRGT: "\u{1F56F}",
    COIN: "\u{1FA99}", ORE: "\u26D3", CART: "\u{1F6D2}", RELC: "\u{1F4FF}", "?": "\u2754"
  };

  const SYMBOL_CLASSES = { WILD: "wild", SCAT: "scatter", BONUS: "bonus", DYN: "bonus" };
  const SYMBOL_POOL = {
    slots: ["CHERRY", "LEMON", "BAR", "BELL", "SEVEN"],
    slots_v2: ["GEM", "PICK", "MINER", "GOLD", "DYN", "WILD", "SCAT", "BONUS"],
    slots_v3: ["RUBY", "EMER", "CLUB", "RING", "SKULL", "REAPR", "BLOOD", "WILD", "SCAT"],
    slots_v4: ["LEAF", "STON", "MASK", "IDOL", "ORAC", "FRGT", "WILD", "SCAT"],
    slots_v6: ["COIN", "ORE", "GEM", "PICK", "CART", "RELC", "WILD", "SCAT"]
  };

  const authModule = (window.GTModules && window.GTModules.auth) || {};
  const authStorageModule = (window.GTModules && window.GTModules.authStorage) || {};
  const dbModule = (window.GTModules && window.GTModules.db) || {};
  const slotsModule = (window.GTModules && window.GTModules.slots) || {};

  const MACHINE_DEFS = buildMachineDefinitions();
  const LOCK_CURRENCIES = resolveLockCurrencies();

  const state = {
    db: null,
    network: {},
    user: null,
    worldId: "",
    machines: [],
    selectedMachineKey: "",
    walletLocks: 0,
    walletBreakdownText: "0 WL",
    refs: { machines: null, inventory: null },
    handlers: { machines: null, inventory: null },
    spinBusy: false,
    spinTimer: 0,
    history: [],
    ephemeral: { rows: null, lineIds: [], lineWins: [] }
  };

  const els = {
    openDashboardBtn: document.getElementById("openDashboardBtn"),
    openGameBtn: document.getElementById("openGameBtn"),
    logoutBtn: document.getElementById("logoutBtn"),
    authUsername: document.getElementById("authUsername"),
    authPassword: document.getElementById("authPassword"),
    authLoginBtn: document.getElementById("authLoginBtn"),
    authCreateBtn: document.getElementById("authCreateBtn"),
    authStatus: document.getElementById("authStatus"),
    sessionLabel: document.getElementById("sessionLabel"),
    worldLabel: document.getElementById("worldLabel"),
    walletLabel: document.getElementById("walletLabel"),
    worldInput: document.getElementById("worldInput"),
    loadWorldBtn: document.getElementById("loadWorldBtn"),
    worldStatus: document.getElementById("worldStatus"),
    machineSelect: document.getElementById("machineSelect"),
    machineList: document.getElementById("machineList"),
    gameTitle: document.getElementById("gameTitle"),
    gameSubtitle: document.getElementById("gameSubtitle"),
    betInput: document.getElementById("betInput"),
    setMaxBtn: document.getElementById("setMaxBtn"),
    spinBtn: document.getElementById("spinBtn"),
    buyBonusBtn: document.getElementById("buyBonusBtn"),
    quickBetRow: document.getElementById("quickBetRow"),
    stage: document.getElementById("stage"),
    boardWrap: document.getElementById("boardWrap"),
    slotBoard: document.getElementById("slotBoard"),
    slotOverlay: document.getElementById("slotOverlay"),
    particles: document.getElementById("particles"),
    lineList: document.getElementById("lineList"),
    resultBanner: document.getElementById("resultBanner"),
    historyList: document.getElementById("historyList"),
    statBank: document.getElementById("statBank"),
    statMaxBet: document.getElementById("statMaxBet"),
    statPlays: document.getElementById("statPlays"),
    statPayout: document.getElementById("statPayout"),
    spinModeTag: document.getElementById("spinModeTag")
  };

  function buildMachineDefinitions() {
    const slotsDefs = typeof slotsModule.getDefinitions === "function" ? slotsModule.getDefinitions() : {};
    const fallback = {
      slots: { name: "Classic Slots", minBet: 1, maxBet: 30000, maxPayoutMultiplier: 10, reels: 3, rows: 1 },
      slots_v2: { name: "Neon Mine", minBet: 1, maxBet: 30000, maxPayoutMultiplier: 50, reels: 5, rows: 4 },
      slots_v3: { name: "Blood Vault", minBet: 1, maxBet: 30000, maxPayoutMultiplier: 5000, reels: 5, rows: 4 },
      slots_v4: { name: "Ancient Jungle", minBet: 1, maxBet: 30000, maxPayoutMultiplier: 5000, reels: 5, rows: 4 },
      slots_v6: { name: "Deep Core", minBet: 1, maxBet: 30000, maxPayoutMultiplier: 5000, reels: 5, rows: 3 }
    };
    const out = {};
    SLOT_MACHINE_IDS.forEach((id) => {
      const row = slotsDefs[id] || {};
      const base = fallback[id] || fallback.slots;
      const layout = row && row.layout && typeof row.layout === "object" ? row.layout : {};
      out[id] = {
        id,
        name: String(row.name || base.name),
        minBet: Math.max(1, Math.floor(Number(row.minBet) || base.minBet)),
        maxBet: Math.max(1, Math.floor(Number(row.maxBet) || base.maxBet)),
        maxPayoutMultiplier: Math.max(1, Math.floor(Number(row.maxPayoutMultiplier) || base.maxPayoutMultiplier)),
        reels: Math.max(1, Math.floor(Number(layout.reels) || base.reels)),
        rows: Math.max(1, Math.floor(Number(layout.rows) || base.rows))
      };
    });
    // Apply UI-only aliases for display in the web UI
    Object.keys(UI_GAME_ALIASES).forEach((id) => {
      if (out[id]) out[id].name = UI_GAME_ALIASES[id];
    });
    return out;
  }

  // Casino wallet helpers
  function getCasinoWallet() {
    const raw = localStorage.getItem("casino_wallet");
    let v = parseInt(raw, 10);
    if (!Number.isFinite(v)) v = 100000; // default demo credits
    return v;
  }
  function setCasinoWallet(n) {
    localStorage.setItem("casino_wallet", String(n));
  }

  // Standalone/casino spin logic
  function simulateStandaloneSpin(machine, bet) {
    const pool = SYMBOL_POOL[machine.type] || SYMBOL_POOL.slots;
    const reels = [
      pool[Math.floor(Math.random() * pool.length)],
      pool[Math.floor(Math.random() * pool.length)],
      pool[Math.floor(Math.random() * pool.length)]
    ];
    let payout = 0;
    let lines = [];
    if (reels[0] === reels[1] && reels[1] === reels[2]) {
      payout = bet * 10;
      lines = [1];
    } else if (reels[0] === reels[1] || reels[1] === reels[2] || reels[0] === reels[2]) {
      payout = bet * 2;
      lines = [1];
    }
    const result = {
      reels,
      lineWins: lines,
      lineIds: lines,
      outcome: payout > 0 ? "win" : "lose",
      payoutWanted: payout,
      summary: payout > 0 ? "Demo spin" : ""
    };
    return result;
  }

  async function runStandaloneSpin(mode) {
    const machine = STANDALONE_MACHINE;
    const bet = clampBetToMachine(machine, els.betInput && els.betInput.value);
    const betFinal = Math.max(1, bet || 1);
    const res = simulateStandaloneSpin(machine, betFinal);
    const payout = res.payoutWanted || 0;
    const w = getCasinoWallet();
    setCasinoWallet(w + payout);
    state.ephemeral.rows = rowsFromResult(res.reels, machine.type);
    state.ephemeral.lineWins = res.lineWins;
    state.ephemeral.lineIds = res.lineIds;
    renderBoard();
    const msg = payout > 0 ? `Demo Spin Won ${payout} WL` : `Demo Spin Lost ${betFinal} WL`;
    setResult(msg, payout > 0 ? "win" : "");
    pushHistory(msg, payout > 0 ? "win" : "");
    renderAll();
  }

  function resolveLockCurrencies() {
    const fallback = [
      { id: 42, key: "emerald_lock", value: 10000, short: "EL" },
      { id: 24, key: "obsidian_lock", value: 100, short: "OL" },
      { id: 9, key: "world_lock", value: 1, short: "WL" }
    ];
    const catalog = (window.GTModules && window.GTModules.itemCatalog) || {};
    if (typeof catalog.getBlocks === "function") {
      const rows = catalog.getBlocks();
      if (Array.isArray(rows)) {
        const out = [];
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i] || {};
          if (!row.worldLock) continue;
          const id = Math.floor(Number(row.id));
          if (!Number.isInteger(id) || id <= 0) continue;
          const value = Math.max(1, Math.floor(Number(row.lockValue) || 1));
          const key = String(row.key || "").trim() || ("lock_" + id);
          const short = key === "emerald_lock" ? "EL" : (key === "obsidian_lock" ? "OL" : "WL");
          out.push({ id, key, value, short });
        }
        if (out.length) {
          out.sort((a, b) => b.value - a.value || a.id - b.id);
          return out;
        }
      }
    }
    return fallback;
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

  function toCount(value) { return Math.max(0, Math.floor(Number(value) || 0)); }

  function toWallet(invRaw) {
    const inv = invRaw && typeof invRaw === "object" ? invRaw : {};
    const byId = {};
    let total = 0;
    for (let i = 0; i < LOCK_CURRENCIES.length; i++) {
      const row = LOCK_CURRENCIES[i];
      const c = toCount(inv[row.id]);
      byId[row.id] = c;
      total += c * row.value;
    }
    return { byId, total };
  }

  function fromWallet(totalValue) {
    let left = toCount(totalValue);
    const out = {};
    for (let i = 0; i < LOCK_CURRENCIES.length; i++) {
      const row = LOCK_CURRENCIES[i];
      const c = Math.floor(left / row.value);
      out[row.id] = Math.max(0, c);
      left -= c * row.value;
    }
    return out;
  }

  function walletText(byId) {
    const safe = byId && typeof byId === "object" ? byId : {};
    const parts = [];
    for (let i = 0; i < LOCK_CURRENCIES.length; i++) {
      const row = LOCK_CURRENCIES[i];
      const c = toCount(safe[row.id]);
      if (c > 0) parts.push(c + " " + row.short);
    }
    return parts.length ? parts.join(" | ") : "0 WL";
  }

  // UI helper: format bank value for display in lists when banks are considered infinite
  function formatBankForList(row) {
    if (INFINITE_BANK) return "Infinite";
    const v = (row && row.earningsLocks) ?? 0;
    return v + " WL";
  }

  function setStatus(el, message, mode) {
    if (!(el instanceof HTMLElement)) return;
    el.textContent = String(message || "");
    el.classList.remove("ok", "error");
    if (mode === "ok") el.classList.add("ok");
    if (mode === "error") el.classList.add("error");
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function normalizeToken(value) { return String(value || "").trim().toUpperCase() || "?"; }
  function symbolIcon(token) { return SYMBOL_ICONS[normalizeToken(token)] || SYMBOL_ICONS["?"]; }
  function symbolLabel(token) { return SYMBOL_LABELS[normalizeToken(token)] || normalizeToken(token); }
  function symbolClass(token) { return SYMBOL_CLASSES[normalizeToken(token)] || ""; }

  function parseRows(raw) {
    const text = String(raw || "");
    const rows = text.split("|").map((s) => String(s || "").trim()).filter(Boolean);
    const out = [];
    for (let i = 0; i < rows.length; i++) {
      out.push(rows[i].split(",").map((t) => normalizeToken(t)).filter(Boolean));
    }
    const normalized = out.filter((row) => row.length > 0);
    if (!normalized.length) return [];
    const singleCol = normalized.length > 1 && normalized.every((row) => row.length === 1);
    if (singleCol) return [normalized.map((row) => row[0])];
    return normalized;
  }

  function parseLineWins(raw) {
    if (Array.isArray(raw)) return raw.map((s) => String(s || "").trim()).filter(Boolean).slice(0, 18);
    return String(raw || "").split("|").map((s) => String(s || "").trim()).filter(Boolean).slice(0, 18);
  }

  function parseLineIds(raw) {
    if (Array.isArray(raw)) return raw.map((v) => Math.max(1, Math.floor(Number(v) || 0))).filter((v) => v > 0).slice(0, 12);
    return String(raw || "").split(",").map((v) => Math.max(1, Math.floor(Number(v) || 0))).filter((v) => v > 0).slice(0, 12);
  }

  function normalizeMachineRecord(tileKey, raw) {
    if (!raw || typeof raw !== "object") return null;
    const [txRaw, tyRaw] = String(tileKey || "").split("_");
    const tx = Math.floor(Number(txRaw));
    const ty = Math.floor(Number(tyRaw));
    if (!Number.isFinite(tx) || !Number.isFinite(ty)) return null;

    const type = String(raw.type || "").trim();
    if (SLOT_MACHINE_IDS.indexOf(type) < 0) return null;
    const def = MACHINE_DEFS[type] || MACHINE_DEFS.slots;
    const maxBetRaw = Math.floor(Number(raw.maxBet));
    const maxBet = Math.max(def.minBet, Math.min(def.maxBet, Number.isFinite(maxBetRaw) ? maxBetRaw : def.maxBet));
    const stats = raw.stats && typeof raw.stats === "object" ? raw.stats : {};

    return {
      tileKey: String(tileKey || ""),
      tx,
      ty,
      type: def.id,
      typeName: def.name,
      minBet: def.minBet,
      hardMaxBet: def.maxBet,
      maxPayoutMultiplier: def.maxPayoutMultiplier,
      reels: def.reels,
      rows: def.rows,
      maxBet,
      ownerAccountId: String(raw.ownerAccountId || "").trim(),
      ownerName: String(raw.ownerName || "").trim().slice(0, 20),
      inUseAccountId: String(raw.inUseAccountId || "").trim(),
      inUseName: String(raw.inUseName || "").trim().slice(0, 20),
      earningsLocks: toCount(raw.earningsLocks),
      updatedAt: toCount(raw.updatedAt),
      stats: {
        plays: toCount(stats.plays),
        totalBet: toCount(stats.totalBet),
        totalPayout: toCount(stats.totalPayout),
        lastOutcome: String(stats.lastOutcome || "").slice(0, 24),
        lastMultiplier: Math.max(0, Number(stats.lastMultiplier) || 0),
        lastSlotsText: String(stats.lastSlotsText || "").slice(0, 220),
        lastSlotsSummary: String(stats.lastSlotsSummary || "").slice(0, 220),
        lastSlotsLines: String(stats.lastSlotsLines || "").slice(0, 220),
        lastSlotsLineIds: String(stats.lastSlotsLineIds || "").slice(0, 120),
        lastPlayerName: String(stats.lastPlayerName || "").slice(0, 24),
        lastAt: toCount(stats.lastAt)
      }
    };
  }

  function getMachineByKey(tileKey) {
    const safe = String(tileKey || "");
    for (let i = 0; i < state.machines.length; i++) if (state.machines[i].tileKey === safe) return state.machines[i];
    return null;
  }

  function getSelectedMachine() { if (CASINO_MODE) return STANDALONE_MACHINE; return getMachineByKey(state.selectedMachineKey); }
  function machineLabel(machine) { return machine ? (machine.typeName + " @ " + machine.tx + "," + machine.ty) : "Unknown"; }

  function clearWorldRefs() {
    if (state.refs.machines && state.handlers.machines) state.refs.machines.off("value", state.handlers.machines);
    if (state.refs.inventory && state.handlers.inventory) state.refs.inventory.off("value", state.handlers.inventory);
    state.refs.machines = null;
    state.refs.inventory = null;
    state.handlers.machines = null;
    state.handlers.inventory = null;
    state.machines = [];
    state.selectedMachineKey = "";
    stopSpinFx();
  }

  function pushHistory(text, tone) {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    state.history.unshift({
      id: Date.now() + "_" + Math.random().toString(36).slice(2, 6),
      tone: tone || "",
      text: "[" + hh + ":" + mm + "] " + String(text || "")
    });
    if (state.history.length > 24) state.history.length = 24;
    renderHistory();
  }

  async function ensureDb() {
    if (state.db) return state.db;
    if (typeof dbModule.getOrInitAuthDb !== "function") throw new Error("DB module missing.");
    state.db = await dbModule.getOrInitAuthDb({
      network: state.network,
      firebaseRef: window.firebase,
      firebaseConfig: window.FIREBASE_CONFIG,
      getFirebaseApiKey: window.getFirebaseApiKey
    });
    return state.db;
  }
  function loadSavedCredentials() {
    if (typeof authStorageModule.loadCredentials === "function") return authStorageModule.loadCredentials(SAVED_AUTH_KEY);
    try {
      const raw = localStorage.getItem(SAVED_AUTH_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      return { username: String(parsed && parsed.username || ""), password: String(parsed && parsed.password || "") };
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
      // ignore
    }
  }

  function loadLastWorld() {
    try { return normalizeWorldId(localStorage.getItem(LAST_WORLD_KEY) || ""); }
    catch (_error) { return ""; }
  }

  function saveLastWorld(worldId) {
    try { localStorage.setItem(LAST_WORLD_KEY, normalizeWorldId(worldId)); }
    catch (_error) { /* ignore */ }
  }

  async function adjustWallet(delta) {
    const d = Math.floor(Number(delta) || 0);
    if (!state.refs.inventory || !state.user || !state.worldId || d === 0) return { ok: false, reason: "not-ready" };
    const txn = await state.refs.inventory.transaction((raw) => {
      const currentObj = raw && typeof raw === "object" ? { ...raw } : {};
      const wallet = toWallet(currentObj);
      const nextTotal = wallet.total + d;
      if (nextTotal < 0) return;
      const decomp = fromWallet(nextTotal);
      for (let i = 0; i < LOCK_CURRENCIES.length; i++) currentObj[LOCK_CURRENCIES[i].id] = toCount(decomp[LOCK_CURRENCIES[i].id]);
      return currentObj;
    });
    if (!txn || !txn.committed) return { ok: false, reason: d < 0 ? "not-enough" : "rejected" };
    const wallet = toWallet(txn.snapshot && typeof txn.snapshot.val === "function" ? txn.snapshot.val() : {});
    state.walletLocks = wallet.total;
    state.walletBreakdownText = walletText(wallet.byId);
    renderSession();
    return { ok: true, total: wallet.total };
  }

  function getMaxBetByBank(machine) {
    if (!machine) return 0;
    // Infinite bank mode for the web UI: no cap based on owner funds
    if (INFINITE_BANK) return Number.POSITIVE_INFINITY;
    const maxPayout = Math.max(1, Math.floor(Number(machine.maxPayoutMultiplier) || 1));
    return Math.max(0, Math.floor(toCount(machine.earningsLocks) / maxPayout));
  }

  function getSpinMaxBet(machine) {
    if (!machine) return 0;
    const bankMax = getMaxBetByBank(machine);
    return Math.max(0, Math.min(machine.maxBet, bankMax));
  }

  function clampBetToMachine(machine, betRaw) {
    if (!machine) return 1;
    const def = MACHINE_DEFS[machine.type] || MACHINE_DEFS.slots;
    const maxBet = Math.max(def.minBet, getSpinMaxBet(machine));
    const raw = Math.floor(Number(betRaw) || 0);
    return Math.max(def.minBet, Math.min(maxBet, raw || def.minBet));
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
    if (els.worldInput instanceof HTMLInputElement) els.worldInput.disabled = busy;
    if (els.loadWorldBtn instanceof HTMLButtonElement) els.loadWorldBtn.disabled = busy;
    if (els.machineSelect instanceof HTMLSelectElement) els.machineSelect.disabled = busy;
  }

  function renderSession() {
    if (els.sessionLabel instanceof HTMLElement) {
      els.sessionLabel.textContent = state.user ? ("@" + state.user.username + " (" + state.user.accountId + ")") : "Not logged in";
    }
    if (els.worldLabel instanceof HTMLElement) els.worldLabel.textContent = state.worldId || "No world loaded";
    if (els.walletLabel instanceof HTMLElement) {
      if (CASINO_MODE) {
        const w = (typeof getCasinoWallet === 'function') ? getCasinoWallet() : 0;
        els.walletLabel.textContent = "Demo Wallet: " + w;
      } else {
        els.walletLabel.textContent = state.walletLocks + " WL (" + state.walletBreakdownText + ")";
      }
    }
    if (els.logoutBtn instanceof HTMLButtonElement) els.logoutBtn.classList.toggle("hidden", !state.user);
  }

  function buildRowsForRender(machine) {
    if (state.ephemeral.rows && Array.isArray(state.ephemeral.rows) && state.ephemeral.rows.length) {
      return { rows: state.ephemeral.rows, lineIds: state.ephemeral.lineIds || [], lineWins: state.ephemeral.lineWins || [] };
    }
    if (!machine) return { rows: [["?"]], lineIds: [], lineWins: [] };
    const rows = parseRows(machine.stats.lastSlotsText);
    if (rows.length) {
      const parsedLineIds = parseLineIds(machine.stats.lastSlotsLineIds);
      const parsedLines = parseLineWins(machine.stats.lastSlotsLines);
      if (!parsedLineIds.length && machine.type === "slots" && String(machine.stats.lastOutcome || "") !== "lose") {
        parsedLineIds.push(1);
        if (!parsedLines.length && machine.stats.lastSlotsSummary) {
          parsedLines.push(String(machine.stats.lastSlotsSummary));
        }
      }
      return {
        rows,
        lineIds: parsedLineIds,
        lineWins: parsedLines
      };
    }
    const fallbackRows = [];
    for (let r = 0; r < machine.rows; r++) {
      fallbackRows[r] = [];
      for (let c = 0; c < machine.reels; c++) fallbackRows[r][c] = (SYMBOL_POOL[machine.type] || SYMBOL_POOL.slots)[0] || "?";
    }
    return { rows: fallbackRows, lineIds: [], lineWins: [] };
  }

  function normalizePattern(base, cols, rows) {
    const arr = Array.isArray(base) ? base : [];
    const safeCols = Math.max(1, Math.floor(Number(cols) || 1));
    const safeRows = Math.max(1, Math.floor(Number(rows) || 1));
    const fallback = Math.max(0, Math.min(safeRows - 1, Math.floor(Number(arr[arr.length - 1]) || 0)));
    const out = [];
    for (let c = 0; c < safeCols; c++) out.push(Math.max(0, Math.min(safeRows - 1, Math.floor(Number(arr[c]) || fallback))));
    return out;
  }

  function linePattern(lineId, cols, rows, machineType) {
    const id = Math.max(1, Math.floor(Number(lineId) || 1));
    if (machineType === "slots") return normalizePattern([0, 0, 0], cols, rows);
    return normalizePattern(PAYLINES_5[id - 1] || PAYLINES_5[0], cols, rows);
  }

  function buildHitMask(lineIds, cols, rows, machineType) {
    const mask = {};
    const ids = Array.isArray(lineIds) ? lineIds : [];
    for (let i = 0; i < ids.length; i++) {
      const pattern = linePattern(ids[i], cols, rows, machineType);
      for (let c = 0; c < pattern.length; c++) mask[pattern[c] + "_" + c] = true;
    }
    return mask;
  }

  function renderBoard() {
    if (!(els.slotBoard instanceof HTMLElement) || !(els.slotOverlay instanceof SVGElement) || !(els.lineList instanceof HTMLElement)) return;
    const machine = getSelectedMachine();
    const model = buildRowsForRender(machine);
    const rows = Array.isArray(model.rows) ? model.rows : [];
    const rowCount = Math.max(1, rows.length);
    let colCount = 1;
    for (let r = 0; r < rows.length; r++) colCount = Math.max(colCount, (rows[r] && rows[r].length) || 0);

    const safeMachineType = machine ? machine.type : "slots";
    const hitMask = buildHitMask(model.lineIds, colCount, rowCount, safeMachineType);
    let boardHtml = "";
    for (let c = 0; c < colCount; c++) {
      boardHtml += "<div class=\"reel\" style=\"--rows:" + rowCount + ";\">";
      for (let r = 0; r < rowCount; r++) {
        const tok = normalizeToken(rows[r] && rows[r][c] ? rows[r][c] : "?");
        const cls = symbolClass(tok);
        const hit = hitMask[r + "_" + c] ? " hit" : "";
        boardHtml += "<div class=\"cell " + cls + hit + "\" data-col=\"" + c + "\" data-row=\"" + r + "\"><span class=\"icon\">" + escapeHtml(symbolIcon(tok)) + "</span><span class=\"txt\">" + escapeHtml(symbolLabel(tok)) + "</span></div>";
      }
      boardHtml += "</div>";
    }
    els.slotBoard.style.setProperty("--cols", String(colCount));
    els.slotBoard.innerHTML = boardHtml;

    // --- draw paylines using real DOM cell centers (pixel-perfect) ---
els.slotOverlay.innerHTML = "";

const wrap = els.boardWrap;
if (wrap instanceof HTMLElement) {
  const wrapRect = wrap.getBoundingClientRect();

  // Make SVG coordinate system match boardWrap pixels
  const w = wrap.clientWidth;
  const h = wrap.clientHeight;
  els.slotOverlay.setAttribute("viewBox", `0 0 ${w} ${h}`);
  els.slotOverlay.setAttribute("width", String(w));
  els.slotOverlay.setAttribute("height", String(h));

  const getCellCenter = (col, row) => {
    const el = wrap.querySelector(`.cell[data-col="${col}"][data-row="${row}"]`);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      x: (r.left - wrapRect.left) + r.width / 2,
      y: (r.top - wrapRect.top) + r.height / 2
    };
  };

  for (let i = 0; i < model.lineIds.length; i++) {
    const pattern = linePattern(model.lineIds[i], colCount, rowCount, safeMachineType);

    const pts = [];
    for (let c = 0; c < pattern.length; c++) {
      const p = getCellCenter(c, pattern[c]);
      if (p) pts.push(p);
    }
    if (pts.length < 2) continue;

    const poly = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    poly.setAttribute("points", pts.map(p => `${p.x},${p.y}`).join(" "));
    els.slotOverlay.appendChild(poly);
  }
}

    const lineWins = model.lineWins.length ? model.lineWins : (model.lineIds.length ? model.lineIds.map((id) => "Line " + id) : []);
    if (lineWins.length) {
      els.lineList.innerHTML = lineWins.slice(0, 18).map((line, index) => "<span class=\"line-badge hot\">#" + (index + 1) + " " + escapeHtml(line) + "</span>").join("");
    } else {
      els.lineList.innerHTML = "<span class=\"line-badge muted\">No winning lines in the latest spin.</span>";
    }
  }

  function randomRowsForMachine(machine, tick) {
    const m = machine || MACHINE_DEFS.slots;
    const rows = Math.max(1, Math.floor(Number(m.rows) || 1));
    const cols = Math.max(1, Math.floor(Number(m.reels) || 3));
    const pool = SYMBOL_POOL[m.type] || SYMBOL_POOL.slots;
    const out = [];
    for (let r = 0; r < rows; r++) {
      out[r] = [];
      for (let c = 0; c < cols; c++) {
        const idx = Math.floor(Math.abs(Math.sin((tick + 1) * (r + 2) * (c + 4))) * pool.length) % pool.length;
        out[r][c] = pool[idx] || "?";
      }
    }
    return out;
  }

  function startSpinFx(machine) {
    stopSpinFx();
    state.spinBusy = true;
    if (els.boardWrap instanceof HTMLElement) els.boardWrap.classList.add("spinning");
    if (els.spinBtn instanceof HTMLButtonElement) {
      els.spinBtn.disabled = true;
      els.spinBtn.textContent = "Spinning...";
    }
    if (els.buyBonusBtn instanceof HTMLButtonElement) els.buyBonusBtn.disabled = true;
    let tick = 0;
    state.spinTimer = window.setInterval(() => {
      tick += 1;
      state.ephemeral.rows = randomRowsForMachine(machine, tick);
      state.ephemeral.lineIds = [];
      state.ephemeral.lineWins = ["Spinning..."];
      renderBoard();
    }, 90);
  }

  function stopSpinFx() {
    if (state.spinTimer) {
      window.clearInterval(state.spinTimer);
      state.spinTimer = 0;
    }
    state.spinBusy = false;
    if (els.boardWrap instanceof HTMLElement) els.boardWrap.classList.remove("spinning");
    if (els.spinBtn instanceof HTMLButtonElement) els.spinBtn.textContent = "Spin";
  }

  function setResult(text, tone) {
    if (!(els.resultBanner instanceof HTMLElement)) return;
    els.resultBanner.textContent = String(text || "");
    els.resultBanner.classList.remove("win", "jackpot");
    if (tone === "win") els.resultBanner.classList.add("win");
    if (tone === "jackpot") els.resultBanner.classList.add("jackpot");
  }

  function spawnParticles(tone) {
    if (!(els.particles instanceof HTMLElement)) return;
    const symbols = tone === "jackpot"
      ? ["\u2728", "\u{1F48E}", "\u{1FA99}", "\u{1F31F}", "\u{1F389}"]
      : ["\u2728", "\u{1F4A5}", "\u{1FA99}", "\u{1F4AB}"];
    const count = tone === "jackpot" ? 18 : 10;
    let html = "";
    for (let i = 0; i < count; i++) {
      const left = Math.floor(Math.random() * 95);
      const delay = Math.floor(Math.random() * 180);
      const size = 14 + Math.floor(Math.random() * 12);
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      html += "<span class=\"particle\" style=\"left:" + left + "%;animation-delay:" + delay + "ms;font-size:" + size + "px;\">" + symbol + "</span>";
    }
    els.particles.innerHTML = html;
    window.setTimeout(() => { if (els.particles instanceof HTMLElement) els.particles.innerHTML = ""; }, 1100);
  }

  function renderHistory() {
    if (!(els.historyList instanceof HTMLElement)) return;
    if (!state.history.length) {
      els.historyList.innerHTML = "<div class=\"history-row\">No spins yet.</div>";
      return;
    }
    els.historyList.innerHTML = state.history.map((row) => {
      const tone = row.tone === "jackpot" ? "jackpot" : (row.tone === "win" ? "win" : "");
      return "<div class=\"history-row " + tone + "\">" + escapeHtml(row.text) + "</div>";
    }).join("");
  }
  function renderMachineSelector() {
    if (!(els.machineSelect instanceof HTMLSelectElement) || !(els.machineList instanceof HTMLElement)) return;
    const rows = CASINO_MODE
      ? [STANDALONE_MACHINE]
      : state.machines.slice().sort((a, b) => a.ty - b.ty || a.tx - b.tx);
    if (!rows.length) {
      els.machineSelect.innerHTML = "<option value=\"\">No slot machines</option>";
      els.machineSelect.disabled = true;
      els.machineList.innerHTML = "<div class=\"machine-item\">No slot machine found in this world.</div>";
      state.selectedMachineKey = "";
      return;
    }

    if (!state.selectedMachineKey || !rows.some((r) => r.tileKey === state.selectedMachineKey)) {
      state.selectedMachineKey = rows[0].tileKey;
    }

    els.machineSelect.disabled = false;
    els.machineSelect.innerHTML = rows.map((row) => "<option value=\"" + escapeHtml(row.tileKey) + "\">" + escapeHtml(machineLabel(row)) + "</option>").join("");
    els.machineSelect.value = state.selectedMachineKey;

    els.machineList.innerHTML = rows.map((row) => {
      const active = row.tileKey === state.selectedMachineKey ? " active" : "";
      const inUse = row.inUseAccountId
        ? ("<span class=\"tag warn\">In use by @" + escapeHtml(row.inUseName || row.inUseAccountId) + "</span>")
        : "<span class=\"tag good\">Idle</span>";
      const owner = row.ownerName ? ("@" + row.ownerName) : row.ownerAccountId;
      return (
        "<div class=\"machine-item" + active + "\" data-machine-key=\"" + escapeHtml(row.tileKey) + "\">" +
          "<div style=\"color:#d9ebff;font-size:8px;margin-bottom:4px;\">" + escapeHtml(machineLabel(row)) + "</div>" +
          "<div style=\"display:flex;gap:6px;flex-wrap:wrap;margin-bottom:4px;\">" +
            "<span class=\"tag\">Owner: " + escapeHtml(owner || "unknown") + "</span>" +
            "<span class=\"tag\">Bank: " + formatBankForList(row) + "</span>" +
            inUse +
          "</div>" +
          "<div style=\"font-size:7px;color:#9db7da;\">Max Bet " + row.maxBet + " WL | " + row.stats.plays + " plays</div>" +
        "</div>"
      );
    }).join("");
  }

  function renderMachineStats() {
    const machine = getSelectedMachine();
    if (CASINO_MODE) {
      if (els.gameTitle instanceof HTMLElement) els.gameTitle.textContent = STANDALONE_MACHINE.typeName + "";
      if (els.gameSubtitle instanceof HTMLElement) els.gameSubtitle.textContent = "Standalone casino mode";
      if (els.statBank instanceof HTMLElement) els.statBank.textContent = "Bank: Infinite";
      if (els.statMaxBet instanceof HTMLElement) els.statMaxBet.textContent = "Max Bet: " + STANDALONE_MACHINE.maxBet + " WL";
      if (els.statPlays instanceof HTMLElement) els.statPlays.textContent = "Plays: " + STANDALONE_MACHINE.stats.plays;
      if (els.statPayout instanceof HTMLElement) els.statPayout.textContent = "Total Payout: " + STANDALONE_MACHINE.stats.totalPayout + " WL";
      if (els.spinBtn instanceof HTMLButtonElement) els.spinBtn.disabled = false;
      if (els.setMaxBtn instanceof HTMLButtonElement) els.setMaxBtn.disabled = false;
      if (els.buyBonusBtn instanceof HTMLButtonElement) {
        els.buyBonusBtn.classList.add("hidden");
        els.buyBonusBtn.disabled = true;
      }
      return;
    }
    if (!machine) {
      if (els.gameTitle instanceof HTMLElement) els.gameTitle.textContent = "No machine selected";
      if (els.gameSubtitle instanceof HTMLElement) els.gameSubtitle.textContent = "Load world and select a machine.";
      if (els.statBank instanceof HTMLElement) els.statBank.textContent = "Bank: 0 WL";
      if (els.statMaxBet instanceof HTMLElement) els.statMaxBet.textContent = "Max Bet: 0 WL";
      if (els.statPlays instanceof HTMLElement) els.statPlays.textContent = "Plays: 0";
      if (els.statPayout instanceof HTMLElement) els.statPayout.textContent = "Total Payout: 0 WL";
      if (els.stage instanceof HTMLElement) els.stage.classList.remove("theme-slots", "theme-slots_v2", "theme-slots_v3", "theme-slots_v4", "theme-slots_v6");
      if (els.spinBtn instanceof HTMLButtonElement) els.spinBtn.disabled = true;
      if (els.setMaxBtn instanceof HTMLButtonElement) els.setMaxBtn.disabled = true;
      if (els.buyBonusBtn instanceof HTMLButtonElement) {
        els.buyBonusBtn.classList.add("hidden");
        els.buyBonusBtn.disabled = true;
      }
      return;
    }

    if (els.gameTitle instanceof HTMLElement) els.gameTitle.textContent = machine.typeName + " (" + machine.tx + "," + machine.ty + ")";
    if (els.gameSubtitle instanceof HTMLElement) {
      const maxByBank = getMaxBetByBank(machine);
      const owner = machine.ownerName ? ("@" + machine.ownerName) : machine.ownerAccountId;
      const useText = machine.inUseAccountId && machine.inUseAccountId !== (state.user && state.user.accountId)
        ? (" | In use by @" + (machine.inUseName || machine.inUseAccountId))
        : "";
      els.gameSubtitle.textContent = "Owner " + owner + " | Bank cap bet " + maxByBank + " WL | Payout cap x" + machine.maxPayoutMultiplier + useText;
    }
    if (els.statBank instanceof HTMLElement) {
      const bankText = INFINITE_BANK ? "Infinite" : (machine.earningsLocks + " WL");
      els.statBank.textContent = "Bank: " + bankText;
    }
    if (els.statMaxBet instanceof HTMLElement) els.statMaxBet.textContent = "Max Bet: " + machine.maxBet + " WL";
    if (els.statPlays instanceof HTMLElement) els.statPlays.textContent = "Plays: " + machine.stats.plays;
    if (els.statPayout instanceof HTMLElement) els.statPayout.textContent = "Total Payout: " + machine.stats.totalPayout + " WL";

    if (els.stage instanceof HTMLElement) {
      els.stage.classList.remove("theme-slots", "theme-slots_v2", "theme-slots_v3", "theme-slots_v4", "theme-slots_v6");
      els.stage.classList.add("theme-" + machine.type);
    }

    const bet = clampBetToMachine(machine, els.betInput && els.betInput.value);
    if (els.betInput instanceof HTMLInputElement) {
      const min = machine.minBet;
      const max = Math.max(min, getSpinMaxBet(machine));
      els.betInput.min = String(min);
      els.betInput.max = String(max);
      els.betInput.value = String(bet);
      els.betInput.disabled = state.spinBusy;
    }
    const maxStake = Math.max(machine.minBet, getSpinMaxBet(machine));
    const busyByOther = Boolean(machine.inUseAccountId && machine.inUseAccountId !== (state.user && state.user.accountId));
    const canSpin = !state.spinBusy && !busyByOther && maxStake >= machine.minBet && state.walletLocks >= machine.minBet;

    if (els.setMaxBtn instanceof HTMLButtonElement) els.setMaxBtn.disabled = !canSpin;

    const buyEnabled = machine.type === "slots_v2";
    if (els.buyBonusBtn instanceof HTMLButtonElement) {
      els.buyBonusBtn.classList.toggle("hidden", !buyEnabled);
      if (buyEnabled) {
        const cost = clampBetToMachine(machine, els.betInput && els.betInput.value) * 10;
        els.buyBonusBtn.textContent = "Buy Bonus " + cost + " WL";
        const buyCost = clampBetToMachine(machine, els.betInput && els.betInput.value) * 10;
        els.buyBonusBtn.disabled = !canSpin || state.walletLocks < buyCost;
      }
    }

    if (els.spinBtn instanceof HTMLButtonElement) els.spinBtn.disabled = !canSpin;
  }

  function renderAll() {
    renderSession();
    renderMachineSelector();
    renderMachineStats();
    renderBoard();
    renderHistory();
  }

  function ensureStandaloneMachineInState() {
    state.machines = [STANDALONE_MACHINE];
    state.selectedMachineKey = STANDALONE_MACHINE.tileKey;
    renderAll();
  }

  async function resolveUserRole(accountId, username) {
    const db = await ensureDb();
    const basePath = String(window.GT_SETTINGS && window.GT_SETTINGS.BASE_PATH || "growtopia-test");
    try {
      const roleSnap = await db.ref(basePath + "/admin-roles/" + accountId).once("value");
      const val = roleSnap.val();
      if (typeof val === "string") return val.trim().toLowerCase();
      if (val && typeof val === "object" && typeof val.role === "string") return val.role.trim().toLowerCase();
    } catch (_error) {
      // ignore
    }
    const byName = window.GT_SETTINGS && window.GT_SETTINGS.ADMIN_ROLE_BY_USERNAME;
    return String(byName && typeof byName === "object" ? (byName[username] || "none") : "none").trim().toLowerCase();
  }

  async function loginWithPassword(createMode) {
    if (!(els.authUsername instanceof HTMLInputElement) || !(els.authPassword instanceof HTMLInputElement)) return;
    const username = String(els.authUsername.value || "").trim().toLowerCase();
    const password = String(els.authPassword.value || "");

    if (typeof authModule.validateCredentials === "function") {
      const validation = authModule.validateCredentials(username, password);
      if (validation) {
        setStatus(els.authStatus, validation, "error");
        return;
      }
    }

    setAuthBusy(true);
    setStatus(els.authStatus, createMode ? "Creating account..." : "Logging in...");
    try {
      const db = await ensureDb();
      const basePath = String(window.GT_SETTINGS && window.GT_SETTINGS.BASE_PATH || "growtopia-test");
      const firebaseRef = window.firebase;
      const usernameRef = db.ref(basePath + "/usernames/" + username);

      let accountId = "";
      if (createMode) {
        accountId = "acc_" + Math.random().toString(36).slice(2, 12);
        const reserve = await usernameRef.transaction((current) => {
          if (current) return;
          return accountId;
        });
        if (!reserve || !reserve.committed) throw new Error("Username already exists.");
        if (typeof authModule.sha256Hex !== "function") throw new Error("Auth module missing hash.");
        const passwordHash = await authModule.sha256Hex(password);
        await db.ref(basePath + "/accounts/" + accountId).set({
          username,
          passwordHash,
          createdAt: firebaseRef && firebaseRef.database ? firebaseRef.database.ServerValue.TIMESTAMP : Date.now()
        });
      } else {
        const userSnap = await usernameRef.once("value");
        accountId = String(userSnap.val() || "").trim();
        if (!accountId) throw new Error("Account not found.");
      }

      const accountSnap = await db.ref(basePath + "/accounts/" + accountId).once("value");
      const account = accountSnap.val() || {};
      if (typeof authModule.sha256Hex !== "function") throw new Error("Auth module missing hash.");
      const passwordHash = await authModule.sha256Hex(password);
      if (String(account.passwordHash || "") !== passwordHash) throw new Error("Invalid password.");
      const role = await resolveUserRole(accountId, username);
      state.user = { accountId, username, role };

      saveCredentials(username, password);
      renderSession();
      setStatus(els.authStatus, "Logged in as @" + username + ".", "ok");

      const lastWorld = loadLastWorld();
      if (lastWorld && els.worldInput instanceof HTMLInputElement) els.worldInput.value = lastWorld;
    } catch (error) {
      setStatus(els.authStatus, (error && error.message) || "Login failed.", "error");
    } finally {
      setAuthBusy(false);
    }
  }

  function logout() {
    clearWorldRefs();
    state.user = null;
    state.worldId = "";
    state.walletLocks = 0;
    state.walletBreakdownText = "0 WL";
    state.history = [];
    state.ephemeral.rows = null;
    state.ephemeral.lineIds = [];
    state.ephemeral.lineWins = [];
    renderAll();
    setStatus(els.authStatus, "Logged out.");
    setStatus(els.worldStatus, "Load a world to list slot machines.");
  }

  async function attachWorld(rawWorldId) {
    if (!state.user) {
      setStatus(els.worldStatus, "Login first.", "error");
      return;
    }
    const worldId = normalizeWorldId(rawWorldId);
    if (!worldId) {
      setStatus(els.worldStatus, "Invalid world id.", "error");
      return;
    }

    setWorldBusy(true);
    setStatus(els.worldStatus, "Loading world " + worldId + "...");
    try {
      const db = await ensureDb();
      const basePath = String(window.GT_SETTINGS && window.GT_SETTINGS.BASE_PATH || "growtopia-test");
      clearWorldRefs();
      state.worldId = worldId;
      saveLastWorld(worldId);

      const rootRef = db.ref(basePath + "/worlds/" + worldId);
      state.refs.machines = rootRef.child("gamble-machines");
      state.refs.inventory = db.ref(basePath + "/player-inventories/" + state.user.accountId);

      state.handlers.machines = (snap) => {
        const value = snap.val();
        const rows = [];
        if (value && typeof value === "object") {
          Object.keys(value).forEach((tileKey) => {
            const row = normalizeMachineRecord(tileKey, value[tileKey]);
            if (row) rows.push(row);
          });
        }
        state.machines = rows;
        if (state.selectedMachineKey && !rows.some((r) => r.tileKey === state.selectedMachineKey)) state.selectedMachineKey = "";
        renderAll();
      };

      state.handlers.inventory = (snap) => {
        const wallet = toWallet(snap && typeof snap.val === "function" ? snap.val() : {});
        state.walletLocks = wallet.total;
        state.walletBreakdownText = walletText(wallet.byId);
        renderSession();
        renderMachineStats();
      };

      state.refs.machines.on("value", state.handlers.machines);
      state.refs.inventory.on("value", state.handlers.inventory);

      setStatus(els.worldStatus, "Loaded world " + worldId + ".", "ok");
      pushHistory("World loaded: " + worldId, "");
      renderAll();
    } catch (error) {
      setStatus(els.worldStatus, (error && error.message) || "Failed to load world.", "error");
    } finally {
      setWorldBusy(false);
    }
  }

  function spinMessage(machine, result, wager, payout, buyBonus) {
    const diff = payout - wager;
    const outcome = String(result && result.outcome || "").toLowerCase();
    const tone = outcome === "jackpot" ? "jackpot" : (diff > 0 ? "win" : "");
    let text = machine.typeName + (buyBonus ? " (Buy Bonus)" : "") + ": ";
    if (diff > 0) text += "Won +" + diff + " WL";
    else if (diff < 0) text += "Lost " + Math.abs(diff) + " WL";
    else text += "Break-even";
    const summary = String(result && result.summary || "").trim();
    if (summary) text += " | " + summary;
    return { text, tone };
  }

  function rowsFromResult(reels, machineType) {
    const arr = Array.isArray(reels) ? reels : [];
    if (!arr.length) return [["?"]];
    if (machineType === "slots") return [arr.map((v) => normalizeToken(v))];
    const rows = [];
    for (let i = 0; i < arr.length; i++) {
      const row = String(arr[i] || "").split(",").map((v) => normalizeToken(v)).filter(Boolean);
      rows.push(row.length ? row : ["?"]);
    }
    const normalized = rows.filter((row) => row.length > 0);
    const singleCol = normalized.length > 1 && normalized.every((row) => row.length === 1);
    if (singleCol) return [normalized.map((row) => row[0])];
    return normalized.length ? normalized : [["?"]];
  }

  async function runSpin(mode) {
    // Standalone casino mode spin path
    if (CASINO_MODE) return runStandaloneSpin(mode);
    if (state.spinBusy) return;
    if (!state.user || !state.worldId) {
      setResult("Login and load a world first.");
      return;
    }
    if (typeof slotsModule.spin !== "function") {
      setResult("Slots module unavailable.");
      return;
    }

    const machine = getSelectedMachine();
    if (!machine) {
      setResult("No slots machine selected.");
      return;
    }
    if (machine.inUseAccountId && machine.inUseAccountId !== state.user.accountId) {
      setResult("Machine is in use by @" + (machine.inUseName || machine.inUseAccountId) + ".");
      return;
    }

    const buyBonus = mode === "buybonus" && machine.type === "slots_v2";
    const buyX = buyBonus ? 10 : 1;
    const bet = clampBetToMachine(machine, els.betInput && els.betInput.value);
    const maxByBank = getSpinMaxBet(machine);
    if (bet > maxByBank) {
      setResult("Machine bank cap is " + maxByBank + " WL for this game.");
      return;
    }

    const wager = bet * buyX;
    if (state.walletLocks < wager) {
      setResult("Not enough locks. Need " + wager + " WL.");
      return;
    }

    if (els.spinModeTag instanceof HTMLElement) {
      els.spinModeTag.textContent = buyBonus ? "Mode: Buy Bonus" : "Mode: Spin";
      els.spinModeTag.classList.toggle("hot", buyBonus);
    }
    setResult("Spinning " + machine.typeName + (buyBonus ? " (Buy Bonus)" : "") + "...");
    startSpinFx(machine);

    const debit = await adjustWallet(-wager);
    if (!debit.ok) {
      stopSpinFx();
      state.ephemeral.rows = null;
      setResult(debit.reason === "not-enough" ? "Not enough locks in wallet." : "Failed to spend locks.");
      renderAll();
      return;
    }

    let applied = false;
    let resolved = null;
    let payout = 0;

    try {
      const db = await ensureDb();
      const basePath = String(window.GT_SETTINGS && window.GT_SETTINGS.BASE_PATH || "growtopia-test");
      const ref = db.ref(basePath + "/worlds/" + state.worldId + "/gamble-machines/" + machine.tileKey);
      const playerName = String(state.user.username || "").slice(0, 24);
      const playerId = String(state.user.accountId || "").trim();

      const txn = await ref.transaction((currentRaw) => {
        const current = normalizeMachineRecord(machine.tileKey, currentRaw);
        if (!current) return currentRaw;
        if (current.inUseAccountId && current.inUseAccountId !== playerId) return currentRaw;

        const liveMax = getSpinMaxBet(current);
        if (bet > liveMax) return currentRaw;

        const rawResult = slotsModule.spin(current.type, bet, buyBonus ? { mode: "buybonus" } : {}) || {};
        const resultWager = Math.max(1, Math.floor(Number(rawResult.bet) || wager));
        const wanted = Math.max(0, Math.floor(Number(rawResult.payoutWanted) || 0));
        if (resultWager !== wager) return currentRaw;
        if ((current.earningsLocks + resultWager - wanted) < 0) return currentRaw;

        const lines = Array.isArray(rawResult.lineWins) ? rawResult.lineWins.map((s) => String(s || "").trim()).filter(Boolean) : [];
        const lineIds = Array.isArray(rawResult.lineIds) ? rawResult.lineIds.map((n) => Math.max(1, Math.floor(Number(n) || 0))).filter((n) => n > 0) : [];
        const reels = Array.isArray(rawResult.reels) ? rawResult.reels : [];
        const nextAt = Date.now();
        if (!lineIds.length && String(rawResult.gameId || current.type || "") === "slots" && wanted > 0) {
          lineIds.push(1);
          if (!lines.length && rawResult.summary) {
            lines.push(String(rawResult.summary));
          }
        }

        const stats = current.stats && typeof current.stats === "object" ? { ...current.stats } : {};
        stats.plays = toCount(stats.plays) + 1;
        stats.totalBet = toCount(stats.totalBet) + resultWager;
        stats.totalPayout = toCount(stats.totalPayout) + wanted;
        stats.lastOutcome = String(rawResult.outcome || "lose").slice(0, 24);
        stats.lastMultiplier = Math.max(0, Number(rawResult.multiplier) || 0);
        stats.lastSlotsText = reels.join("|").slice(0, 220);
        stats.lastSlotsSummary = String(rawResult.summary || "").slice(0, 220);
        stats.lastSlotsLines = lines.join(" | ").slice(0, 220);
        stats.lastSlotsLineIds = lineIds.join(",").slice(0, 120);
        stats.lastPlayerName = playerName;
        stats.lastAt = nextAt;

        applied = true;
        payout = wanted;
        resolved = {
          type: current.type,
          rows: rowsFromResult(reels, current.type),
          lineWins: lines,
          lineIds: lineIds,
          outcome: stats.lastOutcome,
          multiplier: stats.lastMultiplier,
          summary: stats.lastSlotsSummary,
          wager: resultWager
        };

        return {
          ...currentRaw,
          earningsLocks: Math.max(0, current.earningsLocks + resultWager - wanted),
          updatedAt: nextAt,
          stats
        };
      });

      if (!txn || !txn.committed || !applied || !resolved) {
        await adjustWallet(wager);
        stopSpinFx();
        state.ephemeral.rows = null;
        setResult("Spin rejected (machine state changed or limits changed).");
        renderAll();
        return;
      }

      if (payout > 0) {
        let credited = false;
        for (let i = 0; i < 3; i++) {
          const credit = await adjustWallet(payout);
          if (credit && credit.ok) { credited = true; break; }
        }
        if (!credited) pushHistory("Payout credit retry pending for " + payout + " WL.", "");
      }

      stopSpinFx();
      state.ephemeral.rows = resolved.rows;
      state.ephemeral.lineWins = resolved.lineWins;
      state.ephemeral.lineIds = resolved.lineIds;
      renderBoard();
      const msg = spinMessage(machine, resolved, resolved.wager, payout, buyBonus);
      setResult(msg.text, msg.tone);
      pushHistory(msg.text, msg.tone);
      if (msg.tone === "win" || msg.tone === "jackpot") {
        if (els.boardWrap instanceof HTMLElement) {
          els.boardWrap.classList.add("winfx");
          window.setTimeout(() => { if (els.boardWrap instanceof HTMLElement) els.boardWrap.classList.remove("winfx"); }, 420);
        }
        spawnParticles(msg.tone);
      }
      renderAll();
    } catch (error) {
      await adjustWallet(wager);
      stopSpinFx();
      state.ephemeral.rows = null;
      setResult((error && error.message) || "Spin failed.");
      renderAll();
    }
  }

  function bindEvents() {
    if (els.openDashboardBtn instanceof HTMLButtonElement) els.openDashboardBtn.addEventListener("click", () => { window.location.href = "gambling.html"; });
    if (els.openGameBtn instanceof HTMLButtonElement) els.openGameBtn.addEventListener("click", () => { window.location.href = "index.html"; });
    if (els.toggleCasinoBtn instanceof HTMLButtonElement) els.toggleCasinoBtn.addEventListener("click", () => {
      CASINO_MODE = !CASINO_MODE;
      if (CASINO_MODE) {
        // Enter demo casino mode with standalone machine
        state.machines = [STANDALONE_MACHINE];
        state.selectedMachineKey = STANDALONE_MACHINE.tileKey;
      } else {
        // Exit demo casino mode
        state.machines = [];
        state.selectedMachineKey = "";
      }
      renderAll();
    });
    if (els.logoutBtn instanceof HTMLButtonElement) els.logoutBtn.addEventListener("click", logout);

    if (els.authLoginBtn instanceof HTMLButtonElement) els.authLoginBtn.addEventListener("click", () => loginWithPassword(false));
    if (els.authCreateBtn instanceof HTMLButtonElement) els.authCreateBtn.addEventListener("click", () => loginWithPassword(true));
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
    if (els.worldInput instanceof HTMLInputElement) {
      els.worldInput.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        attachWorld(els.worldInput.value || "");
      });
    }

    if (els.machineSelect instanceof HTMLSelectElement) {
      els.machineSelect.addEventListener("change", () => {
        state.selectedMachineKey = String(els.machineSelect.value || "");
        state.ephemeral.rows = null;
        state.ephemeral.lineWins = [];
        state.ephemeral.lineIds = [];
        renderAll();
      });
    }

    if (els.machineList instanceof HTMLElement) {
      els.machineList.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const item = target.closest(".machine-item");
        if (!(item instanceof HTMLElement)) return;
        const key = String(item.dataset.machineKey || "");
        if (!key) return;
        state.selectedMachineKey = key;
        state.ephemeral.rows = null;
        state.ephemeral.lineWins = [];
        state.ephemeral.lineIds = [];
        renderAll();
      });
    }

    if (els.setMaxBtn instanceof HTMLButtonElement) {
      els.setMaxBtn.addEventListener("click", () => {
        const machine = getSelectedMachine();
        if (!machine || !(els.betInput instanceof HTMLInputElement)) return;
        els.betInput.value = String(Math.max(machine.minBet, getSpinMaxBet(machine)));
      });
    }

    if (els.spinBtn instanceof HTMLButtonElement) els.spinBtn.addEventListener("click", () => runSpin("spin"));
    if (els.buyBonusBtn instanceof HTMLButtonElement) els.buyBonusBtn.addEventListener("click", () => runSpin("buybonus"));

    if (els.betInput instanceof HTMLInputElement) {
      els.betInput.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        runSpin("spin");
      });
      els.betInput.addEventListener("input", () => {
        const machine = getSelectedMachine();
        if (!machine) return;
        els.betInput.value = String(clampBetToMachine(machine, els.betInput.value));
        renderMachineStats();
      });
    }

    if (els.quickBetRow instanceof HTMLElement) {
      els.quickBetRow.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement) || !(els.betInput instanceof HTMLInputElement)) return;
        const raw = target.dataset.bet;
        if (!raw) return;
        const machine = getSelectedMachine();
        if (!machine) return;
        const add = Math.max(1, Math.floor(Number(raw) || 0));
        const current = Math.max(machine.minBet, Math.floor(Number(els.betInput.value) || machine.minBet));
        els.betInput.value = String(clampBetToMachine(machine, current + add));
        renderMachineStats();
      });
    }

    window.addEventListener("beforeunload", () => { clearWorldRefs(); });
  }

  function init() {
    bindEvents();
    renderAll();

    const saved = loadSavedCredentials();
    if (els.authUsername instanceof HTMLInputElement && saved.username) els.authUsername.value = String(saved.username || "").slice(0, 20);
    if (els.authPassword instanceof HTMLInputElement && saved.password) els.authPassword.value = String(saved.password || "").slice(0, 64);

    if (els.worldInput instanceof HTMLInputElement) {
      const lastWorld = loadLastWorld();
      if (lastWorld) els.worldInput.value = lastWorld;
    }

    setStatus(els.authStatus, "Login with your game account.");
    setStatus(els.worldStatus, "Load a world to list slot machines.");
    setResult("Ready. Pick machine, set bet, spin.");
  }

  init();
})();
