import cors from "cors";
import express from "express";
import helmet from "helmet";
import { handleErrorMiddleware } from "middlewares/error.middleware";
import Router from "modules/routes";
import path from "path";
import DOT_ENV from "../config.env";
import { connectionManager } from "./configs/db-connection.config";
// import swaggerSpec from "libs/swagger";

const app = express();

// Set Pug as view engine
// app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "libs/api-common/src/lib/views"));
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(helmet()); // Secure HTTP headers
app.use(express.json({ limit: "10kb" })); // Body parser
app.use(cors()); // Enable CORS

// Serve Swagger UI
// app.use('/swagger', serve, setup(swaggerSpec));

// Socket.IO Setup
// const socketServer = http.createServer(app);
// const io = new Server(socketServer, {
//   cors: {
//     origin: "http://localhost:4200",
//     credentials: true,
//   },
// });

const port = DOT_ENV.PORT || 3000;

// io.on("connection", (socket) => {
//   console.log("Socket connected 💀");
//   socket.on("message", (msg) => {
//     console.log("message: " + msg);
//   });
// });
// socketServer.listen(process.env.SOCKET_PORT, () => {
//   console.log(
//     `➡ Socket Listening at http://localhost:${process.env.SOCKET_PORT}/api`
//   );
// });
app.listen(port, async () => {
  console.log(`➡ Listening at http://localhost:${port}/api`);
  await connectionManager.fetchDbConnection();
  // await cronService.productsCron();
});

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Health Check API for the service
 *     responses:
 *       200:
 *         description: Returns 200 if the service is functioning
 */
app.get("/health-check", (req: any, res, next) => {
  res.status(200).json({
    data: "Server has started and is working!",
  });
});

Router.init(app);

// // 404 Route
// app.all("*", (req: Request, res: Response, next: NextFunction) => {
//   next(errorResponse(res, 404, `${req.originalUrl} not found!!!`));
// });

// Error Handling Middleware
app.use(handleErrorMiddleware);
