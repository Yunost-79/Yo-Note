export interface RegisterUserData {
  email: string;
  username: string;
  password: string;
  rePassword: string;
}

export interface LoginUserData {
  usernameOrEmail: string;
  password: string;
}
