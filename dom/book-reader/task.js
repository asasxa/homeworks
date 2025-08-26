document.addEventListener('DOMContentLoaded', function () {
  const book = document.getElementById('book');

  const fontSizeControls = document.querySelectorAll('.book__control_font-size .font-size');
  fontSizeControls.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      fontSizeControls.forEach(el => el.classList.remove('font-size_active'));

      this.classList.add('font-size_active');

      book.classList.remove('book_fs-small', 'book_fs-big');

      const size = this.dataset.size;

      if (size === 'small') {
        book.classList.add('book_fs-small');
      } else if (size === 'big') {
        book.classList.add('book_fs-big');
      }
    });
  });

  const textColorControls = document.querySelectorAll('.book__control_color .color[data-text-color]');
  textColorControls.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      textColorControls.forEach(el => el.classList.remove('color_active'));

      this.classList.add('color_active');

      book.classList.remove('book_color-black', 'book_color-gray', 'book_color-whitesmoke');

      const color = this.dataset.textColor;

      if (color) {
        book.classList.add(`book_color-${color}`);
      }
    });
  });

  const bgColorControls = document.querySelectorAll('.book__control_background .color[data-bg-color]');
  bgColorControls.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      bgColorControls.forEach(el => el.classList.remove('color_active'));

      this.classList.add('color_active');

      book.classList.remove('book_bg-black', 'book_bg-gray', 'book_bg-white');

      const bgColor = this.dataset.bgColor;

      if (bgColor) {
        book.classList.add(`book_bg-${bgColor}`);
      }
    });
  });
});