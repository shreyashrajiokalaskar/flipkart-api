// import logger from "../common/logger";
import { Sequelize } from 'sequelize';

// const { database, username, password, host, port } = DOT_ENV;

export const sequelizeInstanceCreation = () => {
  return new Sequelize(
    `${process.env.DB_NAME as string}`,
    `${process.env.DB_USERNAME as string}`,
    `${process.env.DB_PASSWORD as string}`,
    {
      host: process.env.DB_HOST,
      dialect: 'postgres',
      port: 5432,
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
