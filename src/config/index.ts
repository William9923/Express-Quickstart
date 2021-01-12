import dotenv from "dotenv";

import { dir } from "./directory";

process.env.NODE_ENV = !!process.env.NODE_ENV ? process.env.NODE_ENV : "development";

if (process.env.NODE_ENV !== "production") {
    const envFound: dotenv.DotenvConfigOutput = dotenv.config();

    if (envFound.error) {
        throw new Error("⚠️  Couldn't find .env file  ⚠️");
    }
}


export const config = {
    dir: dir,
    port: process.env.PORT,
    logs: {
        level: !!process.env.LOG_LEVEL ? process.env.LOG_LEVEL : "debug",
    },
    api: {
        prefix: !!process.env.API_PREFIX ? process.env.API_PREFIX : "/api"
    },
    databaseURL: process.env.MONGO_URL! 
};


