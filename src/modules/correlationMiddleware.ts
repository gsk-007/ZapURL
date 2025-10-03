import { NextFunction, Request, Response } from "express";
import { AsyncLocalStorage } from "async_hooks";
import { generateShortId } from "./url-helpers";

type AsyncLocalStorageType = {
  correlationId: string;
};
export const asyncLocalStorage = new AsyncLocalStorage<AsyncLocalStorageType>();

export const attachCorrelationIdMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  // Generate a unique correlation ID
  const correlationId = generateShortId(13);

  req.headers["x-correlation-id"] = correlationId;

  // Call the next middleware or route handler

  asyncLocalStorage.run({ correlationId: correlationId }, () => {
    next();
  });
};

export const getCorrelationId = () => {
  const asyncStore = asyncLocalStorage.getStore();
  return (
    asyncStore?.correlationId || "unknow-error-while-creating-correlation-id"
  );
};
