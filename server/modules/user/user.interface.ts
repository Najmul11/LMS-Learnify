import { Model, Types } from "mongoose";

export type TUser = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  avatar?: {
    publicId: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
};

export type TUserMethods = {
  comparePassword(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type TActivationRequest = {
  activationToken: string;
  activationCode: string;
};

export type TUserLogin = {
  email: string;
  password: string;
};

export type Usermodel = Model<TUser, Record<string, unknown>, TUserMethods>;
