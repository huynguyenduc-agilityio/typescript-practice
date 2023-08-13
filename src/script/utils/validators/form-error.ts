import { FormError } from '../../types';
import { getElementById, querySelectorAll } from '../doms';

/**
 * @description show input error if any
 * @param {FormError} error error message
 */
export const showError = (error: FormError) => {
  clearError();
  Object.entries(error).forEach(([key, value]) => {
    const target = getElementById<HTMLElement>(`${key}-error`);

    // If target has element
    if (target) {
      target.innerText = value;
    }
  });
};

/**
 * @description clear error message in form if any
 */
export const clearError = () => {
  const errorFields = querySelectorAll<HTMLElement>('.error-message');
  errorFields.forEach((field) => (field.innerText = ''));
};
