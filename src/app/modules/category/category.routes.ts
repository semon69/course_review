import { Router } from 'express';
import { categoryControllers } from './category.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { categoryValidation } from './category.validation';

const router = Router();

router.post(
  '/categories',
  validateRequest(
    categoryValidation.createCategotyValidation
  ),
  categoryControllers.createCaregory
);
router.get('/categories', categoryControllers.getAllCategory)

export const CategoryRoutes = router;
