window.GTModules = window.GTModules || {};
window.GTModules.items = {
  getCosmeticAssetBasePath() {
    return "./assets/cosmetics";
  },
  getCosmeticCatalog() {
    const source = window.GTCosmeticCatalog || {};
    return {
      shirts: Array.isArray(source.shirts) ? source.shirts.slice() : [],
      pants: Array.isArray(source.pants) ? source.pants.slice() : [],
      shoes: Array.isArray(source.shoes) ? source.shoes.slice() : [],
      hats: Array.isArray(source.hats) ? source.hats.slice() : [],
      wings: Array.isArray(source.wings) ? source.wings.slice() : [],
      swords: Array.isArray(source.swords) ? source.swords.slice() : []
    };
  },
  getCosmeticItemsBySlot() {
    const catalog = this.getCosmeticCatalog();
    return {
      shirts: catalog.shirts.slice(),
      pants: catalog.pants.slice(),
      shoes: catalog.shoes.slice(),
      hats: catalog.hats.slice(),
      wings: catalog.wings.slice(),
      swords: catalog.swords.slice()
    };
  },
  getCosmeticItemsFlat() {
    const catalog = this.getCosmeticCatalog();
    return []
      .concat(catalog.shirts || [])
      .concat(catalog.pants || [])
      .concat(catalog.shoes || [])
      .concat(catalog.hats || [])
      .concat(catalog.wings || [])
      .concat(catalog.swords || []);
  },
  getTitleCatalog() {
    const titlesModule = (window.GTModules && window.GTModules.titles) || {};
    if (!titlesModule || typeof titlesModule.getCatalog !== "function") return [];
    const list = titlesModule.getCatalog();
    return Array.isArray(list) ? list.slice() : [];
  }
};
