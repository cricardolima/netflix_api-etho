import express, { Application } from "express";
import morgan from "morgan";
// import { errorHandler } from "../middlewares";
import { showRoutes } from "./show.router";

const routes = [
    showRoutes
]

export const routesInicializer = (app: Application) => {
    app.use(express.json())
    app.use(morgan("dev"))
    app.use(routes)
}