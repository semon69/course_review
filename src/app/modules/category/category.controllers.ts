import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { categoryServices } from './category.services';

const createCaregory = catchAsync(async (req, res) => {
  const token = req.headers.authorization as string
  const result = await categoryServices.createCategoryIntoDB(token,req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category created successfully',
    data: result,
  });
});

const getAllCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllCategoryFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Get all categories successfully',
    data: result,
  });
});

export const categoryControllers = {
  createCaregory,
  getAllCategory
};
