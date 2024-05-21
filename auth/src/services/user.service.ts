import { UserRegisterRequest } from "../models/user.model";
import userRepository from "../repositories/user.repository"
import { hashPassword, verifyPassword } from "../utils/crypto";
import { generateToken } from "../utils/jwt";

const register = async (user: UserRegisterRequest): Promise<number> => {
  user.password = await hashPassword(user.password);
  return userRepository.register(user);
}

const login = async (user: UserRegisterRequest): Promise<string | null> => {
  const userFound = await userRepository.findUserByEmail(user.email);
  if (!userFound) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await verifyPassword(user.password, userFound.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  return generateToken(userFound.id, userFound.email);
}

const userService = {
  register,
  login
}

export default userService;