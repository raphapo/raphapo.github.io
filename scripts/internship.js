// internship.js - Add scroll-based animation and effects for internship page

document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.internship-section');
  const fadeInOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    sections.forEach(section => {
      const boxTop = section.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        section.classList.add('show');
      } else {
        section.classList.remove('show');
      }
    });
  };
  window.addEventListener('scroll', fadeInOnScroll);
  fadeInOnScroll();
});
