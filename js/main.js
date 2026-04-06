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
  let currentSlide = 0;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function goToSlide(index) {
    currentSlide = index;
    slides[index].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    updateDots();
  }

  function updateDots() {
    dotsContainer.querySelectorAll('.gallery-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  // Update dots on scroll
  carousel.addEventListener('scroll', () => {
    const scrollLeft = carousel.scrollLeft;
    const slideWidth = carousel.offsetWidth;
    const newSlide = Math.round(scrollLeft / slideWidth);
    if (newSlide !== currentSlide) {
      currentSlide = newSlide;
      updateDots();
    }
  });

  // Arrow navigation
  window.scrollGallery = function(dir) {
    const newSlide = Math.max(0, Math.min(slides.length - 1, currentSlide + dir));
    goToSlide(newSlide);
  };
}
