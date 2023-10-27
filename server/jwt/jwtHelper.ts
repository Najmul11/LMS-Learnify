/* eslint-disable no-console */
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../config";
import { TTokenOptons } from "./jwt.interface";
import { TUser } from "../modules/user/user.interface";
import { redis } from "../server";

const createOption = (tokenExpire: number) => {
  return {
    expires: new Date(Date.now() + tokenExpire * 1000),
    maxAge: tokenExpire * 1000,
    httpOnly: true,
    sameSite: "lax",
  };
};

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret
): string => {
  return jwt.sign(payload, secret);
};

const sendToken = async (user: TUser) => {
  redis.set(user._id as string, JSON.stringify(user));

  const accessToken = createToken(
    { id: user._id },
    config.jwt.secret as Secret
  );
  const refreshToken = createToken(
    { id: user._id },
    config.jwt.refresh_secret as Secret
  );

  const accessTokenExpire = Number(config.jwt.expires_in);
  const refreshTokenExpire = Number(config.jwt.refresh_expires_in);

  const accessTokenOptions: TTokenOptons = createOption(accessTokenExpire);
  const refreshTokenOptions: TTokenOptons = createOption(refreshTokenExpire);

  if (config.env === "production") accessTokenOptions.secure = true;

  return {
    accessTokenOptions,
    refreshTokenOptions,
    accessToken,
    refreshToken,
  };
};

const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  sendToken,
  verifyToken,
};
