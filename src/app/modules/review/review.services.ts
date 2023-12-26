import jwt, { JwtPayload } from 'jsonwebtoken';
import { TReview } from './review.interface';
import { Review } from './review.model';
import { User } from '../user/user.model';
import config from '../../config';

const createReviewIntoDB = async (token: string, payload: TReview) => {
  const decoded = jwt.verify(
    token,
    config.jwt_access_token as string,
  ) as JwtPayload;

  const creatorId = decoded._id;
  const createdBy = await User.findById(creatorId, {
    _id: 1,
    username: 1,
    role: 1,
    email: 1,
  });

  const result = await Review.create({ ...payload, createdBy });
  return result;
};

export const reviewServices = {
  createReviewIntoDB,
};
