import { Router } from "express";
import { CommonController } from "./common.controller";

// const getProducts = async (req:any, res:any, next:any) => {};
const commonRouter = Router();
// Making this API open for all
commonRouter.post("/seed-pincodes", CommonController.seedPincodes);

export default commonRouter;