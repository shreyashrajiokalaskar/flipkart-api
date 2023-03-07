import { Request, Response, Router } from 'express';

const userRouter = Router();

userRouter.get('', (req: Request, res: Response) => {
  res.status(200).json({ data: 'GET USER!' });
});

userRouter.post('', (req: Request, res: Response) => {
  if (req.body) res.status(200).json({ data: 'GET USER!' });
});

export default { userRouter };
