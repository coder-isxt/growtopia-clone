window.GTModules = window.GTModules || {};
window.GTModules.blocks = {
  getBlockDefs() {
    return {
      0: { name: "Air", color: "transparent", solid: false, icon: "A" },
      1: { name: "Grass", color: "#4caf50", solid: true, icon: "GR" },
      2: { name: "Dirt", color: "#8b5a2b", solid: true, icon: "DI" },
      3: { name: "Stone", color: "#818a93", solid: true, icon: "ST" },
      4: { name: "Wood", color: "#a87038", solid: true, icon: "WO" },
      5: { name: "Sand", color: "#dfc883", solid: true, icon: "SA" },
      6: { name: "Brick", color: "#bb5644", solid: true, icon: "BR" },
      7: { name: "Door", color: "#57c2ff", solid: false, unbreakable: true, icon: "DR" },
      8: { name: "Bedrock", color: "#4e5a68", solid: true, unbreakable: true, icon: "BD" },
      9: { name: "World Lock", color: "#ffd166", solid: true, icon: "WL" }
    };
  },
  hashWorldSeed(worldId) {
    let h = 2166136261;
    for (let i = 0; i < worldId.length; i++) {
      h ^= worldId.charCodeAt(i);
      h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
    }
    return h >>> 0;
  }
};
