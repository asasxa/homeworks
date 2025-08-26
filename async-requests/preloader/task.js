document.addEventListener('DOMContentLoaded', function () {
  const loader = document.getElementById('loader');
  const itemsContainer = document.getElementById('items');

  const API_URL = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';

  const cachedData = localStorage.getItem('currencyData');
  if (cachedData) {
    const data = JSON.parse(cachedData);
    renderCurrency(data);
    fetchCurrencyData();
  } else {
    fetchCurrencyData();
  }

  function fetchCurrencyData() {
    loader.classList.add('loader_active');

    itemsContainer.innerHTML = '';

    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Сеть ответила с ошибкой: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        localStorage.setItem('currencyData', JSON.stringify(data));

        renderCurrency(data);

        loader.classList.remove('loader_active');
      })
      .catch(error => {
        console.error('Ошибка при загрузке курса валют:', error);
        loader.classList.remove('loader_active');
        itemsContainer.innerHTML = '<div>Ошибка загрузки данных</div>';
      });
  }

  function renderCurrency(data) {
    const valute = data.response.Valute;

    itemsContainer.innerHTML = '';

    ['USD', 'EUR'].forEach(code => {
      if (valute[code]) {
        const item = document.createElement('div');
        item.className = 'item';

        item.innerHTML = `
          <div class="item__code">${valute[code].CharCode}</div>
          <div class="item__value">${valute[code].Value.toFixed(2)}</div>
          <div class="item__currency">руб.</div>
        `;

        itemsContainer.appendChild(item);
      }
    });
  }
});