import { Router } from 'express';
import reviewController from './review.controller';
import authService from '../auth/auth.service';

const ReviewRouter = Router({ mergeParams: true });

ReviewRouter.use(authService.AuthGuard);
ReviewRouter.post(
  '',
  authService.checkRole('USER'),
  reviewController.createReview
);

ReviewRouter.get('', authService.checkRole('USER'), reviewController.getReview);

ReviewRouter.delete(
  '/:id',
  authService.checkRole('ADMIN'),
  reviewController.deleteReview
);

export default ReviewRouter;
