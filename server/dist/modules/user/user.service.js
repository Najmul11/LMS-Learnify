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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ErrorHandler_1 = __importDefault(require("../../utils/ErrorHandler"));
const user_model_1 = require("./user.model");
const activationToken_1 = require("../../utils/activationToken");
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const sendMail_1 = require("../../utils/sendMail");
const jwtHelper_1 = require("../../jwt/jwtHelper");
const config_1 = __importDefault(require("../../config"));
const server_1 = require("../../server");
const bcrypt_1 = __importDefault(require("bcrypt"));
const cloudinaryHelper_1 = require("../../cloudinary/cloudinaryHelper");
const userRegistration = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = userInfo;
    if (!name || !email || !password)
        throw new ErrorHandler_1.default(http_status_1.default.BAD_REQUEST, "All fields are required");
    const isEmailExist = yield user_model_1.User.findOne({ email });
    if (isEmailExist)
        throw new ErrorHandler_1.default(http_status_1.default.BAD_REQUEST, "Email already exist");
    const activationToken = yield activationToken_1.activationTokenHelper.createActivationToken(userInfo);
    const { activationCode, token } = activationToken;
    const data = { user: { name: userInfo.name }, activationCode };
    const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, "../../ejs/activationMail.ejs"), data);
    yield sendMail_1.nodemailerHelper.sendEmail({
        email: userInfo.email,
        subject: "Activate your account",
        data,
        template: "activationMail.ejs",
    });
    return { token, activationCode };
});
const socialAuth = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, avatar } = userInfo;
    let user = yield user_model_1.User.findOne({ email });
    if (!user) {
        user = yield user_model_1.User.create({
            name,
            email,
            avatar,
        });
        user = yield user_model_1.User.findOne({ email });
    }
    const { refreshToken, accessToken, accessTokenOptions, refreshTokenOptions } = yield jwtHelper_1.jwtHelpers.sendToken(user);
    return {
        refreshToken,
        accessToken,
        accessTokenOptions,
        refreshTokenOptions,
        user,
    };
});
const activateUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { activationCode, activationToken } = payload;
    const newUser = yield jwtHelper_1.jwtHelpers.verifyToken(activationToken, config_1.default.activaton);
    if ((newUser === null || newUser === void 0 ? void 0 : newUser.activationCode) !== activationCode)
        throw new ErrorHandler_1.default(http_status_1.default.BAD_REQUEST, "Invalid activation code");
    const { name, email, password } = newUser.user;
    const existUser = yield user_model_1.User.findOne({ email });
    if (existUser)
        throw new ErrorHandler_1.default(http_status_1.default.BAD_REQUEST, "Email already exist");
    const result = yield user_model_1.User.create({
        name,
        email,
        password,
    });
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    if (!email || !password)
        throw new ErrorHandler_1.default(http_status_1.default.BAD_REQUEST, "Please enter all fields");
    const user = new user_model_1.User();
    const existedUser = yield user_model_1.User.findOne({ email }, { password: 1 });
    const sanitizedUser = yield user_model_1.User.findOne({ email });
    if (!existedUser || !sanitizedUser)
        throw new ErrorHandler_1.default(http_status_1.default.NOT_FOUND, "Invalid email or password");
    const isPasswordMatched = yield user.comparePassword(password, existedUser.password);
    if (!isPasswordMatched)
        throw new ErrorHandler_1.default(http_status_1.default.BAD_REQUEST, "Invalid password");
    const { refreshToken, accessToken, accessTokenOptions, refreshTokenOptions } = yield jwtHelper_1.jwtHelpers.sendToken(sanitizedUser);
    return {
        sanitizedUser,
        accessToken,
        refreshToken,
        accessTokenOptions,
        refreshTokenOptions,
    };
});
const updateAccessToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jwtHelper_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    if (!decoded)
        throw new ErrorHandler_1.default(http_status_1.default.NOT_FOUND, "Could not get refresh token");
    const session = yield server_1.redis.get(decoded.id);
    if (!session)
        throw new ErrorHandler_1.default(http_status_1.default.NOT_FOUND, "Please login");
    const user = JSON.parse(session);
    const { refreshToken, accessToken, accessTokenOptions, refreshTokenOptions } = yield jwtHelper_1.jwtHelpers.sendToken(user);
    yield server_1.redis.setex(user._id, 604800, JSON.stringify(user));
    return {
        refreshToken,
        accessToken,
        accessTokenOptions,
        refreshTokenOptions,
        user,
    };
});
const getUserInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id).populate({
        path: "courses.courseId",
        model: "Course",
    });
    return result;
});
const updateUserInfo = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = payload;
    const user = yield user_model_1.User.findById(userId);
    if (!user)
        throw new ErrorHandler_1.default(http_status_1.default.NOT_FOUND, "User not found");
    if (name)
        user.name = name;
    yield (user === null || user === void 0 ? void 0 : user.save());
    yield server_1.redis.set(userId, JSON.stringify(user));
    return user;
});
const updatePassword = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    if (!oldPassword || !newPassword)
        throw new ErrorHandler_1.default(http_status_1.default.BAD_REQUEST, "Enter old password and new password");
    const user = new user_model_1.User();
    const existUser = yield user_model_1.User.findById(userId).select("+password");
    if (!(existUser === null || existUser === void 0 ? void 0 : existUser.password))
        throw new ErrorHandler_1.default(http_status_1.default.BAD_REQUEST, "Invalid user");
    const isPasswordMatched = yield (user === null || user === void 0 ? void 0 : user.comparePassword(oldPassword, existUser.password));
    if (!isPasswordMatched)
        throw new ErrorHandler_1.default(http_status_1.default.BAD_REQUEST, "Old password is incorrect");
    const hashPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bcrypt_salt_round));
    const result = yield user_model_1.User.findByIdAndUpdate(userId, { password: hashPassword }, { new: true }).select("-password");
    yield server_1.redis.set(userId, JSON.stringify(result));
    return result;
});
const updateProfilePicture = (avatar, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_model_1.User.findById(userId);
    if ((_a = user === null || user === void 0 ? void 0 : user.avatar) === null || _a === void 0 ? void 0 : _a.publicId)
        yield cloudinaryHelper_1.cloudinaryHelper.deleteFromCloudinary(user.avatar.publicId);
    const uploadedAvatar = yield cloudinaryHelper_1.cloudinaryHelper.uploadToCloudinary(avatar, "learnify/avatars");
    const dataToUpload = {
        $set: {
            avatar: {
                publicId: uploadedAvatar === null || uploadedAvatar === void 0 ? void 0 : uploadedAvatar.publicId,
                url: uploadedAvatar === null || uploadedAvatar === void 0 ? void 0 : uploadedAvatar.url,
            },
        },
    };
    const result = yield user_model_1.User.findByIdAndUpdate(userId, dataToUpload, {
        new: true,
    });
    server_1.redis.set(userId, JSON.stringify(result));
    return result;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find().sort({ createdAt: -1 });
    return result;
});
const updateRole = (userEmail, role) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: userEmail });
    if (!user)
        throw new ErrorHandler_1.default(http_status_1.default.NOT_FOUND, "User not found");
    user.role = role;
    yield user.save();
    return user;
});
const deleteUser = (userId, usingId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user)
        throw new ErrorHandler_1.default(http_status_1.default.NOT_FOUND, "User not found");
    if (userId === usingId)
        throw new ErrorHandler_1.default(http_status_1.default.BAD_REQUEST, "you can't delete yourself");
    const result = yield user_model_1.User.findByIdAndDelete(userId);
    yield server_1.redis.del(userId);
    return result;
});
exports.UserService = {
    userRegistration,
    activateUser,
    loginUser,
    updateAccessToken,
    getUserInfo,
    socialAuth,
    updateUserInfo,
    updatePassword,
    updateProfilePicture,
    getAllUsers,
    updateRole,
    deleteUser,
};
