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
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ErrorHandler_1 = __importDefault(require("../../utils/ErrorHandler"));
const user_model_1 = require("../user/user.model");
const courese_model_1 = require("../course/courese.model");
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const sendMail_1 = require("../../utils/sendMail");
const notification_model_1 = require("../notification/notification.model");
const order_model_1 = require("./order.model");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
const server_1 = require("../../server");
const stripe = require("stripe")(config_1.default.stripe_secret);
const createOrder = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId, paymentInfo } = payload;
    if (!courseId)
        throw new ErrorHandler_1.default(http_status_1.default.NOT_FOUND, "Please provide Course id");
    if (paymentInfo) {
        if ("id" in paymentInfo) {
            const paymentIntentId = paymentInfo.id;
            const paymentIntent = yield stripe.paymentIntents.retrieve(paymentIntentId);
            if (paymentIntent.status !== "succeeded") {
                throw new ErrorHandler_1.default(http_status_1.default.UNAUTHORIZED, "Payment not authorized!");
            }
        }
    }
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const user = yield user_model_1.User.findById(userId);
        if (!user)
            throw new ErrorHandler_1.default(http_status_1.default.NOT_FOUND, "User not found");
        const courseExist = user === null || user === void 0 ? void 0 : user.courses.find((course) => course.courseId.toString() === (courseId === null || courseId === void 0 ? void 0 : courseId.toString()));
        if (courseExist)
            throw new ErrorHandler_1.default(http_status_1.default.BAD_REQUEST, "You have already purchased this course");
        const course = yield courese_model_1.Course.findById(courseId);
        if (!course)
            throw new ErrorHandler_1.default(http_status_1.default.NOT_FOUND, "Course not found");
        const data = {
            courseId: course._id,
            userId: user._id,
            paymentInfo,
        };
        const order = yield order_model_1.Order.create([data], { session });
        if (course) {
            course.purchased = course.purchased + 1;
        }
        yield course.save({ session });
        yield server_1.redis.setex(courseId, 604800, JSON.stringify(course));
        const mailData = {
            order: {
                _id: course._id.toString().slice(0, 6),
                name: course.name,
                price: course.price,
                date: new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
            },
        };
        const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, "../../ejs/orderConfirm.ejs"), mailData);
        if (user) {
            yield sendMail_1.nodemailerHelper.sendEmail({
                email: user.email,
                subject: "Order Confirmation",
                data: mailData,
                template: "orderConfirm.ejs",
            });
        }
        user.courses.push({ courseId: course._id.toString() });
        yield server_1.redis.set(userId, JSON.stringify(user));
        yield user.save({ session });
        yield notification_model_1.Notification.create([
            {
                userId: user._id,
                title: "New Order",
                message: `You have a new Order from ${course === null || course === void 0 ? void 0 : course.name}`,
            },
        ], { session });
        yield session.commitTransaction();
        session.endSession();
        return { order: order[0] };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find().sort({ createdAt: -1 }).populate({
        path: "userId",
        model: "User",
        select: "name",
    });
    return result;
});
// get stripe publish key
const getStripeKey = () => __awaiter(void 0, void 0, void 0, function* () {
    return { publishableKey: config_1.default.stripe_publish };
});
// new payment
const newPayment = (amount) => __awaiter(void 0, void 0, void 0, function* () {
    const myPayment = yield stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "USD",
        metadata: {
            company: "Learnify",
        },
        automatic_payment_methods: {
            enabled: true,
        },
    });
    return { client_secret: myPayment.client_secret };
});
exports.OrderService = {
    createOrder,
    getAllOrders,
    getStripeKey,
    newPayment,
};
