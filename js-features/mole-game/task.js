// Функция возвращает элемент лунки по индексу
function getHole(index) {
    return document.getElementById(`hole${index}`);
}

// Получаем элементы счётчиков
const deadCounter = document.getElementById('dead');
const lostCounter = document.getElementById('lost');

// Счётчики
let killed = 0;
let missed = 0;

// Обновляем отображение счётчиков
function updateCounters() {
    deadCounter.textContent = killed;
    lostCounter.textContent = missed;
}

// Перебираем все лунки от 1 до 9 и добавляем обработчик клика
for (let i = 1; i <= 9; i++) {
    const hole = getHole(i);

    hole.onclick = function () {
        if (hole.classList.contains('hole_has-mole')) {
            // Попали по кроту
            killed++;
        } else {
            // Промахнулись
            missed++;
        }

        // Обновляем счётчики на экране
        updateCounters();

        // Проверяем условия завершения игры
        if (killed >= 10) {
            alert('Победа! Вы убили 10 кротов!');
            resetGame();
        }

        if (missed >= 5) {
            alert('Проигрыш! Вы допустили 5 промахов!');
            resetGame();
        }
    };
}

// Сброс игры
function resetGame() {
    killed = 0;
    missed = 0;
    updateCounters();
}