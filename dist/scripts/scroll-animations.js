/**
 * Scroll animations - deferred loading for performance
 * Initializes IntersectionObserver for data-animate-on-scroll elements
 */
export function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate-on-scroll]');
  
  if (elements.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // If reduced motion or animations CSS not loaded yet, show elements immediately
  if (prefersReducedMotion) {
    elements.forEach(el => {
      el.classList.add('animate-slide-up');
    });
    return;
  }

  // Wait a bit for animations.css to load and apply the hidden state
  // Then initialize observer
  const initObserver = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => {
      // Ensure element starts hidden if animations.css loaded
      if (!el.classList.contains('animate-slide-up')) {
        observer.observe(el);
      }
    });
  };

  // Small delay to ensure CSS is applied
  setTimeout(initObserver, 100);
}

