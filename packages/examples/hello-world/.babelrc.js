const isDevelopment = process.env.NODE_ENV == "development";

const devPlugins = ["react-refresh/babel"];

module.exports = {
    plugins: [...(isDevelopment ? devPlugins : [])]
};
