"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const productRouter = (0, express_1.Router)();
productRouter.get("/search", product_controller_1.default.searchProducts);
productRouter.get("/", product_controller_1.default.getProductAll);
productRouter.get("/:id", product_controller_1.default.getProduct);
productRouter.post("/", product_controller_1.default.addProduct);
productRouter.put("/:id", product_controller_1.default.updateProduct);
productRouter.delete("/:id", product_controller_1.default.deleteProduct);
exports.default = productRouter;
