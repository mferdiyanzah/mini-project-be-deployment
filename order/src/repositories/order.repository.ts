import { ResultSetHeader } from "mysql2";
import pool from "../libs/pool";
import { AddOrderRequest } from "../models/order.model";

const create = async (order: AddOrderRequest): Promise<number | void> => {
  const query = `INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)`;

  const values = [order.user_id, order.product_id, order.quantity]

  const [result] = await pool.query<ResultSetHeader>(query, values);
  return result.insertId;
};

const orderRepository = {
  create,
};

export default orderRepository;