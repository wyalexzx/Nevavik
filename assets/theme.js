(function () {
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function trapFocus(container) {
    const nodes = qsa(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      container
    );
    if (!nodes.length) return () => {};
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    function onKey(event) {
      if (event.key !== 'Tab') return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    container.addEventListener('keydown', onKey);
    return () => container.removeEventListener('keydown', onKey);
  }

  function drawer(toggleSel, drawerSel, closeSel, openAttr) {
    const toggle = qs(toggleSel);
    const drawerEl = qs(drawerSel);
    if (!toggle || !drawerEl) return;
    let release = () => {};

    function setOpen(open) {
      drawerEl.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
      if (openAttr) document.documentElement.toggleAttribute(openAttr, open);
      release();
      if (open) {
        const panel = qs('[role="dialog"]', drawerEl) || drawerEl;
        release = trapFocus(panel);
        const closeBtn = qs(closeSel, drawerEl);
        (closeBtn || panel).focus();
      } else {
        toggle.focus();
      }
    }

    toggle.addEventListener('click', () => setOpen(drawerEl.hidden));
    qsa(closeSel, drawerEl).forEach((btn) => btn.addEventListener('click', () => setOpen(false)));
    drawerEl.addEventListener('click', (event) => {
      if (event.target === drawerEl) setOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !drawerEl.hidden) setOpen(false);
    });
  }

  drawer('[data-menu-toggle]', '[data-menu-drawer]', '[data-menu-close]');

  (function searchPanel() {
    const toggle = qs('[data-search-toggle]');
    const panel = qs('[data-search-panel]');
    if (!toggle || !panel) return;

    function setOpen(open) {
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      if (open) {
        const input = qs('input[type="search"]', panel);
        if (input) input.focus();
      } else {
        toggle.focus();
      }
    }

    toggle.addEventListener('click', () => setOpen(panel.hidden));
    const closeBtn = qs('[data-search-close]', panel);
    if (closeBtn) closeBtn.addEventListener('click', () => setOpen(false));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !panel.hidden) setOpen(false);
    });
  })();

  qsa('[data-qty-change]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const wrap = btn.closest('.qty-field');
      const target = wrap && qs('input[type="number"]', wrap);
      if (!target) return;
      const next = Number(target.value || 1) + Number(btn.getAttribute('data-qty-change'));
      const min = Number(target.min || 1);
      target.value = String(Math.max(min, next));
    });
  });

  (function gallery() {
    const root = qs('[data-gallery]');
    if (!root) return;
    const items = qsa('[data-media-id]', root);
    const thumbs = qsa('[data-thumb-for]', root);

    function show(id) {
      items.forEach((item) => {
        const on = item.getAttribute('data-media-id') === id;
        item.classList.toggle('is-active', on);
        item.hidden = !on;
      });
      thumbs.forEach((thumb) => {
        thumb.classList.toggle('is-active', thumb.getAttribute('data-thumb-for') === id);
      });
    }

    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', () => show(thumb.getAttribute('data-thumb-for')));
    });
  })();

  (function variants() {
    const section = qs('[data-product-section]');
    if (!section) return;
    const jsonEl = qs('[data-product-json]', section);
    const picker = qs('[data-variant-picker]', section);
    const idInput = qs('[data-variant-id]', section);
    const addBtn = qs('[data-add-to-cart]', section);
    if (!jsonEl || !idInput) return;

    let product;
    try {
      product = JSON.parse(jsonEl.textContent);
    } catch (e) {
      return;
    }

    function selectedOptions() {
      if (!picker) return product.variants[0];
      const values = qsa('fieldset', picker).map((set) => {
        const checked = qs('input:checked', set);
        return checked ? checked.value : '';
      });
      return product.variants.find((variant) =>
        variant.options.every((option, index) => option === values[index])
      );
    }

    function formatMoney(cents) {
      if (window.Shopify && Shopify.formatMoney) {
        return Shopify.formatMoney(cents, window.themeMoneyFormat);
      }
      const amount = (Number(cents) / 100).toFixed(2);
      const format = document.body.getAttribute('data-money-format') || '{{amount}}';
      return format
        .replace(/\{\{\s*amount\s*\}\}/g, amount)
        .replace(/\{\{\s*amount_no_decimals\s*\}\}/g, String(Math.round(Number(cents) / 100)))
        .replace(/\{\{\s*amount_with_comma_separator\s*\}\}/g, amount.replace('.', ','));
    }

    function sync() {
      const variant = selectedOptions();
      if (!variant) {
        if (addBtn) {
          addBtn.disabled = true;
          addBtn.textContent = addBtn.getAttribute('data-unavailable') || addBtn.textContent;
        }
        return;
      }
      idInput.value = variant.id;
      if (addBtn) {
        addBtn.disabled = !variant.available;
        addBtn.textContent = variant.available
          ? addBtn.getAttribute('data-add-label')
          : addBtn.getAttribute('data-sold-out');
      }
      const priceRoot = qs('[data-price]', section);
      if (priceRoot) {
        const sale = variant.compare_at_price && variant.compare_at_price > variant.price;
        const html = sale
          ? `<span class="price__sale">${formatMoney(variant.price)}</span> <s class="price__compare">${formatMoney(variant.compare_at_price)}</s>`
          : `<span class="price__regular">${formatMoney(variant.price)}</span>`;
        priceRoot.innerHTML = `<div class="price${sale ? ' price--sale' : ''}">${html}</div>`;
      }
      const sku = qs('[data-sku]', section);
      if (sku) sku.textContent = variant.sku || '';
      const url = new URL(window.location.href);
      url.searchParams.set('variant', variant.id);
      window.history.replaceState({}, '', url.toString());
    }

    if (picker) picker.addEventListener('change', sync);
  })();
})();
