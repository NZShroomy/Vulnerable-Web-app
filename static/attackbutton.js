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

  // Vulnerability data 
  const vulnInfo = {
    sqli: {
      title: "SQL Injection",
      subtitle: "Inserting malicious SQL into database queries",
      execute: "SQL injection is performed by manipulating input fields to include SQL commands that the database will execute. Please go to the <a href=\"/login\">login page</a><br><br> Then enter <code>' OR '1'='1';--</code> into the username field and anything in the password field to bypass login.",
      consequences: "A malicious user could dump the entire database which would cause downtimes or at worst loss of all data.<br> Modify or delete data which could lead to fraud and <br>Bypass authentication",
      prevention: "Use prepared statements<br> Never build queries by concatenating strings <br>Validate all inputs only allowing certain characters where possible and implemneting length restrictions.<br><br> In our application we use a directly concatenated query which is vulnerable to SQLi instead of using prepared statments.<br><br> Example of vulnerable code:<br><code>query = f\"SELECT * FROM users WHERE username = '\" + username + \"' AND password = '\" + password + \"'\"</code><br><br> Example of secure code:<br><code>query = \"SELECT * FROM users WHERE username = ? AND password = ?\"<br>cursor.execute(query, (username, password))</code>"
    },
         
    auth: {
      title: "Broken User Authentication",
      subtitle: "Flaws in login and session handling",
      execute: "For this vulnerability, attackers exploit weaknesses in the authentication process.<br> In this application we have no password policies so passwords can be any length and insecure. <br> This allows brute force attacks to be more effective. Nor do we have multi-factor authentication which would add an extra layer of security.<br><br>Example: An attacker could use automated tools to try many password combinations quickly to gain access to user accounts. <br>To simulate this In this application there is a account called admin and you can use a brute force tool to try and guess the password or if you are lucky you might guess it yourself!",
      consequences: "The consequences of broken authentication include unauthorized access to user accounts, data breaches, and a potential full system compromise.",
      prevention: "To minimize broken authentication, implement strong session management via cookies, enforcing multi-factor authentication especially for a application dealing with finacials is critical! Requiring users to create strong passwords via strong password policies."
    },

    xss: {
      title: "Cross-Site Scripting (XSS)",
      subtitle: "Injecting malicious JS into other users' pages",
      execute: "Inject scripts into comments, forms, URLs. <br><br>Example: Navigate to the <a href=\"/reviews\">reviews</a> page and enter <code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code> <br> When you view the comment, the script runs. <br> NOTE: Please use the clear reviews button to remove all reviews once completed.",
      consequences: "Cookie theft, account hijacking. In this app, an attacker could steal session cookies to impersonate users which could cause financial loss.",
      prevention: "Escape output, CSP headers, sanitization. In this application we can prevent XSS by santizing user inputs using a library such as Bleach from Python or by using output escaping techniques for example < can be escaped to &lt;."
    },

    ac: {
      title: "Broken Access Control",
      subtitle: "Users accessing things they should not an example being able to access other users' accounts or hidden pages",
      execute: "To exploit broken access control, an attacker might manipulate URLs, modify cookies, or alter request parameters to access unauthorized resources.<br><br>Example: In ur application a user is able to access the admin page by simply navigating to /admin even if they are not logged in as an admin.<br>Another example is changing the user ID in the URL to access another user's account details but this feature will come in the future updates.",
      consequences: "Data leaks, privilege escalation. An attacker could gain administrative privileges and compromise the entire application and its data this could lead to a huge data breach and financial loss.",
      prevention: "In a real world application one method would be to implement role-based access control (RBAC) to ensure users can only access resources appropriate for their role. <br><br> Having a regular audit of access controls and using the  principle of least privilege method allows minimize potential damage from compromised accounts."
    },

    sde: {
      title: "Sensitive Data Exposure",
      subtitle: "Poor protection of stored or transmitted data",
      execute: "In this application sensetive data is being exposed from the broken access control vulnerability.<br><br>Example: If an attacker gains access to another user's account, they can view sensitive information such as personal details and financial data. <br> in this case it is accessing an <a href=\"/admin\">admin page</a> without proper authorization to view sensitive data.",
      consequences: "Identity theft, system compromise. In this application sensitive data exposure could lead to identity theft and financial fraud if attackers access personal and financial information of users.<br><br> This could lead to a system compromise if admin credentials are exposed.",
      prevention: "One method would be to implement strong access controls to ensure that only authorized users can access sensitive data. EG: Checking a users role if it does not match then they are given an error. <br><br> Ensuring the encryption of sensitive data both at rest and in transit would help protect it from unauthorized access for a real world application<br><br> Ensure all senseitve data is hashed before storing in the database using strong hashing algorithms like bcrypt or Argon2."
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