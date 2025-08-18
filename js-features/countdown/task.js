// Получаем элементы из DOM
const timerElement = document.getElementById('timer');
const statusElement = document.getElementById('status');

// Читаем начальное значение таймера (в секундах)
let totalSeconds = parseInt(timerElement.textContent, 10);

// Функция для форматирования времени в формат hh:mm:ss
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
}

// Обновляем отображение таймера
function updateDisplay() {
    timerElement.textContent = formatTime(totalSeconds);
}

// Запускаем таймер
const intervalId = setInterval(() => {
    totalSeconds--;

    // Обновляем отображение
    updateDisplay();

    // Если время закончилось
    if (totalSeconds < 0) {
        clearInterval(intervalId);
        alert('Вы победили в конкурсе!');

        // Повышенный уровень #2: скачивание файла
        const link = document.createElement('a');
        link.href = 'https://github.com/netology-code/js-diplom/archive/refs/heads/master.zip'; // Пример ZIP-файла
        link.download = 'prize.zip'; // Имя файла при скачивании
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}, 1000);

// Инициализация отображения
updateDisplay();