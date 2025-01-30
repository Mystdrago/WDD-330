import { getLocalStorage, renderWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  // Ensure quantity exists, default to 1 if not set
  const quantity = item.quantity || 1;
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${quantity}</p>
    <p class="cart-card__price">$${(item.FinalPrice * quantity).toFixed(2)}</p>
    <span class="remove-item" data-id="${item.Id}">X</span>
  </li>`;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.total = 0;
  }

  async init() {
    let list = getLocalStorage(this.key);
    
    if (list) {
      // Consolidate duplicate items by ID
      const consolidatedList = Object.values(
        list.reduce((acc, item) => {
          if (!acc[item.Id]) {
            acc[item.Id] = {
              ...item,
              quantity: 0
            };
          }
          acc[item.Id].quantity += (item.quantity || 1);
          return acc;
        }, {})
      );

      // Update storage with consolidated list
      localStorage.setItem(this.key, JSON.stringify(consolidatedList));
      list = consolidatedList;
    }

    this.calculateTotal(list);
    this.renderCart(list);
    document.querySelectorAll(".remove-item").forEach(btn => {
      btn.addEventListener("click", (e) => this.removeItem(e));
    });
  }

  calculateTotal(list) {
    this.total = list?.reduce((sum, item) => 
      sum + item.FinalPrice * (item.quantity || 1), 0) || 0;
  }

  renderCart(list) {
    const element = document.querySelector(this.parentSelector);
    const cartFooter = document.querySelector(".cart-footer");
    
    if (!list || list.length === 0) {
      renderWithTemplate(
        () => `<li class="cart-card divider"><p>Your cart is currently empty.</p></li>`,
        element,
        null,
        "afterbegin",
        true
      );
      cartFooter.classList.add("hide");
      return;
    }

    renderWithTemplate(cartItemTemplate, element, list, "afterbegin", true);
    document.querySelector(".cart-total").textContent = `Total: $${this.total.toFixed(2)}`;
    cartFooter.classList.remove("hide");
  }

  removeItem(e) {
    const itemId = e.target.dataset.id;
    let list = getLocalStorage(this.key);
    list = list.filter(item => item.Id !== itemId);
    localStorage.setItem(this.key, JSON.stringify(list));
    this.init();
  }

  addItem(product) {
    let list = getLocalStorage(this.key) || [];
    const existingItem = list.find(item => item.Id === product.Id);
    
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      product.quantity = 1;
      list.push(product);
    }
    
    localStorage.setItem(this.key, JSON.stringify(list));
    return list.length;
  }
}
