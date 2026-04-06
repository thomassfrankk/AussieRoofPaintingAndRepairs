// Scroll fade-in animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Gallery Carousel
const carousel = document.getElementById('galleryCarousel');
const dotsContainer = document.getElementById('galleryDots');

if (carousel && dotsContainer) {
  const slides = carousel.querySelectorAll('.gallery-slide');
  const totalSlides = slides.length;
  let currentSlide = 0;

  function isMobile() {
    return window.innerWidth <= 900;
  }

  function getStep() {
    return isMobile() ? 1 : 2;
  }

  function getDotCount() {
    return isMobile() ? totalSlides : Math.ceil(totalSlides / 2);
  }

  function buildDots() {
    dotsContainer.innerHTML = '';
    const count = getDotCount();
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('button');
      dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', () => {
        const target = isMobile() ? i : i * 2;
        goToSlide(target);
      });
      dotsContainer.appendChild(dot);
    }
  }

  function goToSlide(index) {
    currentSlide = Math.max(0, Math.min(totalSlides - 1, index));
    slides[currentSlide].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    updateDots();
  }

  function updateDots() {
    const dotIndex = isMobile() ? currentSlide : Math.floor(currentSlide / 2);
    dotsContainer.querySelectorAll('.gallery-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === dotIndex);
    });
  }

  carousel.addEventListener('scroll', () => {
    const slideWidth = slides[0].offsetWidth;
    const newSlide = Math.round(carousel.scrollLeft / slideWidth);
    if (newSlide !== currentSlide) {
      currentSlide = newSlide;
      updateDots();
    }
  });

  window.scrollGallery = function(dir) {
    const step = getStep();
    const newSlide = Math.max(0, Math.min(totalSlides - 1, currentSlide + (dir * step)));
    goToSlide(newSlide);
  };

  buildDots();
  window.addEventListener('resize', buildDots);
}
