import { Request } from "express";
import handler from "../../controllers/handler.factory";
import multer from "multer";
import { Review } from "entities/review.entity";

export class ReviewController{
  
  public static multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "apps/flipkart-api/src/assets");
    },
    filename: (req: any, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `user-${Date.now()}.${ext}`);
    },
  });
  
  public static multerFilter = (req: Request, file: any, cb: any) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("File is not image type"));
    }
  };
  
  public static upload = multer({
    storage: this.multerStorage,
    fileFilter: this.multerFilter,
  });
  
  public static uploadUserPhoto = this.upload.single("photo");
  
  public static createReview = async (req: any, res: any, next: any) => {
    try {
      if (!req.body.product) req.body.product = req.body.id;
      if (!req.body.reviewer) req.body.reviewer = req.user._id;
      const review = await Review.create(req.body);
      res.status(201).json({ data: { review, totalCount: 1 }, status: 201 });
    } catch (error: any) {
      res.status(400).json({ data: error.message, status: 400 });
    }
  };
  
  public static getReview = async (req: Request, res: any, next: any) => {
    try {
      let filter = {};
      if (req.params.id)
        filter = {
          product: req.params.id,
        };
      // const review = await ReviewModel.find(filter).populate({
      //   path: 'reviewer',
      //   select: 'firstName lastName',
      // });
      // // .populate('product');
      // res
      //   .status(200)
      //   .json({ data: { review, totalCount: review.length }, status: 200 });
    } catch (error: any) {
      res.status(400).json({ data: error.message, status: 400 });
    }
  };
  
  public static deleteReview = handler.deleteOne(Review);
  
  // const deleteReview = async (req: Request, res, next) => {
  //   try {
  //     const review = ReviewCollection.reviewModel.findByIdAndDelete(
  //       req.params.id
  //     );
  //     res
  //       .status(204)
  //       .json({ data: { review, totalCount: review.length }, status: 204 });
  //   } catch (error: any) {
  //     throw new Error(error.message);
  //   }
  // };
  

}
