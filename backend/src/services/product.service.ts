import { IProduct, Product } from "../models/product.model";

const getProductAll = async () => {
  return await Product.find({});
};

const getProduct = async (id: string) => {
  return await Product.findById(id);
};

const addProduct = async (
  newProduct: Partial<IProduct>
): Promise<IProduct | null> => {
  return await Product.create(newProduct);
};

const updateProduct = async (
  id: string,
  data: Partial<IProduct>
): Promise<IProduct | null> => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

const deleteProduct = async (id: string): Promise<IProduct | null> => {
  return await Product.findByIdAndDelete(id);
};

const searchProducts = async (query: string) => {
  return await Product.find({
    title: { $regex: query, $options: "i" },
  });
};

export default {
  getProductAll,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};
