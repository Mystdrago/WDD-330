import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
import {getParams} from './utils.mjs'

const productId = getParams('product');
const dataSource = new ProductData('tents');

const product = new ProductDetails(productId, dataSource);
console.log(product.productId);
console.log('why now?');
product.init();