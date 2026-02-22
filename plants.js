window.GTModules = window.GTModules || {};

window.GTModules.plants = (function () {
  function createController(opts) {
    const o = opts || {};
    const plantsByTile = new Map();
    const g = (k, d) => {
      const v = o[k];
      if (typeof v === "function") {
        try {
          const r = v();
          return r === undefined ? d : r;
        } catch (e) {
          return d;
        }
      }
      return v === undefined ? d : v;
    };
    const tileKey = (tx, ty) => String(tx) + "_" + String(ty);
    const treeGrowMsDefault = Math.max(5000, Number(g("getTreeGrowMs", 120000)) || 120000);
    const treeYieldBlockIdDefault = Math.max(1, Math.floor(Number(g("getTreeYieldBlockId", 4)) || 4));
    const treeStageCount = Math.max(2, Math.floor(Number(g("getTreeStageCount", 4)) || 4));

    function normalize(value) {
      if (!value || typeof value !== "object") return null;
      const growMs = Math.max(5000, Math.floor(Number(value.growMs) || treeGrowMsDefault));
      const plantedAt = Math.max(0, Math.floor(Number(value.plantedAt) || 0));
      const yieldBlockId = Math.floor(Number(value.yieldBlockId) || treeYieldBlockIdDefault);
      if (!plantedAt) return null;
      return {
        type: "tree",
        plantedAt,
        growMs,
        yieldBlockId: yieldBlockId > 0 ? yieldBlockId : treeYieldBlockIdDefault
      };
    }

    function setLocal(tx, ty, value) {
      const key = tileKey(tx, ty);
      const normalized = normalize(value);
      if (!normalized) {
        plantsByTile.delete(key);
        return;
      }
      plantsByTile.set(key, normalized);
    }

    function getLocal(tx, ty) {
      return plantsByTile.get(tileKey(tx, ty)) || null;
    }

    function save(tx, ty, value) {
      const key = tileKey(tx, ty);
      const normalized = normalize(value);
      const network = g("getNetwork", null);
      const plantsRef = network && network.plantsRef ? network.plantsRef : null;
      if (!normalized) {
        plantsByTile.delete(key);
        if (plantsRef) {
          plantsRef.child(key).remove().catch(() => {});
        }
        return;
      }
      plantsByTile.set(key, normalized);
      if (plantsRef) {
        plantsRef.child(key).set(normalized).catch(() => {});
      }
    }

    function clear() {
      plantsByTile.clear();
    }

    function getGrowthState(plant) {
      const rec = normalize(plant);
      if (!rec) return { stage: 0, mature: false, progress: 0 };
      const growMs = Math.max(1, Number(rec.growMs) || treeGrowMsDefault);
      const elapsed = Math.max(0, Date.now() - rec.plantedAt);
      const progress = Math.max(0, Math.min(1, elapsed / growMs));
      const mature = progress >= 0.999;
      const stage = mature
        ? (treeStageCount - 1)
        : Math.max(0, Math.min(treeStageCount - 2, Math.floor(progress * (treeStageCount - 1))));
      return { stage, mature, progress };
    }

    function createSeedPlant(nowMs, opts) {
      const config = opts && typeof opts === "object" ? opts : {};
      const plantedAt = Math.max(0, Math.floor(Number(nowMs) || Date.now()));
      const growMs = Math.max(5000, Math.floor(Number(config.growMs) || treeGrowMsDefault));
      const yieldBlockId = Math.max(1, Math.floor(Number(config.yieldBlockId) || treeYieldBlockIdDefault));
      return {
        type: "tree",
        plantedAt,
        growMs,
        yieldBlockId
      };
    }

    function getHarvestReward(plant, randomFn) {
      const rec = normalize(plant);
      if (!rec) return null;
      const growth = getGrowthState(rec);
      if (!growth.mature) return null;
      const rng = typeof randomFn === "function" ? randomFn : Math.random;
      const raw = Number(rng());
      const clamped = Number.isFinite(raw) ? Math.max(0, Math.min(0.999999, raw)) : 0;
      const amount = 1 + Math.floor(clamped * 5);
      return {
        blockId: Math.max(1, Math.floor(Number(rec.yieldBlockId) || treeYieldBlockIdDefault)),
        amount: Math.max(1, Math.min(5, amount))
      };
    }

    function drawTree(ctx, tx, ty, x, y, tileSize) {
      if (!ctx) return;
      const plant = getLocal(tx, ty);
      const growth = getGrowthState(plant);
      const stage = growth.stage;
      const TILE = Number(tileSize) || 32;
      ctx.save();
      if (stage <= 0) {
        ctx.fillStyle = "#6a3f1f";
        ctx.fillRect(x + TILE / 2 - 2, y + TILE - 7, 4, 4);
        ctx.fillStyle = "#67b54c";
        ctx.fillRect(x + TILE / 2 - 2, y + TILE - 10, 4, 3);
      } else if (stage === 1) {
        ctx.fillStyle = "#6a3f1f";
        ctx.fillRect(x + TILE / 2 - 2, y + TILE - 12, 4, 9);
        ctx.fillStyle = "#6ec95a";
        ctx.fillRect(x + TILE / 2 - 5, y + TILE - 17, 10, 6);
      } else if (stage === 2) {
        ctx.fillStyle = "#6a3f1f";
        ctx.fillRect(x + TILE / 2 - 3, y + TILE - 19, 6, 16);
        ctx.fillStyle = "#5fb64e";
        ctx.beginPath();
        ctx.arc(x + TILE / 2, y + TILE - 21, 10, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = "#6a3f1f";
        ctx.fillRect(x + TILE / 2 - 3, y + TILE - 24, 6, 21);
        ctx.fillStyle = "#58a945";
        ctx.beginPath();
        ctx.arc(x + TILE / 2, y + TILE - 30, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.18)";
        ctx.beginPath();
        ctx.arc(x + TILE / 2 - 4, y + TILE - 34, 6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    return {
      normalize,
      setLocal,
      getLocal,
      save,
      clear,
      getGrowthState,
      createSeedPlant,
      getHarvestReward,
      drawTree
    };
  }

  return { createController };
})();
