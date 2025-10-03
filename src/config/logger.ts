import { createLogger, format, transports } from "winston";
import { getCorrelationId } from "../modules/correlationMiddleware";

const isTest = process.env.NODE_ENV === "test";

const correlationIdFormat = format((info) => {
  info.correlationId = getCorrelationId();
  return info;
});

const logger = createLogger({
  level: isTest ? "silent" : "info",
  format: format.combine(
    correlationIdFormat(),
    format.timestamp(),
    format.json(),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

export default logger;
