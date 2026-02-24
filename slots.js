window.GTModules = window.GTModules || {};

(function initSlotsModule() {
  const DEFAULT_DEF = {
    id: "slots",
    name: "Slots",
    minBet: 1,
    maxBet: 30000,
    maxPayoutMultiplier: 10
  };

  const SYMBOLS = [
    { id: "cherry", icon: "CHERRY", weight: 30 },
    { id: "lemon", icon: "LEMON", weight: 28 },
    { id: "bar", icon: "BAR", weight: 20 },
    { id: "bell", icon: "BELL", weight: 14 },
    { id: "seven", icon: "SEVEN", weight: 8 }
  ];

  const TOTAL_WEIGHT = SYMBOLS.reduce((sum, row) => sum + Math.max(1, Math.floor(Number(row.weight) || 1)), 0);

  function pickSymbol() {
    let roll = Math.floor(Math.random() * TOTAL_WEIGHT);
    for (let i = 0; i < SYMBOLS.length; i++) {
      roll -= Math.max(1, Math.floor(Number(SYMBOLS[i].weight) || 1));
      if (roll < 0) return SYMBOLS[i];
    }
    return SYMBOLS[0];
  }

  function countById(reels) {
    const out = {};
    const arr = Array.isArray(reels) ? reels : [];
    for (let i = 0; i < arr.length; i++) {
      const key = String(arr[i] && arr[i].id || "");
      out[key] = (out[key] || 0) + 1;
    }
    return out;
  }

  function evaluateReels(reels, bet) {
    const safeBet = Math.max(1, Math.floor(Number(bet) || 1));
    const counts = countById(reels);
    const ids = Object.keys(counts);
    let multiplier = 0;
    let outcome = "lose";
    let reason = "No match";

    for (let i = 0; i < ids.length; i++) {
      if (counts[ids[i]] === 3) {
        if (ids[i] === "seven") {
          multiplier = 10;
          outcome = "jackpot";
          reason = "Triple seven";
        } else if (ids[i] === "bar") {
          multiplier = 6;
          outcome = "win";
          reason = "Triple bar";
        } else {
          multiplier = 4;
          outcome = "win";
          reason = "Triple match";
        }
        break;
      }
    }

    if (multiplier <= 0) {
      if ((counts.seven || 0) === 2) {
        multiplier = 3;
        outcome = "win";
        reason = "Double seven";
      } else if (ids.some((id) => counts[id] === 2)) {
        multiplier = 2;
        outcome = "win";
        reason = "Double match";
      }
    }

    const payoutWanted = Math.max(0, Math.floor(safeBet * multiplier));
    return {
      bet: safeBet,
      reels: reels.map((r) => String(r && r.icon || "?")),
      multiplier,
      payoutWanted,
      outcome,
      summary: reason
    };
  }

  function spin(bet) {
    const reels = [pickSymbol(), pickSymbol(), pickSymbol()];
    const result = evaluateReels(reels, bet);
    return result;
  }

  function getDefinition() {
    return { ...DEFAULT_DEF };
  }

  const api = {
    spin,
    getDefinition
  };

  window.GTModules.slots = api;
})();
