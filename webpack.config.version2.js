/**
 * webpack.config.js
 * 
 * version 2
 * 
 * Install the dependencies npm modules
 * npm i --save-dev webpack webpack-cli css-loader sass-loader node-sass postcss-loader autoprefixer mini-css-extract-plugin glob-all purgecss-webpack-plugin
 * npm i --save lodash
 * 
 * Create a postcss.config.js
 * Add following:
 * 
 
 module.exports = {
    plugins: [
        require('autoprefixer')
    ]
 };

 * Import the sass file in the index.js (entry point file)
 * - import sass from './style.scss';
 * 
 * Version 2:
 * - Compiles javascript and sass
 * - prefixes css rules
 * - purge css if not used in html/php
 */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin')
var glob = require('glob-all');


const PATHS = {
    src: path.join(__dirname, 'src'),
    views: path.join(__dirname, 'views'),
}


//
module.exports = {
    mode: 'development',

    /**
     * The entry point can also be an array with a path resolve
     */

    entry: {
        'main': [
            path.resolve(__dirname, './src/index.js')
        ],
    },

    /** Name the output file and set the publishing path */
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },

    /** loading modules | loaders */
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [

                    MiniCssExtractPlugin.loader,


                    { loader: "css-loader" },


                    { loader: "sass-loader" },


                    {
                        loader: 'postcss-loader',
                        options: {
                            // sourceMap: true,
                            config: {
                                path: 'postcss.config.js'
                            }
                        }
                    },


                ]

            },
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


            /** also added a views folder */
            paths: glob.sync([
                `${PATHS.src}/**/*`,
                './index.php',
                `${PATHS.views}/**/*.php`
            ]),

        }),

    ],

};