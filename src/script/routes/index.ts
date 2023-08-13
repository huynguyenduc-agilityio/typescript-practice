import { LocalStorage, redirect } from '../helpers';
import { AuthKeys, DEFAULT_ROUTER } from '../types';
import { routes } from './routes';

export const router = (pathName: string): void => {
  const isAuth: string = LocalStorage.getItem(AuthKeys.SIGNIN);

  // Find current router
  const currentRouter = routes.find((route) => {
    if (Array.isArray(route.path)) {
      return route.path.find((path) => path === pathName);
    }
    return route.path === pathName;
  });

  // If not account
  if (!isAuth) {
    LocalStorage.clear();
  }

  // If not correct router find
  if (!currentRouter) {
    redirect(DEFAULT_ROUTER.HOME);
  }

  currentRouter?.handler?.();
};
