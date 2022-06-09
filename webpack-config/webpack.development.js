/**
 * Web Pack Configuration | Development
 *
 * Compiles source file and push to output in memory. The JS file
 * is served from the LiveServer path at port 8080.
 *
 * Import CSS and Sass in source file:
 * example: import sass from './style.scss';
 *
 * Dependencies:
 * Chikidar         -   Hot push of changes in PHP files
 * PostCSS          -   Prefixing and Tailwinds CSS
 * MiniCssExtract   -   Extracting to file
 *
 * !!IMPORTANT:
 * The assets are serverd from the live server at port 8080. The assets
 * must be linked correctly to the HTML file in order to function as
 * intended. Makes sure the domain is set up.
 *
 *  http://domain.com:8080/dist
 *
 * Configure the domain and dist folder in webpack.config.js
 *
 * Commands:
 * - npm run build
 * - nmp run production
 *
 *
 * =============================================================
 */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const chokidar = require("chokidar");
const webpack = require("webpack");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => ({
  stats: env.stats,

  /** Name the output file and set the publishing path */
  output: {
    filename: "[name].js",
    path: path.resolve(env.dirname, env.dist),
    /** set public path for the dev server */
    publicPath: `http://${env.domain}:${env.port}/${env.dist}/`,
  },

  /** loading modules | loaders */
  module: {
    rules: [
      /** loading setup for CSS|SASS */
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,

          {
            loader: "css-loader",
          },

          {
            loader: "sass-loader",
          },

          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: [require("tailwindcss"), require("autoprefixer")],
              },
            },
          },
        ],
      },

      /** loading setup for JS with Babel*/
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },

  /** Additional plugins */
  plugins: [
    /** Extracting the compiled embedded css to a seperate file */
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],

  /**
   * Dev Server
   *
   * Lets the project run in a development server.
   *
   * Default the dev server runs default on localhost:8080. To run
   * with PHP the dev server can be configured to run within its
   * own server. In this example 'webpack-tailwinds.local'
   *
   * The dev server can be configured with a port (example: 8080)
   *
   *
   * This wil make sure that the JS and CSS files are served from memory
   *
   */

  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    host: `${env.domain}`,
    port: `${env.port}`,
    open: true,
    hot: true,
    compress: true,
    proxy: {
      "*": {
        target: `http://${env.domain}`,
        changeOrigin: true,
        secure: false,
      },
    },
    onBeforeSetupMiddleware(server, sockets) {
      const files = ["./**/*.php"];
      chokidar
        .watch(files, {
          alwaysStat: true,
          atomic: false,
          followSymlinks: false,
          ignoreInitial: true,
          ignorePermissionErrors: true,
          persistent: true,
          usePolling: true,
        })
        .on("all", () => {
          server.sendMessage(server.webSocketServer.clients, "content-changed");
        });
    },
  },
});
