/* ============================================================
   Aisle Five Advisory — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Nav: scroll shadow ─────────────────────────────────── */
  const navHeader = document.getElementById('nav-header');
  if (navHeader) {
    const onScroll = () => navHeader.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Nav: mobile toggle ─────────────────────────────────── */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu   = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    /* Close on link click */
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    /* Close on outside click */
    document.addEventListener('click', e => {
      if (navHeader && !navHeader.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Contact form ───────────────────────────────────────── */
  const contactForm  = document.getElementById('contact-form');
  const formSuccess  = document.getElementById('form-success');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      /* Basic required-field validation */
      let valid = true;
      contactForm.querySelectorAll('[required]').forEach(field => {
        field.classList.remove('error');
        if (!field.value.trim()) {
          field.classList.add('error');
          valid = false;
        }
      });
      /* Basic email format check */
      const emailField = contactForm.querySelector('input[type="email"]');
      if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        emailField.classList.add('error');
        valid = false;
      }
      if (!valid) return;

      /* Optimistic submission UI */
      const submitBtn = contactForm.querySelector('[type="submit"]');
      const original  = submitBtn.textContent;
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled    = true;

      /* Replace this setTimeout with a real fetch() call to your form backend */
      setTimeout(() => {
        formSuccess.style.display = 'block';
        contactForm.reset();
        submitBtn.textContent = original;
        submitBtn.disabled    = false;
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 900);
    });

    /* Clear error state on input */
    contactForm.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('input', () => field.classList.remove('error'));
    });
  }

});
