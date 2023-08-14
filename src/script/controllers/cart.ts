import { LocalStorage } from '../helpers';
import { CartModel } from '../models/cart';
import { LocalStorageType, Product, ProductCart } from '../types';
import { CartView } from '../views/cart';

export class CartController {
  model: CartModel;
  view: CartView;
  dataProduct: ProductCart[];

  constructor(model: CartModel, view: CartView) {
    this.model = model;
    this.view = view;
    this.dataProduct = [];
    this.init();
  }

  init(): void {
    this.handleShowListCart();
  }

  handleShowListCart = async (): Promise<void> => {
    const cartId: string = LocalStorage.getItem(LocalStorageType.CART);
    const dataCart = (await this.model.getCartById(cartId)).itemList;

    for (const item of dataCart) {
      const response = await this.model.getProductById(item.productId);
      this.dataProduct.push({ ...response, quantity: item.quantity });
    }

    return this.view.bindCartInit(this.dataProduct);
  };
}
