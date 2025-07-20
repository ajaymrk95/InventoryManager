import express from "express"
import { AddOrder,getOrders,getOrdersByUser } from "../controllers/orderController.js";

const orderRouter = express.Router();


orderRouter.get("/allorders",getOrders);
orderRouter.get("/userorders",getOrdersByUser);
orderRouter.post("/add",AddOrder)

export default orderRouter