/**
 * HARVESTBOX — MAIN.JS
 * Core: Navbar, Dark/Light Mode, RTL/LTR Toggle,
 * Mobile Menu, Back-to-Top, Page Transitions, Toast
 */

'use strict';

/* ================================================================
   PAGE LOADER
   ================================================================ */
const initLoader = () => {
  const loader = document.getElementById('page-loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.add('page-enter');
    }, 800);
  });
};

/* ================================================================
   PAGE TRANSITIONS
   ================================================================ */
const initPageTransitions = () => {
  // Page slide transition disabled to allow direct page load with loading animation
};

/* ================================================================
   NAVBAR
   ================================================================ */
const initNavbar = () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const isHeroPage = document.querySelector('.hero-slider, .split-hero');

  const handleScroll = () => {
    const scrolled = window.scrollY > 50;
    if (isHeroPage) {
      navbar.classList.toggle('scrolled', scrolled);
      navbar.classList.toggle('transparent', !scrolled);
    } else {
      navbar.classList.add('scrolled');
      navbar.classList.remove('transparent');
    }
  };

  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll, { passive: true });

  // Active link highlighting
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
};

/* ================================================================
   MOBILE MENU
   ================================================================ */
const initMobileMenu = () => {
  const hamburger    = document.querySelector('.hamburger');
  const mobileNav    = document.querySelector('.mobile-nav');
  const overlay      = document.querySelector('.mobile-nav-overlay');
  const closeBtn     = document.querySelector('.mobile-close');

  if (!hamburger || !mobileNav) return;

  const openMenu  = () => {
    hamburger.classList.add('open');
    mobileNav.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', () => {
    mobileNav.classList.contains('open') ? closeMenu() : openMenu();
  });

  closeBtn?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);

  // Auto-close the drawer when the viewport crosses to desktop
  // (e.g. opening the menu on mobile then resizing DevTools to desktop)
  const desktopMQ = window.matchMedia('(min-width: 1025px)');
  const onViewportDesktop = (e) => {
    if (e.matches) closeMenu();
  };
  if (desktopMQ.addEventListener) {
    desktopMQ.addEventListener('change', onViewportDesktop);
  } else {
    desktopMQ.addListener(onViewportDesktop);
  }

  // Sub-menu toggles
  document.querySelectorAll('.mobile-nav-link[data-sub]').forEach(link => {
    link.addEventListener('click', () => {
      const target = link.dataset.sub;
      const subMenu = document.getElementById(target);
      if (subMenu) {
        subMenu.classList.toggle('open');
        const arrow = link.querySelector('.mobile-arrow');
        if (arrow) arrow.textContent = subMenu.classList.contains('open') ? '▲' : '▼';
      }
    });
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
};

/* ================================================================
   DARK / LIGHT MODE TOGGLE
   ================================================================ */
const initTheme = () => {
  const prefersDark  = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme   = localStorage.getItem('hb-theme');
  const theme        = savedTheme || (prefersDark.matches ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', theme);

  const updateToggleBtns = (currentTheme) => {
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      const icon = btn.querySelector('.theme-icon');
      const label = btn.querySelector('.theme-label');
      if (icon) icon.innerHTML = currentTheme === 'dark' ? (window.getSvgIcon?.('sun') || '☀️') : (window.getSvgIcon?.('moon') || '🌙');
      if (label) label.textContent = currentTheme === 'dark' ? 'Light' : 'Dark';
      btn.setAttribute('aria-label', `Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`);
      btn.setAttribute('data-current', currentTheme);
    });
  };

  updateToggleBtns(theme);

  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next    = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('hb-theme', next);
      updateToggleBtns(next);
    });
  });

  // Listen to system preference changes
  prefersDark.addEventListener('change', e => {
    if (!localStorage.getItem('hb-theme')) {
      const next = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      updateToggleBtns(next);
    }
  });
};

/* ================================================================
   RTL / LTR TOGGLE
   ================================================================ */
const initRTL = () => {
  const savedDir = localStorage.getItem('hb-dir') || 'ltr';
  // Set dir on <body>, not <html>: keeping the root LTR stops the browser
  // from flipping the vertical scrollbar to the left (the 'bar' that
  // appeared to cross the page on every toggle).
  document.body.setAttribute('dir', savedDir);

  document.querySelectorAll('.rtl-toggle').forEach(btn => {
    const updateBtn = (dir) => {
      btn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      btn.setAttribute('aria-label', `Switch to ${dir === 'rtl' ? 'LTR' : 'RTL'} direction`);
    };

    updateBtn(savedDir);

    btn.addEventListener('click', () => {
      const current = document.body.getAttribute('dir');
      const next    = current === 'rtl' ? 'ltr' : 'rtl';

      // A closed cart drawer animates translateX(100%) -> translateX(-100%)
      // when the direction flips, sliding across the whole screen (the
      // 'bar' artifact). Kill the transition for one frame so the drawer
      // teleports to its new off-screen side instead. (Double rAF: the
      // first frame paints the instant jump, the second restores the
      // transition so open/close animations keep working.)
      const cartDrawer = document.getElementById('cart-drawer');
      if (cartDrawer && !cartDrawer.classList.contains('active')) {
        cartDrawer.style.transition = 'none';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => { cartDrawer.style.transition = ''; });
        });
      }

      document.body.setAttribute('dir', next);
      localStorage.setItem('hb-dir', next);
      updateBtn(next);
    });
  });
};

/* ================================================================
   BACK TO TOP
   ================================================================ */
const initBackToTop = () => {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

/* ================================================================
   TOAST NOTIFICATIONS
   ================================================================ */
window.showToast = (title, message = '', type = 'success', duration = 4000) => {
  const container = document.querySelector('.toast-container') || createToastContainer();
  const getIcon = window.getSvgIcon || (() => '');
  const icons = {
    success: getIcon('check') || '✓',
    error: getIcon('close') || '✕',
    warning: getIcon('wrench') || '!',
    info: getIcon('sprout') || 'i',
    cart: getIcon('bag') || '🛒',
    heart: getIcon('heart') || '♥'
  };

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <div class="toast-icon">${icons[type] || icons.success}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-msg">${message}</div>` : ''}
    </div>
    <button onclick="this.parentElement.remove()" style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:1.1rem;margin-left:0.5rem;padding:0;line-height:1;" aria-label="Close">✕</button>
  `;

  container.appendChild(toast);
  setTimeout(() => { toast.classList.add('removing'); setTimeout(() => toast.remove(), 300); }, duration);
};

const createToastContainer = () => {
  const div = document.createElement('div');
  div.className = 'toast-container';
  document.body.appendChild(div);
  return div;
};

/* ================================================================
   RIPPLE EFFECT
   ================================================================ */
const initRipple = () => {
  document.querySelectorAll('.btn, .ripple-container').forEach(el => {
    el.addEventListener('click', e => {
      const rect   = el.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height);
      const x      = e.clientX - rect.left - size / 2;
      const y      = e.clientY - rect.top  - size / 2;
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
      el.style.position = 'relative';
      el.style.overflow = 'hidden';
      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });
};

/* ================================================================
   STICKY HEADER ACTIVE STATE
   ================================================================ */
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')) || 72;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
};

/* ================================================================
   WISHLIST TOGGLE
   ================================================================ */
const initWishlist = () => {
  document.querySelectorAll('.product-card-wishlist').forEach(btn => {
    const heartSvg = window.getSvgIcon?.('heart') || '♥';
    btn.addEventListener('click', e => {
      e.stopPropagation();
      btn.classList.toggle('active');
      const name = btn.closest('.product-card')?.querySelector('.product-name')?.textContent || 'Item';
      if (btn.classList.contains('active')) {
        btn.innerHTML = `<span style="color:#EF4444">${heartSvg}</span>`;
        showToast('Added to Wishlist', `${name} saved`, 'heart');
      } else {
        btn.innerHTML = heartSvg;
        showToast('Removed', `${name} removed from wishlist`, 'info');
      }
    });
  });
};

/* ================================================================
   ADD TO CART
   ================================================================ */
class CartManager {
  constructor() {
    this.cartKey = 'harvestbox_cart';
    this.cart = this.loadCart();
    this.initUI();
    this.bindEvents();
    this.updateUI();
  }

  loadCart() {
    try {
      const stored = localStorage.getItem(this.cartKey);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
    } catch (e) {}
  }

  initUI() {
    // 1. Ensure Cart Button in Nav Controls if missing
    document.querySelectorAll('.nav-controls').forEach(controls => {
      if (!controls.querySelector('.cart-btn')) {
        const rtlBtn = controls.querySelector('.rtl-btn');
        const ctaBtn = controls.querySelector('.nav-cta');
        const cartBtn = document.createElement('button');
        cartBtn.className = 'nav-icon-btn cart-btn';
        cartBtn.id = 'cart-btn';
        cartBtn.setAttribute('aria-label', 'View shopping cart');
        cartBtn.setAttribute('style', 'position:relative;');
        cartBtn.innerHTML = `
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <span class="cart-badge">0</span>
        `;
        if (rtlBtn && ctaBtn) {
          controls.insertBefore(cartBtn, ctaBtn);
        } else {
          controls.appendChild(cartBtn);
        }
      }
    });

    // 2. Inject Cart Overlay & Drawer in DOM if missing
    if (!document.getElementById('cart-drawer')) {
      const drawerHTML = `
        <div class="cart-overlay" id="cart-overlay" aria-hidden="true"></div>
        <aside class="cart-drawer" id="cart-drawer" role="dialog" aria-label="Shopping Cart">
          <div class="cart-drawer-header">
            <div class="cart-drawer-title">
              <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              Your Basket (<span id="cart-drawer-count">0</span>)
            </div>
            <button class="cart-drawer-close" id="cart-close-btn" aria-label="Close cart"><svg class="icon-svg icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
          </div>

          <div class="cart-drawer-body" id="cart-items-container">
            <!-- Items rendered dynamically -->
          </div>

          <div class="cart-drawer-footer" id="cart-drawer-footer">
            <div class="cart-subtotal">
              <span>Subtotal:</span>
              <span class="subtotal-amount" id="cart-subtotal-price">₹0</span>
            </div>
            <div class="cart-delivery-note" id="cart-delivery-note">
              <svg class="icon-svg icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              <span id="delivery-promo-text">Free delivery on orders above ₹399</span>
            </div>
            <a href="checkout.html" class="btn btn-gold w-full checkout-btn" id="checkout-btn" style="display:flex;align-items:center;justify-content:center;gap:0.5rem;"><span>Proceed to Checkout</span> <svg class="icon-svg icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
            <button class="cart-clear-btn" id="cart-clear-btn" style="display:flex;align-items:center;justify-content:center;gap:0.35rem;"><svg class="icon-svg icon-svg-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> <span>Clear Cart</span></button>
          </div>
        </aside>
      `;
      document.body.insertAdjacentHTML('beforeend', drawerHTML);
    }
  }

  bindEvents() {
    // Open Cart Drawer
    document.addEventListener('click', e => {
      const cartBtn = e.target.closest('.cart-btn');
      if (cartBtn) {
        this.openDrawer();
      }
    });

    // Close Cart Drawer
    document.addEventListener('click', e => {
      if (e.target.closest('#cart-close-btn') || e.target.closest('#cart-overlay')) {
        this.closeDrawer();
      }
    });

    // ESC Key to close
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.closeDrawer();
    });

    // Add to Cart buttons on product cards
    document.addEventListener('click', e => {
      const addBtn = e.target.closest('.btn-cart, .btn-add-cart');
      if (addBtn) {
        e.preventDefault();
        e.stopPropagation();

        const card = addBtn.closest('.product-card') || addBtn.closest('.special-card') || addBtn.closest('.deal-card');
        const name = addBtn.getAttribute('data-name') || card?.querySelector('.product-name, h3')?.textContent?.trim() || 'Organic Produce';
        const priceText = addBtn.getAttribute('data-price') || card?.querySelector('.price-current, .price')?.textContent?.trim() || '₹100';
        const unit = card?.querySelector('.price-unit')?.textContent?.trim() || '';
        const img = addBtn.getAttribute('data-img') || card?.querySelector('img')?.src || 'assets/images/product_malgova_mango.png';

        const price = parseInt(priceText.replace(/[^0-9]/g, '')) || 100;

        this.addItem({
          id: name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
          name,
          price,
          unit,
          img
        });

        showToast('Added to Cart', name, 'cart');
      }
    });

    // Quantity & Remove clicks inside Cart Drawer
    document.addEventListener('click', e => {
      const qtyBtn = e.target.closest('.cart-qty-btn');
      if (qtyBtn) {
        const id = qtyBtn.getAttribute('data-id');
        const action = qtyBtn.getAttribute('data-action');
        this.updateQty(id, action === 'increase' ? 1 : -1);
      }

      const removeBtn = e.target.closest('.cart-item-remove');
      if (removeBtn) {
        const id = removeBtn.getAttribute('data-id');
        this.removeItem(id);
      }

      if (e.target.closest('#cart-clear-btn')) {
        this.clearCart();
      }
    });
  }

  addItem(item) {
    const existing = this.cart.find(i => i.id === item.id);
    if (existing) {
      existing.qty++;
    } else {
      this.cart.push({ ...item, qty: 1 });
    }
    this.saveCart();
    this.updateUI();
    this.animateBadge();
  }

  updateQty(id, delta) {
    const item = this.cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      this.removeItem(id);
      return;
    }
    this.saveCart();
    this.updateUI();
  }

  removeItem(id) {
    this.cart = this.cart.filter(i => i.id !== id);
    this.saveCart();
    this.updateUI();
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
    this.updateUI();
  }

  openDrawer() {
    document.getElementById('cart-drawer')?.classList.add('active');
    document.getElementById('cart-overlay')?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeDrawer() {
    document.getElementById('cart-drawer')?.classList.remove('active');
    document.getElementById('cart-overlay')?.classList.remove('active');
    document.body.style.overflow = '';
  }

  animateBadge() {
    document.querySelectorAll('.cart-badge').forEach(badge => {
      badge.classList.remove('anim-bounce');
      void badge.offsetWidth;
      badge.classList.add('anim-bounce');
    });
  }

  updateUI() {
    const totalQty = this.cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Badges
    document.querySelectorAll('.cart-badge').forEach(badge => {
      badge.textContent = totalQty;
      badge.style.display = totalQty > 0 ? 'flex' : 'none';
    });

    const countEl = document.getElementById('cart-drawer-count');
    if (countEl) countEl.textContent = totalQty;

    const subtotalEl = document.getElementById('cart-subtotal-price');
    if (subtotalEl) subtotalEl.textContent = `₹${totalPrice}`;

    // Delivery Promo text
    const promoEl = document.getElementById('delivery-promo-text');
    if (promoEl) {
      if (totalPrice >= 399) {
        promoEl.innerHTML = `<span style="display:inline-flex;align-items:center;gap:0.35rem;"><svg class="icon-svg icon-svg-xs" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> <strong>Free Delivery Unlocked!</strong></span>`;
      } else if (totalPrice > 0) {
        const remaining = 399 - totalPrice;
        promoEl.innerHTML = `Add <strong>₹${remaining}</strong> more for Free Delivery!`;
      } else {
        promoEl.textContent = `Free delivery on orders above ₹399`;
      }
    }

    // Render items
    const container = document.getElementById('cart-items-container');
    if (!container) return;

    if (this.cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-state">
          <div class="empty-icon">
            <svg class="icon-svg icon-svg-xl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
          <h4>Your Cart is Empty</h4>
          <p>Explore our fresh produce and add items to your basket!</p>
          <a href="home2.html" class="btn btn-primary btn-sm" style="margin-top:1rem;">Start Shopping</a>
        </div>
      `;
      const footer = document.getElementById('cart-drawer-footer');
      if (footer) footer.style.display = 'none';
    } else {
      const footer = document.getElementById('cart-drawer-footer');
      if (footer) footer.style.display = 'block';

      container.innerHTML = this.cart.map(item => `
        <div class="cart-item">
          <img src="${item.img}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">₹${item.price} <span class="cart-item-unit">${item.unit}</span></div>
            <div class="cart-item-controls">
              <button class="cart-qty-btn" data-id="${item.id}" data-action="decrease" aria-label="Decrease quantity">
                <svg class="icon-svg icon-svg-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <span class="cart-item-qty">${item.qty}</span>
              <button class="cart-qty-btn" data-id="${item.id}" data-action="increase" aria-label="Increase quantity">
                <svg class="icon-svg icon-svg-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
          </div>
          <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove item">
            <svg class="icon-svg icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
          </button>
        </div>
      `).join('');
    }
  }
}

/* ================================================================
   PROFILE / ACCOUNT DROPDOWN (navbar: Login + Signup)
   ================================================================ */
const initProfileDropdown = () => {
  const menu = document.querySelector('.profile-menu');
  if (!menu) return;
  const btn   = menu.querySelector('.profile-btn');
  const panel = menu.querySelector('.profile-dropdown');
  if (!btn || !panel) return;
  const items = [...panel.querySelectorAll('[role="menuitem"]')];

  const setOpen = (open) => {
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  };
  const isOpen = () => menu.classList.contains('open');

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(!isOpen());
    if (isOpen()) items[0]?.focus();
  });

  document.addEventListener('click', (e) => {
    if (isOpen() && !menu.contains(e.target)) setOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if (!isOpen()) return;
    if (e.key === 'Escape') {
      setOpen(false);
      btn.focus();
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      const i = items.indexOf(document.activeElement);
      let next = 0;
      if (e.key === 'ArrowDown') next = (i + 1) % items.length;
      if (e.key === 'ArrowUp')   next = (i - 1 + items.length) % items.length;
      if (e.key === 'End')       next = items.length - 1;
      items[next]?.focus();
    }
  });

  items.forEach(item => item.addEventListener('click', () => setOpen(false)));

  btn.addEventListener('keydown', (e) => {
    if ((e.key === 'ArrowDown') && !isOpen()) {
      e.preventDefault();
      setOpen(true);
      items[0]?.focus();
    }
  });
};

/* ================================================================
   INIT ALL
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initTheme();
  initRTL();
  initNavbar();
  initMobileMenu();
  initProfileDropdown();
  initBackToTop();
  initRipple();
  initSmoothScroll();
  initWishlist();
  new CartManager();
  initPageTransitions();
});
