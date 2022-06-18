import express, { Application } from "express";
import morgan from "morgan";
import { errorHandlerMidleware } from "../middlewares";
import { authRoutes } from "./auth.router";
import { showRoutes } from "./show.router";
import { userRoutes } from "./user.router";

const routes = [
    showRoutes,
    authRoutes,
    userRoutes
]

export const routesInicializer = (app: Application) => {
    app.use(express.json())
    app.use(morgan("dev"))
    app.use(errorHandlerMidleware)
    app.use(routes)
}