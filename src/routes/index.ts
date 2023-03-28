import express from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import menuRoutes from "./menuRoutes";
import categoryRoutes from "./categoryRoutes";
import subCategoryRoutes from "./subCategoryRoutes";
import requireUser from "../middleware/requireUser";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", requireUser, userRoutes);
router.use("/menu", requireUser, menuRoutes);
router.use("/category", requireUser, categoryRoutes);
router.use("/sub-category", requireUser, subCategoryRoutes);

export default router;
