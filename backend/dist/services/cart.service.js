"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_model_1 = require("../models/cart.model");
const addToCart = (userId, productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const existingItem = yield cart_model_1.Cart.findOne({ userId, productId });
    if (existingItem) {
        existingItem.quantity += quantity;
        return yield existingItem.save();
    }
    return yield cart_model_1.Cart.create({ userId, productId, quantity });
});
const getCartByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.Cart.find({ userId }).populate("productId");
});
const updateQuantity = (id, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.Cart.findByIdAndUpdate(id, { quantity }, { new: true });
});
const removeFromCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.Cart.findByIdAndDelete(id);
});
const clearCartByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.Cart.deleteMany({ userId });
});
exports.default = {
    addToCart,
    getCartByUserId,
    updateQuantity,
    removeFromCart,
    clearCartByUserId,
};
