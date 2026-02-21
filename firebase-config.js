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

let __firebaseApiKeyPromise = null;
window.getFirebaseApiKey = async function getFirebaseApiKey() {
  if (window.FIREBASE_CONFIG && window.FIREBASE_CONFIG.apiKey) {
    return window.FIREBASE_CONFIG.apiKey;
  }
  if (__firebaseApiKeyPromise) return __firebaseApiKeyPromise;
  __firebaseApiKeyPromise = fetch(window.FIREBASE_APIKEY_ENDPOINT, { cache: "no-store" }).then((res) => {
    if (!res.ok) throw new Error("Blocked: " + res.status);
    return res.text();
  }).then((key) => {
    const safeKey = (key || "").trim();
    if (!safeKey) throw new Error("Empty API key response.");
    if (window.FIREBASE_CONFIG) {
      window.FIREBASE_CONFIG.apiKey = safeKey;
    }
    return safeKey;
  }).catch((err) => {
    __firebaseApiKeyPromise = null;
    throw err;
  });
  return __firebaseApiKeyPromise;
};

// Warm-up fetch so login/create has lower latency.
window.getFirebaseApiKey().catch(() => {});
