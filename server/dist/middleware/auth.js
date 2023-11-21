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
exports.authorizeRoles = exports.ENUM_USER_ROLE = exports.auth = void 0;
const catchAsyncError_1 = __importDefault(require("../utils/catchAsyncError"));
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const http_status_1 = __importDefault(require("http-status"));
const jwtHelper_1 = require("../jwt/jwtHelper");
const config_1 = __importDefault(require("../config"));
const server_1 = require("../server");
exports.auth = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const access_token = req.cookies.access_token;
    if (!access_token)
        throw new ErrorHandler_1.default(http_status_1.default.NOT_FOUND, "Please login to access this resource");
    const decoded = jwtHelper_1.jwtHelpers.verifyToken(access_token, config_1.default.jwt.secret);
    if (!decoded)
        throw new ErrorHandler_1.default(http_status_1.default.NOT_FOUND, "Access token is not valid");
    const user = yield server_1.redis.get(decoded.id);
    if (!user)
        throw new ErrorHandler_1.default(http_status_1.default.NOT_FOUND, "Please login");
    req.user = JSON.parse(user);
    next();
}));
var ENUM_USER_ROLE;
(function (ENUM_USER_ROLE) {
    ENUM_USER_ROLE["ADMIN"] = "admin";
    ENUM_USER_ROLE["USER"] = "user";
    ENUM_USER_ROLE["SUPER_ADMIN"] = "super admin";
})(ENUM_USER_ROLE || (exports.ENUM_USER_ROLE = ENUM_USER_ROLE = {}));
const authorizeRoles = (...requiredRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (requiredRoles.length && !requiredRoles.includes((_a = req.user) === null || _a === void 0 ? void 0 : _a.role)) {
            throw new ErrorHandler_1.default(http_status_1.default.FORBIDDEN, `Role: ${(_b = req.user) === null || _b === void 0 ? void 0 : _b.role} is not allowed access this resources `);
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.authorizeRoles = authorizeRoles;
exports.default = exports.auth;
