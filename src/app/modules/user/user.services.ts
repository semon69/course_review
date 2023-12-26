import httpStatus from 'http-status';
import { AppError } from '../../errors/appError';
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import { createToken } from './user.utils';
import config from '../../config';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...otherFields } = result.toObject();
  return otherFields;
};

const userLogin = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsUsername(payload?.username);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  //checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  const { _id, username, role, email } = user
  const jwtPayload = {
    _id,
    role,
    email
  };
  

  const token = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires_in as string,
  );

  return {
    user: {_id, username, email, role},
    token
  }


};

export const userService = {
  createUserIntoDB,
  userLogin,
};
