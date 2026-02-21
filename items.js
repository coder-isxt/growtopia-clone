window.GTModules = window.GTModules || {};
window.GTModules.items = {
  getCosmeticCatalog() {
    return {
      clothes: [
        { id: "cloth_tunic", name: "Cloth Tunic", color: "#f2b880", icon: "TU", faIcon: "fa-solid fa-shirt", rarity: "common" },
        { id: "hoodie_blue", name: "Blue Hoodie", color: "#5f8cff", icon: "HD", faIcon: "fa-solid fa-shirt", rarity: "rare" },
        { id: "armor_iron", name: "Iron Armor", color: "#a9b5c2", icon: "AR", faIcon: "fa-solid fa-shield-halved", rarity: "epic" }
      ],
      wings: [
        { id: "angel_white", name: "Angel Wings", color: "#ecf3ff", icon: "AW", faIcon: "fa-solid fa-dove", rarity: "rare", doubleJump: true },
        { id: "bat_dark", name: "Bat Wings", color: "#48505f", icon: "BW", faIcon: "fa-solid fa-feather-pointed", rarity: "rare", doubleJump: true },
        { id: "leaf_green", name: "Leaf Wings", color: "#5ebd79", icon: "LW", faIcon: "fa-solid fa-leaf", rarity: "rare", doubleJump: true }
      ],
      swords: [
        { id: "wood_blade", name: "Wood Blade", color: "#9a6a3f", icon: "WB", faIcon: "fa-solid fa-sword", rarity: "common" },
        { id: "iron_sword", name: "Iron Sword", color: "#c7d2dc", icon: "IS", faIcon: "fa-solid fa-sword", rarity: "rare" },
        { id: "flame_saber", name: "Flame Saber", color: "#ff7e57", icon: "FS", faIcon: "fa-solid fa-wand-sparkles", rarity: "epic" }
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
