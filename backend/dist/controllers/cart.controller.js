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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = void 0;
const cart_service_1 = __importDefault(require("../services/cart.service"));
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.session.userId;
        if (!userId)
            return res.status(401).json({ success: false });
        const { productId, quantity } = req.body;
        const result = yield cart_service_1.default.addToCart(userId, productId, Number(quantity) || 1);
        res.status(201).json({ success: true, data: result });
    }
    catch (error) {
        res.status(500).json({ success: false });
    }
});
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.session.userId;
        if (!userId)
            return res.status(401).json({ success: false });
        const items = yield cart_service_1.default.getCartByUserId(userId);
        res.status(200).json({ success: true, data: items });
    }
    catch (error) {
        res.status(500).json({ success: false });
    }
});
const updateQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const result = yield cart_service_1.default.updateQuantity(id, Number(quantity));
        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        res.status(500).json({ success: false });
    }
});
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield cart_service_1.default.removeFromCart(id);
        res.status(200).json({ success: true });
    }
    catch (error) {
        res.status(500).json({ success: false });
    }
});
const clearCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        yield cart_service_1.default.clearCartByUserId(userId);
        res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});
exports.clearCart = clearCart;
exports.default = { addToCart, getCart, updateQuantity, deleteItem, clearCart: exports.clearCart };
