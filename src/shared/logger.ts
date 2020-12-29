import * as winston from "winston";

import { config } from "../config";

const option: winston.LoggerOptions = {
    transports: [
        new winston.transports.Console({
            level: process.env.NODE_ENV === "production" ? "error" : "debug",
            handleExceptions: true,
        }),
        new winston.transports.File({
            level: process.env.NODE_ENV === "production" ? "error" : "debug",
            filename: `${config.dir}/../.logs/apps.log`,
            handleExceptions: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        })
    ]
};

const LOG: winston.Logger = winston.createLogger(option);

if (process.env.NODE_ENV !== "production") {
    LOG.debug("Logging initialized at debug level");
}

export default LOG;
