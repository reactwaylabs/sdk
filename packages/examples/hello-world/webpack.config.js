const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");

const { ReactwayTypeScriptPlugin } = require("@rw-sdk/typescript-webpack-plugin");
const { ReactwayCSSPlugin } = require("@rw-sdk/css-webpack-plugin");

const webpackMode = process.env.NODE_ENV === "production" ? "production" : "development";
const isDevelopment = webpackMode !== "production";

module.exports = {
    entry: "./src/app.tsx",
    devtool: "inline-source-map",
    target: "web",
    mode: webpackMode,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        chunkFilename: "[contenthash].chunk.js"
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        contentBase: path.join(__dirname, "dist"),
        host: "0.0.0.0",
        port: 9000
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            maxSize: 700 * 1024
        }
    },
    plugins: [
        ...(isDevelopment ? [new HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()] : []),
        new ReactwayTypeScriptPlugin(),
        new ReactwayCSSPlugin(),
        new HtmlWebpackPlugin({
            template: require("html-webpack-template"),
            meta: [
                {
                    charset: "UTF-8"
                },
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1.0"
                },
                {
                    name: "robots",
                    content: "noindex"
                }
            ],
            appMountId: "root",
            title: "React page"
            // publicPath: "{REACTWAY_HTML_PUBLIC_PATH}",
            // base: "{REACTWAY_HTML_BASE_PATH}",
            // headHtmlSnippet: "<script>window.SERVER_DATA = {REACTWAY_PUBLIC_DATA};</script>"
        })
    ]
};
