import express from "express";
import {
  deleteMenu,
  getMenu,
  getMenus,
  getMenusCategories,
  getMenusCategoriesSubCat,
  postMenu,
  updateMenu,
} from "../controllers/menuController";
import validate from "../middleware/validate";
import { postMenuSchema } from "../validationSchema/menuSchema";

const router = express.Router();

router.get("/", getMenus);

router.get("/:id", getMenu);

router.post("/", validate(postMenuSchema), postMenu);

router.patch("/:id", updateMenu);

router.delete("/:id", deleteMenu);

router.get("/get-categories/:id", getMenusCategories);
router.get("/get-categories-with-sub/:menuid/:catid", getMenusCategoriesSubCat);

export default router;
