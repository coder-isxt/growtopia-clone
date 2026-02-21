window.GTModules = window.GTModules || {};

window.GTModules.authStorage = {
  saveCredentials(key, username, password) {
    try {
      localStorage.setItem(String(key || ""), JSON.stringify({
        username: String(username || "").slice(0, 24),
        password: String(password || "").slice(0, 64)
      }));
    } catch (error) {
      // ignore localStorage failures
    }
  },
  loadCredentials(key) {
    try {
      const raw = localStorage.getItem(String(key || ""));
      if (!raw) return { username: "", password: "" };
      const parsed = JSON.parse(raw);
      return {
        username: (parsed && parsed.username || "").toString(),
        password: (parsed && parsed.password || "").toString()
      };
    } catch (error) {
      return { username: "", password: "" };
    }
  }
};

