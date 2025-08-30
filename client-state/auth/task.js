const signin = document.getElementById('signin');
const welcome = document.getElementById('welcome');
const userIdSpan = document.getElementById('user_id');
const form = document.getElementById('signin__form');
const loginInput = form.querySelector('input[name="login"]');
const passwordInput = form.querySelector('input[name="password"]');
const submitBtn = document.getElementById('signin__btn');

function checkAuthStatus() {
    const savedId = localStorage.getItem('user_id');
    if (savedId) {
        showWelcome(savedId);
    } else {
        showSignin();
    }
}

function showSignin() {
    signin.classList.add('signin_active');
    welcome.classList.remove('welcome_active');
}

function showWelcome(id) {
    userIdSpan.textContent = id;
    signin.classList.remove('signin_active');
    welcome.classList.add('welcome_active');
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    fetch('https://students.netoservices.ru/nestjs-backend/auth', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        loginInput.value = '';
        passwordInput.value = '';

        if (data.success) {
            const userId = data.user_id;
            localStorage.setItem('user_id', userId);
            showWelcome(userId);
        } else {
            alert('Неверный логин или пароль');
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при подключении к серверу');
    });
});

const logoutBtn = document.createElement('button');
logoutBtn.textContent = 'Выйти';
logoutBtn.classList.add('btn');
logoutBtn.style.marginTop = '10px';

welcome.appendChild(logoutBtn);

logoutBtn.addEventListener('click', function () {
    localStorage.removeItem('user_id');
    showSignin();
});

checkAuthStatus();