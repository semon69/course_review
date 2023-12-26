import { Router } from 'express';
import { CategoryRoutes } from '../modules/category/category.routes';
import { CourseRoutes } from '../modules/course/course.routes';
import { ReviewRoutes } from '../modules/review/review.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/',
    route: CourseRoutes
  },
  {
    path: '/',
    route: CategoryRoutes
  },
  {
    path: '/',
    route: ReviewRoutes
  }
];

moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));


export default router;