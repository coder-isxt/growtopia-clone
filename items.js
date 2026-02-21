window.GTModules = window.GTModules || {};
window.GTModules.items = {
  getCosmeticCatalog() {
    return {
      clothes: [
        { id: "cloth_tunic", name: "Cloth Tunic", color: "#f2b880", icon: "TU", rarity: "common" },
        { id: "hoodie_blue", name: "Blue Hoodie", color: "#5f8cff", icon: "HD", rarity: "rare" },
        { id: "armor_iron", name: "Iron Armor", color: "#a9b5c2", icon: "AR", rarity: "epic" }
      ],
      wings: [
        { id: "angel_white", name: "Angel Wings", color: "#ecf3ff", icon: "AW", rarity: "rare", doubleJump: true },
        { id: "bat_dark", name: "Bat Wings", color: "#48505f", icon: "BW", rarity: "rare", doubleJump: true },
        { id: "leaf_green", name: "Leaf Wings", color: "#5ebd79", icon: "LW", rarity: "rare", doubleJump: true }
      ],
      swords: [
        { id: "wood_blade", name: "Wood Blade", color: "#9a6a3f", icon: "WB", rarity: "common" },
        { id: "iron_sword", name: "Iron Sword", color: "#c7d2dc", icon: "IS", rarity: "rare" },
        { id: "flame_saber", name: "Flame Saber", color: "#ff7e57", icon: "FS", rarity: "epic" }
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
