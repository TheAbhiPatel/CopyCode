import express from "express";
import {
  // genAccessTokenHandler,
  getUser,
  loginUser,
  reSendVericationEmail,
  resetPassword,
  sendForgetPassEmail,
  signupUser,
  verifyEmail,
} from "../controllers/authController";
import validate from "../middleware/validate";
import {
  loginUserSchema,
  reSendVericationEmailSchema,
  resetPasswordSchema,
  sendForgetPassEmailSchema,
  signupUserSchema,
  verifyEmailSchema,
} from "../validationSchema/authSchema";

const authRouter = express.Router();

authRouter.get("/", getUser);

authRouter.post("/signup", validate(signupUserSchema), signupUser);

authRouter.post("/login", validate(loginUserSchema), loginUser);

authRouter.post(
  "/resend-verification-email",
  validate(reSendVericationEmailSchema),
  reSendVericationEmail
);
authRouter.post("/verify-email/", validate(verifyEmailSchema), verifyEmail);

authRouter.post(
  "/forget-password-email",
  validate(sendForgetPassEmailSchema),
  sendForgetPassEmail
);

authRouter.post(
  "/reset-password/:token",
  validate(resetPasswordSchema),
  resetPassword
);

export default authRouter;
