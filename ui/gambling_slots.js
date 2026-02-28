window.GTModules = window.GTModules || {};

(function initGamblingSlotsSite() {
  "use strict";

  const SAVED_AUTH_KEY = "growtopia_saved_auth_v1";
  const GAME_IDS = ["blackjack", "slots_v2", "le_bandit"];

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
    le_bandit: "Le Bandit"
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
    CLOVR: "Clover", POT: "Pot of Gold", LOCK: "Locked"
  };

  const SYMBOL_ICONS = {
    CHERRY: "\u{1F352}", LEMON: "\u{1F34B}", BAR: "\u25A0", BELL: "\u{1F514}", SEVEN: "7", "7": "7",
    GEM: "\u{1F48E}", PICK: "\u26CF", MINER: "\u{1F477}", GOLD: "\u{1FA99}", DYN: "\u{1F4A3}", WILD: "\u2728", SCAT: "\u{1F31F}", BONUS: "\u{1F381}",
    RUBY: "\u2666", EMER: "\u{1F49A}", CLUB: "\u2663", RING: "\u{1F48D}", SKULL: "\u{1F480}", REAPR: "\u2620", BLOOD: "\u{1FA78}",
    LEAF: "\u{1F343}", STON: "\u{1FAA8}", MASK: "\u{1F3AD}", IDOL: "\u{1F5FF}", ORAC: "\u{1F52E}", FRGT: "\u{1F56F}",
    COIN: "\u{1FA99}", ORE: "\u26D3", CART: "\u{1F6D2}", RELC: "\u{1F4FF}", "?": "\u2754",
    BONE: "\u{1F9B4}", PENT: "\u2721", BLU_6: "\u{1F535}6", RED_6: "\u{1F534}6",
    TRAP: "\u{1F4A9}", CHEESE: "\u{1F9C0}", BEER: "\u{1F37A}", BAG: "\u{1F4B0}", HAT: "\u{1F3A9}", WINT: "\u{1F46E}", RAIN: "\u{1F308}",
    CLOVR: "\u2618", POT: "\u{1F4B0}", LOCK: "\u{1F512}"
  };

  const SYMBOL_CLASSES = { WILD: "wild", SCAT: "scatter", BONUS: "bonus", DYN: "bonus", BLU_6: "sixblu", RED_6: "sixred", WINT: "wanted", RAIN: "rain", CLOVR: "rain", POT: "bonus", LOCK: "locked" };
  const SYMBOL_POOL = {
    blackjack: ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"],
    slots: ["CHERRY", "LEMON", "BAR", "BELL", "SEVEN"],
    slots_v2: ["SKULL", "BONE", "REAPR", "BLOOD", "PENT", "WILD"],
    le_bandit: ["TRAP", "CHEESE", "BEER", "BAG", "HAT", "WINT", "WILD", "RAIN", "COIN"],
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
    ephemeral: { rows: null, lineIds: [], lineWins: [] }
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
    machineList: document.getElementById("machineList"),
    currentBetDisplay: document.getElementById("currentBetDisplay"),
    spinBtn: document.getElementById("spinBtn"),
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
      le_bandit: { name: "Le Bandit", minBet: 1, maxBet: 30000, maxPayoutMultiplier: 10000, reels: 6, rows: 5 }
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
    TRAP: { 5: 0.3, 6: 0.5, 7: 0.8, 8: 1.2, 9: 1.8, 10: 3, 12: 5, 15: 10 },
    CHEESE: { 5: 0.4, 6: 0.7, 7: 1, 8: 1.6, 9: 2.5, 10: 4, 12: 7, 15: 14 },
    BEER: { 5: 0.5, 6: 0.9, 7: 1.4, 8: 2.2, 9: 3.5, 10: 6, 12: 10, 15: 20 },
    BAG: { 5: 0.8, 6: 1.4, 7: 2.2, 8: 3.5, 9: 5, 10: 9, 12: 16, 15: 30 },
    HAT: { 5: 1.5, 6: 2.5, 7: 4, 8: 6.5, 9: 10, 10: 18, 12: 30, 15: 60 },
    WINT: { 5: 3, 6: 5, 7: 8, 8: 14, 9: 22, 10: 40, 12: 70, 15: 150 }
  };

  function simulateLeBandit(machine, bet, buyBonus) {
    const COLS = 6;
    const ROWS = 5;
    const pool = [
      ...Array(14).fill("TRAP"),
      ...Array(12).fill("CHEESE"),
      ...Array(10).fill("BEER"),
      ...Array(8).fill("BAG"),
      ...Array(5).fill("HAT"),
      ...Array(3).fill("WINT"),
      ...Array(2).fill("WILD")
    ];

    function pickSym() { return pool[Math.floor(Math.random() * pool.length)]; }

    function generateGrid(rainChance) {
      const grid = [];
      for (let r = 0; r < ROWS; r++) {
        grid[r] = [];
        for (let c = 0; c < COLS; c++) {
          let sym = pickSym();
          if (Math.random() < rainChance) sym = "RAIN";
          grid[r][c] = sym;
        }
      }
      return grid;
    }

    function getClusterPay(sym, count) {
      const table = LB_CLUSTER_PAY[sym];
      if (!table) return 0;
      const keys = Object.keys(table).map(Number).sort((a, b) => a - b);
      let best = 0;
      for (let i = 0; i < keys.length; i++) {
        if (count >= keys[i]) best = table[keys[i]];
      }
      return best;
    }

    function findClusters(grid) {
      const visited = new Set();
      const clusters = [];
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const sym = grid[r][c];
          if (sym === "RAIN" || sym === "WILD" || visited.has(r + "_" + c)) continue;
          if (!LB_CLUSTER_PAY[sym]) continue;
          const stack = [[r, c]];
          const cells = [];
          while (stack.length) {
            const [rr, cc] = stack.pop();
            const key = rr + "_" + cc;
            if (visited.has(key)) continue;
            const s = grid[rr][cc];
            if (s !== sym && s !== "WILD") continue;
            visited.add(key);
            cells.push({ r: rr, c: cc });
            if (rr > 0) stack.push([rr - 1, cc]);
            if (rr < ROWS - 1) stack.push([rr + 1, cc]);
            if (cc > 0) stack.push([rr, cc - 1]);
            if (cc < COLS - 1) stack.push([rr, cc + 1]);
          }
          if (cells.length >= 5) {
            clusters.push({ sym, cells });
          }
        }
      }
      return clusters;
    }

    function countRain(grid) {
      let count = 0;
      for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
        if (grid[r][c] === "RAIN") count++;
      }
      return count;
    }

    // ============ BASE SPIN (no locks, normal cluster pay) ============
    const baseGrid = generateGrid(buyBonus ? 0.06 : 0.018);
    const baseClusters = findClusters(baseGrid);
    let basePayout = 0;
    const lines = [];

    for (let i = 0; i < baseClusters.length; i++) {
      const cl = baseClusters[i];
      const mult = getClusterPay(cl.sym, cl.cells.length);
      if (mult > 0) {
        basePayout += bet * mult;
        lines.push(cl.cells.length + "x " + (SYMBOL_LABELS[cl.sym] || cl.sym) + " (" + mult + "x)");
      }
    }

    const baseRainCount = countRain(baseGrid);
    const triggerBonus = baseRainCount >= 3 || buyBonus;

    const reels = [];
    for (let r = 0; r < ROWS; r++) {
      reels.push(baseGrid[r].join(","));
    }

    // ============ BONUS: 10 FREE SPINS ============
    let bonusPayout = 0;
    let freeSpinsPlayed = 0;
    const FREE_SPINS = 10;

    // "marked" tracks cells where winning clusters landed across all free spins
    const marked = new Set();

    if (triggerBonus) {
      lines.push("🌈 BONUS! " + FREE_SPINS + " Free Spins!");

      for (let spin = 0; spin < FREE_SPINS; spin++) {
        freeSpinsPlayed++;
        const fsGrid = generateGrid(0.08); // Higher rainbow chance in bonus
        const fsClusters = findClusters(fsGrid);

        // 1) Evaluate cluster wins & mark their cells
        let spinClusterWin = 0;
        for (let i = 0; i < fsClusters.length; i++) {
          const cl = fsClusters[i];
          const mult = getClusterPay(cl.sym, cl.cells.length);
          if (mult > 0) {
            spinClusterWin += bet * mult;
            // Mark all cells in the winning cluster
            for (let j = 0; j < cl.cells.length; j++) {
              marked.add(cl.cells[j].r + "_" + cl.cells[j].c);
            }
          }
        }
        bonusPayout += spinClusterWin;

        if (spinClusterWin > 0) {
          lines.push("FS" + freeSpinsPlayed + " Cluster " + (spinClusterWin / bet).toFixed(1) + "x (" + marked.size + " marked)");
        }

        // 2) Check for Rainbow on this spin
        const fsRainCount = countRain(fsGrid);
        if (fsRainCount > 0 && marked.size > 0) {
          // Rainbow fills ALL marked cells with coins, clovers, or pots
          const fillBoard = {};
          const markedArr = Array.from(marked);

          // Fill each marked cell
          for (let m = 0; m < markedArr.length; m++) {
            const roll = Math.random();
            if (roll < 0.60) {
              // COIN: value 1-10x bet
              const vals = [1, 1, 2, 2, 3, 5, 8, 10, 15, 25];
              fillBoard[markedArr[m]] = { type: "COIN", value: vals[Math.floor(Math.random() * vals.length)] };
            } else if (roll < 0.88) {
              // CLOVER: multiplier for adjacent coins
              const mults = [2, 2, 3, 3, 4, 5, 10];
              fillBoard[markedArr[m]] = { type: "CLOVR", value: mults[Math.floor(Math.random() * mults.length)] };
            } else {
              // POT: collects all coins and respins them
              fillBoard[markedArr[m]] = { type: "POT", value: 0 };
            }
          }

          // Apply Clover multipliers to adjacent coins
          const keys = Object.keys(fillBoard);
          for (let k = 0; k < keys.length; k++) {
            const cell = fillBoard[keys[k]];
            if (cell.type !== "CLOVR") continue;
            const [cr, cc] = keys[k].split("_").map(Number);
            const adj = [[cr - 1, cc], [cr + 1, cc], [cr, cc - 1], [cr, cc + 1]];
            for (let a = 0; a < adj.length; a++) {
              const adjKey = adj[a][0] + "_" + adj[a][1];
              if (fillBoard[adjKey] && fillBoard[adjKey].type === "COIN") {
                fillBoard[adjKey].value *= cell.value;
              }
            }
          }

          // Check for pots: collect all coin values and respin
          let hasPot = false;
          for (let k = 0; k < keys.length; k++) {
            if (fillBoard[keys[k]].type === "POT") { hasPot = true; break; }
          }

          let totalCoinValue = 0;
          for (let k = 0; k < keys.length; k++) {
            if (fillBoard[keys[k]].type === "COIN") {
              totalCoinValue += fillBoard[keys[k]].value;
            }
          }

          if (hasPot && totalCoinValue > 0) {
            // Pot collects all coins, then respins (gives new random values to all coin cells)
            let respinValue = 0;
            for (let k = 0; k < keys.length; k++) {
              if (fillBoard[keys[k]].type === "COIN") {
                const reVals = [1, 2, 3, 5, 8, 10, 15, 25];
                const newVal = reVals[Math.floor(Math.random() * reVals.length)];
                respinValue += newVal;
              }
            }
            totalCoinValue += respinValue;
            lines.push("FS" + freeSpinsPlayed + " 🌈 Rain! " + markedArr.length + " fills | 💰 POT collects + respin! (" + totalCoinValue + "x)");
          } else {
            lines.push("FS" + freeSpinsPlayed + " 🌈 Rain! " + markedArr.length + " fills (" + totalCoinValue + "x)");
          }

          bonusPayout += bet * totalCoinValue;

          // Clear marked after rainbow fill
          marked.clear();
        } else if (fsRainCount > 0 && marked.size === 0) {
          lines.push("FS" + freeSpinsPlayed + " 🌈 (no marked area to fill)");
        }
      }
    }

    const totalPayout = Math.floor(basePayout + bonusPayout);
    const isJackpot = totalPayout >= bet * 50;

    let summary = "";
    if (triggerBonus) {
      summary = "Bonus " + FREE_SPINS + " FS | Total " + (totalPayout / Math.max(1, bet)).toFixed(1) + "x";
    } else if (basePayout > 0) {
      summary = "Cluster " + (basePayout / bet).toFixed(1) + "x";
    }

    return {
      gameId: "le_bandit",
      reels: reels,
      payoutWanted: totalPayout,
      outcome: totalPayout > 0 ? (isJackpot ? "jackpot" : "win") : "lose",
      lineWins: lines,
      lineIds: [],
      bet: buyBonus ? bet * 10 : bet,
      summary: summary
    };
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
      els.walletLabel.textContent = "Vault: " + state.webVaultLocks + " WL | Game: " + state.walletLocks + " WL (" + state.walletBreakdownText + ")";
    }
    if (els.userBalanceDisplay instanceof HTMLElement) {
      els.userBalanceDisplay.textContent = "Balance: " + state.webVaultLocks + " WL";
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

  function renderBoard(animCtx) {
    if (!(els.slotBoard instanceof HTMLElement) || !(els.slotOverlay instanceof SVGElement) || !(els.lineList instanceof HTMLElement)) return;
    const machine = getSelectedMachine();

    // Clear overlay
    els.slotOverlay.innerHTML = "";

    if (machine.type === 'blackjack') {
      if (els.boardWrap instanceof HTMLElement) els.boardWrap.classList.add('blackjack-mode');
      renderBlackjackBoard(machine, animCtx);
      els.lineList.innerHTML = ""; // No paylines for BJ
      return;
    } else {
      if (els.boardWrap instanceof HTMLElement) els.boardWrap.classList.remove('blackjack-mode');
    }

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

  // Renders the "Tablet" style grid of games in the lobby
  function renderMachineSelector() {
    if (!(els.machineList instanceof HTMLElement)) return;
    const rows = state.machines.slice().sort((a, b) => a.ty - b.ty || a.tx - b.tx);
    if (!rows.length) {
      els.machineList.innerHTML = "<div class=\"status\">No games available.</div>";
      return;
    }

    els.machineList.innerHTML = rows.map((row) => {
      // const active = row.tileKey === state.selectedMachineKey ? " active" : "";
      // const owner = row.ownerName ? ("@" + row.ownerName) : row.ownerAccountId;
      return (
        "<div class=\"machine-item\" data-machine-key=\"" + escapeHtml(row.tileKey) + "\">" +
        "<div class=\"name\">" + escapeHtml(row.typeName) + "</div>" +
        "<div class=\"info\">Max Bet: " + row.maxBet + " WL</div>" +
        "<div class=\"info\">Plays: " + row.stats.plays + "</div>" +
        "</div>"
      );
    }).join("");
  }

  function renderMachineStats() {
    const machine = getSelectedMachine();
    if (!machine) {
      if (els.statBank instanceof HTMLElement) els.statBank.textContent = "Bank: 0 WL";
      if (els.statMaxBet instanceof HTMLElement) els.statMaxBet.textContent = "Max Bet: 0 WL";
      if (els.statPlays instanceof HTMLElement) els.statPlays.textContent = "Plays: 0";
      if (els.statPayout instanceof HTMLElement) els.statPayout.textContent = "Total Payout: 0 WL";
      if (els.stage instanceof HTMLElement) els.stage.classList.remove("theme-slots", "theme-slots_v2", "theme-slots_v3", "theme-slots_v4", "theme-slots_v6", "theme-le_bandit");
      if (els.spinBtn instanceof HTMLButtonElement) els.spinBtn.disabled = true;
      if (els.buyBonusBtn instanceof HTMLButtonElement) {
        els.buyBonusBtn.classList.add("hidden");
        els.buyBonusBtn.disabled = true;
      }
      return;
    }

    if (els.statBank instanceof HTMLElement) {
      const bankText = INFINITE_BANK ? "Infinite" : (machine.earningsLocks + " WL");
      els.statBank.textContent = "Bank: " + bankText;
    }
    if (els.statMaxBet instanceof HTMLElement) els.statMaxBet.textContent = "Max Bet: " + machine.maxBet + "";
    if (els.statPlays instanceof HTMLElement) els.statPlays.textContent = "Plays: " + machine.stats.plays;
    if (els.statPayout instanceof HTMLElement) els.statPayout.textContent = "Total Payout: " + machine.stats.totalPayout + " WL";

    if (els.stage instanceof HTMLElement) {
      const currentType = machine.type;
      els.stage.classList.remove("theme-slots", "theme-slots_v2", "theme-slots_v3", "theme-slots_v4", "theme-slots_v6", "theme-le_bandit");
      if (typeof currentType === "string") {
        if (currentType === "le_bandit") els.stage.classList.add("theme-le_bandit");
        else if (currentType.startsWith("slots")) els.stage.classList.add("theme-" + currentType);
      }
    }

    // Toggle controls based on game type
    const isBlackjack = machine.type === 'blackjack';
    const bjState = machine.stats.blackjackState;
    const activeHand = (bjState && bjState.hands && bjState.hands[bjState.activeHandIndex]) || null;

    const bet = clampBetToMachine(machine, state.currentBetValue);
    let displayBet = bet;

    if (isBlackjack && bjState && bjState.active && Array.isArray(bjState.hands)) {
      displayBet = bjState.hands.reduce((sum, h) => sum + (Number(h.bet) || 0), 0);
    }

    if (els.currentBetDisplay instanceof HTMLElement) {
      els.currentBetDisplay.textContent = displayBet + " WL";
    }

    const maxStake = Math.max(machine.minBet, getSpinMaxBet(machine));
    const busyByOther = Boolean(machine.inUseAccountId && machine.inUseAccountId !== (state.user && state.user.accountId));
    const canBet = !state.spinBusy && !busyByOther && state.webVaultLocks >= displayBet;

    // Blackjack specific buttons
    if (els.bjHitBtn) els.bjHitBtn.classList.toggle("hidden", !isBlackjack);
    if (els.bjStandBtn) els.bjStandBtn.classList.toggle("hidden", !isBlackjack);
    if (els.bjDoubleBtn) els.bjDoubleBtn.classList.toggle("hidden", !isBlackjack);
    if (els.bjSplitBtn) els.bjSplitBtn.classList.toggle("hidden", !isBlackjack);

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
        els.buyBonusBtn.textContent = "Buy Bonus " + cost + " WL";
        els.buyBonusBtn.disabled = !canBet || state.webVaultLocks < cost;
      }
    }
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
    state.ephemeral.rows = null;
    state.ephemeral.lineIds = [];
    state.ephemeral.lineWins = [];
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

    const buyBonus = mode === "buybonus" && (machine.type === "slots_v2" || machine.type === "le_bandit");
    const buyX = buyBonus ? 10 : 1;
    const bet = clampBetToMachine(machine, state.currentBetValue);

    const wager = bet * buyX;
    if (state.webVaultLocks < wager) {
      return;
    }

    startSpinFx(machine, buyBonus);

    const debit = await adjustWallet(-wager);
    if (!debit.ok) {
      stopSpinFx();
      state.ephemeral.rows = null;
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
        rawResult = simulateSixSixSix(machine, bet, buyBonus);
      } else if (machine.type === "le_bandit") {
        rawResult = simulateLeBandit(machine, bet, buyBonus);
      } else if (typeof slotsModule.spin === "function") {
        rawResult = slotsModule.spin(machine.type, bet, buyBonus ? { mode: "buybonus" } : {}) || {};
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
        wager: resultWager
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
        if (buyBonus) await sleep(2000);
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

      stopSpinFx();
      state.ephemeral.rows = resolved.rows;
      state.ephemeral.lineWins = resolved.lineWins;
      state.ephemeral.lineIds = resolved.lineIds;
      renderBoard();
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
      if (resolved.outcome === "win" || resolved.outcome === "jackpot" || buyBonus || payout > 0) {
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
            rawResult = simulateSixSixSix(current, bet, buyBonus);
          } else if (current.type === "le_bandit") {
            rawResult = simulateLeBandit(current, bet, buyBonus);
          } else {
            rawResult = slotsModule.spin(current.type, bet, buyBonus ? { mode: "buybonus" } : {}) || {};
          }
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

        stopSpinFx();
        state.ephemeral.rows = resolved.rows;
        state.ephemeral.lineWins = resolved.lineWins;
        state.ephemeral.lineIds = resolved.lineIds;
        renderBoard();
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

        if (resolved.outcome === "win" || resolved.outcome === "jackpot") {
          if (els.boardWrap instanceof HTMLElement) {
            els.boardWrap.classList.add("winfx");
            window.setTimeout(() => { if (els.boardWrap instanceof HTMLElement) els.boardWrap.classList.remove("winfx"); }, 420);
          }
          spawnParticles(resolved.outcome);
        }
        renderAll();
      } catch (error) {
        await adjustWallet(wager);
        stopSpinFx();
        state.ephemeral.rows = null;
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
