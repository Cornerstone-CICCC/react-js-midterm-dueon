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
const review_service_1 = __importDefault(require("../services/review.service"));
const getReviewAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productNo } = req.params;
        const reviews = yield review_service_1.default.getReviewsByProduct(productNo);
        res.status(200).json({ success: true, data: reviews });
    }
    catch (error) {
        res.status(500).json({ success: false });
    }
});
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const sessionUserId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.userId;
        const sessionUserName = (_b = req.session) === null || _b === void 0 ? void 0 : _b.username;
        const userId = sessionUserId || req.body.userId || "guest_id";
        const userName = sessionUserName || req.body.userName || "Anonymous";
        const result = yield review_service_1.default.addReview(Object.assign(Object.assign({}, req.body), { userId,
            userName }));
        res.status(201).json({ success: true, data: result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield review_service_1.default.updateReview(id, req.body);
        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        res.status(500).json({ success: false });
    }
});
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield review_service_1.default.deleteReview(id);
        res.status(200).json({ success: true });
    }
    catch (error) {
        res.status(500).json({ success: false });
    }
});
exports.default = { getReviewAll, addReview, updateReview, deleteReview };
