window.GTModules = window.GTModules || {};

window.GTModules.animations = (function createAnimationsModule() {
  function clamp(value, min, max) {
    const n = Number(value);
    if (!Number.isFinite(n)) return min;
    return Math.max(min, Math.min(max, n));
  }

  function hashSeed(input) {
    const text = String(input || "");
    let h = 0;
    for (let i = 0; i < text.length; i++) {
      h = ((h << 5) - h) + text.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h % 997) / 997;
  }

  function createTracker() {
    return new Map();
  }

  function sampleLocal(player) {
    const p = player || {};
    return {
      speed: Math.abs(Number(p.vx) || 0),
      vy: Number(p.vy) || 0,
      grounded: Boolean(p.grounded)
    };
  }

  function sampleRemote(tracker, id, x, y, nowMs) {
    const key = String(id || "remote");
    const t = Number(nowMs) || performance.now();
    const px = Number(x) || 0;
    const py = Number(y) || 0;
    const map = tracker instanceof Map ? tracker : new Map();
    const prev = map.get(key);
    let vx = 0;
    let vy = 0;
    if (prev) {
      const dt = Math.max(1, t - (prev.t || t));
      vx = (px - prev.x) / dt * 16.6667;
      vy = (py - prev.y) / dt * 16.6667;
    }
    map.set(key, { x: px, y: py, t });
    return {
      speed: Math.abs(vx),
      vy,
      grounded: Math.abs(vy) < 0.35
    };
  }

  function pruneTracker(tracker, keepIds) {
    if (!(tracker instanceof Map) || !Array.isArray(keepIds)) return;
    const keep = new Set(keepIds.map((id) => String(id || "")));
    for (const id of tracker.keys()) {
      if (!keep.has(id)) tracker.delete(id);
    }
  }

  function buildPose(motion, nowMs, seedInput) {
    const t = Number(nowMs) || performance.now();
    const m = motion || {};
    const seed = hashSeed(seedInput);
    const phase = t * 0.011 + seed * 10;
    const stride = clamp((Number(m.speed) || 0) / 3.7, 0, 1);
    const grounded = Boolean(m.grounded);
    const vy = Number(m.vy) || 0;

    let bodyBob = 0;
    let bodyTilt = 0;
    let wingFlap = 0;
    let swordSwing = 0;
    let armSwing = 0;
    let legSwing = 0;
    let eyeYOffset = 0;

    if (grounded) {
      bodyBob = Math.sin(phase) * (0.3 + stride * 1.3);
      bodyTilt = Math.sin(phase + 0.7) * (0.005 + stride * 0.025);
      wingFlap = Math.sin(t * 0.01 + seed * 12) * (0.2 + stride * 0.6);
      swordSwing = Math.sin(phase + 1.1) * (0.6 + stride * 2.2);
      armSwing = Math.sin(phase) * (0.2 + stride * 2.2);
      legSwing = Math.sin(phase + Math.PI) * (0.3 + stride * 2.6);
    } else {
      bodyBob = Math.sin(t * 0.01 + seed * 7) * 0.7;
      bodyTilt = clamp(vy * 0.02, -0.16, 0.16);
      wingFlap = Math.sin(t * 0.017 + seed * 12) * 0.9;
      swordSwing = clamp(vy * 0.2, -2, 2);
      armSwing = clamp(vy * 0.18, -1.2, 1.2);
      legSwing = clamp(vy * -0.22, -1.6, 1.6);
      eyeYOffset = vy < 0 ? -1 : 1;
    }

    const blinkGate = Math.sin(t * 0.0019 + seed * 33);
    const eyeHeight = blinkGate > 0.992 ? 1 : 3;

    return {
      bodyBob,
      bodyTilt,
      wingFlap,
      swordSwing,
      armSwing,
      legSwing,
      eyeYOffset,
      eyeHeight
    };
  }

  return {
    createTracker,
    sampleLocal,
    sampleRemote,
    pruneTracker,
    buildPose
  };
})();
