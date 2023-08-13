export enum FormType {
  SIGNUP,
  SIGNIN,
}

export interface FormError {
  [key: string]: string;
}

export type ErrorModel = FormError | undefined;
