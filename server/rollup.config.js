import path from "path";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import builtins from "builtin-modules";

export default {
    input: "src/server.ts",
    output: {
        file: "dist/server.js",
        format: "cjs",
        banner: "#!/usr/bin/env node"
    },
    external: builtins,
    // prettier-ignore
    plugins: [
        commonjs(),
        json(),
        resolve({ preferBuiltins: true }),
        typescript({ tsconfig: path.resolve(__dirname, "tsconfig.json") }),
    ]
};
