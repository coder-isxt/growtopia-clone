window.GTModules = window.GTModules || {};
window.GTModules.blocks = {
  getBlockDefs() {
    return {
      0: { name: "Air", color: "transparent", solid: false },
      1: { name: "Grass", color: "#4caf50", solid: true },
      2: { name: "Dirt", color: "#8b5a2b", solid: true },
      3: { name: "Stone", color: "#818a93", solid: true },
      4: { name: "Wood", color: "#a87038", solid: true },
      5: { name: "Sand", color: "#dfc883", solid: true },
      6: { name: "Brick", color: "#bb5644", solid: true },
      7: { name: "Door", color: "#57c2ff", solid: false },
      8: { name: "Bedrock", color: "#4e5a68", solid: true, unbreakable: true }
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
