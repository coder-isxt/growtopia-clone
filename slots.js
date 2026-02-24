window.GTModules = window.GTModules || {};

(function initSlotsModule() {
  const GAME_DEFS = {
    slots: {
      id: "slots",
      name: "Slots",
      minBet: 1,
      maxBet: 30000,
      maxPayoutMultiplier: 10,
      rtp: 0.95,
      volatility: "medium",
      layout: { reels: 3, rows: 1 }
    },
    slots_v2: {
      id: "slots_v2",
      name: "Slots v2",
      minBet: 1,
      maxBet: 30000,
      maxPayoutMultiplier: 50,
      rtp: 0.96,
      volatility: "medium-high",
      layout: { reels: 5, rows: 3 }
    }
  };

  const SYMBOLS_V1 = [
    { id: "cherry", icon: "CHERRY", weight: 30 },
    { id: "lemon", icon: "LEMON", weight: 28 },
    { id: "bar", icon: "BAR", weight: 20 },
    { id: "bell", icon: "BELL", weight: 14 },
    { id: "seven", icon: "SEVEN", weight: 8 }
  ];

  const SYMBOLS_V2 = [
    { id: "gem", icon: "GEM", weight: 25 },
    { id: "pickaxe", icon: "PICK", weight: 20 },
    { id: "miner", icon: "MINER", weight: 18 },
    { id: "gold", icon: "GOLD", weight: 12 },
    { id: "dynamite", icon: "DYN", weight: 10 },
    { id: "wild", icon: "WILD", weight: 9 },
    { id: "scatter", icon: "SCAT", weight: 4 },
    { id: "bonus", icon: "BONUS", weight: 2 }
  ];

  const V2_ROWS = Math.max(1, Math.floor(Number(GAME_DEFS.slots_v2.layout.rows) || 3));
  const V2_REELS = Math.max(1, Math.floor(Number(GAME_DEFS.slots_v2.layout.reels) || 5));

  const PAYLINES_V2 = [
    [1, 1, 1, 1, 1], // middle
    [0, 0, 0, 0, 0], // top
    [2, 2, 2, 2, 2], // bottom
    [0, 1, 2, 1, 0], // V
    [2, 1, 0, 1, 2], // inverted V
    [0, 0, 1, 2, 2], // zig-zag
    [2, 2, 1, 0, 0], // zig-zag
    [1, 0, 1, 2, 1], // wave
    [1, 2, 1, 0, 1], // wave
    [0, 1, 1, 1, 2]  // slope
  ];

  const PAYTABLE_V2 = {
    gem: { 3: 3, 4: 6, 5: 10 },
    pickaxe: { 3: 4, 4: 8, 5: 14 },
    miner: { 3: 5, 4: 10, 5: 18 },
    gold: { 3: 6, 4: 12, 5: 22 },
    dynamite: { 3: 8, 4: 16, 5: 28 }
  };

  const BONUS_V2 = {
    respins: 3,
    addChance: 0.38,
    addChanceDecay: 0.015,
    maxSpins: 64,
    coinValues: [5, 10, 15, 20, 25, 40, 50],
    coinWeights: [40, 26, 16, 10, 5, 2, 1],
    specialWeights: {
      coin: 82,
      multiplier: 7,
      bomb: 6,
      jackpot: 2,
      collect: 3
    },
    multiplierValues: [2, 3],
    multiplierWeights: [80, 20],
    bombValues: [8, 12, 16, 20, 25, 30],
    bombWeights: [26, 22, 18, 14, 12, 8],
    jackpotValues: [80, 120, 180],
    jackpotWeights: [65, 25, 10],
    fullScreenBonus: 200
  };

  function cloneDef(row) {
    const def = row || GAME_DEFS.slots;
    return {
      id: String(def.id || "slots"),
      name: String(def.name || "Slots"),
      minBet: Math.max(1, Math.floor(Number(def.minBet) || 1)),
      maxBet: Math.max(1, Math.floor(Number(def.maxBet) || 30000)),
      maxPayoutMultiplier: Math.max(1, Math.floor(Number(def.maxPayoutMultiplier) || 10)),
      rtp: Number(def.rtp) || 0.95,
      volatility: String(def.volatility || "medium"),
      layout: {
        reels: Math.max(1, Math.floor(Number(def.layout && def.layout.reels) || 3)),
        rows: Math.max(1, Math.floor(Number(def.layout && def.layout.rows) || 1))
      }
    };
  }

  function getDefinitions() {
    const out = {};
    const ids = Object.keys(GAME_DEFS);
    for (let i = 0; i < ids.length; i++) {
      out[ids[i]] = cloneDef(GAME_DEFS[ids[i]]);
    }
    return out;
  }

  function pickWeighted(symbols) {
    const safe = Array.isArray(symbols) ? symbols : [];
    let total = 0;
    for (let i = 0; i < safe.length; i++) total += Math.max(1, Math.floor(Number(safe[i].weight) || 1));
    let roll = Math.floor(Math.random() * Math.max(1, total));
    for (let i = 0; i < safe.length; i++) {
      roll -= Math.max(1, Math.floor(Number(safe[i].weight) || 1));
      if (roll < 0) return safe[i];
    }
    return safe[0] || { id: "none", icon: "?" };
  }

  function spinV1(bet) {
    const safeBet = Math.max(1, Math.floor(Number(bet) || 1));
    const reels = [pickWeighted(SYMBOLS_V1), pickWeighted(SYMBOLS_V1), pickWeighted(SYMBOLS_V1)];
    const counts = {};
    for (let i = 0; i < reels.length; i++) {
      const id = String(reels[i] && reels[i].id || "");
      counts[id] = (counts[id] || 0) + 1;
    }
    const ids = Object.keys(counts);
    let multiplier = 0;
    let outcome = "lose";
    let summary = "No match";
    for (let i = 0; i < ids.length; i++) {
      if (counts[ids[i]] === 3) {
        if (ids[i] === "seven") {
          multiplier = 10; outcome = "jackpot"; summary = "Triple seven";
        } else if (ids[i] === "bar") {
          multiplier = 6; outcome = "win"; summary = "Triple bar";
        } else {
          multiplier = 4; outcome = "win"; summary = "Triple match";
        }
        break;
      }
    }
    if (multiplier <= 0) {
      if ((counts.seven || 0) === 2) {
        multiplier = 3; outcome = "win"; summary = "Double seven";
      } else if (ids.some((id) => counts[id] === 2)) {
        multiplier = 2; outcome = "win"; summary = "Double match";
      }
    }
    return {
      gameId: "slots",
      bet: safeBet,
      reels: reels.map((r) => String(r && r.icon || "?")),
      multiplier,
      payoutWanted: Math.max(0, Math.floor(safeBet * multiplier)),
      outcome,
      summary
    };
  }

  function buildGridV2() {
    const rows = V2_ROWS;
    const cols = V2_REELS;
    const grid = [];
    for (let r = 0; r < rows; r++) grid[r] = [];
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        grid[r][c] = pickWeighted(SYMBOLS_V2);
      }
    }
    return grid;
  }

  function normalizePattern(pattern, cols) {
    const out = [];
    const safeCols = Math.max(1, Math.floor(Number(cols) || V2_REELS));
    const arr = Array.isArray(pattern) ? pattern : [];
    const fallback = Math.max(0, Math.min(V2_ROWS - 1, Math.floor(Number(arr[arr.length - 1]) || 0)));
    for (let c = 0; c < safeCols; c++) {
      const row = Math.max(0, Math.min(V2_ROWS - 1, Math.floor(Number(arr[c]) || fallback)));
      out.push(row);
    }
    return out;
  }

  function gridToTextRows(grid) {
    const safe = Array.isArray(grid) ? grid : [];
    const out = [];
    for (let r = 0; r < safe.length; r++) {
      const row = Array.isArray(safe[r]) ? safe[r] : [];
      out.push(row.map((cell) => String(cell && cell.icon || "?")).join(","));
    }
    return out;
  }

  function getLineSymbols(grid, pattern) {
    const out = [];
    for (let c = 0; c < pattern.length; c++) {
      const r = Math.max(0, Math.min(2, Math.floor(Number(pattern[c]) || 0)));
      const cell = (grid[r] && grid[r][c]) ? grid[r][c] : { id: "none", icon: "?" };
      out.push(cell);
    }
    return out;
  }

  function resolveLineBaseSymbol(line) {
    for (let i = 0; i < line.length; i++) {
      const id = String(line[i] && line[i].id || "");
      if (id && id !== "wild" && id !== "scatter" && id !== "bonus") return id;
    }
    return "";
  }

  function evaluatePayline(line, betPerLine) {
    const base = resolveLineBaseSymbol(line);
    if (!base) return { multiplier: 0, matchCount: 0, symbol: "", text: "" };
    let count = 0;
    for (let i = 0; i < line.length; i++) {
      const id = String(line[i] && line[i].id || "");
      if (id === base || id === "wild") count += 1;
      else break;
    }
    if (count < 3) return { multiplier: 0, matchCount: count, symbol: base, text: "" };
    const row = PAYTABLE_V2[base] || {};
    const lineMult = Math.max(0, Number(row[count]) || 0);
    return {
      multiplier: lineMult,
      matchCount: count,
      symbol: base,
      text: base.toUpperCase() + " x" + count + " (" + lineMult + "x line)"
    };
  }

  function runMiningBonus(safeBet) {
    const safe = BONUS_V2;
    const totalSlots = Math.max(1, V2_ROWS * V2_REELS);
    const trigger = Math.max(3, Math.min(totalSlots, Math.floor(Number(safeBet && safeBet.triggerCount) || 3)));
    const bet = Math.max(1, Math.floor(Number(safeBet && safeBet.bet) || 1));
    const locked = [];

    function pickFrom(values, weights) {
      const arr = Array.isArray(values) ? values : [];
      const w = Array.isArray(weights) ? weights : [];
      if (!arr.length) return 0;
      let total = 0;
      for (let i = 0; i < arr.length; i++) total += Math.max(1, Math.floor(Number(w[i]) || 1));
      let roll = Math.floor(Math.random() * Math.max(1, total));
      for (let i = 0; i < arr.length; i++) {
        roll -= Math.max(1, Math.floor(Number(w[i]) || 1));
        if (roll < 0) return arr[i];
      }
      return arr[0];
    }

    function pickBonusSymbol() {
      const bag = [
        { id: "coin", weight: safe.specialWeights.coin },
        { id: "multiplier", weight: safe.specialWeights.multiplier },
        { id: "bomb", weight: safe.specialWeights.bomb },
        { id: "jackpot", weight: safe.specialWeights.jackpot },
        { id: "collect", weight: safe.specialWeights.collect }
      ];
      const row = pickWeighted(bag);
      const id = String(row && row.id || "coin");
      if (id === "coin") {
        return { id: "coin", mult: Math.max(1, Number(pickFrom(safe.coinValues, safe.coinWeights)) || 5) };
      }
      if (id === "multiplier") {
        return { id: "multiplier", mult: Math.max(2, Number(pickFrom(safe.multiplierValues, safe.multiplierWeights)) || 2) };
      }
      if (id === "bomb") {
        return { id: "bomb", mult: Math.max(1, Number(pickFrom(safe.bombValues, safe.bombWeights)) || 8) };
      }
      if (id === "jackpot") {
        return { id: "jackpot", mult: Math.max(10, Number(pickFrom(safe.jackpotValues, safe.jackpotWeights)) || 80) };
      }
      return { id: "collect", mult: 0 };
    }

    for (let i = 0; i < trigger && locked.length < totalSlots; i++) {
      locked.push({ id: "coin", mult: Math.max(1, Number(pickFrom(safe.coinValues, safe.coinWeights)) || 5) });
    }

    let respins = Math.max(1, Math.floor(Number(safe.respins) || 3));
    let spins = 0;
    while (respins > 0 && locked.length < totalSlots && spins < safe.maxSpins) {
      spins += 1;
      const chance = Math.max(0.08, Number(safe.addChance) - (spins * Number(safe.addChanceDecay || 0)));
      if (Math.random() < chance) {
        const left = totalSlots - locked.length;
        const addCount = Math.max(1, Math.min(left, Math.random() < 0.22 ? 2 : 1));
        for (let a = 0; a < addCount; a++) {
          if (locked.length >= totalSlots) break;
          locked.push(pickBonusSymbol());
        }
        respins = Math.max(1, Math.floor(Number(safe.respins) || 3));
      } else {
        respins -= 1;
      }
    }

    let coinMult = 0;
    let multiplierMult = 1;
    let bombMult = 0;
    let jackpotMult = 0;
    let collectCount = 0;
    const labelList = [];
    for (let i = 0; i < locked.length; i++) {
      const s = locked[i];
      const id = String(s && s.id || "coin");
      const mult = Math.max(0, Number(s && s.mult) || 0);
      if (id === "coin") {
        coinMult += mult;
        labelList.push("C" + mult);
      } else if (id === "multiplier") {
        multiplierMult *= Math.max(2, mult);
        labelList.push("M" + Math.max(2, mult));
      } else if (id === "bomb") {
        bombMult += mult;
        labelList.push("B" + mult);
      } else if (id === "jackpot") {
        jackpotMult += mult;
        labelList.push("J" + mult);
      } else {
        collectCount += 1;
        labelList.push("COL");
      }
    }

    const collectMult = collectCount > 0 ? (coinMult * collectCount) : 0;
    const fullScreen = locked.length >= totalSlots;
    const fullScreenMult = fullScreen ? Math.max(0, Number(safe.fullScreenBonus) || 0) : 0;
    const preMul = Math.max(0, coinMult + bombMult + jackpotMult + collectMult + fullScreenMult);
    const totalMult = Math.max(0, preMul * Math.max(1, multiplierMult));
    const payout = Math.max(0, Math.floor(bet * totalMult));
    const summary =
      "Hold&Spin " + totalMult + "x (" +
      locked.length + "/" + totalSlots +
      ", coin " + coinMult +
      ", mult x" + multiplierMult +
      (bombMult > 0 ? (", bomb " + bombMult) : "") +
      (jackpotMult > 0 ? (", jackpot " + jackpotMult) : "") +
      (collectMult > 0 ? (", collect " + collectMult) : "") +
      (fullScreen ? ", FULL" : "") +
      ")";

    return {
      triggered: true,
      payout,
      multiplier: totalMult,
      summary,
      picks: labelList.slice(0, 24),
      filled: locked.length,
      totalSlots,
      fullScreen
    };
  }

  function evaluateV2Grid(grid, safeBet, options) {
    const opts = options && typeof options === "object" ? options : {};
    const safeGrid = Array.isArray(grid) ? grid : buildGridV2();
    const cols = (safeGrid[0] && safeGrid[0].length) || V2_REELS;
    const paylines = PAYLINES_V2.map((p) => normalizePattern(p, cols));
    const paylineCount = paylines.length;
    const betPerLine = safeBet / paylineCount;
    let totalMultiplier = 0;
    const lineWins = [];
    let scatterCount = 0;
    let bonusCount = 0;

    for (let r = 0; r < safeGrid.length; r++) {
      for (let c = 0; c < safeGrid[r].length; c++) {
        const id = String(safeGrid[r][c] && safeGrid[r][c].id || "");
        if (id === "scatter") scatterCount += 1;
        if (id === "bonus") bonusCount += 1;
      }
    }

    const lineIds = [];
    for (let i = 0; i < paylines.length; i++) {
      const line = getLineSymbols(safeGrid, paylines[i]);
      const evalLine = evaluatePayline(line, betPerLine);
      if (evalLine.multiplier > 0) {
        totalMultiplier += evalLine.multiplier / paylineCount;
        lineWins.push("L" + (i + 1) + " " + evalLine.text);
        lineIds.push(i + 1);
      }
    }

    if (scatterCount >= 3 && opts.allowScatterPayout !== false) {
      const scatterMult = scatterCount >= 5 ? 10 : (scatterCount === 4 ? 5 : 2);
      totalMultiplier += scatterMult;
      lineWins.push("SCATTER x" + scatterCount + " (" + scatterMult + "x)");
    }

    let bonus = null;
    if (bonusCount >= 3 && opts.allowBonus !== false) {
      bonus = runMiningBonus({ bet: safeBet, triggerCount: bonusCount });
    }

    const basePayout = Math.max(0, Math.floor(safeBet * totalMultiplier));
    const bonusPayout = bonus && bonus.triggered ? Math.max(0, Math.floor(Number(bonus.payout) || 0)) : 0;
    const payoutWanted = basePayout + bonusPayout;
    const finalMultiplier = safeBet > 0 ? Number((payoutWanted / safeBet).toFixed(2)) : 0;

    let outcome = "lose";
    if (finalMultiplier >= 20) outcome = "jackpot";
    else if (finalMultiplier > 0) outcome = "win";

    const summary = lineWins.length
      ? lineWins.slice(0, 3).join(" | ")
      : "No winning paylines";
    const bonusSummary = bonus && bonus.triggered
      ? (bonus.summary + " [" + bonus.picks.join(", ") + "]")
      : "";

    return {
      reels: gridToTextRows(safeGrid), // 3 row strings, csv by reel
      multiplier: finalMultiplier,
      payoutWanted,
      outcome,
      summary: bonusSummary ? (summary + " | " + bonusSummary) : summary,
      paylines: paylineCount,
      lineIds,
      lineWins,
      scatterCount,
      bonusTriggered: Boolean(bonus && bonus.triggered)
    };
  }

  function spinV2(bet, options) {
    const opts = options && typeof options === "object" ? options : {};
    const safeBet = Math.max(1, Math.floor(Number(bet) || 1));
    const buyX = Math.max(0, Math.floor(Number(opts.buyX) || 0));
    const boughtFreeSpins = String(opts.mode || "").toLowerCase() === "buyfs" && buyX >= 2;
    const wager = safeBet * (boughtFreeSpins ? buyX : 1);
    const baseGrid = buildGridV2();
    const base = evaluateV2Grid(
      baseGrid,
      safeBet,
      boughtFreeSpins
        ? { allowScatterPayout: false, allowBonus: false }
        : { allowScatterPayout: true, allowBonus: true }
    );
    const allLineWins = Array.isArray(base.lineWins) ? base.lineWins.slice(0, 14) : [];
    const allLineIds = Array.isArray(base.lineIds) ? base.lineIds.slice(0, 12) : [];
    const summaryParts = [String(base.summary || "No winning paylines")];

    let freeSpinsAwarded = 0;
    if (boughtFreeSpins) {
      freeSpinsAwarded = buyX;
      allLineWins.push("BUY BONUS x" + buyX + " (" + buyX + "x bet)");
      summaryParts.push("Bought free spins: " + buyX + " for " + wager + " WL.");
    } else if (base.scatterCount >= 3) {
      freeSpinsAwarded = base.scatterCount >= 5 ? 8 : (base.scatterCount === 4 ? 5 : 3);
      allLineWins.push("FREE SPINS x" + freeSpinsAwarded);
      summaryParts.push("Free spins awarded: " + freeSpinsAwarded);
    }

    const freeSpinPayout = 0;
    const freeSpinsPlayed = 0;
    if (freeSpinsAwarded > 0) {
      summaryParts.push("Use your free spins manually.");
    }

    const uncapped = Math.max(0, Math.floor(Number(base.payoutWanted) || 0) + freeSpinPayout);
    const cap = wager * Math.max(1, Math.floor(Number(GAME_DEFS.slots_v2.maxPayoutMultiplier) || 50));
    const payoutWanted = Math.max(0, Math.min(cap, uncapped));
    const finalMultiplier = wager > 0 ? Number((payoutWanted / wager).toFixed(2)) : 0;
    const outcome = finalMultiplier >= 20 ? "jackpot" : (finalMultiplier > 0 ? "win" : "lose");

    return {
      gameId: "slots_v2",
      bet: wager,
      baseBet: safeBet,
      buyX,
      reels: base.reels,
      multiplier: finalMultiplier,
      payoutWanted,
      outcome,
      summary: summaryParts.join(" | ").slice(0, 220),
      paylines: base.paylines,
      lineIds: allLineIds.slice(0, 12),
      lineWins: allLineWins.slice(0, 18),
      scatterCount: base.scatterCount,
      bonusTriggered: Boolean(base.bonusTriggered),
      freeSpinsAwarded,
      freeSpinsPlayed,
      freeSpinPayout
    };
  }

  function spin(gameId, bet, options) {
    const id = String(gameId || "slots").trim().toLowerCase();
    if (id === "slots_v2") return spinV2(bet, options);
    return spinV1(bet);
  }

  const api = {
    spin,
    getDefinitions
  };

  window.GTModules.slots = api;
})();
