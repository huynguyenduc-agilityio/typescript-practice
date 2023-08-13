/**
 * @description query html element
 * @param {string} selector
 * @returns html element
 */
export const querySelector = <T>(selector: string): T => {
  return document.querySelector(selector) as T;
};

/**
 * @description query all html elements
 * @param selector
 * @returns list html elements
 */
export const querySelectorAll = <T extends HTMLElement>(selector: string) => {
  return document.querySelectorAll(selector) as NodeListOf<T>;
};

/**
 * @description query html element by id
 * @param {string} selector
 * @returns html element
 */
export function getElementById<T>(selector: string) {
  return document.getElementById(selector) as T;
}
