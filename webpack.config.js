/**
 * Web Pack Configuration
 * 
 * Documented configuration file for Web Pack with the use of TailwindsCSS
 * 
 * 
 * 
 * 
 * Contains: 
 * - Standard web pack behavior for JS files, with embedded style imports
 * 
 * Extensions:
 * - Added processing for SASS 
 * - Extraction CSS to seperate file
 * - PostCSS for prefixing CSS
 * - Purge CSS to delete unused styles
 * 
 * TailwindsCSS is included in postcss.config.js
 * 
 * 
 */
const path = require('path');
const glob = require('glob-all');

/** Modules for extracting CSS */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/** PurgeCSS for production environment */
const PurgecssPlugin = require('purgecss-webpack-plugin')


/** Chokidar for watching PHP files. | experimental */
const chokidar = require('chokidar');
/** Web Pack for using native plugins */
const webpack = require('webpack');


/** Setting constant variables */

const URI = 'http://webpack-tailwinds.local';

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
            path.resolve(__dirname, './src/index.js'),

        ]
    },

    /** Name the output file and set the publishing path */
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        /** set public path for the dev server */
        publicPath: 'http://webpack-tailwinds.local:8080/dist/'
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
                            sourceMap: true,
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
        // new PurgecssPlugin({

        //     paths: glob.sync([
        //         `${PATHS.src}/**/*`,
        //         './index.html',
        //         './index.php',
        //         `${PATHS.views}/**/*.html`
        //     ]),

        // }),

        new webpack.NamedModulesPlugin(),
        // new webpack.HotModuleReplacementPlugin()
        // new HtmlWebpackPlugin(),

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
     * Set the publicPath in output:
     * publicPath: 'http://webpack-tailwinds.local:8080/dist/'
     * 
     * This wil make sure that the JS and CSS files are served from memory
     * 
     */
    devServer: {
        headers: { 'Access-Control-Allow-Origin': '*' },
        // watchContentBase: true,
        // contentBase: path.resolve(__dirname, "dist"),
        host: 'webpack-tailwinds.local',
        port: 8080,
        open: true,
        writeToDisk: false,
        /**  hot: true, */
        compress: true,
        index: './index.php',
        public: 'webpack-tailwinds.local:8080',
        proxy: {
            '*': {
                target: 'http://webpack-tailwinds.local',
                changeOrigin: true,
                secure: false
            }
        },



        /**
         * Chokidar module, for monitoring php files
         * 
         * The module will push the content ofd the php file, but it 
         * will not compile tailwinds for scanning of classes.
         * 
         * Solution: do not purge css in development
         * 
         * 
         * @param {*} app 
         * @param {*} server 
         */
        before(app, server) {
            const files = [
                "./**/*.php",
            ];
            chokidar.watch(files, {
                alwaysStat: true,
                atomic: false,
                followSymlinks: false,
                ignoreInitial: true,
                ignorePermissionErrors: true,
                persistent: true,
                usePolling: true
            })
                .on('all', () => {
                    server.sockWrite(server.sockets, "content-changed");
                });
        }

    }
}