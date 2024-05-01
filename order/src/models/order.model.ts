interface OrderModel {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  status: string;
}

interface AddOrderRequest {
  user_id: number;
  product_id: number;
  quantity: number;
}

interface AddOrderResponse {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  status: string;
}

interface UpdateOrderRequest {
  status: string;
}

interface UpdateOrderResponse {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  status: string;
}

export {
  OrderModel,
  AddOrderRequest,
  AddOrderResponse,
  UpdateOrderRequest,
  UpdateOrderResponse,
};
