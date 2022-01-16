const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = (env) => {
  const MODE = env.mode;
  const IS_DEV = MODE === "development";
  const IS_PROD = !IS_DEV;

  return {
    mode: MODE,
    devtool: IS_DEV ? "eval-source-map" : "source-map",
    entry: path.resolve(__dirname, "./src/index.js"),
    optimization: {
      minimize: IS_PROD,
      runtimeChunk: {
        name: "runtime",
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "./dist"),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/index.html"),
      }),
    ],
  };
};
