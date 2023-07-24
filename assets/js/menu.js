import { BREAKFAST, SNACKS, MEAT, PASTA, SWEETS, MENU } from "../data/menu.js";
import { setCookie, getCookie, updateCartBadge } from "./utils.js";

let breakfast = MENU.filter(menu => menu.category === BREAKFAST);
let snacks = MENU.filter(menu => menu.category === SNACKS);
let meat = MENU.filter(menu => menu.category === MEAT);
let pasta = MENU.filter(menu => menu.category === PASTA);
let sweets = MENU.filter(menu => menu.category === SWEETS);

function appendMenuItem(menu) {
  return `<li>
    <div class="menu-card hover:card">
      <figure class="card-banner img-holder" style="--width: 100; --height: 100">
        <img src="${menu.image}" width="100" height="100" loading="lazy" alt="${menu.name}"
          class="img-cover menu-item-image" />
      </figure>

      <div>
        <div class="title-wrapper">
          <h3 class="title-3">
            <a href="#" class="card-title">${menu.name}</a>
          </h3>

          <span class="span title-2">${menu.price} lei</span>
        </div>

        <p class="card-text label-1">
         ${menu.description}
        </p>

        <div class="grid">
          <input type="number" min="1" class="input-field quantity-input" value="1" name="quantity-${menu.id}">
          <button type="button" class="order-btn" menuId="${menu.id}"> Add to Order</button>
        </div>
      </div>
    </div>
  </li>
  `
}

breakfast.forEach(item => document.getElementById('breakfast').innerHTML += appendMenuItem(item))
snacks.forEach(item => document.getElementById('snacks').innerHTML += appendMenuItem(item))
meat.forEach(item => document.getElementById('meat').innerHTML += appendMenuItem(item))
pasta.forEach(item => document.getElementById('pasta').innerHTML += appendMenuItem(item))
sweets.forEach(item => document.getElementById('sweets').innerHTML += appendMenuItem(item))

let elements = document.querySelectorAll('.order-btn');
elements.forEach((item) => {
  item.addEventListener('click', addToOrder)
});

function addToOrder(evt) {
  let cart = getCookie("cart");

  if (!cart) {
    cart = {
      products: [],
      total: 0
    };
  }

  let menuId = evt.target.getAttribute("menuId");
  let quantity = parseInt(document.querySelector(`[name=quantity-${menuId}`).value);
  let item = MENU.find(item => item.id == menuId);
  let itemPrice = quantity * item.price;

  let indexOfMeal = cart.products.findIndex(meal => meal.id == menuId);
  if (indexOfMeal > -1) {
    cart.products[indexOfMeal].quantity += quantity;
    cart.products[indexOfMeal].price += itemPrice;
  } else {
    cart.products.push({
      id: menuId,
      quantity: quantity,
      name: item.name,
      price: itemPrice,
      image: item.image
    })
  }
  updateCartBadge(cart.products.length);

  cart.total = cart.total + itemPrice;

  setCookie("cart", cart, 1);

}



