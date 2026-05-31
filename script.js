/* Red Leaf Roofing — JavaScript */
document.addEventListener('DOMContentLoaded', () => {
  // Header scroll
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.getElementById('navLinks');
  mobileMenu?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
  document.querySelectorAll('.nav-link').forEach(l =>
    l.addEventListener('click', () => navLinks.classList.remove('active'))
  );

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // Scroll reveal
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el =>
    revealObserver.observe(el)
  );

  // Stagger testimonials
  document.querySelectorAll('.testimonial-card').forEach((c, i) => {
    c.style.transitionDelay = `${i * 0.1}s`;
  });
  document.querySelectorAll('.service-card').forEach((c, i) => {
    c.style.transitionDelay = `${i * 0.12}s`;
  });

  // Newsletter
  const form = document.getElementById('newsletterForm');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('emailInput');
    const btn = form.querySelector('button');
    if (input.value) {
      const orig = btn.textContent;
      btn.textContent = '✓ Subscribed!';
      btn.style.background = '#10b981';
      input.value = '';
      setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 3000);
    }
  });

  // Active nav highlight
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const y = window.scrollY + 120;
    sections.forEach(s => {
      const top = s.offsetTop, h = s.offsetHeight, id = s.id;
      document.querySelectorAll('.nav-link').forEach(l => {
        if (l.getAttribute('href') === `#${id}`) {
          l.style.color = (y >= top && y < top + h) ? 'var(--red-light)' : '';
        }
      });
    });
  }, { passive: true });
});
