import { Request } from "express";
import { HTTP_STATUS } from "../enums/http-status.enum";
import { CustomResponse } from "../interfaces/custom-response.interface";
import { ShowService } from "../services";

export class ShowController {
  public static async getAllShows(_: Request, res: CustomResponse) {
    try {
      const shows = await new ShowService().getAll();
      res.json(shows).status(HTTP_STATUS.OK);
    } catch (e: any) {
      res.errorHandler && res.errorHandler(e);
    }
  }

  public static async getShowById(req: Request, res: CustomResponse) {
    try {
      const show = await new ShowService().listOne(+req.params.id);
      res.json(show).status(HTTP_STATUS.OK);
    } catch (e: any) {
      res.errorHandler && res.errorHandler(e);
    }
  }

  public static async createShow(req: Request, res: CustomResponse) {
    try {
      const show = req.body;
      const createdShow = await new ShowService().create(show);
      res.json(createdShow).status(HTTP_STATUS.CREATED);
    } catch (e: any) {
      res.errorHandler && res.errorHandler(e);
    }
  }

  public static async deleteShow(req: Request, res: CustomResponse) {
    try {
      const show = await new ShowService().delete(+req.params.id);
      res.json(show).status(HTTP_STATUS.OK);
    } catch (e: any) {
      res.errorHandler && res.errorHandler(e);
    }
  }
}
