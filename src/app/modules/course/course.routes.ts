import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseControllers } from './course.controllers';
import { courseValidation } from './course.validation';

const router = Router();

router.post(
  '/api/course',
  validateRequest(courseValidation.courseSchemaZod),
  courseControllers.createCourse,
);

router.get('/api/courses', courseControllers.getCourses);

router.put(
  '/api/courses/:courseId',
  validateRequest(courseValidation.updateCourseSchemaZod),
  courseControllers.updateSingleCourse,
);

router.get('/api/courses/:courseId/reviews', courseControllers.getCourseWithReviews)
router.get('/api/course/best', courseControllers.getBestCourse)

export const CourseRoutes = router;
