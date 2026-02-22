window.GTModules = window.GTModules || {};

window.DISCORD_WEBHOOK_ENDPOINT = window.DISCORD_WEBHOOK_ENDPOINT || "https://growtopia.isxtgg.workers.dev/webhook";
window.DISCORD_LOCAL_WEBHOOK_STORAGE = window.DISCORD_LOCAL_WEBHOOK_STORAGE || "growtopia_local_discord_webhook_v1";

window.GTModules.discord = (function createDiscordModule() {
  let webhookUrlPromise = null;
  const DISCORD_WEBHOOK_RE = /^https?:\/\/(?:canary\.|ptb\.)?discord(?:app)?\.com\/api\/webhooks\/\d+\/[A-Za-z0-9._-]+/i;

  function isLocalRuntime() {
    const host = (window.location && window.location.hostname || "").toLowerCase();
    const protocol = (window.location && window.location.protocol || "").toLowerCase();
    return protocol === "file:" || host === "localhost" || host === "127.0.0.1" || host === "::1";
  }

  function getLocalWebhookFromPrompt() {
    const key = window.DISCORD_LOCAL_WEBHOOK_STORAGE || window.ANTICHEAT_LOCAL_WEBHOOK_STORAGE || "growtopia_local_discord_webhook_v1";
    try {
      const cached = localStorage.getItem(key);
      if (cached && cached.trim()) return cached.trim();
    } catch (error) {
      // ignore localStorage errors
    }
    const entered = window.prompt("Enter Discord webhook URL (local run):");
    const safe = (entered || "").trim();
    if (!safe) return "";
    try {
      localStorage.setItem(key, safe);
    } catch (error) {
      // ignore localStorage errors
    }
    return safe;
  }

  async function getWebhookUrl(forceRefresh) {
    if (!forceRefresh && webhookUrlPromise) return webhookUrlPromise;
    webhookUrlPromise = (async () => {
      if (isLocalRuntime()) {
        return getLocalWebhookFromPrompt();
      }
      const endpoint = String(window.DISCORD_WEBHOOK_ENDPOINT || window.ANTICHEAT_WEBHOOK_ENDPOINT || "").trim();
      if (!endpoint) return "";
      const res = await fetch(endpoint, { cache: "no-store" });
      if (!res.ok) throw new Error("Webhook endpoint blocked: " + res.status);
      return (await res.text()).trim();
    })().catch(() => {
      webhookUrlPromise = null;
      return "";
    });
    return webhookUrlPromise;
  }

  function looksLikeDiscordWebhookUrl(value) {
    return DISCORD_WEBHOOK_RE.test(String(value || "").trim());
  }

  function parseWebhookUrlFromBody(text) {
    const raw = String(text || "").trim();
    if (!raw) return "";
    if (looksLikeDiscordWebhookUrl(raw)) return raw;
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        const candidates = [
          parsed.key,
          parsed.webhookUrl,
          parsed.url,
          parsed.webhook,
          parsed.data && parsed.data.key,
          parsed.data && parsed.data.webhookUrl,
          parsed.data && parsed.data.url
        ];
        for (let i = 0; i < candidates.length; i++) {
          const value = String(candidates[i] || "").trim();
          if (looksLikeDiscordWebhookUrl(value)) return value;
        }
      }
    } catch (error) {
      // body is plain text, ignore parse error
    }
    return "";
  }

  async function resolveDiscordWebhookUrl(rawUrl) {
    const initial = String(rawUrl || "").trim();
    if (!initial) return "";
    if (looksLikeDiscordWebhookUrl(initial)) return initial;
    const parsedFromInitial = parseWebhookUrlFromBody(initial);
    if (parsedFromInitial) return parsedFromInitial;
    try {
      const res = await fetch(initial, { cache: "no-store" });
      if (!res.ok) return "";
      const body = await res.text();
      return parseWebhookUrlFromBody(body);
    } catch (error) {
      return "";
    }
  }

  function toContent(payload) {
    if (payload && typeof payload === "object" && typeof payload.content === "string") {
      return payload.content;
    }
    return String(payload || "").trim();
  }

  async function send(payload, options) {
    const opts = options || {};
    const contentRaw = toContent(payload);
    const content = contentRaw.length > 1900 ? (contentRaw.slice(0, 1897) + "...") : contentRaw;
    if (!content) return false;

    const explicitWebhookUrl = String(opts.webhookUrl || "").trim();
    const unresolved = explicitWebhookUrl || (await getWebhookUrl(Boolean(opts.forceRefresh)));
    const url = await resolveDiscordWebhookUrl(unresolved);
    if (!url) return false;

    const body = { content };
    try {
      const directRes = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (directRes && directRes.ok) return true;
    } catch (error) {
      // try proxy fallback below
    }

    return false;
  }

  return {
    isLocalRuntime,
    getWebhookUrl,
    send
  };
})();
