import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const cartFooter = document.querySelector(".cart-footer");
  
  if (!cartItems || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = `
      <li class="cart-card divider">
        <p>Your cart is currently empty.</p>
      </li>
    `;
    cartFooter.classList.add("hide");
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  
  // Calculate and display total
  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  document.querySelector(".cart-total").innerHTML = `Total: $${total.toFixed(2)}`;
  cartFooter.classList.remove("hide");
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

// Ensure the DOM is fully loaded before rendering the cart contents
document.addEventListener("DOMContentLoaded", renderCartContents);
