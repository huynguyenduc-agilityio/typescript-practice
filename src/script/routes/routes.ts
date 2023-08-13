import { AuthenticationController, HomeController } from '../controllers';
import { AuthenticationModel, HomeModel } from '../models';
import { DEFAULT_ROUTER } from '../types';
import { AuthenticationView, HomeView } from '../views';

export const routes = [
  {
    path: [DEFAULT_ROUTER.HOME, DEFAULT_ROUTER.NEW_PRODUCT, DEFAULT_ROUTER.POPULAR_PRODUCT],
    handler: (): void => {
      new HomeController(new HomeModel(), new HomeView());
    },
  },
  {
    path: DEFAULT_ROUTER.CART,
    handler: (): void => {},
  },
  {
    path: DEFAULT_ROUTER.AUTHENTICATION,
    handler: (): void => {
      new AuthenticationController(new AuthenticationModel(), new AuthenticationView());
    },
  },
];
