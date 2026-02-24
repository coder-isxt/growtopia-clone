window.GTModules = window.GTModules || {};

(function initGambleModule() {
  const MACHINE_USE_TIMEOUT_MS = 120000;
  const slotsModule = (window.GTModules && window.GTModules.slots) || {};
  const slotsDef = (typeof slotsModule.getDefinition === "function" ? slotsModule.getDefinition() : null) || {};

  const MACHINE_DEFS = {
    reme_roulette: {
      id: "reme_roulette",
      name: "Reme Roulette",
      minRoll: 0,
      maxRoll: 37,
      minBet: 1,
      maxBet: 30000,
      maxPayoutMultiplier: 3,
      tripleWinRolls: new Set([0, 19, 28, 37]),
      houseAutoLoseRolls: new Set([0, 19, 28, 37])
    },
    blackjack: {
      id: "blackjack",
      name: "Blackjack",
      minBet: 1,
      maxBet: 30000,
      maxPayoutMultiplier: 3
    },
    slots: {
      id: "slots",
      name: String(slotsDef.name || "Slots"),
      minBet: Math.max(1, Math.floor(Number(slotsDef.minBet) || 1)),
      maxBet: Math.max(1, Math.floor(Number(slotsDef.maxBet) || 30000)),
      maxPayoutMultiplier: Math.max(1, Math.floor(Number(slotsDef.maxPayoutMultiplier) || 10))
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
        lastSlotsText: String(row.lastSlotsText || "").slice(0, 80),
        lastSlotsSummary: String(row.lastSlotsSummary || "").slice(0, 80),
        lastPlayerName: String(row.lastPlayerName || "").slice(0, 20),
        lastAt: Number(row.lastAt) || 0
      };
    }

    function normalizeRecord(value) {
      if (!value || typeof value !== "object") return null;
      const typeId = String(value.type || "reme_roulette");
      const def = MACHINE_DEFS[typeId] || MACHINE_DEFS.reme_roulette;
      const blackjackRound = normalizeBlackjackRound(value.blackjackRound);
      const maxBetRaw = Math.floor(Number(value.maxBet));
      const maxBet = Math.max(def.minBet, Math.min(def.maxBet, Number.isFinite(maxBetRaw) ? maxBetRaw : def.maxBet));
      return {
        ownerAccountId: String(value.ownerAccountId || ""),
        ownerName: String(value.ownerName || "").slice(0, 20),
        type: def.id,
        maxBet,
        earningsLocks: Math.max(0, Math.floor(Number(value.earningsLocks) || 0)),
        inUseAccountId: String(value.inUseAccountId || ""),
        inUseSessionId: String(value.inUseSessionId || ""),
        inUseName: String(value.inUseName || "").slice(0, 20),
        inUseAt: Math.max(0, Math.floor(Number(value.inUseAt) || 0)),
        stats: normalizeStats(value.stats),
        blackjackRound: def.id === "blackjack" ? blackjackRound : null,
        updatedAt: Number(value.updatedAt) || 0
      };
    }

    function setLocal(tx, ty, value) {
      const key = getTileKey(tx, ty);
      const normalized = normalizeRecord(value);
      if (!normalized) {
        machines.delete(key);
        if (modalCtx && modalCtx.tx === tx && modalCtx.ty === ty) {
          closeModal();
        }
        return;
      }
      machines.set(key, normalized);
      if (modalCtx && modalCtx.tx === tx && modalCtx.ty === ty) {
        renderOpen();
      }
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

    function evaluateSlots(def, bet) {
      const safeBet = Math.max(1, Math.floor(Number(bet) || 1));
      if (slotsModule && typeof slotsModule.spin === "function") {
        const raw = slotsModule.spin(safeBet) || {};
        const reels = Array.isArray(raw.reels) ? raw.reels.map((r) => String(r || "?")).slice(0, 3) : ["?", "?", "?"];
        const multiplier = Math.max(0, Number(raw.multiplier) || 0);
        const outcome = String(raw.outcome || (multiplier > 0 ? "win" : "lose")).slice(0, 16);
        const payoutWanted = Math.max(0, Math.floor(Number(raw.payoutWanted) || (safeBet * multiplier)));
        return {
          bet: safeBet,
          playerRoll: 0,
          houseRoll: 0,
          playerReme: 0,
          houseReme: 0,
          houseAutoLose: false,
          tie: false,
          reels,
          slotsSummary: String(raw.summary || "").slice(0, 80),
          multiplier,
          payoutWanted,
          outcome,
          gameType: "slots"
        };
      }
      return {
        bet: safeBet,
        playerRoll: 0,
        houseRoll: 0,
        playerReme: 0,
        houseReme: 0,
        houseAutoLose: false,
        tie: false,
        reels: ["?", "?", "?"],
        slotsSummary: "Module unavailable",
        multiplier: 0,
        payoutWanted: 0,
        outcome: "lose",
        gameType: "slots"
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

    function scoreHandDetail(cards) {
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
      return {
        total,
        isBlackjack: arr.length === 2 && total === 21
      };
    }

    function scoreHand(cards) {
      return scoreHandDetail(cards).total;
    }

    function formatHand(cards, total, hideSecondCard) {
      const arr = Array.isArray(cards) ? cards : [];
      const labels = arr.map((c, i) => (hideSecondCard && i === 1 ? "?" : getCardLabel(c))).join(" ");
      return labels + " (" + Math.max(0, Math.floor(Number(total) || 0)) + ")";
    }

    function sanitizeCardList(cards) {
      const arr = Array.isArray(cards) ? cards : [];
      const out = [];
      for (let i = 0; i < arr.length; i++) {
        out.push(Math.max(1, Math.min(13, Math.floor(Number(arr[i]) || 1))));
      }
      return out;
    }

    function normalizeBlackjackRound(value) {
      if (!value || typeof value !== "object") return null;
      const handsRaw = Array.isArray(value.hands) ? value.hands : [];
      if (!handsRaw.length) return null;
      const hands = handsRaw.map((handRaw) => {
        const handCards = sanitizeCardList(handRaw && handRaw.cards);
        return {
          cards: handCards,
          bet: Math.max(1, Math.floor(Number(handRaw && handRaw.bet) || 1)),
          fromSplit: Boolean(handRaw && handRaw.fromSplit),
          doubled: Boolean(handRaw && handRaw.doubled),
          done: Boolean(handRaw && handRaw.done),
          outcome: String(handRaw && handRaw.outcome || "").slice(0, 16),
          payout: Math.max(0, Math.floor(Number(handRaw && handRaw.payout) || 0))
        };
      });
      return {
        active: Boolean(value.active),
        playerAccountId: String(value.playerAccountId || ""),
        playerName: String(value.playerName || "").slice(0, 20),
        startedAt: Math.max(0, Math.floor(Number(value.startedAt) || 0)),
        dealerCards: sanitizeCardList(value.dealerCards),
        hands,
        activeHand: Math.max(0, Math.floor(Number(value.activeHand) || 0)),
        dealerDone: Boolean(value.dealerDone),
        resolved: Boolean(value.resolved),
        aggregateOutcome: String(value.aggregateOutcome || "").slice(0, 16),
        totalPayout: Math.max(0, Math.floor(Number(value.totalPayout) || 0)),
        summary: String(value.summary || "").slice(0, 220)
      };
    }

    function getBlackjackCoverageRequired(round) {
      const r = normalizeBlackjackRound(round);
      if (!r) return 0;
      let totalBet = 0;
      for (let i = 0; i < r.hands.length; i++) {
        totalBet += Math.max(1, Math.floor(Number(r.hands[i].bet) || 1));
      }
      return totalBet * 3;
    }

    function firstOpenBlackjackHand(round) {
      const r = normalizeBlackjackRound(round);
      if (!r) return -1;
      for (let i = 0; i < r.hands.length; i++) {
        if (!r.hands[i].done) return i;
      }
      return -1;
    }

    function canSplitHand(hand) {
      if (!hand || !Array.isArray(hand.cards) || hand.cards.length !== 2) return false;
      return getCardValue(hand.cards[0]) === getCardValue(hand.cards[1]);
    }

    function finishBlackjackRound(round) {
      const r = normalizeBlackjackRound(round);
      if (!r) return null;
      const dealerCards = sanitizeCardList(r.dealerCards);
      while (scoreHand(dealerCards) < 17) {
        dealerCards.push(drawCard());
      }
      const dealerScore = scoreHandDetail(dealerCards);
      const dealerBust = dealerScore.total > 21;
      const dealerBlackjack = dealerScore.isBlackjack;
      let totalPayout = 0;
      let summaryWins = 0;
      let summaryPush = 0;
      const outHands = r.hands.map((hand) => {
        const detail = scoreHandDetail(hand.cards);
        const bet = Math.max(1, Math.floor(Number(hand.bet) || 1));
        let payout = 0;
        let outcome = "lose";
        if (detail.total > 21) {
          payout = 0;
          outcome = "bust";
        } else if (detail.isBlackjack && !hand.fromSplit && !dealerBlackjack) {
          payout = Math.max(0, Math.floor(bet * 2.5));
          outcome = "blackjack";
          summaryWins += 1;
        } else if (dealerBust) {
          payout = bet * 2;
          outcome = "win";
          summaryWins += 1;
        } else if (dealerBlackjack && !(detail.isBlackjack && !hand.fromSplit)) {
          payout = 0;
          outcome = "lose";
        } else if (detail.total > dealerScore.total) {
          payout = bet * 2;
          outcome = "win";
          summaryWins += 1;
        } else if (detail.total === dealerScore.total) {
          payout = bet;
          outcome = "push";
          summaryPush += 1;
        } else {
          payout = 0;
          outcome = "lose";
        }
        totalPayout += payout;
        return {
          ...hand,
          done: true,
          outcome,
          payout
        };
      });
      const aggregateOutcome = summaryWins > 0
        ? (outHands.some((h) => h.outcome === "blackjack") ? "blackjack" : "win")
        : (summaryPush > 0 ? "push" : "lose");
      return {
        ...r,
        active: false,
        dealerCards,
        dealerDone: true,
        resolved: true,
        activeHand: -1,
        hands: outHands,
        totalPayout,
        summary: "Dealer " + formatHand(dealerCards, dealerScore.total, false) + ".",
        aggregateOutcome,
        dealerTotal: dealerScore.total
      };
    }

    function canCollect(machine) {
      const pid = String(get("getPlayerProfileId", "") || "");
      return Boolean(machine && pid && machine.ownerAccountId === pid);
    }

    function canEditMachineMaxBet(machine) {
      if (!canCollect(machine)) return false;
      const isLocked = Boolean(get("isWorldLocked", false));
      if (!isLocked) return true;
      const isOwner = Boolean(get("isWorldLockOwner", false));
      if (isOwner) return true;
      const isAdmin = Boolean(get("isWorldLockAdmin", false));
      if (isAdmin) return false;
      return true;
    }

    function canBreakAt(tx, ty) {
      const machine = getLocal(tx, ty);
      if (!machine) return false;
      return canCollect(machine);
    }

    function getCurrencyIds() {
      const worldLockId = Math.max(0, Math.floor(Number(get("getWorldLockId", 0)) || 0));
      const obsidianLockId = Math.max(0, Math.floor(Number(get("getObsidianLockId", 0)) || 0));
      return { worldLockId, obsidianLockId };
    }

    function getTotalLocks(inv) {
      const { worldLockId, obsidianLockId } = getCurrencyIds();
      const wl = Math.max(0, Math.floor(Number(inv && inv[worldLockId]) || 0));
      const ob = Math.max(0, Math.floor(Number(inv && inv[obsidianLockId]) || 0));
      return wl + (ob * 100);
    }

    function setCanonicalLocks(inv, totalLocks) {
      const { worldLockId, obsidianLockId } = getCurrencyIds();
      const total = Math.max(0, Math.floor(Number(totalLocks) || 0));
      inv[worldLockId] = total % 100;
      if (obsidianLockId > 0) inv[obsidianLockId] = Math.floor(total / 100);
    }

    function spendLocksLocal(inv, amount) {
      const cost = Math.max(0, Math.floor(Number(amount) || 0));
      const total = getTotalLocks(inv);
      if (total < cost) return false;
      setCanonicalLocks(inv, total - cost);
      return true;
    }

    function addLocksLocal(inv, amount) {
      const total = getTotalLocks(inv) + Math.max(0, Math.floor(Number(amount) || 0));
      setCanonicalLocks(inv, total);
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

    function getMachineMaxBetCap(machine, def) {
      const safeDef = def || MACHINE_DEFS.reme_roulette;
      const raw = Math.floor(Number(machine && machine.maxBet));
      const fallback = Math.floor(Number(safeDef.maxBet) || 300);
      return Math.max(safeDef.minBet, Math.min(safeDef.maxBet, Number.isFinite(raw) ? raw : fallback));
    }

    function getMaxBetByBank(bank, def, maxCap) {
      const safeBank = Math.max(0, Math.floor(Number(bank) || 0));
      const coverage = Math.max(1, Math.floor(Number(def && def.maxPayoutMultiplier) || 3));
      const byBank = Math.floor(safeBank / coverage);
      const cap = Math.max(1, Math.floor(Number(maxCap) || Math.floor(Number(def && def.maxBet) || 300)));
      return Math.max(0, Math.min(cap, byBank));
    }

    function getOutcomeLabel(outcome) {
      if (outcome === "blackjack") return "BLACKJACK";
      if (outcome === "jackpot") return "JACKPOT";
      if (outcome === "push") return "PUSH";
      if (outcome === "house_roll") return "HOUSE SPECIAL";
      if (outcome === "triple") return "TRIPLE";
      if (outcome === "bust") return "BUST";
      if (outcome === "win") return "WIN";
      return "LOSE";
    }

    function getOutcomeTone(outcome) {
      const key = String(outcome || "").toLowerCase();
      if (key === "jackpot" || key === "blackjack" || key === "win" || key === "triple") return "win";
      if (key === "push") return "push";
      if (key === "bust" || key === "house_roll" || key === "lose") return "lose";
      return "info";
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
      const canEditMaxBet = canEditMachineMaxBet(m);
      const spectating = Boolean(spectatingMode);
      const bank = Math.max(0, Math.floor(Number(m.earningsLocks) || 0));
      const machineMaxCap = getMachineMaxBetCap(m, def);
      const maxBetByBank = getMaxBetByBank(bank, def, machineMaxCap);
      const canSpin = maxBetByBank >= def.minBet;
      const blockedByActiveUser = isUsedByOther(m);
      const canPlayNow = canSpin && !blockedByActiveUser && !spectating;
      const inventory = get("getInventory", {}) || {};
      const playerLocks = getTotalLocks(inventory);
      const maxBetByPlayer = Math.max(0, Math.min(machineMaxCap, playerLocks));
      const maxBetEffective = Math.max(0, Math.min(maxBetByBank, maxBetByPlayer));
      const tileKey = getTileKey(tx, ty);
      const rememberedBet = Math.max(def.minBet, Math.floor(Number(lastBetByTile.get(tileKey)) || def.minBet));
      const displayBet = canSpin
        ? Math.max(def.minBet, Math.min(maxBetByBank, rememberedBet))
        : def.minBet;
      const coverageMult = Math.max(1, Math.floor(Number(def.maxPayoutMultiplier) || 3));
      const selfAccountId = getSelfAccountId();
      const round = def.id === "blackjack" ? normalizeBlackjackRound(m.blackjackRound) : null;
      const roundActive = Boolean(round && round.active && !round.resolved);
      const roundPlayer = roundActive && round ? round.playerAccountId : "";
      const isRoundPlayer = Boolean(roundActive && roundPlayer && roundPlayer === selfAccountId);
      const canActRound = roundActive && isRoundPlayer && !spectating;
      const activeHandIndex = roundActive && round ? Math.max(0, Math.floor(Number(round.activeHand) || 0)) : -1;
      const activeHand = (roundActive && round && round.hands[activeHandIndex]) ? round.hands[activeHandIndex] : null;
      const canSplit = Boolean(canActRound && activeHand && !activeHand.done && canSplitHand(activeHand) && round.hands.length === 1);
      const canDouble = Boolean(canActRound && activeHand && !activeHand.done && !activeHand.doubled && Array.isArray(activeHand.cards) && activeHand.cards.length === 2);
      let blackjackStateHtml = "";
      if (def.id === "blackjack") {
        if (round) {
          const dealerTotalShown = roundActive
            ? scoreHand([round.dealerCards[0] || 1])
            : scoreHand(round.dealerCards);
          const dealerText = formatHand(round.dealerCards, dealerTotalShown, roundActive);
          let handsHtml = "";
          for (let i = 0; i < round.hands.length; i++) {
            const hand = round.hands[i];
            const handDetail = scoreHandDetail(hand.cards);
            const handTotal = handDetail.total;
            const handTitle = "Hand " + (i + 1);
            const tag = hand.done ? (hand.outcome ? getOutcomeLabel(hand.outcome) : "DONE") : (i === activeHandIndex ? "ACTIVE" : "WAIT");
            const tone = hand.done ? getOutcomeTone(hand.outcome) : (i === activeHandIndex ? "turn" : "info");
            const rowClass = "vending-stat bj-stat bj-stat-" + tone + (i === activeHandIndex ? " active" : "");
            handsHtml +=
              "<div class='" + rowClass + "'>" +
                "<span>" + esc(handTitle) + " - " + esc(tag) + "</span>" +
                "<strong>" + esc(formatHand(hand.cards, handTotal, false)) + "</strong>" +
                "<div class='bj-hand-meta'>Bet " + hand.bet + " WL" + (handDetail.isBlackjack ? " | Natural 21" : "") + "</div>" +
              "</div>";
          }
          let bannerClass = "bj-banner bj-banner-info";
          let bannerText = "Blackjack ready.";
          if (roundActive) {
            bannerClass = isRoundPlayer ? "bj-banner bj-banner-turn" : "bj-banner bj-banner-wait";
            bannerText = isRoundPlayer
              ? "Your turn: choose Hit / Stand / Double / Split."
              : ("Round in progress by @" + esc(round.playerName || "player") + ".");
          } else {
            const tone = getOutcomeTone(round.aggregateOutcome || stats.lastOutcome || "");
            bannerClass = "bj-banner bj-banner-" + tone;
            bannerText = "Round finished: " + esc(getOutcomeLabel(round.aggregateOutcome || stats.lastOutcome || "lose")) + ".";
            if (round.summary) {
              bannerText += " " + esc(round.summary);
            }
          }
          blackjackStateHtml =
            "<div class='vending-section'>" +
              "<div class='vending-section-title'>Blackjack Round</div>" +
              "<div class='" + bannerClass + "'>" + bannerText + "</div>" +
              "<div class='vending-stat-grid'>" +
                "<div class='vending-stat'><span>Player</span><strong>@" + esc(round.playerName || "player") + "</strong></div>" +
                "<div class='vending-stat'><span>Dealer</span><strong>" + esc(dealerText) + "</strong></div>" +
                "<div class='vending-stat'><span>Round State</span><strong>" + esc(roundActive ? "In Progress" : "Finished") + "</strong></div>" +
                "<div class='vending-stat'><span>Your Access</span><strong>" + esc(isRoundPlayer ? "You are playing" : "Spectating") + "</strong></div>" +
                handsHtml +
              "</div>" +
            "</div>";
        } else {
          blackjackStateHtml =
            "<div class='vending-section'>" +
              "<div class='vending-section-title'>Blackjack Round</div>" +
              "<div class='bj-banner bj-banner-info'>No active round. Press Deal to start.</div>" +
            "</div>";
        }
      }

      els.title.textContent = "Gambling Machine";
      els.body.innerHTML =
        "<div class='vending-section'>" +
          "<div class='vending-stat-grid'>" +
            "<div class='vending-stat'><span>Type</span><strong>" + esc(def.name) + "</strong></div>" +
            "<div class='vending-stat'><span>Owner</span><strong>@" + esc(ownerLabel) + "</strong></div>" +
            "<div class='vending-stat'><span>Machine Bank</span><strong>" + bank + " WL</strong></div>" +
            "<div class='vending-stat'><span>Max Bet</span><strong>" + (canSpin ? maxBetByBank : 0) + " WL</strong></div>" +
            //"<div class='vending-stat'><span>In Use</span><strong>" + (m.inUseAccountId && !isUsageStale(m) ? ("@" + esc(m.inUseName || "player")) : "No") + "</strong></div>" +
            // "<div class='vending-stat'><span>Plays</span><strong>" + stats.plays + "</strong></div>" +
            "<div class='vending-stat'><span>Total Bets Placed</span><strong>" + stats.totalBet + " WL</strong></div>" +
            "<div class='vending-stat'><span>Last Player</span><strong>" + (stats.lastPlayerName ? ("@" + esc(stats.lastPlayerName)) : "-") + "</strong></div>" +
            // "<div class='vending-stat'><span>Total Paid Out</span><strong>" + stats.totalPayout + " WL</strong></div>" +
          "</div>" +
        "</div>" +
        (canEditMaxBet
          ? ("<div class='vending-section'>" +
              "<div class='vending-section-title'>Machine Settings</div>" +
              "<div class='vending-field-grid'>" +
                "<label class='vending-field'><span>Max Bet</span><input data-gamble-input='maxbet' type='number' min='" + def.minBet + "' max='" + def.maxBet + "' step='1' value='" + machineMaxCap + "'></label>" +
                "<div class='vending-field'><span>&nbsp;</span><button type='button' data-gamble-act='setmax'>Save Max Bet</button></div>" +
              "</div>" +
            "</div>")
          : "") +
        "<div class='vending-section'>" +
          "<div class='vending-section-title'>Play (" + (def.id === "blackjack" ? "Blackjack" : (def.id === "slots" ? "Slots" : "Player vs House")) + ")</div>" +
          "<div class='vending-field-grid'>" +
            "<label class='vending-field'><span>Bet (World Locks)</span><input data-gamble-input='bet' type='number' min='" + def.minBet + "' max='" + (canSpin ? maxBetByBank : def.minBet) + "' step='1' value='" + displayBet + "'" + (canPlayNow && !roundActive ? "" : " disabled") + "></label>" +
            "<div class='vending-field'><span>&nbsp;</span><button type='button' data-gamble-act='maxbet'" + ((canPlayNow && maxBetEffective > 0 && !roundActive) ? "" : " disabled") + ">Apply Max Bet</button></div>" +
          "</div>" +
          (def.id === "blackjack"
            ? ("<div class='vending-auto-stock-note'>You: Hit, Stand, Double, Split. Dealer hits to 17+ and stands on 17.</div>" +
              "<div class='vending-auto-stock-note'>Blackjack pays 3:2 (floor), win pays 2x, push returns bet.</div>")
            : (def.id === "slots"
              ? ("<div class='vending-auto-stock-note'>3-reel slots. Triple seven = jackpot (10x).</div>" +
                "<div class='vending-auto-stock-note'>Triple bar = 6x, other triples = 4x, double seven = 3x, any pair = 2x.</div>")
              : ("<div class='vending-auto-stock-note'>No number selection. You roll vs house roll (0-37). Higher reme wins.</div>" +
                "<div class='vending-auto-stock-note'>Tie = lose. Special player rolls 0, 19, 28 give 3x.</div>" +
                "<div class='vending-auto-stock-note'>If house rolls 0, 19, 28 or 37, player auto-loses.</div>"))) +
          "<div class='vending-auto-stock-note'>All lost bets go into machine bank. Wins are paid from machine bank.</div>" +
          "<div class='vending-auto-stock-note'>Required bank >= " + coverageMult + "x bet. With 12 WL bank, max bet is " + Math.floor(12 / coverageMult) + " WL.</div>" +
          (spectating ? "<div class='vending-auto-stock-note'>Spectating live: read-only.</div>" : "") +
          (blockedByActiveUser && !spectating ? "<div class='vending-auto-stock-note'>Machine is currently in use by @" + esc(m.inUseName || "another player") + ".</div>" : "") +
        "</div>" +
        blackjackStateHtml +
        (def.id === "blackjack"
          ? ""
          : ("<div class='vending-section'>" +
              "<div class='vending-section-title'>Last Result</div>" +
              (stats.plays
                ? ("<div class='bj-banner bj-banner-" + getOutcomeTone(stats.lastOutcome) + "'>Last round: " + esc(getOutcomeLabel(stats.lastOutcome)) + "</div>")
                : "") +
              "<div class='vending-stat-grid'>" +
                (def.id === "slots"
                  ? ("<div class='vending-stat'><span>Reels</span><strong>" + (stats.plays ? esc(stats.lastSlotsText || "-") : "-") + "</strong></div>" +
                    "<div class='vending-stat'><span>Result</span><strong>" + (stats.plays ? esc(stats.lastSlotsSummary || "-") : "-") + "</strong></div>")
                  : ("<div class='vending-stat'><span>You</span><strong>" + (stats.plays ? esc(stats.lastPlayerRoll + " (" + stats.lastPlayerReme + ")") : "-") + "</strong></div>" +
                    "<div class='vending-stat'><span>House</span><strong>" + (stats.plays ? esc(stats.lastHouseRoll + " (" + stats.lastHouseReme + ")") : "-") + "</strong></div>")) +
                "<div class='vending-stat'><span>Outcome</span><strong>" + esc(stats.plays ? getOutcomeLabel(stats.lastOutcome) : "-") + "</strong></div>" +
                "<div class='vending-stat'><span>Multiplier</span><strong>" + (stats.plays ? (stats.lastMultiplier + "x") : "-") + "</strong></div>" +
              "</div>" +
            "</div>"));

      if (def.id === "blackjack" && roundActive) {
        els.actions.innerHTML =
          "<button data-gamble-act='spin' disabled>Deal</button>" +
          "<button data-gamble-act='bj-hit'" + (canActRound ? "" : " disabled") + ">Hit</button>" +
          "<button data-gamble-act='bj-stand'" + (canActRound ? "" : " disabled") + ">Stand</button>" +
          "<button data-gamble-act='bj-double'" + (canDouble ? "" : " disabled") + ">Double</button>" +
          "<button data-gamble-act='bj-split'" + (canSplit ? "" : " disabled") + ">Split</button>" +
          "<button data-gamble-act='close'>Close</button>";
      } else {
        els.actions.innerHTML =
          "<button data-gamble-act='spin'" + (canPlayNow && !roundActive ? "" : " disabled") + ">" + (def.id === "blackjack" ? "Deal" : "Spin") + "</button>" +
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
          type: "slots",
          maxBet: MACHINE_DEFS.slots.maxBet,
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
      nextStats.lastSlotsText = Array.isArray(result.reels) ? result.reels.join(" | ") : "";
      nextStats.lastSlotsSummary = String(result.slotsSummary || "").slice(0, 80);
      nextStats.lastPlayerName = playerName;
      nextStats.lastAt = firebaseRef && firebaseRef.database ? firebaseRef.database.ServerValue.TIMESTAMP : Date.now();
      const next = {
        ownerAccountId: current.ownerAccountId,
        ownerName: current.ownerName,
        type: current.type || "reme_roulette",
        maxBet: current.maxBet,
        earningsLocks: nextBank,
        stats: nextStats,
        updatedAt: firebaseRef && firebaseRef.database ? firebaseRef.database.ServerValue.TIMESTAMP : Date.now()
      };
      return { next, payout };
    }

    function getOutcomeMessage(result, payout) {
      if (result.gameType === "blackjack") {
        if (result.summaryText) return result.summaryText;
        if (result.outcome === "blackjack") return "BLACKJACK. Won " + payout + " WL.";
        if (result.outcome === "win") return "WIN. Won " + payout + " WL.";
        if (result.outcome === "push") return "PUSH. Bet returned (" + payout + " WL).";
        return "LOSE. Lost " + result.bet + " WL.";
      }
      if (result.gameType === "slots") {
        const reels = Array.isArray(result.reels) ? result.reels.join(" | ") : "? | ? | ?";
        if (result.outcome === "jackpot") {
          return "SLOTS " + reels + ": JACKPOT. Won " + payout + " WL.";
        }
        if (result.multiplier > 0) {
          return "SLOTS " + reels + ": WIN " + result.multiplier + "x. Won " + payout + " WL.";
        }
        return "SLOTS " + reels + ": LOSE. Lost " + result.bet + " WL.";
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

    function getBlackjackResultFromResolvedRound(round) {
      const r = normalizeBlackjackRound(round);
      if (!r) return null;
      const dealerTotal = scoreHand(r.dealerCards);
      let bestPlayer = 0;
      let totalBet = 0;
      for (let i = 0; i < r.hands.length; i++) {
        const hand = r.hands[i];
        const total = scoreHand(hand.cards);
        if (total <= 21 && total > bestPlayer) bestPlayer = total;
        totalBet += Math.max(1, Math.floor(Number(hand.bet) || 1));
      }
      const payout = Math.max(0, Math.floor(Number(r.totalPayout) || 0));
      const totalHands = r.hands.length;
      const winHands = r.hands.filter((h) => h.outcome === "win" || h.outcome === "blackjack").length;
      const pushHands = r.hands.filter((h) => h.outcome === "push").length;
      const loseHands = Math.max(0, totalHands - winHands - pushHands);
      return {
        gameType: "blackjack",
        bet: totalBet,
        payoutWanted: payout,
        payout,
        outcome: r.aggregateOutcome || (payout > totalBet ? "win" : (payout === totalBet ? "push" : "lose")),
        playerRoll: bestPlayer,
        houseRoll: dealerTotal,
        playerReme: 0,
        houseReme: 0,
        multiplier: totalBet > 0 ? Number((payout / totalBet).toFixed(2)) : 0,
        summaryText: "Dealer " + dealerTotal + ". Hands: " + winHands + "W/" + pushHands + "P/" + loseHands + "L. Payout " + payout + " WL."
      };
    }

    function startBlackjackRoundSnapshot(currentRaw, bet, playerId, playerName) {
      const current = normalizeRecord(currentRaw) || {
        ownerAccountId: String(get("getPlayerProfileId", "") || ""),
        ownerName: String(get("getPlayerName", "") || "").slice(0, 20),
        type: "blackjack",
        earningsLocks: 0,
        stats: normalizeStats({}),
        updatedAt: 0
      };
      const def = MACHINE_DEFS.blackjack;
      const beforeBank = Math.max(0, Math.floor(Number(current.earningsLocks) || 0));
      const safeBet = Math.max(def.minBet, Math.floor(Number(bet) || def.minBet));
      if (beforeBank < safeBet * 3) return null;
      const existing = normalizeBlackjackRound(current.blackjackRound);
      if (existing && existing.active && !existing.resolved) return null;
      const playerCards = [drawCard(), drawCard()];
      const dealerCards = [drawCard(), drawCard()];
      const round = normalizeBlackjackRound({
        active: true,
        playerAccountId: String(playerId || ""),
        playerName: String(playerName || "").slice(0, 20),
        startedAt: Date.now(),
        dealerCards,
        hands: [{
          cards: playerCards,
          bet: safeBet,
          fromSplit: false,
          doubled: false,
          done: false
        }],
        activeHand: 0,
        dealerDone: false,
        resolved: false,
        totalPayout: 0
      });
      const openingHand = round && round.hands[0] ? round.hands[0] : null;
      if (!round || !openingHand) return null;
      const playerOpening = scoreHandDetail(openingHand.cards);
      const dealerOpening = scoreHandDetail(round.dealerCards);
      let finalRound = round;
      if (playerOpening.isBlackjack || dealerOpening.isBlackjack) {
        openingHand.done = true;
        finalRound = finishBlackjackRound(round);
      }
      const resolved = Boolean(finalRound && finalRound.resolved);
      const resolvedResult = resolved ? getBlackjackResultFromResolvedRound(finalRound) : null;
      const resolvedPayout = Math.max(0, Math.floor(Number(resolvedResult && resolvedResult.payout) || 0));
      const nextStats = normalizeStats(current.stats);
      if (resolved && resolvedResult) {
        nextStats.plays += 1;
        nextStats.totalBet += resolvedResult.bet;
        nextStats.totalPayout += resolvedPayout;
        nextStats.lastPlayerRoll = resolvedResult.playerRoll;
        nextStats.lastHouseRoll = resolvedResult.houseRoll;
        nextStats.lastPlayerReme = 0;
        nextStats.lastHouseReme = 0;
        nextStats.lastMultiplier = resolvedResult.multiplier;
        nextStats.lastOutcome = resolvedResult.outcome;
        nextStats.lastPlayerName = String(playerName || "").slice(0, 20);
        nextStats.lastAt = Date.now();
      }
      return {
        next: {
          ...current,
          type: "blackjack",
          earningsLocks: Math.max(0, beforeBank + safeBet - resolvedPayout),
          blackjackRound: finalRound,
          stats: nextStats,
          updatedAt: Date.now()
        },
        bet: safeBet,
        resolved,
        result: resolvedResult,
        payout: resolvedPayout
      };
    }

    function applyBlackjackActionToMachine(currentRaw, action, actorAccountId) {
      const current = normalizeRecord(currentRaw);
      if (!current || current.type !== "blackjack") return { kind: "error", code: "invalid_machine" };
      const round = normalizeBlackjackRound(current.blackjackRound);
      if (!round || !round.active || round.resolved) return { kind: "error", code: "no_round" };
      if (round.playerAccountId !== actorAccountId) return { kind: "error", code: "not_your_round" };
      const handIndex = Math.max(0, Math.floor(Number(round.activeHand) || 0));
      const hand = round.hands[handIndex];
      if (!hand || hand.done) return { kind: "error", code: "hand_done" };

      const nextRound = normalizeBlackjackRound(round);
      if (!nextRound) return { kind: "error", code: "invalid_round" };
      const nextHand = nextRound.hands[handIndex];
      let extraBet = 0;

      if (action === "hit") {
        nextHand.cards.push(drawCard());
        const detail = scoreHandDetail(nextHand.cards);
        if (detail.total >= 21) nextHand.done = true;
      } else if (action === "stand") {
        nextHand.done = true;
      } else if (action === "double") {
        if (nextHand.doubled || nextHand.cards.length !== 2) return { kind: "error", code: "cannot_double" };
        nextHand.bet = Math.max(1, Math.floor(Number(nextHand.bet) || 1)) * 2;
        nextHand.doubled = true;
        extraBet = Math.max(1, Math.floor(Number(nextHand.bet) || 1) / 2);
        nextHand.cards.push(drawCard());
        nextHand.done = true;
      } else if (action === "split") {
        if (nextRound.hands.length !== 1 || !canSplitHand(nextHand)) return { kind: "error", code: "cannot_split" };
        const c1 = nextHand.cards[0];
        const c2 = nextHand.cards[1];
        const handBet = Math.max(1, Math.floor(Number(nextHand.bet) || 1));
        extraBet = handBet;
        nextRound.hands = [
          {
            cards: [c1, drawCard()],
            bet: handBet,
            fromSplit: true,
            doubled: false,
            done: false,
            outcome: "",
            payout: 0
          },
          {
            cards: [c2, drawCard()],
            bet: handBet,
            fromSplit: true,
            doubled: false,
            done: false,
            outcome: "",
            payout: 0
          }
        ];
        nextRound.activeHand = 0;
      } else {
        return { kind: "error", code: "invalid_action" };
      }

      if (extraBet > 0) {
        const currentBank = Math.max(0, Math.floor(Number(current.earningsLocks) || 0));
        if ((currentBank + extraBet) < getBlackjackCoverageRequired(nextRound)) {
          return { kind: "error", code: "bank_coverage" };
        }
      }

      const nextOpen = firstOpenBlackjackHand(nextRound);
      if (nextOpen >= 0) {
        nextRound.activeHand = nextOpen;
        return {
          kind: "in_progress",
          next: {
            ...current,
            blackjackRound: nextRound,
            earningsLocks: Math.max(0, Math.floor(Number(current.earningsLocks) || 0) + extraBet),
            updatedAt: Date.now()
          },
          extraBet
        };
      }

      const resolvedRound = finishBlackjackRound(nextRound);
      const payout = Math.max(0, Math.floor(Number(resolvedRound && resolvedRound.totalPayout) || 0));
      const nextStats = normalizeStats(current.stats);
      const result = getBlackjackResultFromResolvedRound(resolvedRound);
      nextStats.plays += 1;
      nextStats.totalBet += (result ? result.bet : 0);
      nextStats.totalPayout += payout;
      nextStats.lastPlayerRoll = result ? result.playerRoll : 0;
      nextStats.lastHouseRoll = result ? result.houseRoll : 0;
      nextStats.lastPlayerReme = 0;
      nextStats.lastHouseReme = 0;
      nextStats.lastMultiplier = result ? result.multiplier : 0;
      nextStats.lastOutcome = result ? result.outcome : "lose";
      nextStats.lastPlayerName = round.playerName || "";
      nextStats.lastAt = Date.now();

      return {
        kind: "resolved",
        next: {
          ...current,
          blackjackRound: resolvedRound,
          earningsLocks: Math.max(0, Math.floor(Number(current.earningsLocks) || 0) + extraBet - payout),
          stats: nextStats,
          updatedAt: Date.now()
        },
        extraBet,
        payout,
        result
      };
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
      const maxBetByBank = getMaxBetByBank(bankLocal, def, getMachineMaxBetCap(machine, def));
      if (maxBetByBank < def.minBet) {
        post("Machine bank is too low.");
        return;
      }
      const bet = Math.max(def.minBet, Math.min(maxBetByBank, Math.floor(Number(betInput && betInput.value) || 0)));
      lastBetByTile.set(getTileKey(tx, ty), bet);
      const inventory = get("getInventory", {}) || {};
      const haveLocal = getTotalLocks(inventory);
      if (haveLocal < bet) {
        post("Not enough World Locks. Need " + bet + ".");
        return;
      }

      const network = get("getNetwork", null);
      const basePath = String(get("getBasePath", "") || "");
      const profileId = String(get("getPlayerProfileId", "") || "");
      const profileName = String(get("getPlayerName", "") || "").slice(0, 20);
      const firebaseRef = get("getFirebase", null);

      if (def.id === "blackjack") {
        const existingRound = normalizeBlackjackRound(machine.blackjackRound);
        if (existingRound && existingRound.active && !existingRound.resolved) {
          post("Blackjack round already in progress.");
          renderModal(tx, ty, machine, Boolean(modalCtx && modalCtx.spectating));
          return;
        }
        const finalizeLocalStart = () => {
          const current = getLocal(tx, ty) || machine;
          const start = startBlackjackRoundSnapshot(current, bet, profileId, profileName);
          if (!start || !start.next) {
            post("Machine bank changed. Max bet is now " + getMaxBetByBank(Math.max(0, Math.floor(Number(current.earningsLocks) || 0)), def, getMachineMaxBetCap(current, def)) + " WL.");
            renderModal(tx, ty, current);
            return;
          }
          if (!spendLocksLocal(inventory, start.bet)) {
            post("Not enough World Locks.");
            return;
          }
          setLocal(tx, ty, start.next);
          if (typeof opts.saveInventory === "function") opts.saveInventory();
          if (typeof opts.refreshToolbar === "function") opts.refreshToolbar(true);
          renderModal(tx, ty, start.next);
          const startedRound = normalizeBlackjackRound(start.next.blackjackRound);
          if (startedRound && startedRound.resolved) {
            const payout = Math.max(0, Math.floor(Number(start.payout) || 0));
            if (payout > 0) addLocksLocal(inventory, payout);
            const result = start.result || getBlackjackResultFromResolvedRound(startedRound);
            post(getOutcomeMessage(result || { gameType: "blackjack", bet: start.bet, outcome: "lose" }, payout));
            if (typeof opts.saveInventory === "function") opts.saveInventory();
            if (typeof opts.refreshToolbar === "function") opts.refreshToolbar(true);
          } else {
            post("Blackjack round started. Choose Hit, Stand, Double or Split.");
          }
        };

        if (!network || !network.enabled || !network.db || !basePath || !profileId) {
          finalizeLocalStart();
          return;
        }
        const lockRefBj = network.db.ref(basePath + "/player-inventories/" + profileId);
        const machineRefBj = getMachineRef(tx, ty);
        if (!machineRefBj) {
          finalizeLocalStart();
          return;
        }
        lockRefBj.transaction((currentRaw) => {
          const current = currentRaw && typeof currentRaw === "object" ? { ...currentRaw } : {};
          const have = getTotalLocks(current);
          if (have < bet) return;
          setCanonicalLocks(current, have - bet);
          return current;
        }).then((deductTxn) => {
          if (!deductTxn || !deductTxn.committed) {
            post("Not enough World Locks.");
            return null;
          }
          return machineRefBj.transaction((currentRaw) => {
            const update = startBlackjackRoundSnapshot(currentRaw, bet, profileId, profileName);
            if (!update || !update.next) return;
            return update.next;
          }).then((machineTxn) => {
            if (!machineTxn || !machineTxn.committed) {
              lockRefBj.transaction((currentRaw) => {
                const current = currentRaw && typeof currentRaw === "object" ? { ...currentRaw } : {};
                addLocksLocal(current, bet);
                return current;
              }).catch(() => {});
              post("Failed to start blackjack.");
              return null;
            }
            const raw = machineTxn.snapshot && typeof machineTxn.snapshot.val === "function" ? machineTxn.snapshot.val() : null;
            setLocal(tx, ty, raw);
            if (typeof opts.saveInventory === "function") opts.saveInventory();
            if (typeof opts.refreshToolbar === "function") opts.refreshToolbar(true);
            renderModal(tx, ty, getLocal(tx, ty));
            const startedRound = normalizeBlackjackRound(raw && raw.blackjackRound);
            if (startedRound && startedRound.resolved) {
              const result = getBlackjackResultFromResolvedRound(startedRound);
              const payout = result ? result.payout : 0;
              if (payout > 0) {
                return lockRefBj.transaction((currentRaw) => {
                  const current = currentRaw && typeof currentRaw === "object" ? { ...currentRaw } : {};
                  addLocksLocal(current, payout);
                  return current;
                }).then(() => {
                  if (typeof opts.saveInventory === "function") opts.saveInventory();
                  if (typeof opts.refreshToolbar === "function") opts.refreshToolbar(true);
                  post(getOutcomeMessage(result || { gameType: "blackjack", bet, outcome: "lose" }, payout));
                  return true;
                });
              }
              post(getOutcomeMessage(result || { gameType: "blackjack", bet, outcome: "lose" }, 0));
              return true;
            }
            post("Blackjack round started. Choose Hit, Stand, Double or Split.");
            return true;
          });
        }).catch(() => {
          post("Failed to start blackjack.");
        });
        return;
      }

      const result = (() => {
        if (def.id === "slots") {
          return evaluateSlots(def, bet);
        }
        const playerRoll = Math.floor(Math.random() * (def.maxRoll - def.minRoll + 1)) + def.minRoll;
        const houseRoll = Math.floor(Math.random() * (def.maxRoll - def.minRoll + 1)) + def.minRoll;
        return evaluateSpin(def, playerRoll, houseRoll, bet);
      })();
      result.gameType = def.id;

      const finalizeLocal = () => {
        const current = getLocal(tx, ty) || machine;
        const beforeBank = Math.max(0, Math.floor(Number(current.earningsLocks) || 0));
        const needsCoverage = bet * Math.max(1, Math.floor(Number(def.maxPayoutMultiplier) || 3));
        if (beforeBank < needsCoverage) {
          post("Machine bank changed. Max bet is now " + getMaxBetByBank(beforeBank, def, getMachineMaxBetCap(current, def)) + " WL.");
          renderModal(tx, ty, current);
          return;
        }
        const payout = Math.max(0, Math.floor(Number(result.payoutWanted) || 0));
        const nextTotal = Math.max(0, haveLocal - bet + payout);
        setCanonicalLocks(inventory, nextTotal);
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
        nextStats.lastSlotsText = Array.isArray(result.reels) ? result.reels.join(" | ") : "";
        nextStats.lastSlotsSummary = String(result.slotsSummary || "").slice(0, 80);
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

      const lockRef = network.db.ref(basePath + "/player-inventories/" + profileId);
      const machineRef = getMachineRef(tx, ty);
      if (!machineRef) {
        finalizeLocal();
        return;
      }

      lockRef.transaction((currentRaw) => {
        const current = currentRaw && typeof currentRaw === "object" ? { ...currentRaw } : {};
        const have = getTotalLocks(current);
        if (have < bet) return;
        setCanonicalLocks(current, have - bet);
        return current;
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
            lockRef.transaction((currentRaw) => {
              const current = currentRaw && typeof currentRaw === "object" ? { ...currentRaw } : {};
              addLocksLocal(current, bet);
              return current;
            }).catch(() => {});
            post("Spin failed.");
            return null;
          }
          const raw = machineTxn.snapshot && typeof machineTxn.snapshot.val === "function" ? machineTxn.snapshot.val() : null;
          setLocal(tx, ty, raw);
          if (payout > 0) {
            return lockRef.transaction((currentRaw) => {
              const current = currentRaw && typeof currentRaw === "object" ? { ...currentRaw } : {};
              addLocksLocal(current, payout);
              return current;
            }).then((payTxn) => {
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

    function performBlackjackAction(action) {
      if (!modalCtx) return;
      const tx = Math.floor(Number(modalCtx.tx));
      const ty = Math.floor(Number(modalCtx.ty));
      const post = opts.postLocalSystemChat || (() => {});
      const machine = getLocal(tx, ty);
      if (!machine || String(machine.type || "") !== "blackjack") {
        post("Blackjack is not active on this machine.");
        return;
      }
      const profileId = String(get("getPlayerProfileId", "") || "");
      const inventory = get("getInventory", {}) || {};
      const network = get("getNetwork", null);
      const basePath = String(get("getBasePath", "") || "");

      const applyLocal = () => {
        const current = getLocal(tx, ty) || machine;
        const preview = applyBlackjackActionToMachine(current, action, profileId);
        if (!preview || preview.kind === "error") {
          post("Action not allowed.");
          renderModal(tx, ty, current, Boolean(modalCtx && modalCtx.spectating));
          return;
        }
        const extra = Math.max(0, Math.floor(Number(preview.extraBet) || 0));
        if (extra > 0 && !spendLocksLocal(inventory, extra)) {
          post("Not enough WL for " + action + ".");
          return;
        }
        setLocal(tx, ty, preview.next);
        if (preview.kind === "resolved" && preview.payout > 0) {
          addLocksLocal(inventory, preview.payout);
          post(getOutcomeMessage(preview.result || { gameType: "blackjack", bet: 0, outcome: "lose" }, preview.payout));
        }
        if (typeof opts.saveInventory === "function") opts.saveInventory();
        if (typeof opts.refreshToolbar === "function") opts.refreshToolbar(true);
        renderModal(tx, ty, preview.next, Boolean(modalCtx && modalCtx.spectating));
      };

      if (!network || !network.enabled || !network.db || !basePath || !profileId) {
        applyLocal();
        return;
      }

      const lockRef = network.db.ref(basePath + "/player-inventories/" + profileId);
      const machineRef = getMachineRef(tx, ty);
      if (!machineRef) {
        applyLocal();
        return;
      }
      const localPreview = applyBlackjackActionToMachine(machine, action, profileId);
      if (!localPreview || localPreview.kind === "error") {
        post("Action not allowed.");
        return;
      }
      const extraExpected = Math.max(0, Math.floor(Number(localPreview.extraBet) || 0));
      if (extraExpected > 0 && getTotalLocks(inventory) < extraExpected) {
        post("Not enough WL for " + action + ".");
        return;
      }
      const deductPromise = extraExpected > 0
        ? lockRef.transaction((currentRaw) => {
            const current = currentRaw && typeof currentRaw === "object" ? { ...currentRaw } : {};
            if (!spendLocksLocal(current, extraExpected)) return;
            return current;
          })
        : Promise.resolve({ committed: true });

      let liveResult = null;
      deductPromise.then((deductTxn) => {
        if (!deductTxn || !deductTxn.committed) {
          post("Not enough WL for " + action + ".");
          return null;
        }
        return machineRef.transaction((currentRaw) => {
          const preview = applyBlackjackActionToMachine(currentRaw, action, profileId);
          if (!preview || preview.kind === "error") return;
          const liveExtra = Math.max(0, Math.floor(Number(preview.extraBet) || 0));
          if (liveExtra !== extraExpected) return;
          liveResult = preview;
          return preview.next;
        });
      }).then((machineTxn) => {
        if (!machineTxn || !machineTxn.committed || !liveResult) {
          if (extraExpected > 0) {
            lockRef.transaction((currentRaw) => {
              const current = currentRaw && typeof currentRaw === "object" ? { ...currentRaw } : {};
              addLocksLocal(current, extraExpected);
              return current;
            }).catch(() => {});
          }
          post("Action failed.");
          return null;
        }
        const raw = machineTxn.snapshot && typeof machineTxn.snapshot.val === "function" ? machineTxn.snapshot.val() : null;
        setLocal(tx, ty, raw);
        if (liveResult.kind === "resolved") {
          const payout = Math.max(0, Math.floor(Number(liveResult.payout) || 0));
          if (payout > 0) {
            return lockRef.transaction((currentRaw) => {
              const current = currentRaw && typeof currentRaw === "object" ? { ...currentRaw } : {};
              addLocksLocal(current, payout);
              return current;
            }).then(() => ({ payout }));
          }
        }
        return { payout: 0 };
      }).then((finalize) => {
        if (!finalize) return;
        if (typeof opts.saveInventory === "function") opts.saveInventory();
        if (typeof opts.refreshToolbar === "function") opts.refreshToolbar(true);
        const latest = getLocal(tx, ty) || machine;
        renderModal(tx, ty, latest, Boolean(modalCtx && modalCtx.spectating));
        if (liveResult && liveResult.kind === "resolved") {
          post(getOutcomeMessage(liveResult.result || { gameType: "blackjack", bet: 0, outcome: "lose" }, finalize.payout));
        }
      }).catch(() => {
        post("Action failed.");
      });
    }

    function setMachineMaxBet() {
      if (!modalCtx) return;
      const tx = Math.floor(Number(modalCtx.tx));
      const ty = Math.floor(Number(modalCtx.ty));
      const post = opts.postLocalSystemChat || (() => {});
      const machine = getLocal(tx, ty);
      if (!machine || !canCollect(machine)) {
        post("Only the machine owner can change max bet.");
        return;
      }
      if (!canEditMachineMaxBet(machine)) {
        post("World admins cannot change max bet. Only world owner + machine owner can.");
        return;
      }
      const def = MACHINE_DEFS[machine.type] || MACHINE_DEFS.reme_roulette;
      const els = getModalEls();
      const maxBetInput = els.body ? els.body.querySelector("[data-gamble-input='maxbet']") : null;
      const requestedMax = Math.floor(Number(maxBetInput && maxBetInput.value));
      const nextMax = Math.max(def.minBet, Math.min(def.maxBet, Number.isFinite(requestedMax) ? requestedMax : def.maxBet));
      const network = get("getNetwork", null);
      const basePath = String(get("getBasePath", "") || "");
      const profileId = String(get("getPlayerProfileId", "") || "");
      if (!network || !network.enabled || !network.db || !basePath || !profileId) {
        const nextMachine = {
          ...machine,
          maxBet: nextMax,
          updatedAt: Date.now()
        };
        setLocal(tx, ty, nextMachine);
        renderModal(tx, ty, nextMachine);
        post("Machine max bet set to " + nextMax + " WL.");
        return;
      }
      const machineRef = getMachineRef(tx, ty);
      if (!machineRef) return;
      machineRef.transaction((currentRaw) => {
        const current = normalizeRecord(currentRaw) || machine;
        if (!canCollect(current)) return currentRaw;
        return {
          ...current,
          maxBet: nextMax,
          updatedAt: Date.now()
        };
      }).then((result) => {
        if (!result || !result.committed) {
          post("Failed to set max bet.");
          return;
        }
        const raw = result.snapshot && typeof result.snapshot.val === "function" ? result.snapshot.val() : null;
        setLocal(tx, ty, raw);
        renderModal(tx, ty, getLocal(tx, ty));
        post("Machine max bet set to " + nextMax + " WL.");
      }).catch(() => {
        post("Failed to set max bet.");
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
        const byBank = getMaxBetByBank(bank, def, getMachineMaxBetCap(machine, def));
        const inventory = get("getInventory", {}) || {};
        const byPlayer = Math.max(0, Math.min(getMachineMaxBetCap(machine, def), getTotalLocks(inventory)));
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
      if (action === "bj-hit") {
        performBlackjackAction("hit");
        return;
      }
      if (action === "bj-stand") {
        performBlackjackAction("stand");
        return;
      }
      if (action === "bj-double") {
        performBlackjackAction("double");
        return;
      }
      if (action === "bj-split") {
        performBlackjackAction("split");
        return;
      }
      if (action === "setmax") {
        setMachineMaxBet();
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
      if (!machine) {
        closeModal();
        return;
      }
      const shouldSpectate = isUsedByOther(machine);
      modalCtx.spectating = Boolean(shouldSpectate);
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
        type: "slots",
        maxBet: MACHINE_DEFS.slots.maxBet,
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

    function claimOnBreak(tx, ty) {
      const post = opts.postLocalSystemChat || (() => {});
      const machine = getLocal(tx, ty);
      if (machine && !canCollect(machine)) {
        post("Only the machine owner can break this gambling machine.");
        return;
      }
      const localBank = Math.max(0, Math.floor(Number(machine && machine.earningsLocks) || 0));
      const inventory = get("getInventory", {}) || {};
      const network = get("getNetwork", null);
      const basePath = String(get("getBasePath", "") || "");
      const profileId = String(get("getPlayerProfileId", "") || "");

      const closeAndClear = () => {
        if (modalCtx && modalCtx.tx === tx && modalCtx.ty === ty) {
          closeModal();
        } else {
          setLocal(tx, ty, null);
        }
      };

      if (!network || !network.enabled || !network.db || !basePath || !profileId) {
        if (localBank > 0) {
          addLocksLocal(inventory, localBank);
          if (typeof opts.saveInventory === "function") opts.saveInventory();
          if (typeof opts.refreshToolbar === "function") opts.refreshToolbar(true);
          post("Collected " + localBank + " WL from gambling machine.");
        }
        closeAndClear();
        return;
      }

      const machineRef = getMachineRef(tx, ty);
      if (!machineRef) {
        if (localBank > 0) {
          addLocksLocal(inventory, localBank);
          if (typeof opts.saveInventory === "function") opts.saveInventory();
          if (typeof opts.refreshToolbar === "function") opts.refreshToolbar(true);
          post("Collected " + localBank + " WL from gambling machine.");
        }
        closeAndClear();
        return;
      }

      const invRef = network.db.ref(basePath + "/player-inventories/" + profileId);
      let claimed = 0;
      machineRef.transaction((currentRaw) => {
        const current = normalizeRecord(currentRaw);
        if (current && !canCollect(current)) return currentRaw;
        if (!current) return null;
        claimed = Math.max(0, Math.floor(Number(current.earningsLocks) || 0));
        return null; // remove machine node on successful claim
      }).then((txn) => {
        if (!txn || !txn.committed) {
          closeAndClear();
          return null;
        }
        if (claimed <= 0) {
          closeAndClear();
          return null;
        }
        return invRef.transaction((currentRaw) => {
          const current = currentRaw && typeof currentRaw === "object" ? { ...currentRaw } : {};
          addLocksLocal(current, claimed);
          return current;
        }).then(() => ({ claimed }));
      }).then((done) => {
        closeAndClear();
        if (!done) return;
        if (typeof opts.saveInventory === "function") opts.saveInventory();
        if (typeof opts.refreshToolbar === "function") opts.refreshToolbar(true);
        post("Collected " + done.claimed + " WL from gambling machine.");
      }).catch(() => {
        closeAndClear();
      });
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
      onBroken,
      canBreakAt,
      claimOnBreak
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
