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
const product_service_1 = __importDefault(require("../services/product.service"));
/**
 * Get Product ALl
 *
 * @route GET /product/all
 * @param {Request} req
 * @param {Response} res
 */
const getProductAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_service_1.default.getProductAll();
        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    }
    catch (error) {
        console.error("Get All Products Error:", error);
        res.status(500).json({
            success: false,
            message: "Error loading product list",
        });
    }
});
/**
 * Get Product
 *
 * @route GET /product/:no
 * @param {Request} req
 * @param {Response} res
 */
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = String(req.query.category || "");
        const product = yield product_service_1.default.getProduct(id);
        if (!product) {
            return res
                .status(404)
                .json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: product });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Error retrieving product details" });
    }
});
/**
 * Add Product
 *
 * @route POST /product/add
 * @param {Request} req
 * @param {Response} res
 */
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, price } = req.body;
        if (!title || !price) {
            return res.status(400).json({
                success: false,
                message: "Title and Price are required fields.",
            });
        }
        const newProduct = yield product_service_1.default.addProduct(req.body);
        res.status(201).json({
            success: true,
            data: newProduct,
        });
    }
    catch (error) {
        console.error("Add Product Error:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while adding the product.",
        });
    }
});
/**
 * update Product
 *
 * @route POST /product/update
 * @param {Request} req
 * @param {Response} res
 */
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedResult = yield product_service_1.default.updateProduct(id, req.body);
        //const productId = req.params.id as string;
        const productId = String(req.params.id);
        if (!updatedResult) {
            return res.status(404).json({
                success: false,
                message: "Product not found. Update failed.",
            });
        }
        res.status(200).json({
            success: true,
            data: updatedResult,
        });
    }
    catch (error) {
        console.error("Update Product Error:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the product.",
        });
    }
});
/**
 * delete Product
 *
 * @route POST /product/delete:no
 * @param {Request} req
 * @param {Response} res
 */
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noParam = req.params.no;
        const deletedResult = yield product_service_1.default.deleteProduct(noParam);
        if (!deletedResult) {
            return res
                .status(404)
                .json({ success: false, message: "Deletion failed." });
        }
        res
            .status(200)
            .json({ success: true, message: "Product deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Delete failed." });
    }
});
const searchProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(200).json([]);
        }
        const results = yield product_service_1.default.searchProducts(query);
        res.status(200).json(results);
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Search failed" });
    }
});
exports.default = {
    getProductAll,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
};
