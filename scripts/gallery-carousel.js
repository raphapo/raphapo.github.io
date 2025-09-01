// Shared gallery carousel script for project pages
function initGalleryCarousel(config) {
  const {
    images,
    imgSelector,
    captionSelector,
    leftBtnSelector,
    rightBtnSelector,
    toggleSelector,
    sectionSelector,
    arrowSelector
  } = config;
  let currentIndex = 0;
  const imgEl = document.querySelector(imgSelector);
  const captionEl = document.querySelector(captionSelector);
  const leftBtn = document.querySelector(leftBtnSelector);
  const rightBtn = document.querySelector(rightBtnSelector);
  function showImage(idx) {
    currentIndex = (idx + images.length) % images.length;
    imgEl.src = images[currentIndex].src;
    imgEl.alt = images[currentIndex].alt;
    if (captionEl) captionEl.textContent = images[currentIndex].alt;
  }
  if (leftBtn && rightBtn) {
    leftBtn.addEventListener('click', () => showImage(currentIndex - 1));
    rightBtn.addEventListener('click', () => showImage(currentIndex + 1));
  }
  // Expand/collapse logic
  if (toggleSelector && sectionSelector && arrowSelector) {
    const galleryToggle = document.querySelector(toggleSelector);
    const gallerySection = document.querySelector(sectionSelector);
    const galleryArrow = document.querySelector(arrowSelector);
    galleryToggle.addEventListener('click', function() {
      if (gallerySection.style.display === 'none') {
        gallerySection.style.display = 'block';
        galleryArrow.innerHTML = '\u25BC';
      } else {
        gallerySection.style.display = 'none';
        galleryArrow.innerHTML = '\u25B6';
      }
    });
  }
  // Show first image
  showImage(0);
}
