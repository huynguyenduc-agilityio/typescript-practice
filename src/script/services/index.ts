// Libs
import dotenv from 'dotenv';
import { API_HEADERS, HTTP_METHODS } from '../types';
dotenv.config();

export default class ApiService<T> {
  private fullPath: string;

  constructor(path: string) {
    this.fullPath = process.env.API_ENDPOINT + path;
  }

  /**
   * @description get data from server
   * @param {String} path request path
   * @param {String} query option
   * @returns data after request
   */
  get = async (query?: string): Promise<T[]> => {
    try {
      const url = `${this.fullPath}?${query}`;
      const response = await fetch(url);

      return response.json();
    } catch (error: any) {
      throw new Error(error);
    }
  };

  /**
   * @description get data detail by id from server
   * @param {String} path request path
   * @param {String} id
   * @param {String} query option
   * @returns data after request
   */
  getById = async (id: string, query?: string): Promise<T> => {
    try {
      const url = `${this.fullPath}/${id}?${query}`;
      const response = await fetch(url);

      return response.json();
    } catch (error: any) {
      throw new Error(error);
    }
  };

  /**
   * @description post new data to server
   * @param {String} path request path
   * @param {Object} data
   * @returns data after request
   */
  post = async (data: T): Promise<T> => {
    try {
      const response = await fetch(this.fullPath, {
        method: HTTP_METHODS.POST,
        headers: API_HEADERS,
        body: JSON.stringify(data),
      });

      return response.json();
    } catch (error: any) {
      throw new Error(error);
    }
  };

  /**
   * @description delete data at server
   * @param {String} path request path
   * @returns data after request
   */
  remove = async (): Promise<void> => {
    try {
      await fetch(this.fullPath, {
        method: HTTP_METHODS.DELETE,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };

  /**
   * @description update data at server
   * @param {String} path request path
   * @param {Object} data
   * @param {id} string
   * @returns data after request
   */
  update = async (data: T, id: string): Promise<T> => {
    try {
      const response = await fetch(`${this.fullPath}/${id}`, {
        method: HTTP_METHODS.PATCH,
        headers: API_HEADERS,
        body: JSON.stringify(data),
      });

      return response.json();
    } catch (error: any) {
      throw new Error(error);
    }
  };
}
