import "reflect-metadata";
import express from "express";
import { databaseConnector } from "./configs/database/data-source";
import { routesInicializer } from "./src/routers";

const app = express();

const PORT = 3000;

databaseConnector();

routesInicializer(app);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
