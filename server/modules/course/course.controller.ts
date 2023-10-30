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

const getAllCourse = catchAsyncError(async (req: Request, res: Response) => {
  const result = await CourseService.getAllCourse();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Courses reteived successfully",
    data: result,
  });
});
const getCourseByUser = catchAsyncError(async (req: Request, res: Response) => {
  const user = req.user;
  const { courseId } = req.params;
  const result = await CourseService.getCourseByUser(user!, courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course content reteived successfully",
    data: result,
  });
});
const addQuestion = catchAsyncError(async (req: Request, res: Response) => {
  const user = req.user;
  const payload = req.body;
  const result = await CourseService.addQuestion(payload, user?._id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Question has been asked successfully",
    data: result,
  });
});

const addAnswer = catchAsyncError(async (req: Request, res: Response) => {
  const user = req.user;
  const payload = req.body;
  const result = await CourseService.addAnswer(payload, user?._id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Answer added successfully",
    data: result,
  });
});
const addReview = catchAsyncError(async (req: Request, res: Response) => {
  const user = req.user;
  const payload = req.body;
  const { courseId } = req.params;
  const result = await CourseService.addReview(payload, courseId, user!);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review added successfully",
    data: result,
  });
});
const addReplyToReview = catchAsyncError(
  async (req: Request, res: Response) => {
    const user = req.user;
    const payload = req.body;
    const result = await CourseService.addReplyToReview(payload, user!);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Replied to the review successfully",
      data: result,
    });
  }
);

const getAllCourses = catchAsyncError(async (req: Request, res: Response) => {
  const result = await CourseService.getAllCourses();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All courses retrieved successfully",
    data: result,
  });
});

const deleteCourse = catchAsyncError(async (req: Request, res: Response) => {
  const { courseId } = req.params;

  const result = await CourseService.deleteCourse(courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course deleted successfully",
    data: result,
  });
});

export const CourseController = {
  createCourse,
  editCourse,
  getSingleCourse,
  getAllCourse,
  getCourseByUser,
  addQuestion,
  addAnswer,
  addReview,
  addReplyToReview,
  getAllCourses,
  deleteCourse,
};
