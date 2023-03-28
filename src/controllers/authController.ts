import { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import { JWT_SECRET, SEND_EMAIL_JWT_SECRET } from "../config";
import sendEMail from "../utils/sendEMail";
import { verifyJwt } from "../utils/verifyJwt";
import errorLogger from "../utils/errorLogger";
import { authMessage } from "../utils/responseMessage";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find({}, { password: 0 });
    res.status(200).json({ success: true, user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: authMessage.catchBlockError });
  }
};

export const signupUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user)
      return res
        .status(403)
        .json({ success: false, message: authMessage.userAlreadyRegistered });

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashPass,
    });
    const userId = { userId: newUser.id };
    const token = jwt.sign(userId, SEND_EMAIL_JWT_SECRET, {
      expiresIn: "15m",
    });

    const PreviewUrl = await sendEMail(name, email, token, true);

    res.status(201).json({
      success: true,
      message: authMessage.userRegisteredSuccessfull,
      verificationURL: PreviewUrl,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: authMessage.catchBlockError });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: authMessage.userNotFound });
    if (user.isVerified == false)
      return res
        .status(403)
        .json({ success: false, message: authMessage.verifyEmailFirst });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: authMessage.invalidPassword });

    const userData = { name: user.name, email: user.email, id: user.id };
    const token = jwt.sign(userData, JWT_SECRET, {
      expiresIn: "5d",
    });
    // const refreshToken = await genRefreshToken(userData);
    res.status(200).json({
      success: true,
      message: authMessage.loginSuccessfully,
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: authMessage.catchBlockError });
  }
};

export const reSendVericationEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: authMessage.userNotFound });
    if (user.isVerified === true)
      return res
        .status(403)
        .json({ success: false, message: authMessage.alreadyVerified });
    const userId = { userId: user.id };
    const token = jwt.sign(userId, SEND_EMAIL_JWT_SECRET, {
      expiresIn: "15m",
    });

    const PreviewUrl = await sendEMail(user.name, email, token, true);
    res.status(200).json({
      success: true,
      message: authMessage.verificationEmailSent,
      PreviewUrl,
    });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ success: false, message: authMessage.catchBlockError });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.query;
  try {
    if (!token)
      return res
        .status(404)
        .json({ success: false, message: authMessage.tokenNotFound });

    const decoded = verifyJwt<{ userId: string }>(token, SEND_EMAIL_JWT_SECRET);

    if (!decoded)
      return res
        .status(403)
        .json({ success: false, message: authMessage.invalidToken });

    const user = await userModel.findById(decoded.userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: authMessage.userNotFound });

    if (user.isVerified)
      return res
        .status(403)
        .json({ success: false, message: authMessage.alreadyVerified });

    user.isVerified = true;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: authMessage.emailVerifiedSuccessfull });
  } catch (error) {
    const userId = res.locals.user.userId;
    const path = req.path;
    console.log(userId, path);

    errorLogger(userId, path, error);
    console.log("----------------------==========", error);

    res
      .status(500)
      .json({ success: false, message: authMessage.catchBlockError });
  }
};
export const sendForgetPassEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: authMessage.userNotFound });
    if (!user.isVerified)
      return res.status(403).json({
        success: false,
        message: authMessage.verifyEmailFirst,
      });
    const token = jwt.sign({ userId: user.id }, SEND_EMAIL_JWT_SECRET, {
      expiresIn: "15m",
    });

    const PreviewUrl = await sendEMail(user.name, user.email, token, false);

    res.status(200).json({
      success: true,
      message: authMessage.forgetPasswordEmailSent,
      PreviewUrl,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: authMessage.catchBlockError });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { password } = req.body;
  const { token } = req.params;

  try {
    if (!token)
      return res
        .status(404)
        .json({ success: false, message: authMessage.tokenNotFound });
    const decoded = verifyJwt<{ userId: string }>(token, SEND_EMAIL_JWT_SECRET);
    if (!decoded)
      return res
        .status(403)
        .json({ success: false, message: authMessage.invalidToken });
    const user = await userModel.findById(decoded.userId);
    if (!user)
      return res.status(404).json({
        success: false,
        message: authMessage.userNotFound,
      });

    const hashPass = await bcrypt.hash(password, 10);

    user.password = hashPass;
    await user.save();

    res.status(200).json({
      success: true,
      message: authMessage.passwordResetSuccessfull,
    });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ success: false, message: authMessage.catchBlockError });
  }
};

// ================================================
export const newFunc = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: authMessage.catchBlockError });
  }
};
