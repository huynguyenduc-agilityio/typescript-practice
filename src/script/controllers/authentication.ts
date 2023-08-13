import { LocalStorage } from '../helpers';
import { AuthenticationModel } from '../models';
import { LocalStorageType, User, UserSignIn, UserSignUp } from '../types';
import { AuthenticationView } from '../views';

export class AuthenticationController {
  model: AuthenticationModel;
  view: AuthenticationView;

  constructor(model: AuthenticationModel, view: AuthenticationView) {
    this.model = model;
    this.view = view;
    this.init();
  }

  init(): void {
    this.view.bindAuthenInit(this.signIn, this.signUp);
  }

  signIn = async (user: UserSignIn): Promise<void> => {
    const dataUser: User[] = await this.model.getAllUser();

    // Compare input and list of data from database
    const foundUser: User | undefined = dataUser?.find((data) => {
      const { email, password } = data;
      return user.email === email && user.password === password;
    });

    if (foundUser) {
      // Store id user into local storage
      LocalStorage.setItem(LocalStorageType.SIGNIN, foundUser.id.toString());
    }
  };

  signUp = async (user: UserSignUp): Promise<void> => {
    const dataUser = (await this.model.handleSignUp(user)) as User;

    if (dataUser) {
      // Store id user into local storage
      LocalStorage.setItem(LocalStorageType.SIGNIN, dataUser.id);
    }
  };
}
