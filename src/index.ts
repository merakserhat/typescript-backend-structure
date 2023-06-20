import "reflect-metadata";
import express, { Request, Response, Application } from "express";
import { config } from "./utils/config";
import Logging from "./utils/logging";
import mongoose from "mongoose";

const app: Application = express();

app.get("/", (req: Request, res: Response): void => {
  res.send("Server is active!");
});

///// Start Server
app.listen(config.port, async () => {
  const connected = await connectDatabase();
  if (connected) {
    Logging.info(`Server is running at port ${config.port}`);
  }
});

///// Connect to mongo
const connectDatabase = async () => {
  try {
    await mongoose.connect(config.mongo, { retryWrites: true, w: "majority" });
    Logging.info("Connected to database");
    return true;
  } catch (error) {
    Logging.error(error);
    return false;
  }
};
