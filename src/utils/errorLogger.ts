import path from "path";
import fs from "fs";
import errorModel from "../models/errorModel";

const errorLogger = async (
  userId: string | undefined,
  path: string,
  err: any
) => {
  try {
    const errlog = await errorModel.create({ userId, path, error: err });
    console.log("error loged in mongoDb", errlog);
    console.log("===============================----------------> ", err);
  } catch (error) {
    console.log("try error from error logger --------");
  }
};

export default errorLogger;
