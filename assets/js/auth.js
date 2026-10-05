/**
 * HARVESTBOX — AUTH.JS
 * Standalone Login / Signup logic + saved-theme/dir support.
 * Reuses: validators + validateField + showToast (when present).
 * Session model matches the subscriber dashboard (hb_users/hb_session).
 */

'use strict';

/* ================================================================
   SAVED THEME + DIRECTION (mirror of main.js; no toggle UI here)
   ================================================================ */
const initAuthTheme = () => {
  try {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme  = localStorage.getItem('hb-theme');
    document.documentElement.setAttribute('data-theme', savedTheme || (prefersDark.matches ? 'dark' : 'light'));
    const savedDir = localStorage.getItem('hb-dir') || 'ltr';
    document.body.setAttribute('dir', savedDir);
  } catch (e) { /* private mode: fall back to light/LTR defaults */ }
};

/* ================================================================
   TOAST FALLBACK (uses site toast when available)
   ================================================================ */
const authToast = (title, message = '', type = 'success') => {
  if (typeof window.showToast === 'function') {
    window.showToast(title, message, type);
    return;
  }
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', 'status');
  el.textContent = title + (message ? ' — ' + message : '');
  container.appendChild(el);
  setTimeout(() => el.remove(), 4000);
};

/* ================================================================
   PASSWORD VISIBILITY TOGGLES (vector eye icons, aria-pressed)
   ================================================================ */
const initPasswordToggles = () => {
  document.querySelectorAll('[data-toggle-password]').forEach(btn => {
    const input = document.getElementById(btn.getAttribute('data-toggle-password'));
    if (!input) return;
    btn.addEventListener('click', () => {
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.setAttribute('aria-pressed', String(show));
      btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
      input.focus({ preventScroll: true });
    });
  });
};

/* ================================================================
   VALIDATION HELPERS (falls back if utils.js is unavailable)
   ================================================================ */
const authValidate = (field) => {
  if (typeof window.validateField === 'function' || typeof validateField === 'function') {
    try { return validateField(field); } catch (e) { /* fall through */ }
  }
  const rules = (field.dataset.validate || '').split('|').filter(Boolean);
  const errorEl = document.getElementById(field.id + '-error');
  let ok = true;
  let msg = '';
  for (const rule of rules) {
    const val = field.value;
    if (rule === 'required' && val.trim() === '') { ok = false; msg = 'This field is required.'; break; }
    if (rule === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { ok = false; msg = 'Please enter a valid email address.'; break; }
  }
  field.classList.toggle('error', !ok);
  if (errorEl) { errorEl.textContent = msg; errorEl.classList.toggle('show', !ok); }
  return ok;
};

const setFieldError = (field, message) => {
  field.classList.add('error');
  field.classList.remove('success');
  const errorEl = document.getElementById(field.id + '-error');
  if (errorEl) { errorEl.textContent = message; errorEl.classList.add('show'); }
  field.focus({ preventScroll: true });
};

const clearFieldError = (field) => {
  field.classList.remove('error');
  const errorEl = document.getElementById(field.id + '-error');
  if (errorEl) { errorEl.textContent = ''; errorEl.classList.remove('show'); }
};

/* ================================================================
   SESSION STORE (same keys as the subscriber dashboard)
   ================================================================ */
const readUsers = () => {
  try { return JSON.parse(localStorage.getItem('hb_users') || '{}'); }
  catch (e) { return {}; }
};
const writeUsers = (users) => {
  try { localStorage.setItem('hb_users', JSON.stringify(users)); } catch (e) {}
};

/* Non-cryptographic demo hash so passwords are never stored in plain
   text in localStorage. (Frontend demo only — not real security.) */
const hashPassword = (value) => {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  const s = 'hb$' + String(value);
  for (let i = 0; i < s.length; i++) {
    const ch = s.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
};

/* ================================================================
   LOGIN
   ================================================================ */
const initLogin = () => {
  const form = document.getElementById('login-form');
  if (!form) return;

  const email = document.getElementById('login-email');
  const pass  = document.getElementById('login-pass');
  const remember = document.getElementById('login-remember');

  try {
    const saved = localStorage.getItem('hb_remember');
    if (saved && email && !email.value) email.value = saved;
  } catch (e) {}

  [email, pass].forEach(f => f && f.addEventListener('input', () => { if (f.classList.contains('error')) clearFieldError(f); }));

  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    if (!authValidate(email)) ok = false;
    if (!authValidate(pass)) ok = false;
    if (!ok) return;

    const users = readUsers();
    const key = email.value.trim().toLowerCase();
    const user = users[key] || users[email.value.trim()];

    if (!user) {
      setFieldError(email, 'No account found for this email. Try signing up instead.');
      authToast('Login failed', 'No account found for this email.', 'error');
      return;
    }
    if (user.pass && user.pass !== hashPassword(pass.value)) {
      setFieldError(pass, 'Incorrect password. Please try again.');
      authToast('Login failed', 'Incorrect password.', 'error');
      return;
    }
    try {
      localStorage.setItem('hb_session', user.email || key);
      if (remember && remember.checked) localStorage.setItem('hb_remember', email.value.trim());
      else localStorage.removeItem('hb_remember');
    } catch (err) {}
    authToast('Welcome back', 'Opening your subscriber dashboard…', 'success');
    setTimeout(() => { window.location.href = 'subscriber-dashboard.html'; }, 800);
  });
};

/* ================================================================
   SIGNUP
   ================================================================ */
const initSignup = () => {
  const form = document.getElementById('signup-form');
  if (!form) return;

  const name  = document.getElementById('signup-name');
  const email = document.getElementById('signup-email');
  const phone = document.getElementById('signup-phone');
  const pass  = document.getElementById('signup-pass');
  const confirm = document.getElementById('signup-confirm');
  const terms = document.getElementById('signup-terms');

  // Plan pre-selection from Pricing (?plan=mini|family|feast)
  try {
    const q = new URLSearchParams(window.location.search).get('plan');
    const map = { mini: 'Mini Box', family: 'Family Box', feast: 'Harvest Feast' };
    if (q && map[q.toLowerCase()]) {
      const radio = form.querySelector('input[name="plan"][value="' + map[q.toLowerCase()] + '"]');
      if (radio) radio.checked = true;
    }
  } catch (e) {}

  [name, email, phone, pass, confirm].forEach(f => f && f.addEventListener('input', () => {
    if (f.classList.contains('error')) clearFieldError(f);
  }));
  if (terms) terms.addEventListener('change', () => {
    const err = document.getElementById('signup-terms-error');
    if (terms.checked && err) { err.textContent = ''; err.classList.remove('show'); }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    [name, email, pass].forEach(f => { if (!authValidate(f)) ok = false; });
    if (!authValidate(phone)) ok = false;
    else {
      const digits = phone.value.replace(/\D/g, '');
      if (digits.length < 7) {
        setFieldError(phone, 'Please enter a valid phone number.');
        ok = false;
      }
    }
    if (!authValidate(confirm)) ok = false;
    else if (pass.value !== confirm.value) {
      setFieldError(confirm, 'Passwords do not match.');
      ok = false;
    }
    if (terms && !terms.checked) {
      const err = document.getElementById('signup-terms-error');
      if (err) { err.textContent = 'Please accept the Terms & Privacy Policy to continue.'; err.classList.add('show'); }
      ok = false;
    }
    if (!ok) return;

    const users = readUsers();
    const key = email.value.trim().toLowerCase();
    if (users[key] || users[email.value.trim()]) {
      setFieldError(email, 'An account with this email already exists. Try signing in.');
      authToast('Already registered', 'Please sign in instead.', 'error');
      return;
    }
    const plan = (form.querySelector('input[name="plan"]:checked') || {}).value || 'Family Box';
    users[key] = {
      name: name.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      plan,
      freq: 'Weekly',
      pass: hashPassword(pass.value),
      joined: new Date().toISOString()
    };
    writeUsers(users);
    try { localStorage.setItem('hb_session', email.value.trim()); } catch (err) {}
    authToast('Account created', plan + ' selected — opening your dashboard…', 'success');
    setTimeout(() => { window.location.href = 'subscriber-dashboard.html'; }, 900);
  });
};

/* ================================================================
   INIT
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initAuthTheme();
  initPasswordToggles();
  initLogin();
  initSignup();
});
