import ApiService from '../services';
import { Path, User, UserSignIn, UserSignUp } from '../types';

export class AuthenticationModel {
  private userService: ApiService<User>;

  constructor() {
    this.userService = new ApiService<User>(Path.USER);
  }

  /**
   * @description create new user account and save response to json server
   * return user
   * @param user UserSignUp
   */
  async handleSignUp(user: UserSignUp): Promise<UserSignUp> {
    const newUser: UserSignIn = {
      email: user.email,
      password: user.password,
    };

    return await this.userService.post(newUser as User);
  }

  /**
   * @description get all users account
   * return all users
   * @param user User[]
   */
  async getAllUser(): Promise<User[]> {
    return await this.userService.get();
  }
}
