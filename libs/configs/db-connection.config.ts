import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import AppDataSource from "./data-source";

export class ConnectionManager {
  connection?: DataSource;

  public async fetchDbConnection(): Promise<DataSource> {
    try {
      if (!this.connection) {
        this.connection = await AppDataSource.initialize();
        console.log('DB Connected Successfully!')
      }
      return this.connection;
    } catch (error) {
      throw error;
    }
  }

  public getRepo<T extends ObjectLiteral>(target: EntityTarget<T>): Repository<T> {
    return this.connection?.getRepository(target) as Repository<T>;
  }
}

export const connectionManager = new ConnectionManager();
