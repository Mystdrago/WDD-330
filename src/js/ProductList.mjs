import { renderListWithTemplate } from "./utils.mjs";

// Product card template
function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="${product.Name}"/>
      <h3 class="card__brand">${product.Brand?.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

// ProductListing class
export default class ProductListing {
  constructor(category, dataSource, element) {
    this.category = category;
    this.dataSource = dataSource;
    this.element = element;
  }

  // Filter products
  filterProducts(products) {
    return products.filter((item) =>
      ["880RR", "985RF", "985PR", "344YJ"].includes(item.Id),
    );
  }

  // Render list
  renderList(products) {
    renderListWithTemplate(
      productCardTemplate,
      this.element,
      this.filterProducts(products),
      "afterbegin",
      true,
    );
  }

  // Initialize
  async init() {
    const products = await this.dataSource.getData();
    this.renderList(products);
  }
}
