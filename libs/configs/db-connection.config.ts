// import logger from "../common/logger";
// import { Sequelize } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import DOT_ENV from "../../config.env";
import { redisConnection } from "./redis-connection.config";

const { database, username, password, host, DB_PORT } = DOT_ENV;

export const sequelizeInstanceCreation = () => {
  return new Sequelize(
    `${database as string}`,
    `${username as string}`,
    `${password as string}`,
    {
      host: host,
      dialect: "postgres",
      port: DB_PORT ?? 5432,
      pool: {
        max: 20,
        min: 0,
        acquire: 60000,
      },
    }
  );
};

export const sequelize = sequelizeInstanceCreation();

export const databaseConnection = async () => {
  const dbConnection = await sequelize.authenticate();
  // await redisConnection.connectRedis();
  console.log(database, username, password, host, DB_PORT);
  if (sequelize) {
    console.info("Database Connected Successfully");
  } else {
    console.info("Something Went Wrong With Database Connection.");
  }
};
