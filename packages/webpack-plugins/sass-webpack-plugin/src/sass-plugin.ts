/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import type { Compiler, RuleSetRule } from "webpack";
import path from "path";
import autoprefixer from "autoprefixer";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SASSPluginOptions {}

export class ReactwaySASSPlugin {
    constructor(protected readonly options: SASSPluginOptions = {}) {}

    public apply(compiler: Compiler): void {
        compiler.options.resolveLoader = compiler.options.resolveLoader ?? {};
        compiler.options.resolveLoader.modules = [
            ...(compiler.options.resolveLoader.modules ?? ["node_modules"]),
            path.resolve(__dirname, "../node_modules")
            // For local testing with yarn linking.
            // path.resolve(__dirname, "../../../node_modules")
        ];

        const rule: RuleSetRule = {
            test: /\.s[ac]ss$/i,
            use: [
                "style-loader",
                "css-loader",
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [autoprefixer()],
                            sourceMap: true
                        }
                    }
                },
                "sass-loader"
            ]
        };

        // Apply configuration
        compiler.hooks.afterEnvironment.tap(ReactwaySASSPlugin.name, () => {
            compiler.options.module = compiler.options.module ?? { rules: [] };
            if (compiler.options.module.rules == null) {
                compiler.options.module.rules = [];
            }

            compiler.options.module.rules.push(rule);
        });
    }
}
