import { setLocalStorage,getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  /////Get all cart items first
  let cartItems = getLocalStorage("so-cart");
  if(cartItems == undefined){
    cartItems = [];
  }
  cartItems.push(product)
  console.log("Item to add to the cart",cartItems)
  setLocalStorage("so-cart", cartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
  console.log("Add to cart handler clicked")
  const product = await dataSource.findProductById(e.target.dataset.id);
  console.log("Product being added to cart",product)
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

  
