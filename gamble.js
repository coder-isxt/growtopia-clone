window.GTModules = window.GTModules || {};

(function initGambleModule() {
  const MACHINE_DEFS = {
    reme_roulette: {
      id: "gamble_machine",
      name: "Reme Roulette (0-37)",
      minRoll: 0,
      maxRoll: 37,
      minPick: 0,
      maxPick: 9,
      minBet: 1,
      maxBet: 300,
      tripleWinRolls: new Set([0, 19, 28])
    }
  };

  function createController(options) {
    const opts = options || {};
    const machines = new Map();
    let modalCtx = null;

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
        lastRoll: Math.max(0, Math.floor(Number(row.lastRoll) || 0)),
        lastReme: Math.max(0, Math.floor(Number(row.lastReme) || 0)),
        lastTarget: Math.max(0, Math.floor(Number(row.lastTarget) || 0)),
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

    function evaluateSpin(def, roll, target, bet) {
      const isTriple = def.tripleWinRolls.has(roll);
      const reme = sumDigits(roll);
      const isTie = !isTriple && reme > 9;
      let multiplier = 0;
      let outcome = "lose";
      if (isTriple) {
        multiplier = 3;
        outcome = "triple";
      } else if (!isTie && reme === target) {
        multiplier = 2;
        outcome = "win";
      }
      const payout = Math.max(0, Math.floor(bet * multiplier));
      return {
        roll,
        reme,
        target,
        bet,
        isTie,
        multiplier,
        payout,
        outcome
      };
    }

    function renderModal(tx, ty, machine) {
      const els = getModalEls();
      if (!els.modal || !els.title || !els.body || !els.actions) return;
      const m = machine || getLocal(tx, ty) || {
        ownerAccountId: "",
        ownerName: "",
        type: "reme_roulette",
        stats: normalizeStats({}),
        updatedAt: 0
      };
      const def = MACHINE_DEFS[m.type] || MACHINE_DEFS.reme_roulette;
      const stats = normalizeStats(m.stats);
      const ownerLabel = m.ownerName || "owner";
      const targetOptions = [];
      for (let i = def.minPick; i <= def.maxPick; i++) {
        targetOptions.push('<option value="' + i + '">' + i + '</option>');
      }

      els.title.textContent = "Gambling Machine (" + tx + "," + ty + ")";
      els.body.innerHTML =
        "<div class='vending-section'>" +
          "<div class='vending-stat-grid'>" +
            "<div class='vending-stat'><span>Type</span><strong>" + esc(def.name) + "</strong></div>" +
            "<div class='vending-stat'><span>Owner</span><strong>@" + esc(ownerLabel) + "</strong></div>" +
            "<div class='vending-stat'><span>Plays</span><strong>" + stats.plays + "</strong></div>" +
            "<div class='vending-stat'><span>Total Bet</span><strong>" + stats.totalBet + " WL</strong></div>" +
            "<div class='vending-stat'><span>Total Paid</span><strong>" + stats.totalPayout + " WL</strong></div>" +
          "</div>" +
        "</div>" +
        "<div class='vending-section'>" +
          "<div class='vending-section-title'>Play</div>" +
          "<div class='vending-field-grid'>" +
            "<label class='vending-field'><span>Pick Number (Reme)</span><select data-gamble-input='target'>" + targetOptions.join("") + "</select></label>" +
            "<label class='vending-field'><span>Bet (World Locks)</span><input data-gamble-input='bet' type='number' min='" + def.minBet + "' max='" + def.maxBet + "' step='1' value='1'></label>" +
          "</div>" +
          "<div class='vending-auto-stock-note'>Roll range: 0-37 | Reme = sum of digits (26 => 8). Tie = lose.</div>" +
          "<div class='vending-auto-stock-note'>Special rolls 0, 19 and 28 pay 3x.</div>" +
        "</div>" +
        "<div class='vending-section'>" +
          "<div class='vending-section-title'>Last Result</div>" +
          "<div class='vending-stat-grid'>" +
            "<div class='vending-stat'><span>Roll</span><strong>" + (stats.plays ? stats.lastRoll : "-") + "</strong></div>" +
            "<div class='vending-stat'><span>Reme</span><strong>" + (stats.plays ? stats.lastReme : "-") + "</strong></div>" +
            "<div class='vending-stat'><span>Pick</span><strong>" + (stats.plays ? stats.lastTarget : "-") + "</strong></div>" +
            "<div class='vending-stat'><span>Outcome</span><strong>" + esc(stats.plays ? (stats.lastOutcome || "-") : "-") + "</strong></div>" +
          "</div>" +
        "</div>";

      els.actions.innerHTML =
        "<button data-gamble-act='spin'>Spin</button>" +
        "<button data-gamble-act='close'>Close</button>";

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
          stats: normalizeStats({}),
          updatedAt: firebaseRef && firebaseRef.database ? firebaseRef.database.ServerValue.TIMESTAMP : Date.now()
        };
      }).catch(() => {});
    }

    function applyLocalSpinResult(result) {
      const worldLockId = Math.max(0, Math.floor(Number(get("getWorldLockId", 0)) || 0));
      const inventory = get("getInventory", {}) || {};
      const clampInventoryCount = opts.clampInventoryCount || ((value) => Math.max(0, Math.floor(Number(value) || 0)));
      inventory[worldLockId] = clampInventoryCount((inventory[worldLockId] || 0) - result.bet + result.payout);
      if (typeof opts.saveInventory === "function") opts.saveInventory();
      if (typeof opts.refreshToolbar === "function") opts.refreshToolbar(true);
    }

    function getOutcomeMessage(result) {
      if (result.outcome === "triple") {
        return "Roll " + result.roll + " hit a 3x roll. You won " + result.payout + " WL.";
      }
      if (result.outcome === "win") {
        return "Roll " + result.roll + " (reme " + result.reme + ") matched your pick " + result.target + ". You won " + result.payout + " WL.";
      }
      if (result.isTie) {
        return "Roll " + result.roll + " produced reme " + result.reme + " (tie). Tie = lose.";
      }
      return "Roll " + result.roll + " (reme " + result.reme + ") missed pick " + result.target + ". You lost " + result.bet + " WL.";
    }

    function updateMachineStatsLocal(tx, ty, result) {
      const key = getTileKey(tx, ty);
      const current = getLocal(tx, ty) || {
        ownerAccountId: String(get("getPlayerProfileId", "") || ""),
        ownerName: String(get("getPlayerName", "") || "").slice(0, 20),
        type: "reme_roulette",
        stats: normalizeStats({}),
        updatedAt: 0
      };
      const next = {
        ...current,
        stats: {
          ...normalizeStats(current.stats),
          plays: Math.max(0, Math.floor(Number(current.stats && current.stats.plays) || 0)) + 1,
          totalBet: Math.max(0, Math.floor(Number(current.stats && current.stats.totalBet) || 0)) + result.bet,
          totalPayout: Math.max(0, Math.floor(Number(current.stats && current.stats.totalPayout) || 0)) + result.payout,
          lastRoll: result.roll,
          lastReme: result.reme,
          lastTarget: result.target,
          lastMultiplier: result.multiplier,
          lastOutcome: result.outcome,
          lastPlayerName: String(get("getPlayerName", "") || "").slice(0, 20),
          lastAt: Date.now()
        },
        updatedAt: Date.now()
      };
      machines.set(key, next);
      return next;
    }

    function syncMachineStatsNetwork(tx, ty, result) {
      const ref = getMachineRef(tx, ty);
      const firebaseRef = get("getFirebase", null);
      const profileId = String(get("getPlayerProfileId", "") || "");
      const profileName = String(get("getPlayerName", "") || "").slice(0, 20);
      if (!ref) return Promise.resolve();
      return ref.transaction((currentRaw) => {
        const current = normalizeRecord(currentRaw) || {
          ownerAccountId: profileId,
          ownerName: profileName,
          type: "reme_roulette",
          stats: normalizeStats({}),
          updatedAt: 0
        };
        const stats = normalizeStats(current.stats);
        return {
          ownerAccountId: current.ownerAccountId || profileId,
          ownerName: current.ownerName || profileName,
          type: current.type || "reme_roulette",
          stats: {
            plays: stats.plays + 1,
            totalBet: stats.totalBet + result.bet,
            totalPayout: stats.totalPayout + result.payout,
            lastRoll: result.roll,
            lastReme: result.reme,
            lastTarget: result.target,
            lastMultiplier: result.multiplier,
            lastOutcome: result.outcome,
            lastPlayerName: profileName,
            lastAt: firebaseRef && firebaseRef.database ? firebaseRef.database.ServerValue.TIMESTAMP : Date.now()
          },
          updatedAt: firebaseRef && firebaseRef.database ? firebaseRef.database.ServerValue.TIMESTAMP : Date.now()
        };
      }).then((resultTxn) => {
        if (!resultTxn || !resultTxn.committed) return;
        const raw = resultTxn.snapshot && typeof resultTxn.snapshot.val === "function" ? resultTxn.snapshot.val() : null;
        setLocal(tx, ty, raw);
      }).catch(() => {});
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
        stats: normalizeStats({}),
        updatedAt: 0
      };
      const def = MACHINE_DEFS[machine.type] || MACHINE_DEFS.reme_roulette;
      const els = getModalEls();
      const targetInput = els.body ? els.body.querySelector("[data-gamble-input='target']") : null;
      const betInput = els.body ? els.body.querySelector("[data-gamble-input='bet']") : null;
      const target = Math.max(def.minPick, Math.min(def.maxPick, Math.floor(Number(targetInput && targetInput.value) || 0)));
      const bet = Math.max(def.minBet, Math.min(def.maxBet, Math.floor(Number(betInput && betInput.value) || 0)));
      const worldLockId = Math.max(0, Math.floor(Number(get("getWorldLockId", 0)) || 0));
      const inventory = get("getInventory", {}) || {};
      const haveLocal = Math.max(0, Math.floor(Number(inventory[worldLockId]) || 0));
      if (haveLocal < bet) {
        post("Not enough World Locks. Need " + bet + ".");
        return;
      }

      const roll = Math.floor(Math.random() * (def.maxRoll - def.minRoll + 1)) + def.minRoll;
      const result = evaluateSpin(def, roll, target, bet);
      const network = get("getNetwork", null);
      const basePath = String(get("getBasePath", "") || "");
      const profileId = String(get("getPlayerProfileId", "") || "");

      const finalizeLocal = () => {
        applyLocalSpinResult(result);
        updateMachineStatsLocal(tx, ty, result);
        renderModal(tx, ty, getLocal(tx, ty));
        post(getOutcomeMessage(result));
      };

      if (!network || !network.enabled || !network.db || !basePath || !profileId) {
        finalizeLocal();
        return;
      }

      const lockRef = network.db.ref(basePath + "/player-inventories/" + profileId + "/" + worldLockId);
      lockRef.transaction((current) => {
        const have = Math.max(0, Math.floor(Number(current) || 0));
        if (have < bet) return;
        return have - bet;
      }).then((deductResult) => {
        if (!deductResult.committed) {
          post("Not enough World Locks.");
          return Promise.resolve(false);
        }
        const payoutTxn = result.payout > 0
          ? lockRef.transaction((current) => Math.max(0, Math.floor(Number(current) || 0)) + result.payout)
          : Promise.resolve({ committed: true });
        return payoutTxn.then((payoutResult) => {
          if (result.payout > 0 && !payoutResult.committed) {
            post("Spin payout failed. Please try again.");
          }
          return syncMachineStatsNetwork(tx, ty, result).then(() => true);
        });
      }).then((ok) => {
        if (!ok) return;
        post(getOutcomeMessage(result));
        const latest = getLocal(tx, ty);
        if (latest) {
          renderModal(tx, ty, latest);
        }
      }).catch(() => {
        post("Spin failed.");
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
      }
    }

    let modalBound = false;
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
