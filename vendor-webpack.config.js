const path = require("path");
const webpack = require("webpack");

const dllVariableName = "[name]_dll";

module.exports = function (env) {
    return {
        entry: {
            "vendor": [
                //"expose-loader?$!jquery",
                "jquery",
            ]
        },
        output: {
            path: path.join(__dirname, "dist"),
            library: dllVariableName,
            filename: "[name].bundle.js"
        },
        module: {
            rules: [
                {
                    test: require.resolve("jquery"),
                    loader: "expose-loader",
                    options: "$"
                }
            ]
        },
        resolve: {
            modules: [
                "node_modules"
            ]
        },
        plugins: [
            new webpack.DllPlugin({
                path: "dist/[name]-manifest.json",
                name: dllVariableName
            })
        ]
    };
};