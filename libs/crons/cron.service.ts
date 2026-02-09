// const nodeCron = require('node-cron');
import { ProductService } from "@modules/product/product.service";
import * as nodeCron from "node-cron";

const productsCron = () => {
  const productsCronjob = nodeCron.schedule("10 * * * * *", async () => {
    await ProductService.getDummyProducts();
    productsCronjob.start();
  });
};

const usersCron = () => {
  const userCronJob = nodeCron.schedule("59 * * * * *", async () => {
    // console.log('Fetching the data from zoho');
    // await UserService.getDummyUsers();
    // createUserRole();
    userCronJob.start();
  });
};

export const cronService = { productsCron, usersCron };
