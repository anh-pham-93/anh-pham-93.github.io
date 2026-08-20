(() => {
  const stage = document.getElementById('parallax-stage');
  const header = document.getElementById('site-header');
  if (!stage || !header) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let ticking = false;

  function update() {
    ticking = false;
    const rect = stage.getBoundingClientRect();
    const distance = Math.max(1, stage.offsetHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, -rect.top / distance));
    stage.style.setProperty('--hero-progress', reducedMotion.matches ? '0' : progress.toFixed(4));
    header.classList.toggle('is-overlay', window.scrollY < Math.max(80, window.innerHeight * 0.72));
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  reducedMotion.addEventListener?.('change', requestUpdate);
  requestUpdate();
})();
