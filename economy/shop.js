window.GTModules = window.GTModules || {};

window.GTModules.shop = (function createShopModule() {
  // Easy to modify: add/remove entries here.
  const SHOP_CATALOG = [
    {
      id: "starter_grass_pack",
      category: "Blocks",
      name: "Starter Grass Pack",
      description: "Great for early building.",
      priceGems: 25,
      grants: { blocks: { 1: 40 } },
      image: "./assets/blocks/terrain/grass.png"
    },
    {
      id: "builder_mix_pack",
      category: "Blocks",
      name: "Builder Mix Pack",
      description: "Dirt, stone and wood bundle.",
      priceGems: 60,
      grants: { blocks: { 2: 35, 3: 25, 4: 25 } },
      image: "./assets/blocks/terrain/dirt.png"
    },
    {
      id: "seed_bundle",
      category: "Seeds",
      name: "Seed Bundle",
      description: "Assorted seeds for farming.",
      priceGems: 100,
      grants: { blocks: { 24: 8, 25: 5, 26: 5, 27: 5, 28: 5, 29: 5 } },
      image: "./assets/blocks/special/tree_seed.png"
    },
    {
      id: "door_lock_seed_set",
      category: "Seeds",
      name: "Door + Lock Seeds",
      description: "Rare seeds for utility items.",
      priceGems: 500,
      grants: { blocks: { 30: 3, 31: 4 } },
      image: "./assets/blocks/special/lock_seed.png"
    },
    {
      id: "sun_shirt_basic",
      category: "Cosmetics",
      name: "Sun Shirt",
      description: "Piece of clothing for sun",
      priceGems: 60,
      grants: { cosmetics: { cloth_tunic: 1 } },
      image: "./assets/cosmetics/clothes/sun_shirt.png"
    },
    {
      id: "basic_gacha_pack",
      category: "Gacha",
      name: "Mystery Block",
      description: "A beginner friendly mystery blocks",
      priceGems: 50,
      grants: { blocks: { 41: 2 } },
      image: "./assets/blocks/special/mystery.png"
    }
  ];

  function createController(options) {
    const opts = options || {};
    let selectedCategory = "";
    let modalEl = null;
    let cardEl = null;
    let titleEl = null;
    let gemsEl = null;
    let categoriesEl = null;
    let gridEl = null;
    let closeBtnEl = null;
    let styleInjected = false;

    function get(k, d) {
      const v = opts[k];
      if (typeof v === "function") {
        try {
          const r = v();
          return r === undefined ? d : r;
        } catch (e) {
          return d;
        }
      }
      return v === undefined ? d : v;
    }

    function esc(value) {
      return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    function getCatalog() {
      const source = Array.isArray(get("getCatalog", null)) ? get("getCatalog", null) : SHOP_CATALOG;
      return source.map((row) => normalizeEntry(row)).filter(Boolean);
    }

    function normalizeEntry(raw) {
      if (!raw || typeof raw !== "object") return null;
      const id = String(raw.id || "").trim().slice(0, 64);
      if (!id) return null;
      const price = Math.max(1, Math.floor(Number(raw.priceGems) || 0));
      if (!price) return null;
      const blocks = {};
      const cosmetics = {};
      const grants = raw.grants && typeof raw.grants === "object" ? raw.grants : {};
      const blockGrants = grants.blocks && typeof grants.blocks === "object" ? grants.blocks : {};
      const cosmeticGrants = grants.cosmetics && typeof grants.cosmetics === "object" ? grants.cosmetics : {};
      Object.keys(blockGrants).forEach((k) => {
        const idNum = Math.floor(Number(k));
        const qty = Math.max(0, Math.floor(Number(blockGrants[k]) || 0));
        if (idNum > 0 && qty > 0) blocks[idNum] = qty;
      });
      Object.keys(cosmeticGrants).forEach((k) => {
        const idText = String(k || "").trim();
        const qty = Math.max(0, Math.floor(Number(cosmeticGrants[k]) || 0));
        if (idText && qty > 0) cosmetics[idText] = qty;
      });
      return {
        id,
        category: String(raw.category || "General").trim().slice(0, 24) || "General",
        name: String(raw.name || id).trim().slice(0, 48) || id,
        description: String(raw.description || "").trim().slice(0, 160),
        priceGems: price,
        grants: { blocks, cosmetics },
        image: String(raw.image || "").trim()
      };
    }

    function getItemLimit() {
      return Math.max(1, Math.floor(Number(get("getInventoryItemLimit", 300)) || 300));
    }

    function getPlayerGems() {
      return Math.max(0, Math.floor(Number(get("getPlayerGems", 0)) || 0));
    }

    function post(text) {
      const fn = opts.postLocalSystemChat;
      if (typeof fn === "function") fn(String(text || "").slice(0, 220));
    }

    function ensureDom() {
      if (modalEl && cardEl) return;
      modalEl = document.createElement("div");
      modalEl.id = "shopModal";
      modalEl.className = "vending-modal shop-modal hidden";
      modalEl.innerHTML =
        "<div class='vending-card trade-card shop-card'>" +
          "<div class='shop-header'>" +
            "<strong id='shopTitle'>Gem Shop</strong>" +
            "<div class='shop-header-right'>" +
              "<span id='shopGemsLabel'>0 gems</span>" +
              "<button id='shopCloseBtn' type='button'>Close</button>" +
            "</div>" +
          "</div>" +
          "<div class='shop-content'>" +
            "<div id='shopCategories' class='shop-categories'></div>" +
            "<div id='shopGrid' class='shop-grid'></div>" +
          "</div>" +
        "</div>";
      document.body.appendChild(modalEl);
      cardEl = modalEl.querySelector(".shop-card");
      titleEl = modalEl.querySelector("#shopTitle");
      gemsEl = modalEl.querySelector("#shopGemsLabel");
      categoriesEl = modalEl.querySelector("#shopCategories");
      gridEl = modalEl.querySelector("#shopGrid");
      closeBtnEl = modalEl.querySelector("#shopCloseBtn");
      if (closeBtnEl) closeBtnEl.addEventListener("click", closeModal);
      modalEl.addEventListener("click", (event) => {
        if (event.target === modalEl) closeModal();
      });
      if (gridEl) {
        gridEl.addEventListener("click", onGridClick);
      }
      injectStyles();
    }

    function injectStyles() {
      if (styleInjected) return;
      styleInjected = true;
      // Shop visuals are now handled by styles.css so all menus share one theme system.
    }

    function buildCategories(entries) {
      const set = new Set();
      entries.forEach((e) => set.add(e.category || "General"));
      const list = Array.from(set);
      list.sort((a, b) => a.localeCompare(b));
      if (!selectedCategory || !set.has(selectedCategory)) {
        selectedCategory = list[0] || "General";
      }
      return list;
    }

    function formatGrants(entry) {
      const defs = get("getBlockDefs", {}) || {};
      const cosmetics = Array.isArray(get("getCosmeticItems", [])) ? get("getCosmeticItems", []) : [];
      const cosById = {};
      cosmetics.forEach((c) => { if (c && c.id) cosById[c.id] = c; });
      const parts = [];
      Object.keys(entry.grants.blocks).forEach((k) => {
        const id = Number(k);
        const qty = entry.grants.blocks[id];
        const def = defs[id];
        const name = def && def.name ? def.name : ("Block " + id);
        parts.push(name + " x" + qty);
      });
      Object.keys(entry.grants.cosmetics).forEach((id) => {
        const qty = entry.grants.cosmetics[id];
        const item = cosById[id];
        const name = item && item.name ? item.name : id;
        parts.push(name + " x" + qty);
      });
      return parts.join(" | ") || "No rewards configured";
    }

    function canBuy(entry) {
      const gems = getPlayerGems();
      if (gems < entry.priceGems) return false;
      const inv = get("getInventory", {}) || {};
      const cosInv = get("getCosmeticInventory", {}) || {};
      const limit = getItemLimit();
      for (const key of Object.keys(entry.grants.blocks)) {
        const id = Number(key);
        const qty = Math.max(0, Math.floor(Number(entry.grants.blocks[id]) || 0));
        if (!qty) continue;
        const current = Math.max(0, Math.floor(Number(inv[id]) || 0));
        if (current + qty > limit) return false;
      }
      for (const id of Object.keys(entry.grants.cosmetics)) {
        const qty = Math.max(0, Math.floor(Number(entry.grants.cosmetics[id]) || 0));
        if (!qty) continue;
        const current = Math.max(0, Math.floor(Number(cosInv[id]) || 0));
        if (current + qty > limit) return false;
      }
      return true;
    }

    function render() {
      ensureDom();
      const entries = getCatalog();
      const categories = buildCategories(entries);
      if (titleEl) titleEl.textContent = "Gem Shop";
      if (gemsEl) gemsEl.textContent = getPlayerGems() + " gems";
      if (categoriesEl) {
        categoriesEl.innerHTML = categories.map((cat) => {
          const active = cat === selectedCategory ? " active" : "";
          return "<button type='button' class='shop-cat-btn" + active + "' data-shop-category='" + esc(cat) + "'>" + esc(cat) + "</button>";
        }).join("");
        categoriesEl.onclick = (event) => {
          const target = event.target;
          if (!(target instanceof HTMLElement)) return;
          const cat = (target.dataset.shopCategory || "").trim();
          if (!cat) return;
          selectedCategory = cat;
          render();
        };
      }
      const filtered = entries.filter((e) => e.category === selectedCategory);
      if (gridEl) {
        if (!filtered.length) {
          gridEl.innerHTML = "<div class='shop-item'><h4>No items</h4><p>Add entries in <code>SHOP_CATALOG</code> inside <code>shop.js</code>.</p></div>";
        } else {
          gridEl.innerHTML = filtered.map((entry) => {
            const allowed = canBuy(entry);
            const imageHtml = entry.image
              ? `<div class="shop-item-image"><img src="${esc(entry.image)}" alt="${esc(entry.name)}" loading="lazy"></div>`
              : "";
            return "<div class='shop-item'>" +
              imageHtml +
              "<h4>" + esc(entry.name) + "</h4>" +
              "<p>" + esc(entry.description || "No description.") + "</p>" +
              "<div class='shop-grants'>" + esc(formatGrants(entry)) + "</div>" +
              "<div class='shop-buy-row'>" +
                "<span class='shop-price'>" + entry.priceGems + " gems</span>" +
                "<button type='button' class='shop-buy' data-shop-buy='" + esc(entry.id) + "'" + (allowed ? "" : " disabled") + ">Buy</button>" +
              "</div>" +
            "</div>";
          }).join("");
        }
      }
    }

    function findEntryById(id) {
      const list = getCatalog();
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) return list[i];
      }
      return null;
    }

    function performPurchase(entry) {
      if (!entry) return;
      if (!canBuy(entry)) {
        post("Cannot buy this item. Not enough gems or inventory limit reached.");
        render();
        return;
      }
      const spendFn = opts.spendPlayerGems;
      if (typeof spendFn !== "function" || !spendFn(entry.priceGems)) {
        post("Not enough gems.");
        render();
        return;
      }
      const inv = get("getInventory", {}) || {};
      const cosInv = get("getCosmeticInventory", {}) || {};
      Object.keys(entry.grants.blocks).forEach((key) => {
        const id = Number(key);
        const qty = Math.max(0, Math.floor(Number(entry.grants.blocks[id]) || 0));
        if (!qty) return;
        inv[id] = Math.max(0, Math.floor(Number(inv[id]) || 0)) + qty;
      });
      Object.keys(entry.grants.cosmetics).forEach((id) => {
        const qty = Math.max(0, Math.floor(Number(entry.grants.cosmetics[id]) || 0));
        if (!qty) return;
        cosInv[id] = Math.max(0, Math.floor(Number(cosInv[id]) || 0)) + qty;
      });
      const save = opts.saveInventory;
      if (typeof save === "function") save();
      const refresh = opts.refreshToolbar;
      if (typeof refresh === "function") refresh();
      post("Purchased " + entry.name + " for " + entry.priceGems + " gems.");
      if (typeof opts.showAnnouncementPopup === "function") {
        opts.showAnnouncementPopup("Purchased: " + entry.name);
      }
      render();
    }

    function onGridClick(event) {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const id = (target.dataset.shopBuy || "").trim();
      if (!id) return;
      const entry = findEntryById(id);
      performPurchase(entry);
    }

    function openModal() {
      ensureDom();
      render();
      if (modalEl) modalEl.classList.remove("hidden");
    }

    function closeModal() {
      if (modalEl) modalEl.classList.add("hidden");
    }

    function isOpen() {
      return Boolean(modalEl && !modalEl.classList.contains("hidden"));
    }

    return {
      openModal,
      closeModal,
      isOpen,
      render,
      getCatalog
    };
  }

  return { createController };
})();
