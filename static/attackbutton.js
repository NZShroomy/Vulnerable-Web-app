// attackbutton.js
document.addEventListener("DOMContentLoaded", () => {
  // Assigning elements to variables
  const fab = document.getElementById("vulnFab");
  const menu = document.getElementById("fabMenu");
  const toggle = document.getElementById("fabToggle");
  const overlay = document.getElementById("attack-overlay");
  const overlayTitle = document.getElementById("overlayTitle");
  const overlaySubtitle = document.getElementById("overlaySubtitle");
  const overlayClose = document.getElementById("overlayClose");
  const overlayExecute = document.getElementById("overlayExecute");
  const overlayConsequences = document.getElementById("overlayConsequences");
  const overlayPrevention = document.getElementById("overlayPrevention");

  // Checks to ensure variables exist before proceeding
  if (!fab || !menu || !toggle) return;

  // Function to open/close the menu
  const setExpanded = (open) => {
    fab.setAttribute("aria-expanded", open);
    menu.setAttribute("aria-hidden", !open);
    fab.classList.toggle("expanded", open);
  };

  // Toggle on main button click
  toggle.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent document click closing it immediately
    const isOpen = fab.getAttribute("aria-expanded") !== "true";
    setExpanded(isOpen);
  });

  // Close menu if clicking outside
  document.addEventListener("click", () => setExpanded(false));

 const openOverlay = (title, subtitle, execute, consequences, prevention) => {
    overlayTitle.innerText = title;
    overlaySubtitle.innerText = subtitle;
    overlayExecute.innerText = execute;
    overlayConsequences.innerText = consequences;
    overlayPrevention.innerText = prevention;
    overlay.classList.add("active");
};

  const closeOverlay = () => {
    overlay.classList.remove("active");
  };

  overlayClose.addEventListener("click", closeOverlay);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeOverlay();
  });

  // Handle clicks on individual menu items
  fab.querySelectorAll(".fab-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

          openOverlay(
            btn.dataset.title,
            btn.dataset.subtitle,
            btn.dataset.execute,
            btn.dataset.consequences,
            btn.dataset.prevention
        );
      // Close FAB menu
      setExpanded(false);
    });
  });
});
