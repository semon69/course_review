import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { reviewControllers } from './review.controllers';
import { reviewValidation } from './review.validation';

const router = Router();

router.post(
  '/api/reviews',
  validateRequest(
    reviewValidation.reviewSchemaZod
  ),
  reviewControllers.createReview
);

export const ReviewRoutes = router;
