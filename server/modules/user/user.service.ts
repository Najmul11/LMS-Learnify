import httpStatus from "http-status";
import ErrorHandler from "../../utils/ErrorHandler";
import {
  TActivationRequest,
  TSocialAuth,
  TUser,
  TUserLogin,
} from "./user.interface";
import { User } from "./user.model";
import { activationTokenHelper } from "../../utils/activationToken";
import ejs from "ejs";
import path from "path";
import { nodemailerHelper } from "../../utils/sendMail";
import { jwtHelpers } from "../../jwt/jwtHelper";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import { redis } from "../../server";

const userRegistration = async (userInfo: TUser) => {
  const { name, email, password } = userInfo;
  const isEmailExist = await User.findOne({ email });

  if (isEmailExist)
    throw new ErrorHandler(httpStatus.BAD_REQUEST, "Email already exist");

  const activationToken = await activationTokenHelper.createActivationToken(
    userInfo
  );
  const { activationCode, token } = activationToken;

  const data = { user: { name: userInfo.name }, activationCode };
  const html = await ejs.renderFile(
    path.join(__dirname, "../../ejs/activationMail.ejs"),
    data
  );

  await nodemailerHelper.sendEmail({
    email: userInfo.email,
    subject: "Activate your account",
    data,
    template: "activationMail.ejs",
  });

  return { token, activationCode };
};

const socialAuth = async (userInfo: TSocialAuth) => {
  const { email, name, avatar } = userInfo;
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      avatar,
      password: config.social_default_pass,
    });
    user = await User.findOne({ email });
  }

  const { refreshToken, accessToken, accessTokenOptions, refreshTokenOptions } =
    await jwtHelpers.sendToken(user!);

  return {
    refreshToken,
    accessToken,
    accessTokenOptions,
    refreshTokenOptions,
    user,
  };
};

const activateUser = async (payload: TActivationRequest) => {
  const { activationCode, activationToken } = payload;

  const newUser = await jwtHelpers.verifyToken(
    activationToken,
    config.activaton as string
  );

  if (newUser?.activationCode !== activationCode)
    throw new ErrorHandler(httpStatus.BAD_REQUEST, "Invalid activation code");

  const { name, email, password } = newUser.user;

  const existUser = await User.findOne({ email });
  if (existUser)
    throw new ErrorHandler(httpStatus.BAD_REQUEST, "Email already exist");

  const result = await User.create({
    name,
    email,
    password,
  });

  return result;
};

const loginUser = async (payload: TUserLogin) => {
  const { email, password } = payload;

  if (!email || !password)
    throw new ErrorHandler(httpStatus.BAD_REQUEST, "Please enter all fields");

  const user = new User();
  const existedUser = await User.findOne({ email }, { password: 1 });
  const sanitizedUser = await User.findOne({ email });

  if (!existedUser || !sanitizedUser)
    throw new ErrorHandler(httpStatus.NOT_FOUND, "Invalid email or password");

  const isPasswordMatched = await user.comparePassword(
    password,
    existedUser.password
  );

  if (!isPasswordMatched)
    throw new ErrorHandler(httpStatus.BAD_REQUEST, "Invalid password");

  const { refreshToken, accessToken, accessTokenOptions, refreshTokenOptions } =
    await jwtHelpers.sendToken(sanitizedUser);

  return {
    sanitizedUser,
    accessToken,
    refreshToken,
    accessTokenOptions,
    refreshTokenOptions,
  };
};

const updateAccessToken = async (token: string) => {
  const decoded = jwtHelpers.verifyToken(
    token,
    config.jwt.refresh_secret as Secret
  );

  if (!decoded)
    throw new ErrorHandler(httpStatus.NOT_FOUND, "Could not get refresh token");

  const session = await redis.get(decoded.id);
  if (!session) throw new ErrorHandler(httpStatus.NOT_FOUND, "Session expired");

  const user = JSON.parse(session);

  const { refreshToken, accessToken, accessTokenOptions, refreshTokenOptions } =
    await jwtHelpers.sendToken(user);

  return {
    refreshToken,
    accessToken,
    accessTokenOptions,
    refreshTokenOptions,
    user,
  };
};

const getUserInfo = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

const updateUserInfo = async (payload: Partial<TUser>, userId: string) => {
  const { name, email } = payload;
  const user = await User.findById(userId);

  if (email && user) {
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist)
      throw new ErrorHandler(httpStatus.BAD_REQUEST, "Email already exist");

    if (name) user.name = name;
  }

  await user?.save();
  await redis.set(userId, JSON.stringify(user));

  return user;
};

export const UserService = {
  userRegistration,
  activateUser,
  loginUser,
  updateAccessToken,
  getUserInfo,
  socialAuth,
  updateUserInfo,
};
