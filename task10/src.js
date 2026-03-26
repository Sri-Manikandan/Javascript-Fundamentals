import {products} from "./products.js";

const productList = document.getElementById("product-list");
const cartItemsDiv = document.getElementById("cart-items");
const totalSpan = document.getElementById("total");
const searchInput = document.getElementById("search");

const homePage = document.getElementById("home-page");
const cartPage = document.getElementById("cart-page");
const searchSection = document.getElementById("search-section");

let cart = JSON.parse(localStorage.getItem("cart"))|| [];

function handleRoute() {
    const hash = window.location.hash || "#home";
  
    if (hash === "#cart") {
        homePage.classList.add("hidden");
        cartPage.classList.remove("hidden");
        searchSection.style.display = "none";
    } else {
        homePage.classList.remove("hidden");
        cartPage.classList.add("hidden");
        searchSection.style.display = "block";
    }
}

window.addEventListener("hashchange", handleRoute);

function renderProducts(data) {
    productList.innerHTML = "";
  
    data.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product");
    
        div.innerHTML = `
            <img src="${product.image}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
    
        productList.appendChild(div);
    });
}

window.addToCart = function(id){
    const item = cart.find(p=> p.id===id);
    if(item){
        item.quantity++;
    }else{
        const product = products.find(p=>p.id===id);
        cart.push({...product,quantity:1});
    }

    updateCart();
};

window.removeItem = function(id){
    cart = cart.filter(item=>item.id !== id);
    updateCart();
};

window.removeFromCart = function(id){
    const item = cart.find(p=> p.id===id);
    if(item && item.quantity>1){
        item.quantity--;
    }else if(item && item.quantity===1){
        cart = cart.filter(item=>item.id !== id);
    }
    updateCart();
}

function updateCart() {
    cartItemsDiv.innerHTML = "";
    let total = 0;
  
    cart.forEach(item => {
        total += item.price * item.quantity;

        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <span class="cart-item-info">${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}</span>
            <div class="cart-item-actions">
                <button class="qty-btn" onclick="removeFromCart(${item.id})">-</button>
                <span class="cart-item-qty">${item.quantity}</span>
                <button class="qty-btn" onclick="addToCart(${item.id})">+</button>
                <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
            </div>
        `;

        cartItemsDiv.appendChild(div);
    });
  
    totalSpan.textContent = total;
    localStorage.setItem("cart", JSON.stringify(cart));
}

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
  
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(value)
    );
  
    renderProducts(filtered);
});

renderProducts(products);
updateCart();
handleRoute();