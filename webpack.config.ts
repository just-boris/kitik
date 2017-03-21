import webpack = require("webpack");
import HtmlWebpackPlugin = require("html-webpack-plugin");

const configuration: webpack.Configuration = {
    entry: "./demo",
    output: {
        path: __dirname + "/build",
        pathinfo: true,
        filename: "[name].js",
    },
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

export default configuration;
