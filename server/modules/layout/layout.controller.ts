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

const updateBanner = catchAsyncError(async (req: Request, res: Response) => {
  const payload = req.body;
  const layoutImage = req.file;

  const result = await LayoutService.updateBanner(payload, layoutImage);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banner updated uccessfully",
    data: result,
  });
});

const editLayout = catchAsyncError(async (req: Request, res: Response) => {
  const payload = req.body;
  console.log(payload);

  const result = await LayoutService.editLayout(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Layout data updated uccessfully",
    data: result,
  });
});
const getLayout = catchAsyncError(async (req: Request, res: Response) => {
  const { type } = req.params;

  const result = await LayoutService.getLayout(type);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Layout retrieved uccessfully",
    data: result,
  });
});

export const LayoutController = {
  createLayout,
  updateBanner,
  editLayout,
  getLayout,
};
