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
exports.CourseService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ErrorHandler_1 = __importDefault(require("../../utils/ErrorHandler"));
const cloudinaryHelper_1 = require("../../cloudinary/cloudinaryHelper");
const courese_model_1 = require("./courese.model");
const server_1 = require("../../server");
const mongoose_1 = __importDefault(require("mongoose"));
const sendMail_1 = require("../../utils/sendMail");
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const user_model_1 = require("../user/user.model");
const notification_model_1 = require("../notification/notification.model");
const createCourse = (courseInfo, thumbnail) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, tags, level, demoUrl, benefits, prerequisites, courseData, } = courseInfo;
    courseInfo.benefits = JSON.parse(benefits);
    courseInfo.prerequisites = JSON.parse(prerequisites);
    courseInfo.courseData = JSON.parse(courseData);
    if (!name || !description || !price || !tags || !level || !demoUrl) {
        throw new ErrorHandler_1.default(http_status_1.default.BAD_REQUEST, "Required properties are missing in courseInfo.");
    }
    if (!thumbnail)
        throw new ErrorHandler_1.default(http_status_1.default.BAD_REQUEST, "Must provide course thumbnail.");
    const uploadedThumbnail = yield cloudinaryHelper_1.cloudinaryHelper.uploadToCloudinary(thumbnail, "learnify/courses/thumbnails");
    courseInfo.thumbnail = uploadedThumbnail;
    const result = yield courese_model_1.Course.create(courseInfo);
    return result;
});
const editCourse = (courseId, payload, thumbnail) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { benefits, prerequisites, courseData } = payload;
    payload.benefits = JSON.parse(benefits);
    payload.prerequisites = JSON.parse(prerequisites);
    payload.courseData = JSON.parse(courseData);
    const course = yield courese_model_1.Course.findById(courseId);
    if (!course)
        throw new ErrorHandler_1.default(http_status_1.default.NOT_FOUND, "Course not found");
    if (thumbnail && typeof thumbnail !== "string") {
        yield cloudinaryHelper_1.cloudinaryHelper.deleteFromCloudinary((_a = course.thumbnail) === null || _a === void 0 ? void 0 : _a.publicId);
        const updatedThumbnail = yield cloudinaryHelper_1.cloudinaryHelper.uploadToCloudinary(thumbnail, "courses");
        payload.thumbnail = updatedThumbnail;
    }
    else {
        payload.thumbnail = course.thumbnail;
    }
    const result = yield courese_model_1.Course.findByIdAndUpdate(courseId, payload, {
        new: true,
    });
    // need to update on redis for all course after edit course
    const allCourse = yield courese_model_1.Course.find().select("-courseData.videoUrl -courseData.videoSection -courseData.links -courseData.course");
    yield server_1.redis.set("allCourse", JSON.stringify(allCourse));
    return result;
});
// get single course without purchase
const getSingleCourse = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const isCacheExist = yield server_1.redis.get(courseId);
    if (isCacheExist) {
        const course = JSON.parse(isCacheExist);
        return course;
    }
    const course = yield courese_model_1.Course.findById(courseId)
        .select("-courseData.videoUrl  -courseData.links -courseData.course -courseData.description")
        .populate({
        path: "reviews.user",
        model: "User",
        select: "name",
    });
    if (!course)
        throw new ErrorHandler_1.default(http_status_1.default.NOT_FOUND, "Course not found");
    yield server_1.redis.setex(courseId, 604800, JSON.stringify(course));
    return course;
});
// get all course without purchase
const getAllCourse = () => __awaiter(void 0, void 0, void 0, function* () {
    const cachedData = yield server_1.redis.get("allCourse");
    if (cachedData) {
        return JSON.parse(cachedData);
    }
    const result = yield courese_model_1.Course.find({}).select("-courseData.videoUrl -courseData.videoSection -courseData.links -courseData.course");
    yield server_1.redis.set("allCourse", JSON.stringify(result));
    return result;
});
const getCourseByUser = (user, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const courseList = user.courses;
    const courseExist = courseList.find((course) => course.courseId.toString() === courseId);
    if (!courseExist)
        throw new ErrorHandler_1.default(http_status_1.default.NOT_FOUND, "You are not eligible to access this course");
    const result = yield courese_model_1.Course.findById(courseId, { courseData: 1, reviews: 1 })
        .populate({
        path: "courseData.questions.user",
        model: "User",
        select: "name avatar",
    })
        .populate({
        path: "courseData.questions.questionReplies.user",
        model: "User",
        select: "name avatar role",
    })
        .populate({
        path: "reviews.user",
        model: "User",
        select: "name avatar",
    });
    return result;
});
const addQuestion = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId, contentId, question } = payload;
    const course = yield courese_model_1.Course.findById(courseId);
    if (!course)
        throw new ErrorHandler_1.default(http_status_1.default.NOT_FOUND, "Course not found");
    const courseContent = course.courseData.find((course) => course._id.equals(contentId));
    if (!courseContent)
        throw new ErrorHandler_1.default(http_status_1.default.NOT_FOUND, "Invalid content id");
    const newQuestion = {
        user: new mongoose_1.default.Types.ObjectId(userId),
        question: question,
        questionReplies: [],
    };
    courseContent.questions.push(newQuestion);
    yield course.save();
    yield notification_model_1.Notification.create({
        userId: userId,
        title: "New question",
        message: `You have a new question in ${courseContent === null || courseContent === void 0 ? void 0 : courseContent.title}`,
    });
    return course;
});
const addAnswer = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { courseId, contentId, answer, questionId } = payload;
    const course = yield courese_model_1.Course.findById(courseId);
    if (!course)
        throw new ErrorHandler_1.default(http_status_1.default.NOT_FOUND, "Course not found");
    const courseContent = course.courseData.find((course) => course._id.equals(contentId));
    if (!courseContent)
        throw new ErrorHandler_1.default(http_status_1.default.NOT_FOUND, "Invalid content id");
    const question = courseContent === null || courseContent === void 0 ? void 0 : courseContent.questions.find((content) => content._id.equals(questionId));
    if (!question)
        throw new ErrorHandler_1.default(http_status_1.default.NOT_FOUND, "Invalid question id");
    const newAnswer = {
        user: new mongoose_1.default.Types.ObjectId(userId),
        answer: answer,
    };
    question.questionReplies.push(newAnswer);
    yield (course === null || course === void 0 ? void 0 : course.save());
    if (userId === ((_b = question.user) === null || _b === void 0 ? void 0 : _b.toString())) {
        yield notification_model_1.Notification.create({
            userId: userId,
            title: "New Question Reply Recieved",
            message: `You have a new question reply in ${courseContent === null || courseContent === void 0 ? void 0 : courseContent.title}`,
        });
    }
    else {
        const user = yield user_model_1.User.findById(question.user);
        if (user) {
            const data = { name: user.name, title: courseContent.title };
            const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, "../../ejs/questionReply.ejs"), data);
            yield sendMail_1.nodemailerHelper.sendEmail({
                email: user.email,
                subject: "Question Reply",
                data,
                template: "questionReply.ejs",
            });
        }
    }
    return course;
});
const addReview = (payload, courseId, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userCourseList = user.courses;
    const courseExist = userCourseList.find((course) => (course === null || course === void 0 ? void 0 : course.courseId.toString()) === courseId);
    if (!courseExist)
        throw new ErrorHandler_1.default(http_status_1.default.UNAUTHORIZED, "You are not elligible to access this course");
    const course = yield courese_model_1.Course.findById(courseId);
    let review = course === null || course === void 0 ? void 0 : course.reviews.find((review) => review.user.toString() === user._id);
    const newReview = {
        user: new mongoose_1.default.Types.ObjectId(user._id),
        comment: payload === null || payload === void 0 ? void 0 : payload.comment,
        rating: payload === null || payload === void 0 ? void 0 : payload.rating,
    };
    if (review) {
        review.comment = newReview.comment;
        review.rating = newReview.rating ? newReview.rating : review.rating;
    }
    else {
        course === null || course === void 0 ? void 0 : course.reviews.push(newReview);
    }
    const sum = course === null || course === void 0 ? void 0 : course.reviews.reduce((prev, current) => prev + ((current === null || current === void 0 ? void 0 : current.rating) || 0), 0);
    const average = sum / (((_c = course === null || course === void 0 ? void 0 : course.reviews) === null || _c === void 0 ? void 0 : _c.length) || 1);
    if (course)
        course.ratings = average;
    console.log(user);
    yield (course === null || course === void 0 ? void 0 : course.save());
    const notification = {
        userId: user === null || user === void 0 ? void 0 : user._id,
        title: "New Review Received",
        message: `${user.name} has given a review in ${course === null || course === void 0 ? void 0 : course.name}`,
    };
    yield notification_model_1.Notification.create(notification);
    return course;
});
// for admin
const getAllCourses = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield courese_model_1.Course.find().sort({ createdAt: -1 });
    return result;
});
const deleteCourse = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield courese_model_1.Course.findById(courseId);
    if (!course)
        throw new ErrorHandler_1.default(http_status_1.default.NOT_FOUND, "Course not found");
    const result = yield courese_model_1.Course.findByIdAndDelete(courseId);
    yield server_1.redis.del(courseId);
    return result;
});
exports.CourseService = {
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
};
