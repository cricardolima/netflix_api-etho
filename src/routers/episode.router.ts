import { Router } from "express";
import { EpisodeController } from "../controllers";
import passport from "passport";
import { validateSchema } from "../middlewares";
import { createEpisodeSchema } from "../schemas";

export const episodeRoutes = Router();

episodeRoutes.post(
  "/episodes",
  passport.authenticate("jwt", { session: false }),
  validateSchema(createEpisodeSchema),
  EpisodeController.createEpisode
);
episodeRoutes.delete("/episodes/:id", EpisodeController.deleteEpisode);
