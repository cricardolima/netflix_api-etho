import { Response } from "express";

export const errorHandler = (e: any, response: Response) => {
  response.status(e.status).json({
    error: true,
    message: e.message,
  });
};
