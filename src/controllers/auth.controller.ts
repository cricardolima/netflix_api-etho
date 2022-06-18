import { Request } from "express";
import { HTTP_STATUS } from "../enums/http-status.enum";
import { CustomResponse } from "../interfaces/custom-response.interface";
import { AuthService } from "../services";

export class AuthController {
  public static async login(req: Request, res: CustomResponse) {
    try {
      const { email, password } = req.body;
      const token = await new AuthService().login(email, password);
      res.json({"token": token}).status(HTTP_STATUS.OK);
    } catch (e) {
      res.errorHandler && res.errorHandler(e);
    }
  }
}
