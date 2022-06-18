import { NextFunction, Request } from "express";
import { HTTP_STATUS } from "../enums/http-status.enum";
import HttpException from "../exceptions/http.exception";
import { CustomResponse } from "../interfaces/custom-response.interface";

export const errorHandlerMidleware = (_: Request, res: CustomResponse, next: NextFunction) => {
  res.errorHandler = (error: any) => {
    if(error instanceof HttpException) {
      res.status(error.status).send({
        message: error.message,
        details: error
      });
    } else {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
        message: "Internal server error",
        details: error
      });
    }
  }
  next();
}