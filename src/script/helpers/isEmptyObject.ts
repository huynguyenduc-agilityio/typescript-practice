export const isEmptyObject = (object: Record<string, any>): boolean => {
  return Object.keys(object).length === 0;
};
