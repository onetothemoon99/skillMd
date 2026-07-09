// ALUXE — shared interactions (nav, reveal, filters, lightbox, counters, testimonials, forms)

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky nav shrink + mobile menu ---------- */
  const nav = document.querySelector('.nav-shell');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 12);
    const btt = document.querySelector('.back-to-top');
    if (btt) btt.classList.toggle('show', window.scrollY > 480);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
      menuToggle.classList.toggle('is-open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  /* ---------- Back to top ---------- */
  const btt = document.querySelector('.back-to-top');
  if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- Count-up stats ---------- */
  const counters = document.querySelectorAll('[data-count-to]');
  if ('IntersectionObserver' in window && counters.length) {
    const ioCount = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.getAttribute('data-count-to'));
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1400;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target % 1 === 0 ? Math.floor(eased * target) : (eased * target).toFixed(1);
          el.textContent = val + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        ioCount.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(el => ioCount.observe(el));
  }

  /* ---------- Filter chips (products / gallery) ---------- */
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const targetSelector = group.getAttribute('data-filter-group');
    const items = document.querySelectorAll(targetSelector);
    group.querySelectorAll('[data-filter]').forEach(chip => {
      chip.addEventListener('click', () => {
        group.querySelectorAll('[data-filter]').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const val = chip.getAttribute('data-filter');
        items.forEach(item => {
          const cats = (item.getAttribute('data-category') || '').split(',');
          const show = val === 'all' || cats.includes(val);
          item.style.display = show ? '' : 'none';
          if (show) {
            item.classList.remove('reveal');
            requestAnimationFrame(() => item.classList.add('in-view'));
          }
        });
      });
    });
  });

  /* ---------- Lightbox ---------- */
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('img');
    const lbCaption = lightbox.querySelector('.lightbox-caption');
    let group = [];
    let idx = 0;

    const show = (i) => {
      idx = (i + group.length) % group.length;
      const item = group[idx];
      lbImg.src = item.src;
      lbImg.alt = item.caption || '';
      if (lbCaption) lbCaption.textContent = item.caption || '';
    };

    document.querySelectorAll('[data-lightbox-src]').forEach((trigger, i, all) => {
      trigger.style.cursor = 'zoom-in';
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const groupName = trigger.getAttribute('data-lightbox-group') || 'default';
        group = Array.from(document.querySelectorAll(`[data-lightbox-group="${groupName}"], [data-lightbox-src]:not([data-lightbox-group])`))
          .filter(el => (el.getAttribute('data-lightbox-group') || 'default') === groupName)
          .map(el => ({ src: el.getAttribute('data-lightbox-src'), caption: el.getAttribute('data-lightbox-caption') || '' }));
        idx = group.findIndex(g => g.src === trigger.getAttribute('data-lightbox-src'));
        if (idx < 0) idx = 0;
        show(idx);
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    lightbox.querySelector('.lightbox-close')?.addEventListener('click', () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
    lightbox.querySelector('.lightbox-prev')?.addEventListener('click', () => show(idx - 1));
    lightbox.querySelector('.lightbox-next')?.addEventListener('click', () => show(idx + 1));
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') { lightbox.classList.remove('open'); document.body.style.overflow = ''; }
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  /* ---------- Product detail: thumbnail swap ---------- */
  document.querySelectorAll('[data-thumb-target]').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const targetId = thumb.getAttribute('data-thumb-target');
      const mainImg = document.getElementById(targetId);
      const newSrc = thumb.getAttribute('data-thumb-src');
      if (mainImg && newSrc) {
        mainImg.style.opacity = 0;
        setTimeout(() => {
          mainImg.src = newSrc;
          mainImg.style.opacity = 1;
          const lbTrigger = mainImg.closest('[data-lightbox-src]');
          if (lbTrigger) lbTrigger.setAttribute('data-lightbox-src', newSrc);
        }, 150);
      }
      document.querySelectorAll('[data-thumb-target]').forEach(t => t.classList.remove('thumb-active'));
      thumb.classList.add('thumb-active');
    });
  });

  /* ---------- Testimonial slider ---------- */
  document.querySelectorAll('[data-testi-slider]').forEach(slider => {
    const track = slider.querySelector('.testi-track');
    const slides = slider.querySelectorAll('.testi-slide');
    const dotsWrap = slider.querySelector('.testi-dots');
    let current = 0;
    if (!track || !slides.length) return;

    if (dotsWrap) {
      slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      });
    }
    const dots = dotsWrap ? dotsWrap.querySelectorAll('.testi-dot') : [];

    function goTo(i) {
      current = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle('active', di === current));
    }
    slider.querySelector('[data-testi-prev]')?.addEventListener('click', () => goTo(current - 1));
    slider.querySelector('[data-testi-next]')?.addEventListener('click', () => goTo(current + 1));

    let autoplay = setInterval(() => goTo(current + 1), 6000);
    slider.addEventListener('mouseenter', () => clearInterval(autoplay));
    slider.addEventListener('mouseleave', () => { autoplay = setInterval(() => goTo(current + 1), 6000); });
  });

  /* ---------- Contact form (no backend — inline success state) ---------- */
  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const successBox = document.querySelector('[data-form-success]');
      if (btn) {
        const original = btn.textContent;
        btn.textContent = 'กำลังส่งข้อมูล...';
        btn.disabled = true;
        setTimeout(() => {
          contactForm.reset();
          contactForm.classList.add('hidden');
          if (successBox) successBox.classList.remove('hidden');
          btn.textContent = original;
          btn.disabled = false;
        }, 900);
      }
    });
  }

});
