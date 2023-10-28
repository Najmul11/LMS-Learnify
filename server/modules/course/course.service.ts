import httpStatus from "http-status";
import ErrorHandler from "../../utils/ErrorHandler";
import { TAnswer, TCourse, TQuestion } from "./course.interface";
import { cloudinaryHelper } from "../../cloudinary/cloudinaryHelper";
import { Course } from "./courese.model";
import { redis } from "../../server";
import { TUser } from "../user/user.interface";
import { JwtPayload } from "jsonwebtoken";
import mongoose, { ObjectId, Types } from "mongoose";

const createCourse = async (
  courseInfo: TCourse,
  thumbnail: Express.Multer.File | undefined
) => {
  const { name, description, price, tags, level, demoUrl } = courseInfo;

  if (!name || !description || !price || !tags || !level || !demoUrl) {
    throw new ErrorHandler(
      httpStatus.BAD_REQUEST,
      "Required properties are missing in courseInfo."
    );
  }

  //   if (!thumbnail)
  //     throw new ErrorHandler(
  //       httpStatus.BAD_REQUEST,
  //       "Must provide course thumbnail."
  //     );

  const uploadedThumbnail = await cloudinaryHelper.uploadToCloudinary(
    thumbnail,
    "courses"
  );

  courseInfo.thumbnail = uploadedThumbnail!;

  const result = await Course.create(courseInfo);
  return result;
};

const editCourse = async (
  courseId: string,
  payload: Partial<TCourse>,
  thumbnail: Express.Multer.File | undefined
) => {
  const course = await Course.findById(courseId);
  if (!course) throw new ErrorHandler(httpStatus.NOT_FOUND, "Course not found");

  if (thumbnail) {
    await cloudinaryHelper.deleteFromCloudinary(course.thumbnail?.publicId);

    const updatedThumbnail = await cloudinaryHelper.uploadToCloudinary(
      thumbnail,
      "courses"
    );

    payload.thumbnail = updatedThumbnail!;
  }

  const result = await Course.findByIdAndUpdate(courseId, payload, {
    new: true,
  });
  return result;
};

// get single course without purchase
const getSingleCourse = async (courseId: string) => {
  const isCacheExist = await redis.get(courseId);

  if (isCacheExist) {
    const course = JSON.parse(isCacheExist);
    return course;
  }

  const course = await Course.findById(courseId).select("-courseData");

  if (!course) throw new ErrorHandler(httpStatus.NOT_FOUND, "Course not found");

  await redis.set(courseId, JSON.stringify(course));

  return course;
};

// get all course without purchase
const getAllCourse = async () => {
  const cachedData = await redis.get("allCourse");

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const result = await Course.find({}).select("-courseData");

  await redis.set("allCourse", JSON.stringify(result));

  return result;
};

const getCourseByUser = async (user: JwtPayload, courseId: string) => {
  const courseList = user.courses;

  const courseExist = courseList.find(
    (course: any) => course.courseId.toString() === courseId
  );

  if (!courseExist)
    throw new ErrorHandler(
      httpStatus.NOT_FOUND,
      "You are not eligible to access this course"
    );

  const result = await Course.findById(courseId, { courseData: 1 });

  return result;
};

const addQuestion = async (payload: TQuestion, userId: string) => {
  const { courseId, contentId, question } = payload;

  const course = await Course.findById(courseId);

  if (!course) throw new ErrorHandler(httpStatus.NOT_FOUND, "Course not found");

  const courseContent = course.courseData.find((course) =>
    course._id.equals(contentId)
  );

  if (!courseContent)
    throw new ErrorHandler(httpStatus.NOT_FOUND, "Invalid content id");

  const newQuestion = {
    user: new mongoose.Types.ObjectId(userId),
    question: question,
    questionsReplies: [],
  };

  courseContent.questions.push(newQuestion);
  await course.save();
};

const addAnswer = async (payload: TAnswer, userId: string) => {
  const { courseId, contentId, answer, questionId } = payload;

  const course = await Course.findById(courseId);

  if (!course) throw new ErrorHandler(httpStatus.NOT_FOUND, "Course not found");

  const courseContent = course.courseData.find((course) =>
    course._id.equals(contentId)
  );

  if (!courseContent)
    throw new ErrorHandler(httpStatus.NOT_FOUND, "Invalid content id");

  const question = courseContent?.questions.find((content) =>
    content._id!.equals(questionId)
  );

  if (!question)
    throw new ErrorHandler(httpStatus.NOT_FOUND, "Invalid question id");

  const newAnswer = {
    user: new mongoose.Types.ObjectId(userId),
    answer: answer,
  };

  question.questionsReplies.push(newAnswer);
  await course.save();
};

export const CourseService = {
  createCourse,
  editCourse,
  getSingleCourse,
  getAllCourse,
  getCourseByUser,
  addQuestion,
  addAnswer,
};
