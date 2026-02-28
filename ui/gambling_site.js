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
      ownerTax: null
    },
    handlers: {
      lock: null,
      machines: null,
      ownerTax: null
    },
    machineSearch: ""
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
    sumTax: document.getElementById("sumTax"),
    machineTbody: document.getElementById("machineTbody"),
    machineEmpty: document.getElementById("machineEmpty")
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
    return {
      percent: Math.max(0, Math.min(100, Math.floor(Number(percentRaw) || 0))),
      earningsLocks: Math.max(0, Math.floor(Number(value.earningsLocks) || 0))
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
      updatedAt: Math.max(0, Math.floor(Number(raw.updatedAt) || 0))
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

    state.refs.lock = null;
    state.refs.machines = null;
    state.refs.ownerTax = null;
    state.handlers.lock = null;
    state.handlers.machines = null;
    state.handlers.ownerTax = null;
    state.worldLock = null;
    state.ownerTax = null;
    state.machines = [];
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

      tr.appendChild(tdTile);
      tr.appendChild(tdType);
      tr.appendChild(tdOwner);
      tr.appendChild(tdBank);
      tr.appendChild(tdState);
      tr.appendChild(tdMaxBet);
      frag.appendChild(tr);
    });

    els.machineTbody.appendChild(frag);
  }

  function renderAll() {
    renderScope();
    renderSummary();
    renderMachines();
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
        renderAll();
      };
      state.handlers.ownerTax = (snapshot) => {
        state.ownerTax = normalizeOwnerTax(snapshot.val());
        renderAll();
      };

      state.refs.lock.on("value", state.handlers.lock);
      state.refs.machines.on("value", state.handlers.machines);
      state.refs.ownerTax.on("value", state.handlers.ownerTax);

      makeStatus("Loaded world " + safeWorldId + ".", "ok");
      renderAll();
    } catch (error) {
      makeStatus((error && error.message) || "Failed to load world.", "error");
    } finally {
      setWorldBusy(false);
    }
  }

  function findMachineByTileKey(tileKey) {
    const safe = String(tileKey || "");
    const rows = Array.isArray(state.machines) ? state.machines : [];
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].tileKey === safe) return rows[i];
    }
    return null;
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
        if (target.dataset.act !== "save-maxbet") return;
        const tileKey = String(target.dataset.tileKey || "").trim();
        if (!tileKey) return;

        const input = els.machineTbody.querySelector('input[data-tile-key="' + tileKey + '"]');
        if (!(input instanceof HTMLInputElement)) return;
        saveMachineMaxBet(tileKey, input.value);
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
