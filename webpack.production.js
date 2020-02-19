/**
 * Web Pack Configuration | Production
 * 
 * Contains: 
 * - Standard web pack behavior for JS files, with embedded style imports
 * 
 * Extended with:
 * - Added processing for SASS 
 * - Extraction CSS to seperate file
 * - PostCSS for prefixing CSS
 * - Purge CSS to delete unused styles
 * 
 * TailwindsCSS is included in postcss.config.js
 * 
 */
const path = require('path');
const glob = require('glob-all');
/** Module for extracting CSS */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/** PurgeCSS for production environment */
const PurgecssPlugin = require('purgecss-webpack-plugin')
/** Setting path and uri constant variables */
const PATHS = {
    src: path.join(__dirname, 'src'),
    views: path.join(__dirname, 'views'),
    dist: path.join(__dirname, 'dist'),

}




//
module.exports = {

    /** The entry array. Multiple files will be concatenated. */
    entry: {
        'main': [
            path.resolve(__dirname, './src/index.js'),
            // path.resolve(__dirname, `${PATHS.src}/index.js`),

        ]
    },

    /** Name the output file and set the publishing path */
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },

    /** loading modules | loaders */
    module: {
        rules: [

            /** loading setup for CSS|SASS */
            {
                test: /\.s[ac]ss$/i,
                use: [

                    MiniCssExtractPlugin.loader,


                    { loader: "css-loader" },


                    { loader: "sass-loader" },


                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: 'postcss.config.js'
                            }
                        }
                    },


                ]

            },

             /** loading setup for JS with Babel*/
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env"]
                }
            }

        ]
    },

    /** Adding plugins */
    plugins: [

        /** Extracting the compiled embedded css to a seperate file */
        new MiniCssExtractPlugin({

            filename: '[name].css',
            chunkFilename: '[id].css',

        }),

        /** Scanning files for used styles | id's and classes */
        new PurgecssPlugin({

            paths: glob.sync([
                './src/**/*',
                // `${PATHS.src}/**/*`,
                './index.html',
                './index.php',
                './views/a**/*.php'
                // `${PATHS.views}/**/*.html`
            ]),

        }),

    ],


}
