import { Response, Request } from "express";
import userModel from "../models/userModel";
import { catModel, menuModel, subCatModel } from "../models/menuModels";
import errorLogger from "../utils/errorLogger";

//===========================================
export const getMe = async (req: Request, res: Response) => {
  const user = res.locals.user;
  try {
    const findUser = await userModel.findById(user.id, { password: 0 });
    if (!findUser)
      return res
        .status(404)
        .json({ success: false, message: "user not found" });

    res.status(200).json({ success: true, message: "user fetched", findUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "something went wrong" });
  }
};

export const getUserMenu = async (req: Request, res: Response) => {
  const user = res.locals.user;

  try {
    const menu = await menuModel.find({ userId: user.id });
    if (menu.length == 0)
      return res.status(404).json({ success: false, message: "No Menu found" });
    res.status(200).json({ success: true, message: " Menu fetched", menu });
  } catch (error) {
    res.status(500).json({ success: false, message: "something went wrong" });
  }
};

export const getUserFullMenu = async (req: Request, res: Response) => {
  const user = res.locals.user;

  try {
    const menu = await menuModel.find({ userId: user.id });
    if (menu.length == 0)
      return res.status(404).json({ success: false, message: "No Menu found" });

    const category = await catModel.find({ userId: user.id });
    const subCategory = await subCatModel.find({ userId: user.id });
    res.status(200).json({
      success: true,
      message: " Menu fetched",
      menu,
      category,
      subCategory,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "something went wrong" });
  }
};

//===========================================
export const testError = async (req: Request, res: Response) => {
  try {
    throw new Error("this is testing error");
  } catch (error) {
    // errorLogger(error);
    console.log(error);

    res.status(500).json({ success: false, message: "something went wrong" });
  }
};

//===========================================

export const newFunc = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({ success: false, message: "something went wrong" });
  }
};
