import { NextFunction, Request, Response } from "express";
import JSONHttpError from "../errors/JSONHttpError";
import HttpError from "../errors/HttpError";

const errorHandler = async (err: HttpError, req: Request, res: Response, next: NextFunction): Promise<void | Response<any>> => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);

    // JSON API error
    if (err instanceof JSONHttpError) {
        return res.json(err.jsonify());
    }

    // Default error Handling
    return res.render("partials/error", {
        error: err
    });
};

export default errorHandler;