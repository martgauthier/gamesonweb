const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
    resolve: {
        extensions: [".ts", ".js"],
    },
    mode: "development",
    output: {
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
            },
        ],
    },
    plugins: [
        /*new CopyPlugin({
            patterns: [
                {from: path.resolve(__dirname, "src/assets"), to: path.resolve(__dirname, "public/assets")}
            ]
        })*/ //uncomment if we add assets
    ]
};