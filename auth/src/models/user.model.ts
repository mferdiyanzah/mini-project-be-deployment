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

interface UserResponse {
  id: number;
  email: string;
}

export { UserModel, UserLoginRequest, UserRegisterRequest, UserResponse };