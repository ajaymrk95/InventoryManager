import express from "express"
import { AddOrder,getOrders,getOrdersByUser,updateOrderStatus } from "../controllers/orderController.js";

const orderRouter = express.Router();


orderRouter.get("/allorders",getOrders);
orderRouter.get("/userorders",getOrdersByUser);
orderRouter.post("/add",AddOrder)
orderRouter.post("/updatestatus/:orderId",updateOrderStatus);


export default orderRouter