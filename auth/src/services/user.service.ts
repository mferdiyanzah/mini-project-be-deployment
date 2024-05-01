import { UserRegisterRequest } from "../models/user.model";
import userRepository from "../repositories/user.repository"
import { generateToken } from "../utils/jwt";

const register = async (user: UserRegisterRequest): Promise<number> => {
  return userRepository.register(user);
}

const login = async (user: UserRegisterRequest): Promise<string> => {
  const result = await userRepository.login(user);

  if (!result) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(result.id, result.email);

  return token;
}

const userService = {
  register,
  login
}

export default userService;