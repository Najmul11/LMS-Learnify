"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/user/user.routes");
const course_route_1 = require("../modules/course/course.route");
const order_route_1 = require("../modules/order/order.route");
const notification_route_1 = require("../modules/notification/notification.route");
const layout_route_1 = require("../modules/layout/layout.route");
const analytics_route_1 = require("../modules/analytics/analytics.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/users",
        route: user_routes_1.UserRoutes,
    },
    {
        path: "/courses",
        route: course_route_1.CourseRoutes,
    },
    {
        path: "/orders",
        route: order_route_1.OrderRoutes,
    },
    {
        path: "/notifications",
        route: notification_route_1.NotificationRoutes,
    },
    {
        path: "/layout",
        route: layout_route_1.LayoutRoutes,
    },
    {
        path: "/analytics",
        route: analytics_route_1.AnalyticsRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.routes = router;
