// Получаем элементы
const cookie = document.getElementById('cookie');
const counter = document.getElementById('clicker__counter');

// Для расчёта скорости
let lastClickTime = null;

// Обработчик клика
cookie.onclick = function () {
    // 1. Увеличиваем счётчик
    let currentCount = parseInt(counter.textContent, 10);
    counter.textContent = currentCount + 1;

    // 2. Чередуем размер: большой → маленький → большой
    if (cookie.width === 200) {
        // Увеличиваем при клике
        cookie.width = 250;
        cookie.height = 250;
    } else {
        // Возвращаем к исходному
        cookie.width = 200;
        cookie.height = 200;
    }

    // 3. Расчёт скорости клика (повышенный уровень)
    const now = new Date();

    if (lastClickTime) {
        const deltaTimeSec = (now - lastClickTime) / 1000; // разница в секундах
        const speed = (1 / deltaTimeSec).toFixed(2); // кликов в секунду

        // Находим или создаём элемент для отображения скорости
        let speedElement = document.getElementById('clicker__speed');
        if (!speedElement) {
            speedElement = document.createElement('div');
            speedElement.id = 'clicker__speed';
            speedElement.style.marginTop = '10px';
            speedElement.style.fontWeight = 'bold';
            speedElement.style.color = '#2c5aa0';
            document.querySelector('.clicker').appendChild(speedElement);
        }

        speedElement.textContent = `Скорость клика: ${speed} кликов/сек`;
    }

    // Запоминаем время последнего клика
    lastClickTime = now;
};