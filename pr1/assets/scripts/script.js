const orders = [
    {
        orderId: 1,
        customer: {
            name: "Іван Петренко",
            email: "ivan@example.com"
        },
        items: [
            { name: "Ноутбук", price: 25000, quantity: 1 },
            { name: "Мишка", price: 500, quantity: 1 }
        ],
        total: 25500
    },
    {
        orderId: 2,
        customer: {
            name: "Марія Коваленко",
            email: "maria@example.com"
        },
        items: [
            { name: "Смартфон", price: 15000, quantity: 1 },
            { name: "Чохол", price: 300, quantity: 1 },
            { name: "Навушники", price: 800, quantity: 1 }
        ],
        total: 16100
    },
    {
        orderId: 3,
        customer: {
            name: "Іван Петренко",
            email: "ivan@example.com"
        },
        items: [
            { name: "Планшет", price: 12000, quantity: 1 },
            { name: "Клавіатура", price: 700, quantity: 1 }
        ],
        total: 12700
    },
    {
        orderId: 4,
        customer: {
            name: "Олексій Сидоренко",
            email: "oleksiy@example.com"
        },
        items: [
            { name: "Монітор", price: 8000, quantity: 2 }
        ],
        total: 16000
    },
    {
        orderId: 5,
        customer: {
            name: "Марія Коваленко",
            email: "maria@example.com"
        },
        items: [
            { name: "Ноутбук", price: 25000, quantity: 1 },
            { name: "Навушники", price: 800, quantity: 2 }
        ],
        total: 26600
    },
    {
        orderId: 6,
        customer: {
            name: "Аліна Блєднова",
            email: "alina@example.com"
        },
        items: [
            { name: "Планшет", price: 15000, quantity: 5 }
        ],
        total: 15000
    },
    {
        orderId: 7,
        customer: {
            name: "Юрій Семеген",
            email: "yurii@example.com"
        },
        items: [
            { name: "Телевізор", price: 35000, quantity: 1 }
        ],
        total: 35000
    }
];

const products = [
    { productId: 1, name: "Ноутбук", price: 25000 },
    { productId: 2, name: "Смартфон", price: 15000 },
    { productId: 3, name: "Планшет", price: 12000 },
    { productId: 4, name: "Монітор", price: 8000 },
    { productId: 5, name: "Мишка", price: 500 },
    { productId: 6, name: "Клавіатура", price: 700 },
    { productId: 7, name: "Навушники", price: 800 },
    { productId: 8, name: "Чохол", price: 300 }
];

const purchases = [
    { purchaseId: 1, productId: 1, quantity: 3 },
    { purchaseId: 2, productId: 2, quantity: 5 },
    { purchaseId: 3, productId: 1, quantity: 2 },
    { purchaseId: 4, productId: 3, quantity: 4 },
    { purchaseId: 5, productId: 4, quantity: 6 },
    { purchaseId: 6, productId: 5, quantity: 10 },
    { purchaseId: 7, productId: 2, quantity: 3 },
    { purchaseId: 8, productId: 6, quantity: 8 },
    { purchaseId: 9, productId: 7, quantity: 12 },
    { purchaseId: 10, productId: 8, quantity: 15 }
];

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('ordersData').textContent = 
        JSON.stringify(orders, null, 2);
    
    document.getElementById('productsData').textContent = 
        JSON.stringify({products, purchases}, null, 2);
    
    const customerSelect = document.getElementById('customerSelect');
    const uniqueCustomers = [...new Set(orders.map(order => order.customer.name))];
    
    uniqueCustomers.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer;
        option.textContent = customer;
        customerSelect.appendChild(option);
    });
    
    document.getElementById('calculateSpent').addEventListener('click', calculateCustomerSpent);
    document.getElementById('calculateSales').addEventListener('click', calculateSales);
    document.getElementById('showAllAnalysis').addEventListener('click', showAllAnalysis);
    
    setTimeout(() => {
        customerSelect.value = "Марія Коваленко";
        calculateCustomerSpent();
    }, 500);
});

function getTotalSpentByCustomer(orders, customerName) {
    const customerOrders = orders.filter(order => 
        order.customer.name.toLowerCase() === customerName.toLowerCase()
    );
    
    const totalSpent = customerOrders.reduce((sum, order) => {
        return sum + order.total;
    }, 0);
    
    return totalSpent;
}

function getTotalSales(products, purchases) {
    return purchases.reduce((salesData, purchase) => {
        const product = products.find(p => p.productId === purchase.productId);
        
        if (product) {
            const totalForPurchase = product.price * purchase.quantity;
            
            if (salesData[product.name]) {
                salesData[product.name] += totalForPurchase;
            } else {
                salesData[product.name] = totalForPurchase;
            }
        }
        
        return salesData;
    }, {});
}

function getTotalSalesExtended(products, purchases) {
    const salesData = purchases.reduce((acc, purchase) => {
        const product = products.find(p => p.productId === purchase.productId);
        
        if (product) {
            const totalForPurchase = product.price * purchase.quantity;
            
            if (!acc[product.name]) {
                acc[product.name] = {
                    totalRevenue: 0,
                    totalQuantity: 0,
                    unitPrice: product.price
                };
            }
            
            acc[product.name].totalRevenue += totalForPurchase;
            acc[product.name].totalQuantity += purchase.quantity;
        }
        
        return acc;
    }, {});
    
    return salesData;
}

function calculateCustomerSpent() {
    const customerSelect = document.getElementById('customerSelect');
    const customerName = customerSelect.value;
    
    if (!customerName) {
        alert("Будь ласка, оберіть клієнта");
        return;
    }
    
    const totalSpent = getTotalSpentByCustomer(orders, customerName);
    
    document.getElementById('customerName').textContent = customerName;
    document.getElementById('totalSpent').textContent = totalSpent.toLocaleString('uk-UA');
    document.getElementById('customerResult').style.display = 'block';
}

function calculateSales() {
    const salesData = getTotalSalesExtended(products, purchases);
    
    let salesHTML = '<div class="results-grid">';
    
    Object.entries(salesData).forEach(([productName, data]) => {
        salesHTML += `
            <div class="result-card">
                <h4>${productName}</h4>
                <div class="result-item">
                    <span>Ціна за одиницю:</span>
                    <span>${data.unitPrice.toLocaleString('uk-UA')} грн</span>
                </div>
                <div class="result-item">
                    <span>Кількість проданих:</span>
                    <span>${data.totalQuantity} од.</span>
                </div>
                <div class="result-item">
                    <span>Загальний дохід:</span>
                    <span class="product-revenue">${data.totalRevenue.toLocaleString('uk-UA')} грн</span>
                </div>
            </div>
        `;
    });
    
    salesHTML += '</div>';
    
    document.getElementById('salesDetails').innerHTML = salesHTML;
    document.getElementById('salesResult').style.display = 'block';
}

function showAllAnalysis() {
    const allCustomers = [...new Set(orders.map(order => order.customer.name))];
    let customerSpending = [];
    
    allCustomers.forEach(customerName => {
        const total = getTotalSpentByCustomer(orders, customerName);
        customerSpending.push({ name: customerName, total: total });
    });
    
    customerSpending.sort((a, b) => b.total - a.total);
    
    const salesData = getTotalSalesExtended(products, purchases);
    let productSales = [];
    
    Object.entries(salesData).forEach(([productName, data]) => {
        productSales.push({ 
            name: productName, 
            revenue: data.totalRevenue,
            quantity: data.totalQuantity 
        });
    });
    
    productSales.sort((a, b) => b.revenue - a.revenue);
    
    let analysisHTML = '';
    
    analysisHTML += `
        <div class="result-card">
            <h4><i class="fas fa-crown"></i> Топ клієнти за витратами</h4>
    `;
    
    customerSpending.forEach((customer, index) => {
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
        analysisHTML += `
            <div class="result-item">
                <span class="customer-name">${medal} ${customer.name}</span>
                <span class="customer-total">${customer.total.toLocaleString('uk-UA')} грн</span>
            </div>
        `;
    });
    
    analysisHTML += '</div>';
    
    analysisHTML += `
        <div class="result-card">
            <h4><i class="fas fa-star"></i> Топ товари за доходом</h4>
    `;
    
    productSales.slice(0, 5).forEach((product, index) => {
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
        analysisHTML += `
            <div class="result-item">
                <span class="product-name">${medal} ${product.name}</span>
                <span class="product-revenue">${product.revenue.toLocaleString('uk-UA')} грн</span>
            </div>
        `;
    });
    
    analysisHTML += '</div>';
    
    const totalRevenue = productSales.reduce((sum, product) => sum + product.revenue, 0);
    const totalCustomers = customerSpending.length;
    const totalProducts = productSales.length;
    const avgCustomerSpending = customerSpending.reduce((sum, customer) => sum + customer.total, 0) / totalCustomers;
    
    analysisHTML += `
        <div class="result-card">
            <h4><i class="fas fa-chart-pie"></i> Загальна статистика</h4>
            <div class="result-item">
                <span>Загальний дохід:</span>
                <span class="highlight">${totalRevenue.toLocaleString('uk-UA')} грн</span>
            </div>
            <div class="result-item">
                <span>Кількість клієнтів:</span>
                <span>${totalCustomers}</span>
            </div>
            <div class="result-item">
                <span>Кількість товарів:</span>
                <span>${totalProducts}</span>
            </div>
            <div class="result-item">
                <span>Середні витрати клієнта:</span>
                <span>${avgCustomerSpending.toLocaleString('uk-UA', {maximumFractionDigits: 0})} грн</span>
            </div>
        </div>
    `;
    
    document.getElementById('analysisResults').innerHTML = analysisHTML;
    document.getElementById('analysisResults').style.display = 'grid';
    
    document.getElementById('analysisResults').scrollIntoView({ behavior: 'smooth' });
}