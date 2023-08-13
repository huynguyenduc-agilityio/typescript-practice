import { CATEGORY_PRODUCT } from '../constants';
import { LocalStorage, redirect } from '../helpers';
import { productCard, renderGearSection, renderModal, renderProductSection } from '../templates';
import { LocalStorageType, DEFAULT_ROUTER, Product } from '../types';
import { Nullable } from '../types/genericTypes';
import { getElementById, querySelector } from '../utils/doms';

export class HomeView {
  private selectedProduct: Nullable<Product>;
  private modalContainer: Nullable<HTMLDivElement>;
  private isAuth: string;

  constructor() {
    this.selectedProduct = null;
    this.modalContainer = null;
    this.isAuth = LocalStorage.getItem(LocalStorageType.SIGNIN);
  }

  init(bindHome: () => Promise<void>) {
    bindHome();
  }

  bindProductSection(products: Product[], category: string): void {
    const sectionElement: HTMLDivElement = querySelector(`.render-${category}`);
    const titleCategoryMatch = CATEGORY_PRODUCT.find((item) => category === item.category);

    if (sectionElement && titleCategoryMatch) {
      // Create Section into HTML
      sectionElement.innerHTML = renderProductSection({
        category: category,
        titleContent: titleCategoryMatch.title,
        isSeeAll: window.location.pathname === '/',
      });
    }

    // Render list of product in the section
    const listProductElement: HTMLDivElement = querySelector(`.${category} .product-list`);

    if (listProductElement) {
      const newProducts = products
        .map((product) => {
          return productCard(product);
        })
        .join('');

      // Create list procduct into HTML
      listProductElement.innerHTML = newProducts || renderGearSection();
    }

    const productItemsElement: NodeListOf<HTMLDivElement> =
      listProductElement.querySelectorAll('.product-item');

    // Loop through the products array
    productItemsElement.forEach((element, index) => {
      if (element) {
        element.addEventListener('click', () => {
          // Save product information clicked on selectedProduct variable
          this.selectedProduct = products[index];

          // Show modal when product is clicked
          this.bindModal(this.selectedProduct);
        });
      }
    });
  }

  bindModal = (product: Nullable<Product>): void => {
    const mainBodyElement: HTMLDivElement = querySelector(`main.main-content`);

    if (mainBodyElement && product) {
      if (!this.modalContainer) {
        // Create a new modal container if it doesn't exist
        this.modalContainer = document.createElement('div');
        mainBodyElement.appendChild(this.modalContainer);
      }

      // Update the modal container content with the new product information
      this.modalContainer.innerHTML = renderModal(product);
      this.handleShowModal();

      const closeModalEL: HTMLButtonElement = querySelector('#modal .btn-close');

      // Add click event for modal close button
      closeModalEL.addEventListener('click', () => {
        this.handleCloseModal();
      });
      this.handleAddToCart(product);
    }
  };

  handleShowModal = () => {
    const modal = getElementById<HTMLElement>('modal');

    modal?.classList.add('open');
  };

  handleCloseModal = () => {
    // Delete saved product information when closing modal
    this.selectedProduct = null;

    const modal = getElementById<HTMLElement>('modal');
    modal?.classList.remove('open');
  };

  // Bind click button log out
  bindClickButtonLogout(handler: () => void): void {
    const btnAccountEl: HTMLButtonElement = querySelector('.header-actions .btn-login');

    // If there is accout in localstorage and btnAccount have element
    if (this.isAuth && btnAccountEl) {
      btnAccountEl.innerHTML = `<img class='btn-logout' src="/svgs/logout.svg" alt="logout" />`;
    }

    const btnLogout = document.querySelector('.btn-logout');

    if (btnLogout) {
      btnLogout.addEventListener('click', handler);
    }
  }

  handleAddToCart = (product: Product) => {
    const buttonAddCartEl: HTMLButtonElement = getElementById('btn-add-cart');

    // Add click event for modal add to cart button
    buttonAddCartEl.addEventListener('click', () => {
      const productsInCart = JSON.parse(LocalStorage.getItem('cart') || '[]');

      // If not accout, return redirect authentication
      if (!this.isAuth) {
        redirect(DEFAULT_ROUTER.AUTHENTICATION);
      }

      // Push the product you just added to the cart
      productsInCart.push(product);
      LocalStorage.setItem('cart', JSON.stringify(productsInCart));
      this.handleCloseModal();
    });
  };
}
