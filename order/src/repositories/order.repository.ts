import { ResultSetHeader, RowDataPacket } from "mysql2";

import pool from "../libs/pool";

import { AddOrderRequest } from "../models/order.model";

const create = async (order: AddOrderRequest): Promise<number> => {
  const { user_id, product_id, quantity } = order;

  const query = `INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)`;

  const [result] = await pool.query<ResultSetHeader>(query, [
    user_id,
    product_id,
    quantity,
  ]);
  return result.insertId;
};

const orderRepository = {
  create,
};

export default orderRepository;
