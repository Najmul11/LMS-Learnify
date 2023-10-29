import express from "express";
import auth from "../../middleware/auth";
import { OrderController } from "./order.controller";

const router = express.Router();

router.post("/create-order", auth, OrderController.createOrder);

export const OrderRoutes = router;
