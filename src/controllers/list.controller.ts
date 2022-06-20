import { HTTP_STATUS } from "../enums/http-status.enum";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";
import { CustomRequest } from "../interfaces/custom-request.interface";
import { CustomResponse } from "../interfaces/custom-response.interface";
import { ListService } from "../services/list.service";

export class ListController {
  public static async list(req: CustomRequest, res: CustomResponse) {
    try {
      const myList = req.loggedUser?.list;
      res.status(HTTP_STATUS.OK).json(myList);
    } catch (e: any) {
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: e.message });
    }
  }

  public static async addToList(req: CustomRequest, res: CustomResponse) {
    try {
      const {
        body: { showId },
        loggedUser,
      } = req;

      if (!loggedUser) {
        throw new UnauthorizedException("User is not logged in");
      }

      const added = await new ListService().add(loggedUser, showId);

      res.status(HTTP_STATUS.OK).json(added);
    } catch (e: any) {
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: e.message });
    }
  }

  public static async removeFromList(req: CustomRequest, res: CustomResponse) {
    try {
      const {
        body: { showId },
        loggedUser,
      } = req;
      if (!loggedUser) {
        throw new UnauthorizedException("User is not logged in");
      }

      const removed = await new ListService().remove(+showId, loggedUser);

      res.json(removed);
    } catch (e) {
      res.errorHandler && res.errorHandler(e);
    }
  }
}
