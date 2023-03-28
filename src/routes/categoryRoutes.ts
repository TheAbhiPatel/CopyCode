import express from "express";
import {
  deleteCategory,
  getCategories,
  getCategory,
  postCategory,
  updateCategory,
} from "../controllers/categoryController";
import validate from "../middleware/validate";
import { postCategorySchema } from "../validationSchema/categorySchema";

const router = express.Router();

router.get("/", getCategories);

router.get("/:id", getCategory);

router.post("/", validate(postCategorySchema), postCategory);

router.patch("/:id", updateCategory);

router.delete("/:id", deleteCategory);

export default router;
