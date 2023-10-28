import express from "express";
import { CourseController } from "./course.controller";
import singleUpload from "../../middleware/multer";
import auth, { ENUM_USER_ROLE, authorizeRoles } from "../../middleware/auth";

const router = express.Router();

router.post(
  "/create-course",
  auth,
  authorizeRoles(ENUM_USER_ROLE.ADMIN),
  singleUpload,
  CourseController.createCourse
);

router.patch(
  "/edit-course/:courseId",
  auth,
  authorizeRoles(ENUM_USER_ROLE.ADMIN),
  singleUpload,
  CourseController.editCourse
);
router.get(
  "/get-course/:courseId",
  singleUpload,
  CourseController.getSingleCourse
);

export const CourseRoutes = router;
