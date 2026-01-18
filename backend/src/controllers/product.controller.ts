import { Request, Response } from "express";

import { IProduct } from "../models/product.model";
import productService from "../services/product.service";

/**
 * Get Product ALl
 *
 * @route GET /product/all
 * @param {Request} req
 * @param {Response} res
 */
const getProductAll = async (req: Request, res: Response) => {
  try {
    const products = await productService.getProductAll();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Get All Products Error:", error);
    res.status(500).json({
      success: false,
      message: "Error loading product list",
    });
  }
};

/**
 * Get Product
 *
 * @route GET /product/:no
 * @param {Request} req
 * @param {Response} res
 */
const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = String(req.query.category || "");
    const product = await productService.getProduct(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error retrieving product details" });
  }
};

/**
 * Add Product
 *
 * @route POST /product/add
 * @param {Request} req
 * @param {Response} res
 */
const addProduct = async (
  req: Request<{}, {}, Omit<IProduct, "no">>,
  res: Response
) => {
  try {
    const { title, price } = req.body;

    if (!title || !price) {
      return res.status(400).json({
        success: false,
        message: "Title and Price are required fields.",
      });
    }

    const newProduct = await productService.addProduct(req.body);
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the product.",
    });
  }
};

/**
 * update Product
 *
 * @route POST /product/update
 * @param {Request} req
 * @param {Response} res
 */
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedResult = await productService.updateProduct(id, req.body);
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
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the product.",
    });
  }
};

/**
 * delete Product
 *
 * @route POST /product/delete:no
 * @param {Request} req
 * @param {Response} res
 */
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const noParam = req.params.no;

    const deletedResult = await productService.deleteProduct(noParam);

    if (!deletedResult) {
      return res
        .status(404)
        .json({ success: false, message: "Deletion failed." });
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete failed." });
  }
};

const searchProducts = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    if (!query) {
      return res.status(200).json([]);
    }
    const results = await productService.searchProducts(query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ success: false, message: "Search failed" });
  }
};

export default {
  getProductAll,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};
