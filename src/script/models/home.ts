import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { CART_MESSAGE } from '../constants/message';
import ApiService from '../services';
import { AllowedQueryKeys, Product, QueryParams } from '../types';
import { Cart, ProductCartItem } from '../types/cart';
import { Path } from '../types/path';
dotenv.config();

export class HomeModel {
  private productService: ApiService<Product>;
  private cartService: ApiService<Cart>;

  constructor() {
    this.productService = new ApiService<Product>(Path.PRODUCT);
    this.cartService = new ApiService<Cart>(Path.CART);
  }

  /**
   * @description get all of products from server
   * @returns {Product} List product return after make a GET request to server
   */
  async getAllProducts(query?: string): Promise<Product[]> {
    return await this.productService.get(query);
  }

  /**
   * @description get products by query from server
   * @returns {Product} List product by query return after make a GET request to server
   */
  async getProductByQuery(queryParams?: QueryParams): Promise<Product[]> {
    // Set default values for missing properties in queryParams
    const { start = 0, sort = 'totalSold', order = 'desc', ...rest } = queryParams || {};

    // Get query string
    const query: string = this.objectToQueryString({
      start,
      sort,
      order,
      ...rest,
    });

    return await this.getAllProducts(query);
  }

  // Function to update query param from Object
  private objectToQueryString = (params: QueryParams) => {
    // Filter parameters and concatenate all queries to String
    const queryString = Object.keys(params)
      .filter((key) => params[key as AllowedQueryKeys] !== undefined)
      .map(
        (key) =>
          `_${encodeURIComponent(key)}=${encodeURIComponent(params[key as AllowedQueryKeys]!)}`
      )
      .join('&');

    return queryString;
  };

  /**
   * @description create new cart item and save response to json server
   * return cart item
   * @param cart Cart
   */
  handleAddCart = async (newItemCart: ProductCartItem): Promise<Cart> => {
    // Create a new cart and add the product to it
    const newCart: Cart = {
      id: uuidv4(),
      itemList: [newItemCart],
    };

    return await this.cartService.post(newCart);
  };

  /**
   * @description update cart item by id and save response to json server
   * return cart item
   * @param cart Cart
   */
  handleUpdateCart = async (
    cartId: string,
    newItemCart: ProductCartItem,
    product: Product
  ): Promise<Cart> => {
    const existingCart = await this.cartService.getById(cartId);

    if (existingCart?.itemList?.length) {
      // Check if the product with the same ID is already in the cart
      const existingItemIndex = existingCart.itemList.findIndex(
        (item) => item.productId === product.id
      );

      if (existingItemIndex !== -1) {
        // If the product already exists in the cart, increase the quantity by 1
        existingCart.itemList[existingItemIndex].quantity += 1;
      } else {
        existingCart.itemList.push(newItemCart);
      }

      await this.cartService.update(existingCart, cartId);
      return existingCart;
    }

    throw new Error(CART_MESSAGE.notFoundCart);
  };
}
