import userRouter from "./user/user.router";
import { IRoutes } from "./../interfaces/route.interface";
import authRouter from "./auth/auth.router";
import productRouters from "./product/product.router";
import orderRouter from "./order/order.router";
import ReviewRouter from "./review/review.router";

class Router {
  static routes: IRoutes = {
    allRoutes: [
      {
        path: "user",
        router: userRouter.userRouter,
      },
      {
        path: "auth",
        router: authRouter.authRouter,
      },
      {
        path: "products",
        router: productRouters.productRouter,
      },
      {
        path: "order",
        router: orderRouter,
      },
      {
        path: "review",
        router: ReviewRouter,
      },
    ],
  };

  static init(app: any) {
    if (!app || !app.use) {
      console.error(
        "[Error] Route Initialization Failed: app / app.use is undefined"
      );
    } else {
      this.routes.allRoutes.forEach((route) => {
        console.log(route);
        return app.use(`/api/${route.path}`, route.router);
      });
    }
  }
}
export default Router;
