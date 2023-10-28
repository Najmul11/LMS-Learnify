import catchAsyncError from "../../utils/catchAsyncError";
import { Request, Response } from "express";
import { CourseService } from "./course.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createCourse = catchAsyncError(async (req: Request, res: Response) => {
  const courseInfo = req.body;
  const thumbnail = req.file;

  const result = await CourseService.createCourse(courseInfo, thumbnail);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course created successfully",
    data: result,
  });
});

const editCourse = catchAsyncError(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const payload = req.body;
  const thumbnail = req.file;

  const result = await CourseService.editCourse(courseId, payload, thumbnail);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course edited successfully",
    data: result,
  });
});

const getSingleCourse = catchAsyncError(async (req: Request, res: Response) => {
  const { courseId } = req.params;

  const result = await CourseService.getSingleCourse(courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course reteived successfully",
    data: result,
  });
});

export const CourseController = {
  createCourse,
  editCourse,
  getSingleCourse,
};
