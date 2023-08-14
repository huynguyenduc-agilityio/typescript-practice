import { MIN_QUANTITY } from '../constants';
import { CHECKOUT_MESSAGE } from '../constants/message';
import { renderCart } from '../templates/renderCart';
import { ProductCart } from '../types';
import { querySelector, querySelectorAll } from '../utils/doms';
import { Toast } from '../utils/toast';

export class CartView {
  constructor() {}

  bindCartInit(cartList: ProductCart[]): void {
    const cartBodyElement: HTMLDivElement = querySelector(`.body-cart`);

    // If element has
    if (cartBodyElement) {
      cartBodyElement.innerHTML = renderCart(cartList);
    }

    this.bindAdjustQuantity();
    this.bindCheckout();
  }

  private bindAdjustQuantity() {
    const quantityGroups = querySelectorAll('.quantity-group');

    quantityGroups.forEach((group) => {
      const btnIncrease = group.querySelector(`.btn-increase`) as HTMLButtonElement;
      const btnDecrease = group.querySelector(`.btn-decrease`) as HTMLButtonElement;
      const quantityInput = group.querySelector('.quantity') as HTMLInputElement;

      // Click events decrease quantity
      btnDecrease.addEventListener('click', () => {
        this.handleAdjustQuantity(quantityInput, -1);
      });

      // Click events increase quantity
      btnIncrease.addEventListener('click', () => {
        this.handleAdjustQuantity(quantityInput, 1);
      });

      // Blur events quantity
      quantityInput.addEventListener('blur', () => {
        const currentQuantity = parseInt(quantityInput.value);

        // If not a number or a number less than 1
        if (currentQuantity < MIN_QUANTITY) {
          quantityInput.value = '1';
        }
      });
    });
  }

  private handleAdjustQuantity = (inputElement: HTMLInputElement, change: number) => {
    const currentQuantity = parseInt(inputElement.value);

    // If the sum of quantity and change is greater than or equal to 1
    if (currentQuantity + change >= MIN_QUANTITY) {
      inputElement.value = (currentQuantity + change).toString();
    }
  };

  bindCheckout = () => {
    const btnCheckout: HTMLButtonElement = querySelector('.btn-checkout');
    const toast = new Toast();

    btnCheckout.onclick = () => {
      toast.success({ message: CHECKOUT_MESSAGE.successCheckout });
    };
  };
}
