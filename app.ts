import { Server } from "socket.io";
import * as http from "http";
import helmet from "helmet";
import path from "path";
import {
  cronService,
  databaseConnection,
  handleDBCastError,
  handleDuplicateFieldError,
  routes,
} from "./libs";
import cors from "cors";
import CommonError from "./libs/utils/error.common";
import express from "express";
// import xss = require("xss-clean");
// import cors = require("cors");
// import cronService from "libs/api-common/src/lib/crons/cron.service";
// import path = require("path");

const app = express();

app.set("view engine", "pug");
app.set("views", "libs/api-common/src/lib/views");
app.use(express.static(path.join(__dirname, "public")));

const socketServer = http.createServer(app);
const io = new Server(socketServer, {
  cors: {
    origin: "http://localhost:4200",
    // origin: ["https://my-frontend.com", "https://my-other-frontend.com", "http://localhost:3000"],
    credentials: true,
  },
});

// Middlewares
app.use(helmet()); //HTTP Headers Setter

app.use(express.json({ limit: "10kb" })); // Body parser

// Data Sanitization against NoSql Query Injections

// Data Sanitization against XSS
app.use(cors());
// app.use(express.static(`${__dirname}/public`));

// app.use((req:any, res:any, next:any) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, authorization'
//   );
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   next();
// });

const port = process.env.PORT || 3000;
cronService.productsCron();
cronService.usersCron();

io.on("connection", (socket) => {
  console.log("a user connected 💀");
  socket.on("", (msg) => {
    console.log("message: " + msg);
  });
});
socketServer.listen(process.env.SOCKET_PORT, () => {
  console.log(
    `➡ Socket Listening at http://localhost:${process.env.SOCKET_PORT}/api`
  );
});
app.listen(port, () => {
  console.log(`➡ Listening at http://localhost:${port}/api`);
  databaseConnection();
});

app.get("/", (req: any, res, next) => {
  res.status(200).json({
    data: "HEY THERE!!!",
  });
});

routes.init(app);

app.all("*", (req: any, res, next) => {
  // res.status(404).json({
  //   status: 404,
  //   error: `${req.originalUrl} not found!!!`,
  // });
  next(new CommonError(new Error(`${req.originalUrl} not found!!!`)));
});

app.use((error: any, req: any, res: any, next: any) => {
  error.status = error.status || "Error";
  error.statusCode = error.statusCode || 500;
  const commonError = new CommonError(error);
  commonError.sendDevError(error, res);
});
