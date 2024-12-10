import swaggerJSDoc, { Options } from "swagger-jsdoc";
import DOT_ENV from "../config.env";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Flipkart API",
      version: "1.0.0",
      description: "Flipkart App API Documentation",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/api`, // Adjust for your development URL
      },
    ],
  },
  apis: ["./libs/routes/**/*.ts"], // Path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
