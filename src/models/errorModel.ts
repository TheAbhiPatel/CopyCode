import mongoose, { Document, Schema, model } from "mongoose";

export interface IError extends Document {
  error: string;
  date: Date;
  path: string;
  userId: string;
}

const errorSchema = new Schema({
  error: { type: String },
  userId: { type: String },
  path: { type: String },
  date: { type: Date, default: Date.now, required: false },
});

export default model<IError>("ErrorLogs", errorSchema);
