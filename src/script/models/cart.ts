import ApiService from '../services';
import { Path, Product } from '../types';
import { Cart } from '../types/cart';

export class CartModel {
  private cartService: ApiService<Cart>;
  private productService: ApiService<Product>;

  constructor() {
    this.cartService = new ApiService<Cart>(Path.CART);
    this.productService = new ApiService<Product>(Path.PRODUCT);
  }
  /**
   * @description get all carts
   * return cart
   * @param cart Cart[]
   */
  async getCartById(id: string): Promise<Cart> {
    return await this.cartService.getById(id);
  }

  async getProductById(id: string): Promise<Product> {
    return await this.productService.getById(id);
  }
}
