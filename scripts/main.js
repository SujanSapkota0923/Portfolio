document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('projects-grid');
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');
  const modalImage = document.getElementById('modal-image');
  const galleryPrev = document.getElementById('gallery-prev');
  const galleryNext = document.getElementById('gallery-next');
  const filtersContainer = document.getElementById('projects-filters');
  const contactForm = document.getElementById('contact-form');
  let currentImages = [];
  let currentImageIndex = 0;

  function renderProjects() {
    if (!window.PROJECTS) return;
    grid.innerHTML = '';
    window.PROJECTS.forEach((p, idx) => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.classList.add('animate-on-scroll');
      card.tabIndex = 0;
      card.setAttribute('role','button');
      card.innerHTML = `
        <img src="${p.images?.[0] || 'assets/images/project-placeholder.svg'}" alt="${p.title} screenshot" style="width:100%;border-radius:8px;margin-bottom:.6rem"/>
        <h3 class="project-card__title">${p.title}</h3>
        <div class="project-card__meta">${p.short}</div>
      `;
      card.addEventListener('click', () => openModal(p));
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') openModal(p); });
      grid.appendChild(card);
      // keep existing behavior for non-observer fallback
      requestAnimationFrame(() => {
        card.style.animationDelay = `${idx * 60}ms`;
      });
    });
    renderFilters();
    // ensure nav active state based on scroll
    updateActiveNav();
  }

  // smooth scroll for nav links that accounts for the fixed header (calculate header height dynamically)
  document.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      const headerEl = document.querySelector('.site-header');
      const headerOffset = (headerEl ? headerEl.offsetHeight : 72) + 14; // measured header height + breathing room
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = Math.max(0, elementPosition - headerOffset);
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      // focus the section after scrolling for accessibility; don't trigger default scroll
      try {
        target.setAttribute('tabindex', '-1');
        setTimeout(() => target.focus({preventScroll: true}), 520);
      } catch (err) {
        // noop
      }
    });
  });

  // update active nav item while scrolling
  function updateActiveNav(){
    const sections = ['home','projects','about','cv','contact'];
    const headerEl = document.querySelector('.site-header');
    const headerOffset = (headerEl ? headerEl.offsetHeight : 72) + 12;
    let current = sections[0];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const rectTop = el.getBoundingClientRect().top - headerOffset;
      if (rectTop <= 10) current = id;
    });
    document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
    const active = document.querySelector(`.nav-link[href='#${current}']`);
    if (active) active.classList.add('active');
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // back to top button show/hide and behavior
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (!backToTop) return;
    if (window.scrollY > 400) backToTop.classList.add('show'); else backToTop.classList.remove('show');
  }, { passive: true });
  if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // IntersectionObserver for reveal animations (preferred over staggered timeouts)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

  // Function to observe all animate-on-scroll elements (re-usable after dynamic content)
  function observeAnimations() {
    document.querySelectorAll('.animate-on-scroll:not(.animate-in)').forEach((el) => {
      try {
        observer.observe(el);
      } catch (e) {
        // fallback for older browsers
        el.classList.add('animate-in');
      }
    });
  }

  // observe initial elements
  observeAnimations();

  // dynamic hero subtitle rotation and years of experience
  (function heroDynamic(){
    const taglines = [
      'I build delightful web experiences and robust back-end systems.',
      'Performance-focused web platforms and reliable APIs.',
      'Accessible interfaces, delightful interactions, solid engineering.'
    ];
    const subtitle = document.getElementById('hero-subtitle');
    const yearsEl = document.getElementById('years-experience');
    const startYear = 2018;
    const now = new Date().getFullYear();
    const years = Math.max(1, now - startYear);
    if (yearsEl) yearsEl.textContent = `${years}+ years experience`;
    let idx = 0;
    if (subtitle) {
      subtitle.textContent = taglines[0];
      setInterval(() => {
        idx = (idx + 1) % taglines.length;
        subtitle.classList.add('fading');
        setTimeout(() => {
          subtitle.textContent = taglines[idx];
          subtitle.classList.remove('fading');
        }, 300);
      }, 4200);
    }
  })();

  function openModal(p) {
    modalTitle.textContent = p.title;
    modalBody.innerHTML = `
      <p class="muted">${p.long}</p>
      <p><strong>Tech:</strong> ${p.tech.join(', ')}</p>
      <p><a class="btn btn--outline" href="${p.live}" target="_blank" rel="noopener">Live</a> <a class="btn btn--ghost" href="${p.repo}" target="_blank" rel="noopener">Repo</a></p>
    `;
    // setup gallery
    currentImages = p.images || [];
    currentImageIndex = 0;
    if (currentImages.length) {
      modalImage.src = currentImages[0];
      modalImage.alt = `${p.title} screenshot`;
      galleryPrev.disabled = currentImages.length <= 1;
      galleryNext.disabled = currentImages.length <= 1;
      document.querySelector('.modal__gallery').style.display = 'flex';
    } else {
      document.querySelector('.modal__gallery').style.display = 'none';
    }
    modal.setAttribute('aria-hidden','false');
  }

  function closeModal() {
    modal.setAttribute('aria-hidden','true');
    modalTitle.textContent = '';
    modalBody.innerHTML = '';
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // gallery controls
  galleryPrev.addEventListener('click', () => {
    if (!currentImages.length) return;
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    modalImage.src = currentImages[currentImageIndex];
  });
  galleryNext.addEventListener('click', () => {
    if (!currentImages.length) return;
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    modalImage.src = currentImages[currentImageIndex];
  });

  // Filters
  function getAllTags() {
    const tags = new Set();
    (window.PROJECTS || []).forEach(p => (p.tags || []).forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }

  function renderFilters(){
    if (!filtersContainer) return;
    const tags = getAllTags();
    filtersContainer.innerHTML = '';
    const allBtn = document.createElement('button');
    allBtn.className = 'btn btn--ghost';
    allBtn.textContent = 'All';
    allBtn.addEventListener('click', () => showByTag(null));
    filtersContainer.appendChild(allBtn);
    tags.forEach(tag => {
      const btn = document.createElement('button');
      btn.className = 'btn btn--outline';
      btn.textContent = tag;
      btn.addEventListener('click', () => showByTag(tag));
      filtersContainer.appendChild(btn);
    });
  }

  function showByTag(tag){
    grid.innerHTML = '';
    (window.PROJECTS || []).filter(p => !tag || (p.tags || []).includes(tag)).forEach((p, idx) => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.classList.add('animate-on-scroll');
      card.tabIndex = 0;
      card.setAttribute('role','button');
      card.innerHTML = `
        <img src="${p.images?.[0] || 'assets/images/project-placeholder.svg'}" alt="${p.title} screenshot" style="width:100%;border-radius:8px;margin-bottom:.6rem"/>
        <h3 class="project-card__title">${p.title}</h3>
        <div class="project-card__meta">${p.short}</div>
      `;
      card.addEventListener('click', () => openModal(p));
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') openModal(p); });
      grid.appendChild(card);
      requestAnimationFrame(() => {
        card.style.animationDelay = `${idx * 60}ms`;
      });
    });
    // re-observe new cards
    requestAnimationFrame(() => observeAnimations());
  }

  // Contact form: construct mailto URL
  function sendMail(e){
    e.preventDefault();
    const f = contactForm.elements;
    const name = encodeURIComponent(f.name.value || '');
    const email = encodeURIComponent(f.email.value || '');
    const message = encodeURIComponent(f.message.value || '');
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}%0AEmail: ${email}%0A%0A${message}`);
    window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`;
  }

  if (contactForm) {
    contactForm.addEventListener('submit', sendMail);
    const submitBtn = document.getElementById('contact-submit');
    if (submitBtn) submitBtn.addEventListener('click', (e) => contactForm.requestSubmit());
  }

  // Theme toggle (persisted in localStorage)
  const themeToggle = document.getElementById('theme-toggle');
  const current = localStorage.getItem('theme') || 'dark';
  setTheme(current);
  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });
  function setTheme(name){
    document.documentElement.dataset.theme = name;
    localStorage.setItem('theme', name);
    if (themeToggle) {
      themeToggle.textContent = name === 'dark' ? '🌙' : '☀️';
      themeToggle.setAttribute('aria-pressed', name === 'light' ? 'true' : 'false');
      themeToggle.title = name === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    }
  }

  renderProjects();
  // ensure any newly-created animate-on-scroll elements (projects rendered dynamically) are observed
  observeAnimations();

  // animate About section background when it scrolls into view
  try {
    const aboutEl = document.querySelector('#about');
    if (aboutEl) {
      const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            aboutEl.classList.add('animate-bg');
            aboutObserver.unobserve(aboutEl);
          }
        });
      }, { threshold: 0.12 });
      aboutObserver.observe(aboutEl);
    }
  } catch (err) {
    // ignore if IntersectionObserver unsupported
  }
});
