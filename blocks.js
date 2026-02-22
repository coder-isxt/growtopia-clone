window.GTModules = window.GTModules || {};

window.GTModules.blocks = (function createBlocksModule() {
  const BLOCK_ASSET_BASE = "./assets/blocks";

  // Single source of truth for block variables.
  // Add/modify blocks here.
  const BLOCK_LIST = [
    { id: 0, key: "air", name: "Air", color: "transparent", solid: false, icon: "A", faIcon: "fa-regular fa-circle" },
    { id: 1, key: "grass_block", name: "Grass", color: "#4caf50", solid: true, icon: "GR", faIcon: "fa-solid fa-seedling", image: "terrain/grass.png" },
    { id: 2, key: "dirt_block", name: "Dirt", color: "#8b5a2b", solid: true, icon: "DI", faIcon: "fa-solid fa-mound", image: "terrain/dirt.png" },
    { id: 3, key: "stone_block", name: "Stone", color: "#818a93", solid: true, icon: "ST", faIcon: "fa-solid fa-cube", image: "terrain/stone.png" },
    { id: 4, key: "wood_block", name: "Wood", color: "#a87038", solid: true, icon: "WO", faIcon: "fa-solid fa-tree", image: "terrain/wood.png" },
    { id: 5, key: "sand_block", name: "Sand", color: "#dfc883", solid: true, icon: "SA", faIcon: "fa-regular fa-hourglass-half", image: "terrain/sand.png" },
    { id: 6, key: "brick_block", name: "Brick", color: "#bb5644", solid: true, icon: "BR", faIcon: "fa-solid fa-border-all", image: "terrain/brick.png" },
    { id: 7, key: "spawn_door", name: "Door", color: "#57c2ff", solid: false, unbreakable: true, icon: "DR", faIcon: "fa-solid fa-door-open", image: "special/spawndoor.png" },
    { id: 8, key: "bedrock", name: "Bedrock", color: "#4e5a68", solid: true, unbreakable: true, icon: "BD", faIcon: "fa-solid fa-mountain", image: "special/bedrock.png" },
    { id: 9, key: "world_lock", name: "World Lock", color: "#ffd166", solid: true, icon: "WL", faIcon: "fa-solid fa-lock", image: "special/world_lock.png" },
    { id: 10, key: "door_block", name: "Door Block", color: "#5fc2ff", solid: false, icon: "DB", faIcon: "fa-solid fa-door-open", image: "special/door.png" },
    { id: 11, key: "water_block", name: "Water", color: "rgba(72, 174, 255, 0.7)", solid: false, liquid: true, icon: "WA", faIcon: "fa-solid fa-water", image: "special/water.png" },
    { id: 12, key: "platform_block", name: "Platform", color: "#7a5a3f", solid: false, oneWay: true, icon: "PF", faIcon: "fa-solid fa-grip-lines", image: "special/platform.png" },
    { id: 13, key: "stair_block", name: "Stairs", color: "#b28457", solid: false, stair: true, rotatable: true, icon: "S1", faIcon: "fa-solid fa-stairs", image: "special/stairs.png" },
    { id: 14, key: "stair_block_r1", name: "Stair NE", color: "#b28457", solid: false, stair: true, rotatable: true, icon: "S2", faIcon: "fa-solid fa-stairs", image: "special/stair_block_r1.png" },
    { id: 15, key: "stair_block_r2", name: "Stair SE", color: "#b28457", solid: false, stair: true, rotatable: true, icon: "S3", faIcon: "fa-solid fa-stairs", image: "special/stair_block_r2.png" },
    { id: 16, key: "stair_block_r3", name: "Stair SW", color: "#b28457", solid: false, stair: true, rotatable: true, icon: "S4", faIcon: "fa-solid fa-stairs", image: "special/stair_block_r3.png" },
    { id: 17, key: "vending_machine", name: "Vending Machine", color: "#4d6b8b", solid: false, icon: "VM", faIcon: "fa-solid fa-store", image: "special/vending.png" },
    { id: 18, key: "sign_block", name: "Sign", color: "#b98a58", solid: false, icon: "SG", faIcon: "fa-solid fa-signs-post", image: "special/sign_block.png" },
    { id: 19, key: "anti_gravity_generator", name: "Anti Gravity Generator", color: "#6de9ff", solid: false, icon: "AG", faIcon: "fa-solid fa-meteor" },
    { id: 20, key: "camera_block", name: "Camera", color: "#8eb7d6", solid: true, icon: "CM", faIcon: "fa-solid fa-video", image: "special/camera.png" },
    { id: 21, key: "weather_machine", name: "Weather Machine", color: "#7aa8d9", solid: false, icon: "WM", faIcon: "fa-solid fa-cloud-sun-rain", image: "special/weather_machine.png" },
    { id: 22, key: "display_block", name: "Display Block", color: "#314154", solid: true, icon: "DP", faIcon: "fa-regular fa-square" },
    { id: 23, key: "wood_plank", name: "Wooden Plank", color: "#b4bcc5", solid: true, icon: "WP", faIcon: "fa-regular fa-square", image: "special/plank.png" },
    
    
    
    { id: 33, key: "spike_block", name: "Spikes NW", color: "#8d9aae", solid: false, lethal: true, rotatable: true, icon: "SP", faIcon: "fa-solid fa-triangle-exclamation", image: "special/spike.png" },
    { id: 37, key: "spike_block_r1", name: "Spikes NE", color: "#8d9aae", solid: false, lethal: true, rotatable: true, icon: "SP", faIcon: "fa-solid fa-triangle-exclamation", image: "special/spike.png" },
    { id: 38, key: "spike_block_r2", name: "Spikes SE", color: "#8d9aae", solid: false, lethal: true, rotatable: true, icon: "SP", faIcon: "fa-solid fa-triangle-exclamation", image: "special/spike.png" },
    { id: 39, key: "spike_block_r3", name: "Spikes SW", color: "#8d9aae", solid: false, lethal: true, rotatable: true, icon: "SP", faIcon: "fa-solid fa-triangle-exclamation", image: "special/spike.png" },
    { id: 40, key: "spawn_mover", name: "Spawn Mover", color: "#79c6ff", solid: false, seedable: false, icon: "SM", faIcon: "fa-solid fa-location-crosshairs", image: "special/spawn_mover.png" },
    { id: 41, key: "mystery_block", name: "Mystery Block", color: "#a46cff", solid: true, icon: "MB", faIcon: "fa-solid fa-dice", image: "special/mystery_block.png" },
    { id: 34, key: "donation_box", name: "Donation Box", color: "#8f6d4f", solid: true, donationBox: true, icon: "DN", faIcon: "fa-solid fa-box-open", image: "special/donation_block.png" },
    { id: 36, key: "storage_chest", name: "Storage Chest", color: "#7f5f3e", solid: true, chestStorage: true, icon: "CH", faIcon: "fa-solid fa-box-archive", image: "special/chest.png" },
    { id: 35, key: "leaf_block", name: "Leaf Block", color: "#467f3e", solid: true, icon: "CH", faIcon: "fa-solid fa-box-archive", image: "special/leaf.png" }
  ];

  function resolveImagePath(image) {
    const raw = String(image || "").trim();
    if (!raw) return "";
    if (/^(https?:)?\/\//.test(raw) || raw.startsWith("/") || raw.startsWith("./") || raw.startsWith("../")) {
      return raw;
    }
    return BLOCK_ASSET_BASE.replace(/\/+$/, "") + "/" + raw.replace(/^\/+/, "");
  }

  function buildDefsFromList(list) {
    const defs = {};
    const src = Array.isArray(list) ? list : [];
    for (let i = 0; i < src.length; i++) {
      const row = src[i] || {};
      const id = Math.floor(Number(row.id));
      if (!Number.isInteger(id) || id < 0) continue;
      defs[id] = {
        ...row,
        id,
        imagePath: resolveImagePath(row.image || row.imagePath)
      };
    }
    return defs;
  }

  return {
    getBlockAssetBasePath() {
      return BLOCK_ASSET_BASE;
    },
    getBlockList() {
      return BLOCK_LIST.map((entry) => ({ ...entry }));
    },
    getBlockDefs() {
      return buildDefsFromList(BLOCK_LIST);
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
})();
