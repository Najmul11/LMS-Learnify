"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const mongoose_1 = require("mongoose");
const NotificationSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["read", "unread"],
        default: "unread",
    },
    userId: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.Notification = (0, mongoose_1.model)("Notification", NotificationSchema);
