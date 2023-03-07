// const nodeCron = require('node-cron');
import * as nodeCron from 'node-cron';

const productsCron = () => {
  const productsCronjob = nodeCron.schedule('10 * * * * *', async () => {
    // await productService.getDummyProducts();
    // setCategories();
    productsCronjob.start();
  });
};

const usersCron = () => {
  const userCronJob = nodeCron.schedule('59 * * * * *', async () => {
    // console.log('Fetching the data from zoho');
    // await userService.getDummyUsers();
    // createUserRole();
    userCronJob.start();
  });
};

const cronService = { productsCron, usersCron };
export default cronService;
