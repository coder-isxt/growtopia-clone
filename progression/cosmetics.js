window.GTModules = window.GTModules || {};

window.GTModules.cosmetics = (function createCosmeticsModule() {
  const DEFAULT_SLOTS = ["shirts", "pants", "shoes", "hats", "wings", "swords"];

  function resolveImagePath(basePath, imagePath) {
    const raw = String(imagePath || "").trim();
    if (!raw) return "";
    if (/^(https?:)?\/\//.test(raw) || raw.startsWith("/") || raw.startsWith("./") || raw.startsWith("../")) {
      return raw;
    }
    const base = String(basePath || "./assets/cosmetics").replace(/\/+$/, "");
    return base + "/" + raw.replace(/^\/+/, "");
  }

  function buildCatalog(itemsModule) {
    const mod = itemsModule || {};
    const catalog = typeof mod.getCosmeticItemsBySlot === "function"
      ? mod.getCosmeticItemsBySlot()
      : { shirts: [], pants: [], shoes: [], hats: [], wings: [], swords: [] };
    const assetBase = typeof mod.getCosmeticAssetBasePath === "function"
      ? (mod.getCosmeticAssetBasePath() || "./assets/cosmetics")
      : "./assets/cosmetics";
    const slots = DEFAULT_SLOTS.slice();
    const lookup = {};
    const items = [];
    const itemById = {};

    for (const slot of slots) {
      const map = {};
      const slotItems = Array.isArray(catalog[slot]) ? catalog[slot] : [];
      for (const item of slotItems) {
        const normalized = {
          slot,
          ...(item && typeof item === "object" ? item : {}),
          imagePath: resolveImagePath(assetBase, item && item.image)
        };
        const id = String(normalized.id || "");
        if (!id) continue;
        map[id] = normalized;
        items.push(normalized);
        itemById[id] = normalized;
      }
      lookup[slot] = map;
    }

    return { slots, catalog, assetBase, lookup, items, itemById };
  }

  function createInventoryState(items, slots) {
    const outItems = {};
    const list = Array.isArray(items) ? items : [];
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (!item || !item.id) continue;
      outItems[item.id] = 0;
    }
    const outEquipped = {};
    const safeSlots = Array.isArray(slots) ? slots : DEFAULT_SLOTS;
    for (let i = 0; i < safeSlots.length; i++) {
      outEquipped[safeSlots[i]] = "";
    }
    return {
      cosmeticInventory: outItems,
      equippedCosmetics: outEquipped
    };
  }

  function clampInventory(cosmeticInventory, items, clampCountFn) {
    const inv = cosmeticInventory && typeof cosmeticInventory === "object" ? cosmeticInventory : {};
    const list = Array.isArray(items) ? items : [];
    const clamp = typeof clampCountFn === "function" ? clampCountFn : ((v) => Math.max(0, Math.floor(Number(v) || 0)));
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (!item || !item.id) continue;
      inv[item.id] = clamp(inv[item.id]);
    }
  }

  function applyFromRecord(args) {
    const cfg = args || {};
    const record = cfg.record || {};
    const cosmeticInventory = cfg.cosmeticInventory || {};
    const equippedCosmetics = cfg.equippedCosmetics || {};
    const items = Array.isArray(cfg.items) ? cfg.items : [];
    const lookup = cfg.lookup && typeof cfg.lookup === "object" ? cfg.lookup : {};
    const slots = Array.isArray(cfg.slots) ? cfg.slots : DEFAULT_SLOTS;
    const clamp = typeof cfg.clampCount === "function" ? cfg.clampCount : ((v) => Math.max(0, Math.floor(Number(v) || 0)));

    const itemRecord = record && record.cosmeticItems || {};
    const legacyOwned = record && record.owned || {};
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item || !item.id) continue;
      const nestedValue = Number(itemRecord[item.id]);
      const topLevelValue = Number(record && record[item.id]);
      const legacyHasOwned = Array.isArray(legacyOwned[item.slot]) && legacyOwned[item.slot].includes(item.id);
      let finalValue = 0;
      if (Number.isFinite(nestedValue)) finalValue = clamp(nestedValue);
      if (!finalValue && Number.isFinite(topLevelValue)) finalValue = clamp(topLevelValue);
      if (!finalValue && legacyHasOwned) finalValue = 1;
      cosmeticInventory[item.id] = clamp(finalValue);
    }

    const equippedRecord = record && record.equippedCosmetics || record && record.equipped || {};
    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i];
      const id = String(equippedRecord[slot] || "");
      equippedCosmetics[slot] = id && lookup[slot] && lookup[slot][id] && (cosmeticInventory[id] || 0) > 0 ? id : "";
    }
    // Backward compatibility for old "clothes" slot -> shirts.
    if (!equippedCosmetics.shirts) {
      const legacyShirtId = String(equippedRecord.clothes || "");
      if (legacyShirtId && lookup.shirts && lookup.shirts[legacyShirtId] && (cosmeticInventory[legacyShirtId] || 0) > 0) {
        equippedCosmetics.shirts = legacyShirtId;
      }
    }
  }

  function normalizeRemoteEquipped(raw, slots, lookup) {
    const out = {};
    const safeSlots = Array.isArray(slots) ? slots : DEFAULT_SLOTS;
    const map = lookup && typeof lookup === "object" ? lookup : {};
    for (let i = 0; i < safeSlots.length; i++) {
      const slot = safeSlots[i];
      const id = String(raw && raw[slot] || "");
      out[slot] = id && map[slot] && map[slot][id] ? id : "";
    }
    if (!out.shirts) {
      const legacyShirtId = String(raw && raw.clothes || "");
      if (legacyShirtId && map.shirts && map.shirts[legacyShirtId]) {
        out.shirts = legacyShirtId;
      }
    }
    return out;
  }

  function writePayload(payload, cosmeticInventory, equippedCosmetics, items, slots, clampCountFn) {
    const out = payload && typeof payload === "object" ? payload : {};
    const inv = cosmeticInventory && typeof cosmeticInventory === "object" ? cosmeticInventory : {};
    const equipped = equippedCosmetics && typeof equippedCosmetics === "object" ? equippedCosmetics : {};
    const list = Array.isArray(items) ? items : [];
    const safeSlots = Array.isArray(slots) ? slots : DEFAULT_SLOTS;
    const clamp = typeof clampCountFn === "function" ? clampCountFn : ((v) => Math.max(0, Math.floor(Number(v) || 0)));

    const itemPayload = {};
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (!item || !item.id) continue;
      itemPayload[item.id] = clamp(inv[item.id]);
    }
    out.cosmeticItems = itemPayload;
    out.equippedCosmetics = {};
    for (let i = 0; i < safeSlots.length; i++) {
      const slot = safeSlots[i];
      out.equippedCosmetics[slot] = String(equipped[slot] || "");
    }
    return out;
  }

  function getEquippedItem(slot, equippedCosmetics, lookup) {
    const safeSlot = String(slot || "");
    const equipped = equippedCosmetics && typeof equippedCosmetics === "object" ? equippedCosmetics : {};
    const map = lookup && typeof lookup === "object" ? lookup : {};
    const id = String(equipped[safeSlot] || "");
    return id && map[safeSlot] && map[safeSlot][id] ? map[safeSlot][id] : null;
  }

  return {
    DEFAULT_SLOTS,
    buildCatalog,
    createInventoryState,
    clampInventory,
    applyFromRecord,
    normalizeRemoteEquipped,
    writePayload,
    getEquippedItem
  };
})();
