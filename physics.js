window.GTModules = window.GTModules || {};
window.GTModules.physics = {
  isLiquidTile(world, blockDefs, tx, ty, worldW, worldH) {
    if (tx < 0 || ty < 0 || tx >= worldW || ty >= worldH) return false;
    const id = world[ty][tx];
    const def = blockDefs[id];
    return Boolean(def && def.liquid);
  },

  isOneWayPlatformTile(world, blockDefs, tx, ty, worldW, worldH) {
    if (tx < 0 || ty < 0 || tx >= worldW || ty >= worldH) return false;
    const id = world[ty][tx];
    const def = blockDefs[id];
    return Boolean(def && def.oneWay);
  },

  rectCollides(world, blockDefs, x, y, w, h, tileSize, worldW, worldH) {
    const left = Math.floor(x / tileSize);
    const right = Math.floor((x + w - 1) / tileSize);
    const top = Math.floor(y / tileSize);
    const bottom = Math.floor((y + h - 1) / tileSize);
    for (let ty = top; ty <= bottom; ty++) {
      for (let tx = left; tx <= right; tx++) {
        if (tx < 0 || ty < 0 || tx >= worldW || ty >= worldH) return true;
        const id = world[ty][tx];
        const def = blockDefs[id];
        if (def && def.solid) return true;
      }
    }
    return false;
  },

  rectTouchesLiquid(world, blockDefs, x, y, w, h, tileSize, worldW, worldH) {
    const left = Math.floor(x / tileSize);
    const right = Math.floor((x + w - 1) / tileSize);
    const top = Math.floor(y / tileSize);
    const bottom = Math.floor((y + h - 1) / tileSize);
    for (let ty = top; ty <= bottom; ty++) {
      for (let tx = left; tx <= right; tx++) {
        if (this.isLiquidTile(world, blockDefs, tx, ty, worldW, worldH)) return true;
      }
    }
    return false;
  },

  rectCollidesOneWayPlatformDownward(world, blockDefs, x, prevY, nextY, w, h, tileSize, worldW, worldH) {
    if (nextY <= prevY) return false;
    const left = Math.floor(x / tileSize);
    const right = Math.floor((x + w - 1) / tileSize);
    const prevBottom = prevY + h;
    const nextBottom = nextY + h;
    const startTy = Math.floor((prevBottom - 1) / tileSize);
    const endTy = Math.floor((nextBottom - 1) / tileSize);
    for (let ty = startTy; ty <= endTy; ty++) {
      for (let tx = left; tx <= right; tx++) {
        if (!this.isOneWayPlatformTile(world, blockDefs, tx, ty, worldW, worldH)) continue;
        const tileTop = ty * tileSize;
        if (prevBottom <= tileTop + 1 && nextBottom >= tileTop + 1) return true;
      }
    }
    return false;
  },

  getStairSurfaceY(id, tx, ty, worldX, tileSize) {
    const localX = Math.max(0, Math.min(1, (worldX - tx * tileSize) / tileSize));
    let localY = 1 - localX;
    if (id === 14 || id === 15) localY = localX;
    return ty * tileSize + localY * tileSize;
  },

  snapPlayerToStairSurface(player, world, stairIds, tileSize, playerW, playerH, worldW, worldH) {
    const footLeftX = player.x + 3;
    const footRightX = player.x + playerW - 3;
    const bottomY = player.y + playerH;
    const checkFeet = [footLeftX, footRightX];
    let targetBottom = Infinity;
    let found = false;
    for (let i = 0; i < checkFeet.length; i++) {
      const fx = checkFeet[i];
      const tx = Math.floor(fx / tileSize);
      const ty = Math.floor((bottomY - 1) / tileSize);
      if (tx < 0 || ty < 0 || tx >= worldW || ty >= worldH) continue;
      const id = world[ty][tx];
      if (!stairIds.includes(id)) continue;
      const surfaceY = this.getStairSurfaceY(id, tx, ty, fx, tileSize);
      if (bottomY < surfaceY - 5 || bottomY > surfaceY + 10) continue;
      targetBottom = Math.min(targetBottom, surfaceY);
      found = true;
    }
    if (!found) return false;
    player.y = targetBottom - playerH;
    player.grounded = true;
    if (player.vy > 0) player.vy = 0;
    return true;
  }
};
