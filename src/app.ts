import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

import HomeRoute from "./routes";
import BookRoute from "./routes/Book";
import GenreRoute from "./routes/Genre";

import BookApiRoute from "./routes/api/BookApi";
import GenreApiRoute from "./routes/api/GenreApi";

import logging from "./middlewares/logging";
import errorHandler from "./middlewares/error";

import LOG from "./shared/logger";
import HttpError from "./errors/HttpError";
import { config } from "./config";
import connect from "./shared/connect";

const app = express();

/**
 * Database Configuration
 */
connect();

/**
 * Express config
 */

LOG.info("Load Express Configuration");
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));

/**
 * 3rd party configuration 
 */
LOG.info("Load 3rd party Configuration");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * Custom middleware configuration
 */
LOG.info("Load Custom Middleware Configuration");
app.use(logging);


/**
 * Primary app routes.
 */
LOG.info("Load Primary Apps Routing");
app.use("/", HomeRoute);
app.use("/books", BookRoute);
app.use("/genres", GenreRoute);

/**
 * API routes.
 */
LOG.info("Load API Routing");
app.use(config.api.prefix + "/books", BookApiRoute);
app.use(config.api.prefix + "/genres", GenreApiRoute);


/**
 * Custom error handling
 */
LOG.info("Load Error Handling Middleware");
// 404 Not Found
app.use((req: Request, res: Response, next: NextFunction) => {
    next(new HttpError(404, "No Page Found"));
});
// Exception Handling
app.use(errorHandler);

export default app;