(() => {
  const JSON_URL = "/g/g.json";

  window.gameItems = [];

  async function load() {
    try {
      const res = await fetch(JSON_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`JSON HTTP ${res.status}`);

      const data = await res.json();

      window.gameItems = (Array.isArray(data) ? data : [])
        .filter(item => item && typeof item === "object" && item.url);

      window.gameItems.sort((a, b) =>
        String(a.name || "").localeCompare(String(b.name || ""), undefined, {
          numeric: true,
          sensitivity: "base",
        })
      );

      window.dispatchEvent(new Event("games:ready"));
    } catch (err) {
      console.error("Failed to load g.json:", err);
      window.dispatchEvent(new Event("games:error"));
    }
  }

  load();
})();
