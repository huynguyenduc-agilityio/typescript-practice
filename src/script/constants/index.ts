// Number of products showcase Home
export const NUMBER_NEW_PRODUCT_SHOW_CASE = 3;
export const NUMBER_POPULAR_PRODUCT_SHOW_CASE = 6;

// Min number quantity
export const MIN_QUANTITY = 1;

// All default category
export const CATEGORY_PRODUCT = [
  { category: 'new-product', title: 'New Products' },
  { category: 'popular', title: 'Popular Finds' },
  { category: 'gear', title: 'Gear Heads' },
];

// All default routes
export const ROUTES = [
  {
    path: '/',
    view: 'homepage',
  },
  {
    path: '/new-product',
    view: 'new-product',
  },
  {
    path: '/popular',
    view: 'popular',
  },
];

// Duration show toast
export const TOAST_DURATION = 5000;

// Max message toast
export const MAX_TOAST = 5;

// vertical off set toast
export const VERTICAL_OFFSET = 10;
