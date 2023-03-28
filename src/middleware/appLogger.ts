import { RequestHandler } from "express";
import fs from "fs";
import path from "path";
import requestModel from "../models/requestModel";

const appLogger: RequestHandler = async (req, res, next) => {
  try {
    const url = req.url;
    const method = req.method;
    const ip = req.ip;
    const userId = res.locals?.user?.id;

    const newReq = await requestModel.create({
      url,
      method,
      ip,
      userId,
    });

    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

export default appLogger;
