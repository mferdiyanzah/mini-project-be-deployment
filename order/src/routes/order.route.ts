import { Router } from "express";
import orderController from "../controllers/order.controller";

const orderRouter = Router();

orderRouter.post("/create", orderController.create);

orderRouter.get("/health", orderController.health);

export default orderRouter;