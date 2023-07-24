import { MENU } from "../data/menu.js";


window.addEventListener("load", (event) => {
    let shuffled = MENU.sort(function () { return .5 - Math.random() });
  
    var randomMeals = shuffled.slice(0, 6);
  
    randomMeals.forEach((meal) => appendMenuItem(meal));
  
  })
  
  function appendMenuItem(item) {
  
    document.getElementById("homepage-menu").innerHTML += `
    <li>
    <div class="menu-card hover:card">
      <figure class="card-banner img-holder" style="--width: 100; --height: 100">
        <img src="${item.image}" width="100" height="100" loading="lazy" alt="${item.name}"
          class="img-cover  menu-item-image" />
      </figure>
  
      <div>
        <div class="title-wrapper">
          <h3 class="title-3">
            <a href="#" class="card-title">${item.name}</a>
          </h3>
  
  
          <span class="span title-2">${item.price} lei</span>
        </div>
  
        <p class="card-text label-1">
          ${item.description}
        </p>
      </div>
    </div>
  </li>
    `
  
  }