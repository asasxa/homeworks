// Дожидаемся загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('tasks__form');
  const input = document.getElementById('task__input');
  const taskList = document.getElementById('tasks__list');

  // Загружаем задачи из localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Отображаем сохранённые задачи
  tasks.forEach(taskText => {
    addTaskToDOM(taskText);
  });

  // Добавление задачи при отправке формы
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const text = input.value.trim();
    if (text) {
      addTask(text);
      input.value = ''; // Очищаем поле ввода
    }
  });

  // Делегирование: один обработчик для всех кнопок удаления
  taskList.addEventListener('click', function (event) {
    if (event.target.classList.contains('task__remove')) {
      event.preventDefault();
      const taskElement = event.target.closest('.task');
      const taskText = taskElement.querySelector('.task__title').textContent.trim();

      // Удаляем из DOM
      taskElement.remove();

      // Удаляем из localStorage
      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const updatedTasks = storedTasks.filter(t => t !== taskText);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  });

  // Функция добавления задачи
  function addTask(text) {
    // Добавляем в DOM
    addTaskToDOM(text);

    // Сохраняем в localStorage
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (!storedTasks.includes(text)) { // Защита от дубликатов (по желанию)
      storedTasks.push(text);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
  }

  // Функция для добавления задачи в DOM
  function addTaskToDOM(text) {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';

    taskElement.innerHTML = `
      <div class="task__title">${text}</div>
      <a href="#" class="task__remove">&times;</a>
    `;

    taskList.appendChild(taskElement);
  }
});