"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = __importDefault(require("../controllers/cart.controller"));
const cartRouter = (0, express_1.Router)();
cartRouter.post("/", cart_controller_1.default.addToCart);
cartRouter.get("/", cart_controller_1.default.getCart);
cartRouter.put("/:id", cart_controller_1.default.updateQuantity);
cartRouter.delete("/:id", cart_controller_1.default.deleteItem);
cartRouter.delete("/", cart_controller_1.default.clearCart);
exports.default = cartRouter;
