// import logger from "../common/logger";
import { Sequelize } from "sequelize";
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

const sequelize = sequelizeInstanceCreation();

export const databaseConnection = async () => {
  await sequelize.authenticate();
  // if (sequelize) {
  //   logger.info('Database Connected Successfully');
  // } else {
  //   logger.info('Something Went Wrong With Database Connection.');
  // }
};

export { sequelize };
