// Sticky header shadow on scroll
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 16);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Mobile burger menu
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('is-open');
    navLinks.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        burger.classList.remove('is-open');
        navLinks.classList.remove('is-open');
        document.body.classList.remove('nav-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Mark active nav based on current path
(() => {
  const path = location.pathname.replace(/\/+$/, '') || '/';
  const current = path === '/' ? 'index' : path.split('/').pop().replace('.html', '');
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    if (a.dataset.page === current || (current === '/' && a.dataset.page === 'index')) {
      a.classList.add('active');
    }
  });
})();

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up, .fade-in').forEach(el => io.observe(el));

// Contact / feedback form (demo handler - would POST to backend in production)
document.querySelectorAll('[data-form]').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const success = form.querySelector('.form-success');
    const submit = form.querySelector('button[type="submit"]');
    if (submit) {
      submit.disabled = true;
      submit.textContent = 'Inviato ✓';
    }
    if (success) success.classList.add('show');
    setTimeout(() => {
      form.reset();
      if (submit) {
        submit.disabled = false;
        submit.textContent = submit.dataset.label || 'Invia';
      }
      if (success) success.classList.remove('show');
    }, 4000);
  });
});

// Toggle anonymous fields visibility on book feedback forms
document.querySelectorAll('[data-feedback-mode]').forEach(group => {
  const fields = document.querySelectorAll(group.dataset.feedbackMode);
  group.querySelectorAll('input[type="radio"]').forEach(r => {
    r.addEventListener('change', () => {
      const isPublic = r.value === 'public' && r.checked;
      fields.forEach(f => {
        f.style.display = isPublic ? '' : 'none';
        f.querySelectorAll('input').forEach(i => { i.required = isPublic; });
      });
    });
  });
});

// Book shop tabs filter
document.querySelectorAll('[data-shop-tabs]').forEach(tabs => {
  const buttons = tabs.querySelectorAll('.book-shop-tab');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('[data-book-section]').forEach(sec => {
        sec.style.display = (filter === 'all' || sec.dataset.bookSection === filter) ? '' : 'none';
      });
    });
  });
});
