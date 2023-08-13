import { Product } from '../types';

export const renderModal = (product: Product): string => {
  const { image, name, price, stockCount, description } = product;
  return `
  <div class="modal-container" id="modal">
  <div class="popup">
  <div class="header-popup"><span class="btn-close">×</span></div>
  <div class="content-popup">
    <div class="body-popup">
        <img class="product-image" src=${image} alt="product" loading="lazy" />
        <div class="info-popup">
            <h2 class="text-sub-heading-bold product-name">${name}</h2>
              <ul class="info-list-popup">
                <li>
                  <span class="text-description-medium">Price:</span>
                  <span class="product-price">$${price}</span>
                </li>
                <li>
                  <span class="text-description-medium">Quantity:</span>
                  <span class="badge-grey-color">${stockCount} items available</span>
                </li>
                <li>
                <p class="text-description-medium product-description">
                ${description}
                 </p>
                </li>
              </ul>
              <button type="button" id="btn-add-cart" class="btn btn-main  text-uppercase" >
                Add to cart
              </button>
        </div>
    </div>
  </div>
</div>
  </div>
  `;
};
