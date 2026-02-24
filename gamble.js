window.GTModules = window.GTModules || {};

(function initGambleModule() {
  const MACHINE_DEFS = {
    reme_roulette: {
      id: "reme_roulette",
      name: "Reme Roulette (Player vs House)",
      minRoll: 0,
      maxRoll: 37,
      minBet: 1,
      maxBet: 300,
      tripleWinRolls: new Set([0, 19, 28])
    }
  };

  function createController(options) {
    const opts = options || {};
    const machines = new Map();
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
      modalCtx = null;
      const els = getModalEls();
      if (els.modal) els.modal.classList.add("hidden");
    }

    function sumDigits(value) {
      const safe = Math.max(0, Math.floor(Number(value) || 0));
      return Math.floor(safe / 10) + (safe % 10);
    }

    function getRemeFromRoll(roll) {
      const r = Math.max(0, Math.floor(Number(roll) || 0));
      if (r === 19 || r === 28) return 0;
      return sumDigits(r);
    }

    function evaluateSpin(def, playerRoll, houseRoll, bet) {
      const playerReme = getRemeFromRoll(playerRoll);
      const houseReme = getRemeFromRoll(houseRoll);
      const triple = def.tripleWinRolls.has(playerRoll);
      const tie = playerReme === houseReme;
      let multiplier = 0;
      let outcome = "lose";
      if (triple) {
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
        tie,
        multiplier,
        payoutWanted: Math.max(0, Math.floor((Number(bet) || 0) * multiplier)),
        outcome
      };
    }

    function canCollect(machine) {
      const pid = String(get("getPlayerProfileId", "") || "");
      return Boolean(machine && pid && machine.ownerAccountId === pid);
    }

    function getOutcomeLabel(outcome) {
      if (outcome === "triple") return "TRIPLE";
      if (outcome === "win") return "WIN";
      return "LOSE";
    }

    function renderModal(tx, ty, machine) {
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

      els.title.textContent = "Gambling Machine (" + tx + "," + ty + ")";
      els.body.innerHTML =
        "<div class='vending-section'>" +
          "<div class='vending-stat-grid'>" +
            "<div class='vending-stat'><span>Type</span><strong>" + esc(def.name) + "</strong></div>" +
            "<div class='vending-stat'><span>Owner</span><strong>@" + esc(ownerLabel) + "</strong></div>" +
            "<div class='vending-stat'><span>Machine Bank</span><strong>" + Math.max(0, Math.floor(m.earningsLocks || 0)) + " WL</strong></div>" +
            "<div class='vending-stat'><span>Plays</span><strong>" + stats.plays + "</strong></div>" +
            "<div class='vending-stat'><span>Total Bet In</span><strong>" + stats.totalBet + " WL</strong></div>" +
            "<div class='vending-stat'><span>Total Paid Out</span><strong>" + stats.totalPayout + " WL</strong></div>" +
          "</div>" +
        "</div>" +
        "<div class='vending-section'>" +
          "<div class='vending-section-title'>Play (Player vs House)</div>" +
          "<div class='vending-field-grid'>" +
            "<label class='vending-field'><span>Bet (World Locks)</span><input data-gamble-input='bet' type='number' min='" + def.minBet + "' max='" + def.maxBet + "' step='1' value='1'></label>" +
          "</div>" +
          "<div class='vending-auto-stock-note'>No number selection. You roll vs house roll (0-37). Higher reme wins.</div>" +
          "<div class='vending-auto-stock-note'>Tie = lose. Special rolls 0, 19, 28 give 3x.</div>" +
          "<div class='vending-auto-stock-note'>All bets go into machine bank. Payouts are paid from machine bank.</div>" +
        "</div>" +
        "<div class='vending-section'>" +
          "<div class='vending-section-title'>Last Result</div>" +
          "<div class='vending-stat-grid'>" +
            "<div class='vending-stat'><span>You</span><strong>" + (stats.plays ? (stats.lastPlayerRoll + " (" + stats.lastPlayerReme + ")") : "-") + "</strong></div>" +
            "<div class='vending-stat'><span>House</span><strong>" + (stats.plays ? (stats.lastHouseRoll + " (" + stats.lastHouseReme + ")") : "-") + "</strong></div>" +
            "<div class='vending-stat'><span>Outcome</span><strong>" + esc(stats.plays ? getOutcomeLabel(stats.lastOutcome) : "-") + "</strong></div>" +
            "<div class='vending-stat'><span>Multiplier</span><strong>" + (stats.plays ? (stats.lastMultiplier + "x") : "-") + "</strong></div>" +
          "</div>" +
        "</div>";

      if (ownerView) {
        els.actions.innerHTML =
          "<button data-gamble-act='spin'>Spin</button>" +
          "<button data-gamble-act='collect'" + (m.earningsLocks > 0 ? "" : " disabled") + ">Collect Earnings</button>" +
          "<button data-gamble-act='close'>Close</button>";
      } else {
        els.actions.innerHTML =
          "<button data-gamble-act='spin'>Spin</button>" +
          "<button data-gamble-act='close'>Close</button>";
      }

      modalCtx = { tx, ty };
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
      const afterBetBank = beforeBank + result.bet;
      const payout = Math.max(0, Math.floor(Number(result.payoutWanted) || 0));
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
        earningsLocks: Math.max(0, afterBetBank - payout),
        stats: nextStats,
        updatedAt: firebaseRef && firebaseRef.database ? firebaseRef.database.ServerValue.TIMESTAMP : Date.now()
      };
      return { next, payout };
    }

    function getOutcomeMessage(result, payout) {
      const playerText = "You " + result.playerRoll + " (" + result.playerReme + ")";
      const houseText = "House " + result.houseRoll + " (" + result.houseReme + ")";
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
      const bet = Math.max(def.minBet, Math.min(def.maxBet, Math.floor(Number(betInput && betInput.value) || 0)));
      const worldLockId = Math.max(0, Math.floor(Number(get("getWorldLockId", 0)) || 0));
      const inventory = get("getInventory", {}) || {};
      const haveLocal = Math.max(0, Math.floor(Number(inventory[worldLockId]) || 0));
      if (haveLocal < bet) {
        post("Not enough World Locks. Need " + bet + ".");
        return;
      }

      const playerRoll = Math.floor(Math.random() * (def.maxRoll - def.minRoll + 1)) + def.minRoll;
      const houseRoll = Math.floor(Math.random() * (def.maxRoll - def.minRoll + 1)) + def.minRoll;
      const result = evaluateSpin(def, playerRoll, houseRoll, bet);
      const network = get("getNetwork", null);
      const basePath = String(get("getBasePath", "") || "");
      const profileId = String(get("getPlayerProfileId", "") || "");
      const profileName = String(get("getPlayerName", "") || "").slice(0, 20);
      const firebaseRef = get("getFirebase", null);

      const finalizeLocal = () => {
        const current = getLocal(tx, ty) || machine;
        const beforeBank = Math.max(0, Math.floor(Number(current.earningsLocks) || 0));
        const afterBetBank = beforeBank + bet;
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
          earningsLocks: Math.max(0, afterBetBank - payout),
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

    function handleActionClick(event) {
      const target = event && event.target;
      if (!(target instanceof HTMLElement)) return;
      const action = String(target.dataset.gambleAct || "").trim();
      if (!action) return;
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
    }

    function openModal(tx, ty) {
      if (!Number.isInteger(tx) || !Number.isInteger(ty)) return;
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
      renderModal(tx, ty, machine);
    }

    function isOpen() {
      const modal = get("getGambleModalEl", null);
      return Boolean(modalCtx && modal && !modal.classList.contains("hidden"));
    }

    function renderOpen() {
      if (!isOpen() || !modalCtx) return;
      const machine = getLocal(modalCtx.tx, modalCtx.ty);
      renderModal(modalCtx.tx, modalCtx.ty, machine);
    }

    function interact(tx, ty) {
      const world = get("getWorld", null);
      const gambleId = Math.max(0, Math.floor(Number(get("getGambleId", 0)) || 0));
      if (!world || !world[ty] || world[ty][tx] !== gambleId) return;
      openModal(tx, ty);
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
      setLocal(tx, ty, null);
      if (modalCtx && modalCtx.tx === tx && modalCtx.ty === ty) {
        closeModal();
      }
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
