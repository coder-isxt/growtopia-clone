window.GTModules = window.GTModules || {};

(function initGambleModule() {
  const MACHINE_USE_TIMEOUT_MS = 120000;

  const MACHINE_DEFS = {
    reme_roulette: {
      id: "reme_roulette",
      name: "Reme Roulette",
      minRoll: 0,
      maxRoll: 37,
      minBet: 1,
      maxBet: 300,
      maxPayoutMultiplier: 3,
      tripleWinRolls: new Set([0, 19, 28]),
      houseAutoLoseRolls: new Set([0, 19, 28, 37])
    },
    blackjack: {
      id: "blackjack",
      name: "Blackjack",
      minBet: 1,
      maxBet: 300,
      maxPayoutMultiplier: 3
    }
  };

  function createController(options) {
    const opts = options || {};
    const machines = new Map();
    const lastBetByTile = new Map();
    let modalCtx = null;
    let modalBound = false;

    function get(k, fallback) {
      const fn = opts[k];
      if (typeof fn === "function") return fn();
      return fallback;
    }

    function esc(value) {
      return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    function getTileKey(tx, ty) {
      return String(tx) + "_" + String(ty);
    }

    function normalizeStats(value) {
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
        lastOutcome: String(row.lastOutcome || "").slice(0, 16),
        lastPlayerName: String(row.lastPlayerName || "").slice(0, 20),
        lastAt: Number(row.lastAt) || 0
      };
    }

    function normalizeRecord(value) {
      if (!value || typeof value !== "object") return null;
      const typeId = String(value.type || "reme_roulette");
      const def = MACHINE_DEFS[typeId] || MACHINE_DEFS.reme_roulette;
      return {
        ownerAccountId: String(value.ownerAccountId || ""),
        ownerName: String(value.ownerName || "").slice(0, 20),
        type: def.id,
        earningsLocks: Math.max(0, Math.floor(Number(value.earningsLocks) || 0)),
        inUseAccountId: String(value.inUseAccountId || ""),
        inUseSessionId: String(value.inUseSessionId || ""),
        inUseName: String(value.inUseName || "").slice(0, 20),
        inUseAt: Math.max(0, Math.floor(Number(value.inUseAt) || 0)),
        stats: normalizeStats(value.stats),
        updatedAt: Number(value.updatedAt) || 0
      };
    }

    function setLocal(tx, ty, value) {
      const key = getTileKey(tx, ty);
      const normalized = normalizeRecord(value);
      if (!normalized) {
        machines.delete(key);
        return;
      }
      machines.set(key, normalized);
    }

    function getLocal(tx, ty) {
      return machines.get(getTileKey(tx, ty)) || null;
    }

    function clearAll() {
      if (modalCtx && Number.isInteger(modalCtx.tx) && Number.isInteger(modalCtx.ty)) {
        releaseMachineUsage(modalCtx.tx, modalCtx.ty);
      }
      machines.clear();
      modalCtx = null;
      const modal = get("getGambleModalEl", null);
      if (modal) modal.classList.add("hidden");
    }

    function getModalEls() {
      return {
        modal: get("getGambleModalEl", null),
        title: get("getGambleTitleEl", null),
        body: get("getGambleBodyEl", null),
        actions: get("getGambleActionsEl", null),
        closeBtn: get("getGambleCloseBtnEl", null)
      };
    }

    function closeModal() {
      const prev = modalCtx;
      modalCtx = null;
      const els = getModalEls();
      if (els.modal) els.modal.classList.add("hidden");
      if (prev && Number.isInteger(prev.tx) && Number.isInteger(prev.ty)) {
        releaseMachineUsage(prev.tx, prev.ty);
      }
    }

    function sumDigits(value) {
      const safe = Math.max(0, Math.floor(Number(value) || 0));
      return Math.floor(safe / 10) + (safe % 10);
    }

    function getRemeFromRoll(roll) {
      const r = Math.max(0, Math.floor(Number(roll) || 0));
      if (r === 19 || r === 28 || r === 37) return 0;
      return sumDigits(r);
    }

    function evaluateSpin(def, playerRoll, houseRoll, bet) {
      const playerReme = getRemeFromRoll(playerRoll);
      const houseReme = getRemeFromRoll(houseRoll);
      const houseAutoLose = Boolean(def.houseAutoLoseRolls && def.houseAutoLoseRolls.has(houseRoll));
      const triple = def.tripleWinRolls.has(playerRoll);
      const tie = playerReme === houseReme;
      let multiplier = 0;
      let outcome = "lose";
      if (houseAutoLose) {
        multiplier = 0;
        outcome = "house_roll";
      } else if (triple) {
        multiplier = 3;
        outcome = "triple";
      } else if (!tie && playerReme > houseReme) {
        multiplier = 2;
        outcome = "win";
      }
      return {
        bet: Math.max(1, Math.floor(Number(bet) || 1)),
        playerRoll,
        houseRoll,
        playerReme,
        houseReme,
        houseAutoLose,
        tie,
        multiplier,
        payoutWanted: Math.max(0, Math.floor((Number(bet) || 0) * multiplier)),
        outcome
      };
    }

    function drawCard() {
      return Math.floor(Math.random() * 13) + 1;
    }

    function getCardValue(card) {
      const c = Math.max(1, Math.min(13, Math.floor(Number(card) || 1)));
      if (c === 1) return 11;
      if (c >= 10) return 10;
      return c;
    }

    function getCardLabel(card) {
      const c = Math.max(1, Math.min(13, Math.floor(Number(card) || 1)));
      if (c === 1) return "A";
      if (c === 11) return "J";
      if (c === 12) return "Q";
      if (c === 13) return "K";
      return String(c);
    }

    function scoreHand(cards) {
      const arr = Array.isArray(cards) ? cards : [];
      let total = 0;
      let aces = 0;
      for (let i = 0; i < arr.length; i++) {
        const c = Math.max(1, Math.min(13, Math.floor(Number(arr[i]) || 1)));
        if (c === 1) aces += 1;
        total += getCardValue(c);
      }
      while (total > 21 && aces > 0) {
        total -= 10;
        aces -= 1;
      }
      return total;
    }

    function formatHand(cards, total) {
      const arr = Array.isArray(cards) ? cards : [];
      const labels = arr.map((c) => getCardLabel(c)).join(" ");
      return labels + " (" + Math.max(0, Math.floor(Number(total) || 0)) + ")";
    }

    function evaluateBlackjackRound(def, bet) {
      const playerCards = [drawCard(), drawCard()];
      const houseCards = [drawCard(), drawCard()];
      let playerTotal = scoreHand(playerCards);
      let houseTotal = scoreHand(houseCards);
      const playerNatural = playerCards.length === 2 && playerTotal === 21;
      const houseNatural = houseCards.length === 2 && houseTotal === 21;
      let outcome = "lose";
      let multiplier = 0;
      let push = false;

      if (playerNatural || houseNatural) {
        if (playerNatural && houseNatural) {
          outcome = "push";
          multiplier = 1;
          push = true;
        } else if (playerNatural) {
          outcome = "blackjack";
          multiplier = 3;
        } else {
          outcome = "lose";
          multiplier = 0;
        }
      } else {
        while (playerTotal < 17) {
          playerCards.push(drawCard());
          playerTotal = scoreHand(playerCards);
        }
        if (playerTotal > 21) {
          outcome = "lose";
          multiplier = 0;
        } else {
          while (houseTotal < 17) {
            houseCards.push(drawCard());
            houseTotal = scoreHand(houseCards);
          }
          if (houseTotal > 21 || playerTotal > houseTotal) {
            outcome = "win";
            multiplier = 2;
          } else if (houseTotal === playerTotal) {
            outcome = "push";
            multiplier = 1;
            push = true;
          } else {
            outcome = "lose";
            multiplier = 0;
          }
        }
      }

      const safeBet = Math.max(1, Math.floor(Number(bet) || 1));
      return {
        bet: safeBet,
        multiplier,
        payoutWanted: Math.max(0, Math.floor(safeBet * multiplier)),
        outcome,
        tie: push,
        playerRoll: playerTotal,
        houseRoll: houseTotal,
        playerReme: 0,
        houseReme: 0,
        playerTotal,
        houseTotal,
        playerHandText: formatHand(playerCards, playerTotal),
        houseHandText: formatHand(houseCards, houseTotal)
      };
    }

    function canCollect(machine) {
      const pid = String(get("getPlayerProfileId", "") || "");
      return Boolean(machine && pid && machine.ownerAccountId === pid);
    }

    function getSelfAccountId() {
      return String(get("getPlayerProfileId", "") || "").trim();
    }

    function getSelfSessionId() {
      const sid = String(get("getPlayerSessionId", "") || "").trim();
      if (sid) return sid;
      const aid = getSelfAccountId();
      return aid ? ("acc_" + aid) : "";
    }

    function isUsageStale(machine) {
      if (!machine || !machine.inUseAt) return false;
      const now = Date.now();
      return (now - Math.max(0, Number(machine.inUseAt) || 0)) > MACHINE_USE_TIMEOUT_MS;
    }

    function isUsedByOther(machine) {
      if (!machine || !machine.inUseAccountId) return false;
      if (isUsageStale(machine)) return false;
      const selfAccount = getSelfAccountId();
      const selfSession = getSelfSessionId();
      if (machine.inUseSessionId && selfSession) return machine.inUseSessionId !== selfSession;
      return machine.inUseAccountId !== selfAccount;
    }

    function releaseUsageFields(current) {
      const next = { ...(current || {}) };
      delete next.inUseAccountId;
      delete next.inUseSessionId;
      delete next.inUseName;
      delete next.inUseAt;
      return next;
    }

    function markInUse(current) {
      const next = { ...(current || {}) };
      next.inUseAccountId = getSelfAccountId();
      next.inUseSessionId = getSelfSessionId();
      next.inUseName = String(get("getPlayerName", "") || "").slice(0, 20);
      next.inUseAt = Date.now();
      return next;
    }

    function acquireMachineUsage(tx, ty) {
      const post = opts.postLocalSystemChat || (() => {});
      const currentLocal = getLocal(tx, ty);
      if (currentLocal && isUsedByOther(currentLocal)) {
        post("This machine is currently in use by @" + (currentLocal.inUseName || "another player") + ".");
        return Promise.resolve(false);
      }
      const network = get("getNetwork", null);
      const basePath = String(get("getBasePath", "") || "");
      const profileId = getSelfAccountId();
      if (!profileId) return Promise.resolve(false);
      if (!network || !network.enabled || !network.db || !basePath) {
        const nextLocal = normalizeRecord(markInUse(currentLocal || {
          ownerAccountId: profileId,
          ownerName: String(get("getPlayerName", "") || "").slice(0, 20),
          type: "reme_roulette",
          earningsLocks: 0,
          stats: normalizeStats({}),
          updatedAt: Date.now()
        }));
        setLocal(tx, ty, nextLocal);
        return Promise.resolve(true);
      }
      const machineRef = getMachineRef(tx, ty);
      if (!machineRef) return Promise.resolve(false);
      let deniedBy = "";
      return machineRef.transaction((currentRaw) => {
        const current = normalizeRecord(currentRaw) || {
          ownerAccountId: profileId,
          ownerName: String(get("getPlayerName", "") || "").slice(0, 20),
          type: "reme_roulette",
          earningsLocks: 0,
          stats: normalizeStats({}),
          updatedAt: 0
        };
        if (isUsedByOther(current)) {
          deniedBy = current.inUseName || "another player";
          return;
        }
        const next = markInUse(current);
        next.updatedAt = Date.now();
        return next;
      }).then((result) => {
        if (!result || !result.committed) {
          if (deniedBy) {
            post("This machine is currently in use by @" + deniedBy + ".");
          } else {
            post("Failed to open machine.");
          }
          return false;
        }
        const raw = result.snapshot && typeof result.snapshot.val === "function" ? result.snapshot.val() : null;
        setLocal(tx, ty, raw);
        return true;
      }).catch(() => {
        post("Failed to open machine.");
        return false;
      });
    }

    function releaseMachineUsage(tx, ty) {
      const local = getLocal(tx, ty);
      if (!local) return;
      const selfAccount = getSelfAccountId();
      const selfSession = getSelfSessionId();
      const ownsBySession = local.inUseSessionId && selfSession && local.inUseSessionId === selfSession;
      const ownsByAccount = !local.inUseSessionId && local.inUseAccountId && local.inUseAccountId === selfAccount;
      if (!ownsBySession && !ownsByAccount && !isUsageStale(local)) return;
      const network = get("getNetwork", null);
      const basePath = String(get("getBasePath", "") || "");
      if (!network || !network.enabled || !network.db || !basePath) {
        const nextLocal = normalizeRecord(releaseUsageFields(local));
        setLocal(tx, ty, nextLocal);
        return;
      }
      const machineRef = getMachineRef(tx, ty);
      if (!machineRef) return;
      machineRef.transaction((currentRaw) => {
        const current = normalizeRecord(currentRaw);
        if (!current) return currentRaw;
        const sameSession = current.inUseSessionId && selfSession && current.inUseSessionId === selfSession;
        const sameAccount = !current.inUseSessionId && current.inUseAccountId && current.inUseAccountId === selfAccount;
        if (!sameSession && !sameAccount && !isUsageStale(current)) return currentRaw;
        return {
          ...releaseUsageFields(current),
          updatedAt: Date.now()
        };
      }).then((result) => {
        if (!result || !result.committed) return;
        const raw = result.snapshot && typeof result.snapshot.val === "function" ? result.snapshot.val() : null;
        setLocal(tx, ty, raw);
      }).catch(() => {});
    }

    function getMaxBetByBank(bank, def) {
      const safeBank = Math.max(0, Math.floor(Number(bank) || 0));
      const coverage = Math.max(1, Math.floor(Number(def && def.maxPayoutMultiplier) || 3));
      const byBank = Math.floor(safeBank / coverage);
      return Math.max(0, Math.min(Math.max(1, Math.floor(Number(def && def.maxBet) || 300)), byBank));
    }

    function getOutcomeLabel(outcome) {
      if (outcome === "blackjack") return "BLACKJACK";
      if (outcome === "push") return "PUSH";
      if (outcome === "house_roll") return "HOUSE SPECIAL";
      if (outcome === "triple") return "TRIPLE";
      if (outcome === "win") return "WIN";
      return "LOSE";
    }

    function renderModal(tx, ty, machine, spectatingMode) {
      const els = getModalEls();
      if (!els.modal || !els.title || !els.body || !els.actions) return;
      const m = machine || getLocal(tx, ty) || {
        ownerAccountId: "",
        ownerName: "",
        type: "reme_roulette",
        earningsLocks: 0,
        stats: normalizeStats({}),
        updatedAt: 0
      };
      const def = MACHINE_DEFS[m.type] || MACHINE_DEFS.reme_roulette;
      const stats = normalizeStats(m.stats);
      const ownerLabel = m.ownerName || "owner";
      const ownerView = canCollect(m);
      const spectating = Boolean(spectatingMode);
      const bank = Math.max(0, Math.floor(Number(m.earningsLocks) || 0));
      const maxBetByBank = getMaxBetByBank(bank, def);
      const canSpin = maxBetByBank >= def.minBet;
      const blockedByActiveUser = isUsedByOther(m);
      const canPlayNow = canSpin && !blockedByActiveUser && !spectating;
      const worldLockId = Math.max(0, Math.floor(Number(get("getWorldLockId", 0)) || 0));
      const inventory = get("getInventory", {}) || {};
      const playerLocks = Math.max(0, Math.floor(Number(inventory[worldLockId]) || 0));
      const maxBetByPlayer = Math.max(0, Math.min(def.maxBet, playerLocks));
      const maxBetEffective = Math.max(0, Math.min(maxBetByBank, maxBetByPlayer));
      const tileKey = getTileKey(tx, ty);
      const rememberedBet = Math.max(def.minBet, Math.floor(Number(lastBetByTile.get(tileKey)) || def.minBet));
      const displayBet = canSpin
        ? Math.max(def.minBet, Math.min(maxBetByBank, rememberedBet))
        : def.minBet;
      const coverageMult = Math.max(1, Math.floor(Number(def.maxPayoutMultiplier) || 3));

      els.title.textContent = "Gambling Machine";
      els.body.innerHTML =
        "<div class='vending-section'>" +
          "<div class='vending-stat-grid'>" +
            "<div class='vending-stat'><span>Type</span><strong>" + esc(def.name) + "</strong></div>" +
            "<div class='vending-stat'><span>Owner</span><strong>@" + esc(ownerLabel) + "</strong></div>" +
            "<div class='vending-stat'><span>Machine Bank</span><strong>" + bank + " WL</strong></div>" +
            "<div class='vending-stat'><span>Max Bet</span><strong>" + (canSpin ? maxBetByBank : 0) + " WL</strong></div>" +
            "<div class='vending-stat'><span>In Use</span><strong>" + (m.inUseAccountId && !isUsageStale(m) ? ("@" + esc(m.inUseName || "player")) : "No") + "</strong></div>" +
            // "<div class='vending-stat'><span>Plays</span><strong>" + stats.plays + "</strong></div>" +
            "<div class='vending-stat'><span>Total Bets Placed</span><strong>" + stats.totalBet + " WL</strong></div>" +
            "<div class='vending-stat'><span>Last Player</span><strong>" + (stats.lastPlayerName ? ("@" + esc(stats.lastPlayerName)) : "-") + "</strong></div>" +
            // "<div class='vending-stat'><span>Total Paid Out</span><strong>" + stats.totalPayout + " WL</strong></div>" +
          "</div>" +
        "</div>" +
        (ownerView
          ? ("<div class='vending-section'>" +
              "<div class='vending-section-title'>Machine Settings</div>" +
              "<div class='vending-field-grid'>" +
                "<label class='vending-field'><span>Game</span>" +
                  "<select data-gamble-input='type'>" +
                    Object.keys(MACHINE_DEFS).map((id) => {
                      const row = MACHINE_DEFS[id];
                      return "<option value='" + esc(row.id) + "'" + (row.id === def.id ? " selected" : "") + ">" + esc(row.name) + "</option>";
                    }).join("") +
                  "</select>" +
                "</label>" +
                "<div class='vending-field'><span>&nbsp;</span><button type='button' data-gamble-act='settype'>Save Game</button></div>" +
              "</div>" +
            "</div>")
          : "") +
        "<div class='vending-section'>" +
          "<div class='vending-section-title'>Play (" + (def.id === "blackjack" ? "Blackjack" : "Player vs House") + ")</div>" +
          "<div class='vending-field-grid'>" +
            "<label class='vending-field'><span>Bet (World Locks)</span><input data-gamble-input='bet' type='number' min='" + def.minBet + "' max='" + (canSpin ? maxBetByBank : def.minBet) + "' step='1' value='" + displayBet + "'" + (canPlayNow ? "" : " disabled") + "></label>" +
            "<div class='vending-field'><span>&nbsp;</span><button type='button' data-gamble-act='maxbet'" + ((canPlayNow && maxBetEffective > 0) ? "" : " disabled") + ">Apply Max Bet</button></div>" +
          "</div>" +
          (def.id === "blackjack"
            ? ("<div class='vending-auto-stock-note'>Auto blackjack round: both sides draw, then hit until 17.</div>" +
              "<div class='vending-auto-stock-note'>Blackjack pays 3x, normal win pays 2x, push returns bet.</div>")
            : ("<div class='vending-auto-stock-note'>No number selection. You roll vs house roll (0-37). Higher reme wins.</div>" +
              "<div class='vending-auto-stock-note'>Tie = lose. Special player rolls 0, 19, 28 give 3x.</div>" +
              "<div class='vending-auto-stock-note'>If house rolls 0, 19, 28 or 37, player auto-loses.</div>")) +
          "<div class='vending-auto-stock-note'>All lost bets go into machine bank. Wins are paid from machine bank.</div>" +
          "<div class='vending-auto-stock-note'>Required bank >= " + coverageMult + "x bet. With 12 WL bank, max bet is " + Math.floor(12 / coverageMult) + " WL.</div>" +
          (spectating ? "<div class='vending-auto-stock-note'>Spectating live: read-only.</div>" : "") +
          (blockedByActiveUser && !spectating ? "<div class='vending-auto-stock-note'>Machine is currently in use by @" + esc(m.inUseName || "another player") + ".</div>" : "") +
        "</div>" +
        "<div class='vending-section'>" +
          "<div class='vending-section-title'>Last Result</div>" +
          "<div class='vending-stat-grid'>" +
            "<div class='vending-stat'><span>You</span><strong>" + (stats.plays ? esc(def.id === "blackjack" ? (String(stats.lastPlayerRoll) + " pts") : (stats.lastPlayerRoll + " (" + stats.lastPlayerReme + ")")) : "-") + "</strong></div>" +
            "<div class='vending-stat'><span>House</span><strong>" + (stats.plays ? esc(def.id === "blackjack" ? (String(stats.lastHouseRoll) + " pts") : (stats.lastHouseRoll + " (" + stats.lastHouseReme + ")")) : "-") + "</strong></div>" +
            "<div class='vending-stat'><span>Outcome</span><strong>" + esc(stats.plays ? getOutcomeLabel(stats.lastOutcome) : "-") + "</strong></div>" +
            "<div class='vending-stat'><span>Multiplier</span><strong>" + (stats.plays ? (stats.lastMultiplier + "x") : "-") + "</strong></div>" +
          "</div>" +
        "</div>";

      if (ownerView) {
        els.actions.innerHTML =
          "<button data-gamble-act='spin'" + (canPlayNow ? "" : " disabled") + ">" + (def.id === "blackjack" ? "Deal" : "Spin") + "</button>" +
          "<input data-gamble-input='refill' type='number' min='1' step='1' value='1' style='max-width:120px;'>" +
          "<button data-gamble-act='refill'>Refill</button>" +
          "<button data-gamble-act='collect'" + (m.earningsLocks > 0 ? "" : " disabled") + ">Collect Earnings</button>" +
          "<button data-gamble-act='close'>Close</button>";
      } else {
        els.actions.innerHTML =
          "<button data-gamble-act='spin'" + (canPlayNow ? "" : " disabled") + ">" + (def.id === "blackjack" ? "Deal" : "Spin") + "</button>" +
          "<button data-gamble-act='close'>Close</button>";
      }

      modalCtx = { tx, ty, spectating };
      els.modal.classList.remove("hidden");
    }

    function getMachineRef(tx, ty) {
      const network = get("getNetwork", null);
      const basePath = String(get("getBasePath", "") || "");
      const worldId = String(get("getCurrentWorldId", "") || "");
      if (!network || !network.enabled || !network.db || !basePath || !worldId) return null;
      return network.db.ref(basePath + "/worlds/" + worldId + "/gamble-machines/" + getTileKey(tx, ty));
    }

    function seedOwner(tx, ty) {
      const ref = getMachineRef(tx, ty);
      if (!ref) return;
      const firebaseRef = get("getFirebase", null);
      const profileId = String(get("getPlayerProfileId", "") || "");
      if (!profileId) return;
      const profileName = String(get("getPlayerName", "") || "").slice(0, 20);
      ref.transaction((currentRaw) => {
        const current = normalizeRecord(currentRaw);
        if (current && current.ownerAccountId) return currentRaw;
        return {
          ownerAccountId: profileId,
          ownerName: profileName,
          type: "reme_roulette",
          earningsLocks: 0,
          stats: normalizeStats({}),
          updatedAt: firebaseRef && firebaseRef.database ? firebaseRef.database.ServerValue.TIMESTAMP : Date.now()
        };
      }).catch(() => {});
    }

    function updateMachineAfterSpin(currentRaw, result, playerName, firebaseRef) {
      const current = normalizeRecord(currentRaw) || {
        ownerAccountId: String(get("getPlayerProfileId", "") || ""),
        ownerName: String(get("getPlayerName", "") || "").slice(0, 20),
        type: "reme_roulette",
        earningsLocks: 0,
        stats: normalizeStats({}),
        updatedAt: 0
      };
      const beforeBank = Math.max(0, Math.floor(Number(current.earningsLocks) || 0));
      const def = MACHINE_DEFS[current.type] || MACHINE_DEFS.reme_roulette;
      const needsCoverage = Math.max(1, Math.floor(Number(result.bet) || 0)) * Math.max(1, Math.floor(Number(def.maxPayoutMultiplier) || 3));
      if (beforeBank < needsCoverage) return null;
      const payout = Math.max(0, Math.floor(Number(result.payoutWanted) || 0));
      const nextBank = Math.max(0, beforeBank + Math.max(0, Math.floor(Number(result.bet) || 0)) - payout);
      const nextStats = normalizeStats(current.stats);
      nextStats.plays += 1;
      nextStats.totalBet += result.bet;
      nextStats.totalPayout += payout;
      nextStats.lastPlayerRoll = result.playerRoll;
      nextStats.lastHouseRoll = result.houseRoll;
      nextStats.lastPlayerReme = result.playerReme;
      nextStats.lastHouseReme = result.houseReme;
      nextStats.lastMultiplier = result.multiplier;
      nextStats.lastOutcome = result.outcome;
      nextStats.lastPlayerName = playerName;
      nextStats.lastAt = firebaseRef && firebaseRef.database ? firebaseRef.database.ServerValue.TIMESTAMP : Date.now();
      const next = {
        ownerAccountId: current.ownerAccountId,
        ownerName: current.ownerName,
        type: current.type || "reme_roulette",
        earningsLocks: nextBank,
        stats: nextStats,
        updatedAt: firebaseRef && firebaseRef.database ? firebaseRef.database.ServerValue.TIMESTAMP : Date.now()
      };
      return { next, payout };
    }

    function getOutcomeMessage(result, payout) {
      if (result.gameType === "blackjack") {
        const base = "You " + result.playerTotal + " vs House " + result.houseTotal + ": ";
        if (result.outcome === "blackjack") return base + "BLACKJACK. Won " + payout + " WL.";
        if (result.outcome === "win") return base + "WIN. Won " + payout + " WL.";
        if (result.outcome === "push") return base + "PUSH. Bet returned (" + payout + " WL).";
        return base + "LOSE. Lost " + result.bet + " WL.";
      }
      const playerText = "You " + result.playerRoll + " (" + result.playerReme + ")";
      const houseText = "House " + result.houseRoll + " (" + result.houseReme + ")";
      if (result.outcome === "house_roll") {
        return playerText + " vs " + houseText + ": HOUSE SPECIAL ROLL. Auto-lose " + result.bet + " WL.";
      }
      if (result.outcome === "triple") {
        return playerText + " vs " + houseText + ": TRIPLE. Won " + payout + " WL.";
      }
      if (result.outcome === "win") {
        return playerText + " vs " + houseText + ": WIN. Won " + payout + " WL.";
      }
      if (result.tie) {
        return playerText + " vs " + houseText + ": TIE = LOSE. Lost " + result.bet + " WL.";
      }
      return playerText + " vs " + houseText + ": LOSE. Lost " + result.bet + " WL.";
    }

    function spin() {
      if (!modalCtx) return;
      const post = opts.postLocalSystemChat || (() => {});
      const tx = Math.floor(Number(modalCtx.tx));
      const ty = Math.floor(Number(modalCtx.ty));
      const machine = getLocal(tx, ty) || {
        ownerAccountId: "",
        ownerName: "",
        type: "reme_roulette",
        earningsLocks: 0,
        stats: normalizeStats({}),
        updatedAt: 0
      };
      const def = MACHINE_DEFS[machine.type] || MACHINE_DEFS.reme_roulette;
      const els = getModalEls();
      const betInput = els.body ? els.body.querySelector("[data-gamble-input='bet']") : null;
      const bankLocal = Math.max(0, Math.floor(Number(machine.earningsLocks) || 0));
      const maxBetByBank = getMaxBetByBank(bankLocal, def);
      if (maxBetByBank < def.minBet) {
        post("Machine bank is too low. Owner must refill.");
        return;
      }
      const bet = Math.max(def.minBet, Math.min(maxBetByBank, Math.floor(Number(betInput && betInput.value) || 0)));
      lastBetByTile.set(getTileKey(tx, ty), bet);
      const worldLockId = Math.max(0, Math.floor(Number(get("getWorldLockId", 0)) || 0));
      const inventory = get("getInventory", {}) || {};
      const haveLocal = Math.max(0, Math.floor(Number(inventory[worldLockId]) || 0));
      if (haveLocal < bet) {
        post("Not enough World Locks. Need " + bet + ".");
        return;
      }

      const result = def.id === "blackjack"
        ? evaluateBlackjackRound(def, bet)
        : (() => {
            const playerRoll = Math.floor(Math.random() * (def.maxRoll - def.minRoll + 1)) + def.minRoll;
            const houseRoll = Math.floor(Math.random() * (def.maxRoll - def.minRoll + 1)) + def.minRoll;
            return evaluateSpin(def, playerRoll, houseRoll, bet);
          })();
      result.gameType = def.id;
      const network = get("getNetwork", null);
      const basePath = String(get("getBasePath", "") || "");
      const profileId = String(get("getPlayerProfileId", "") || "");
      const profileName = String(get("getPlayerName", "") || "").slice(0, 20);
      const firebaseRef = get("getFirebase", null);

      const finalizeLocal = () => {
        const current = getLocal(tx, ty) || machine;
        const beforeBank = Math.max(0, Math.floor(Number(current.earningsLocks) || 0));
        const needsCoverage = bet * Math.max(1, Math.floor(Number(def.maxPayoutMultiplier) || 3));
        if (beforeBank < needsCoverage) {
          post("Machine bank changed. Max bet is now " + getMaxBetByBank(beforeBank, def) + " WL.");
          renderModal(tx, ty, current);
          return;
        }
        const payout = Math.max(0, Math.floor(Number(result.payoutWanted) || 0));
        inventory[worldLockId] = Math.max(0, haveLocal - bet + payout);
        const nextStats = normalizeStats(current.stats);
        nextStats.plays += 1;
        nextStats.totalBet += bet;
        nextStats.totalPayout += payout;
        nextStats.lastPlayerRoll = result.playerRoll;
        nextStats.lastHouseRoll = result.houseRoll;
        nextStats.lastPlayerReme = result.playerReme;
        nextStats.lastHouseReme = result.houseReme;
        nextStats.lastMultiplier = result.multiplier;
        nextStats.lastOutcome = result.outcome;
        nextStats.lastPlayerName = profileName;
        nextStats.lastAt = Date.now();
        const nextMachine = {
          ...current,
          earningsLocks: Math.max(0, beforeBank + bet - payout),
          stats: nextStats,
          updatedAt: Date.now()
        };
        setLocal(tx, ty, nextMachine);
        if (typeof opts.saveInventory === "function") opts.saveInventory();
        if (typeof opts.refreshToolbar === "function") opts.refreshToolbar(true);
        renderModal(tx, ty, nextMachine);
        post(getOutcomeMessage(result, payout));
      };

      if (!network || !network.enabled || !network.db || !basePath || !profileId) {
        finalizeLocal();
        return;
      }

      const lockRef = network.db.ref(basePath + "/player-inventories/" + profileId + "/" + worldLockId);
      const machineRef = getMachineRef(tx, ty);
      if (!machineRef) {
        finalizeLocal();
        return;
      }

      lockRef.transaction((current) => {
        const have = Math.max(0, Math.floor(Number(current) || 0));
        if (have < bet) return;
        return have - bet;
      }).then((deductResult) => {
        if (!deductResult.committed) {
          post("Not enough World Locks.");
          return Promise.resolve(null);
        }
        let payout = 0;
        return machineRef.transaction((currentRaw) => {
          const update = updateMachineAfterSpin(currentRaw, result, profileName, firebaseRef);
          if (!update) return;
          payout = update.payout;
          return update.next;
        }).then((machineTxn) => {
          if (!machineTxn || !machineTxn.committed) {
            lockRef.transaction((current) => Math.max(0, Math.floor(Number(current) || 0)) + bet).catch(() => {});
            post("Spin failed.");
            return null;
          }
          const raw = machineTxn.snapshot && typeof machineTxn.snapshot.val === "function" ? machineTxn.snapshot.val() : null;
          setLocal(tx, ty, raw);
          if (payout > 0) {
            return lockRef.transaction((current) => Math.max(0, Math.floor(Number(current) || 0)) + payout).then((payTxn) => {
              if (!payTxn || !payTxn.committed) {
                post("Spin payout failed.");
              }
              return { payout };
            });
          }
          return { payout: 0 };
        });
      }).then((done) => {
        if (!done) return;
        if (typeof opts.saveInventory === "function") opts.saveInventory();
        if (typeof opts.refreshToolbar === "function") opts.refreshToolbar(true);
        const latest = getLocal(tx, ty) || machine;
        renderModal(tx, ty, latest);
        post(getOutcomeMessage(result, done.payout));
      }).catch(() => {
        post("Spin failed.");
      });
    }

    function refillBank() {
      if (!modalCtx) return;
      const tx = Math.floor(Number(modalCtx.tx));
      const ty = Math.floor(Number(modalCtx.ty));
      const post = opts.postLocalSystemChat || (() => {});
      const machine = getLocal(tx, ty);
      if (!machine || !canCollect(machine)) {
        post("Only the machine owner can refill.");
        return;
      }
      const els = getModalEls();
      const refillInput = els.actions ? els.actions.querySelector("[data-gamble-input='refill']") : null;
      const amount = Math.max(1, Math.floor(Number(refillInput && refillInput.value) || 0));
      const worldLockId = Math.max(0, Math.floor(Number(get("getWorldLockId", 0)) || 0));
      const inventory = get("getInventory", {}) || {};
      const haveLocal = Math.max(0, Math.floor(Number(inventory[worldLockId]) || 0));
      if (haveLocal < amount) {
        post("Not enough WL to refill. Need " + amount + ".");
        return;
      }
      const network = get("getNetwork", null);
      const basePath = String(get("getBasePath", "") || "");
      const profileId = String(get("getPlayerProfileId", "") || "");
      if (!network || !network.enabled || !network.db || !basePath || !profileId) {
        inventory[worldLockId] = haveLocal - amount;
        const nextMachine = { ...machine, earningsLocks: Math.max(0, Math.floor(Number(machine.earningsLocks) || 0) + amount), updatedAt: Date.now() };
        setLocal(tx, ty, nextMachine);
        if (typeof opts.saveInventory === "function") opts.saveInventory();
        if (typeof opts.refreshToolbar === "function") opts.refreshToolbar(true);
        renderModal(tx, ty, nextMachine);
        post("Refilled machine by " + amount + " WL.");
        return;
      }
      const lockRef = network.db.ref(basePath + "/player-inventories/" + profileId + "/" + worldLockId);
      const machineRef = getMachineRef(tx, ty);
      if (!machineRef) return;
      lockRef.transaction((current) => {
        const have = Math.max(0, Math.floor(Number(current) || 0));
        if (have < amount) return;
        return have - amount;
      }).then((deductTxn) => {
        if (!deductTxn.committed) {
          post("Not enough WL to refill.");
          return Promise.resolve(false);
        }
        return machineRef.transaction((currentRaw) => {
          const current = normalizeRecord(currentRaw) || machine;
          if (!canCollect(current)) return currentRaw;
          return {
            ...current,
            earningsLocks: Math.max(0, Math.floor(Number(current.earningsLocks) || 0) + amount),
            updatedAt: Date.now()
          };
        }).then((machineTxn) => {
          if (!machineTxn || !machineTxn.committed) {
            lockRef.transaction((current) => Math.max(0, Math.floor(Number(current) || 0)) + amount).catch(() => {});
            post("Refill failed.");
            return false;
          }
          const raw = machineTxn.snapshot && typeof machineTxn.snapshot.val === "function" ? machineTxn.snapshot.val() : null;
          setLocal(tx, ty, raw);
          if (typeof opts.saveInventory === "function") opts.saveInventory();
          if (typeof opts.refreshToolbar === "function") opts.refreshToolbar(true);
          renderModal(tx, ty, getLocal(tx, ty));
          post("Refilled machine by " + amount + " WL.");
          return true;
        });
      }).catch(() => {
        post("Refill failed.");
      });
    }

    function collectEarnings() {
      if (!modalCtx) return;
      const tx = Math.floor(Number(modalCtx.tx));
      const ty = Math.floor(Number(modalCtx.ty));
      const post = opts.postLocalSystemChat || (() => {});
      const machine = getLocal(tx, ty);
      if (!machine || !canCollect(machine)) {
        post("Only the machine owner can collect earnings.");
        return;
      }
      const amountLocal = Math.max(0, Math.floor(Number(machine.earningsLocks) || 0));
      if (amountLocal <= 0) {
        post("No earnings to collect.");
        return;
      }
      const worldLockId = Math.max(0, Math.floor(Number(get("getWorldLockId", 0)) || 0));
      const inventory = get("getInventory", {}) || {};
      const network = get("getNetwork", null);
      const basePath = String(get("getBasePath", "") || "");
      const profileId = String(get("getPlayerProfileId", "") || "");

      if (!network || !network.enabled || !network.db || !basePath || !profileId) {
        inventory[worldLockId] = Math.max(0, Math.floor(Number(inventory[worldLockId]) || 0) + amountLocal);
        const nextMachine = { ...machine, earningsLocks: 0, updatedAt: Date.now() };
        setLocal(tx, ty, nextMachine);
        if (typeof opts.saveInventory === "function") opts.saveInventory();
        if (typeof opts.refreshToolbar === "function") opts.refreshToolbar(true);
        renderModal(tx, ty, nextMachine);
        post("Collected " + amountLocal + " WL from machine.");
        return;
      }

      const machineRef = getMachineRef(tx, ty);
      if (!machineRef) return;
      let collected = 0;
      machineRef.transaction((currentRaw) => {
        const current = normalizeRecord(currentRaw);
        if (!current) return currentRaw;
        if (!canCollect(current)) return currentRaw;
        collected = Math.max(0, Math.floor(Number(current.earningsLocks) || 0));
        if (collected <= 0) return currentRaw;
        return {
          ...current,
          earningsLocks: 0,
          updatedAt: Date.now()
        };
      }).then((machineTxn) => {
        if (!machineTxn || !machineTxn.committed || collected <= 0) {
          post("No earnings to collect.");
          return null;
        }
        const raw = machineTxn.snapshot && typeof machineTxn.snapshot.val === "function" ? machineTxn.snapshot.val() : null;
        setLocal(tx, ty, raw);
        return network.db.ref(basePath + "/player-inventories/" + profileId + "/" + worldLockId).transaction((current) => {
          return Math.max(0, Math.floor(Number(current) || 0)) + collected;
        }).then(() => ({ collected }));
      }).then((done) => {
        if (!done) return;
        if (typeof opts.saveInventory === "function") opts.saveInventory();
        if (typeof opts.refreshToolbar === "function") opts.refreshToolbar(true);
        renderModal(tx, ty, getLocal(tx, ty));
        post("Collected " + done.collected + " WL from machine.");
      }).catch(() => {
        post("Failed to collect earnings.");
      });
    }

    function setMachineType() {
      if (!modalCtx) return;
      const tx = Math.floor(Number(modalCtx.tx));
      const ty = Math.floor(Number(modalCtx.ty));
      const post = opts.postLocalSystemChat || (() => {});
      const machine = getLocal(tx, ty);
      if (!machine || !canCollect(machine)) {
        post("Only the machine owner can change game type.");
        return;
      }
      const els = getModalEls();
      const typeInput = els.body ? els.body.querySelector("[data-gamble-input='type']") : null;
      const nextTypeRaw = typeInput instanceof HTMLSelectElement ? typeInput.value : "";
      const nextDef = MACHINE_DEFS[String(nextTypeRaw || "").trim()] || null;
      if (!nextDef) {
        post("Invalid game type.");
        return;
      }
      if (nextDef.id === machine.type) {
        post("Machine already uses " + nextDef.name + ".");
        return;
      }
      const network = get("getNetwork", null);
      const basePath = String(get("getBasePath", "") || "");
      const profileId = String(get("getPlayerProfileId", "") || "");
      if (!network || !network.enabled || !network.db || !basePath || !profileId) {
        const nextMachine = {
          ...machine,
          type: nextDef.id,
          stats: normalizeStats({}),
          updatedAt: Date.now()
        };
        setLocal(tx, ty, nextMachine);
        renderModal(tx, ty, nextMachine);
        post("Machine game set to " + nextDef.name + ".");
        return;
      }
      const machineRef = getMachineRef(tx, ty);
      if (!machineRef) return;
      machineRef.transaction((currentRaw) => {
        const current = normalizeRecord(currentRaw) || machine;
        if (!canCollect(current)) return currentRaw;
        return {
          ...current,
          type: nextDef.id,
          stats: normalizeStats({}),
          updatedAt: Date.now()
        };
      }).then((result) => {
        if (!result || !result.committed) {
          post("Failed to change game type.");
          return;
        }
        const raw = result.snapshot && typeof result.snapshot.val === "function" ? result.snapshot.val() : null;
        setLocal(tx, ty, raw);
        renderModal(tx, ty, getLocal(tx, ty));
        post("Machine game set to " + nextDef.name + ".");
      }).catch(() => {
        post("Failed to change game type.");
      });
    }

    function handleActionClick(event) {
      const target = event && event.target;
      if (!(target instanceof HTMLElement)) return;
      const action = String(target.dataset.gambleAct || "").trim();
      if (!action) return;
      if (modalCtx && modalCtx.spectating && action !== "close") {
        const post = opts.postLocalSystemChat || (() => {});
        post("Spectator mode is read-only.");
        return;
      }
      if (action === "maxbet") {
        if (!modalCtx) return;
        const tx = Math.floor(Number(modalCtx.tx));
        const ty = Math.floor(Number(modalCtx.ty));
        const machine = getLocal(tx, ty);
        const def = MACHINE_DEFS[(machine && machine.type) || "reme_roulette"] || MACHINE_DEFS.reme_roulette;
        const bank = Math.max(0, Math.floor(Number(machine && machine.earningsLocks) || 0));
        const byBank = getMaxBetByBank(bank, def);
        const worldLockId = Math.max(0, Math.floor(Number(get("getWorldLockId", 0)) || 0));
        const inventory = get("getInventory", {}) || {};
        const byPlayer = Math.max(0, Math.min(def.maxBet, Math.floor(Number(inventory[worldLockId]) || 0)));
        const effective = Math.max(0, Math.min(byBank, byPlayer));
        const els = getModalEls();
        const betInput = els.body ? els.body.querySelector("[data-gamble-input='bet']") : null;
        const nextBet = Math.max(def.minBet, effective || def.minBet);
        if (betInput) {
          const minBet = Math.max(1, Math.floor(Number(def.minBet) || 1));
          const maxBet = Math.max(minBet, Math.floor(Number(byBank) || minBet));
          betInput.min = String(minBet);
          betInput.max = String(maxBet);
          betInput.value = String(Math.max(minBet, Math.min(maxBet, nextBet)));
        }
        lastBetByTile.set(getTileKey(tx, ty), nextBet);
        return;
      }
      if (action === "close") {
        closeModal();
        return;
      }
      if (action === "spin") {
        spin();
        return;
      }
      if (action === "collect") {
        collectEarnings();
        return;
      }
      if (action === "refill") {
        refillBank();
        return;
      }
      if (action === "settype") {
        setMachineType();
      }
    }

    function bindModalEvents() {
      if (modalBound) return;
      modalBound = true;
      const els = getModalEls();
      if (els.closeBtn) {
        els.closeBtn.addEventListener("click", () => closeModal());
      }
      if (els.modal) {
        els.modal.addEventListener("click", (event) => {
          if (event.target === els.modal) {
            closeModal();
          }
        });
      }
      if (els.actions) {
        els.actions.addEventListener("click", handleActionClick);
      }
      if (els.body) {
        els.body.addEventListener("click", handleActionClick);
      }
    }

    function openModal(tx, ty, spectatingMode) {
      if (!Number.isInteger(tx) || !Number.isInteger(ty)) return;
      if (modalCtx && (modalCtx.tx !== tx || modalCtx.ty !== ty)) {
        closeModal();
      }
      let machine = getLocal(tx, ty);
      if (!machine) {
        machine = {
          ownerAccountId: String(get("getPlayerProfileId", "") || ""),
          ownerName: String(get("getPlayerName", "") || "").slice(0, 20),
          type: "reme_roulette",
          earningsLocks: 0,
          stats: normalizeStats({}),
          updatedAt: Date.now()
        };
        setLocal(tx, ty, machine);
      }
      seedOwner(tx, ty);
      renderModal(tx, ty, machine, Boolean(spectatingMode));
    }

    function isOpen() {
      const modal = get("getGambleModalEl", null);
      return Boolean(modalCtx && modal && !modal.classList.contains("hidden"));
    }

    function renderOpen() {
      if (!isOpen() || !modalCtx) return;
      const machine = getLocal(modalCtx.tx, modalCtx.ty);
      renderModal(modalCtx.tx, modalCtx.ty, machine, Boolean(modalCtx.spectating));
    }

    function interact(tx, ty) {
      const world = get("getWorld", null);
      const gambleId = Math.max(0, Math.floor(Number(get("getGambleId", 0)) || 0));
      if (!world || !world[ty] || world[ty][tx] !== gambleId) return;
      acquireMachineUsage(tx, ty).then((ok) => {
        if (ok) {
          openModal(tx, ty, false);
          return;
        }
        const current = getLocal(tx, ty);
        if (current && isUsedByOther(current)) {
          openModal(tx, ty, true);
        }
      });
    }

    function onPlaced(tx, ty) {
      setLocal(tx, ty, {
        ownerAccountId: String(get("getPlayerProfileId", "") || ""),
        ownerName: String(get("getPlayerName", "") || "").slice(0, 20),
        type: "reme_roulette",
        earningsLocks: 0,
        stats: normalizeStats({}),
        updatedAt: Date.now()
      });
      seedOwner(tx, ty);
    }

    function onBroken(tx, ty) {
      if (modalCtx && modalCtx.tx === tx && modalCtx.ty === ty) {
        closeModal();
      }
      setLocal(tx, ty, null);
    }

    return {
      bindModalEvents,
      normalizeRecord,
      setLocal,
      getLocal,
      clearAll,
      closeModal,
      openModal,
      isOpen,
      renderOpen,
      interact,
      seedOwner,
      onPlaced,
      onBroken
    };
  }

  const api = {
    MACHINE_DEFS,
    createController
  };
  const prev = window.GTModules.gamble;
  if (prev && typeof prev === "object") {
    window.GTModules.gamble = Object.assign({}, prev, api);
  } else {
    window.GTModules.gamble = api;
  }
  window.GTModules.gambling = window.GTModules.gamble;
})();
