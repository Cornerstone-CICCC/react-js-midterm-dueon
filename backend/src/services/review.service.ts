import { Review } from "../models/review.model";

const getReviewsByProduct = async (productId: string) => {
  return await Review.find({ productId: productId as any }).sort({
    createdAt: -1,
  });
};

const addReview = async (data: any) => {
  return await Review.create(data);
};

const updateReview = async (id: string, data: any) => {
  return await Review.findByIdAndUpdate(id, data, { new: true });
};

const deleteReview = async (id: string) => {
  return await Review.findByIdAndDelete(id);
};

export default { getReviewsByProduct, addReview, updateReview, deleteReview };
