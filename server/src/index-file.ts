import { RequestHandler } from "express";
import path from "path";
import fs from "fs-extra";
import pupa from "pupa";

import { PUBLIC_DATA_KEY, variables } from "./variables";

let indexHtml: string | undefined;

export const indexHandler: RequestHandler = async (_req, res) => {
    if (indexHtml == null) {
        const indexPath = path.join(variables.staticFilesAbsolutePath, "index.html");

        try {
            const template = await fs.readFile(indexPath, "utf8");

            // Replace placeholders with template engine.
            indexHtml = pupa(template, {
                ...variables.htmlValues,
                [PUBLIC_DATA_KEY]: JSON.stringify(variables.htmlValues)
            });
        } catch (error) {
            console.error(error);
            res.statusCode = 404;
            res.send();
            return;
        }
    }

    res.send(indexHtml);
};
