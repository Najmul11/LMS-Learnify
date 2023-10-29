import { Request, Response } from "express";
import catchAsyncError from "../../utils/catchAsyncError";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { OrderService } from "./order.service";

const createOrder = catchAsyncError(async (req: Request, res: Response) => {
  const user = req.user;
  const payload = req.body;

  const result = await OrderService.createOrder(payload, user?._id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order placed successfully",
    data: result,
  });
});

const getAllOrders = catchAsyncError(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrders();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders retrieved successfully",
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
};
