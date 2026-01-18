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
const review_model_1 = require("../models/review.model");
const getReviewsByProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield review_model_1.Review.find({ productId: productId }).sort({
        createdAt: -1,
    });
});
const addReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield review_model_1.Review.create(data);
});
const updateReview = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield review_model_1.Review.findByIdAndUpdate(id, data, { new: true });
});
const deleteReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield review_model_1.Review.findByIdAndDelete(id);
});
exports.default = { getReviewsByProduct, addReview, updateReview, deleteReview };
