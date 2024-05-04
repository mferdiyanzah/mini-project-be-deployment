import { UserRegisterRequest } from "../models/user.model";
import userRepository from "../repositories/user.repository"
import { generateToken } from "../utils/jwt";

const register = async (user: UserRegisterRequest): Promise<number> => {
  return userRepository.register(user);
}

const login = async (user: UserRegisterRequest): Promise<string | null> => {
  const userFound = await userRepository.findUserByEmail(user.email);
  if (!userFound) {
    throw new Error("Invalid credentials");
  }

  if (user.password !== userFound.password) {
    throw new Error("Invalid credentials");
  }

  return generateToken(userFound.id, userFound.email);
}

const userService = {
  register,
  login
}

export default userService;