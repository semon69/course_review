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

export const UserRoutes = router;
