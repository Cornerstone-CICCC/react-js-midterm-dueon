import { Router } from "express";
import productController from "../controllers/product.controller";

const productRouter = Router();

productRouter.get("/search", productController.searchProducts);

productRouter.get("/", productController.getProductAll);

productRouter.get("/:id", productController.getProduct);

productRouter.post("/", productController.addProduct);
productRouter.put("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);

export default productRouter;
