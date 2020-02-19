# webpack-tailwinds


Webpack configurations with Tailwinds + PHP

There are two configuration files in this repo. 

- webpack.development.js
- webpack.production.js


To run webpack in a PHP environment, such environment must be provided with a webserver like Apache.

The  configuration file webpack.development.js is configured with:

- Babel
- Sass
- PostCSS
- DevServer
- Chokidar File Watcher



`const path = require('path');
const glob = require('glob-all');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const chokidar = require('chokidar');
const webpack = require('webpack');


const DOMAIN = 'webpack-tailwinds.local';

const PATHS = {
    src: path.join(__dirname, 'src'),
    views: path.join(__dirname, 'views'),
}

module.exports = {
    mode: 'development',
    entry: {
        'main': [
            path.resolve(__dirname, './src/index.js'),

        ]
    },

     output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        /** set public path for the dev server */
        publicPath: `http://${DOMAIN}:8080/dist/`
    },

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

    plugins: [

        new MiniCssExtractPlugin({

            filename: '[name].css',
            chunkFilename: '[id].css',

        }),


        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()


    ],



    devServer: {
        headers: { 'Access-Control-Allow-Origin': '*' },
        host: `${DOMAIN}`,
        port: 8080,
        open: true,
        writeToDisk: false,
        /**  hot: true, */
        compress: true,
        index: './index.php',
        public: `${DOMAIN}:8080`,
        proxy: {
            '*': {
                target: `http://${DOMAIN}`,
                changeOrigin: true,
                secure: false
            }
        },

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
}`

The  configuration file webpack.production.js is configured with:

- Babel
- Sass
- PostCSS
- PurgeCSS

