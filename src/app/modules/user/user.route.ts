import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import { userController } from './user.controller';

const router = Router();

router.post(
  '/auth/register',
  validateRequest(userValidation.userSchemaZod),
  userController.createUser
);

router.post(
  '/auth/login',
  validateRequest(userValidation.loginUserSchemaZod),
  userController.userLogin
);

export const UserRoutes = router;
