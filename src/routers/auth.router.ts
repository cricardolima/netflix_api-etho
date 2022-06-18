import { Router } from "express";
import { AuthController } from "../controllers";
import { validateSchema } from "../middlewares";
import { authSchema } from "../schemas";

export const authRoutes = Router();

authRoutes.post("/auth", validateSchema(authSchema), AuthController.login);