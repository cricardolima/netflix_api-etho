import { Router } from "express";
import { ShowController } from "../controllers";
import { validateSchema } from "../middlewares";
import { createShowSchema } from "../schemas/create-show.schema";
import passport from "passport";

export const showRoutes = Router();

showRoutes.get("/show", passport.authenticate("jwt", { session: false }), ShowController.getAllShows);
showRoutes.get("/show/:id", ShowController.getShowById);
showRoutes.post("/show", validateSchema(createShowSchema), ShowController.createShow);
showRoutes.delete("/show/:id", ShowController.deleteShow);