import { AddOrderRequest } from "../models/order.model";
import orderRepository from "../repositories/order.repository";

const createOrder = async (order: AddOrderRequest): Promise<number | void> => {
  return orderRepository.create(order);
}

const orderService = {
  createOrder,
};

export default orderService;
