/* eslint-disable no-unused-vars */

import { Model } from "mongoose";

export type TUser = {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  passwordHistory: {password: string, timestamps: Date}[];
  passwordChangeAt?: Date
};

export interface UserModel extends Model<TUser> {
    //instance methods for checking if the user exist
    isUserExistsUsername(id: string): Promise<TUser>;
    //instance methods for checking if passwords are matched
    isPasswordMatched(
      plainTextPassword: string,
      hashedPassword: string,
    ): Promise<boolean>;
    isJWTIssuedBeforePasswordChanged(
      passwordChangedTimestamp: Date,
      jwtIssuedTimestamp: number,
    ): boolean;
  }

export type TUserRole = 'user' | 'admin'

export type TLoginUser = {
    username: string,
    password: string
}