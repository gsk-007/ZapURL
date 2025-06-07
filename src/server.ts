import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import morgan from "morgan";
import router from "./router";
import { errorHandler, notFound } from "./modules/errorMiddleware";
import { limiter } from "./config/rateLimiting";
import logger from "./config/logger";

const app = express();

app.use((req: Request, _res: Response, next: NextFunction) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(limiter);

app.get("/health-check", (req, res) => {
  res.send("API is running");
});

app.use("/api", router);

app.use(notFound);
app.use(errorHandler);

export default app;
