window.GTModules = window.GTModules || {};

(function initGamblingSlotsSite() {
  "use strict";

  const SAVED_AUTH_KEY = "growtopia_saved_auth_v1";
  const GAME_IDS = ["blackjack", "slots_v2", "le_bandit", "tower", "mines", "snoop_dogg_dollars"];

  // This page is now a standalone casino site.
  // World-based machine browsing is on gambling.html

  // Demo casino mode: independent slot experience not tied to user-hosted machines
  const STANDALONE_MACHINE = {
    tileKey: "demo_slots",
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
      lastSlotsLines: "",
      blackjackState: null // { deck, playerHand, dealerHand, active, message }
    }
  };

  // UI-only feature: show different slot game names than the in-game machines
  // This makes the web gamble UI feel distinct from the actual game slots.
  const INFINITE_BANK = true; // toggle to make all banks infinite in the UI
  const UI_GAME_ALIASES = {
    blackjack: "Blackjack",
    slots_v2: "Six Six Six",
    le_bandit: "Le Bandit",
    tower: "Tower",
    mines: "Mines",
    snoop_dogg_dollars: "Snoop Dogg Dollars"
  };
  const SNOOP_UI = {
    hypeCostX: 20,
    buyCostByScatter: { 3: 80, 4: 140, 5: 220, 6: 320 }
  };
  const BONUS_PHASES = {
    BASE_IDLE: "BASE_IDLE",
    BASE_SPINNING: "BASE_SPINNING",
    BASE_CASCADE: "BASE_CASCADE",
    BONUS_INTRO: "BONUS_INTRO",
    BONUS_SPINNING: "BONUS_SPINNING",
    BONUS_CASCADE: "BONUS_CASCADE",
    BONUS_END: "BONUS_END"
  };
  const TOWER_CONFIG = {
    floors: 8,
    cols: 5,
    difficulties: {
      easy: { id: "easy", label: "Easy", traps: 1, stepMult: 1.19 },
      normal: { id: "normal", label: "Normal", traps: 2, stepMult: 1.58 },
      hard: { id: "hard", label: "Hard", traps: 3, stepMult: 2.38 },
      extreme: { id: "extreme", label: "Extreme", traps: 4, stepMult: 4.75 }
    }
  };
  const MINES_CONFIG = {
    rows: 5,
    cols: 5,
    totalTiles: 25,
    minMines: 1,
    maxMines: 24,
    defaultMines: 5,
    houseEdge: 0.04
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
    COIN: "Coin", ORE: "Ore", CART: "Cart", RELC: "Relic", "?": "Unknown",
    BONE: "Bone", PENT: "Pentagram", BLU_6: "Blue 6", RED_6: "Red 6",
    TRAP: "Trap", CHEESE: "Cheese", BEER: "Beer", BAG: "Bag", HAT: "Hat", WINT: "Wanted", RAIN: "Rain",
    CLOVR: "Clover", POT: "Pot of Gold", LOCK: "Locked",
    MULT: "Multiplier", BOMB: "Bomb", JACK: "Jackpot", COL: "Collect", BLANK: "Tease",
    DIME: "Dime Bag", LITE: "Lighter", MIC: "Mic", BILL: "Dollar", CHN: "Chain", LOWR: "Lowrider", DOGG: "Dogg", CROW: "Crown", WEED: "Weed"
  };

  const SYMBOL_ICONS = {
    CHERRY: "\u{1F352}", LEMON: "\u{1F34B}", BAR: "\u25A0", BELL: "\u{1F514}", SEVEN: "7", "7": "7",
    GEM: "\u{1F48E}", PICK: "\u26CF", MINER: "\u{1F477}", GOLD: "\u{1FA99}", DYN: "\u{1F4A3}", WILD: "\u2728", SCAT: "\u{1F31F}", BONUS: "\u{1F381}",
    RUBY: "\u2666", EMER: "\u{1F49A}", CLUB: "\u2663", RING: "\u{1F48D}", SKULL: "\u{1F480}", REAPR: "\u2620", BLOOD: "\u{1FA78}",
    LEAF: "\u{1F343}", STON: "\u{1FAA8}", MASK: "\u{1F3AD}", IDOL: "\u{1F5FF}", ORAC: "\u{1F52E}", FRGT: "\u{1F56F}",
    COIN: "\u{1FA99}", ORE: "\u26D3", CART: "\u{1F6D2}", RELC: "\u{1F4FF}", "?": "\u2754",
    BONE: "\u{1F9B4}", PENT: "\u2721", BLU_6: "\u{1F535}6", RED_6: "\u{1F534}6",
    TRAP: "\u{1F4A9}", CHEESE: "\u{1F9C0}", BEER: "\u{1F37A}", BAG: "\u{1F4B0}", HAT: "\u{1F3A9}", WINT: "\u{1F46E}", RAIN: "\u{1F308}",
    CLOVR: "\u2618", POT: "\u{1F4B0}", LOCK: "\u{1F512}",
    MULT: "\u2716", BOMB: "\u{1F4A3}", JACK: "\u{1F451}", COL: "\u{1F9F2}", BLANK: "\u2736",
    DIME: "\u{1F4BC}", LITE: "\u{1F526}", MIC: "\u{1F3A4}", BILL: "\u{1F4B5}", CHN: "\u26D3", LOWR: "\u{1F697}", DOGG: "\u{1F436}", CROW: "\u{1F451}", WEED: "\u{1F33F}"
  };

  const SYMBOL_CLASSES = {
    WILD: "wild",
    SCAT: "scatter",
    BONUS: "bonus",
    DYN: "bonus",
    BLU_6: "sixblu",
    RED_6: "sixred",
    WINT: "wanted",
    RAIN: "rain",
    CLOVR: "rain",
    POT: "bonus",
    LOCK: "locked",
    MULT: "bonus",
    BOMB: "bonus",
    JACK: "bonus",
    COL: "scatter",
    BLANK: "locked",
    WEED: "bonus"
  };
  const SYMBOL_POOL = {
    blackjack: ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"],
    slots: ["CHERRY", "LEMON", "BAR", "BELL", "SEVEN"],
    slots_v2: ["SKULL", "BONE", "REAPR", "BLOOD", "PENT", "WILD"],
    le_bandit: ["TRAP", "CHEESE", "BEER", "BAG", "HAT", "WINT", "WILD", "RAIN", "COIN"],
    slots_v3: ["RUBY", "EMER", "CLUB", "RING", "SKULL", "REAPR", "BLOOD", "WILD", "SCAT"],
    slots_v4: ["LEAF", "STON", "MASK", "IDOL", "ORAC", "FRGT", "WILD", "SCAT"],
    slots_v6: ["COIN", "ORE", "GEM", "PICK", "CART", "RELC", "WILD", "SCAT"],
    snoop_dogg_dollars: ["DIME", "LITE", "LEAF", "MIC", "BILL", "CHN", "LOWR", "DOGG", "CROW", "SCAT", "WILD", "WEED", "SKULL"]
  };

  const authModule = (window.GTModules && window.GTModules.auth) || {};
  const authStorageModule = (window.GTModules && window.GTModules.authStorage) || {};
  const dbModule = (window.GTModules && window.GTModules.db) || {};
  const slotsModule = (window.GTModules && window.GTModules.slots) || {};

  const MACHINE_DEFS = buildMachineDefinitions();
  const LOCK_CURRENCIES = resolveLockCurrencies();
  const DISPLAY_LOCK_ORDER = ["WL", "OL", "EL", "RL"];
  const MACHINE_CATEGORY_DEFS = [
    { id: "all", label: "All Games" },
    { id: "slots", label: "Slots" },
    { id: "table", label: "Table" },
    { id: "risk", label: "Risk" }
  ];

  const state = {
    db: null,
    network: {},
    user: null,
    machines: [],
    selectedMachineKey: "",
    walletLocks: 0,
    webVaultLocks: 0,
    walletBreakdownText: "0 WL",
    refs: { inventory: null },
    handlers: { inventory: null },
    spinBusy: false,
    spinTimer: 0,
    currentBetValue: 1,
    lockDisplayIndex: 0,
    machineCategory: "all",
    ephemeral: { rows: null, lineIds: [], lineWins: [], markedCells: [], cellMeta: {}, effectCells: {}, upgradeFlashes: {} },
    bonusFlow: {
      phase: "BASE_IDLE",
      active: false,
      machineType: "",
      spinsLeft: 0,
      bonusWin: 0,
      currentSpinWin: 0,
      stickyWilds: 0,
      multiplierCells: 0
    },
    tower: {
      roundsByMachine: {},
      difficultyByMachine: {}
    },
    mines: {
      roundsByMachine: {},
      minesByMachine: {}
    }
  };

  const els = {
    openVaultBtn: document.getElementById("openVaultBtn"),
    vaultModal: document.getElementById("vaultModal"),
    vaultAmount: document.getElementById("vaultAmount"),
    vaultDepositBtn: document.getElementById("vaultDepositBtn"),
    vaultWithdrawBtn: document.getElementById("vaultWithdrawBtn"),
    closeVaultBtn: document.getElementById("closeVaultBtn"),
    vaultStatus: document.getElementById("vaultStatus"),
    openDashboardBtn: document.getElementById("openDashboardBtn"),
    openGameBtn: document.getElementById("openGameBtn"),
    logoutBtn: document.getElementById("logoutBtn"),
    authUsername: document.getElementById("authUsername"),
    authPassword: document.getElementById("authPassword"),
    authLoginBtn: document.getElementById("authLoginBtn"),
    authCreateBtn: document.getElementById("authCreateBtn"),
    authStatus: document.getElementById("authStatus"),
    sessionLabel: document.getElementById("sessionLabel"),
    walletLabel: document.getElementById("walletLabel"),
    machineSelect: document.getElementById("machineSelect"),
    machineCategoryTabs: document.getElementById("machineCategoryTabs"),
    machineList: document.getElementById("machineList"),
    currentBetDisplay: document.getElementById("currentBetDisplay"),
    towerDifficultyWrap: document.getElementById("towerDifficultyWrap"),
    towerDifficultySelect: document.getElementById("towerDifficultySelect"),
    minesCountWrap: document.getElementById("minesCountWrap"),
    minesCountSelect: document.getElementById("minesCountSelect"),
    snoopBuyWrap: document.getElementById("snoopBuyWrap"),
    snoopBuySelect: document.getElementById("snoopBuySelect"),
    spinBtn: document.getElementById("spinBtn"),
    towerCashoutBtn: document.getElementById("towerCashoutBtn"),
    minesCashoutBtn: document.getElementById("minesCashoutBtn"),
    snoopHypeBtn: document.getElementById("snoopHypeBtn"),
    snoopBuyBtn: document.getElementById("snoopBuyBtn"),
    bjHitBtn: document.getElementById("bjHitBtn"),
    bjStandBtn: document.getElementById("bjStandBtn"),
    bjDoubleBtn: document.getElementById("bjDoubleBtn"),
    bjSplitBtn: document.getElementById("bjSplitBtn"),
    buyBonusBtn: document.getElementById("buyBonusBtn"),
    lastWinLabel: document.getElementById("lastWinLabel"),
    stage: document.getElementById("stage"),
    boardWrap: document.getElementById("boardWrap"),
    slotBoard: document.getElementById("slotBoard"),
    slotOverlay: document.getElementById("slotOverlay"),
    particles: document.getElementById("particles"),
    lineList: document.getElementById("lineList"),
    bonusHud: document.getElementById("bonusHud"),
    bonusHudState: document.getElementById("bonusHudState"),
    bonusHudLeft: document.getElementById("bonusHudLeft"),
    bonusHudWin: document.getElementById("bonusHudWin"),
    bonusHudSpin: document.getElementById("bonusHudSpin"),
    bonusHudSticky: document.getElementById("bonusHudSticky"),
    bonusHudMulti: document.getElementById("bonusHudMulti"),
    bonusBanner: document.getElementById("bonusBanner"),
    bonusOverlay: document.getElementById("bonusOverlay"),
    bonusOverlayTitle: document.getElementById("bonusOverlayTitle"),
    bonusOverlayText: document.getElementById("bonusOverlayText"),
    bonusOverlaySub: document.getElementById("bonusOverlaySub"),
    bonusOverlayContinueBtn: document.getElementById("bonusOverlayContinueBtn"),
    statBank: document.getElementById("statBank"),
    statMaxBet: document.getElementById("statMaxBet"),
    statPlays: document.getElementById("statPlays"),
    statPayout: document.getElementById("statPayout"),
    userBalanceDisplay: document.getElementById("userBalanceDisplay"),
    viewLogin: document.getElementById("viewLogin"),
    viewLobby: document.getElementById("viewLobby"),
    viewGame: document.getElementById("viewGame"),
    backToLobbyBtn: document.getElementById("backToLobbyBtn")
  };

  function buildMachineDefinitions() {
    const slotsDefs = typeof slotsModule.getDefinitions === "function" ? slotsModule.getDefinitions() : {};
    const fallback = {
      blackjack: { name: "Blackjack", minBet: 1, maxBet: 20000, maxPayoutMultiplier: 2.5, reels: 0, rows: 0 },
      slots: { name: "Classic Slots", minBet: 1, maxBet: 30000, maxPayoutMultiplier: 10, reels: 3, rows: 1 },
      slots_v2: { name: "Neon Mine", minBet: 1, maxBet: 30000, maxPayoutMultiplier: 50, reels: 5, rows: 4 },
      slots_v3: { name: "Blood Vault", minBet: 1, maxBet: 30000, maxPayoutMultiplier: 5000, reels: 5, rows: 4 },
      slots_v4: { name: "Ancient Jungle", minBet: 1, maxBet: 30000, maxPayoutMultiplier: 5000, reels: 5, rows: 4 },
      slots_v6: { name: "Deep Core", minBet: 1, maxBet: 30000, maxPayoutMultiplier: 5000, reels: 5, rows: 3 },
      le_bandit: { name: "Le Bandit", minBet: 1, maxBet: 30000, maxPayoutMultiplier: 10000, reels: 6, rows: 5 },
      tower: { name: "Tower", minBet: 1, maxBet: 30000, maxPayoutMultiplier: 25000, reels: 5, rows: 8 },
      mines: { name: "Mines", minBet: 1, maxBet: 30000, maxPayoutMultiplier: 25000, reels: 5, rows: 5 },
      snoop_dogg_dollars: { name: "Snoop Dogg Dollars", minBet: 1, maxBet: 30000, maxPayoutMultiplier: 10000, reels: 6, rows: 8 }
    };
    const out = {};
    GAME_IDS.forEach((id) => {
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

  // Blackjack Logic
  function getDeck() {
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];
    for (let s of suits) {
      for (let r of ranks) {
        let val = parseInt(r);
        if (isNaN(val)) val = (r === 'A') ? 11 : 10;
        deck.push({ rank: r, suit: s, value: val, color: (s === '♥' || s === '♦') ? 'red' : 'black' });
      }
    }
    return deck.sort(() => Math.random() - 0.5);
  }

  function calculateHand(hand) {
    let score = 0;
    let aces = 0;
    for (let c of hand) {
      score += c.value;
      if (c.rank === 'A') aces++;
    }
    while (score > 21 && aces > 0) {
      score -= 10;
      aces--;
    }
    return score;
  }

  function isBlackjack(hand) {
    return hand.length === 2 && calculateHand(hand) === 21;
  }

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
  function nextFrame() { return new Promise((resolve) => window.requestAnimationFrame(() => resolve())); }

  function setBonusPhase(phase) {
    const next = String(phase || BONUS_PHASES.BASE_IDLE);
    state.bonusFlow.phase = next;
    state.bonusFlow.active = next.indexOf("BONUS_") === 0;
    if (els.stage instanceof HTMLElement) els.stage.dataset.bonusPhase = next;
  }

  function showBonusHud(show) {
    if (!(els.bonusHud instanceof HTMLElement)) return;
    els.bonusHud.classList.toggle("hidden", !show);
  }

  function updateBonusHud(data) {
    const row = data && typeof data === "object" ? data : {};
    state.bonusFlow.spinsLeft = Math.max(0, Math.floor(Number(row.spinsLeft) || 0));
    state.bonusFlow.bonusWin = Math.max(0, Math.floor(Number(row.bonusWin) || 0));
    state.bonusFlow.currentSpinWin = Math.max(0, Math.floor(Number(row.currentSpinWin) || 0));
    state.bonusFlow.stickyWilds = Math.max(0, Math.floor(Number(row.stickyWilds) || 0));
    state.bonusFlow.multiplierCells = Math.max(0, Math.floor(Number(row.multiplierCells) || 0));

    if (els.bonusHudState instanceof HTMLElement) {
      const mode = String(row.mode || "FREE SPINS");
      els.bonusHudState.textContent = mode;
    }
    if (els.bonusHudLeft instanceof HTMLElement) els.bonusHudLeft.textContent = "Left: " + state.bonusFlow.spinsLeft;
    if (els.bonusHudWin instanceof HTMLElement) els.bonusHudWin.textContent = "Bonus Win: " + state.bonusFlow.bonusWin + " WL";
    if (els.bonusHudSpin instanceof HTMLElement) els.bonusHudSpin.textContent = "Spin Win: " + state.bonusFlow.currentSpinWin + " WL";
    if (els.bonusHudSticky instanceof HTMLElement) els.bonusHudSticky.textContent = "Wilds: " + state.bonusFlow.stickyWilds;
    if (els.bonusHudMulti instanceof HTMLElement) els.bonusHudMulti.textContent = "x10 Cells: " + state.bonusFlow.multiplierCells;
  }

  function setBoardDimmed(dimmed) {
    if (!(els.boardWrap instanceof HTMLElement)) return;
    els.boardWrap.classList.toggle("dimmed", Boolean(dimmed));
  }

  async function showBonusOverlay(title, text, sub, showContinue) {
    if (!(els.bonusOverlay instanceof HTMLElement)) return;
    if (els.bonusOverlayTitle instanceof HTMLElement) els.bonusOverlayTitle.textContent = String(title || "FREE SPINS");
    if (els.bonusOverlayText instanceof HTMLElement) els.bonusOverlayText.textContent = String(text || "");
    if (els.bonusOverlaySub instanceof HTMLElement) els.bonusOverlaySub.textContent = String(sub || "");
    if (els.bonusOverlayContinueBtn instanceof HTMLButtonElement) {
      els.bonusOverlayContinueBtn.classList.toggle("hidden", !showContinue);
      els.bonusOverlayContinueBtn.disabled = !showContinue;
    }
    els.bonusOverlay.classList.remove("hidden");
    await nextFrame();
    els.bonusOverlay.classList.add("active");
  }

  async function hideBonusOverlay() {
    if (!(els.bonusOverlay instanceof HTMLElement)) return;
    els.bonusOverlay.classList.remove("active");
    await sleep(180);
    els.bonusOverlay.classList.add("hidden");
  }

  async function waitBonusContinue(timeoutMs) {
    const btn = els.bonusOverlayContinueBtn;
    if (!(btn instanceof HTMLButtonElement)) {
      await sleep(Math.max(300, Math.floor(Number(timeoutMs) || 1200)));
      return;
    }
    return await new Promise((resolve) => {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        btn.removeEventListener("click", onClick);
        resolve();
      };
      const onClick = () => finish();
      btn.addEventListener("click", onClick);
      const waitMs = Math.max(1200, Math.floor(Number(timeoutMs) || 10000));
      window.setTimeout(finish, waitMs);
    });
  }

  function showBonusBanner(text) {
    if (!(els.bonusBanner instanceof HTMLElement)) return;
    const msg = String(text || "").trim();
    if (!msg) {
      els.bonusBanner.classList.remove("active");
      els.bonusBanner.classList.add("hidden");
      return;
    }
    els.bonusBanner.textContent = msg;
    els.bonusBanner.classList.remove("hidden");
    window.requestAnimationFrame(() => els.bonusBanner.classList.add("active"));
    window.setTimeout(() => {
      if (!(els.bonusBanner instanceof HTMLElement)) return;
      els.bonusBanner.classList.remove("active");
      window.setTimeout(() => {
        if (els.bonusBanner instanceof HTMLElement) els.bonusBanner.classList.add("hidden");
      }, 180);
    }, 1300);
  }

  function clearBonusUiState() {
    setBonusPhase(BONUS_PHASES.BASE_IDLE);
    state.bonusFlow.machineType = "";
    updateBonusHud({ spinsLeft: 0, bonusWin: 0, currentSpinWin: 0, stickyWilds: 0, multiplierCells: 0, mode: "FREE SPINS" });
    showBonusHud(false);
    showBonusBanner("");
    setBoardDimmed(false);
    hideBonusOverlay();
  }

  function resetEphemeralVisuals() {
    state.ephemeral.rows = null;
    state.ephemeral.lineIds = [];
    state.ephemeral.lineWins = [];
    state.ephemeral.markedCells = [];
    state.ephemeral.cellMeta = {};
    state.ephemeral.effectCells = {};
    state.ephemeral.upgradeFlashes = {};
  }

  function normalizeTowerDifficultyId(value) {
    const raw = String(value || "").trim().toLowerCase();
    return TOWER_CONFIG.difficulties[raw] ? raw : "normal";
  }

  function getTowerDifficultyConfig(value) {
    return TOWER_CONFIG.difficulties[normalizeTowerDifficultyId(value)] || TOWER_CONFIG.difficulties.normal;
  }

  function getTowerDifficultyForMachine(machine) {
    if (!machine || !machine.tileKey) return "normal";
    const byMachine = state.tower && state.tower.difficultyByMachine ? state.tower.difficultyByMachine : {};
    return normalizeTowerDifficultyId(byMachine[machine.tileKey]);
  }

  function setTowerDifficultyForMachine(machine, difficultyId) {
    if (!machine || !machine.tileKey) return;
    const id = normalizeTowerDifficultyId(difficultyId);
    if (!state.tower || !state.tower.difficultyByMachine) return;
    state.tower.difficultyByMachine[machine.tileKey] = id;
  }

  function getTowerRoundForMachine(machine) {
    if (!machine || !machine.tileKey) return null;
    const byMachine = state.tower && state.tower.roundsByMachine ? state.tower.roundsByMachine : {};
    return byMachine[machine.tileKey] || null;
  }

  function setTowerRoundForMachine(machine, round) {
    if (!machine || !machine.tileKey || !state.tower || !state.tower.roundsByMachine) return;
    if (round) state.tower.roundsByMachine[machine.tileKey] = round;
    else delete state.tower.roundsByMachine[machine.tileKey];
  }

  function randomUniqueIndices(count, pickCount) {
    const total = Math.max(1, Math.floor(Number(count) || 1));
    const needed = Math.max(0, Math.min(total, Math.floor(Number(pickCount) || 0)));
    const arr = [];
    for (let i = 0; i < total; i++) arr.push(i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }
    return arr.slice(0, needed).sort((a, b) => a - b);
  }

  function createTowerRound(machine, bet, difficultyId) {
    const cfg = getTowerDifficultyConfig(difficultyId);
    const floors = Math.max(4, Math.floor(TOWER_CONFIG.floors || 8));
    const cols = Math.max(3, Math.floor(TOWER_CONFIG.cols || 5));
    const traps = Math.max(1, Math.min(cols - 1, Math.floor(Number(cfg.traps) || 1)));
    const safePerFloor = Math.max(1, cols - traps);
    const safeColsByFloor = [];
    for (let floor = 0; floor < floors; floor++) safeColsByFloor.push(randomUniqueIndices(cols, safePerFloor));
    const multipliers = [];
    let mult = 1;
    const step = Math.max(1.01, Number(cfg.stepMult) || 1.25);
    for (let floor = 0; floor < floors; floor++) {
      mult *= step;
      multipliers.push(Number(mult.toFixed(4)));
    }
    return {
      machineKey: machine.tileKey,
      startedAt: Date.now(),
      bet: Math.max(1, Math.floor(Number(bet) || 1)),
      difficultyId: cfg.id,
      difficultyLabel: cfg.label,
      floors,
      cols,
      traps,
      safePerFloor,
      stepMult: step,
      safeColsByFloor,
      multipliers,
      picksByFloor: [],
      currentFloor: 0,
      active: true,
      ended: false,
      revealAll: false,
      result: "running",
      payout: 0,
      hit: null
    };
  }

  function towerClearedFloors(round) {
    if (!round) return 0;
    return Math.max(0, Math.min(round.floors, Math.floor(Number(round.currentFloor) || 0)));
  }

  function towerCurrentMultiplier(round) {
    if (!round) return 1;
    const cleared = towerClearedFloors(round);
    if (cleared <= 0) return 1;
    return Math.max(1, Number(round.multipliers && round.multipliers[cleared - 1]) || 1);
  }

  function towerNextMultiplier(round) {
    if (!round) return 1;
    const cleared = towerClearedFloors(round);
    const next = round.multipliers && round.multipliers[cleared];
    return Math.max(1, Number(next) || towerCurrentMultiplier(round));
  }

  function formatMultiplier(mult) {
    const safe = Math.max(0, Number(mult) || 0);
    if (safe >= 1000) return safe.toFixed(0) + "x";
    if (safe >= 100) return safe.toFixed(1) + "x";
    if (safe >= 10) return safe.toFixed(2) + "x";
    return safe.toFixed(3) + "x";
  }

  function formatTowerPayout(round, mult) {
    if (!round) return 0;
    return Math.max(0, Math.floor(round.bet * Math.max(1, Number(mult) || 1)));
  }

  function updateTowerMachineStatsOnStart(machine, round) {
    if (!machine || !machine.stats || !round) return;
    machine.stats.plays = toCount(machine.stats.plays) + 1;
    machine.stats.totalBet = toCount(machine.stats.totalBet) + round.bet;
    machine.stats.lastOutcome = "running";
    machine.stats.lastMultiplier = 1;
    machine.stats.lastSlotsSummary = "Tower run started (" + round.difficultyLabel + ")";
    machine.stats.lastSlotsText = "";
    machine.stats.lastSlotsLines = "";
    machine.stats.lastSlotsLineIds = "";
  }

  function updateTowerMachineStatsOnResolve(machine, round, outcome, payout) {
    if (!machine || !machine.stats || !round) return;
    const safeOutcome = String(outcome || "lose").slice(0, 24);
    const safePayout = Math.max(0, Math.floor(Number(payout) || 0));
    const mult = towerCurrentMultiplier(round);
    machine.stats.lastOutcome = safeOutcome;
    machine.stats.lastMultiplier = Number(mult.toFixed(4));
    machine.stats.lastSlotsSummary = "Tower " + safeOutcome + " | " + towerClearedFloors(round) + "/" + round.floors + " floors | " + formatMultiplier(mult);
    if (safePayout > 0) machine.stats.totalPayout = toCount(machine.stats.totalPayout) + safePayout;
  }

  async function startTowerRun(machine) {
    if (!machine || machine.type !== "tower" || state.spinBusy) return;
    const existing = getTowerRoundForMachine(machine);
    if (existing && existing.active) return;
    const bet = clampBetToMachine(machine, state.currentBetValue);
    if (state.webVaultLocks < bet) return;

    const debit = await adjustWallet(-bet);
    if (!debit.ok) return;

    const difficultyId = getTowerDifficultyForMachine(machine);
    const round = createTowerRound(machine, bet, difficultyId);
    setTowerRoundForMachine(machine, round);
    updateTowerMachineStatsOnStart(machine, round);
    if (els.lastWinLabel instanceof HTMLElement) {
      els.lastWinLabel.textContent = "Tower Started";
      els.lastWinLabel.classList.remove("hidden");
      els.lastWinLabel.classList.remove("good");
    }
    renderAll();
  }

  async function cashOutTowerRun(machine, reason) {
    if (!machine || machine.type !== "tower") return;
    const round = getTowerRoundForMachine(machine);
    if (!round || !round.active) return;
    const cleared = towerClearedFloors(round);
    if (cleared <= 0) return;
    const outcome = reason === "top" ? "top" : "cashout";
    const mult = towerCurrentMultiplier(round);
    const payout = formatTowerPayout(round, mult);
    if (payout > 0) {
      const credit = await adjustWallet(payout);
      if (!credit || !credit.ok) {
        if (els.lastWinLabel instanceof HTMLElement) {
          els.lastWinLabel.textContent = "Cashout Failed";
          els.lastWinLabel.classList.remove("hidden");
          els.lastWinLabel.classList.remove("good");
        }
        renderAll();
        return;
      }
    }
    round.active = false;
    round.ended = true;
    round.result = outcome;
    round.payout = payout;
    round.revealAll = true;
    updateTowerMachineStatsOnResolve(machine, round, outcome, payout);
    if (els.lastWinLabel instanceof HTMLElement) {
      els.lastWinLabel.textContent = "Won: " + payout + " WL";
      els.lastWinLabel.classList.remove("hidden");
      els.lastWinLabel.classList.add("good");
    }
    spawnParticles(payout >= round.bet * 25 ? "jackpot" : "win");
    renderAll();
  }

  async function handleTowerPick(machine, floor, col) {
    if (!machine || machine.type !== "tower") return;
    const round = getTowerRoundForMachine(machine);
    if (!round || !round.active) return;
    const floorIdx = Math.floor(Number(floor));
    const colIdx = Math.floor(Number(col));
    if (floorIdx !== round.currentFloor) return;
    if (colIdx < 0 || colIdx >= round.cols) return;
    if (round.picksByFloor[floorIdx] !== undefined) return;

    round.picksByFloor[floorIdx] = colIdx;
    const safeCols = Array.isArray(round.safeColsByFloor[floorIdx]) ? round.safeColsByFloor[floorIdx] : [];
    const safe = safeCols.indexOf(colIdx) >= 0;
    if (!safe) {
      round.active = false;
      round.ended = true;
      round.result = "lose";
      round.payout = 0;
      round.revealAll = true;
      round.hit = { floor: floorIdx, col: colIdx };
      updateTowerMachineStatsOnResolve(machine, round, "lose", 0);
      if (els.lastWinLabel instanceof HTMLElement) {
        els.lastWinLabel.textContent = "Trap Hit";
        els.lastWinLabel.classList.remove("hidden");
        els.lastWinLabel.classList.remove("good");
      }
      renderAll();
      return;
    }

    round.currentFloor += 1;
    const mult = towerCurrentMultiplier(round);
    if (els.lastWinLabel instanceof HTMLElement) {
      els.lastWinLabel.textContent = "Tower: " + formatMultiplier(mult);
      els.lastWinLabel.classList.remove("hidden");
      els.lastWinLabel.classList.add("good");
    }

    if (round.currentFloor >= round.floors) {
      await cashOutTowerRun(machine, "top");
      return;
    }

    renderAll();
  }

  function normalizeMinesCount(value) {
    const raw = Math.floor(Number(value) || MINES_CONFIG.defaultMines);
    return Math.max(MINES_CONFIG.minMines, Math.min(MINES_CONFIG.maxMines, raw));
  }

  function getMinesCountForMachine(machine) {
    if (!machine || !machine.tileKey) return MINES_CONFIG.defaultMines;
    const byMachine = state.mines && state.mines.minesByMachine ? state.mines.minesByMachine : {};
    return normalizeMinesCount(byMachine[machine.tileKey]);
  }

  function setMinesCountForMachine(machine, minesCount) {
    if (!machine || !machine.tileKey || !state.mines || !state.mines.minesByMachine) return;
    state.mines.minesByMachine[machine.tileKey] = normalizeMinesCount(minesCount);
  }

  function getMinesRoundForMachine(machine) {
    if (!machine || !machine.tileKey) return null;
    const byMachine = state.mines && state.mines.roundsByMachine ? state.mines.roundsByMachine : {};
    return byMachine[machine.tileKey] || null;
  }

  function setMinesRoundForMachine(machine, round) {
    if (!machine || !machine.tileKey || !state.mines || !state.mines.roundsByMachine) return;
    if (round) state.mines.roundsByMachine[machine.tileKey] = round;
    else delete state.mines.roundsByMachine[machine.tileKey];
  }

  function createMinesRound(machine, bet, minesCount) {
    const totalTiles = MINES_CONFIG.totalTiles;
    const safeTotal = totalTiles - minesCount;
    const mineIndices = randomUniqueIndices(totalTiles, minesCount);
    const mineMap = {};
    for (let i = 0; i < mineIndices.length; i++) mineMap[mineIndices[i]] = true;
    return {
      machineKey: machine.tileKey,
      startedAt: Date.now(),
      bet: Math.max(1, Math.floor(Number(bet) || 1)),
      minesCount,
      totalTiles,
      rows: MINES_CONFIG.rows,
      cols: MINES_CONFIG.cols,
      safeTotal,
      mineIndices,
      mineMap,
      revealedSafeIndices: [],
      revealedSafeMap: {},
      pickedMineIndex: -1,
      active: true,
      ended: false,
      revealAll: false,
      result: "running",
      payout: 0
    };
  }

  function minesSafeClicks(round) {
    if (!round || !Array.isArray(round.revealedSafeIndices)) return 0;
    return Math.max(0, round.revealedSafeIndices.length);
  }

  function minesMultiplierForClicks(round, safeClicks) {
    if (!round) return 1;
    const clicks = Math.max(0, Math.min(Math.floor(Number(safeClicks) || 0), round.safeTotal));
    if (clicks <= 0) return 1;
    const edgeFactor = Math.max(0.8, Math.min(1, 1 - (Number(MINES_CONFIG.houseEdge) || 0.04)));
    let mult = 1;
    for (let i = 0; i < clicks; i++) {
      const remainingSafe = round.safeTotal - i;
      const remainingTotal = round.totalTiles - i;
      if (remainingSafe <= 0 || remainingTotal <= 0) break;
      mult *= (remainingTotal / remainingSafe) * edgeFactor;
    }
    return Math.max(1, Number(mult.toFixed(6)));
  }

  function minesCurrentMultiplier(round) {
    return minesMultiplierForClicks(round, minesSafeClicks(round));
  }

  function minesNextMultiplier(round) {
    return minesMultiplierForClicks(round, minesSafeClicks(round) + 1);
  }

  function minesCashoutPayout(round) {
    if (!round) return 0;
    return Math.max(0, Math.floor(round.bet * minesCurrentMultiplier(round)));
  }

  function updateMinesMachineStatsOnStart(machine, round) {
    if (!machine || !machine.stats || !round) return;
    machine.stats.plays = toCount(machine.stats.plays) + 1;
    machine.stats.totalBet = toCount(machine.stats.totalBet) + round.bet;
    machine.stats.lastOutcome = "running";
    machine.stats.lastMultiplier = 1;
    machine.stats.lastSlotsSummary = "Mines run started (" + round.minesCount + " mines)";
    machine.stats.lastSlotsText = "";
    machine.stats.lastSlotsLines = "";
    machine.stats.lastSlotsLineIds = "";
  }

  function updateMinesMachineStatsOnResolve(machine, round, outcome, payout) {
    if (!machine || !machine.stats || !round) return;
    const safeOutcome = String(outcome || "lose").slice(0, 24);
    const safePayout = Math.max(0, Math.floor(Number(payout) || 0));
    const safeClicks = minesSafeClicks(round);
    const mult = minesCurrentMultiplier(round);
    machine.stats.lastOutcome = safeOutcome;
    machine.stats.lastMultiplier = Number(mult.toFixed(6));
    machine.stats.lastSlotsSummary = "Mines " + safeOutcome + " | " + safeClicks + " safe | " + formatMultiplier(mult);
    if (safePayout > 0) machine.stats.totalPayout = toCount(machine.stats.totalPayout) + safePayout;
  }

  async function startMinesRun(machine) {
    if (!machine || machine.type !== "mines" || state.spinBusy) return;
    const existing = getMinesRoundForMachine(machine);
    if (existing && existing.active) return;

    const bet = clampBetToMachine(machine, state.currentBetValue);
    if (state.webVaultLocks < bet) return;
    const debit = await adjustWallet(-bet);
    if (!debit.ok) return;

    const minesCount = getMinesCountForMachine(machine);
    const round = createMinesRound(machine, bet, minesCount);
    setMinesRoundForMachine(machine, round);
    updateMinesMachineStatsOnStart(machine, round);
    if (els.lastWinLabel instanceof HTMLElement) {
      els.lastWinLabel.textContent = "Mines Started";
      els.lastWinLabel.classList.remove("hidden");
      els.lastWinLabel.classList.remove("good");
    }
    renderAll();
  }

  async function cashOutMinesRun(machine, reason) {
    if (!machine || machine.type !== "mines") return;
    const round = getMinesRoundForMachine(machine);
    if (!round || !round.active) return;
    const safeClicks = minesSafeClicks(round);
    if (safeClicks <= 0) return;
    const payout = minesCashoutPayout(round);
    if (payout > 0) {
      const credit = await adjustWallet(payout);
      if (!credit || !credit.ok) {
        if (els.lastWinLabel instanceof HTMLElement) {
          els.lastWinLabel.textContent = "Cashout Failed";
          els.lastWinLabel.classList.remove("hidden");
          els.lastWinLabel.classList.remove("good");
        }
        renderAll();
        return;
      }
    }
    const outcome = reason === "clear" ? "clear" : "cashout";
    round.active = false;
    round.ended = true;
    round.result = outcome;
    round.payout = payout;
    round.revealAll = true;
    updateMinesMachineStatsOnResolve(machine, round, outcome, payout);
    if (els.lastWinLabel instanceof HTMLElement) {
      els.lastWinLabel.textContent = "Won: " + payout + " WL";
      els.lastWinLabel.classList.remove("hidden");
      els.lastWinLabel.classList.add("good");
    }
    spawnParticles(payout >= round.bet * 25 ? "jackpot" : "win");
    renderAll();
  }

  async function handleMinesPick(machine, tileIndex) {
    if (!machine || machine.type !== "mines") return;
    const round = getMinesRoundForMachine(machine);
    if (!round || !round.active) return;
    const idx = Math.floor(Number(tileIndex));
    if (idx < 0 || idx >= round.totalTiles) return;
    if (round.revealedSafeMap[idx]) return;
    if (round.pickedMineIndex === idx) return;

    if (round.mineMap[idx]) {
      round.active = false;
      round.ended = true;
      round.result = "lose";
      round.payout = 0;
      round.revealAll = true;
      round.pickedMineIndex = idx;
      updateMinesMachineStatsOnResolve(machine, round, "lose", 0);
      if (els.lastWinLabel instanceof HTMLElement) {
        els.lastWinLabel.textContent = "Mine Hit";
        els.lastWinLabel.classList.remove("hidden");
        els.lastWinLabel.classList.remove("good");
      }
      renderAll();
      return;
    }

    round.revealedSafeMap[idx] = true;
    round.revealedSafeIndices.push(idx);
    const mult = minesCurrentMultiplier(round);
    if (els.lastWinLabel instanceof HTMLElement) {
      els.lastWinLabel.textContent = "Mines: " + formatMultiplier(mult);
      els.lastWinLabel.classList.remove("hidden");
      els.lastWinLabel.classList.add("good");
    }

    if (minesSafeClicks(round) >= round.safeTotal) {
      await cashOutMinesRun(machine, "clear");
      return;
    }

    renderAll();
  }

  // Standalone/casino spin logic
  function simulateStandaloneSpin(machine, bet) {
    const pool = SYMBOL_POOL[machine.type] || SYMBOL_POOL.slots;
    const reelsCount = machine.reels || 3;
    const reels = [];
    for (let i = 0; i < reelsCount; i++) {
      reels.push(pool[Math.floor(Math.random() * pool.length)]);
    }

    let payout = 0;
    let lines = [];

    // Simple 5-reel logic: match 3+ from left
    const first = reels[0];
    let matchCount = 1;
    for (let i = 1; i < reels.length; i++) {
      if (reels[i] === first || reels[i] === "WILD") matchCount++;
      else break;
    }

    if (matchCount >= 3) {
      const mult = matchCount === 5 ? 50 : (matchCount === 4 ? 10 : 2);
      payout += bet * mult;
      lines.push(matchCount + "x " + first);
    }

    // Bonus scatter check
    const scatters = reels.filter(s => s === "SCAT" || s === "BONUS").length;
    if (scatters >= 3) {
      payout += bet * 15;
      lines.push("Bonus Triggered!");
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

  const SIX_PAYLINES = [
    [1, 1, 1, 1, 1], // Horizontal 1
    [0, 0, 0, 0, 0], // Horizontal 0
    [2, 2, 2, 2, 2], // Horizontal 2
    [3, 3, 3, 3, 3], // Horizontal 3
    [0, 1, 2, 1, 0], // V-shape
    [1, 2, 3, 2, 1], // V-shape low
    [3, 2, 1, 2, 3], // ^-shape low
    [2, 1, 0, 1, 2], // ^-shape
    [0, 0, 1, 2, 2], // Diagonal down
    [2, 2, 1, 0, 0], // Diagonal up
    [1, 1, 2, 3, 3], // Diagonal down low
    [3, 3, 2, 1, 1], // Diagonal up low
    [0, 1, 1, 1, 0], // Bump
    [3, 2, 2, 2, 3]  // Dip
  ];

  const SIX_PAYTABLE = {
    SKULL: [0, 0, 0.5, 2, 5],
    BLOOD: [0, 0, 0.5, 1.5, 4],
    REAPR: [0, 0, 0.4, 1, 3],
    PENT: [0, 0, 0.3, 0.8, 2],
    BONE: [0, 0, 0.2, 0.5, 1],
    WILD: [0, 0, 1, 3, 10]
  };

  function simulateSixSixSix(machine, bet, buyBonus) {
    const pool = [
      ...Array(15).fill("SKULL"),
      ...Array(12).fill("BONE"),
      ...Array(10).fill("BLOOD"),
      ...Array(6).fill("PENT"),
      ...Array(3).fill("REAPR"),
      ...Array(2).fill("WILD")
    ];
    const reelsCount = 5;
    const rows = 4;

    let reels = [];
    let lines = [];
    let lineIds = [];
    let totalMult = 0;

    // High volatility prob adjustments
    const sixProb = buyBonus ? 0.045 : 0.012; // Far lower drop rate to ensure big swings

    // Generate grid
    let grid = [];
    for (let r = 0; r < rows; r++) {
      let rowSymbols = [];
      for (let c = 0; c < reelsCount; c++) {
        let sym = pool[Math.floor(Math.random() * pool.length)];

        // "6" symbols only appear on reels 1, 3, 5 (cols 0, 2, 4)
        if ((c === 0 || c === 2 || c === 4) && Math.random() < sixProb) {
          sym = Math.random() < 0.12 ? "RED_6" : "BLU_6";
        }
        rowSymbols.push(sym);
      }
      grid.push(rowSymbols);
      reels.push(rowSymbols.join(","));
    }

    // Evaluate Paylines
    let baseWin = 0;
    for (let i = 0; i < SIX_PAYLINES.length; i++) {
      const line = SIX_PAYLINES[i];
      let matchSym = null;
      let count = 0;

      for (let c = 0; c < reelsCount; c++) {
        let r = line[c];
        let sym = grid[r][c];

        if (sym === "WILD") {
          count++;
        } else if (sym === "BLU_6" || sym === "RED_6") {
          break; // Wheels don't connect paylines
        } else {
          if (!matchSym) {
            matchSym = sym;
            count++;
          } else if (sym === matchSym) {
            count++;
          } else {
            break;
          }
        }
      }

      if (count >= 3) {
        let target = matchSym || "WILD";
        let mult = SIX_PAYTABLE[target][count - 1] || 0;
        if (mult > 0) {
          let win = bet * mult;
          baseWin += win;
          lines.push(count + "x " + SYMBOL_LABELS[target]);
          lineIds.push(i + 1);
        }
      }
    }

    // Evaluate Wheels
    grid.forEach((row) => {
      row.forEach((sym) => {
        if (sym === "BLU_6") {
          let m = [5, 10, 15, 20, 25, 50, 100][Math.floor(Math.random() * 7)];
          totalMult += m;
          lines.push("Blue 6: " + m + "x");
        } else if (sym === "RED_6") {
          let m = [10, 15, 20, 25, 50, 100, 250, 500][Math.floor(Math.random() * 8)];
          totalMult += m;
          lines.push("Red 6: " + m + "x");
        }
      });
    });

    // Special fallback for UI lines array if empty and there's a multiplier
    if (baseWin === 0 && totalMult === 0) lines = [];

    // Final Payout logic similar to real game (Wheels apply to base, but they are also flat multipliers on bet if we want to simplify)
    // To match actual Six Six Six logic closer, base win is multiplied by the combined wheel multipliers,
    // OR if no line win, the multiplier applies to the bet. 
    // Usually Hacksaw applies wheels to base stakes, so `bet * totalMult`. Let's stick to that for simplicity. 
    let payout = baseWin + (bet * totalMult);

    return {
      gameId: "slots_v2",
      reels: reels,
      payoutWanted: payout,
      outcome: payout > 0 ? (totalMult >= 50 ? "jackpot" : "win") : "lose",
      lineWins: lines,
      lineIds: lineIds,
      bet: buyBonus ? bet * 10 : bet,
      summary: totalMult > 0 ? "Wicked Wheel!" : ""
    };
  }

  const LB_CLUSTER_PAY = {
    TRAP: { 5: 0.2, 6: 0.4, 7: 0.6, 8: 1.0, 9: 1.5, 10: 2.5, 12: 4, 15: 8 },
    CHEESE: { 5: 0.3, 6: 0.5, 7: 0.8, 8: 1.3, 9: 2.0, 10: 3.5, 12: 6, 15: 12 },
    BEER: { 5: 0.4, 6: 0.7, 7: 1.1, 8: 1.8, 9: 3.0, 10: 5, 12: 9, 15: 18 },
    BAG: { 5: 0.7, 6: 1.2, 7: 1.9, 8: 3.0, 9: 4.5, 10: 8, 12: 15, 15: 25 },
    HAT: { 5: 1.2, 6: 2.2, 7: 3.5, 8: 6.0, 9: 9.0, 10: 16, 12: 28, 15: 55 },
    WINT: { 5: 2.5, 6: 4.5, 7: 7.5, 8: 13, 9: 20, 10: 38, 12: 65, 15: 140 }
  };
  const LE_BANDIT_BASE_PAY_SCALE = 0.68;
  const LE_BANDIT_BONUS_PAY_SCALE = 0.62;

  function simulateLeBandit(machine, bet, buyBonus) {
    const COLS = 6, ROWS = 5;
    const pool = [
      ...Array(25).fill("TRAP"), ...Array(20).fill("CHEESE"), ...Array(18).fill("BEER"),
      ...Array(12).fill("BAG"), ...Array(8).fill("HAT"), ...Array(4).fill("WINT"),
      "WILD" // Only 1 WILD in a larger pool
    ];
    function pick() { return pool[Math.floor(Math.random() * pool.length)]; }
    function makeGrid(rc) { const g = []; for (let r = 0; r < ROWS; r++) { g[r] = []; for (let c = 0; c < COLS; c++) { let s = pick(); if (Math.random() < rc) s = "RAIN"; g[r][c] = s; } } return g; }
    function cpay(sym, n) { const t = LB_CLUSTER_PAY[sym]; if (!t) return 0; let b = 0; for (const k in t) { if (n >= Number(k)) b = t[k]; } return b; }
    function clusters(g) {
      const vis = new Set(), out = [];
      for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
        const sym = g[r][c]; if (sym === "RAIN" || sym === "WILD" || vis.has(r + "_" + c) || !LB_CLUSTER_PAY[sym]) continue;
        const stk = [[r, c]], cells = [];
        while (stk.length) { const [rr, cc] = stk.pop(); const k = rr + "_" + cc; if (vis.has(k)) continue; const s = g[rr][cc]; if (s !== sym && s !== "WILD") continue; vis.add(k); cells.push({ r: rr, c: cc }); if (rr > 0) stk.push([rr - 1, cc]); if (rr < ROWS - 1) stk.push([rr + 1, cc]); if (cc > 0) stk.push([rr, cc - 1]); if (cc < COLS - 1) stk.push([rr, cc + 1]); }
        if (cells.length >= 5) out.push({ sym, cells });
      }
      return out;
    }
    function cntRain(g) { let n = 0; for (let r = 0; r < ROWS; r++)for (let c = 0; c < COLS; c++)if (g[r][c] === "RAIN") n++; return n; }
    function toReels(g) { const o = []; for (let r = 0; r < ROWS; r++)o.push(g[r].join(",")); return o; }

    // ────── BASE SPIN ──────
    const baseGrid = makeGrid(buyBonus ? 0.035 : 0.01);
    const baseC = clusters(baseGrid);
    let basePay = 0;
    const lines = [];
    for (const cl of baseC) {
      const m = cpay(cl.sym, cl.cells.length);
      if (m > 0) {
        basePay += bet * m * LE_BANDIT_BASE_PAY_SCALE;
        lines.push(cl.cells.length + "x " + (SYMBOL_LABELS[cl.sym] || cl.sym) + " (" + m + "x)");
      }
    }
    const triggerBonus = cntRain(baseGrid) >= 4 || buyBonus;
    const reels = toReels(baseGrid);

    // ────── FREE SPINS BONUS ──────
    let bonusPay = 0;
    const bonusFrames = [];
    const FREE_SPINS = 8;
    const marked = new Set();

    if (triggerBonus) {
      lines.push("🌈 BONUS! " + FREE_SPINS + " Free Spins!");
      for (let s = 0; s < FREE_SPINS; s++) {
        const fsGrid = makeGrid(0.04);
        const fsC = clusters(fsGrid);
        let sPay = 0;
        const sLines = [];

        // Cluster wins → mark cells
        for (const cl of fsC) {
          const m = cpay(cl.sym, cl.cells.length);
          if (m > 0) {
            sPay += bet * m * LE_BANDIT_BONUS_PAY_SCALE;
            sLines.push(cl.cells.length + "x " + (SYMBOL_LABELS[cl.sym] || cl.sym));
            for (const cell of cl.cells) marked.add(cell.r + "_" + cell.c);
          }
        }

        // Rainbow fill
        const rain = cntRain(fsGrid);
        let fills = null;
        let frameMarked = Array.from(marked); // Capture current state for the frame

        if (rain > 0 && frameMarked.length > 0) {
          const fb = {};
          for (const key of frameMarked) {
            const roll = Math.random(), [fr, fc] = key.split("_").map(Number);
            if (roll < 0.70) {
              // Favors lower coins
              const vs = [1, 1, 1, 1, 2, 2, 3, 5]; fb[key] = { type: "COIN", value: vs[Math.floor(Math.random() * vs.length)] };
            }
            else if (roll < 0.92) {
              const ms = [2, 2, 3, 4, 5]; fb[key] = { type: "CLOVR", value: ms[Math.floor(Math.random() * ms.length)] };
            }
            else { fb[key] = { type: "POT", value: 0 }; }
          }
          // Clovers multiply adjacent coins
          for (const k of Object.keys(fb)) { if (fb[k].type !== "CLOVR") continue; const [cr, cc] = k.split("_").map(Number); for (const [ar, ac] of [[cr - 1, cc], [cr + 1, cc], [cr, cc - 1], [cr, cc + 1]]) { const ak = ar + "_" + ac; if (fb[ak] && fb[ak].type === "COIN") fb[ak].value *= fb[k].value; } }
          // Sum coins
          let coinVal = 0; for (const k of Object.keys(fb)) { if (fb[k].type === "COIN") coinVal += fb[k].value; }
          // Pot respin
          let hasPot = false, respinV = 0; for (const k of Object.keys(fb)) { if (fb[k].type === "POT") { hasPot = true; break; } }
          if (hasPot && coinVal > 0) { for (const k of Object.keys(fb)) { if (fb[k].type === "COIN") { const rv = [1, 2, 3, 5, 8, 10]; respinV += rv[Math.floor(Math.random() * rv.length)]; } }; coinVal += respinV; }
          bonusPay += bet * coinVal * LE_BANDIT_BONUS_PAY_SCALE;
          const fillCells = frameMarked.map(k => { const [r, c] = k.split("_").map(Number); return { r, c, ...fb[k] }; });
          fills = { cells: fillCells, totalMult: coinVal, hasPot, respinMult: respinV };
          sLines.push("🌈 " + frameMarked.length + " fills" + (hasPot ? " + POT respin" : "") + " (" + coinVal + "x)");
          // Marked area cleared AFTER push below
        } else if (rain > 0) { sLines.push("🌈 (no marked area)"); }

        bonusPay += sPay;
        const txt = "FS" + (s + 1) + ": " + (sLines.length ? sLines.join(" | ") : "no win");
        lines.push(txt);
        bonusFrames.push({
          grid: fsGrid,
          reels: toReels(fsGrid),
          markedCells: frameMarked,
          fills,
          lineText: txt,
          spinPay: sPay + (fills ? bet * fills.totalMult * LE_BANDIT_BONUS_PAY_SCALE : 0)
        });

        if (fills) marked.clear(); // Persistence ends on fill
      }
    }

    const totalPay = Math.floor(basePay + bonusPay);
    let summary = triggerBonus ? ("Bonus " + FREE_SPINS + " FS | Total " + (totalPay / Math.max(1, bet)).toFixed(1) + "x") : (basePay > 0 ? ("Cluster " + (basePay / bet).toFixed(1) + "x") : "");

    return {
      gameId: "le_bandit", reels, payoutWanted: totalPay,
      outcome: totalPay > 0 ? (totalPay >= bet * 50 ? "jackpot" : "win") : "lose",
      lineWins: lines, lineIds: [], bet: buyBonus ? bet * 10 : bet, summary,
      bonusFrames
    };
  }

  function sampleFramesEvenly(frames, maxCount) {
    const list = Array.isArray(frames) ? frames : [];
    const cap = Math.max(1, Math.floor(Number(maxCount) || 1));
    if (list.length <= cap) return list.slice();
    const out = [];
    const step = list.length / cap;
    for (let i = 0; i < cap; i++) {
      const idx = Math.min(list.length - 1, Math.floor(i * step));
      out.push(list[idx]);
    }
    const last = list[list.length - 1];
    if (out[out.length - 1] !== last) out[out.length - 1] = last;
    return out;
  }

  function decodeSlotsV2BonusCellToken(value) {
    const raw = String(value || "").trim().toUpperCase();
    if (!raw || raw === ".") return { token: "LOCK", mult: 0 };
    if (raw === "COL") return { token: "COL", mult: 0 };
    const prefix = raw.charAt(0);
    const num = Math.max(0, Math.floor(Number(raw.slice(1)) || 0));
    if (prefix === "C") return { token: "COIN", mult: num };
    if (prefix === "M") return { token: "MULT", mult: Math.max(2, num) };
    if (prefix === "B") return { token: "BOMB", mult: num };
    if (prefix === "J") return { token: "JACK", mult: num };
    return { token: "BLANK", mult: 0 };
  }

  function buildSlotsV2BonusFrames(bonusView) {
    if (!bonusView || typeof bonusView !== "object") return [];
    const allFrames = Array.isArray(bonusView.frames) ? bonusView.frames : [];
    if (!allFrames.length) return [];
    const rows = Math.max(1, Math.floor(Number(bonusView.rows) || 4));
    const cols = Math.max(1, Math.floor(Number(bonusView.reels) || 5));
    const totalSlots = rows * cols;
    const sampled = sampleFramesEvenly(allFrames, 20);
    const out = [];
    for (let i = 0; i < sampled.length; i++) {
      const frame = sampled[i] || {};
      const cells = Array.isArray(frame.cells) ? frame.cells : [];
      const tease = Array.isArray(frame.tease) ? frame.tease : [];
      const grid = [];
      for (let r = 0; r < rows; r++) {
        grid[r] = [];
        for (let c = 0; c < cols; c++) {
          grid[r][c] = "LOCK";
        }
      }
      for (let idx = 0; idx < totalSlots; idx++) {
        const r = Math.floor(idx / cols);
        const c = idx % cols;
        const decoded = decodeSlotsV2BonusCellToken(cells[idx]);
        grid[r][c] = decoded.token;
      }
      for (let iTease = 0; iTease < tease.length; iTease++) {
        const teaseIdx = Math.max(0, Math.floor(Number(tease[iTease]) || 0));
        if (teaseIdx >= totalSlots) continue;
        const tr = Math.floor(teaseIdx / cols);
        const tc = teaseIdx % cols;
        if (grid[tr][tc] === "LOCK") grid[tr][tc] = "BLANK";
      }
      const markedCells = [];
      let filled = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const tok = String(grid[r][c] || "");
          if (tok === "LOCK" || tok === "BLANK") continue;
          filled += 1;
          markedCells.push(r + "_" + c);
        }
      }
      out.push({
        reels: grid.map((row) => row.join(",")),
        markedCells,
        fills: null,
        spinPay: 0,
        lineText: "Hold&Spin " + (i + 1) + "/" + sampled.length + " | Filled " + filled + "/" + totalSlots + " | Respins " + Math.max(0, Math.floor(Number(frame.respins) || 0))
      });
    }
    return out;
  }

  function extractBonusFrames(machineType, rawResult) {
    const type = String(machineType || "").trim().toLowerCase();
    if (type === "le_bandit") {
      return Array.isArray(rawResult && rawResult.bonusFrames) ? rawResult.bonusFrames : [];
    }
    if (type === "slots_v2") {
      return buildSlotsV2BonusFrames(rawResult && rawResult.bonusView);
    }
    if (type === "snoop_dogg_dollars") {
      return Array.isArray(rawResult && rawResult.bonusFrames) ? rawResult.bonusFrames : [];
    }
    return [];
  }

  function resolveLockCurrencies() {
    const fallback = [
      { id: 43, key: "ruby_lock", value: 1000000, short: "RL" },
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

          let short = "WL";
          if (key === "ruby_lock") short = "RL";
          else if (key === "emerald_lock") short = "EL";
          else if (key === "obsidian_lock") short = "OL";

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
    const vault = toCount(inv.web_vault_balance);
    return { byId, total, vault };
  }

  function fromWallet(totalValue, vaultValue) {
    let left = toCount(totalValue);
    const out = {};
    for (let i = 0; i < LOCK_CURRENCIES.length; i++) {
      const row = LOCK_CURRENCIES[i];
      const c = Math.floor(left / row.value);
      out[row.id] = Math.max(0, c);
      left -= c * row.value;
    }
    out.web_vault_balance = Math.max(0, Math.floor(Number(vaultValue) || 0));
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

  function resolveDisplayLockRow(shortCode) {
    const code = String(shortCode || "").trim().toUpperCase();
    for (let i = 0; i < LOCK_CURRENCIES.length; i++) {
      if (String(LOCK_CURRENCIES[i].short || "").toUpperCase() === code) return LOCK_CURRENCIES[i];
    }
    if (code === "RL") return { id: 43, key: "ruby_lock", value: 1000000, short: "RL" };
    if (code === "EL") return { id: 42, key: "emerald_lock", value: 10000, short: "EL" };
    if (code === "OL") return { id: 24, key: "obsidian_lock", value: 100, short: "OL" };
    return { id: 9, key: "world_lock", value: 1, short: "WL" };
  }

  function getDisplayLockCycle() {
    const out = [];
    for (let i = 0; i < DISPLAY_LOCK_ORDER.length; i++) {
      out.push(resolveDisplayLockRow(DISPLAY_LOCK_ORDER[i]));
    }
    return out;
  }

  function getActiveDisplayLockRow() {
    const cycle = getDisplayLockCycle();
    if (!cycle.length) return resolveDisplayLockRow("WL");
    const idx = Math.max(0, Math.floor(Number(state.lockDisplayIndex) || 0)) % cycle.length;
    return cycle[idx];
  }

  function formatDisplayLockNumber(value) {
    const n = Number(value) || 0;
    if (Number.isInteger(n)) return n.toLocaleString("en-US");
    const abs = Math.abs(n);
    const maxFractionDigits = abs >= 100 ? 2 : (abs >= 10 ? 3 : 4);
    return n.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: maxFractionDigits
    });
  }

  function formatLocksByDisplayUnit(value) {
    const safe = Math.max(0, Number(value) || 0);
    const unit = getActiveDisplayLockRow();
    const unitValue = Math.max(1, Number(unit.value) || 1);
    const converted = safe / unitValue;
    return formatDisplayLockNumber(converted) + " " + unit.short;
  }

  function cycleLockDisplayUnit() {
    const cycle = getDisplayLockCycle();
    const len = Math.max(1, cycle.length);
    state.lockDisplayIndex = (Math.max(0, Math.floor(Number(state.lockDisplayIndex) || 0)) + 1) % len;
    renderAll();
  }

  function renderBetChipLabels() {
    const betBtns = document.querySelectorAll(".bet-btn");
    betBtns.forEach((btn) => {
      if (!(btn instanceof HTMLElement)) return;
      const raw = Math.max(0, Math.floor(Number(btn.dataset.bet) || 0));
      if (raw <= 0) return;
      btn.textContent = formatLocksByDisplayUnit(raw);
    });
  }

  // UI helper: format bank value for display in lists when banks are considered infinite
  function formatBankForList(row) {
    if (INFINITE_BANK) return "Infinite";
    const v = (row && row.earningsLocks) ?? 0;
    return formatLocksByDisplayUnit(v);
  }

  function setStatus(el, message, mode) {
    if (!(el instanceof HTMLElement)) return;
    el.textContent = String(message || "");
    el.classList.remove("ok", "error");
    if (mode === "ok") el.classList.add("ok");
    if (mode === "error") el.classList.add("error");
  }

  function populateMinesCountSelect() {
    if (!(els.minesCountSelect instanceof HTMLSelectElement)) return;
    const current = normalizeMinesCount(els.minesCountSelect.value || MINES_CONFIG.defaultMines);
    let html = "";
    for (let i = MINES_CONFIG.minMines; i <= MINES_CONFIG.maxMines; i++) {
      html += "<option value=\"" + i + "\">" + i + "</option>";
    }
    els.minesCountSelect.innerHTML = html;
    els.minesCountSelect.value = String(current);
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
  function parseDisplayToken(token) {
    const raw = normalizeToken(token);
    const idx = raw.indexOf("@");
    if (idx <= 0) return { raw, base: raw, overlay: "" };
    return {
      raw,
      base: normalizeToken(raw.slice(0, idx)),
      overlay: normalizeToken(raw.slice(idx + 1))
    };
  }
  function symbolIcon(token) {
    const parsed = parseDisplayToken(token);
    return SYMBOL_ICONS[parsed.base] || SYMBOL_ICONS["?"];
  }
  function symbolLabel(token) {
    const parsed = parseDisplayToken(token);
    const baseLabel = SYMBOL_LABELS[parsed.base] || parsed.base;
    if (!parsed.overlay) return baseLabel;
    const match = /^([WM])(\d+)$/.exec(parsed.overlay);
    if (!match) return baseLabel + " " + parsed.overlay;
    const mult = Math.max(1, Math.floor(Number(match[2]) || 1));
    if (match[1] === "W") return baseLabel + " x" + mult;
    return baseLabel + " x" + mult;
  }
  function symbolClass(token) {
    const parsed = parseDisplayToken(token);
    const baseClass = SYMBOL_CLASSES[parsed.base] || "";
    if (!parsed.overlay) return baseClass;
    return baseClass ? (baseClass + " boosted") : "boosted";
  }

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
    if (GAME_IDS.indexOf(type) < 0) return null;
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

  function getSelectedMachine() { return getMachineByKey(state.selectedMachineKey) || STANDALONE_MACHINE; }
  function machineLabel(machine) { return machine ? (machine.typeName + " @ " + machine.tx + "," + machine.ty) : "Unknown"; }

  function clearSessionRefs() {
    if (state.refs.inventory && state.handlers.inventory) state.refs.inventory.off("value", state.handlers.inventory);
    state.refs.inventory = null;
    state.handlers.inventory = null;
    stopSpinFx();
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

  async function adjustWallet(delta) {
    const d = Math.floor(Number(delta) || 0);
    if (!state.refs.inventory || !state.user || d === 0) return { ok: false, reason: "not-ready" };
    const txn = await state.refs.inventory.transaction((raw) => {
      const currentObj = raw && typeof raw === "object" ? { ...raw } : {};
      const vault = toCount(currentObj.web_vault_balance);
      const nextVault = vault + d;
      if (nextVault < 0) return; // Halt transaction safely if insufficient funds.
      currentObj.web_vault_balance = nextVault;
      return currentObj;
    });
    if (!txn || !txn.committed) return { ok: false, reason: d < 0 ? "not-enough" : "rejected" };

    // Refresh local state representation on success
    const wallet = toWallet(txn.snapshot && typeof txn.snapshot.val === "function" ? txn.snapshot.val() : {});
    state.walletLocks = wallet.total;
    state.webVaultLocks = wallet.vault;
    state.walletBreakdownText = walletText(wallet.byId);
    renderSession();
    return { ok: true, total: wallet.vault };
  }

  async function depositToVault(amount) {
    const d = Math.floor(Number(amount) || 0);
    if (!state.refs.inventory || !state.user || d <= 0) return { ok: false, reason: "invalid-amount" };
    const txn = await state.refs.inventory.transaction((raw) => {
      const currentObj = raw && typeof raw === "object" ? { ...raw } : {};
      const wallet = toWallet(currentObj);
      if (wallet.total < d) return; // Not enough physical locks to deposit
      const nextTotal = wallet.total - d;
      const decomp = fromWallet(nextTotal, wallet.vault + d);
      for (let i = 0; i < LOCK_CURRENCIES.length; i++) currentObj[LOCK_CURRENCIES[i].id] = toCount(decomp[LOCK_CURRENCIES[i].id]);
      currentObj.web_vault_balance = decomp.web_vault_balance;
      return currentObj;
    });
    if (!txn || !txn.committed) return { ok: false, reason: "rejected" };
    const wallet = toWallet(txn.snapshot && typeof txn.snapshot.val === "function" ? txn.snapshot.val() : {});
    state.walletLocks = wallet.total;
    state.webVaultLocks = wallet.vault;
    state.walletBreakdownText = walletText(wallet.byId);
    renderSession();
    return { ok: true, vault: wallet.vault };
  }

  async function withdrawFromVault(amount) {
    const d = Math.floor(Number(amount) || 0);
    if (!state.refs.inventory || !state.user || d <= 0) return { ok: false, reason: "invalid-amount" };
    const txn = await state.refs.inventory.transaction((raw) => {
      const currentObj = raw && typeof raw === "object" ? { ...raw } : {};
      const wallet = toWallet(currentObj);
      if (wallet.vault < d) return; // Not enough vault locks to withdraw
      const nextTotal = wallet.total + d;
      const decomp = fromWallet(nextTotal, wallet.vault - d);
      for (let i = 0; i < LOCK_CURRENCIES.length; i++) currentObj[LOCK_CURRENCIES[i].id] = toCount(decomp[LOCK_CURRENCIES[i].id]);
      currentObj.web_vault_balance = decomp.web_vault_balance;
      return currentObj;
    });
    if (!txn || !txn.committed) return { ok: false, reason: "rejected" };
    const wallet = toWallet(txn.snapshot && typeof txn.snapshot.val === "function" ? txn.snapshot.val() : {});
    state.walletLocks = wallet.total;
    state.webVaultLocks = wallet.vault;
    state.walletBreakdownText = walletText(wallet.byId);
    renderSession();
    return { ok: true, vault: wallet.vault };
  }

  function getMaxBetByBank(machine) {
    if (!machine) return 0;
    // Infinite bank mode for the web UI: no cap based on owner funds
    if (INFINITE_BANK) return Number.POSITIVE_INFINITY;
    const maxPayout = Math.max(1, Math.floor(Number(machine.maxPayoutMultiplier) || 1));
    return Math.max(0, Math.floor(toCount(machine.earningsLocks) / maxPayout));
  }

  function getSpinMaxBet(machine) {
    return Number.MAX_SAFE_INTEGER;
  }

  function clampBetToMachine(machine, wager) {
    if (!machine) return 1;
    const safe = Math.floor(Number(wager) || 1);
    return Math.max(machine.minBet, safe);
  }

  function setAuthBusy(isBusy) {
    const busy = Boolean(isBusy);
    if (els.authLoginBtn instanceof HTMLButtonElement) els.authLoginBtn.disabled = busy;
    if (els.authCreateBtn instanceof HTMLButtonElement) els.authCreateBtn.disabled = busy;
    if (els.authUsername instanceof HTMLInputElement) els.authUsername.disabled = busy;
    if (els.authPassword instanceof HTMLInputElement) els.authPassword.disabled = busy;
  }

  function renderSession() {
    if (els.sessionLabel instanceof HTMLElement) {
      els.sessionLabel.textContent = state.user ? ("@" + state.user.username + " (" + state.user.accountId + ")") : "Not logged in";
    }
    if (els.walletLabel instanceof HTMLElement) {
      const unit = getActiveDisplayLockRow();
      els.walletLabel.textContent = "Vault: " + formatLocksByDisplayUnit(state.webVaultLocks) + " | Game: " + formatLocksByDisplayUnit(state.walletLocks);
      els.walletLabel.title = "Click to cycle lock display (WL/OL/EL/RL). Current: " + unit.short;
      els.walletLabel.style.cursor = "pointer";
    }
    if (els.userBalanceDisplay instanceof HTMLElement) {
      const unit = getActiveDisplayLockRow();
      els.userBalanceDisplay.textContent = "Balance: " + formatLocksByDisplayUnit(state.webVaultLocks);
      els.userBalanceDisplay.title = "Click to cycle lock display (WL/OL/EL/RL). Current: " + unit.short;
      els.userBalanceDisplay.style.cursor = "pointer";
    }
    if (els.logoutBtn instanceof HTMLButtonElement) els.logoutBtn.classList.toggle("hidden", !state.user);
    if (els.openVaultBtn instanceof HTMLButtonElement) els.openVaultBtn.classList.toggle("hidden", !state.user);
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
    if (machineType === "slots_v2" && SIX_PAYLINES[id - 1]) return normalizePattern(SIX_PAYLINES[id - 1], cols, rows);
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

  function renderBlackjackBoard(machine, animCtx) {
    if (!(els.slotBoard instanceof HTMLElement)) return;
    const state = machine.stats.blackjackState;
    if (!state) {
      els.slotBoard.innerHTML = "<div class='bj-table'><div class='bj-msg'>Press Deal to start</div></div>";
      return;
    }

    const renderCard = (card, hidden, animate, isSplit) => {
      const animClass = animate ? " pop-in" : "";
      // If split, maybe show cards slightly smaller or just normal? 
      // CSS handles layout, so we keep card rendering standard.
      if (hidden) return `<div class="bj-card hidden-card${animClass}"></div>`;
      return `<div class="bj-card ${card.color}${animClass}">
        <span class="rank">${card.rank}</span>
        <span class="suit">${card.suit}</span>
        <span class="rank bot">${card.rank}</span>
      </div>`;
    };

    const dealerScore = state.active ? "?" : calculateHand(state.dealerHand);

    const isDeal = animCtx === 'deal';
    const isHit = animCtx === 'hit';
    const isDealer = animCtx === 'dealer';

    const html = `
      <div class="bj-table">
        <div class="bj-hand-area">
          <div class="bj-score">Dealer: ${dealerScore}</div>
          <div class="bj-hand">
            ${state.dealerHand.map((c, i) => {
      return renderCard(c, state.active && i === 1, isDeal || (isDealer && i === state.dealerHand.length - 1));
    }).join('')}
          </div>
        </div>
        <div class="bj-msg">${state.message || ""}</div>
        <div class="bj-hand-area">
          <div class="bj-player-hands">
            ${state.hands.map((hand, hIdx) => {
      const isActive = state.active && hIdx === state.activeHandIndex;
      const score = calculateHand(hand.cards);
      const handClass = isActive ? "bj-hand active-hand" : "bj-hand";
      return `
                <div class="bj-hand-container">
                  <div class="${handClass}">
                    ${hand.cards.map((c, i) => {
        return renderCard(c, false, isDeal || (isActive && isHit && i === hand.cards.length - 1));
      }).join('')}
                  </div>
                  <div class="bj-score">${score}</div>
                  ${hand.bet > state.bet ? '<div class="tag warn" style="font-size:8px;margin-top:4px;">Doubled</div>' : ''}
                </div>`;
    }).join('')}
          </div>
        </div>
      </div>`;
    els.slotBoard.innerHTML = html;
  }

  function renderTowerBoard(machine) {
    if (!(els.slotBoard instanceof HTMLElement) || !(els.lineList instanceof HTMLElement)) return;
    const round = getTowerRoundForMachine(machine);
    const difficultyId = round ? normalizeTowerDifficultyId(round.difficultyId) : getTowerDifficultyForMachine(machine);
    const difficulty = getTowerDifficultyConfig(difficultyId);
    const floors = round ? Math.max(1, Math.floor(Number(round.floors) || TOWER_CONFIG.floors)) : TOWER_CONFIG.floors;
    const cols = round ? Math.max(1, Math.floor(Number(round.cols) || TOWER_CONFIG.cols)) : TOWER_CONFIG.cols;

    els.slotBoard.classList.add("tower-board");
    els.slotBoard.style.setProperty("--tower-cols", String(cols));
    els.slotBoard.style.setProperty("--tower-rows", String(floors));

    let html = "";
    for (let floor = floors - 1; floor >= 0; floor--) {
      const pick = round && Array.isArray(round.picksByFloor) ? round.picksByFloor[floor] : undefined;
      const safeCols = round && Array.isArray(round.safeColsByFloor) && Array.isArray(round.safeColsByFloor[floor]) ? round.safeColsByFloor[floor] : [];
      for (let col = 0; col < cols; col++) {
        let cls = "tower-cell locked";
        let text = "?";
        const isPicked = pick === col;
        const isSafe = safeCols.indexOf(col) >= 0;
        if (round && round.active) {
          if (floor < round.currentFloor && isPicked) {
            cls = "tower-cell safe";
            text = "SAFE";
          } else if (floor === round.currentFloor) {
            cls = "tower-cell active";
            text = "PICK";
          }
        } else if (round && round.ended) {
          if (isPicked && round.result === "lose") {
            cls = "tower-cell trap";
            text = "TRAP";
          } else if (isPicked && isSafe) {
            cls = "tower-cell safe";
            text = "SAFE";
          } else if (round.revealAll) {
            if (isSafe) {
              cls = "tower-cell revealed-safe";
              text = "SAFE";
            } else {
              cls = "tower-cell revealed-trap";
              text = "TRAP";
            }
          }
        }
        html += "<div class=\"" + cls + "\" data-floor=\"" + floor + "\" data-col=\"" + col + "\">" + text + "</div>";
      }
    }
    els.slotBoard.innerHTML = html;

    const rows = [];
    rows.push("<span class=\"line-badge\">Tower " + escapeHtml(difficulty.label) + "</span>");
    rows.push("<span class=\"line-badge\">Traps: " + difficulty.traps + "/" + cols + "</span>");

    if (!round) {
      rows.push("<span class=\"line-badge muted\">Start run, pick one tile per floor, cash out anytime.</span>");
      els.lineList.innerHTML = rows.join("");
      return;
    }

    const cleared = towerClearedFloors(round);
    const currentMult = towerCurrentMultiplier(round);
    const nextMult = towerNextMultiplier(round);
    rows.push("<span class=\"line-badge\">Progress: " + cleared + "/" + round.floors + "</span>");
    rows.push("<span class=\"line-badge\">Now: " + formatMultiplier(currentMult) + "</span>");

    if (round.active) {
      rows.push("<span class=\"line-badge\">Next: " + formatMultiplier(nextMult) + "</span>");
      if (cleared > 0) rows.push("<span class=\"line-badge hot\">Cashout: " + formatTowerPayout(round, currentMult) + " WL</span>");
    } else if (round.result === "lose") {
      rows.push("<span class=\"line-badge hot\">Trap hit. Lost " + round.bet + " WL</span>");
    } else {
      rows.push("<span class=\"line-badge hot\">Paid: " + Math.max(0, Math.floor(Number(round.payout) || 0)) + " WL</span>");
    }

    els.lineList.innerHTML = rows.slice(0, 8).join("");
  }

  function renderMinesBoard(machine) {
    if (!(els.slotBoard instanceof HTMLElement) || !(els.lineList instanceof HTMLElement)) return;
    const round = getMinesRoundForMachine(machine);
    const rows = MINES_CONFIG.rows;
    const cols = MINES_CONFIG.cols;
    const totalTiles = MINES_CONFIG.totalTiles;
    const minesCount = round ? round.minesCount : getMinesCountForMachine(machine);

    els.slotBoard.classList.add("mines-board");
    els.slotBoard.style.setProperty("--mines-cols", String(cols));
    els.slotBoard.style.setProperty("--mines-rows", String(rows));

    let html = "";
    for (let idx = 0; idx < totalTiles; idx++) {
      let cls = "mines-cell hidden";
      let text = "?";

      if (!round) {
        cls = "mines-cell active";
        text = "PICK";
      } else {
        const isMine = Boolean(round.mineMap[idx]);
        const isSafePicked = Boolean(round.revealedSafeMap[idx]);
        if (round.active) {
          if (isSafePicked) {
            cls = "mines-cell safe";
            text = "SAFE";
          } else {
            cls = "mines-cell active";
            text = "PICK";
          }
        } else if (round.ended) {
          if (isSafePicked) {
            cls = "mines-cell safe";
            text = "SAFE";
          } else if (round.revealAll && isMine) {
            cls = idx === round.pickedMineIndex ? "mines-cell mine" : "mines-cell revealed-mine";
            text = "MINE";
          } else if (round.revealAll) {
            cls = "mines-cell revealed-safe";
            text = "SAFE";
          }
        }
      }

      html += "<div class=\"" + cls + "\" data-index=\"" + idx + "\">" + text + "</div>";
    }
    els.slotBoard.innerHTML = html;

    const badges = [];
    badges.push("<span class=\"line-badge\">Mines: " + minesCount + "</span>");
    badges.push("<span class=\"line-badge\">Edge: " + Math.round((Number(MINES_CONFIG.houseEdge) || 0) * 10000) / 100 + "%</span>");

    if (!round) {
      badges.push("<span class=\"line-badge muted\">Pick mine count, press Start Run, then open safe tiles.</span>");
      badges.push("<span class=\"line-badge muted\">Cash out anytime after at least one safe pick.</span>");
      els.lineList.innerHTML = badges.join("");
      return;
    }

    const safeClicks = minesSafeClicks(round);
    const currentMult = minesCurrentMultiplier(round);
    const nextMult = minesNextMultiplier(round);
    const remainingTiles = Math.max(0, round.totalTiles - safeClicks);
    const remainingSafe = Math.max(0, round.safeTotal - safeClicks);
    const nextChance = remainingTiles > 0 ? (remainingSafe / remainingTiles) : 0;

    badges.push("<span class=\"line-badge\">Safe: " + safeClicks + "/" + round.safeTotal + "</span>");
    badges.push("<span class=\"line-badge\">Current: " + formatMultiplier(currentMult) + "</span>");

    if (round.active) {
      badges.push("<span class=\"line-badge hot\">Next: " + formatMultiplier(nextMult) + "</span>");
      badges.push("<span class=\"line-badge\">Next Safe Chance: " + Math.max(0, Math.min(100, Math.round(nextChance * 10000) / 100)) + "%</span>");
      if (safeClicks > 0) badges.push("<span class=\"line-badge hot\">Cashout: " + minesCashoutPayout(round) + " WL</span>");
    } else if (round.result === "lose") {
      badges.push("<span class=\"line-badge hot\">Mine hit. Lost " + round.bet + " WL</span>");
    } else {
      badges.push("<span class=\"line-badge hot\">Paid: " + Math.max(0, Math.floor(Number(round.payout) || 0)) + " WL</span>");
    }

    els.lineList.innerHTML = badges.slice(0, 24).join("");
  }

  function renderBoard(animCtx) {
    if (!(els.slotBoard instanceof HTMLElement) || !(els.slotOverlay instanceof SVGElement) || !(els.lineList instanceof HTMLElement)) return;
    const machine = getSelectedMachine();

    // Clear overlay
    els.slotOverlay.innerHTML = "";

    if (machine.type === 'blackjack') {
      if (els.boardWrap instanceof HTMLElement) els.boardWrap.classList.add('blackjack-mode');
      els.slotBoard.classList.remove("tower-board");
      els.slotBoard.classList.remove("mines-board");
      renderBlackjackBoard(machine, animCtx);
      els.lineList.innerHTML = ""; // No paylines for BJ
      return;
    } else if (machine.type === "tower") {
      if (els.boardWrap instanceof HTMLElement) els.boardWrap.classList.remove('blackjack-mode');
      els.slotBoard.classList.remove("mines-board");
      renderTowerBoard(machine);
      return;
    } else if (machine.type === "mines") {
      if (els.boardWrap instanceof HTMLElement) els.boardWrap.classList.remove('blackjack-mode');
      els.slotBoard.classList.remove("tower-board");
      renderMinesBoard(machine);
      return;
    } else {
      if (els.boardWrap instanceof HTMLElement) els.boardWrap.classList.remove('blackjack-mode');
      els.slotBoard.classList.remove("tower-board");
      els.slotBoard.classList.remove("mines-board");
    }

    const model = buildRowsForRender(machine);
    const rows = Array.isArray(model.rows) ? model.rows : [];
    const rowCount = Math.max(1, rows.length);
    let colCount = 1;
    for (let r = 0; r < rows.length; r++) colCount = Math.max(colCount, (rows[r] && rows[r].length) || 0);

    const safeMachineType = machine ? machine.type : "slots";
    const hitMask = buildHitMask(model.lineIds, colCount, rowCount, safeMachineType);
    const markedCells = Array.isArray(state.ephemeral.markedCells) ? state.ephemeral.markedCells : [];
    const markedMask = {};
    for (const m of markedCells) markedMask[m] = true;
    const cellMeta = state.ephemeral.cellMeta && typeof state.ephemeral.cellMeta === "object" ? state.ephemeral.cellMeta : {};
    const effectCells = state.ephemeral.effectCells && typeof state.ephemeral.effectCells === "object" ? state.ephemeral.effectCells : {};
    const upgradeFlashes = state.ephemeral.upgradeFlashes && typeof state.ephemeral.upgradeFlashes === "object" ? state.ephemeral.upgradeFlashes : {};

    let boardHtml = "";
    for (let c = 0; c < colCount; c++) {
      boardHtml += "<div class=\"reel\" style=\"--rows:" + rowCount + ";\">";
      for (let r = 0; r < rowCount; r++) {
        const key = r + "_" + c;
        const tok = normalizeToken(rows[r] && rows[r][c] ? rows[r][c] : "?");
        const cls = symbolClass(tok);
        const hit = hitMask[key] ? " hit" : "";
        const markedCls = markedMask[key] ? " marked" : "";
        const meta = cellMeta[key] && typeof cellMeta[key] === "object" ? cellMeta[key] : {};
        const lockedCls = meta.locked ? " locked-flag" : "";
        const effect = String(effectCells[key] || "").trim().toLowerCase();
        const effectCls = effect ? (" effect-" + effect) : "";
        let badgeHtml = "";
        if (meta.wildMult && meta.wildMult > 1) badgeHtml += "<span class=\"cell-badge wild\">x" + meta.wildMult + "</span>";
        if (meta.cellMult && meta.cellMult > 1) badgeHtml += "<span class=\"cell-badge mult\">x" + meta.cellMult + "</span>";
        if (meta.locked) badgeHtml += "<span class=\"cell-badge lock\">L</span>";
        if (badgeHtml) badgeHtml = "<span class=\"cell-badges\">" + badgeHtml + "</span>";
        const flash = String(upgradeFlashes[key] || "").trim();
        const flashHtml = flash ? ("<span class=\"cell-upgrade-flash\">" + escapeHtml(flash) + "</span>") : "";
        boardHtml += "<div class=\"cell " + cls + hit + markedCls + lockedCls + effectCls + "\" data-col=\"" + c + "\" data-row=\"" + r + "\"><span class=\"icon\">" + escapeHtml(symbolIcon(tok)) + "</span><span class=\"txt\">" + escapeHtml(symbolLabel(tok)) + "</span>" + badgeHtml + flashHtml + "</div>";
      }
      boardHtml += "</div>";
    }
    els.slotBoard.style.setProperty("--cols", String(colCount));
    els.slotBoard.innerHTML = boardHtml;

    // --- draw paylines using real DOM cell centers (pixel-perfect) ---
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

  function startSpinFx(machine, isBonus) {
    if (els.lastWinLabel) els.lastWinLabel.classList.add("hidden");
    stopSpinFx();
    state.spinBusy = true;
    if (!state.bonusFlow.active) {
      setBonusPhase(BONUS_PHASES.BASE_SPINNING);
      showBonusHud(false);
    }
    state.ephemeral.cellMeta = {};
    state.ephemeral.effectCells = {};
    state.ephemeral.upgradeFlashes = {};
    if (els.boardWrap instanceof HTMLElement) {
      els.boardWrap.classList.add("spinning");
      // Remove stopped class from all cells for next spin
      const cells = els.boardWrap.querySelectorAll('.cell');
      cells.forEach(c => c.classList.remove('stopped', 'wheel-anim'));
    }
    if (els.spinBtn instanceof HTMLButtonElement) {
      els.spinBtn.disabled = true;
      els.spinBtn.textContent = "Spinning...";
    }
    if (els.buyBonusBtn instanceof HTMLButtonElement) els.buyBonusBtn.disabled = true;
    let tick = 0;

    // We maintain visual sync by occasionally re-rendering random rows for blurring effects
    state.spinTimer = window.setInterval(() => {
      tick += 1;
      // Only randomize rows that are NOT stopped in the logic handled below
      if (!state.ephemeral.stoppedCols) {
        state.ephemeral.rows = randomRowsForMachine(machine, tick);
        state.ephemeral.lineIds = [];
        state.ephemeral.lineWins = [isBonus ? "BONUS BUY..." : "Spinning..."];
        renderBoard();
      }
    }, 90);
  }

  function stopSpinFx() {
    if (state.spinTimer) {
      window.clearInterval(state.spinTimer);
      state.spinTimer = 0;
    }
    state.spinBusy = false;
    state.ephemeral.stoppedCols = null;
    if (els.boardWrap instanceof HTMLElement) els.boardWrap.classList.remove("spinning");
    if (els.spinBtn instanceof HTMLButtonElement) els.spinBtn.textContent = "Spin";
    if (!state.bonusFlow.active) setBonusPhase(BONUS_PHASES.BASE_IDLE);
  }

  function bonusAnimTimings(machineType) {
    const type = String(machineType || "").trim().toLowerCase();
    if (type === "slots_v2") {
      return { intro: 900, spin: 360, reveal: 560, fillFx: 500, fillSettle: 280, between: 280 };
    }
    if (type === "snoop_dogg_dollars") {
      return { intro: 520, spin: 420, reveal: 700, fillFx: 420, fillSettle: 220, between: 300 };
    }
    return { intro: 1500, spin: 650, reveal: 1200, fillFx: 1000, fillSettle: 500, between: 600 };
  }

  function countLockedFromCellMeta(metaMap) {
    const meta = metaMap && typeof metaMap === "object" ? metaMap : {};
    const keys = Object.keys(meta);
    let wilds = 0;
    let multis = 0;
    for (let i = 0; i < keys.length; i++) {
      const row = meta[keys[i]] && typeof meta[keys[i]] === "object" ? meta[keys[i]] : {};
      if (Math.max(0, Math.floor(Number(row.wildMult) || 0)) > 0) wilds += 1;
      if (Math.max(0, Math.floor(Number(row.cellMult) || 0)) > 1) multis += 1;
    }
    return { wilds, multis };
  }

  async function runSnoopBonusIntroFrame(machine, frame) {
    const intro = frame && frame.intro && typeof frame.intro === "object" ? frame.intro : {};
    const awarded = Math.max(0, Math.floor(Number(intro.awardedSpins) || 0));
    const beforeRows = Array.isArray(frame && frame.reels) ? frame.reels : [];
    const beforeMeta = sanitizeCellMeta(frame && frame.cellMeta);
    const afterRows = Array.isArray(intro.afterReels) ? intro.afterReels : beforeRows;
    const afterMeta = sanitizeCellMeta(intro.afterCellMeta);
    const scatterKeys = Array.isArray(intro.scatterKeys) ? intro.scatterKeys : [];
    const transformations = Array.isArray(intro.transformations) ? intro.transformations : [];

    setBonusPhase(BONUS_PHASES.BONUS_INTRO);
    state.bonusFlow.active = true;
    state.bonusFlow.machineType = machine ? machine.type : "";
    showBonusHud(true);
    updateBonusHud({
      mode: "FREE SPINS",
      spinsLeft: awarded,
      bonusWin: 0,
      currentSpinWin: 0,
      stickyWilds: countLockedFromCellMeta(beforeMeta).wilds,
      multiplierCells: countLockedFromCellMeta(beforeMeta).multis
    });

    state.ephemeral.rows = rowsFromResult(beforeRows, machine.type);
    state.ephemeral.lineIds = [];
    state.ephemeral.lineWins = [String(frame && frame.lineText || "FREE SPINS")];
    state.ephemeral.markedCells = scatterKeys.slice(0, 256);
    state.ephemeral.cellMeta = beforeMeta;
    state.ephemeral.effectCells = {};
    for (let i = 0; i < scatterKeys.length; i++) {
      const key = String(scatterKeys[i] || "");
      if (key) state.ephemeral.effectCells[key] = "scatter";
    }
    state.ephemeral.upgradeFlashes = {};
    renderBoard();

    setBoardDimmed(true);
    await showBonusOverlay(
      "FREE SPINS",
      "You won " + awarded + " Free Spins",
      "Trigger scatters are transforming into Sticky Wilds or x10 cells.",
      false
    );
    await sleep(420);

    for (let i = 0; i < transformations.length; i++) {
      const tr = transformations[i] && typeof transformations[i] === "object" ? transformations[i] : {};
      const key = String(tr.key || "");
      if (!key) continue;
      state.ephemeral.effectCells[key] = "transform";
      renderBoard();
      await sleep(180);
      state.ephemeral.effectCells[key] = tr.to === "wild" ? "wild-up" : "weed";
      if (tr.to === "wild") state.ephemeral.upgradeFlashes[key] = "+10";
      renderBoard();
      await sleep(220);
    }

    state.ephemeral.rows = rowsFromResult(afterRows, machine.type);
    state.ephemeral.markedCells = [];
    state.ephemeral.cellMeta = afterMeta;
    state.ephemeral.effectCells = {};
    state.ephemeral.upgradeFlashes = {};
    renderBoard();

    const counts = countLockedFromCellMeta(afterMeta);
    updateBonusHud({
      mode: "FREE SPINS",
      spinsLeft: awarded,
      bonusWin: 0,
      currentSpinWin: 0,
      stickyWilds: counts.wilds,
      multiplierCells: counts.multis
    });
    await sleep(260);
    await hideBonusOverlay();
    setBoardDimmed(false);
  }

  async function runBonusPlayback(machine, bonusFrames) {
    const frames = Array.isArray(bonusFrames) ? bonusFrames : [];
    if (!frames.length) return { bonusTotal: 0, biggestSpinWin: 0, biggestCascadeWin: 0 };
    const bonusFx = bonusAnimTimings(machine.type);
    const showHud = machine.type === "snoop_dogg_dollars";
    let bonusTotal = 0;
    let biggestSpinWin = 0;
    let biggestCascadeWin = 0;
    setBonusPhase(BONUS_PHASES.BONUS_SPINNING);
    showBonusHud(showHud);
    const firstType = String(frames[0] && frames[0].frameType || "").trim().toLowerCase();
    await sleep(firstType === "bonus_intro" ? Math.min(180, bonusFx.intro) : bonusFx.intro);
    for (let i = 0; i < frames.length; i++) {
      const frame = frames[i] && typeof frames[i] === "object" ? frames[i] : {};
      const frameType = String(frame.frameType || "bonus_spin").trim().toLowerCase();
      if (frameType === "bonus_intro" && machine.type === "snoop_dogg_dollars") {
        await runSnoopBonusIntroFrame(machine, frame);
        continue;
      }
      if (frameType === "bonus_end") {
        const summary = frame.summary && typeof frame.summary === "object" ? frame.summary : {};
        biggestCascadeWin = Math.max(biggestCascadeWin, Math.max(0, Math.floor(Number(summary.biggestCascadeWin) || 0)));
        continue;
      }

      setBonusPhase(BONUS_PHASES.BONUS_SPINNING);
      state.ephemeral.stoppedCols = 0;
      if (els.boardWrap instanceof HTMLElement) els.boardWrap.classList.add("spinning");
      renderBoard();
      await sleep(bonusFx.spin);
      if (els.boardWrap instanceof HTMLElement) els.boardWrap.classList.remove("spinning");
      state.ephemeral.stoppedCols = machine.reels;

      applyFrameToEphemeral(frame, machine.type);
      renderBoard();
      await sleep(bonusFx.reveal);

      const spinPay = Math.max(0, Math.floor(Number(frame.spinPay) || 0));
      bonusTotal += spinPay;
      if (spinPay > biggestSpinWin) biggestSpinWin = spinPay;
      if (frame && frame.summary && typeof frame.summary === "object") {
        biggestCascadeWin = Math.max(
          biggestCascadeWin,
          Math.max(0, Math.floor(Number(frame.summary.biggestCascadeWin) || 0))
        );
      }
      const hud = frame.hud && typeof frame.hud === "object" ? frame.hud : {};
      const metaCounts = countLockedFromCellMeta(state.ephemeral.cellMeta);
      if (showHud) {
        updateBonusHud({
          mode: "FREE SPINS",
          spinsLeft: Math.max(0, Math.floor(Number(hud.freeSpinsLeft) || 0)),
          bonusWin: Math.max(0, Math.floor(Number(hud.bonusWin) || bonusTotal)),
          currentSpinWin: Math.max(0, Math.floor(Number(hud.currentSpinWin) || spinPay)),
          stickyWilds: Math.max(0, Math.floor(Number(hud.stickyWilds) || metaCounts.wilds)),
          multiplierCells: Math.max(0, Math.floor(Number(hud.multiplierCells) || metaCounts.multis))
        });
      }

      const banner = String(frame.banner || "").trim();
      if (banner) showBonusBanner(banner);
      if (frame && frame.fills) {
        setBonusPhase(BONUS_PHASES.BONUS_CASCADE);
        if (els.boardWrap instanceof HTMLElement) els.boardWrap.classList.add("winfx");
        await sleep(bonusFx.fillFx);
        if (els.boardWrap instanceof HTMLElement) els.boardWrap.classList.remove("winfx");
        await sleep(bonusFx.fillSettle);
      }
      await sleep(bonusFx.between);
    }

    if (machine.type === "snoop_dogg_dollars") {
      setBonusPhase(BONUS_PHASES.BONUS_END);
      setBoardDimmed(true);
      const subText = biggestCascadeWin > 0
        ? ("Biggest Spin: " + biggestSpinWin + " WL | Best Cascade: " + biggestCascadeWin + " WL")
        : ("Biggest Spin: " + biggestSpinWin + " WL");
      await showBonusOverlay(
        "BONUS COMPLETE",
        "Total Bonus Win: " + bonusTotal + " WL",
        subText,
        true
      );
      await waitBonusContinue(12000);
      await hideBonusOverlay();
      setBoardDimmed(false);
    }
    setBoardDimmed(false);
    state.bonusFlow.active = false;
    state.ephemeral.effectCells = {};
    state.ephemeral.upgradeFlashes = {};
    showBonusHud(false);
    setBonusPhase(BONUS_PHASES.BASE_IDLE);
    return { bonusTotal, biggestSpinWin, biggestCascadeWin };
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

  function getMachineCategoryId(machineType) {
    const type = String(machineType || "").trim().toLowerCase();
    if (type === "blackjack") return "table";
    if (type === "tower" || type === "mines") return "risk";
    return "slots";
  }

  function getMachineCategoryLabel(categoryId) {
    const id = String(categoryId || "").trim().toLowerCase();
    for (let i = 0; i < MACHINE_CATEGORY_DEFS.length; i++) {
      if (MACHINE_CATEGORY_DEFS[i].id === id) return MACHINE_CATEGORY_DEFS[i].label;
    }
    return "Slots";
  }

  function ensureValidMachineCategory(countByCategory) {
    const by = countByCategory && typeof countByCategory === "object" ? countByCategory : {};
    const selected = String(state.machineCategory || "all");
    const known = MACHINE_CATEGORY_DEFS.some((row) => row.id === selected);
    if (!known) {
      state.machineCategory = "all";
      return;
    }
    if (selected !== "all" && Math.max(0, Math.floor(Number(by[selected]) || 0)) <= 0) {
      state.machineCategory = "all";
    }
  }

  // Renders the "Tablet" style grid of games in the lobby
  function renderMachineSelector() {
    if (!(els.machineList instanceof HTMLElement)) return;
    const rows = state.machines.slice().sort((a, b) => a.ty - b.ty || a.tx - b.tx);
    if (!rows.length) {
      if (els.machineCategoryTabs instanceof HTMLElement) els.machineCategoryTabs.innerHTML = "";
      els.machineList.innerHTML = "<div class=\"status\">No games available.</div>";
      return;
    }

    const countByCategory = { all: rows.length, slots: 0, table: 0, risk: 0 };
    for (let i = 0; i < rows.length; i++) {
      const cat = getMachineCategoryId(rows[i].type);
      countByCategory[cat] = Math.max(0, Math.floor(Number(countByCategory[cat]) || 0)) + 1;
    }
    ensureValidMachineCategory(countByCategory);

    if (els.machineCategoryTabs instanceof HTMLElement) {
      els.machineCategoryTabs.innerHTML = MACHINE_CATEGORY_DEFS
        .filter((row) => row.id === "all" || Math.max(0, Math.floor(Number(countByCategory[row.id]) || 0)) > 0)
        .map((row) => {
          const active = row.id === state.machineCategory ? " active" : "";
          const count = Math.max(0, Math.floor(Number(countByCategory[row.id]) || 0));
          return (
            "<button type=\"button\" class=\"machine-cat-btn" + active + "\" data-category=\"" + row.id + "\">" +
            "<span>" + escapeHtml(row.label) + "</span>" +
            "<span class=\"count\">" + count + "</span>" +
            "</button>"
          );
        }).join("");
    }

    const selected = String(state.machineCategory || "all");
    const visible = selected === "all"
      ? rows
      : rows.filter((row) => getMachineCategoryId(row.type) === selected);

    if (!visible.length) {
      els.machineList.innerHTML = "<div class=\"status\">No games in this category.</div>";
      return;
    }

    els.machineList.innerHTML = visible.map((row) => {
      const catId = getMachineCategoryId(row.type);
      const catLabel = getMachineCategoryLabel(catId);
      return (
        "<div class=\"machine-item\" data-machine-key=\"" + escapeHtml(row.tileKey) + "\">" +
        "<div class=\"machine-cat " + escapeHtml(catId) + "\">" + escapeHtml(catLabel) + "</div>" +
        "<div class=\"name\">" + escapeHtml(row.typeName) + "</div>" +
        "<div class=\"info\">Max Bet: " + formatLocksByDisplayUnit(row.maxBet) + "</div>" +
        "<div class=\"info\">Plays: " + row.stats.plays + "</div>" +
        "</div>"
      );
    }).join("");
  }

  function renderMachineStats() {
    const machine = getSelectedMachine();
    if (!machine) {
      showBonusHud(false);
      if (els.statBank instanceof HTMLElement) els.statBank.textContent = "Bank: " + formatLocksByDisplayUnit(0);
      if (els.statMaxBet instanceof HTMLElement) els.statMaxBet.textContent = "Max Bet: " + formatLocksByDisplayUnit(0);
      if (els.statPlays instanceof HTMLElement) els.statPlays.textContent = "Plays: 0";
      if (els.statPayout instanceof HTMLElement) els.statPayout.textContent = "Total Payout: " + formatLocksByDisplayUnit(0);
      if (els.stage instanceof HTMLElement) els.stage.classList.remove("theme-slots", "theme-slots_v2", "theme-slots_v3", "theme-slots_v4", "theme-slots_v6", "theme-le_bandit", "theme-tower", "theme-mines", "theme-snoop_dogg_dollars");
      if (els.spinBtn instanceof HTMLButtonElement) els.spinBtn.disabled = true;
      if (els.buyBonusBtn instanceof HTMLButtonElement) {
        els.buyBonusBtn.classList.add("hidden");
        els.buyBonusBtn.disabled = true;
      }
      if (els.towerDifficultyWrap instanceof HTMLElement) els.towerDifficultyWrap.classList.add("hidden");
      if (els.towerCashoutBtn instanceof HTMLButtonElement) {
        els.towerCashoutBtn.classList.add("hidden");
        els.towerCashoutBtn.disabled = true;
      }
      if (els.minesCountWrap instanceof HTMLElement) els.minesCountWrap.classList.add("hidden");
      if (els.minesCashoutBtn instanceof HTMLButtonElement) {
        els.minesCashoutBtn.classList.add("hidden");
        els.minesCashoutBtn.disabled = true;
      }
      if (els.snoopBuyWrap instanceof HTMLElement) els.snoopBuyWrap.classList.add("hidden");
      if (els.snoopHypeBtn instanceof HTMLButtonElement) {
        els.snoopHypeBtn.classList.add("hidden");
        els.snoopHypeBtn.disabled = true;
      }
      if (els.snoopBuyBtn instanceof HTMLButtonElement) {
        els.snoopBuyBtn.classList.add("hidden");
        els.snoopBuyBtn.disabled = true;
      }
      return;
    }

    if (machine.type !== "snoop_dogg_dollars" && !state.bonusFlow.active) {
      showBonusHud(false);
    }

    if (els.statBank instanceof HTMLElement) {
      const bankText = INFINITE_BANK ? "Infinite" : formatLocksByDisplayUnit(machine.earningsLocks);
      els.statBank.textContent = "Bank: " + bankText;
    }
    if (els.statMaxBet instanceof HTMLElement) els.statMaxBet.textContent = "Max Bet: " + formatLocksByDisplayUnit(machine.maxBet);
    if (els.statPlays instanceof HTMLElement) els.statPlays.textContent = "Plays: " + machine.stats.plays;
    if (els.statPayout instanceof HTMLElement) els.statPayout.textContent = "Total Payout: " + formatLocksByDisplayUnit(machine.stats.totalPayout);

    if (els.stage instanceof HTMLElement) {
      const currentType = machine.type;
      els.stage.classList.remove("theme-slots", "theme-slots_v2", "theme-slots_v3", "theme-slots_v4", "theme-slots_v6", "theme-le_bandit", "theme-tower", "theme-mines", "theme-snoop_dogg_dollars");
      if (typeof currentType === "string") {
        if (currentType === "le_bandit") els.stage.classList.add("theme-le_bandit");
        else if (currentType === "tower") els.stage.classList.add("theme-tower");
        else if (currentType === "mines") els.stage.classList.add("theme-mines");
        else if (currentType === "snoop_dogg_dollars") els.stage.classList.add("theme-snoop_dogg_dollars");
        else if (currentType.startsWith("slots")) els.stage.classList.add("theme-" + currentType);
      }
    }

    // Toggle controls based on game type
    const isBlackjack = machine.type === 'blackjack';
    const isTower = machine.type === "tower";
    const isMines = machine.type === "mines";
    const isSnoop = machine.type === "snoop_dogg_dollars";
    const bjState = machine.stats.blackjackState;
    const activeHand = (bjState && bjState.hands && bjState.hands[bjState.activeHandIndex]) || null;
    const towerRound = isTower ? getTowerRoundForMachine(machine) : null;
    const minesRound = isMines ? getMinesRoundForMachine(machine) : null;

    const bet = clampBetToMachine(machine, state.currentBetValue);
    let displayBet = bet;

    if (isBlackjack && bjState && bjState.active && Array.isArray(bjState.hands)) {
      displayBet = bjState.hands.reduce((sum, h) => sum + (Number(h.bet) || 0), 0);
    }

    if (els.currentBetDisplay instanceof HTMLElement) {
      els.currentBetDisplay.textContent = formatLocksByDisplayUnit(displayBet);
    }

    const maxStake = Math.max(machine.minBet, getSpinMaxBet(machine));
    const busyByOther = Boolean(machine.inUseAccountId && machine.inUseAccountId !== (state.user && state.user.accountId));
    const canBet = !state.spinBusy && !busyByOther && state.webVaultLocks >= displayBet;

    // Blackjack specific buttons
    if (els.bjHitBtn) els.bjHitBtn.classList.toggle("hidden", !isBlackjack);
    if (els.bjStandBtn) els.bjStandBtn.classList.toggle("hidden", !isBlackjack);
    if (els.bjDoubleBtn) els.bjDoubleBtn.classList.toggle("hidden", !isBlackjack);
    if (els.bjSplitBtn) els.bjSplitBtn.classList.toggle("hidden", !isBlackjack);
    if (els.towerDifficultyWrap instanceof HTMLElement) els.towerDifficultyWrap.classList.toggle("hidden", !isTower);
    if (els.towerCashoutBtn instanceof HTMLButtonElement) els.towerCashoutBtn.classList.toggle("hidden", !isTower);
    if (els.minesCountWrap instanceof HTMLElement) els.minesCountWrap.classList.toggle("hidden", !isMines);
    if (els.minesCashoutBtn instanceof HTMLButtonElement) els.minesCashoutBtn.classList.toggle("hidden", !isMines);
    if (els.snoopBuyWrap instanceof HTMLElement) els.snoopBuyWrap.classList.toggle("hidden", !isSnoop);
    if (els.snoopHypeBtn instanceof HTMLButtonElement) els.snoopHypeBtn.classList.toggle("hidden", !isSnoop);
    if (els.snoopBuyBtn instanceof HTMLButtonElement) els.snoopBuyBtn.classList.toggle("hidden", !isSnoop);

    if (isTower && els.towerDifficultySelect instanceof HTMLSelectElement) {
      const selectedDifficulty = getTowerDifficultyForMachine(machine);
      if (els.towerDifficultySelect.value !== selectedDifficulty) els.towerDifficultySelect.value = selectedDifficulty;
      els.towerDifficultySelect.disabled = Boolean(towerRound && towerRound.active);
    }
    if (isTower && els.towerCashoutBtn instanceof HTMLButtonElement) {
      const canCashout = Boolean(towerRound && towerRound.active && towerClearedFloors(towerRound) > 0);
      const currentMult = towerRound ? towerCurrentMultiplier(towerRound) : 1;
      els.towerCashoutBtn.textContent = "Cash Out " + formatLocksByDisplayUnit(towerRound ? formatTowerPayout(towerRound, currentMult) : 0);
      els.towerCashoutBtn.disabled = !canCashout;
    }
    if (isMines && els.minesCountSelect instanceof HTMLSelectElement) {
      const selectedMines = String(getMinesCountForMachine(machine));
      if (els.minesCountSelect.value !== selectedMines) els.minesCountSelect.value = selectedMines;
      els.minesCountSelect.disabled = Boolean(minesRound && minesRound.active);
    }
    if (isMines && els.minesCashoutBtn instanceof HTMLButtonElement) {
      const canCashout = Boolean(minesRound && minesRound.active && minesSafeClicks(minesRound) > 0);
      els.minesCashoutBtn.textContent = "Cash Out " + formatLocksByDisplayUnit(minesRound ? minesCashoutPayout(minesRound) : 0);
      els.minesCashoutBtn.disabled = !canCashout;
    }
    if (isSnoop && els.snoopBuySelect instanceof HTMLSelectElement) {
      const val = Math.max(3, Math.min(6, Math.floor(Number(els.snoopBuySelect.value) || 3)));
      if (els.snoopBuySelect.value !== String(val)) els.snoopBuySelect.value = String(val);
      els.snoopBuySelect.disabled = false;
    }
    if (isSnoop && els.snoopHypeBtn instanceof HTMLButtonElement) {
      const hypeCost = bet * Math.max(1, Math.floor(Number(SNOOP_UI.hypeCostX) || 20));
      els.snoopHypeBtn.textContent = "Hype Spin " + formatLocksByDisplayUnit(hypeCost);
      els.snoopHypeBtn.disabled = !canBet || state.webVaultLocks < hypeCost;
    }
    if (isSnoop && els.snoopBuyBtn instanceof HTMLButtonElement && els.snoopBuySelect instanceof HTMLSelectElement) {
      const scatters = Math.max(3, Math.min(6, Math.floor(Number(els.snoopBuySelect.value) || 3)));
      const buyX = Math.max(1, Math.floor(Number(SNOOP_UI.buyCostByScatter[scatters]) || 1));
      const buyCost = bet * buyX;
      els.snoopBuyBtn.textContent = "Buy " + scatters + "SC " + formatLocksByDisplayUnit(buyCost);
      els.snoopBuyBtn.disabled = !canBet || state.webVaultLocks < buyCost;
    }

    if (isBlackjack) {
      const active = bjState && bjState.active;
      const canSplit = active && activeHand && activeHand.cards.length === 2 && activeHand.cards[0].value === activeHand.cards[1].value && state.webVaultLocks >= bjState.bet;

      if (els.bjHitBtn) els.bjHitBtn.disabled = !active;
      if (els.bjStandBtn) els.bjStandBtn.disabled = !active;
      if (els.bjDoubleBtn) els.bjDoubleBtn.disabled = !active || state.webVaultLocks < bjState.bet;
      if (els.bjSplitBtn) els.bjSplitBtn.disabled = !canSplit;
      if (els.spinBtn) {
        els.spinBtn.textContent = active ? "Game Active" : "Deal";
        els.spinBtn.disabled = active || !canBet;
      }
    } else if (isTower) {
      const activeTower = Boolean(towerRound && towerRound.active);
      if (els.spinBtn) {
        els.spinBtn.textContent = activeTower ? "Run Active" : "Start Run";
        els.spinBtn.disabled = activeTower || !canBet;
      }
    } else if (isMines) {
      const activeMines = Boolean(minesRound && minesRound.active);
      if (els.spinBtn) {
        els.spinBtn.textContent = activeMines ? "Run Active" : "Start Run";
        els.spinBtn.disabled = activeMines || !canBet;
      }
    } else if (isSnoop) {
      if (els.spinBtn) {
        els.spinBtn.textContent = "Spin";
        els.spinBtn.disabled = !canBet;
      }
    } else {
      if (els.spinBtn) {
        els.spinBtn.textContent = "Spin";
        els.spinBtn.disabled = !canBet;
      }
    }

    const buyEnabled = machine.type === "slots_v2" || machine.type === "le_bandit";
    if (els.buyBonusBtn instanceof HTMLButtonElement) {
      els.buyBonusBtn.classList.toggle("hidden", !buyEnabled);
      if (buyEnabled) {
        const cost = bet * 10;
        els.buyBonusBtn.textContent = "Buy Bonus " + formatLocksByDisplayUnit(cost);
        els.buyBonusBtn.disabled = !canBet || state.webVaultLocks < cost;
      } else {
        els.buyBonusBtn.disabled = true;
      }
    }

    renderBetChipLabels();
  }

  function renderAll(animCtx) {
    renderSession();
    renderMachineSelector();
    renderMachineStats();
    renderBoard(animCtx);
  }

  function switchView(viewName) {
    if (els.viewLogin) els.viewLogin.classList.add("hidden");
    if (els.viewLobby) els.viewLobby.classList.add("hidden");
    if (els.viewGame) els.viewGame.classList.add("hidden");

    if (viewName === "login" && els.viewLogin) els.viewLogin.classList.remove("hidden");
    if (viewName === "lobby" && els.viewLobby) els.viewLobby.classList.remove("hidden");
    if (viewName === "game" && els.viewGame) els.viewGame.classList.remove("hidden");
    if (viewName !== "game") clearBonusUiState();
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

      attachUserSession();
      switchView("lobby");
    } catch (error) {
      setStatus(els.authStatus, (error && error.message) || "Login failed.", "error");
    } finally {
      setAuthBusy(false);
    }
  }

  function logout() {
    clearSessionRefs();
    state.user = null;
    state.walletLocks = 0;
    state.webVaultLocks = 0;
    state.walletBreakdownText = "0 WL";
    resetEphemeralVisuals();
    clearBonusUiState();
    state.tower.roundsByMachine = {};
    state.tower.difficultyByMachine = {};
    state.mines.roundsByMachine = {};
    state.mines.minesByMachine = {};
    renderAll();
    state.selectedMachineKey = "";
    setStatus(els.authStatus, "Logged out.");
    switchView("login");
  }

  async function attachUserSession() {
    if (!state.user) return;
    try {
      const db = await ensureDb();
      const basePath = String(window.GT_SETTINGS && window.GT_SETTINGS.BASE_PATH || "growtopia-test");
      clearSessionRefs();
      state.refs.inventory = db.ref(basePath + "/player-inventories/" + state.user.accountId);

      state.handlers.inventory = (snap) => {
        const wallet = toWallet(snap && typeof snap.val === "function" ? snap.val() : {});
        state.walletLocks = wallet.total;
        state.webVaultLocks = wallet.vault;
        state.walletBreakdownText = walletText(wallet.byId);
        renderSession();
        renderMachineStats(); // Re-render stats to update button disabled states
      };

      state.refs.inventory.on("value", state.handlers.inventory);
    } catch (error) {
      // silent fail
    }
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

  function sanitizeEffectCells(rawMap) {
    const src = rawMap && typeof rawMap === "object" ? rawMap : {};
    const out = {};
    const keys = Object.keys(src);
    for (let i = 0; i < keys.length; i++) {
      const key = String(keys[i] || "");
      if (!key) continue;
      const val = String(src[key] || "").trim().toLowerCase();
      if (!val) continue;
      out[key] = val;
    }
    return out;
  }

  function sanitizeCellMeta(rawMeta) {
    const src = rawMeta && typeof rawMeta === "object" ? rawMeta : {};
    const out = {};
    const keys = Object.keys(src);
    for (let i = 0; i < keys.length; i++) {
      const key = String(keys[i] || "");
      if (!key) continue;
      const row = src[key] && typeof src[key] === "object" ? src[key] : {};
      const wildMult = Math.max(0, Math.floor(Number(row.wildMult) || 0));
      const cellMult = Math.max(0, Math.floor(Number(row.cellMult) || 0));
      const locked = Boolean(row.locked || wildMult > 0 || cellMult > 1);
      if (!locked && wildMult <= 0 && cellMult <= 0) continue;
      out[key] = { locked, wildMult, cellMult };
    }
    return out;
  }

  function applyFrameToEphemeral(frame, machineType) {
    const row = frame && typeof frame === "object" ? frame : {};
    state.ephemeral.rows = rowsFromResult(row.reels, machineType);
    state.ephemeral.lineIds = [];
    state.ephemeral.lineWins = [String(row.lineText || "Bonus step")];
    state.ephemeral.markedCells = Array.isArray(row.markedCells) ? row.markedCells.slice(0, 256) : [];
    state.ephemeral.cellMeta = sanitizeCellMeta(row.cellMeta);
    state.ephemeral.effectCells = sanitizeEffectCells(row.effectCells);
    state.ephemeral.upgradeFlashes = {};
    const upgrades = Array.isArray(row.wildUpgrades) ? row.wildUpgrades : [];
    for (let i = 0; i < upgrades.length; i++) {
      const up = upgrades[i] && typeof upgrades[i] === "object" ? upgrades[i] : {};
      const key = String(up.key || "");
      if (!key) continue;
      const to = Math.max(0, Math.floor(Number(up.to) || 0));
      const from = Math.max(0, Math.floor(Number(up.from) || 0));
      if (to > from) state.ephemeral.upgradeFlashes[key] = "+" + (to - from);
    }
  }

  async function runBlackjackAction(action) {
    const machine = getSelectedMachine();
    if (!machine || machine.type !== 'blackjack') return;

    // Initialize state if missing
    if (!machine.stats.blackjackState) {
      machine.stats.blackjackState = { active: false, hands: [], dealerHand: [], deck: [], bet: 0, message: "Place bet and Deal", activeHandIndex: 0 };
    }
    const bj = machine.stats.blackjackState;

    if (action === 'deal') {
      if (els.lastWinLabel) els.lastWinLabel.classList.add("hidden");
      if (bj.active) return;
      const bet = clampBetToMachine(machine, state.currentBetValue);
      if (state.webVaultLocks < bet) return;

      // Deduct bet
      const debit = await adjustWallet(-bet);
      if (!debit.ok) return;

      bj.bet = bet;
      bj.deck = getDeck();
      bj.hands = [{ cards: [bj.deck.pop(), bj.deck.pop()], bet: bet, done: false }];
      bj.dealerHand = [bj.deck.pop(), bj.deck.pop()];
      bj.active = true;
      bj.activeHandIndex = 0;
      bj.message = "Hit or Stand?";

      // Check natural blackjack
      if (isBlackjack(bj.hands[0].cards)) {
        bj.active = false;
        if (isBlackjack(bj.dealerHand)) {
          bj.message = "Push! Both have Blackjack.";
          await adjustWallet(bet); // Return bet
          if (els.lastWinLabel) { els.lastWinLabel.textContent = "Push"; els.lastWinLabel.classList.remove("hidden"); }
        } else {
          const win = Math.floor(bet * 2.5);
          bj.message = `Blackjack! Won ${win} WL`;
          await adjustWallet(win);
          if (els.lastWinLabel) { els.lastWinLabel.textContent = "Won: " + win + " WL"; els.lastWinLabel.classList.remove("hidden"); }
        }
      }
      renderAll('deal');
    } else if (action === 'hit') {
      if (!bj.active) return;
      const hand = bj.hands[bj.activeHandIndex];
      hand.cards.push(bj.deck.pop());
      renderAll('hit');
      if (calculateHand(hand.cards) > 21) {
        await sleep(600);
        hand.done = true;
        // Move to next hand or finish
        if (bj.activeHandIndex < bj.hands.length - 1) {
          bj.activeHandIndex++;
        } else {
          await finishDealer(bj);
        }
        renderAll();
      }
    } else if (action === 'stand') {
      if (!bj.active) return;

      const hand = bj.hands[bj.activeHandIndex];
      hand.done = true;

      if (bj.activeHandIndex < bj.hands.length - 1) {
        bj.activeHandIndex++;
      } else {
        await finishDealer(bj);
      }
      renderAll();
    } else if (action === 'double') {
      if (!bj.active) return;
      const hand = bj.hands[bj.activeHandIndex];
      if (hand.cards.length !== 2) return;
      if (state.webVaultLocks < bj.bet) return; // Need enough for 2nd bet

      const debit = await adjustWallet(-bj.bet);
      if (!debit.ok) return;

      hand.bet *= 2;
      hand.cards.push(bj.deck.pop());
      renderAll('hit');

      await sleep(600);
      hand.done = true;

      if (bj.activeHandIndex < bj.hands.length - 1) {
        bj.activeHandIndex++;
      } else {
        await finishDealer(bj);
      }
      renderAll();
    } else if (action === 'split') {
      if (!bj.active) return;
      const hand = bj.hands[bj.activeHandIndex];
      if (hand.cards.length !== 2 || hand.cards[0].value !== hand.cards[1].value) return;
      if (state.webVaultLocks < bj.bet) return;

      const debit = await adjustWallet(-bj.bet);
      if (!debit.ok) return;

      // Split logic
      const card1 = hand.cards[0];
      const card2 = hand.cards[1];

      // Replace current hand with first split hand
      hand.cards = [card1, bj.deck.pop()];

      // Insert second split hand after current
      bj.hands.splice(bj.activeHandIndex + 1, 0, {
        cards: [card2, bj.deck.pop()],
        bet: bj.bet,
        done: false
      });

      bj.message = "Split! Playing Hand 1.";
      renderAll('deal');
    }
  }

  async function finishDealer(bj) {
    bj.active = false;
    renderAll(); // Reveal hidden

    // Only play dealer if at least one player hand didn't bust
    const anyLive = bj.hands.some(h => calculateHand(h.cards) <= 21);

    if (anyLive) {
      while (calculateHand(bj.dealerHand) < 17) {
        await sleep(800);
        bj.dealerHand.push(bj.deck.pop());
        renderAll('dealer');
      }
    }

    const dScore = calculateHand(bj.dealerHand);
    let totalWin = 0;
    let anyWin = false;
    let anyPush = false;

    for (const hand of bj.hands) {
      const pScore = calculateHand(hand.cards);
      if (pScore > 21) {
        // Bust, already lost bet
      } else if (dScore > 21 || pScore > dScore) {
        const win = hand.bet * 2;
        totalWin += win;
        anyWin = true;
        await adjustWallet(win);
      } else if (dScore === pScore) {
        totalWin += hand.bet;
        anyPush = true;
        await adjustWallet(hand.bet);
      }
    }

    if (anyWin) {
      bj.message = `Won ${totalWin} WL total!`;
      if (els.lastWinLabel) { els.lastWinLabel.textContent = "Won: " + totalWin + " WL"; els.lastWinLabel.classList.remove("hidden"); els.lastWinLabel.classList.add("good"); }
    } else if (anyPush) {
      bj.message = "Push. Bets returned.";
      if (els.lastWinLabel) { els.lastWinLabel.textContent = "Push"; els.lastWinLabel.classList.remove("hidden"); els.lastWinLabel.classList.remove("good"); }
    } else {
      bj.message = "Dealer Wins All.";
      if (els.lastWinLabel) { els.lastWinLabel.textContent = "Dealer Wins"; els.lastWinLabel.classList.remove("hidden"); els.lastWinLabel.classList.remove("good"); }
    }
  }

  async function runSpin(mode) {
    if (state.spinBusy) return;
    if (!state.user) {
      return;
    }
    const machine = getSelectedMachine();
    if (!machine) {
      return;
    }

    if (machine.type === 'blackjack') {
      runBlackjackAction('deal');
      return;
    }
    if (machine.type === "tower") {
      await startTowerRun(machine);
      return;
    }
    if (machine.type === "mines") {
      await startMinesRun(machine);
      return;
    }

    const modeText = String(mode || "spin").trim().toLowerCase();
    const buyBonus = modeText === "buybonus" && (machine.type === "slots_v2" || machine.type === "le_bandit");
    const snoopBuyMatch = machine.type === "snoop_dogg_dollars" ? /^snoop_buy_([3-6])$/.exec(modeText) : null;
    const isSnoopHype = machine.type === "snoop_dogg_dollars" && modeText === "hype";
    const isSnoopBuy = Boolean(snoopBuyMatch);
    let wagerX = 1;
    let spinOptions = {};
    if (buyBonus) {
      wagerX = 10;
      spinOptions = { mode: "buybonus" };
    } else if (isSnoopHype) {
      wagerX = Math.max(1, Math.floor(Number(SNOOP_UI.hypeCostX) || 20));
      spinOptions = { mode: "hype" };
    } else if (isSnoopBuy) {
      const scatters = Math.max(3, Math.min(6, Math.floor(Number(snoopBuyMatch[1]) || 3)));
      wagerX = Math.max(1, Math.floor(Number(SNOOP_UI.buyCostByScatter[scatters]) || 1));
      spinOptions = { mode: "buybonus_" + scatters };
    }
    const isPremiumSpin = buyBonus || isSnoopHype || isSnoopBuy;
    const showBonusSpinText = buyBonus || isSnoopBuy;
    const bet = clampBetToMachine(machine, state.currentBetValue);

    const wager = bet * wagerX;
    if (state.webVaultLocks < wager) {
      return;
    }

    startSpinFx(machine, showBonusSpinText);

    const debit = await adjustWallet(-wager);
    if (!debit.ok) {
      stopSpinFx();
      resetEphemeralVisuals();
      clearBonusUiState();
      renderAll();
      return;
    }

    let applied = false;
    let resolved = null;
    let payout = 0;

    // Standalone / Casino Mode Handling
    if (machine.tileKey.startsWith("demo_")) {

      let rawResult = {};
      if (machine.type === "slots_v2") {
        if (typeof slotsModule.spin === "function") {
          rawResult = slotsModule.spin("slots_v2", bet, spinOptions) || {};
        } else {
          rawResult = simulateSixSixSix(machine, bet, buyBonus);
        }
      } else if (machine.type === "le_bandit") {
        rawResult = simulateLeBandit(machine, bet, buyBonus);
      } else if (typeof slotsModule.spin === "function") {
        rawResult = slotsModule.spin(machine.type, bet, spinOptions) || {};
      } else {
        rawResult = simulateStandaloneSpin(machine, bet);
      }

      const resultWager = Math.max(1, Math.floor(Number(rawResult.bet) || wager));
      const wanted = Math.max(0, Math.floor(Number(rawResult.payoutWanted) || 0));

      const lines = Array.isArray(rawResult.lineWins) ? rawResult.lineWins.map((s) => String(s || "").trim()).filter(Boolean) : [];
      const lineIds = Array.isArray(rawResult.lineIds) ? rawResult.lineIds.map((n) => Math.max(1, Math.floor(Number(n) || 0))).filter((n) => n > 0) : [];
      const reels = Array.isArray(rawResult.reels) ? rawResult.reels : [];

      if (!lineIds.length && String(rawResult.gameId || machine.type || "") === "slots" && wanted > 0) {
        lineIds.push(1);
        if (!lines.length && rawResult.summary) {
          lines.push(String(rawResult.summary));
        }
      }

      applied = true;
      payout = wanted;
      resolved = {
        type: machine.type,
        rows: rowsFromResult(reels, machine.type),
        lineWins: lines,
        lineIds: lineIds,
        outcome: String(rawResult.outcome || "lose").slice(0, 24),
        multiplier: Math.max(0, Number(rawResult.multiplier) || 0),
        summary: String(rawResult.summary || "").slice(0, 220),
        wager: resultWager,
        cellMeta: sanitizeCellMeta(rawResult && rawResult.cellMeta),
        bonusFrames: extractBonusFrames(machine.type, rawResult)
      };

      // -- Asynchronous Sequential Stop Animation --
      if (machine.type === "slots_v2" || machine.type === "le_bandit") {
        // Stop background fast randomizing
        if (state.spinTimer) window.clearInterval(state.spinTimer);
        state.ephemeral.stoppedCols = 0;
        state.ephemeral.rows = randomRowsForMachine(machine, 100); // stable baseline
        renderBoard();

        // Ensure spinning class is active
        if (els.boardWrap instanceof HTMLElement) els.boardWrap.classList.add("spinning");

        for (let col = 0; col < machine.reels; col++) {
          await sleep(col === 0 ? 500 : 350); // initial delay, then per reel

          state.ephemeral.stoppedCols++;

          // Overwrite the rendering row with finals for this col
          for (let r = 0; r < machine.rows; r++) {
            if (resolved.rows[r] && resolved.rows[r][col]) {
              state.ephemeral.rows[r][col] = resolved.rows[r][col];
            }
          }

          renderBoard();
          if (els.boardWrap instanceof HTMLElement) {
            const stoppedCells = els.boardWrap.querySelectorAll(".cell[data-col='" + col + "']");
            stoppedCells.forEach(c => c.classList.add("stopped"));
          }

          // Check for Wheel (BLU_6 or RED_6)
          let hasWheel = false;
          for (let r = 0; r < machine.rows; r++) {
            let s = state.ephemeral.rows[r][col];
            if (s === "BLU_6" || s === "RED_6") {
              hasWheel = true;
              if (els.boardWrap instanceof HTMLElement) {
                const wc = els.boardWrap.querySelector(".cell[data-col='" + col + "'][data-row='" + r + "']");
                if (wc) wc.classList.add("wheel-anim");
              }
            }
          }

          if (hasWheel) {
            // Wait for the simulated "Wheel spin" to finish before stopping next reel
            await sleep(1400);
            if (els.boardWrap instanceof HTMLElement) {
              const animCells = els.boardWrap.querySelectorAll(".wheel-anim");
              animCells.forEach(c => c.classList.remove("wheel-anim"));
            }
          }
        }
      } else {
        if (isPremiumSpin) await sleep(2000);
        else await sleep(800);
      }

      // Update local ephemeral stats
      machine.stats.plays++;
      machine.stats.totalBet += resultWager;
      machine.stats.totalPayout += wanted;
      machine.stats.lastOutcome = resolved.outcome;
      machine.stats.lastSlotsText = reels.join("|");
      machine.stats.lastSlotsLines = lines.join("|");
      machine.stats.lastSlotsLineIds = lineIds.join(",");

      if (payout > 0) {
        await adjustWallet(payout);
      }

      // If NOT a bonus, stop immediately. If bonus, stay busy!
      const bonusFrames = Array.isArray(resolved.bonusFrames) ? resolved.bonusFrames : [];
      const hasBonus = bonusFrames.length > 0;
      if (!hasBonus) {
        stopSpinFx();
      }

      state.ephemeral.rows = resolved.rows;
      state.ephemeral.lineWins = resolved.lineWins;
      state.ephemeral.lineIds = resolved.lineIds;
      state.ephemeral.markedCells = [];
      state.ephemeral.cellMeta = sanitizeCellMeta(resolved.cellMeta);
      state.ephemeral.effectCells = {};
      state.ephemeral.upgradeFlashes = {};
      renderBoard();

      // --- Bonus Playback Loop ---
      if (hasBonus) {
        const bonusSummary = await runBonusPlayback(machine, bonusFrames);
        if (els.lastWinLabel && bonusSummary.bonusTotal > 0) {
          els.lastWinLabel.textContent = "Bonus: " + Math.floor(bonusSummary.bonusTotal) + " WL";
          els.lastWinLabel.classList.add("good");
          els.lastWinLabel.classList.remove("hidden");
        }
        stopSpinFx();
      }

      if (els.lastWinLabel) {
        if (payout > 0) {
          els.lastWinLabel.textContent = "Won: " + payout + " WL";
          els.lastWinLabel.classList.remove("hidden");
          els.lastWinLabel.classList.add("good");
        } else {
          els.lastWinLabel.textContent = "No Win";
          els.lastWinLabel.classList.remove("hidden");
          els.lastWinLabel.classList.remove("good");
        }
      }
      if (resolved.outcome === "win" || resolved.outcome === "jackpot" || isPremiumSpin || payout > 0) {
        if (els.boardWrap instanceof HTMLElement) {
          els.boardWrap.classList.add("winfx");
          window.setTimeout(() => { if (els.boardWrap instanceof HTMLElement) els.boardWrap.classList.remove("winfx"); }, 800);
        }
        spawnParticles(payout >= bet * 50 ? "jackpot" : "win");
      }
      renderAll();
      return;
    } else {
      // Player-hosted machine handling (DB Transaction)
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

          let rawResult = {};
          if (current.type === "slots_v2") {
            if (typeof slotsModule.spin === "function") {
              rawResult = slotsModule.spin("slots_v2", bet, spinOptions) || {};
            } else {
              rawResult = simulateSixSixSix(current, bet, buyBonus);
            }
          } else if (current.type === "le_bandit") {
            rawResult = simulateLeBandit(current, bet, buyBonus);
          } else {
            rawResult = slotsModule.spin(current.type, bet, spinOptions) || {};
          }
          const resultWager = Math.max(1, Math.floor(Number(rawResult.bet) || wager));
          const wanted = Math.max(0, Math.floor(Number(rawResult.payoutWanted) || 0));
          if (resultWager !== wager) return currentRaw;
          if (!INFINITE_BANK && (current.earningsLocks + resultWager - wanted) < 0) return currentRaw;

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
            wager: resultWager,
            cellMeta: sanitizeCellMeta(rawResult && rawResult.cellMeta),
            bonusFrames: extractBonusFrames(current.type, rawResult)
          };

          const nextEarningsLocks = INFINITE_BANK
            ? toCount(current.earningsLocks)
            : Math.max(0, current.earningsLocks + resultWager - wanted);

          return {
            ...currentRaw,
            earningsLocks: nextEarningsLocks,
            updatedAt: nextAt,
            stats
          };
        });

        if (!txn || !txn.committed || !applied || !resolved) {
          await adjustWallet(wager);
          stopSpinFx();
          resetEphemeralVisuals();
          clearBonusUiState();
          renderAll();
          return;
        }

        if (payout > 0) {
          let credited = false;
          for (let i = 0; i < 3; i++) {
            const credit = await adjustWallet(payout);
            if (credit && credit.ok) { credited = true; break; }
          }
        }

        // Defer stop if bonus
        const bonusFrames = Array.isArray(resolved.bonusFrames) ? resolved.bonusFrames : [];
        const hasBonus = bonusFrames.length > 0;
        if (!hasBonus) {
          stopSpinFx();
        }

        state.ephemeral.rows = resolved.rows;
        state.ephemeral.lineWins = resolved.lineWins;
        state.ephemeral.lineIds = resolved.lineIds;
        state.ephemeral.markedCells = [];
        state.ephemeral.cellMeta = sanitizeCellMeta(resolved.cellMeta);
        state.ephemeral.effectCells = {};
        state.ephemeral.upgradeFlashes = {};
        renderBoard();

        // --- Bonus Playback Loop (Hosted Machine) ---
        if (hasBonus) {
          const bonusSummary = await runBonusPlayback(machine, bonusFrames);
          if (els.lastWinLabel && bonusSummary.bonusTotal > 0) {
            els.lastWinLabel.textContent = "Bonus: " + Math.floor(bonusSummary.bonusTotal) + " WL";
            els.lastWinLabel.classList.add("good");
            els.lastWinLabel.classList.remove("hidden");
          }
          stopSpinFx();
        }
        if (els.lastWinLabel) {
          if (payout > 0) {
            els.lastWinLabel.textContent = "Won: " + payout + " WL";
            els.lastWinLabel.classList.remove("hidden");
            els.lastWinLabel.classList.add("good");
          } else {
            els.lastWinLabel.textContent = "No Win";
            els.lastWinLabel.classList.remove("hidden");
            els.lastWinLabel.classList.remove("good");
          }
        }

        if (resolved.outcome === "win" || resolved.outcome === "jackpot" || isPremiumSpin || payout > 0) {
          if (els.boardWrap instanceof HTMLElement) {
            els.boardWrap.classList.add("winfx");
            window.setTimeout(() => { if (els.boardWrap instanceof HTMLElement) els.boardWrap.classList.remove("winfx"); }, 420);
          }
          spawnParticles(payout >= bet * 50 ? "jackpot" : "win");
        }
        renderAll();
      } catch (error) {
        await adjustWallet(wager);
        stopSpinFx();
        resetEphemeralVisuals();
        clearBonusUiState();
        renderAll();
        return;
      }
    }
  }

  function bindEvents() {
    if (els.openGameBtn instanceof HTMLButtonElement) els.openGameBtn.addEventListener("click", () => { window.location.href = "index.html"; });
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
    if (els.walletLabel instanceof HTMLElement) {
      els.walletLabel.addEventListener("click", (event) => {
        event.preventDefault();
        cycleLockDisplayUnit();
      });
    }
    if (els.userBalanceDisplay instanceof HTMLElement) {
      els.userBalanceDisplay.addEventListener("click", (event) => {
        event.preventDefault();
        cycleLockDisplayUnit();
      });
    }
    if (els.machineCategoryTabs instanceof HTMLElement) {
      els.machineCategoryTabs.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const btn = target.closest(".machine-cat-btn");
        if (!(btn instanceof HTMLElement)) return;
        const next = String(btn.dataset.category || "all");
        if (!next || state.machineCategory === next) return;
        state.machineCategory = next;
        renderMachineSelector();
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
        resetEphemeralVisuals();
        clearBonusUiState();
        renderAll();
        switchView("game");
      });
    }

    const betBtns = document.querySelectorAll(".bet-btn");
    betBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const machine = getSelectedMachine();
        if (!machine) return;

        // Prevent changing bet while spin is active or BJ is active
        if (state.spinBusy) return;
        if (machine.type === 'blackjack' && machine.stats.blackjackState && machine.stats.blackjackState.active) return;

        let target = e.target;
        if (!target.dataset.bet && target.parentElement.dataset.bet) target = target.parentElement;

        const val = parseInt(target.dataset.bet, 10);
        if (!isNaN(val)) {
          state.currentBetValue = val;
          betBtns.forEach(b => b.classList.remove("active"));
          target.classList.add("active");
          renderMachineStats();
        }
      });
    });

    if (els.spinBtn instanceof HTMLButtonElement) els.spinBtn.addEventListener("click", () => runSpin("spin"));
    if (els.buyBonusBtn instanceof HTMLButtonElement) els.buyBonusBtn.addEventListener("click", () => runSpin("buybonus"));
    if (els.snoopHypeBtn instanceof HTMLButtonElement) els.snoopHypeBtn.addEventListener("click", () => runSpin("hype"));
    if (els.snoopBuyBtn instanceof HTMLButtonElement) {
      els.snoopBuyBtn.addEventListener("click", () => {
        const scatters = els.snoopBuySelect instanceof HTMLSelectElement
          ? Math.max(3, Math.min(6, Math.floor(Number(els.snoopBuySelect.value) || 3)))
          : 3;
        runSpin("snoop_buy_" + scatters);
      });
    }
    if (els.towerDifficultySelect instanceof HTMLSelectElement) {
      els.towerDifficultySelect.addEventListener("change", () => {
        const machine = getSelectedMachine();
        if (!machine || machine.type !== "tower") return;
        setTowerDifficultyForMachine(machine, els.towerDifficultySelect.value);
        renderAll();
      });
    }
    if (els.towerCashoutBtn instanceof HTMLButtonElement) {
      els.towerCashoutBtn.addEventListener("click", async () => {
        const machine = getSelectedMachine();
        if (!machine || machine.type !== "tower") return;
        await cashOutTowerRun(machine, "cashout");
      });
    }
    if (els.minesCountSelect instanceof HTMLSelectElement) {
      els.minesCountSelect.addEventListener("change", () => {
        const machine = getSelectedMachine();
        if (!machine || machine.type !== "mines") return;
        setMinesCountForMachine(machine, els.minesCountSelect.value);
        renderAll();
      });
    }
    if (els.minesCashoutBtn instanceof HTMLButtonElement) {
      els.minesCashoutBtn.addEventListener("click", async () => {
        const machine = getSelectedMachine();
        if (!machine || machine.type !== "mines") return;
        await cashOutMinesRun(machine, "cashout");
      });
    }
    if (els.slotBoard instanceof HTMLElement) {
      els.slotBoard.addEventListener("click", async (event) => {
        const machine = getSelectedMachine();
        if (!machine || (machine.type !== "tower" && machine.type !== "mines")) return;
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        if (machine.type === "tower") {
          const cell = target.closest(".tower-cell");
          if (!(cell instanceof HTMLElement)) return;
          const floor = Math.floor(Number(cell.dataset.floor));
          const col = Math.floor(Number(cell.dataset.col));
          if (!Number.isFinite(floor) || !Number.isFinite(col)) return;
          await handleTowerPick(machine, floor, col);
          return;
        }
        const cell = target.closest(".mines-cell");
        if (!(cell instanceof HTMLElement)) return;
        const tileIndex = Math.floor(Number(cell.dataset.index));
        if (!Number.isFinite(tileIndex)) return;
        await handleMinesPick(machine, tileIndex);
      });
    }

    if (els.bjHitBtn) els.bjHitBtn.addEventListener("click", () => runBlackjackAction("hit"));
    if (els.bjStandBtn) els.bjStandBtn.addEventListener("click", () => runBlackjackAction("stand"));
    if (els.bjDoubleBtn) els.bjDoubleBtn.addEventListener("click", () => runBlackjackAction("double"));
    if (els.bjSplitBtn) els.bjSplitBtn.addEventListener("click", () => runBlackjackAction("split"));

    // Vault Events
    if (els.openVaultBtn) {
      els.openVaultBtn.addEventListener("click", () => {
        if (!state.user) return;
        if (els.vaultStatus) els.vaultStatus.textContent = "Ready.";
        els.vaultModal.classList.remove("hidden");
      });
    }
    if (els.closeVaultBtn) {
      els.closeVaultBtn.addEventListener("click", () => els.vaultModal.classList.add("hidden"));
    }
    if (els.vaultDepositBtn) {
      els.vaultDepositBtn.addEventListener("click", async () => {
        if (!els.vaultAmount) return;
        const val = Math.floor(Number(els.vaultAmount.value));
        if (val <= 0 || isNaN(val)) {
          if (els.vaultStatus) els.vaultStatus.textContent = "Invalid amount.";
          return;
        }
        els.vaultDepositBtn.disabled = true;
        els.vaultWithdrawBtn.disabled = true;
        if (els.vaultStatus) els.vaultStatus.textContent = "Depositing...";
        const tx = await depositToVault(val);
        els.vaultDepositBtn.disabled = false;
        els.vaultWithdrawBtn.disabled = false;
        if (els.vaultStatus) {
          if (tx.ok) {
            els.vaultStatus.textContent = `Success! Deposited ${val} WL.`;
            els.vaultAmount.value = "";
          } else {
            els.vaultStatus.textContent = "Failed to deposit: " + tx.reason;
          }
        }
      });
    }
    if (els.vaultWithdrawBtn) {
      els.vaultWithdrawBtn.addEventListener("click", async () => {
        if (!els.vaultAmount) return;
        const val = Math.floor(Number(els.vaultAmount.value));
        if (val <= 0 || isNaN(val)) {
          if (els.vaultStatus) els.vaultStatus.textContent = "Invalid amount.";
          return;
        }
        els.vaultDepositBtn.disabled = true;
        els.vaultWithdrawBtn.disabled = true;
        if (els.vaultStatus) els.vaultStatus.textContent = "Withdrawing...";
        const tx = await withdrawFromVault(val);
        els.vaultDepositBtn.disabled = false;
        els.vaultWithdrawBtn.disabled = false;
        if (els.vaultStatus) {
          if (tx.ok) {
            els.vaultStatus.textContent = `Success! Withdrew ${val} WL.`;
            els.vaultAmount.value = "";
          } else {
            els.vaultStatus.textContent = "Failed to withdraw: " + tx.reason;
          }
        }
      });
    }

    if (els.backToLobbyBtn instanceof HTMLButtonElement) {
      els.backToLobbyBtn.addEventListener("click", () => switchView("lobby"));
    }

    window.addEventListener("beforeunload", () => { clearSessionRefs(); });
  }

  function init() {
    populateMinesCountSelect();
    bindEvents();

    const saved = loadSavedCredentials();
    if (els.authUsername instanceof HTMLInputElement && saved.username) els.authUsername.value = String(saved.username || "").slice(0, 20);
    if (els.authPassword instanceof HTMLInputElement && saved.password) els.authPassword.value = String(saved.password || "").slice(0, 64);

    // Populate with casino games instead of loading from world
    state.machines = GAME_IDS.map(type => {
      const def = MACHINE_DEFS[type] || MACHINE_DEFS.slots;
      return {
        ...STANDALONE_MACHINE,
        tileKey: "demo_" + type,
        type: type,
        typeName: def.name,
        reels: def.reels,
        rows: def.rows,
        maxPayoutMultiplier: def.maxPayoutMultiplier,
        stats: { ...STANDALONE_MACHINE.stats }
      };
    });
    state.selectedMachineKey = state.machines[0].tileKey;

    setStatus(els.authStatus, "Login with your game account.");

    // If we have saved credentials, we might want to auto-login or just show login screen pre-filled.
    // For now, we show login screen.
    switchView("login");
    renderAll();
  }

  init();
})();
