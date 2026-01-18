import { Request, Response } from "express";
import cartService from "../services/cart.service";
import { Cart } from "../models/cart.model";

const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = (req.session as any).userId;
    if (!userId) return res.status(401).json({ success: false });

    const { productId, quantity } = req.body;
    const result = await cartService.addToCart(
      userId as string,
      productId as string,
      Number(quantity) || 1
    );

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

const getCart = async (req: Request, res: Response) => {
  try {
    const userId = (req.session as any).userId;
    if (!userId) return res.status(401).json({ success: false });

    const items = await cartService.getCartByUserId(userId as string);
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

const updateQuantity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const result = await cartService.updateQuantity(
      id as string,
      Number(quantity)
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await cartService.removeFromCart(id as string);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = req.session?.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    await cartService.clearCartByUserId(userId);

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export default { addToCart, getCart, updateQuantity, deleteItem, clearCart };
