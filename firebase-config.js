// Public Firebase config (without apiKey hardcoded in client).
// apiKey is fetched at runtime from Cloudflare Worker endpoint.
window.FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "growtopia-clone.firebaseapp.com",
  databaseURL: "https://growtopia-clone-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "growtopia-clone",
  storageBucket: "growtopia-clone.firebasestorage.app",
  messagingSenderId: "39896773497",
  appId: "1:39896773497:web:d4e5878d403dca175775a8"
};

window.FIREBASE_APIKEY_ENDPOINT = "https://growtopia.isxtgg.workers.dev/apikey";
window.FIREBASE_LOCAL_APIKEY_STORAGE = "growtopia_local_firebase_apikey_v1";

let __firebaseApiKeyPromise = null;
const FIREBASE_APIKEY_FETCH_TIMEOUT_MS = 8000;
function isLocalRuntime() {
  const host = (window.location && window.location.hostname || "").toLowerCase();
  const protocol = (window.location && window.location.protocol || "").toLowerCase();
  return protocol === "file:" || host === "localhost" || host === "127.0.0.1" || host === "::1";
}

function getLocalApiKeyFromPrompt() {
  const storageKey = window.FIREBASE_LOCAL_APIKEY_STORAGE || "growtopia_local_firebase_apikey_v2";
  try {
    const cached = localStorage.getItem(storageKey);
    if (cached && cached.trim()) return cached.trim();
  } catch (error) {
    // ignore localStorage failures
  }
  const entered = window.prompt("Enter Firebase API key for local run:");
  const safeKey = (entered || "").trim();
  if (!safeKey) return "";
  try {
    localStorage.setItem(storageKey, safeKey);
  } catch (error) {
    // ignore localStorage failures
  }
  return safeKey;
}

window.getFirebaseApiKey = async function getFirebaseApiKey() {
  if (window.FIREBASE_CONFIG && window.FIREBASE_CONFIG.apiKey) {
    return window.FIREBASE_CONFIG.apiKey;
  }

  if (isLocalRuntime()) {
    const localKey = getLocalApiKeyFromPrompt();
    if (!localKey) throw new Error("Missing local Firebase API key.");
    if (window.FIREBASE_CONFIG) window.FIREBASE_CONFIG.apiKey = localKey;
    return localKey;
  }

  if (__firebaseApiKeyPromise) return __firebaseApiKeyPromise;

  const storageKey = window.FIREBASE_LOCAL_APIKEY_STORAGE || "growtopia_local_firebase_apikey_v1";
  let fetchController = null;
  let timeoutId = null;
  if (typeof AbortController !== "undefined") {
    fetchController = new AbortController();
    timeoutId = setTimeout(() => {
      try {
        fetchController.abort();
      } catch (error) {
        // ignore
      }
    }, FIREBASE_APIKEY_FETCH_TIMEOUT_MS);
  }

  __firebaseApiKeyPromise = fetch(window.FIREBASE_APIKEY_ENDPOINT, {
    cache: "no-store",
    headers: { "Accept": "application/json, text/plain;q=0.9" },
    signal: fetchController ? fetchController.signal : undefined
  })
    .then(async (res) => {
      if (!res.ok) throw new Error("Blocked: " + res.status);

      // Try JSON first (new API)
      const ct = (res.headers.get("content-type") || "").toLowerCase();
      if (ct.includes("application/json")) {
        const data = await res.json();
        if (!data || data.ok !== true || typeof data.key !== "string") {
          throw new Error(data?.error || "Invalid JSON response.");
        }
        return data.key;
      }

      // Fallback: old plain-text API
      const txt = await res.text();
      return txt;
    })
    .then((key) => {
      const safeKey = (key || "").trim();
      if (!safeKey) throw new Error("Empty API key response.");
      if (window.FIREBASE_CONFIG) window.FIREBASE_CONFIG.apiKey = safeKey;
      try {
        localStorage.setItem(storageKey, safeKey);
      } catch (error) {
        // ignore localStorage failures
      }
      return safeKey;
    })
    .catch((err) => {
      try {
        const cached = localStorage.getItem(storageKey);
        if (cached && cached.trim()) {
          const safe = cached.trim();
          if (window.FIREBASE_CONFIG) window.FIREBASE_CONFIG.apiKey = safe;
          return safe;
        }
      } catch (error) {
        // ignore localStorage failures
      }
      __firebaseApiKeyPromise = null;
      throw err;
    })
    .finally(() => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    });

  return __firebaseApiKeyPromise;
};

// Warm-up fetch so login/create has lower latency.
window.getFirebaseApiKey().catch(() => {});
