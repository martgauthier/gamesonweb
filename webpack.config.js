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
};