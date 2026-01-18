import { Cart } from "../models/cart.model";

const addToCart = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  const existingItem = await Cart.findOne({ userId, productId });
  if (existingItem) {
    existingItem.quantity += quantity;
    return await existingItem.save();
  }
  return await Cart.create({ userId, productId, quantity });
};

const getCartByUserId = async (userId: string) => {
  return await Cart.find({ userId }).populate("productId");
};

const updateQuantity = async (id: string, quantity: number) => {
  return await Cart.findByIdAndUpdate(id, { quantity }, { new: true });
};

const removeFromCart = async (id: string) => {
  return await Cart.findByIdAndDelete(id);
};

const clearCartByUserId = async (userId: string) => {
  return await Cart.deleteMany({ userId });
};

export default {
  addToCart,
  getCartByUserId,
  updateQuantity,
  removeFromCart,
  clearCartByUserId,
};
