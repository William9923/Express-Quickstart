import { NextFunction, Request, Response } from "express";

import LOG from "../shared/logger";

const logging = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // add any logging requirements
    LOG.info(req.originalUrl);
    next();
};

export default logging;