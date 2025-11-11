// static/attackbutton.js

class AttackFab extends HTMLElement {
  constructor() {
    super();
    // Attach Shadow DOM so styles don’t leak
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style id="fab-inline-style">
        /* Minimal inline styles as a fallback while external CSS loads */
        :host { position: fixed; right: 20px; bottom: 20px; z-index: 999; }
        .fab { display:flex; align-items:center; flex-direction:row; }
        .fab-main { width:48px; height:48px; border-radius:50%; background:#e74c3c; color:#fff; border:0; }
      </style>

      <div class="fab" id="vulnFab" aria-haspopup="true" aria-expanded="false">
        <ul class="fab-menu" id="fabMenu" aria-hidden="true">
          <li><button type="button" class="fab-item" data-action="xss" aria-label="XSS demo">1</button></li>
          <li><button type="button" class="fab-item" data-action="sqli" aria-label="SQLi demo">2</button></li>
          <li><button type="button" class="fab-item" data-action="csrf" aria-label="CSRF demo">3</button></li>
          <li><button type="button" class="fab-item" data-action="rce" aria-label="RCE demo">4</button></li>
          <li><button type="button" class="fab-item" data-action="lfi" aria-label="LFI demo">5</button></li>
        </ul>
        <button class="fab-main" id="fabToggle" aria-label="Open vulnerability tools">≡</button>
      </div>
    `;

    // Try to load external CSS into the shadow root. Path is relative to the page URL.
    const loadAndInjectCSS = async (href) => {
      try {
        const resp = await fetch(href, { cache: 'force-cache' });
        if (!resp.ok) throw new Error('CSS fetch failed: ' + resp.status);
        const cssText = await resp.text();
        const styleEl = shadow.getElementById('fab-inline-style');
        // Replace inline styles with the fetched CSS
        if (styleEl) styleEl.textContent = cssText;
        else shadow.appendChild(Object.assign(document.createElement('style'), { textContent: cssText }));
      } catch (err) {
        // Loading failed — keep inline fallback and log error
        console.warn('Could not load FAB CSS from', href, err);
      }
    };

    // Default path: 'attackbutton.css' alongside your pages. Adjust if you keep the CSS in Components/.
    // The href is resolved relative to the page URL, not this JS file.
    loadAndInjectCSS('/static/attackbutton.css');

    const fab = shadow.getElementById('vulnFab');
    const toggle = shadow.getElementById('fabToggle');
    const menu = shadow.getElementById('fabMenu');

    // handle open/close
    const setExpanded = (exp) => {
      fab.setAttribute('aria-expanded', exp);
      menu.setAttribute('aria-hidden', !exp);
      if (exp) fab.classList.add('expanded');
      else fab.classList.remove('expanded');
    };

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = fab.getAttribute('aria-expanded') !== 'true';
      setExpanded(isOpen);
    });

    document.addEventListener('click', () => setExpanded(false));

    shadow.querySelectorAll('.fab-item').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        alert('Vulnerability demo selected: ' + action);
        setExpanded(false);
      });
    });
  }
}

// Register your custom HTML tag
customElements.define('attack-fab', AttackFab);
