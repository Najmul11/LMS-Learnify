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
exports.NotificationService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ErrorHandler_1 = __importDefault(require("../../utils/ErrorHandler"));
const notification_model_1 = require("./notification.model");
const node_cron_1 = __importDefault(require("node-cron"));
const getNotifications = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notification_model_1.Notification.find().sort({ createdAt: -1 });
    return result;
});
const updateNotification = (notificationId) => __awaiter(void 0, void 0, void 0, function* () {
    const notification = yield notification_model_1.Notification.findById(notificationId);
    if (!notification)
        throw new ErrorHandler_1.default(http_status_1.default.NOT_FOUND, "Notification not found");
    notification.status = "read";
    yield notification.save();
    return notification;
});
exports.NotificationService = {
    getNotifications,
    updateNotification,
};
node_cron_1.default.schedule("0 0 0 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    yield notification_model_1.Notification.deleteMany({
        status: "read",
        createdAt: { $lt: thirtyDaysAgo },
    });
}));
