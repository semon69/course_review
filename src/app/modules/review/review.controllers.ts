import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { reviewServices } from "./review.services";
import httpStatus from 'http-status';

const createReview = catchAsync(async(req, res)=> {
    const token = req.headers.authorization as string
    const result = await reviewServices.createReviewIntoDB(token,req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Review created successfully',
        data: result,
      });
})

export const reviewControllers = {
    createReview
}