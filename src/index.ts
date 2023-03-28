import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { HOST_NAME, PORT, MONGO_URL } from "./config";
import connectDb from "./utils/connectDb";
import router from "./routes";
import deserilizeUser from "./middleware/deserializeUser";
import appLogger from "./middleware/appLogger";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(deserilizeUser);
app.use(appLogger);

app.use("/api", router);

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Home route" });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ success: false, messase: "Route not found" });
});

app.listen(Number(PORT), HOST_NAME ? HOST_NAME : "localhost", () => {
  console.log(`server is runnign at :http://${HOST_NAME}:${PORT}`);
  connectDb(MONGO_URL);
});
