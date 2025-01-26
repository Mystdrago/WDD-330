import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      // 1. First, We will get the product data
      this.product = await this.dataSource.findProductById(this.productId);

      // 2. Then render the HTML
      this.renderProductDetails();

      // 3. And then add event listener only after rendering
      const addToCartButton = document.getElementById("addToCart");
      if (addToCartButton) {
        addToCartButton.addEventListener("click", this.addToCart.bind(this));
      } else {
        console.error("Add to cart button not found");
      }
    } catch (error) {
      console.error("Error initializing product details:", error);
    }
  }

  addToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    document.querySelector(".product-detail").innerHTML = `
      <h3>${this.product.Brand.Name}</h3>
      <h2 class="divider">${this.product.Name}</h2>
      <img
        class="divider"
        src="${this.product.Image}"
        alt="${this.product.Name}"
      />
      <p class="product-card__price">$${this.product.FinalPrice}</p>
      <p class="product__color">${this.product.Colors[0].ColorName}</p>
      <p class="product__description">
        ${this.product.DescriptionHtmlSimple}
      </p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </div>
    `;
  }
}
