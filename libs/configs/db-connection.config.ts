// import logger from "../common/logger";
// import { Sequelize } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import DOT_ENV from "../../config.env";

const { database, username, password, host, port } = DOT_ENV;

export const sequelizeInstanceCreation = () => {
  return new Sequelize(
    `${database as string}`,
    `${username as string}`,
    `${password as string}`,
    {
      host: host,
      dialect: "postgres",
      port,
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
  if (sequelize) {
    console.info("Database Connected Successfully");
  } else {
    console.info("Something Went Wrong With Database Connection.");
  }
};
