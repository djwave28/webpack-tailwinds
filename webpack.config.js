/**
 * WebPack Configuration File [webpack.config.js]
 * 
 * Choose the configuration to run in the package.json by setting 
 * the --env.mode parameter to development or production.
 * The targeted configuration is loaded.
 * 
 * Setting are loaded from webpack.config.js by changing
 * the env.* properties.
 * 
 * TailwindsCSS is included in postcss.config.js
 * 
 * ALL CONFIGURATION INSIDE THIS FILE
 */
const path = require('path');
const webpackMerge = require('webpack-merge');


/** mode selector */
const modeConfig = env => require(`./webpack-config/webpack.${env.config}.js`)(env);

module.exports = env => {

    /** source folder  */
    env.src = "src";

    /** distribution folder  */
    env.dist = "dist";

    /** Set domain of local site */
    env.domain = 'webpack-tailwinds.local';

    return webpackMerge(

        {

            // set selected mode ineractively
            mode: env.mode,

            /** The entry array. Multiple files will be concatenated. */
            entry: {
                'plugin': path.resolve(__dirname, `./${env.src}/index.js`)
            }

        },
        modeConfig(env),
    );
};