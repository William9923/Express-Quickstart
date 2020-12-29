import errorHandler from "errorhandler";
import app from "./app";
import LOG from "./shared/logger";

/**
 * Error Handler. Provides full stack
 */
if (process.env.NODE_ENV === "development") {
    app.use(errorHandler());
}

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
    console.log(`App is running at http://localhost:${app.get("port")} in ${app.get("env")} mode`);
    console.log("  Press CTRL-C to stop\n");
});

export default server;