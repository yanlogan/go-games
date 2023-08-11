const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(s[ac]|c)ss$/,
        use: [
          // MiniCssExtractPlugin.loader, // for production
          "style-loader",
          {
            loader: "css-loader",
            options: { sourceMap: false },
          },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[hash][ext][query]",
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[hash][ext][query]",
        },
      },
    ],
  },
  devServer: {
    port: 3000,
    allowedHosts: [".ngrok-free.app", ".loca.lt"],
  },
};
