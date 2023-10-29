import { Request, Response } from "express";
import catchAsyncError from "../../utils/catchAsyncError";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { NotificationService } from "./notification.service";

const getNotifications = catchAsyncError(
  async (req: Request, res: Response) => {
    const result = await NotificationService.getNotifications();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Notifications retrived uccessfully",
      data: result,
    });
  }
);

export const NotificationController = {
  getNotifications,
};
