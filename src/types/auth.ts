export interface LoginFormValues {
  username: string;
  password: string;
}

export interface RegisterFormValues {
  name: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
}

export interface AuthError {
  field?: string;
  message: string;
}