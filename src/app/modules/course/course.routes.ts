import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseControllers } from './course.controllers';
import { courseValidation } from './course.validation';

const router = Router();

router.post(
  '/course',
  validateRequest(courseValidation.courseSchemaZod),
  courseControllers.createCourse,
);

router.get('/courses', courseControllers.getCourses);

router.put(
  '/courses/:courseId',
  validateRequest(courseValidation.updateCourseSchemaZod),
  courseControllers.updateSingleCourse,
);

router.get('/courses/:courseId/reviews', courseControllers.getCourseWithReviews)
router.get('/course/best', courseControllers.getBestCourse)

export const CourseRoutes = router;
