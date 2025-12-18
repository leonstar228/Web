let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentProductId = null;

const cartIcon = document.getElementById('cartIcon');
const cartCount = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const quantityModal = document.getElementById('quantityModal');
const confirmModal = document.getElementById('confirmModal');
const emptyCartModal = document.getElementById('emptyCartModal');
const quantityInput = document.getElementById('quantityInput');
const confirmAddButton = document.getElementById('confirmAdd');
const goToCartButton = document.getElementById('goToCart');
const continueShoppingButton = document.getElementById('continueShopping');
const closeModalButtons = document.querySelectorAll('.close-modal');

function updateCartCount() {
    const uniqueItems = cart.length;
    cartCount.textContent = uniqueItems;
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showModal(modal) {
    modal.style.display = 'block';
}

function hideModal(modal) {
    modal.style.display = 'none';
}

function getProductData(id) {
    const productElement = document.querySelector(`.box_good[data-id="${id}"]`);
    return {
        id: id,
        name: productElement.dataset.name,
        price: parseInt(productElement.dataset.price),
        image: productElement.querySelector('img').src.split('/').pop()
    };
}

function addToCart(productId, quantity) {
    const productData = getProductData(productId);
    
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({
            ...productData,
            quantity: quantity
        });
    }
    
    updateCartCount();
}

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        currentProductId = this.dataset.id;
        quantityInput.value = 1;
        showModal(quantityModal);
    });
});

confirmAddButton.addEventListener('click', function() {
    const quantity = parseInt(quantityInput.value);
    
    if (quantity > 0 && currentProductId) {
        addToCart(currentProductId, quantity);
        hideModal(quantityModal);
        showModal(confirmModal);
    }
});

goToCartButton.addEventListener('click', function() {
    window.location.href = 'cart.html';
});

continueShoppingButton.addEventListener('click', function() {
    hideModal(confirmModal);
});

cartIcon.addEventListener('click', function() {
    if (cart.length === 0) {
        showModal(emptyCartModal);
    } else {
        window.location.href = 'cart.html';
    }
});

closeModalButtons.forEach(button => {
    button.addEventListener('click', function() {
        const modal = this.closest('.modal');
        hideModal(modal);
    });
});

window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        hideModal(event.target);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});