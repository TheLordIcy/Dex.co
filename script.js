/* ============================================================
   DEX.CO — script.js
   ============================================================ */

(function () {
  'use strict';

  /* ---------- THEME TOGGLE ---------- */
  const html        = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const toggleIcon  = document.getElementById('toggleIcon');

  const DARK_ICON  = '☀';
  const LIGHT_ICON = '☾';

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    toggleIcon.textContent = theme === 'dark' ? DARK_ICON : LIGHT_ICON;
    localStorage.setItem('dexco-theme', theme);
  }

  // Load saved preference or default to dark
  const savedTheme = localStorage.getItem('dexco-theme') || 'dark';
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', function () {
    const current = html.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* ---------- HAMBURGER MENU ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    let scrollPos = window.scrollY + 100;

    sections.forEach(function (section) {
      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        navItems.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + section.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ---------- NAVBAR SCROLL SHADOW ---------- */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 30) {
      navbar.style.boxShadow = '0 2px 24px rgba(0,0,0,0.25)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  }, { passive: true });

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll(
    '.about-grid, .service-card, .team-card, .contact-grid, .about-stats, .stat, .section-label, .section-heading, .contact-detail'
  );

  revealEls.forEach(function (el) {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
          // Stagger cards in grids
          const delay = entry.target.closest('.services-grid, .team-grid')
            ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 80
            : 0;

          setTimeout(function () {
            entry.target.classList.add('visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach(function (el) {
    observer.observe(el);
  });

  /* ---------- CONTACT FORM ---------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = contactForm.querySelector('.btn-primary');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    // Simulate async submission
    setTimeout(function () {
      contactForm.reset();
      btn.textContent = 'Send Message →';
      btn.disabled = false;
      btn.style.opacity = '';
      formSuccess.classList.add('show');

      setTimeout(function () {
        formSuccess.classList.remove('show');
      }, 5000);
    }, 1200);
  });

  /* ---------- SMOOTH SCROLL POLYFILL FOR OLDER SAFARI ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();