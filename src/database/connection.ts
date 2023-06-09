import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [__dirname + "/../**/*.entity.ts"],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
  .then(() => console.log("connected success"))
  .catch((error) => console.log(error));
