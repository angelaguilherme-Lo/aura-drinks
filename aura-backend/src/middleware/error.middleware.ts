import type { NextFunction, Request, Response } from "express";

import { HttpError } from "../errors/http-error.js";

export function errorMiddleware(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
): void {
  if (error instanceof HttpError) {
    response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
    return;
  }

  const message =
    process.env.NODE_ENV !== "production" && error instanceof Error
      ? error.message
      : "Internal server error";

  response.status(500).json({
    status: "error",
    message,
  });
}
