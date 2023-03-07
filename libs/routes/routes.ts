import userRouter from './user/user.router';
import { IRoutes } from './../interfaces/route.interface';
import authRouter from './auth/auth.router';
import productRouters from './product/product.router';
import orderRouter from './order/order.router';
import ReviewRouter from './review/review.router';
const routes: IRoutes = {
  allRoutes: [
    {
      path: 'user',
      router: userRouter.userRouter,
    },
    {
      path: 'auth',
      router: authRouter.authRouter,
    },
    {
      path: 'products',
      router: productRouters.productRouter,
    },
    {
      path: 'order',
      router: orderRouter,
    },
    {
      path: 'review',
      router: ReviewRouter,
    },
  ],
};

routes.init = (app: any) => {
  if (!app || !app.use) {
    console.error(
      '[Error] Route Initialization Failed: app / app.use is undefined'
    );
  } else {
    routes.allRoutes.forEach((route) => {
      return app.use(`/api/${route.path}`, route.router);
    });
  }
};

export { routes };
