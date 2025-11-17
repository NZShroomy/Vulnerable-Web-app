// attackbutton.js
document.addEventListener("DOMContentLoaded", () => {
    // Grab the FAB elements from the page (light DOM)
    const fab = document.getElementById("vulnFab");
    const menu = document.getElementById("fabMenu");
    const toggle = document.getElementById("fabToggle");

    // Safety check
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

    // Handle clicks on individual menu items
    fab.querySelectorAll(".fab-item").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const action = btn.dataset.action;
            alert("Vulnerability demo selected: " + action);
            setExpanded(false);
        });
    }); 
});
