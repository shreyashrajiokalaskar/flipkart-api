import { connectionManager } from "configs/db-connection.config";
import { City } from "entities/city.entity";
import { IPincode } from "interfaces/common.interface";

export class CommonService {
    
    public static processPincodeBatch = async (pincodes: IPincode[]) => {
      if (pincodes.length === 0) return;
      const queryRunner = connectionManager.connection?.createQueryRunner();
      await queryRunner?.startTransaction();
      try {
        await queryRunner?.manager.getRepository(City).insert(pincodes);
        await queryRunner?.commitTransaction();
      } catch (error) {
        console.error("Error inserting batch: ROLLING BACK", pincodes);
        await queryRunner?.rollbackTransaction();
        throw error; // Propagate the error
      } finally {
        await queryRunner?.release();
      }
    }
}