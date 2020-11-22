import express from "express";

import { variables } from "./variables";
import { logger, loggingMiddleware } from "./logging";
import { indexHandler } from "./index-file";

const app = express();

app.use(loggingMiddleware);

app.use((_req, res, next) => {
    res.setHeader("X-Powered-By", "Reactway");
    next();
});

app.get("/", indexHandler);
app.use(express.static(variables.staticFilesAbsolutePath));
app.get("*", indexHandler);

app.listen(variables.settings.port, () => {
    logger(`Starting server on port ${variables.settings.port}.`);
});
