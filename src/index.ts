import express, { Request, Response, Application } from "express";
const PORT = process.env.PORT || 3000;

const app: Application = express();

app.get("/", (req: Request, res: Response): void => {
  res.send("Server is active!");
});

app.listen(PORT, (): void => {
  console.log(`Server is running at port ${PORT}`);
});
