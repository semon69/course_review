import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';

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

router.post(
  '/auth/change-password',
  auth('admin','user'),
  validateRequest(userValidation.changePasswordSchemaZod),
  userController.changePassword
);

export const UserRoutes = router;
