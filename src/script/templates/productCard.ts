import { Product } from '../types';

export const productCard = (product: Product): string => {
  return `
      <li class="product-item">
        <figure class="product-image-frame flex-center">
          <img
            class="product-image"
            src=${product.image}
            alt="product"
            loading="lazy"
          />
        </figure>
        <div class="product-info">
          <div class="product-details">
            <div class="product-name-price flex-between">
              <h4 class="text-description-base product-name">
                ${product.name}
              </h4>
              <p class="text-description-base product-price">$${product.price}</p>
            </div>
            <p class="text-description-medium product-description">
              ${product.description}
            </p>
          </div>
          <div class="product-color">
            <span class="text-default product-color-number">${product.stockCount}</span>
            <span class="text-default">items available </span>
          </div>
        </div>
      </li>
    `;
};
