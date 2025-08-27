import { createLogger, format, transports } from "winston";

const isTest = process.env.NODE_ENV === "test";

const logger = createLogger({
  level: isTest ? "silent" : "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

export default logger;
