import catchAsyncError from "../../utils/catchAsyncError";
import { Request, Response } from "express";
import { LayoutService } from "./layout.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createLayout = catchAsyncError(async (req: Request, res: Response) => {
  const payload = req.body;
  const layoutImage = req.file;
  const result = await LayoutService.createLayout(payload, layoutImage);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Layout created uccessfully",
    data: result,
  });
});

export const LayoutController = {
  createLayout,
};
