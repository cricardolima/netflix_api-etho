import { NextFunction, Request } from "express";
import { Schema } from "joi";
import { ValidationException } from "../exceptions/validation.exception";
import { CustomResponse } from "../interfaces/custom-response.interface";

export const validateSchema =
  (schema: Schema) =>
  async (req: Request, res: CustomResponse, next: NextFunction) => {
    try {
      const validated = await schema.validateAsync(req.body, {
        abortEarly: false
      });
      if (validated.error) {
        throw new ValidationException("Invalid fields", validated.error?.details);
      }
      return next();
    } catch (error: any) {
      return res.status(400).json({
        error: error.details.map(({ message }: any) => message).join(", "),
      });
    }
  };
