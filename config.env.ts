const dotenv = require("dotenv");
dotenv.config();
console.log(process.env, "this is DOt ");
const DOT_ENV = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  // development_port: process.env.PORT,
  // sendGrid_api: process.env.SENDGRID_API,
  // email: process.env.EMAIL,
  // jwt_secret_key: process.env.JWT_SECRET_KEY,
  port: parseInt(process.env.DB_PORT || "3333"),
  // get_users_zoho_api: process.env.GET_USERS_ZOHO_API,
  // secretkey: process.env.ZOHO_SECRET_KEY,
};
export default DOT_ENV;
