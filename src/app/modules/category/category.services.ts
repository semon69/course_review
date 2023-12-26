import jwt, { JwtPayload } from 'jsonwebtoken';
import { TCategory } from './category.interface';
import { Category } from './category.model';
import config from '../../config';

const createCategoryIntoDB = async (token: string, payload: TCategory) => {
  const decoded = jwt.verify(
    token,
    config.jwt_access_token as string,
  ) as JwtPayload;

  const createdBy = decoded._id;

  const result = await Category.create({ ...payload, createdBy });
  return result;
};

const getAllCategoryFromDB = async () => {
  const categories = await Category.find().populate({
    path: 'createdBy',
    select: 'email username _id role',
  });
  return { categories };
};

export const categoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
};
