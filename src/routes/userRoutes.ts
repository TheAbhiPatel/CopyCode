import express from "express";
import {
  getMe,
  getUserFullMenu,
  getUserMenu,
  testError,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/me", getMe);

userRouter.get("/menu", getUserMenu);

userRouter.get("/full-menu", getUserFullMenu);
userRouter.post("/error", testError);

export default userRouter;
