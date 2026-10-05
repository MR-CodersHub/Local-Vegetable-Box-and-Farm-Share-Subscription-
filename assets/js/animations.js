/**
 * HARVESTBOX — ANIMATIONS.JS
 * Scroll Reveal (IntersectionObserver), Counter Animation, Parallax
 */

'use strict';

/* ================================================================
   SCROLL REVEAL
   ================================================================ */
const initScrollReveal = () => {
  const elements = document.querySelectorAll('[data-reveal]');
  if (elements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Optional: unobserve after reveal for performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
};

/* ================================================================
   COUNTER ANIMATION
   ================================================================ */
const animateCounter = (el, target, duration = 1800) => {
  const start     = 0;
  const startTime = performance.now();
  const isFloat   = target % 1 !== 0;
  const suffix    = el.dataset.suffix || '';
  const prefix    = el.dataset.prefix || '';

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  const update = (currentTime) => {
    const elapsed  = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOut(progress);
    const current  = start + (target - start) * easedProgress;

    el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix;

    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = prefix + (isFloat ? target.toFixed(1) : target.toLocaleString()) + suffix;
  };

  requestAnimationFrame(update);
};

const initCounters = () => {
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseFloat(el.dataset.counter);
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
};

/* ================================================================
   PARALLAX
   ================================================================ */
const initParallax = () => {
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;

  const updateParallax = () => {
    const scrollY = window.scrollY;

    parallaxEls.forEach(el => {
      const speed  = parseFloat(el.dataset.parallax) || 0.3;
      const rect   = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      const offset = center * speed;
      el.style.transform = `translateY(${offset}px)`;
    });

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
};

/* ================================================================
   STICKY SCROLLSPY (TOC / Legal pages)
   ================================================================ */
const initScrollSpy = () => {
  const spyLinks = document.querySelectorAll('[data-spy]');
  if (spyLinks.length === 0) return;

  const sections = [...spyLinks].map(link => document.getElementById(link.dataset.spy)).filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        spyLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.spy === id);
        });
      }
    });
  }, {
    rootMargin: `-${72 + 16}px 0px -60% 0px`,
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));
};

/* ================================================================
   PROGRESS BAR (Page read progress)
   ================================================================ */
const initReadingProgress = () => {
  const bar = document.querySelector('.reading-progress-bar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / total) * 100;
    bar.style.width = `${Math.min(progress, 100)}%`;
  }, { passive: true });
};

/* ================================================================
   LAZY LOAD IMAGES
   ================================================================ */
const initLazyLoad = () => {
  const images = document.querySelectorAll('img[data-src]');
  if (images.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        if (img.dataset.srcset) img.srcset = img.dataset.srcset;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px 0px' });

  images.forEach(img => observer.observe(img));
};

/* ================================================================
   TAG CLOUD ANIMATION
   ================================================================ */
const initTagCloud = () => {
  const tags = document.querySelectorAll('.tag-cloud .tag');
  tags.forEach((tag, i) => {
    tag.style.animationDelay = `${i * 0.05}s`;
    tag.classList.add('anim-bounce-in');
  });
};

/* ================================================================
   TILT EFFECT (Product Cards)
   ================================================================ */
const initTilt = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window) return; // Skip on touch devices

  const cards = document.querySelectorAll('.product-card[data-tilt]');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
};

/* ================================================================
   STAGGER CHILDREN
   ================================================================ */
const initStaggerChildren = () => {
  document.querySelectorAll('[data-stagger]').forEach(parent => {
    const delay = parseFloat(parent.dataset.stagger) || 0.1;
    [...parent.children].forEach((child, i) => {
      child.setAttribute('data-reveal', child.dataset.reveal || 'fade-up');
      child.setAttribute('data-delay', Math.round(i * delay * 1000));
    });
  });
};

/* ================================================================
   INIT ALL
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initStaggerChildren();
  initScrollReveal();
  initCounters();
  initParallax();
  initScrollSpy();
  initReadingProgress();
  initLazyLoad();
  initTilt();
});
