import mongoose from "mongoose";

import { config } from "../config";
import LOG from "../shared/logger";

// Mongoose connection
export default async (): Promise<void> => {

    // implementation of ...
    const connect = async (): Promise<void> => {
        await mongoose.connect(config.databaseURL, { useNewUrlParser: true, useUnifiedTopology: true });
    };
    connect();

    mongoose.connection.on("error", err => {
        LOG.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("connected", (err, res) => {
        LOG.info("Connected to MongoDB database!");
    });

    mongoose.connection.on("disconnected", connect);
};

