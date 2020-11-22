import type { Compiler, RuleSetRule, RuleSetUseItem } from "webpack";
import path from "path";

// TODO: Fix this when webpack types are matching.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

import { resolveTsConfig } from "./utils";

export interface TypeScriptPluginOptions {
    ruleSetUse?: RuleSetUseItem[];
}

export class ReactwayTypeScriptPlugin {
    constructor(protected readonly options: TypeScriptPluginOptions = {}) {}

    public apply(compiler: Compiler): void {
        compiler.options.resolveLoader.modules = [
            ...(compiler.options.resolveLoader.modules ?? ["node_modules"]),
            path.resolve(__dirname, "../node_modules")
            // Testing with linking.
            // path.resolve(__dirname, "../../../node_modules")
        ];

        const tsconfig = resolveTsConfig(compiler.context);

        const rule: RuleSetRule = {
            test: /\.(ts|tsx)$/,
            use: [
                ...(this.options.ruleSetUse ?? []),
                {
                    loader: "babel-loader",
                    options: {
                        babelrc: true,
                        plugins: ["@babel/syntax-dynamic-import"],
                        presets: ["@babel/preset-env"]
                    }
                },
                {
                    loader: "ts-loader",
                    options: {
                        happyPackMode: true,
                        transpileOnly: true
                    }
                }
            ]
        };

        const plugins = [
            new ForkTsCheckerWebpackPlugin({
                eslint: {
                    files: "./src/**/*.{ts,tsx,js,jsx}"
                }
            })
        ];

        // Apply configuration
        compiler.options.plugins.push(...plugins);

        if (tsconfig.configContent?.options.paths != null) {
            if (compiler.options.resolve.plugins == null) {
                compiler.options.resolve.plugins = [];
            }

            compiler.options.resolve.plugins.push(new TsconfigPathsPlugin());
        }

        compiler.hooks.afterEnvironment.tap(ReactwayTypeScriptPlugin.name, () => {
            if (compiler.options.module.rules == null) {
                compiler.options.module.rules = [];
            }

            compiler.options.module.rules.push(rule);
        });

        // Add typescript extensions to the front (high priority).
        const typescriptExtensions = [".ts", ".tsx"];
        const otherExtensions = (compiler.options.resolve.extensions ?? []).filter((x) => !typescriptExtensions.includes(x));
        compiler.options.resolve.extensions = [...typescriptExtensions, ...otherExtensions];
    }
}
