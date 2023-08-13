import { isEmptyObject, toggleElement } from '../helpers';
import { DEFAULT_ROUTER, ErrorModel, FormType, Path, UserSignIn, UserSignUp } from '../types';
import { getElementById, querySelector } from '../utils/doms';
import { authenValidator, clearError, showError } from '../utils/validators';

export class AuthenticationView {
  private formElement: HTMLFormElement;
  private emailElement: HTMLInputElement;
  private passwordElement: HTMLInputElement;
  private confirmPasswordElement: HTMLInputElement;
  private inputGroupElement: HTMLInputElement;
  private btnLoginElement: HTMLButtonElement;
  private btnRegisterElement: HTMLButtonElement;
  private btnSubmitElement: HTMLButtonElement;

  constructor() {
    this.formElement = querySelector<HTMLFormElement>('.form-login');
    this.emailElement = getElementById<HTMLInputElement>('email');
    this.passwordElement = getElementById<HTMLInputElement>('password');
    this.confirmPasswordElement = getElementById<HTMLInputElement>('confirmPassword');
    this.inputGroupElement = querySelector<HTMLInputElement>('.input-group.hidden');
    this.btnLoginElement = querySelector<HTMLButtonElement>('.header-action-signIn');
    this.btnRegisterElement = querySelector<HTMLButtonElement>('.header-action-register');
    this.btnSubmitElement = querySelector<HTMLButtonElement>("[type='submit']");
  }

  /**
   * @description bind user sign in form by add event submit for sign in
   * @param {function} handleUserSignIn
   */
  bindUserSignIn(handleUserSignIn: (user: UserSignIn) => Promise<void>) {
    this.formElement.addEventListener('submit', async (e) => {
      e.preventDefault();

      const user: UserSignIn = {
        email: this.emailElement.value.trim() || '',
        password: this.passwordElement.value.trim() || '',
      };
      const isError: ErrorModel = authenValidator(user, FormType.SIGNIN);

      // Check isError if it has an error
      if (!isEmptyObject(isError)) {
        showError(isError);
      } else {
        await handleUserSignIn(user);
        window.location.href = DEFAULT_ROUTER.HOME;
      }
    });
  }

  /**
   * @description bind user sign up form by add event submit for sign up
   * @param {function} handleSignUp
   */
  bindUserSignUp(handleUserSignUp: (user: UserSignUp) => Promise<void>) {
    this.formElement.addEventListener('submit', async (e) => {
      e.preventDefault();

      const user: UserSignUp = {
        email: this.emailElement.value.trim() || '',
        password: this.passwordElement.value.trim() || '',
        confirmPassword: this.confirmPasswordElement.value.trim() || '',
      };
      const isError: ErrorModel = authenValidator(user, FormType.SIGNUP);

      // Check isError if it has an error
      if (!isEmptyObject(isError)) {
        showError(isError);
      } else {
        await handleUserSignUp(user);
        window.location.href = DEFAULT_ROUTER.HOME;
      }
    });
  }

  bindAuthenInit(
    handleUserSignIn: (user: UserSignIn) => Promise<void>,
    handleUserSignUp: (user: UserSignIn) => Promise<void>
  ): void {
    const toggleActiveClass = (): void => {
      this.btnRegisterElement && toggleElement(this.btnRegisterElement, 'active');
      this.btnLoginElement && toggleElement(this.btnLoginElement, 'active');
    };

    this.bindUserSignIn(handleUserSignIn);

    // Add click event for login button
    this.btnLoginElement?.addEventListener('click', (e) => {
      e.preventDefault();

      clearError();
      toggleActiveClass();
      this.inputGroupElement && toggleElement(this.inputGroupElement, 'hidden');

      // If submitButton has element
      if (this.btnSubmitElement) {
        this.btnSubmitElement.innerText = 'Sign In';
      }

      this.bindUserSignIn(handleUserSignIn);
    });

    // Add click event for subscribe button
    this.btnRegisterElement?.addEventListener('click', (e) => {
      e.preventDefault();
      clearError();
      toggleActiveClass();
      this.inputGroupElement && toggleElement(this.inputGroupElement, 'hidden');

      // If submitButton has element
      if (this.btnSubmitElement) {
        this.btnSubmitElement.innerText = 'Sign Up';
      }

      this.bindUserSignUp(handleUserSignUp);
    });
  }
}
