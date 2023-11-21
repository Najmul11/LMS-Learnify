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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const analytics_generator_1 = require("../../utils/analytics.generator");
const courese_model_1 = require("../course/courese.model");
const order_model_1 = require("../order/order.model");
const user_model_1 = require("../user/user.model");
const getUserAnalytics = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield analytics_generator_1.analyticsHelper.generateLast12MonthsData(user_model_1.User);
    return users;
});
const getCourseAnalytics = () => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield analytics_generator_1.analyticsHelper.generateLast12MonthsData(courese_model_1.Course);
    return course;
});
const getOrderAnalytics = () => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield analytics_generator_1.analyticsHelper.generateLast12MonthsData(order_model_1.Order);
    return order;
});
exports.AnalyticsService = {
    getUserAnalytics,
    getCourseAnalytics,
    getOrderAnalytics,
};
