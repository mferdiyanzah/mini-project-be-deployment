import { RowDataPacket } from "mysql2";
import pool from "../libs/pool"

const connectionPromise = pool.getConnection();

const checkProduct = async (product: any) => {
  const connection = await connectionPromise;
  try {
    await connection.beginTransaction();
    const query = `SELECT * FROM product WHERE id = ? FOR UPDATE`;
    const [rows] = await connection.query<RowDataPacket[]>(query, [product.id]);
    if (!rows.length) {
      return false;
    }
    return rows[0]?.stock >= product.quantity;
  } catch (error) {
    if (error instanceof Error) {
      await connection.rollback();
      throw new Error(error.message);
    }
  }
};

const reduceProduct = async (product: any) => {
  const connection = await connectionPromise;
  try {
    const query = `UPDATE product SET stock = stock - ? WHERE id = ?`;
    await connection.query<RowDataPacket[]>(query, [product.quantity, product.id]);
    await connection.commit();
  } catch (error) {
    if (error instanceof Error) {
      await connection.rollback();
      throw new Error(error.message);
    }
  }
};

const inventoryRepository = {
  checkProduct,
  reduceProduct,
};

export default inventoryRepository;