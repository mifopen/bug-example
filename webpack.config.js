const path = require("path");
const webpack = require("webpack");

module.exports = function (env) {
    return {
        entry: {
            "source": "./source.js",
        },
        output: {
            path: path.join(__dirname, "dist"),
            publicPath: "/",
            filename: "[name].bundle.js"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                cacheDirectory: true,
                                presets: ["es2015"]
                            }
                        }
                    ]
                },
            ]
        },
        resolve: {
            modules: [
                __dirname,
                "node_modules"
            ]
        },
        plugins: [
            new webpack.DllReferencePlugin({
                context: ".",
                manifest: require("./dist/vendor-manifest.json")
            })
        ]
    };
};