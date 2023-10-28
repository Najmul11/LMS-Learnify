import httpStatus from "http-status";
import ErrorHandler from "../../utils/ErrorHandler";
import { TCourse } from "./course.interface";
import { cloudinaryHelper } from "../../cloudinary/cloudinaryHelper";
import { Course } from "./courese.model";

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

const getSingleCourse = async (courseId: string) => {
  const course = await Course.findById(courseId).select("-courseData");
  if (!course) throw new ErrorHandler(httpStatus.NOT_FOUND, "Course not found");

  return course;
};

export const CourseService = {
  createCourse,
  editCourse,
  getSingleCourse,
};
