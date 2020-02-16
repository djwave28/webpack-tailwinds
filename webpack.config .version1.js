/**
 * webpack.config.js
 * 
 * version 1
 * 
 * Install the dependencies npm modules
 * npm i --save-dev webpack webpack-cli css-loader sass-loader node-sass postcss-loader autoprefixer mini-css-extract-plugin
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
 */



npm i--save - dev webpack webpack - cli css - loader sass - loader node - sass postcss - loader autoprefixer mini - css - extract - plugin
npm i--save lodash


const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//
module.exports = {
    mode: 'development',
    watch: true,

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
    plugins: [

        new MiniCssExtractPlugin({

            filename: '[name].css',
            chunkFilename: '[id].css',

        })

    ],

};