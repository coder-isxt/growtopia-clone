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
      modalEl.className = "shop-modal hidden";
      modalEl.innerHTML =
        "<div class='shop-card'>" +
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
      const style = document.createElement("style");
      style.id = "shopStyles";
      style.textContent =
        ".shop-modal{position:fixed;inset:0;z-index:190;display:flex;align-items:center;justify-content:center;background:rgba(2,8,15,.74)}" +
        ".shop-modal.hidden{display:none}" +
        ".shop-card{width:min(920px,96vw);max-height:88vh;display:grid;grid-template-rows:auto minmax(0,1fr);background:linear-gradient(180deg,rgba(10,19,30,.985),rgba(6,12,21,.99));border:1px solid rgba(90,130,178,.46);border-radius:12px;box-shadow:0 24px 80px rgba(0,0,0,.58);overflow:hidden}" +
        ".shop-header{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid rgba(90,130,178,.32)}" +
        ".shop-header-right{display:flex;align-items:center;gap:8px}" +
        ".shop-header-right button{min-height:32px;padding:0 12px;border-radius:8px;border:1px solid rgba(98,141,192,.56);background:linear-gradient(180deg,rgba(18,36,56,.95),rgba(10,22,38,.95));color:#eef6ff;cursor:pointer}" +
        "#shopGemsLabel{font-size:13px;font-weight:700;color:#2dd4bf}" +
        ".shop-content{display:grid;grid-template-columns:180px minmax(0,1fr);min-height:0}" +
        ".shop-categories{display:flex;flex-direction:column;gap:8px;padding:12px;border-right:1px solid rgba(90,130,178,.24);overflow:auto}" +
        ".shop-cat-btn{min-height:34px;padding:0 10px;text-align:left;border-radius:8px;border:1px solid rgba(98,141,192,.42);background:rgba(7,16,28,.72);color:#eef6ff;cursor:pointer}" +
        ".shop-cat-btn.active{border-color:rgba(45,212,191,.74);background:rgba(20,184,166,.2)}" +
        ".shop-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:10px;padding:12px;overflow:auto}" +
        ".shop-item{display:grid;gap:8px;padding:10px;border-radius:10px;border:1px solid rgba(98,141,192,.35);background:rgba(9,18,30,.7)}" +
        ".shop-item-image{width:100%;height:64px;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.2);border-radius:6px;overflow:hidden;margin-bottom:4px}" +
        ".shop-item-image img{max-width:100%;max-height:100%;object-fit:contain}" +
        ".shop-item h4{margin:0;font-size:14px;line-height:1.25;color:#f6fbff}" +
        ".shop-item p{margin:0;font-size:12px;line-height:1.35;opacity:.86;color:#dbecff;min-height:32px}" +
        ".shop-item .shop-grants{font-size:11px;line-height:1.3;opacity:.88;color:#cde8ff;word-break:break-word}" +
        ".shop-item .shop-buy-row{display:flex;align-items:center;justify-content:space-between;gap:8px}" +
        ".shop-price{font-weight:700;color:#fbbf24}" +
        ".shop-buy{min-height:30px;padding:0 10px;border-radius:8px;border:1px solid rgba(45,212,191,.58);background:rgba(20,184,166,.2);color:#eafcff;cursor:pointer}" +
        ".shop-buy:disabled{opacity:.45;cursor:not-allowed;background:rgba(255,255,255,.08)}" +
        "@media (max-width:760px){.shop-content{grid-template-columns:1fr}.shop-categories{flex-direction:row;flex-wrap:wrap;border-right:none;border-bottom:1px solid rgba(255,255,255,.1)}}";
      document.head.appendChild(style);
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
