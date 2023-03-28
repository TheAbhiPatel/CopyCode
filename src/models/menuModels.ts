import mongoose, { Document, Schema, model } from "mongoose";

export interface IMenu extends Document {
  userId: string;
  name: string;
  label: string;
  value: string;
  password: string;
  isProtected: boolean;
  selected: boolean;
  _id: string;
}

const menuSchema = new Schema({
  userId: { type: String },
  name: { type: String },
  label: { type: String },
  value: { type: String },
  password: { type: String },
  isProtected: { type: Boolean, default: false },
  selected: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, required: false },
  updatedAt: { type: Date, default: Date.now, required: false },
});

export const menuModel = model<IMenu>("menu", menuSchema);

// ==========================================================

export interface ICat extends Document {
  userId: string;
  name: string;
  label: string;
  value: string;
  menuId: string;
  selected: boolean;
}

const catSchema = new Schema({
  userId: { type: String },
  name: { type: String },
  label: { type: String },
  value: { type: String },
  menuId: { type: mongoose.Schema.Types.ObjectId },
  selected: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, required: false },
  updatedAt: { type: Date, default: Date.now, required: false },
});

export const catModel = model<ICat>("category", catSchema);

// ==========================================================

export interface ISubcat extends Document {
  userId: string;
  categoryId: string;
  menuId: string;
  name: string;
  label: string;
  value: string;
}

const subCatSchema = new Schema({
  userId: { type: String },
  categoryId: { type: mongoose.Types.ObjectId },
  menuId: { type: mongoose.Types.ObjectId },
  name: { type: String },
  label: { type: String },
  value: { type: String },
  createdAt: { type: Date, default: Date.now, required: false },
  updatedAt: { type: Date, default: Date.now, required: false },
});

export const subCatModel = model<ISubcat>("subcategory", subCatSchema);
