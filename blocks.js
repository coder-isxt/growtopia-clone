window.GTModules = window.GTModules || {};
window.GTModules.blocks = {
  getBlockDefs() {
    return {
      0: { name: "Air", color: "transparent", solid: false, icon: "A", faIcon: "fa-regular fa-circle" },
      1: { name: "Grass", color: "#4caf50", solid: true, icon: "GR", faIcon: "fa-solid fa-seedling" },
      2: { name: "Dirt", color: "#8b5a2b", solid: true, icon: "DI", faIcon: "fa-solid fa-mound" },
      3: { name: "Stone", color: "#818a93", solid: true, icon: "ST", faIcon: "fa-solid fa-cube" },
      4: { name: "Wood", color: "#a87038", solid: true, icon: "WO", faIcon: "fa-solid fa-tree" },
      5: { name: "Sand", color: "#dfc883", solid: true, icon: "SA", faIcon: "fa-regular fa-hourglass-half" },
      6: { name: "Brick", color: "#bb5644", solid: true, icon: "BR", faIcon: "fa-solid fa-border-all" },
      7: { name: "Door", color: "#57c2ff", solid: false, unbreakable: true, icon: "DR", faIcon: "fa-solid fa-door-open" },
      8: { name: "Bedrock", color: "#4e5a68", solid: true, unbreakable: true, icon: "BD", faIcon: "fa-solid fa-mountain" },
      9: { name: "World Lock", color: "#ffd166", solid: true, icon: "WL", faIcon: "fa-solid fa-lock" },
      10: { name: "Door Block", color: "#5fc2ff", solid: false, icon: "DB", faIcon: "fa-solid fa-door-open" },
      11: { name: "Water", color: "rgba(72, 174, 255, 0.7)", solid: false, liquid: true, icon: "WA", faIcon: "fa-solid fa-water" },
      12: { name: "Platform", color: "#7a5a3f", solid: false, oneWay: true, icon: "PF", faIcon: "fa-solid fa-grip-lines" },
      13: { name: "Stair NE", color: "#b28457", solid: true, rotatable: true, icon: "S1", faIcon: "fa-solid fa-stairs" },
      14: { name: "Stair SE", color: "#b28457", solid: true, rotatable: true, icon: "S2", faIcon: "fa-solid fa-stairs" },
      15: { name: "Stair SW", color: "#b28457", solid: true, rotatable: true, icon: "S3", faIcon: "fa-solid fa-stairs" },
      16: { name: "Stair NW", color: "#b28457", solid: true, rotatable: true, icon: "S4", faIcon: "fa-solid fa-stairs" }
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
