// eslint-disable-next-line @typescript-eslint/no-var-requires
import dotenv from "dotenv";
dotenv.config();

import path from "path";

function getEnvironmentVariables(prefix: string, omitPrefix: boolean = false) {
    const result: { [key: string]: string | undefined } = {};
    const resolvedKeys = Object.keys(process.env).filter((x) => x.startsWith(prefix));

    for (const key of resolvedKeys) {
        const resultKey = !omitPrefix ? key : key.slice(prefix.length);
        result[resultKey] = process.env[key];
    }

    return result;
}

const PREFIX = "REACTWAY_";
const SETTINGS_PREFIX = `${PREFIX}SETTINGS_`;
const HTML_PREFIX = `${PREFIX}HTML_`;
export const PUBLIC_DATA_KEY = `${PREFIX}PUBLIC_DATA`;
const PUBLIC_DATA_PREFIX = `${PUBLIC_DATA_KEY}_`;

const settings = {
    port: process.env[`${SETTINGS_PREFIX}PORT`] ?? 80,
    assetsPath: process.env[`${SETTINGS_PREFIX}ASSETS_PATH`] ?? "wwwroot",
    publicDataOmitPrefixKey: process.env[`${SETTINGS_PREFIX}PUBLIC_DATA_OMIT_PREFIX_KEY`] === "true",
    publicDataServeJson: process.env[`${SETTINGS_PREFIX}PUBLIC_DATA_SERVE_JSON`] !== "false"
};

export const variables = {
    settings,
    htmlValues: getEnvironmentVariables(HTML_PREFIX),
    publicDataValues: getEnvironmentVariables(PUBLIC_DATA_PREFIX, settings.publicDataOmitPrefixKey),
    staticFilesAbsolutePath: path.resolve(process.cwd(), settings.assetsPath)
};
