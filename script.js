const products = [
    { 
        id: 1,
        name: "ເນື້ອຝອຍ 1Kg",
        en: "Shredded Coconut Meat",
        price: 80000,
        image: "1.png.jpeg"
    },
    { 
        id: 2,
        name: "ນໍ້າໝາກພ້າວ 1L",
        en: "Coconut Water 1L",
        price: 50000,
        image: "2.png.jpeg"
    },
    { 
        id: 3,
        name: "ເນື້ອເສັ້ນ 1Kg",
        en: "Sliced Coconut Meat Strips",
        price: 80000,
        image: "3.png.jpeg"
    },
    { 
        id: 4,
        name: "ນໍ້າໝາກພ້າວຈອກ 250ML",
        en: "Coconut Water Cup 250ML",
        price: 25000,
        image: "4.png.jpeg"
    },
    { 
        id: 5,
        name: "ວຸ້ນໝາກພ້າວ ",
        en: "Coconut Jelly",
        price: 25000,
        image: "5.png.jpeg"
    },
    { 
        id: 6,
        name: "ນໍ້າໝາກພ້າວອັດກະປ໋ອງ 370ML",
        en: "Canned Coconut Water 370ML",
        price: 28000,
        image: "6.png.jpeg"
    },
    { 
        id: 7,
        name: "ນໍ້າໝາກພ້າວອັດກະປ໋ອງ 250ML",
        en: "Canned Coconut Water 250ML",
        price: 19000,
        image: "7.png.jpeg"
    },
    { 
        id: 8,
        name: "ນ້ຳໝາກພ້າວຕຸກ 250ML",
        en: "Bottled Coconut Water",
        price: 25000,
        image: "8.png.jpeg"
    },
    { 
        id: 9,
        name: "ເນື້ອລິ້ວ 1Kg",
        en: "Ribbon Cut Coconut Meat",
        price: 80000,
        image: "9.png.jpeg"
    },
    { 
        id: 10,
        name: "ເນື້ອເບົ້າ 1kg",
        en: "Half-Shell Coconut Meat",
        price: 80000,
        image: "10.png.jpeg"
    },
    { 
        id: 11,
        name: "ເຊັດລວມເນື້ອໝາກພ້າວ 1Kg",
        en: "Mixed Coconut Meat Set",
        price: 220000,
        image: "11.png.jpeg"
    },
    { 
        id: 12,
        name: "ພຸດດິ້ງໝາກພ້າວອ່ອນ",
        en: "Young coconut pudding",
        price: 80000,
        image: "12.png.jpeg"
    }
];

let cart = [];
let discountPercent = 0;

function displayProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    container.innerHTML = '';
    products.forEach(product => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>
                    ${product.name}
                    <span>${product.en}</span>
                </h3>
                <p>${product.price.toLocaleString()} ກີບ</p>
                <button class="btn-add" onclick="addToCart(${product.id})">ເພີ່ມລົງກະຕ່າ</button>
            </div>
        `;
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const exist = cart.find(item => item.id === id);
    
    if (exist) {
        exist.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalCount = document.getElementById('total-count');
    const subtotalPrice = document.getElementById('subtotal-price'); 
    const discountAmountElement = document.getElementById('discount-amount'); 
    const totalPrice = document.getElementById('total-price'); 
    
    if (!cartItems) return;
    
    cartItems.innerHTML = '';
    let count = 0;
    let subtotal = 0;
    
    cart.forEach(item => {
        count += item.quantity;
        subtotal += item.price * item.quantity;
        
        cartItems.innerHTML += `
            <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding: 5px 0; border-bottom: 1px solid #eee;">
                <div style="flex: 1;">
                    <h4 style="margin: 0; font-size: 0.95rem;">${item.name}</h4>
                    <small style="color: #666;">${item.price.toLocaleString()} ກີບ</small>
                </div>
                
                <div style="display: flex; align-items: center; gap: 8px;">
                    <button onclick="decreaseQuantity(${item.id})" style="width: 28px; height: 28px; border: none; border-radius: 50%; background-color: #e0e0e0; cursor: pointer; font-weight: bold; display: flex; justify-content: center; align-items: center;">-</button>
                    
                    <span style="font-weight: bold; min-width: 20px; text-align: center;">${item.quantity}</span>
                    
                    <button onclick="changeQuantity(${item.id}, 1)" style="width: 28px; height: 28px; border: none; border-radius: 50%; background-color: #e0e0e0; cursor: pointer; font-weight: bold; display: flex; justify-content: center; align-items: center;">+</button>
                    
                    <button class="btn-remove" onclick="removeFromCart(${item.id})" style="padding: 5px 12px; border: none; border-radius: 6px; background-color: #f60b0b; color: white; cursor: pointer; font-size: 0.85rem; font-weight: bold;">ລຶບລາຍການ</button>
                </div>
            </div>
        `;
    });
    
    let discountAmount = (subtotal * discountPercent) / 100;
    let finalTotal = subtotal - discountAmount;
    
    if (totalCount) totalCount.innerText = count;
    if (subtotalPrice) subtotalPrice.innerText = subtotal.toLocaleString();
    if (discountAmountElement) discountAmountElement.innerText = discountAmount.toLocaleString();
    if (totalPrice) totalPrice.innerText = finalTotal.toLocaleString();
}

function applyDiscount(event) {
    if (event) event.preventDefault();

    const codeInput = document.getElementById('coupon-code-input');
    const msg = document.getElementById('discount-msg');
    
    if (!codeInput) return;
    const code = codeInput.value.trim();
    
    if (code === 'LAO2024') {
        discountPercent = 5;
        if (msg) {
            msg.innerText = "ຫຼຸດລາຄາ 5% ສຳເລັດ!";
            msg.style.color = "green";
        }
    } else {
        discountPercent = 0;
        if (msg) {
            msg.innerText = "ລະຫັດບໍ່ຖືກຕ້ອງ";
            msg.style.color = "red";
        }
    }
    updateCart();
}

function handleCheckout(event) {
    if (event) event.preventDefault();
    
    if (cart.length === 0) {
        alert('ກະລຸນາເລືອກສິນຄ້າລົງກະຕ່າກ່ອນ!');
        return;
    }
    
    const customerNameInput = document.getElementById('customer-name');
    const customerTelInput = document.getElementById('customer-tel');
    
    const customerName = customerNameInput ? customerNameInput.value : "ລູກຄ້າທົ່ວໄປ";
    const customerTel = customerTelInput ? customerTelInput.value : "ບໍ່ລະບຸ";
    
    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discountAmount = (subtotal * discountPercent) / 100;
    let finalTotal = subtotal - discountAmount;

    const orderData = {
        date: new Date().toLocaleDateString('lo-LA') + ' ' + new Date().toLocaleTimeString('lo-LA'),
        customerName: customerName,
        customerTel: customerTel,
        items: cart,
        discount: discountPercent,
        total: finalTotal
    };
    
    localStorage.setItem('currentOrder', JSON.stringify(orderData));
    window.open('receipt.html', '_blank');
}

function changeQuantity(id, amount) {
    const item = cart.find(p => p.id === id);
    if (item) {
        item.quantity += amount;
    }
    updateCart();
}

function decreaseQuantity(id) {
    const item = cart.find(p => p.id === id);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart = cart.filter(item => item.id !== id);
        }
    }
    updateCart();
}

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    const btn = document.getElementById('dark-mode-toggle');
    if (!btn) return;

    if (body.classList.contains('dark-mode')) {
        btn.innerHTML = "☀️ Light Mode";
        btn.style.backgroundColor = "#ecc94b";
        btn.style.color = "#1a202c";
    } else {
        btn.innerHTML = "🌙 Dark Mode";
        btn.style.backgroundColor = "#2b6cb0";
        btn.style.color = "white";
    }
}

function showSection(sectionName) {
    const mainStore = document.getElementById('main-store-section');
    const portfolioSec = document.getElementById('portfolio-section');
    const contactSec = document.getElementById('contact-section');
    
    if (sectionName === 'main') {
        if (mainStore) mainStore.style.display = 'flex';
        if (portfolioSec) portfolioSec.style.display = 'none';
        if (contactSec) contactSec.style.display = 'none';
    } else if (sectionName === 'portfolio') {
        if (mainStore) mainStore.style.display = 'none';
        if (portfolioSec) portfolioSec.style.display = 'block';
        if (contactSec) contactSec.style.display = 'none';
    } else if (sectionName === 'contact') {
        if (mainStore) mainStore.style.display = 'none';
        if (portfolioSec) portfolioSec.style.display = 'none';
        if (contactSec) contactSec.style.display = 'block';
    }
}

window.onload = function() {
    displayProducts();
};
// ແກ້ໄຂສ່ວນນີ້ຢູ່ທ້າຍໄຟລ໌ script.js
window.onload = function() {
    displayProducts();
    showSection('main'); 
};