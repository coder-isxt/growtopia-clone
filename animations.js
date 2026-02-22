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
    const rawSpeed = Math.abs(Number(p.vx) || 0);
    const prevSpeed = Number(p._animSpeed) || 0;
    const smoothSpeed = prevSpeed + (rawSpeed - prevSpeed) * 0.28;
    p._animSpeed = smoothSpeed;
    return {
      speed: smoothSpeed,
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
    const rawVx = clamp(vx, -8, 8);
    const rawVy = clamp(vy, -10, 10);
    const prevVx = prev && Number.isFinite(prev.vxSmooth) ? prev.vxSmooth : rawVx;
    const prevVy = prev && Number.isFinite(prev.vySmooth) ? prev.vySmooth : rawVy;
    const vxSmooth = prevVx + (rawVx - prevVx) * 0.32;
    const vySmooth = prevVy + (rawVy - prevVy) * 0.32;
    map.set(key, { x: px, y: py, t, vxSmooth, vySmooth });
    return {
      speed: Math.abs(vxSmooth),
      vy: vySmooth,
      grounded: Math.abs(vySmooth) < 0.2
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
    let stride = clamp((Number(m.speed) || 0) / 2.6, 0, 1);
    const grounded = Boolean(m.grounded);
    const vy = Number(m.vy) || 0;
    const walkFreq = 0.003 + stride * 0.012;
    const phase = t * walkFreq + seed * 10;

    let bodyBob = 0;
    let bodyTilt = 0;
    let wingFlap = 0;
    let wingOpen = 0.24;
    let swordSwing = 0;
    let armSwing = 0;
    let legSwing = 0;
    let eyeYOffset = 0;

    if (grounded) {
      // Deadzone removes tiny idle-speed oscillation that looks like friction jitter.
      if (stride < 0.12) stride = 0;
      const walkWave = Math.sin(phase);
      const walkWave2 = Math.sin(phase * 2);
      bodyBob = walkWave2 * (0.08 + stride * 0.55);
      bodyTilt = walkWave * (0.004 + stride * 0.018);
      wingFlap = Math.sin(t * (0.0024 + stride * 0.005) + seed * 8) * (0.06 + stride * 0.23);
      wingOpen = 0.24 + stride * 0.16;
      swordSwing = walkWave * (0.12 + stride * 1.2);
      armSwing = walkWave * (0.22 + stride * 1.7);
      legSwing = -walkWave * (0.3 + stride * 2.2);
      eyeYOffset = 0;
    } else {
      const jumpUp = vy < -0.12;
      const fallDown = vy > 0.12;
      const airStrength = clamp(Math.abs(vy) / 4.2, 0, 1);
      const flapFreq = jumpUp ? 0.007 : 0.009;
      bodyBob = Math.sin(t * 0.004 + seed * 6) * 0.14 + (jumpUp ? -0.38 : (fallDown ? 0.42 : 0));
      bodyTilt = clamp(vy * 0.012, -0.11, 0.11);
      wingFlap = Math.sin(t * flapFreq + seed * 11) * (0.25 + airStrength * 0.45);
      wingOpen = jumpUp ? 0.34 : (fallDown ? (0.72 + airStrength * 0.2) : 0.5);
      swordSwing = clamp(vy * 0.1, -1.2, 1.2);
      if (jumpUp) {
        armSwing = -0.55 - airStrength * 0.5;
        legSwing = 0.45 + airStrength * 0.55;
        eyeYOffset = -1;
      } else if (fallDown) {
        armSwing = 0.55 + airStrength * 0.45;
        legSwing = -0.55 - airStrength * 0.55;
        eyeYOffset = 1;
      } else {
        armSwing = clamp(vy * 0.12, -0.8, 0.8);
        legSwing = clamp(vy * -0.15, -0.9, 0.9);
        eyeYOffset = 0;
      }
    }

    const blinkGate = Math.sin(t * 0.0019 + seed * 33);
    const eyeHeight = blinkGate > 0.992 ? 1 : 3;

    return {
      bodyBob,
      bodyTilt,
      wingFlap,
      wingOpen,
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
