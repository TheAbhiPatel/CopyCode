import { Request, Response } from "express";
import { subCatModel } from "../models/menuModels";
import { subCatMessage } from "../utils/responseMessage";

export const getSubCategories = async (req: Request, res: Response) => {
  try {
    const subCats = await subCatModel.find();
    if (!subCats)
      return res
        .status(404)
        .json({ success: false, message: subCatMessage.subCategoriesNotFound });
    res.status(200).json({ success: true, subCats });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: subCatMessage.catchBlockError });
  }
};

export const getSubCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const subCat = await subCatModel.findById(id);
    if (!subCat)
      return res
        .status(404)
        .json({ success: false, message: subCatMessage.subCategoryNotFound });
    res.status(200).json({ success: true, subCat });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: subCatMessage.catchBlockError });
  }
};

export const postSubCategory = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const subCat = await subCatModel.create(body);
    res
      .status(201)
      .json({ success: true, message: subCatMessage.subCategoryAdded, subCat });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: subCatMessage.catchBlockError });
  }
};

export const updateSubCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const subCat = await subCatModel.findByIdAndUpdate(id, body, { new: true });
    if (!subCat)
      return res
        .status(404)
        .json({ success: false, message: subCatMessage.subCategoryNotFound });
    res.status(200).json({
      success: true,
      message: subCatMessage.subCategoryUpdated,
      subCat,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: subCatMessage.catchBlockError });
  }
};

export const deleteSubCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const subCat = await subCatModel.findByIdAndDelete(id);
    if (!subCat)
      return res
        .status(404)
        .json({ success: false, message: subCatMessage.subCategoryNotFound });
    res.status(200).json({
      success: true,
      message: subCatMessage.subCategoryDeleted,
      subCat,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: subCatMessage.catchBlockError });
  }
};
