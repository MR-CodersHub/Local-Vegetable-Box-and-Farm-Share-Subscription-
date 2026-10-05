/**
 * HARVESTBOX — SLIDER.JS
 * Hero Slider: auto-play, touch/swipe, keyboard navigation,
 * dot navigation, side arrows, progress bar
 */

'use strict';

class HeroSlider {
  constructor(selector) {
    this.container = document.querySelector(selector);
    if (!this.container) return;

    this.slides       = [...this.container.querySelectorAll('.slide')];
    this.dots         = [...this.container.querySelectorAll('.slider-dot')];
    this.progressBar  = this.container.querySelector('.slider-progress');
    this.prevBtn      = this.container.querySelector('.slider-prev');
    this.nextBtn      = this.container.querySelector('.slider-next');
    this.counter      = this.container.querySelector('.current-num');
    this.totalEl      = this.container.querySelector('.total-num');

    this.current      = 0;
    this.total        = this.slides.length;
    this.interval     = null;
    this.delay        = 10000;
    this.isAnimating  = false;
    this.touchStartX  = 0;
    this.touchEndX    = 0;

    if (this.total === 0) return;

    this.init();
  }

  init() {
    this.goTo(0, false);
    this.startAutoplay();
    this.bindEvents();
    if (this.totalEl) this.totalEl.textContent = String(this.total).padStart(2, '0');
  }

  goTo(index, animate = true) {
    if (this.isAnimating && animate) return;
    if (this.slides.length === 0) return;

    const prev = this.current;
    this.current = ((index % this.total) + this.total) % this.total;

    // Remove active from all
    this.slides.forEach(s => s.classList.remove('active'));
    this.dots.forEach(d => d.classList.remove('active'));

    // Add active to current
    this.slides[this.current].classList.add('active');
    if (this.dots[this.current]) this.dots[this.current].classList.add('active');

    // Update counter
    if (this.counter) {
      this.counter.textContent = String(this.current + 1).padStart(2, '0');
    }

    // Reset progress bar
    if (this.progressBar) {
      this.progressBar.style.transition = 'none';
      this.progressBar.style.width = '0%';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.progressBar.style.transition = `width ${this.delay}ms linear`;
          this.progressBar.style.width = '100%';
        });
      });
    }

    if (animate) {
      this.isAnimating = true;
      setTimeout(() => { this.isAnimating = false; }, 800);
    }
  }

  next() {
    this.goTo(this.current + 1);
    this.resetAutoplay();
  }

  prev() {
    this.goTo(this.current - 1);
    this.resetAutoplay();
  }

  startAutoplay() {
    this.interval = setInterval(() => this.goTo(this.current + 1), this.delay);
  }

  stopAutoplay() {
    clearInterval(this.interval);
  }

  resetAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }

  bindEvents() {
    // Dot clicks
    this.dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { this.goTo(i); this.resetAutoplay(); });
    });

    // Arrow clicks
    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());

    // Keyboard navigation
    document.addEventListener('keydown', e => {
      const isSliderFocused = this.container.matches(':hover') || this.container === document.activeElement;
      if (!isSliderFocused && !this.container.contains(document.activeElement)) return;
      if (e.key === 'ArrowLeft')  { this.prev(); }
      if (e.key === 'ArrowRight') { this.next(); }
    });

    // Touch swipe
    this.container.addEventListener('touchstart', e => {
      this.touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    this.container.addEventListener('touchend', e => {
      this.touchEndX = e.changedTouches[0].clientX;
      const diff = this.touchStartX - this.touchEndX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? this.next() : this.prev();
      }
    }, { passive: true });

    // Mouse drag (desktop)
    let mouseStartX = 0;
    let isDragging  = false;

    this.container.addEventListener('mousedown', e => {
      mouseStartX = e.clientX;
      isDragging  = true;
    });

    this.container.addEventListener('mouseup', e => {
      if (!isDragging) return;
      isDragging  = false;
      const diff  = mouseStartX - e.clientX;
      if (Math.abs(diff) > 60) {
        diff > 0 ? this.next() : this.prev();
      }
    });

    this.container.addEventListener('mouseleave', () => { isDragging = false; });

    // Pause on hover
    this.container.addEventListener('mouseenter', () => this.stopAutoplay());
    this.container.addEventListener('mouseleave', () => this.startAutoplay());

    // Pause when tab/window hidden
    document.addEventListener('visibilitychange', () => {
      document.hidden ? this.stopAutoplay() : this.startAutoplay();
    });
  }
}

/* ================================================================
   TESTIMONIALS CAROUSEL
   ================================================================ */
class TestimonialsCarousel {
  constructor(selector) {
    this.wrapper = document.querySelector(selector);
    if (!this.wrapper) return;

    this.track    = this.wrapper.querySelector('.testi-track');
    this.cards    = [...this.wrapper.querySelectorAll('.testimonial-card')];
    this.prevBtn  = this.wrapper.querySelector('.testi-prev');
    this.nextBtn  = this.wrapper.querySelector('.testi-next');
    this.dots     = [];

    this.current  = 0;
    this.init();
  }

  getVisibleCount() {
    const w = window.innerWidth;
    if (w < 640) return 1;
    if (w < 1024) return 2;
    return 3;
  }

  init() {
    this.visible = this.getVisibleCount();
    this.max     = Math.max(0, this.cards.length - this.visible);
    this.renderDots();
    this.updateSlide();
    this.bindEvents();
    this.startAutoplay();
  }

  renderDots() {
    const dotsContainer = this.wrapper.querySelector('.testi-dots');
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const totalDots = this.max + 1;
    this.dots = [];
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.className = `slider-dot testi-dot ${i === this.current ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to testimonial slide ${i + 1}`);
      dot.addEventListener('click', () => {
        this.current = i;
        this.updateSlide();
        this.resetAutoplay();
      });
      dotsContainer.appendChild(dot);
      this.dots.push(dot);
    }
  }

  updateSlide() {
    if (!this.track || !this.cards.length) return;
    this.visible = this.getVisibleCount();
    this.max     = Math.max(0, this.cards.length - this.visible);
    if (this.current > this.max) this.current = this.max;

    const cardWidth = this.cards[0].getBoundingClientRect().width;
    const gap = 24;
    const offset = this.current * (cardWidth + gap);
    this.track.style.transform = `translateX(-${offset}px)`;

    this.cards.forEach((card, i) => {
      card.style.opacity = (i >= this.current && i < this.current + this.visible) ? '1' : '0.4';
    });

    this.dots.forEach((dot, i) => dot.classList.toggle('active', i === this.current));
  }

  next() {
    if (this.current < this.max) {
      this.current++;
    } else {
      this.current = 0;
    }
    this.updateSlide();
  }

  prev() {
    if (this.current > 0) {
      this.current--;
    } else {
      this.current = this.max;
    }
    this.updateSlide();
  }

  bindEvents() {
    this.prevBtn?.addEventListener('click', () => { this.prev(); this.resetAutoplay(); });
    this.nextBtn?.addEventListener('click', () => { this.next(); this.resetAutoplay(); });

    let touchStart = 0;
    this.wrapper.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX; }, { passive: true });
    this.wrapper.addEventListener('touchend',   e => {
      const diff = touchStart - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? this.next() : this.prev();
    }, { passive: true });

    window.addEventListener('resize', () => {
      const oldMax = this.max;
      this.visible = this.getVisibleCount();
      this.max     = Math.max(0, this.cards.length - this.visible);
      if (this.current > this.max) this.current = this.max;
      if (oldMax !== this.max) {
        this.renderDots();
      }
      this.updateSlide();
    });
  }

  startAutoplay() {
    this.stopAutoplay();
    if (this.max <= 0) return;
    this.timer = setInterval(() => {
      this.next();
    }, 4000);
  }

  stopAutoplay()  { if (this.timer) clearInterval(this.timer); }
  resetAutoplay() { this.stopAutoplay(); this.startAutoplay(); }
}

/* ================================================================
   INIT
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  new HeroSlider('.hero-slider');
  new TestimonialsCarousel('.testimonials-carousel');
});
