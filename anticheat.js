window.GTModules = window.GTModules || {};

window.ANTICHEAT_WEBHOOK_ENDPOINT = window.ANTICHEAT_WEBHOOK_ENDPOINT || "https://growtopia.isxtgg.workers.dev/webhook";
window.ANTICHEAT_LOCAL_WEBHOOK_STORAGE = window.ANTICHEAT_LOCAL_WEBHOOK_STORAGE || "growtopia_local_ac_webhook_v1";

window.GTModules.anticheat = (function createAntiCheatModule() {
  const modules = window.GTModules || {};
  const discordModule = modules.discord || {};
  const RULE_INFO = {
    non_finite_state: {
      title: "Invalid Physics State",
      reason: "Player state contains NaN/Infinity values."
    },
    teleport_like_move: {
      title: "Teleport-like Movement",
      reason: "Position changed too far in a single frame."
    },
    speed_anomaly: {
      title: "Speed Anomaly",
      reason: "Movement speed exceeded configured limit."
    },
    action_rate: {
      title: "Action Spam",
      reason: "Too many action attempts in a short window."
    },
    reach_anomaly: {
      title: "Reach Anomaly",
      reason: "Action target was farther than allowed reach."
    },
    chat_rate: {
      title: "Chat Spam",
      reason: "Too many chat messages in a short window."
    }
  };

  function createController(options) {
    const opts = options || {};
    const lastRuleAt = new Map();
    const actionTimes = [];
    const chatTimes = [];
    let lastPos = null;
    let worldIdAtLastPos = "";

    const SETTINGS = window.GT_SETTINGS || {};
    const MAX_SPEED_PX_S = Math.max(160, Number(SETTINGS.AC_MAX_SPEED_PX_S) || 730);
    const TELEPORT_PX = Math.max(120, Number(SETTINGS.AC_TELEPORT_PX) || 420);
    const MAX_ACTIONS_PER_2S = Math.max(8, Number(SETTINGS.AC_MAX_ACTIONS_PER_2S) || 24);
    const MAX_CHAT_PER_10S = Math.max(4, Number(SETTINGS.AC_MAX_CHAT_PER_10S) || 10);
    const ALERT_COOLDOWN_MS = Math.max(3000, Number(SETTINGS.AC_ALERT_COOLDOWN_MS) || 15000);
    let lastWebhookFailNoticeAt = 0;

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

    function formatNum(value, digits) {
      const n = Number(value);
      if (!Number.isFinite(n)) return String(value);
      const d = Number.isFinite(Number(digits)) ? Math.max(0, Math.min(4, Number(digits))) : 0;
      return n.toFixed(d).replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
    }

    function getRuleInfo(rule) {
      return RULE_INFO[String(rule || "").trim()] || { title: String(rule || "Unknown Rule"), reason: "Rule triggered." };
    }

    function buildReadableDetail(rule, details) {
      const data = details && typeof details === "object" ? details : {};
      if (rule === "non_finite_state") {
        return "Invalid values in physics state (x/y/vx/vy).";
      }
      if (rule === "teleport_like_move") {
        return "Moved " + formatNum(data.dist) + "px in " + formatNum(data.dtMs) + "ms (teleport threshold exceeded).";
      }
      if (rule === "speed_anomaly") {
        return "Speed " + formatNum(data.speed) + "px/s for " + formatNum(data.dist) + "px in " + formatNum(data.dtMs) + "ms (too fast).";
      }
      if (rule === "action_rate") {
        return "Action rate " + formatNum(data.actionsIn2s) + " in 2s (spam threshold exceeded).";
      }
      if (rule === "reach_anomaly") {
        return "Action at " + formatNum(data.distTiles, 2) + " tiles while allowed reach is " + formatNum(data.reachTiles, 2) + ".";
      }
      if (rule === "chat_rate") {
        return "Chat rate " + formatNum(data.messagesIn10s) + " in 10s (spam threshold exceeded).";
      }
      const raw = typeof details === "string" ? details : JSON.stringify(details || {});
      return raw.slice(0, 180);
    }

    function buildRawDataShort(details) {
      if (!details || typeof details !== "object") return "";
      const parts = [];
      const keys = Object.keys(details).slice(0, 7);
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        let v = details[k];
        if (typeof v === "number") v = formatNum(v, Math.abs(v) < 10 ? 2 : 0);
        parts.push(k + "=" + String(v));
      }
      return parts.join(" | ").slice(0, 260);
    }

    function shouldReport(ruleKey) {
      const now = Date.now();
      const last = Number(lastRuleAt.get(ruleKey) || 0);
      if ((now - last) < ALERT_COOLDOWN_MS) return false;
      lastRuleAt.set(ruleKey, now);
      return true;
    }

    async function sendWebhook(rule, severity, details) {
      const username = String(get("getPlayerName", "unknown") || "unknown");
      const accountId = String(get("getPlayerProfileId", "") || "");
      const sessionId = String(get("getPlayerSessionId", "") || "");
      const worldId = String(get("getCurrentWorldId", "") || "");
      const timestamp = new Date().toISOString();
      const info = getRuleInfo(rule);
      const detailText = buildReadableDetail(rule, details);
      const rawData = buildRawDataShort(details);
      const safeSeverity = String(severity || "warn").toLowerCase();
      const severityLabel = safeSeverity === "critical" ? "CRITICAL" : (safeSeverity === "warn" ? "WARN" : safeSeverity.toUpperCase());
      const color = safeSeverity === "critical" ? 0xe74c3c : (safeSeverity === "warn" ? 0xf39c12 : 0x3498db);
      let content = [
        "**Anti-Cheat Alert**",
        "Type: `" + info.title + "`",
        "Rule: `" + rule + "`",
        "Severity: `" + severityLabel + "`",
        "User: @" + username,
        accountId ? ("Account: `" + accountId + "`") : "",
        sessionId ? ("Session: `" + sessionId + "`") : "",
        worldId ? ("World: `" + worldId + "`") : "",
        "Time: `" + timestamp + "`",
        "Reason: " + info.reason,
        "Detected: " + detailText,
        rawData ? ("Raw: " + rawData) : ""
      ].filter(Boolean).join("\n");
      if (content.length > 1900) {
        content = content.slice(0, 1897) + "...";
      }
      const embed = {
        title: "Anti-Cheat: " + info.title,
        color,
        description: [
          "**Rule**: `" + rule + "`",
          "**Severity**: `" + severityLabel + "`",
          "**Reason**: " + info.reason,
          "**Detected**: " + detailText
        ].join("\n"),
        fields: [
          { name: "User", value: "@" + username, inline: true },
          { name: "World", value: worldId || "menu", inline: true },
          { name: "Session", value: sessionId || "-", inline: false }
        ],
        timestamp
      };
      if (accountId) {
        embed.fields.push({ name: "Account", value: "`" + accountId + "`", inline: false });
      }
      if (rawData) {
        embed.fields.push({ name: "Raw Data", value: rawData.slice(0, 1024), inline: false });
      }
      if (embed.fields.length > 25) {
        embed.fields.length = 25;
      }
      if (discordModule && typeof discordModule.send === "function") {
        if (typeof discordModule.sendEmbed === "function") {
          const okEmbed = await discordModule.sendEmbed(embed, { username: "PixelBuild AC" });
          if (okEmbed) return true;
        }
        return discordModule.send({ content, embeds: [embed] }, { username: "PixelBuild AC" });
      }
      return false;
    }

    function report(rule, severity, details) {
      if (!shouldReport(rule)) return;
      const info = getRuleInfo(rule);
      const detailText = buildReadableDetail(rule, details);
      const rawShort = buildRawDataShort(details);
      const detailsForLog = (info.title + ": " + detailText + (rawShort ? (" | " + rawShort) : "")).slice(0, 760);
      const appendLogEntry = opts.appendLogEntry;
      if (typeof appendLogEntry === "function") {
        appendLogEntry({
          rule: String(rule || "unknown").slice(0, 48),
          severity: String(severity || "warn").toLowerCase().slice(0, 16),
          details: detailsForLog
        });
      }
      sendWebhook(rule, severity || "warn", details || {}).then((ok) => {
        if (ok) return;
        const now = Date.now();
        if ((now - lastWebhookFailNoticeAt) > 60000) {
          lastWebhookFailNoticeAt = now;
          postLocal("Anti-cheat webhook send failed.");
        }
      }).catch(() => {});
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
      if (distTiles > (reachTiles + 2.5)) {
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
    createController
  };
})();
