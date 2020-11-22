import { RequestHandler } from "express";
import debug from "debug";

export const logger = debug("rw-server");
logger.enabled = true;

export const loggingMiddleware: RequestHandler = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const status = res.statusCode;

    logger(`${status} ${method}: ${url}`);
    next();
};
