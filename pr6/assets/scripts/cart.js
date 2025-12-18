let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartContent = document.getElementById('cartContent');
const cartCount = document.querySelector('.cart-count');
const checkoutButton = document.getElementById('checkoutButton');

function updateCartCount() {
    cartCount.textContent = cart.length;
}

function formatPrice(price) {
    return price.toLocaleString('uk-UA') + ' грн';
}

function updateQuantity(productId, newQuantity) {
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
        if (newQuantity < 1) {
            cart.splice(itemIndex, 1);
        } else {
            cart[itemIndex].quantity = newQuantity;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }
}

function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function renderCart() {
    if (cart.length === 0) {
        cartContent.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-cart"></i>
                        <h2>Ваш кошик порожній</h2>
                        <p>Поверніться до каталогу, щоб додати товари</p>
                        <a href="index.html" class="action-button back-button" style="margin-top: 20px;">
                            Перейти до каталогу
                        </a>
                    </div>
                `;
        checkoutButton.style.display = 'none';
        return;
    }

    let totalAmount = 0;
    let tableHTML = `
                <table class="cart-table">
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Товар</th>
                            <th>Ціна за од.</th>
                            <th>Кількість</th>
                            <th>Сума</th>
                            <th>Дії</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;

        tableHTML += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>
                            <div class="product-info">
                                <img src="./img/${item.image}" alt="${item.name}" class="product-image">
                                <div>
                                    <strong>${item.name}</strong>
                                </div>
                            </div>
                        </td>
                        <td>${formatPrice(item.price)}</td>
                        <td>
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                                <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                                       onchange="updateQuantity('${item.id}', parseInt(this.value))">
                                <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                            </div>
                        </td>
                        <td>${formatPrice(itemTotal)}</td>
                        <td>
                            <button class="remove-btn" onclick="removeItem('${item.id}')">
                                <i class="fas fa-trash"></i> Видалити
                            </button>
                        </td>
                    </tr>
                `;
    });

    tableHTML += `
                    </tbody>
                </table>
                
                <div class="cart-summary">
                    <h3>Разом до оплати:</h3>
                    <div class="total-amount">${formatPrice(totalAmount)}</div>
                    <p style="color: #666; margin-top: 10px;">Доставка розраховується на етапі оформлення</p>
                </div>
            `;

    cartContent.innerHTML = tableHTML;
    checkoutButton.style.display = 'block';
}

checkoutButton.addEventListener('click', function () {
    if (cart.length > 0) {
        alert('Дякуємо за замовлення! Сума до оплати: ' +
            formatPrice(cart.reduce((total, item) => total + (item.price * item.quantity), 0)));

        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
    renderCart();

    document.getElementById('cartIcon').addEventListener('click', function () {
        if (cart.length === 0) {
            alert('Кошик порожній');
        } else {
            renderCart();
        }
    });
});

window.updateQuantity = updateQuantity;
window.removeItem = removeItem;