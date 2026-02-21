window.GTModules = window.GTModules || {};
window.GTModules.items = {
  getCosmeticAssetBasePath() {
    return "./assets/cosmetics";
  },
  getCosmeticCatalog() {
    return {
      clothes: [
        { id: "cloth_tunic", name: "Cloth Tunic", color: "#f2b880", icon: "TU", faIcon: "fa-solid fa-shirt", rarity: "common", image: "clothes/cloth_tunic.png" },
        { id: "hoodie_blue", name: "Blue Hoodie", color: "#5f8cff", icon: "HD", faIcon: "fa-solid fa-shirt", rarity: "rare", image: "clothes/hoodie_blue.png" },
        { id: "armor_iron", name: "Iron Armor", color: "#a9b5c2", icon: "AR", faIcon: "fa-solid fa-shield-halved", rarity: "epic", image: "clothes/armor_iron.png" }
      ],
      wings: [
        { id: "angel_white", name: "Angel Wings", color: "#ecf3ff", icon: "AW", faIcon: "fa-solid fa-dove", rarity: "rare", doubleJump: true, image: "wings/angel_white.png", offsetX: 3, offsetY: 0 },
        { id: "bat_dark", name: "Bat Wings", color: "#48505f", icon: "BW", faIcon: "fa-solid fa-feather-pointed", rarity: "rare", doubleJump: true, image: "wings/bat_dark.png", offsetX: 3, offsetY: 0 },
        { id: "leaf_green", name: "Leaf Wings", color: "#5ebd79", icon: "LW", faIcon: "fa-solid fa-leaf", rarity: "rare", doubleJump: true, image: "wings/leaf_green.png", offsetX: 3, offsetY: 0 },
        { id: "black_outline_wings", name: "Black Outline Wings", color: "#ffffff", icon: "BOW", faIcon: "fa-solid fa-leaf", rarity: "epic", doubleJump: true, image: "wings/black_outline_wings.png", offsetX: 2, offsetY: 0 },
        { id: "golden_evil_wings", name: "Golden Evil Wings", color: "#ffffff", icon: "GEW", faIcon: "fa-solid fa-leaf", rarity: "epic", doubleJump: true, image: "wings/golden_evil.png", offsetX: 6, offsetY: 0 },
        { id: "pink_baby_angels", name: "Pink Baby Angel Wings", color: "#ffffff", icon: "GEW", faIcon: "fa-solid fa-leaf", rarity: "epic", doubleJump: true, image: "wings/pink_baby_angels.png", offsetX: 6, offsetY: 0 },
      ],
      swords: [
        { id: "wood_blade", name: "Wood Blade", color: "#9a6a3f", icon: "WB", faIcon: "fa-solid fa-sword", rarity: "common", image: "swords/wood_blade.png" },
        { id: "iron_sword", name: "Iron Sword", color: "#c7d2dc", icon: "IS", faIcon: "fa-solid fa-sword", rarity: "rare", image: "swords/iron_sword.png" },
        { id: "flame_saber", name: "Flame Saber", color: "#ff7e57", icon: "FS", faIcon: "fa-solid fa-wand-sparkles", rarity: "epic", image: "swords/flame_saber.png" }
      ]
    };
  },
  getCosmeticItemsBySlot() {
    const catalog = this.getCosmeticCatalog();
    return {
      clothes: catalog.clothes.slice(),
      wings: catalog.wings.slice(),
      swords: catalog.swords.slice()
    };
  },
  getCosmeticItemsFlat() {
    const catalog = this.getCosmeticCatalog();
    return []
      .concat(catalog.clothes || [])
      .concat(catalog.wings || [])
      .concat(catalog.swords || []);
  }
};
