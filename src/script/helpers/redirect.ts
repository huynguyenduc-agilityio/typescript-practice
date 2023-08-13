/**
 * @description setup DOM and load controller
 * @param path string
 * @param callback function
 */
export const redirect = (path: string, replace?: boolean) => {
  // If replace true
  if (replace) {
    window.location.replace(path);
  }

  window.location.assign(path);
};
