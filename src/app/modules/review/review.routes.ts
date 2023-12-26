import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { reviewControllers } from './review.controllers';
import { reviewValidation } from './review.validation';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/reviews',
  auth('user'),
  validateRequest(
    reviewValidation.reviewSchemaZod
  ),
  reviewControllers.createReview
);

export const ReviewRoutes = router;
