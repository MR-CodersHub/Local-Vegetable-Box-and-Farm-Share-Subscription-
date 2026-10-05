/**
 * HARVESTBOX — UTILS.JS
 * Image Zoom/Lightbox, FAQ Accordion, Form Validation,
 * Tabs, Countdown Timer, Filter/Search, Category Filter
 */

'use strict';

/* ================================================================
   LIGHTBOX / IMAGE ZOOM
   ================================================================ */
const initLightbox = () => {
  const lightbox  = document.getElementById('lightbox');
  const lbImg     = lightbox?.querySelector('.lightbox-img');
  const lbClose   = lightbox?.querySelector('.lightbox-close');
  const zoomables = document.querySelectorAll('.zoomable, [data-zoom]');

  if (!lightbox || zoomables.length === 0) return;

  const open = (src, alt = '') => {
    lbImg.src = src;
    lbImg.alt = alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose?.focus();
  };

  const close = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  zoomables.forEach(el => {
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', 'View larger image');
    el.addEventListener('click', () => {
      const src = el.dataset.zoom || el.src || el.querySelector('img')?.src;
      const alt = el.dataset.alt || el.alt || el.querySelector('img')?.alt || '';
      if (src) open(src, alt);
    });
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') el.click(); });
  });

  lbClose?.addEventListener('click', close);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && lightbox.classList.contains('open')) close(); });
};

/* ================================================================
   FAQ ACCORDION
   ================================================================ */
const initFAQ = () => {
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length === 0) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer   = item.querySelector('.faq-answer');

    question?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all (single-open mode); remove this block for multi-open
      faqItems.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-answer')?.setAttribute('aria-hidden', 'true');
      });

      if (!isOpen) {
        item.classList.add('open');
        answer?.setAttribute('aria-hidden', 'false');
      }
    });

    // Keyboard support
    question?.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); question.click(); }
    });

    question?.setAttribute('tabindex', '0');
    question?.setAttribute('role', 'button');
    answer?.setAttribute('aria-hidden', 'true');
  });
};

/* ================================================================
   TABS
   ================================================================ */
const initTabs = () => {
  document.querySelectorAll('.tabs-wrapper').forEach(wrapper => {
    const buttons = [...wrapper.querySelectorAll('.tab-btn')];
    const panels  = [...wrapper.querySelectorAll('.tab-panel')];

    buttons.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
        panels.forEach(p  => p.classList.remove('active'));

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        if (panels[i]) panels[i].classList.add('active');
      });

      // Keyboard nav
      btn.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') buttons[(i + 1) % buttons.length]?.click();
        if (e.key === 'ArrowLeft')  buttons[(i - 1 + buttons.length) % buttons.length]?.click();
      });

      btn.setAttribute('role', 'tab');
    });
  });
};

/* ================================================================
   FORM VALIDATION
   ================================================================ */
const validators = {
  required:  (val) => val.trim() !== '',
  email:     (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
  phone:     (val) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(val.trim()),
  minLength: (val, min) => val.trim().length >= min,
  maxLength: (val, max) => val.trim().length <= max,
};

const validateField = (field) => {
  const rules   = field.dataset.validate ? field.dataset.validate.split('|') : [];
  const value   = field.value;
  const errorEl = document.getElementById(`${field.id}-error`);

  let isValid = true;
  let message = '';

  for (const rule of rules) {
    const [ruleName, ruleParam] = rule.split(':');
    const fn = validators[ruleName];
    if (fn && !fn(value, ruleParam)) {
      isValid = false;
      message = field.dataset[`${ruleName}Msg`] || getDefaultMessage(ruleName, ruleParam);
      break;
    }
  }

  field.classList.toggle('error', !isValid);
  field.classList.toggle('success', isValid && value !== '');

  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.toggle('show', !isValid);
  }

  return isValid;
};

const getDefaultMessage = (rule, param) => {
  const msgs = {
    required:  'This field is required.',
    email:     'Please enter a valid email address.',
    phone:     'Please enter a valid phone number.',
    minLength: `Minimum ${param} characters required.`,
    maxLength: `Maximum ${param} characters allowed.`,
  };
  return msgs[rule] || 'Invalid value.';
};

const initFormValidation = () => {
  const forms = document.querySelectorAll('form[data-validate]');

  forms.forEach(form => {
    const fields = [...form.querySelectorAll('[data-validate]')];

    // Real-time validation
    fields.forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) validateField(field);
      });
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      let allValid = true;
      fields.forEach(field => { if (!validateField(field)) allValid = false; });

      if (allValid) {
        handleFormSubmit(form);
      }
    });
  });
};

const handleFormSubmit = (form) => {
  const btn        = form.querySelector('[type="submit"]');
  const originalTxt = btn?.textContent;

  if (btn) {
    btn.textContent = 'Sending...';
    btn.disabled = true;
    btn.classList.add('loading');
  }

  // Simulate API call
  setTimeout(() => {
    if (btn) {
      btn.textContent = '✓ Sent!';
      btn.style.background = '#16A34A';
    }

    const successMsg = form.querySelector('.form-success');
    if (successMsg) { successMsg.style.display = 'block'; }

    window.showToast?.('Message Sent!', 'We\'ll get back to you soon.', 'success');

    form.reset();
    form.querySelectorAll('.form-control').forEach(f => f.classList.remove('success', 'error'));

    setTimeout(() => {
      if (btn) { btn.textContent = originalTxt; btn.disabled = false; btn.classList.remove('loading'); btn.style.background = ''; }
      if (successMsg) successMsg.style.display = 'none';
    }, 3500);
  }, 1500);
};

/* ================================================================
   CATEGORY FILTER
   ================================================================ */
const initCategoryFilter = () => {
  const filterBtns  = document.querySelectorAll('[data-filter]');
  const filterItems = document.querySelectorAll('[data-category]');

  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.dataset.filter;

      filterItems.forEach(item => {
        const categories = item.dataset.category?.split(',').map(c => c.trim()) || [];
        const show = filterValue === 'all' || categories.includes(filterValue);

        item.style.transition = 'opacity 0.3s, transform 0.3s';

        if (show) {
          item.style.display = '';
          requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => { item.style.display = 'none'; }, 300);
        }
      });
    });
  });
};

/* ================================================================
   SEARCH BAR
   ================================================================ */
const initSearch = () => {
  const searchInput = document.querySelector('[data-search-input]');
  const searchItems = document.querySelectorAll('[data-search-item]');

  if (!searchInput || searchItems.length === 0) return;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    let found = 0;

    searchItems.forEach(item => {
      const text   = item.dataset.searchItem?.toLowerCase() || item.textContent.toLowerCase();
      const match  = query === '' || text.includes(query);
      item.style.display = match ? '' : 'none';
      if (match) found++;
    });

    // Show no results
    const noResults = document.querySelector('[data-search-empty]');
    if (noResults) noResults.style.display = found === 0 ? 'block' : 'none';
  });
};

/* ================================================================
   COUNTDOWN TIMER (Maintenance Page)
   ================================================================ */
const initCountdown = () => {
  const countdownEl = document.querySelector('[data-countdown]');
  if (!countdownEl) return;

  const targetDate = new Date(countdownEl.dataset.countdown);
  if (isNaN(targetDate)) return;

  const daysEl  = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl  = document.getElementById('cd-mins');
  const secsEl  = document.getElementById('cd-secs');

  const update = () => {
    const now  = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      clearInterval(timer);
      countdownEl.innerHTML = '<p style="font-size:1.5rem;font-weight:bold;color:var(--color-leaf)">We\'re Live!</p>';
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000)  / 60000);
    const s = Math.floor((diff % 60000)    / 1000);

    const flip = (el, val) => {
      const padded = String(val).padStart(2, '0');
      if (el && el.textContent !== padded) {
        el.textContent = padded;
        el.classList.remove('flip');
        void el.offsetWidth; // reflow
        el.classList.add('flip');
      }
    };

    flip(daysEl, d);
    flip(hoursEl, h);
    flip(minsEl, m);
    flip(secsEl, s);
  };

  update();
  const timer = setInterval(update, 1000);
};

/* ================================================================
   PROGRESS BAR (maintenance / service page)
   ================================================================ */
const initProgressBars = () => {
  const bars = document.querySelectorAll('.progress-fill[data-progress]');
  if (bars.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar   = entry.target;
        const value = bar.dataset.progress;
        setTimeout(() => { bar.style.width = value + '%'; }, 200);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => {
    bar.style.width = '0%';
    observer.observe(bar);
  });
};

/* ================================================================
   NEWSLETTER TOAST
   ================================================================ */
const initNewsletter = () => {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const email = input?.value?.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        window.showToast?.('Invalid Email', 'Please enter a valid email address.', 'error');
        return;
      }
      window.showToast?.('Subscribed!', 'You\'ll get fresh updates from us.', 'success');
      input.value = '';
    });
  });
};

/* ================================================================
   INIT ALL
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initLightbox();
  initFAQ();
  initTabs();
  initFormValidation();
  initCategoryFilter();
  initSearch();
  initCountdown();
  initProgressBars();
  initNewsletter();
});
