import { Request } from "express";
import { HTTP_STATUS } from "../enums/http-status.enum";
import { CustomResponse } from "../interfaces/custom-response.interface";
import { UserService } from "../services";

export class UserController {
  public static async createUser(req: Request, res: CustomResponse) {
    try {
      const newUser = await new UserService().create(req.body);
      res
        .json({ id: newUser.id, email: newUser.email, password: undefined })
        .status(HTTP_STATUS.OK);
    } catch (e: any) {
      res.errorHandler && res.errorHandler(e);
    }
  }
}
