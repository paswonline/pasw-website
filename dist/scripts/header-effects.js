/**
 * Header scroll effects - moved to module for deferred loading
 * Handles header hide/show on scroll
 */
export function initHeaderEffects(opts = { enableParticles: true }) {
  let lastScrollY = 0;
  let ticking = false;

  const header = document.querySelector('[data-header]');
  
  if (!header) return;

  function updateHeader() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu toggle (keep this as it's critical for functionality)
  const menuToggle = document.querySelector('[data-mobile-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      mobileMenu.classList.toggle('hidden');
      
      menuToggle.setAttribute(
        'aria-label',
        isExpanded ? 'Otwórz menu' : 'Zamknij menu'
      );
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.add('hidden');
        menuToggle.setAttribute('aria-label', 'Otwórz menu');
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (
        !menuToggle.contains(target) &&
        !mobileMenu.contains(target) &&
        menuToggle.getAttribute('aria-expanded') === 'true'
      ) {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.add('hidden');
        menuToggle.setAttribute('aria-label', 'Otwórz menu');
      }
    });
  }

  // Particles/orbs initialization would go here if needed
  // Currently handled by CSS only
  if (opts.enableParticles) {
    // Placeholder for future JS-based particle effects
  }
}

