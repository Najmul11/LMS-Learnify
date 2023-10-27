import { CookieOptions, NextFunction, Request, Response } from "express";
import catchAsyncError from "../../utils/catchAsyncError";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const userRegistration = catchAsyncError(
  async (req: Request, res: Response) => {
    const userInfo = req.body;
    const result = await UserService.userRegistration(userInfo);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: "Please check your email to activate your account",
    });
  }
);
const activateUser = catchAsyncError(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await UserService.activateUser(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Your account activated successfully",
  });
});

const loginUser = catchAsyncError(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await UserService.loginUser(payload);
  const {
    accessToken,
    refreshToken,
    accessTokenOptions,
    refreshTokenOptions,
    sanitizedUser,
  } = result;

  res.cookie("access_token", accessToken, accessTokenOptions as CookieOptions);
  res.cookie(
    "refresh_token",
    refreshToken,
    refreshTokenOptions as CookieOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: { sanitizedUser, accessToken },
    message: "Logged in successfully",
  });
});

export const UserController = {
  userRegistration,
  activateUser,
  loginUser,
};
