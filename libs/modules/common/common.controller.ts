import { IPincode } from "interfaces/common.interface";
import DOT_ENV from "../../../config.env";
import fs from "fs";
import csv from "csv-parser";
import { CommonService } from "./common.service";
import { Request, Response } from "express";
import { controllerHandler } from "utils/common-handler";
import { connectionManager } from "configs/db-connection.config";
import { City } from "entities/city.entity";
import { errorResponse } from "utils/error.common";
import { successResponse } from "utils/success.response";

export class CommonController {
  public static seedPincodes = controllerHandler(
    async (req: Request, res: Response) => {
      const filePath = `${process.cwd()}/libs/uploads/pincodes.csv`;
      const batchSize = DOT_ENV.batchSize; // Adjusted for better performance
      const pincodes: IPincode[] = [];
      let nonDelivery = 0;
      const batchPromises: Promise<void>[] = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data: any) => {
          if (data.Delivery === "Non Delivery") {
            nonDelivery++;
            return;
          }
          const pincode = Number(data.Pincode);
          if (isNaN(pincode)) {
            console.error(`Invalid pincode: ${data.Pincode}`);
            return;
          }

          pincodes.push({
            pincode: pincode,
            name: data["Office Name"],
            state: data.StateName,
            district: data.District,
          });

          if (pincodes.length === batchSize) {
            batchPromises.push(
              CommonService.processPincodeBatch([...pincodes]).catch((err) => {
                console.error("Batch failed:", err);
              })
            );
            pincodes.length = 0;
          }
        })
        .on("end", async () => {
          try {
            if (pincodes.length > 0) {
              batchPromises.push(
                CommonService.processPincodeBatch([...pincodes]).catch(
                  (err) => {
                    console.error("Batch failed:", err);
                  }
                )
              );
            }
            // Process promises sequentially
            for (const batchPromise of batchPromises) {
              try {
                await batchPromise;
              } catch (err) {
                console.error("Batch failed:", err);
              }
            }

            res.send(
              `Data has been successfully inserted into the database. Non-Delivery: ${nonDelivery}`
            );
          } catch (error: any) {
            res
              .status(500)
              .send(`Error inserting data into the database: ${error.message}`);
          }
        })
        .on("error", (err: any) => {
          res.status(500).send(`Error processing CSV file: ${err.message}`);
        });
    }
  );

  public static findPincode = controllerHandler(
    async (req: Request, res: Response) => {
      const { pincode } = req.params;
      const city = await connectionManager.getRepo(City).find({
        where: {
          pincode: +pincode,
        },
      });

      if (!city?.length) {
        return errorResponse(res, 404, "Pincode not found!");
      }
      successResponse(res, 200, "", city, city.length);
    }
  );
}
