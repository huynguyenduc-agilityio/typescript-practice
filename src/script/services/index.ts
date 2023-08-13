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
   * get data from server
   * @param {String} path request path
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
   * Post new data to server
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
   * Delete data at server
   * @param {String} path request path
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
   * Update data at server
   * @param {String} path request path
   * @param {Object} data
   * @returns data after request
   */
  update = async (data: T): Promise<T> => {
    try {
      const response = await fetch(this.fullPath, {
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
