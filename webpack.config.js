const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const configuration = {
    entry: "./demo",
    output: {
        path: __dirname + "/build",
        pathinfo: true,
        filename: "[name].js",
    },
    mode: "development",
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
    },
    module: {
        rules: [{
            test: /\.ts(x?)$/,
            use: ["ts-loader"],
        }, {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"],
        }],
    },
    devtool: "eval",
    plugins: [
        new HtmlWebpackPlugin({
            template: "./demo/index.html",
        }),
    ],
    devServer: {},
};

module.exports = configuration;
