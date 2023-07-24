import { setCookie, getCookie, deleteCookie, saveToLocalStorage, updateCartBadge } from "./utils.js";
import { MENU } from "../data/menu.js";

let cart = getCookie("cart");

function changeTotal(total) {
    document.getElementById("total").innerHTML = total + " lei";
}

if (cart) {
    cart.products.forEach(product => appendCartItem(product));
    changeTotal(cart.total);
}

function appendCartItem(item) {
    document.getElementById("cart").innerHTML += `
    <div class="menu-card hover:card" id="meal-${item.id}">
        <figure class="card-banner img-holder" style="--width: 100; --height: 100">
            <img src="${item.image}" width="100" height="100" loading="lazy"
                alt="${item.name}" class="img-cover menu-item-image" />
        </figure>

        <div>
            <div class="title-wrapper">
                <h3 class="title-3">
                    <a href="#" class="card-title">${item.name}</a>
                </h3>
                <span class="span title-2" id="price-${item.id}">${item.price} lei</span>
            </div>
            <div class="grid">
                <input type="number" min="1" class="input-field " value="${item.quantity}" name="quantity" mealId=${item.id}>
                <button type="button" class="order-btn" mealId="${item.id}"> Remove from order</button>
            </div>
        </div>
    </div>
    `
}



let buttons = document.querySelectorAll('.order-btn');
buttons.forEach((item) => {
    item.addEventListener('click', removeFromCart)
});

function removeFromCart(evt) {
    let mealId = evt.target.getAttribute("mealId");
    cart.total = cart.total - cart.products.find(product => product.id == mealId).price;
    cart.products = cart.products.filter(product => product.id != mealId)
    document.getElementById(`meal-${mealId}`).remove();
    changeTotal(cart.total);
    updateCartBadge(cart.products.length);
    setCookie("cart", cart)
}

let quantities = document.querySelectorAll('[name=quantity]');
quantities.forEach((item) => {
    item.addEventListener('change', updateCart)
});

function updateCart(evt) {
    let mealId = evt.target.getAttribute("mealId");
    let newQuantity = evt.target.value;

    let oldPrice = cart.products.find(product => product.id == mealId).price;
    cart.total -= oldPrice;
    let newPrice = newQuantity * MENU.find(meal => meal.id == mealId).price;
    cart.total += newPrice;
    let indexOfMeal = cart.products.findIndex(meal => meal.id == mealId);
    cart.products[indexOfMeal].quantity = newQuantity;
    cart.products[indexOfMeal].price = newPrice;
    document.getElementById(`price-${mealId}`).innerHTML = newPrice + " lei";

    changeTotal(cart.total);
    updateCartBadge(cart.products.length);
    setCookie("cart", cart);
}

document.getElementById('deliveryForm').addEventListener("submit", placeOrder)

function placeOrder(event) {
    event.preventDefault();
    let successMessage = document.getElementById("success-message");
    successMessage.classList.add("hidden");

    let formEl = document.forms.deliveryForm;
    let formData = new FormData(formEl);

    let order = {
        cart,
        name: formData.get('name'),
        phone: formData.get('phone'),
        address: formData.get('address')
    }

    document.getElementById("success-message")
    saveToLocalStorage("order", order);
    deleteCookie("cart");
    updateCartBadge(0);
    successMessage.classList.remove("hidden");

}


