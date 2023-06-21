import express from "express";
import getTest from "../controllers/test/get-test";
const testRouter = express.Router();

testRouter.get("/test", getTest);

export default testRouter;
