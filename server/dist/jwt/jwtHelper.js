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
exports.jwtHelpers = void 0;
/* eslint-disable no-console */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const server_1 = require("../server");
const createOption = (tokenExpire) => {
    return {
        expires: new Date(Date.now() + tokenExpire * 1000 * 60 * 60 * 24),
        maxAge: tokenExpire * 1000 * 60 * 60 * 24,
        httpOnly: true,
        // development sameSite "lax", production "none"
        sameSite: "none",
        // secure true in production
        secure: true,
    };
};
const createToken = (payload, secret, expireTime) => {
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: expireTime });
};
const sendToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    yield server_1.redis.set(user._id, JSON.stringify(user));
    const accessToken = createToken({ id: user._id }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = createToken({ id: user._id }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    const cookieExpire = Number(config_1.default.cookie.access_expire);
    const cookieRefreshExpire = Number(config_1.default.cookie.refresh_expire);
    const accessTokenOptions = createOption(cookieExpire);
    const refreshTokenOptions = createOption(cookieRefreshExpire);
    if (config_1.default.env === "production")
        accessTokenOptions.secure = true;
    return {
        accessTokenOptions,
        refreshTokenOptions,
        accessToken,
        refreshToken,
    };
});
const verifyToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.jwtHelpers = {
    sendToken,
    verifyToken,
    createToken,
};
