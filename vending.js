window.GTModules = window.GTModules || {};

window.GTModules.vending = (function createVendingModule() {
  function createController(options) {
    const opts = options || {};
    const machines = new Map();
    let modalCtx = null;

    function get(k, fallback) {
      const fn = opts[k];
      if (typeof fn === "function") return fn();
      return fallback;
    }

    function getTileKey(tx, ty) {
      return String(tx) + "_" + String(ty);
    }

    function normalizeRecord(value) {
      if (!value || typeof value !== "object") return null;
      const ownerAccountId = (value.ownerAccountId || "").toString();
      if (!ownerAccountId) return null;
      const sellBlockId = Number(value.sellBlockId) || 0;
      const getBlockKeyById = opts.getBlockKeyById || (() => "block_" + sellBlockId);
      return {
        ownerAccountId,
        ownerName: (value.ownerName || "").toString().slice(0, 20),
        sellBlockId,
        sellBlockKey: (value.sellBlockKey || getBlockKeyById(sellBlockId)).toString(),
        priceLocks: Math.max(0, Math.floor(Number(value.priceLocks) || 0)),
        stock: Math.max(0, Math.floor(Number(value.stock) || 0)),
        earningsLocks: Math.max(0, Math.floor(Number(value.earningsLocks) || 0)),
        updatedAt: typeof value.updatedAt === "number" ? value.updatedAt : 0
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

    function canManage(vm) {
      const pid = get("getPlayerProfileId", "");
      return Boolean(vm && pid && vm.ownerAccountId === pid);
    }

    function getModalEls() {
      return {
        modal: get("getVendingModalEl", null),
        title: get("getVendingTitleEl", null),
        body: get("getVendingBodyEl", null),
        actions: get("getVendingActionsEl", null)
      };
    }

    function closeModal() {
      modalCtx = null;
      const els = getModalEls();
      if (els.modal) els.modal.classList.add("hidden");
    }

    function renderModal(tx, ty, vm) {
      const els = getModalEls();
      if (!els.modal || !els.title || !els.body || !els.actions) return;
      const getBlockKeyById = opts.getBlockKeyById || ((id) => "block_" + id);
      const owner = vm.ownerName || "owner";
      const blockLabel = vm.sellBlockId ? getBlockKeyById(vm.sellBlockId) : "none";
      const inv = get("getInventory", {});
      const inventoryIds = get("getInventoryIds", []);
      const vendingId = get("getVendingId", 0);
      els.title.textContent = "Vending Machine (" + tx + "," + ty + ")";
      const canManageMachine = canManage(vm) || (!vm.ownerAccountId && get("getPlayerProfileId", ""));
      const listingRows =
        "<div>Owner: @" + owner + "</div>" +
        "<div>Listing: " + blockLabel + "</div>" +
        "<div>Price: " + (vm.priceLocks || 0) + " World Locks</div>" +
        "<div>Stock: " + (vm.stock || 0) + "</div>" +
        "<div>Earnings: " + (vm.earningsLocks || 0) + " World Locks</div>";
      if (canManageMachine) {
        const optionRows = [];
        for (let i = 0; i < inventoryIds.length; i++) {
          const id = inventoryIds[i];
          if (id === vendingId) continue;
          const qty = Math.max(0, Math.floor(Number(inv[id]) || 0));
          if (qty <= 0 && id !== vm.sellBlockId) continue;
          const selected = id === vm.sellBlockId ? " selected" : "";
          optionRows.push("<option value=\"" + id + "\"" + selected + ">" + getBlockKeyById(id) + " (inv " + qty + ")</option>");
        }
        if (!optionRows.length) {
          optionRows.push("<option value=\"0\">No stockable items</option>");
        }
        const defaultPrice = vm.priceLocks > 0 ? vm.priceLocks : 1;
        const defaultStock = Math.max(0, Math.floor(Number(vm.stock) || 0));
        els.body.innerHTML =
          listingRows +
          "<hr>" +
          "<div><strong>Edit Listing</strong></div>" +
          "<div>Item: <select data-vending-input=\"block\">" + optionRows.join("") + "</select></div>" +
          "<div>Price: <input data-vending-input=\"price\" type=\"number\" min=\"1\" step=\"1\" value=\"" + defaultPrice + "\"></div>" +
          "<div>Set stock total: <input data-vending-input=\"stock\" type=\"number\" min=\"0\" step=\"1\" value=\"" + defaultStock + "\"></div>";
      } else {
        els.body.innerHTML = listingRows;
      }
      const canBuy = Boolean(vm.sellBlockId && vm.stock > 0 && vm.priceLocks > 0);
      const manageDisabled = canManageMachine ? "" : " disabled";
      const buyDisabled = canBuy ? "" : " disabled";
      els.actions.innerHTML =
        '<button data-vending-act="configure"' + manageDisabled + '>Configure / Add Stock</button>' +
        '<button data-vending-act="collect"' + manageDisabled + '>Collect Earnings</button>' +
        '<button data-vending-act="buy"' + buyDisabled + '>Buy 1 Item</button>';
      modalCtx = { tx, ty };
      els.modal.classList.remove("hidden");
    }

    function createOrUpdateMachine(tx, ty, updater) {
      const key = getTileKey(tx, ty);
      const network = get("getNetwork", null);
      const basePath = get("getBasePath", "");
      const worldId = get("getCurrentWorldId", "");
      const playerProfileId = get("getPlayerProfileId", "");
      const playerName = (get("getPlayerName", "") || "").toString().slice(0, 20);
      const firebaseRef = get("getFirebase", null);
      if (!network || !network.enabled || !network.db) {
        const current = getLocal(tx, ty) || {
          ownerAccountId: playerProfileId || "",
          ownerName: playerName,
          sellBlockId: 0,
          sellBlockKey: "",
          priceLocks: 0,
          stock: 0,
          earningsLocks: 0,
          updatedAt: Date.now()
        };
        const next = updater(current);
        setLocal(tx, ty, next);
        return Promise.resolve(next);
      }
      const base = String(basePath) + "/worlds/" + String(worldId) + "/vending/" + key;
      return network.db.ref(base).transaction((currentRaw) => {
        const current = normalizeRecord(currentRaw) || {
          ownerAccountId: playerProfileId || "",
          ownerName: playerName,
          sellBlockId: 0,
          sellBlockKey: "",
          priceLocks: 0,
          stock: 0,
          earningsLocks: 0,
          updatedAt: 0
        };
        const next = updater(current);
        if (!next) return currentRaw;
        return {
          ...next,
          updatedAt: firebaseRef && firebaseRef.database ? firebaseRef.database.ServerValue.TIMESTAMP : Date.now()
        };
      }).then((result) => {
        if (!result.committed) return null;
        const value = result.snapshot && typeof result.snapshot.val === "function" ? result.snapshot.val() : null;
        setLocal(tx, ty, value);
        return normalizeRecord(value);
      });
    }

    function seedOwner(tx, ty) {
      const network = get("getNetwork", null);
      const firebaseRef = get("getFirebase", null);
      if (!network || !network.enabled || !network.db) return;
      const pid = get("getPlayerProfileId", "");
      if (!pid) return;
      const worldId = get("getCurrentWorldId", "");
      const basePath = get("getBasePath", "");
      const key = getTileKey(tx, ty);
      const name = (get("getPlayerName", "") || "").toString().slice(0, 20);
      network.db.ref(basePath + "/worlds/" + worldId + "/vending/" + key).transaction((currentRaw) => {
        const current = normalizeRecord(currentRaw);
        if (current && current.ownerAccountId) return currentRaw;
        return {
          ownerAccountId: pid,
          ownerName: name,
          sellBlockId: 0,
          sellBlockKey: "",
          priceLocks: 0,
          stock: 0,
          earningsLocks: 0,
          updatedAt: firebaseRef && firebaseRef.database ? firebaseRef.database.ServerValue.TIMESTAMP : Date.now()
        };
      }).catch(() => {});
    }

    function promptPositiveInt(message, fallback) {
      const raw = window.prompt(message, String(fallback || 1));
      if (!raw) return 0;
      const value = Math.floor(Number(raw));
      if (!Number.isInteger(value) || value <= 0) return 0;
      return value;
    }

    function configureMachine(tx, ty, vm) {
      const post = opts.postLocalSystemChat || (() => {});
      if (!canManage(vm)) {
        post("Only the vending owner can configure this machine.");
        return;
      }
      const parseBlockRef = opts.parseBlockRef || (() => 0);
      const getBlockKeyById = opts.getBlockKeyById || ((id) => "block_" + id);
      const getActiveSellableBlockId = opts.getActiveSellableBlockId || (() => 0);
      const inventory = get("getInventory", {});
      const inventoryIds = get("getInventoryIds", []);
      const vendingId = get("getVendingId", 0);
      const els = getModalEls();
      const blockInput = els.body ? els.body.querySelector('[data-vending-input="block"]') : null;
      const priceInput = els.body ? els.body.querySelector('[data-vending-input="price"]') : null;
      const stockInput = els.body ? els.body.querySelector('[data-vending-input="stock"]') : null;
      let blockId = 0;
      if (blockInput) {
        blockId = Math.floor(Number(blockInput.value) || 0);
      } else {
        const fallbackBlockId = vm.sellBlockId || getActiveSellableBlockId() || 4;
        const blockText = window.prompt("Sell which block? Enter block key or id.", getBlockKeyById(fallbackBlockId));
        if (!blockText) return;
        blockId = parseBlockRef(blockText);
      }
      if (!inventoryIds.includes(blockId) || blockId === vendingId) {
        post("Invalid block selection.");
        return;
      }
      const sameBlock = Number(vm.sellBlockId) === blockId;
      const currentStockForListing = sameBlock ? Math.max(0, Math.floor(Number(vm.stock) || 0)) : 0;
      const ownedNow = Math.max(0, Math.floor(inventory[blockId] || 0));
      const desiredStock = stockInput
        ? Math.max(0, Math.floor(Number(stockInput.value) || 0))
        : promptPositiveInt("Set stock total:", currentStockForListing);
      const delta = desiredStock - currentStockForListing;
      if (delta > ownedNow) {
        post("Not enough inventory to set that stock.");
        return;
      }
      const price = priceInput
        ? Math.max(0, Math.floor(Number(priceInput.value) || 0))
        : promptPositiveInt("Price per item (World Locks):", vm.priceLocks > 0 ? vm.priceLocks : 1);
      if (!price) {
        post("Invalid price.");
        return;
      }
      const saveInventory = opts.saveInventory || (() => {});
      const refreshToolbar = opts.refreshToolbar || (() => {});
      createOrUpdateMachine(tx, ty, (current) => ({
        ownerAccountId: current.ownerAccountId || (get("getPlayerProfileId", "") || ""),
        ownerName: current.ownerName || (get("getPlayerName", "") || "").toString().slice(0, 20),
        sellBlockId: blockId,
        sellBlockKey: getBlockKeyById(blockId),
        priceLocks: price,
        stock: desiredStock,
        earningsLocks: current.earningsLocks || 0
      })).then(() => {
        if (!sameBlock && vm.sellBlockId && vm.stock > 0) {
          inventory[vm.sellBlockId] = Math.max(0, Math.floor((inventory[vm.sellBlockId] || 0) + Math.floor(vm.stock || 0)));
        }
        inventory[blockId] = Math.max(0, Math.floor((inventory[blockId] || 0) - delta));
        saveInventory();
        refreshToolbar();
        post("Vending listing updated.");
      }).catch(() => {
        post("Failed to update vending machine.");
      });
    }

    function collectEarnings(tx, ty, vm) {
      const post = opts.postLocalSystemChat || (() => {});
      if (!canManage(vm)) {
        post("Only the vending owner can collect earnings.");
        return;
      }
      const earnings = Math.max(0, Math.floor(vm.earningsLocks || 0));
      if (earnings <= 0) {
        post("No earnings to collect.");
        return;
      }
      const inventory = get("getInventory", {});
      const worldLockId = get("getWorldLockId", 0);
      const saveInventory = opts.saveInventory || (() => {});
      const refreshToolbar = opts.refreshToolbar || (() => {});
      createOrUpdateMachine(tx, ty, (current) => ({ ...current, earningsLocks: 0 })).then(() => {
        inventory[worldLockId] = Math.max(0, Math.floor((inventory[worldLockId] || 0) + earnings));
        saveInventory();
        refreshToolbar();
        post("Collected " + earnings + " World Locks from vending.");
      }).catch(() => {
        post("Failed to collect vending earnings.");
      });
    }

    function removeMachine(tx, ty, vm) {
      const post = opts.postLocalSystemChat || (() => {});
      if (!canManage(vm)) {
        post("Only the vending owner can remove this machine.");
        return;
      }
      if ((vm.stock || 0) > 0 || (vm.earningsLocks || 0) > 0) {
        post("Empty stock and collect earnings before removing.");
        return;
      }
      const world = get("getWorld", null);
      if (world && world[ty]) world[ty][tx] = 0;
      const inv = get("getInventory", {});
      const vendingId = get("getVendingId", 0);
      inv[vendingId] = Math.max(0, Math.floor((inv[vendingId] || 0) + 1));
      const syncBlock = opts.syncBlock || (() => {});
      syncBlock(tx, ty, 0);
      (opts.saveInventory || (() => {}))();
      (opts.refreshToolbar || (() => {}))();
      machines.delete(getTileKey(tx, ty));
      const network = get("getNetwork", null);
      if (network && network.enabled && network.vendingRef) {
        network.vendingRef.child(getTileKey(tx, ty)).remove().catch(() => {});
      }
      post("Vending machine removed.");
      closeModal();
    }

    function buy(tx, ty, vm) {
      const post = opts.postLocalSystemChat || (() => {});
      const blockId = Number(vm && vm.sellBlockId) || 0;
      const stock = Math.max(0, Math.floor(vm && vm.stock || 0));
      const price = Math.max(0, Math.floor(vm && vm.priceLocks || 0));
      const inv = get("getInventory", {});
      const worldLockId = get("getWorldLockId", 0);
      const getBlockKeyById = opts.getBlockKeyById || ((id) => "block_" + id);
      if (!blockId || stock <= 0 || price <= 0) {
        post("Machine is out of stock.");
        return;
      }
      if ((inv[worldLockId] || 0) < price) {
        post("Not enough World Locks. Need " + price + ".");
        return;
      }
      if (!window.confirm("Buy 1x " + getBlockKeyById(blockId) + " for " + price + " World Locks?")) return;
      const network = get("getNetwork", null);
      const basePath = get("getBasePath", "");
      const profileId = get("getPlayerProfileId", "");
      if (!network || !network.enabled || !network.db || !network.vendingRef) {
        inv[worldLockId] = Math.max(0, Math.floor((inv[worldLockId] || 0) - price));
        inv[blockId] = Math.max(0, Math.floor((inv[blockId] || 0) + 1));
        (opts.saveInventory || (() => {}))();
        (opts.refreshToolbar || (() => {}))();
        post("Purchased from vending.");
        return;
      }
      const key = getTileKey(tx, ty);
      const buyerLocksRef = network.db.ref(basePath + "/player-inventories/" + profileId + "/" + worldLockId);
      const machineRef = network.vendingRef.child(key);
      buyerLocksRef.transaction((current) => {
        const have = Math.max(0, Math.floor(Number(current) || 0));
        if (have < price) return;
        return have - price;
      }).then((lockResult) => {
        if (!lockResult.committed) {
          post("Not enough World Locks.");
          return Promise.resolve(false);
        }
        return machineRef.transaction((currentRaw) => {
          const current = normalizeRecord(currentRaw);
          if (!current) return currentRaw;
          if (current.stock <= 0 || current.priceLocks !== price || current.sellBlockId !== blockId) return;
          return {
            ...current,
            stock: current.stock - 1,
            earningsLocks: (current.earningsLocks || 0) + price,
            updatedAt: Date.now()
          };
        }).then((vmResult) => {
          if (!vmResult.committed) {
            buyerLocksRef.transaction((current) => (Math.max(0, Math.floor(Number(current) || 0)) + price)).catch(() => {});
            post("Purchase failed (stock changed).");
            return false;
          }
          return network.db.ref(basePath + "/player-inventories/" + profileId + "/" + blockId).transaction((current) => {
            return Math.max(0, Math.floor(Number(current) || 0) + 1);
          }).then((grantResult) => {
            if (!grantResult.committed) {
              post("Purchase failed.");
              return false;
            }
            post("Purchased 1x " + getBlockKeyById(blockId) + ".");
            return true;
          });
        });
      }).catch(() => {
        post("Purchase failed.");
      });
    }

    function onBreakWithFist(tx, ty) {
      const world = get("getWorld", null);
      const vendingId = get("getVendingId", 0);
      if (!world || !world[ty] || world[ty][tx] !== vendingId) return false;
      const vm = getLocal(tx, ty);
      const inv = get("getInventory", {});
      const invIds = get("getInventoryIds", []);
      const worldLockId = get("getWorldLockId", 0);
      if (vm && vm.stock > 0 && invIds.includes(vm.sellBlockId)) {
        inv[vm.sellBlockId] = Math.max(0, Math.floor((inv[vm.sellBlockId] || 0) + vm.stock));
      }
      if (vm && vm.earningsLocks > 0) {
        inv[worldLockId] = Math.max(0, Math.floor((inv[worldLockId] || 0) + vm.earningsLocks));
      }
      world[ty][tx] = 0;
      inv[vendingId] = Math.max(0, Math.floor((inv[vendingId] || 0) + 1));
      (opts.syncBlock || (() => {}))(tx, ty, 0);
      (opts.saveInventory || (() => {}))();
      (opts.refreshToolbar || (() => {}))();
      const network = get("getNetwork", null);
      if (network && network.enabled && network.vendingRef) {
        network.vendingRef.child(getTileKey(tx, ty)).remove().catch(() => {});
      }
      machines.delete(getTileKey(tx, ty));
      closeModal();
      return true;
    }

    function interact(tx, ty) {
      const world = get("getWorld", null);
      const vendingId = get("getVendingId", 0);
      const canEditTarget = opts.canEditTarget || (() => true);
      if (!world || !world[ty] || world[ty][tx] !== vendingId) return;
      if (!canEditTarget(tx, ty)) return;
      let vm = getLocal(tx, ty) || {
        ownerAccountId: "",
        ownerName: "",
        sellBlockId: 0,
        sellBlockKey: "",
        priceLocks: 0,
        stock: 0,
        earningsLocks: 0
      };
      const pid = get("getPlayerProfileId", "");
      if (!vm.ownerAccountId && pid) {
        seedOwner(tx, ty);
        vm = { ...vm, ownerAccountId: pid, ownerName: (get("getPlayerName", "") || "").toString().slice(0, 20) };
      }
      renderModal(tx, ty, vm);
    }

    function bindModalEvents() {
      const els = getModalEls();
      const closeBtn = get("getVendingCloseBtnEl", null);
      if (closeBtn && !closeBtn.dataset.vendingBound) {
        closeBtn.dataset.vendingBound = "1";
        closeBtn.addEventListener("click", closeModal);
      }
      if (els.modal && !els.modal.dataset.vendingBound) {
        els.modal.dataset.vendingBound = "1";
        els.modal.addEventListener("click", (event) => {
          const target = event.target;
          if (!(target instanceof HTMLElement)) return;
          if (target === els.modal) {
            closeModal();
            return;
          }
          const action = target.dataset.vendingAct;
          if (!action || !modalCtx) return;
          const tx = Number(modalCtx.tx);
          const ty = Number(modalCtx.ty);
          const vm = getLocal(tx, ty) || {
            ownerAccountId: "",
            ownerName: "",
            sellBlockId: 0,
            sellBlockKey: "",
            priceLocks: 0,
            stock: 0,
            earningsLocks: 0
          };
          if (action === "configure") configureMachine(tx, ty, vm);
          if (action === "collect") collectEarnings(tx, ty, vm);
          if (action === "remove") removeMachine(tx, ty, vm);
          if (action === "buy") buy(tx, ty, vm);
          setTimeout(() => {
            const next = getLocal(tx, ty) || vm;
            renderModal(tx, ty, next);
          }, 120);
        });
      }
    }

    function clearAll() {
      machines.clear();
      closeModal();
    }

    return {
      normalizeRecord,
      setLocal,
      getLocal,
      createOrUpdateMachine,
      seedOwner,
      configureMachine,
      collectEarnings,
      removeMachine,
      buy,
      closeModal,
      renderModal,
      interact,
      bindModalEvents,
      clearAll,
      onBreakWithFist
    };
  }

  return {
    createController
  };
})();
