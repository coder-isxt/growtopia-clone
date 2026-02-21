window.GTModules = window.GTModules || {};
window.GTModules.blocks = {
  getBlockDefs() {
    return {
      0: { key: "air", name: "Air", color: "transparent", solid: false, icon: "A", faIcon: "fa-regular fa-circle" },
      1: { key: "grass_block", name: "Grass", color: "#4caf50", solid: true, icon: "GR", faIcon: "fa-solid fa-seedling" },
      2: { key: "dirt_block", name: "Dirt", color: "#8b5a2b", solid: true, icon: "DI", faIcon: "fa-solid fa-mound" },
      3: { key: "stone_block", name: "Stone", color: "#818a93", solid: true, icon: "ST", faIcon: "fa-solid fa-cube" },
      4: { key: "wood_block", name: "Wood", color: "#a87038", solid: true, icon: "WO", faIcon: "fa-solid fa-tree" },
      5: { key: "sand_block", name: "Sand", color: "#dfc883", solid: true, icon: "SA", faIcon: "fa-regular fa-hourglass-half" },
      6: { key: "brick_block", name: "Brick", color: "#bb5644", solid: true, icon: "BR", faIcon: "fa-solid fa-border-all" },
      7: { key: "spawn_door", name: "Door", color: "#57c2ff", solid: false, unbreakable: true, icon: "DR", faIcon: "fa-solid fa-door-open" },
      8: { key: "bedrock", name: "Bedrock", color: "#4e5a68", solid: true, unbreakable: true, icon: "BD", faIcon: "fa-solid fa-mountain" },
      9: { key: "world_lock", name: "World Lock", color: "#ffd166", solid: true, icon: "WL", faIcon: "fa-solid fa-lock" },
      10: { key: "door_block", name: "Door Block", color: "#5fc2ff", solid: false, icon: "DB", faIcon: "fa-solid fa-door-open" },
      11: { key: "water_block", name: "Water", color: "rgba(72, 174, 255, 0.7)", solid: false, liquid: true, icon: "WA", faIcon: "fa-solid fa-water" },
      12: { key: "platform_block", name: "Platform", color: "#7a5a3f", solid: false, oneWay: true, icon: "PF", faIcon: "fa-solid fa-grip-lines" },
      13: { key: "stair_block", name: "Stair NE", color: "#b28457", solid: false, stair: true, rotatable: true, icon: "S1", faIcon: "fa-solid fa-stairs" },
      14: { key: "stair_block_r1", name: "Stair SE", color: "#b28457", solid: false, stair: true, rotatable: true, icon: "S2", faIcon: "fa-solid fa-stairs" },
      15: { key: "stair_block_r2", name: "Stair SW", color: "#b28457", solid: false, stair: true, rotatable: true, icon: "S3", faIcon: "fa-solid fa-stairs" },
      16: { key: "stair_block_r3", name: "Stair NW", color: "#b28457", solid: false, stair: true, rotatable: true, icon: "S4", faIcon: "fa-solid fa-stairs" },
      17: { key: "vending_machine", name: "Vending Machine", color: "#4d6b8b", solid: true, icon: "VM", faIcon: "fa-solid fa-store" }
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
