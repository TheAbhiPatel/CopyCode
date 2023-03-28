import { Request, Response } from "express";
import { catModel, menuModel, subCatModel } from "../models/menuModels";
import { menuMessage } from "../utils/responseMessage";

export const getMenu = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const menu = await menuModel.findById(id);
    if (!menu)
      return res
        .status(404)
        .json({ success: false, message: menuMessage.menuNotFound });
    res.status(200).json({ success: true, menu });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: menuMessage.catchBlockError });
  }
};

export const getMenus = async (req: Request, res: Response) => {
  const user = res.locals.user;
  try {
    const menu = await menuModel.find({ userId: user.id });
    if (menu.length == 0)
      return res
        .status(404)
        .json({ success: false, message: menuMessage.menuNotFound });
    res.status(200).json({ success: true, menu });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: menuMessage.catchBlockError });
  }
};

export const postMenu = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const menu = await menuModel.create(body);
    res
      .status(201)
      .json({ success: true, message: menuMessage.menuAdded, menu });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: menuMessage.catchBlockError });
  }
};

export const updateMenu = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const menu = await menuModel.findByIdAndUpdate(id, body, { new: true });

    if (!menu)
      return res
        .status(404)
        .json({ success: false, message: menuMessage.menuNotFound });
    res
      .status(200)
      .json({ success: true, message: menuMessage.menuUpdated, menu });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: menuMessage.catchBlockError });
  }
};

export const deleteMenu = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const menu = await menuModel.findByIdAndDelete(id);
    if (!menu)
      return res
        .status(404)
        .json({ success: false, message: menuMessage.menuNotFound });
    res
      .status(200)
      .json({ success: true, message: menuMessage.menuDeleted, menu });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: menuMessage.catchBlockError });
  }
};

export const getMenusCategories = async (req: Request, res: Response) => {
  const menuId = req.params.id;
  try {
    const Categories = await catModel.find({ menuId }).lean();
    if (Categories.length == 0)
      return res
        .status(404)
        .json({ success: false, message: menuMessage.menusCatNotFound });
    res.status(200).json({ success: true, Categories });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: menuMessage.catchBlockError });
  }
};

export const getMenusCategoriesSubCat = async (req: Request, res: Response) => {
  const { menuid, catid } = req.params;
  try {
    const subCategories = await subCatModel
      .find({ menuId: menuid, categoryId: catid })
      .lean();
    if (subCategories.length == 0)
      return res.status(404).json({
        success: false,
        message: menuMessage.menusCatsSubCatNotFound,
      });
    res.status(200).json({ success: true, subCategories });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: menuMessage.catchBlockError });
  }
};
