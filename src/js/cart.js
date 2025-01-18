import { getLocalStorage } from "./utils.mjs";

function addToCart(product) {
  // Retrieve the existing cart array from localStorage or initialize it as an empty array
  let cart = getLocalStorage("so-cart") || [];

  // Add the new product to the cart array
  cart.push(product);

  // Save the updated cart array back to localStorage
  setLocalStorage("so-cart", cart);
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (!cartItems || cartItems.length === 0) {
    // If cart is empty, display a default message
    document.querySelector(".product-list").innerHTML = `
      <li class="cart-card divider">
        <p>Your cart is currently empty.</p>
      </li>
    `;
    return; // Exit the function early
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}
// Call this when "Add to Cart" is clicked
document.querySelector("addToCart").addEventListener("click", () => {
  const product = {
    Name: document.querySelector("item.Name").textContent,
    Image: document.querySelector("item.Image").src,
    Colors: [{ ColorName: document.querySelector("item.Colors").textContent }],
    FinalPrice: parseFloat(document.querySelector("item.FinalPrice").textContent.replace("$", "")),
  };

  addToCart(product); // Save the product to the cart
  alert("Added to cart."); // Notify the user
});

// Initial render of the cart
renderCartContents();
