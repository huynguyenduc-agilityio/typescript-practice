import dotenv from 'dotenv';
import ApiService from '../services';
import { AllowedQueryKeys, Product, QueryParams } from '../types';
import { Path } from '../types/path';
dotenv.config();

export class HomeModel {
  private productService: ApiService<Product>;

  constructor() {
    this.productService = new ApiService<Product>(Path.PRODUCT);
  }

  /**
   * Get all of products from server
   * @returns {Product} List product return after make a GET request to server
   */
  async getAllProducts(query?: string): Promise<Product[]> {
    return await this.productService.get(query);
  }

  /**
   * Get products by query from server
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
}
