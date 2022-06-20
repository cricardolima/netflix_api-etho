import { Request } from "express";
import { HTTP_STATUS } from "../enums/http-status.enum";
import { CustomResponse } from "../interfaces/custom-response.interface";
import { EpisodeService } from "../services";

export class EpisodeController {
    public static getAllEpisodes(req: Request, res: CustomResponse) {
        res.send('get all episodes');
    }

    public static getEpisodeById(req: Request, res: CustomResponse) {
        res.send('get episode by id');
    }

    public static async createEpisode(req: Request, res: CustomResponse) {
        try {
            const episode = req.body;
            const createdEpisode = await new EpisodeService().create(episode);
            res.json(createdEpisode).status(HTTP_STATUS.CREATED);
        } catch (e: any) {
            res.errorHandler && res.errorHandler(e);
        }
    }

    public static async deleteEpisode(req: Request, res: CustomResponse) {
        try {
            const episode = await new EpisodeService().delete(+req.params.id);
            res.json(episode).status(HTTP_STATUS.OK);
        } catch (e: any) {
            res.errorHandler && res.errorHandler(e);
        }
    }
}