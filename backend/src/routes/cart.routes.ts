import { Router } from "express";
import cartController from "../controllers/cart.controller";

const cartRouter = Router();

cartRouter.post("/", cartController.addToCart);
cartRouter.get("/", cartController.getCart);
cartRouter.put("/:id", cartController.updateQuantity);
cartRouter.delete("/:id", cartController.deleteItem);
cartRouter.delete("/", cartController.clearCart);

export default cartRouter;
