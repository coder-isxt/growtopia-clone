window.GTModules = window.GTModules || {};

window.ANTICHEAT_WEBHOOK_ENDPOINT = window.ANTICHEAT_WEBHOOK_ENDPOINT || "https://growtopia.isxtgg.workers.dev/webhook";
window.ANTICHEAT_LOCAL_WEBHOOK_STORAGE = window.ANTICHEAT_LOCAL_WEBHOOK_STORAGE || "growtopia_local_ac_webhook_v1";

window.GTModules.anticheat = (function createAntiCheatModule() {
  let webhookUrlPromise = null;

  function isLocalRuntime() {
    const host = (window.location && window.location.hostname || "").toLowerCase();
    const protocol = (window.location && window.location.protocol || "").toLowerCase();
    return protocol === "file:" || host === "localhost" || host === "127.0.0.1" || host === "::1";
  }

  function getLocalWebhookFromPrompt() {
    const key = window.ANTICHEAT_LOCAL_WEBHOOK_STORAGE || "growtopia_local_ac_webhook_v1";
    try {
      const cached = localStorage.getItem(key);
      if (cached && cached.trim()) return cached.trim();
    } catch (error) {
      // ignore localStorage failures
    }
    const entered = window.prompt("Enter Anti-Cheat Discord webhook URL (local run):");
    const safe = (entered || "").trim();
    if (!safe) return "";
    try {
      localStorage.setItem(key, safe);
    } catch (error) {
      // ignore localStorage failures
    }
    return safe;
  }

  async function getWebhookUrl() {
    if (webhookUrlPromise) return webhookUrlPromise;
    webhookUrlPromise = (async () => {
      if (isLocalRuntime()) {
        return getLocalWebhookFromPrompt();
      }
      const endpoint = String(window.ANTICHEAT_WEBHOOK_ENDPOINT || "").trim();
      if (!endpoint) return "";
      const res = await fetch(endpoint, { cache: "no-store" });
      if (!res.ok) throw new Error("Webhook endpoint blocked: " + res.status);
      return (await res.text()).trim();
    })().catch((error) => {
      webhookUrlPromise = null;
      return "";
    });
    return webhookUrlPromise;
  }

  function createController(options) {
    const opts = options || {};
    const lastRuleAt = new Map();
    const actionTimes = [];
    const chatTimes = [];
    let lastPos = null;
    let worldIdAtLastPos = "";

    const SETTINGS = window.GT_SETTINGS || {};
    const MAX_SPEED_PX_S = Math.max(160, Number(SETTINGS.AC_MAX_SPEED_PX_S) || 380);
    const TELEPORT_PX = Math.max(120, Number(SETTINGS.AC_TELEPORT_PX) || 420);
    const MAX_ACTIONS_PER_2S = Math.max(8, Number(SETTINGS.AC_MAX_ACTIONS_PER_2S) || 24);
    const MAX_CHAT_PER_10S = Math.max(4, Number(SETTINGS.AC_MAX_CHAT_PER_10S) || 10);
    const ALERT_COOLDOWN_MS = Math.max(3000, Number(SETTINGS.AC_ALERT_COOLDOWN_MS) || 15000);

    function get(k, fallback) {
      const fn = opts[k];
      if (typeof fn === "function") {
        try {
          const value = fn();
          return value === undefined ? fallback : value;
        } catch (error) {
          return fallback;
        }
      }
      return fn === undefined ? fallback : fn;
    }

    function postLocal(text) {
      const fn = opts.postLocalSystemChat;
      if (typeof fn === "function") fn(String(text || "").slice(0, 160));
    }

    function shouldReport(ruleKey) {
      const now = Date.now();
      const last = Number(lastRuleAt.get(ruleKey) || 0);
      if ((now - last) < ALERT_COOLDOWN_MS) return false;
      lastRuleAt.set(ruleKey, now);
      return true;
    }

    async function sendWebhook(rule, severity, details) {
      const url = await getWebhookUrl();
      if (!url) return false;
      const username = String(get("getPlayerName", "unknown") || "unknown");
      const accountId = String(get("getPlayerProfileId", "") || "");
      const sessionId = String(get("getPlayerSessionId", "") || "");
      const worldId = String(get("getCurrentWorldId", "") || "");
      const timestamp = new Date().toISOString();
      const detailText = typeof details === "string"
        ? details
        : JSON.stringify(details || {}).slice(0, 1800);
      const content = [
        "**Anti-Cheat Alert**",
        "Rule: `" + rule + "`",
        "Severity: `" + severity + "`",
        "User: @" + username,
        accountId ? ("Account: `" + accountId + "`") : "",
        sessionId ? ("Session: `" + sessionId + "`") : "",
        worldId ? ("World: `" + worldId + "`") : "",
        "Time: `" + timestamp + "`",
        "Details: " + detailText
      ].filter(Boolean).join("\n");
      try {
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content })
        });
        return true;
      } catch (error) {
        return false;
      }
    }

    function report(rule, severity, details) {
      if (!shouldReport(rule)) return;
      sendWebhook(rule, severity || "warn", details || {}).catch(() => {});
    }

    function onSessionStart() {
      actionTimes.length = 0;
      chatTimes.length = 0;
      lastPos = null;
      worldIdAtLastPos = "";
    }

    function onWorldSwitch(nextWorldId) {
      actionTimes.length = 0;
      lastPos = null;
      worldIdAtLastPos = String(nextWorldId || "");
    }

    function onFrame() {
      const inWorld = Boolean(get("getInWorld", false));
      const player = get("getPlayer", null);
      if (!inWorld || !player) {
        lastPos = null;
        return;
      }
      const x = Number(player.x);
      const y = Number(player.y);
      const vx = Number(player.vx);
      const vy = Number(player.vy);
      const now = performance.now();
      const worldId = String(get("getCurrentWorldId", "") || "");

      if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(vx) || !Number.isFinite(vy)) {
        report("non_finite_state", "critical", { x, y, vx, vy });
        return;
      }

      if (!lastPos || worldIdAtLastPos !== worldId) {
        lastPos = { x, y, t: now };
        worldIdAtLastPos = worldId;
        return;
      }

      const dtMs = Math.max(1, now - lastPos.t);
      const dx = x - lastPos.x;
      const dy = y - lastPos.y;
      const dist = Math.hypot(dx, dy);
      const speed = dist / (dtMs / 1000);

      if (dist > TELEPORT_PX) {
        report("teleport_like_move", "warn", { dist: Math.round(dist), dtMs: Math.round(dtMs), x: Math.round(x), y: Math.round(y) });
      } else if (speed > MAX_SPEED_PX_S) {
        report("speed_anomaly", "warn", { speed: Math.round(speed), dist: Math.round(dist), dtMs: Math.round(dtMs), vx, vy });
      }

      lastPos = { x, y, t: now };
    }

    function onActionAttempt(payload) {
      const now = performance.now();
      actionTimes.push(now);
      while (actionTimes.length && (now - actionTimes[0]) > 2000) actionTimes.shift();
      if (actionTimes.length > MAX_ACTIONS_PER_2S) {
        report("action_rate", "warn", { actionsIn2s: actionTimes.length });
      }

      const data = payload || {};
      const tx = Number(data.tx);
      const ty = Number(data.ty);
      if (!Number.isInteger(tx) || !Number.isInteger(ty)) return;
      const tileSize = Math.max(1, Number(get("getTileSize", 32)) || 32);
      const reachTiles = Math.max(1, Number(get("getEditReachTiles", 5)) || 5);
      const player = get("getPlayer", null);
      const playerRect = get("getPlayerRect", { w: 20, h: 28 }) || { w: 20, h: 28 };
      if (!player) return;
      const centerX = Number(player.x || 0) + (Number(playerRect.w) || 20) * 0.5;
      const centerY = Number(player.y || 0) + (Number(playerRect.h) || 28) * 0.5;
      const targetX = tx * tileSize + tileSize * 0.5;
      const targetY = ty * tileSize + tileSize * 0.5;
      const distTiles = Math.hypot(targetX - centerX, targetY - centerY) / tileSize;
      if (distTiles > (reachTiles + 1.25)) {
        report("reach_anomaly", "warn", {
          distTiles: Number(distTiles.toFixed(2)),
          reachTiles: Number(reachTiles.toFixed(2)),
          tx,
          ty,
          action: String(data.action || "use")
        });
      }
    }

    function onChatSend(text) {
      const now = performance.now();
      chatTimes.push(now);
      while (chatTimes.length && (now - chatTimes[0]) > 10000) chatTimes.shift();
      if (chatTimes.length > MAX_CHAT_PER_10S) {
        report("chat_rate", "warn", { messagesIn10s: chatTimes.length, preview: String(text || "").slice(0, 80) });
      }
    }

    return {
      onSessionStart,
      onWorldSwitch,
      onFrame,
      onActionAttempt,
      onChatSend,
      report,
      postLocal
    };
  }

  return {
    createController,
    getWebhookUrl
  };
})();
