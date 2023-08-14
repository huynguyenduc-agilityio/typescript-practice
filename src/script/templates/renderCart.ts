import { Product, ProductCart } from '../types';

export const renderCart = (itemList: ProductCart[]): string => {
  return `
  <ul class="cart-list">
  ${itemList
    .map(
      (cart) =>
        `<li class="cart-item">
      <div class="cart-item-content flex-start">
        <img
          class="product-image cart-item-image"
          src=${cart.image}
          alt="product"
          loading="lazy"
        />
        <div class="cart-item-info">
          <h2 class="text-description-base product-name">${cart.name}</h2>
          <span class="badge-grey-color">${cart.stockCount} items available</span>
          <span class="product-price">$ ${cart.price}</span>
        </div>
      </div>
      <div class="cart-item-action flex-start">
        <div class="quantity-group flex-center">
          <button type="button" class="btn btn-adjust btn-decrease" value="button">-</button>
          <div class="input-group">
            <input
              type="number"
              name="quantity"
              class="input-text quantity"
              min="1"
              value="${cart.quantity}"
            />
          </div>
          <button type="button" class="btn btn-adjust btn-increase" value="button">+</button>
        </div>
        <button class="btn-remove">X</button>
      </div>
    </li>`
    )
    .join('')}
  
</ul>
<div class="cart-total">
  <h2>Cart totals</h2>
  <div class="cart-total-amount flex-between">
    <span>Total</span>
    <span>$ ${itemList.reduce(
      (previousValue: number, currentValue: ProductCart) =>
        previousValue + currentValue.price * currentValue.quantity,
      0
    )}</span>
  </div>
  <button class="btn btn-checkout">Proceed to checkout</button>
</div>
  `;
};
