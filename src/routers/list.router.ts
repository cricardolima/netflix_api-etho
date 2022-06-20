import { Router } from "express";
import passport from "passport";
import { AuthController } from "../controllers";
import { ListController } from "../controllers/list.controller";
import { injectUser, validateSchema } from "../middlewares";
import { authSchema } from "../schemas";

export const listRoutes = Router();

listRoutes.get(
  "/list",
  passport.authenticate("jwt", { session: false }),
  injectUser,
  ListController.list
);
listRoutes.post(
  "/list",
  passport.authenticate("jwt", { session: false }),
  injectUser,
  ListController.addToList
);
listRoutes.delete(
  "/list/:id",
  passport.authenticate("jwt", { session: false }),
  injectUser,
  ListController.removeFromList
);
