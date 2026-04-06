// Scroll fade-in animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Before & After Slider
document.querySelectorAll('.ba-slider').forEach(slider => {
  const before = slider.querySelector('.ba-before');
  const handle = slider.querySelector('.ba-handle');
  let isDragging = false;

  function updateSlider(x) {
    const rect = slider.getBoundingClientRect();
    let pos = (x - rect.left) / rect.width;
    pos = Math.max(0.05, Math.min(0.95, pos));
    const pct = pos * 100;
    before.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    handle.style.left = pct + '%';
  }

  slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSlider(e.clientX);
  });
  window.addEventListener('mousemove', (e) => {
    if (isDragging) updateSlider(e.clientX);
  });
  window.addEventListener('mouseup', () => isDragging = false);

  slider.addEventListener('touchstart', (e) => {
    isDragging = true;
    updateSlider(e.touches[0].clientX);
  });
  window.addEventListener('touchmove', (e) => {
    if (isDragging) updateSlider(e.touches[0].clientX);
  });
  window.addEventListener('touchend', () => isDragging = false);
});
