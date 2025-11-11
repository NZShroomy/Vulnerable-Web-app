async function loadComponent(id, filePath) {
  const res = await fetch(filePath);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

// load header + sidebar once
document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("header-placeholder", "/partials/header.html");
  await loadComponent("sidebar-placeholder", "/partials/sidebar.html");

  // load the first main page by default
  loadPage("Homepage.html");
});

// dynamic main content loader
async function loadPage(path) {
  const res = await fetch(path);
  const html = await res.text();
  document.getElementById("main-content").innerHTML = html;
}

// handle nav clicks without full reload
document.addEventListener("click", (e) => {
  if (e.target.matches("[data-page]")) {
    e.preventDefault();
    const page = e.target.getAttribute("data-page");
    loadPage(`/pages/${page}.html`);
  }
});
