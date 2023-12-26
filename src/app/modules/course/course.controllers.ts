import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { courseServices } from './course.services';
import httpStatus from 'http-status';


// Create course into db
const createCourse = catchAsync(async (req, res) => {
  const result = await courseServices.createCourseIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course Created successfully',
    data: result
  });
});

// get all courses
const getCourses = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCourseFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course Data fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// Update course data
const updateSingleCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  const result = await courseServices.updateCourseDataIntoDB(
    courseId,
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course Updated successfully',
    data: result,
  });
});

// Get course with review
const getCourseWithReviews = catchAsync(async(req,res)=> {
    const {courseId} = req.params
    const result = await courseServices.getCourseWithReviews(courseId)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Course and Reviews retrieved successfully',
        data: result,
      });
})

// Get best course basedd on Reviews
const getBestCourse = catchAsync(async(req,res)=> {
    const result = await courseServices.getBestCourseFromDB()
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Best course retrieved successfully',
        data: result,
      });
})

export const courseControllers = {
  createCourse,
  getCourses,
  updateSingleCourse,
  getCourseWithReviews,
  getBestCourse
};
