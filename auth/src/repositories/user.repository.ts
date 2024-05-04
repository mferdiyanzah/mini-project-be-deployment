import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../libs/pool";
import { UserLoginRequest, UserModel, UserRegisterRequest, } from "../models/user.model";

const register = async (user: UserRegisterRequest): Promise<number> => {
  const { email, password } = user;

  const query = `INSERT INTO users (email, password) VALUES (?, ?)`;

  const [result] = await pool.query<ResultSetHeader>(query, [email, password]);
  return result.insertId;
}

const findUserByEmail = async (email: string): Promise<UserModel | null> => {
  const query = `SELECT * FROM users WHERE email = ?`;

  const [result] = await pool.query<RowDataPacket[]>(query, [email]);
  return result[0] as UserModel;
}

const userRepository = {
  register,
  findUserByEmail,
}

export default userRepository;