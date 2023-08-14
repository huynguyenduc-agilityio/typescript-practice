import { ROUTES } from '../constants';
import { CART_MESSAGE } from '../constants/message';
import { LocalStorage } from '../helpers';
import { HomeModel } from '../models';
import { DEFAULT_CATEGORY, DEFAULT_ROUTER, LocalStorageType, Product } from '../types';
import { Toast } from '../utils/toast';
import { HomeView } from '../views';

export class HomeController {
  model: HomeModel;
  view: HomeView;
  private toast: Toast = new Toast();

  constructor(model: HomeModel, view: HomeView) {
    this.model = model;
    this.view = view;
    this.init();
  }

  init() {
    this.view.init(this.bindHome, this.handleAddToCart);
  }

  bindHome = async () => {
    const currentPathname = window.location.pathname;
    const routeMatch = ROUTES.find((route) => currentPathname === route.path);
    const isAuth: string = LocalStorage.getItem(LocalStorageType.SIGNIN);

    // If there is accout in localstorage
    if (isAuth) {
      this.view.bindClickButtonLogout(() => {
        LocalStorage.removeItem(LocalStorageType.SIGNIN);
      });
    }

    await this.handleOnDefaultRoutes(routeMatch?.path || DEFAULT_ROUTER.HOME);
  };

  handleOnDefaultRoutes = async (path: string): Promise<void> => {
    const productsDisplay: Product[] = await this.model.getProductByQuery({ sort: 'createAt' });
    const popularDisplay: Product[] = await this.model.getProductByQuery();

    switch (path) {
      // Case current view is new product
      case DEFAULT_ROUTER.NEW_PRODUCT:
        return this.view.bindProductSection(productsDisplay, DEFAULT_CATEGORY.NewProduct);

      // Case current view is popular
      case DEFAULT_ROUTER.POPULAR_PRODUCT:
        return this.view.bindProductSection(popularDisplay, DEFAULT_CATEGORY.Popular);

      // Case current view is homepage
      default:
        const numberProductsDisplay = await this.model.getProductByQuery({
          limit: 3,
          sort: 'createAt',
        });
        const numberPopularDisplay = await this.model.getProductByQuery({ limit: 6 });

        this.view.bindProductSection(numberProductsDisplay, DEFAULT_CATEGORY.NewProduct);
        this.view.bindProductSection(numberPopularDisplay, DEFAULT_CATEGORY.Popular);
        this.view.bindProductSection([], DEFAULT_CATEGORY.Gear);
        break;
    }
  };

  handleAddToCart = async (product: Product): Promise<void> => {
    const cartId: string = LocalStorage.getItem(LocalStorageType.CART);
    const newItemCart = { productId: product.id, quantity: 1 };

    try {
      // If id cart has, return update cart list
      if (cartId) {
        await this.model.handleUpdateCart(cartId, newItemCart, product);
      }
      // Else return add cart
      else {
        const response = await this.model.handleAddCart(newItemCart);
        LocalStorage.setItem(LocalStorageType.CART, response.id);
      }
      this.toast.success({ message: CART_MESSAGE.successAddCart });
    } catch (error) {
      this.toast.error({ message: CART_MESSAGE.errorAddCart });
    }
  };
}
