/**
 * Animated counters - deferred loading for performance
 * Respects prefers-reduced-motion and skips on mobile
 */
export function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;

  if (prefersReducedMotion || isMobile) {
    // Skip animation, just show the final value
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = counter.getAttribute('data-target') || '';
          
          // Check if target is a number
          const numericMatch = target.match(/\d+/);
          if (numericMatch) {
            const targetNumber = parseInt(numericMatch[0]);
            const suffix = target.replace(/\d+/, '');
            
            animateCounter(counter, targetNumber, suffix);
            observer.unobserve(counter);
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(element, target, suffix) {
  const duration = 2000; // 2 seconds
  const frameDuration = 1000 / 60; // 60 FPS
  const totalFrames = Math.round(duration / frameDuration);
  let frame = 0;

  const counter = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const current = Math.round(target * easeOutQuad(progress));
    
    element.textContent = current + suffix;

    if (frame === totalFrames) {
      clearInterval(counter);
      element.textContent = target + suffix;
    }
  }, frameDuration);
}

function easeOutQuad(t) {
  return t * (2 - t);
}

