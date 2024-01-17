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
            {
                test: /\.(glb|babylon)$/,
                type: "asset/resource"
            },
        ],

    }
};