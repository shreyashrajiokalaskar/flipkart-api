import { DataSource } from "typeorm";
import DOT_ENV from "../../config.env";

const { database, username, password, host, DB_PORT } = DOT_ENV;

export const AppDataSource = new DataSource({
  type: "postgres",
  host,
  port: DB_PORT ?? 5432,
  username,
  password,
  database,
  synchronize:false,
  logging:true,
  entities:[...["libs/entities/*.ts"]],
  migrations: ["libs/migrations/*.ts"],
  migrationsRun:true
})
