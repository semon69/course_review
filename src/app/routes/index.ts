import { Router } from 'express';
import { CategoryRoutes } from '../modules/category/category.routes';
import { CourseRoutes } from '../modules/course/course.routes';
import { ReviewRoutes } from '../modules/review/review.routes';
import { UserRoutes } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/api',
    route: CourseRoutes
  },
  {
    path: '/api',
    route: CategoryRoutes
  },
  {
    path: '/api',
    route: ReviewRoutes
  },
  {
    path: '/api',
    route: UserRoutes
  }
];

moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));


export default router;