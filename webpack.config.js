/**
 * WebPack Configuration File [webpack.config.js]
 */

// const { log } = require("console");
const path = require("path");
const { merge } = require("webpack-merge");
const env = require("cross-env");

/** mode selector */
const modeConfig = (env) =>
  require(`./webpack-config/webpack.${env.config}.js`)(env);

module.exports = (env) => {
  /** source folder  */
  env.src = "src";

  /** distribution folder  */
  env.dist = "dist";

  /** Set domain of local site */
  env.domain = "webpack-tailwinds.local.com";

  /** Set port for development */
  env.port = "8080";

  /** Set root dir */
  env.dirname = path.resolve(__dirname);

  /** Default Configuration Object (partial) */
  const commonConfig = {
    // entry
    entry: { main: path.resolve(__dirname, "./src/index") },
    mode: env.mode,
    devtool: false,
  };

  /** import configurtion specifics for development OR production */
  const devConfig = modeConfig(env);

  /** merging default config with development or production*/
  return merge(commonConfig, devConfig);
};
