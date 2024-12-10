import fs from "fs";
import path from "path";
import { Model, Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize";
import DOT_ENV from "../../config.env";

interface DbInterface {
  [key: string]: any;
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
}

const basename = path.basename(__filename);
const env = DOT_ENV.env || "dev";
const config = require("../configs/config")[env]; // Adjust path if needed
const config2 = require("../configs/config"); // Adjust path if needed
const db: DbInterface = {} as DbInterface;

let sequelize: Sequelize;
if (config?.use_env_variable) {
  sequelize = new Sequelize(
    process.env[config.use_env_variable] as string,
    config
  );
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    dialect: config.dialect as Dialect, // Type assertion
  });
}

// Dynamically load all models
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).default(
      sequelize,
      Sequelize
    );
    db[model.name] = model as Model;
  });

// Run associations if any exist
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
