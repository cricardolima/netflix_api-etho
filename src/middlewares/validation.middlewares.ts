import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export const validateSchema =
  (schema: Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      return next();
    } catch (error: any) {
      return res.status(400).json({
        error: error.details.map(({ message }: any) => message).join(", "),
      });
    }
  };
