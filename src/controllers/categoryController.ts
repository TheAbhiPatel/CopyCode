import { Request, Response } from "express";
import { catModel } from "../models/menuModels";
import { catMessage } from "../utils/responseMessage";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const cats = await catModel.find();
    if (!cats)
      return res
        .status(404)
        .json({ success: false, message: catMessage.categoriesNotFound });
    res.status(200).json({ success: true, cats });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ success: false, message: catMessage.catchBlockError });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const cat = await catModel.findById(id);
    if (!cat)
      return res
        .status(404)
        .json({ success: false, message: catMessage.categoryNotFound });
    res.status(200).json({ success: true, cat });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ success: false, message: catMessage.catchBlockError });
  }
};

export const postCategory = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const cat = await catModel.create(body);
    res
      .status(201)
      .json({ success: true, message: catMessage.categoryAdded, cat });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: catMessage.catchBlockError });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const cat = await catModel.findByIdAndUpdate(id, body, { new: true });
    if (!cat)
      return res
        .status(404)
        .json({ success: false, message: catMessage.categoryNotFound });
    res
      .status(200)
      .json({ success: true, message: catMessage.categoryUpdated, cat });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ success: false, message: catMessage.catchBlockError });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const cat = await catModel.findByIdAndDelete(id);
    if (!cat)
      return res
        .status(404)
        .json({ success: false, message: catMessage.categoryNotFound });
    res
      .status(200)
      .json({ success: true, message: catMessage.categoryDeleted, cat });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ success: false, message: catMessage.catchBlockError });
  }
};
