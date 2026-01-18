import { Request, Response } from "express";
import reviewService from "../services/review.service";

const getReviewAll = async (req: Request, res: Response) => {
  try {
    const { productNo } = req.params;
    const reviews = await reviewService.getReviewsByProduct(
      productNo as string
    );
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

const addReview = async (req: Request, res: Response) => {
  try {
    const sessionUserId = (req.session as any)?.userId;
    const sessionUserName = (req.session as any)?.username;

    const userId = sessionUserId || req.body.userId || "guest_id";
    const userName = sessionUserName || req.body.userName || "Anonymous";

    const result = await reviewService.addReview({
      ...req.body,
      userId,
      userName,
    });

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await reviewService.updateReview(id as string, req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await reviewService.deleteReview(id as string);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export default { getReviewAll, addReview, updateReview, deleteReview };
