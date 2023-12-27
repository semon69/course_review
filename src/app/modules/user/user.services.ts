import httpStatus from 'http-status';
import { AppError } from '../../errors/appError';
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import { createTimeFormat, createToken } from './user.utils';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...otherFields } = result.toObject();
  return otherFields;
};

const userLogin = async (payload: TLoginUser) => {
  // checking if the user is exist
  // const user = await User.isUserExistsUsername(payload?.username);
  const user = await User.findOne({ username: payload?.username });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  //checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  const userData = {
    _id: user?.id,
    username: user?.username,
    email: user?.email,
    role: user?.role,
  };

  const jwtPayload = {
    _id: user?.id,
    role: user?.role,
    email: user?.email,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires_in as string,
  );

  return {
    user: userData,
    token,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { currentPassword: string; newPassword: string },
) => {
  // check, is users exists or not
  const user = await User.findById(userData._id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user is not found');
  }

  // // check, is password right or wrong
  const passwordMatched = await User.isPasswordMatched(
    payload?.currentPassword,
    user?.password,
  );

  if (!passwordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is not matched');
  }
  const isUniquePassword = user?.passwordHistory?.every((history) => {
    const isMatch = bcrypt.compareSync(payload?.newPassword, history?.password);
    return !isMatch;
  });

  const date = createTimeFormat(user?.passwordChangeAt as Date);

  if (!isUniquePassword || payload.currentPassword === payload.newPassword) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Password change failed. Ensure the new password is unique and not among
     the last 2 used (last used on ${date.formattedDate} ${date.formattedTime}).`,
      true,
    );
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  // Update the password and password history
  user.passwordHistory.unshift({
    password: user.password,
    timestamps: new Date(),
  });
  user.password = hashedPassword;

  // Keep only the last 2 passwords in the history
  user.passwordHistory = user.passwordHistory.slice(0, 2);

  const result = await User.findOneAndUpdate(
    {
      _id: userData._id,
      role: userData.role,
    },
    {
      passwordChangeAt: new Date(),
      passwordHistory: user.passwordHistory,
      password: hashedPassword,
    },
  ).select('-password -passwordHistory -passwordChangeAt');

  return result;
};

export const userService = {
  createUserIntoDB,
  userLogin,
  changePassword,
};
