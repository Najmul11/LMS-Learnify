"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const course_controller_1 = require("./course.controller");
const multer_1 = __importDefault(require("../../middleware/multer"));
const auth_1 = __importStar(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post("/create-course", auth_1.default, (0, auth_1.authorizeRoles)(auth_1.ENUM_USER_ROLE.ADMIN), multer_1.default, course_controller_1.CourseController.createCourse);
router.patch("/edit-course/:courseId", auth_1.default, (0, auth_1.authorizeRoles)(auth_1.ENUM_USER_ROLE.ADMIN), multer_1.default, course_controller_1.CourseController.editCourse);
router.get("/get-course/:courseId", course_controller_1.CourseController.getSingleCourse);
router.get("/get-courses", course_controller_1.CourseController.getAllCourse);
router.get("/get-course-content/:courseId", auth_1.default, course_controller_1.CourseController.getCourseByUser);
router.patch("/add-question", auth_1.default, course_controller_1.CourseController.addQuestion);
router.patch("/add-answer", auth_1.default, course_controller_1.CourseController.addAnswer);
router.patch("/add-review/:courseId", auth_1.default, course_controller_1.CourseController.addReview);
router.get("/get-all-courses", auth_1.default, (0, auth_1.authorizeRoles)(auth_1.ENUM_USER_ROLE.ADMIN), course_controller_1.CourseController.getAllCourses);
router.post("/get-vdocipherOTP", course_controller_1.CourseController.generateVideoUrl);
router.delete("/delete-course/:courseId", auth_1.default, (0, auth_1.authorizeRoles)(auth_1.ENUM_USER_ROLE.ADMIN), course_controller_1.CourseController.deleteCourse);
exports.CourseRoutes = router;
