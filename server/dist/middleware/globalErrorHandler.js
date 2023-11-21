"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorhandler = void 0;
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorhandler = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Internal server error";
    if (error.name === "castError") {
        const message = `Duplicate ${Object.keys(error.keyValue)} entered`;
        error = new ErrorHandler_1.default(400, message);
    }
    if (error.code === 11000) {
        const message = `Not found. InvalidId: ${error.path}`;
        error = new ErrorHandler_1.default(400, message);
    }
    if (error.name === "JsonWebTokenError") {
        const message = `Json web token is invalid, try again`;
        error = new ErrorHandler_1.default(400, message);
    }
    if (error.name === "TokenExpiredError") {
        const message = `Json web token is expired, try again`;
        error = new ErrorHandler_1.default(400, message);
    }
    res.status(http_status_1.default.BAD_REQUEST).json({
        success: false,
        message: error.message,
    });
    next();
};
exports.globalErrorhandler = globalErrorhandler;
