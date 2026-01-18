import { Router } from "express";
import reviewController from "../controllers/review.controller";

const reviewRouter = Router();

reviewRouter.get("/:productNo", reviewController.getReviewAll);
reviewRouter.post("/", reviewController.addReview);
reviewRouter.put("/:id", reviewController.updateReview);
reviewRouter.delete("/:id", reviewController.deleteReview);

export default reviewRouter;
