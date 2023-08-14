import { AuthenticationController, HomeController } from '../controllers';
import { CartController } from '../controllers/cart';
import { AuthenticationModel, HomeModel } from '../models';
import { CartModel } from '../models/cart';
import { DEFAULT_ROUTER } from '../types';
import { AuthenticationView, HomeView } from '../views';
import { CartView } from '../views/cart';

export const routes = [
  {
    path: [DEFAULT_ROUTER.HOME, DEFAULT_ROUTER.NEW_PRODUCT, DEFAULT_ROUTER.POPULAR_PRODUCT],
    handler: (): void => {
      new HomeController(new HomeModel(), new HomeView());
    },
  },
  {
    path: DEFAULT_ROUTER.CART,
    handler: (): void => {
      new CartController(new CartModel(), new CartView());
    },
  },
  {
    path: DEFAULT_ROUTER.AUTHENTICATION,
    handler: (): void => {
      new AuthenticationController(new AuthenticationModel(), new AuthenticationView());
    },
  },
];
