// attackbutton.js
document.addEventListener("DOMContentLoaded", () => {

  // Elements
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

  // If this page doesn't have the FAB, exit safely
  if (!fab || !menu || !toggle) return;

  // Vulnerability data stored safely in JS
  const vulnInfo = {
    sqli: {
      title: "SQL Injection",
      subtitle: "Inserting malicious SQL into database queries",
      execute: `
                SQL injection is performed by manipulating input fields
                to include SQL commands that the database will execute.<br><br>
                Example: <code>' OR '1'='1';--</code> to bypass login.
            `,
      consequences: `
                • Dump the entire database<br>
                • Modify or delete data<br>
                • Bypass authentication
            `,
      prevention: `
                • Use prepared statements<br>
                • Never concatenate SQL strings<br>
                • Validate all inputs
            `
    },

    auth: {
      title: "Broken User Authentication",
      subtitle: "Flaws in login and session handling",
      execute: "For this vulnerability, attackers exploit weaknesses in the authentication process.<br> In this application we have no session management and no password policies or hashing so the password is stored in plain text.<br> An attacker could easily guess or brute-force passwords to gain unauthorized access.<br> ",
      consequences: "The consequences of broken authentication include unauthorized access to user accounts, data breaches, and potential full system compromise.",
      prevention: " Some methods for minimising Broken user Authentication include Strong sessions, hashing, multi-factor auth, Enforcing a strong password policy."
    },

    xss: {
      title: "Cross-Site Scripting (XSS)",
      subtitle: "Injecting malicious JS into other users' pages",
      execute: "Inject scripts into comments, forms, URLs.",
      consequences: "Cookie theft, account hijacking.",
      prevention: "Escape output, CSP headers, sanitization."
    },

    ac: {
      title: "Broken Access Control",
      subtitle: "Users accessing things they should not",
      execute: "Changing IDs in URLs to access other accounts.",
      consequences: "Data leaks, privilege escalation.",
      prevention: "Proper authorization checks."
    },

    sde: {
      title: "Sensitive Data Exposure",
      subtitle: "Poor protection of stored or transmitted data",
      execute: "Plaintext passwords, unencrypted traffic.",
      consequences: "Identity theft, system compromise.",
      prevention: "TLS, encryption, hashing, key rotation."
    }
  };

  // Open menu/close menu
  const setExpanded = (open) => {
    fab.setAttribute("aria-expanded", open);
    menu.setAttribute("aria-hidden", !open);
    fab.classList.toggle("expanded", open);
  };

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = fab.getAttribute("aria-expanded") !== "true";
    setExpanded(isOpen);
  });

  document.addEventListener("click", () => setExpanded(false));


  // Overlay functions
  const openOverlay = (data) => {
    overlayTitle.innerText = data.title;
    overlaySubtitle.innerText = data.subtitle;
    overlayExecute.innerHTML = data.execute;
    overlayConsequences.innerHTML = data.consequences;
    overlayPrevention.innerHTML = data.prevention;
    overlay.classList.add("active");
  };

  const closeOverlay = () => overlay.classList.remove("active");

  overlayClose.addEventListener("click", closeOverlay);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeOverlay();
  });


  // Button clicks
  fab.querySelectorAll(".fab-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      const key = btn.dataset.vuln;
      const data = vulnInfo[key];

      if (!data) return;

      openOverlay(data);

      setExpanded(false);
    });
  });

});