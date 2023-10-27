import httpStatus from "http-status";
import ErrorHandler from "../../utils/ErrorHandler";
import { TActivationRequest, TUser, TUserLogin } from "./user.interface";
import { User } from "./user.model";
import { activationTokenHelper } from "../../utils/activationToken";
import ejs from "ejs";
import path from "path";
import { nodemailerHelper } from "../../utils/sendMail";
import { jwtHelpers } from "../../jwt/jwtHelper";
import config from "../../config";

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

export const UserService = {
  userRegistration,
  activateUser,
  loginUser,
};
