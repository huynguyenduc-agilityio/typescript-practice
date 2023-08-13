export interface User {
  id: string;
  email: string;
  password: string;
}

export interface UserSignUp {
  email: string;
  password: string;
  confirmPassword?: string;
}

export type UserSignIn = Omit<User, 'id'>;

export interface UserResponse {
  accessToken: string;
  user: User;
}
