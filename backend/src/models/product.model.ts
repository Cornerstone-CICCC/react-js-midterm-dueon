import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  No: number;
  title: string;
  content: string;
  price: number;
  mainImg: string;
  category: string;
  stock: number;
}

const ProductSchema: Schema = new Schema({
  No: { type: Number, required: false },
  title: { type: String, required: true },
  content: { type: String, required: true },
  price: { type: String, required: true },
  mainImg: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
});

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
