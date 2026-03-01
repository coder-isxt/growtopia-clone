window.GTModules.chat = {
  formatChatTimestamp(timestamp) {
    if (!timestamp || typeof timestamp !== "number") return "";
    const d = new Date(timestamp);
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return hh + ":" + mm;
  },

  initDraggableChat() {
    const panel = document.getElementById("chatPanel");
    const handle = document.getElementById("chatDragHandle");
    if (!panel || !handle) return;

    let dragging = false;
    let startY = 0;
    let startH = 0;
    const COLLAPSED_H = 60;
    const EXPANDED_H = 320;
    const THRESHOLD = (EXPANDED_H + COLLAPSED_H) / 2;

    const onStart = (e) => {
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      dragging = true;
      startY = clientY;
      startH = panel.offsetHeight;
      panel.classList.add("dragging");
      document.body.style.cursor = "grabbing";
    };

    const onMove = (e) => {
      if (!dragging) return;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const delta = clientY - startY;
      let newH = startH + delta;

      // Clamp
      if (newH < COLLAPSED_H) newH = COLLAPSED_H;
      if (newH > EXPANDED_H + 50) newH = EXPANDED_H + 50; // Allow slight "pull" past max

      panel.style.height = newH + "px";
    };

    const onEnd = () => {
      if (!dragging) return;
      dragging = false;
      panel.classList.remove("dragging");
      document.body.style.cursor = "";

      const currentH = panel.offsetHeight;
      if (currentH > THRESHOLD) {
        this.setOpen(true);
      } else {
        this.setOpen(false);
      }
      panel.style.height = ""; // Clear inline style, use class height
    };

    handle.addEventListener("mousedown", onStart);
    handle.addEventListener("touchstart", onStart, { passive: false });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchend", onEnd);
  },

  setOpen(open) {
    const panel = document.getElementById("chatPanel");
    if (!panel) return;

    if (open) {
      panel.classList.add("open");
      if (window.setChatOpen) window.setChatOpen(true);
    } else {
      panel.classList.remove("open");
      if (window.setChatOpen) window.setChatOpen(false);
    }
  }
};
