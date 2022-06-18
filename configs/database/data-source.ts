import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "0112",
  database: "netflix",
  entities: ["src/entities/*.entity.ts"],
  synchronize: true,
});

export const databaseConnector = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection error", error);
  }
};
