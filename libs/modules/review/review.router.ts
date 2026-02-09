import { AuthService } from "@modules/auth/auth.service";
import { Router } from "express";
import { ReviewController } from "./review.controller";

const ReviewRouter = Router({ mergeParams: true });

ReviewRouter.use(AuthService.AuthGuard);
ReviewRouter.post(
  "",
  AuthService.checkRole("USER"),
  ReviewController.createReview
);

ReviewRouter.get("", AuthService.checkRole("USER"), ReviewController.getReview);

ReviewRouter.delete(
  "/:id",
  AuthService.checkRole("ADMIN"),
  ReviewController.deleteReview
);

export default ReviewRouter;
