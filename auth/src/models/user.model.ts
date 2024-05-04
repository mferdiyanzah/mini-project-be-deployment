interface UserModel {
  id: number;
  email: string;
  password: string;
}

interface UserLoginRequest {
  email: string;
  password: string;
}

interface UserRegisterRequest extends UserLoginRequest { }

export { UserModel, UserLoginRequest, UserRegisterRequest };