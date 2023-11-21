"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const catchAsyncError_1 = __importDefault(require("../../utils/catchAsyncError"));
const course_service_1 = require("./course.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const axios_1 = __importDefault(require("axios"));
const ErrorHandler_1 = __importDefault(require("../../utils/ErrorHandler"));
const config_1 = __importDefault(require("../../config"));
const createCourse = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseInfo = req.body;
    const thumbnail = req.file;
    const result = yield course_service_1.CourseService.createCourse(courseInfo, thumbnail);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Course created successfully",
        data: result,
    });
}));
const editCourse = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const payload = req.body;
    const thumbnail = req.file;
    const result = yield course_service_1.CourseService.editCourse(courseId, payload, thumbnail);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Course edited successfully",
        data: result,
    });
}));
const getSingleCourse = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const result = yield course_service_1.CourseService.getSingleCourse(courseId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Course reteived successfully",
        data: result,
    });
}));
const getAllCourse = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.CourseService.getAllCourse();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Courses reteived successfully",
        data: result,
    });
}));
const getCourseByUser = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { courseId } = req.params;
    const result = yield course_service_1.CourseService.getCourseByUser(user, courseId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Course content reteived successfully",
        data: result,
    });
}));
const addQuestion = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const payload = req.body;
    const result = yield course_service_1.CourseService.addQuestion(payload, user === null || user === void 0 ? void 0 : user._id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Question has been asked successfully",
        data: result,
    });
}));
const addAnswer = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const payload = req.body;
    const result = yield course_service_1.CourseService.addAnswer(payload, user === null || user === void 0 ? void 0 : user._id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Answer added successfully",
        data: result,
    });
}));
const addReview = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const payload = req.body;
    const { courseId } = req.params;
    const result = yield course_service_1.CourseService.addReview(payload, courseId, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Review added successfully",
        data: result,
    });
}));
const getAllCourses = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.CourseService.getAllCourses();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All courses retrieved successfully",
        data: result,
    });
}));
const deleteCourse = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const result = yield course_service_1.CourseService.deleteCourse(courseId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Course deleted successfully",
        data: result,
    });
}));
const generateVideoUrl = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { videoId, email } = req.body;
        const response = yield axios_1.default.post(`https://dev.vdocipher.com/api/videos/${videoId}/otp`, {
            ttl: 30000,
            annotate: JSON.stringify([
                {
                    type: "rtext",
                    text: email ? email : "",
                    alpha: "0.70",
                    color: "#FF0000",
                    size: "17",
                    interval: "5000",
                },
            ]),
        }, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Apisecret ${config_1.default.cipher}`,
            },
        });
        res.json(response.data);
    }
    catch (error) {
        throw new ErrorHandler_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
}));
exports.CourseController = {
    createCourse,
    editCourse,
    getSingleCourse,
    getAllCourse,
    getCourseByUser,
    addQuestion,
    addAnswer,
    addReview,
    getAllCourses,
    deleteCourse,
    generateVideoUrl,
};
