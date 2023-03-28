import express from "express";
import {
  deleteSubCategory,
  getSubCategories,
  getSubCategory,
  postSubCategory,
  updateSubCategory,
} from "../controllers/subCategoryController";
import validate from "../middleware/validate";
import { postSubCategorySchema } from "../validationSchema/subCategorySchema";

const router = express.Router();

router.get("/", getSubCategories);

router.get("/:id", getSubCategory);

router.post("/", validate(postSubCategorySchema), postSubCategory);

router.patch("/", updateSubCategory);

router.delete("/", deleteSubCategory);

export default router;
