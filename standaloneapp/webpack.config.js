const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./client/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "../build/",
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/transform-runtime"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "/client/index.html",
    }),
    new MiniCssExtractPlugin(),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        // Lossless optimization with custom option
        // Feel free to experiment with options for better result for you
        plugins: [
          ["gifsicle", { interlaced: true }],
          ["jpegtran", { progressive: true }],
          ["optipng", { optimizationLevel: 5 }],
          [
            "svgo",
            {
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            },
          ],
        ],
      },
    }),
  ],
  devtool: "eval-source-map",
  devServer: {
    // contentBase: path.join(__dirname, "/client"),
    // compress: true,
    // port: 3000,
    publicPath: "/build",
    proxy: {
      "/**": "http://localhost:3000",
    },
    hot: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },
};
