document.addEventListener('DOMContentLoaded', function () {
  const reveals = document.querySelectorAll('.reveal');

  function checkVisibility() {
    reveals.forEach(element => {
      const { top, bottom } = element.getBoundingClientRect();
      const isVisible = top < window.innerHeight && bottom >= 0;

      if (isVisible) {
        element.classList.add('reveal_active');
      }
    });
  }

  checkVisibility();

  window.addEventListener('scroll', checkVisibility);
  window.addEventListener('resize', checkVisibility);
});