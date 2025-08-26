document.addEventListener('DOMContentLoaded', function () {
  const cartProducts = document.querySelector('.cart__products');
  const cartTitle = document.querySelector('.cart__title');

  // Загружаем корзину из localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Отображаем товары из корзины
  function renderCart() {
    cartProducts.innerHTML = '';

    cart.forEach(item => {
      const productElement = document.createElement('div');
      productElement.classList.add('cart__product');
      productElement.dataset.id = item.id;

      productElement.innerHTML = `
        <img class="cart__product-image" src="${item.image}" alt="Товар ${item.id}">
        <div class="cart__product-count">${item.count}</div>
      `;

      // Добавляем возможность удаления
      productElement.addEventListener('click', function () {
        removeFromCart(item.id);
      });

      cartProducts.appendChild(productElement);
    });

    // Показываем/скрываем корзину
    cartTitle.style.display = cart.length > 0 ? 'block' : 'none';
  }

  // Сохранение в localStorage
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }

  // Добавление в корзину
  function addToCart(productId, image, count) {
    const existing = cart.find(item => item.id === productId);

    if (existing) {
      existing.count += count;
    } else {
      cart.push({ id: productId, image, count });
    }

    saveCart();
  }

  // Удаление из корзины
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
  }

  // Инициализация всех товаров
  document.querySelectorAll('.product').forEach(product => {
    const id = product.dataset.id;
    const image = product.querySelector('.product__image').src.trim();
    const valueElement = product.querySelector('.product__quantity-value');
    const addButton = product.querySelector('.product__add');

    // Кнопки изменения количества
    product.querySelector('.product__quantity-control_inc').addEventListener('click', () => {
      valueElement.textContent = parseInt(valueElement.textContent) + 1;
    });

    product.querySelector('.product__quantity-control_dec').addEventListener('click', () => {
      const currentValue = parseInt(valueElement.textContent);
      if (currentValue > 1) {
        valueElement.textContent = currentValue - 1;
      }
    });

    // Добавление в корзину
    addButton.addEventListener('click', () => {
      const count = parseInt(valueElement.textContent);

      // Эффект перемещения
      playAddToCartAnimation(product, cartProducts);

      // Добавляем в корзину
      addToCart(id, image, count);

      // Сброс количества
      valueElement.textContent = '1';
    });
  });

  // Анимация добавления товара (псевдо-перемещение)
  function playAddToCartAnimation(productElement, targetContainer) {
    const productImage = productElement.querySelector('.product__image');
    const rect = productImage.getBoundingClientRect();

    const ghost = document.createElement('img');
    ghost.src = productImage.src;
    ghost.classList.add('product-shadow');
    ghost.style.cssText = `
      position: fixed;
      left: ${rect.left}px;
      top: ${rect.top}px;
      width: ${rect.width}px;
      height: ${rect.height}px;
      z-index: 1000;
      pointer-events: none;
      transition: all 0.5s ease;
    `;

    document.body.appendChild(ghost);

    // Определяем позицию корзины
    const cartRect = targetContainer.getBoundingClientRect();
    const centerX = cartRect.left + cartRect.width / 2;
    const centerY = cartRect.top + cartRect.height / 2;

    // Перемещаем
    setTimeout(() => {
      ghost.style.left = `${centerX - rect.width / 2}px`;
      ghost.style.top = `${centerY - rect.height / 2}px`;
      ghost.style.width = '40px';
      ghost.style.height = '40px';
      ghost.style.opacity = '0';
    }, 10);

    // Удаляем
    setTimeout(() => {
      document.body.removeChild(ghost);
    }, 510);
  }

  // Инициализация
  renderCart();
});