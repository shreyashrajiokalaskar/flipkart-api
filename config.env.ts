import dotenv from "dotenv";

dotenv.config();

const DOT_ENV = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  PORT: process.env.PORT || 3000,
  DB_PORT: parseInt(process.env.DB_PORT || "3333"),
  env: process.env.NODE_ENV,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  batchSize: process.env.BATCH_SIZE ?? 5000,
  mailerUsername: process.env.MAILER_USER_NAME,
  mailerPassword: process.env.MAILER_PASSWORD,
  mailerHost: process.env.MAILER_HOST,
  mailerPort: process.env.MAILER_PORT,
};
export default DOT_ENV;
