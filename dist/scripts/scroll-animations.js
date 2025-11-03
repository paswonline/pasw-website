/**
 * Scroll animations - deferred loading for performance
 * Initializes IntersectionObserver for data-animate-on-scroll elements
 * Elements remain visible - only transform is animated
 */
export function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate-on-scroll]');
  
  if (elements.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // If reduced motion, show final state immediately
  if (prefersReducedMotion) {
    elements.forEach(el => {
      el.classList.add('animate-slide-up');
    });
    return;
  }

  // Initialize observer - elements are already visible, just animate transform
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
    if (!el.classList.contains('animate-slide-up')) {
      observer.observe(el);
    }
  });
}

