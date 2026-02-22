window.GTModules = window.GTModules || {};

window.DISCORD_WEBHOOK_ENDPOINT = window.DISCORD_WEBHOOK_ENDPOINT || "https://growtopia.isxtgg.workers.dev/webhook";
window.DISCORD_LOCAL_WEBHOOK_STORAGE = window.DISCORD_LOCAL_WEBHOOK_STORAGE || "growtopia_local_discord_webhook_v1";

window.GTModules.discord = (function createDiscordModule() {
  let webhookUrlPromise = null;

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
    const url = explicitWebhookUrl || (await getWebhookUrl(Boolean(opts.forceRefresh)));
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

    try {
      const endpoint = String(window.DISCORD_WEBHOOK_ENDPOINT || window.ANTICHEAT_WEBHOOK_ENDPOINT || "").trim();
      if (!endpoint || endpoint === url) return false;
      const proxyRes = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: body.content,
          webhookUrl: url
        })
      });
      return Boolean(proxyRes && proxyRes.ok);
    } catch (error) {
      return false;
    }
  }

  return {
    isLocalRuntime,
    getWebhookUrl,
    send
  };
})();
