document.addEventListener("DOMContentLoaded", () => {

    const fab = document.getElementById("tutorialFab");
    const toggle = document.getElementById("tutorialToggle");

    const modal = document.getElementById("tutorialModal");
    const closeBtn = document.getElementById("tutorialClose");

    const pages = document.querySelectorAll(".tutorial-page");
    const nextBtn = document.getElementById("tutNext");
    const prevBtn = document.getElementById("tutPrev");
    const acceptBtn = document.getElementById("tutAccept");

    // Sidebar Tutorials link opens the modal
    const sidebarLink = document.getElementById("sidebarTutorials");

    let currentPage = 0;

    // Helper: show a page
    function showPage(index) {
        pages.forEach((p, i) => p.classList.toggle("active", i === index));

        prevBtn.style.display = index === 0 ? "none" : "inline-flex";
        nextBtn.style.display = index === pages.length - 1 ? "none" : "inline-flex";
        acceptBtn.style.display = index === pages.length - 1 ? "inline-flex" : "none";
    }

    // Open modal from floating button
    toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
        currentPage = 0;
        showPage(currentPage);
    });

    // Open modal from sidebar link
    if (sidebarLink) {
        sidebarLink.addEventListener("click", (e) => {
            e.preventDefault(); // prevent navigation
            modal.classList.add("show");
            modal.setAttribute("aria-hidden", "false");
            currentPage = 0;
            showPage(currentPage);
        });
    }

    // Close modal
    closeBtn.addEventListener("click", () => {
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
    });

    // Close modal when clicking outside content
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
            modal.setAttribute("aria-hidden", "true");
        }
    });

    // Navigation buttons
    nextBtn.addEventListener("click", () => {
        if (currentPage < pages.length - 1) {
            currentPage++;
            showPage(currentPage);
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
        }
    });

    // Accept button
    acceptBtn.addEventListener("click", () => {
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
    });

    // Open modal from attack cards
    document.querySelectorAll(".attack-card").forEach(card => {
        card.addEventListener("click", () => {
            const targetId = card.getAttribute("data-target"); // e.g., "tutPageSQL"
            const targetPage = Array.from(pages).find(p => p.id === targetId);

            if (targetPage) {
                pages.forEach(p => p.classList.remove("active"));
                targetPage.classList.add("active");
                modal.classList.add("show");
                modal.setAttribute("aria-hidden", "false");

                currentPage = Array.from(pages).indexOf(targetPage);
                showPage(currentPage);
            }
        });
    });

});