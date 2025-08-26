document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  const fileInput = document.getElementById('file');
  const progress = document.getElementById('progress');
  const sendButton = document.getElementById('send');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const file = fileInput.files[0];
    if (!file) {
      alert('Пожалуйста, выберите файл');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = function (event) {
      if (event.lengthComputable) {
        const percent = event.loaded / event.total;
        progress.value = percent;
      }
    };

    xhr.onload = function () {
      if (xhr.status === 200) {
        alert('Файл успешно загружен!');
        progress.value = 1.0;
      } else {
        alert('Ошибка при загрузке файла');
      }
    };

    xhr.onerror = function () {
      alert('Произошла ошибка сети');
    };

    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
    xhr.send(formData);
  });
});