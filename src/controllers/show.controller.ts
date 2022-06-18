import { Request, Response } from "express";
import { errorHandler } from "../middlewares/error-handler.middleware";
import { ShowService } from "../services";

export class ShowController {
  public static async getAllShows(_: Request, res: Response) {
    const shows = new ShowService().getAll();
    res.json(shows);
  }

  public static async getShowById(req: Request, res: Response) {
    try {
      const show = await new ShowService().listOne(Number(req.params.id));
      res.json(show).status(200);
    } catch (e: any) {
      errorHandler(e, res);
    }
  }

  public static async createShow(req: Request, res: Response) {
    try {
      const show = req.body;
      const createdShow = await new ShowService().create(show);
      res.json(createdShow).status(201);
    } catch (e: any) {
      errorHandler(e, res);
    }
  }

  public static async deleteShow(req: Request, res: Response) {
    try {
      const show = await new ShowService().delete(Number(req.params.id));
      res.json(show).status(200);
    } catch (e: any) {
      errorHandler(e, res);
    }
  }
}
