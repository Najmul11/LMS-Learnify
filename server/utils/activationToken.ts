import config from "../config";
import { TUser } from "../modules/user/user.interface";
import jwt, { Secret } from "jsonwebtoken";
import ErrorHandler from "./ErrorHandler";
import httpStatus from "http-status";

type TActivationCode = {
  token: string;
  activationCode: string;
};

const createActivationToken = (user: TUser): TActivationCode => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    config.activaton as Secret,

    { expiresIn: "5m" }
  );

  return { token, activationCode };
};

export const activationTokenHelper = {
  createActivationToken,
};
