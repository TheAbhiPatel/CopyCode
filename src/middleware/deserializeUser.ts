import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const deserilizeUser: RequestHandler = (req, res, next) => {
  const token = req.header("authorization");

  try {
    if (!token) return next();
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) return next();
    res.locals.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "something went wrong" });
  }
};

export default deserilizeUser;
