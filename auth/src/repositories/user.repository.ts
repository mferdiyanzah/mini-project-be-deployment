import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../libs/pool";
import { UserLoginRequest, UserRegisterRequest, UserResponse } from "../models/user.model";

const register = async (user: UserRegisterRequest): Promise<number> => {
  const { email, password } = user;

  const query = `INSERT INTO users (email, password) VALUES (?, ?)`;

  const [result] = await pool.query<ResultSetHeader>(query, [email, password]);
  return result.insertId;
}

const login = async (user: UserLoginRequest): Promise<UserResponse> => {
  const { email, password } = user;

  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;

  const [result] = await pool.query<RowDataPacket[]>(query, [email, password]);
  return result[0] as UserResponse;
}

const userRepository = {
  register,
  login
}

export default userRepository;