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
    const rawVy = Number(p.vy) || 0;
    const grounded = Boolean(p.grounded);
    const prevSpeed = Number(p._animSpeed) || 0;
    let smoothSpeed = prevSpeed + (rawSpeed - prevSpeed) * 0.28;
    if (grounded && rawSpeed < 0.12 && Math.abs(rawVy) < 0.12) {
      // Kill tiny friction noise so idle does not micro-wobble.
      smoothSpeed *= 0.45;
      if (smoothSpeed < 0.03) smoothSpeed = 0;
    }
    p._animSpeed = smoothSpeed;
    return {
      speed: smoothSpeed,
      vy: rawVy,
      grounded
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
    let rawVx = clamp(vx, -8, 8);
    let rawVy = clamp(vy, -10, 10);
    if (Math.abs(rawVx) < 0.08) rawVx = 0;
    if (Math.abs(rawVy) < 0.08) rawVy = 0;
    const prevVx = prev && Number.isFinite(prev.vxSmooth) ? prev.vxSmooth : rawVx;
    const prevVy = prev && Number.isFinite(prev.vySmooth) ? prev.vySmooth : rawVy;
    const vxSmooth = prevVx + (rawVx - prevVx) * 0.32;
    const vySmooth = prevVy + (rawVy - prevVy) * 0.32;
    map.set(key, { x: px, y: py, t, vxSmooth, vySmooth });
    return {
      speed: Math.abs(vxSmooth),
      vy: vySmooth,
      grounded: Math.abs(vySmooth) < 0.35
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
      if (stride <= 0.0001) {
        // True grounded idle pose: no motion-driven offsets.
        bodyBob = 0;
        bodyTilt = 0;
        wingFlap = Math.sin(t * 0.0018 + seed * 8) * 0.03;
        wingOpen = 0.24;
        swordSwing = 0;
        armSwing = 0;
        legSwing = 0;
        eyeYOffset = 0;
      } else {
        const walkWave = Math.sin(phase);
        const walkWave2 = Math.sin(phase * 2);
        bodyBob = walkWave2 * (0.06 + stride * 0.48);
        bodyTilt = walkWave * (0.003 + stride * 0.016);
        wingFlap = Math.sin(t * (0.0024 + stride * 0.005) + seed * 8) * (0.06 + stride * 0.23);
        wingOpen = 0.24 + stride * 0.16;
        swordSwing = walkWave * (0.1 + stride * 1.05);
        armSwing = walkWave * (0.18 + stride * 1.45);
        legSwing = -walkWave * (0.24 + stride * 1.9);
        eyeYOffset = 0;
      }
    } else {
      const jumpUp = vy < -0.12;
      const fallDown = vy > 0.12;
      const airStrength = clamp(Math.abs(vy) / 4.2, 0, 1);
      const flapFreq = jumpUp ? 0.007 : 0.009;
      bodyBob = Math.sin(t * 0.004 + seed * 6) * 0.14 + (jumpUp ? -0.38 : (fallDown ? 0.42 : 0));
      bodyTilt = clamp(vy * 0.012, -0.11, 0.11);
      if (fallDown) {
        // Falling: keep wings opened and lifted upward.
        wingFlap = -0.22 - airStrength * 0.2 + Math.sin(t * flapFreq + seed * 11) * (0.08 + airStrength * 0.12);
        wingOpen = 0.84 + airStrength * 0.14;
      } else {
        wingFlap = Math.sin(t * flapFreq + seed * 11) * (0.22 + airStrength * 0.34);
        wingOpen = jumpUp ? 0.36 : 0.54;
      }
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
