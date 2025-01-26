import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const productData = new ProductData("tents");
const productListing = new ProductListing(
  "tents",
  productData,
  document.querySelector("#tentList")
);
productListing.init();