import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseControllers } from './course.controllers';
import { courseValidation } from './course.validation';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/courses',
  auth('admin'),
  validateRequest(courseValidation.courseSchemaZod),
  courseControllers.createCourse,
);

router.get('/courses', courseControllers.getCourses);

router.put(
  '/courses/:courseId',
  auth('admin'),
  validateRequest(courseValidation.updateCourseSchemaZod),
  courseControllers.updateSingleCourse,
);

router.get('/courses/:courseId/reviews', courseControllers.getCourseWithReviews)
router.get('/course/best', courseControllers.getBestCourse)

export const CourseRoutes = router;
