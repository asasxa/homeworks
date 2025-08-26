document.addEventListener('DOMContentLoaded', function () {
  const rotators = document.querySelectorAll('.rotator');

  rotators.forEach(rotator => {
    const cases = Array.from(rotator.querySelectorAll('.rotator__case'));
    let currentIndex = 0;

    function rotate() {
      cases[currentIndex].classList.remove('rotator__case_active');
      cases[currentIndex].style.color = '';

      currentIndex = (currentIndex + 1) % cases.length;

      const nextCase = cases[currentIndex];

      const color = nextCase.dataset.color;
      if (color) {
        nextCase.style.color = color;
      }

      nextCase.classList.add('rotator__case_active');

      const speed = nextCase.dataset.speed ? parseInt(nextCase.dataset.speed) : 1000;

      setTimeout(rotate, speed);
    }

    rotate();
  });
});