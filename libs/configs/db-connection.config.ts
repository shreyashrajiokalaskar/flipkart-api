import DOT_ENV from "../../config.env";
import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";

const { database, username, password, host, DB_PORT } = DOT_ENV;

const AppDataSource = new DataSource({
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


export class ConnectionManager {
  connection?: DataSource;

  public async fetchDbConnection() : Promise<DataSource>{
    try {
      if(!this.connection){
        this.connection = await AppDataSource.initialize();
      }
      return this.connection;
    } catch (error) {
      throw error;
    }
  }

  public getRepo<T extends ObjectLiteral>(target: EntityTarget<T>): Repository<T>{
    return this.connection?.getRepository(target) as Repository<T>;
  }
}

export const connectionManager = new ConnectionManager();