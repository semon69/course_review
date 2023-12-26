import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userService } from './user.services';

const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Registered successfully',
    data: result,
  });
});

export const userController = {
  createUser,
};
