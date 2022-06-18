import { Router } from "express";
import { UserController } from "../controllers";
import { validateSchema } from "../middlewares";
import { createUserSchema } from "../schemas";

export const userRoutes = Router();

userRoutes.post("/user", validateSchema(createUserSchema), UserController.createUser);